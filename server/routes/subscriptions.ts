/**
 * Subscription Management, Pricing, Marketplace, and Product Routes
 */

import type { Express } from "express";
import { storage } from "../storage";
import {
  subscriptionPlans,
  subscriptionAddons,
  subscriptions,
  subscriptionAddonSelections,
} from "@shared/schema";
import { PricingEngine } from "../services/pricing";
import { NMIService } from "../services/nmi";
import { productRecommendationService } from "../services/productRecommendations";
import { ResendEmailService } from "../services/resend-email";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { z } from "zod";

function calculateNextBillingDate(billingCycle: string): Date {
  const now = new Date();
  switch (billingCycle) {
    case "quarterly":
      return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    case "annual":
      return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}

export function registerSubscriptionRoutes(
  app: Express,
  emailService: ResendEmailService,
) {
  // Get available subscription plans
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.isActive, true));

      res.json({
        success: true,
        plans: plans.map((plan) => ({
          ...plan,
          features: Array.isArray(plan.features) ? plan.features : [],
          popular: plan.tierLevel === "professional",
          recommended: plan.pathway === "diy" && plan.tierLevel === "basic",
        })),
      });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription plans",
      });
    }
  });

  // Get available subscription addons
  app.get("/api/subscription-addons", async (req, res) => {
    try {
      const addons = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      const categoryIconMap: Record<string, string> = {
        seo: "Globe",
        social: "Users",
        ppc: "Zap",
        content: "Sparkles",
        email: "Users",
        reputation: "Star",
        analytics: "Sparkles",
        website: "Globe",
        "ai-coach": "Brain",
        coaching: "Ship",
      };

      const addonsWithIcons = addons.map((addon) => ({
        ...addon,
        icon: categoryIconMap[addon.category as string] || "Sparkles",
        billingType:
          addon.billingCycle === "one_time" ? "one_time" : "monthly",
      }));

      res.json({
        success: true,
        addons: addonsWithIcons,
      });
    } catch (error) {
      console.error("Error fetching subscription addons:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription addons",
      });
    }
  });

  // Marketplace orders - Process payment for à la carte items
  app.post("/api/marketplace/orders", async (req, res) => {
    try {
      const orderSchema = z.object({
        items: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
            type: z.enum(["app", "addon"]),
          }),
        ),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional(),
        }),
        totals: z.object({
          subtotal: z.number(),
          tax: z.number(),
          total: z.number(),
        }),
      });

      const validation = orderSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid order data",
          errors: validation.error.errors,
        });
      }

      const { items, paymentToken, customerInfo, totals } = validation.data;

      // SECURITY: Recalculate totals server-side
      const calculatedSubtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const calculatedTax = calculatedSubtotal * 0.08;
      const calculatedTotal = calculatedSubtotal + calculatedTax;

      if (Math.abs(calculatedTotal - totals.total) > 0.01) {
        return res.status(400).json({
          success: false,
          message: "Order total mismatch. Please refresh and try again.",
        });
      }

      const nmiRequest = {
        planId: "marketplace-order-" + Date.now(),
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || "",
        },
        paymentToken,
        planAmount: calculatedTotal.toFixed(2),
        billingCycle: "monthly" as const,
      };

      const nmiResult = await NMIService.createSubscription(nmiRequest);

      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Payment processing failed",
        });
      }

      // Provision client account
      let client = await storage.getClientByEmail(customerInfo.email);
      if (!client) {
        client = await storage.createClient({
          companyName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          accountStatus: "active",
        });
      }

      // Map purchased app items to feature codes
      const featureCodeMap: Record<string, string> = {
        respond: "RS",
        livechat: "LC",
        send: "SE",
        post: "PO",
        list: "LI",
        review: "RE",
        "ai-coach": "AC",
      };
      const purchasedCodes = items
        .filter((item) => item.type === "app")
        .map((item) => featureCodeMap[item.id])
        .filter(Boolean);

      const existingCodes = (client.enabledFeatures || "")
        .split(",")
        .filter(Boolean);
      const allCodes = Array.from(
        new Set([...existingCodes, ...purchasedCodes]),
      );
      await storage.updateClient(client.id, {
        enabledFeatures: allCodes.join(","),
      });

      console.log("Marketplace order successful:", {
        subscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        customerEmail: customerInfo.email,
        items: items.length,
        total: calculatedTotal,
      });

      res.json({
        success: true,
        message: "Order processed successfully",
        subscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        items: items.map((item) => item.name),
      });
    } catch (error) {
      console.error("Error processing marketplace order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process order. Please try again.",
      });
    }
  });

  // Calculate pricing for selected plan and addons
  app.post("/api/pricing/calculate", async (req, res) => {
    try {
      const {
        planId,
        addons: selectedAddons = [],
        billingCycle = "monthly",
      } = req.body;

      if (!planId) {
        return res.status(400).json({
          success: false,
          message: "Plan ID is required",
        });
      }

      const plan = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planId))
        .limit(1);

      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      const addons = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle,
      );

      res.json({
        success: true,
        pricing,
      });
    } catch (error) {
      console.error("Error calculating pricing:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate pricing",
      });
    }
  });

  // Calculate bundle pricing from assessment recommendations
  app.post("/api/pricing/calculate-bundle", async (req, res) => {
    try {
      const {
        assessmentId,
        pathway,
        productIds = [],
        billingCycle = "monthly",
      } = req.body;

      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required",
        });
      }

      const planIdMap: Record<string, string> = {
        diy: "diy-platform",
      };

      const planStringId = planIdMap[pathway];
      const [plan] = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planStringId))
        .limit(1);

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found for pathway",
        });
      }

      const { products: productsTable } = await import("@shared/schema");
      const { inArray } = await import("drizzle-orm");

      let selectedProducts: any[] = [];
      let productsTotal = 0;

      if (productIds.length > 0) {
        selectedProducts = await db
          .select()
          .from(productsTable)
          .where(inArray(productsTable.id, productIds));

        productsTotal = selectedProducts.reduce((sum: number, product: any) => {
          const price = parseFloat(product.diyPrice || "0");
          return sum + price;
        }, 0);
      }

      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;

      const cycleMonths =
        billingCycle === "quarterly" ? 3 : billingCycle === "annual" ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;

      let discount = 0;
      if (billingCycle === "quarterly") {
        discount = subtotal * 0.05;
      } else if (billingCycle === "annual") {
        discount = subtotal * 0.15;
      }

      const total = subtotal - discount;

      const pricing = {
        planName: plan.name,
        planPrice: basePriceMonthly * cycleMonths,
        selectedAddons: selectedProducts.map((product: any) => {
          const monthlyPrice = parseFloat(product.diyPrice || "0");
          return {
            name: product.name,
            price: monthlyPrice * cycleMonths,
          };
        }),
        subtotal,
        discount,
        total,
        billingCycle,
        savings: discount,
      };

      res.json({
        success: true,
        pricing,
      });
    } catch (error) {
      console.error("Error calculating bundle pricing:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate bundle pricing",
      });
    }
  });

  // Create subscription from assessment
  app.post("/api/subscriptions/create-from-assessment", async (req, res) => {
    try {
      const {
        assessmentId,
        pathway,
        productIds = [],
        billingCycle = "monthly",
      } = req.body;

      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required",
        });
      }

      const assessment = await storage.getAssessment(assessmentId);
      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
      }

      const planIdMap: Record<string, string> = {
        diy: "diy-platform",
      };

      const planStringId = planIdMap[pathway];
      const [plan] = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planStringId))
        .limit(1);

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      const { products: productsTable } = await import("@shared/schema");
      const { inArray } = await import("drizzle-orm");

      let selectedProducts: any[] = [];
      let productsTotal = 0;

      if (productIds.length > 0) {
        selectedProducts = await db
          .select()
          .from(productsTable)
          .where(inArray(productsTable.id, productIds));

        productsTotal = selectedProducts.reduce((sum: number, product: any) => {
          const price = parseFloat(product.diyPrice || "0");
          return sum + price;
        }, 0);
      }

      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;

      const cycleMonths =
        billingCycle === "quarterly" ? 3 : billingCycle === "annual" ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;

      let discount = 0;
      if (billingCycle === "quarterly") {
        discount = subtotal * 0.05;
      } else if (billingCycle === "annual") {
        discount = subtotal * 0.15;
      }

      const total = subtotal - discount;

      const subscriptionData = {
        assessmentId,
        planId: plan.id,
        status: "pending_payment" as const,
        baseAmount: (basePriceMonthly * cycleMonths).toString(),
        addonAmount: (productsMonthly * cycleMonths).toString(),
        totalAmount: total.toString(),
        billingCycle,
      };

      const subscription = await db
        .insert(subscriptions)
        .values(subscriptionData)
        .returning();

      if (assessment) {
        const pathwayName = "DIY Platform";
        const planName = `${plan.name} (${pathwayName})`;

        const featuresPromises = selectedProducts.map(async (prod: any) => {
          const product = selectedProducts.find(
            (p: any) => p.id === prod.id,
          );
          return product?.name || "";
        });
        const productNames = await Promise.all(featuresPromises);

        const baseFeatures = Array.isArray(plan.features)
          ? plan.features
          : [];
        const allFeatures = [
          ...baseFeatures,
          ...productNames.filter(Boolean),
        ];

        await emailService.sendEnrollmentConfirmation(assessment.email, {
          businessName: assessment.businessName,
          pathway,
          planName,
          monthlyPrice: parseFloat(total.toFixed(2)),
          nextBillingDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ),
          features: allFeatures,
        });
      }

      res.json({
        success: true,
        subscription: subscription[0],
        message: "Subscription created successfully",
      });
    } catch (error) {
      console.error("Error creating subscription from assessment:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription",
      });
    }
  });

  // Check trial status for a subscription
  app.get("/api/subscriptions/:id/trial-status", async (req, res) => {
    try {
      const { id } = req.params;

      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.id, parseInt(id)));

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found",
        });
      }

      const now = new Date();
      const isTrialActive =
        subscription.isTrialActive &&
        subscription.trialPeriodEnd &&
        now < subscription.trialPeriodEnd;

      res.json({
        success: true,
        trialStatus: {
          isTrialActive,
          trialPeriodEnd: subscription.trialPeriodEnd,
          daysRemaining:
            isTrialActive && subscription.trialPeriodEnd
              ? Math.ceil(
                  (subscription.trialPeriodEnd.getTime() - now.getTime()) /
                    (24 * 60 * 60 * 1000),
                )
              : 0,
        },
      });
    } catch (error) {
      console.error("Error checking trial status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check trial status",
      });
    }
  });

  // Create new subscription
  app.post("/api/subscriptions", async (req, res) => {
    try {
      const subscriptionSchema = z.object({
        planId: z.string().min(1, "Plan ID is required"),
        addons: z
          .array(
            z.object({
              addonId: z.string(),
              quantity: z.number().optional(),
            }),
          )
          .default([]),
        billingCycle: z.enum(["monthly", "quarterly", "annual"]),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional(),
        }),
      });

      const validation = subscriptionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid subscription data",
          errors: validation.error.errors,
        });
      }

      const {
        planId,
        addons: selectedAddons,
        billingCycle,
        paymentToken,
        customerInfo,
      } = validation.data;

      const plan = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planId))
        .limit(1);

      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      const addons = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // SECURITY: Recalculate pricing server-side
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle,
      );

      let setupTransactionResult = null;
      if (pricing.setupFee > 0) {
        setupTransactionResult = await NMIService.processTransaction(
          paymentToken,
          pricing.oneTimeTotal.toFixed(2),
          `${plan[0].name} Setup Fee`,
        );

        if (setupTransactionResult.response !== "1") {
          return res.status(400).json({
            success: false,
            message:
              setupTransactionResult.responsetext ||
              "Setup fee payment failed",
          });
        }
      }

      const hasAiCoachAddon = selectedAddons.some(
        (addon) =>
          addons.find((a) => a.addonId === addon.addonId)?.category ===
          "ai-coach",
      );

      const isTrialEligible = hasAiCoachAddon;
      const trialPeriodEnd = isTrialEligible
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        : null;

      const recurringAmount = pricing.recurringTotal.toFixed(2);
      const nmiRequest = {
        planId: plan[0].planId,
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || "",
        },
        paymentToken,
        planAmount: recurringAmount,
        billingCycle,
        startDate: trialPeriodEnd
          ? trialPeriodEnd.toISOString().split("T")[0]
          : undefined,
      };

      const nmiResult = await NMIService.createSubscription(nmiRequest);

      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Subscription creation failed",
        });
      }

      // Provision client account
      let client = await storage.getClientByEmail(customerInfo.email);
      if (!client) {
        client = await storage.createClient({
          companyName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          address: [
            customerInfo.address,
            customerInfo.city,
            customerInfo.state,
            customerInfo.zip,
          ]
            .filter(Boolean)
            .join(", ") || null,
          accountStatus: "active",
        });
      }

      const coreFeatures = "RS,LC,SE,PO,LI,RE";
      const hasAiCoach = selectedAddons.some(
        (addon) =>
          addons.find((a) => a.addonId === addon.addonId)?.category ===
          "coaching",
      );
      const enabledFeatures = hasAiCoach
        ? `${coreFeatures},AC`
        : coreFeatures;

      await storage.updateClient(client.id, { enabledFeatures });

      const subscriptionData = {
        nmiSubscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        planId: plan[0].id,
        status: isTrialEligible ? "trial" : "active",
        baseAmount: pricing.basePrice.toFixed(2),
        addonAmount: pricing.totalAddons.toFixed(2),
        totalAmount: pricing.recurringTotal.toFixed(2),
        billingCycle,
        paymentMethod: {
          type: "card",
          maskedNumber: "****1234",
          lastFour: "1234",
        },
        currentPeriodStart: new Date(),
        currentPeriodEnd: calculateNextBillingDate(billingCycle),
        nextPaymentDate: isTrialEligible
          ? trialPeriodEnd
          : calculateNextBillingDate(billingCycle),
        trialPeriodEnd: trialPeriodEnd,
        isTrialActive: isTrialEligible,
      };

      const [newSubscription] = await db
        .insert(subscriptions)
        .values(subscriptionData)
        .returning();

      // Save addon selections
      for (const addon of selectedAddons) {
        const addonRecord = addons.find((a) => a.addonId === addon.addonId);
        if (addonRecord) {
          const price = addonRecord.price
            ? String(addonRecord.price)
            : "0.00";
          await db.insert(subscriptionAddonSelections).values({
            subscriptionId: newSubscription.id,
            addonId: addonRecord.id,
            unitPrice: price,
            totalPrice: price,
          });
        }
      }

      res.json({
        success: true,
        subscription: newSubscription,
        nmiSubscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        message: "Subscription created successfully",
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription",
      });
    }
  });

  // Get product recommendations for an assessment
  app.get(
    "/api/assessments/:id/product-recommendations",
    async (req, res) => {
      try {
        const assessmentId = parseInt(req.params.id);
        const recs =
          await productRecommendationService.getRecommendations(assessmentId);

        const recommendations = recs.map((rec) => ({
          productId: rec.product.productId,
          productName: rec.product.name,
          reason: rec.reason,
          priority: rec.priority,
          diyPrice: rec.product.diyPrice,
          category: rec.product.category,
          currentScore: rec.currentScore,
          projectedScore: rec.projectedScore,
          scoreImprovement: rec.scoreImprovement,
        }));

        res.json({
          success: true,
          recommendations,
        });
      } catch (error) {
        console.error("Error fetching product recommendations:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch product recommendations",
        });
      }
    },
  );

  // Get all products (filtered by delivery method)
  app.get("/api/products", async (req, res) => {
    try {
      const deliveryMethod = req.query.deliveryMethod as string | undefined;
      const category = req.query.category as string | undefined;

      const { products } = await import("@shared/schema");
      const { eq, and } = await import("drizzle-orm");

      const conditions = [eq(products.isActive, true)];
      if (category) {
        conditions.push(eq(products.category, category));
      }

      const allProducts = await db
        .select()
        .from(products)
        .where(and(...conditions));

      const filteredProducts = deliveryMethod
        ? allProducts.filter((p) =>
            p.deliveryMethod?.includes(deliveryMethod),
          )
        : allProducts;

      res.json({
        success: true,
        products: filteredProducts,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
  });

  // Get single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const { products } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");

      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }
  });
}

/**
 * Payment Routes - BusinessBlueprint API
 *
 * General payment processing goes through SwipesBlue.
 * ScansBlue $10 report checkout uses its own isolated Stripe flow.
 */

console.log('[PAYMENT ROUTES] File loaded!');

import type { Express } from "express";
import { db } from "../db";
import { users, billingHistory } from "@shared/schema";
import { eq } from "drizzle-orm";
import { SwipesBlueService } from "../services/swipesblue";
import Stripe from "stripe";

export function registerPaymentRoutes(app: Express) {

  console.log('[PAYMENT ROUTES] Registering routes...');

  /**
   * Test endpoint - verify payment service is working
   */
  app.get("/api/payments/test", async (req, res) => {
    try {
      res.json({
        success: true,
        provider: "swipesblue",
        message: "Payment service is ready"
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * Get available payment methods
   */
  app.get("/api/payments/methods", async (req, res) => {
    try {
      res.json({
        success: true,
        methods: ['card', 'apple_pay', 'google_pay']
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * Process a transaction via SwipesBlue
   */
  app.post("/api/payments/charge", async (req, res) => {
    try {
      const { amount, paymentToken, description, customerId } = req.body;

      if (!amount || !paymentToken) {
        return res.status(400).json({
          success: false,
          error: "Amount and paymentToken are required"
        });
      }

      const result = await SwipesBlueService.processTransaction({
        paymentToken,
        amount: parseFloat(amount).toFixed(2),
        description: description || 'Payment',
        customerId,
      });

      // Record transaction in billing history
      if (result.success && result.transactionId) {
        await db.insert(billingHistory).values({
          swipesblueTransactionId: result.transactionId,
          amount: String(amount),
          status: "paid",
          billingDate: new Date(),
          paidDate: new Date(),
          paymentMethod: { provider: 'swipesblue' },
        });
      }

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * Create a customer in SwipesBlue
   */
  app.post("/api/payments/customers", async (req, res) => {
    try {
      const { firstName, lastName, email, phone } = req.body;

      if (!email || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          error: "firstName, lastName, and email are required"
        });
      }

      const result = await SwipesBlueService.createCustomer({
        firstName,
        lastName,
        email,
        phone,
      });

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * Get payment config for frontend
   */
  app.get("/api/payments/config", async (req, res) => {
    try {
      res.json({
        provider: 'swipesblue',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // ============================================================
  // ScansBlue $10 Report Checkout (isolated Stripe flow)
  // ============================================================

  /**
   * Create ScansBlue Full Report checkout session
   * POST /api/scansblue/checkout
   *
   * This is the ONLY Stripe usage in the app — isolated to the
   * ScansBlue $10 full report purchase flow.
   */
  app.post("/api/scansblue/checkout", async (req, res) => {
    try {
      const { assessmentId, email } = req.body;

      if (!assessmentId) {
        return res.status(400).json({
          success: false,
          error: "assessmentId is required"
        });
      }

      const assessment = await db.query.assessments.findFirst({
        where: (assessments, { eq }) => eq(assessments.id, parseInt(assessmentId))
      });

      if (!assessment) {
        return res.status(404).json({
          success: false,
          error: "Assessment not found"
        });
      }

      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(500).json({
          success: false,
          error: "ScansBlue checkout not configured"
        });
      }

      const stripe = new Stripe(stripeKey);
      const customerEmail = email || assessment.email;
      const baseUrl = process.env.APP_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ScansBlue Full Report',
                description: `Comprehensive website analysis for ${assessment.website || 'your business'}`,
              },
              unit_amount: 1000, // $10.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/scansblue/success?session_id={CHECKOUT_SESSION_ID}&assessment=${assessmentId}`,
        cancel_url: `${baseUrl}/scansblue/purchase?assessment=${assessmentId}&cancelled=true`,
        customer_email: customerEmail,
        metadata: {
          type: 'scansblue_full_report',
          assessmentId: assessmentId.toString(),
          websiteUrl: assessment.website || ''
        },
      });

      res.json({
        success: true,
        sessionId: session.id,
        url: session.url
      });
    } catch (error: any) {
      console.error('[ScansBlue Checkout] Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * Verify ScansBlue checkout session
   * GET /api/scansblue/verify-session
   */
  app.get("/api/scansblue/verify-session", async (req, res) => {
    try {
      const { session_id } = req.query;

      if (!session_id || typeof session_id !== 'string') {
        return res.status(400).json({
          success: false,
          error: "session_id is required"
        });
      }

      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(500).json({
          success: false,
          error: "ScansBlue checkout not configured"
        });
      }

      const stripe = new Stripe(stripeKey);
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['payment_intent']
      });

      res.json({
        success: true,
        paid: session.payment_status === 'paid',
        assessmentId: session.metadata?.assessmentId,
        customerEmail: session.customer_email,
        paymentIntentId: typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id
      });
    } catch (error: any) {
      console.error('[ScansBlue Verify] Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  console.log('[PAYMENT ROUTES] Routes registered successfully!');
}

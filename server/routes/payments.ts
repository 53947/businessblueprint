/**
 * Payment Routes - BusinessBlueprint API
 * 
 * Handles payment processing endpoints
 */

console.log('[PAYMENT ROUTES] File loaded!');

import type { Express } from "express";
import { db } from "../db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { paymentService } from "../services/payment-service";

export function registerPaymentRoutes(app: Express) {

  console.log('[PAYMENT ROUTES] Registering routes...');

  /**
   * Test endpoint - verify payment service is working
   */
  app.get("/api/payments/test", async (req, res) => {
    try {
      const provider = paymentService.getProviderName();
      res.json({ 
        success: true, 
        provider,
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
   * Get available payment methods (FIXED)
   */
  app.get("/api/payments/methods", async (req, res) => {
    try {
      const methods = paymentService.getSupportedMethods?.() ?? [];
      res.json({
        success: true,
        methods
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * Create a payment intent
   * This generates a client secret for the frontend to complete the payment
   */
  app.post("/api/payments/create-intent", async (req, res) => {
    try {
      const { amount, customerId, metadata } = req.body;

      if (!amount || !customerId) {
        return res.status(400).json({
          success: false,
          error: "Amount and customerId are required"
        });
      }

      // Get customer from database to get their payment customer ID
      const customer = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, customerId)
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          error: "Customer not found"
        });
      }

      // If customer doesn't have a payment customer ID, create one
      let paymentCustomerId = (customer as any).stripeCustomerId;

      if (!paymentCustomerId) {
        const customerName = customer.firstName && customer.lastName 
          ? `${customer.firstName} ${customer.lastName}`
          : customer.email || 'Customer';

        const result = await paymentService.createCustomer({
          email: customer.email || '',
          name: customerName,
          metadata: {
            crm_id: customer.id.toString()
          }
        });

        if (!result.success) {
          return res.status(500).json(result);
        }

        paymentCustomerId = result.customerId;

        // Update customer in database with payment customer ID
        await db.update(users)
          .set({ stripeCustomerId: paymentCustomerId } as any)
          .where(eq(users.id, customer.id));
      }

      // Create payment intent
      const result = await paymentService.createPaymentIntent({
        amount: parseFloat(amount),
        customerId: paymentCustomerId!,
        metadata: metadata || {}
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
   * Process a direct charge (for saved payment methods)
   */
  app.post("/api/payments/charge", async (req, res) => {
    try {
      const { amount, customerId, paymentMethodId, description, metadata } = req.body;

      if (!amount || !customerId || !paymentMethodId) {
        return res.status(400).json({
          success: false,
          error: "Amount, customerId, and paymentMethodId are required"
        });
      }

      // Get customer's payment customer ID
      const customer = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, customerId)
      });

      if (!customer || !(customer as any).stripeCustomerId) {
        return res.status(404).json({
          success: false,
          error: "Customer not found or not set up for payments"
        });
      }

      const customerName = customer.firstName && customer.lastName 
        ? `${customer.firstName} ${customer.lastName}`
        : customer.email || 'Customer';

      // Process charge
      const result = await paymentService.charge({
        amount: parseFloat(amount),
        customerId: (customer as any).stripeCustomerId,
        source: paymentMethodId,
        description: description || `Payment for ${customerName}`,
        metadata: metadata || {}
      });

      // If successful, you might want to record the transaction
      if (result.success) {
        // TODO: Save transaction to database
        // await db.insert(transactions).values({...});
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
   * Refund a transaction
   */
  app.post("/api/payments/refund", async (req, res) => {
    try {
      const { transactionId, amount } = req.body;

      if (!transactionId) {
        return res.status(400).json({
          success: false,
          error: "transactionId is required"
        });
      }

      const result = await paymentService.refund(
        transactionId, 
        amount ? parseFloat(amount) : undefined
      );

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * Create a customer in the payment system
   */
  app.post("/api/payments/customers", async (req, res) => {
    try {
      const { email, name, phone, metadata } = req.body;

      if (!email || !name) {
        return res.status(400).json({
          success: false,
          error: "Email and name are required"
        });
      }

      const result = await paymentService.createCustomer({
        email,
        name,
        phone,
        metadata: metadata || {}
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
   * Get Stripe publishable key for frontend
   */
  app.get("/api/payments/config", async (req, res) => {
    try {
      res.json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        provider: paymentService.getProviderName()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  console.log('[PAYMENT ROUTES] Routes registered successfully!');
}
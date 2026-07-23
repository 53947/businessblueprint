/**
 * Payment Routes - BusinessBlueprint API
 *
 * All payment processing goes through swipesblue.com.
 */

console.log('[PAYMENT ROUTES] File loaded!');

import type { Express } from "express";
import { db } from "../db";
import { users, billingHistory, assessments } from "@shared/schema";
import { eq } from "drizzle-orm";
import { SwipesBlueService } from "../services/swipesblue";

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

  console.log('[PAYMENT ROUTES] Routes registered successfully!');
}

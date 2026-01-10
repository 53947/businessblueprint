/**
 * Payment Webhook Handler
 * 
 * Handles webhook events for SiteInspector Full Report payments
 * Uses payment service abstraction for provider-agnostic verification
 */

import { Request, Response } from "express";
import Stripe from "stripe";
import { db } from "../db";
import { siteInspectorPurchases, siteInspectorResults } from "@shared/schema";
import { eq } from "drizzle-orm";
import { SiteInspectorService } from "../services/siteinspector";
import { paymentService } from "../services/payment-service";

const siteInspectorService = new SiteInspectorService();

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  if (!sig) {
    console.error("[Payment Webhook] No signature provided");
    return res.status(400).json({ error: "No signature" });
  }

  let event: Stripe.Event;

  try {
    event = paymentService.verifyWebhook(req.body, sig);
  } catch (err: any) {
    console.error("[Payment Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  console.log(`[Payment Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Payment Webhook] Payment succeeded: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Payment Webhook] Payment failed: ${paymentIntent.id}`);
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`[Payment Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("[Payment Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata } = session;
  
  if (!metadata?.type || metadata.type !== "siteinspector_full_report") {
    console.log("[Payment Webhook] Not a SiteInspector purchase, skipping");
    return;
  }

  const assessmentId = metadata.assessmentId ? parseInt(metadata.assessmentId) : null;
  const websiteUrl = metadata.websiteUrl || "";
  
  console.log(`[Payment Webhook] Processing SiteInspector Full Report purchase for assessment ${assessmentId}`);

  if (!assessmentId) {
    console.error("[Payment Webhook] No assessmentId in metadata");
    return;
  }

  try {
    const existingPurchase = await db.query.siteInspectorPurchases?.findFirst({
      where: (purchases, { eq }) => eq(purchases.transactionId, session.id)
    });

    if (existingPurchase) {
      console.log(`[Payment Webhook] Purchase already recorded for session ${session.id}`);
      return;
    }

    await db.insert(siteInspectorPurchases).values({
      assessmentId: assessmentId,
      paymentProvider: "stripe",
      transactionId: session.id,
      paymentIntentId: typeof session.payment_intent === "string" 
        ? session.payment_intent 
        : session.payment_intent?.id || null,
      amount: session.amount_total || 1000,
      status: "paid",
      email: session.customer_email || null,
      purchasedAt: new Date()
    });

    console.log(`[Payment Webhook] Purchase recorded for assessment ${assessmentId}`);

    const assessment = await db.query.assessments.findFirst({
      where: (assessments, { eq }) => eq(assessments.id, assessmentId)
    });

    if (!assessment) {
      console.error(`[Payment Webhook] Assessment ${assessmentId} not found`);
      return;
    }

    const targetUrl = websiteUrl || assessment.website;
    const customerEmail = session.customer_email || assessment.email;

    if (!targetUrl) {
      console.error("[Payment Webhook] No website URL available for full report");
      return;
    }

    await db.insert(siteInspectorResults).values({
      assessmentId: assessmentId,
      url: targetUrl,
      type: "full_report",
      status: "processing",
      requestedAt: new Date()
    });

    console.log(`[Payment Webhook] Requesting full report for ${targetUrl}`);

    const reportResult = await siteInspectorService.requestFullReport(
      targetUrl,
      customerEmail || undefined,
      assessmentId
    );

    if (reportResult) {
      console.log(`[Payment Webhook] Full report queued: ${reportResult.reportId}`);

      setTimeout(async () => {
        try {
          await checkAndDeliverReport(assessmentId, customerEmail || undefined, targetUrl);
        } catch (error) {
          console.error("[Payment Webhook] Error in delayed report check:", error);
        }
      }, 3 * 60 * 1000);
    }

  } catch (error) {
    console.error("[Payment Webhook] Error handling checkout completed:", error);
    throw error;
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[Payment Webhook] Payment failed for ${paymentIntent.id}`);

  try {
    const existingPurchase = await db.query.siteInspectorPurchases?.findFirst({
      where: (purchases, { eq }) => eq(purchases.paymentIntentId, paymentIntent.id)
    });

    if (existingPurchase) {
      await db.update(siteInspectorPurchases)
        .set({ status: "failed" })
        .where(eq(siteInspectorPurchases.id, existingPurchase.id));
      
      console.log(`[Payment Webhook] Updated purchase ${existingPurchase.id} to failed status`);
    }
  } catch (error) {
    console.error("[Payment Webhook] Error updating failed payment:", error);
  }
}

async function checkAndDeliverReport(
  assessmentId: number, 
  email: string | undefined, 
  websiteUrl: string
) {
  try {
    const result = await db.query.siteInspectorResults?.findFirst({
      where: (results, { eq, and }) => and(
        eq(results.assessmentId, assessmentId),
        eq(results.type, "full_report")
      )
    });

    if (result && result.status === "completed" && email) {
      console.log(`[Payment Webhook] Sending full report email to ${email}`);
      
      const purchase = await db.query.siteInspectorPurchases?.findFirst({
        where: (purchases, { eq }) => eq(purchases.assessmentId, assessmentId)
      });

      if (purchase) {
        await db.update(siteInspectorPurchases)
          .set({ reportDeliveredAt: new Date() })
          .where(eq(siteInspectorPurchases.id, purchase.id));
      }
    }
  } catch (error) {
    console.error("[Payment Webhook] Error checking/delivering report:", error);
  }
}

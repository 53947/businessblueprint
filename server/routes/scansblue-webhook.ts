/**
 * ScansBlue Stripe Webhook Handler
 *
 * Handles Stripe webhook events exclusively for ScansBlue $10 Full Report purchases.
 * This is the ONLY Stripe webhook in the app -- isolated to the ScansBlue checkout flow.
 */

import { Request, Response } from "express";
import Stripe from "stripe";
import { db } from "../db";
import { scansBluePurchases, scansBlueResults } from "@shared/schema";
import { eq } from "drizzle-orm";
import { ScansBlueService } from "../services/scansblue";

const scansBlueService = new ScansBlueService();

export async function handleScansBlueStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  if (!sig) {
    console.error("[ScansBlue Webhook] No signature provided");
    return res.status(400).json({ error: "No signature" });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    console.error("[ScansBlue Webhook] Missing Stripe configuration");
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const stripe = new Stripe(stripeKey);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[ScansBlue Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  console.log(`[ScansBlue Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[ScansBlue Webhook] Payment succeeded: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[ScansBlue Webhook] Payment failed: ${paymentIntent.id}`);
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`[ScansBlue Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("[ScansBlue Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata } = session;

  if (!metadata?.type || metadata.type !== "scansblue_full_report") {
    console.log("[ScansBlue Webhook] Not a ScansBlue purchase, skipping");
    return;
  }

  const assessmentId = metadata.assessmentId ? parseInt(metadata.assessmentId) : null;
  const websiteUrl = metadata.websiteUrl || "";

  console.log(`[ScansBlue Webhook] Processing ScansBlue Full Report purchase for assessment ${assessmentId}`);

  if (!assessmentId) {
    console.error("[ScansBlue Webhook] No assessmentId in metadata");
    return;
  }

  try {
    const existingPurchase = await db.query.scansBluePurchases?.findFirst({
      where: (purchases, { eq }) => eq(purchases.transactionId, session.id)
    });

    if (existingPurchase) {
      console.log(`[ScansBlue Webhook] Purchase already recorded for session ${session.id}`);
      return;
    }

    await db.insert(scansBluePurchases).values({
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

    console.log(`[ScansBlue Webhook] Purchase recorded for assessment ${assessmentId}`);

    const assessment = await db.query.assessments.findFirst({
      where: (assessments, { eq }) => eq(assessments.id, assessmentId)
    });

    if (!assessment) {
      console.error(`[ScansBlue Webhook] Assessment ${assessmentId} not found`);
      return;
    }

    const targetUrl = websiteUrl || assessment.website;
    const customerEmail = session.customer_email || assessment.email;

    if (!targetUrl) {
      console.error("[ScansBlue Webhook] No website URL available for full report");
      return;
    }

    await db.insert(scansBlueResults).values({
      assessmentId: assessmentId,
      url: targetUrl,
      type: "full_report",
      status: "processing",
      requestedAt: new Date()
    });

    console.log(`[ScansBlue Webhook] Requesting full report for ${targetUrl}`);

    const reportResult = await scansBlueService.requestFullReport(
      targetUrl,
      customerEmail || undefined,
      assessmentId
    );

    if (reportResult) {
      console.log(`[ScansBlue Webhook] Full report queued: ${reportResult.reportId}`);

      setTimeout(async () => {
        try {
          await checkAndDeliverReport(assessmentId, customerEmail || undefined, targetUrl);
        } catch (error) {
          console.error("[ScansBlue Webhook] Error in delayed report check:", error);
        }
      }, 3 * 60 * 1000);
    }

  } catch (error) {
    console.error("[ScansBlue Webhook] Error handling checkout completed:", error);
    throw error;
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[ScansBlue Webhook] Payment failed for ${paymentIntent.id}`);

  try {
    const existingPurchase = await db.query.scansBluePurchases?.findFirst({
      where: (purchases, { eq }) => eq(purchases.paymentIntentId, paymentIntent.id)
    });

    if (existingPurchase) {
      await db.update(scansBluePurchases)
        .set({ status: "failed" })
        .where(eq(scansBluePurchases.id, existingPurchase.id));

      console.log(`[ScansBlue Webhook] Updated purchase ${existingPurchase.id} to failed status`);
    }
  } catch (error) {
    console.error("[ScansBlue Webhook] Error updating failed payment:", error);
  }
}

async function checkAndDeliverReport(
  assessmentId: number,
  email: string | undefined,
  websiteUrl: string
) {
  try {
    const result = await db.query.scansBlueResults?.findFirst({
      where: (results, { eq, and }) => and(
        eq(results.assessmentId, assessmentId),
        eq(results.type, "full_report")
      )
    });

    if (result && result.status === "completed" && email) {
      console.log(`[ScansBlue Webhook] Sending full report email to ${email}`);

      const purchase = await db.query.scansBluePurchases?.findFirst({
        where: (purchases, { eq }) => eq(purchases.assessmentId, assessmentId)
      });

      if (purchase) {
        await db.update(scansBluePurchases)
          .set({ reportDeliveredAt: new Date() })
          .where(eq(scansBluePurchases.id, purchase.id));
      }
    }
  } catch (error) {
    console.error("[ScansBlue Webhook] Error checking/delivering report:", error);
  }
}

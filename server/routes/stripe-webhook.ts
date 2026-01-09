/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe webhook events for SiteInspector Full Report payments
 */

import { Request, Response } from "express";
import Stripe from "stripe";
import { db } from "../db";
import { siteInspectorPurchases, siteInspectorResults } from "@shared/schema";
import { eq } from "drizzle-orm";
import { SiteInspectorService } from "../services/siteinspector";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover"
});

const siteInspectorService = new SiteInspectorService();

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    console.error("[Stripe Webhook] No signature provided");
    return res.status(400).json({ error: "No signature" });
  }

  if (!webhookSecret) {
    console.warn("[Stripe Webhook] No webhook secret configured, processing without verification");
  }

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body.toString());
    }
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  console.log(`[Stripe Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("[Stripe Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata } = session;
  
  if (!metadata?.type || metadata.type !== "siteinspector_full_report") {
    console.log("[Stripe Webhook] Not a SiteInspector purchase, skipping");
    return;
  }

  const assessmentId = metadata.assessmentId ? parseInt(metadata.assessmentId) : null;
  const websiteUrl = metadata.websiteUrl || "";
  
  console.log(`[Stripe Webhook] Processing SiteInspector Full Report purchase for assessment ${assessmentId}`);

  if (!assessmentId) {
    console.error("[Stripe Webhook] No assessmentId in metadata");
    return;
  }

  try {
    const existingPurchase = await db.query.siteInspectorPurchases?.findFirst({
      where: (purchases, { eq }) => eq(purchases.stripeSessionId, session.id)
    });

    if (existingPurchase) {
      console.log(`[Stripe Webhook] Purchase already recorded for session ${session.id}`);
      return;
    }

    await db.insert(siteInspectorPurchases).values({
      assessmentId: assessmentId,
      stripeSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === "string" 
        ? session.payment_intent 
        : session.payment_intent?.id || null,
      amount: session.amount_total || 1000,
      status: "paid",
      email: session.customer_email || null,
      purchasedAt: new Date()
    });

    console.log(`[Stripe Webhook] Purchase recorded for assessment ${assessmentId}`);

    const assessment = await db.query.assessments.findFirst({
      where: (assessments, { eq }) => eq(assessments.id, assessmentId)
    });

    if (!assessment) {
      console.error(`[Stripe Webhook] Assessment ${assessmentId} not found`);
      return;
    }

    const targetUrl = websiteUrl || assessment.website;
    const customerEmail = session.customer_email || assessment.email;

    if (!targetUrl) {
      console.error("[Stripe Webhook] No website URL available for full report");
      return;
    }

    await db.insert(siteInspectorResults).values({
      assessmentId: assessmentId,
      url: targetUrl,
      type: "full_report",
      status: "processing",
      requestedAt: new Date()
    });

    console.log(`[Stripe Webhook] Requesting full report for ${targetUrl}`);

    const reportResult = await siteInspectorService.requestFullReport(
      targetUrl,
      customerEmail || undefined,
      assessmentId
    );

    if (reportResult) {
      console.log(`[Stripe Webhook] Full report queued: ${reportResult.reportId}`);

      setTimeout(async () => {
        try {
          await checkAndDeliverReport(assessmentId, customerEmail || undefined, targetUrl);
        } catch (error) {
          console.error("[Stripe Webhook] Error in delayed report check:", error);
        }
      }, 3 * 60 * 1000);
    }

  } catch (error) {
    console.error("[Stripe Webhook] Error handling checkout completed:", error);
    throw error;
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[Stripe Webhook] Payment failed for ${paymentIntent.id}`);

  const sessions = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent.id,
    limit: 1
  });

  if (sessions.data.length > 0) {
    const session = sessions.data[0];
    
    await db.update(siteInspectorPurchases)
      .set({ status: "failed" })
      .where(eq(siteInspectorPurchases.stripeSessionId, session.id));
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
      console.log(`[Stripe Webhook] Sending full report email to ${email}`);
      
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
    console.error("[Stripe Webhook] Error checking/delivering report:", error);
  }
}

import { Router } from 'express';
import { SwipesBlueService } from '../services/swipesblue';
import { db } from '../db';
import { subscriptions } from '@shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

router.post('/api/webhooks/swipesblue', async (req, res) => {
  try {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const signature = req.headers['x-swipesblue-signature'] as string;

    if (!SwipesBlueService.verifyWebhookSignature(rawBody, signature)) {
      console.error('[SwipesBlue Webhook] Invalid signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { type, data } = event;

    console.log(`[SwipesBlue Webhook] Received event: ${type}`);

    switch (type) {
      case 'payment.success': {
        if (data.subscriptionId) {
          await db.update(subscriptions)
            .set({
              status: 'active',
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.swipesblueSubscriptionId, data.subscriptionId));
        }
        console.log(`[SwipesBlue Webhook] Payment succeeded for subscription ${data.subscriptionId}`);
        break;
      }

      case 'payment.failed': {
        if (data.subscriptionId) {
          await db.update(subscriptions)
            .set({
              status: 'past_due',
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.swipesblueSubscriptionId, data.subscriptionId));
        }
        console.log(`[SwipesBlue Webhook] Payment failed for subscription ${data.subscriptionId}`);
        break;
      }

      case 'subscription.cancelled': {
        if (data.subscriptionId) {
          await db.update(subscriptions)
            .set({
              status: 'cancelled',
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.swipesblueSubscriptionId, data.subscriptionId));
        }
        console.log(`[SwipesBlue Webhook] Subscription cancelled: ${data.subscriptionId}`);
        break;
      }

      case 'subscription.renewed': {
        if (data.subscriptionId) {
          await db.update(subscriptions)
            .set({
              status: 'active',
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.swipesblueSubscriptionId, data.subscriptionId));
        }
        console.log(`[SwipesBlue Webhook] Subscription renewed: ${data.subscriptionId}`);
        break;
      }

      default:
        console.log(`[SwipesBlue Webhook] Unhandled event type: ${type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('[SwipesBlue Webhook] Error:', error.message);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export { router as paymentWebhookRouter };

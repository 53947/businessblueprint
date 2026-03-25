import crypto from 'crypto';

const SWIPESBLUE_API_URL = process.env.SWIPESBLUE_API_URL || 'https://swipesblue.com/api/v1';
const SWIPESBLUE_API_KEY = process.env.SWIPESBLUE_API_KEY;
const SWIPESBLUE_MERCHANT_ID = process.env.SWIPESBLUE_MERCHANT_ID;

function headers() {
  return {
    'Authorization': `Bearer ${SWIPESBLUE_API_KEY}`,
    'X-Merchant-ID': SWIPESBLUE_MERCHANT_ID || '',
    'Content-Type': 'application/json',
  };
}

export const SwipesBlueService = {
  async createCustomer(params: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  }) {
    const response = await fetch(`${SWIPESBLUE_API_URL}/customers`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(params),
    });
    return response.json();
  },

  async createSubscription(params: {
    customerId: string;
    planAmount: string;
    billingCycle: string;
    paymentToken: string;
    planId: string;
    startDate?: string;
  }) {
    const response = await fetch(`${SWIPESBLUE_API_URL}/subscriptions`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(params),
    });
    return response.json();
  },

  async processTransaction(params: {
    paymentToken: string;
    amount: string;
    description: string;
    customerId?: string;
  }) {
    const response = await fetch(`${SWIPESBLUE_API_URL}/transactions`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(params),
    });
    return response.json();
  },

  async cancelSubscription(subscriptionId: string) {
    const response = await fetch(`${SWIPESBLUE_API_URL}/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: headers(),
    });
    return response.json();
  },

  async getSubscription(subscriptionId: string) {
    const response = await fetch(`${SWIPESBLUE_API_URL}/subscriptions/${subscriptionId}`, {
      headers: headers(),
    });
    return response.json();
  },

  verifyWebhookSignature(payload: string, signature: string): boolean {
    const webhookSecret = process.env.SWIPESBLUE_WEBHOOK_SECRET;
    if (!webhookSecret) return true;
    const expected = crypto.createHmac('sha256', webhookSecret).update(payload).digest('hex');
    return expected === signature;
  },
};

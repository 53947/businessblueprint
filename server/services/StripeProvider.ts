/**
 * StripeProvider - Stripe payment processing for BusinessBlueprint
 * TypeScript implementation
 */

import Stripe from 'stripe';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  amount?: number;
  status?: string;
  error?: string;
  provider: string;
  raw?: any;
}

export interface CustomerResult {
  success: boolean;
  customerId?: string;
  error?: string;
  provider: string;
  raw?: any;
}

export interface RefundResult {
  success: boolean;
  refundId?: string;
  transactionId?: string;
  amount?: number;
  status?: string;
  error?: string;
  provider: string;
  raw?: any;
}

export class StripeProvider {
  private stripe: Stripe;
  public readonly name = 'stripe';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Stripe API key is required');
    }
    
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-12-15.clover'
    });
  }

  /**
   * Process a one-time charge
   */
  async charge(params: {
    amount: number;
    customerId: string;
    source: string;
    description?: string;
    metadata?: Record<string, string>;
  }): Promise<PaymentResult> {
    try {
      const amountInCents = Math.round(params.amount * 100);
      
      const charge = await this.stripe.charges.create({
        amount: amountInCents,
        currency: 'usd',
        customer: params.customerId,
        source: params.source,
        description: params.description || '',
        metadata: params.metadata || {}
      });

      return {
        success: true,
        transactionId: charge.id,
        amount: charge.amount / 100,
        status: charge.status,
        provider: this.name,
        raw: charge
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe charge failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Refund a transaction
   */
  async refund(transactionId: string, amount?: number): Promise<RefundResult> {
    try {
      const refundData: Stripe.RefundCreateParams = {
        charge: transactionId
      };
      
      if (amount !== undefined) {
        refundData.amount = Math.round(amount * 100);
      }
      
      const refund = await this.stripe.refunds.create(refundData);

      return {
        success: true,
        refundId: refund.id,
        transactionId: refund.charge as string,
        amount: refund.amount / 100,
        status: refund.status || 'pending',
        provider: this.name,
        raw: refund
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe refund failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(params: {
    email: string;
    name: string;
    phone?: string;
    metadata?: Record<string, string>;
  }): Promise<CustomerResult> {
    try {
      const customer = await this.stripe.customers.create({
        email: params.email,
        name: params.name,
        phone: params.phone,
        metadata: params.metadata || {}
      });

      return {
        success: true,
        customerId: customer.id,
        provider: this.name,
        raw: customer
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe customer creation failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Update customer
   */
  async updateCustomer(customerId: string, updates: Stripe.CustomerUpdateParams): Promise<CustomerResult> {
    try {
      const customer = await this.stripe.customers.update(customerId, updates);

      return {
        success: true,
        customerId: customer.id,
        provider: this.name,
        raw: customer
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe customer update failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Delete customer
   */
  async deleteCustomer(customerId: string): Promise<CustomerResult> {
    try {
      const deleted = await this.stripe.customers.del(customerId);

      return {
        success: true,
        customerId: deleted.id,
        provider: this.name,
        raw: deleted
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe customer deletion failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Add payment method to customer
   */
  async addPaymentMethod(customerId: string, paymentMethodId: string) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId
      });

      return {
        success: true,
        paymentMethodId: paymentMethod.id,
        customerId: paymentMethod.customer as string,
        provider: this.name,
        raw: paymentMethod
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe payment method attachment failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Create payment intent (modern Stripe way)
   */
  async createPaymentIntent(params: {
    amount: number;
    customerId: string;
    metadata?: Record<string, string>;
  }) {
    try {
      const amountInCents = Math.round(params.amount * 100);
      
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        customer: params.customerId,
        metadata: params.metadata || {}
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        provider: this.name,
        raw: paymentIntent
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe payment intent creation failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Create a Stripe Checkout Session
   * Used for one-time purchases with hosted checkout
   */
  async createCheckoutSession(params: {
    priceInCents: number;
    productName: string;
    productDescription?: string;
    customerEmail?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: params.productName,
                description: params.productDescription,
              },
              unit_amount: params.priceInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        customer_email: params.customerEmail,
        metadata: params.metadata || {},
      });

      return {
        success: true,
        sessionId: session.id,
        url: session.url,
        provider: this.name,
        raw: session
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe checkout session creation failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Verify and retrieve a checkout session
   */
  async retrieveCheckoutSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent']
      });

      return {
        success: true,
        session,
        provider: this.name
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Stripe session retrieval failed: ${error.message}`,
        provider: this.name
      };
    }
  }

  /**
   * Construct and verify webhook event
   */
  constructWebhookEvent(payload: string | Buffer, signature: string, webhookSecret: string) {
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
}

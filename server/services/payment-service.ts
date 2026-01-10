/**
 * Payment Service - BusinessBlueprint Integration
 * 
 * Unified payment abstraction layer that supports multiple providers:
 * - Stripe (default)
 * - SwipesBlue (future)
 * 
 * Switch providers via PAYMENT_PROVIDER environment variable
 */

import { StripeProvider } from './StripeProvider';

type PaymentProviderType = 'stripe' | 'swipesblue';

interface PaymentProviderInterface {
  name: string;
  charge(params: ChargeParams): Promise<any>;
  refund(transactionId: string, amount?: number): Promise<any>;
  createCustomer(params: CustomerParams): Promise<any>;
  updateCustomer(customerId: string, updates: any): Promise<any>;
  deleteCustomer(customerId: string): Promise<any>;
  addPaymentMethod(customerId: string, paymentMethodId: string): Promise<any>;
  createPaymentIntent(params: PaymentIntentParams): Promise<any>;
  createCheckoutSession(params: CheckoutSessionParams): Promise<any>;
  retrieveCheckoutSession(sessionId: string): Promise<any>;
  constructWebhookEvent(payload: string | Buffer, signature: string, webhookSecret: string): any;
}

interface ChargeParams {
  amount: number;
  customerId: string;
  source: string;
  description?: string;
  metadata?: Record<string, string>;
}

interface CustomerParams {
  email: string;
  name: string;
  phone?: string;
  metadata?: Record<string, string>;
}

interface PaymentIntentParams {
  amount: number;
  customerId: string;
  metadata?: Record<string, string>;
}

interface CheckoutSessionParams {
  priceInCents: number;
  productName: string;
  productDescription?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

class PaymentService {
  private provider: PaymentProviderInterface;
  private providerType: PaymentProviderType;
  
  constructor() {
    this.providerType = (process.env.PAYMENT_PROVIDER || 'stripe') as PaymentProviderType;
    
    if (this.providerType === 'stripe') {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      
      if (!stripeKey) {
        throw new Error('STRIPE_SECRET_KEY not configured in environment');
      }
      
      this.provider = new StripeProvider(stripeKey);
    } else if (this.providerType === 'swipesblue') {
      throw new Error('SwipesBlue payment provider not yet configured. Set PAYMENT_PROVIDER=stripe or wait for SwipesBlue integration.');
    } else {
      throw new Error(`Unknown payment provider: ${this.providerType}. Valid options: stripe, swipesblue`);
    }
    
    console.log(`[PaymentService] Initialized with provider: ${this.providerType}`);
  }

  /**
   * Get the active provider name
   */
  getProviderName(): string {
    return this.provider.name;
  }

  /**
   * Get the active provider type
   */
  getProviderType(): PaymentProviderType {
    return this.providerType;
  }

  /**
   * Get supported payment methods for the provider
   */
  getSupportedMethods(): string[] {
    if (this.providerType === 'stripe') {
      return ['card', 'apple_pay', 'google_pay'];
    }
    return ['card'];
  }

  /**
   * Process a charge
   */
  async charge(params: ChargeParams) {
    return await this.provider.charge(params);
  }

  /**
   * Refund a transaction
   */
  async refund(transactionId: string, amount?: number) {
    return await this.provider.refund(transactionId, amount);
  }

  /**
   * Create a customer
   */
  async createCustomer(params: CustomerParams) {
    return await this.provider.createCustomer(params);
  }

  /**
   * Update a customer
   */
  async updateCustomer(customerId: string, updates: any) {
    return await this.provider.updateCustomer(customerId, updates);
  }

  /**
   * Delete a customer
   */
  async deleteCustomer(customerId: string) {
    return await this.provider.deleteCustomer(customerId);
  }

  /**
   * Add payment method to customer
   */
  async addPaymentMethod(customerId: string, paymentMethodId: string) {
    return await this.provider.addPaymentMethod(customerId, paymentMethodId);
  }

  /**
   * Create payment intent
   */
  async createPaymentIntent(params: PaymentIntentParams) {
    return await this.provider.createPaymentIntent(params);
  }

  /**
   * Create a Checkout Session
   */
  async createCheckoutSession(params: CheckoutSessionParams) {
    return await this.provider.createCheckoutSession(params);
  }

  /**
   * Retrieve a checkout session
   */
  async retrieveCheckoutSession(sessionId: string) {
    return await this.provider.retrieveCheckoutSession(sessionId);
  }

  /**
   * Verify and construct webhook event
   * Used by webhook handlers to verify incoming payment webhooks
   */
  verifyWebhook(payload: string | Buffer, signature: string): any {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.warn('[PaymentService] No webhook secret configured, processing without verification');
      if (typeof payload === 'string') {
        return JSON.parse(payload);
      }
      return JSON.parse(payload.toString());
    }
    
    return this.provider.constructWebhookEvent(payload, signature, webhookSecret);
  }
}

// Export singleton instance
export const paymentService = new PaymentService();

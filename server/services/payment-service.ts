/**
 * Payment Service - BusinessBlueprint Integration
 * 
 * Handles payment processing with Stripe (and later NMI)
 * Integrates with BusinessBlueprint CRM customer data
 */

import { StripeProvider } from './StripeProvider';

class PaymentService {
  private provider: StripeProvider;
  
  constructor() {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured in environment');
    }
    
    this.provider = new StripeProvider(stripeKey);
  }

  /**
   * Get the active provider name
   */
  getProviderName(): string {
    return this.provider.name;
  }

  /**
   * Process a charge
   */
  async charge(params: {
    amount: number;
    customerId: string;
    source: string;
    description?: string;
    metadata?: Record<string, string>;
  }) {
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
  async createCustomer(params: {
    email: string;
    name: string;
    phone?: string;
    metadata?: Record<string, string>;
  }) {
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
  async createPaymentIntent(params: {
    amount: number;
    customerId: string;
    metadata?: Record<string, string>;
  }) {
    return await this.provider.createPaymentIntent(params);
  }
}

// Export singleton instance
export const paymentService = new PaymentService();

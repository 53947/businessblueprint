import { URLSearchParams } from 'url';

export interface NMITransactionResponse {
  response: string; // 1 = approved, 2 = declined, 3 = error
  responsetext: string;
  authcode?: string;
  transactionid?: string;
  avsresponse?: string;
  cvvresponse?: string;
  orderid?: string;
  type?: string;
  response_code?: string;
}

export interface NMISubscriptionResponse {
  response: string;
  responsetext: string;
  subscription_id?: string;
  customer_vault_id?: string;
}

export interface SubscriptionRequest {
  paymentToken: string;
  planAmount: string;
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  planId: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  startDate?: string;
}

export class NMIService {
  private static readonly BASE_URL = 'https://secure.nmi.com/api/transact.php';
  private static readonly API_KEY = process.env.NMI_API_KEY;

  /**
   * Validate NMI configuration
   */
  static validateConfig(): void {
    if (!this.API_KEY) {
      throw new Error('NMI_API_KEY environment variable is required');
    }
  }
  
  /**
   * Log NMI configuration status at startup
   */
  static logConfigStatus(): void {
    console.log('NMI Payment Gateway:', {
      configured: !!this.API_KEY,
      apiKeyPresent: !!this.API_KEY,
      baseUrl: this.BASE_URL
    });
  }

  /**
   * Create a recurring subscription with NMI
   */
  static async createSubscription(request: SubscriptionRequest): Promise<NMISubscriptionResponse> {
    this.validateConfig();

    // Calculate billing frequency based on cycle
    const monthFrequency = this.getMonthlyFrequency(request.billingCycle);
    
    // Prepare subscription data
    const subscriptionData = new URLSearchParams({
      security_key: this.API_KEY!,
      recurring: 'add_subscription',
      payment_token: request.paymentToken,
      
      // Plan details
      plan_amount: request.planAmount,
      plan_payments: '0', // Unlimited payments
      month_frequency: monthFrequency.toString(),
      
      // Customer information
      first_name: request.customerData.firstName,
      last_name: request.customerData.lastName,
      email: request.customerData.email,
      phone: request.customerData.phone || '',
      address1: request.customerData.address || '',
      city: request.customerData.city || '',
      state: request.customerData.state || '',
      zip: request.customerData.zip || '',
      
      // Optional metadata
      orderid: request.planId,
      order_description: `Subscription: ${request.planId} (${request.billingCycle})`,
      
      // Start date (optional)
      ...(request.startDate && { start_date: request.startDate })
    });

    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: subscriptionData.toString(),
      });

      const responseText = await response.text();
      return this.parseNMIResponse(responseText) as NMISubscriptionResponse;
    } catch (error) {
      console.error('NMI Subscription creation failed:', error);
      throw new Error('Failed to create subscription with NMI');
    }
  }

  /**
   * Update an existing subscription
   */
  static async updateSubscription(
    subscriptionId: string, 
    updates: { planAmount?: string; }
  ): Promise<NMISubscriptionResponse> {
    this.validateConfig();

    const updateData = new URLSearchParams({
      security_key: this.API_KEY!,
      recurring: 'update_subscription',
      subscription_id: subscriptionId,
      ...(updates.planAmount && { plan_amount: updates.planAmount })
    });

    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: updateData.toString(),
      });

      const responseText = await response.text();
      return this.parseNMIResponse(responseText) as NMISubscriptionResponse;
    } catch (error) {
      console.error('NMI Subscription update failed:', error);
      throw new Error('Failed to update subscription with NMI');
    }
  }

  /**
   * Cancel a subscription
   */
  static async cancelSubscription(subscriptionId: string): Promise<NMISubscriptionResponse> {
    this.validateConfig();

    const cancelData = new URLSearchParams({
      security_key: this.API_KEY!,
      recurring: 'delete_subscription',
      subscription_id: subscriptionId
    });

    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: cancelData.toString(),
      });

      const responseText = await response.text();
      return this.parseNMIResponse(responseText) as NMISubscriptionResponse;
    } catch (error) {
      console.error('NMI Subscription cancellation failed:', error);
      throw new Error('Failed to cancel subscription with NMI');
    }
  }

  /**
   * Process a one-time transaction (for setup fees, etc.)
   */
  static async processTransaction(
    paymentToken: string,
    amount: string,
    orderDescription: string
  ): Promise<NMITransactionResponse> {
    this.validateConfig();

    const transactionData = new URLSearchParams({
      security_key: this.API_KEY!,
      type: 'sale',
      payment_token: paymentToken,
      amount: amount,
      order_description: orderDescription
    });

    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: transactionData.toString(),
      });

      const responseText = await response.text();
      return this.parseNMIResponse(responseText) as NMITransactionResponse;
    } catch (error) {
      console.error('NMI Transaction failed:', error);
      throw new Error('Failed to process transaction with NMI');
    }
  }

  /**
   * Get billing frequency in months for different cycles (NMI month_frequency parameter)
   */
  private static getMonthlyFrequency(cycle: 'monthly' | 'quarterly' | 'annual'): number {
    switch (cycle) {
      case 'monthly':
        return 1;
      case 'quarterly':
        return 3;
      case 'annual':
        return 12;
      default:
        return 1;
    }
  }

  /**
   * Parse NMI response string into object
   */
  private static parseNMIResponse(responseText: string): NMITransactionResponse | NMISubscriptionResponse {
    const params = new URLSearchParams(responseText);
    const result: any = {};

    params.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  }

  /**
   * Check if response indicates success
   */
  static isSuccessResponse(response: NMITransactionResponse | NMISubscriptionResponse): boolean {
    return response.response === '1';
  }

  /**
   * Get error message from response
   */
  static getErrorMessage(response: NMITransactionResponse | NMISubscriptionResponse): string {
    return response.responsetext || 'Unknown error occurred';
  }

  /**
   * Validate payment token format
   */
  static validatePaymentToken(token: string): boolean {
    // NMI payment tokens are typically 16-32 character alphanumeric strings
    return /^[a-zA-Z0-9]{16,32}$/.test(token);
  }
}
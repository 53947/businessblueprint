/**
 * Telnyx SMS Service
 * 
 * Handles SMS sending via Telnyx API
 * Cost: $0.004/message (50% cheaper than Twilio)
 * 
 * API Docs: https://developers.telnyx.com/docs/api/v2/messaging
 */

interface TelnyxSendSmsParams {
  to: string; // E.164 format: +15551234567
  from: string; // Your Telnyx phone number
  text: string; // Message body (160 chars = 1 segment)
}

interface TelnyxSmsResponse {
  data: {
    id: string;
    record_type: string;
    to: Array<{
      phone_number: string;
      status: string;
      carrier: string;
    }>;
    from: {
      phone_number: string;
    };
    text: string;
    cost: {
      amount: string;
      currency: string;
    };
    segments: number;
  };
}

class TelnyxService {
  private apiKey: string;
  private baseUrl = 'https://api.telnyx.com/v2';

  constructor() {
    this.apiKey = process.env.TELNYX_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ TELNYX_API_KEY not configured - SMS sending will fail');
    }
  }

  /**
   * Send SMS via Telnyx
   */
  async sendSms(params: TelnyxSendSmsParams): Promise<TelnyxSmsResponse> {
    if (!this.apiKey) {
      throw new Error('TELNYX_API_KEY not configured');
    }

    // Validate phone number format (E.164)
    if (!params.to.match(/^\+[1-9]\d{1,14}$/)) {
      throw new Error(`Invalid phone number format: ${params.to}. Must be E.164 format (e.g., +15551234567)`);
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: params.from,
        to: params.to,
        text: params.text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Telnyx API error: ${error.errors?.[0]?.detail || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Send bulk SMS (for campaigns)
   */
  async sendBulkSms(messages: TelnyxSendSmsParams[]): Promise<TelnyxSmsResponse[]> {
    // Telnyx doesn't have a bulk endpoint, so we send individually
    // TODO: Implement rate limiting and queue management
    const results = await Promise.allSettled(
      messages.map(msg => this.sendSms(msg))
    );

    return results
      .filter((r): r is PromiseFulfilledResult<TelnyxSmsResponse> => r.status === 'fulfilled')
      .map(r => r.value);
  }

  /**
   * Get message status (for delivery tracking)
   */
  async getMessageStatus(messageId: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('TELNYX_API_KEY not configured');
    }

    const response = await fetch(`${this.baseUrl}/messages/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get message status: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * List available phone numbers (for setup)
   */
  async listPhoneNumbers(): Promise<any> {
    if (!this.apiKey) {
      throw new Error('TELNYX_API_KEY not configured');
    }

    const response = await fetch(`${this.baseUrl}/phone_numbers`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to list phone numbers: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Calculate SMS cost (1 segment = $0.004)
   */
  calculateCost(messageBody: string): { segments: number; cost: number } {
    // Standard SMS: 160 chars per segment
    // Unicode (emojis): 70 chars per segment
    const hasUnicode = /[^\x00-\x7F]/.test(messageBody);
    const maxCharsPerSegment = hasUnicode ? 70 : 160;
    const segments = Math.ceil(messageBody.length / maxCharsPerSegment);
    const cost = segments * 0.004; // $0.004 per segment

    return { segments, cost };
  }

  /**
   * Validate phone number format
   */
  isValidPhoneNumber(phone: string): boolean {
    return /^\+[1-9]\d{1,14}$/.test(phone);
  }

  /**
   * Format phone number to E.164
   */
  formatPhoneNumber(phone: string, countryCode: string = '1'): string {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!digits.startsWith(countryCode)) {
      return `+${countryCode}${digits}`;
    }
    
    return `+${digits}`;
  }
}

// Singleton instance
export const telnyxService = new TelnyxService();

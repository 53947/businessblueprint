import crypto from "crypto";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { clients, inboxMessages, campaigns, dashboardAccess, clientAssessments } from "@shared/schema";
import { eq } from "drizzle-orm";

interface VendastaConfig {
  apiToken?: string;
  apiUser?: string;
  apiKey?: string;
  privateKey?: string;
  webhookSecret?: string;
  baseUrl: string;
}

interface VendastaClient {
  customerIdentifier: string;
  companyName: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  businessCategory?: string;
  enabledFeatures?: string;
  lastLoginTime?: string;
}

interface VendastaWebhookPayload {
  event: string;
  messageId: string;
  version: string;
  publishedDateTime: string;
  data: any;
}

export class VendastaIntegrationService {
  private config: VendastaConfig;

  constructor() {
    // Debug environment variables
    console.log('Environment check:', {
      VENDASTA_API_KEY_present: !!process.env.VENDASTA_API_KEY,
      VENDASTA_CLIENT_ID_present: !!process.env.VENDASTA_CLIENT_ID,
      VENDASTA_BASE_URL_present: !!process.env.VENDASTA_BASE_URL,
      VENDASTA_BASE_URL_value: process.env.VENDASTA_BASE_URL
    });
    
    this.config = {
      apiToken: process.env.VENDASTA_API_TOKEN,
      apiUser: process.env.VENDASTA_CLIENT_ID || "", 
      apiKey: process.env.VENDASTA_API_KEY || "",
      privateKey: process.env.VENDASTA_API_KEY || "", // Service account private key
      webhookSecret: process.env.VENDASTA_WEBHOOK_SECRET,
      baseUrl: "https://business-center-api.vendasta.com" // Correct Vendasta Business Center API URL
    };
    
    console.log('Vendasta config initialized:', {
      hasApiKey: !!this.config.apiKey,
      hasApiUser: !!this.config.apiUser,
      baseUrl: this.config.baseUrl,
      apiKeyStartsWith: this.config.apiKey ? this.config.apiKey.substring(0, 10) + '...' : 'none'
    });
  }

  /**
   * Generate JWT token for service account authentication
   */
  private generateServiceAccountToken(): string | null {
    try {
      if (!this.config.privateKey || !this.config.apiUser) {
        console.log('Missing private key or API user for service account authentication');
        return null;
      }

      // Check if the private key is in PEM format
      if (!this.config.privateKey.includes('-----BEGIN')) {
        console.log('Private key does not appear to be in PEM format');
        return null;
      }

      const now = Math.floor(Date.now() / 1000);
      const payload = {
        iss: this.config.apiUser, // Service account email/identifier
        sub: this.config.apiUser,
        aud: 'https://business-center-api.vendasta.com',
        iat: now,
        exp: now + 3600, // 1 hour expiration
        scope: 'https://business-center-api.vendasta.com'
      };

      const token = jwt.sign(payload, this.config.privateKey, {
        algorithm: 'RS256',
        keyid: 'vendasta-service-account'
      });

      console.log('Generated JWT token for service account authentication');
      return token;
    } catch (error) {
      console.error('Error generating service account token:', error);
      return null;
    }
  }

  /**
   * Verify webhook signature for security
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.config.webhookSecret || !signature) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha1', this.config.webhookSecret)
      .update(payload.trim())
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Fetch client data from Vendasta API
   */
  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Try service account JWT authentication first
    const serviceToken = this.generateServiceAccountToken();
    if (serviceToken) {
      headers['Authorization'] = `Bearer ${serviceToken}`;
      return headers;
    }

    // Fallback to API token if available
    if (this.config.apiToken) {
      headers['Authorization'] = `Bearer ${this.config.apiToken}`;
    }

    return headers;
  }

  private getAuthUrl(endpoint: string): string {
    // For service account authentication, we use headers instead of query parameters
    const baseUrl = this.config.baseUrl;
    console.log(`Building URL with baseUrl: ${baseUrl}, endpoint: ${endpoint}`);
    
    // Check if we can use service account authentication
    const serviceToken = this.generateServiceAccountToken();
    if (serviceToken) {
      console.log('Using service account JWT authentication via headers');
      return `${baseUrl}${endpoint}`;
    }

    // Fallback to API token
    if (this.config.apiToken) {
      return `${baseUrl}${endpoint}`;
    }
    
    // Legacy API key method (likely won't work with service accounts)
    const separator = endpoint.includes('?') ? '&' : '?';
    const apiKeyEncoded = this.config.apiKey ? encodeURIComponent(this.config.apiKey) : "";
    const fullUrl = `${baseUrl}${endpoint}${separator}apiUser=${this.config.apiUser}&apiKey=${apiKeyEncoded}`;
    console.log(`Built authenticated URL to: ${baseUrl}${endpoint}${separator}apiUser=${this.config.apiUser}&apiKey=[REDACTED]`);
    return fullUrl;
  }

  async fetchClientData(customerIdentifier: string): Promise<VendastaClient | null> {
    try {
      // Test with a simple ping endpoint first
      if (customerIdentifier === "test") {
        return this.testConnection();
      }
      
      // Use correct Vendasta Business Center API endpoint structure
      const url = this.getAuthUrl(`/api/v3/account/${customerIdentifier}`);
      
      console.log(`Attempting Vendasta API call to: ${this.config.baseUrl}/api/v3/account/${customerIdentifier} [authenticated]`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        console.error(`Vendasta API error: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.error('Response body:', errorText);
        return null;
      }

      const clientData = await response.json();
      return this.transformVendastaClient(clientData);
    } catch (error) {
      console.error('Error fetching Vendasta client data:', error);
      return null;
    }
  }
  
  private async testConnection(): Promise<VendastaClient | null> {
    try {
      console.log('Testing Vendasta Business Center API:', {
        baseUrl: this.config.baseUrl,
        hasApiUser: !!this.config.apiUser,
        hasApiKey: !!this.config.apiKey,
        apiUserSample: this.config.apiUser ? this.config.apiUser.substring(0, 10) + '...' : 'none'
      });

      // Try Vendasta Business Center API endpoints based on testing results
      const endpoints = [
        '/api/v3/account/create', // Found working endpoint - returns proper 401 auth error
        '/api/v3/account',       // Try account list  
        '/account',              // Fallback basic endpoint
        '/account/list'          // Fallback list endpoint
      ];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Testing endpoint: ${this.config.baseUrl}${endpoint}`);
          const testUrl = this.getAuthUrl(endpoint);
          
          const response = await fetch(testUrl, {
            method: 'GET',
            headers: this.getAuthHeaders()
          });
          
          console.log(`Endpoint ${endpoint} response: ${response.status} ${response.statusText}`);
          
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ SUCCESS with endpoint ${endpoint}`);
            console.log('Sample response data:', JSON.stringify(data).substring(0, 300));
            
            return {
              customerIdentifier: 'test-success',
              companyName: 'Vendasta API Connection Success',
              email: 'test@vendasta.com'
            };
          } else if (response.status === 401) {
            console.log(`🔐 Authentication issue for ${endpoint} (but endpoint exists!)`);
            try {
              const errorData = await response.json();
              console.log('Auth response:', errorData);
              if (errorData.message === "Invalid apiUser/apiKey combination.") {
                console.log('✅ API endpoint confirmed working - authentication needs configuration');
                // This is actually SUCCESS - the API is responding correctly
                return {
                  customerIdentifier: 'auth-config-needed',
                  companyName: 'API Connection Established - Authentication Setup Required',
                  email: 'config@vendasta.com'
                };
              }
            } catch (e) {
              const errorText = await response.text();
              console.log('Auth error details:', errorText.substring(0, 200));
            }
          } else if (response.status === 404) {
            console.log(`⚠️  Endpoint ${endpoint} not found (404), trying next...`);
          } else if (response.status === 403) {
            console.log(`❌ Access forbidden for ${endpoint} (403)`);
          } else {
            console.log(`⚠️  Endpoint ${endpoint} returned ${response.status}, trying next...`);
            const errorText = await response.text();
            console.log('Response:', errorText.substring(0, 200));
          }
        } catch (endpointError) {
          console.log(`❌ Network error for ${endpoint}:`, endpointError.message);
        }
      }
      
      console.log('❌ All endpoints failed - API connection could not be established');
      return null;
      
    } catch (error) {
      console.error('Test connection error:', error);
      return null;
    }
  }

  /**
   * Sync client data from Vendasta to our database
   */
  async syncClientData(vendastaClient: VendastaClient): Promise<number | null> {
    try {
      // Check if client exists
      const [existingClient] = await db
        .select()
        .from(clients)
        .where(eq(clients.vendastaId, vendastaClient.customerIdentifier));

      if (existingClient) {
        // Update existing client
        await db
          .update(clients)
          .set({
            companyName: vendastaClient.companyName,
            email: vendastaClient.email,
            phone: vendastaClient.phone,
            website: vendastaClient.website,
            address: vendastaClient.address,
            businessCategory: vendastaClient.businessCategory,
            enabledFeatures: vendastaClient.enabledFeatures,
            lastLoginTime: vendastaClient.lastLoginTime ? new Date(vendastaClient.lastLoginTime) : null,
            updatedAt: new Date(),
          })
          .where(eq(clients.vendastaId, vendastaClient.customerIdentifier));

        return existingClient.id;
      } else {
        // Create new client
        const [newClient] = await db
          .insert(clients)
          .values({
            vendastaId: vendastaClient.customerIdentifier,
            companyName: vendastaClient.companyName,
            email: vendastaClient.email,
            phone: vendastaClient.phone,
            website: vendastaClient.website,
            address: vendastaClient.address,
            businessCategory: vendastaClient.businessCategory,
            enabledFeatures: vendastaClient.enabledFeatures,
            lastLoginTime: vendastaClient.lastLoginTime ? new Date(vendastaClient.lastLoginTime) : null,
          })
          .returning();

        return newClient.id;
      }
    } catch (error) {
      console.error('Error syncing client data:', error);
      return null;
    }
  }

  /**
   * Handle incoming webhook from Vendasta
   */
  async handleWebhook(payload: VendastaWebhookPayload): Promise<boolean> {
    try {
      switch (payload.event) {
        case 'customer.created':
        case 'customer.updated':
          return await this.handleClientUpdate(payload.data);
        
        case 'form.submitted':
          return await this.handleFormSubmission(payload.data);
        
        case 'message.received':
          return await this.handleInboxMessage(payload.data);
        
        default:
          console.log(`Unhandled webhook event: ${payload.event}`);
          return true;
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
      return false;
    }
  }

  /**
   * Create secure JWT dashboard access for client
   */
  async createDashboardAccess(clientId: number, vendastaDashboardUrl: string, vendastaId?: string): Promise<string | null> {
    try {
      const { jwtService } = await import('./jwt');
      
      if (vendastaId) {
        // Create Vendasta-specific dashboard token
        return await jwtService.createVendastaDashboardToken(clientId, vendastaId, vendastaDashboardUrl);
      } else {
        // Create general dashboard token
        return await jwtService.createDashboardToken(clientId);
      }
    } catch (error) {
      console.error('Error creating dashboard access:', error);
      return null;
    }
  }

  /**
   * Link assessment to client
   */
  async linkAssessmentToClient(clientId: number, assessmentId: number): Promise<boolean> {
    try {
      await db.insert(clientAssessments).values({
        clientId,
        assessmentId,
      });
      return true;
    } catch (error) {
      console.error('Error linking assessment to client:', error);
      return false;
    }
  }

  /**
   * Get client data for Campaign Pro
   */
  async getClientCampaignData(clientId: number) {
    try {
      // Get client info
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, clientId));

      if (!client) return null;

      // Get recent inbox messages for context
      const messages = await db
        .select()
        .from(inboxMessages)
        .where(eq(inboxMessages.clientId, clientId))
        .orderBy(inboxMessages.timestamp)
        .limit(50);

      // Get campaign history
      const campaignHistory = await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.clientId, clientId))
        .orderBy(campaigns.createdAt)
        .limit(20);

      return {
        client,
        recentMessages: messages,
        campaignHistory,
      };
    } catch (error) {
      console.error('Error getting client campaign data:', error);
      return null;
    }
  }

  private transformVendastaClient(data: any): VendastaClient {
    return {
      customerIdentifier: data.customerIdentifier || data.srid,
      companyName: data.companyName,
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: this.formatAddress(data),
      businessCategory: data.businessCategory,
      enabledFeatures: data.enabledFeatures,
      lastLoginTime: data.lastLoginTime,
    };
  }

  private formatAddress(data: any): string {
    const parts = [
      data.address,
      data.city,
      data.province || data.state,
      data.postalCode || data.zipCode,
      data.country
    ].filter(Boolean);
    
    return parts.join(', ');
  }

  private async handleClientUpdate(data: any): Promise<boolean> {
    const vendastaClient = this.transformVendastaClient(data);
    const clientId = await this.syncClientData(vendastaClient);
    return clientId !== null;
  }

  private async handleFormSubmission(data: any): Promise<boolean> {
    // Handle form submission from embedded Vendasta forms
    // This would trigger when someone fills out a form on a client's website
    try {
      // Extract form data and create/update client
      const vendastaClient = this.transformVendastaClient(data);
      await this.syncClientData(vendastaClient);
      
      console.log(`Form submission processed for: ${vendastaClient.companyName}`);
      return true;
    } catch (error) {
      console.error('Error handling form submission:', error);
      return false;
    }
  }

  private async handleInboxMessage(data: any): Promise<boolean> {
    // Handle incoming messages for Campaign Pro
    try {
      // Find the client by vendasta ID
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.vendastaId, data.customerIdentifier));

      if (!client) {
        console.log(`Client not found for message: ${data.customerIdentifier}`);
        return false;
      }

      // Store the message
      await db.insert(inboxMessages).values({
        clientId: client.id,
        messageType: data.messageType || 'email',
        content: data.content || data.message,
        sender: data.sender || data.from,
        recipient: data.recipient || data.to,
        platform: data.platform || 'vendasta',
        timestamp: new Date(data.timestamp || Date.now()),
        sentiment: data.sentiment || 'neutral',
      });

      console.log(`Message stored for client: ${client.companyName}`);
      return true;
    } catch (error) {
      console.error('Error handling inbox message:', error);
      return false;
    }
  }
}

export const vendastaService = new VendastaIntegrationService();
import crypto from "crypto";
import { db } from "../db";
import { clients, inboxMessages, campaigns, dashboardAccess, clientAssessments } from "@shared/schema";
import { eq } from "drizzle-orm";

interface VendastaConfig {
  apiToken?: string;
  apiUser?: string;
  apiKey?: string;
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
    this.config = {
      apiToken: process.env.VENDASTA_API_TOKEN,
      apiUser: process.env.VENDASTA_API_USER || "",
      apiKey: process.env.VENDASTA_API_KEY || "",
      webhookSecret: process.env.VENDASTA_WEBHOOK_SECRET,
      baseUrl: process.env.VENDASTA_BASE_URL || "https://prod-api.vendasta.com"
    };
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

    if (this.config.apiToken) {
      headers['Authorization'] = `Bearer ${this.config.apiToken}`;
    }

    return headers;
  }

  private getAuthUrl(endpoint: string): string {
    if (this.config.apiToken) {
      return `${this.config.baseUrl}${endpoint}`;
    } else {
      const separator = endpoint.includes('?') ? '&' : '?';
      return `${this.config.baseUrl}${endpoint}${separator}apiUser=${this.config.apiUser}&apiKey=${this.config.apiKey}`;
    }
  }

  async fetchClientData(customerIdentifier: string): Promise<VendastaClient | null> {
    try {
      const url = this.getAuthUrl(`/customer/${customerIdentifier}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        console.error(`Vendasta API error: ${response.status} ${response.statusText}`);
        return null;
      }

      const clientData = await response.json();
      return this.transformVendastaClient(clientData);
    } catch (error) {
      console.error('Error fetching Vendasta client data:', error);
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
   * Create dashboard access for client
   */
  async createDashboardAccess(clientId: number, vendastaDashboardUrl: string): Promise<string | null> {
    try {
      const accessToken = crypto.randomBytes(32).toString('hex');
      
      await db.insert(dashboardAccess).values({
        clientId,
        accessToken,
        vendastaDashboardUrl,
        isActive: true,
      });

      return accessToken;
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
import {
  assessments,
  recommendations,
  clients,
  inboxMessages,
  campaigns,
  clientAssessments,
  type Assessment,
  type InsertAssessment,
  type Recommendation,
  type InsertRecommendation,
  type Client,
  type InsertClient,
  type InboxMessage,
  type InsertInboxMessage,
  type Campaign,
  type InsertCampaign,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Assessment operations
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  updateAssessment(id: number, data: Partial<Assessment>): Promise<Assessment>;
  getAssessmentsByEmail(email: string): Promise<Assessment[]>;
  
  // Recommendation operations
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  getRecommendationsByAssessmentId(assessmentId: number): Promise<Recommendation[]>;

  // Client operations
  createClient(client: InsertClient): Promise<Client>;
  getClient(id: number): Promise<Client | undefined>;
  getClientByVendastaId(vendastaId: string): Promise<Client | undefined>;
  updateClient(id: number, data: Partial<Client>): Promise<Client>;
  getClientsByEmail(email: string): Promise<Client[]>;

  // Inbox operations for Campaign Pro
  createInboxMessage(message: InsertInboxMessage): Promise<InboxMessage>;
  getClientMessages(clientId: number, limit?: number): Promise<InboxMessage[]>;
  getMessagesByClient(clientId: number): Promise<InboxMessage[]>;
  markMessageRead(messageId: number): Promise<void>;

  // Campaign operations
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getClientCampaigns(clientId: number): Promise<Campaign[]>;
  getCampaignsByClient(clientId: number): Promise<Campaign[]>;
  updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign>;

  // Link operations
  linkAssessmentToClient(clientId: number, assessmentId: number): Promise<void>;
  getClientAssessments(clientId: number): Promise<Assessment[]>;
}

export class DatabaseStorage implements IStorage {
  async createAssessment(assessmentData: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db
      .insert(assessments)
      .values(assessmentData)
      .returning();
    return assessment;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, id));
    return assessment;
  }

  async updateAssessment(id: number, data: Partial<Assessment>): Promise<Assessment> {
    const [assessment] = await db
      .update(assessments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(assessments.id, id))
      .returning();
    return assessment;
  }

  async getAssessmentsByEmail(email: string): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .where(eq(assessments.email, email))
      .orderBy(desc(assessments.createdAt));
  }

  async createRecommendation(recommendationData: InsertRecommendation): Promise<Recommendation> {
    const [recommendation] = await db
      .insert(recommendations)
      .values(recommendationData)
      .returning();
    return recommendation;
  }

  async getRecommendationsByAssessmentId(assessmentId: number): Promise<Recommendation[]> {
    return await db
      .select()
      .from(recommendations)
      .where(eq(recommendations.assessmentId, assessmentId));
  }

  // Client operations
  async createClient(clientData: InsertClient): Promise<Client> {
    const [client] = await db
      .insert(clients)
      .values(clientData)
      .returning();
    return client;
  }

  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.id, id));
    return client || undefined;
  }

  async getClientByVendastaId(vendastaId: string): Promise<Client | undefined> {
    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.vendastaId, vendastaId));
    return client || undefined;
  }

  async updateClient(id: number, data: Partial<Client>): Promise<Client> {
    const [client] = await db
      .update(clients)
      .set(data)
      .where(eq(clients.id, id))
      .returning();
    return client;
  }

  async getClientsByEmail(email: string): Promise<Client[]> {
    return await db
      .select()
      .from(clients)
      .where(eq(clients.email, email));
  }

  // Inbox operations for Campaign Pro
  async createInboxMessage(messageData: InsertInboxMessage): Promise<InboxMessage> {
    const [message] = await db
      .insert(inboxMessages)
      .values(messageData)
      .returning();
    return message;
  }

  async getClientMessages(clientId: number, limit: number = 50): Promise<InboxMessage[]> {
    return await db
      .select()
      .from(inboxMessages)
      .where(eq(inboxMessages.clientId, clientId))
      .orderBy(desc(inboxMessages.timestamp))
      .limit(limit);
  }

  async markMessageRead(messageId: number): Promise<void> {
    await db
      .update(inboxMessages)
      .set({ isRead: true })
      .where(eq(inboxMessages.id, messageId));
  }

  // Campaign operations
  async createCampaign(campaignData: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db
      .insert(campaigns)
      .values(campaignData)
      .returning();
    return campaign;
  }

  async getClientCampaigns(clientId: number): Promise<Campaign[]> {
    return await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.clientId, clientId))
      .orderBy(desc(campaigns.createdAt));
  }

  async getCampaignsByClient(clientId: number): Promise<Campaign[]> {
    return this.getClientCampaigns(clientId);
  }

  async getMessagesByClient(clientId: number): Promise<InboxMessage[]> {
    return this.getClientMessages(clientId);
  }

  async updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign> {
    const [campaign] = await db
      .update(campaigns)
      .set(data)
      .where(eq(campaigns.id, id))
      .returning();
    return campaign;
  }

  // Link operations
  async linkAssessmentToClient(clientId: number, assessmentId: number): Promise<void> {
    await db.insert(clientAssessments).values({
      clientId,
      assessmentId,
    });
  }

  async getClientAssessments(clientId: number): Promise<Assessment[]> {
    const result = await db
      .select({ assessment: assessments })
      .from(clientAssessments)
      .innerJoin(assessments, eq(clientAssessments.assessmentId, assessments.id))
      .where(eq(clientAssessments.clientId, clientId));
    
    return result.map(row => row.assessment);
  }
}

export const storage = new DatabaseStorage();

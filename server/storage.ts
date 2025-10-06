import {
  assessments,
  recommendations,
  clients,
  inboxMessages,
  campaigns,
  clientAssessments,
  sendContacts,
  sendLists,
  sendListContacts,
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
  type SendContact,
  type InsertSendContact,
  type SendList,
  type InsertSendList,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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

  // /send Contact operations
  createSendContact(contact: InsertSendContact): Promise<SendContact>;
  getSendContact(id: number): Promise<SendContact | undefined>;
  getSendContactsByClient(clientId: number): Promise<SendContact[]>;
  updateSendContact(id: number, data: Partial<SendContact>): Promise<SendContact>;
  deleteSendContact(id: number): Promise<void>;
  
  // /send List operations
  createSendList(list: InsertSendList): Promise<SendList>;
  getSendList(id: number): Promise<SendList | undefined>;
  getSendListsByClient(clientId: number): Promise<SendList[]>;
  updateSendList(id: number, data: Partial<SendList>): Promise<SendList>;
  deleteSendList(id: number): Promise<void>;
  
  // /send List-Contact operations
  addContactToList(listId: number, contactId: number): Promise<void>;
  removeContactFromList(listId: number, contactId: number): Promise<void>;
  getListContacts(listId: number): Promise<SendContact[]>;
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

  // /send Contact operations
  async createSendContact(contactData: InsertSendContact): Promise<SendContact> {
    const [contact] = await db
      .insert(sendContacts)
      .values(contactData)
      .returning();
    return contact;
  }

  async getSendContact(id: number): Promise<SendContact | undefined> {
    const [contact] = await db
      .select()
      .from(sendContacts)
      .where(eq(sendContacts.id, id));
    return contact;
  }

  async getSendContactsByClient(clientId: number): Promise<SendContact[]> {
    return await db
      .select()
      .from(sendContacts)
      .where(eq(sendContacts.clientId, clientId))
      .orderBy(desc(sendContacts.createdAt));
  }

  async updateSendContact(id: number, data: Partial<SendContact>): Promise<SendContact> {
    const [contact] = await db
      .update(sendContacts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(sendContacts.id, id))
      .returning();
    return contact;
  }

  async deleteSendContact(id: number): Promise<void> {
    await db
      .delete(sendContacts)
      .where(eq(sendContacts.id, id));
  }

  // /send List operations
  async createSendList(listData: InsertSendList): Promise<SendList> {
    const [list] = await db
      .insert(sendLists)
      .values(listData)
      .returning();
    return list;
  }

  async getSendList(id: number): Promise<SendList | undefined> {
    const [list] = await db
      .select()
      .from(sendLists)
      .where(eq(sendLists.id, id));
    return list;
  }

  async getSendListsByClient(clientId: number): Promise<SendList[]> {
    return await db
      .select()
      .from(sendLists)
      .where(eq(sendLists.clientId, clientId))
      .orderBy(desc(sendLists.createdAt));
  }

  async updateSendList(id: number, data: Partial<SendList>): Promise<SendList> {
    const [list] = await db
      .update(sendLists)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(sendLists.id, id))
      .returning();
    return list;
  }

  async deleteSendList(id: number): Promise<void> {
    await db
      .delete(sendLists)
      .where(eq(sendLists.id, id));
  }

  // /send List-Contact operations
  async addContactToList(listId: number, contactId: number): Promise<void> {
    await db
      .insert(sendListContacts)
      .values({ listId, contactId })
      .onConflictDoNothing();
  }

  async removeContactFromList(listId: number, contactId: number): Promise<void> {
    await db
      .delete(sendListContacts)
      .where(and(
        eq(sendListContacts.listId, listId),
        eq(sendListContacts.contactId, contactId)
      ));
  }

  async getListContacts(listId: number): Promise<SendContact[]> {
    const result = await db
      .select({ contact: sendContacts })
      .from(sendListContacts)
      .innerJoin(sendContacts, eq(sendListContacts.contactId, sendContacts.id))
      .where(eq(sendListContacts.listId, listId));
    
    return result.map(row => row.contact);
  }
}

export const storage = new DatabaseStorage();

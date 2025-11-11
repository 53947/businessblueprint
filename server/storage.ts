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
  brandAssets,
  users,
  magicLinkTokens,
  subscriptions,
  subscriptionPlans,
  subscriptionAddons,
  subscriptionAddonSelections,
  billingHistory,
  accountStatusHistory,
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
  type BrandAsset,
  type InsertBrandAsset,
  type User,
  type UpsertUser,
  type MagicLinkToken,
  type InsertMagicLinkToken,
  type Subscription,
  type SubscriptionPlan,
  type SubscriptionAddon,
  type SubscriptionAddonSelection,
  type BillingHistory,
  type AccountStatusHistory,
  type InsertAccountStatusHistory,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Typed responses for joined subscription data
export interface SubscriptionWithDetails {
  subscription: Subscription;
  client: Client;
  plan: SubscriptionPlan;
  addons: Array<{
    addon: SubscriptionAddon;
    selection: SubscriptionAddonSelection;
  }>;
  billingHistory?: BillingHistory[];
}

export interface ClientSubscriptionView {
  subscription: Subscription;
  plan: SubscriptionPlan;
  addons: Array<{
    addon: SubscriptionAddon;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
  }>;
  nextBillingDate: Date | null;
  lastPaymentDate: Date | null;
}

// Valid account status values
export type AccountStatus = 'active' | 'suspended' | 'inactive' | 'pending' | 'banned';

export interface IStorage {
  // User operations - Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Assessment operations
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAllAssessments(): Promise<Assessment[]>;
  updateAssessment(id: number, data: Partial<Assessment>): Promise<Assessment>;
  getAssessmentsByEmail(email: string): Promise<Assessment[]>;
  
  // Recommendation operations
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  getRecommendationsByAssessmentId(assessmentId: number): Promise<Recommendation[]>;

  // Client operations
  createClient(client: InsertClient): Promise<Client>;
  getClient(id: number): Promise<Client | undefined>;
  getAllClients(): Promise<Client[]>;
  getClientByExternalId(externalId: string): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  updateClient(id: number, data: Partial<Client>): Promise<Client>;
  getClientsByEmail(email: string): Promise<Client[]>;

  // Magic link token operations
  createMagicLinkToken(token: InsertMagicLinkToken): Promise<MagicLinkToken>;
  getMagicLinkToken(token: string): Promise<MagicLinkToken | undefined>;
  markTokenAsUsed(token: string): Promise<void>;
  cleanupExpiredTokens(): Promise<void>;

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
  
  // Brand assets operations
  createBrandAsset(asset: InsertBrandAsset): Promise<BrandAsset>;
  getAllBrandAssets(): Promise<BrandAsset[]>;
  getBrandAssetsByType(type: string): Promise<BrandAsset[]>;
  getBrandAsset(id: number): Promise<BrandAsset | undefined>;
  deleteBrandAsset(id: number): Promise<void>;

  // Subscription & Billing operations
  getAllSubscriptions(): Promise<SubscriptionWithDetails[]>; // Returns all subscriptions with client & plan info
  getClientSubscription(clientId: number): Promise<ClientSubscriptionView | undefined>; // Returns client's subscription with plan & addons
  getClientBillingHistory(clientId: number, limit?: number): Promise<BillingHistory[]>;
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getAllSubscriptionAddons(): Promise<SubscriptionAddon[]>;
  
  // Account status management
  updateClientAccountStatus(clientId: number, newStatus: AccountStatus, reason?: string | null, changedBy?: number | null): Promise<Client>;
  recordAccountStatusChange(record: InsertAccountStatusHistory): Promise<AccountStatusHistory>;
  getClientAccountStatusHistory(clientId: number): Promise<AccountStatusHistory[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

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

  async getAllAssessments(): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .orderBy(desc(assessments.createdAt));
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

  async getClientByExternalId(externalId: string): Promise<Client | undefined> {
    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.externalId, externalId));
    return client || undefined;
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.email, email));
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

  async getAllClients(): Promise<Client[]> {
    return await db
      .select()
      .from(clients)
      .orderBy(desc(clients.createdAt));
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

  // Brand asset operations
  async createBrandAsset(assetData: InsertBrandAsset): Promise<BrandAsset> {
    const [asset] = await db
      .insert(brandAssets)
      .values(assetData)
      .returning();
    return asset;
  }

  async getAllBrandAssets(): Promise<BrandAsset[]> {
    return await db
      .select()
      .from(brandAssets)
      .orderBy(desc(brandAssets.createdAt));
  }

  async getBrandAssetsByType(type: string): Promise<BrandAsset[]> {
    return await db
      .select()
      .from(brandAssets)
      .where(eq(brandAssets.type, type))
      .orderBy(desc(brandAssets.createdAt));
  }

  async getBrandAsset(id: number): Promise<BrandAsset | undefined> {
    const [asset] = await db
      .select()
      .from(brandAssets)
      .where(eq(brandAssets.id, id));
    return asset;
  }

  async updateBrandAsset(id: number, data: Partial<BrandAsset>): Promise<BrandAsset> {
    const [asset] = await db
      .update(brandAssets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(brandAssets.id, id))
      .returning();
    return asset;
  }

  async deleteBrandAsset(id: number): Promise<void> {
    await db
      .delete(brandAssets)
      .where(eq(brandAssets.id, id));
  }

  // Magic link token operations
  async createMagicLinkToken(tokenData: InsertMagicLinkToken): Promise<MagicLinkToken> {
    const [token] = await db
      .insert(magicLinkTokens)
      .values(tokenData)
      .returning();
    return token;
  }

  async getMagicLinkToken(token: string): Promise<MagicLinkToken | undefined> {
    const [magicToken] = await db
      .select()
      .from(magicLinkTokens)
      .where(eq(magicLinkTokens.token, token));
    return magicToken;
  }

  async markTokenAsUsed(token: string): Promise<void> {
    await db
      .update(magicLinkTokens)
      .set({ used: true, usedAt: new Date() })
      .where(eq(magicLinkTokens.token, token));
  }

  async cleanupExpiredTokens(): Promise<void> {
    const now = new Date();
    await db
      .delete(magicLinkTokens)
      .where(
        sql`${magicLinkTokens.expiresAt} < ${now}`
      );
  }

  // Subscription & Billing operations
  async getAllSubscriptions(): Promise<SubscriptionWithDetails[]> {
    const allSubscriptions = await db
      .select()
      .from(subscriptions)
      .orderBy(desc(subscriptions.createdAt));

    const result: SubscriptionWithDetails[] = [];

    for (const subscription of allSubscriptions) {
      // Get client
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, subscription.clientId!));

      // Get plan
      const [plan] = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.id, subscription.planId!));

      // Get addon selections
      const addonSelections = await db
        .select()
        .from(subscriptionAddonSelections)
        .where(eq(subscriptionAddonSelections.subscriptionId, subscription.id));

      // Get addon details
      const addons = [];
      for (const selection of addonSelections) {
        const [addon] = await db
          .select()
          .from(subscriptionAddons)
          .where(eq(subscriptionAddons.id, selection.addonId!));
        if (addon) {
          addons.push({ addon, selection });
        }
      }

      // Get billing history (last 6 invoices)
      const billing = await db
        .select()
        .from(billingHistory)
        .where(eq(billingHistory.subscriptionId, subscription.id))
        .orderBy(desc(billingHistory.billingDate))
        .limit(6);

      if (client && plan) {
        result.push({
          subscription,
          client,
          plan,
          addons,
          billingHistory: billing,
        });
      }
    }

    return result;
  }

  async getClientSubscription(clientId: number): Promise<ClientSubscriptionView | undefined> {
    // Get client's active subscription
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.clientId, clientId),
          eq(subscriptions.status, 'active')
        )
      )
      .limit(1);

    if (!subscription) {
      return undefined;
    }

    // Get plan
    const [plan] = await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.id, subscription.planId!));

    if (!plan) {
      return undefined;
    }

    // Get addon selections
    const addonSelections = await db
      .select()
      .from(subscriptionAddonSelections)
      .where(eq(subscriptionAddonSelections.subscriptionId, subscription.id));

    // Get addon details
    const addons = [];
    for (const selection of addonSelections) {
      const [addon] = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.id, selection.addonId!));
      if (addon) {
        addons.push({
          addon,
          quantity: selection.quantity ?? 1,
          unitPrice: selection.unitPrice ?? '0.00',
          totalPrice: selection.totalPrice ?? '0.00',
        });
      }
    }

    return {
      subscription,
      plan,
      addons,
      nextBillingDate: subscription.nextPaymentDate,
      lastPaymentDate: subscription.lastPaymentDate,
    };
  }

  async getClientBillingHistory(clientId: number, limit: number = 12): Promise<BillingHistory[]> {
    // Get client's subscription
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.clientId, clientId))
      .limit(1);

    if (!subscription) {
      return [];
    }

    return await db
      .select()
      .from(billingHistory)
      .where(eq(billingHistory.subscriptionId, subscription.id))
      .orderBy(desc(billingHistory.billingDate))
      .limit(limit);
  }

  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.isActive, true))
      .orderBy(subscriptionPlans.pathway, subscriptionPlans.tierLevel);
  }

  async getAllSubscriptionAddons(): Promise<SubscriptionAddon[]> {
    return await db
      .select()
      .from(subscriptionAddons)
      .where(eq(subscriptionAddons.isActive, true))
      .orderBy(subscriptionAddons.category, subscriptionAddons.name);
  }

  // Account status management
  async updateClientAccountStatus(
    clientId: number,
    newStatus: AccountStatus,
    reason?: string | null,
    changedBy?: number | null
  ): Promise<Client> {
    const [client] = await db
      .update(clients)
      .set({
        accountStatus: newStatus,
        suspensionReason: reason ?? null,
        statusChangedAt: new Date(),
        statusChangedBy: changedBy ?? null,
        updatedAt: new Date(),
      })
      .where(eq(clients.id, clientId))
      .returning();

    return client;
  }

  async recordAccountStatusChange(record: InsertAccountStatusHistory): Promise<AccountStatusHistory> {
    const [history] = await db
      .insert(accountStatusHistory)
      .values(record)
      .returning();

    return history;
  }

  async getClientAccountStatusHistory(clientId: number): Promise<AccountStatusHistory[]> {
    return await db
      .select()
      .from(accountStatusHistory)
      .where(eq(accountStatusHistory.clientId, clientId))
      .orderBy(desc(accountStatusHistory.createdAt));
  }
}

export const storage = new DatabaseStorage();

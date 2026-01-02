var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accountStatusHistory: () => accountStatusHistory,
  adminActivityLog: () => adminActivityLog,
  apiKeys: () => apiKeys,
  assessmentProductRecommendations: () => assessmentProductRecommendations,
  assessments: () => assessments,
  billingHistory: () => billingHistory,
  brandAssets: () => brandAssets,
  brandColors: () => brandColors,
  campaigns: () => campaigns,
  clientAssessments: () => clientAssessments,
  clients: () => clients,
  contentAnalytics: () => contentAnalytics,
  contentMedia: () => contentMedia,
  contentPosts: () => contentPosts,
  contentTemplates: () => contentTemplates,
  crmAppointments: () => crmAppointments,
  crmAutomationExecutions: () => crmAutomationExecutions,
  crmAutomationSteps: () => crmAutomationSteps,
  crmAutomations: () => crmAutomations,
  crmCompanies: () => crmCompanies,
  crmContacts: () => crmContacts,
  crmCustomFieldDefs: () => crmCustomFieldDefs,
  crmDeals: () => crmDeals,
  crmLeadForms: () => crmLeadForms,
  crmNotes: () => crmNotes,
  crmPipelineStages: () => crmPipelineStages,
  crmPipelines: () => crmPipelines,
  crmSegmentMembers: () => crmSegmentMembers,
  crmSegments: () => crmSegments,
  crmSubscriptions: () => crmSubscriptions,
  crmTags: () => crmTags,
  crmTasks: () => crmTasks,
  crmTimeline: () => crmTimeline,
  dashboardAccess: () => dashboardAccess,
  dnsRecords: () => dnsRecords,
  domainTransfers: () => domainTransfers,
  domains: () => domains,
  emailChangeHistory: () => emailChangeHistory,
  impersonationAuditLog: () => impersonationAuditLog,
  impersonationSessions: () => impersonationSessions,
  inboxAttachments: () => inboxAttachments,
  inboxChannelConnections: () => inboxChannelConnections,
  inboxConversations: () => inboxConversations,
  inboxMessages: () => inboxMessages,
  inboxMessages2: () => inboxMessages2,
  inboxParticipants: () => inboxParticipants,
  inboxQuickReplies: () => inboxQuickReplies,
  insertAccountStatusHistorySchema: () => insertAccountStatusHistorySchema,
  insertAdminActivityLogSchema: () => insertAdminActivityLogSchema,
  insertApiKeySchema: () => insertApiKeySchema,
  insertAssessmentProductRecommendationSchema: () => insertAssessmentProductRecommendationSchema,
  insertAssessmentSchema: () => insertAssessmentSchema,
  insertBillingHistorySchema: () => insertBillingHistorySchema,
  insertBrandAssetSchema: () => insertBrandAssetSchema,
  insertBrandColorSchema: () => insertBrandColorSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertChannelConnectionSchema: () => insertChannelConnectionSchema,
  insertClientSchema: () => insertClientSchema,
  insertContentMediaSchema: () => insertContentMediaSchema,
  insertContentPostSchema: () => insertContentPostSchema,
  insertContentTemplateSchema: () => insertContentTemplateSchema,
  insertConversationSchema: () => insertConversationSchema,
  insertCrmAppointmentSchema: () => insertCrmAppointmentSchema,
  insertCrmAutomationSchema: () => insertCrmAutomationSchema,
  insertCrmAutomationStepSchema: () => insertCrmAutomationStepSchema,
  insertCrmCompanySchema: () => insertCrmCompanySchema,
  insertCrmContactSchema: () => insertCrmContactSchema,
  insertCrmCustomFieldDefSchema: () => insertCrmCustomFieldDefSchema,
  insertCrmDealSchema: () => insertCrmDealSchema,
  insertCrmLeadFormSchema: () => insertCrmLeadFormSchema,
  insertCrmNoteSchema: () => insertCrmNoteSchema,
  insertCrmPipelineSchema: () => insertCrmPipelineSchema,
  insertCrmPipelineStageSchema: () => insertCrmPipelineStageSchema,
  insertCrmSegmentSchema: () => insertCrmSegmentSchema,
  insertCrmSubscriptionSchema: () => insertCrmSubscriptionSchema,
  insertCrmTagSchema: () => insertCrmTagSchema,
  insertCrmTaskSchema: () => insertCrmTaskSchema,
  insertCrmTimelineSchema: () => insertCrmTimelineSchema,
  insertDnsRecordSchema: () => insertDnsRecordSchema,
  insertDomainSchema: () => insertDomainSchema,
  insertDomainTransferSchema: () => insertDomainTransferSchema,
  insertEmailChangeHistorySchema: () => insertEmailChangeHistorySchema,
  insertImpersonationAuditSchema: () => insertImpersonationAuditSchema,
  insertImpersonationSessionSchema: () => insertImpersonationSessionSchema,
  insertInboxMessage2Schema: () => insertInboxMessage2Schema,
  insertInboxMessageSchema: () => insertInboxMessageSchema,
  insertLivechatSessionSchema: () => insertLivechatSessionSchema,
  insertMagicLinkTokenSchema: () => insertMagicLinkTokenSchema,
  insertPrescriptionSchema: () => insertPrescriptionSchema,
  insertProductSchema: () => insertProductSchema,
  insertQuickReplySchema: () => insertQuickReplySchema,
  insertRecommendationSchema: () => insertRecommendationSchema,
  insertSendAutomationSchema: () => insertSendAutomationSchema,
  insertSendCampaignSchema: () => insertSendCampaignSchema,
  insertSendContactSchema: () => insertSendContactSchema,
  insertSendListSchema: () => insertSendListSchema,
  insertSendTemplateSchema: () => insertSendTemplateSchema,
  insertSocialMediaAccountSchema: () => insertSocialMediaAccountSchema,
  insertSubscriptionAddonSchema: () => insertSubscriptionAddonSchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertSubscriptionSchema: () => insertSubscriptionSchema,
  insertSupportTicketSchema: () => insertSupportTicketSchema,
  insertTaskSchema: () => insertTaskSchema,
  insertTicketCommentSchema: () => insertTicketCommentSchema,
  insertWebhookSubscriptionSchema: () => insertWebhookSubscriptionSchema,
  livechatSessions: () => livechatSessions,
  magicLinkTokens: () => magicLinkTokens,
  nameserverHistory: () => nameserverHistory,
  prescriptions: () => prescriptions,
  products: () => products,
  recommendations: () => recommendations,
  sendAutomations: () => sendAutomations,
  sendBounceLog: () => sendBounceLog,
  sendCampaignSends: () => sendCampaignSends,
  sendCampaigns: () => sendCampaigns,
  sendConsentRecords: () => sendConsentRecords,
  sendContacts: () => sendContacts,
  sendListContacts: () => sendListContacts,
  sendLists: () => sendLists,
  sendPreferenceCenter: () => sendPreferenceCenter,
  sendSuppressionList: () => sendSuppressionList,
  sendTemplates: () => sendTemplates,
  sendUnsubscribeRecords: () => sendUnsubscribeRecords,
  sessions: () => sessions,
  socialMediaAccounts: () => socialMediaAccounts,
  subscriptionAddonSelections: () => subscriptionAddonSelections,
  subscriptionAddons: () => subscriptionAddons,
  subscriptionPlans: () => subscriptionPlans,
  subscriptions: () => subscriptions,
  supportTickets: () => supportTickets,
  tasks: () => tasks,
  ticketComments: () => ticketComments,
  updatePrescriptionSchema: () => updatePrescriptionSchema,
  updateSupportTicketSchema: () => updateSupportTicketSchema,
  users: () => users,
  webhookSubscriptions: () => webhookSubscriptions
});
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
  unique
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var sessions, users, assessments, recommendations, clients, magicLinkTokens, inboxMessages, campaigns, emailChangeHistory, dashboardAccess, clientAssessments, accountStatusHistory, insertAssessmentSchema, insertRecommendationSchema, insertClientSchema, insertAccountStatusHistorySchema, insertMagicLinkTokenSchema, insertEmailChangeHistorySchema, insertInboxMessageSchema, insertCampaignSchema, subscriptionPlans, subscriptionAddons, subscriptions, subscriptionAddonSelections, products, assessmentProductRecommendations, billingHistory, insertSubscriptionPlanSchema, insertSubscriptionAddonSchema, insertSubscriptionSchema, insertBillingHistorySchema, insertProductSchema, insertAssessmentProductRecommendationSchema, sendContacts, sendLists, sendListContacts, sendTemplates, sendCampaigns, sendCampaignSends, sendAutomations, sendConsentRecords, sendSuppressionList, sendBounceLog, sendPreferenceCenter, sendUnsubscribeRecords, insertSendContactSchema, insertSendListSchema, insertSendTemplateSchema, insertSendCampaignSchema, insertSendAutomationSchema, domains, dnsRecords, domainTransfers, nameserverHistory, impersonationSessions, impersonationAuditLog, insertDomainSchema, insertDnsRecordSchema, insertDomainTransferSchema, insertImpersonationSessionSchema, insertImpersonationAuditSchema, inboxChannelConnections, inboxConversations, inboxMessages2, inboxAttachments, inboxQuickReplies, inboxParticipants, livechatSessions, brandAssets, insertChannelConnectionSchema, insertConversationSchema, insertInboxMessage2Schema, insertQuickReplySchema, insertLivechatSessionSchema, insertBrandAssetSchema, socialMediaAccounts, contentMedia, contentPosts, contentAnalytics, contentTemplates, insertSocialMediaAccountSchema, insertContentMediaSchema, insertContentPostSchema, insertContentTemplateSchema, tasks, insertTaskSchema, brandColors, insertBrandColorSchema, crmCompanies, crmContacts, crmPipelines, crmPipelineStages, crmDeals, crmTasks, crmNotes, crmTimeline, crmSegments, crmSegmentMembers, crmCustomFieldDefs, crmAppointments, crmTags, crmSubscriptions, crmLeadForms, insertCrmCompanySchema, insertCrmContactSchema, insertCrmPipelineSchema, insertCrmPipelineStageSchema, insertCrmDealSchema, insertCrmTaskSchema, insertCrmNoteSchema, insertCrmTimelineSchema, insertCrmSegmentSchema, insertCrmAppointmentSchema, insertCrmTagSchema, insertCrmCustomFieldDefSchema, insertCrmSubscriptionSchema, insertCrmLeadFormSchema, crmAutomations, crmAutomationSteps, crmAutomationExecutions, insertCrmAutomationSchema, insertCrmAutomationStepSchema, apiKeys, insertApiKeySchema, webhookSubscriptions, insertWebhookSubscriptionSchema, supportTickets, ticketComments, prescriptions, adminActivityLog, insertSupportTicketSchema, insertTicketCommentSchema, insertPrescriptionSchema, insertAdminActivityLogSchema, updateSupportTicketSchema, updatePrescriptionSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    sessions = pgTable(
      "sessions",
      {
        sid: varchar("sid").primaryKey(),
        sess: jsonb("sess").notNull(),
        expire: timestamp("expire").notNull()
      },
      (table) => [index("IDX_session_expire").on(table.expire)]
    );
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: varchar("email").unique(),
      firstName: varchar("first_name"),
      lastName: varchar("last_name"),
      profileImageUrl: varchar("profile_image_url"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    assessments = pgTable("assessments", {
      id: serial("id").primaryKey(),
      businessName: varchar("business_name", { length: 255 }).notNull(),
      industry: varchar("industry", { length: 100 }).notNull(),
      address: text("address").notNull(),
      location: varchar("location", { length: 255 }).notNull(),
      phone: varchar("phone", { length: 20 }).notNull(),
      email: varchar("email", { length: 255 }).notNull(),
      website: varchar("website", { length: 500 }),
      // Google Business data
      googleBusinessData: jsonb("google_business_data"),
      // AI Analysis results
      analysisResults: jsonb("analysis_results"),
      digitalScore: integer("digital_score"),
      // Status tracking
      status: varchar("status", { length: 50 }).default("pending"),
      // pending, analyzing, completed, failed
      emailSent: boolean("email_sent").default(false),
      // Pathway selection (DIY-only platform)
      selectedPathway: varchar("selected_pathway", { length: 20 }),
      // diy, none
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    recommendations = pgTable("recommendations", {
      id: serial("id").primaryKey(),
      assessmentId: integer("assessment_id").references(() => assessments.id),
      category: varchar("category", { length: 100 }).notNull(),
      // seo, reviews, website, social, etc.
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description").notNull(),
      priority: varchar("priority", { length: 20 }).notNull(),
      // high, medium, low
      estimatedImpact: varchar("estimated_impact", { length: 50 }),
      estimatedEffort: varchar("estimated_effort", { length: 50 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    clients = pgTable("clients", {
      id: serial("id").primaryKey(),
      externalId: text("external_id").unique(),
      // External reference
      companyName: text("company_name").notNull(),
      email: text("email").notNull().unique(),
      // Primary login identifier
      phone: text("phone"),
      website: text("website"),
      address: text("address"),
      businessCategory: text("business_category"),
      enabledFeatures: text("enabled_features"),
      // CO,VI,SP,RE,SO,RI
      // System protection - prevents automated deletion
      isProtected: boolean("is_protected").default(false),
      // Admin access control
      isAdmin: boolean("is_admin").default(false),
      // Email verification
      isEmailVerified: boolean("is_email_verified").default(false),
      verificationCode: text("verification_code"),
      verificationExpiry: timestamp("verification_expiry"),
      // Login tracking
      lastLoginTime: timestamp("last_login_time"),
      loginCount: integer("login_count").default(0),
      // Account status management
      accountStatus: varchar("account_status", { length: 20 }).default("active"),
      // active, suspended, inactive, pending, banned
      suspensionReason: text("suspension_reason"),
      // Reason if suspended
      statusChangedAt: timestamp("status_changed_at"),
      statusChangedBy: integer("status_changed_by"),
      // Admin ID who changed status
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    magicLinkTokens = pgTable("magic_link_tokens", {
      id: serial("id").primaryKey(),
      email: text("email").notNull(),
      token: text("token").notNull().unique(),
      expiresAt: timestamp("expires_at").notNull(),
      used: boolean("used").default(false),
      usedAt: timestamp("used_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    inboxMessages = pgTable("inbox_messages", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      messageType: text("message_type").notNull(),
      // email, sms, chat, social
      content: text("content").notNull(),
      sender: text("sender"),
      recipient: text("recipient"),
      platform: text("platform"),
      // facebook, google, email, etc
      timestamp: timestamp("timestamp").notNull(),
      isRead: boolean("is_read").default(false),
      sentiment: text("sentiment"),
      // positive, negative, neutral
      createdAt: timestamp("created_at").defaultNow()
    });
    campaigns = pgTable("campaigns", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: text("name").notNull(),
      type: text("type").notNull(),
      // email, social, sms, etc
      status: text("status").notNull(),
      // draft, active, paused, completed
      content: text("content"),
      scheduledFor: timestamp("scheduled_for"),
      sentAt: timestamp("sent_at"),
      metrics: jsonb("metrics"),
      // open rates, clicks, etc
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    emailChangeHistory = pgTable("email_change_history", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      oldEmail: text("old_email").notNull(),
      newEmail: text("new_email").notNull(),
      verificationCode: text("verification_code"),
      verified: boolean("verified").default(false),
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      createdAt: timestamp("created_at").defaultNow()
    });
    dashboardAccess = pgTable("dashboard_access", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      accessToken: text("access_token").unique(),
      dashboardUrl: text("dashboard_url"),
      lastAccessed: timestamp("last_accessed"),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    clientAssessments = pgTable("client_assessments", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      assessmentId: integer("assessment_id").references(() => assessments.id),
      createdAt: timestamp("created_at").defaultNow()
    });
    accountStatusHistory = pgTable("account_status_history", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      previousStatus: varchar("previous_status", { length: 20 }),
      newStatus: varchar("new_status", { length: 20 }).notNull(),
      reason: text("reason"),
      changedBy: integer("changed_by"),
      // Admin ID who made the change
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertAssessmentSchema = createInsertSchema(assessments).pick({
      businessName: true,
      industry: true,
      address: true,
      location: true,
      phone: true,
      email: true,
      website: true
    });
    insertRecommendationSchema = createInsertSchema(recommendations).pick({
      assessmentId: true,
      category: true,
      title: true,
      description: true,
      priority: true,
      estimatedImpact: true,
      estimatedEffort: true
    });
    insertClientSchema = createInsertSchema(clients).pick({
      externalId: true,
      companyName: true,
      email: true,
      phone: true,
      website: true,
      address: true,
      businessCategory: true,
      enabledFeatures: true,
      isEmailVerified: true,
      verificationCode: true,
      verificationExpiry: true,
      lastLoginTime: true,
      loginCount: true,
      accountStatus: true,
      suspensionReason: true,
      statusChangedAt: true,
      statusChangedBy: true
    });
    insertAccountStatusHistorySchema = createInsertSchema(accountStatusHistory).pick({
      clientId: true,
      previousStatus: true,
      newStatus: true,
      reason: true,
      changedBy: true,
      ipAddress: true,
      userAgent: true
    });
    insertMagicLinkTokenSchema = createInsertSchema(magicLinkTokens).pick({
      email: true,
      token: true,
      expiresAt: true
    });
    insertEmailChangeHistorySchema = createInsertSchema(emailChangeHistory).pick({
      clientId: true,
      oldEmail: true,
      newEmail: true,
      verificationCode: true,
      verified: true,
      ipAddress: true,
      userAgent: true
    });
    insertInboxMessageSchema = createInsertSchema(inboxMessages).pick({
      clientId: true,
      messageType: true,
      content: true,
      sender: true,
      recipient: true,
      platform: true,
      timestamp: true,
      sentiment: true
    });
    insertCampaignSchema = createInsertSchema(campaigns).pick({
      clientId: true,
      name: true,
      type: true,
      status: true,
      content: true,
      scheduledFor: true,
      metrics: true
    });
    subscriptionPlans = pgTable("subscription_plans", {
      id: serial("id").primaryKey(),
      planId: varchar("plan_id", { length: 50 }).unique().notNull(),
      // diy-starter, etc. (DIY-only)
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      pathway: varchar("pathway", { length: 20 }).notNull(),
      // diy (DIY-only platform)
      tierLevel: varchar("tier_level", { length: 50 }).notNull(),
      // basic, professional, enterprise
      basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
      setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).default("0.00"),
      billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
      // monthly, quarterly, annual
      features: jsonb("features"),
      // List of included features/services
      maxUsers: integer("max_users"),
      maxProjects: integer("max_projects"),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    subscriptionAddons = pgTable("subscription_addons", {
      id: serial("id").primaryKey(),
      addonId: varchar("addon_id", { length: 50 }).unique().notNull(),
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      category: varchar("category", { length: 50 }).notNull(),
      // seo, social, email, ppc, etc.
      icon: varchar("icon", { length: 50 }),
      // Icon name from lucide-react (Brain, Ship, Sparkles, etc.)
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
      compatiblePathways: text("compatible_pathways").array(),
      // ["diy"] (DIY-only platform)
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    subscriptions = pgTable("subscriptions", {
      id: serial("id").primaryKey(),
      nmiSubscriptionId: varchar("nmi_subscription_id", { length: 100 }).unique(),
      // NMI subscription ID
      assessmentId: integer("assessment_id").references(() => assessments.id),
      clientId: integer("client_id").references(() => clients.id),
      planId: integer("plan_id").references(() => subscriptionPlans.id),
      // Subscription details
      status: varchar("status", { length: 30 }).notNull(),
      // active, cancelled, paused, past_due, trial
      currentPeriodStart: timestamp("current_period_start"),
      currentPeriodEnd: timestamp("current_period_end"),
      // Trial period support
      trialPeriodEnd: timestamp("trial_period_end"),
      isTrialActive: boolean("is_trial_active").default(false),
      // Pricing
      baseAmount: decimal("base_amount", { precision: 10, scale: 2 }).notNull(),
      addonAmount: decimal("addon_amount", { precision: 10, scale: 2 }).default("0.00"),
      totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
      billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
      // Payment details
      paymentMethod: jsonb("payment_method"),
      // Masked card info, payment token
      lastPaymentDate: timestamp("last_payment_date"),
      nextPaymentDate: timestamp("next_payment_date"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    subscriptionAddonSelections = pgTable("subscription_addon_selections", {
      id: serial("id").primaryKey(),
      subscriptionId: integer("subscription_id").references(() => subscriptions.id),
      addonId: integer("addon_id").references(() => subscriptionAddons.id),
      quantity: integer("quantity").default(1),
      unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
      totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
      addedAt: timestamp("added_at").defaultNow()
    }, (table) => [unique().on(table.subscriptionId, table.addonId)]);
    products = pgTable("products", {
      id: serial("id").primaryKey(),
      productId: varchar("product_id", { length: 50 }).unique().notNull(),
      // business-listings, review-management, etc.
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      category: varchar("category", { length: 50 }).notNull(),
      // core, addon, solution
      // Assessment category this product improves
      improvesCategory: text("improves_category").array(),
      // ["visibility", "reviews", "completeness", "engagement"]
      // Pricing (DIY-only)
      diyPrice: decimal("diy_price", { precision: 10, scale: 2 }),
      // Price for DIY delivery
      setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).default("0.00"),
      billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
      // monthly, one_time
      // Service details
      features: jsonb("features"),
      // List of what's included
      deliveryMethod: text("delivery_method").array(),
      // ["diy"] - DIY-only platform
      estimatedImpact: varchar("estimated_impact", { length: 50 }),
      // How much it improves IQ score
      isActive: boolean("is_active").default(true),
      displayOrder: integer("display_order").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    assessmentProductRecommendations = pgTable("assessment_product_recommendations", {
      id: serial("id").primaryKey(),
      assessmentId: integer("assessment_id").references(() => assessments.id),
      productId: integer("product_id").references(() => products.id),
      // Why this product is recommended
      reason: text("reason").notNull(),
      // AI-generated explanation
      priority: varchar("priority", { length: 20 }).notNull(),
      // critical, high, medium, low
      // Impact prediction
      currentScore: integer("current_score"),
      // Current score in category
      projectedScore: integer("projected_score"),
      // Expected score after implementation
      scoreImprovement: integer("score_improvement"),
      // Improvement points
      categoryAffected: varchar("category_affected", { length: 50 }),
      // visibility, reviews, completeness, engagement
      // Recommendation metadata
      isAccepted: boolean("is_accepted").default(false),
      isPurchased: boolean("is_purchased").default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    billingHistory = pgTable("billing_history", {
      id: serial("id").primaryKey(),
      subscriptionId: integer("subscription_id").references(() => subscriptions.id),
      nmiTransactionId: varchar("nmi_transaction_id", { length: 100 }),
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      status: varchar("status", { length: 30 }).notNull(),
      // paid, failed, pending, refunded
      billingDate: timestamp("billing_date").notNull(),
      paidDate: timestamp("paid_date"),
      invoiceNumber: varchar("invoice_number", { length: 50 }),
      paymentMethod: jsonb("payment_method"),
      failureReason: text("failure_reason"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).pick({
      planId: true,
      name: true,
      description: true,
      pathway: true,
      tierLevel: true,
      basePrice: true,
      setupFee: true,
      billingCycle: true,
      features: true,
      maxUsers: true,
      maxProjects: true
    });
    insertSubscriptionAddonSchema = createInsertSchema(subscriptionAddons).pick({
      addonId: true,
      name: true,
      description: true,
      category: true,
      price: true,
      billingCycle: true,
      compatiblePathways: true
    });
    insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
      nmiSubscriptionId: true,
      assessmentId: true,
      clientId: true,
      planId: true,
      status: true,
      currentPeriodStart: true,
      currentPeriodEnd: true,
      baseAmount: true,
      addonAmount: true,
      totalAmount: true,
      billingCycle: true,
      paymentMethod: true,
      nextPaymentDate: true
    });
    insertBillingHistorySchema = createInsertSchema(billingHistory).pick({
      subscriptionId: true,
      nmiTransactionId: true,
      amount: true,
      status: true,
      billingDate: true,
      paidDate: true,
      invoiceNumber: true,
      paymentMethod: true,
      failureReason: true
    });
    insertProductSchema = createInsertSchema(products).pick({
      productId: true,
      name: true,
      description: true,
      category: true,
      improvesCategory: true,
      diyPrice: true,
      setupFee: true,
      billingCycle: true,
      features: true,
      deliveryMethod: true,
      estimatedImpact: true,
      displayOrder: true
    });
    insertAssessmentProductRecommendationSchema = createInsertSchema(assessmentProductRecommendations).pick({
      assessmentId: true,
      productId: true,
      reason: true,
      priority: true,
      currentScore: true,
      projectedScore: true,
      scoreImprovement: true,
      categoryAffected: true
    });
    sendContacts = pgTable("send_contacts", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Contact information
      email: varchar("email", { length: 255 }),
      phone: varchar("phone", { length: 20 }),
      firstName: varchar("first_name", { length: 100 }),
      lastName: varchar("last_name", { length: 100 }),
      // Consent tracking (GDPR, CAN-SPAM, TCPA compliance)
      emailConsent: boolean("email_consent").default(false),
      emailConsentDate: timestamp("email_consent_date"),
      emailConsentIp: varchar("email_consent_ip", { length: 45 }),
      emailConsentMethod: varchar("email_consent_method", { length: 50 }),
      // form, import, api, etc
      emailDoubleOptin: boolean("email_double_optin").default(false),
      emailDoubleOptinConfirmedAt: timestamp("email_double_optin_confirmed_at"),
      smsConsent: boolean("sms_consent").default(false),
      smsConsentDate: timestamp("sms_consent_date"),
      smsConsentIp: varchar("sms_consent_ip", { length: 45 }),
      smsConsentMethod: varchar("sms_consent_method", { length: 50 }),
      smsDoubleOptin: boolean("sms_double_optin").default(false),
      smsDoubleOptinConfirmedAt: timestamp("sms_double_optin_confirmed_at"),
      // Subscription status
      emailStatus: varchar("email_status", { length: 20 }).default("subscribed"),
      // subscribed, unsubscribed, bounced, complained
      smsStatus: varchar("sms_status", { length: 20 }).default("subscribed"),
      // Localization
      language: varchar("language", { length: 10 }).default("en"),
      region: varchar("region", { length: 10 }).default("US"),
      timezone: varchar("timezone", { length: 50 }),
      // Suppression tracking
      globallySuppressed: boolean("globally_suppressed").default(false),
      suppressionReason: text("suppression_reason"),
      // Source tracking
      source: varchar("source", { length: 100 }),
      // form, api, import, integration
      sourceMetadata: jsonb("source_metadata"),
      // Custom fields (JSON for flexibility)
      customFields: jsonb("custom_fields"),
      // Tags for segmentation
      tags: text("tags").array(),
      // Tracking
      lastEmailSent: timestamp("last_email_sent"),
      lastSmsSent: timestamp("last_sms_sent"),
      lastEmailOpened: timestamp("last_email_opened"),
      lastEmailClicked: timestamp("last_email_clicked"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      // Unique constraints for contact identity per client
      unique().on(table.clientId, table.email),
      unique().on(table.clientId, table.phone)
    ]);
    sendLists = pgTable("send_lists", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      // List type
      listType: varchar("list_type", { length: 20 }).notNull(),
      // static, dynamic, segment
      // For dynamic lists - segment rules (JSON)
      segmentRules: jsonb("segment_rules"),
      // Stats
      totalContacts: integer("total_contacts").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    sendListContacts = pgTable("send_list_contacts", {
      id: serial("id").primaryKey(),
      listId: integer("list_id").references(() => sendLists.id),
      contactId: integer("contact_id").references(() => sendContacts.id),
      addedAt: timestamp("added_at").defaultNow()
    }, (table) => [unique().on(table.listId, table.contactId)]);
    sendTemplates = pgTable("send_templates", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      // Template type
      templateType: varchar("template_type", { length: 20 }).notNull(),
      // email, sms
      // Email template fields
      emailSubject: varchar("email_subject", { length: 500 }),
      emailHtml: text("email_html"),
      emailText: text("email_text"),
      // SMS template fields
      smsBody: text("sms_body"),
      // Template category
      category: varchar("category", { length: 100 }),
      // Is this a system template or user-created?
      isSystem: boolean("is_system").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    sendCampaigns = pgTable("send_campaigns", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      // Campaign type
      campaignType: varchar("campaign_type", { length: 20 }).notNull(),
      // email, sms, both
      // Status
      status: varchar("status", { length: 20 }).default("draft"),
      // draft, scheduled, sending, sent, paused, cancelled
      // Content
      emailTemplateId: integer("email_template_id").references(() => sendTemplates.id),
      smsTemplateId: integer("sms_template_id").references(() => sendTemplates.id),
      // Or inline content
      emailSubject: varchar("email_subject", { length: 500 }),
      emailHtml: text("email_html"),
      emailText: text("email_text"),
      smsBody: text("sms_body"),
      // Targeting (use sendListContacts join table instead of embedding IDs)
      segmentRules: jsonb("segment_rules"),
      // Scheduling (per-channel)
      emailScheduledFor: timestamp("email_scheduled_for"),
      smsScheduledFor: timestamp("sms_scheduled_for"),
      emailSentAt: timestamp("email_sent_at"),
      smsSentAt: timestamp("sms_sent_at"),
      // Rate limiting and throttling
      sendRateLimit: integer("send_rate_limit"),
      // Max sends per hour
      emailThrottleMs: integer("email_throttle_ms"),
      // Milliseconds between email sends
      smsThrottleMs: integer("sms_throttle_ms"),
      // Milliseconds between SMS sends
      // Frequency capping
      respectFrequencyCaps: boolean("respect_frequency_caps").default(true),
      // A/B testing
      isAbTest: boolean("is_ab_test").default(false),
      abTestConfig: jsonb("ab_test_config"),
      // {variants: [{name: 'A', percentage: 50, emailSubject: '...'}], winnerCriteria: 'open_rate'}
      abTestWinnerId: integer("ab_test_winner_id"),
      // Stats
      totalRecipients: integer("total_recipients").default(0),
      emailsSent: integer("emails_sent").default(0),
      smsSent: integer("sms_sent").default(0),
      emailsOpened: integer("emails_opened").default(0),
      emailsClicked: integer("emails_clicked").default(0),
      emailsBounced: integer("emails_bounced").default(0),
      emailsComplained: integer("emails_complained").default(0),
      smsDelivered: integer("sms_delivered").default(0),
      smsFailed: integer("sms_failed").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    sendCampaignSends = pgTable("send_campaign_sends", {
      id: serial("id").primaryKey(),
      campaignId: integer("campaign_id").references(() => sendCampaigns.id),
      contactId: integer("contact_id").references(() => sendContacts.id),
      // Send type
      sendType: varchar("send_type", { length: 20 }).notNull(),
      // email, sms
      // Status
      status: varchar("status", { length: 20 }).notNull(),
      // queued, sent, delivered, opened, clicked, bounced, failed, complained
      // Email tracking
      emailOpenedAt: timestamp("email_opened_at"),
      emailClickedAt: timestamp("email_clicked_at"),
      emailBouncedAt: timestamp("email_bounced_at"),
      bounceType: varchar("bounce_type", { length: 20 }),
      // hard, soft
      bounceCode: varchar("bounce_code", { length: 10 }),
      // SMS tracking (from Telnyx)
      smsDeliveredAt: timestamp("sms_delivered_at"),
      smsFailedReason: text("sms_failed_reason"),
      smsFailedCode: varchar("sms_failed_code", { length: 20 }),
      // Provider metadata
      provider: varchar("provider", { length: 50 }),
      // telnyx, smtp, ses
      providerMessageId: varchar("provider_message_id", { length: 255 }),
      providerResponse: jsonb("provider_response"),
      // Consent snapshot (for audit trail)
      consentSnapshot: jsonb("consent_snapshot"),
      // {email: true, sms: true, timestamp: '...', ip: '...'}
      // Unsubscribe tracking
      unsubscribedAt: timestamp("unsubscribed_at"),
      unsubscribeMethod: varchar("unsubscribe_method", { length: 50 }),
      sentAt: timestamp("sent_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    sendAutomations = pgTable("send_automations", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      // Trigger
      triggerType: varchar("trigger_type", { length: 50 }).notNull(),
      // contact_added, tag_added, date_based, api_call
      triggerConfig: jsonb("trigger_config"),
      // Workflow steps (JSON array)
      workflowSteps: jsonb("workflow_steps"),
      // [{type: 'email', delay: 0, templateId: 1}, {type: 'sms', delay: 86400}]
      // Status
      isActive: boolean("is_active").default(true),
      // Stats
      totalTriggered: integer("total_triggered").default(0),
      totalCompleted: integer("total_completed").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    sendConsentRecords = pgTable("send_consent_records", {
      id: serial("id").primaryKey(),
      contactId: integer("contact_id").references(() => sendContacts.id),
      // Consent details
      consentType: varchar("consent_type", { length: 20 }).notNull(),
      // email, sms
      action: varchar("action", { length: 20 }).notNull(),
      // granted, revoked
      // Compliance data
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      consentMethod: varchar("consent_method", { length: 50 }),
      // form, api, import, double_optin_confirmed
      consentText: text("consent_text"),
      // Exact text shown to user
      // Metadata
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").defaultNow()
    });
    sendSuppressionList = pgTable("send_suppression_list", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Suppression details
      email: varchar("email", { length: 255 }),
      phone: varchar("phone", { length: 20 }),
      // Suppression type
      suppressionType: varchar("suppression_type", { length: 20 }).notNull(),
      // email, sms, both
      reason: varchar("reason", { length: 50 }).notNull(),
      // unsubscribe, bounce, complaint, manual, gdpr_request
      // Global vs tenant suppression
      isGlobal: boolean("is_global").default(false),
      // If true, suppressed across all clients
      // Compliance tracking
      suppressedAt: timestamp("suppressed_at").defaultNow(),
      suppressedBy: varchar("suppressed_by", { length: 100 }),
      // user_request, auto_bounce, admin
      notes: text("notes"),
      // Metadata
      metadata: jsonb("metadata")
    }, (table) => [unique().on(table.clientId, table.email), unique().on(table.clientId, table.phone)]);
    sendBounceLog = pgTable("send_bounce_log", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      contactId: integer("contact_id").references(() => sendContacts.id),
      campaignId: integer("campaign_id").references(() => sendCampaigns.id),
      // Bounce/complaint details
      eventType: varchar("event_type", { length: 20 }).notNull(),
      // bounce, complaint, spam_report
      bounceType: varchar("bounce_type", { length: 20 }),
      // hard, soft, transient
      bounceCode: varchar("bounce_code", { length: 10 }),
      // Channel
      channel: varchar("channel", { length: 10 }).notNull(),
      // email, sms
      // Provider details
      provider: varchar("provider", { length: 50 }),
      // telnyx, smtp
      providerMessageId: varchar("provider_message_id", { length: 255 }),
      providerResponse: text("provider_response"),
      // Diagnostics
      diagnosticCode: varchar("diagnostic_code", { length: 100 }),
      diagnosticMessage: text("diagnostic_message"),
      occurredAt: timestamp("occurred_at").defaultNow(),
      createdAt: timestamp("created_at").defaultNow()
    });
    sendPreferenceCenter = pgTable("send_preference_center", {
      id: serial("id").primaryKey(),
      contactId: integer("contact_id").references(() => sendContacts.id).unique(),
      // Communication preferences
      emailFrequency: varchar("email_frequency", { length: 20 }).default("all"),
      // all, daily, weekly, monthly, none
      smsFrequency: varchar("sms_frequency", { length: 20 }).default("all"),
      // Topic preferences (which campaigns to receive)
      topicPreferences: jsonb("topic_preferences"),
      // {promotional: true, transactional: true, updates: false}
      // Time preferences
      preferredTimeZone: varchar("preferred_time_zone", { length: 50 }),
      doNotSendBefore: varchar("do_not_send_before", { length: 5 }),
      // HH:MM
      doNotSendAfter: varchar("do_not_send_after", { length: 5 }),
      updatedAt: timestamp("updated_at").defaultNow(),
      createdAt: timestamp("created_at").defaultNow()
    });
    sendUnsubscribeRecords = pgTable("send_unsubscribe_records", {
      id: serial("id").primaryKey(),
      contactId: integer("contact_id").references(() => sendContacts.id),
      campaignId: integer("campaign_id").references(() => sendCampaigns.id),
      // Unsubscribe details
      unsubscribeType: varchar("unsubscribe_type", { length: 20 }).notNull(),
      // email, sms, all
      unsubscribeMethod: varchar("unsubscribe_method", { length: 50 }).notNull(),
      // link_click, reply_stop, preference_center, admin
      // CAN-SPAM compliance
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      // Optional feedback
      reason: varchar("reason", { length: 100 }),
      feedbackText: text("feedback_text"),
      unsubscribedAt: timestamp("unsubscribed_at").defaultNow()
    });
    insertSendContactSchema = createInsertSchema(sendContacts).pick({
      clientId: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      emailConsent: true,
      emailConsentDate: true,
      emailConsentIp: true,
      emailConsentMethod: true,
      smsConsent: true,
      smsConsentDate: true,
      smsConsentIp: true,
      smsConsentMethod: true,
      customFields: true,
      tags: true
    });
    insertSendListSchema = createInsertSchema(sendLists).pick({
      clientId: true,
      name: true,
      description: true,
      listType: true,
      segmentRules: true
    });
    insertSendTemplateSchema = createInsertSchema(sendTemplates).pick({
      clientId: true,
      name: true,
      description: true,
      templateType: true,
      emailSubject: true,
      emailHtml: true,
      emailText: true,
      smsBody: true,
      category: true
    });
    insertSendCampaignSchema = createInsertSchema(sendCampaigns).pick({
      clientId: true,
      name: true,
      description: true,
      campaignType: true,
      emailTemplateId: true,
      smsTemplateId: true,
      emailSubject: true,
      emailHtml: true,
      emailText: true,
      smsBody: true,
      segmentRules: true,
      emailScheduledFor: true,
      smsScheduledFor: true
    });
    insertSendAutomationSchema = createInsertSchema(sendAutomations).pick({
      clientId: true,
      name: true,
      description: true,
      triggerType: true,
      triggerConfig: true,
      workflowSteps: true
    });
    domains = pgTable("domains", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Domain details
      domain: varchar("domain", { length: 255 }).notNull(),
      tld: varchar("tld", { length: 20 }).notNull(),
      // com, net, org, etc
      // Registration details
      registrar: varchar("registrar", { length: 50 }).default("opensrs"),
      opensrsOrderId: varchar("opensrs_order_id", { length: 100 }),
      registrationDate: timestamp("registration_date"),
      expiryDate: timestamp("expiry_date"),
      autoRenew: boolean("auto_renew").default(true),
      // Domain status
      status: varchar("status", { length: 50 }).default("active"),
      // active, pending, expired, transferred, cancelled
      locked: boolean("locked").default(true),
      // domain lock protection
      // DNS configuration
      dnsProvider: varchar("dns_provider", { length: 50 }).default("opensrs"),
      // opensrs, cloudflare, other
      nameservers: text("nameservers").array(),
      // array of nameserver hostnames
      // Contact information (WHOIS)
      registrantContact: jsonb("registrant_contact"),
      // owner contact
      adminContact: jsonb("admin_contact"),
      techContact: jsonb("tech_contact"),
      billingContact: jsonb("billing_contact"),
      // Privacy settings
      whoisPrivacy: boolean("whois_privacy").default(false),
      // Transfer details
      authCode: varchar("auth_code", { length: 100 }),
      // EPP/auth code for transfers
      transferLocked: boolean("transfer_locked").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.clientId, table.domain)
    ]);
    dnsRecords = pgTable("dns_records", {
      id: serial("id").primaryKey(),
      domainId: integer("domain_id").references(() => domains.id, { onDelete: "cascade" }),
      // DNS record details
      recordType: varchar("record_type", { length: 10 }).notNull(),
      // A, AAAA, CNAME, MX, TXT, SPF, DKIM, etc
      hostname: varchar("hostname", { length: 255 }).notNull(),
      // subdomain or @ for root
      value: text("value").notNull(),
      // IP, domain, text value
      ttl: integer("ttl").default(300),
      // Time to live in seconds
      priority: integer("priority"),
      // For MX records
      // Status
      status: varchar("status", { length: 20 }).default("active"),
      // active, pending, deleted
      verified: boolean("verified").default(false),
      verifiedAt: timestamp("verified_at"),
      // Metadata
      autoCreated: boolean("auto_created").default(false),
      // auto-created by system vs manual
      source: varchar("source", { length: 50 }),
      // wpmudev, manual, imported, etc
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    domainTransfers = pgTable("domain_transfers", {
      id: serial("id").primaryKey(),
      domainId: integer("domain_id").references(() => domains.id),
      clientId: integer("client_id").references(() => clients.id),
      // Transfer details
      domain: varchar("domain", { length: 255 }).notNull(),
      transferType: varchar("transfer_type", { length: 20 }).notNull(),
      // inbound, outbound
      authCode: varchar("auth_code", { length: 100 }),
      // Status tracking
      status: varchar("status", { length: 50 }).default("pending"),
      // pending, pending_owner, pending_admin, pending_registry, completed, cancelled, failed
      statusMessage: text("status_message"),
      // Dates
      initiatedAt: timestamp("initiated_at").defaultNow(),
      completedAt: timestamp("completed_at"),
      // OpenSRS tracking
      opensrsTransferId: varchar("opensrs_transfer_id", { length: 100 }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    nameserverHistory = pgTable("nameserver_history", {
      id: serial("id").primaryKey(),
      domainId: integer("domain_id").references(() => domains.id, { onDelete: "cascade" }),
      previousNameservers: text("previous_nameservers").array(),
      newNameservers: text("new_nameservers").array(),
      changedBy: integer("changed_by").references(() => clients.id),
      reason: text("reason"),
      createdAt: timestamp("created_at").defaultNow()
    });
    impersonationSessions = pgTable("impersonation_sessions", {
      id: serial("id").primaryKey(),
      // Who is impersonating whom
      adminId: integer("admin_id").references(() => clients.id).notNull(),
      // admin user
      targetUserId: integer("target_user_id").references(() => clients.id).notNull(),
      // user being impersonated
      // Session tokens (dual-token system)
      sessionToken: varchar("session_token", { length: 500 }).notNull().unique(),
      // JWT for impersonated user
      superToken: varchar("super_token", { length: 500 }).notNull(),
      // JWT for admin
      // Request details
      reason: text("reason").notNull(),
      // why impersonation was requested
      requestedAt: timestamp("requested_at").defaultNow(),
      // User consent
      requiresConsent: boolean("requires_consent").default(true),
      consentGranted: boolean("consent_granted").default(false),
      consentGrantedAt: timestamp("consent_granted_at"),
      consentMethod: varchar("consent_method", { length: 50 }),
      // email, sms, in_app
      // Session lifecycle
      status: varchar("status", { length: 20 }).default("pending"),
      // pending, active, expired, ended, rejected
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      expiresAt: timestamp("expires_at"),
      // 30 min default timeout
      // Access restrictions
      readOnly: boolean("read_only").default(true),
      allowedActions: text("allowed_actions").array(),
      // specific actions admin can perform
      restrictedActions: text("restricted_actions").array().default(sql`ARRAY['delete_account', 'change_password', 'modify_billing']`),
      // Metadata
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    impersonationAuditLog = pgTable("impersonation_audit_log", {
      id: serial("id").primaryKey(),
      sessionId: integer("session_id").references(() => impersonationSessions.id, { onDelete: "cascade" }),
      adminId: integer("admin_id").references(() => clients.id).notNull(),
      targetUserId: integer("target_user_id").references(() => clients.id).notNull(),
      // Action details
      action: varchar("action", { length: 100 }).notNull(),
      // view_dashboard, update_contact, send_email, etc
      actionCategory: varchar("action_category", { length: 50 }),
      // read, write, delete
      resource: varchar("resource", { length: 100 }),
      // contacts, campaigns, settings
      resourceId: varchar("resource_id", { length: 100 }),
      // Request details
      method: varchar("method", { length: 10 }),
      // GET, POST, PUT, DELETE
      endpoint: varchar("endpoint", { length: 255 }),
      requestBody: jsonb("request_body"),
      responseStatus: integer("response_status"),
      // Tracking
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      // Result
      success: boolean("success").default(true),
      errorMessage: text("error_message"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertDomainSchema = createInsertSchema(domains).pick({
      clientId: true,
      domain: true,
      tld: true,
      registrar: true,
      opensrsOrderId: true,
      registrationDate: true,
      expiryDate: true,
      autoRenew: true,
      locked: true,
      dnsProvider: true,
      nameservers: true,
      registrantContact: true,
      adminContact: true,
      techContact: true,
      billingContact: true,
      whoisPrivacy: true,
      authCode: true
    });
    insertDnsRecordSchema = createInsertSchema(dnsRecords).pick({
      domainId: true,
      recordType: true,
      hostname: true,
      value: true,
      ttl: true,
      priority: true,
      autoCreated: true,
      source: true
    });
    insertDomainTransferSchema = createInsertSchema(domainTransfers).pick({
      domainId: true,
      clientId: true,
      domain: true,
      transferType: true,
      authCode: true,
      opensrsTransferId: true
    });
    insertImpersonationSessionSchema = createInsertSchema(impersonationSessions).pick({
      adminId: true,
      targetUserId: true,
      sessionToken: true,
      superToken: true,
      reason: true,
      requiresConsent: true,
      readOnly: true,
      allowedActions: true,
      expiresAt: true,
      ipAddress: true,
      userAgent: true
    });
    insertImpersonationAuditSchema = createInsertSchema(impersonationAuditLog).pick({
      sessionId: true,
      adminId: true,
      targetUserId: true,
      action: true,
      actionCategory: true,
      resource: true,
      resourceId: true,
      method: true,
      endpoint: true,
      requestBody: true,
      responseStatus: true,
      ipAddress: true,
      userAgent: true,
      success: true,
      errorMessage: true
    });
    inboxChannelConnections = pgTable("inbox_channel_connections", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Channel details
      channelType: varchar("channel_type", { length: 50 }).notNull(),
      // livechat, email, sms, whatsapp, facebook, instagram, twitter, tiktok
      channelIdentifier: varchar("channel_identifier", { length: 255 }).notNull(),
      // phone number, page ID, email address, etc
      channelName: varchar("channel_name", { length: 255 }),
      // friendly name
      // Connection status
      status: varchar("status", { length: 20 }).default("active"),
      // active, disconnected, expired, error
      isDefault: boolean("is_default").default(false),
      // default channel for this type
      // Authentication & configuration (encrypted)
      credentials: jsonb("credentials"),
      // API keys, tokens, etc (encrypted)
      config: jsonb("config"),
      // channel-specific settings
      // Webhook info
      webhookUrl: varchar("webhook_url", { length: 500 }),
      webhookSecret: varchar("webhook_secret", { length: 255 }),
      // Metadata
      lastSyncedAt: timestamp("last_synced_at"),
      lastError: text("last_error"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.clientId, table.channelType, table.channelIdentifier)
    ]);
    inboxConversations = pgTable("inbox_conversations", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // Contact/customer info
      contactName: varchar("contact_name", { length: 255 }),
      contactIdentifier: varchar("contact_identifier", { length: 255 }).notNull(),
      // phone, email, user ID
      contactAvatar: text("contact_avatar"),
      // Primary channel for this conversation
      primaryChannelType: varchar("primary_channel_type", { length: 50 }).notNull(),
      primaryChannelId: integer("primary_channel_id").references(() => inboxChannelConnections.id),
      // Conversation metadata
      subject: text("subject"),
      // for email threads
      status: varchar("status", { length: 20 }).default("open"),
      // open, pending, resolved, closed, spam
      priority: varchar("priority", { length: 20 }).default("normal"),
      // low, normal, high, urgent
      // Assignment
      assignedToId: integer("assigned_to_id").references(() => clients.id),
      assignedAt: timestamp("assigned_at"),
      // Tags and categorization
      tags: text("tags").array(),
      category: varchar("category", { length: 50 }),
      // support, sales, general
      // Message tracking
      lastMessageAt: timestamp("last_message_at"),
      lastMessagePreview: text("last_message_preview"),
      unreadCount: integer("unread_count").default(0),
      // Customer satisfaction
      sentiment: varchar("sentiment", { length: 20 }),
      // positive, neutral, negative
      rating: integer("rating"),
      // 1-5 stars
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_conversation_client").on(table.clientId),
      index("idx_conversation_status").on(table.status),
      index("idx_conversation_assigned").on(table.assignedToId)
    ]);
    inboxMessages2 = pgTable("inbox_messages2", {
      id: serial("id").primaryKey(),
      conversationId: integer("conversation_id").references(() => inboxConversations.id, { onDelete: "cascade" }).notNull(),
      // Channel info
      channelType: varchar("channel_type", { length: 50 }).notNull(),
      channelId: integer("channel_id").references(() => inboxChannelConnections.id),
      // Message details
      messageType: varchar("message_type", { length: 20 }).notNull(),
      // incoming, outgoing, internal_note
      direction: varchar("direction", { length: 10 }).notNull(),
      // inbound, outbound
      // Content
      content: text("content").notNull(),
      contentType: varchar("content_type", { length: 50 }).default("text"),
      // text, html, image, video, audio, file
      // Sender/recipient
      fromIdentifier: varchar("from_identifier", { length: 255 }).notNull(),
      // phone, email, user ID
      fromName: varchar("from_name", { length: 255 }),
      toIdentifier: varchar("to_identifier", { length: 255 }).notNull(),
      toName: varchar("to_name", { length: 255 }),
      // Platform-specific IDs
      externalMessageId: varchar("external_message_id", { length: 255 }),
      // ID from Facebook, WhatsApp, etc
      threadId: varchar("thread_id", { length: 255 }),
      // thread ID from external platform
      // Attachments
      hasAttachments: boolean("has_attachments").default(false),
      attachments: jsonb("attachments"),
      // array of attachment objects
      // Message status
      status: varchar("status", { length: 20 }).default("sent"),
      // queued, sent, delivered, read, failed
      deliveredAt: timestamp("delivered_at"),
      readAt: timestamp("read_at"),
      // Team member who sent (for outgoing)
      sentById: integer("sent_by_id").references(() => clients.id),
      // Metadata
      metadata: jsonb("metadata"),
      // platform-specific data
      isInternal: boolean("is_internal").default(false),
      // internal note vs customer-facing
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_message_conversation").on(table.conversationId),
      index("idx_message_external").on(table.externalMessageId),
      index("idx_message_created").on(table.createdAt)
    ]);
    inboxAttachments = pgTable("inbox_attachments", {
      id: serial("id").primaryKey(),
      messageId: integer("message_id").references(() => inboxMessages2.id, { onDelete: "cascade" }).notNull(),
      // File details
      fileName: varchar("file_name", { length: 255 }).notNull(),
      fileType: varchar("file_type", { length: 50 }).notNull(),
      // image/jpeg, application/pdf, etc
      fileSize: integer("file_size"),
      // bytes
      fileUrl: text("file_url").notNull(),
      // storage URL
      // Thumbnail for images/videos
      thumbnailUrl: text("thumbnail_url"),
      // External reference
      externalFileId: varchar("external_file_id", { length: 255 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    inboxQuickReplies = pgTable("inbox_quick_replies", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // Reply details
      shortcut: varchar("shortcut", { length: 50 }).notNull(),
      // /greeting, /hours, etc
      title: varchar("title", { length: 255 }).notNull(),
      content: text("content").notNull(),
      // Channel compatibility
      channelTypes: text("channel_types").array(),
      // which channels this reply works on
      // Categorization
      category: varchar("category", { length: 50 }),
      tags: text("tags").array(),
      // Usage tracking
      useCount: integer("use_count").default(0),
      lastUsedAt: timestamp("last_used_at"),
      // Team sharing
      isShared: boolean("is_shared").default(true),
      // shared with team or private
      createdById: integer("created_by_id").references(() => clients.id),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.clientId, table.shortcut)
    ]);
    inboxParticipants = pgTable("inbox_participants", {
      id: serial("id").primaryKey(),
      conversationId: integer("conversation_id").references(() => inboxConversations.id, { onDelete: "cascade" }).notNull(),
      participantIdentifier: varchar("participant_identifier", { length: 255 }).notNull(),
      participantName: varchar("participant_name", { length: 255 }),
      participantType: varchar("participant_type", { length: 20 }).notNull(),
      // customer, agent, bot
      // Participant status
      isActive: boolean("is_active").default(true),
      joinedAt: timestamp("joined_at").defaultNow(),
      leftAt: timestamp("left_at"),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      unique().on(table.conversationId, table.participantIdentifier)
    ]);
    livechatSessions = pgTable("livechat_sessions", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      conversationId: integer("conversation_id").references(() => inboxConversations.id),
      // Session details
      sessionId: varchar("session_id", { length: 100 }).notNull().unique(),
      visitorId: varchar("visitor_id", { length: 100 }),
      // Optional - can be derived from sessionId or tracking
      visitorName: varchar("visitor_name", { length: 255 }),
      visitorEmail: varchar("visitor_email", { length: 255 }),
      // Widget context
      pageUrl: text("page_url"),
      pageTitle: text("page_title"),
      referrer: text("referrer"),
      userAgent: text("user_agent"),
      ipAddress: varchar("ip_address", { length: 45 }),
      // Location
      country: varchar("country", { length: 100 }),
      city: varchar("city", { length: 100 }),
      // Session status
      status: varchar("status", { length: 20 }).default("active"),
      // active, ended, transferred
      startedAt: timestamp("started_at").defaultNow(),
      endedAt: timestamp("ended_at"),
      // Assignment
      assignedToId: integer("assigned_to_id").references(() => clients.id),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_livechat_session").on(table.sessionId),
      index("idx_livechat_visitor").on(table.visitorId)
    ]);
    brandAssets = pgTable("brand_assets", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      type: text("type").notNull(),
      // logo, icon, additional
      fileName: text("file_name").notNull(),
      mimeType: text("mime_type").notNull(),
      size: integer("size").notNull(),
      // in bytes
      data: text("data").notNull(),
      // base64 encoded file data
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertChannelConnectionSchema = createInsertSchema(inboxChannelConnections).pick({
      clientId: true,
      channelType: true,
      channelIdentifier: true,
      channelName: true,
      isDefault: true,
      credentials: true,
      config: true,
      webhookUrl: true,
      webhookSecret: true
    });
    insertConversationSchema = createInsertSchema(inboxConversations).pick({
      clientId: true,
      contactName: true,
      contactIdentifier: true,
      contactAvatar: true,
      primaryChannelType: true,
      primaryChannelId: true,
      subject: true,
      status: true,
      priority: true,
      assignedToId: true,
      tags: true,
      category: true,
      lastMessageAt: true,
      lastMessagePreview: true,
      sentiment: true
    });
    insertInboxMessage2Schema = createInsertSchema(inboxMessages2).pick({
      conversationId: true,
      channelType: true,
      channelId: true,
      messageType: true,
      direction: true,
      content: true,
      contentType: true,
      fromIdentifier: true,
      fromName: true,
      toIdentifier: true,
      toName: true,
      externalMessageId: true,
      threadId: true,
      hasAttachments: true,
      attachments: true,
      sentById: true,
      metadata: true,
      isInternal: true
    });
    insertQuickReplySchema = createInsertSchema(inboxQuickReplies).pick({
      clientId: true,
      shortcut: true,
      title: true,
      content: true,
      channelTypes: true,
      category: true,
      tags: true,
      isShared: true,
      createdById: true
    });
    insertLivechatSessionSchema = createInsertSchema(livechatSessions).pick({
      clientId: true,
      conversationId: true,
      sessionId: true,
      visitorId: true,
      visitorName: true,
      visitorEmail: true,
      pageUrl: true,
      pageTitle: true,
      referrer: true,
      userAgent: true,
      ipAddress: true,
      country: true,
      city: true,
      assignedToId: true
    });
    insertBrandAssetSchema = createInsertSchema(brandAssets).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    socialMediaAccounts = pgTable("social_media_accounts", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // Platform details
      platform: varchar("platform", { length: 50 }).notNull(),
      // facebook, instagram, linkedin, x, google_business, tiktok, snapchat
      platformAccountId: varchar("platform_account_id", { length: 255 }).notNull(),
      // Platform's user/page ID
      platformAccountName: varchar("platform_account_name", { length: 255 }).notNull(),
      // Display name
      platformAccountHandle: varchar("platform_account_handle", { length: 255 }),
      // @username
      platformAccountAvatar: text("platform_account_avatar"),
      // OAuth credentials
      accessToken: text("access_token").notNull(),
      refreshToken: text("refresh_token"),
      tokenExpiresAt: timestamp("token_expires_at"),
      // Account metadata
      accountType: varchar("account_type", { length: 50 }),
      // personal, business, page, etc
      permissions: text("permissions").array(),
      // Granted OAuth scopes
      metadata: jsonb("metadata"),
      // Platform-specific data
      // Status
      isActive: boolean("is_active").default(true),
      lastSyncedAt: timestamp("last_synced_at"),
      syncError: text("sync_error"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.clientId, table.platform, table.platformAccountId)
    ]);
    contentMedia = pgTable("content_media", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // File details
      fileName: varchar("file_name", { length: 255 }).notNull(),
      fileSize: integer("file_size").notNull(),
      // bytes
      mimeType: varchar("mime_type", { length: 100 }).notNull(),
      fileType: varchar("file_type", { length: 20 }).notNull(),
      // image, video, gif
      // Storage location (Cloudflare R2 / S3)
      storageKey: text("storage_key").notNull(),
      // S3 key / R2 path
      storageUrl: text("storage_url").notNull(),
      // Public URL
      thumbnailUrl: text("thumbnail_url"),
      // For videos
      // Media metadata
      width: integer("width"),
      height: integer("height"),
      duration: integer("duration"),
      // For videos (seconds)
      altText: text("alt_text"),
      // Accessibility
      // Organization
      folder: varchar("folder", { length: 255 }).default("Uploads"),
      // For organizing media
      tags: text("tags").array(),
      // Usage tracking
      usageCount: integer("usage_count").default(0),
      // How many posts use this
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    contentPosts = pgTable("content_posts", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // Post content
      caption: text("caption").notNull(),
      // Main text
      hashtags: text("hashtags").array(),
      // Extracted hashtags
      mediaIds: integer("media_ids").array(),
      // References to contentMedia
      // Platform targeting
      platforms: text("platforms").array().notNull(),
      // Which platforms to publish to
      // Platform-specific customization
      platformCustomizations: jsonb("platform_customizations"),
      // {facebook: {caption: "..."}, instagram: {...}}
      // Scheduling
      scheduledFor: timestamp("scheduled_for"),
      // When to publish (null = draft)
      timezone: varchar("timezone", { length: 50 }).default("America/New_York"),
      // Status tracking
      status: varchar("status", { length: 20 }).default("draft"),
      // draft, scheduled, publishing, published, failed, cancelled
      publishedAt: timestamp("published_at"),
      // Database-backed scheduler fields
      lockedAt: timestamp("locked_at"),
      // Job lock timestamp for atomic processing
      attempts: integer("attempts").default(0),
      // Retry count
      nextRetryAt: timestamp("next_retry_at"),
      // When to retry failed jobs
      lastError: text("last_error"),
      // Error message from last publishing attempt
      // AI assistance metadata
      isAIGenerated: boolean("is_ai_generated").default(false),
      // Was caption AI-generated
      aiPrompt: text("ai_prompt"),
      // Original prompt for AI
      contentScore: integer("content_score"),
      // AI content quality score (0-100)
      // Publishing results (per platform)
      publishResults: jsonb("publish_results"),
      // {facebook: {postId: "123", url: "...", status: "published"}}
      publishErrors: jsonb("publish_errors"),
      // {instagram: {error: "Token expired"}}
      // Template
      templateId: integer("template_id").references(() => contentTemplates.id),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    contentAnalytics = pgTable("content_analytics", {
      id: serial("id").primaryKey(),
      postId: integer("post_id").references(() => contentPosts.id).notNull(),
      platform: varchar("platform", { length: 50 }).notNull(),
      // Platform post ID
      platformPostId: varchar("platform_post_id", { length: 255 }).notNull(),
      platformPostUrl: text("platform_post_url"),
      // Engagement metrics
      impressions: integer("impressions").default(0),
      reach: integer("reach").default(0),
      likes: integer("likes").default(0),
      comments: integer("comments").default(0),
      shares: integer("shares").default(0),
      clicks: integer("clicks").default(0),
      saves: integer("saves").default(0),
      // Instagram/Pinterest
      // Video metrics (if applicable)
      videoViews: integer("video_views").default(0),
      videoWatchTime: integer("video_watch_time").default(0),
      // seconds
      // Engagement rate (calculated)
      engagementRate: decimal("engagement_rate", { precision: 5, scale: 2 }),
      // percentage
      // Last synced from platform
      lastSyncedAt: timestamp("last_synced_at").defaultNow(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.postId, table.platform)
    ]);
    contentTemplates = pgTable("content_templates", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      category: varchar("category", { length: 100 }),
      // promotional, educational, announcement, etc
      // Template content
      captionTemplate: text("caption_template").notNull(),
      // Can include variables like {business_name}
      hashtagsTemplate: text("hashtags_template").array(),
      defaultMediaIds: integer("default_media_ids").array(),
      // Platform recommendations
      recommendedPlatforms: text("recommended_platforms").array(),
      // System templates (provided by platform) vs user-created
      isSystem: boolean("is_system").default(false),
      // Usage tracking
      useCount: integer("use_count").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertSocialMediaAccountSchema = createInsertSchema(socialMediaAccounts).pick({
      clientId: true,
      platform: true,
      platformAccountId: true,
      platformAccountName: true,
      platformAccountHandle: true,
      platformAccountAvatar: true,
      accessToken: true,
      refreshToken: true,
      tokenExpiresAt: true,
      accountType: true,
      permissions: true,
      metadata: true
    });
    insertContentMediaSchema = createInsertSchema(contentMedia).pick({
      clientId: true,
      fileName: true,
      fileSize: true,
      mimeType: true,
      fileType: true,
      storageKey: true,
      storageUrl: true,
      thumbnailUrl: true,
      width: true,
      height: true,
      duration: true,
      altText: true,
      folder: true,
      tags: true
    });
    insertContentPostSchema = createInsertSchema(contentPosts).pick({
      clientId: true,
      caption: true,
      hashtags: true,
      mediaIds: true,
      platforms: true,
      platformCustomizations: true,
      scheduledFor: true,
      timezone: true,
      status: true,
      isAIGenerated: true,
      aiPrompt: true,
      templateId: true
    });
    insertContentTemplateSchema = createInsertSchema(contentTemplates).pick({
      clientId: true,
      name: true,
      description: true,
      category: true,
      captionTemplate: true,
      hashtagsTemplate: true,
      defaultMediaIds: true,
      recommendedPlatforms: true
    });
    tasks = pgTable("tasks", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Task details
      title: text("title").notNull(),
      description: text("description"),
      // Status and priority
      status: varchar("status", { length: 20 }).notNull().default("todo"),
      // todo, in_progress, completed, cancelled
      priority: varchar("priority", { length: 20 }).notNull().default("medium"),
      // low, medium, high, urgent
      // Assignment
      assignedTo: varchar("assigned_to", { length: 50 }),
      // "user", "assistant", or specific name
      assignedBy: varchar("assigned_by", { length: 50 }),
      // Who assigned it
      // Dates
      dueDate: timestamp("due_date"),
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow(),
      // Additional metadata
      tags: text("tags").array(),
      relatedTo: jsonb("related_to"),
      // Link to other entities (posts, assessments, etc)
      // GitHub Integration
      githubIssueId: varchar("github_issue_id", { length: 50 }),
      // GitHub issue number (e.g., "#214")
      githubIssueUrl: text("github_issue_url")
      // Full URL to GitHub issue
    });
    insertTaskSchema = createInsertSchema(tasks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    brandColors = pgTable("brand_colors", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      hex: varchar("hex", { length: 7 }).notNull(),
      // #RRGGBB format
      usage: text("usage"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertBrandColorSchema = createInsertSchema(brandColors).omit({
      id: true,
      createdAt: true
    });
    crmCompanies = pgTable("crm_companies", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Company information
      name: varchar("name", { length: 255 }).notNull(),
      domain: varchar("domain", { length: 255 }),
      industry: varchar("industry", { length: 100 }),
      size: varchar("size", { length: 50 }),
      // 1-10, 11-50, 51-200, 201-500, 500+
      revenue: varchar("revenue", { length: 50 }),
      // <1M, 1M-10M, 10M-50M, 50M+
      // Contact details
      phone: varchar("phone", { length: 30 }),
      email: varchar("email", { length: 255 }),
      website: varchar("website", { length: 500 }),
      // Address
      address: text("address"),
      city: varchar("city", { length: 100 }),
      state: varchar("state", { length: 100 }),
      postalCode: varchar("postal_code", { length: 20 }),
      country: varchar("country", { length: 100 }),
      // Social profiles
      linkedinUrl: varchar("linkedin_url", { length: 500 }),
      twitterUrl: varchar("twitter_url", { length: 500 }),
      facebookUrl: varchar("facebook_url", { length: 500 }),
      // Relationship details
      type: varchar("type", { length: 50 }).default("prospect"),
      // prospect, customer, partner, vendor
      status: varchar("status", { length: 50 }).default("active"),
      // active, inactive, churned
      // Owner/assignment
      ownerId: integer("owner_id").references(() => clients.id),
      // Custom fields (JSON for flexibility)
      customFields: jsonb("custom_fields"),
      // Tags for segmentation
      tags: text("tags").array(),
      // Tracking
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_crm_companies_client").on(table.clientId),
      index("idx_crm_companies_domain").on(table.domain),
      index("idx_crm_companies_name").on(table.name)
    ]);
    crmContacts = pgTable("crm_contacts", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      companyId: integer("company_id").references(() => crmCompanies.id),
      // Contact information
      firstName: varchar("first_name", { length: 100 }),
      lastName: varchar("last_name", { length: 100 }),
      email: varchar("email", { length: 255 }),
      phone: varchar("phone", { length: 30 }),
      mobilePhone: varchar("mobile_phone", { length: 30 }),
      // Job details
      jobTitle: varchar("job_title", { length: 150 }),
      department: varchar("department", { length: 100 }),
      // Address
      address: text("address"),
      city: varchar("city", { length: 100 }),
      state: varchar("state", { length: 100 }),
      postalCode: varchar("postal_code", { length: 20 }),
      country: varchar("country", { length: 100 }),
      // Social profiles
      linkedinUrl: varchar("linkedin_url", { length: 500 }),
      twitterUrl: varchar("twitter_url", { length: 500 }),
      // Contact status
      status: varchar("status", { length: 50 }).default("active"),
      // active, inactive, unsubscribed
      lifecycleStage: varchar("lifecycle_stage", { length: 50 }).default("lead"),
      // lead, subscriber, opportunity, customer, evangelist
      // Lead scoring
      leadScore: integer("lead_score").default(0),
      leadSource: varchar("lead_source", { length: 100 }),
      // website, referral, cold_outreach, event, assessment, etc.
      // Source tracking - how this contact entered the system
      sourceType: varchar("source_type", { length: 50 }),
      // manual, import, assessment, portal_signup, api, form
      sourceId: varchar("source_id", { length: 100 }),
      // Reference to source entity (e.g., assessment ID)
      sourceMetadata: jsonb("source_metadata"),
      // Additional source details
      // Owner/assignment
      ownerId: integer("owner_id").references(() => clients.id),
      // Communication preferences
      emailOptIn: boolean("email_opt_in").default(true),
      smsOptIn: boolean("sms_opt_in").default(false),
      preferredContactMethod: varchar("preferred_contact_method", { length: 20 }),
      // email, phone, sms
      timezone: varchar("timezone", { length: 50 }),
      // Marketing tracking
      lastActivityDate: timestamp("last_activity_date"),
      lastContactedDate: timestamp("last_contacted_date"),
      // Custom fields (JSON for flexibility)
      customFields: jsonb("custom_fields"),
      // Tags for segmentation
      tags: text("tags").array(),
      // Avatar/photo
      avatarUrl: varchar("avatar_url", { length: 500 }),
      // Tracking
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_crm_contacts_client").on(table.clientId),
      index("idx_crm_contacts_company").on(table.companyId),
      index("idx_crm_contacts_email").on(table.email),
      index("idx_crm_contacts_lifecycle").on(table.lifecycleStage)
    ]);
    crmPipelines = pgTable("crm_pipelines", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      isDefault: boolean("is_default").default(false),
      isActive: boolean("is_active").default(true),
      // Display order
      displayOrder: integer("display_order").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    crmPipelineStages = pgTable("crm_pipeline_stages", {
      id: serial("id").primaryKey(),
      pipelineId: integer("pipeline_id").references(() => crmPipelines.id).notNull(),
      name: varchar("name", { length: 100 }).notNull(),
      probability: integer("probability").default(0),
      // Win probability (0-100%)
      displayOrder: integer("display_order").default(0),
      // Stage type
      stageType: varchar("stage_type", { length: 20 }).default("active"),
      // active, won, lost
      // Color for visual display
      color: varchar("color", { length: 7 }).default("#3B82F6"),
      // Hex color
      createdAt: timestamp("created_at").defaultNow()
    });
    crmDeals = pgTable("crm_deals", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      contactId: integer("contact_id").references(() => crmContacts.id),
      companyId: integer("company_id").references(() => crmCompanies.id),
      pipelineId: integer("pipeline_id").references(() => crmPipelines.id),
      stageId: integer("stage_id").references(() => crmPipelineStages.id),
      // Deal information
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      // Value
      amount: decimal("amount", { precision: 12, scale: 2 }),
      currency: varchar("currency", { length: 3 }).default("USD"),
      // Probability and forecast
      probability: integer("probability").default(0),
      // Win probability (0-100%)
      expectedCloseDate: timestamp("expected_close_date"),
      actualCloseDate: timestamp("actual_close_date"),
      // Status
      status: varchar("status", { length: 20 }).default("open"),
      // open, won, lost
      lostReason: varchar("lost_reason", { length: 100 }),
      // Owner/assignment
      ownerId: integer("owner_id").references(() => clients.id),
      // Source
      dealSource: varchar("deal_source", { length: 100 }),
      // website, referral, cold_outreach, etc.
      // Custom fields
      customFields: jsonb("custom_fields"),
      // Tags
      tags: text("tags").array(),
      // Tracking
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_crm_deals_client").on(table.clientId),
      index("idx_crm_deals_contact").on(table.contactId),
      index("idx_crm_deals_stage").on(table.stageId),
      index("idx_crm_deals_status").on(table.status)
    ]);
    crmTasks = pgTable("crm_tasks", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Linked entities
      contactId: integer("contact_id").references(() => crmContacts.id),
      companyId: integer("company_id").references(() => crmCompanies.id),
      dealId: integer("deal_id").references(() => crmDeals.id),
      // Task details
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      // Type and status
      taskType: varchar("task_type", { length: 50 }).default("task"),
      // task, call, email, meeting, follow_up
      status: varchar("status", { length: 20 }).default("pending"),
      // pending, completed, cancelled
      priority: varchar("priority", { length: 20 }).default("medium"),
      // low, medium, high, urgent
      // Timing
      dueDate: timestamp("due_date"),
      reminderDate: timestamp("reminder_date"),
      completedAt: timestamp("completed_at"),
      // Assignment
      assignedToId: integer("assigned_to_id").references(() => clients.id),
      assignedById: integer("assigned_by_id").references(() => clients.id),
      // Tracking
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_crm_tasks_client").on(table.clientId),
      index("idx_crm_tasks_contact").on(table.contactId),
      index("idx_crm_tasks_due").on(table.dueDate),
      index("idx_crm_tasks_status").on(table.status)
    ]);
    crmNotes = pgTable("crm_notes", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Linked entities (at least one should be set)
      contactId: integer("contact_id").references(() => crmContacts.id),
      companyId: integer("company_id").references(() => crmCompanies.id),
      dealId: integer("deal_id").references(() => crmDeals.id),
      // Note content
      content: text("content").notNull(),
      // Type
      noteType: varchar("note_type", { length: 50 }).default("general"),
      // general, call, meeting, email
      // Author
      authorId: integer("author_id").references(() => clients.id),
      // Pinned notes appear at top
      isPinned: boolean("is_pinned").default(false),
      // Tracking
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_crm_notes_contact").on(table.contactId),
      index("idx_crm_notes_company").on(table.companyId),
      index("idx_crm_notes_deal").on(table.dealId)
    ]);
    crmTimeline = pgTable("crm_timeline", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Linked entities
      contactId: integer("contact_id").references(() => crmContacts.id),
      companyId: integer("company_id").references(() => crmCompanies.id),
      dealId: integer("deal_id").references(() => crmDeals.id),
      // Event details
      eventType: varchar("event_type", { length: 50 }).notNull(),
      // email_sent, call_made, note_added, deal_stage_changed, form_submitted, etc.
      eventSubtype: varchar("event_subtype", { length: 50 }),
      // More specific event classification
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      // Source app (for integration events)
      sourceApp: varchar("source_app", { length: 50 }),
      // relationships, send, inbox, livechat, content, listings, reputation
      sourceEntityType: varchar("source_entity_type", { length: 50 }),
      // email, message, post, review, etc.
      sourceEntityId: varchar("source_entity_id", { length: 100 }),
      // ID in source app
      // Event metadata
      metadata: jsonb("metadata"),
      // Additional event-specific data
      // Who performed the action
      actorId: integer("actor_id").references(() => clients.id),
      actorType: varchar("actor_type", { length: 20 }),
      // user, system, automation
      // Tracking
      occurredAt: timestamp("occurred_at").notNull(),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_crm_timeline_contact").on(table.contactId),
      index("idx_crm_timeline_company").on(table.companyId),
      index("idx_crm_timeline_occurred").on(table.occurredAt),
      index("idx_crm_timeline_event_type").on(table.eventType)
    ]);
    crmSegments = pgTable("crm_segments", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      // Segment type
      segmentType: varchar("segment_type", { length: 20 }).default("dynamic"),
      // static, dynamic
      // Filter criteria (for dynamic segments)
      filterCriteria: jsonb("filter_criteria"),
      // { field, operator, value }[]
      // For static segments, member IDs are stored
      memberCount: integer("member_count").default(0),
      // Color for visual display
      color: varchar("color", { length: 7 }).default("#22C55E"),
      // Is this a system segment (can't be deleted)
      isSystem: boolean("is_system").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    crmSegmentMembers = pgTable("crm_segment_members", {
      id: serial("id").primaryKey(),
      segmentId: integer("segment_id").references(() => crmSegments.id).notNull(),
      contactId: integer("contact_id").references(() => crmContacts.id).notNull(),
      addedAt: timestamp("added_at").defaultNow()
    }, (table) => [
      unique().on(table.segmentId, table.contactId)
    ]);
    crmCustomFieldDefs = pgTable("crm_custom_field_defs", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Field details
      fieldName: varchar("field_name", { length: 100 }).notNull(),
      fieldLabel: varchar("field_label", { length: 100 }).notNull(),
      fieldType: varchar("field_type", { length: 30 }).notNull(),
      // text, number, date, select, multiselect, boolean, email, phone, url
      // Where this field applies
      entityType: varchar("entity_type", { length: 30 }).notNull(),
      // contact, company, deal
      // Options for select/multiselect
      options: text("options").array(),
      // Validation
      isRequired: boolean("is_required").default(false),
      defaultValue: text("default_value"),
      // Display
      displayOrder: integer("display_order").default(0),
      isHidden: boolean("is_hidden").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    crmAppointments = pgTable("crm_appointments", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      contactId: integer("contact_id").references(() => crmContacts.id),
      // Appointment details
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      // Timing
      startTime: timestamp("start_time").notNull(),
      endTime: timestamp("end_time").notNull(),
      timezone: varchar("timezone", { length: 50 }).default("UTC"),
      // Type
      appointmentType: varchar("appointment_type", { length: 50 }).default("meeting"),
      // meeting, call, demo, consultation
      // Location
      location: varchar("location", { length: 255 }),
      meetingUrl: varchar("meeting_url", { length: 500 }),
      // Zoom, Google Meet, etc.
      // Status
      status: varchar("status", { length: 20 }).default("scheduled"),
      // scheduled, confirmed, cancelled, completed, no_show
      // Reminders
      reminderSent: boolean("reminder_sent").default(false),
      reminderMinutesBefore: integer("reminder_minutes_before").default(30),
      // Booking metadata
      bookedByContactEmail: varchar("booked_by_email", { length: 255 }),
      bookingNotes: text("booking_notes"),
      // Recurrence (optional)
      isRecurring: boolean("is_recurring").default(false),
      recurrenceRule: varchar("recurrence_rule", { length: 255 }),
      // RRULE format
      parentAppointmentId: integer("parent_appointment_id"),
      // Tracking
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_crm_appointments_client").on(table.clientId),
      index("idx_crm_appointments_contact").on(table.contactId),
      index("idx_crm_appointments_start").on(table.startTime)
    ]);
    crmTags = pgTable("crm_tags", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      name: varchar("name", { length: 50 }).notNull(),
      color: varchar("color", { length: 7 }).default("#6B7280"),
      // Hex color
      // Usage count for display
      usageCount: integer("usage_count").default(0),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      unique().on(table.clientId, table.name)
    ]);
    crmSubscriptions = pgTable("crm_subscriptions", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).unique(),
      // Tier: starter (free), performance ($29/mo)
      tier: varchar("tier", { length: 20 }).notNull().default("starter"),
      // Billing
      billingCycle: varchar("billing_cycle", { length: 20 }),
      // monthly, annual (null for starter)
      currentPeriodStart: timestamp("current_period_start"),
      currentPeriodEnd: timestamp("current_period_end"),
      // Status
      status: varchar("status", { length: 20 }).default("active"),
      // active, cancelled, past_due
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    crmLeadForms = pgTable("crm_lead_forms", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Form identity
      name: varchar("name", { length: 100 }).notNull(),
      slug: varchar("slug", { length: 50 }).notNull(),
      // URL-friendly identifier
      description: text("description"),
      // Form configuration
      fields: jsonb("fields").notNull().default([
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: false },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: false }
      ]),
      // Styling
      buttonText: varchar("button_text", { length: 50 }).default("Submit"),
      successMessage: varchar("success_message", { length: 255 }).default("Thank you! We'll be in touch soon."),
      // Lead assignment
      defaultLifecycleStage: varchar("default_lifecycle_stage", { length: 50 }).default("lead"),
      defaultLeadSource: varchar("default_lead_source", { length: 100 }),
      assignToUserId: integer("assign_to_user_id"),
      // Tracking
      submissionCount: integer("submission_count").default(0),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.clientId, table.slug),
      index("idx_crm_lead_forms_client").on(table.clientId)
    ]);
    insertCrmCompanySchema = createInsertSchema(crmCompanies).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmContactSchema = createInsertSchema(crmContacts).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmPipelineSchema = createInsertSchema(crmPipelines).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmPipelineStageSchema = createInsertSchema(crmPipelineStages).omit({
      id: true,
      createdAt: true
    });
    insertCrmDealSchema = createInsertSchema(crmDeals).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmTaskSchema = createInsertSchema(crmTasks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmNoteSchema = createInsertSchema(crmNotes).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmTimelineSchema = createInsertSchema(crmTimeline).omit({
      id: true,
      createdAt: true
    });
    insertCrmSegmentSchema = createInsertSchema(crmSegments).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmAppointmentSchema = createInsertSchema(crmAppointments).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmTagSchema = createInsertSchema(crmTags).omit({
      id: true,
      createdAt: true
    });
    insertCrmCustomFieldDefSchema = createInsertSchema(crmCustomFieldDefs).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmSubscriptionSchema = createInsertSchema(crmSubscriptions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCrmLeadFormSchema = createInsertSchema(crmLeadForms).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      submissionCount: true
    });
    crmAutomations = pgTable("crm_automations", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Basic info
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      // Trigger configuration
      triggerType: varchar("trigger_type", { length: 50 }).notNull(),
      // contact_created, contact_updated, deal_stage_changed, form_submitted, tag_added, manual
      triggerConfig: jsonb("trigger_config").default({}),
      // Additional trigger conditions
      // Status
      isActive: boolean("is_active").default(true),
      // Stats
      runCount: integer("run_count").default(0),
      lastRunAt: timestamp("last_run_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    crmAutomationSteps = pgTable("crm_automation_steps", {
      id: serial("id").primaryKey(),
      automationId: integer("automation_id").references(() => crmAutomations.id, { onDelete: "cascade" }).notNull(),
      // Ordering
      stepOrder: integer("step_order").notNull(),
      // Step type and config
      stepType: varchar("step_type", { length: 50 }).notNull(),
      // wait, update_contact, add_tag, remove_tag, send_email, create_task, add_to_segment, webhook
      config: jsonb("config").default({}),
      // Step-specific configuration
      // Conditional execution
      conditionType: varchar("condition_type", { length: 50 }),
      // if_tag, if_stage, if_field, always
      conditionConfig: jsonb("condition_config").default({}),
      createdAt: timestamp("created_at").defaultNow()
    });
    crmAutomationExecutions = pgTable("crm_automation_executions", {
      id: serial("id").primaryKey(),
      automationId: integer("automation_id").references(() => crmAutomations.id, { onDelete: "cascade" }).notNull(),
      contactId: integer("contact_id").references(() => crmContacts.id),
      // Execution status
      status: varchar("status", { length: 20 }).notNull().default("running"),
      // running, completed, failed, cancelled
      // Progress
      currentStep: integer("current_step").default(0),
      totalSteps: integer("total_steps").default(0),
      // Timing
      startedAt: timestamp("started_at").defaultNow(),
      completedAt: timestamp("completed_at"),
      scheduledNextStep: timestamp("scheduled_next_step"),
      // Error handling
      errorMessage: text("error_message"),
      // Context
      triggerData: jsonb("trigger_data").default({}),
      executionLog: jsonb("execution_log").default([])
    });
    insertCrmAutomationSchema = createInsertSchema(crmAutomations).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      runCount: true,
      lastRunAt: true
    });
    insertCrmAutomationStepSchema = createInsertSchema(crmAutomationSteps).omit({
      id: true,
      createdAt: true
    });
    apiKeys = pgTable("api_keys", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }),
      // Key identification
      name: varchar("name", { length: 100 }).notNull(),
      keyHash: varchar("key_hash", { length: 64 }).notNull().unique(),
      // SHA-256 hash of the actual key
      keyPrefix: varchar("key_prefix", { length: 8 }).notNull(),
      // First 8 chars for identification
      // Permissions and scopes
      scopes: text("scopes").array().default([]),
      // read:contacts, write:contacts, read:deals, etc.
      // Rate limiting
      rateLimit: integer("rate_limit").default(1e3),
      // requests per hour
      requestsThisHour: integer("requests_this_hour").default(0),
      rateLimitResetAt: timestamp("rate_limit_reset_at"),
      // Tracking
      lastUsedAt: timestamp("last_used_at"),
      totalRequests: integer("total_requests").default(0),
      // Status
      isActive: boolean("is_active").default(true),
      expiresAt: timestamp("expires_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_api_keys_hash").on(table.keyHash),
      index("idx_api_keys_client").on(table.clientId)
    ]);
    insertApiKeySchema = createInsertSchema(apiKeys).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    webhookSubscriptions = pgTable("webhook_subscriptions", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }),
      // Webhook configuration
      url: text("url").notNull(),
      secret: varchar("secret", { length: 64 }).notNull(),
      // For signature verification
      // Events to subscribe to
      events: text("events").array().default([]),
      // contact.created, deal.updated, etc.
      // Status
      isActive: boolean("is_active").default(true),
      failureCount: integer("failure_count").default(0),
      lastFailedAt: timestamp("last_failed_at"),
      lastSuccessAt: timestamp("last_success_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertWebhookSubscriptionSchema = createInsertSchema(webhookSubscriptions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    supportTickets = pgTable("support_tickets", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      // Ticket details
      subject: varchar("subject", { length: 255 }).notNull(),
      description: text("description").notNull(),
      category: varchar("category", { length: 50 }).default("general"),
      // general, billing, technical, feature_request
      // Status tracking
      status: varchar("status", { length: 30 }).default("open"),
      // open, in_progress, waiting_on_client, resolved, closed
      priority: varchar("priority", { length: 20 }).default("medium"),
      // low, medium, high, urgent
      // Assignment
      assignedToId: integer("assigned_to_id").references(() => clients.id),
      assignedAt: timestamp("assigned_at"),
      // Resolution
      resolution: text("resolution"),
      resolvedAt: timestamp("resolved_at"),
      // SLA tracking
      firstResponseAt: timestamp("first_response_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_ticket_client").on(table.clientId),
      index("idx_ticket_status").on(table.status)
    ]);
    ticketComments = pgTable("ticket_comments", {
      id: serial("id").primaryKey(),
      ticketId: integer("ticket_id").references(() => supportTickets.id, { onDelete: "cascade" }).notNull(),
      // Comment author
      authorId: integer("author_id").references(() => clients.id),
      authorType: varchar("author_type", { length: 20 }).notNull(),
      // admin, client
      // Content
      content: text("content").notNull(),
      isInternal: boolean("is_internal").default(false),
      // internal notes vs client-visible
      createdAt: timestamp("created_at").defaultNow()
    });
    prescriptions = pgTable("prescriptions", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id),
      assessmentId: integer("assessment_id").references(() => assessments.id),
      // Prescription details
      title: varchar("title", { length: 255 }).notNull(),
      summary: text("summary"),
      // AI-generated content
      recommendations: jsonb("recommendations"),
      // Array of recommendation objects
      actionItems: jsonb("action_items"),
      // Prioritized action items
      timeline: jsonb("timeline"),
      // Implementation timeline
      // Status workflow
      status: varchar("status", { length: 30 }).default("pending_review"),
      // pending_review, approved, delivered, in_progress, completed
      // Review workflow
      reviewedById: integer("reviewed_by_id").references(() => clients.id),
      reviewedAt: timestamp("reviewed_at"),
      reviewNotes: text("review_notes"),
      // Delivery tracking
      deliveredAt: timestamp("delivered_at"),
      viewedAt: timestamp("viewed_at"),
      // Implementation tracking
      implementationProgress: integer("implementation_progress").default(0),
      // 0-100
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_prescription_client").on(table.clientId),
      index("idx_prescription_status").on(table.status)
    ]);
    adminActivityLog = pgTable("admin_activity_log", {
      id: serial("id").primaryKey(),
      adminId: integer("admin_id").references(() => clients.id),
      // Action details
      action: varchar("action", { length: 100 }).notNull(),
      // view_client, update_status, approve_prescription, etc.
      resourceType: varchar("resource_type", { length: 50 }),
      // client, ticket, prescription, etc.
      resourceId: integer("resource_id"),
      // Context
      details: jsonb("details"),
      ipAddress: varchar("ip_address", { length: 45 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertTicketCommentSchema = createInsertSchema(ticketComments).omit({
      id: true,
      createdAt: true
    });
    insertPrescriptionSchema = createInsertSchema(prescriptions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertAdminActivityLogSchema = createInsertSchema(adminActivityLog).omit({
      id: true,
      createdAt: true
    });
    updateSupportTicketSchema = z.object({
      status: z.enum(["open", "in_progress", "waiting_on_client", "resolved", "closed"]).optional(),
      priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
      resolution: z.string().optional()
    });
    updatePrescriptionSchema = z.object({
      status: z.enum(["pending_review", "approved", "delivered", "in_progress", "completed"]).optional(),
      reviewNotes: z.string().optional(),
      implementationProgress: z.number().min(0).max(100).optional()
    });
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/services/platforms/basePlatformAdapter.ts
var BasePlatformAdapter;
var init_basePlatformAdapter = __esm({
  "server/services/platforms/basePlatformAdapter.ts"() {
    "use strict";
    BasePlatformAdapter = class {
      platform;
      credentials;
      constructor(platform, credentials) {
        this.platform = platform;
        this.credentials = credentials;
      }
      /**
       * Refresh access token if needed
       */
      async refreshAccessToken() {
        throw new Error(`${this.platform} does not support token refresh`);
      }
      /**
       * Delete a post from the platform
       */
      async deletePost(platformPostId) {
        throw new Error(`${this.platform} does not support post deletion`);
      }
      /**
       * Update a post on the platform (if supported)
       */
      async updatePost(platformPostId, post) {
        throw new Error(`${this.platform} does not support post updates`);
      }
    };
  }
});

// server/services/platforms/facebookAdapter.ts
var FacebookAdapter, InstagramAdapter;
var init_facebookAdapter = __esm({
  "server/services/platforms/facebookAdapter.ts"() {
    "use strict";
    init_basePlatformAdapter();
    FacebookAdapter = class extends BasePlatformAdapter {
      API_VERSION = "v18.0";
      BASE_URL = `https://graph.facebook.com/${this.API_VERSION}`;
      constructor(credentials) {
        super("facebook", credentials);
      }
      async publish(post) {
        try {
          const pageId = this.credentials.platformAccountId;
          if (!pageId) {
            return { success: false, error: "Facebook Page ID not configured" };
          }
          const postData = {
            message: post.text,
            link: post.link,
            published: !post.scheduledTime
          };
          if (post.scheduledTime) {
            postData.scheduled_publish_time = Math.floor(post.scheduledTime.getTime() / 1e3);
          }
          if (post.mediaUrls && post.mediaUrls.length > 0) {
            const mediaIds = await this.uploadMedia(post.mediaUrls);
            postData.attached_media = mediaIds.map((id) => ({ media_fbid: id }));
          }
          const url = `${this.BASE_URL}/${pageId}/feed`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...postData,
              access_token: this.credentials.accessToken
            })
          });
          const data = await response.json();
          if (!response.ok) {
            return {
              success: false,
              error: data.error?.message || "Failed to publish to Facebook"
            };
          }
          return {
            success: true,
            platformPostId: data.id,
            platformUrl: `https://facebook.com/${data.id}`,
            publishedAt: post.scheduledTime || /* @__PURE__ */ new Date()
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }
      }
      async getAnalytics(platformPostId) {
        try {
          const url = `${this.BASE_URL}/${platformPostId}?fields=insights.metric(post_impressions,post_engaged_users,post_clicks,post_reactions_like_total)&access_token=${this.credentials.accessToken}`;
          const response = await fetch(url);
          const data = await response.json();
          const insights = data.insights?.data || [];
          const metricsMap = new Map(insights.map((i) => [i.name, i.values[0]?.value || 0]));
          return {
            impressions: metricsMap.get("post_impressions") || 0,
            engagement: metricsMap.get("post_engaged_users") || 0,
            clicks: metricsMap.get("post_clicks") || 0,
            likes: metricsMap.get("post_reactions_like_total") || 0
          };
        } catch (error) {
          console.error("[FacebookAdapter] Failed to fetch analytics:", error);
          return {};
        }
      }
      async validateCredentials() {
        try {
          const url = `${this.BASE_URL}/me?access_token=${this.credentials.accessToken}`;
          const response = await fetch(url);
          return response.ok;
        } catch {
          return false;
        }
      }
      async refreshAccessToken() {
        throw new Error("Facebook uses long-lived tokens. Implement OAuth flow for refresh.");
      }
      getCapabilities() {
        return {
          maxTextLength: 63206,
          maxMediaCount: 10,
          supportsVideo: true,
          supportsMultipleImages: true,
          supportsScheduling: true,
          supportsHashtags: true,
          supportsLinks: true
        };
      }
      async deletePost(platformPostId) {
        try {
          const url = `${this.BASE_URL}/${platformPostId}?access_token=${this.credentials.accessToken}`;
          const response = await fetch(url, { method: "DELETE" });
          return response.ok;
        } catch {
          return false;
        }
      }
      async uploadMedia(mediaUrls) {
        const pageId = this.credentials.platformAccountId;
        const mediaIds = [];
        const uploadErrors = [];
        for (const mediaUrl of mediaUrls) {
          try {
            const isVideo = this.isVideoUrl(mediaUrl);
            const endpoint = isVideo ? "videos" : "photos";
            const url = `${this.BASE_URL}/${pageId}/${endpoint}`;
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                [isVideo ? "file_url" : "url"]: mediaUrl,
                published: false,
                access_token: this.credentials.accessToken
              })
            });
            const data = await response.json();
            if (!response.ok) {
              const errorMsg = `Failed to upload ${endpoint}: ${data.error?.message || JSON.stringify(data)}`;
              console.error(`[FacebookAdapter] ${errorMsg}`);
              uploadErrors.push(errorMsg);
              continue;
            }
            if (data.id) {
              mediaIds.push(data.id);
            }
          } catch (error) {
            const errorMsg = `Upload exception: ${error instanceof Error ? error.message : "Unknown error"}`;
            console.error("[FacebookAdapter]", errorMsg);
            uploadErrors.push(errorMsg);
          }
        }
        if (uploadErrors.length > 0 && mediaIds.length === 0) {
          throw new Error(`All media uploads failed: ${uploadErrors.join("; ")}`);
        }
        if (uploadErrors.length > 0) {
          console.warn(`[FacebookAdapter] Some media uploads failed (${uploadErrors.length}/${mediaUrls.length}): ${uploadErrors.join("; ")}`);
        }
        return mediaIds;
      }
      isVideoUrl(url) {
        const videoExtensions = [".mp4", ".mov", ".avi", ".wmv", ".flv", ".webm"];
        const lowerUrl = url.toLowerCase();
        return videoExtensions.some((ext) => lowerUrl.includes(ext)) || lowerUrl.includes("video");
      }
    };
    InstagramAdapter = class extends BasePlatformAdapter {
      API_VERSION = "v18.0";
      BASE_URL = `https://graph.facebook.com/${this.API_VERSION}`;
      constructor(credentials) {
        super("instagram", credentials);
      }
      async publish(post) {
        try {
          const igAccountId = this.credentials.platformAccountId;
          if (!igAccountId) {
            return { success: false, error: "Instagram Business Account ID not configured" };
          }
          const mediaObject = {
            caption: [post.text, ...post.hashtags || []].filter(Boolean).join(" ")
          };
          if (post.mediaUrls && post.mediaUrls.length > 0) {
            if (post.mediaUrls.length === 1) {
              const isVideo = post.mediaUrls[0].includes(".mp4") || post.mediaUrls[0].includes("video");
              mediaObject.media_type = isVideo ? "VIDEO" : "IMAGE";
              if (isVideo) {
                mediaObject.video_url = post.mediaUrls[0];
              } else {
                mediaObject.image_url = post.mediaUrls[0];
              }
            } else {
              mediaObject.media_type = "CAROUSEL_ALBUM";
            }
          }
          const containerUrl = `${this.BASE_URL}/${igAccountId}/media`;
          const containerResponse = await fetch(containerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...mediaObject,
              access_token: this.credentials.accessToken
            })
          });
          const containerData = await containerResponse.json();
          if (!containerResponse.ok) {
            return {
              success: false,
              error: containerData.error?.message || "Failed to create Instagram media container"
            };
          }
          const publishUrl = `${this.BASE_URL}/${igAccountId}/media_publish`;
          const publishResponse = await fetch(publishUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              creation_id: containerData.id,
              access_token: this.credentials.accessToken
            })
          });
          const publishData = await publishResponse.json();
          if (!publishResponse.ok) {
            return {
              success: false,
              error: publishData.error?.message || "Failed to publish to Instagram"
            };
          }
          return {
            success: true,
            platformPostId: publishData.id,
            platformUrl: `https://instagram.com/p/${publishData.id}`,
            publishedAt: /* @__PURE__ */ new Date()
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }
      }
      async getAnalytics(platformPostId) {
        try {
          const url = `${this.BASE_URL}/${platformPostId}/insights?metric=impressions,engagement,reach,saved,likes,comments&access_token=${this.credentials.accessToken}`;
          const response = await fetch(url);
          const data = await response.json();
          const metrics = data.data || [];
          const metricsMap = new Map(metrics.map((m) => [m.name, m.values[0]?.value || 0]));
          return {
            impressions: metricsMap.get("impressions") || 0,
            engagement: metricsMap.get("engagement") || 0,
            likes: metricsMap.get("likes") || 0,
            comments: metricsMap.get("comments") || 0,
            saves: metricsMap.get("saved") || 0
          };
        } catch (error) {
          console.error("[InstagramAdapter] Failed to fetch analytics:", error);
          return {};
        }
      }
      async validateCredentials() {
        try {
          const url = `${this.BASE_URL}/${this.credentials.platformAccountId}?fields=id&access_token=${this.credentials.accessToken}`;
          const response = await fetch(url);
          return response.ok;
        } catch {
          return false;
        }
      }
      getCapabilities() {
        return {
          maxTextLength: 2200,
          maxMediaCount: 10,
          supportsVideo: true,
          supportsMultipleImages: true,
          supportsScheduling: false,
          supportsHashtags: true,
          supportsLinks: false
        };
      }
      async deletePost(platformPostId) {
        try {
          const url = `${this.BASE_URL}/${platformPostId}?access_token=${this.credentials.accessToken}`;
          const response = await fetch(url, { method: "DELETE" });
          return response.ok;
        } catch {
          return false;
        }
      }
    };
  }
});

// server/services/platforms/linkedinAdapter.ts
var LinkedInAdapter;
var init_linkedinAdapter = __esm({
  "server/services/platforms/linkedinAdapter.ts"() {
    "use strict";
    init_basePlatformAdapter();
    LinkedInAdapter = class extends BasePlatformAdapter {
      BASE_URL = "https://api.linkedin.com/v2";
      constructor(credentials) {
        super("linkedin", credentials);
      }
      async publish(post) {
        try {
          const personUrn = this.credentials.platformAccountId || `urn:li:person:${this.credentials.accountId}`;
          const shareRequest = {
            author: personUrn,
            lifecycleState: "PUBLISHED",
            specificContent: {
              "com.linkedin.ugc.ShareContent": {
                shareCommentary: {
                  text: [post.text, ...post.hashtags || []].filter(Boolean).join(" ")
                },
                shareMediaCategory: "NONE"
              }
            },
            visibility: {
              "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
          };
          if (post.mediaUrls && post.mediaUrls.length > 0) {
            shareRequest.specificContent["com.linkedin.ugc.ShareContent"].shareMediaCategory = "IMAGE";
            const mediaUrns = await this.uploadMedia(post.mediaUrls, personUrn);
            shareRequest.specificContent["com.linkedin.ugc.ShareContent"].media = mediaUrns.map((urn) => ({
              status: "READY",
              media: urn
            }));
          } else if (post.link) {
            shareRequest.specificContent["com.linkedin.ugc.ShareContent"].shareMediaCategory = "ARTICLE";
          }
          const url = `${this.BASE_URL}/ugcPosts`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`,
              "Content-Type": "application/json",
              "X-Restli-Protocol-Version": "2.0.0"
            },
            body: JSON.stringify(shareRequest)
          });
          const data = await response.json();
          if (!response.ok) {
            return {
              success: false,
              error: data.message || "Failed to publish to LinkedIn"
            };
          }
          const postId = data.id;
          return {
            success: true,
            platformPostId: postId,
            platformUrl: `https://www.linkedin.com/feed/update/${postId}`,
            publishedAt: /* @__PURE__ */ new Date()
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }
      }
      async getAnalytics(platformPostId) {
        try {
          const url = `${this.BASE_URL}/socialActions/${platformPostId}/statistics`;
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`,
              "X-Restli-Protocol-Version": "2.0.0"
            }
          });
          const data = await response.json();
          return {
            impressions: data.impressionCount || 0,
            engagement: data.engagementCount || 0,
            clicks: data.clickCount || 0,
            likes: data.likeCount || 0,
            comments: data.commentCount || 0,
            shares: data.shareCount || 0
          };
        } catch (error) {
          console.error("[LinkedInAdapter] Failed to fetch analytics:", error);
          return {};
        }
      }
      async validateCredentials() {
        try {
          const url = `${this.BASE_URL}/me`;
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
      async refreshAccessToken() {
        if (!this.credentials.refreshToken) {
          throw new Error("No refresh token available");
        }
        try {
          const url = "https://www.linkedin.com/oauth/v2/accessToken";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: this.credentials.refreshToken,
              client_id: process.env.LINKEDIN_CLIENT_ID || "",
              client_secret: process.env.LINKEDIN_CLIENT_SECRET || ""
            })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error_description || "Failed to refresh token");
          }
          return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token || this.credentials.refreshToken,
            expiresAt: new Date(Date.now() + data.expires_in * 1e3)
          };
        } catch (error) {
          throw error;
        }
      }
      getCapabilities() {
        return {
          maxTextLength: 3e3,
          maxMediaCount: 9,
          supportsVideo: true,
          supportsMultipleImages: true,
          supportsScheduling: false,
          supportsHashtags: true,
          supportsLinks: true
        };
      }
      async deletePost(platformPostId) {
        try {
          const url = `${this.BASE_URL}/ugcPosts/${platformPostId}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
      async uploadMedia(mediaUrls, personUrn) {
        const mediaUrns = [];
        for (const mediaUrl of mediaUrls) {
          try {
            const registerUrl = `${this.BASE_URL}/assets?action=registerUpload`;
            const registerResponse = await fetch(registerUrl, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${this.credentials.accessToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                registerUploadRequest: {
                  recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                  owner: personUrn,
                  serviceRelationships: [
                    {
                      relationshipType: "OWNER",
                      identifier: "urn:li:userGeneratedContent"
                    }
                  ]
                }
              })
            });
            const registerData = await registerResponse.json();
            const uploadUrl = registerData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
            const asset = registerData.value.asset;
            const mediaResponse = await fetch(mediaUrl);
            const mediaBuffer = await mediaResponse.arrayBuffer();
            await fetch(uploadUrl, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${this.credentials.accessToken}`
              },
              body: mediaBuffer
            });
            mediaUrns.push(asset);
          } catch (error) {
            console.error("[LinkedInAdapter] Failed to upload media:", error);
          }
        }
        return mediaUrns;
      }
    };
  }
});

// server/services/platforms/xAdapter.ts
var XAdapter;
var init_xAdapter = __esm({
  "server/services/platforms/xAdapter.ts"() {
    "use strict";
    init_basePlatformAdapter();
    XAdapter = class extends BasePlatformAdapter {
      BASE_URL = "https://api.twitter.com/2";
      constructor(credentials) {
        super("x", credentials);
      }
      async publish(post) {
        try {
          let tweetText = post.text || "";
          if (post.hashtags && post.hashtags.length > 0) {
            tweetText += " " + post.hashtags.join(" ");
          }
          if (post.link && !tweetText.includes(post.link)) {
            tweetText += " " + post.link;
          }
          const tweetRequest = {
            text: tweetText.trim().substring(0, 280)
          };
          if (post.mediaUrls && post.mediaUrls.length > 0) {
            const mediaIds = await this.uploadMedia(post.mediaUrls);
            if (mediaIds.length > 0) {
              tweetRequest.media = {
                media_ids: mediaIds
              };
            }
          }
          const url = `${this.BASE_URL}/tweets`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(tweetRequest)
          });
          const data = await response.json();
          if (!response.ok) {
            return {
              success: false,
              error: data.detail || data.title || "Failed to publish to X"
            };
          }
          return {
            success: true,
            platformPostId: data.data.id,
            platformUrl: `https://twitter.com/i/web/status/${data.data.id}`,
            publishedAt: /* @__PURE__ */ new Date()
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }
      }
      async getAnalytics(platformPostId) {
        try {
          const url = `${this.BASE_URL}/tweets/${platformPostId}?tweet.fields=public_metrics`;
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          const data = await response.json();
          const metrics = data.data?.public_metrics || {};
          return {
            impressions: metrics.impression_count || 0,
            likes: metrics.like_count || 0,
            comments: metrics.reply_count || 0,
            shares: metrics.retweet_count || 0,
            engagement: (metrics.like_count || 0) + (metrics.reply_count || 0) + (metrics.retweet_count || 0)
          };
        } catch (error) {
          console.error("[XAdapter] Failed to fetch analytics:", error);
          return {};
        }
      }
      async validateCredentials() {
        try {
          const url = `${this.BASE_URL}/users/me`;
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
      getCapabilities() {
        return {
          maxTextLength: 280,
          maxMediaCount: 4,
          supportsVideo: true,
          supportsMultipleImages: true,
          supportsScheduling: false,
          supportsHashtags: true,
          supportsLinks: true
        };
      }
      async deletePost(platformPostId) {
        try {
          const url = `${this.BASE_URL}/tweets/${platformPostId}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
      async uploadMedia(mediaUrls) {
        const UPLOAD_URL = "https://upload.twitter.com/1.1/media/upload.json";
        const mediaIds = [];
        for (const mediaUrl of mediaUrls.slice(0, 4)) {
          try {
            const mediaResponse = await fetch(mediaUrl);
            const mediaBuffer = await mediaResponse.arrayBuffer();
            const mediaBase64 = Buffer.from(mediaBuffer).toString("base64");
            const formData = new URLSearchParams();
            formData.append("media_data", mediaBase64);
            const uploadResponse = await fetch(UPLOAD_URL, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${this.credentials.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: formData
            });
            const uploadData = await uploadResponse.json();
            if (uploadData.media_id_string) {
              mediaIds.push(uploadData.media_id_string);
            }
          } catch (error) {
            console.error("[XAdapter] Failed to upload media:", error);
          }
        }
        return mediaIds;
      }
    };
  }
});

// server/services/platforms/googleBusinessAdapter.ts
var GoogleBusinessAdapter;
var init_googleBusinessAdapter = __esm({
  "server/services/platforms/googleBusinessAdapter.ts"() {
    "use strict";
    init_basePlatformAdapter();
    GoogleBusinessAdapter = class extends BasePlatformAdapter {
      BASE_URL = "https://mybusiness.googleapis.com/v4";
      constructor(credentials) {
        super("google_business", credentials);
      }
      async publish(post) {
        try {
          const locationId = this.credentials.platformAccountId;
          if (!locationId) {
            return { success: false, error: "Google Business Location ID not configured" };
          }
          const localPost = {
            languageCode: "en",
            summary: (post.text || "").substring(0, 1500),
            topicType: "STANDARD"
          };
          if (post.link) {
            localPost.callToAction = {
              actionType: "LEARN_MORE",
              url: post.link
            };
          }
          if (post.mediaUrls && post.mediaUrls.length > 0) {
            localPost.media = post.mediaUrls.slice(0, 10).map((url2) => ({
              mediaFormat: url2.includes(".mp4") || url2.includes("video") ? "VIDEO" : "PHOTO",
              sourceUrl: url2
            }));
          }
          const url = `${this.BASE_URL}/${locationId}/localPosts`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(localPost)
          });
          const data = await response.json();
          if (!response.ok) {
            return {
              success: false,
              error: data.error?.message || "Failed to publish to Google Business Profile"
            };
          }
          return {
            success: true,
            platformPostId: data.name,
            platformUrl: `https://business.google.com/posts/l/${locationId}`,
            publishedAt: /* @__PURE__ */ new Date()
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }
      }
      async getAnalytics(platformPostId) {
        try {
          const url = `${this.BASE_URL}/${platformPostId}/insights`;
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          const data = await response.json();
          return {
            impressions: data.searchesViewedOnMaps || 0,
            clicks: data.actionsPerformed?.WEBSITE || 0
          };
        } catch (error) {
          console.error("[GoogleBusinessAdapter] Failed to fetch analytics:", error);
          return {};
        }
      }
      async validateCredentials() {
        try {
          const url = `${this.BASE_URL}/accounts`;
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
      async refreshAccessToken() {
        if (!this.credentials.refreshToken) {
          throw new Error("No refresh token available");
        }
        try {
          const url = "https://oauth2.googleapis.com/token";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: this.credentials.refreshToken,
              client_id: process.env.GOOGLE_CLIENT_ID || "",
              client_secret: process.env.GOOGLE_CLIENT_SECRET || ""
            })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error_description || "Failed to refresh token");
          }
          return {
            accessToken: data.access_token,
            refreshToken: this.credentials.refreshToken,
            expiresAt: new Date(Date.now() + data.expires_in * 1e3)
          };
        } catch (error) {
          throw error;
        }
      }
      getCapabilities() {
        return {
          maxTextLength: 1500,
          maxMediaCount: 10,
          supportsVideo: true,
          supportsMultipleImages: true,
          supportsScheduling: false,
          supportsHashtags: false,
          supportsLinks: true
        };
      }
      async deletePost(platformPostId) {
        try {
          const url = `${this.BASE_URL}/${platformPostId}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${this.credentials.accessToken}`
            }
          });
          return response.ok;
        } catch {
          return false;
        }
      }
    };
  }
});

// server/services/platforms/platformFactory.ts
var PlatformFactory;
var init_platformFactory = __esm({
  "server/services/platforms/platformFactory.ts"() {
    "use strict";
    init_facebookAdapter();
    init_linkedinAdapter();
    init_xAdapter();
    init_googleBusinessAdapter();
    PlatformFactory = class _PlatformFactory {
      /**
       * Create a platform adapter instance
       */
      static createAdapter(platform, credentials) {
        switch (platform) {
          case "facebook":
            return new FacebookAdapter(credentials);
          case "instagram":
            return new InstagramAdapter(credentials);
          case "linkedin":
            return new LinkedInAdapter(credentials);
          case "x":
            return new XAdapter(credentials);
          case "google_business":
            return new GoogleBusinessAdapter(credentials);
          case "tiktok":
          case "snapchat":
            throw new Error(`${platform} integration coming in Phase 2`);
          default:
            throw new Error(`Unsupported platform: ${platform}`);
        }
      }
      /**
       * Get list of supported platforms for a subscription tier
       */
      static getSupportedPlatforms(tier) {
        const phase1Platforms = [
          "facebook",
          "instagram",
          "linkedin",
          "x",
          "google_business"
        ];
        const maxPlatforms = tier === "diy" ? 3 : 7;
        return phase1Platforms.slice(0, maxPlatforms);
      }
      /**
       * Validate platform credentials
       */
      static async validateCredentials(platform, credentials) {
        try {
          const adapter = _PlatformFactory.createAdapter(platform, credentials);
          return await adapter.validateCredentials();
        } catch (error) {
          console.error(`[PlatformFactory] Failed to validate ${platform} credentials:`, error);
          return false;
        }
      }
      /**
       * Check if a platform is available (Phase 1 vs Phase 2)
       */
      static isPlatformAvailable(platform) {
        const phase1Platforms = [
          "facebook",
          "instagram",
          "linkedin",
          "x",
          "google_business"
        ];
        return phase1Platforms.includes(platform);
      }
      /**
       * Get platform display name
       */
      static getPlatformDisplayName(platform) {
        const displayNames = {
          facebook: "Facebook",
          instagram: "Instagram",
          linkedin: "LinkedIn",
          x: "X (Twitter)",
          google_business: "Google Business Profile",
          tiktok: "TikTok",
          snapchat: "Snapchat"
        };
        return displayNames[platform] || platform;
      }
    };
  }
});

// server/workers/contentPublisher.ts
var contentPublisher_exports = {};
__export(contentPublisher_exports, {
  publishPost: () => publishPost
});
import { eq as eq3, and as and3 } from "drizzle-orm";
async function publishPost(post) {
  const { id: postId, clientId, platforms } = post;
  if (!platforms || platforms.length === 0) {
    throw new Error("No platforms specified for publishing");
  }
  console.log(`[ContentPublisher] Publishing post ${postId} for client ${clientId}`);
  const publishResults = {};
  const publishErrors = {};
  for (const platform of platforms) {
    try {
      console.log(`[ContentPublisher] Publishing to ${platform} - Post ${postId}`);
      const [account] = await db.select().from(socialMediaAccounts).where(
        and3(
          eq3(socialMediaAccounts.clientId, clientId),
          eq3(socialMediaAccounts.platform, platform)
        )
      );
      if (!account) {
        throw new Error(`No active ${platform} account found for client ${clientId}`);
      }
      let credentials = {
        accessToken: account.accessToken,
        refreshToken: account.refreshToken || void 0,
        expiresAt: account.tokenExpiresAt || void 0,
        accountId: String(account.id),
        platformAccountId: account.platformAccountId || void 0
      };
      const needsRefresh = account.tokenExpiresAt && /* @__PURE__ */ new Date() > account.tokenExpiresAt;
      const canRefresh = account.refreshToken && ["linkedin", "x", "google_business"].includes(platform);
      if (needsRefresh && canRefresh) {
        console.log(`[ContentPublisher] Access token expired for ${platform}, refreshing...`);
        try {
          const tempAdapter = PlatformFactory.createAdapter(platform, credentials);
          const refreshedCreds = await tempAdapter.refreshAccessToken();
          await db.update(socialMediaAccounts).set({
            accessToken: refreshedCreds.accessToken,
            refreshToken: refreshedCreds.refreshToken || account.refreshToken,
            tokenExpiresAt: refreshedCreds.expiresAt || null
          }).where(eq3(socialMediaAccounts.id, account.id));
          credentials = {
            ...credentials,
            accessToken: refreshedCreds.accessToken,
            refreshToken: refreshedCreds.refreshToken || credentials.refreshToken,
            expiresAt: refreshedCreds.expiresAt
          };
          console.log(`[ContentPublisher] Token refreshed for ${platform}`);
        } catch (refreshError) {
          console.error(`[ContentPublisher] Failed to refresh token for ${platform}:`, refreshError);
          throw new Error(`Token expired and refresh failed: ${refreshError.message}`);
        }
      } else if (needsRefresh && !canRefresh) {
        console.warn(`[ContentPublisher] ${platform} token appears expired but uses long-lived tokens. Attempting publish anyway.`);
      }
      const adapter = PlatformFactory.createAdapter(platform, credentials);
      const capabilities = adapter.getCapabilities();
      let mediaUrls = [];
      if (post.mediaIds && post.mediaIds.length > 0) {
        const { contentMedia: contentMedia2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
        const media = await db.select().from(contentMedia2).where(eq3(contentMedia2.id, post.mediaIds[0]));
        mediaUrls = media.map((m) => m.storageUrl).filter(Boolean);
      }
      const hasVideo = mediaUrls.some((url) => url.includes(".mp4") || url.includes("video"));
      if (hasVideo && !capabilities.supportsVideo) {
        throw new Error(`${platform} does not support video posts`);
      }
      const mediaCount = mediaUrls.length;
      if (mediaCount > capabilities.maxMediaCount) {
        throw new Error(`${platform} supports maximum ${capabilities.maxMediaCount} media items, but ${mediaCount} were provided`);
      }
      let scheduledTime = post.scheduledFor || void 0;
      if (post.scheduledFor && !capabilities.supportsScheduling) {
        console.warn(`[ContentPublisher] ${platform} does not support scheduling. Publishing immediately instead.`);
        scheduledTime = void 0;
      }
      const result = await adapter.publish({
        text: post.caption,
        mediaUrls: mediaUrls.length > 0 ? mediaUrls : void 0,
        scheduledTime,
        hashtags: post.hashtags || void 0
      });
      if (result.success) {
        publishResults[platform] = {
          platformPostId: result.platformPostId,
          url: result.platformUrl,
          publishedAt: result.publishedAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
        };
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      console.error(`[ContentPublisher] Failed to publish to ${platform}:`, error);
      publishErrors[platform] = {
        error: error.message,
        code: error.code,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  const hasErrors = Object.keys(publishErrors).length > 0;
  const allFailed = Object.keys(publishResults).length === 0;
  if (allFailed) {
    throw new Error(`Publishing failed on all platforms: ${JSON.stringify(publishErrors)}`);
  }
  console.log(`[ContentPublisher] Post ${postId} publishing complete. Results:`, {
    published: Object.keys(publishResults),
    failed: Object.keys(publishErrors)
  });
  await db.update(contentPosts).set({
    publishResults,
    publishErrors: hasErrors ? publishErrors : null
  }).where(eq3(contentPosts.id, postId));
  return {
    postId,
    success: !allFailed,
    publishedTo: Object.keys(publishResults),
    failedOn: Object.keys(publishErrors)
  };
}
var init_contentPublisher = __esm({
  "server/workers/contentPublisher.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_platformFactory();
    console.log("[ContentPublisher] Database-backed publisher initialized");
  }
});

// server/services/jwt.ts
var jwt_exports = {};
__export(jwt_exports, {
  JWTService: () => JWTService,
  jwtService: () => jwtService
});
import jwt from "jsonwebtoken";
import crypto3 from "crypto";
import { eq as eq16 } from "drizzle-orm";
var JWTService, jwtService;
var init_jwt = __esm({
  "server/services/jwt.ts"() {
    "use strict";
    init_db();
    init_schema();
    JWTService = class {
      keyPair;
      algorithm;
      // Allow HS256 as well
      constructor() {
        console.log("[JWT Service] v2.0.1 - Initializing with HS256 forced mode");
        this.keyPair = this.generateKeyPair();
        const hasValidRSAKeys = this.keyPair.privateKey && this.keyPair.publicKey && this.keyPair.privateKey.length > 100 && this.keyPair.publicKey.length > 100 && this.keyPair.privateKey.includes("-----BEGIN RSA") && this.keyPair.publicKey.includes("-----BEGIN");
        this.algorithm = hasValidRSAKeys ? "RS256" : "HS256";
        console.log(`[JWT Service] v2.0.1 Algorithm selected: ${this.algorithm}`);
        console.log(`[JWT Service] Private key present: ${!!this.keyPair.privateKey && this.keyPair.privateKey.length > 0}, Public key present: ${!!this.keyPair.publicKey && this.keyPair.publicKey.length > 0}`);
        if (this.algorithm === "HS256") {
          const hasSecret = !!process.env.JWT_SECRET;
          console.log(`[JWT Service] JWT_SECRET configured: ${hasSecret}`);
          if (!hasSecret) {
            console.warn("[JWT Service] WARNING: No JWT_SECRET set, using fallback key");
          }
        }
      }
      /**
       * Generate RSA key pair for JWT signing
       */
      generateKeyPair() {
        const existingPrivateKey = process.env.JWT_PRIVATE_KEY;
        const existingPublicKey = process.env.JWT_PUBLIC_KEY;
        if (existingPrivateKey && existingPublicKey) {
          const privateKey = existingPrivateKey.includes("\\n") ? existingPrivateKey.replace(/\\n/g, "\n") : existingPrivateKey;
          const publicKey = existingPublicKey.includes("\\n") ? existingPublicKey.replace(/\\n/g, "\n") : existingPublicKey;
          return { privateKey, publicKey };
        }
        return { publicKey: "", privateKey: "" };
      }
      /**
       * Create a secure dashboard access token for a client
       */
      async createDashboardToken(clientId, externalId) {
        const payload = {
          clientId,
          externalId,
          permissions: ["dashboard:read", "dashboard:write", "campaigns:read", "messages:read"],
          iss: "businessblueprint.io",
          aud: "client-portal"
        };
        const options = {
          algorithm: this.algorithm,
          expiresIn: "24h"
          // 24 hour token expiration
        };
        const signingKey = this.algorithm === "RS256" ? this.keyPair.privateKey : process.env.JWT_SECRET || "fallback-secret-key";
        const token = jwt.sign(payload, signingKey, options);
        await db.insert(dashboardAccess).values({
          clientId,
          accessToken: token,
          dashboardUrl: `/portal?token=${token}`,
          isActive: true
        });
        return token;
      }
      /**
       * Verify and decode a JWT token
       */
      verifyToken(token) {
        try {
          const options = {
            algorithms: [this.algorithm],
            issuer: "businessblueprint.io",
            audience: "client-portal"
          };
          const verificationKey = this.algorithm === "RS256" ? this.keyPair.publicKey : process.env.JWT_SECRET || "fallback-secret-key";
          const decoded = jwt.verify(token, verificationKey, options);
          return decoded;
        } catch (error) {
          throw new Error(`Invalid token: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      /**
       * Refresh a token (create new token with extended expiration)
       */
      async refreshToken(oldToken) {
        try {
          const decoded = this.verifyToken(oldToken);
          const newToken = await this.createDashboardToken(decoded.clientId, decoded.externalId);
          await this.revokeToken(oldToken);
          return newToken;
        } catch (error) {
          throw new Error(`Cannot refresh token: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      /**
       * Revoke a token (mark as inactive in database)
       */
      async revokeToken(token) {
        await db.update(dashboardAccess).set({ isActive: false }).where(eq16(dashboardAccess.accessToken, token));
      }
      /**
       * Check if token is active in database
       */
      async isTokenActive(token) {
        const [record] = await db.select().from(dashboardAccess).where(eq16(dashboardAccess.accessToken, token));
        return record?.isActive || false;
      }
      /**
       * Get public key for external verification
       */
      getPublicKey() {
        return this.keyPair.publicKey || "";
      }
      /**
       * Get JWK (JSON Web Key) for public key distribution
       */
      getJWK() {
        if (this.algorithm === "RS256" && this.keyPair.publicKey) {
          const publicKey = crypto3.createPublicKey(this.keyPair.publicKey);
          const jwk = publicKey.export({ format: "jwk" });
          return {
            ...jwk,
            alg: this.algorithm,
            use: "sig",
            kid: crypto3.createHash("sha256").update(this.keyPair.publicKey).digest("hex").substring(0, 16)
          };
        }
        return null;
      }
    };
    jwtService = new JWTService();
  }
});

// server/services/scheduler.ts
var scheduler_exports = {};
__export(scheduler_exports, {
  getSchedulerStatus: () => getSchedulerStatus,
  startScheduler: () => startScheduler,
  stopScheduler: () => stopScheduler
});
import { eq as eq19, and as and13, lte as lte2, isNull as isNull2, or as or4 } from "drizzle-orm";
import { sql as sql7 } from "drizzle-orm";
function startScheduler() {
  if (isRunning) {
    console.log("[Scheduler] Already running");
    return;
  }
  console.log("[Scheduler] Starting database-backed post scheduler");
  isRunning = true;
  processScheduledPosts().catch((err) => {
    console.error("[Scheduler] Initial processing error:", err);
  });
  schedulerInterval = setInterval(() => {
    processScheduledPosts().catch((err) => {
      console.error("[Scheduler] Processing error:", err);
    });
  }, POLL_INTERVAL_MS);
  console.log("\u2705 Post scheduler started");
}
function stopScheduler() {
  if (!isRunning) {
    return;
  }
  console.log("[Scheduler] Stopping scheduler");
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
  isRunning = false;
}
async function processScheduledPosts() {
  try {
    const duePosts = await db.select().from(contentPosts).where(
      and13(
        eq19(contentPosts.status, "scheduled"),
        lte2(contentPosts.scheduledFor, sql7`NOW()`),
        or4(
          isNull2(contentPosts.lockedAt),
          lte2(contentPosts.lockedAt, sql7`NOW() - INTERVAL '5 minutes'`)
        ),
        or4(
          isNull2(contentPosts.nextRetryAt),
          lte2(contentPosts.nextRetryAt, sql7`NOW()`)
        )
      )
    ).limit(10);
    if (duePosts.length === 0) {
      return;
    }
    console.log(`[Scheduler] Found ${duePosts.length} posts due for publishing`);
    for (const post of duePosts) {
      await processPost(post.id);
    }
  } catch (error) {
    console.error("[Scheduler] Error in processScheduledPosts:", error);
  }
}
async function processPost(postId) {
  try {
    const claimed = await db.update(contentPosts).set({
      lockedAt: sql7`NOW()`,
      status: "publishing"
    }).where(
      and13(
        eq19(contentPosts.id, postId),
        eq19(contentPosts.status, "scheduled"),
        or4(
          isNull2(contentPosts.lockedAt),
          lte2(contentPosts.lockedAt, sql7`NOW() - INTERVAL '5 minutes'`)
        )
      )
    ).returning();
    if (claimed.length === 0) {
      return;
    }
    const post = claimed[0];
    console.log(`[Scheduler] Processing post ${post.id} for client ${post.clientId}`);
    const { publishPost: publishPost2 } = await Promise.resolve().then(() => (init_contentPublisher(), contentPublisher_exports));
    try {
      await publishPost2(post);
      await db.update(contentPosts).set({
        status: "published",
        publishedAt: sql7`NOW()`,
        lockedAt: null,
        lastError: null,
        updatedAt: sql7`NOW()`
      }).where(eq19(contentPosts.id, postId));
      console.log(`[Scheduler] \u2705 Successfully published post ${postId}`);
    } catch (publishError) {
      const attempts = (post.attempts || 0) + 1;
      const maxReached = attempts >= MAX_ATTEMPTS;
      const nextRetryAt = maxReached ? null : new Date(Date.now() + (RETRY_DELAYS[Math.min(attempts - 1, RETRY_DELAYS.length - 1)] || 9e5));
      await db.update(contentPosts).set({
        status: maxReached ? "failed" : "scheduled",
        attempts,
        nextRetryAt: maxReached ? null : nextRetryAt,
        lastError: publishError.message || "Unknown error",
        lockedAt: null,
        updatedAt: sql7`NOW()`
      }).where(eq19(contentPosts.id, postId));
      if (maxReached) {
        console.error(`[Scheduler] \u274C Post ${postId} failed after ${attempts} attempts:`, publishError.message);
      } else {
        console.warn(`[Scheduler] \u26A0\uFE0F  Post ${postId} failed (attempt ${attempts}/${MAX_ATTEMPTS}), retrying at ${nextRetryAt?.toISOString()}`);
      }
    }
  } catch (error) {
    console.error(`[Scheduler] Error processing post ${postId}:`, error);
    try {
      await db.update(contentPosts).set({
        status: "scheduled",
        lockedAt: null,
        lastError: error.message || "Scheduler error",
        updatedAt: sql7`NOW()`
      }).where(eq19(contentPosts.id, postId));
    } catch (releaseError) {
      console.error(`[Scheduler] Failed to release lock for post ${postId}:`, releaseError);
    }
  }
}
function getSchedulerStatus() {
  return {
    isRunning,
    pollInterval: POLL_INTERVAL_MS,
    maxAttempts: MAX_ATTEMPTS,
    retryDelays: RETRY_DELAYS
  };
}
var POLL_INTERVAL_MS, MAX_ATTEMPTS, RETRY_DELAYS, schedulerInterval, isRunning;
var init_scheduler = __esm({
  "server/services/scheduler.ts"() {
    "use strict";
    init_db();
    init_schema();
    POLL_INTERVAL_MS = 1e4;
    MAX_ATTEMPTS = 3;
    RETRY_DELAYS = [6e4, 3e5, 9e5];
    schedulerInterval = null;
    isRunning = false;
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import path from "path";

// server/storage.ts
init_schema();
init_db();
import { eq, desc, and, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async createAssessment(assessmentData) {
    const [assessment] = await db.insert(assessments).values(assessmentData).returning();
    return assessment;
  }
  async getAssessment(id) {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment;
  }
  async updateAssessment(id, data) {
    const [assessment] = await db.update(assessments).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(assessments.id, id)).returning();
    return assessment;
  }
  async getAllAssessments() {
    return await db.select().from(assessments).orderBy(desc(assessments.createdAt));
  }
  async getAssessmentsByEmail(email) {
    return await db.select().from(assessments).where(eq(assessments.email, email)).orderBy(desc(assessments.createdAt));
  }
  async createRecommendation(recommendationData) {
    const [recommendation] = await db.insert(recommendations).values(recommendationData).returning();
    return recommendation;
  }
  async getRecommendationsByAssessmentId(assessmentId) {
    return await db.select().from(recommendations).where(eq(recommendations.assessmentId, assessmentId));
  }
  // Client operations
  async createClient(clientData) {
    const [client2] = await db.insert(clients).values(clientData).returning();
    return client2;
  }
  async getClient(id) {
    const [client2] = await db.select().from(clients).where(eq(clients.id, id));
    return client2 || void 0;
  }
  async getClientByExternalId(externalId) {
    const [client2] = await db.select().from(clients).where(eq(clients.externalId, externalId));
    return client2 || void 0;
  }
  async getClientByEmail(email) {
    const [client2] = await db.select().from(clients).where(eq(clients.email, email));
    return client2 || void 0;
  }
  async updateClient(id, data) {
    const [client2] = await db.update(clients).set(data).where(eq(clients.id, id)).returning();
    return client2;
  }
  async getAllClients() {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }
  async getClientsByEmail(email) {
    return await db.select().from(clients).where(eq(clients.email, email));
  }
  // Inbox operations for Campaign Pro
  async createInboxMessage(messageData) {
    const [message] = await db.insert(inboxMessages).values(messageData).returning();
    return message;
  }
  async getClientMessages(clientId, limit = 50) {
    return await db.select().from(inboxMessages).where(eq(inboxMessages.clientId, clientId)).orderBy(desc(inboxMessages.timestamp)).limit(limit);
  }
  async markMessageRead(messageId) {
    await db.update(inboxMessages).set({ isRead: true }).where(eq(inboxMessages.id, messageId));
  }
  // Campaign operations
  async createCampaign(campaignData) {
    const [campaign] = await db.insert(campaigns).values(campaignData).returning();
    return campaign;
  }
  async getClientCampaigns(clientId) {
    return await db.select().from(campaigns).where(eq(campaigns.clientId, clientId)).orderBy(desc(campaigns.createdAt));
  }
  async getCampaignsByClient(clientId) {
    return this.getClientCampaigns(clientId);
  }
  async getMessagesByClient(clientId) {
    return this.getClientMessages(clientId);
  }
  async updateCampaign(id, data) {
    const [campaign] = await db.update(campaigns).set(data).where(eq(campaigns.id, id)).returning();
    return campaign;
  }
  // Link operations
  async linkAssessmentToClient(clientId, assessmentId) {
    await db.insert(clientAssessments).values({
      clientId,
      assessmentId
    });
  }
  async getClientAssessments(clientId) {
    const result = await db.select({ assessment: assessments }).from(clientAssessments).innerJoin(assessments, eq(clientAssessments.assessmentId, assessments.id)).where(eq(clientAssessments.clientId, clientId));
    return result.map((row) => row.assessment);
  }
  // /send Contact operations
  async createSendContact(contactData) {
    const [contact] = await db.insert(sendContacts).values(contactData).returning();
    return contact;
  }
  async getSendContact(id) {
    const [contact] = await db.select().from(sendContacts).where(eq(sendContacts.id, id));
    return contact;
  }
  async getSendContactsByClient(clientId) {
    return await db.select().from(sendContacts).where(eq(sendContacts.clientId, clientId)).orderBy(desc(sendContacts.createdAt));
  }
  async updateSendContact(id, data) {
    const [contact] = await db.update(sendContacts).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(sendContacts.id, id)).returning();
    return contact;
  }
  async deleteSendContact(id) {
    await db.delete(sendContacts).where(eq(sendContacts.id, id));
  }
  // /send List operations
  async createSendList(listData) {
    const [list] = await db.insert(sendLists).values(listData).returning();
    return list;
  }
  async getSendList(id) {
    const [list] = await db.select().from(sendLists).where(eq(sendLists.id, id));
    return list;
  }
  async getSendListsByClient(clientId) {
    return await db.select().from(sendLists).where(eq(sendLists.clientId, clientId)).orderBy(desc(sendLists.createdAt));
  }
  async updateSendList(id, data) {
    const [list] = await db.update(sendLists).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(sendLists.id, id)).returning();
    return list;
  }
  async deleteSendList(id) {
    await db.delete(sendLists).where(eq(sendLists.id, id));
  }
  // /send List-Contact operations
  async addContactToList(listId, contactId) {
    await db.insert(sendListContacts).values({ listId, contactId }).onConflictDoNothing();
  }
  async removeContactFromList(listId, contactId) {
    await db.delete(sendListContacts).where(and(
      eq(sendListContacts.listId, listId),
      eq(sendListContacts.contactId, contactId)
    ));
  }
  async getListContacts(listId) {
    const result = await db.select({ contact: sendContacts }).from(sendListContacts).innerJoin(sendContacts, eq(sendListContacts.contactId, sendContacts.id)).where(eq(sendListContacts.listId, listId));
    return result.map((row) => row.contact);
  }
  // Brand asset operations
  async createBrandAsset(assetData) {
    const [asset] = await db.insert(brandAssets).values(assetData).returning();
    return asset;
  }
  async getAllBrandAssets() {
    return await db.select().from(brandAssets).orderBy(desc(brandAssets.createdAt));
  }
  async getBrandAssetsByType(type) {
    return await db.select().from(brandAssets).where(eq(brandAssets.type, type)).orderBy(desc(brandAssets.createdAt));
  }
  async getBrandAsset(id) {
    const [asset] = await db.select().from(brandAssets).where(eq(brandAssets.id, id));
    return asset;
  }
  async updateBrandAsset(id, data) {
    const [asset] = await db.update(brandAssets).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(brandAssets.id, id)).returning();
    return asset;
  }
  async deleteBrandAsset(id) {
    await db.delete(brandAssets).where(eq(brandAssets.id, id));
  }
  // Magic link token operations
  async createMagicLinkToken(tokenData) {
    const [token] = await db.insert(magicLinkTokens).values(tokenData).returning();
    return token;
  }
  async getMagicLinkToken(token) {
    const [magicToken] = await db.select().from(magicLinkTokens).where(eq(magicLinkTokens.token, token));
    return magicToken;
  }
  async markTokenAsUsed(token) {
    await db.update(magicLinkTokens).set({ used: true, usedAt: /* @__PURE__ */ new Date() }).where(eq(magicLinkTokens.token, token));
  }
  async cleanupExpiredTokens() {
    const now = /* @__PURE__ */ new Date();
    await db.delete(magicLinkTokens).where(
      sql2`${magicLinkTokens.expiresAt} < ${now}`
    );
  }
  // Subscription & Billing operations
  async getAllSubscriptions() {
    const allSubscriptions = await db.select().from(subscriptions).orderBy(desc(subscriptions.createdAt));
    const result = [];
    for (const subscription of allSubscriptions) {
      const [client2] = await db.select().from(clients).where(eq(clients.id, subscription.clientId));
      const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, subscription.planId));
      const addonSelections = await db.select().from(subscriptionAddonSelections).where(eq(subscriptionAddonSelections.subscriptionId, subscription.id));
      const addons = [];
      for (const selection of addonSelections) {
        const [addon] = await db.select().from(subscriptionAddons).where(eq(subscriptionAddons.id, selection.addonId));
        if (addon) {
          addons.push({ addon, selection });
        }
      }
      const billing = await db.select().from(billingHistory).where(eq(billingHistory.subscriptionId, subscription.id)).orderBy(desc(billingHistory.billingDate)).limit(6);
      if (client2 && plan) {
        result.push({
          subscription,
          client: client2,
          plan,
          addons,
          billingHistory: billing
        });
      }
    }
    return result;
  }
  async getClientSubscription(clientId) {
    const [subscription] = await db.select().from(subscriptions).where(
      and(
        eq(subscriptions.clientId, clientId),
        eq(subscriptions.status, "active")
      )
    ).limit(1);
    if (!subscription) {
      return void 0;
    }
    const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, subscription.planId));
    if (!plan) {
      return void 0;
    }
    const addonSelections = await db.select().from(subscriptionAddonSelections).where(eq(subscriptionAddonSelections.subscriptionId, subscription.id));
    const addons = [];
    for (const selection of addonSelections) {
      const [addon] = await db.select().from(subscriptionAddons).where(eq(subscriptionAddons.id, selection.addonId));
      if (addon) {
        addons.push({
          addon,
          quantity: selection.quantity ?? 1,
          unitPrice: selection.unitPrice ?? "0.00",
          totalPrice: selection.totalPrice ?? "0.00"
        });
      }
    }
    return {
      subscription,
      plan,
      addons,
      nextBillingDate: subscription.nextPaymentDate,
      lastPaymentDate: subscription.lastPaymentDate
    };
  }
  async getClientBillingHistory(clientId, limit = 12) {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.clientId, clientId)).limit(1);
    if (!subscription) {
      return [];
    }
    return await db.select().from(billingHistory).where(eq(billingHistory.subscriptionId, subscription.id)).orderBy(desc(billingHistory.billingDate)).limit(limit);
  }
  async getAllSubscriptionPlans() {
    return await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true)).orderBy(subscriptionPlans.pathway, subscriptionPlans.tierLevel);
  }
  async getAllSubscriptionAddons() {
    return await db.select().from(subscriptionAddons).where(eq(subscriptionAddons.isActive, true)).orderBy(subscriptionAddons.category, subscriptionAddons.name);
  }
  // Account status management
  async updateClientAccountStatus(clientId, newStatus, reason, changedBy) {
    const [client2] = await db.update(clients).set({
      accountStatus: newStatus,
      suspensionReason: reason ?? null,
      statusChangedAt: /* @__PURE__ */ new Date(),
      statusChangedBy: changedBy ?? null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(clients.id, clientId)).returning();
    return client2;
  }
  async recordAccountStatusChange(record) {
    const [history] = await db.insert(accountStatusHistory).values(record).returning();
    return history;
  }
  async getClientAccountStatusHistory(clientId) {
    return await db.select().from(accountStatusHistory).where(eq(accountStatusHistory.clientId, clientId)).orderBy(desc(accountStatusHistory.createdAt));
  }
  // Support Ticket operations
  async getAllTickets() {
    const ticketList = await db.select({
      ticket: supportTickets,
      client: {
        companyName: clients.companyName,
        email: clients.email
      }
    }).from(supportTickets).leftJoin(clients, eq(supportTickets.clientId, clients.id)).orderBy(desc(supportTickets.createdAt));
    return ticketList.map((t) => ({
      ...t.ticket,
      client: t.client
    }));
  }
  async createTicket(data) {
    const [newTicket] = await db.insert(supportTickets).values({
      clientId: data.clientId,
      subject: data.subject,
      description: data.description,
      category: data.category || "general",
      priority: data.priority || "medium",
      status: "open"
    }).returning();
    return newTicket;
  }
  async updateTicket(id, data) {
    const updateData = { updatedAt: /* @__PURE__ */ new Date() };
    if (data.status) updateData.status = data.status;
    if (data.priority) updateData.priority = data.priority;
    if (data.resolution) updateData.resolution = data.resolution;
    if (data.status === "resolved" || data.status === "closed") {
      updateData.resolvedAt = /* @__PURE__ */ new Date();
    }
    const [updatedTicket] = await db.update(supportTickets).set(updateData).where(eq(supportTickets.id, id)).returning();
    return updatedTicket;
  }
  async addTicketComment(ticketId, data) {
    const [newComment] = await db.insert(ticketComments).values({
      ticketId,
      content: data.content,
      isInternal: data.isInternal || false,
      authorType: data.authorType || "admin"
    }).returning();
    const ticket = await db.select().from(supportTickets).where(eq(supportTickets.id, ticketId)).limit(1);
    if (ticket[0] && !ticket[0].firstResponseAt) {
      await db.update(supportTickets).set({ firstResponseAt: /* @__PURE__ */ new Date() }).where(eq(supportTickets.id, ticketId));
    }
    return newComment;
  }
  // Prescription operations
  async getAllPrescriptions() {
    const prescriptionList = await db.select({
      prescription: prescriptions,
      client: {
        companyName: clients.companyName
      }
    }).from(prescriptions).leftJoin(clients, eq(prescriptions.clientId, clients.id)).orderBy(desc(prescriptions.createdAt));
    return prescriptionList.map((p) => ({
      ...p.prescription,
      client: p.client
    }));
  }
  async updatePrescription(id, data) {
    const updateData = { updatedAt: /* @__PURE__ */ new Date() };
    if (data.status) updateData.status = data.status;
    if (data.reviewNotes) updateData.reviewNotes = data.reviewNotes;
    if (data.implementationProgress !== void 0) updateData.implementationProgress = data.implementationProgress;
    if (data.status === "approved") {
      updateData.reviewedAt = /* @__PURE__ */ new Date();
    }
    if (data.status === "delivered") {
      updateData.deliveredAt = /* @__PURE__ */ new Date();
    }
    const [updatedPrescription] = await db.update(prescriptions).set(updateData).where(eq(prescriptions.id, id)).returning();
    return updatedPrescription;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { randomBytes } from "crypto";

// server/routes/content.ts
init_db();
init_schema();
import { Router } from "express";
import { z as z2 } from "zod";
import { eq as eq5, and as and4, desc as desc2, sql as sql4 } from "drizzle-orm";

// server/services/mediaStorage.ts
init_db();
init_schema();
import { nanoid } from "nanoid";
import sharp from "sharp";
import { eq as eq2, and as and2, sql as sql3 } from "drizzle-orm";

// server/objectStorage.ts
import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";

// server/objectAcl.ts
var ACL_POLICY_METADATA_KEY = "custom:aclPolicy";
function isPermissionAllowed(requested, granted) {
  if (requested === "read" /* READ */) {
    return ["read" /* READ */, "write" /* WRITE */].includes(granted);
  }
  return granted === "write" /* WRITE */;
}
function createObjectAccessGroup(group) {
  switch (group.type) {
    default:
      throw new Error(`Unknown access group type: ${group.type}`);
  }
}
async function setObjectAclPolicy(objectFile, aclPolicy) {
  const [exists] = await objectFile.exists();
  if (!exists) {
    throw new Error(`Object not found: ${objectFile.name}`);
  }
  await objectFile.setMetadata({
    metadata: {
      [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy)
    }
  });
}
async function getObjectAclPolicy(objectFile) {
  const [metadata] = await objectFile.getMetadata();
  const aclPolicy = metadata?.metadata?.[ACL_POLICY_METADATA_KEY];
  if (!aclPolicy) {
    return null;
  }
  return JSON.parse(aclPolicy);
}
async function canAccessObject({
  userId,
  objectFile,
  requestedPermission
}) {
  const aclPolicy = await getObjectAclPolicy(objectFile);
  if (!aclPolicy) {
    return false;
  }
  if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
    return true;
  }
  if (!userId) {
    return false;
  }
  if (aclPolicy.owner === userId) {
    return true;
  }
  for (const rule of aclPolicy.aclRules || []) {
    const accessGroup = createObjectAccessGroup(rule.group);
    if (await accessGroup.hasMember(userId) && isPermissionAllowed(requestedPermission, rule.permission)) {
      return true;
    }
  }
  return false;
}

// server/objectStorage.ts
var REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
var objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token"
      }
    },
    universe_domain: "googleapis.com"
  },
  projectId: ""
});
var ObjectNotFoundError = class _ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
  }
};
var ObjectStorageService = class {
  constructor() {
  }
  getPublicObjectSearchPaths() {
    const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
    const paths = Array.from(
      new Set(
        pathsStr.split(",").map((path4) => path4.trim()).filter((path4) => path4.length > 0)
      )
    );
    if (paths.length === 0) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' tool and set PUBLIC_OBJECT_SEARCH_PATHS env var (comma-separated paths)."
      );
    }
    return paths;
  }
  getPrivateObjectDir() {
    const dir = process.env.PRIVATE_OBJECT_DIR || "";
    if (!dir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
      );
    }
    return dir;
  }
  getBucketName() {
    const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID || "";
    if (!bucketId) {
      throw new Error(
        "DEFAULT_OBJECT_STORAGE_BUCKET_ID not set. Create a bucket in 'Object Storage' tool."
      );
    }
    return bucketId;
  }
  async searchPublicObject(filePath) {
    for (const searchPath of this.getPublicObjectSearchPaths()) {
      const fullPath = `${searchPath}/${filePath}`;
      const { bucketName, objectName } = this.parseObjectPath(fullPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);
      const [exists] = await file.exists();
      if (exists) {
        return file;
      }
    }
    return null;
  }
  async downloadObject(file, res, cacheTtlSec = 3600) {
    try {
      const [metadata] = await file.getMetadata();
      const aclPolicy = await getObjectAclPolicy(file);
      const isPublic = aclPolicy?.visibility === "public";
      res.set({
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Content-Length": metadata.size,
        "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`
      });
      const stream = file.createReadStream();
      stream.on("error", (err) => {
        console.error("Stream error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error streaming file" });
        }
      });
      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error downloading file" });
      }
    }
  }
  async getObjectEntityUploadURL() {
    const privateObjectDir = this.getPrivateObjectDir();
    if (!privateObjectDir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
      );
    }
    const objectId = randomUUID();
    const fullPath = `${privateObjectDir}/uploads/${objectId}`;
    const { bucketName, objectName } = this.parseObjectPath(fullPath);
    return this.signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900
    });
  }
  async uploadBuffer(buffer, key, contentType) {
    const bucketName = this.getBucketName();
    const bucket = objectStorageClient.bucket(bucketName);
    const file = bucket.file(key);
    await file.save(buffer, {
      contentType,
      metadata: {
        cacheControl: "public, max-age=31536000"
      }
    });
    return await this.signObjectURL({
      bucketName,
      objectName: key,
      method: "GET",
      ttlSec: 31536e3
    });
  }
  async deleteObject(key) {
    const bucketName = this.getBucketName();
    const bucket = objectStorageClient.bucket(bucketName);
    const file = bucket.file(key);
    await file.delete({ ignoreNotFound: true });
  }
  async getPublicUrl(key) {
    const bucketName = this.getBucketName();
    return await this.signObjectURL({
      bucketName,
      objectName: key,
      method: "GET",
      ttlSec: 31536e3
    });
  }
  async getObjectEntityFile(objectPath) {
    if (!objectPath.startsWith("/objects/")) {
      throw new ObjectNotFoundError();
    }
    const parts = objectPath.slice(1).split("/");
    if (parts.length < 2) {
      throw new ObjectNotFoundError();
    }
    const entityId = parts.slice(1).join("/");
    let entityDir = this.getPrivateObjectDir();
    if (!entityDir.endsWith("/")) {
      entityDir = `${entityDir}/`;
    }
    const objectEntityPath = `${entityDir}${entityId}`;
    const { bucketName, objectName } = this.parseObjectPath(objectEntityPath);
    const bucket = objectStorageClient.bucket(bucketName);
    const objectFile = bucket.file(objectName);
    const [exists] = await objectFile.exists();
    if (!exists) {
      throw new ObjectNotFoundError();
    }
    return objectFile;
  }
  normalizeObjectEntityPath(rawPath) {
    if (!rawPath.startsWith("https://storage.googleapis.com/")) {
      return rawPath;
    }
    const url = new URL(rawPath);
    const rawObjectPath = url.pathname;
    let objectEntityDir = this.getPrivateObjectDir();
    if (!objectEntityDir.endsWith("/")) {
      objectEntityDir = `${objectEntityDir}/`;
    }
    if (!rawObjectPath.startsWith(objectEntityDir)) {
      return rawObjectPath;
    }
    const entityId = rawObjectPath.slice(objectEntityDir.length);
    return `/objects/${entityId}`;
  }
  async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
    const normalizedPath = this.normalizeObjectEntityPath(rawPath);
    if (!normalizedPath.startsWith("/")) {
      return normalizedPath;
    }
    const objectFile = await this.getObjectEntityFile(normalizedPath);
    await setObjectAclPolicy(objectFile, aclPolicy);
    return normalizedPath;
  }
  async canAccessObjectEntity({
    userId,
    objectFile,
    requestedPermission
  }) {
    return canAccessObject({
      userId,
      objectFile,
      requestedPermission: requestedPermission ?? "read" /* READ */
    });
  }
  parseObjectPath(path4) {
    if (!path4.startsWith("/")) {
      path4 = `/${path4}`;
    }
    const pathParts = path4.split("/");
    if (pathParts.length < 3) {
      throw new Error("Invalid path: must contain at least a bucket name");
    }
    const bucketName = pathParts[1];
    const objectName = pathParts.slice(2).join("/");
    return { bucketName, objectName };
  }
  async signObjectURL({
    bucketName,
    objectName,
    method,
    ttlSec
  }) {
    const request = {
      bucket_name: bucketName,
      object_name: objectName,
      method,
      expires_at: new Date(Date.now() + ttlSec * 1e3).toISOString()
    };
    const response = await fetch(
      `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to sign object URL, errorcode: ${response.status}, make sure you're running on Replit`
      );
    }
    const { signed_url: signedURL } = await response.json();
    return signedURL;
  }
};

// server/services/mediaStorage.ts
var objectStorage = new ObjectStorageService();
var MediaStorageService = class {
  async uploadMedia(options) {
    const { clientId, file, fileName, mimeType, folder = "Uploads", altText, tags } = options;
    const ext = fileName.split(".").pop() || "";
    const storageKey = `content/${clientId}/${folder}/${nanoid()}.${ext}`;
    const fileType = this.determineFileType(mimeType);
    const metadata = await this.getMediaMetadata(file, mimeType, fileType);
    let thumbnailUrl = null;
    if (fileType === "video") {
      thumbnailUrl = await this.generateVideoThumbnail(file, storageKey);
    }
    const storageUrl = await objectStorage.uploadBuffer(file, storageKey, mimeType);
    const [mediaRecord] = await db.insert(contentMedia).values({
      clientId,
      fileName,
      fileSize: metadata.fileSize,
      mimeType,
      fileType,
      storageKey,
      storageUrl,
      thumbnailUrl,
      width: metadata.width,
      height: metadata.height,
      duration: metadata.duration,
      altText,
      folder,
      tags: tags || []
    }).returning();
    return mediaRecord;
  }
  async deleteMedia(mediaId, clientId) {
    const [media] = await db.select().from(contentMedia).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    ));
    if (!media) {
      throw new Error("Media not found or unauthorized");
    }
    await objectStorage.deleteObject(media.storageKey);
    if (media.thumbnailUrl) {
      const thumbnailKey = media.thumbnailUrl.split("/").slice(-3).join("/");
      await objectStorage.deleteObject(thumbnailKey);
    }
    await db.delete(contentMedia).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    ));
    return { success: true };
  }
  async getClientMedia(clientId, folder) {
    const query = folder ? and2(eq2(contentMedia.clientId, clientId), eq2(contentMedia.folder, folder)) : eq2(contentMedia.clientId, clientId);
    return await db.select().from(contentMedia).where(query).orderBy(contentMedia.createdAt);
  }
  async getMediaById(mediaId, clientId) {
    const [media] = await db.select().from(contentMedia).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    ));
    return media;
  }
  async updateMediaMetadata(mediaId, clientId, updates) {
    const [updated] = await db.update(contentMedia).set(updates).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    )).returning();
    return updated;
  }
  async incrementUsageCount(mediaId) {
    await db.update(contentMedia).set({ usageCount: sql3`${contentMedia.usageCount} + 1` }).where(eq2(contentMedia.id, mediaId));
  }
  determineFileType(mimeType) {
    if (mimeType.startsWith("video/")) return "video";
    if (mimeType === "image/gif") return "gif";
    if (mimeType.startsWith("image/")) return "image";
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  async getMediaMetadata(file, mimeType, fileType) {
    const fileSize = file.length;
    if (fileType === "image" || fileType === "gif") {
      try {
        const image = sharp(file);
        const metadata = await image.metadata();
        return {
          width: metadata.width,
          height: metadata.height,
          fileSize,
          fileType
        };
      } catch (error) {
        console.error("Error getting image metadata:", error);
        return { fileSize, fileType };
      }
    }
    if (fileType === "video") {
      return {
        fileSize,
        fileType: "video",
        duration: void 0
      };
    }
    return { fileSize, fileType: "image" };
  }
  async generateVideoThumbnail(file, storageKey) {
    console.log("[MediaStorage] Video thumbnail generation not yet implemented");
    return null;
  }
};
var mediaStorageService = new MediaStorageService();

// server/routes/content.ts
init_contentPublisher();
init_platformFactory();

// server/utils/demoAccounts.ts
init_db();
init_schema();
import { eq as eq4 } from "drizzle-orm";
var DEMO_EMAILS = [
  "demo@businessblueprint.io",
  "test@businessblueprint.io",
  "agency@businessblueprint.io"
];
function isDemoEmail(email) {
  return DEMO_EMAILS.includes(email.toLowerCase());
}
async function isDemoAccountById(clientId) {
  try {
    const client2 = await db.query.clients.findFirst({
      where: eq4(clients.id, clientId),
      columns: { email: true }
    });
    if (!client2?.email) return false;
    return isDemoEmail(client2.email);
  } catch (error) {
    console.error("[isDemoAccountById] Error checking demo status:", error);
    return false;
  }
}

// server/routes/content.ts
var router = Router();
var mediaStorage = new MediaStorageService();
async function requireContentAccess(req, res, next) {
  const clientId = parseInt(req.params.clientId || req.body.clientId);
  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }
  try {
    if (await isDemoAccountById(clientId)) {
      return next();
    }
    const hasAccess = await db.select({ id: subscriptionAddonSelections.id }).from(subscriptionAddonSelections).innerJoin(
      subscriptions,
      eq5(subscriptionAddonSelections.subscriptionId, subscriptions.id)
    ).innerJoin(
      subscriptionAddons,
      eq5(subscriptionAddonSelections.addonId, subscriptionAddons.id)
    ).where(
      and4(
        eq5(subscriptions.clientId, clientId),
        sql4`${subscriptionAddons.name} LIKE '%Content Management%'`
      )
    ).limit(1);
    if (hasAccess.length === 0) {
      return res.status(403).json({
        message: "Content Management not available. Please upgrade your subscription."
      });
    }
    next();
  } catch (error) {
    console.error("[ContentAccess] Error checking access:", error);
    return res.status(500).json({ message: "Failed to verify access" });
  }
}
async function getPlatformLimits(clientId) {
  if (await isDemoAccountById(clientId)) {
    return { maxPlatforms: 7, tier: "msp" };
  }
  const [subscription] = await db.select({ addonName: subscriptionAddons.name }).from(subscriptionAddonSelections).innerJoin(subscriptions, eq5(subscriptionAddonSelections.subscriptionId, subscriptions.id)).innerJoin(subscriptionAddons, eq5(subscriptionAddonSelections.addonId, subscriptionAddons.id)).where(
    and4(
      eq5(subscriptions.clientId, clientId),
      sql4`${subscriptionAddons.name} LIKE '%Content Management%'`
    )
  ).limit(1);
  const isMSP = subscription?.addonName?.includes("MSP") || false;
  return {
    maxPlatforms: isMSP ? 7 : 3,
    tier: isMSP ? "msp" : "diy"
  };
}
router.get("/:clientId/posts", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const status = req.query.status;
    const posts = status ? await db.select().from(contentPosts).where(and4(
      eq5(contentPosts.clientId, clientId),
      eq5(contentPosts.status, status)
    )).orderBy(desc2(contentPosts.createdAt)) : await db.select().from(contentPosts).where(eq5(contentPosts.clientId, clientId)).orderBy(desc2(contentPosts.createdAt));
    res.json(posts);
  } catch (error) {
    console.error("[Content] Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});
router.get("/:clientId/posts/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const [post] = await db.select().from(contentPosts).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    ));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("[Content] Error fetching post:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});
router.post("/:clientId/posts", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postSchema = z2.object({
      caption: z2.string(),
      platforms: z2.array(z2.string()),
      hashtags: z2.array(z2.string()).optional(),
      mediaIds: z2.array(z2.number()).optional(),
      scheduledFor: z2.coerce.date().refine((date) => !isNaN(date.getTime()) && date > /* @__PURE__ */ new Date(), {
        message: "scheduledFor must be a valid future date"
      }).optional(),
      platformCustomizations: z2.any().optional(),
      timezone: z2.string().optional(),
      status: z2.string().optional(),
      isAIGenerated: z2.boolean().optional(),
      aiPrompt: z2.string().optional(),
      contentScore: z2.number().optional(),
      templateId: z2.number().optional()
    });
    const validatedBody = postSchema.parse(req.body);
    const [post] = await db.insert(contentPosts).values({
      ...validatedBody,
      clientId
    }).returning();
    res.status(201).json(post);
  } catch (error) {
    console.error("[Content] Error creating post:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create post" });
  }
});
router.put("/:clientId/posts/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const updateSchema = z2.object({
      caption: z2.string().optional(),
      platforms: z2.array(z2.string()).optional(),
      hashtags: z2.array(z2.string()).optional(),
      mediaIds: z2.array(z2.number()).optional(),
      scheduledFor: z2.coerce.date().refine((date) => !isNaN(date.getTime()) && date > /* @__PURE__ */ new Date(), {
        message: "scheduledFor must be a valid future date"
      }).optional(),
      platformCustomizations: z2.any().optional(),
      timezone: z2.string().optional(),
      status: z2.string().optional(),
      isAIGenerated: z2.boolean().optional(),
      aiPrompt: z2.string().optional(),
      contentScore: z2.number().optional(),
      templateId: z2.number().optional()
    });
    const data = updateSchema.parse(req.body);
    const [post] = await db.update(contentPosts).set(data).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    )).returning();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("[Content] Error updating post:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update post" });
  }
});
router.delete("/:clientId/posts/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const [deleted] = await db.delete(contentPosts).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    )).returning();
    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("[Content] Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});
router.post("/:clientId/posts/:postId/publish", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const [post] = await db.select().from(contentPosts).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    ));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.status === "published") {
      return res.status(400).json({ message: "Post is already published" });
    }
    const isScheduled = post.scheduledFor && new Date(post.scheduledFor) > /* @__PURE__ */ new Date();
    if (isScheduled) {
      await db.update(contentPosts).set({ status: "scheduled" }).where(eq5(contentPosts.id, postId));
      res.json({
        message: "Post scheduled successfully",
        scheduledFor: post.scheduledFor
      });
    } else {
      const [updatedPost] = await db.update(contentPosts).set({ status: "publishing", attempts: 0 }).where(eq5(contentPosts.id, postId)).returning();
      publishPost(updatedPost).catch(async (err) => {
        console.error("[Content] Background publish failed:", err);
        await db.update(contentPosts).set({
          status: "failed",
          lastError: err.message || "Unknown error during publishing",
          attempts: 1,
          lockedAt: null
          // Release lock
        }).where(eq5(contentPosts.id, postId));
      });
      res.json({ message: "Post is being published" });
    }
  } catch (error) {
    console.error("[Content] Error publishing post:", error);
    res.status(500).json({ message: "Failed to publish post" });
  }
});
router.get("/:clientId/schedule", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const scheduledPosts = await db.select().from(contentPosts).where(and4(
      eq5(contentPosts.clientId, clientId),
      eq5(contentPosts.status, "scheduled")
    )).orderBy(contentPosts.scheduledFor);
    res.json(scheduledPosts);
  } catch (error) {
    console.error("[Content] Error fetching scheduled posts:", error);
    res.status(500).json({ message: "Failed to fetch scheduled posts" });
  }
});
router.put("/:clientId/schedule/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const scheduleSchema = z2.object({
      scheduledFor: z2.coerce.date().refine((date) => !isNaN(date.getTime()) && date > /* @__PURE__ */ new Date(), {
        message: "scheduledFor must be a valid future date"
      })
    });
    const { scheduledFor: newScheduleDate } = scheduleSchema.parse(req.body);
    const [existingPost] = await db.select().from(contentPosts).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    ));
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const [post] = await db.update(contentPosts).set({
      scheduledFor: newScheduleDate,
      status: "scheduled",
      // Reset scheduler state to allow rescheduling
      lockedAt: null,
      attempts: 0,
      nextRetryAt: null
    }).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    )).returning();
    res.json({
      message: "Schedule updated successfully",
      post
    });
  } catch (error) {
    console.error("[Content] Error updating schedule:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update schedule" });
  }
});
router.delete("/:clientId/schedule/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const [existingPost] = await db.select().from(contentPosts).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId),
      eq5(contentPosts.status, "scheduled")
    ));
    if (!existingPost) {
      return res.status(404).json({ message: "Scheduled post not found" });
    }
    const [post] = await db.update(contentPosts).set({
      status: "draft",
      scheduledFor: null,
      // Reset scheduler state
      lockedAt: null,
      attempts: 0,
      nextRetryAt: null
    }).where(and4(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    )).returning();
    res.json({
      message: "Schedule cancelled successfully",
      post
    });
  } catch (error) {
    console.error("[Content] Error cancelling schedule:", error);
    res.status(500).json({ message: "Failed to cancel schedule" });
  }
});
router.get("/:clientId/media", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const folder = req.query.folder;
    const media = folder ? await db.select().from(contentMedia).where(and4(
      eq5(contentMedia.clientId, clientId),
      eq5(contentMedia.folder, folder)
    )).orderBy(desc2(contentMedia.createdAt)) : await db.select().from(contentMedia).where(eq5(contentMedia.clientId, clientId)).orderBy(desc2(contentMedia.createdAt));
    res.json(media);
  } catch (error) {
    console.error("[Content] Error fetching media:", error);
    res.status(500).json({ message: "Failed to fetch media" });
  }
});
router.post("/:clientId/media", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const { fileData, fileName, mimeType, folder, altText, tags } = req.body;
    if (!fileData || !fileName || !mimeType) {
      return res.status(400).json({ message: "fileData, fileName, and mimeType are required" });
    }
    const fileBuffer = Buffer.from(fileData, "base64");
    const media = await mediaStorage.uploadMedia({
      clientId,
      file: fileBuffer,
      fileName,
      mimeType,
      folder,
      altText,
      tags
    });
    res.status(201).json(media);
  } catch (error) {
    console.error("[Content] Error uploading media:", error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Failed to upload media" });
  }
});
router.delete("/:clientId/media/:mediaId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const mediaId = parseInt(req.params.mediaId);
    const success = await mediaStorage.deleteMedia(mediaId, clientId);
    if (!success) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("[Content] Error deleting media:", error);
    res.status(500).json({ message: "Failed to delete media" });
  }
});
router.get("/:clientId/platforms", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const accounts = await db.select().from(socialMediaAccounts).where(eq5(socialMediaAccounts.clientId, clientId)).orderBy(socialMediaAccounts.platform);
    const limits = await getPlatformLimits(clientId);
    res.json({
      accounts,
      limits,
      available: limits.maxPlatforms - accounts.length
    });
  } catch (error) {
    console.error("[Content] Error fetching platforms:", error);
    res.status(500).json({ message: "Failed to fetch platforms" });
  }
});
router.post("/:clientId/platforms", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const limits = await getPlatformLimits(clientId);
    const currentAccounts = await db.select().from(socialMediaAccounts).where(eq5(socialMediaAccounts.clientId, clientId));
    if (currentAccounts.length >= limits.maxPlatforms) {
      return res.status(400).json({
        message: `Platform limit reached. Your ${limits.tier.toUpperCase()} tier supports ${limits.maxPlatforms} platforms.`
      });
    }
    const accountSchema = z2.object({
      platform: z2.string(),
      platformAccountId: z2.string(),
      accessToken: z2.string(),
      refreshToken: z2.string().optional(),
      tokenExpiresAt: z2.string().transform((str) => new Date(str)).optional(),
      platformAccountName: z2.string().optional(),
      platformAccountHandle: z2.string().optional(),
      platformAccountAvatar: z2.string().optional(),
      accountType: z2.string().optional(),
      permissions: z2.array(z2.string()).optional(),
      metadata: z2.any().optional(),
      isActive: z2.boolean().optional()
    });
    const validatedBody = accountSchema.parse(req.body);
    const isValid = await PlatformFactory.validateCredentials(validatedBody.platform, {
      accessToken: validatedBody.accessToken,
      refreshToken: validatedBody.refreshToken,
      expiresAt: validatedBody.tokenExpiresAt,
      platformAccountId: validatedBody.platformAccountId
    });
    if (!isValid) {
      return res.status(400).json({ message: "Invalid platform credentials" });
    }
    const [account] = await db.insert(socialMediaAccounts).values({
      ...validatedBody,
      clientId
    }).returning();
    res.status(201).json(account);
  } catch (error) {
    console.error("[Content] Error connecting platform:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to connect platform" });
  }
});
router.delete("/:clientId/platforms/:accountId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const accountId = parseInt(req.params.accountId);
    const [deleted] = await db.delete(socialMediaAccounts).where(and4(
      eq5(socialMediaAccounts.id, accountId),
      eq5(socialMediaAccounts.clientId, clientId)
    )).returning();
    if (!deleted) {
      return res.status(404).json({ message: "Platform account not found" });
    }
    res.json({ message: "Platform disconnected successfully" });
  } catch (error) {
    console.error("[Content] Error disconnecting platform:", error);
    res.status(500).json({ message: "Failed to disconnect platform" });
  }
});
router.get("/:clientId/analytics", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const posts = await db.select().from(contentPosts).where(eq5(contentPosts.clientId, clientId));
    const postIds = posts.map((p) => p.id);
    const analytics = postIds.length > 0 ? await db.select().from(contentAnalytics).where(sql4`${contentAnalytics.postId} IN (${sql4.join(postIds.map((id) => sql4`${id}`), sql4`, `)})`).orderBy(desc2(contentAnalytics.lastSyncedAt)) : [];
    const summary = {
      totalPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === "published").length,
      scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
      draftPosts: posts.filter((p) => p.status === "draft").length,
      analytics
    };
    res.json(summary);
  } catch (error) {
    console.error("[Content] Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});
router.post("/:clientId/ai/suggest", requireContentAccess, async (req, res) => {
  try {
    const { prompt = "Generate social media post ideas" } = req.body;
    const suggestions = [
      `Here's a compelling ${prompt} idea that resonates with your audience and drives engagement.`,
      `Try this approach: A ${prompt} that highlights customer value and creates urgency.`,
      `Consider this angle: Share your expertise through a ${prompt} that educates and entertains.`,
      `This ${prompt} hooks attention immediately with a question your audience wants answered.`,
      `Use this structure: Story \u2192 Challenge \u2192 Solution format for maximum ${prompt} impact.`
    ];
    res.json({ suggestions });
  } catch (error) {
    console.error("[Content] Error generating suggestions:", error);
    res.status(500).json({ message: "Failed to generate suggestions" });
  }
});
router.post("/:clientId/ai/caption", requireContentAccess, async (req, res) => {
  try {
    const { topic, tone, length } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    res.json({
      caption: `AI-generated caption about ${topic} (${tone || "professional"} tone, ${length || "medium"} length)`,
      hashtags: ["#business", "#marketing", "#social"]
    });
  } catch (error) {
    console.error("[Content] Error generating caption:", error);
    res.status(500).json({ message: "Failed to generate caption" });
  }
});
router.post("/:clientId/ai/hashtags", requireContentAccess, async (req, res) => {
  try {
    const { content, platform } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    res.json({
      hashtags: ["#business", "#marketing", "#socialmedia", "#contentcreation"]
    });
  } catch (error) {
    console.error("[Content] Error generating hashtags:", error);
    res.status(500).json({ message: "Failed to generate hashtags" });
  }
});
var content_default = router;

// server/routes/meta.ts
init_db();
init_schema();
import { Router as Router2 } from "express";
import { eq as eq6, and as and5 } from "drizzle-orm";
import crypto from "crypto";
var router2 = Router2();
var META_APP_ID = process.env.META_APP_ID;
var META_APP_SECRET = process.env.META_APP_SECRET;
var META_WEBHOOK_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "businessblueprint_meta_verify_2025";
var VALID_PLATFORMS = ["facebook", "instagram"];
var ALLOWED_RETURN_PATHS = [
  "/portal/inbox",
  "/portal/dashboard",
  "/content",
  "/inbox"
];
var PLATFORM_SCOPES = {
  facebook: [
    "pages_show_list",
    "pages_read_engagement",
    "pages_manage_posts",
    "pages_messaging",
    "pages_manage_metadata"
  ],
  instagram: [
    "pages_show_list",
    "instagram_basic",
    "instagram_content_publish",
    "instagram_manage_messages",
    "pages_read_engagement"
  ]
};
function signState(data) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto.createHmac("sha256", META_APP_SECRET || "fallback-secret").update(payload).digest("hex");
  return `${payload}.${signature}`;
}
function verifyState(state) {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) {
      return { valid: false };
    }
    const expectedSignature = crypto.createHmac("sha256", META_APP_SECRET || "fallback-secret").update(payload).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false };
    }
    const data = JSON.parse(Buffer.from(payload, "base64").toString());
    return { valid: true, data };
  } catch {
    return { valid: false };
  }
}
function isValidReturnPath(path4) {
  if (!path4) return false;
  return path4.startsWith("/") && ALLOWED_RETURN_PATHS.some(
    (allowed) => path4 === allowed || path4.startsWith(allowed + "?") || path4.startsWith(allowed + "/")
  );
}
router2.get("/oauth/start", (req, res) => {
  try {
    const clientId = req.query.clientId;
    const platformParam = req.query.platform;
    const returnUrl = req.query.returnUrl;
    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }
    if (!META_APP_ID || !META_APP_SECRET) {
      return res.status(500).json({ error: "Meta App not configured" });
    }
    const platform = VALID_PLATFORMS.includes(platformParam) ? platformParam : "facebook";
    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/portal/inbox";
    const stateData = {
      clientId: parseInt(clientId),
      platform,
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now()
    };
    const state = signState(stateData);
    const scopes = PLATFORM_SCOPES[platform];
    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
    authUrl.searchParams.set("client_id", META_APP_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes.join(","));
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("response_type", "code");
    console.log(`\u2705 Starting ${platform} OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});
router2.get("/webhooks/meta", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === META_WEBHOOK_VERIFY_TOKEN) {
    console.log("\u2705 Meta webhook verified");
    res.status(200).send(challenge);
  } else {
    console.error("\u274C Meta webhook verification failed");
    res.sendStatus(403);
  }
});
router2.post("/webhooks/meta", async (req, res) => {
  try {
    const signature = req.headers["x-hub-signature-256"];
    if (!verifyWebhookSignature(req.body, signature)) {
      console.error("\u274C Invalid webhook signature");
      return res.sendStatus(403);
    }
    const body = req.body;
    res.status(200).send("EVENT_RECEIVED");
    if (body.object === "page" || body.object === "instagram") {
      for (const entry of body.entry) {
        await processWebhookEntry(entry, body.object);
      }
    }
  } catch (error) {
    console.error("Error processing Meta webhook:", error);
    res.status(200).send("EVENT_RECEIVED");
  }
});
router2.get("/oauth/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const stateParam = req.query.state;
    if (!code) {
      return res.status(400).json({ error: "No authorization code provided" });
    }
    if (!stateParam) {
      return res.status(400).json({ error: "Invalid state parameter" });
    }
    const stateResult = verifyState(stateParam);
    if (!stateResult.valid || !stateResult.data) {
      console.error("\u274C Invalid or tampered state parameter");
      return res.status(403).json({ error: "Invalid state - possible CSRF attack" });
    }
    const stateAge = Date.now() - (stateResult.data.timestamp || 0);
    if (stateAge > 10 * 60 * 1e3) {
      console.error("\u274C State parameter expired");
      return res.status(400).json({ error: "OAuth session expired. Please try again." });
    }
    const clientId = stateResult.data.clientId;
    const platform = VALID_PLATFORMS.includes(stateResult.data.platform) ? stateResult.data.platform : "facebook";
    const returnUrl = isValidReturnPath(stateResult.data.returnUrl) ? stateResult.data.returnUrl : "/portal/inbox";
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(getRedirectUri(req))}`
    );
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      console.error("Token exchange failed:", tokenData);
      throw new Error("Failed to get access token");
    }
    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`
    );
    const longLivedData = await longLivedResponse.json();
    const userAccessToken = longLivedData.access_token || tokenData.access_token;
    const pageTokenResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/accounts?access_token=${userAccessToken}`
    );
    const pageData = await pageTokenResponse.json();
    if (pageData.error) {
      console.error("Failed to get pages:", pageData.error);
      throw new Error(pageData.error.message || "Failed to get pages");
    }
    if (pageData.data && pageData.data.length > 0) {
      for (const page of pageData.data) {
        const existing = await db.select().from(inboxChannelConnections).where(
          and5(
            eq6(inboxChannelConnections.clientId, clientId),
            eq6(inboxChannelConnections.channelType, platform),
            eq6(inboxChannelConnections.channelIdentifier, page.id)
          )
        );
        const credentials = {
          pageAccessToken: page.access_token,
          userAccessToken,
          pageId: page.id,
          pageName: page.name,
          category: page.category
        };
        if (existing.length > 0) {
          await db.update(inboxChannelConnections).set({
            credentials,
            channelName: page.name,
            status: "active",
            lastSyncedAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq6(inboxChannelConnections.id, existing[0].id));
        } else {
          await db.insert(inboxChannelConnections).values({
            clientId,
            channelType: platform,
            channelIdentifier: page.id,
            channelName: page.name,
            credentials,
            status: "active",
            lastSyncedAt: /* @__PURE__ */ new Date()
          });
        }
        console.log(`\u2705 Connected ${platform} page: ${page.name}`);
      }
    }
    const redirectWithStatus = returnUrl.includes("?") ? `${returnUrl}&oauth=success&platform=${platform}` : `${returnUrl}?oauth=success&platform=${platform}`;
    res.redirect(redirectWithStatus);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect("/portal/inbox?oauth=error");
  }
});
function verifyWebhookSignature(body, signature) {
  if (!signature || !META_APP_SECRET) return false;
  const elements = signature.split("=");
  const signatureHash = elements[1];
  const expectedHash = crypto.createHmac("sha256", META_APP_SECRET).update(JSON.stringify(body)).digest("hex");
  return signatureHash === expectedHash;
}
async function processWebhookEntry(entry, objectType) {
  try {
    if (entry.messaging) {
      for (const event of entry.messaging) {
        await processMessagingEvent(event, objectType);
      }
    }
    if (entry.changes) {
      for (const change of entry.changes) {
        await processChange(change, entry.id, objectType);
      }
    }
  } catch (error) {
    console.error("Error processing webhook entry:", error);
  }
}
async function processMessagingEvent(event, platform) {
  try {
    if (!event.message) return;
    const senderId = event.sender.id;
    const recipientId = event.recipient.id;
    const messageText = event.message.text || "";
    const messageId = event.message.mid;
    const channelType = platform === "instagram" ? "instagram" : "facebook";
    const [channel] = await db.select().from(inboxChannelConnections).where(
      and5(
        eq6(inboxChannelConnections.channelType, channelType),
        eq6(inboxChannelConnections.channelIdentifier, recipientId)
      )
    );
    if (!channel || !channel.clientId) {
      console.log(`No channel found for ${channelType} page ${recipientId}`);
      return;
    }
    let [conversation] = await db.select().from(inboxConversations).where(
      and5(
        eq6(inboxConversations.clientId, channel.clientId),
        eq6(inboxConversations.contactIdentifier, senderId),
        eq6(inboxConversations.primaryChannelType, channelType)
      )
    );
    if (!conversation) {
      [conversation] = await db.insert(inboxConversations).values({
        clientId: channel.clientId,
        contactName: `${channelType === "instagram" ? "IG" : "FB"} User ${senderId.slice(-6)}`,
        contactIdentifier: senderId,
        primaryChannelType: channelType,
        primaryChannelId: channel.id,
        status: "open",
        priority: "normal",
        lastMessageAt: /* @__PURE__ */ new Date(),
        lastMessagePreview: messageText.substring(0, 100),
        unreadCount: 1
      }).returning();
    } else {
      await db.update(inboxConversations).set({
        lastMessageAt: /* @__PURE__ */ new Date(),
        lastMessagePreview: messageText.substring(0, 100),
        unreadCount: (conversation.unreadCount || 0) + 1,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq6(inboxConversations.id, conversation.id));
    }
    await db.insert(inboxMessages2).values({
      conversationId: conversation.id,
      channelType,
      channelId: channel.id,
      messageType: "incoming",
      direction: "inbound",
      content: messageText,
      contentType: event.message.attachments ? "image" : "text",
      fromIdentifier: senderId,
      fromName: conversation.contactName,
      toIdentifier: recipientId,
      toName: channel.channelName || "",
      externalMessageId: messageId,
      hasAttachments: !!event.message.attachments,
      attachments: event.message.attachments,
      status: "delivered",
      deliveredAt: new Date(event.timestamp),
      metadata: { platform: channelType, event }
    });
    console.log(`\u2705 Processed ${channelType} message from ${senderId}`);
  } catch (error) {
    console.error("Error processing messaging event:", error);
  }
}
async function processChange(change, pageId, platform) {
  try {
    if (change.field === "feed" && change.value.item === "comment") {
      const comment = change.value;
      await processComment(comment, pageId, platform);
    }
  } catch (error) {
    console.error("Error processing change event:", error);
  }
}
async function processComment(comment, pageId, platform) {
  try {
    const commentId = comment.comment_id;
    const postId = comment.post_id;
    const senderId = comment.from?.id;
    const senderName = comment.from?.name;
    const commentText = comment.message;
    if (!senderId || !commentText) return;
    const channelType = platform === "instagram" ? "instagram" : "facebook";
    const [channel] = await db.select().from(inboxChannelConnections).where(
      and5(
        eq6(inboxChannelConnections.channelType, channelType),
        eq6(inboxChannelConnections.channelIdentifier, pageId)
      )
    );
    if (!channel || !channel.clientId) return;
    let [conversation] = await db.select().from(inboxConversations).where(
      and5(
        eq6(inboxConversations.clientId, channel.clientId),
        eq6(inboxConversations.contactIdentifier, senderId),
        eq6(inboxConversations.primaryChannelType, channelType)
      )
    );
    if (!conversation) {
      [conversation] = await db.insert(inboxConversations).values({
        clientId: channel.clientId,
        contactName: senderName || `${channelType === "instagram" ? "IG" : "FB"} User`,
        contactIdentifier: senderId,
        primaryChannelType: channelType,
        primaryChannelId: channel.id,
        status: "open",
        priority: "normal",
        lastMessageAt: /* @__PURE__ */ new Date(),
        lastMessagePreview: `Comment: ${commentText.substring(0, 100)}`,
        unreadCount: 1,
        tags: ["comment"]
      }).returning();
    }
    await db.insert(inboxMessages2).values({
      conversationId: conversation.id,
      channelType,
      channelId: channel.id,
      messageType: "incoming",
      direction: "inbound",
      content: commentText,
      contentType: "text",
      fromIdentifier: senderId,
      fromName: senderName || "",
      toIdentifier: pageId,
      toName: channel.channelName || "",
      externalMessageId: commentId,
      threadId: postId,
      hasAttachments: false,
      status: "delivered",
      metadata: {
        platform: channelType,
        messageSubtype: "comment",
        postId,
        commentId
      }
    });
    console.log(`\u2705 Processed ${channelType} comment from ${senderName}`);
  } catch (error) {
    console.error("Error processing comment:", error);
  }
}
function getRedirectUri(req) {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/api/meta/oauth/callback`;
}
var meta_default = router2;

// server/routes/tasks.ts
init_db();
init_schema();
import { Router as Router3 } from "express";
import { eq as eq7, and as and6, desc as desc3 } from "drizzle-orm";
import { z as z3 } from "zod";

// server/services/github-sync.ts
var GitHubSyncService = class {
  token;
  repo;
  owner;
  baseUrl = "https://api.github.com";
  constructor() {
    this.token = process.env.GITHUB_TOKEN || "";
    const repoPath = "53947/The_Blue_Link";
    const [owner, repo] = repoPath.split("/");
    this.owner = owner;
    this.repo = repo;
    if (!this.token) {
      console.warn("[GitHubSync] GITHUB_TOKEN not found - GitHub sync disabled");
    }
  }
  /**
   * Check if GitHub sync is enabled
   */
  isEnabled() {
    return !!this.token;
  }
  /**
   * Create a new GitHub issue
   */
  async createIssue(options) {
    if (!this.isEnabled()) {
      console.warn("[GitHubSync] Skipping issue creation - not configured");
      return null;
    }
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues`,
        {
          method: "POST",
          headers: {
            "Authorization": `token ${this.token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: options.title,
            body: options.body,
            labels: options.labels || [],
            assignees: options.assignees || []
          })
        }
      );
      if (!response.ok) {
        const error = await response.text();
        console.error("[GitHubSync] Failed to create issue:", error);
        return null;
      }
      const issue = await response.json();
      console.log(`[GitHubSync] Created issue #${issue.number}: ${options.title}`);
      return issue;
    } catch (error) {
      console.error("[GitHubSync] Error creating issue:", error);
      return null;
    }
  }
  /**
   * Update an existing GitHub issue
   */
  async updateIssue(options) {
    if (!this.isEnabled()) {
      console.warn("[GitHubSync] Skipping issue update - not configured");
      return null;
    }
    try {
      const updateData = {};
      if (options.title) updateData.title = options.title;
      if (options.body) updateData.body = options.body;
      if (options.state) updateData.state = options.state;
      if (options.labels) updateData.labels = options.labels;
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues/${options.issueNumber}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `token ${this.token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updateData)
        }
      );
      if (!response.ok) {
        const error = await response.text();
        console.error("[GitHubSync] Failed to update issue:", error);
        return null;
      }
      const issue = await response.json();
      console.log(`[GitHubSync] Updated issue #${issue.number}`);
      return issue;
    } catch (error) {
      console.error("[GitHubSync] Error updating issue:", error);
      return null;
    }
  }
  /**
   * Add a comment to an existing GitHub issue
   */
  async addComment(issueNumber, body) {
    if (!this.isEnabled()) {
      return false;
    }
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues/${issueNumber}/comments`,
        {
          method: "POST",
          headers: {
            "Authorization": `token ${this.token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ body })
        }
      );
      if (!response.ok) {
        const error = await response.text();
        console.error("[GitHubSync] Failed to add comment:", error);
        return false;
      }
      console.log(`[GitHubSync] Added comment to issue #${issueNumber}`);
      return true;
    } catch (error) {
      console.error("[GitHubSync] Error adding comment:", error);
      return false;
    }
  }
  /**
   * Format task data into GitHub issue format
   */
  formatTaskAsIssue(task) {
    const labels = [];
    if (task.assignedTo) {
      labels.push(`assigned-to-${task.assignedTo.toLowerCase()}`);
    }
    if (task.priority) {
      labels.push(`priority-${task.priority}`);
    }
    if (task.tags && Array.isArray(task.tags)) {
      labels.push(...task.tags);
    }
    const bodyParts = [];
    if (task.description) {
      bodyParts.push(task.description);
      bodyParts.push("");
    }
    bodyParts.push("---");
    bodyParts.push("**Task Details:**");
    bodyParts.push(`- **Assigned To:** ${task.assignedTo || "Unassigned"}`);
    bodyParts.push(`- **Assigned By:** ${task.assignedBy || "Unknown"}`);
    bodyParts.push(`- **Priority:** ${task.priority || "medium"}`);
    bodyParts.push(`- **Status:** ${task.status || "todo"}`);
    if (task.dueDate) {
      bodyParts.push(`- **Due Date:** ${new Date(task.dueDate).toLocaleDateString()}`);
    }
    bodyParts.push("");
    bodyParts.push(`*This issue was automatically created from the TriadBlue task management system (Task ID: ${task.id})*`);
    return {
      title: task.title,
      body: bodyParts.join("\n"),
      labels
    };
  }
  /**
   * Sync task status to GitHub issue state
   */
  getIssueState(taskStatus) {
    return taskStatus === "completed" || taskStatus === "cancelled" ? "closed" : "open";
  }
};
var githubSync = new GitHubSyncService();

// server/routes/tasks.ts
var tasksRouter = Router3();
tasksRouter.get("/", async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const clientId = user.claims.sub;
    const allTasks = await db.select().from(tasks).where(eq7(tasks.clientId, clientId)).orderBy(desc3(tasks.createdAt));
    res.json(allTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});
tasksRouter.get("/:id", async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const clientId = user.claims.sub;
    const taskId = parseInt(req.params.id);
    const [task] = await db.select().from(tasks).where(and6(
      eq7(tasks.id, taskId),
      eq7(tasks.clientId, clientId)
    ));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});
tasksRouter.post("/", async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const clientId = user.claims.sub;
    const taskSchema = z3.object({
      title: z3.string().min(1),
      description: z3.string().optional(),
      status: z3.enum(["todo", "in_progress", "completed", "cancelled"]).default("todo"),
      priority: z3.enum(["low", "medium", "high", "urgent"]).default("medium"),
      assignedTo: z3.string().optional(),
      assignedBy: z3.string().optional(),
      dueDate: z3.string().optional(),
      tags: z3.array(z3.string()).optional(),
      relatedTo: z3.any().optional()
    });
    const validatedData = taskSchema.parse(req.body);
    const [newTask] = await db.insert(tasks).values({
      ...validatedData,
      clientId,
      dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null
    }).returning();
    if (githubSync.isEnabled()) {
      githubSync.createIssue(githubSync.formatTaskAsIssue(newTask)).then(async (issue) => {
        if (issue) {
          await db.update(tasks).set({
            githubIssueId: `#${issue.number}`,
            githubIssueUrl: issue.html_url
          }).where(eq7(tasks.id, newTask.id));
          console.log(`[Tasks] Task ${newTask.id} synced to GitHub issue #${issue.number}`);
        }
      }).catch((error) => {
        console.error(`[Tasks] Failed to sync task ${newTask.id} to GitHub:`, error);
      });
    }
    if (newTask.assignedTo && newTask.assignedTo !== "unassigned") {
      console.log(`[Tasks] Task ${newTask.id} assigned to ${newTask.assignedTo}`);
    }
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    if (error instanceof z3.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create task" });
  }
});
tasksRouter.patch("/:id", async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const clientId = user.claims.sub;
    const taskId = parseInt(req.params.id);
    const updateSchema = z3.object({
      title: z3.string().min(1).optional(),
      description: z3.string().optional(),
      status: z3.enum(["todo", "in_progress", "completed", "cancelled"]).optional(),
      priority: z3.enum(["low", "medium", "high", "urgent"]).optional(),
      assignedTo: z3.string().optional(),
      assignedBy: z3.string().optional(),
      dueDate: z3.string().optional(),
      tags: z3.array(z3.string()).optional(),
      relatedTo: z3.any().optional()
    });
    const validatedData = updateSchema.parse(req.body);
    const updateData = {
      ...validatedData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (validatedData.dueDate !== void 0) {
      updateData.dueDate = validatedData.dueDate ? new Date(validatedData.dueDate) : null;
    }
    if (validatedData.status === "completed") {
      updateData.completedAt = /* @__PURE__ */ new Date();
    }
    const [updatedTask] = await db.update(tasks).set(updateData).where(and6(
      eq7(tasks.id, taskId),
      eq7(tasks.clientId, clientId)
    )).returning();
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (githubSync.isEnabled() && updatedTask.githubIssueId) {
      const issueNumber = parseInt(updatedTask.githubIssueId.replace("#", ""));
      const labels = [];
      if (updatedTask.assignedTo) {
        labels.push(`assigned-to-${updatedTask.assignedTo.toLowerCase()}`);
      }
      if (updatedTask.priority) {
        labels.push(`priority-${updatedTask.priority}`);
      }
      if (updatedTask.tags && Array.isArray(updatedTask.tags)) {
        labels.push(...updatedTask.tags);
      }
      githubSync.updateIssue({
        issueNumber,
        title: validatedData.title,
        body: validatedData.description,
        state: githubSync.getIssueState(updatedTask.status),
        labels
      }).catch((error) => {
        console.error(`[Tasks] Failed to sync task ${updatedTask.id} to GitHub:`, error);
      });
      if (validatedData.status === "completed") {
        const completedAt = updatedTask.completedAt || /* @__PURE__ */ new Date();
        githubSync.addComment(
          issueNumber,
          `\u2705 Task marked as completed in TriadBlue task management system.

**Completed:** ${completedAt.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}`
        ).catch((error) => {
          console.error(`[Tasks] Failed to add completion comment:`, error);
        });
      }
    }
    if (validatedData.assignedTo) {
      console.log(`[Tasks] Task ${updatedTask.id} reassigned to ${validatedData.assignedTo}`);
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error instanceof z3.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update task" });
  }
});
tasksRouter.delete("/:id", async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const clientId = user.claims.sub;
    const taskId = parseInt(req.params.id);
    const [deletedTask] = await db.delete(tasks).where(and6(
      eq7(tasks.id, taskId),
      eq7(tasks.clientId, clientId)
    )).returning();
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// server/routes/brand-colors.ts
init_db();
init_schema();
import { Router as Router4 } from "express";
import { eq as eq8 } from "drizzle-orm";
var router3 = Router4();
router3.get("/", async (req, res) => {
  try {
    const colors = await db.select().from(brandColors);
    res.json({ success: true, colors });
  } catch (error) {
    console.error("Error fetching brand colors:", error);
    res.status(500).json({ success: false, error: "Failed to fetch colors" });
  }
});
router3.post("/", async (req, res) => {
  try {
    const validatedData = insertBrandColorSchema.parse(req.body);
    const [newColor] = await db.insert(brandColors).values(validatedData).returning();
    res.json({ success: true, color: newColor });
  } catch (error) {
    console.error("Error adding brand color:", error);
    res.status(400).json({ success: false, error: "Failed to add color" });
  }
});
router3.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }
    await db.delete(brandColors).where(eq8(brandColors.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting brand color:", error);
    res.status(500).json({ success: false, error: "Failed to delete color" });
  }
});
var brand_colors_default = router3;

// server/routes/billing-admin.ts
import { z as z4 } from "zod";

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
      // NO maxAge - this makes it a session cookie that expires when tab/browser closes
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/routes/billing-admin.ts
init_db();
init_schema();
import { eq as eq10 } from "drizzle-orm";

// server/middleware/clientPortalAuth.ts
init_db();
init_schema();
import { eq as eq9 } from "drizzle-orm";
async function requireClientPortalAccess(req, res, next) {
  try {
    const sessionClientId = parseInt(req.session.clientId || "0");
    const urlClientId = req.params.id ? parseInt(req.params.id) : null;
    if (!sessionClientId) {
      return res.status(401).json({
        error: "Not authenticated",
        message: "Please log in to access your dashboard"
      });
    }
    if (urlClientId && urlClientId !== sessionClientId) {
      return res.status(403).json({
        error: "Access denied",
        message: "You do not have permission to access this resource"
      });
    }
    const client2 = await db.query.clients.findFirst({
      where: eq9(clients.id, sessionClientId),
      columns: {
        id: true,
        accountStatus: true,
        companyName: true,
        email: true
      }
    });
    if (!client2) {
      return res.status(404).json({
        error: "Account not found",
        message: "Your account could not be found"
      });
    }
    if (client2.accountStatus !== "active") {
      const statusMessages = {
        suspended: "Your account has been suspended. Please contact support to resolve billing issues.",
        banned: "Your account access has been restricted. Please contact support for assistance.",
        inactive: "Your account is inactive. Please contact support to reactivate your account.",
        pending: "Your account setup is still being processed. Please check back later or contact support."
      };
      const accountStatus = client2.accountStatus || "inactive";
      return res.status(403).json({
        error: "Account access restricted",
        message: statusMessages[accountStatus] || "Your account status prevents portal access",
        accountStatus
      });
    }
    req.clientId = sessionClientId;
    req.client = client2;
    next();
  } catch (error) {
    console.error("[ClientPortalAuth] Error checking access:", error);
    return res.status(500).json({ error: "Authentication check failed" });
  }
}

// server/routes/billing-admin.ts
var requireAdmin = [isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user?.claims?.sub;
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const user = await db.query.clients.findFirst({
      where: eq10(clients.id, parseInt(userId))
    });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({ error: "Authorization check failed" });
  }
}];
function registerBillingAdminRoutes(router4) {
  router4.get("/api/admin/subscriptions", requireAdmin, async (req, res) => {
    try {
      const subscriptions2 = await storage.getAllSubscriptions();
      const stats = {
        totalSubscriptions: subscriptions2.length,
        activeSubscriptions: subscriptions2.filter((s) => s.subscription.status === "active").length,
        monthlyRecurringRevenue: subscriptions2.filter((s) => s.subscription.status === "active" && s.subscription.billingCycle === "monthly").reduce((sum, s) => sum + parseFloat(s.subscription.totalAmount || "0"), 0)
      };
      res.json({ subscriptions: subscriptions2, stats });
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  });
  router4.get("/api/admin/clients/:id/billing", requireAdmin, async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      const subscription = await storage.getClientSubscription(clientId);
      const billingHistory2 = await storage.getClientBillingHistory(clientId, 12);
      const statusHistory = await storage.getClientAccountStatusHistory(clientId);
      res.json({
        client: client2,
        subscription,
        billingHistory: billingHistory2,
        statusHistory
      });
    } catch (error) {
      console.error("Error fetching client billing:", error);
      res.status(500).json({ error: "Failed to fetch client billing details" });
    }
  });
  router4.patch("/api/admin/clients/:id/status", requireAdmin, async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const statusSchema = z4.object({
        status: z4.enum(["active", "suspended", "inactive", "pending", "banned"]),
        reason: z4.string().optional(),
        changedBy: z4.number().optional()
      });
      const { status, reason, changedBy } = statusSchema.parse(req.body);
      const currentClient = await storage.getClient(clientId);
      if (!currentClient) {
        return res.status(404).json({ error: "Client not found" });
      }
      const updatedClient = await storage.updateClientAccountStatus(
        clientId,
        status,
        reason || null,
        changedBy || null
      );
      await storage.recordAccountStatusChange({
        clientId,
        previousStatus: currentClient.accountStatus || "active",
        newStatus: status,
        reason: reason || null,
        changedBy: changedBy || null,
        ipAddress: req.ip || null,
        userAgent: req.get("user-agent") || null
      });
      res.json({ client: updatedClient });
    } catch (error) {
      if (error instanceof z4.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Error updating account status:", error);
      res.status(500).json({ error: "Failed to update account status" });
    }
  });
  router4.get("/api/portal/subscription", requireClientPortalAccess, async (req, res) => {
    try {
      const clientId = req.clientId;
      const subscription = await storage.getClientSubscription(clientId);
      if (!subscription) {
        return res.json({ subscription: null });
      }
      res.json({ subscription });
    } catch (error) {
      console.error("Error fetching client subscription:", error);
      res.status(500).json({ error: "Failed to fetch subscription details" });
    }
  });
  router4.get("/api/portal/billing-history", requireClientPortalAccess, async (req, res) => {
    try {
      const clientId = req.clientId;
      const limit = parseInt(req.query.limit) || 12;
      const billingHistory2 = await storage.getClientBillingHistory(clientId, limit);
      res.json({ billingHistory: billingHistory2 });
    } catch (error) {
      console.error("Error fetching billing history:", error);
      res.status(500).json({ error: "Failed to fetch billing history" });
    }
  });
  router4.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getAllSubscriptionPlans();
      res.json({ plans });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ error: "Failed to fetch subscription plans" });
    }
  });
  router4.get("/api/subscription-addons", async (req, res) => {
    try {
      const addons = await storage.getAllSubscriptionAddons();
      res.json({ addons });
    } catch (error) {
      console.error("Error fetching subscription addons:", error);
      res.status(500).json({ error: "Failed to fetch subscription addons" });
    }
  });
}

// server/routes/crm.ts
init_db();
init_schema();
import { Router as Router6 } from "express";
import { eq as eq12, and as and8, desc as desc5, asc as asc2, ilike as ilike2, or as or2, sql as sql6, inArray } from "drizzle-orm";
import { z as z6 } from "zod";

// server/routes/api.ts
init_db();
init_schema();
import { Router as Router5 } from "express";
import { eq as eq11, and as and7, desc as desc4, asc, ilike, or, sql as sql5, isNull } from "drizzle-orm";
import { z as z5 } from "zod";
import crypto2 from "crypto";
var publicApiRouter = Router5();
function hashApiKey(key) {
  return crypto2.createHash("sha256").update(key).digest("hex");
}
function generateApiKey() {
  const key = `bb_${crypto2.randomBytes(32).toString("hex")}`;
  const hash = hashApiKey(key);
  const prefix = key.substring(0, 8);
  return { key, hash, prefix };
}
async function authenticateApiKey(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Missing or invalid Authorization header. Use: Bearer <api_key>"
    });
    return;
  }
  const key = authHeader.substring(7);
  const keyHash = hashApiKey(key);
  try {
    const [apiKeyRecord] = await db.select().from(apiKeys).where(eq11(apiKeys.keyHash, keyHash));
    if (!apiKeyRecord) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid API key" });
      return;
    }
    if (!apiKeyRecord.isActive) {
      res.status(403).json({ error: "Forbidden", message: "API key is inactive" });
      return;
    }
    if (apiKeyRecord.expiresAt && new Date(apiKeyRecord.expiresAt) < /* @__PURE__ */ new Date()) {
      res.status(403).json({ error: "Forbidden", message: "API key has expired" });
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const resetAt = apiKeyRecord.rateLimitResetAt ? new Date(apiKeyRecord.rateLimitResetAt) : null;
    if (!resetAt || resetAt < now) {
      await db.update(apiKeys).set({
        requestsThisHour: 1,
        rateLimitResetAt: new Date(now.getTime() + 60 * 60 * 1e3),
        lastUsedAt: now,
        totalRequests: sql5`${apiKeys.totalRequests} + 1`
      }).where(eq11(apiKeys.id, apiKeyRecord.id));
    } else {
      if ((apiKeyRecord.requestsThisHour || 0) >= (apiKeyRecord.rateLimit || 1e3)) {
        res.status(429).json({
          error: "Rate limit exceeded",
          message: `Rate limit of ${apiKeyRecord.rateLimit} requests per hour exceeded`,
          retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1e3)
        });
        return;
      }
      await db.update(apiKeys).set({
        requestsThisHour: sql5`${apiKeys.requestsThisHour} + 1`,
        lastUsedAt: now,
        totalRequests: sql5`${apiKeys.totalRequests} + 1`
      }).where(eq11(apiKeys.id, apiKeyRecord.id));
    }
    req.apiKey = {
      id: apiKeyRecord.id,
      clientId: apiKeyRecord.clientId,
      scopes: apiKeyRecord.scopes || [],
      name: apiKeyRecord.name
    };
    next();
  } catch (error) {
    console.error("[API] Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
function requireScope(...scopes) {
  return (req, res, next) => {
    if (!req.apiKey) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const keyScopes = req.apiKey.scopes || [];
    if (keyScopes.includes("*")) {
      next();
      return;
    }
    const hasRequiredScope = scopes.some((scope) => keyScopes.includes(scope));
    if (!hasRequiredScope) {
      res.status(403).json({
        error: "Forbidden",
        message: `This endpoint requires one of the following scopes: ${scopes.join(", ")}`,
        requiredScopes: scopes,
        yourScopes: keyScopes
      });
      return;
    }
    next();
  };
}
publicApiRouter.get("/", (req, res) => {
  res.json({
    name: "BusinessBlueprint Public API",
    version: "1.0.0",
    documentation: "/api/v1/docs",
    endpoints: {
      contacts: "/api/v1/contacts",
      companies: "/api/v1/companies",
      deals: "/api/v1/deals",
      tasks: "/api/v1/tasks",
      notes: "/api/v1/notes",
      pipelines: "/api/v1/pipelines",
      segments: "/api/v1/segments",
      timeline: "/api/v1/timeline",
      webhooks: "/api/v1/webhooks",
      apiKeys: "/api/v1/api-keys"
    },
    authentication: "Bearer token (API key)"
  });
});
publicApiRouter.get("/me", authenticateApiKey, (req, res) => {
  res.json({
    apiKey: {
      id: req.apiKey?.id,
      name: req.apiKey?.name,
      scopes: req.apiKey?.scopes
    }
  });
});
publicApiRouter.get("/contacts", authenticateApiKey, requireScope("read:contacts", "*"), async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search;
    const lifecycleStage = req.query.lifecycleStage;
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmContacts.clientId, req.apiKey.clientId));
    }
    if (search) {
      conditions.push(
        or(
          ilike(crmContacts.firstName, `%${search}%`),
          ilike(crmContacts.lastName, `%${search}%`),
          ilike(crmContacts.email, `%${search}%`)
        )
      );
    }
    if (lifecycleStage) {
      conditions.push(eq11(crmContacts.lifecycleStage, lifecycleStage));
    }
    const query = conditions.length > 0 ? db.select().from(crmContacts).where(and7(...conditions)) : db.select().from(crmContacts);
    const contacts = await query.orderBy(desc4(crmContacts.createdAt)).limit(limit).offset(offset);
    res.json({
      data: contacts,
      pagination: {
        limit,
        offset,
        hasMore: contacts.length === limit
      }
    });
  } catch (error) {
    console.error("[API] Get contacts error:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});
publicApiRouter.get("/contacts/:id", authenticateApiKey, requireScope("read:contacts", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let conditions = [eq11(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmContacts.clientId, req.apiKey.clientId));
    }
    const [contact] = await db.select().from(crmContacts).where(and7(...conditions));
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ data: contact });
  } catch (error) {
    console.error("[API] Get contact error:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});
publicApiRouter.post("/contacts", authenticateApiKey, requireScope("write:contacts", "*"), async (req, res) => {
  try {
    const validatedData = insertCrmContactSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId
    });
    const [contact] = await db.insert(crmContacts).values(validatedData).returning();
    res.status(201).json({ data: contact });
  } catch (error) {
    console.error("[API] Create contact error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create contact" });
  }
});
publicApiRouter.patch("/contacts/:id", authenticateApiKey, requireScope("write:contacts", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmContactSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    let conditions = [eq11(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmContacts.clientId, req.apiKey.clientId));
    }
    const [contact] = await db.update(crmContacts).set({ ...validatedData, updatedAt: /* @__PURE__ */ new Date() }).where(and7(...conditions)).returning();
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ data: contact });
  } catch (error) {
    console.error("[API] Update contact error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update contact" });
  }
});
publicApiRouter.delete("/contacts/:id", authenticateApiKey, requireScope("delete:contacts", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let conditions = [eq11(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmContacts.clientId, req.apiKey.clientId));
    }
    const [deleted] = await db.delete(crmContacts).where(and7(...conditions)).returning();
    if (!deleted) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("[API] Delete contact error:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});
publicApiRouter.get("/companies", authenticateApiKey, requireScope("read:companies", "*"), async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search;
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmCompanies.clientId, req.apiKey.clientId));
    }
    if (search) {
      conditions.push(ilike(crmCompanies.name, `%${search}%`));
    }
    const query = conditions.length > 0 ? db.select().from(crmCompanies).where(and7(...conditions)) : db.select().from(crmCompanies);
    const companies = await query.orderBy(desc4(crmCompanies.createdAt)).limit(limit).offset(offset);
    res.json({
      data: companies,
      pagination: { limit, offset, hasMore: companies.length === limit }
    });
  } catch (error) {
    console.error("[API] Get companies error:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});
publicApiRouter.post("/companies", authenticateApiKey, requireScope("write:companies", "*"), async (req, res) => {
  try {
    const validatedData = insertCrmCompanySchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId
    });
    const [company] = await db.insert(crmCompanies).values(validatedData).returning();
    res.status(201).json({ data: company });
  } catch (error) {
    console.error("[API] Create company error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create company" });
  }
});
publicApiRouter.get("/deals", authenticateApiKey, requireScope("read:deals", "*"), async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const status = req.query.status;
    const pipelineId = parseInt(req.query.pipelineId);
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmDeals.clientId, req.apiKey.clientId));
    }
    if (status) {
      conditions.push(eq11(crmDeals.status, status));
    }
    if (pipelineId) {
      conditions.push(eq11(crmDeals.pipelineId, pipelineId));
    }
    const query = conditions.length > 0 ? db.select().from(crmDeals).where(and7(...conditions)) : db.select().from(crmDeals);
    const deals = await query.orderBy(desc4(crmDeals.createdAt)).limit(limit).offset(offset);
    res.json({
      data: deals,
      pagination: { limit, offset, hasMore: deals.length === limit }
    });
  } catch (error) {
    console.error("[API] Get deals error:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});
publicApiRouter.post("/deals", authenticateApiKey, requireScope("write:deals", "*"), async (req, res) => {
  try {
    const validatedData = insertCrmDealSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId
    });
    const [deal] = await db.insert(crmDeals).values(validatedData).returning();
    res.status(201).json({ data: deal });
  } catch (error) {
    console.error("[API] Create deal error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create deal" });
  }
});
publicApiRouter.get("/tasks", authenticateApiKey, requireScope("read:tasks", "*"), async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const status = req.query.status;
    const contactId = parseInt(req.query.contactId);
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmTasks.clientId, req.apiKey.clientId));
    }
    if (status) {
      conditions.push(eq11(crmTasks.status, status));
    }
    if (contactId) {
      conditions.push(eq11(crmTasks.contactId, contactId));
    }
    const query = conditions.length > 0 ? db.select().from(crmTasks).where(and7(...conditions)) : db.select().from(crmTasks);
    const tasks2 = await query.orderBy(desc4(crmTasks.createdAt)).limit(limit).offset(offset);
    res.json({
      data: tasks2,
      pagination: { limit, offset, hasMore: tasks2.length === limit }
    });
  } catch (error) {
    console.error("[API] Get tasks error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
publicApiRouter.post("/tasks", authenticateApiKey, requireScope("write:tasks", "*"), async (req, res) => {
  try {
    const validatedData = insertCrmTaskSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId
    });
    const [task] = await db.insert(crmTasks).values(validatedData).returning();
    res.status(201).json({ data: task });
  } catch (error) {
    console.error("[API] Create task error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
});
publicApiRouter.get("/pipelines", authenticateApiKey, requireScope("read:pipelines", "*"), async (req, res) => {
  try {
    let pipelinesQuery = db.select().from(crmPipelines);
    if (req.apiKey?.clientId) {
      pipelinesQuery = db.select().from(crmPipelines).where(
        or(
          eq11(crmPipelines.clientId, req.apiKey.clientId),
          isNull(crmPipelines.clientId)
        )
      );
    }
    const pipelines = await pipelinesQuery.orderBy(asc(crmPipelines.id));
    const pipelinesWithStages = await Promise.all(
      pipelines.map(async (pipeline) => {
        const stages = await db.select().from(crmPipelineStages).where(eq11(crmPipelineStages.pipelineId, pipeline.id)).orderBy(asc(crmPipelineStages.id));
        return { ...pipeline, stages };
      })
    );
    res.json({ data: pipelinesWithStages });
  } catch (error) {
    console.error("[API] Get pipelines error:", error);
    res.status(500).json({ error: "Failed to fetch pipelines" });
  }
});
publicApiRouter.get("/segments", authenticateApiKey, requireScope("read:segments", "*"), async (req, res) => {
  try {
    let segments;
    if (req.apiKey?.clientId) {
      segments = await db.select().from(crmSegments).where(eq11(crmSegments.clientId, req.apiKey.clientId)).orderBy(asc(crmSegments.name));
    } else {
      segments = await db.select().from(crmSegments).orderBy(asc(crmSegments.name));
    }
    res.json({ data: segments });
  } catch (error) {
    console.error("[API] Get segments error:", error);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
});
publicApiRouter.get("/timeline", authenticateApiKey, requireScope("read:timeline", "*"), async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const contactId = parseInt(req.query.contactId);
    const companyId = parseInt(req.query.companyId);
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(crmTimeline.clientId, req.apiKey.clientId));
    }
    if (contactId) {
      conditions.push(eq11(crmTimeline.contactId, contactId));
    }
    if (companyId) {
      conditions.push(eq11(crmTimeline.companyId, companyId));
    }
    const query = conditions.length > 0 ? db.select().from(crmTimeline).where(and7(...conditions)) : db.select().from(crmTimeline);
    const events = await query.orderBy(desc4(crmTimeline.occurredAt)).limit(limit).offset(offset);
    res.json({
      data: events,
      pagination: { limit, offset, hasMore: events.length === limit }
    });
  } catch (error) {
    console.error("[API] Get timeline error:", error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
});
publicApiRouter.post("/api-keys", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req, res) => {
  try {
    const { name, scopes, rateLimit, expiresAt } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const { key, hash, prefix } = generateApiKey();
    const [apiKey] = await db.insert(apiKeys).values({
      clientId: req.apiKey?.clientId,
      name,
      keyHash: hash,
      keyPrefix: prefix,
      scopes: scopes || ["*"],
      rateLimit: rateLimit || 1e3,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    }).returning();
    res.status(201).json({
      message: "API key created. Save this key - it cannot be retrieved again.",
      key,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        prefix: apiKey.keyPrefix,
        scopes: apiKey.scopes,
        rateLimit: apiKey.rateLimit,
        expiresAt: apiKey.expiresAt,
        createdAt: apiKey.createdAt
      }
    });
  } catch (error) {
    console.error("[API] Create API key error:", error);
    res.status(500).json({ error: "Failed to create API key" });
  }
});
publicApiRouter.get("/api-keys", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req, res) => {
  try {
    const keys = await db.select({
      id: apiKeys.id,
      name: apiKeys.name,
      prefix: apiKeys.keyPrefix,
      scopes: apiKeys.scopes,
      rateLimit: apiKeys.rateLimit,
      isActive: apiKeys.isActive,
      lastUsedAt: apiKeys.lastUsedAt,
      totalRequests: apiKeys.totalRequests,
      expiresAt: apiKeys.expiresAt,
      createdAt: apiKeys.createdAt
    }).from(apiKeys).where(req.apiKey?.clientId ? eq11(apiKeys.clientId, req.apiKey.clientId) : sql5`true`);
    res.json({ data: keys });
  } catch (error) {
    console.error("[API] List API keys error:", error);
    res.status(500).json({ error: "Failed to list API keys" });
  }
});
publicApiRouter.delete("/api-keys/:id", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let conditions = [eq11(apiKeys.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(apiKeys.clientId, req.apiKey.clientId));
    }
    const [deleted] = await db.delete(apiKeys).where(and7(...conditions)).returning();
    if (!deleted) {
      return res.status(404).json({ error: "API key not found" });
    }
    res.json({ message: "API key deleted successfully" });
  } catch (error) {
    console.error("[API] Delete API key error:", error);
    res.status(500).json({ error: "Failed to delete API key" });
  }
});
publicApiRouter.post("/generate-test-key", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({
      error: "Forbidden",
      message: "Test key generation is disabled in production. Use the admin API to create keys."
    });
  }
  try {
    const { key, hash, prefix } = generateApiKey();
    const [apiKey] = await db.insert(apiKeys).values({
      name: "Test API Key (Dev)",
      keyHash: hash,
      keyPrefix: prefix,
      scopes: ["*"],
      rateLimit: 1e3
    }).returning();
    res.status(201).json({
      message: "Test API key created (development only). Save this key - it cannot be retrieved again.",
      key,
      id: apiKey.id,
      prefix: apiKey.keyPrefix
    });
  } catch (error) {
    console.error("[API] Generate test key error:", error);
    res.status(500).json({ error: "Failed to generate test key" });
  }
});
function generateWebhookSecret() {
  return crypto2.randomBytes(32).toString("hex");
}
function signWebhookPayload(payload, secret) {
  return crypto2.createHmac("sha256", secret).update(payload).digest("hex");
}
publicApiRouter.get("/webhooks", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const query = conditions.length > 0 ? db.select().from(webhookSubscriptions).where(and7(...conditions)) : db.select().from(webhookSubscriptions);
    const webhooks = await query.orderBy(desc4(webhookSubscriptions.createdAt));
    const sanitizedWebhooks = webhooks.map(({ secret, ...rest }) => rest);
    res.json({ data: sanitizedWebhooks });
  } catch (error) {
    console.error("[API] List webhooks error:", error);
    res.status(500).json({ error: "Failed to list webhooks" });
  }
});
publicApiRouter.post("/webhooks", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    const secret = generateWebhookSecret();
    const validatedData = insertWebhookSubscriptionSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId,
      secret
    });
    const [webhook] = await db.insert(webhookSubscriptions).values(validatedData).returning();
    res.status(201).json({
      data: { ...webhook, secret: void 0 },
      secret,
      message: "Webhook created. Save the secret - it cannot be retrieved again. Use it to verify webhook signatures."
    });
  } catch (error) {
    console.error("[API] Create webhook error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create webhook" });
  }
});
publicApiRouter.get("/webhooks/:id", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let conditions = [eq11(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [webhook] = await db.select().from(webhookSubscriptions).where(and7(...conditions));
    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }
    const { secret, ...sanitizedWebhook } = webhook;
    res.json({ data: sanitizedWebhook });
  } catch (error) {
    console.error("[API] Get webhook error:", error);
    res.status(500).json({ error: "Failed to fetch webhook" });
  }
});
publicApiRouter.patch("/webhooks/:id", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertWebhookSubscriptionSchema.partial().omit({ secret: true });
    const validatedData = partialSchema.parse(req.body);
    let conditions = [eq11(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [webhook] = await db.update(webhookSubscriptions).set({ ...validatedData, updatedAt: /* @__PURE__ */ new Date() }).where(and7(...conditions)).returning();
    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }
    const { secret, ...sanitizedWebhook } = webhook;
    res.json({ data: sanitizedWebhook });
  } catch (error) {
    console.error("[API] Update webhook error:", error);
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update webhook" });
  }
});
publicApiRouter.delete("/webhooks/:id", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let conditions = [eq11(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [deleted] = await db.delete(webhookSubscriptions).where(and7(...conditions)).returning();
    if (!deleted) {
      return res.status(404).json({ error: "Webhook not found" });
    }
    res.json({ message: "Webhook deleted successfully" });
  } catch (error) {
    console.error("[API] Delete webhook error:", error);
    res.status(500).json({ error: "Failed to delete webhook" });
  }
});
publicApiRouter.post("/webhooks/:id/rotate-secret", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newSecret = generateWebhookSecret();
    let conditions = [eq11(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq11(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [webhook] = await db.update(webhookSubscriptions).set({ secret: newSecret, updatedAt: /* @__PURE__ */ new Date() }).where(and7(...conditions)).returning();
    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }
    res.json({
      message: "Webhook secret rotated. Save the new secret - it cannot be retrieved again.",
      secret: newSecret
    });
  } catch (error) {
    console.error("[API] Rotate webhook secret error:", error);
    res.status(500).json({ error: "Failed to rotate webhook secret" });
  }
});
async function dispatchWebhookEvent(clientId, eventType, data) {
  try {
    let conditions = [
      eq11(webhookSubscriptions.isActive, true)
    ];
    if (clientId) {
      conditions.push(eq11(webhookSubscriptions.clientId, clientId));
    }
    const subscriptions2 = await db.select().from(webhookSubscriptions).where(and7(...conditions));
    const matchingSubscriptions = subscriptions2.filter((sub) => {
      if (!sub.events || sub.events.length === 0) return false;
      return sub.events.includes(eventType) || sub.events.includes("*");
    });
    if (matchingSubscriptions.length === 0) {
      console.log(`[Webhooks] No subscriptions for event: ${eventType}`);
      return;
    }
    const event = {
      id: crypto2.randomUUID(),
      event: eventType,
      data,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    const payload = JSON.stringify(event);
    for (const subscription of matchingSubscriptions) {
      dispatchToSubscription(subscription, payload, event.id).catch((err) => {
        console.error(`[Webhooks] Failed to dispatch to ${subscription.url}:`, err);
      });
    }
    console.log(`[Webhooks] Dispatched ${eventType} to ${matchingSubscriptions.length} subscriptions`);
  } catch (error) {
    console.error("[Webhooks] Error dispatching event:", error);
  }
}
async function dispatchToSubscription(subscription, payload, eventId) {
  const signature = signWebhookPayload(payload, subscription.secret);
  try {
    const response = await fetch(subscription.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Id": eventId,
        "X-Webhook-Signature": `sha256=${signature}`,
        "X-Webhook-Timestamp": (/* @__PURE__ */ new Date()).toISOString(),
        "User-Agent": "BusinessBlueprint-Webhooks/1.0"
      },
      body: payload,
      signal: AbortSignal.timeout(3e4)
      // 30 second timeout
    });
    if (response.ok) {
      await db.update(webhookSubscriptions).set({
        lastSuccessAt: /* @__PURE__ */ new Date(),
        failureCount: 0
      }).where(eq11(webhookSubscriptions.id, subscription.id));
      console.log(`[Webhooks] Successfully delivered to ${subscription.url}`);
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    const newFailureCount = (subscription.failureCount || 0) + 1;
    await db.update(webhookSubscriptions).set({
      lastFailedAt: /* @__PURE__ */ new Date(),
      failureCount: newFailureCount,
      // Disable webhook after 10 consecutive failures
      isActive: newFailureCount < 10
    }).where(eq11(webhookSubscriptions.id, subscription.id));
    console.error(`[Webhooks] Delivery failed to ${subscription.url}:`, error);
    if (newFailureCount >= 10) {
      console.warn(`[Webhooks] Disabled subscription ${subscription.id} after 10 failures`);
    }
  }
}

// server/routes/crm.ts
var crmRouter = Router6();
function evaluateCondition(conditionType, conditionConfig, triggerData, contact) {
  if (!conditionType || conditionType === "always") {
    return true;
  }
  const config = conditionConfig || {};
  const fieldValue = config.field ? triggerData[config.field] || contact?.[config.field] : null;
  switch (conditionType) {
    case "equals":
      return String(fieldValue) === String(config.value);
    case "not_equals":
      return String(fieldValue) !== String(config.value);
    case "contains":
      return String(fieldValue || "").includes(String(config.value || ""));
    case "exists":
      return fieldValue !== null && fieldValue !== void 0 && fieldValue !== "";
    case "not_exists":
      return fieldValue === null || fieldValue === void 0 || fieldValue === "";
    default:
      return true;
  }
}
async function executeAutomationTrigger(triggerType, contactId, triggerData) {
  try {
    const automations = await db.select().from(crmAutomations).where(and8(
      eq12(crmAutomations.triggerType, triggerType),
      eq12(crmAutomations.isActive, true)
    ));
    for (const automation of automations) {
      const steps = await db.select().from(crmAutomationSteps).where(eq12(crmAutomationSteps.automationId, automation.id)).orderBy(asc2(crmAutomationSteps.stepOrder));
      if (steps.length === 0) continue;
      const [execution] = await db.insert(crmAutomationExecutions).values({
        automationId: automation.id,
        contactId: contactId || null,
        status: "running",
        currentStep: 0,
        totalSteps: steps.length,
        triggerData: triggerData || {}
      }).returning();
      await db.update(crmAutomations).set({
        runCount: sql6`${crmAutomations.runCount} + 1`,
        lastRunAt: /* @__PURE__ */ new Date()
      }).where(eq12(crmAutomations.id, automation.id));
      const executionLog = [];
      let finalStatus = "completed";
      let errorMessage = null;
      let contact = null;
      if (contactId) {
        const [c] = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId));
        contact = c;
      }
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const config = step.config || {};
        try {
          const conditionMet = evaluateCondition(
            step.conditionType,
            step.conditionConfig,
            triggerData || {},
            contact
          );
          if (!conditionMet) {
            executionLog.push({ step: i + 1, action: step.stepType, result: "Skipped: condition not met", timestamp: /* @__PURE__ */ new Date() });
            continue;
          }
          await db.update(crmAutomationExecutions).set({ currentStep: i + 1 }).where(eq12(crmAutomationExecutions.id, execution.id));
          switch (step.stepType) {
            case "add_tag":
              if (contactId && config.tag) {
                const [contact2] = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId));
                if (contact2) {
                  const currentTags = Array.isArray(contact2.tags) ? contact2.tags : [];
                  if (!currentTags.includes(config.tag)) {
                    await db.update(crmContacts).set({ tags: [...currentTags, config.tag] }).where(eq12(crmContacts.id, contactId));
                  }
                }
              }
              executionLog.push({ step: i + 1, action: "add_tag", result: `Added tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "remove_tag":
              if (contactId && config.tag) {
                const [contact2] = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId));
                if (contact2) {
                  const currentTags = Array.isArray(contact2.tags) ? contact2.tags : [];
                  await db.update(crmContacts).set({ tags: currentTags.filter((t) => t !== config.tag) }).where(eq12(crmContacts.id, contactId));
                }
              }
              executionLog.push({ step: i + 1, action: "remove_tag", result: `Removed tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "update_contact":
              if (contactId && config.field && config.value !== void 0) {
                await db.update(crmContacts).set({ [config.field]: config.value }).where(eq12(crmContacts.id, contactId));
              }
              executionLog.push({ step: i + 1, action: "update_contact", result: `Updated ${config.field || "field"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "create_task":
              const taskTitle = config.title || "Automated task";
              await db.insert(crmTasks).values({
                contactId: contactId || null,
                title: taskTitle,
                description: config.description || `Created by automation: ${automation.name}`,
                status: "pending",
                priority: config.priority || "medium",
                dueDate: config.dueDate ? new Date(config.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3)
              });
              executionLog.push({ step: i + 1, action: "create_task", result: `Created task: ${taskTitle}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "add_to_segment":
              if (contactId && config.segmentId) {
                await db.insert(crmSegmentMembers).values({
                  segmentId: parseInt(config.segmentId),
                  contactId
                }).onConflictDoNothing();
              }
              executionLog.push({ step: i + 1, action: "add_to_segment", result: `Added to segment ${config.segmentId || "unknown"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "wait":
              const waitDuration = config.duration || "1 day";
              executionLog.push({ step: i + 1, action: "wait", result: `Wait: ${waitDuration} (skipped in sync execution)`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "send_email":
              executionLog.push({ step: i + 1, action: "send_email", result: `Email queued: ${config.subject || "No subject"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "webhook":
              executionLog.push({ step: i + 1, action: "webhook", result: `Webhook: ${config.url || "No URL"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            default:
              executionLog.push({ step: i + 1, action: step.stepType, result: "Unknown step type", timestamp: /* @__PURE__ */ new Date() });
          }
        } catch (stepError) {
          executionLog.push({ step: i + 1, action: step.stepType, result: `Error: ${stepError.message}`, timestamp: /* @__PURE__ */ new Date() });
          finalStatus = "failed";
          errorMessage = `Step ${i + 1} failed: ${stepError.message}`;
          break;
        }
      }
      await db.update(crmAutomationExecutions).set({
        status: finalStatus,
        completedAt: /* @__PURE__ */ new Date(),
        errorMessage,
        executionLog
      }).where(eq12(crmAutomationExecutions.id, execution.id));
      console.log(`[CRM] Automation "${automation.name}" ${finalStatus} for trigger "${triggerType}"${contactId ? ` (contact ${contactId})` : ""}`);
    }
  } catch (error) {
    console.error("[CRM] Automation trigger error:", error);
  }
}
crmRouter.get("/contacts", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const companyId = parseInt(req.query.companyId);
    const search = req.query.search;
    const lifecycleStage = req.query.lifecycleStage;
    const leadSource = req.query.leadSource;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    let query = db.select().from(crmContacts);
    const conditions = [];
    if (clientId) {
      conditions.push(eq12(crmContacts.clientId, clientId));
    }
    if (companyId) {
      conditions.push(eq12(crmContacts.companyId, companyId));
    }
    if (lifecycleStage) {
      conditions.push(eq12(crmContacts.lifecycleStage, lifecycleStage));
    }
    if (leadSource) {
      conditions.push(eq12(crmContacts.leadSource, leadSource));
    }
    if (search) {
      conditions.push(
        or2(
          ilike2(crmContacts.firstName, `%${search}%`),
          ilike2(crmContacts.lastName, `%${search}%`),
          ilike2(crmContacts.email, `%${search}%`)
        )
      );
    }
    const contacts = await db.select().from(crmContacts).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmContacts.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql6`count(*)` }).from(crmContacts).where(conditions.length > 0 ? and8(...conditions) : void 0);
    res.json({
      contacts,
      total: Number(countResult[0]?.count || 0),
      limit,
      offset
    });
  } catch (error) {
    console.error("[CRM] Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});
crmRouter.get("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contact = await db.select().from(crmContacts).where(eq12(crmContacts.id, id)).limit(1);
    if (!contact.length) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact[0]);
  } catch (error) {
    console.error("[CRM] Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});
crmRouter.post("/contacts", async (req, res) => {
  try {
    const validatedData = insertCrmContactSchema.parse(req.body);
    const [contact] = await db.insert(crmContacts).values(validatedData).returning();
    if (validatedData.clientId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: contact.id,
        eventType: "contact_created",
        title: `Contact created: ${validatedData.firstName || ""} ${validatedData.lastName || ""}`.trim(),
        occurredAt: /* @__PURE__ */ new Date(),
        sourceApp: "relationships",
        actorType: "user"
      });
    }
    executeAutomationTrigger("contact_created", contact.id, {
      contactId: contact.id,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName
    });
    dispatchWebhookEvent(contact.clientId, "contact.created", contact);
    res.status(201).json(contact);
  } catch (error) {
    console.error("[CRM] Error creating contact:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create contact" });
  }
});
crmRouter.post("/contacts/import", async (req, res) => {
  try {
    const { contacts, duplicateHandling = "skip", clientId } = req.body;
    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({ error: "No contacts provided" });
    }
    if (contacts.length > 5e3) {
      return res.status(400).json({ error: "Maximum 5000 contacts per import" });
    }
    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: []
    };
    for (let i = 0; i < contacts.length; i++) {
      try {
        const contact = contacts[i];
        const contactWithDefaults = {
          ...contact,
          clientId: contact.clientId || clientId || null,
          lifecycleStage: contact.lifecycleStage || "lead",
          leadSource: contact.leadSource || "csv_import"
        };
        const partialSchema = insertCrmContactSchema.partial().extend({
          firstName: z6.string().optional(),
          lastName: z6.string().optional(),
          email: z6.string().email().optional()
        });
        const validatedData = partialSchema.parse(contactWithDefaults);
        if (validatedData.email) {
          const existing = await db.select().from(crmContacts).where(eq12(crmContacts.email, validatedData.email)).limit(1);
          if (existing.length > 0) {
            if (duplicateHandling === "update") {
              await db.update(crmContacts).set({ ...validatedData, updatedAt: /* @__PURE__ */ new Date() }).where(eq12(crmContacts.id, existing[0].id));
              results.updated++;
            } else {
              results.skipped++;
            }
            continue;
          }
        }
        await db.insert(crmContacts).values(validatedData);
        results.created++;
      } catch (error) {
        results.errors.push({
          row: i + 1,
          error: error instanceof z6.ZodError ? error.errors[0]?.message || "Validation error" : "Unknown error"
        });
      }
    }
    res.json({
      success: true,
      imported: results.created,
      updated: results.updated,
      skipped: results.skipped,
      errors: results.errors.slice(0, 10),
      totalErrors: results.errors.length
    });
  } catch (error) {
    console.error("[CRM] Error importing contacts:", error);
    res.status(500).json({ error: "Failed to import contacts" });
  }
});
crmRouter.patch("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmContactSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    const [contact] = await db.update(crmContacts).set(updateData).where(eq12(crmContacts.id, id)).returning();
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    dispatchWebhookEvent(contact.clientId, "contact.updated", contact);
    res.json(contact);
  } catch (error) {
    console.error("[CRM] Error updating contact:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update contact" });
  }
});
crmRouter.delete("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [contact] = await db.select().from(crmContacts).where(eq12(crmContacts.id, id));
    await db.delete(crmContacts).where(eq12(crmContacts.id, id));
    if (contact) {
      dispatchWebhookEvent(contact.clientId, "contact.deleted", { id, email: contact.email });
    }
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});
crmRouter.get("/companies", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const search = req.query.search;
    const type = req.query.type;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    const conditions = [];
    if (clientId) {
      conditions.push(eq12(crmCompanies.clientId, clientId));
    }
    if (type) {
      conditions.push(eq12(crmCompanies.type, type));
    }
    if (search) {
      conditions.push(
        or2(
          ilike2(crmCompanies.name, `%${search}%`),
          ilike2(crmCompanies.domain, `%${search}%`)
        )
      );
    }
    const companies = await db.select().from(crmCompanies).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmCompanies.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql6`count(*)` }).from(crmCompanies).where(conditions.length > 0 ? and8(...conditions) : void 0);
    res.json({
      companies,
      total: Number(countResult[0]?.count || 0),
      limit,
      offset
    });
  } catch (error) {
    console.error("[CRM] Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});
crmRouter.get("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await db.select().from(crmCompanies).where(eq12(crmCompanies.id, id)).limit(1);
    if (!company.length) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company[0]);
  } catch (error) {
    console.error("[CRM] Error fetching company:", error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});
crmRouter.post("/companies", async (req, res) => {
  try {
    const validatedData = insertCrmCompanySchema.parse(req.body);
    const [company] = await db.insert(crmCompanies).values(validatedData).returning();
    res.status(201).json(company);
  } catch (error) {
    console.error("[CRM] Error creating company:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create company" });
  }
});
crmRouter.patch("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmCompanySchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    const [company] = await db.update(crmCompanies).set(updateData).where(eq12(crmCompanies.id, id)).returning();
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error("[CRM] Error updating company:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update company" });
  }
});
crmRouter.delete("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmCompanies).where(eq12(crmCompanies.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting company:", error);
    res.status(500).json({ error: "Failed to delete company" });
  }
});
crmRouter.get("/pipelines", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const conditions = [];
    if (clientId) {
      conditions.push(eq12(crmPipelines.clientId, clientId));
    }
    const pipelines = await db.select().from(crmPipelines).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(asc2(crmPipelines.displayOrder));
    const pipelinesWithStages = await Promise.all(
      pipelines.map(async (pipeline) => {
        const stages = await db.select().from(crmPipelineStages).where(eq12(crmPipelineStages.pipelineId, pipeline.id)).orderBy(asc2(crmPipelineStages.displayOrder));
        return { ...pipeline, stages };
      })
    );
    res.json(pipelinesWithStages);
  } catch (error) {
    console.error("[CRM] Error fetching pipelines:", error);
    res.status(500).json({ error: "Failed to fetch pipelines" });
  }
});
crmRouter.post("/pipelines", async (req, res) => {
  try {
    const validatedData = insertCrmPipelineSchema.parse(req.body);
    const [pipeline] = await db.insert(crmPipelines).values(validatedData).returning();
    const defaultStages = [
      { name: "Qualified", probability: 10, displayOrder: 0, stageType: "active", color: "#3B82F6" },
      { name: "Meeting Scheduled", probability: 30, displayOrder: 1, stageType: "active", color: "#8B5CF6" },
      { name: "Proposal Sent", probability: 50, displayOrder: 2, stageType: "active", color: "#F59E0B" },
      { name: "Negotiation", probability: 70, displayOrder: 3, stageType: "active", color: "#EF4444" },
      { name: "Won", probability: 100, displayOrder: 4, stageType: "won", color: "#22C55E" },
      { name: "Lost", probability: 0, displayOrder: 5, stageType: "lost", color: "#6B7280" }
    ];
    for (const stage of defaultStages) {
      await db.insert(crmPipelineStages).values({
        pipelineId: pipeline.id,
        ...stage
      });
    }
    res.status(201).json(pipeline);
  } catch (error) {
    console.error("[CRM] Error creating pipeline:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create pipeline" });
  }
});
crmRouter.post("/pipelines/:pipelineId/stages", async (req, res) => {
  try {
    const pipelineId = parseInt(req.params.pipelineId);
    const validatedData = insertCrmPipelineStageSchema.parse({ ...req.body, pipelineId });
    const [stage] = await db.insert(crmPipelineStages).values(validatedData).returning();
    res.status(201).json(stage);
  } catch (error) {
    console.error("[CRM] Error creating stage:", error);
    res.status(500).json({ error: "Failed to create stage" });
  }
});
crmRouter.get("/deals", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const companyId = parseInt(req.query.companyId);
    const contactId = parseInt(req.query.contactId);
    const pipelineId = parseInt(req.query.pipelineId);
    const stageId = parseInt(req.query.stageId);
    const status = req.query.status;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    const conditions = [];
    if (clientId) conditions.push(eq12(crmDeals.clientId, clientId));
    if (companyId) conditions.push(eq12(crmDeals.companyId, companyId));
    if (contactId) conditions.push(eq12(crmDeals.contactId, contactId));
    if (pipelineId) conditions.push(eq12(crmDeals.pipelineId, pipelineId));
    if (stageId) conditions.push(eq12(crmDeals.stageId, stageId));
    if (status) conditions.push(eq12(crmDeals.status, status));
    const deals = await db.select().from(crmDeals).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmDeals.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql6`count(*)` }).from(crmDeals).where(conditions.length > 0 ? and8(...conditions) : void 0);
    const totalValueResult = await db.select({ total: sql6`COALESCE(SUM(amount), 0)` }).from(crmDeals).where(
      and8(
        ...conditions.length > 0 ? conditions : [],
        eq12(crmDeals.status, "open")
      )
    );
    res.json({
      deals,
      total: Number(countResult[0]?.count || 0),
      totalValue: Number(totalValueResult[0]?.total || 0),
      limit,
      offset
    });
  } catch (error) {
    console.error("[CRM] Error fetching deals:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});
crmRouter.get("/deals/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deal = await db.select().from(crmDeals).where(eq12(crmDeals.id, id)).limit(1);
    if (!deal.length) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal[0]);
  } catch (error) {
    console.error("[CRM] Error fetching deal:", error);
    res.status(500).json({ error: "Failed to fetch deal" });
  }
});
crmRouter.post("/deals", async (req, res) => {
  try {
    const validatedData = insertCrmDealSchema.parse(req.body);
    const [deal] = await db.insert(crmDeals).values(validatedData).returning();
    if (validatedData.clientId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: validatedData.contactId,
        dealId: deal.id,
        eventType: "deal_created",
        title: `Deal created: ${validatedData.name}`,
        description: validatedData.amount ? `Value: $${validatedData.amount}` : void 0,
        occurredAt: /* @__PURE__ */ new Date(),
        sourceApp: "relationships",
        actorType: "user"
      });
    }
    dispatchWebhookEvent(deal.clientId, "deal.created", deal);
    res.status(201).json(deal);
  } catch (error) {
    console.error("[CRM] Error creating deal:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create deal" });
  }
});
crmRouter.patch("/deals/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmDealSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    const [deal] = await db.update(crmDeals).set(updateData).where(eq12(crmDeals.id, id)).returning();
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (error) {
    console.error("[CRM] Error updating deal:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update deal" });
  }
});
crmRouter.patch("/deals/:id/stage", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { stageId } = req.body;
    const stage = await db.select().from(crmPipelineStages).where(eq12(crmPipelineStages.id, stageId)).limit(1);
    if (!stage.length) {
      return res.status(404).json({ error: "Stage not found" });
    }
    const updateData = {
      stageId,
      probability: stage[0].probability,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (stage[0].stageType === "won") {
      updateData.status = "won";
      updateData.actualCloseDate = /* @__PURE__ */ new Date();
    } else if (stage[0].stageType === "lost") {
      updateData.status = "lost";
      updateData.actualCloseDate = /* @__PURE__ */ new Date();
    } else {
      updateData.status = "open";
    }
    const [deal] = await db.update(crmDeals).set(updateData).where(eq12(crmDeals.id, id)).returning();
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    if (deal.clientId) {
      await db.insert(crmTimeline).values({
        clientId: deal.clientId,
        contactId: deal.contactId,
        dealId: deal.id,
        eventType: "deal_stage_changed",
        title: `Deal moved to: ${stage[0].name}`,
        occurredAt: /* @__PURE__ */ new Date(),
        sourceApp: "relationships",
        actorType: "user"
      });
    }
    executeAutomationTrigger("deal_stage_changed", deal.contactId || void 0, {
      dealId: deal.id,
      stageName: stage[0].name,
      stageType: stage[0].stageType,
      status: deal.status
    });
    if (stage[0].stageType === "won") {
      executeAutomationTrigger("deal_won", deal.contactId || void 0, {
        dealId: deal.id,
        dealName: deal.name,
        amount: deal.amount
      });
      dispatchWebhookEvent(deal.clientId, "deal.won", deal);
    } else if (stage[0].stageType === "lost") {
      executeAutomationTrigger("deal_lost", deal.contactId || void 0, {
        dealId: deal.id,
        dealName: deal.name,
        amount: deal.amount
      });
      dispatchWebhookEvent(deal.clientId, "deal.lost", deal);
    }
    dispatchWebhookEvent(deal.clientId, "deal.stage_changed", {
      deal,
      newStage: stage[0].name,
      stageType: stage[0].stageType
    });
    res.json(deal);
  } catch (error) {
    console.error("[CRM] Error updating deal stage:", error);
    res.status(500).json({ error: "Failed to update deal stage" });
  }
});
crmRouter.delete("/deals/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmDeals).where(eq12(crmDeals.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting deal:", error);
    res.status(500).json({ error: "Failed to delete deal" });
  }
});
crmRouter.get("/tasks", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const contactId = parseInt(req.query.contactId);
    const status = req.query.status;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    const conditions = [];
    if (clientId) conditions.push(eq12(crmTasks.clientId, clientId));
    if (contactId) conditions.push(eq12(crmTasks.contactId, contactId));
    if (status) conditions.push(eq12(crmTasks.status, status));
    const tasks2 = await db.select().from(crmTasks).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(asc2(crmTasks.dueDate)).limit(limit).offset(offset);
    res.json({ tasks: tasks2 });
  } catch (error) {
    console.error("[CRM] Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
crmRouter.post("/tasks", async (req, res) => {
  try {
    const validatedData = insertCrmTaskSchema.parse(req.body);
    const [task] = await db.insert(crmTasks).values(validatedData).returning();
    res.status(201).json(task);
  } catch (error) {
    console.error("[CRM] Error creating task:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
});
crmRouter.patch("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmTaskSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    if (updateData.status === "completed" && !updateData.completedAt) {
      updateData.completedAt = /* @__PURE__ */ new Date();
    }
    const [task] = await db.update(crmTasks).set(updateData).where(eq12(crmTasks.id, id)).returning();
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("[CRM] Error updating task:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update task" });
  }
});
crmRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmTasks).where(eq12(crmTasks.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});
crmRouter.get("/notes", async (req, res) => {
  try {
    const contactId = parseInt(req.query.contactId);
    const companyId = parseInt(req.query.companyId);
    const dealId = parseInt(req.query.dealId);
    const conditions = [];
    if (contactId) conditions.push(eq12(crmNotes.contactId, contactId));
    if (companyId) conditions.push(eq12(crmNotes.companyId, companyId));
    if (dealId) conditions.push(eq12(crmNotes.dealId, dealId));
    const notes = await db.select().from(crmNotes).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmNotes.isPinned), desc5(crmNotes.createdAt));
    res.json({ notes });
  } catch (error) {
    console.error("[CRM] Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});
crmRouter.post("/notes", async (req, res) => {
  try {
    const validatedData = insertCrmNoteSchema.parse(req.body);
    const [note] = await db.insert(crmNotes).values(validatedData).returning();
    if (validatedData.clientId && validatedData.contactId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: validatedData.contactId,
        eventType: "note_added",
        title: "Note added",
        description: validatedData.content.substring(0, 100) + (validatedData.content.length > 100 ? "..." : ""),
        occurredAt: /* @__PURE__ */ new Date(),
        sourceApp: "relationships",
        actorType: "user"
      });
    }
    res.status(201).json(note);
  } catch (error) {
    console.error("[CRM] Error creating note:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create note" });
  }
});
crmRouter.patch("/notes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmNoteSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    const [note] = await db.update(crmNotes).set(updateData).where(eq12(crmNotes.id, id)).returning();
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error("[CRM] Error updating note:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update note" });
  }
});
crmRouter.delete("/notes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmNotes).where(eq12(crmNotes.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});
crmRouter.get("/timeline", async (req, res) => {
  try {
    const contactId = parseInt(req.query.contactId);
    const companyId = parseInt(req.query.companyId);
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    const conditions = [];
    if (contactId) conditions.push(eq12(crmTimeline.contactId, contactId));
    if (companyId) conditions.push(eq12(crmTimeline.companyId, companyId));
    const events = await db.select().from(crmTimeline).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmTimeline.occurredAt)).limit(limit).offset(offset);
    res.json({ events });
  } catch (error) {
    console.error("[CRM] Error fetching timeline:", error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
});
crmRouter.post("/timeline", async (req, res) => {
  try {
    const validatedData = insertCrmTimelineSchema.parse(req.body);
    const [event] = await db.insert(crmTimeline).values(validatedData).returning();
    res.status(201).json(event);
  } catch (error) {
    console.error("[CRM] Error creating timeline event:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create timeline event" });
  }
});
crmRouter.get("/appointments", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const contactId = parseInt(req.query.contactId);
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const conditions = [];
    if (clientId) conditions.push(eq12(crmAppointments.clientId, clientId));
    if (contactId) conditions.push(eq12(crmAppointments.contactId, contactId));
    if (startDate) conditions.push(sql6`start_time >= ${new Date(startDate)}`);
    if (endDate) conditions.push(sql6`start_time <= ${new Date(endDate)}`);
    const appointments = await db.select().from(crmAppointments).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(asc2(crmAppointments.startTime));
    res.json({ appointments });
  } catch (error) {
    console.error("[CRM] Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});
crmRouter.post("/appointments", async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.startTime === "string") body.startTime = new Date(body.startTime);
    if (typeof body.endTime === "string") body.endTime = new Date(body.endTime);
    if (typeof body.reminderDate === "string") body.reminderDate = new Date(body.reminderDate);
    const validatedData = insertCrmAppointmentSchema.parse(body);
    const [appointment] = await db.insert(crmAppointments).values(validatedData).returning();
    if (validatedData.clientId && validatedData.contactId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: validatedData.contactId,
        eventType: "appointment_scheduled",
        title: `Appointment scheduled: ${validatedData.title}`,
        description: `${new Date(validatedData.startTime).toLocaleString()}`,
        occurredAt: /* @__PURE__ */ new Date(),
        sourceApp: "relationships",
        actorType: "user"
      });
    }
    res.status(201).json(appointment);
  } catch (error) {
    console.error("[CRM] Error creating appointment:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create appointment" });
  }
});
crmRouter.patch("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const body = { ...req.body };
    if (typeof body.startTime === "string") body.startTime = new Date(body.startTime);
    if (typeof body.endTime === "string") body.endTime = new Date(body.endTime);
    if (typeof body.reminderDate === "string") body.reminderDate = new Date(body.reminderDate);
    const partialSchema = insertCrmAppointmentSchema.partial();
    const validatedData = partialSchema.parse(body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    const [appointment] = await db.update(crmAppointments).set(updateData).where(eq12(crmAppointments.id, id)).returning();
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("[CRM] Error updating appointment:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update appointment" });
  }
});
crmRouter.delete("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmAppointments).where(eq12(crmAppointments.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});
crmRouter.get("/tags", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const conditions = [];
    if (clientId) conditions.push(eq12(crmTags.clientId, clientId));
    const tags = await db.select().from(crmTags).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmTags.usageCount));
    res.json({ tags });
  } catch (error) {
    console.error("[CRM] Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});
crmRouter.post("/tags", async (req, res) => {
  try {
    const validatedData = insertCrmTagSchema.parse(req.body);
    const [tag] = await db.insert(crmTags).values(validatedData).returning();
    res.status(201).json(tag);
  } catch (error) {
    console.error("[CRM] Error creating tag:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create tag" });
  }
});
crmRouter.get("/segments", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const conditions = [];
    if (clientId) conditions.push(eq12(crmSegments.clientId, clientId));
    const segments = await db.select().from(crmSegments).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(asc2(crmSegments.name));
    res.json({ segments });
  } catch (error) {
    console.error("[CRM] Error fetching segments:", error);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
});
crmRouter.get("/subscription", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    if (!clientId) {
      return res.status(400).json({ error: "clientId is required" });
    }
    const subscription = await db.select().from(crmSubscriptions).where(eq12(crmSubscriptions.clientId, clientId)).limit(1);
    if (!subscription.length) {
      return res.json({ tier: "starter", status: "active" });
    }
    res.json(subscription[0]);
  } catch (error) {
    console.error("[CRM] Error fetching subscription:", error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
});
crmRouter.get("/stats", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const conditions = clientId ? [eq12(crmContacts.clientId, clientId)] : [];
    const dealConditions = clientId ? [eq12(crmDeals.clientId, clientId)] : [];
    const taskConditions = clientId ? [eq12(crmTasks.clientId, clientId)] : [];
    const [contactCount] = await db.select({ count: sql6`count(*)` }).from(crmContacts).where(conditions.length > 0 ? and8(...conditions) : void 0);
    const [companyCount] = await db.select({ count: sql6`count(*)` }).from(crmCompanies).where(clientId ? eq12(crmCompanies.clientId, clientId) : void 0);
    const [openDeals] = await db.select({
      count: sql6`count(*)`,
      value: sql6`COALESCE(SUM(amount), 0)`
    }).from(crmDeals).where(and8(
      ...dealConditions,
      eq12(crmDeals.status, "open")
    ));
    const [pendingTasks] = await db.select({ count: sql6`count(*)` }).from(crmTasks).where(and8(
      ...taskConditions,
      eq12(crmTasks.status, "pending")
    ));
    res.json({
      contacts: Number(contactCount?.count || 0),
      companies: Number(companyCount?.count || 0),
      openDeals: Number(openDeals?.count || 0),
      dealValue: Number(openDeals?.value || 0),
      pendingTasks: Number(pendingTasks?.count || 0)
    });
  } catch (error) {
    console.error("[CRM] Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});
crmRouter.get("/forms", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId);
    const conditions = clientId ? [eq12(crmLeadForms.clientId, clientId)] : [];
    const forms = await db.select().from(crmLeadForms).where(conditions.length > 0 ? and8(...conditions) : void 0).orderBy(desc5(crmLeadForms.createdAt));
    res.json({ forms });
  } catch (error) {
    console.error("[CRM] Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});
crmRouter.get("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const form = await db.select().from(crmLeadForms).where(eq12(crmLeadForms.id, id)).limit(1);
    if (!form.length) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form[0]);
  } catch (error) {
    console.error("[CRM] Error fetching form:", error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
});
crmRouter.post("/forms", async (req, res) => {
  try {
    const validatedData = insertCrmLeadFormSchema.parse(req.body);
    const [form] = await db.insert(crmLeadForms).values(validatedData).returning();
    res.status(201).json(form);
  } catch (error) {
    console.error("[CRM] Error creating form:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create form" });
  }
});
crmRouter.patch("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmLeadFormSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: /* @__PURE__ */ new Date() };
    const [form] = await db.update(crmLeadForms).set(updateData).where(eq12(crmLeadForms.id, id)).returning();
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    console.error("[CRM] Error updating form:", error);
    if (error instanceof z6.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update form" });
  }
});
crmRouter.delete("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(crmLeadForms).where(eq12(crmLeadForms.id, id)).returning();
    if (!deleted) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("[CRM] Error deleting form:", error);
    res.status(500).json({ error: "Failed to delete form" });
  }
});
crmRouter.post("/forms/:slug/submit", async (req, res) => {
  try {
    const slug = req.params.slug;
    const submission = req.body;
    const [form] = await db.select().from(crmLeadForms).where(eq12(crmLeadForms.slug, slug)).limit(1);
    if (!form || !form.isActive) {
      return res.status(404).json({ error: "Form not found" });
    }
    const contactData = {
      clientId: form.clientId,
      firstName: submission.firstName || null,
      lastName: submission.lastName || null,
      email: submission.email || null,
      phone: submission.phone || null,
      lifecycleStage: form.defaultLifecycleStage || "lead",
      leadSource: form.defaultLeadSource || "web_form"
    };
    if (contactData.email) {
      const existing = await db.select().from(crmContacts).where(eq12(crmContacts.email, contactData.email)).limit(1);
      if (existing.length > 0) {
        await db.update(crmContacts).set({ ...contactData, updatedAt: /* @__PURE__ */ new Date() }).where(eq12(crmContacts.id, existing[0].id));
        await db.update(crmLeadForms).set({ submissionCount: sql6`submission_count + 1` }).where(eq12(crmLeadForms.id, form.id));
        res.json({ success: true, message: form.successMessage, contactId: existing[0].id });
        return;
      }
    }
    const [contact] = await db.insert(crmContacts).values(contactData).returning();
    await db.update(crmLeadForms).set({ submissionCount: sql6`submission_count + 1` }).where(eq12(crmLeadForms.id, form.id));
    if (form.clientId) {
      await db.insert(crmTimeline).values({
        clientId: form.clientId,
        contactId: contact.id,
        eventType: "form_submission",
        title: `Form submission: ${form.name}`,
        occurredAt: /* @__PURE__ */ new Date(),
        sourceApp: "relationships",
        actorType: "contact"
      });
    }
    res.json({ success: true, message: form.successMessage, contactId: contact.id });
  } catch (error) {
    console.error("[CRM] Error processing form submission:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});
crmRouter.get("/integration/lookup", async (req, res) => {
  try {
    const { email, phone } = req.query;
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone required" });
    }
    let contact = null;
    if (email && typeof email === "string") {
      const results = await db.select().from(crmContacts).where(eq12(crmContacts.email, email.toLowerCase())).limit(1);
      if (results.length > 0) contact = results[0];
    }
    if (!contact && phone && typeof phone === "string") {
      const results = await db.select().from(crmContacts).where(eq12(crmContacts.phone, phone)).limit(1);
      if (results.length > 0) contact = results[0];
    }
    if (!contact) {
      return res.json({ found: false, contact: null });
    }
    let company = null;
    if (contact.companyId) {
      const companyResults = await db.select().from(crmCompanies).where(eq12(crmCompanies.id, contact.companyId)).limit(1);
      if (companyResults.length > 0) company = companyResults[0];
    }
    res.json({
      found: true,
      contact: {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
        lifecycleStage: contact.lifecycleStage,
        leadSource: contact.leadSource,
        customFields: contact.customFields,
        tags: contact.tags
      },
      company: company ? {
        id: company.id,
        name: company.name,
        industry: company.industry,
        website: company.website
      } : null
    });
  } catch (error) {
    console.error("[CRM] Integration lookup error:", error);
    res.status(500).json({ error: "Failed to lookup contact" });
  }
});
crmRouter.get("/integration/context/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const contacts = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId)).limit(1);
    if (contacts.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    const contact = contacts[0];
    let company = null;
    if (contact.companyId) {
      const companies = await db.select().from(crmCompanies).where(eq12(crmCompanies.id, contact.companyId)).limit(1);
      if (companies.length > 0) company = companies[0];
    }
    const deals = await db.select().from(crmDeals).where(eq12(crmDeals.contactId, contactId)).orderBy(desc5(crmDeals.updatedAt)).limit(5);
    const recentActivity = await db.select().from(crmTimeline).where(eq12(crmTimeline.contactId, contactId)).orderBy(desc5(crmTimeline.occurredAt)).limit(10);
    const contactTags = contact.tags || [];
    res.json({
      contact: {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
        lifecycleStage: contact.lifecycleStage,
        leadSource: contact.leadSource,
        customFields: contact.customFields
      },
      company: company ? {
        id: company.id,
        name: company.name,
        industry: company.industry,
        website: company.website,
        size: company.size
      } : null,
      deals: deals.map((d) => ({
        id: d.id,
        title: d.title,
        value: d.value,
        stage: d.stage,
        probability: d.probability
      })),
      recentActivity: recentActivity.map((a) => ({
        id: a.id,
        eventType: a.eventType,
        title: a.title,
        description: a.description,
        sourceApp: a.sourceApp,
        occurredAt: a.occurredAt
      })),
      tags: contactTags,
      totalDealValue: deals.reduce((sum, d) => sum + (Number(d.value) || 0), 0)
    });
  } catch (error) {
    console.error("[CRM] Integration context error:", error);
    res.status(500).json({ error: "Failed to get contact context" });
  }
});
crmRouter.get("/integration/segments", async (req, res) => {
  try {
    const segments = await db.select({
      id: crmSegments.id,
      name: crmSegments.name,
      description: crmSegments.description,
      memberCount: crmSegments.memberCount,
      segmentType: crmSegments.segmentType
    }).from(crmSegments).orderBy(crmSegments.name);
    res.json({ segments });
  } catch (error) {
    console.error("[CRM] Integration segments error:", error);
    res.status(500).json({ error: "Failed to get segments" });
  }
});
crmRouter.get("/integration/segments/:id/members", async (req, res) => {
  try {
    const segmentId = parseInt(req.params.id);
    const limit = Math.min(parseInt(req.query.limit) || 100, 1e3);
    const offset = parseInt(req.query.offset) || 0;
    const members = await db.select({
      id: crmContacts.id,
      firstName: crmContacts.firstName,
      lastName: crmContacts.lastName,
      email: crmContacts.email,
      phone: crmContacts.phone
    }).from(crmSegmentMembers).innerJoin(crmContacts, eq12(crmSegmentMembers.contactId, crmContacts.id)).where(eq12(crmSegmentMembers.segmentId, segmentId)).limit(limit).offset(offset);
    res.json({ members, segmentId });
  } catch (error) {
    console.error("[CRM] Integration segment members error:", error);
    res.status(500).json({ error: "Failed to get segment members" });
  }
});
crmRouter.post("/integration/timeline", async (req, res) => {
  try {
    const { contactId, companyId, eventType, title, description, sourceApp, sourceEntityType, sourceEntityId, metadata } = req.body;
    if (!eventType || !title || !sourceApp) {
      return res.status(400).json({ error: "eventType, title, and sourceApp are required" });
    }
    let resolvedContactId = contactId;
    if (!resolvedContactId && req.body.email) {
      const contacts = await db.select({ id: crmContacts.id, clientId: crmContacts.clientId }).from(crmContacts).where(eq12(crmContacts.email, req.body.email)).limit(1);
      if (contacts.length > 0) {
        resolvedContactId = contacts[0].id;
      }
    }
    let clientId = null;
    if (resolvedContactId) {
      const contacts = await db.select({ clientId: crmContacts.clientId }).from(crmContacts).where(eq12(crmContacts.id, resolvedContactId)).limit(1);
      if (contacts.length > 0) {
        clientId = contacts[0].clientId;
      }
    }
    const [event] = await db.insert(crmTimeline).values({
      clientId,
      contactId: resolvedContactId,
      companyId,
      eventType,
      title,
      description,
      sourceApp,
      sourceEntityType,
      sourceEntityId,
      metadata: metadata || {},
      occurredAt: /* @__PURE__ */ new Date(),
      actorType: "system"
    }).returning();
    res.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error("[CRM] Integration timeline error:", error);
    res.status(500).json({ error: "Failed to add timeline event" });
  }
});
crmRouter.post("/integration/bulk-lookup", async (req, res) => {
  try {
    const { emails } = req.body;
    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: "emails array required" });
    }
    if (emails.length > 1e3) {
      return res.status(400).json({ error: "Maximum 1000 emails per request" });
    }
    const contacts = await db.select({
      id: crmContacts.id,
      firstName: crmContacts.firstName,
      lastName: crmContacts.lastName,
      email: crmContacts.email,
      phone: crmContacts.phone,
      lifecycleStage: crmContacts.lifecycleStage
    }).from(crmContacts).where(inArray(crmContacts.email, emails.map((e) => e.toLowerCase())));
    const contactMap = {};
    contacts.forEach((c) => {
      if (c.email) contactMap[c.email.toLowerCase()] = c;
    });
    res.json({ contacts: contactMap, found: contacts.length });
  } catch (error) {
    console.error("[CRM] Integration bulk lookup error:", error);
    res.status(500).json({ error: "Failed to bulk lookup contacts" });
  }
});
crmRouter.get("/automations", async (req, res) => {
  try {
    const automations = await db.select().from(crmAutomations).orderBy(desc5(crmAutomations.createdAt));
    res.json({ automations });
  } catch (error) {
    console.error("[CRM] List automations error:", error);
    res.status(500).json({ error: "Failed to fetch automations" });
  }
});
crmRouter.get("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [automation] = await db.select().from(crmAutomations).where(eq12(crmAutomations.id, id));
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    const steps = await db.select().from(crmAutomationSteps).where(eq12(crmAutomationSteps.automationId, id)).orderBy(asc2(crmAutomationSteps.stepOrder));
    const executions = await db.select().from(crmAutomationExecutions).where(eq12(crmAutomationExecutions.automationId, id)).orderBy(desc5(crmAutomationExecutions.startedAt)).limit(10);
    res.json({ automation, steps, executions });
  } catch (error) {
    console.error("[CRM] Get automation error:", error);
    res.status(500).json({ error: "Failed to fetch automation" });
  }
});
crmRouter.post("/automations", async (req, res) => {
  try {
    const parsed = insertCrmAutomationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    const [automation] = await db.insert(crmAutomations).values(parsed.data).returning();
    res.status(201).json({ automation });
  } catch (error) {
    console.error("[CRM] Create automation error:", error);
    res.status(500).json({ error: "Failed to create automation" });
  }
});
crmRouter.patch("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const [automation] = await db.update(crmAutomations).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq12(crmAutomations.id, id)).returning();
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    res.json({ automation });
  } catch (error) {
    console.error("[CRM] Update automation error:", error);
    res.status(500).json({ error: "Failed to update automation" });
  }
});
crmRouter.delete("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmAutomations).where(eq12(crmAutomations.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("[CRM] Delete automation error:", error);
    res.status(500).json({ error: "Failed to delete automation" });
  }
});
crmRouter.post("/automations/:id/steps", async (req, res) => {
  try {
    const automationId = parseInt(req.params.id);
    const { steps } = req.body;
    if (!Array.isArray(steps)) {
      return res.status(400).json({ error: "steps array required" });
    }
    await db.delete(crmAutomationSteps).where(eq12(crmAutomationSteps.automationId, automationId));
    if (steps.length > 0) {
      const stepsToInsert = steps.map((step, index2) => ({
        automationId,
        stepOrder: index2 + 1,
        stepType: step.stepType,
        config: step.config || {},
        conditionType: step.conditionType,
        conditionConfig: step.conditionConfig || {}
      }));
      await db.insert(crmAutomationSteps).values(stepsToInsert);
    }
    const insertedSteps = await db.select().from(crmAutomationSteps).where(eq12(crmAutomationSteps.automationId, automationId)).orderBy(asc2(crmAutomationSteps.stepOrder));
    res.json({ steps: insertedSteps });
  } catch (error) {
    console.error("[CRM] Add automation steps error:", error);
    res.status(500).json({ error: "Failed to add automation steps" });
  }
});
crmRouter.post("/automations/:id/trigger", async (req, res) => {
  try {
    const automationId = parseInt(req.params.id);
    const { contactId, triggerData } = req.body;
    const [automation] = await db.select().from(crmAutomations).where(eq12(crmAutomations.id, automationId));
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    const steps = await db.select().from(crmAutomationSteps).where(eq12(crmAutomationSteps.automationId, automationId)).orderBy(asc2(crmAutomationSteps.stepOrder));
    const [execution] = await db.insert(crmAutomationExecutions).values({
      automationId,
      contactId,
      status: "running",
      currentStep: 0,
      totalSteps: steps.length,
      triggerData: triggerData || {}
    }).returning();
    await db.update(crmAutomations).set({
      runCount: sql6`${crmAutomations.runCount} + 1`,
      lastRunAt: /* @__PURE__ */ new Date()
    }).where(eq12(crmAutomations.id, automationId));
    const executionLog = [];
    let finalStatus = "completed";
    let errorMessage = null;
    let contact = null;
    if (contactId) {
      const [c] = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId));
      contact = c;
    }
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const config = step.config || {};
      try {
        const conditionMet = evaluateCondition(
          step.conditionType,
          step.conditionConfig,
          triggerData || {},
          contact
        );
        if (!conditionMet) {
          executionLog.push({ step: i + 1, action: step.stepType, result: "Skipped: condition not met", timestamp: /* @__PURE__ */ new Date() });
          continue;
        }
        await db.update(crmAutomationExecutions).set({ currentStep: i + 1 }).where(eq12(crmAutomationExecutions.id, execution.id));
        switch (step.stepType) {
          case "add_tag":
            if (contactId && config.tag) {
              const [contactData] = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId));
              if (contactData) {
                const currentTags = Array.isArray(contactData.tags) ? contactData.tags : [];
                if (!currentTags.includes(config.tag)) {
                  await db.update(crmContacts).set({ tags: [...currentTags, config.tag] }).where(eq12(crmContacts.id, contactId));
                }
              }
            }
            executionLog.push({ step: i + 1, action: "add_tag", result: `Added tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "remove_tag":
            if (contactId && config.tag) {
              const [contact2] = await db.select().from(crmContacts).where(eq12(crmContacts.id, contactId));
              if (contact2) {
                const currentTags = Array.isArray(contact2.tags) ? contact2.tags : [];
                await db.update(crmContacts).set({ tags: currentTags.filter((t) => t !== config.tag) }).where(eq12(crmContacts.id, contactId));
              }
            }
            executionLog.push({ step: i + 1, action: "remove_tag", result: `Removed tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "update_contact":
            if (contactId && config.field && config.value !== void 0) {
              await db.update(crmContacts).set({ [config.field]: config.value }).where(eq12(crmContacts.id, contactId));
            }
            executionLog.push({ step: i + 1, action: "update_contact", result: `Updated ${config.field || "field"}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "create_task":
            const taskTitle = config.title || "Automated task";
            await db.insert(crmTasks).values({
              contactId: contactId || null,
              title: taskTitle,
              description: config.description || `Created by automation: ${automation.name}`,
              status: "pending",
              priority: config.priority || "medium",
              dueDate: config.dueDate ? new Date(config.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3)
              // 7 days default
            });
            executionLog.push({ step: i + 1, action: "create_task", result: `Created task: ${taskTitle}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "add_to_segment":
            if (contactId && config.segmentId) {
              await db.insert(crmSegmentMembers).values({
                segmentId: parseInt(config.segmentId),
                contactId
              }).onConflictDoNothing();
            }
            executionLog.push({ step: i + 1, action: "add_to_segment", result: `Added to segment ${config.segmentId || "unknown"}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "wait":
            const waitDuration = config.duration || "1 day";
            executionLog.push({ step: i + 1, action: "wait", result: `Wait step: ${waitDuration} (skipped in sync execution)`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "send_email":
            executionLog.push({ step: i + 1, action: "send_email", result: `Email queued: ${config.subject || "No subject"} (requires email integration)`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "webhook":
            executionLog.push({ step: i + 1, action: "webhook", result: `Webhook: ${config.url || "No URL"} (requires async execution)`, timestamp: /* @__PURE__ */ new Date() });
            break;
          default:
            executionLog.push({ step: i + 1, action: step.stepType, result: "Unknown step type", timestamp: /* @__PURE__ */ new Date() });
        }
      } catch (stepError) {
        executionLog.push({ step: i + 1, action: step.stepType, result: `Error: ${stepError.message}`, timestamp: /* @__PURE__ */ new Date() });
        finalStatus = "failed";
        errorMessage = `Step ${i + 1} failed: ${stepError.message}`;
        break;
      }
    }
    await db.update(crmAutomationExecutions).set({
      status: finalStatus,
      completedAt: /* @__PURE__ */ new Date(),
      errorMessage,
      executionLog
    }).where(eq12(crmAutomationExecutions.id, execution.id));
    res.json({
      success: finalStatus === "completed",
      execution: {
        ...execution,
        status: finalStatus,
        executionLog,
        errorMessage
      },
      message: finalStatus === "completed" ? `Automation completed successfully (${steps.length} steps executed)` : `Automation failed: ${errorMessage}`
    });
  } catch (error) {
    console.error("[CRM] Trigger automation error:", error);
    res.status(500).json({ error: "Failed to trigger automation" });
  }
});
crmRouter.get("/automations/:id/executions", async (req, res) => {
  try {
    const automationId = parseInt(req.params.id);
    const executions = await db.select({
      id: crmAutomationExecutions.id,
      status: crmAutomationExecutions.status,
      currentStep: crmAutomationExecutions.currentStep,
      totalSteps: crmAutomationExecutions.totalSteps,
      startedAt: crmAutomationExecutions.startedAt,
      completedAt: crmAutomationExecutions.completedAt,
      errorMessage: crmAutomationExecutions.errorMessage,
      contact: {
        id: crmContacts.id,
        firstName: crmContacts.firstName,
        lastName: crmContacts.lastName,
        email: crmContacts.email
      }
    }).from(crmAutomationExecutions).leftJoin(crmContacts, eq12(crmAutomationExecutions.contactId, crmContacts.id)).where(eq12(crmAutomationExecutions.automationId, automationId)).orderBy(desc5(crmAutomationExecutions.startedAt)).limit(50);
    res.json({ executions });
  } catch (error) {
    console.error("[CRM] Get automation executions error:", error);
    res.status(500).json({ error: "Failed to fetch automation executions" });
  }
});
crmRouter.get("/analytics", async (req, res) => {
  try {
    const lifecycleStats = await db.select({
      stage: crmContacts.lifecycleStage,
      count: sql6`count(*)::int`
    }).from(crmContacts).groupBy(crmContacts.lifecycleStage);
    const dealStats = await db.select({
      status: crmDeals.status,
      count: sql6`count(*)::int`,
      totalValue: sql6`coalesce(sum(${crmDeals.amount}::float), 0)::float`
    }).from(crmDeals).groupBy(crmDeals.status);
    const pipelineBreakdown = await db.select({
      stageName: crmPipelineStages.name,
      stageId: crmDeals.stageId,
      count: sql6`count(*)::int`,
      totalValue: sql6`coalesce(sum(${crmDeals.amount}::float), 0)::float`
    }).from(crmDeals).leftJoin(crmPipelineStages, eq12(crmDeals.stageId, crmPipelineStages.id)).where(eq12(crmDeals.status, "open")).groupBy(crmDeals.stageId, crmPipelineStages.name);
    const leadSourceStats = await db.select({
      source: crmContacts.leadSource,
      count: sql6`count(*)::int`
    }).from(crmContacts).where(sql6`${crmContacts.leadSource} is not null`).groupBy(crmContacts.leadSource);
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activityByDay = await db.select({
      date: sql6`date(${crmTimeline.occurredAt})`,
      count: sql6`count(*)::int`
    }).from(crmTimeline).where(sql6`${crmTimeline.occurredAt} >= ${thirtyDaysAgo.toISOString()}`).groupBy(sql6`date(${crmTimeline.occurredAt})`).orderBy(sql6`date(${crmTimeline.occurredAt})`);
    const taskStats = await db.select({
      status: crmTasks.status,
      count: sql6`count(*)::int`
    }).from(crmTasks).groupBy(crmTasks.status);
    const wonDeals = dealStats.find((d) => d.status === "won");
    const lostDeals = dealStats.find((d) => d.status === "lost");
    const totalClosed = (wonDeals?.count || 0) + (lostDeals?.count || 0);
    const winRate = totalClosed > 0 ? (wonDeals?.count || 0) / totalClosed * 100 : 0;
    const openDeals = dealStats.find((d) => d.status === "open");
    const pipelineValue = openDeals?.totalValue || 0;
    const allDealsCount = dealStats.reduce((sum, d) => sum + d.count, 0);
    const allDealsValue = dealStats.reduce((sum, d) => sum + d.totalValue, 0);
    const avgDealValue = allDealsCount > 0 ? allDealsValue / allDealsCount : 0;
    const totalContacts = lifecycleStats.reduce((sum, s) => sum + s.count, 0);
    const totalDeals = dealStats.reduce((sum, d) => sum + d.count, 0);
    res.json({
      summary: {
        totalContacts,
        totalDeals,
        pipelineValue,
        winRate: Math.round(winRate * 10) / 10,
        avgDealValue: Math.round(avgDealValue * 100) / 100,
        openDeals: openDeals?.count || 0,
        wonDeals: wonDeals?.count || 0,
        lostDeals: lostDeals?.count || 0
      },
      lifecycleDistribution: lifecycleStats,
      dealsByStatus: dealStats,
      pipelineBreakdown,
      leadSources: leadSourceStats,
      activityTrend: activityByDay,
      taskStats
    });
  } catch (error) {
    console.error("[CRM] Analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

// server/routes/payments.ts
init_db();
init_schema();
import { eq as eq13 } from "drizzle-orm";

// server/services/StripeProvider.ts
import Stripe from "stripe";
var StripeProvider = class {
  stripe;
  name = "stripe";
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("Stripe API key is required");
    }
    this.stripe = new Stripe(apiKey, {
      apiVersion: "2025-12-15.clover"
    });
  }
  /**
   * Process a one-time charge
   */
  async charge(params) {
    try {
      const amountInCents = Math.round(params.amount * 100);
      const charge = await this.stripe.charges.create({
        amount: amountInCents,
        currency: "usd",
        customer: params.customerId,
        source: params.source,
        description: params.description || "",
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
    } catch (error) {
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
  async refund(transactionId, amount) {
    try {
      const refundData = {
        charge: transactionId
      };
      if (amount !== void 0) {
        refundData.amount = Math.round(amount * 100);
      }
      const refund = await this.stripe.refunds.create(refundData);
      return {
        success: true,
        refundId: refund.id,
        transactionId: refund.charge,
        amount: refund.amount / 100,
        status: refund.status || "pending",
        provider: this.name,
        raw: refund
      };
    } catch (error) {
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
  async createCustomer(params) {
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
    } catch (error) {
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
  async updateCustomer(customerId, updates) {
    try {
      const customer = await this.stripe.customers.update(customerId, updates);
      return {
        success: true,
        customerId: customer.id,
        provider: this.name,
        raw: customer
      };
    } catch (error) {
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
  async deleteCustomer(customerId) {
    try {
      const deleted = await this.stripe.customers.del(customerId);
      return {
        success: true,
        customerId: deleted.id,
        provider: this.name,
        raw: deleted
      };
    } catch (error) {
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
  async addPaymentMethod(customerId, paymentMethodId) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId
      });
      return {
        success: true,
        paymentMethodId: paymentMethod.id,
        customerId: paymentMethod.customer,
        provider: this.name,
        raw: paymentMethod
      };
    } catch (error) {
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
  async createPaymentIntent(params) {
    try {
      const amountInCents = Math.round(params.amount * 100);
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
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
    } catch (error) {
      return {
        success: false,
        error: `Stripe payment intent creation failed: ${error.message}`,
        provider: this.name
      };
    }
  }
};

// server/services/payment-service.ts
var PaymentService = class {
  provider;
  constructor() {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured in environment");
    }
    this.provider = new StripeProvider(stripeKey);
  }
  /**
   * Get the active provider name
   */
  getProviderName() {
    return this.provider.name;
  }
  /**
   * Process a charge
   */
  async charge(params) {
    return await this.provider.charge(params);
  }
  /**
   * Refund a transaction
   */
  async refund(transactionId, amount) {
    return await this.provider.refund(transactionId, amount);
  }
  /**
   * Create a customer
   */
  async createCustomer(params) {
    return await this.provider.createCustomer(params);
  }
  /**
   * Update a customer
   */
  async updateCustomer(customerId, updates) {
    return await this.provider.updateCustomer(customerId, updates);
  }
  /**
   * Delete a customer
   */
  async deleteCustomer(customerId) {
    return await this.provider.deleteCustomer(customerId);
  }
  /**
   * Add payment method to customer
   */
  async addPaymentMethod(customerId, paymentMethodId) {
    return await this.provider.addPaymentMethod(customerId, paymentMethodId);
  }
  /**
   * Create payment intent
   */
  async createPaymentIntent(params) {
    return await this.provider.createPaymentIntent(params);
  }
};
var paymentService = new PaymentService();

// server/routes/payments.ts
console.log("[PAYMENT ROUTES] File loaded!");
function registerPaymentRoutes(app2) {
  console.log("[PAYMENT ROUTES] Registering routes...");
  app2.get("/api/payments/test", async (req, res) => {
    try {
      const provider = paymentService.getProviderName();
      res.json({
        success: true,
        provider,
        message: "Payment service is ready"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  app2.get("/api/payments/methods", async (req, res) => {
    try {
      const methods = paymentService.getSupportedMethods?.() ?? [];
      res.json({
        success: true,
        methods
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app2.post("/api/payments/create-intent", async (req, res) => {
    try {
      const { amount, customerId, metadata } = req.body;
      if (!amount || !customerId) {
        return res.status(400).json({
          success: false,
          error: "Amount and customerId are required"
        });
      }
      const customer = await db.query.users.findFirst({
        where: (users2, { eq: eq20 }) => eq20(users2.id, customerId)
      });
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: "Customer not found"
        });
      }
      let paymentCustomerId = customer.stripeCustomerId;
      if (!paymentCustomerId) {
        const customerName = customer.firstName && customer.lastName ? `${customer.firstName} ${customer.lastName}` : customer.email || "Customer";
        const result2 = await paymentService.createCustomer({
          email: customer.email || "",
          name: customerName,
          metadata: {
            crm_id: customer.id.toString()
          }
        });
        if (!result2.success) {
          return res.status(500).json(result2);
        }
        paymentCustomerId = result2.customerId;
        await db.update(users).set({ stripeCustomerId: paymentCustomerId }).where(eq13(users.id, customer.id));
      }
      const result = await paymentService.createPaymentIntent({
        amount: parseFloat(amount),
        customerId: paymentCustomerId,
        metadata: metadata || {}
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  app2.post("/api/payments/charge", async (req, res) => {
    try {
      const { amount, customerId, paymentMethodId, description, metadata } = req.body;
      if (!amount || !customerId || !paymentMethodId) {
        return res.status(400).json({
          success: false,
          error: "Amount, customerId, and paymentMethodId are required"
        });
      }
      const customer = await db.query.users.findFirst({
        where: (users2, { eq: eq20 }) => eq20(users2.id, customerId)
      });
      if (!customer || !customer.stripeCustomerId) {
        return res.status(404).json({
          success: false,
          error: "Customer not found or not set up for payments"
        });
      }
      const customerName = customer.firstName && customer.lastName ? `${customer.firstName} ${customer.lastName}` : customer.email || "Customer";
      const result = await paymentService.charge({
        amount: parseFloat(amount),
        customerId: customer.stripeCustomerId,
        source: paymentMethodId,
        description: description || `Payment for ${customerName}`,
        metadata: metadata || {}
      });
      if (result.success) {
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  app2.post("/api/payments/refund", async (req, res) => {
    try {
      const { transactionId, amount } = req.body;
      if (!transactionId) {
        return res.status(400).json({
          success: false,
          error: "transactionId is required"
        });
      }
      const result = await paymentService.refund(
        transactionId,
        amount ? parseFloat(amount) : void 0
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  app2.post("/api/payments/customers", async (req, res) => {
    try {
      const { email, name, phone, metadata } = req.body;
      if (!email || !name) {
        return res.status(400).json({
          success: false,
          error: "Email and name are required"
        });
      }
      const result = await paymentService.createCustomer({
        email,
        name,
        phone,
        metadata: metadata || {}
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  app2.get("/api/payments/config", async (req, res) => {
    try {
      res.json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        provider: paymentService.getProviderName()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  console.log("[PAYMENT ROUTES] Routes registered successfully!");
}

// server/routes.ts
init_schema();

// server/services/googleBusiness.ts
var GoogleBusinessService = class {
  apiKey;
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("Google API key is required");
    }
  }
  async searchBusiness(businessName, address) {
    try {
      const query = `${businessName} ${address}`;
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      if (searchData.status !== "OK" || !searchData.results || searchData.results.length === 0) {
        return null;
      }
      const place = searchData.results[0];
      const placeId = place.place_id;
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,business_status,types,photos,reviews,opening_hours&key=${this.apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();
      if (detailsData.status !== "OK" || !detailsData.result) {
        return null;
      }
      const result = detailsData.result;
      return {
        placeId,
        name: result.name || businessName,
        address: result.formatted_address || address,
        phone: result.formatted_phone_number || "",
        website: result.website,
        rating: result.rating,
        userRatingsTotal: result.user_ratings_total,
        businessStatus: result.business_status,
        types: result.types,
        photos: result.photos?.map(
          (photo) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${this.apiKey}`
        ),
        reviews: result.reviews?.slice(0, 5).map((review) => ({
          authorName: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.time
        })),
        openingHours: result.opening_hours
      };
    } catch (error) {
      console.error("Error fetching Google Business data:", error);
      return null;
    }
  }
  calculatePresenceScore(data) {
    if (!data) {
      return {
        overallScore: 15,
        scores: {
          visibility: 0,
          reviews: 0,
          completeness: 15,
          engagement: 0
        },
        insights: [
          "No Google Business Profile found",
          "Missing from Google Search results",
          "Need to claim and verify Google Business Profile"
        ]
      };
    }
    const scores = {
      visibility: this.calculateVisibilityScore(data),
      reviews: this.calculateReviewScore(data),
      completeness: this.calculateCompletenessScore(data),
      engagement: this.calculateEngagementScore(data)
    };
    const overallScore = Math.round(
      (scores.visibility + scores.reviews + scores.completeness + scores.engagement) / 4
    );
    const insights = this.generateInsights(data, scores);
    return { overallScore, scores, insights };
  }
  calculateVisibilityScore(data) {
    let score = 0;
    if (data.placeId) score += 30;
    if (data.businessStatus === "OPERATIONAL") score += 20;
    if (data.types && data.types.length > 0) score += 15;
    if (data.photos && data.photos.length > 0) score += 20;
    if (data.openingHours) score += 15;
    return Math.min(score, 140);
  }
  calculateReviewScore(data) {
    if (!data.rating || !data.userRatingsTotal) return 10;
    let score = 0;
    if (data.rating >= 4) score += 40;
    else if (data.rating >= 3.5) score += 30;
    else if (data.rating >= 3) score += 20;
    else score += 10;
    if (data.userRatingsTotal >= 50) score += 30;
    else if (data.userRatingsTotal >= 20) score += 20;
    else if (data.userRatingsTotal >= 5) score += 10;
    if (data.reviews && data.reviews.length > 0) score += 30;
    return Math.min(score, 140);
  }
  calculateCompletenessScore(data) {
    let score = 0;
    if (data.name) score += 15;
    if (data.address) score += 15;
    if (data.phone) score += 15;
    if (data.website) score += 20;
    if (data.openingHours) score += 15;
    if (data.photos && data.photos.length >= 3) score += 20;
    return Math.min(score, 140);
  }
  calculateEngagementScore(data) {
    let score = 30;
    if (data.reviews && data.reviews.length > 0) {
      const recentReviews = data.reviews.filter(
        (review) => Date.now() - review.time * 1e3 < 90 * 24 * 60 * 60 * 1e3
        // Last 90 days
      );
      if (recentReviews.length > 0) score += 40;
      else if (data.reviews.length > 0) score += 20;
    }
    if (data.photos && data.photos.length >= 5) score += 30;
    return Math.min(score, 140);
  }
  generateInsights(data, scores) {
    const insights = [];
    if (scores.visibility < 70) {
      insights.push("Improve business visibility by adding more photos and complete business hours");
    }
    if (scores.reviews < 70) {
      insights.push("Encourage more customer reviews to build trust and credibility");
    }
    if (scores.completeness < 80) {
      if (!data.website) insights.push("Add a website to your Google Business Profile");
      if (!data.phone) insights.push("Add a phone number for customer contact");
      if (!data.photos || data.photos.length < 3) insights.push("Add more high-quality photos of your business");
    }
    if (scores.engagement < 60) {
      insights.push("Respond to customer reviews and keep your business information updated");
    }
    return insights;
  }
};

// server/services/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_SECRET_KEY || ""
});
var OpenAIAnalysisService = class {
  async analyzeBusinessPresence(input) {
    try {
      const prompt = this.buildAnalysisPrompt(input);
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a digital marketing expert specializing in local business online presence analysis. Provide detailed, actionable insights based on Google Business Profile data and general digital marketing best practices. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2e3
      });
      const result = JSON.parse(response.choices[0].message.content || "{}");
      return this.validateAndFormatResult(result, input.presenceScore.overallScore);
    } catch (error) {
      console.error("Error analyzing business presence:", error);
      throw new Error("Failed to analyze business presence");
    }
  }
  buildAnalysisPrompt(input) {
    return `
Analyze the digital presence of this business and provide comprehensive recommendations:

Business Information:
- Name: ${input.businessInfo.name}
- Industry: ${input.businessInfo.industry}
- Location: ${input.businessInfo.location}
- Website: ${input.businessInfo.website || "None"}

Google Business Profile Analysis:
- Overall Score: ${input.presenceScore.overallScore}/100
- Visibility Score: ${input.presenceScore.scores.visibility}/100
- Reviews Score: ${input.presenceScore.scores.reviews}/100
- Completeness Score: ${input.presenceScore.scores.completeness}/100
- Engagement Score: ${input.presenceScore.scores.engagement}/100

Current Insights:
${input.presenceScore.insights.join("\n")}

Google Business Data:
${JSON.stringify(input.googleData, null, 2)}

Please provide a comprehensive analysis in JSON format with the following structure:
{
  "digitalScore": number (0-100),
  "grade": string (A+, A, B+, B, C+, C, D+, D, F),
  "summary": string (2-3 sentences overview),
  "strengths": [array of current strengths],
  "weaknesses": [array of areas needing improvement],
  "recommendations": [
    {
      "category": string (seo, reviews, website, social, content, etc.),
      "title": string,
      "description": string (detailed explanation),
      "priority": "high" | "medium" | "low",
      "estimatedImpact": string (High ROI, Medium ROI, Long-term benefit),
      "estimatedEffort": string (1-2 hours, 1-2 days, 1-2 weeks, Ongoing),
      "diyInstructions": string (brief DIY guidance),
      "mspBenefits": string (why managed service is better for this)
    }
  ],
  "competitorInsights": [array of industry-specific insights],
  "nextSteps": [array of immediate action items]
}

Focus on actionable recommendations that clearly differentiate between DIY approaches and managed service benefits. Consider the business size, industry, and current digital maturity level.
`;
  }
  validateAndFormatResult(result, baseScore) {
    return {
      digitalScore: result.digitalScore || baseScore,
      summary: result.summary || "Your business has potential for digital growth.",
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
      recommendations: Array.isArray(result.recommendations) ? result.recommendations.map(this.validateRecommendation) : [],
      competitorInsights: Array.isArray(result.competitorInsights) ? result.competitorInsights : [],
      nextSteps: Array.isArray(result.nextSteps) ? result.nextSteps : []
    };
  }
  validateRecommendation(rec) {
    return {
      category: rec.category || "general",
      title: rec.title || "Improve Digital Presence",
      description: rec.description || "Work on improving your online visibility",
      priority: ["high", "medium", "low"].includes(rec.priority) ? rec.priority : "medium",
      estimatedImpact: rec.estimatedImpact || "Medium ROI",
      estimatedEffort: rec.estimatedEffort || "1-2 weeks",
      diyInstructions: rec.diyInstructions || "Follow best practices guides",
      mspBenefits: rec.mspBenefits || "Professional implementation with ongoing support"
    };
  }
};

// server/services/resend-email.ts
import { Resend } from "resend";
var resendInstance = null;
function getResendClient() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[Email Service] RESEND_API_KEY not set. Emails will not be sent.");
    }
    resendInstance = new Resend(apiKey || "dummy-key-for-startup");
  }
  return resendInstance;
}
var ResendEmailService = class {
  async sendVerificationEmail(email, companyName, verificationCode) {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("[Email Service] RESEND_API_KEY not configured");
        return false;
      }
      const htmlContent = this.generateVerificationEmailHTML(companyName, verificationCode);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `Verify Your Email - ${verificationCode}`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending verification email:", error);
      return false;
    }
  }
  async sendEmailChangeNotification(oldEmail, newEmail, companyName) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateEmailChangeNotificationHTML(companyName, newEmail);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: oldEmail,
        subject: `Email Address Changed - Action May Be Required`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending email change notification:", error);
      return false;
    }
  }
  async sendAssessmentReport(email, data) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateReportHTML(data);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `Your Digital Presence Assessment Results - Score: ${data.digitalScore}`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending assessment report:", error);
      return false;
    }
  }
  async sendReviewAlert(email, data) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateReviewAlertHTML(data);
      const sentiment = data.rating <= 2 ? "Negative" : data.rating >= 4 ? "Positive" : "Neutral";
      const urgency = data.rating <= 2 ? "\u26A0\uFE0F URGENT" : "";
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `${urgency} New ${sentiment} Review on ${data.platform} - ${data.rating} ${data.rating === 1 ? "Star" : "Stars"}`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending review alert:", error);
      return false;
    }
  }
  async sendEnrollmentConfirmation(email, data) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateEnrollmentConfirmationHTML(data);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `Welcome to ${data.planName} - Your Digital Growth Journey Begins!`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending enrollment confirmation:", error);
      return false;
    }
  }
  async sendPathwayReminderEmail(email, data) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generatePathwayReminderHTML(data);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `Still deciding? Your Digital Growth Plan is ready, ${data.businessName}`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending pathway reminder:", error);
      return false;
    }
  }
  async sendCheckoutAbandonmentEmail(email, data) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateCheckoutAbandonmentHTML(data);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `Complete your enrollment - ${data.planName} is waiting for you!`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending checkout abandonment email:", error);
      return false;
    }
  }
  async sendMagicLinkEmail(email, magicLink, companyName) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateMagicLinkHTML(magicLink, companyName);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: "Your Secure Login Link - Business Blueprint",
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending magic link email:", error);
      return false;
    }
  }
  async sendThankYouIntroduction(email, data) {
    try {
      if (!process.env.RESEND_API_KEY) return false;
      const htmlContent = this.generateThankYouIntroductionHTML(data);
      const resend = getResendClient();
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "noreply@businessblueprint.io",
        to: email,
        subject: `Meet Coach Blue \u{1F916} - Your AI Guide to Digital Success`,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error("Error sending thank you introduction:", error);
      return false;
    }
  }
  generateReportHTML(data) {
    const highPriorityRecs = data.recommendations.filter((r) => r.priority === "high").slice(0, 3);
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Digital Presence Assessment Results</title><style>body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }.header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }.score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin: 20px 0; }.content { background: white; padding: 30px; border: 1px solid #e0e0e0; }.score-value { font-size: 48px; font-weight: bold; color: #fff; }.section { margin: 30px 0; }.recommendation { background: #f8f9fa; padding: 20px; margin: 15px 0; border-left: 4px solid #FF6B35; border-radius: 4px; }.cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 5px; }.secondary-button { background: #8B5CF6; }.footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-radius: 0 0 8px 8px; }</style></head><body><div class="header"><h1>Digital Presence Assessment Results</h1><h2>${data.businessName}</h2><div class="score-circle"><div><div class="score-value">${data.digitalScore}</div><div style="font-size: 14px;">out of 140</div></div></div></div><div class="content"><div class="section"><h2>Executive Summary</h2><p>${data.summary}</p></div><div class="section"><h2>Priority Recommendations</h2>${highPriorityRecs.map((rec) => `<div class="recommendation"><h3>${rec.title}</h3><p>${rec.description}</p><p><strong>Estimated Impact:</strong> ${rec.estimatedImpact}</p><p><strong>Estimated Effort:</strong> ${rec.estimatedEffort}</p></div>`).join("")}</div><div class="section" style="text-align: center;"><h2>Choose Your Path Forward</h2><p>Ready to improve your digital presence? We offer two paths to success:</p><a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}?path=diy" class="cta-button">\u{1F6E0}\uFE0F DIY Path - $49/month</a><a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}?path=msp" class="cta-button secondary-button">\u{1F3AF} Managed Services - $299/month</a><p style="margin-top: 20px;"><a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}">View Full Report</a></p></div></div><div class="footer"><p>This assessment was powered by Google Business Intelligence and AI analysis.</p><p>Questions? Reply to this email or visit our support center.</p><p><small>\xA9 2024 businessblueprint.io</small></p></div></body></html>`;
  }
  generateVerificationEmailHTML(companyName, verificationCode) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Verify Your Email</title><style>body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }.container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }.header { background: linear-gradient(135deg, #8B5CF6, #0057FF); color: white; padding: 40px; text-align: center; }.content { padding: 40px; }.code-box { background: #f8f9fa; border: 2px dashed #8B5CF6; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0; }.code { font-size: 36px; font-weight: bold; color: #8B5CF6; letter-spacing: 8px; font-family: 'Courier New', monospace; }.footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }.warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }</style></head><body><div class="container"><div class="header"><h1>\u{1F4E7} Verify Your Email</h1><p>${companyName}</p></div><div class="content"><p>Hello,</p><p>Please use the verification code below to confirm your email address and activate your account:</p><div class="code-box"><div class="code">${verificationCode}</div></div><p>Enter this code on the verification page to complete your email confirmation.</p><div class="warning"><p style="margin: 0;"><strong>Security Note:</strong> This code expires in 15 minutes. Never share this code with anyone.</p></div><p>If you didn't request this verification, you can safely ignore this email.</p></div><div class="footer"><p>Need help? Contact our support team.</p><p><small>\xA9 2024 businessblueprint.io</small></p></div></div></body></html>`;
  }
  generateEmailChangeNotificationHTML(companyName, newEmail) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Email Address Changed</title></head><body><p>Your account email has been changed to: ${newEmail}</p></body></html>`;
  }
  generateEnrollmentConfirmationHTML(data) {
    return `<!DOCTYPE html><html><body><p>Welcome to ${data.planName}!</p></body></html>`;
  }
  generatePathwayReminderHTML(data) {
    return `<!DOCTYPE html><html><body><p>Your Digital IQ Score: ${data.digitalScore}</p></body></html>`;
  }
  generateCheckoutAbandonmentHTML(data) {
    return `<!DOCTYPE html><html><body><p>Complete your enrollment for ${data.planName}</p></body></html>`;
  }
  generateReviewAlertHTML(data) {
    return `<!DOCTYPE html><html><body><p>New ${data.rating}-star review on ${data.platform}: ${data.reviewText}</p></body></html>`;
  }
  generateMagicLinkHTML(magicLink, companyName) {
    return `<!DOCTYPE html><html><body><p>Click the link to login: <a href="${magicLink}">${magicLink}</a></p></body></html>`;
  }
  generateThankYouIntroductionHTML(data) {
    return `<!DOCTYPE html><html><body><p>Thank you for completing your assessment, ${data.businessName}!</p></body></html>`;
  }
};

// server/services/inbox-email.ts
init_db();
init_schema();
import nodemailer from "nodemailer";
import { eq as eq14, and as and9 } from "drizzle-orm";
var InboxEmailService = class {
  transporter;
  constructor() {
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const isSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465;
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
      }
    });
  }
  /**
   * Send an email message from the inbox
   * @throws Error with details about the failure
   */
  async sendMessage(conversationId, content, fromName) {
    const [conversation] = await db.select().from(inboxConversations).where(eq14(inboxConversations.id, conversationId)).limit(1);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    if (conversation.primaryChannelType !== "email") {
      throw new Error("Conversation is not an email thread");
    }
    const [channelConnection] = await db.select().from(inboxChannelConnections).where(and9(
      eq14(inboxChannelConnections.clientId, conversation.clientId),
      eq14(inboxChannelConnections.channelType, "email"),
      eq14(inboxChannelConnections.status, "active")
    )).limit(1);
    const fromEmail = channelConnection?.channelIdentifier || process.env.FROM_EMAIL || "inbox@businessblueprint.io";
    const toEmail = conversation.contactIdentifier;
    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      subject: conversation.subject || "Message from Business Blueprint",
      html: this.formatEmailContent(content, fromName),
      text: content
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("\u2705 Email sent successfully:", info.messageId, "to:", toEmail);
    } catch (error) {
      console.error("\u274C SMTP send failed:", {
        error: error.message,
        code: error.code,
        command: error.command,
        to: toEmail,
        from: fromEmail
      });
      if (error.code === "EAUTH" || error.responseCode === 535) {
        throw new Error("SMTP authentication failed - check credentials");
      } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
        throw new Error("SMTP connection failed - check server settings");
      } else if (error.responseCode >= 500) {
        throw new Error("SMTP server error - try again later");
      } else {
        throw new Error(`Email delivery failed: ${error.message}`);
      }
    }
  }
  /**
   * Format email content with branding
   */
  formatEmailContent(content, fromName) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 30px; }
        .message { white-space: pre-wrap; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Business Blueprint</h2>
    </div>
    <div class="content">
        <p><strong>From: ${fromName}</strong></p>
        <div class="message">${content}</div>
    </div>
    <div class="footer">
        <p>This message was sent from Business Blueprint Inbox</p>
    </div>
</body>
</html>
    `.trim();
  }
  /**
   * Parse incoming email webhook (for future IMAP/webhook integration)
   * This would be called by a webhook handler when emails are received
   */
  async handleIncomingEmail(data) {
    try {
      let conversation = await db.select().from(inboxConversations).where(and9(
        eq14(inboxConversations.clientId, data.clientId),
        eq14(inboxConversations.contactIdentifier, data.from),
        eq14(inboxConversations.primaryChannelType, "email")
      )).limit(1);
      let conversationId;
      if (conversation.length === 0) {
        const [newConv] = await db.insert(inboxConversations).values({
          clientId: data.clientId,
          contactName: this.extractNameFromEmail(data.from),
          contactIdentifier: data.from,
          primaryChannelType: "email",
          subject: data.subject,
          status: "open",
          priority: "normal"
        }).returning();
        conversationId = newConv.id;
      } else {
        conversationId = conversation[0].id;
        await db.update(inboxConversations).set({
          subject: data.subject,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq14(inboxConversations.id, conversationId));
      }
      const [message] = await db.insert(inboxMessages2).values({
        conversationId,
        channelType: "email",
        messageType: "incoming",
        direction: "inbound",
        content: data.content,
        fromIdentifier: data.from,
        fromName: this.extractNameFromEmail(data.from),
        toIdentifier: data.to,
        status: "delivered",
        externalMessageId: data.messageId
      }).returning();
      return message.id;
    } catch (error) {
      console.error("Error handling incoming email:", error);
      return null;
    }
  }
  /**
   * Extract name from email address
   */
  extractNameFromEmail(email) {
    const match = email.match(/^(.+?)\s*<(.+)>$/);
    if (match) {
      return match[1].trim();
    }
    const username = email.split("@")[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
};
var inboxEmailService = new InboxEmailService();

// server/services/aiCoach.ts
import OpenAI2 from "openai";
var AICoachService = class {
  openai;
  constructor() {
    this.openai = new OpenAI2({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  async getPersonalizedGuidance(context) {
    const prompt = this.buildCoachingPrompt(context);
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert digital marketing coach specializing in helping small businesses improve their online presence. You provide encouraging, actionable, and personalized guidance based on their current situation and experience level.

Key principles:
- Be supportive and motivational
- Break down complex tasks into simple steps
- Consider their time constraints and experience
- Focus on high-impact, low-cost strategies for DIY users
- Provide specific, actionable advice
- Celebrate their progress and acknowledge challenges`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1e3
      });
      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI coach");
      return this.parseCoachingResponse(content);
    } catch (error) {
      console.error("Error getting AI coaching:", error);
      return this.getFallbackGuidance(context);
    }
  }
  async getStepByStepHelp(task, userContext) {
    const prompt = `
Help a ${userContext.userProgress.experience} level business owner complete this task: "${task}"

Business context:
- Industry: ${userContext.businessInfo.industry}
- Current Digital IQ Score: ${userContext.businessInfo.digitalScore}/140
- Time available: ${userContext.userProgress.timeAvailable}

Provide detailed step-by-step instructions, practical tips, common mistakes to avoid, and how to measure success.
`;
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a digital marketing tutor. Break down complex tasks into simple, actionable steps that anyone can follow."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 800
      });
      const content = response.choices[0]?.message?.content || "";
      return this.parseStepByStepResponse(content);
    } catch (error) {
      console.error("Error getting step-by-step help:", error);
      return this.getFallbackSteps(task);
    }
  }
  async analyzeProgress(context) {
    const prompt = `
Analyze the progress of this business:
- Completed steps: ${context.userProgress.completedSteps.join(", ")}
- Current goals: ${context.userProgress.currentGoals.join(", ")}
- Digital IQ Score: ${context.businessInfo.digitalScore}/140
- Industry: ${context.businessInfo.industry}

Provide an encouraging progress analysis with specific achievements and next priorities.
`;
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an encouraging business coach. Focus on celebrating achievements and providing clear direction for continued growth."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      });
      const content = response.choices[0]?.message?.content || "";
      return this.parseProgressResponse(content);
    } catch (error) {
      console.error("Error analyzing progress:", error);
      return {
        progressScore: Math.round(context.businessInfo.digitalScore),
        achievements: ["Completed initial assessment"],
        nextPriorities: ["Optimize Google Business listing"],
        motivationalMessage: "You're making great progress with your Digital Blueprint!"
      };
    }
  }
  buildCoachingPrompt(context) {
    return `
Business Profile:
- Name: ${context.businessInfo.name}
- Industry: ${context.businessInfo.industry}
- Location: ${context.businessInfo.location}
- Current Digital IQ Score: ${context.businessInfo.digitalScore}/140

User Profile:
- Experience Level: ${context.userProgress.experience}
- Time Available: ${context.userProgress.timeAvailable}
- Completed Steps: ${context.userProgress.completedSteps.join(", ") || "None yet"}
- Current Goals: ${context.userProgress.currentGoals.join(", ")}

Current Platform Status:
- Website: ${context.platformData.hasWebsite ? "Has website" : "No website"}
- Google Listing: ${context.platformData.googleListingStatus}
- Social Media: ${context.platformData.socialMediaPresence.join(", ") || "None"}
- Reviews: ${context.platformData.reviewCount} reviews

Please provide personalized guidance including:
1. A supportive message acknowledging their current situation
2. 3-5 specific action items prioritized by impact and difficulty
3. Encouragement for their progress
4. Next major milestone to work toward

Format as JSON with actionItems array containing task, priority, estimatedTime, difficulty, and resources.
`;
  }
  parseCoachingResponse(content) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing coaching response:", error);
    }
    return {
      message: content.substring(0, 200) + "...",
      actionItems: [
        {
          task: "Optimize Google Business Profile",
          priority: "high",
          estimatedTime: "30 minutes",
          difficulty: "easy",
          resources: ["Google Business Profile guide"]
        }
      ],
      encouragement: "You're on the right track! Every step forward improves your online presence.",
      nextMilestone: "Achieve a 100+ Digital IQ Score"
    };
  }
  parseStepByStepResponse(content) {
    const sections = content.split(/\n\n+/);
    return {
      steps: this.extractListItems(content, /steps?:/i),
      tips: this.extractListItems(content, /tips?:/i),
      commonMistakes: this.extractListItems(content, /mistakes?:/i),
      successMetrics: this.extractListItems(content, /metrics?:/i)
    };
  }
  parseProgressResponse(content) {
    return {
      progressScore: 75,
      achievements: this.extractListItems(content, /achievements?:/i),
      nextPriorities: this.extractListItems(content, /priorities?:/i),
      motivationalMessage: content.split("\n").find(
        (line) => line.toLowerCase().includes("congratulations") || line.toLowerCase().includes("great") || line.toLowerCase().includes("progress")
      ) || "Keep up the excellent work!"
    };
  }
  extractListItems(text2, pattern) {
    const match = text2.match(new RegExp(pattern.source + "[\\s\\S]*?(?=\\n\\n|$)", "i"));
    if (!match) return [];
    return match[0].split("\n").filter((line) => line.match(/^\s*[-*•]\s*/)).map((line) => line.replace(/^\s*[-*•]\s*/, "").trim()).filter((item) => item.length > 0);
  }
  getFallbackGuidance(context) {
    return {
      message: `Great to see you working on ${context.businessInfo.name}'s digital presence! Let's focus on some high-impact improvements.`,
      actionItems: [
        {
          task: "Complete Google Business Profile optimization",
          priority: "high",
          estimatedTime: "45 minutes",
          difficulty: "easy",
          resources: ["Google Business Profile setup guide", "Photo optimization tips"]
        },
        {
          task: "Collect and respond to customer reviews",
          priority: "high",
          estimatedTime: "20 minutes daily",
          difficulty: "medium",
          resources: ["Review response templates", "Customer outreach strategies"]
        }
      ],
      encouragement: "You're taking important steps to grow your business online. Each improvement brings you closer to your goals!",
      nextMilestone: "Achieve consistent 4+ star rating with 20+ reviews"
    };
  }
  getFallbackSteps(task) {
    return {
      steps: [
        "Research best practices for this task",
        "Gather necessary information and materials",
        "Create a plan with specific goals",
        "Execute the plan step by step",
        "Monitor results and adjust as needed"
      ],
      tips: [
        "Start with small, manageable steps",
        "Set aside dedicated time for this task",
        "Ask for help when needed"
      ],
      commonMistakes: [
        "Trying to do everything at once",
        "Not tracking progress",
        "Giving up too early"
      ],
      successMetrics: [
        "Task completed within timeframe",
        "Measurable improvement in results",
        "Increased confidence in the process"
      ]
    };
  }
};
var aiCoachService = new AICoachService();

// server/services/pricing.ts
var PricingEngine = class {
  /**
   * Convert dollar amount to cents for precise arithmetic
   */
  static toCents(dollars) {
    return Math.round(dollars * 100);
  }
  /**
   * Convert cents back to dollars with proper 2-decimal rounding
   */
  static toDollars(cents) {
    return Math.round(cents) / 100;
  }
  /**
   * Calculate total subscription cost with dynamic pricing
   */
  static calculateSubscriptionPrice(plan, addons, selectedAddons = [], billingCycle = "monthly") {
    const basePriceCents = this.toCents(parseFloat(plan.basePrice));
    const setupFeeCents = this.toCents(parseFloat(plan.setupFee || "0"));
    const addonPrices = [];
    let totalAddons = 0;
    selectedAddons.forEach((selection) => {
      const addon = addons.find((a) => a.addonId === selection.addonId);
      if (addon && addon.compatiblePathways && addon.compatiblePathways.includes(plan.pathway)) {
        const quantity = selection.quantity || 1;
        const addonPrice = this.applyBillingCycleDiscount(
          parseFloat(addon.price) * quantity,
          billingCycle
        );
        addonPrices.push({
          addonId: addon.addonId,
          name: addon.name,
          price: addonPrice
        });
        totalAddons += addonPrice;
      }
    });
    const monthlySubtotalCents = basePriceCents + selectedAddons.reduce((sum, selection) => {
      const addon = addons.find((a) => a.addonId === selection.addonId);
      if (addon && addon.compatiblePathways && addon.compatiblePathways.includes(plan.pathway)) {
        return sum + this.toCents(parseFloat(addon.price)) * (selection.quantity || 1);
      }
      return sum;
    }, 0);
    const monthlySubtotalDollars = this.toDollars(monthlySubtotalCents);
    const volumeDiscountDollars = this.calculateVolumeDiscount(monthlySubtotalDollars, plan.pathway);
    const volumeDiscountCents = this.toCents(volumeDiscountDollars);
    const discountedMonthlySubtotalCents = monthlySubtotalCents - volumeDiscountCents;
    const discountedMonthlySubtotalDollars = this.toDollars(discountedMonthlySubtotalCents);
    const subtotalDollars = this.applyBillingCycleDiscount(discountedMonthlySubtotalDollars, billingCycle);
    const subtotalCents = this.toCents(subtotalDollars);
    const setupFeeTaxCents = Math.round(setupFeeCents * 0.085);
    const recurringTaxCents = Math.round(subtotalCents * 0.085);
    const totalTaxesCents = setupFeeTaxCents + recurringTaxCents;
    const oneTimeTotalCents = setupFeeCents + setupFeeTaxCents;
    const recurringTotalCents = subtotalCents + recurringTaxCents;
    const totalCents = oneTimeTotalCents + recurringTotalCents;
    const basePrice = this.applyBillingCycleDiscount(parseFloat(plan.basePrice), billingCycle);
    const setupFee = parseFloat(plan.setupFee || "0");
    const displayAddonPrices = [];
    let displayTotalAddonsCents = 0;
    selectedAddons.forEach((selection) => {
      const addon = addons.find((a) => a.addonId === selection.addonId);
      if (addon && addon.compatiblePathways && addon.compatiblePathways.includes(plan.pathway)) {
        const quantity = selection.quantity || 1;
        const monthlyAddonPrice = parseFloat(addon.price) * quantity;
        const addonPrice = this.applyBillingCycleDiscount(monthlyAddonPrice, billingCycle);
        const addonPriceCents = this.toCents(addonPrice);
        displayAddonPrices.push({
          addonId: addon.addonId,
          name: addon.name,
          price: this.toDollars(addonPriceCents)
        });
        displayTotalAddonsCents += addonPriceCents;
      }
    });
    const cycleAdjustedSavings = volumeDiscountDollars > 0 ? this.toDollars(this.toCents(this.applyBillingCycleDiscount(volumeDiscountDollars, billingCycle))) : void 0;
    return {
      basePrice: this.toDollars(this.toCents(basePrice)),
      addonPrices: displayAddonPrices,
      totalAddons: this.toDollars(displayTotalAddonsCents),
      setupFee: this.toDollars(setupFeeCents),
      setupFeeTax: this.toDollars(setupFeeTaxCents),
      oneTimeTotal: this.toDollars(oneTimeTotalCents),
      recurringSubtotal: this.toDollars(subtotalCents),
      recurringTax: this.toDollars(recurringTaxCents),
      recurringTotal: this.toDollars(recurringTotalCents),
      subtotal: this.toDollars(subtotalCents),
      taxes: this.toDollars(totalTaxesCents),
      total: this.toDollars(totalCents),
      savings: cycleAdjustedSavings,
      billingCycle
    };
  }
  /**
   * Apply billing cycle discounts (annual = 15% off, quarterly = 5% off)
   */
  static applyBillingCycleDiscount(monthlyPrice, billingCycle) {
    switch (billingCycle) {
      case "annual":
        return Math.round(monthlyPrice * 12 * 0.85 * 100) / 100;
      // 15% discount (aligned with UI)
      case "quarterly":
        return Math.round(monthlyPrice * 3 * 0.95 * 100) / 100;
      // 5% discount (aligned with UI)
      case "monthly":
      default:
        return monthlyPrice;
    }
  }
  /**
   * Calculate volume discounts for larger subscriptions
   */
  static calculateVolumeDiscount(subtotal, pathway) {
    if (pathway === "msp") {
      if (subtotal >= 1e3) return Math.round(subtotal * 0.15 * 100) / 100;
      if (subtotal >= 500) return Math.round(subtotal * 0.1 * 100) / 100;
      if (subtotal >= 300) return Math.round(subtotal * 0.05 * 100) / 100;
    } else if (pathway === "diy") {
      if (subtotal >= 200) return Math.round(subtotal * 0.1 * 100) / 100;
      if (subtotal >= 100) return Math.round(subtotal * 0.05 * 100) / 100;
    }
    return 0;
  }
  /**
   * Get pathway-specific upselling recommendations
   */
  static getUpsellRecommendations(currentPlan, availablePlans, availableAddons) {
    const pathway = currentPlan.pathway;
    const planUpgrades = availablePlans.filter(
      (plan) => plan.pathway === pathway && plan.id !== currentPlan.id && parseFloat(plan.basePrice) > parseFloat(currentPlan.basePrice)
    ).slice(0, 2);
    const recommendedAddons = availableAddons.filter(
      (addon) => addon.compatiblePathways && addon.compatiblePathways.includes(pathway) && addon.isActive
    ).slice(0, 4);
    return { planUpgrades, recommendedAddons };
  }
  /**
   * Calculate ROI projection for business value messaging
   */
  static calculateROIProjection(plan, addons, businessData = {}) {
    const monthlyInvestment = parseFloat(plan.basePrice) + addons.reduce((sum, addon) => sum + parseFloat(addon.price), 0);
    const baseROI = plan.pathway === "msp" ? 300 : 150;
    const digitalScoreMultiplier = (businessData.digitalScore || 70) / 100;
    const estimatedROI = Math.round(baseROI * digitalScoreMultiplier);
    const currentRevenue = businessData.monthlyRevenue || 1e4;
    const projectedRevIncrease = Math.round(currentRevenue * (estimatedROI / 100) / 12);
    const paybackPeriod = projectedRevIncrease > 0 ? Math.ceil(monthlyInvestment / projectedRevIncrease) : null;
    const benefits = plan.pathway === "msp" ? [
      "Professional campaign management",
      "Dedicated account manager",
      "Advanced analytics and reporting",
      "Priority customer support",
      "Custom strategy development"
    ] : [
      "Self-paced learning resources",
      "Step-by-step implementation guides",
      "Community support access",
      "Basic analytics tools",
      "Cost-effective digital growth"
    ];
    return {
      estimatedROI,
      projectedRevIncrease,
      paybackPeriod,
      benefits
    };
  }
  /**
   * Generate pricing comparison for pathway decision
   */
  static comparePathwayPricing(mspPlans, diyPlans, addons) {
    const mspPricing = mspPlans.map((plan) => ({
      plan,
      pricing: this.calculateSubscriptionPrice(plan, addons, [])
    }));
    const diyPricing = diyPlans.map((plan) => ({
      plan,
      pricing: this.calculateSubscriptionPrice(plan, addons, [])
    }));
    const avgMspPrice = mspPricing.reduce((sum, p) => sum + p.pricing.total, 0) / mspPricing.length;
    const avgDiyPrice = diyPricing.reduce((sum, p) => sum + p.pricing.total, 0) / diyPricing.length;
    const priceDifference = avgMspPrice - avgDiyPrice;
    const valueProposition = `Managed Services costs $${Math.round(priceDifference)} more monthly but delivers professional implementation, dedicated support, and typically 2-3x faster results.`;
    return {
      msp: mspPricing,
      diy: diyPricing,
      comparison: {
        avgMspPrice: Math.round(avgMspPrice),
        avgDiyPrice: Math.round(avgDiyPrice),
        priceDifference: Math.round(priceDifference),
        valueProposition
      }
    };
  }
};

// server/services/nmi.ts
import { URLSearchParams as URLSearchParams2 } from "url";
var NMIService = class {
  static BASE_URL = "https://secure.nmi.com/api/transact.php";
  static API_KEY = process.env.NMI_API_KEY;
  /**
   * Validate NMI configuration
   */
  static validateConfig() {
    if (!this.API_KEY) {
      throw new Error("NMI_API_KEY environment variable is required");
    }
  }
  /**
   * Log NMI configuration status at startup
   */
  static logConfigStatus() {
    console.log("NMI Payment Gateway:", {
      configured: !!this.API_KEY,
      apiKeyPresent: !!this.API_KEY,
      baseUrl: this.BASE_URL
    });
  }
  /**
   * Create a recurring subscription with NMI
   */
  static async createSubscription(request) {
    this.validateConfig();
    const monthFrequency = this.getMonthlyFrequency(request.billingCycle);
    const subscriptionData = new URLSearchParams2({
      security_key: this.API_KEY,
      recurring: "add_subscription",
      payment_token: request.paymentToken,
      // Plan details
      plan_amount: request.planAmount,
      plan_payments: "0",
      // Unlimited payments
      month_frequency: monthFrequency.toString(),
      // Customer information
      first_name: request.customerData.firstName,
      last_name: request.customerData.lastName,
      email: request.customerData.email,
      phone: request.customerData.phone || "",
      address1: request.customerData.address || "",
      city: request.customerData.city || "",
      state: request.customerData.state || "",
      zip: request.customerData.zip || "",
      // Optional metadata
      orderid: request.planId,
      order_description: `Subscription: ${request.planId} (${request.billingCycle})`,
      // Start date (optional)
      ...request.startDate && { start_date: request.startDate }
    });
    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: subscriptionData.toString()
      });
      const responseText = await response.text();
      return this.parseNMIResponse(responseText);
    } catch (error) {
      console.error("NMI Subscription creation failed:", error);
      throw new Error("Failed to create subscription with NMI");
    }
  }
  /**
   * Update an existing subscription
   */
  static async updateSubscription(subscriptionId, updates) {
    this.validateConfig();
    const updateData = new URLSearchParams2({
      security_key: this.API_KEY,
      recurring: "update_subscription",
      subscription_id: subscriptionId,
      ...updates.planAmount && { plan_amount: updates.planAmount }
    });
    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updateData.toString()
      });
      const responseText = await response.text();
      return this.parseNMIResponse(responseText);
    } catch (error) {
      console.error("NMI Subscription update failed:", error);
      throw new Error("Failed to update subscription with NMI");
    }
  }
  /**
   * Cancel a subscription
   */
  static async cancelSubscription(subscriptionId) {
    this.validateConfig();
    const cancelData = new URLSearchParams2({
      security_key: this.API_KEY,
      recurring: "delete_subscription",
      subscription_id: subscriptionId
    });
    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: cancelData.toString()
      });
      const responseText = await response.text();
      return this.parseNMIResponse(responseText);
    } catch (error) {
      console.error("NMI Subscription cancellation failed:", error);
      throw new Error("Failed to cancel subscription with NMI");
    }
  }
  /**
   * Process a one-time transaction (for setup fees, etc.)
   */
  static async processTransaction(paymentToken, amount, orderDescription) {
    this.validateConfig();
    const transactionData = new URLSearchParams2({
      security_key: this.API_KEY,
      type: "sale",
      payment_token: paymentToken,
      amount,
      order_description: orderDescription
    });
    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: transactionData.toString()
      });
      const responseText = await response.text();
      return this.parseNMIResponse(responseText);
    } catch (error) {
      console.error("NMI Transaction failed:", error);
      throw new Error("Failed to process transaction with NMI");
    }
  }
  /**
   * Get billing frequency in months for different cycles (NMI month_frequency parameter)
   */
  static getMonthlyFrequency(cycle) {
    switch (cycle) {
      case "monthly":
        return 1;
      case "quarterly":
        return 3;
      case "annual":
        return 12;
      default:
        return 1;
    }
  }
  /**
   * Parse NMI response string into object
   */
  static parseNMIResponse(responseText) {
    const params = new URLSearchParams2(responseText);
    const result = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  /**
   * Check if response indicates success
   */
  static isSuccessResponse(response) {
    return response.response === "1";
  }
  /**
   * Get error message from response
   */
  static getErrorMessage(response) {
    return response.responsetext || "Unknown error occurred";
  }
  /**
   * Validate payment token format
   */
  static validatePaymentToken(token) {
    return /^[a-zA-Z0-9]{16,32}$/.test(token);
  }
};

// server/services/productRecommendations.ts
init_db();
init_schema();
import { eq as eq15 } from "drizzle-orm";
var ProductRecommendationService = class {
  /**
   * Generate product recommendations based on assessment scores
   */
  async generateRecommendations(assessmentId, scores) {
    const recommendations2 = [];
    const weakCategories = [];
    if (scores.visibility < 70) {
      weakCategories.push({
        category: "visibility",
        score: scores.visibility,
        priority: scores.visibility < 50 ? "critical" : "high"
      });
    }
    if (scores.reviews < 70) {
      weakCategories.push({
        category: "reviews",
        score: scores.reviews,
        priority: scores.reviews < 50 ? "critical" : "high"
      });
    }
    if (scores.completeness < 80) {
      weakCategories.push({
        category: "completeness",
        score: scores.completeness,
        priority: scores.completeness < 60 ? "critical" : "high"
      });
    }
    if (scores.engagement < 60) {
      weakCategories.push({
        category: "engagement",
        score: scores.engagement,
        priority: scores.engagement < 40 ? "critical" : "medium"
      });
    }
    if (weakCategories.length === 0) {
      return [];
    }
    const allProducts = await db.select().from(products).where(eq15(products.isActive, true));
    for (const weakCat of weakCategories) {
      const matchingProducts = allProducts.filter(
        (product) => product.improvesCategory?.includes(weakCat.category)
      );
      for (const product of matchingProducts) {
        const improvement = this.calculateImprovement(product.productId, weakCat.category);
        const projectedScore = Math.min(100, weakCat.score + improvement);
        recommendations2.push({
          productId: product.id,
          productName: product.name,
          reason: this.generateReason(product.name, weakCat.category, weakCat.score),
          priority: weakCat.priority,
          currentScore: weakCat.score,
          projectedScore,
          scoreImprovement: improvement,
          categoryAffected: weakCat.category
        });
      }
    }
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    recommendations2.sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.scoreImprovement - a.scoreImprovement;
    });
    return recommendations2;
  }
  /**
   * Save recommendations to database
   */
  async saveRecommendations(assessmentId, recommendations2) {
    const insertData = recommendations2.map((rec) => ({
      assessmentId,
      productId: rec.productId,
      reason: rec.reason,
      priority: rec.priority,
      currentScore: rec.currentScore,
      projectedScore: rec.projectedScore,
      scoreImprovement: rec.scoreImprovement,
      categoryAffected: rec.categoryAffected
    }));
    if (insertData.length > 0) {
      await db.insert(assessmentProductRecommendations).values(insertData);
    }
  }
  /**
   * Calculate estimated improvement for a product
   */
  calculateImprovement(productId, category) {
    const improvements = {
      "business-listings": { visibility: 20, completeness: 15 },
      "review-management": { reviews: 25, engagement: 15 },
      "social-media-management": { engagement: 18, visibility: 12 },
      "local-seo": { visibility: 15 },
      "google-business-setup": { completeness: 30, visibility: 20 },
      "store-locator": { visibility: 12, completeness: 10 },
      "website-builder": { completeness: 18 }
    };
    return improvements[productId]?.[category] || 10;
  }
  /**
   * Generate human-readable reason for recommendation
   */
  generateReason(productName, category, score) {
    const reasons = {
      visibility: (name, score2) => `Your visibility score is ${score2}/100. ${name} will help more customers find you online by distributing your business across 100+ directories and improving your local search presence.`,
      reviews: (name, score2) => `Your review score is ${score2}/100. ${name} will help you collect more positive reviews, respond professionally, and build trust with potential customers.`,
      completeness: (name, score2) => `Your profile completeness is ${score2}/100. ${name} will ensure your business information is complete and accurate across all platforms, making it easier for customers to contact you.`,
      engagement: (name, score2) => `Your engagement score is ${score2}/100. ${name} will help you actively connect with customers through social media, reviews, and regular updates to your online presence.`
    };
    return reasons[category]?.(productName, score) || `${productName} is recommended to improve your ${category} performance.`;
  }
  /**
   * Get recommendations for an assessment
   */
  async getRecommendations(assessmentId) {
    const recs = await db.select({
      id: assessmentProductRecommendations.id,
      product: products,
      reason: assessmentProductRecommendations.reason,
      priority: assessmentProductRecommendations.priority,
      currentScore: assessmentProductRecommendations.currentScore,
      projectedScore: assessmentProductRecommendations.projectedScore,
      scoreImprovement: assessmentProductRecommendations.scoreImprovement,
      categoryAffected: assessmentProductRecommendations.categoryAffected,
      isAccepted: assessmentProductRecommendations.isAccepted,
      isPurchased: assessmentProductRecommendations.isPurchased
    }).from(assessmentProductRecommendations).innerJoin(products, eq15(assessmentProductRecommendations.productId, products.id)).where(eq15(assessmentProductRecommendations.assessmentId, assessmentId));
    return recs;
  }
};
var productRecommendationService = new ProductRecommendationService();

// server/routes.ts
init_jwt();

// server/services/presenceScanner.ts
import { promises as dns } from "dns";
import { isIP } from "net";
import * as http from "http";
import * as https from "https";
import * as ipaddr from "ipaddr.js";

// server/services/googlePlaces.ts
var GooglePlacesService = class {
  apiKey;
  baseUrl = "https://maps.googleapis.com/maps/api/place";
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F GOOGLE_PLACES_API_KEY not set - Google Places integration disabled");
    }
  }
  /**
   * Search for a business by name and location
   */
  async searchBusiness(businessName, address) {
    if (!this.apiKey) {
      return { exists: false };
    }
    try {
      const query = address ? `${businessName} ${address}` : businessName;
      const searchUrl = `${this.baseUrl}/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      if (searchData.status !== "OK" || !searchData.results?.length) {
        console.log(`\u2139\uFE0F No Google Places results for: ${businessName}`);
        return { exists: false };
      }
      const place = searchData.results[0];
      const placeId = place.place_id;
      const detailsUrl = `${this.baseUrl}/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,reviews,photos,opening_hours,business_status&key=${this.apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();
      if (detailsData.status !== "OK") {
        console.warn(`\u26A0\uFE0F Failed to get place details for ${placeId}`);
        return { exists: true, placeId };
      }
      const details = detailsData.result;
      const reviews = (details.reviews || []).map((review) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profilePhoto: review.profile_photo_url
      }));
      const photos = (details.photos || []).slice(0, 5).map((photo) => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${this.apiKey}`;
      });
      const hours = details.opening_hours?.weekday_text || [];
      return {
        exists: true,
        placeId,
        name: details.name,
        address: details.formatted_address,
        phone: details.formatted_phone_number,
        website: details.website,
        rating: details.rating,
        reviewCount: details.user_ratings_total,
        reviews,
        photos,
        hours,
        isVerified: details.business_status === "OPERATIONAL",
        isClaimed: true
        // If it has details, it's likely claimed
      };
    } catch (error) {
      console.error("\u274C Google Places API error:", error);
      return { exists: false };
    }
  }
  /**
   * Get reviews for a specific place
   */
  async getReviews(placeId) {
    if (!this.apiKey) {
      return [];
    }
    try {
      const detailsUrl = `${this.baseUrl}/details/json?place_id=${placeId}&fields=reviews&key=${this.apiKey}`;
      const response = await fetch(detailsUrl);
      const data = await response.json();
      if (data.status !== "OK" || !data.result?.reviews) {
        return [];
      }
      return data.result.reviews.map((review) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profilePhoto: review.profile_photo_url
      }));
    } catch (error) {
      console.error("\u274C Error fetching Google reviews:", error);
      return [];
    }
  }
};
var googlePlacesService = new GooglePlacesService();

// server/services/yelpApi.ts
var YelpApiService = class {
  apiKey;
  baseUrl = "https://api.yelp.com/v3";
  constructor() {
    this.apiKey = process.env.YELP_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F YELP_API_KEY not set - Yelp integration disabled");
    }
  }
  /**
   * Search for a business by name and location
   */
  async searchBusiness(businessName, address, phone) {
    if (!this.apiKey) {
      return { exists: false };
    }
    try {
      if (phone) {
        const phoneResult = await this.searchByPhone(phone);
        if (phoneResult.exists) {
          return phoneResult;
        }
      }
      const params = new URLSearchParams({
        term: businessName,
        limit: "1"
      });
      if (address) {
        params.append("location", address);
      }
      const searchUrl = `${this.baseUrl}/businesses/search?${params.toString()}`;
      const searchResponse = await fetch(searchUrl, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`
        }
      });
      const searchData = await searchResponse.json();
      if (!searchData.businesses?.length) {
        console.log(`\u2139\uFE0F No Yelp results for: ${businessName}`);
        return { exists: false };
      }
      const business = searchData.businesses[0];
      const reviews = await this.getReviews(business.id);
      return {
        exists: true,
        id: business.id,
        name: business.name,
        address: business.location?.display_address?.join(", "),
        phone: business.display_phone,
        website: business.url,
        rating: business.rating,
        reviewCount: business.review_count,
        reviews,
        photos: business.photos || [],
        hours: this.formatHours(business.hours),
        isClaimed: !business.is_claimed ? false : true
      };
    } catch (error) {
      console.error("\u274C Yelp API error:", error);
      return { exists: false };
    }
  }
  /**
   * Search by phone number (most accurate)
   */
  async searchByPhone(phone) {
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const searchUrl = `${this.baseUrl}/businesses/search/phone?phone=+1${cleanPhone}`;
      const response = await fetch(searchUrl, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`
        }
      });
      const data = await response.json();
      if (!data.businesses?.length) {
        return { exists: false };
      }
      const business = data.businesses[0];
      const reviews = await this.getReviews(business.id);
      return {
        exists: true,
        id: business.id,
        name: business.name,
        address: business.location?.display_address?.join(", "),
        phone: business.display_phone,
        website: business.url,
        rating: business.rating,
        reviewCount: business.review_count,
        reviews,
        photos: business.photos || [],
        isClaimed: !business.is_claimed ? false : true
      };
    } catch (error) {
      return { exists: false };
    }
  }
  /**
   * Get reviews for a specific business
   */
  async getReviews(businessId) {
    if (!this.apiKey) {
      return [];
    }
    try {
      const reviewsUrl = `${this.baseUrl}/businesses/${businessId}/reviews?limit=10&sort_by=yelp_sort`;
      const response = await fetch(reviewsUrl, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`
        }
      });
      const data = await response.json();
      if (!data.reviews) {
        return [];
      }
      return data.reviews.map((review) => ({
        author: review.user?.name || "Anonymous",
        rating: review.rating,
        text: review.text,
        timeCreated: review.time_created,
        url: review.url
      }));
    } catch (error) {
      console.error("\u274C Error fetching Yelp reviews:", error);
      return [];
    }
  }
  /**
   * Format hours for display
   */
  formatHours(hours) {
    if (!hours || !hours.length) {
      return [];
    }
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const formatted = [];
    hours[0]?.open?.forEach((slot) => {
      const day = daysOfWeek[slot.day];
      const start = this.formatTime(slot.start);
      const end = this.formatTime(slot.end);
      formatted.push(`${day}: ${start} - ${end}`);
    });
    return formatted;
  }
  /**
   * Format time from 24hr (e.g., "1700") to 12hr (e.g., "5:00 PM")
   */
  formatTime(time) {
    const hours = parseInt(time.substring(0, 2));
    const minutes = time.substring(2);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes} ${period}`;
  }
};
var yelpApiService = new YelpApiService();

// server/services/presenceScanner.ts
var PresenceScannerService = class {
  /**
   * Run complete presence scan for a business
   */
  async scanBusiness(params) {
    console.log(`\u{1F50D} Starting presence scan for: ${params.businessName}`);
    const [website, socialMedia, directories, reviews] = await Promise.all([
      this.scanWebsite(params.website),
      this.scanSocialMedia(params.businessName),
      this.scanDirectories(params),
      this.scanReviews({
        businessName: params.businessName,
        address: params.address,
        phone: params.phone
      })
    ]);
    const digitalIQScore = this.calculateDigitalIQ({
      website,
      socialMedia,
      directories,
      reviews
    });
    const recommendations2 = this.generateRecommendations({
      website,
      socialMedia,
      directories,
      reviews
    });
    return {
      overall: {
        digitalIQScore,
        completeness: this.calculateCompleteness({ website, socialMedia, directories, reviews }),
        lastScanned: /* @__PURE__ */ new Date()
      },
      website,
      socialMedia,
      directories,
      reviews,
      recommendations: recommendations2
    };
  }
  /**
   * Check if an IP address is private/internal/loopback
   * Uses ipaddr.js for comprehensive IPv4/IPv6 validation
   */
  isPrivateIP(ip) {
    try {
      const addr = ipaddr.process(ip);
      const range = addr.range();
      const privateRanges = [
        "private",
        // IPv4: 10.x, 172.16-31.x, 192.168.x
        "loopback",
        // IPv4: 127.x, IPv6: ::1
        "linkLocal",
        // IPv4: 169.254.x, IPv6: fe80::/10 (ALL link-local, not just prefix)
        "uniqueLocal",
        // IPv6: fc00::/7 (private IPv6)
        "unspecified",
        // IPv6: ::
        "broadcast",
        // IPv4: 255.255.255.255
        "carrierGradeNat",
        // IPv4: 100.64.0.0/10
        "reserved"
        // Reserved ranges
      ];
      return privateRanges.includes(range);
    } catch (error) {
      return false;
    }
  }
  /**
   * Validate URL for security and resolve IPs (prevent SSRF + DNS rebinding)
   * Returns validated IPs that can be pinned for actual request
   */
  async validateAndResolveUrl(url) {
    try {
      const parsed = new URL(url);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return { isValid: false, resolvedIPs: [], hostname: "" };
      }
      const hostname = parsed.hostname.toLowerCase();
      if (hostname === "localhost" || hostname === "0.0.0.0") {
        return { isValid: false, resolvedIPs: [], hostname };
      }
      if (isIP(hostname)) {
        if (this.isPrivateIP(hostname)) {
          return { isValid: false, resolvedIPs: [], hostname };
        }
        return { isValid: true, resolvedIPs: [hostname], hostname };
      }
      try {
        const ipv4Addresses = [];
        const ipv6Addresses = [];
        try {
          ipv4Addresses.push(...await dns.resolve4(hostname));
        } catch {
        }
        try {
          ipv6Addresses.push(...await dns.resolve6(hostname));
        } catch {
        }
        const allAddresses = [...ipv4Addresses, ...ipv6Addresses];
        if (allAddresses.length === 0) {
          console.warn(`\u26A0\uFE0F No DNS records found for: ${hostname}`);
          return { isValid: false, resolvedIPs: [], hostname };
        }
        for (const addr of allAddresses) {
          if (this.isPrivateIP(addr)) {
            console.warn(`\u26A0\uFE0F Blocked private IP resolution: ${hostname} -> ${addr}`);
            return { isValid: false, resolvedIPs: [], hostname };
          }
        }
        return { isValid: true, resolvedIPs: allAddresses, hostname };
      } catch (dnsError) {
        console.warn(`\u26A0\uFE0F DNS resolution failed for: ${hostname}`, dnsError);
        return { isValid: false, resolvedIPs: [], hostname };
      }
    } catch {
      return { isValid: false, resolvedIPs: [], hostname: "" };
    }
  }
  /**
   * Secure HTTP fetch with DNS rebinding protection
   * Uses pinned IPs from validation to prevent DNS re-resolution
   */
  async secureFetch(url, validatedIPs, options = {}) {
    return new Promise((resolve, reject) => {
      const parsed = new URL(url);
      const isHttps = parsed.protocol === "https:";
      const module = isHttps ? https : http;
      const ipv4 = validatedIPs.find((ip) => isIP(ip) === 4);
      const targetIP = ipv4 || validatedIPs[0];
      if (!targetIP) {
        reject(new Error("No validated IP available"));
        return;
      }
      const requestOptions = {
        hostname: targetIP,
        // Use IP directly
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: options.method || "GET",
        headers: {
          "Host": parsed.hostname,
          // Set Host header to original hostname
          "User-Agent": "BusinessBlueprint-Scanner/1.0",
          ...options.headers
        },
        timeout: options.timeout || 1e4,
        // For HTTPS: Set SNI hostname for proper TLS certificate validation
        servername: parsed.hostname,
        // TLS will validate cert against this hostname
        // Custom lookup to prevent any DNS resolution
        lookup: (hostname, opts, callback) => {
          callback(null, targetIP, isIP(targetIP) || 4);
        }
      };
      const req = module.request(requestOptions, (res) => {
        const chunks = [];
        let totalSize = 0;
        const MAX_SIZE = 5 * 1024 * 1024;
        res.on("data", (chunk) => {
          totalSize += chunk.length;
          if (totalSize > MAX_SIZE) {
            req.destroy();
            reject(new Error("Response too large"));
            return;
          }
          chunks.push(chunk);
        });
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf-8");
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body
          });
        });
        res.on("error", reject);
      });
      req.on("error", reject);
      req.on("timeout", () => {
        req.destroy();
        reject(new Error("Request timeout"));
      });
      req.end();
    });
  }
  /**
   * Scan website for SEO, speed, mobile-friendliness, SSL
   */
  async scanWebsite(websiteUrl) {
    if (!websiteUrl) {
      return this.getEmptyWebsiteScan();
    }
    try {
      const url = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;
      const validation = await this.validateAndResolveUrl(url);
      if (!validation.isValid) {
        console.warn(`\u26A0\uFE0F Invalid or blocked URL: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      const hasSSL = url.startsWith("https://");
      const startTime = Date.now();
      let currentUrl = url;
      let currentValidatedIPs = validation.resolvedIPs;
      let redirectCount = 0;
      const MAX_REDIRECTS = 5;
      let response;
      while (redirectCount < MAX_REDIRECTS) {
        response = await this.secureFetch(currentUrl, currentValidatedIPs, {
          timeout: 1e4
        });
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers["location"];
          if (!location) {
            console.warn(`\u26A0\uFE0F Redirect without Location header`);
            return this.getEmptyWebsiteScan();
          }
          const redirectUrl = new URL(location, currentUrl).toString();
          const redirectValidation = await this.validateAndResolveUrl(redirectUrl);
          if (!redirectValidation.isValid) {
            console.warn(`\u26A0\uFE0F Blocked redirect to private/invalid URL: ${redirectUrl}`);
            return this.getEmptyWebsiteScan();
          }
          currentUrl = redirectUrl;
          currentValidatedIPs = redirectValidation.resolvedIPs;
          redirectCount++;
          continue;
        }
        break;
      }
      if (redirectCount >= MAX_REDIRECTS) {
        console.warn(`\u26A0\uFE0F Too many redirects for: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      const loadTime = Date.now() - startTime;
      const html = response.body;
      const seoData = this.analyzeSEO(html);
      const contentData = this.analyzeContent(html);
      const isMobileFriendly = this.checkMobileFriendly(html);
      const score = this.calculateWebsiteScore({
        hasSSL,
        isMobileFriendly,
        loadTime,
        seo: seoData,
        content: contentData
      });
      return {
        exists: true,
        hasSSL,
        isMobileFriendly,
        loadTime,
        seo: seoData,
        content: contentData,
        score
      };
    } catch (error) {
      console.error("Website scan error:", error);
      return this.getEmptyWebsiteScan();
    }
  }
  /**
   * Analyze SEO elements from HTML
   */
  analyzeSEO(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "";
    const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1] : "";
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const hasH1 = !!h1Match;
    let score = 0;
    if (title.length > 0 && title.length <= 60) score += 25;
    if (metaDescription.length > 50 && metaDescription.length <= 160) score += 25;
    if (hasH1) score += 25;
    if (html.includes("og:title") || html.includes("twitter:title")) score += 25;
    return {
      hasTitle: title.length > 0,
      hasMetaDescription: metaDescription.length > 0,
      hasH1,
      titleLength: title.length,
      descriptionLength: metaDescription.length,
      score
    };
  }
  /**
   * Analyze content for business information
   */
  analyzeContent(html) {
    const hasPhone = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(html);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(html);
    const hasAddress = /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir)/i.test(html);
    const hasBusinessHours = /(?:monday|mon|hours|open|closed)/i.test(html);
    const hasContactInfo = hasPhone || hasEmail;
    return {
      hasContactInfo,
      hasAddress,
      hasPhone,
      hasEmail,
      hasBusinessHours
    };
  }
  /**
   * Check if website is mobile-friendly
   */
  checkMobileFriendly(html) {
    const hasViewport = /<meta\s+name=["']viewport["']/i.test(html);
    const hasResponsive = /responsive|bootstrap|tailwind|flex|grid/i.test(html);
    return hasViewport || hasResponsive;
  }
  /**
   * Scan social media presence
   * NOTE: This is a placeholder implementation. Real implementation requires:
   * - Facebook Graph API integration
   * - Instagram Basic Display API
   * - Twitter API v2
   * - LinkedIn API
   * - YouTube Data API
   */
  async scanSocialMedia(businessName) {
    console.log(`\u2139\uFE0F Social media scanning not yet implemented for: ${businessName}`);
    const platforms = {
      facebook: { exists: false, isActive: false },
      instagram: { exists: false, isActive: false },
      twitter: { exists: false, isActive: false },
      linkedin: { exists: false, isActive: false },
      youtube: { exists: false, isActive: false }
    };
    return {
      platforms,
      totalPresence: 0,
      activeProfiles: 0,
      score: 50
      // Neutral score (not 0 to avoid penalizing unknowns)
    };
  }
  /**
   * Scan business directories using real APIs
   */
  async scanDirectories(params) {
    console.log(`\u{1F50D} Scanning directories for: ${params.businessName}`);
    const googleResult = await googlePlacesService.searchBusiness(
      params.businessName,
      params.address
    );
    const yelpResult = await yelpApiService.searchBusiness(
      params.businessName,
      params.address,
      params.phone
    );
    const platforms = {
      google: {
        exists: googleResult.exists,
        claimed: googleResult.isClaimed || false,
        isConsistent: true
      },
      yelp: {
        exists: yelpResult.exists,
        claimed: yelpResult.isClaimed || false,
        isConsistent: true
      },
      facebook: { exists: false, claimed: false, isConsistent: true },
      // TODO: Add Facebook API
      yellowPages: { exists: false, claimed: false, isConsistent: true },
      // TODO: Add scraping
      bbb: { exists: false, claimed: false, isConsistent: true }
      // TODO: Add scraping
    };
    const totalListings = Object.values(platforms).filter((p) => p.exists).length;
    const claimedListings = Object.values(platforms).filter((p) => p.claimed).length;
    const consistency = 100;
    const SUPPORTED_PLATFORMS = 2;
    const listingScore = totalListings / SUPPORTED_PLATFORMS * 50;
    const claimedScore = totalListings > 0 ? claimedListings / totalListings * 50 : 0;
    const score = Math.min(100, listingScore + claimedScore);
    console.log(`\u{1F4CA} Directory scan: ${totalListings} listings, ${claimedListings} claimed, score: ${score}/100`);
    return {
      platforms,
      totalListings,
      claimedListings,
      consistency,
      score
    };
  }
  /**
   * Scan reviews across platforms using real APIs
   */
  async scanReviews(params) {
    console.log(`\u{1F50D} Scanning reviews for: ${params.businessName}`);
    const googleResult = await googlePlacesService.searchBusiness(
      params.businessName,
      params.address
    );
    const yelpResult = await yelpApiService.searchBusiness(
      params.businessName,
      params.address,
      params.phone
    );
    const platforms = {
      google: {
        exists: googleResult.exists && (googleResult.reviewCount || 0) > 0,
        reviewCount: googleResult.reviewCount || 0,
        averageRating: googleResult.rating || 0,
        recentReviews: (googleResult.reviews || []).length,
        responseRate: 0
        // TODO: Calculate response rate
      },
      yelp: {
        exists: yelpResult.exists && (yelpResult.reviewCount || 0) > 0,
        reviewCount: yelpResult.reviewCount || 0,
        averageRating: yelpResult.rating || 0,
        recentReviews: (yelpResult.reviews || []).length,
        responseRate: 0
        // TODO: Calculate response rate
      },
      facebook: {
        exists: false,
        reviewCount: 0,
        averageRating: 0,
        recentReviews: 0,
        responseRate: 0
      }
      // TODO: Add Facebook Graph API
    };
    const totalReviews = platforms.google.reviewCount + platforms.yelp.reviewCount;
    const ratingsWithCounts = [
      { rating: platforms.google.averageRating, count: platforms.google.reviewCount },
      { rating: platforms.yelp.averageRating, count: platforms.yelp.reviewCount }
    ].filter((p) => p.count > 0);
    const averageRating = ratingsWithCounts.length > 0 ? ratingsWithCounts.reduce((sum, p) => sum + p.rating * p.count, 0) / totalReviews : 0;
    const responseRate = 0;
    const score = this.calculateReviewScore({ totalReviews, averageRating, responseRate });
    console.log(`\u{1F4CA} Review scan: ${totalReviews} reviews, ${averageRating.toFixed(1)} avg rating, score: ${score}/100`);
    return {
      platforms,
      totalReviews,
      averageRating,
      responseRate,
      score
    };
  }
  /**
   * Calculate overall Digital IQ score (0-140)
   * 
   * NOTE: Until social/directory/review scanning is implemented, scores are weighted heavily
   * toward website analysis. Neutral (50/100) scores are used for unimplemented features
   * to avoid penalizing businesses unfairly.
   */
  calculateDigitalIQ(data) {
    const websitePoints = data.website.score / 100 * 42;
    const directoriesPoints = data.directories.score / 100 * 42;
    const reviewsPoints = data.reviews.score / 100 * 35;
    const socialPoints = data.socialMedia.score / 100 * 21;
    const total = Math.round(websitePoints + directoriesPoints + reviewsPoints + socialPoints);
    console.log(`\u{1F4CA} Digital IQ Breakdown: Website=${websitePoints.toFixed(1)}, Directories=${directoriesPoints.toFixed(1)}, Reviews=${reviewsPoints.toFixed(1)}, Social=${socialPoints.toFixed(1)}, Total=${total}`);
    return Math.min(140, Math.max(0, total));
  }
  /**
   * Calculate completeness percentage
   */
  calculateCompleteness(data) {
    let completed = 0;
    let total = 0;
    total += 5;
    if (data.website.exists) completed++;
    if (data.website.hasSSL) completed++;
    if (data.website.isMobileFriendly) completed++;
    if (data.website.seo.hasTitle) completed++;
    if (data.website.content.hasContactInfo) completed++;
    total += 5;
    completed += data.socialMedia.activeProfiles;
    total += 5;
    completed += data.directories.claimedListings;
    total += 3;
    if (data.reviews.totalReviews > 0) completed++;
    if (data.reviews.averageRating >= 4) completed++;
    if (data.reviews.responseRate >= 50) completed++;
    return Math.round(completed / total * 100);
  }
  /**
   * Generate actionable recommendations
   */
  generateRecommendations(data) {
    const recommendations2 = [];
    if (!data.website.exists) {
      recommendations2.push("Create a professional website for your business");
    } else {
      if (!data.website.hasSSL) recommendations2.push("Add SSL certificate to your website for security");
      if (!data.website.isMobileFriendly) recommendations2.push("Make your website mobile-friendly");
      if (!data.website.seo.hasTitle) recommendations2.push("Add a title tag to your website");
      if (!data.website.seo.hasMetaDescription) recommendations2.push("Add meta description for better SEO");
      if (data.website.loadTime > 3e3) recommendations2.push("Improve website loading speed");
    }
    if (data.directories.totalListings < 3) {
      recommendations2.push("Claim your business on Google, Yelp, and Facebook");
    }
    if (data.directories.consistency < 80) {
      recommendations2.push("Fix NAP (Name, Address, Phone) inconsistencies across directories");
    }
    if (data.reviews.totalReviews < 10) {
      recommendations2.push("Request reviews from satisfied customers");
    }
    if (data.reviews.responseRate < 50) {
      recommendations2.push("Respond to customer reviews to show engagement");
    }
    if (data.socialMedia.activeProfiles < 2) {
      recommendations2.push("Establish active presence on key social media platforms");
    }
    return recommendations2.slice(0, 10);
  }
  /**
   * Helper: Calculate website score
   */
  calculateWebsiteScore(data) {
    let score = 0;
    if (data.hasSSL) score += 20;
    if (data.isMobileFriendly) score += 20;
    if (data.loadTime < 2e3) score += 20;
    else if (data.loadTime < 4e3) score += 10;
    score += data.seo.score / 100 * 25;
    const contentChecks = Object.values(data.content).filter(Boolean).length;
    score += contentChecks / 5 * 15;
    return Math.min(100, score);
  }
  /**
   * Helper: Calculate review score
   */
  calculateReviewScore(data) {
    let score = 0;
    if (data.totalReviews >= 50) score += 40;
    else if (data.totalReviews >= 25) score += 30;
    else if (data.totalReviews >= 10) score += 20;
    else if (data.totalReviews >= 5) score += 10;
    score += data.averageRating / 5 * 40;
    score += data.responseRate / 100 * 20;
    return Math.min(100, score);
  }
  /**
   * Helper: Get empty website scan
   */
  getEmptyWebsiteScan() {
    return {
      exists: false,
      hasSSL: false,
      isMobileFriendly: false,
      loadTime: 0,
      seo: {
        hasTitle: false,
        hasMetaDescription: false,
        hasH1: false,
        titleLength: 0,
        descriptionLength: 0,
        score: 0
      },
      content: {
        hasContactInfo: false,
        hasAddress: false,
        hasPhone: false,
        hasEmail: false,
        hasBusinessHours: false
      },
      score: 0
    };
  }
};
var presenceScannerService = new PresenceScannerService();

// server/routes.ts
init_schema();
init_db();
import { eq as eq17, desc as desc6, and as and11, or as or3 } from "drizzle-orm";
import { z as z7 } from "zod";

// server/middleware/auth.ts
init_jwt();
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const queryToken = req.query.token;
    const token = authHeader?.replace("Bearer ", "") || queryToken;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }
    const payload = jwtService.verifyToken(token);
    const isActive = await jwtService.isTokenActive(token);
    if (!isActive) {
      res.status(401).json({
        success: false,
        message: "Token has been revoked"
      });
      return;
    }
    req.clientId = payload.clientId;
    req.externalId = payload.externalId;
    req.permissions = payload.permissions;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/favicon.ico", (req, res) => {
    res.sendFile(
      path.resolve(
        process.cwd(),
        "attached_assets/Blueprint_Favicon_1762489845363.ico"
      )
    );
  });
  app2.get("/api/auth/user", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.json({ user: null });
      }
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  const googleService = new GoogleBusinessService();
  const aiService = new OpenAIAnalysisService();
  const emailService = new ResendEmailService();
  app2.post("/api/setup/demo-accounts", async (req, res) => {
    try {
      const demoAccounts = [
        {
          companyName: "Demo Restaurant",
          email: "demo@businessblueprint.io",
          accountStatus: "active"
        },
        {
          companyName: "Test Business",
          email: "test@businessblueprint.io",
          accountStatus: "active"
        },
        {
          companyName: "Social Media Agency",
          email: "agency@businessblueprint.io",
          accountStatus: "active"
        }
      ];
      const results = [];
      for (const account of demoAccounts) {
        const existing = await storage.getClientByEmail(account.email);
        if (existing) {
          results.push({
            email: account.email,
            status: "already exists",
            id: existing.id
          });
        } else {
          const created = await storage.createClient(account);
          results.push({
            email: account.email,
            status: "created",
            id: created.id
          });
        }
      }
      res.json({ success: true, accounts: results });
    } catch (error) {
      console.error("Demo account setup error:", error);
      res.status(500).json({ success: false, error: "Failed to create demo accounts" });
    }
  });
  app2.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(validatedData);
      let client2 = await storage.getClientByEmail(validatedData.email);
      if (!client2) {
        client2 = await storage.createClient({
          companyName: validatedData.businessName,
          email: validatedData.email,
          phone: validatedData.phone,
          website: validatedData.website || void 0,
          address: validatedData.address,
          accountStatus: "active"
        });
        console.log(
          `[Assessment] Created client account for ${validatedData.email}, ID: ${client2.id}`
        );
      }
      await storage.linkAssessmentToClient(client2.id, assessment.id);
      console.log(
        `[Assessment] Linked assessment ${assessment.id} to client ${client2.id}`
      );
      try {
        const existingCrmContact = await db.select().from(crmContacts).where(eq17(crmContacts.email, validatedData.email)).limit(1);
        let crmContactId = null;
        if (existingCrmContact.length === 0) {
          const [crmContact] = await db.insert(crmContacts).values({
            clientId: client2.id,
            firstName: validatedData.businessName?.split(" ")[0] || "Business",
            lastName: "Owner",
            email: validatedData.email,
            phone: validatedData.phone || null,
            lifecycleStage: "lead",
            leadSource: "assessment",
            customFields: {
              businessName: validatedData.businessName,
              industry: validatedData.industry,
              website: validatedData.website || null,
              address: validatedData.address,
              assessmentId: assessment.id
            }
          }).returning();
          crmContactId = crmContact.id;
          console.log(
            `[Assessment] Created CRM contact ${crmContactId} for ${validatedData.email}`
          );
          await db.insert(crmTimeline).values({
            clientId: client2.id,
            contactId: crmContactId,
            eventType: "assessment_started",
            title: `Digital IQ Assessment started for ${validatedData.businessName}`,
            description: `Assessment ID: ${assessment.id}`,
            occurredAt: /* @__PURE__ */ new Date(),
            sourceApp: "relationships",
            actorType: "system"
          });
        } else {
          crmContactId = existingCrmContact[0].id;
          console.log(
            `[Assessment] CRM contact already exists: ${crmContactId}`
          );
          const existingCustomFields = existingCrmContact[0].customFields || {};
          await db.update(crmContacts).set({
            customFields: {
              ...typeof existingCustomFields === "object" ? existingCustomFields : {},
              businessName: validatedData.businessName,
              industry: validatedData.industry,
              website: validatedData.website || null,
              assessmentId: assessment.id
            },
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq17(crmContacts.id, crmContactId));
        }
      } catch (crmError) {
        console.error("[Assessment] Failed to create CRM contact:", crmError);
      }
      processAssessmentAsync(
        assessment.id,
        googleService,
        aiService,
        emailService,
        storage
      );
      res.json({
        success: true,
        assessmentId: assessment.id,
        clientId: client2.id,
        message: "Assessment started. You'll receive results via email within 2-3 minutes."
      });
    } catch (error) {
      console.error("Error creating assessment:", error);
      res.status(400).json({
        success: false,
        message: "Invalid assessment data provided"
      });
    }
  });
  app2.get("/api/assessments", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email parameter is required" });
      }
      const assessments3 = await storage.getAssessmentsByEmail(email);
      res.json(assessments3);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });
  app2.get("/api/assessments/lookup", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email parameter is required" });
      }
      const assessments3 = await storage.getAssessmentsByEmail(email);
      if (!assessments3 || assessments3.length === 0) {
        return res.status(404).json({
          message: "No assessments found for this email address.",
          assessments: []
        });
      }
      const simplifiedAssessments = assessments3.map((a) => ({
        id: a.id,
        businessName: a.businessName,
        status: a.status,
        digitalScore: a.digitalScore,
        createdAt: a.createdAt
      }));
      res.json({
        success: true,
        assessments: simplifiedAssessments
      });
    } catch (error) {
      console.error("Error looking up assessments:", error);
      res.status(500).json({ message: "Failed to look up assessments" });
    }
  });
  app2.get("/api/admin/assessments", isAuthenticated, async (req, res) => {
    try {
      const assessments3 = await storage.getAllAssessments();
      res.json(assessments3);
    } catch (error) {
      console.error("Error fetching all assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });
  app2.get("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      const recommendations2 = await storage.getRecommendationsByAssessmentId(id);
      res.json({
        assessment,
        recommendations: recommendations2
      });
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });
  app2.patch("/api/assessments/:id/pathway", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { pathway } = req.body;
      if (!["diy", "none"].includes(pathway)) {
        return res.status(400).json({
          message: "Invalid pathway selection - only DIY is supported"
        });
      }
      await storage.updateAssessment(id, { selectedPathway: pathway });
      res.json({ success: true, message: "Pathway updated successfully" });
    } catch (error) {
      console.error("Error updating pathway:", error);
      res.status(500).json({ message: "Failed to update pathway" });
    }
  });
  app2.post("/api/assessments/:id/send-pathway-reminder", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      if (assessment.selectedPathway && assessment.selectedPathway !== "none") {
        return res.status(400).json({ message: "Pathway already selected" });
      }
      const emailSent = await emailService.sendPathwayReminderEmail(
        assessment.email,
        {
          businessName: assessment.businessName,
          digitalScore: assessment.digitalScore || 0,
          assessmentId: id
        }
      );
      if (emailSent) {
        res.json({ success: true, message: "Pathway reminder sent" });
      } else {
        res.status(500).json({ message: "Failed to send reminder email" });
      }
    } catch (error) {
      console.error("Error sending pathway reminder:", error);
      res.status(500).json({ message: "Failed to send pathway reminder" });
    }
  });
  app2.post("/api/assessments/:id/send-checkout-reminder", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      if (!assessment.selectedPathway || assessment.selectedPathway === "none") {
        return res.status(400).json({ message: "No pathway selected yet" });
      }
      const existingSubscriptions = await db.select().from(subscriptions).where(eq17(subscriptions.assessmentId, id));
      if (existingSubscriptions.length > 0) {
        return res.status(400).json({ message: "Subscription already exists" });
      }
      const pathwayNames = {
        diy: "DIY Platform"
      };
      const monthlyPrices = {
        diy: 49
      };
      const emailSent = await emailService.sendCheckoutAbandonmentEmail(
        assessment.email,
        {
          businessName: assessment.businessName,
          pathway: assessment.selectedPathway,
          planName: pathwayNames[assessment.selectedPathway],
          monthlyPrice: monthlyPrices[assessment.selectedPathway],
          assessmentId: id
        }
      );
      if (emailSent) {
        res.json({ success: true, message: "Checkout reminder sent" });
      } else {
        res.status(500).json({ message: "Failed to send reminder email" });
      }
    } catch (error) {
      console.error("Error sending checkout reminder:", error);
      res.status(500).json({ message: "Failed to send checkout reminder" });
    }
  });
  app2.get(
    "/api/clients/:id/dashboard",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ message: "Invalid client ID" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ message: "Client not found" });
        }
        const campaigns2 = await storage.getCampaignsByClient(clientId);
        const messages = await storage.getMessagesByClient(clientId);
        const latestCampaign = campaigns2.length > 0 ? campaigns2[0] : null;
        let crmStats = { contactsCount: 0, activeDeals: 0, tasksDue: 0 };
        try {
          const contacts = await db.select().from(crmContacts).where(eq17(crmContacts.clientId, clientId));
          crmStats.contactsCount = contacts.length;
          const activeDeals = await db.select().from(crmDeals).where(
            and11(eq17(crmDeals.clientId, clientId), eq17(crmDeals.status, "open"))
          );
          crmStats.activeDeals = activeDeals.length;
          const today = /* @__PURE__ */ new Date();
          today.setHours(23, 59, 59, 999);
          const tasks2 = await db.select().from(crmTasks).where(
            and11(
              eq17(crmTasks.clientId, clientId),
              or3(
                eq17(crmTasks.status, "pending"),
                eq17(crmTasks.status, "in_progress")
              )
            )
          );
          crmStats.tasksDue = tasks2.filter(
            (t) => t.dueDate && new Date(t.dueDate) <= today
          ).length;
        } catch (err) {
          console.error("[Dashboard] Error fetching CRM stats:", err);
        }
        const dashboardData = {
          client: client2,
          digitalScore: 75,
          // Could be calculated from various factors
          lastUpdated: client2.updatedAt,
          listings: {
            total: client2.enabledFeatures ? client2.enabledFeatures.split(",").length : 0,
            verified: client2.enabledFeatures ? client2.enabledFeatures.split(",").length - 1 : 0,
            pending: 1,
            citations: 12,
            // Placeholder for citations count
            platforms: ["Google Business", "Yelp", "Facebook", "Apple Maps"]
          },
          reviews: {
            average: 4.3,
            total: 156,
            recent: 12,
            response_rate: 85
          },
          campaigns: {
            active: campaigns2.filter((c) => c.status === "active").length,
            pending: campaigns2.filter((c) => c.status === "draft").length,
            total: campaigns2.length,
            performance: {
              reach: 2340,
              clicks: 89,
              conversions: 12
            },
            latest: latestCampaign ? {
              name: latestCampaign.name || "Recent Campaign",
              status: latestCampaign.status || "active",
              unsubscribes: 3,
              // Placeholder - will be from analytics
              clickThroughs: 47,
              // Placeholder
              purchases: 8,
              // Placeholder
              sent: 250
              // Placeholder - will be from campaign analytics
            } : null
          },
          socialMedia: {
            isSetup: false,
            // Placeholder - check if profiles connected
            newLikes: 24,
            newComments: 8,
            newMessages: 5,
            connectedProfiles: 0
          },
          livechat: {
            isSetup: false,
            // Placeholder - check if widget installed
            participationRating: 4.8,
            inQueue: 2,
            totalChats: 145,
            avgResponseTime: "2.3 min"
          },
          messages: {
            unread: messages.filter((m) => !m.isRead).length,
            total: messages.length,
            recent: messages.slice(0, 5)
          },
          crm: {
            contactsCount: crmStats.contactsCount,
            activeDeals: crmStats.activeDeals,
            tasksDue: crmStats.tasksDue
          }
        };
        res.json({ success: true, data: dashboardData });
      } catch (error) {
        console.error("Error fetching client dashboard:", error);
        res.status(500).json({
          message: "Failed to fetch dashboard data",
          error: error.message
        });
      }
    }
  );
  app2.get("/api/admin/clients", isAuthenticated, async (req, res) => {
    try {
      const clientList = await storage.getAllClients();
      res.json(clientList);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });
  app2.get("/api/admin/tickets", isAuthenticated, async (req, res) => {
    try {
      const tickets = await storage.getAllTickets();
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });
  app2.post("/api/admin/tickets", isAuthenticated, async (req, res) => {
    try {
      const validationResult = insertSupportTicketSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors
        });
      }
      const { clientId, subject, description, category, priority } = validationResult.data;
      const newTicket = await storage.createTicket({
        clientId,
        subject,
        description,
        category,
        priority
      });
      res.json(newTicket);
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ message: "Failed to create ticket" });
    }
  });
  app2.patch("/api/admin/tickets/:id", isAuthenticated, async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);
      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }
      const validationResult = updateSupportTicketSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors
        });
      }
      const { status, priority, resolution } = validationResult.data;
      const updatedTicket = await storage.updateTicket(ticketId, { status, priority, resolution });
      res.json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ message: "Failed to update ticket" });
    }
  });
  app2.post("/api/admin/tickets/:id/comments", isAuthenticated, async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);
      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }
      const commentData = { ...req.body, ticketId };
      const validationResult = insertTicketCommentSchema.safeParse(commentData);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors
        });
      }
      const { content, isInternal } = validationResult.data;
      const newComment = await storage.addTicketComment(ticketId, {
        content,
        isInternal,
        authorType: "admin"
      });
      res.json(newComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Failed to add comment" });
    }
  });
  app2.get("/api/admin/prescriptions", isAuthenticated, async (req, res) => {
    try {
      const prescriptionList = await storage.getAllPrescriptions();
      res.json(prescriptionList);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      res.status(500).json({ message: "Failed to fetch prescriptions" });
    }
  });
  app2.patch("/api/admin/prescriptions/:id", isAuthenticated, async (req, res) => {
    try {
      const prescriptionId = parseInt(req.params.id);
      if (isNaN(prescriptionId)) {
        return res.status(400).json({ message: "Invalid prescription ID" });
      }
      const validationResult = updatePrescriptionSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors
        });
      }
      const { status, reviewNotes, implementationProgress } = validationResult.data;
      const updatedPrescription = await storage.updatePrescription(prescriptionId, {
        status,
        reviewNotes,
        implementationProgress
      });
      res.json(updatedPrescription);
    } catch (error) {
      console.error("Error updating prescription:", error);
      res.status(500).json({ message: "Failed to update prescription" });
    }
  });
  app2.get("/api/clients/verify-magic-link", async (req, res) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid verification link"
        });
      }
      const magicToken = await storage.getMagicLinkToken(token);
      if (!magicToken) {
        return res.status(404).json({
          success: false,
          message: "Invalid or expired login link. Please request a new one."
        });
      }
      const isDemoEmail2 = [
        "demo@businessblueprint.io",
        "test@businessblueprint.io",
        "agency@businessblueprint.io"
      ].includes(magicToken.email.toLowerCase());
      if (magicToken.used && !isDemoEmail2) {
        return res.status(400).json({
          success: false,
          message: "This login link has already been used. Please request a new one."
        });
      }
      if (/* @__PURE__ */ new Date() > new Date(magicToken.expiresAt)) {
        return res.status(400).json({
          success: false,
          message: "This login link has expired. Please request a new one."
        });
      }
      const client2 = await storage.getClientByEmail(magicToken.email);
      console.log(
        "[Magic Link Verify] Found client:",
        client2 ? { id: client2.id, email: client2.email, idType: typeof client2.id } : "null"
      );
      if (!client2) {
        return res.status(404).json({
          success: false,
          message: "Account not found"
        });
      }
      console.log("[Magic Link Verify] Validating client.id:", {
        id: client2.id,
        type: typeof client2.id,
        isNaN: isNaN(client2.id),
        isNumber: typeof client2.id === "number",
        fullClient: JSON.stringify(client2)
      });
      if (!client2.id || typeof client2.id !== "number" || isNaN(client2.id)) {
        console.error("[Magic Link Verify] Invalid client ID detected:", {
          id: client2.id,
          type: typeof client2.id,
          isNaN: isNaN(client2.id)
        });
        return res.status(500).json({
          success: false,
          message: "Account configuration error"
        });
      }
      console.log(
        "[Magic Link Verify] Client ID validation passed:",
        client2.id
      );
      console.log(
        "[Magic Link Verify] Updating client login tracking for ID:",
        client2.id
      );
      await storage.updateClient(client2.id, {
        lastLoginTime: /* @__PURE__ */ new Date(),
        loginCount: (client2.loginCount || 0) + 1
      });
      console.log("[Magic Link Verify] Login tracking updated");
      try {
        const existingCrmContact = await db.select().from(crmContacts).where(eq17(crmContacts.email, client2.email)).limit(1);
        if (existingCrmContact.length === 0) {
          const [crmContact] = await db.insert(crmContacts).values({
            clientId: client2.id,
            firstName: client2.companyName?.split(" ")[0] || "Portal",
            lastName: "User",
            email: client2.email,
            phone: client2.phone || null,
            lifecycleStage: "lead",
            leadSource: "portal_signup"
          }).returning();
          console.log(
            `[Magic Link Verify] Created CRM contact ${crmContact.id} for portal user ${client2.email}`
          );
          await db.insert(crmTimeline).values({
            clientId: client2.id,
            contactId: crmContact.id,
            eventType: "portal_login",
            title: `First portal login by ${client2.companyName || client2.email}`,
            occurredAt: /* @__PURE__ */ new Date(),
            sourceApp: "relationships",
            actorType: "system"
          });
        } else {
          if (!existingCrmContact[0].clientId) {
            await db.update(crmContacts).set({ clientId: client2.id, updatedAt: /* @__PURE__ */ new Date() }).where(eq17(crmContacts.id, existingCrmContact[0].id));
            console.log(
              `[Magic Link Verify] Linked existing CRM contact ${existingCrmContact[0].id} to client ${client2.id}`
            );
          }
        }
      } catch (crmError) {
        console.error(
          "[Magic Link Verify] Failed to create/link CRM contact:",
          crmError
        );
      }
      console.log(
        "[Magic Link Verify] Creating dashboard token for client ID:",
        client2.id
      );
      const jwtToken = await jwtService.createDashboardToken(
        client2.id,
        client2.email
      );
      console.log("[Magic Link Verify] JWT token created successfully");
      req.session.clientId = client2.id;
      req.session.email = client2.email;
      console.log("[Magic Link Verify] Session set for client ID:", client2.id);
      await storage.markTokenAsUsed(token);
      console.log("[Magic Link Verify] Token marked as used after successful verification");
      res.json({
        success: true,
        client: {
          id: client2.id,
          companyName: client2.companyName,
          email: client2.email,
          isEmailVerified: client2.isEmailVerified || false
        },
        token: jwtToken,
        message: "Login successful"
      });
    } catch (error) {
      console.error("Magic link verification error:", error);
      console.error("Error stack:", error?.stack);
      console.error("Error message:", error?.message);
      res.status(500).json({
        success: false,
        message: "Verification failed. Please try again.",
        error: error?.message,
        code: error?.code
      });
    }
  });
  app2.get(
    "/api/clients/:id",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId) || !isFinite(clientId)) {
          console.error(
            "[GET /api/clients/:id] Invalid client ID:",
            req.params.id
          );
          return res.status(400).json({ message: "Invalid client ID format" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ message: "Client not found" });
        }
        res.json(client2);
      } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ message: "Failed to fetch client" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/campaign-data",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId) || !isFinite(clientId)) {
          console.error(
            "[GET /api/clients/:id/campaign-data] Invalid client ID:",
            req.params.id
          );
          return res.status(400).json({ message: "Invalid client ID format" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ message: "Client not found" });
        }
        const campaigns2 = await storage.getCampaignsByClient(clientId);
        const messages = await storage.getMessagesByClient(clientId);
        const campaignData = {
          client: client2,
          campaigns: campaigns2,
          messages,
          stats: {
            totalCampaigns: campaigns2.length,
            activeCampaigns: campaigns2.filter((c) => c.status === "active").length,
            totalMessages: messages.length,
            unreadMessages: messages.filter((m) => !m.isRead).length
          }
        };
        res.json(campaignData);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
        res.status(500).json({ message: "Failed to fetch campaign data" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/messages",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        const limit = parseInt(req.query.limit) || 50;
        const messages = await storage.getClientMessages(clientId, limit);
        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    }
  );
  app2.patch("/api/messages/:id/read", async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      await storage.markMessageRead(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  app2.post("/api/clients/:id/campaigns", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const campaignData = { ...req.body, clientId };
      const campaign = await storage.createCampaign(campaignData);
      res.json(campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });
  app2.get("/api/dashboard/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { jwtService: jwtService2 } = await Promise.resolve().then(() => (init_jwt(), jwt_exports));
      const payload = jwtService2.verifyToken(token);
      const isActive = await jwtService2.isTokenActive(token);
      if (!isActive) {
        return res.status(401).json({ message: "Token has been revoked" });
      }
      const [dashboardRecord] = await db.select().from(dashboardAccess).where(eq17(dashboardAccess.accessToken, token));
      if (!dashboardRecord) {
        return res.status(404).json({ message: "Dashboard access not found" });
      }
      res.json({
        message: "Dashboard access verified",
        clientId: payload.clientId,
        permissions: payload.permissions,
        redirectUrl: `/portal?token=${token}`
      });
    } catch (error) {
      console.error("Error accessing dashboard:", error);
      if (error instanceof Error && error.message.includes("Invalid token")) {
        res.status(401).json({ message: "Invalid or expired token" });
      } else {
        res.status(500).json({ message: "Failed to access dashboard" });
      }
    }
  });
  app2.get("/api/auth/jwks", async (req, res) => {
    try {
      const { jwtService: jwtService2 } = await Promise.resolve().then(() => (init_jwt(), jwt_exports));
      const jwk = jwtService2.getJWK();
      res.json({
        keys: [jwk]
      });
    } catch (error) {
      console.error("Error getting JWK:", error);
      res.status(500).json({ message: "Failed to get public key" });
    }
  });
  app2.post("/api/clients/:id/dashboard-token", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const { jwtService: jwtService2 } = await Promise.resolve().then(() => (init_jwt(), jwt_exports));
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ message: "Client not found" });
      }
      const token = await jwtService2.createDashboardToken(clientId);
      if (token) {
        res.json({
          token,
          dashboardUrl: `/api/dashboard/${token}`,
          expiresIn: "24h"
        });
      } else {
        res.status(500).json({ message: "Failed to create dashboard token" });
      }
    } catch (error) {
      console.error("Error creating dashboard token:", error);
      res.status(500).json({ message: "Failed to create dashboard token" });
    }
  });
  app2.post("/api/clients/login", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email address is required"
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }
      const normalizedEmail = email.toLowerCase().trim();
      const demoAccounts = {
        "demo@businessblueprint.io": "Demo Restaurant",
        "test@businessblueprint.io": "Test Business",
        "agency@businessblueprint.io": "Social Media Agency"
      };
      let client2 = await storage.getClientByEmail(normalizedEmail);
      if (!client2 && demoAccounts[normalizedEmail]) {
        client2 = await storage.createClient({
          companyName: demoAccounts[normalizedEmail],
          email: normalizedEmail,
          accountStatus: "active"
        });
        console.log(
          `[Login] Auto-created demo account: ${normalizedEmail} (ID: ${client2.id})`
        );
      }
      if (!client2) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email address. Please check your email or contact support."
        });
      }
      const token = randomBytes(32).toString("hex");
      const expiresAt = /* @__PURE__ */ new Date();
      const isDemoAccount = [
        "demo@businessblueprint.io",
        "test@businessblueprint.io",
        "agency@businessblueprint.io"
      ].includes(normalizedEmail);
      expiresAt.setMinutes(
        expiresAt.getMinutes() + (isDemoAccount ? 1440 : 15)
      );
      await storage.createMagicLinkToken({
        email: normalizedEmail,
        token,
        expiresAt
      });
      let frontendUrl;
      if (process.env.NODE_ENV === "development") {
        const protocol = req.get("x-forwarded-proto") || (req.secure ? "https" : "http");
        const host = req.get("host") || "localhost:5000";
        frontendUrl = `${protocol}://${host}`;
      } else {
        frontendUrl = process.env.FRONTEND_URL || `https://${req.get("host")}`;
      }
      const magicLink = `${frontendUrl}/portal/verify?token=${token}`;
      const magicLinkEmailService = new ResendEmailService();
      magicLinkEmailService.sendMagicLinkEmail(normalizedEmail, magicLink, client2.companyName).then((sent) => {
        if (sent) {
          console.log(`\u2705 Magic link email sent to ${normalizedEmail}`);
        } else {
          console.warn(
            `\u26A0\uFE0F Failed to send email to ${normalizedEmail}. Magic link: ${magicLink}`
          );
        }
      }).catch((err) => {
        console.error(
          `\u274C Error sending magic link email to ${normalizedEmail}:`,
          err.message
        );
      });
      res.json({
        success: true,
        message: isDemoAccount ? "Demo account detected - use the link below to login instantly." : "Check your email! We've sent you a secure login link.",
        ...isDemoAccount && {
          demoLink: magicLink,
          note: "This link is provided for Meta App Review testing purposes."
        },
        ...process.env.NODE_ENV === "development" && {
          devToken: token,
          devLink: magicLink
        }
      });
    } catch (error) {
      console.error("Client login error:", error);
      res.status(500).json({
        success: false,
        message: "Login failed. Please try again."
      });
    }
  });
  app2.get("/api/client/dashboard/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      const assessments3 = await storage.getClientAssessments(clientId);
      const campaigns2 = await storage.getClientCampaigns(clientId);
      const messages = await storage.getClientMessages(clientId, 10);
      const latestAssessment = assessments3[0];
      const digitalScore = latestAssessment?.digitalScore || 0;
      const dashboardData = {
        client: client2,
        digitalScore,
        assessments: assessments3.length,
        campaigns: campaigns2.length,
        activeCampaigns: campaigns2.filter((c) => c.status === "active").length,
        recentMessages: messages,
        lastUpdated: latestAssessment?.createdAt || (/* @__PURE__ */ new Date()).toISOString()
      };
      res.json(dashboardData);
    } catch (error) {
      console.error("Client dashboard error:", error);
      res.status(500).json({ error: "Failed to load dashboard data" });
    }
  });
  app2.get("/api/client/listings/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      const listings = {
        total: 45,
        verified: 38,
        pending: 7,
        platforms: [
          { name: "Google Business", status: "verified", url: "#" },
          { name: "Yelp", status: "verified", url: "#" },
          { name: "Facebook", status: "pending", url: "#" },
          { name: "Apple Maps", status: "verified", url: "#" }
        ]
      };
      res.json(listings);
    } catch (error) {
      console.error("Client listings error:", error);
      res.status(500).json({ error: "Failed to load listings data" });
    }
  });
  app2.get(
    "/api/clients/:id/listings",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ error: "Client not found" });
        }
        const listings = [
          {
            id: 1,
            platform: "Google Business",
            status: "active",
            name: client2.companyName || "Business Name",
            address: client2.address || "123 Main St, City, ST 12345",
            phone: client2.phone || "(555) 123-4567",
            website: client2.website || "https://example.com",
            hours: "Mon-Fri 9AM-5PM",
            lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
            url: "https://g.page/example"
          },
          {
            id: 2,
            platform: "Yelp",
            status: "active",
            name: client2.companyName || "Business Name",
            address: client2.address || "123 Main St, City, ST 12345",
            phone: client2.phone || "(555) 123-4567",
            website: client2.website || "https://example.com",
            hours: "Mon-Fri 9AM-5PM",
            lastUpdated: new Date(Date.now() - 864e5).toISOString(),
            url: "https://yelp.com/biz/example"
          }
        ];
        res.json(listings);
      } catch (error) {
        console.error("Error fetching client listings:", error);
        res.status(500).json({ error: "Failed to fetch listings" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/listings/metrics",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ error: "Client not found" });
        }
        const metrics = {
          totalListings: 12,
          activeListings: 10,
          pendingListings: 1,
          errorListings: 1,
          totalViews: 4523,
          totalClicks: 892,
          avgRating: 4.6
        };
        res.json(metrics);
      } catch (error) {
        console.error("Error fetching listing metrics:", error);
        res.status(500).json({ error: "Failed to fetch listing metrics" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/reviews",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ error: "Client not found" });
        }
        const reviews = [
          {
            id: 1,
            platform: "Google",
            rating: 5,
            reviewText: "Excellent service! The team was professional and delivered beyond expectations.",
            reviewerName: "Sarah J.",
            reviewDate: (/* @__PURE__ */ new Date()).toISOString(),
            sentiment: "positive"
          },
          {
            id: 2,
            platform: "Yelp",
            rating: 2,
            reviewText: "Service was slow and the staff seemed uninterested. Not what I expected.",
            reviewerName: "Mike T.",
            reviewDate: new Date(Date.now() - 864e5).toISOString(),
            sentiment: "negative"
          },
          {
            id: 3,
            platform: "Facebook",
            rating: 4,
            reviewText: "Good experience overall. A few minor issues but nothing major.",
            reviewerName: "Jennifer L.",
            reviewDate: new Date(Date.now() - 1728e5).toISOString(),
            response: "Thank you for your feedback! We appreciate your business.",
            responseDate: new Date(Date.now() - 864e5).toISOString(),
            sentiment: "positive"
          }
        ];
        res.json(reviews);
      } catch (error) {
        console.error("Error fetching client reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/reviews/analytics",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }
        const client2 = await storage.getClient(clientId);
        if (!client2) {
          return res.status(404).json({ error: "Client not found" });
        }
        const analytics = {
          averageRating: 4.6,
          totalReviews: 347,
          positiveCount: 289,
          negativeCount: 23,
          neutralCount: 35,
          responseRate: 87.5,
          platformBreakdown: {
            google: 198,
            yelp: 124,
            facebook: 25
          }
        };
        res.json(analytics);
      } catch (error) {
        console.error("Error fetching review analytics:", error);
        res.status(500).json({ error: "Failed to fetch review analytics" });
      }
    }
  );
  app2.post("/api/clients/:id/reviews/:reviewId/respond", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const reviewId = parseInt(req.params.reviewId);
      const { response, useAI } = req.body;
      if (isNaN(clientId) || isNaN(reviewId)) {
        return res.status(400).json({ error: "Invalid client ID or review ID" });
      }
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      let reviewResponse = response;
      if (useAI && !response) {
        reviewResponse = "Thank you for your feedback! We truly appreciate your business and are committed to providing excellent service.";
      }
      res.json({
        success: true,
        response: reviewResponse,
        postedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error responding to review:", error);
      res.status(500).json({ error: "Failed to post review response" });
    }
  });
  app2.patch("/api/clients/:id/listings/:listingId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const listingId = parseInt(req.params.listingId);
      if (isNaN(clientId) || isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid client ID or listing ID" });
      }
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json({
        success: true,
        message: "Listing updated successfully",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({ error: "Failed to update listing" });
    }
  });
  app2.post("/api/ai-coach/guidance", async (req, res) => {
    try {
      const guidance = await aiCoachService.getPersonalizedGuidance(req.body);
      res.json(guidance);
    } catch (error) {
      console.error("Error getting AI guidance:", error);
      res.status(500).json({ message: "Failed to get AI guidance" });
    }
  });
  app2.post("/api/ai-coach/help", async (req, res) => {
    try {
      const { task, userContext } = req.body;
      const help = await aiCoachService.getStepByStepHelp(task, userContext);
      res.json(help);
    } catch (error) {
      console.error("Error getting step-by-step help:", error);
      res.status(500).json({ message: "Failed to get help" });
    }
  });
  app2.post("/api/ai-coach/progress", async (req, res) => {
    try {
      const analysis = await aiCoachService.analyzeProgress(req.body);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing progress:", error);
      res.status(500).json({ message: "Failed to analyze progress" });
    }
  });
  app2.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await db.select().from(subscriptionPlans).where(eq17(subscriptionPlans.isActive, true));
      res.json({
        success: true,
        plans: plans.map((plan) => ({
          ...plan,
          features: Array.isArray(plan.features) ? plan.features : [],
          popular: plan.tierLevel === "professional",
          recommended: plan.pathway === "diy" && plan.tierLevel === "basic"
        }))
      });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription plans"
      });
    }
  });
  app2.get("/api/subscription-addons", async (req, res) => {
    try {
      const addons = await db.select().from(subscriptionAddons).where(eq17(subscriptionAddons.isActive, true));
      const categoryIconMap = {
        seo: "Globe",
        social: "Users",
        ppc: "Zap",
        content: "Sparkles",
        email: "Users",
        reputation: "Star",
        analytics: "Sparkles",
        website: "Globe",
        "ai-coach": "Brain",
        coaching: "Ship"
      };
      const addonsWithIcons = addons.map((addon) => ({
        ...addon,
        icon: categoryIconMap[addon.category] || "Sparkles",
        billingType: addon.billingCycle === "one_time" ? "one_time" : "monthly"
      }));
      res.json({
        success: true,
        addons: addonsWithIcons
      });
    } catch (error) {
      console.error("Error fetching subscription addons:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription addons"
      });
    }
  });
  app2.post("/api/marketplace/orders", async (req, res) => {
    try {
      const orderSchema = z7.object({
        items: z7.array(
          z7.object({
            id: z7.string(),
            name: z7.string(),
            price: z7.number(),
            quantity: z7.number(),
            type: z7.enum(["app", "addon"])
          })
        ),
        paymentToken: z7.string().min(16, "Valid payment token required"),
        customerInfo: z7.object({
          firstName: z7.string().min(1, "First name is required"),
          lastName: z7.string().min(1, "Last name is required"),
          email: z7.string().email("Valid email required"),
          phone: z7.string().optional(),
          address: z7.string().optional(),
          city: z7.string().optional(),
          state: z7.string().optional(),
          zip: z7.string().optional()
        }),
        totals: z7.object({
          subtotal: z7.number(),
          tax: z7.number(),
          total: z7.number()
        })
      });
      const validation = orderSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid order data",
          errors: validation.error.errors
        });
      }
      const { items, paymentToken, customerInfo, totals } = validation.data;
      const calculatedSubtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const calculatedTax = calculatedSubtotal * 0.08;
      const calculatedTotal = calculatedSubtotal + calculatedTax;
      if (Math.abs(calculatedTotal - totals.total) > 0.01) {
        return res.status(400).json({
          success: false,
          message: "Order total mismatch. Please refresh and try again."
        });
      }
      const nmiRequest = {
        planId: "marketplace-order-" + Date.now(),
        // Unique identifier
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || ""
        },
        paymentToken,
        planAmount: calculatedTotal.toFixed(2),
        billingCycle: "monthly"
      };
      const nmiResult = await NMIService.createSubscription(nmiRequest);
      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Payment processing failed"
        });
      }
      console.log("\u2705 Marketplace order successful:", {
        subscriptionId: nmiResult.subscription_id,
        customerEmail: customerInfo.email,
        items: items.length,
        total: calculatedTotal
      });
      res.json({
        success: true,
        message: "Order processed successfully",
        subscriptionId: nmiResult.subscription_id,
        items: items.map((item) => item.name)
      });
    } catch (error) {
      console.error("Error processing marketplace order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process order. Please try again."
      });
    }
  });
  app2.post("/api/pricing/calculate", async (req, res) => {
    try {
      const {
        planId,
        addons: selectedAddons = [],
        billingCycle = "monthly"
      } = req.body;
      if (!planId) {
        return res.status(400).json({
          success: false,
          message: "Plan ID is required"
        });
      }
      const plan = await db.select().from(subscriptionPlans).where(eq17(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq17(subscriptionAddons.isActive, true));
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle
      );
      res.json({
        success: true,
        pricing
      });
    } catch (error) {
      console.error("Error calculating pricing:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate pricing"
      });
    }
  });
  app2.post("/api/pricing/calculate-bundle", async (req, res) => {
    try {
      const {
        assessmentId,
        pathway,
        productIds = [],
        billingCycle = "monthly"
      } = req.body;
      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required"
        });
      }
      const planIdMap = {
        diy: "diy-platform"
      };
      const planStringId = planIdMap[pathway];
      const [plan] = await db.select().from(subscriptionPlans).where(eq17(subscriptionPlans.planId, planStringId)).limit(1);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found for pathway"
        });
      }
      const { products: productsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { inArray: inArray3 } = await import("drizzle-orm");
      let selectedProducts = [];
      let productsTotal = 0;
      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable).where(inArray3(productsTable.id, productIds));
        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = parseFloat(product.diyPrice || "0");
          return sum + price;
        }, 0);
      }
      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;
      const cycleMonths = billingCycle === "quarterly" ? 3 : billingCycle === "annual" ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;
      let discount = 0;
      if (billingCycle === "quarterly") {
        discount = subtotal * 0.05;
      } else if (billingCycle === "annual") {
        discount = subtotal * 0.15;
      }
      const total = subtotal - discount;
      const pricing = {
        planName: plan.name,
        planPrice: basePriceMonthly * cycleMonths,
        selectedAddons: selectedProducts.map((product) => {
          const monthlyPrice = parseFloat(product.diyPrice || "0");
          return {
            name: product.name,
            price: monthlyPrice * cycleMonths
          };
        }),
        subtotal,
        discount,
        total,
        billingCycle,
        savings: discount
      };
      res.json({
        success: true,
        pricing
      });
    } catch (error) {
      console.error("Error calculating bundle pricing:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate bundle pricing"
      });
    }
  });
  app2.post("/api/subscriptions/create-from-assessment", async (req, res) => {
    try {
      const {
        assessmentId,
        pathway,
        productIds = [],
        billingCycle = "monthly"
      } = req.body;
      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required"
        });
      }
      const assessment = await storage.getAssessment(assessmentId);
      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found"
        });
      }
      const planIdMap = {
        diy: "diy-platform"
      };
      const planStringId = planIdMap[pathway];
      const [plan] = await db.select().from(subscriptionPlans).where(eq17(subscriptionPlans.planId, planStringId)).limit(1);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const { products: productsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { inArray: inArray3 } = await import("drizzle-orm");
      let selectedProducts = [];
      let productsTotal = 0;
      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable).where(inArray3(productsTable.id, productIds));
        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = parseFloat(product.diyPrice || "0");
          return sum + price;
        }, 0);
      }
      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;
      const cycleMonths = billingCycle === "quarterly" ? 3 : billingCycle === "annual" ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;
      let discount = 0;
      if (billingCycle === "quarterly") {
        discount = subtotal * 0.05;
      } else if (billingCycle === "annual") {
        discount = subtotal * 0.15;
      }
      const total = subtotal - discount;
      const subscriptionData = {
        assessmentId,
        planId: plan.id,
        status: "pending_payment",
        baseAmount: (basePriceMonthly * cycleMonths).toString(),
        addonAmount: (productsMonthly * cycleMonths).toString(),
        totalAmount: total.toString(),
        billingCycle
      };
      const subscription = await db.insert(subscriptions).values(subscriptionData).returning();
      if (assessment) {
        const pathwayName = "DIY Platform";
        const planName = `${plan.name} (${pathwayName})`;
        const featuresPromises = selectedProducts.map(async (prod) => {
          const product = selectedProducts.find((p) => p.id === prod.id);
          return product?.name || "";
        });
        const productNames = await Promise.all(featuresPromises);
        const baseFeatures = Array.isArray(plan.features) ? plan.features : [];
        const allFeatures = [...baseFeatures, ...productNames.filter(Boolean)];
        await emailService.sendEnrollmentConfirmation(assessment.email, {
          businessName: assessment.businessName,
          pathway,
          planName,
          monthlyPrice: parseFloat(total.toFixed(2)),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3),
          features: allFeatures
        });
      }
      res.json({
        success: true,
        subscription: subscription[0],
        message: "Subscription created successfully"
      });
    } catch (error) {
      console.error("Error creating subscription from assessment:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription"
      });
    }
  });
  app2.get("/api/subscriptions/:id/trial-status", async (req, res) => {
    try {
      const { id } = req.params;
      const [subscription] = await db.select().from(subscriptions).where(eq17(subscriptions.id, parseInt(id)));
      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found"
        });
      }
      const now = /* @__PURE__ */ new Date();
      const isTrialActive = subscription.isTrialActive && subscription.trialPeriodEnd && now < subscription.trialPeriodEnd;
      res.json({
        success: true,
        trialStatus: {
          isTrialActive,
          trialPeriodEnd: subscription.trialPeriodEnd,
          daysRemaining: isTrialActive && subscription.trialPeriodEnd ? Math.ceil(
            (subscription.trialPeriodEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1e3)
          ) : 0
        }
      });
    } catch (error) {
      console.error("Error checking trial status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check trial status"
      });
    }
  });
  app2.post("/api/subscriptions", async (req, res) => {
    try {
      const subscriptionSchema = z7.object({
        planId: z7.string().min(1, "Plan ID is required"),
        addons: z7.array(
          z7.object({
            addonId: z7.string(),
            quantity: z7.number().optional()
          })
        ).default([]),
        billingCycle: z7.enum(["monthly", "quarterly", "annual"]),
        paymentToken: z7.string().min(16, "Valid payment token required"),
        customerInfo: z7.object({
          firstName: z7.string().min(1, "First name is required"),
          lastName: z7.string().min(1, "Last name is required"),
          email: z7.string().email("Valid email required"),
          phone: z7.string().optional(),
          address: z7.string().optional(),
          city: z7.string().optional(),
          state: z7.string().optional(),
          zip: z7.string().optional()
        })
      });
      const validation = subscriptionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid subscription data",
          errors: validation.error.errors
        });
      }
      const {
        planId,
        addons: selectedAddons,
        billingCycle,
        paymentToken,
        customerInfo
      } = validation.data;
      const plan = await db.select().from(subscriptionPlans).where(eq17(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq17(subscriptionAddons.isActive, true));
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle
      );
      let setupTransactionResult = null;
      if (pricing.setupFee > 0) {
        setupTransactionResult = await NMIService.processTransaction(
          paymentToken,
          pricing.oneTimeTotal.toFixed(2),
          // setupFee + setupFeeTax
          `${plan[0].name} Setup Fee`
        );
        if (setupTransactionResult.response !== "1") {
          return res.status(400).json({
            success: false,
            message: setupTransactionResult.responsetext || "Setup fee payment failed"
          });
        }
      }
      const hasAiCoachAddon = selectedAddons.some(
        (addon) => addons.find((a) => a.addonId === addon.addonId)?.category === "ai-coach"
      );
      const isTrialEligible = hasAiCoachAddon;
      const trialPeriodEnd = isTrialEligible ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3) : null;
      const recurringAmount = pricing.recurringTotal.toFixed(2);
      const nmiRequest = {
        planId: plan[0].planId,
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || ""
        },
        paymentToken,
        planAmount: recurringAmount,
        billingCycle,
        startDate: trialPeriodEnd ? trialPeriodEnd.toISOString().split("T")[0] : void 0
        // Start billing after trial
      };
      const nmiResult = await NMIService.createSubscription(nmiRequest);
      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Subscription creation failed"
        });
      }
      const subscriptionData = {
        nmiSubscriptionId: nmiResult.subscription_id,
        planId: plan[0].id,
        status: isTrialEligible ? "trial" : "active",
        baseAmount: pricing.basePrice.toFixed(2),
        addonAmount: pricing.totalAddons.toFixed(2),
        totalAmount: pricing.recurringTotal.toFixed(2),
        // Only recurring charges in subscription record
        billingCycle,
        paymentMethod: {
          type: "card",
          maskedNumber: "****1234",
          lastFour: "1234"
        },
        currentPeriodStart: /* @__PURE__ */ new Date(),
        currentPeriodEnd: calculateNextBillingDate(billingCycle),
        nextPaymentDate: isTrialEligible ? trialPeriodEnd : calculateNextBillingDate(billingCycle),
        trialPeriodEnd,
        isTrialActive: isTrialEligible
      };
      const [newSubscription] = await db.insert(subscriptions).values(subscriptionData).returning();
      res.json({
        success: true,
        subscription: newSubscription,
        nmiSubscriptionId: nmiResult.subscription_id,
        message: "Subscription created successfully"
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription"
      });
    }
  });
  app2.get("/api/assessments/:id/product-recommendations", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const recs = await productRecommendationService.getRecommendations(assessmentId);
      const recommendations2 = recs.map((rec) => ({
        productId: rec.product.id,
        productName: rec.product.name,
        reason: rec.reason,
        priority: rec.priority,
        diyPrice: rec.product.diyPrice,
        category: rec.product.category,
        currentScore: rec.currentScore,
        projectedScore: rec.projectedScore,
        scoreImprovement: rec.scoreImprovement
      }));
      res.json({
        success: true,
        recommendations: recommendations2
      });
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product recommendations"
      });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const deliveryMethod = req.query.deliveryMethod;
      const category = req.query.category;
      const { products: products2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq20, and: and14 } = await import("drizzle-orm");
      const conditions = [eq20(products2.isActive, true)];
      if (category) {
        conditions.push(eq20(products2.category, category));
      }
      const allProducts = await db.select().from(products2).where(and14(...conditions));
      const filteredProducts = deliveryMethod ? allProducts.filter((p) => p.deliveryMethod?.includes(deliveryMethod)) : allProducts;
      res.json({
        success: true,
        products: filteredProducts
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products"
      });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const { products: products2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq20 } = await import("drizzle-orm");
      const [product] = await db.select().from(products2).where(eq20(products2.id, productId));
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      res.json({
        success: true,
        product
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product"
      });
    }
  });
  app2.post(
    "/api/send/contacts",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const validatedData = insertSendContactSchema.parse(req.body);
        if (!validatedData.email && !validatedData.phone) {
          return res.status(400).json({
            success: false,
            message: "At least one contact method (email or phone) is required"
          });
        }
        if (validatedData.email && !validatedData.emailConsent) {
          return res.status(400).json({
            success: false,
            message: "Email consent is required when providing an email address (GDPR/CAN-SPAM compliance)"
          });
        }
        if (validatedData.phone && !validatedData.smsConsent) {
          return res.status(400).json({
            success: false,
            message: "SMS consent is required when providing a phone number (TCPA compliance)"
          });
        }
        const contactData = {
          ...validatedData,
          clientId,
          emailConsentDate: validatedData.emailConsent ? /* @__PURE__ */ new Date() : null,
          smsConsentDate: validatedData.smsConsent ? /* @__PURE__ */ new Date() : null
        };
        const contact = await storage.createSendContact(contactData);
        res.json({ success: true, contact });
      } catch (error) {
        console.error("Error creating contact:", error);
        res.status(400).json({
          success: false,
          message: error instanceof Error ? error.message : "Failed to create contact"
        });
      }
    }
  );
  app2.get(
    "/api/send/contacts",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const limit = Math.min(
          parseInt(req.query.limit) || 100,
          1e3
        );
        const offset = parseInt(req.query.offset) || 0;
        const contacts = await storage.getSendContactsByClient(clientId);
        const paginatedContacts = contacts.slice(offset, offset + limit);
        res.json({
          success: true,
          contacts: paginatedContacts,
          pagination: {
            total: contacts.length,
            limit,
            offset,
            hasMore: offset + limit < contacts.length
          }
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch contacts"
        });
      }
    }
  );
  app2.get(
    "/api/send/contacts/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid contact ID"
          });
        }
        const contact = await storage.getSendContact(id);
        if (!contact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found"
          });
        }
        if (contact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Contact belongs to another client"
          });
        }
        res.json({ success: true, contact });
      } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch contact"
        });
      }
    }
  );
  app2.patch(
    "/api/send/contacts/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid contact ID"
          });
        }
        const existingContact = await storage.getSendContact(id);
        if (!existingContact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found"
          });
        }
        if (existingContact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Contact belongs to another client"
          });
        }
        const updateData = insertSendContactSchema.partial().parse(req.body);
        if ("clientId" in updateData) {
          delete updateData.clientId;
        }
        const contact = await storage.updateSendContact(id, updateData);
        res.json({ success: true, contact });
      } catch (error) {
        console.error("Error updating contact:", error);
        res.status(400).json({
          success: false,
          message: error instanceof Error ? error.message : "Failed to update contact"
        });
      }
    }
  );
  app2.delete(
    "/api/send/contacts/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid contact ID"
          });
        }
        const existingContact = await storage.getSendContact(id);
        if (!existingContact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found"
          });
        }
        if (existingContact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Contact belongs to another client"
          });
        }
        await storage.deleteSendContact(id);
        res.json({ success: true, message: "Contact deleted successfully" });
      } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete contact"
        });
      }
    }
  );
  app2.post(
    "/api/send/lists",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const validatedData = insertSendListSchema.parse(req.body);
        const listData = {
          ...validatedData,
          clientId
        };
        const list = await storage.createSendList(listData);
        res.json({ success: true, list });
      } catch (error) {
        console.error("Error creating list:", error);
        res.status(400).json({
          success: false,
          message: error instanceof Error ? error.message : "Failed to create list"
        });
      }
    }
  );
  app2.get(
    "/api/send/lists",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const limit = Math.min(
          parseInt(req.query.limit) || 100,
          1e3
        );
        const offset = parseInt(req.query.offset) || 0;
        const lists = await storage.getSendListsByClient(clientId);
        const paginatedLists = lists.slice(offset, offset + limit);
        res.json({
          success: true,
          lists: paginatedLists,
          pagination: {
            total: lists.length,
            limit,
            offset,
            hasMore: offset + limit < lists.length
          }
        });
      } catch (error) {
        console.error("Error fetching lists:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch lists"
        });
      }
    }
  );
  app2.get(
    "/api/send/lists/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID"
          });
        }
        const list = await storage.getSendList(id);
        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found"
          });
        }
        if (list.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client"
          });
        }
        res.json({ success: true, list });
      } catch (error) {
        console.error("Error fetching list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch list"
        });
      }
    }
  );
  app2.patch(
    "/api/send/lists/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID"
          });
        }
        const existingList = await storage.getSendList(id);
        if (!existingList) {
          return res.status(404).json({
            success: false,
            message: "List not found"
          });
        }
        if (existingList.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client"
          });
        }
        const updateData = insertSendListSchema.partial().parse(req.body);
        if ("clientId" in updateData) {
          delete updateData.clientId;
        }
        const list = await storage.updateSendList(id, updateData);
        res.json({ success: true, list });
      } catch (error) {
        console.error("Error updating list:", error);
        res.status(400).json({
          success: false,
          message: error instanceof Error ? error.message : "Failed to update list"
        });
      }
    }
  );
  app2.delete(
    "/api/send/lists/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID"
          });
        }
        const existingList = await storage.getSendList(id);
        if (!existingList) {
          return res.status(404).json({
            success: false,
            message: "List not found"
          });
        }
        if (existingList.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client"
          });
        }
        await storage.deleteSendList(id);
        res.json({ success: true, message: "List deleted successfully" });
      } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete list"
        });
      }
    }
  );
  app2.post(
    "/api/send/lists/:listId/contacts/:contactId",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const listId = parseInt(req.params.listId);
        const contactId = parseInt(req.params.contactId);
        if (isNaN(listId) || isNaN(contactId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list or contact ID"
          });
        }
        const [list, contact] = await Promise.all([
          storage.getSendList(listId),
          storage.getSendContact(contactId)
        ]);
        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found"
          });
        }
        if (!contact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found"
          });
        }
        if (list.clientId !== clientId || contact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Resources belong to another client"
          });
        }
        await storage.addContactToList(listId, contactId);
        res.json({
          success: true,
          message: "Contact added to list successfully"
        });
      } catch (error) {
        console.error("Error adding contact to list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add contact to list"
        });
      }
    }
  );
  app2.delete(
    "/api/send/lists/:listId/contacts/:contactId",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const listId = parseInt(req.params.listId);
        const contactId = parseInt(req.params.contactId);
        if (isNaN(listId) || isNaN(contactId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list or contact ID"
          });
        }
        const list = await storage.getSendList(listId);
        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found"
          });
        }
        if (list.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client"
          });
        }
        await storage.removeContactFromList(listId, contactId);
        res.json({
          success: true,
          message: "Contact removed from list successfully"
        });
      } catch (error) {
        console.error("Error removing contact from list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to remove contact from list"
        });
      }
    }
  );
  app2.get(
    "/api/send/lists/:listId/contacts",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const listId = parseInt(req.params.listId);
        const limit = Math.min(
          parseInt(req.query.limit) || 100,
          1e3
        );
        const offset = parseInt(req.query.offset) || 0;
        if (isNaN(listId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID"
          });
        }
        const list = await storage.getSendList(listId);
        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found"
          });
        }
        if (list.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client"
          });
        }
        const contacts = await storage.getListContacts(listId);
        const paginatedContacts = contacts.slice(offset, offset + limit);
        res.json({
          success: true,
          contacts: paginatedContacts,
          pagination: {
            total: contacts.length,
            limit,
            offset,
            hasMore: offset + limit < contacts.length
          }
        });
      } catch (error) {
        console.error("Error fetching list contacts:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch list contacts"
        });
      }
    }
  );
  const multer = await import("multer");
  const upload = multer.default({ storage: multer.default.memoryStorage() });
  app2.post("/api/brand-assets", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      const { name, type } = req.body;
      if (!name || !type) {
        return res.status(400).json({
          success: false,
          message: "Name and type are required"
        });
      }
      const base64Data = req.file.buffer.toString("base64");
      const assetData = {
        name,
        type,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        data: base64Data
      };
      const asset = await storage.createBrandAsset(assetData);
      res.json({
        success: true,
        asset: {
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          size: asset.size,
          createdAt: asset.createdAt
        }
      });
    } catch (error) {
      console.error("Error uploading brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload asset"
      });
    }
  });
  app2.get("/api/brand-assets", async (req, res) => {
    try {
      const { type } = req.query;
      const assets = type && typeof type === "string" ? await storage.getBrandAssetsByType(type) : await storage.getAllBrandAssets();
      res.json({
        success: true,
        assets: assets.map((asset) => ({
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          size: asset.size,
          createdAt: asset.createdAt
        }))
      });
    } catch (error) {
      console.error("Error fetching brand assets:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch assets"
      });
    }
  });
  app2.get("/api/brand-assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid asset ID"
        });
      }
      const asset = await storage.getBrandAsset(id);
      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found"
        });
      }
      res.json({
        success: true,
        asset: {
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          mimeType: asset.mimeType,
          size: asset.size,
          data: asset.data,
          createdAt: asset.createdAt
        }
      });
    } catch (error) {
      console.error("Error fetching brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch asset"
      });
    }
  });
  app2.patch("/api/brand-assets/:id/rename", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { fileName } = req.body;
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid asset ID"
        });
      }
      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: "New filename is required"
        });
      }
      const asset = await storage.getBrandAsset(id);
      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found"
        });
      }
      await storage.updateBrandAsset(id, { fileName });
      res.json({
        success: true,
        message: "Asset renamed successfully"
      });
    } catch (error) {
      console.error("Error renaming brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to rename asset"
      });
    }
  });
  app2.delete("/api/brand-assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid asset ID"
        });
      }
      await storage.deleteBrandAsset(id);
      res.json({
        success: true,
        message: "Asset deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete asset"
      });
    }
  });
  app2.get("/brand-assets/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const allAssets = await storage.getAllBrandAssets();
      const asset = allAssets.find((a) => a.fileName === filename);
      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found"
        });
      }
      const buffer = Buffer.from(asset.data, "base64");
      res.setHeader("Content-Type", asset.mimeType);
      res.setHeader("Content-Length", buffer.length);
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.send(buffer);
    } catch (error) {
      console.error("Error serving asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to serve asset"
      });
    }
  });
  await registerInboxRoutes(app2);
  app2.use("/api/content", content_default);
  app2.use("/api/meta", meta_default);
  app2.use("/api/tasks", isAuthenticated, tasksRouter);
  app2.use("/api/brand-colors", brand_colors_default);
  registerBillingAdminRoutes(app2);
  app2.use("/api/crm", crmRouter);
  app2.use("/api/v1", publicApiRouter);
  app2.use("/api/v1", publicApiRouter);
  registerPaymentRoutes(app2);
  const httpServer = createServer(app2);
  return httpServer;
}
function calculateNextBillingDate(billingCycle) {
  const now = /* @__PURE__ */ new Date();
  switch (billingCycle) {
    case "quarterly":
      return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1e3);
    // 90 days
    case "annual":
      return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1e3);
    // 365 days
    default:
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1e3);
  }
}
async function processAssessmentAsync(assessmentId, googleService, aiService, emailService, storage2) {
  try {
    await storage2.updateAssessment(assessmentId, { status: "analyzing" });
    const assessment = await storage2.getAssessment(assessmentId);
    if (!assessment) throw new Error("Assessment not found");
    console.log(
      `\u{1F50D} Running independent presence scan for ${assessment.businessName}`
    );
    const presenceScan = await presenceScannerService.scanBusiness({
      businessName: assessment.businessName,
      website: assessment.website || void 0,
      phone: assessment.phone,
      address: assessment.address
    });
    const googleData = await googleService.searchBusiness(
      assessment.businessName,
      assessment.address
    );
    const presenceScore = {
      overallScore: presenceScan.overall.digitalIQScore,
      scores: {
        visibility: Math.round(
          presenceScan.directories.score * 0.7 + presenceScan.website.score * 0.3
        ),
        reviews: presenceScan.reviews.score,
        completeness: presenceScan.overall.completeness,
        engagement: presenceScan.socialMedia.score
      },
      insights: presenceScan.recommendations
    };
    const productRecommendations = await productRecommendationService.generateRecommendations(assessmentId, {
      visibility: presenceScore.scores.visibility,
      reviews: presenceScore.scores.reviews,
      completeness: presenceScore.scores.completeness,
      engagement: presenceScore.scores.engagement,
      overall: presenceScore.overallScore
    });
    await productRecommendationService.saveRecommendations(
      assessmentId,
      productRecommendations
    );
    const analysisResult = await aiService.analyzeBusinessPresence({
      businessInfo: {
        name: assessment.businessName,
        industry: assessment.industry,
        location: assessment.location,
        website: assessment.website || void 0
      },
      googleData,
      presenceScore
    });
    const enhancedAnalysis = {
      ...analysisResult,
      digitalScore: presenceScan.overall.digitalIQScore,
      // Use our independent score
      presenceScan,
      // Include complete scan results
      scanDate: presenceScan.overall.lastScanned,
      recommendations: [
        ...analysisResult.recommendations,
        ...presenceScan.recommendations.map((rec) => ({
          category: "digital_presence",
          title: rec,
          description: rec,
          priority: "medium",
          estimatedImpact: "moderate",
          estimatedEffort: "low"
        }))
      ]
    };
    await storage2.updateAssessment(assessmentId, {
      googleBusinessData: googleData,
      analysisResults: enhancedAnalysis,
      digitalScore: presenceScan.overall.digitalIQScore,
      status: "completed"
    });
    for (const rec of enhancedAnalysis.recommendations) {
      await storage2.createRecommendation({
        assessmentId,
        category: rec.category,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        estimatedImpact: rec.estimatedImpact || "moderate",
        estimatedEffort: rec.estimatedEffort || "low"
      });
    }
    const emailSent = await emailService.sendAssessmentReport(
      assessment.email,
      {
        businessName: assessment.businessName,
        digitalScore: presenceScan.overall.digitalIQScore,
        summary: `Your Digital IQ Score: ${presenceScan.overall.digitalIQScore}/140. ${enhancedAnalysis.summary}`,
        recommendations: enhancedAnalysis.recommendations,
        assessmentId
      }
    );
    await storage2.updateAssessment(assessmentId, { emailSent });
    await emailService.sendThankYouIntroduction(assessment.email, {
      businessName: assessment.businessName,
      assessmentId
    });
  } catch (error) {
    console.error("Error processing assessment:", error);
    await storage2.updateAssessment(assessmentId, { status: "failed" });
  }
}
async function registerInboxRoutes(app2) {
  app2.post("/api/inbox/livechat/session", async (req, res) => {
    try {
      const validatedData = insertLivechatSessionSchema.parse(req.body);
      const [session2] = await db.insert(livechatSessions).values({
        ...validatedData,
        status: "active"
      }).returning();
      let crmContactId = null;
      if (validatedData.visitorEmail) {
        try {
          const existing = await db.select().from(crmContacts).where(eq17(crmContacts.email, validatedData.visitorEmail)).limit(1);
          if (existing.length > 0) {
            crmContactId = existing[0].id;
            await db.insert(crmTimeline).values({
              contactId: existing[0].id,
              eventType: "livechat",
              title: "Started live chat session",
              description: `Visitor started a live chat session from ${validatedData.pageUrl || "unknown page"}`,
              metadata: {
                sessionId: session2.sessionId,
                pageUrl: validatedData.pageUrl,
                pageTitle: validatedData.pageTitle
              },
              source: "livechat"
            });
          } else {
            const nameParts = (validatedData.visitorName || "").split(" ");
            const firstName = nameParts[0] || "Visitor";
            const lastName = nameParts.slice(1).join(" ") || "";
            const [newContact] = await db.insert(crmContacts).values({
              firstName,
              lastName,
              email: validatedData.visitorEmail,
              lifecycleStage: "lead",
              leadSource: "livechat",
              customFields: {
                livechatSessionId: session2.sessionId,
                firstPageUrl: validatedData.pageUrl,
                firstPageTitle: validatedData.pageTitle
              }
            }).returning();
            crmContactId = newContact.id;
            await db.insert(crmTimeline).values({
              contactId: newContact.id,
              eventType: "contact_created",
              title: "Contact created from live chat",
              description: `New contact created when ${validatedData.visitorName} started a live chat session`,
              metadata: { sessionId: session2.sessionId },
              source: "livechat"
            });
          }
        } catch (crmError) {
          console.error("Error creating CRM contact from livechat:", crmError);
        }
      }
      res.json({
        success: true,
        session: {
          id: session2.id,
          sessionId: session2.sessionId,
          conversationId: session2.conversationId,
          status: session2.status,
          crmContactId
        }
      });
    } catch (error) {
      if (error instanceof z7.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid session data",
          details: error.errors
        });
      }
      console.error("Error creating livechat session:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create session"
      });
    }
  });
  app2.get(
    "/api/inbox/conversations",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const conversations = await db.select().from(inboxConversations).where(eq17(inboxConversations.clientId, clientId)).orderBy(desc6(inboxConversations.updatedAt));
        const conversationsWithMessages = await Promise.all(
          conversations.map(async (conv) => {
            const lastMessage = await db.select().from(inboxMessages2).where(eq17(inboxMessages2.conversationId, conv.id)).orderBy(desc6(inboxMessages2.createdAt)).limit(1);
            return {
              id: conv.id,
              contactName: conv.contactName,
              contactIdentifier: conv.contactIdentifier,
              primaryChannelType: conv.primaryChannelType,
              subject: conv.subject,
              status: conv.status,
              priority: conv.priority,
              unreadCount: conv.unreadCount || 0,
              lastMessageAt: conv.updatedAt,
              lastMessagePreview: lastMessage[0]?.content || null
            };
          })
        );
        res.json(conversationsWithMessages);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ error: "Failed to fetch conversations" });
      }
    }
  );
  app2.get(
    "/api/inbox/conversations/:conversationId/messages",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const conversationId = parseInt(req.params.conversationId);
        const [conversation] = await db.select().from(inboxConversations).where(
          and11(
            eq17(inboxConversations.id, conversationId),
            eq17(inboxConversations.clientId, clientId)
          )
        ).limit(1);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found or access denied" });
        }
        const messages = await db.select().from(inboxMessages2).where(eq17(inboxMessages2.conversationId, conversationId)).orderBy(inboxMessages2.createdAt);
        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
      }
    }
  );
  app2.post(
    "/api/inbox/send-message",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const { conversationId, message } = req.body;
        if (!conversationId || !message) {
          return res.status(400).json({ error: "Missing required fields" });
        }
        const [conversation] = await db.select().from(inboxConversations).where(
          and11(
            eq17(inboxConversations.id, conversationId),
            eq17(inboxConversations.clientId, clientId)
          )
        ).limit(1);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found or access denied" });
        }
        const agentName = "Agent";
        const agentEmail = "agent@businessblueprint.io";
        let deliveryStatus = "sent";
        let errorMessage = null;
        if (conversation.primaryChannelType === "email") {
          try {
            await inboxEmailService.sendMessage(
              conversationId,
              message,
              agentName
            );
            deliveryStatus = "delivered";
          } catch (emailError) {
            errorMessage = emailError.message;
            console.error("Email send error:", errorMessage);
            return res.status(500).json({
              error: "Failed to send email",
              details: errorMessage
            });
          }
        }
        const [newMessage] = await db.insert(inboxMessages2).values({
          conversationId,
          channelType: conversation.primaryChannelType,
          messageType: "outgoing",
          direction: "outbound",
          content: message,
          fromIdentifier: agentEmail,
          fromName: agentName,
          toIdentifier: conversation.contactIdentifier,
          toName: conversation.contactName || void 0,
          status: deliveryStatus
        }).returning();
        await db.update(inboxConversations).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq17(inboxConversations.id, conversationId));
        res.json(newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  );
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid as nanoid2 } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid2()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "..", "dist", "public");
  const indexPath = path3.join(distPath, "index.html");
  log(`Checking for static files at: ${distPath}`, "static");
  if (!fs.existsSync(distPath)) {
    const errorMsg = `Build directory not found at ${distPath}. Run 'npm run build' first.`;
    log(`\u274C ${errorMsg}`, "static");
    throw new Error(errorMsg);
  }
  if (!fs.existsSync(indexPath)) {
    const errorMsg = `index.html not found at ${indexPath}`;
    log(`\u274C ${errorMsg}`, "static");
    throw new Error(errorMsg);
  }
  const files = fs.readdirSync(distPath);
  log(`Found ${files.length} files in dist/public`, "static");
  app2.use(express.static(distPath, {
    maxAge: "1y",
    etag: true,
    index: false
  }));
  app2.use("*", (_req, res) => {
    res.sendFile(indexPath);
  });
  log(`\u2705 Serving static files from ${distPath}`, "static");
}

// server/websocket.ts
init_db();
init_schema();
init_jwt();
import { Server } from "socket.io";
import { eq as eq18, and as and12 } from "drizzle-orm";
function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? ["https://*.replit.app", "https://*.replit.dev"] : ["http://localhost:5000", "http://127.0.0.1:5000"],
      credentials: true
    },
    transports: ["websocket", "polling"]
  });
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const sessionId = socket.handshake.auth.sessionId;
    const role = socket.handshake.auth.role;
    if (role === "customer" && sessionId) {
      socket.data = {
        sessionId,
        role: "customer"
      };
      return next();
    }
    if (role === "agent" || token) {
      if (!token) {
        return next(new Error("Authentication required: No token provided"));
      }
      try {
        const payload = jwtService.verifyToken(token);
        const isActive = await jwtService.isTokenActive(token);
        if (!isActive) {
          return next(new Error("Authentication failed: Token has been revoked"));
        }
        socket.data = {
          userId: payload.clientId,
          clientId: payload.clientId,
          role: "agent"
        };
        next();
      } catch (error) {
        console.error("WebSocket authentication error:", error);
        return next(new Error("Authentication failed: Invalid or expired token"));
      }
    } else {
      return next(new Error("Authentication required: Provide either token (agent) or sessionId (customer)"));
    }
  });
  io.on("connection", (socket) => {
    console.log("\u{1F50C} WebSocket client connected:", socket.id);
    socket.on("join:client", (clientId) => {
      socket.data.clientId = clientId;
      socket.join(`client:${clientId}`);
      console.log(`Client ${socket.id} joined room: client:${clientId}`);
    });
    socket.on("join:conversation", (conversationId) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`Client ${socket.id} joined conversation: ${conversationId}`);
    });
    socket.on("chat:message", async (data) => {
      try {
        let conversationId = data.conversationId;
        if (!conversationId) {
          const [conversation] = await db.insert(inboxConversations).values({
            clientId: data.clientId,
            contactName: data.visitorName || "Anonymous",
            contactIdentifier: data.sessionId,
            primaryChannelType: "livechat",
            status: "open",
            lastMessageAt: /* @__PURE__ */ new Date(),
            lastMessagePreview: data.message.substring(0, 100)
          }).returning();
          conversationId = conversation.id;
          await db.update(livechatSessions).set({ conversationId }).where(eq18(livechatSessions.sessionId, data.sessionId));
        }
        const [message] = await db.insert(inboxMessages2).values({
          conversationId,
          channelType: "livechat",
          messageType: "incoming",
          direction: "inbound",
          content: data.message,
          contentType: "text",
          fromIdentifier: data.sessionId,
          fromName: data.visitorName || "Anonymous",
          toIdentifier: `client:${data.clientId}`,
          toName: "Support Team",
          status: "delivered"
        }).returning();
        await db.update(inboxConversations).set({
          lastMessageAt: /* @__PURE__ */ new Date(),
          lastMessagePreview: data.message.substring(0, 100),
          unreadCount: db.$count(inboxMessages2, eq18(inboxMessages2.conversationId, conversationId)),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq18(inboxConversations.id, conversationId));
        io.to(`conversation:${conversationId}`).emit("message:new", {
          ...message,
          conversationId
        });
        io.to(`client:${data.clientId}`).emit("conversation:updated", {
          conversationId,
          lastMessage: data.message,
          unread: true
        });
        socket.emit("message:sent", {
          tempId: data.message,
          messageId: message.id,
          conversationId
        });
      } catch (error) {
        console.error("Error handling chat message:", error);
        socket.emit("message:error", { error: "Failed to send message" });
      }
    });
    socket.on("agent:message", async (data) => {
      try {
        const [conversation] = await db.select().from(inboxConversations).where(eq18(inboxConversations.id, data.conversationId)).limit(1);
        if (!conversation) {
          socket.emit("message:error", { error: "Conversation not found" });
          return;
        }
        const [message] = await db.insert(inboxMessages2).values({
          conversationId: data.conversationId,
          channelType: conversation.primaryChannelType,
          messageType: "outgoing",
          direction: "outbound",
          content: data.message,
          contentType: "text",
          fromIdentifier: `agent:${data.agentId}`,
          fromName: data.agentName,
          toIdentifier: conversation.contactIdentifier,
          toName: conversation.contactName || "Customer",
          sentById: data.agentId,
          status: "sent"
        }).returning();
        await db.update(inboxConversations).set({
          lastMessageAt: /* @__PURE__ */ new Date(),
          lastMessagePreview: data.message.substring(0, 100),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq18(inboxConversations.id, data.conversationId));
        io.to(`conversation:${data.conversationId}`).emit("message:new", {
          ...message,
          conversationId: data.conversationId
        });
        if (conversation.primaryChannelType === "livechat") {
          io.to(`session:${conversation.contactIdentifier}`).emit("agent:message", {
            id: message.id,
            message: data.message,
            agentName: data.agentName,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        socket.emit("message:sent", {
          messageId: message.id,
          conversationId: data.conversationId
        });
      } catch (error) {
        console.error("Error sending agent message:", error);
        socket.emit("message:error", { error: "Failed to send message" });
      }
    });
    socket.on("typing:start", (data) => {
      socket.to(`conversation:${data.conversationId}`).emit("user:typing", {
        conversationId: data.conversationId,
        name: data.name
      });
    });
    socket.on("typing:stop", (data) => {
      socket.to(`conversation:${data.conversationId}`).emit("user:stop-typing", {
        conversationId: data.conversationId
      });
    });
    socket.on("messages:read", async (data) => {
      try {
        await db.update(inboxMessages2).set({
          status: "read",
          readAt: /* @__PURE__ */ new Date()
        }).where(
          and12(
            eq18(inboxMessages2.conversationId, data.conversationId),
            eq18(inboxMessages2.direction, "inbound")
          )
        );
        await db.update(inboxConversations).set({ unreadCount: 0 }).where(eq18(inboxConversations.id, data.conversationId));
        io.to(`conversation:${data.conversationId}`).emit("messages:read", {
          conversationId: data.conversationId
        });
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    });
    socket.on("join:session", async (sessionId) => {
      socket.data.sessionId = sessionId;
      socket.join(`session:${sessionId}`);
      console.log(`Customer ${socket.id} joined session: ${sessionId}`);
      try {
        const [session2] = await db.select().from(livechatSessions).where(eq18(livechatSessions.sessionId, sessionId)).limit(1);
        if (session2 && session2.conversationId) {
          const messages = await db.select().from(inboxMessages2).where(eq18(inboxMessages2.conversationId, session2.conversationId)).orderBy(inboxMessages2.createdAt);
          socket.emit("message:history", { messages });
        }
      } catch (error) {
        console.error("Error loading message history:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("\u{1F50C} WebSocket client disconnected:", socket.id);
    });
  });
  console.log("\u2705 WebSocket server initialized");
  return io;
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static("attached_assets"));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  const io = setupWebSocket(server);
  global.io = io;
  try {
    const { startScheduler: startScheduler2 } = await Promise.resolve().then(() => (init_scheduler(), scheduler_exports));
    startScheduler2();
  } catch (error) {
    console.error("[Scheduler] Failed to start scheduler:", error);
  }
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

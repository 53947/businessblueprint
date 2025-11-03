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
  assessmentProductRecommendations: () => assessmentProductRecommendations,
  assessments: () => assessments,
  billingHistory: () => billingHistory,
  brandAssets: () => brandAssets,
  campaigns: () => campaigns,
  clientAssessments: () => clientAssessments,
  clients: () => clients,
  contentAnalytics: () => contentAnalytics,
  contentMedia: () => contentMedia,
  contentPosts: () => contentPosts,
  contentTemplates: () => contentTemplates,
  dashboardAccess: () => dashboardAccess,
  dnsRecords: () => dnsRecords,
  domainTransfers: () => domainTransfers,
  domains: () => domains,
  emailChangeHistory: () => emailChangeHistory,
  externalSync: () => externalSync,
  impersonationAuditLog: () => impersonationAuditLog,
  impersonationSessions: () => impersonationSessions,
  inboxAttachments: () => inboxAttachments,
  inboxChannelConnections: () => inboxChannelConnections,
  inboxConversations: () => inboxConversations,
  inboxMessages: () => inboxMessages,
  inboxMessages2: () => inboxMessages2,
  inboxParticipants: () => inboxParticipants,
  inboxQuickReplies: () => inboxQuickReplies,
  insertAssessmentProductRecommendationSchema: () => insertAssessmentProductRecommendationSchema,
  insertAssessmentSchema: () => insertAssessmentSchema,
  insertBillingHistorySchema: () => insertBillingHistorySchema,
  insertBrandAssetSchema: () => insertBrandAssetSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertChannelConnectionSchema: () => insertChannelConnectionSchema,
  insertClientSchema: () => insertClientSchema,
  insertContentMediaSchema: () => insertContentMediaSchema,
  insertContentPostSchema: () => insertContentPostSchema,
  insertContentTemplateSchema: () => insertContentTemplateSchema,
  insertConversationSchema: () => insertConversationSchema,
  insertDnsRecordSchema: () => insertDnsRecordSchema,
  insertDomainSchema: () => insertDomainSchema,
  insertDomainTransferSchema: () => insertDomainTransferSchema,
  insertEmailChangeHistorySchema: () => insertEmailChangeHistorySchema,
  insertExternalSyncSchema: () => insertExternalSyncSchema,
  insertImpersonationAuditSchema: () => insertImpersonationAuditSchema,
  insertImpersonationSessionSchema: () => insertImpersonationSessionSchema,
  insertInboxMessage2Schema: () => insertInboxMessage2Schema,
  insertInboxMessageSchema: () => insertInboxMessageSchema,
  insertLivechatSessionSchema: () => insertLivechatSessionSchema,
  insertMagicLinkTokenSchema: () => insertMagicLinkTokenSchema,
  insertProductSchema: () => insertProductSchema,
  insertQuickReplySchema: () => insertQuickReplySchema,
  insertRecommendationSchema: () => insertRecommendationSchema,
  insertReviewNotificationPreferencesSchema: () => insertReviewNotificationPreferencesSchema,
  insertSendAutomationSchema: () => insertSendAutomationSchema,
  insertSendCampaignSchema: () => insertSendCampaignSchema,
  insertSendContactSchema: () => insertSendContactSchema,
  insertSendListSchema: () => insertSendListSchema,
  insertSendTemplateSchema: () => insertSendTemplateSchema,
  insertSocialMediaAccountSchema: () => insertSocialMediaAccountSchema,
  insertSubscriptionAddonSchema: () => insertSubscriptionAddonSchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertSubscriptionSchema: () => insertSubscriptionSchema,
  insertSynupListingSchema: () => insertSynupListingSchema,
  insertSynupLocationSchema: () => insertSynupLocationSchema,
  insertSynupReviewSchema: () => insertSynupReviewSchema,
  insertTaskSchema: () => insertTaskSchema,
  livechatSessions: () => livechatSessions,
  magicLinkTokens: () => magicLinkTokens,
  nameserverHistory: () => nameserverHistory,
  products: () => products,
  recommendations: () => recommendations,
  reviewNotificationPreferences: () => reviewNotificationPreferences,
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
  syncLogs: () => syncLogs,
  synupListings: () => synupListings,
  synupLocations: () => synupLocations,
  synupReviews: () => synupReviews,
  tasks: () => tasks,
  users: () => users
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
var sessions, users, assessments, recommendations, clients, magicLinkTokens, inboxMessages, campaigns, emailChangeHistory, dashboardAccess, clientAssessments, synupLocations, synupListings, synupReviews, reviewNotificationPreferences, insertAssessmentSchema, insertRecommendationSchema, insertClientSchema, insertMagicLinkTokenSchema, insertEmailChangeHistorySchema, insertInboxMessageSchema, insertCampaignSchema, insertSynupLocationSchema, insertSynupListingSchema, insertSynupReviewSchema, insertReviewNotificationPreferencesSchema, subscriptionPlans, subscriptionAddons, subscriptions, subscriptionAddonSelections, products, assessmentProductRecommendations, billingHistory, insertSubscriptionPlanSchema, insertSubscriptionAddonSchema, insertSubscriptionSchema, insertBillingHistorySchema, insertProductSchema, insertAssessmentProductRecommendationSchema, sendContacts, sendLists, sendListContacts, sendTemplates, sendCampaigns, sendCampaignSends, sendAutomations, sendConsentRecords, sendSuppressionList, sendBounceLog, sendPreferenceCenter, sendUnsubscribeRecords, insertSendContactSchema, insertSendListSchema, insertSendTemplateSchema, insertSendCampaignSchema, insertSendAutomationSchema, domains, dnsRecords, domainTransfers, nameserverHistory, impersonationSessions, impersonationAuditLog, insertDomainSchema, insertDnsRecordSchema, insertDomainTransferSchema, insertImpersonationSessionSchema, insertImpersonationAuditSchema, inboxChannelConnections, inboxConversations, inboxMessages2, inboxAttachments, inboxQuickReplies, inboxParticipants, livechatSessions, brandAssets, insertChannelConnectionSchema, insertConversationSchema, insertInboxMessage2Schema, insertQuickReplySchema, insertLivechatSessionSchema, insertBrandAssetSchema, socialMediaAccounts, contentMedia, contentPosts, contentAnalytics, contentTemplates, externalSync, syncLogs, insertSocialMediaAccountSchema, insertContentMediaSchema, insertContentPostSchema, insertContentTemplateSchema, insertExternalSyncSchema, tasks, insertTaskSchema;
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
      // Pathway selection
      selectedPathway: varchar("selected_pathway", { length: 20 }),
      // diy, msp, none
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
      // External reference (Synup, etc.)
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
      // Email verification
      isEmailVerified: boolean("is_email_verified").default(false),
      verificationCode: text("verification_code"),
      verificationExpiry: timestamp("verification_expiry"),
      // Login tracking
      lastLoginTime: timestamp("last_login_time"),
      loginCount: integer("login_count").default(0),
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
    synupLocations = pgTable("synup_locations", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      synupLocationId: text("synup_location_id").unique().notNull(),
      // Synup's location ID
      name: text("name").notNull(),
      address: text("address").notNull(),
      city: text("city").notNull(),
      state: text("state").notNull(),
      country: text("country").notNull().default("US"),
      postalCode: text("postal_code").notNull(),
      phone: text("phone").notNull(),
      website: text("website"),
      email: text("email"),
      category: text("category"),
      status: text("status").default("active"),
      // active, inactive, pending
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    synupListings = pgTable("synup_listings", {
      id: serial("id").primaryKey(),
      locationId: integer("location_id").references(() => synupLocations.id).notNull(),
      synupListingId: text("synup_listing_id").unique(),
      platform: text("platform").notNull(),
      // Google, Yelp, Facebook, Bing, etc.
      status: text("status").notNull(),
      // published, pending, claimed, unclaimed, error
      url: text("url"),
      lastSynced: timestamp("last_synced"),
      syncStatus: text("sync_status"),
      // success, failed, in_progress
      visibility: boolean("visibility").default(true),
      errorMessage: text("error_message"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    synupReviews = pgTable("synup_reviews", {
      id: serial("id").primaryKey(),
      locationId: integer("location_id").references(() => synupLocations.id).notNull(),
      synupReviewId: text("synup_review_id").unique(),
      platform: text("platform").notNull(),
      // Google, Yelp, Facebook, TripAdvisor, etc.
      rating: integer("rating").notNull(),
      // 1-5 stars
      reviewText: text("review_text"),
      reviewerName: text("reviewer_name"),
      reviewerAvatar: text("reviewer_avatar"),
      reviewDate: timestamp("review_date").notNull(),
      response: text("response"),
      responseDate: timestamp("response_date"),
      sentiment: text("sentiment"),
      // positive, negative, neutral
      status: text("status").default("new"),
      // new, responded, flagged, archived
      isAIGenerated: boolean("is_ai_generated").default(false),
      // Was response AI-generated
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    reviewNotificationPreferences = pgTable("review_notification_preferences", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull().unique(),
      enableEmailAlerts: boolean("enable_email_alerts").default(true),
      enableWebSocketAlerts: boolean("enable_websocket_alerts").default(true),
      alertEmail: text("alert_email"),
      // Email to send alerts to (defaults to client email)
      notifyOnAllReviews: boolean("notify_on_all_reviews").default(false),
      notifyOnNegativeReviews: boolean("notify_on_negative_reviews").default(true),
      // Rating <= 2
      notifyOnPositiveReviews: boolean("notify_on_positive_reviews").default(false),
      // Rating >= 4
      minimumRatingThreshold: integer("minimum_rating_threshold").default(2),
      // Alert if rating <= threshold
      autoRespondPositive: boolean("auto_respond_positive").default(false),
      // Auto-generate AI responses for positive
      autoRespondNegative: boolean("auto_respond_negative").default(false),
      // Auto-generate AI responses for negative
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
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
      loginCount: true
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
    insertSynupLocationSchema = createInsertSchema(synupLocations).pick({
      clientId: true,
      synupLocationId: true,
      name: true,
      address: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,
      phone: true,
      website: true,
      email: true,
      category: true,
      status: true
    });
    insertSynupListingSchema = createInsertSchema(synupListings).pick({
      locationId: true,
      synupListingId: true,
      platform: true,
      status: true,
      url: true,
      lastSynced: true,
      syncStatus: true,
      visibility: true,
      errorMessage: true
    });
    insertSynupReviewSchema = createInsertSchema(synupReviews).pick({
      locationId: true,
      synupReviewId: true,
      platform: true,
      rating: true,
      reviewText: true,
      reviewerName: true,
      reviewerAvatar: true,
      reviewDate: true,
      response: true,
      responseDate: true,
      sentiment: true,
      status: true,
      isAIGenerated: true
    });
    insertReviewNotificationPreferencesSchema = createInsertSchema(reviewNotificationPreferences).pick({
      clientId: true,
      enableEmailAlerts: true,
      enableWebSocketAlerts: true,
      alertEmail: true,
      notifyOnAllReviews: true,
      notifyOnNegativeReviews: true,
      notifyOnPositiveReviews: true,
      minimumRatingThreshold: true,
      autoRespondPositive: true,
      autoRespondNegative: true
    });
    subscriptionPlans = pgTable("subscription_plans", {
      id: serial("id").primaryKey(),
      planId: varchar("plan_id", { length: 50 }).unique().notNull(),
      // msp-basic, diy-starter, etc.
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      pathway: varchar("pathway", { length: 20 }).notNull(),
      // msp, diy
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
      // ["msp", "diy"] or ["msp"]
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
      // Pricing
      diyPrice: decimal("diy_price", { precision: 10, scale: 2 }),
      // Price for DIY delivery
      mspPrice: decimal("msp_price", { precision: 10, scale: 2 }),
      // Price for MSP delivery
      setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).default("0.00"),
      billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
      // monthly, one_time
      // Service details
      features: jsonb("features"),
      // List of what's included
      deliveryMethod: text("delivery_method").array(),
      // ["diy", "msp"] - which pathways can deliver this
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
      mspPrice: true,
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
    externalSync = pgTable("external_sync", {
      id: serial("id").primaryKey(),
      systemName: varchar("system_name", { length: 50 }).notNull(),
      // "synup"
      entityType: varchar("entity_type", { length: 50 }).notNull(),
      // "post"
      entityId: integer("entity_id").notNull(),
      // Local ID (contentPosts.id)
      externalId: varchar("external_id", { length: 255 }),
      // Synup's ID for this entity
      // Sync status
      lastPushedAt: timestamp("last_pushed_at"),
      lastPulledAt: timestamp("last_pulled_at"),
      checksum: varchar("checksum", { length: 64 }),
      // Hash to detect changes
      syncStatus: varchar("sync_status", { length: 20 }).default("idle"),
      // idle, pending, synced, error
      syncError: text("sync_error"),
      // Metadata
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      unique().on(table.systemName, table.entityType, table.entityId)
    ]);
    syncLogs = pgTable("sync_logs", {
      id: serial("id").primaryKey(),
      systemName: varchar("system_name", { length: 50 }).notNull(),
      // "synup"
      direction: varchar("direction", { length: 10 }).notNull(),
      // "outbound" | "inbound"
      entityType: varchar("entity_type", { length: 50 }).notNull(),
      // "post"
      entityId: integer("entity_id").notNull(),
      // Operation details
      action: varchar("action", { length: 50 }).notNull(),
      // upsert, delete, status_update
      payload: jsonb("payload"),
      // Data sent/received
      status: varchar("status", { length: 20 }).notNull(),
      // success, error
      errorMessage: text("error_message"),
      // Performance
      duration: integer("duration"),
      // milliseconds
      createdAt: timestamp("created_at").defaultNow()
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
    insertExternalSyncSchema = createInsertSchema(externalSync).pick({
      systemName: true,
      entityType: true,
      entityId: true,
      externalId: true,
      checksum: true,
      metadata: true
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
import { eq as eq4, and as and4 } from "drizzle-orm";
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
        and4(
          eq4(socialMediaAccounts.clientId, clientId),
          eq4(socialMediaAccounts.platform, platform)
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
          }).where(eq4(socialMediaAccounts.id, account.id));
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
        const media = await db.select().from(contentMedia2).where(eq4(contentMedia2.id, post.mediaIds[0]));
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
  }).where(eq4(contentPosts.id, postId));
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
import { eq as eq10 } from "drizzle-orm";
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
        this.keyPair = this.generateKeyPair();
        this.algorithm = this.keyPair.privateKey.length > 0 && this.keyPair.publicKey.length > 0 ? "RS256" : "HS256";
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
        await db.update(dashboardAccess).set({ isActive: false }).where(eq10(dashboardAccess.accessToken, token));
      }
      /**
       * Check if token is active in database
       */
      async isTokenActive(token) {
        const [record] = await db.select().from(dashboardAccess).where(eq10(dashboardAccess.accessToken, token));
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
import { eq as eq13, and as and12, lte, isNull, or } from "drizzle-orm";
import { sql as sql5 } from "drizzle-orm";
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
      and12(
        eq13(contentPosts.status, "scheduled"),
        lte(contentPosts.scheduledFor, sql5`NOW()`),
        or(
          isNull(contentPosts.lockedAt),
          lte(contentPosts.lockedAt, sql5`NOW() - INTERVAL '5 minutes'`)
        ),
        or(
          isNull(contentPosts.nextRetryAt),
          lte(contentPosts.nextRetryAt, sql5`NOW()`)
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
      lockedAt: sql5`NOW()`,
      status: "publishing"
    }).where(
      and12(
        eq13(contentPosts.id, postId),
        eq13(contentPosts.status, "scheduled"),
        or(
          isNull(contentPosts.lockedAt),
          lte(contentPosts.lockedAt, sql5`NOW() - INTERVAL '5 minutes'`)
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
        publishedAt: sql5`NOW()`,
        lockedAt: null,
        lastError: null,
        updatedAt: sql5`NOW()`
      }).where(eq13(contentPosts.id, postId));
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
        updatedAt: sql5`NOW()`
      }).where(eq13(contentPosts.id, postId));
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
        updatedAt: sql5`NOW()`
      }).where(eq13(contentPosts.id, postId));
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
  // Synup Location operations
  async createSynupLocation(locationData) {
    const [location] = await db.insert(synupLocations).values(locationData).returning();
    return location;
  }
  async getSynupLocationsByClient(clientId) {
    return await db.select().from(synupLocations).where(eq(synupLocations.clientId, clientId)).orderBy(desc(synupLocations.createdAt));
  }
  async getSynupLocation(id) {
    const [location] = await db.select().from(synupLocations).where(eq(synupLocations.id, id));
    return location;
  }
  async getSynupLocationBySynupId(synupLocationId) {
    const [location] = await db.select().from(synupLocations).where(eq(synupLocations.synupLocationId, synupLocationId));
    return location;
  }
  async updateSynupLocation(id, data) {
    const [location] = await db.update(synupLocations).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(synupLocations.id, id)).returning();
    return location;
  }
  // Synup Listing operations
  async createSynupListing(listingData) {
    const [listing] = await db.insert(synupListings).values(listingData).returning();
    return listing;
  }
  async getSynupListingsByLocation(locationId) {
    return await db.select().from(synupListings).where(eq(synupListings.locationId, locationId)).orderBy(desc(synupListings.updatedAt));
  }
  async updateSynupListing(id, data) {
    const [listing] = await db.update(synupListings).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(synupListings.id, id)).returning();
    return listing;
  }
  // Synup Review operations
  async createSynupReview(reviewData) {
    const [review] = await db.insert(synupReviews).values(reviewData).returning();
    return review;
  }
  async getSynupReview(id) {
    const [review] = await db.select().from(synupReviews).where(eq(synupReviews.id, id));
    return review;
  }
  async getSynupReviewsByLocation(locationId) {
    return await db.select().from(synupReviews).where(eq(synupReviews.locationId, locationId)).orderBy(desc(synupReviews.reviewDate));
  }
  async updateSynupReview(id, data) {
    const [review] = await db.update(synupReviews).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(synupReviews.id, id)).returning();
    return review;
  }
  // Review notification preferences operations
  async createReviewNotificationPreferences(preferencesData) {
    const [preferences] = await db.insert(reviewNotificationPreferences).values(preferencesData).returning();
    return preferences;
  }
  async getReviewNotificationPreferences(clientId) {
    const [preferences] = await db.select().from(reviewNotificationPreferences).where(eq(reviewNotificationPreferences.clientId, clientId));
    return preferences;
  }
  async updateReviewNotificationPreferences(clientId, data) {
    const [preferences] = await db.update(reviewNotificationPreferences).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(reviewNotificationPreferences.clientId, clientId)).returning();
    return preferences;
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
};
var storage = new DatabaseStorage();

// server/routes.ts
import { randomBytes } from "crypto";

// server/routes/content.ts
init_db();
init_schema();
import { Router } from "express";
import { z } from "zod";
import { eq as eq5, and as and5, desc as desc2, sql as sql4 } from "drizzle-orm";

// server/services/mediaStorage.ts
init_db();
init_schema();
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { nanoid } from "nanoid";
import sharp from "sharp";
import { eq as eq2, and as and2, sql as sql3 } from "drizzle-orm";
var validateStorageConfig = () => {
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET || process.env.S3_BUCKET;
  if (!accessKeyId || !secretAccessKey) {
    console.warn("[MediaStorage] WARNING: S3/R2 credentials not configured. Media uploads will fail. Set CLOUDFLARE_R2_ACCESS_KEY_ID and CLOUDFLARE_R2_SECRET_ACCESS_KEY.");
    return false;
  }
  if (!bucket) {
    console.warn("[MediaStorage] WARNING: S3/R2 bucket not configured. Set CLOUDFLARE_R2_BUCKET.");
    return false;
  }
  return true;
};
var isConfigured = validateStorageConfig();
var s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});
var BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || process.env.S3_BUCKET || "business-blueprint-content";
var CDN_URL = process.env.CLOUDFLARE_R2_CDN_URL || process.env.CDN_URL;
var MediaStorageService = class {
  /**
   * Upload media to R2/S3 and save metadata to database
   */
  async uploadMedia(options) {
    if (!isConfigured) {
      throw new Error("Media storage is not configured. Please set CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, and CLOUDFLARE_R2_BUCKET environment variables.");
    }
    const { clientId, file, fileName, mimeType, folder = "Uploads", altText, tags } = options;
    const ext = fileName.split(".").pop() || "";
    const storageKey = `content/${clientId}/${folder}/${nanoid()}.${ext}`;
    const fileType = this.determineFileType(mimeType);
    const metadata = await this.getMediaMetadata(file, mimeType, fileType);
    let thumbnailUrl = null;
    if (fileType === "video") {
      thumbnailUrl = await this.generateVideoThumbnail(file, storageKey);
    }
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: storageKey,
        Body: file,
        ContentType: mimeType,
        CacheControl: "public, max-age=31536000"
        // 1 year cache
      }
    });
    await upload.done();
    const storageUrl = CDN_URL ? `${CDN_URL}/${storageKey}` : `https://${BUCKET_NAME}.s3.amazonaws.com/${storageKey}`;
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
  /**
   * Delete media from R2/S3 and database
   */
  async deleteMedia(mediaId, clientId) {
    const [media] = await db.select().from(contentMedia).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    ));
    if (!media) {
      throw new Error("Media not found or unauthorized");
    }
    await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: media.storageKey
    }));
    if (media.thumbnailUrl) {
      const thumbnailKey = media.thumbnailUrl.split("/").slice(-3).join("/");
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: thumbnailKey
      }));
    }
    await db.delete(contentMedia).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    ));
    return { success: true };
  }
  /**
   * Get all media for a client
   */
  async getClientMedia(clientId, folder) {
    const query = folder ? and2(eq2(contentMedia.clientId, clientId), eq2(contentMedia.folder, folder)) : eq2(contentMedia.clientId, clientId);
    return await db.select().from(contentMedia).where(query).orderBy(contentMedia.createdAt);
  }
  /**
   * Get media by ID
   */
  async getMediaById(mediaId, clientId) {
    const [media] = await db.select().from(contentMedia).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    ));
    return media;
  }
  /**
   * Update media metadata (alt text, tags, folder)
   */
  async updateMediaMetadata(mediaId, clientId, updates) {
    const [updated] = await db.update(contentMedia).set(updates).where(and2(
      eq2(contentMedia.id, mediaId),
      eq2(contentMedia.clientId, clientId)
    )).returning();
    return updated;
  }
  /**
   * Increment usage count when media is used in a post
   */
  async incrementUsageCount(mediaId) {
    await db.update(contentMedia).set({ usageCount: sql3`${contentMedia.usageCount} + 1` }).where(eq2(contentMedia.id, mediaId));
  }
  /**
   * Determine file type from MIME type
   */
  determineFileType(mimeType) {
    if (mimeType.startsWith("video/")) return "video";
    if (mimeType === "image/gif") return "gif";
    if (mimeType.startsWith("image/")) return "image";
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  /**
   * Get media metadata (dimensions, size)
   */
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
        // Would need ffmpeg
      };
    }
    return { fileSize, fileType: "image" };
  }
  /**
   * Generate thumbnail for video
   */
  async generateVideoThumbnail(file, storageKey) {
    console.log("[MediaStorage] Video thumbnail generation not yet implemented");
    return null;
  }
};
var mediaStorageService = new MediaStorageService();

// server/services/content/synupSync.ts
init_db();
init_schema();
import { eq as eq3, and as and3 } from "drizzle-orm";
import crypto from "crypto";
var SynupSyncService = class {
  baseUrl;
  apiKey;
  systemName = "synup";
  constructor() {
    this.baseUrl = process.env.SYNUP_BASE_URL || "https://api.synup.com/api/v4";
    this.apiKey = process.env.SYNUP_API_KEY || "";
    if (!this.apiKey) {
      console.warn("[SynupSync] SYNUP_API_KEY not configured - sync disabled");
    }
  }
  /**
   * Initialize sync system
   */
  initialize() {
    if (!this.apiKey) return;
    console.log("[SynupSync] Initialized");
  }
  /**
   * Check if sync is enabled for a client
   */
  async isSyncEnabled(clientId) {
    try {
      const locations = await db.select().from(synupLocations).where(eq3(synupLocations.clientId, clientId)).limit(1);
      return locations.length > 0;
    } catch (error) {
      console.error("[SynupSync] Error checking sync enabled:", error);
      return false;
    }
  }
  /**
   * Map internal post to Synup format
   */
  async mapPostToSynup(post) {
    let mediaUrls = [];
    if (post.mediaIds && post.mediaIds.length > 0) {
      const { contentMedia: contentMedia2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const media = await db.select().from(contentMedia2).where(eq3(contentMedia2.clientId, post.clientId));
      const postMedia = media.filter((m) => post.mediaIds.includes(m.id));
      mediaUrls = postMedia.map((m) => m.storageUrl).filter(Boolean);
    }
    return {
      local_id: post.id,
      title: (post.caption || "").slice(0, 80),
      content: post.caption || "",
      media_urls: mediaUrls,
      platforms: post.platforms || [],
      status: this.mapStatusToSynup(post.status),
      scheduled_for: post.scheduledFor?.toISOString(),
      published_at: post.publishedAt?.toISOString(),
      client_id: post.clientId
    };
  }
  /**
   * Map internal status to Synup status
   */
  mapStatusToSynup(status) {
    const statusMap = {
      "draft": "DRAFT",
      "scheduled": "QUEUED",
      "publishing": "PUBLISHING",
      "published": "PUBLISHED",
      "failed": "FAILED"
    };
    return statusMap[status] || "DRAFT";
  }
  /**
   * Map Synup status to internal status
   */
  mapStatusFromSynup(synupStatus) {
    const statusMap = {
      "DRAFT": "draft",
      "QUEUED": "scheduled",
      "PUBLISHING": "publishing",
      "PUBLISHED": "published",
      "FAILED": "failed"
    };
    return statusMap[synupStatus] || "draft";
  }
  /**
   * Calculate checksum for change detection
   * Includes all mutable fields that should trigger a sync
   */
  async calculateChecksum(post) {
    let mediaUrls = [];
    if (post.mediaIds && post.mediaIds.length > 0) {
      const { contentMedia: contentMedia2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const media = await db.select().from(contentMedia2).where(eq3(contentMedia2.clientId, post.clientId));
      const postMedia = media.filter((m) => post.mediaIds.includes(m.id));
      mediaUrls = postMedia.map((m) => m.storageUrl).filter(Boolean);
    }
    const data = JSON.stringify({
      caption: post.caption,
      hashtags: post.hashtags || [],
      platforms: post.platforms,
      mediaUrls,
      platformCustomizations: post.platformCustomizations || {},
      status: post.status,
      scheduledFor: post.scheduledFor?.toISOString()
    });
    return crypto.createHash("sha256").update(data).digest("hex");
  }
  /**
   * Push a post to Synup (outbound sync)
   */
  async pushPostToSynup(postId) {
    if (!this.apiKey) {
      console.log("[SynupSync] Sync not configured, skipping push");
      return false;
    }
    try {
      const [post] = await db.select().from(contentPosts).where(eq3(contentPosts.id, postId));
      if (!post) {
        console.error("[SynupSync] Post not found:", postId);
        return false;
      }
      const enabled = await this.isSyncEnabled(post.clientId);
      if (!enabled) {
        console.log("[SynupSync] Sync not enabled for client:", post.clientId);
        return false;
      }
      const [existingSync] = await db.select().from(externalSync).where(and3(
        eq3(externalSync.systemName, this.systemName),
        eq3(externalSync.entityType, "post"),
        eq3(externalSync.entityId, postId)
      ));
      const newChecksum = await this.calculateChecksum(post);
      if (existingSync && existingSync.checksum === newChecksum) {
        console.log("[SynupSync] No changes detected, skipping push");
        return true;
      }
      const payload = await this.mapPostToSynup(post);
      const method = existingSync?.externalId ? "PUT" : "POST";
      const endpoint = existingSync?.externalId ? `${this.baseUrl}/posts/${existingSync.externalId}` : `${this.baseUrl}/posts`;
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`Synup API error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      const externalId = result.id || result.data?.id;
      if (existingSync) {
        await db.update(externalSync).set({
          externalId: externalId || existingSync.externalId,
          lastPushedAt: /* @__PURE__ */ new Date(),
          checksum: newChecksum,
          syncStatus: "synced"
        }).where(eq3(externalSync.id, existingSync.id));
      } else {
        await db.insert(externalSync).values({
          systemName: this.systemName,
          entityType: "post",
          entityId: postId,
          externalId,
          lastPushedAt: /* @__PURE__ */ new Date(),
          checksum: newChecksum,
          syncStatus: "synced"
        });
      }
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: "outbound",
        entityType: "post",
        entityId: postId,
        action: method === "POST" ? "create" : "update",
        payload,
        status: "success"
      });
      console.log("[SynupSync] Successfully pushed post:", postId);
      return true;
    } catch (error) {
      console.error("[SynupSync] Failed to push post:", error);
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: "outbound",
        entityType: "post",
        entityId: postId,
        action: "create",
        payload: {},
        status: "error",
        errorMessage: error instanceof Error ? error.message : "Unknown error"
      });
      return false;
    }
  }
  /**
   * Handle inbound update from Synup
   * Applies conflict resolution policy
   */
  async applySynupUpdate(payload) {
    if (!this.apiKey) {
      console.log("[SynupSync] Sync not configured");
      return false;
    }
    try {
      const { local_id, external_id, status, notes, published_at, error_message } = payload;
      const [post] = await db.select().from(contentPosts).where(eq3(contentPosts.id, local_id));
      if (!post) {
        console.error("[SynupSync] Post not found for update:", local_id);
        return false;
      }
      const updates = {};
      let shouldUpdate = false;
      if (status) {
        const newStatus = this.mapStatusFromSynup(status);
        if (status === "PUBLISHED" || status === "FAILED") {
          updates.status = newStatus;
          shouldUpdate = true;
          if (status === "PUBLISHED" && published_at) {
            updates.publishedAt = new Date(published_at);
          }
          if (status === "FAILED" && error_message) {
            updates.lastError = error_message;
          }
        } else if (post.status !== "published" && post.status !== "failed") {
          updates.status = newStatus;
          shouldUpdate = true;
        }
      }
      if (shouldUpdate) {
        await db.update(contentPosts).set(updates).where(eq3(contentPosts.id, local_id));
      }
      const [existingSync] = await db.select().from(externalSync).where(and3(
        eq3(externalSync.systemName, this.systemName),
        eq3(externalSync.entityType, "post"),
        eq3(externalSync.entityId, local_id)
      ));
      if (existingSync) {
        await db.update(externalSync).set({
          externalId: external_id || existingSync.externalId,
          lastPulledAt: /* @__PURE__ */ new Date(),
          syncStatus: "synced",
          metadata: notes ? { notes } : void 0
        }).where(eq3(externalSync.id, existingSync.id));
      } else if (external_id) {
        await db.insert(externalSync).values({
          systemName: this.systemName,
          entityType: "post",
          entityId: local_id,
          externalId: external_id,
          lastPulledAt: /* @__PURE__ */ new Date(),
          syncStatus: "synced",
          metadata: notes ? { notes } : void 0
        });
      }
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: "inbound",
        entityType: "post",
        entityId: local_id,
        action: "status_update",
        payload,
        status: "success"
      });
      console.log("[SynupSync] Successfully applied update:", local_id);
      return true;
    } catch (error) {
      console.error("[SynupSync] Failed to apply update:", error);
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: "inbound",
        entityType: "post",
        entityId: payload.local_id || 0,
        action: "status_update",
        payload,
        status: "error",
        errorMessage: error instanceof Error ? error.message : "Unknown error"
      });
      return false;
    }
  }
  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload, signature) {
    const secret = process.env.SYNUP_WEBHOOK_SECRET || "";
    if (!secret) {
      console.warn("[SynupSync] SYNUP_WEBHOOK_SECRET not configured");
      return false;
    }
    const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
};
var synupSyncService = new SynupSyncService();

// server/routes/content.ts
init_contentPublisher();
init_platformFactory();
var router = Router();
var mediaStorage = new MediaStorageService();
async function requireContentAccess(req, res, next) {
  const clientId = parseInt(req.params.clientId || req.body.clientId);
  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }
  try {
    const hasAccess = await db.select({ id: subscriptionAddonSelections.id }).from(subscriptionAddonSelections).innerJoin(
      subscriptions,
      eq5(subscriptionAddonSelections.subscriptionId, subscriptions.id)
    ).innerJoin(
      subscriptionAddons,
      eq5(subscriptionAddonSelections.addonId, subscriptionAddons.id)
    ).where(
      and5(
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
  const [subscription] = await db.select({ addonName: subscriptionAddons.name }).from(subscriptionAddonSelections).innerJoin(subscriptions, eq5(subscriptionAddonSelections.subscriptionId, subscriptions.id)).innerJoin(subscriptionAddons, eq5(subscriptionAddonSelections.addonId, subscriptionAddons.id)).where(
    and5(
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
    const posts = status ? await db.select().from(contentPosts).where(and5(
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
    const [post] = await db.select().from(contentPosts).where(and5(
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
    const postSchema = z.object({
      caption: z.string(),
      platforms: z.array(z.string()),
      hashtags: z.array(z.string()).optional(),
      mediaIds: z.array(z.number()).optional(),
      scheduledFor: z.coerce.date().refine((date) => !isNaN(date.getTime()) && date > /* @__PURE__ */ new Date(), {
        message: "scheduledFor must be a valid future date"
      }).optional(),
      platformCustomizations: z.any().optional(),
      timezone: z.string().optional(),
      status: z.string().optional(),
      isAIGenerated: z.boolean().optional(),
      aiPrompt: z.string().optional(),
      contentScore: z.number().optional(),
      templateId: z.number().optional()
    });
    const validatedBody = postSchema.parse(req.body);
    const [post] = await db.insert(contentPosts).values({
      ...validatedBody,
      clientId
    }).returning();
    synupSyncService.pushPostToSynup(post.id).catch((err) => {
      console.error("[Content] Sync to Synup failed (post creation):", err);
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("[Content] Error creating post:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create post" });
  }
});
router.put("/:clientId/posts/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const updateSchema = z.object({
      caption: z.string().optional(),
      platforms: z.array(z.string()).optional(),
      hashtags: z.array(z.string()).optional(),
      mediaIds: z.array(z.number()).optional(),
      scheduledFor: z.coerce.date().refine((date) => !isNaN(date.getTime()) && date > /* @__PURE__ */ new Date(), {
        message: "scheduledFor must be a valid future date"
      }).optional(),
      platformCustomizations: z.any().optional(),
      timezone: z.string().optional(),
      status: z.string().optional(),
      isAIGenerated: z.boolean().optional(),
      aiPrompt: z.string().optional(),
      contentScore: z.number().optional(),
      templateId: z.number().optional()
    });
    const data = updateSchema.parse(req.body);
    const [post] = await db.update(contentPosts).set(data).where(and5(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    )).returning();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    synupSyncService.pushPostToSynup(post.id).catch((err) => {
      console.error("[Content] Sync to Synup failed (post update):", err);
    });
    res.json(post);
  } catch (error) {
    console.error("[Content] Error updating post:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update post" });
  }
});
router.delete("/:clientId/posts/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const [deleted] = await db.delete(contentPosts).where(and5(
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
    const [post] = await db.select().from(contentPosts).where(and5(
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
      synupSyncService.pushPostToSynup(postId).catch((err) => {
        console.error("[Content] Sync to Synup failed (post scheduled):", err);
      });
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
    const scheduledPosts = await db.select().from(contentPosts).where(and5(
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
    const scheduleSchema = z.object({
      scheduledFor: z.coerce.date().refine((date) => !isNaN(date.getTime()) && date > /* @__PURE__ */ new Date(), {
        message: "scheduledFor must be a valid future date"
      })
    });
    const { scheduledFor: newScheduleDate } = scheduleSchema.parse(req.body);
    const [existingPost] = await db.select().from(contentPosts).where(and5(
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
    }).where(and5(
      eq5(contentPosts.id, postId),
      eq5(contentPosts.clientId, clientId)
    )).returning();
    res.json({
      message: "Schedule updated successfully",
      post
    });
  } catch (error) {
    console.error("[Content] Error updating schedule:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update schedule" });
  }
});
router.delete("/:clientId/schedule/:postId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);
    const [existingPost] = await db.select().from(contentPosts).where(and5(
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
    }).where(and5(
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
    const media = folder ? await db.select().from(contentMedia).where(and5(
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
    const accountSchema = z.object({
      platform: z.string(),
      platformAccountId: z.string(),
      accessToken: z.string(),
      refreshToken: z.string().optional(),
      tokenExpiresAt: z.string().transform((str) => new Date(str)).optional(),
      platformAccountName: z.string().optional(),
      platformAccountHandle: z.string().optional(),
      platformAccountAvatar: z.string().optional(),
      accountType: z.string().optional(),
      permissions: z.array(z.string()).optional(),
      metadata: z.any().optional(),
      isActive: z.boolean().optional()
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
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to connect platform" });
  }
});
router.delete("/:clientId/platforms/:accountId", requireContentAccess, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const accountId = parseInt(req.params.accountId);
    const [deleted] = await db.delete(socialMediaAccounts).where(and5(
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
router.post("/:clientId/sync/synup/push/:postId", requireContentAccess, async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const result = await synupSyncService.pushPostToSynup(postId);
    if (result) {
      res.json({ success: true, message: "Post synced to Synup successfully" });
    } else {
      res.status(500).json({ success: false, message: "Failed to sync post to Synup" });
    }
  } catch (error) {
    console.error("[Content] Error pushing to Synup:", error);
    res.status(500).json({ success: false, message: "Failed to sync post" });
  }
});
router.post("/sync/synup/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-synup-signature"];
    const rawBody = JSON.stringify(req.body);
    if (!signature || !synupSyncService.verifyWebhookSignature(rawBody, signature)) {
      console.error("[Content] Invalid Synup webhook signature");
      return res.status(401).json({ error: "Invalid signature" });
    }
    const result = await synupSyncService.applySynupUpdate(req.body);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to apply update" });
    }
  } catch (error) {
    console.error("[Content] Error processing Synup webhook:", error);
    res.status(500).json({ success: false, message: "Internal error" });
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
import { eq as eq6, and as and6 } from "drizzle-orm";
import crypto2 from "crypto";
var router2 = Router2();
var META_APP_ID = process.env.META_APP_ID;
var META_APP_SECRET = process.env.META_APP_SECRET;
var META_WEBHOOK_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "businessblueprint_meta_verify_2025";
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
    const state = req.query.state;
    if (!code) {
      return res.status(400).json({ error: "No authorization code provided" });
    }
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(getRedirectUri(req))}`
    );
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error("Failed to get access token");
    }
    const pageTokenResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/accounts?access_token=${tokenData.access_token}`
    );
    const pageData = await pageTokenResponse.json();
    const clientId = parseInt(state);
    if (pageData.data && pageData.data.length > 0) {
      for (const page of pageData.data) {
        const existing = await db.select().from(inboxChannelConnections).where(
          and6(
            eq6(inboxChannelConnections.clientId, clientId),
            eq6(inboxChannelConnections.channelType, "facebook"),
            eq6(inboxChannelConnections.channelIdentifier, page.id)
          )
        );
        const credentials = {
          pageAccessToken: page.access_token,
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
            channelType: "facebook",
            channelIdentifier: page.id,
            channelName: page.name,
            credentials,
            status: "active",
            lastSyncedAt: /* @__PURE__ */ new Date()
          });
        }
      }
    }
    res.redirect("/inbox?tab=settings&oauth=success");
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect("/inbox?tab=settings&oauth=error");
  }
});
function verifyWebhookSignature(body, signature) {
  if (!signature || !META_APP_SECRET) return false;
  const elements = signature.split("=");
  const signatureHash = elements[1];
  const expectedHash = crypto2.createHmac("sha256", META_APP_SECRET).update(JSON.stringify(body)).digest("hex");
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
      and6(
        eq6(inboxChannelConnections.channelType, channelType),
        eq6(inboxChannelConnections.channelIdentifier, recipientId)
      )
    );
    if (!channel || !channel.clientId) {
      console.log(`No channel found for ${channelType} page ${recipientId}`);
      return;
    }
    let [conversation] = await db.select().from(inboxConversations).where(
      and6(
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
      and6(
        eq6(inboxChannelConnections.channelType, channelType),
        eq6(inboxChannelConnections.channelIdentifier, pageId)
      )
    );
    if (!channel || !channel.clientId) return;
    let [conversation] = await db.select().from(inboxConversations).where(
      and6(
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
import { eq as eq7, and as and7, desc as desc3 } from "drizzle-orm";
import { z as z2 } from "zod";

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
    const clientId = req.user?.id;
    if (!clientId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const allTasks = await db.select().from(tasks).where(eq7(tasks.clientId, clientId)).orderBy(desc3(tasks.createdAt));
    res.json(allTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});
tasksRouter.get("/:id", async (req, res) => {
  try {
    const clientId = req.user?.id;
    const taskId = parseInt(req.params.id);
    if (!clientId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [task] = await db.select().from(tasks).where(and7(
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
    const clientId = req.user?.id;
    if (!clientId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const taskSchema = z2.object({
      title: z2.string().min(1),
      description: z2.string().optional(),
      status: z2.enum(["todo", "in_progress", "completed", "cancelled"]).default("todo"),
      priority: z2.enum(["low", "medium", "high", "urgent"]).default("medium"),
      assignedTo: z2.string().optional(),
      assignedBy: z2.string().optional(),
      dueDate: z2.string().optional(),
      tags: z2.array(z2.string()).optional(),
      relatedTo: z2.any().optional()
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
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create task" });
  }
});
tasksRouter.patch("/:id", async (req, res) => {
  try {
    const clientId = req.user?.id;
    const taskId = parseInt(req.params.id);
    if (!clientId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updateSchema = z2.object({
      title: z2.string().min(1).optional(),
      description: z2.string().optional(),
      status: z2.enum(["todo", "in_progress", "completed", "cancelled"]).optional(),
      priority: z2.enum(["low", "medium", "high", "urgent"]).optional(),
      assignedTo: z2.string().optional(),
      assignedBy: z2.string().optional(),
      dueDate: z2.string().optional(),
      tags: z2.array(z2.string()).optional(),
      relatedTo: z2.any().optional()
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
    const [updatedTask] = await db.update(tasks).set(updateData).where(and7(
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
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update task" });
  }
});
tasksRouter.delete("/:id", async (req, res) => {
  try {
    const clientId = req.user?.id;
    const taskId = parseInt(req.params.id);
    if (!clientId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [deletedTask] = await db.delete(tasks).where(and7(
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

// server/services/email.ts
import nodemailer from "nodemailer";
var EmailService = class {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      // Use TLS (STARTTLS) on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  generateVerificationCode() {
    return Math.floor(1e5 + Math.random() * 9e5).toString();
  }
  async sendVerificationEmail(email, companyName, verificationCode) {
    try {
      const htmlContent = this.generateVerificationEmailHTML(companyName, verificationCode);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Verify Your Email - ${verificationCode}`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending verification email:", error);
      return false;
    }
  }
  async sendEmailChangeNotification(oldEmail, newEmail, companyName) {
    try {
      const htmlContent = this.generateEmailChangeNotificationHTML(companyName, newEmail);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: oldEmail,
        subject: `Email Address Changed - Action May Be Required`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending email change notification:", error);
      return false;
    }
  }
  async sendAssessmentReport(email, data) {
    try {
      const htmlContent = this.generateReportHTML(data);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Your Digital Presence Assessment Results - Score: ${data.digitalScore}`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
  async sendReviewAlert(email, data) {
    try {
      const htmlContent = this.generateReviewAlertHTML(data);
      const sentiment = data.rating <= 2 ? "Negative" : data.rating >= 4 ? "Positive" : "Neutral";
      const urgency = data.rating <= 2 ? "\u26A0\uFE0F URGENT" : "";
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `${urgency} New ${sentiment} Review on ${data.platform} - ${data.rating} ${data.rating === 1 ? "Star" : "Stars"}`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending review alert email:", error);
      return false;
    }
  }
  async sendEnrollmentConfirmation(email, data) {
    try {
      const htmlContent = this.generateEnrollmentConfirmationHTML(data);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Welcome to ${data.planName} - Your Digital Growth Journey Begins!`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending enrollment confirmation email:", error);
      return false;
    }
  }
  async sendPathwayReminderEmail(email, data) {
    try {
      const htmlContent = this.generatePathwayReminderHTML(data);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Still deciding? Your Digital Growth Plan is ready, ${data.businessName}`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending pathway reminder email:", error);
      return false;
    }
  }
  async sendCheckoutAbandonmentEmail(email, data) {
    try {
      const htmlContent = this.generateCheckoutAbandonmentHTML(data);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Complete your enrollment - ${data.planName} is waiting for you!`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending checkout abandonment email:", error);
      return false;
    }
  }
  async sendMagicLinkEmail(email, magicLink, companyName) {
    try {
      const htmlContent = this.generateMagicLinkHTML(magicLink, companyName);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Your Secure Login Link - Business Blueprint",
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending magic link email:", error);
      return false;
    }
  }
  async sendThankYouIntroduction(email, data) {
    try {
      const htmlContent = this.generateThankYouIntroductionHTML(data);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Meet Coach Blue \u{1F916} - Your AI Guide to Digital Success`,
        html: htmlContent
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending thank you introduction email:", error);
      return false;
    }
  }
  generateReportHTML(data) {
    const highPriorityRecs = data.recommendations.filter((r) => r.priority === "high").slice(0, 3);
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Presence Assessment Results</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
        .score-value { font-size: 48px; font-weight: bold; color: #fff; }
        .section { margin: 30px 0; }
        .recommendation { background: #f8f9fa; padding: 20px; margin: 15px 0; border-left: 4px solid #FF6B35; border-radius: 4px; }
        .cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 5px; }
        .secondary-button { background: #8B5CF6; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Digital Presence Assessment Results</h1>
        <h2>${data.businessName}</h2>
        <div class="score-circle">
            <div>
                <div class="score-value">${data.digitalScore}</div>
                <div style="font-size: 14px;">out of 140</div>
            </div>
        </div>
    </div>
    
    <div class="content">
        <div class="section">
            <h2>Executive Summary</h2>
            <p>${data.summary}</p>
        </div>
        
        <div class="section">
            <h2>Priority Recommendations</h2>
            ${highPriorityRecs.map((rec) => `
                <div class="recommendation">
                    <h3>${rec.title}</h3>
                    <p>${rec.description}</p>
                    <p><strong>Estimated Impact:</strong> ${rec.estimatedImpact}</p>
                    <p><strong>Estimated Effort:</strong> ${rec.estimatedEffort}</p>
                </div>
            `).join("")}
        </div>
        
        <div class="section" style="text-align: center;">
            <h2>Choose Your Path Forward</h2>
            <p>Ready to improve your digital presence? We offer two paths to success:</p>
            
            <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}?path=diy" class="cta-button">
                \u{1F6E0}\uFE0F DIY Path - $49/month
            </a>
            
            <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}?path=msp" class="cta-button secondary-button">
                \u{1F3AF} Managed Services - $299/month
            </a>
            
            <p style="margin-top: 20px;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}">View Full Report</a>
            </p>
        </div>
    </div>
    
    <div class="footer">
        <p>This assessment was powered by Google Business Intelligence and AI analysis.</p>
        <p>Questions? Reply to this email or visit our support center.</p>
        <p><small>\xA9 2024 businessblueprint.io</small></p>
    </div>
</body>
</html>`;
  }
  generateVerificationEmailHTML(companyName, verificationCode) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8B5CF6, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .code-box { background: #f8f9fa; border: 2px dashed #8B5CF6; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0; }
        .code { font-size: 36px; font-weight: bold; color: #8B5CF6; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F4E7} Verify Your Email</h1>
            <p>${companyName}</p>
        </div>
        
        <div class="content">
            <p>Hello,</p>
            <p>Please use the verification code below to confirm your email address and activate your account:</p>
            
            <div class="code-box">
                <div class="code">${verificationCode}</div>
            </div>
            
            <p>Enter this code on the verification page to complete your email confirmation.</p>
            
            <div class="warning">
                <p style="margin: 0;"><strong>Security Note:</strong> This code expires in 15 minutes. Never share this code with anyone.</p>
            </div>
            
            <p>If you didn't request this verification, you can safely ignore this email.</p>
        </div>
        
        <div class="footer">
            <p>Need help? Contact our support team.</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generateEmailChangeNotificationHTML(companyName, newEmail) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Address Changed</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #F59E0B, #DC2626); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .alert-box { background: #FEF2F2; border: 2px solid #DC2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .cta-button { display: inline-block; background: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u26A0\uFE0F Email Address Changed</h1>
            <p>${companyName}</p>
        </div>
        
        <div class="content">
            <p>This is an important security notification.</p>
            
            <div class="alert-box">
                <p style="margin: 0;"><strong>Your account email has been changed to:</strong></p>
                <p style="font-size: 18px; margin: 10px 0; font-weight: bold;">${newEmail}</p>
            </div>
            
            <p>If you made this change, you can safely ignore this email. Your account is secure.</p>
            
            <p><strong>Did not make this change?</strong></p>
            <p>If you did not authorize this email change, please take immediate action:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/contact" class="cta-button">
                    Contact Support Immediately
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
                This notification was sent to your previous email address as a security measure.
            </p>
        </div>
        
        <div class="footer">
            <p>For security questions, contact our support team immediately.</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generateEnrollmentConfirmationHTML(data) {
    const pathwayColor = data.pathway === "msp" ? "#8B5CF6" : "#FF6B35";
    const pathwayName = data.pathway === "msp" ? "Managed Services" : "DIY Platform";
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Business Blueprint</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, ${pathwayColor}, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .plan-box { background: #f8f9fa; border: 2px solid ${pathwayColor}; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .feature-list { list-style: none; padding: 0; margin: 20px 0; }
        .feature-list li { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .feature-list li:before { content: "\u2713 "; color: ${pathwayColor}; font-weight: bold; margin-right: 10px; }
        .cta-button { display: inline-block; background: ${pathwayColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .next-steps { background: #E0F2FE; border-left: 4px solid #0284C7; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F389} Welcome to Business Blueprint!</h1>
            <p style="font-size: 18px; margin-top: 10px;">${data.businessName}</p>
        </div>
        
        <div class="content">
            <p>Congratulations! You've taken the first step toward transforming your digital presence.</p>
            
            <div class="plan-box">
                <h2 style="color: ${pathwayColor}; margin-top: 0;">${data.planName}</h2>
                <p style="font-size: 14px; color: #666; margin-bottom: 15px;">${pathwayName} Pathway</p>
                <p style="font-size: 32px; font-weight: bold; color: #333; margin: 10px 0;">
                    $${data.monthlyPrice.toFixed(2)}<span style="font-size: 16px; font-weight: normal;">/month</span>
                </p>
                <p style="font-size: 14px; color: #666;">Next billing date: ${data.nextBillingDate.toLocaleDateString()}</p>
            </div>
            
            <h3>What's Included:</h3>
            <ul class="feature-list">
                ${data.features.map((feature) => `<li>${feature}</li>`).join("")}
            </ul>
            
            <div class="next-steps">
                <h4 style="color: #0284C7; margin-top: 0;">\u{1F680} Next Steps:</h4>
                <ol style="margin: 10px 0; padding-left: 20px;">
                    <li>Check your email for login credentials</li>
                    <li>Access your client portal dashboard</li>
                    <li>Complete your business profile setup</li>
                    ${data.pathway === "msp" ? "<li>Your dedicated account manager will contact you within 24 hours</li>" : "<li>Start using the platform tools immediately</li>"}
                </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/client-login" class="cta-button">
                    Access Your Dashboard
                </a>
            </div>
            
            <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0;"><strong>\u{1F4DE} Need Help?</strong> Our support team is here for you:</p>
                <p style="margin: 5px 0 0 0;">Email: support@businessblueprint.io | Live Chat available in your dashboard</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing Business Blueprint!</p>
            <p>We're excited to help you grow your digital presence.</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generatePathwayReminderHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Growth Plan is Ready</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .score-badge { background: rgba(255,255,255,0.2); display: inline-block; padding: 10px 20px; border-radius: 20px; font-size: 24px; font-weight: bold; margin: 10px 0; }
        .cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 10px; }
        .secondary-button { background: #8B5CF6; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .highlight-box { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F4CA} Your Digital Growth Plan is Ready!</h1>
            <p style="font-size: 18px; margin-top: 10px;">${data.businessName}</p>
            <div class="score-badge">Digital IQ Score: ${data.digitalScore}</div>
        </div>
        
        <div class="content">
            <p>Hi there,</p>
            
            <p>We noticed you completed your Digital Presence Assessment but haven't selected a pathway yet. Your personalized growth plan is ready and waiting!</p>
            
            <div class="highlight-box">
                <p style="margin: 0;"><strong>\u{1F3AF} Quick Reminder:</strong> Businesses that implement their Digital Growth Plan within 30 days see 3x faster results than those who wait.</p>
            </div>
            
            <h3>Choose Your Path:</h3>
            
            <p><strong>Option 1: DIY Platform</strong> - $49/month<br>
            Perfect if you want hands-on control and prefer to manage everything yourself.</p>
            
            <p><strong>Option 2: Managed Services</strong> - Starting at $299/month<br>
            Let our experts handle everything while you focus on running your business.</p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/assessment-checkout?id=${data.assessmentId}" class="cta-button">
                    Choose Your Pathway
                </a>
                
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard/${data.assessmentId}" class="cta-button secondary-button">
                    Review My Assessment
                </a>
            </div>
            
            <p style="margin-top: 30px;">Have questions? Just reply to this email - we're here to help!</p>
        </div>
        
        <div class="footer">
            <p>Ready to transform your digital presence?</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generateCheckoutAbandonmentHTML(data) {
    const pathwayColor = data.pathway === "msp" ? "#8B5CF6" : "#FF6B35";
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Your Enrollment</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, ${pathwayColor}, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .plan-box { background: #f8f9fa; border: 2px solid ${pathwayColor}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .cta-button { display: inline-block; background: ${pathwayColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .benefit-list { list-style: none; padding: 0; margin: 20px 0; }
        .benefit-list li { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .benefit-list li:before { content: "\u2713 "; color: ${pathwayColor}; font-weight: bold; margin-right: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u23F0 You're Almost There!</h1>
            <p style="font-size: 18px; margin-top: 10px;">${data.businessName}</p>
        </div>
        
        <div class="content">
            <p>Hi,</p>
            
            <p>We noticed you started enrolling in <strong>${data.planName}</strong> but didn't complete the process. No worries - we saved your spot!</p>
            
            <div class="plan-box">
                <h2 style="color: ${pathwayColor}; margin-top: 0;">${data.planName}</h2>
                <p style="font-size: 32px; font-weight: bold; margin: 10px 0;">
                    $${data.monthlyPrice.toFixed(2)}<span style="font-size: 16px; font-weight: normal;">/month</span>
                </p>
            </div>
            
            <h3>Why complete your enrollment today:</h3>
            <ul class="benefit-list">
                <li>Start seeing results within the first week</li>
                <li>Get expert guidance from day one</li>
                <li>Lock in your current pricing</li>
                <li>Cancel anytime - no long-term commitment</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/assessment-checkout?id=${data.assessmentId}" class="cta-button">
                    Complete My Enrollment
                </a>
            </div>
            
            <p style="margin-top: 30px; text-align: center; color: #666;">
                Need help or have questions? Just reply to this email.
            </p>
        </div>
        
        <div class="footer">
            <p>Your digital growth journey is just one click away!</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generateMagicLinkHTML(magicLink, companyName) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Secure Login Link</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0057FF, #8B5CF6); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .info-box { background: #E0F2FE; border-left: 4px solid #0057FF; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .cta-button { display: inline-block; background: #0057FF; color: white; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; font-size: 18px; box-shadow: 0 4px 12px rgba(0,87,255,0.3); }
        .cta-button:hover { background: #0041CC; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .security-note { background: #FFF4E6; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px; }
        .expiry-warning { color: #FF6B35; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F510} Secure Login Link</h1>
            <p style="font-size: 18px; margin-top: 10px;">${companyName || "Business Blueprint"}</p>
        </div>
        
        <div class="content">
            <p>Hello,</p>
            
            <p>You requested access to your Business Blueprint dashboard. Click the button below to log in securely:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${magicLink}" class="cta-button">
                    Access My Dashboard
                </a>
            </div>
            
            <div class="info-box">
                <h3 style="margin-top: 0;">Why No Password?</h3>
                <p style="margin-bottom: 0;">We use email-based authentication for maximum security. This means:</p>
                <ul style="margin: 10px 0;">
                    <li>No passwords to remember or forget</li>
                    <li>No risk of password breaches</li>
                    <li>Access controlled by your email inbox</li>
                    <li>Each login link is unique and time-limited</li>
                </ul>
            </div>
            
            <div class="security-note">
                <p style="margin: 0;"><strong>\u23F1\uFE0F Important:</strong> This link will expire in <span class="expiry-warning">15 minutes</span> for your security.</p>
                <p style="margin: 10px 0 0 0;">If it expires, simply return to the login page and request a new link.</p>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                <strong>Didn't request this login?</strong> You can safely ignore this email. The link will expire automatically.
            </p>
        </div>
        
        <div class="footer">
            <p>Your security is our priority.</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generateThankYouIntroductionHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Success Blueprint is Ready</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0057FF, #FFA500); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .urgency-box { background: #FFF4E6; border-left: 4px solid #FFA500; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .cta-button { display: inline-block; background: #FFA500; color: white; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 0; font-size: 18px; box-shadow: 0 4px 12px rgba(255,165,0,0.3); }
        .cta-button:hover { background: #FF8C00; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .benefit-box { background: #E0F2FE; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .stat-highlight { font-size: 24px; font-weight: bold; color: #0057FF; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F3AF} ${data.businessName}</h1>
            <p style="font-size: 20px; margin-top: 10px;">Your Digital Success Blueprint is Ready</p>
        </div>
        
        <div class="content">
            <p><strong>Here's the truth:</strong></p>
            
            <p>Right now, potential customers are searching for businesses like yours. They're reading reviews, checking social media, and deciding who to call.</p>
            
            <p><span class="stat-highlight">93%</span> won't even consider you if they can't verify your business online.</p>
            
            <div class="urgency-box">
                <p style="margin: 0;"><strong>\u26A1 The window is closing.</strong></p>
                <p style="margin: 10px 0 0 0;">Every day you wait, your competitors are capturing customers who should be yours. The businesses that act within 7 days see results 3x faster than those who delay.</p>
            </div>
            
            <h2 style="color: #0057FF;">What You Need Right Now</h2>
            
            <p>Based on your assessment, here's exactly what will move the needle for ${data.businessName}:</p>
            
            <div class="benefit-box">
                <h3 style="margin-top: 0; color: #0057FF;">\u{1F5FA}\uFE0F Step 1: Get Found (Week 1)</h3>
                <p><strong>Listings Management ($44/mo)</strong> - Your business information synced across 200+ directories. When someone searches, you show up. Consistently. Everywhere.</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Without this, you're invisible to 68% of local searchers.</p>
            </div>
            
            <div class="benefit-box">
                <h3 style="margin-top: 0; color: #0057FF;">\u2B50 Step 2: Build Trust (Week 2)</h3>
                <p><strong>Reviews Management ($25/mo)</strong> - Monitor every review, respond instantly with AI assistance, turn feedback into 5-star ratings.</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">88% of customers trust online reviews as much as personal recommendations.</p>
            </div>
            
            <div class="benefit-box">
                <h3 style="margin-top: 0; color: #0057FF;">\u{1F916} Step 3: Stay Consistent (Week 3)</h3>
                <p><strong>AI Business Coach (pay as you use)</strong> - Your 24/7 marketing strategist. Get personalized guidance, automate repetitive tasks, avoid costly mistakes.</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;"><em>Everyone gets the same expert-level guidance regardless of what they spend. You pay only for what you use.</em></p>
            </div>
            
            <h2 style="color: #0057FF; margin-top: 40px;">Two Paths Forward</h2>
            
            <p><strong>DIY Path:</strong> Start with Listings ($44) + Reviews ($25) = $69/mo. Add AI Coach when you need guidance. Perfect if you want hands-on control.</p>
            
            <p><strong>Done-For-You:</strong> Standard MSP ($313/mo) - We handle everything. 10 hours of expert work monthly. You focus on running your business while we build your digital presence.</p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/marketplace" class="cta-button">
                    \u{1F680} Start Building Your Presence Now
                </a>
            </div>
            
            <div class="urgency-box">
                <h3 style="color: #FFA500; margin-top: 0;">\u23F0 Limited Time: First Month Analysis Included</h3>
                <p style="margin: 0;">Subscribe in the next 48 hours and we'll include a comprehensive competitor analysis ($299 value) showing exactly where you stand and how to overtake them.</p>
            </div>
            
            <h3 style="color: #0057FF;">What Happens After You Subscribe:</h3>
            <ol>
                <li><strong>Instant Access:</strong> Your dashboard activates immediately</li>
                <li><strong>Quick Wins:</strong> We identify 3 changes you can make today for immediate impact</li>
                <li><strong>Week 1 Results:</strong> You'll see your first reviews come in and rankings improve</li>
                <li><strong>30-Day Guarantee:</strong> Not seeing results? Full refund, no questions asked</li>
            </ol>
            
            <p style="margin-top: 30px;"><strong>Questions? Text me directly:</strong> Just reply to this email and I'll personally respond within 2 hours.</p>
            
            <p>Your competitors aren't waiting. Don't let them win customers that should be yours.</p>
            
            <p><strong>Coach Blue \u{1F916}</strong><br>
            Business Blueprint AI<br>
            <em>P.S. - Check your inbox for your detailed assessment report. It shows exactly where you're losing customers right now.</em></p>
        </div>
        
        <div class="footer">
            <p>Business Blueprint - Turning Assessments Into Action</p>
            <p>Get Found \u2022 Get Customers \u2022 Get Business</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
  generateReviewAlertHTML(data) {
    const ratingColor = data.rating <= 2 ? "#DC2626" : data.rating >= 4 ? "#16A34A" : "#F59E0B";
    const sentiment = data.rating <= 2 ? "Negative" : data.rating >= 4 ? "Positive" : "Neutral";
    const stars = "\u2B50".repeat(data.rating);
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Review Alert</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: ${ratingColor}; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .review-box { background: #f8f9fa; padding: 20px; border-left: 4px solid ${ratingColor}; border-radius: 4px; margin: 20px 0; }
        .rating { font-size: 32px; margin: 10px 0; }
        .meta { color: #666; font-size: 14px; margin: 10px 0; }
        .cta-button { display: inline-block; background: ${ratingColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F514} New ${sentiment} Review</h1>
            <div class="rating">${stars}</div>
            <h2>${data.businessName}</h2>
        </div>
        
        <div class="content">
            <div class="meta">
                <strong>Platform:</strong> ${data.platform}<br>
                ${data.reviewerName ? `<strong>Reviewer:</strong> ${data.reviewerName}<br>` : ""}
                ${data.locationName ? `<strong>Location:</strong> ${data.locationName}<br>` : ""}
                <strong>Date:</strong> ${new Date(data.reviewDate).toLocaleDateString()}
            </div>
            
            <div class="review-box">
                <p><strong>Review:</strong></p>
                <p>${data.reviewText || "No text provided"}</p>
            </div>
            
            ${data.rating <= 2 ? `
            <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0;"><strong>\u26A0\uFE0F Action Required:</strong> This negative review requires immediate attention. Consider responding promptly to address the customer's concerns.</p>
            </div>
            ` : ""}
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL || "https://businessblueprint.io"}/dashboard" class="cta-button">
                    Respond to Review
                </a>
                <p style="margin-top: 15px; color: #666; font-size: 14px;">
                    Tip: Use our AI-powered response generator to craft the perfect reply.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>You're receiving this because you have review alerts enabled.</p>
            <p>Manage your notification preferences in your dashboard settings.</p>
            <p><small>\xA9 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
};

// server/services/inbox-email.ts
init_db();
init_schema();
import nodemailer2 from "nodemailer";
import { eq as eq8, and as and8 } from "drizzle-orm";
var InboxEmailService = class {
  transporter;
  constructor() {
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const isSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465;
    this.transporter = nodemailer2.createTransport({
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
    const [conversation] = await db.select().from(inboxConversations).where(eq8(inboxConversations.id, conversationId)).limit(1);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    if (conversation.primaryChannelType !== "email") {
      throw new Error("Conversation is not an email thread");
    }
    const [channelConnection] = await db.select().from(inboxChannelConnections).where(and8(
      eq8(inboxChannelConnections.clientId, conversation.clientId),
      eq8(inboxChannelConnections.channelType, "email"),
      eq8(inboxChannelConnections.status, "active")
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
      let conversation = await db.select().from(inboxConversations).where(and8(
        eq8(inboxConversations.clientId, data.clientId),
        eq8(inboxConversations.contactIdentifier, data.from),
        eq8(inboxConversations.primaryChannelType, "email")
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
        }).where(eq8(inboxConversations.id, conversationId));
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
- Current digital score: ${userContext.businessInfo.digitalScore}/100
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
- Digital score: ${context.businessInfo.digitalScore}/100
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
- Current Digital Score: ${context.businessInfo.digitalScore}/100

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
      nextMilestone: "Achieve a 70+ digital score"
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
import { eq as eq9 } from "drizzle-orm";
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
    const allProducts = await db.select().from(products).where(eq9(products.isActive, true));
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
    }).from(assessmentProductRecommendations).innerJoin(products, eq9(assessmentProductRecommendations.productId, products.id)).where(eq9(assessmentProductRecommendations.assessmentId, assessmentId));
    return recs;
  }
};
var productRecommendationService = new ProductRecommendationService();

// server/services/synup.ts
import synupSDK from "@mx-inventor/synup";

// server/services/synupMappings.ts
var BUSINESS_CATEGORIES = {
  "Restaurant": "383",
  // Confirmed from search results
  "Fast Food": "384",
  "Cafe": "385",
  "Bar": "386",
  "Retail": "400",
  "Clothing Store": "401",
  "Electronics Store": "402",
  "Grocery Store": "403",
  "Services": "420",
  "Hair Salon": "421",
  "Auto Repair": "422",
  "Cleaning Service": "423",
  "Healthcare": "440",
  "Doctor": "441",
  "Dentist": "442",
  "Pharmacy": "443",
  "Professional Services": "460",
  "Lawyer": "461",
  "Accountant": "462",
  "Real Estate": "463",
  "Automotive": "480",
  "Car Dealer": "481",
  "Auto Parts": "482",
  "Home Services": "500",
  "Plumber": "501",
  "Electrician": "502",
  "Contractor": "503",
  "Other": "999"
};
function getCategoryId(category) {
  const normalized = category.trim();
  if (BUSINESS_CATEGORIES[normalized]) {
    return BUSINESS_CATEGORIES[normalized];
  }
  const lowerCategory = normalized.toLowerCase();
  const matchingKey = Object.keys(BUSINESS_CATEGORIES).find(
    (key) => key.toLowerCase() === lowerCategory
  );
  return matchingKey ? BUSINESS_CATEGORIES[matchingKey] : null;
}
function formatPhoneNumber(phone) {
  return phone.replace(/\D/g, "");
}

// server/services/synup.ts
var SynupService = class {
  apiKey;
  sdk;
  // Synup SDK instance
  baseUrl = "https://api.synup.com/api/v4";
  // For raw API calls when SDK doesn't cover it
  constructor() {
    this.apiKey = process.env.SYNUP_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F SYNUP_API_KEY not configured - Synup integration will fail");
      this.sdk = null;
    } else {
      this.sdk = synupSDK(this.apiKey);
      console.log("\u2705 Synup SDK initialized with API key");
    }
  }
  /**
   * Validate Synup configuration
   */
  validateConfig() {
    if (!this.apiKey) {
      throw new Error("SYNUP_API_KEY environment variable is required");
    }
  }
  /**
   * Encode location ID to Base64 as required by Synup API
   */
  encodeLocationId(locationId) {
    return Buffer.from(locationId).toString("base64");
  }
  /**
   * Decode Base64 location ID from Synup API
   */
  decodeLocationId(encodedId) {
    return Buffer.from(encodedId, "base64").toString("utf-8");
  }
  /**
   * Make authenticated API request to Synup
   */
  async makeRequest(endpoint, method = "GET", body) {
    this.validateConfig();
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };
    const options = {
      method,
      headers
    };
    if (body && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        let errorData = {};
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { raw: errorText };
        }
        console.error(`\u{1F534} Synup API error details:`, {
          status: response.status,
          statusText: response.statusText,
          endpoint,
          method,
          requestBody: body,
          responseBody: errorData,
          responseBodyJSON: JSON.stringify(errorData, null, 2)
          // Expand nested objects
        });
        throw new Error(
          `Synup API error (${response.status}): ${errorData.message || errorData.error || response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(`Synup API request failed for ${endpoint}:`, error);
      throw error;
    }
  }
  /**
   * Get all locations for the account using Synup SDK
   * SDK Method: Locations.list()
   * Returns: GraphQL response with edges[] structure
   */
  async getAllLocations() {
    if (!this.sdk) {
      throw new Error("Synup SDK not initialized - SYNUP_API_KEY may be missing");
    }
    try {
      const response = await this.sdk.Locations.list();
      const edges = response.edges || [];
      const locations = edges.map((edge) => {
        const node = edge.node;
        return {
          id: node.accountId?.toString() || node.uid,
          name: node.name || node.businessName || "",
          address: `${node.street || ""}${node.street1 ? " " + node.street1 : ""}`.trim(),
          city: node.city || "",
          state: node.stateIso || node.stateName || "",
          country: node.countryIso || "",
          postalCode: node.postalCode || node.zipcode || "",
          phone: node.phone || node.primaryPhone || "",
          website: node.bizUrl || node.website || "",
          email: node.email || "",
          category: node.subCategoryName || node.categoryName || "",
          status: node.approved || "PENDING",
          createdAt: node.createdDate || (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: node.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
        };
      });
      console.log(`\u2705 Fetched ${locations.length} locations from Synup`);
      return locations;
    } catch (error) {
      console.error("Error fetching Synup locations:", error);
      throw new Error(`Failed to fetch locations from Synup: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  /**
   * Get a specific location by ID
   * Endpoint: GET /locations/{locationId}
   * @param locationId - Raw location ID (will be Base64 encoded for API call)
   */
  async getLocation(locationId) {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      const response = await this.makeRequest(`/locations/${encodedLocationId}`);
      const location = response.data?.location || response.location || null;
      if (location) {
        location.id = locationId;
      }
      return location;
    } catch (error) {
      console.error(`Error fetching Synup location ${locationId}:`, error);
      return null;
    }
  }
  /**
   * Create a new location in Synup using the official SDK
   * The SDK handles GraphQL formatting automatically
   */
  async createLocation(locationData) {
    if (!this.apiKey || this.apiKey.trim() === "") {
      console.warn("\u26A0\uFE0F Synup SDK: No valid API key - returning mock location for development");
      const mockLocation = {
        id: `mock-${Date.now()}`,
        name: locationData.name,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        postalCode: locationData.postalCode,
        phone: locationData.phone,
        website: locationData.website,
        email: locationData.email,
        category: locationData.category,
        status: "active",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return mockLocation;
    }
    try {
      let subCategoryId;
      if (locationData.category) {
        const mappedCategoryId = getCategoryId(locationData.category);
        if (mappedCategoryId) {
          subCategoryId = parseInt(mappedCategoryId);
        }
      }
      const formattedPhone = formatPhoneNumber(locationData.phone);
      const stateIso = this.getStateIso(locationData.state);
      const countryIso = locationData.country === "United States" ? "US" : locationData.country === "Canada" ? "CA" : locationData.country;
      const synupPayload = {
        name: locationData.name,
        street: locationData.address,
        city: locationData.city,
        stateIso,
        countryIso,
        postalCode: locationData.postalCode,
        phone: formattedPhone,
        subCategoryId,
        bizUrl: locationData.website || void 0,
        ownerEmail: locationData.email || void 0
      };
      console.log("\u{1F535} Synup SDK: Creating location with payload:", synupPayload);
      const synup = synupSDK(this.apiKey);
      const response = await synup.Locations.create(synupPayload);
      console.log("\u{1F7E2} Synup SDK: Location created successfully");
      return response;
    } catch (error) {
      console.error("\u{1F534} Synup SDK: Error creating location:", {
        message: error?.message || "Unknown error",
        status: error?.response?.status
      });
      return null;
    }
  }
  /**
   * Convert state name to ISO code
   */
  getStateIso(stateName) {
    const stateMap = {
      "Alabama": "AL",
      "Alaska": "AK",
      "Arizona": "AZ",
      "Arkansas": "AR",
      "California": "CA",
      "Colorado": "CO",
      "Connecticut": "CT",
      "Delaware": "DE",
      "Florida": "FL",
      "Georgia": "GA",
      "Hawaii": "HI",
      "Idaho": "ID",
      "Illinois": "IL",
      "Indiana": "IN",
      "Iowa": "IA",
      "Kansas": "KS",
      "Kentucky": "KY",
      "Louisiana": "LA",
      "Maine": "ME",
      "Maryland": "MD",
      "Massachusetts": "MA",
      "Michigan": "MI",
      "Minnesota": "MN",
      "Mississippi": "MS",
      "Missouri": "MO",
      "Montana": "MT",
      "Nebraska": "NE",
      "Nevada": "NV",
      "New Hampshire": "NH",
      "New Jersey": "NJ",
      "New Mexico": "NM",
      "New York": "NY",
      "North Carolina": "NC",
      "North Dakota": "ND",
      "Ohio": "OH",
      "Oklahoma": "OK",
      "Oregon": "OR",
      "Pennsylvania": "PA",
      "Rhode Island": "RI",
      "South Carolina": "SC",
      "South Dakota": "SD",
      "Tennessee": "TN",
      "Texas": "TX",
      "Utah": "UT",
      "Vermont": "VT",
      "Virginia": "VA",
      "Washington": "WA",
      "West Virginia": "WV",
      "Wisconsin": "WI",
      "Wyoming": "WY",
      // Canadian provinces
      "Alberta": "AB",
      "British Columbia": "BC",
      "Manitoba": "MB",
      "New Brunswick": "NB",
      "Newfoundland and Labrador": "NL",
      "Northwest Territories": "NT",
      "Nova Scotia": "NS",
      "Nunavut": "NU",
      "Ontario": "ON",
      "Prince Edward Island": "PE",
      "Quebec": "QC",
      "Saskatchewan": "SK",
      "Yukon": "YT"
    };
    return stateMap[stateName] || stateName;
  }
  /**
   * Get all listings for a location across all platforms
   * Uses SDK Listings methods
   */
  async getLocationListings(locationId) {
    if (!this.sdk) {
      console.warn("\u26A0\uFE0F Synup SDK not initialized");
      return [];
    }
    try {
      console.log(`\u{1F4CB} Fetching listings for location ${locationId}...`);
      let listings = [];
      try {
        const premiumListings = await this.sdk.Listings.getPremium(parseInt(locationId));
        if (premiumListings && premiumListings.length > 0) {
          listings = [...listings, ...premiumListings];
        }
      } catch (e) {
        console.log("Premium listings not available for this account");
      }
      try {
        const additionalListings = await this.sdk.Listings.getAdittional(parseInt(locationId));
        if (additionalListings && additionalListings.length > 0) {
          listings = [...listings, ...additionalListings];
        }
      } catch (e) {
        console.log("Additional listings not available for this account");
      }
      return listings.map((listing) => ({
        id: listing.id || listing.listingId,
        locationId,
        platform: listing.siteName || listing.platform || "unknown",
        status: listing.status || "pending",
        url: listing.url || listing.listingUrl,
        lastSynced: listing.lastSynced || (/* @__PURE__ */ new Date()).toISOString(),
        syncStatus: listing.syncStatus || "pending",
        visibility: listing.visibility !== false
      }));
    } catch (error) {
      console.error(`Error fetching listings for location ${locationId}:`, error);
      return [];
    }
  }
  /**
   * Sync/update a location's listings across all platforms
   * Endpoint: POST /locations/{locationId}/sync
   */
  async syncLocationListings(locationId) {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      await this.makeRequest(`/locations/${encodedLocationId}/sync`, "POST");
      return true;
    } catch (error) {
      console.error(`Error syncing listings for location ${locationId}:`, error);
      return false;
    }
  }
  /**
   * Get all reviews (interactions) for a location
   * Uses SDK Interactions methods
   */
  async getLocationReviews(locationId, options) {
    if (!this.sdk) {
      console.warn("\u26A0\uFE0F Synup SDK not initialized");
      return [];
    }
    try {
      console.log(`\u2B50 Fetching reviews for location ${locationId}...`);
      const response = await this.sdk.Interactions.getByLocationId(parseInt(locationId));
      const interactions = response?.edges?.map((edge) => edge.node) || response?.data?.interactions || response?.interactions || response || [];
      if (!Array.isArray(interactions)) {
        console.log("No reviews found or unexpected format:", typeof interactions);
        return [];
      }
      return interactions.map((interaction) => ({
        id: interaction.id || interaction.interactionId,
        locationId,
        platform: interaction.siteName || interaction.platform || interaction.source || "unknown",
        rating: interaction.rating || interaction.stars || 0,
        reviewText: interaction.text || interaction.reviewText || interaction.content || "",
        reviewerName: interaction.reviewerName || interaction.author || interaction.name || "Anonymous",
        reviewDate: interaction.createdAt || interaction.reviewDate || interaction.date || (/* @__PURE__ */ new Date()).toISOString(),
        response: interaction.response?.text || interaction.responseText || interaction.response,
        responseDate: interaction.response?.createdAt || interaction.responseDate,
        sentiment: this.calculateSentiment(interaction.rating || interaction.stars || 0),
        status: interaction.response ? "responded" : "new"
      }));
    } catch (error) {
      console.error(`Error fetching reviews for location ${locationId}:`, error);
      return [];
    }
  }
  /**
   * Calculate sentiment based on rating
   */
  calculateSentiment(rating) {
    if (rating >= 4) return "positive";
    if (rating <= 2) return "negative";
    return "neutral";
  }
  /**
   * Respond to an interaction (review) using Synup API
   * Endpoint: POST /interactions/{interactionId}/response
   */
  async respondToReview(reviewId, responseText, useAI = false) {
    try {
      const payload = {
        response: responseText,
        // Synup API may support AI flag - include for future compatibility
        ...useAI && { aiGenerated: true }
      };
      await this.makeRequest(`/interactions/${reviewId}/response`, "POST", payload);
      return true;
    } catch (error) {
      console.error(`Error responding to interaction ${reviewId}:`, error);
      return false;
    }
  }
  /**
   * Get interaction (review) analytics
   * Endpoint: GET /locations/{locationId}/interactions/analytics
   */
  async getReviewAnalytics(locationId) {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      const response = await this.makeRequest(`/locations/${encodedLocationId}/interactions/analytics`);
      return {
        averageRating: response.data?.averageRating || response.averageRating || 0,
        totalReviews: response.data?.totalInteractions || response.totalReviews || 0,
        positiveCount: response.data?.sentiment?.positive || response.sentiment?.positive || 0,
        negativeCount: response.data?.sentiment?.negative || response.sentiment?.negative || 0,
        neutralCount: response.data?.sentiment?.neutral || response.sentiment?.neutral || 0,
        platformBreakdown: response.data?.platformBreakdown || response.platformBreakdown || {}
      };
    } catch (error) {
      console.error(`Error fetching review analytics for location ${locationId}:`, error);
      return {
        averageRating: 0,
        totalReviews: 0,
        positiveCount: 0,
        negativeCount: 0,
        neutralCount: 0,
        platformBreakdown: {}
      };
    }
  }
  /**
   * Get listing sync status summary
   */
  async getListingSyncStatus(locationId) {
    try {
      const listings = await this.getLocationListings(locationId);
      return {
        totalListings: listings.length,
        published: listings.filter((l) => l.status === "published").length,
        pending: listings.filter((l) => l.status === "pending").length,
        errors: listings.filter((l) => l.status === "error").length,
        lastSyncDate: listings[0]?.lastSynced
      };
    } catch (error) {
      console.error(`Error getting sync status for location ${locationId}:`, error);
      return {
        totalListings: 0,
        published: 0,
        pending: 0,
        errors: 0
      };
    }
  }
  /**
   * Bulk update location information across all listings
   * Endpoint: PUT /locations/{locationId}
   */
  async bulkUpdateLocation(locationId, updates) {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      await this.makeRequest(`/locations/${encodedLocationId}`, "PUT", updates);
      return true;
    } catch (error) {
      console.error(`Error bulk updating location ${locationId}:`, error);
      return false;
    }
  }
};
var synupService = new SynupService();

// server/services/reviewMonitoring.ts
var ReviewMonitoringService = class {
  emailService;
  io;
  constructor(io) {
    this.emailService = new EmailService();
    this.io = io;
  }
  async processNewReview(review) {
    try {
      const location = await storage.getSynupLocation(review.locationId);
      if (!location) {
        console.error(`Location not found for review ${review.id}`);
        return;
      }
      const client2 = await storage.getClient(location.clientId);
      if (!client2) {
        console.error(`Client not found for location ${location.id}`);
        return;
      }
      let preferences = await storage.getReviewNotificationPreferences(location.clientId);
      if (!preferences) {
        preferences = await storage.createReviewNotificationPreferences({
          clientId: location.clientId,
          enableEmailAlerts: true,
          enableWebSocketAlerts: true,
          notifyOnNegativeReviews: true,
          minimumRatingThreshold: 2
        });
      }
      const shouldAlert = this.shouldSendAlert(review, preferences);
      if (!shouldAlert) {
        console.log(`Review ${review.id} does not meet alert criteria`);
        return;
      }
      if (preferences.enableEmailAlerts) {
        const alertEmail = preferences.alertEmail || client2.email;
        if (alertEmail) {
          await this.sendEmailAlert(review, location.name, client2.companyName, alertEmail);
        }
      }
      if (preferences.enableWebSocketAlerts && this.io) {
        this.sendWebSocketAlert(review, location.clientId, location.name);
      }
      console.log(`\u2705 Alert sent for review ${review.id} (Rating: ${review.rating}, Platform: ${review.platform})`);
    } catch (error) {
      console.error(`Error processing review alert for review ${review.id}:`, error);
    }
  }
  shouldSendAlert(review, preferences) {
    if (preferences.notifyOnAllReviews) {
      return true;
    }
    if (preferences.notifyOnNegativeReviews && review.rating <= (preferences.minimumRatingThreshold || 2)) {
      return true;
    }
    if (preferences.notifyOnPositiveReviews && review.rating >= 4) {
      return true;
    }
    return false;
  }
  async sendEmailAlert(review, locationName, businessName, email) {
    try {
      const alertData = {
        businessName,
        platform: review.platform,
        rating: review.rating,
        reviewText: review.reviewText || "No text provided",
        reviewerName: review.reviewerName || void 0,
        reviewDate: review.reviewDate,
        locationName
      };
      const success = await this.emailService.sendReviewAlert(email, alertData);
      if (success) {
        console.log(`\u{1F4E7} Email alert sent to ${email} for review on ${review.platform}`);
      } else {
        console.error(`Failed to send email alert to ${email}`);
      }
    } catch (error) {
      console.error("Error sending email alert:", error);
    }
  }
  sendWebSocketAlert(review, clientId, locationName) {
    try {
      if (!this.io) {
        console.warn("WebSocket server not available for review alerts");
        return;
      }
      const alertPayload = {
        type: "review:new",
        review: {
          id: review.id,
          platform: review.platform,
          rating: review.rating,
          reviewText: review.reviewText,
          reviewerName: review.reviewerName,
          reviewDate: review.reviewDate,
          locationName
        },
        timestamp: /* @__PURE__ */ new Date()
      };
      this.io.to(`client:${clientId}`).emit("review:alert", alertPayload);
      console.log(`\u{1F514} WebSocket alert sent to client:${clientId} for review on ${review.platform}`);
    } catch (error) {
      console.error("Error sending WebSocket alert:", error);
    }
  }
  async handleAutoResponse(review) {
    try {
      const location = await storage.getSynupLocation(review.locationId);
      if (!location) return;
      const preferences = await storage.getReviewNotificationPreferences(location.clientId);
      if (!preferences) return;
      const shouldAutoRespond = preferences.autoRespondPositive && review.rating >= 4 || preferences.autoRespondNegative && review.rating <= 2;
      if (shouldAutoRespond) {
        console.log(`\u{1F916} Auto-response triggered for review ${review.id} (Rating: ${review.rating})`);
      }
    } catch (error) {
      console.error("Error handling auto-response:", error);
    }
  }
};

// server/services/reviewAI.ts
import OpenAI3 from "openai";
var ReviewAIService = class {
  openai;
  model = "gpt-4o";
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    this.openai = new OpenAI3({ apiKey });
  }
  /**
   * Generate AI-powered response to a review
   */
  async generateReviewResponse(context, options = {}) {
    const {
      tone = this.determineTone(context.rating),
      maxLength = 200,
      includeCallToAction = true,
      language = "en"
    } = options;
    const sentiment = this.analyzeSentiment(context.rating);
    const prompt = this.buildPrompt(context, sentiment, tone, includeCallToAction, maxLength);
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: this.getSystemPrompt(language)
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: Math.ceil(maxLength * 1.5),
        // Buffer for token/word ratio
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      });
      const response = completion.choices[0]?.message?.content?.trim() || "";
      if (!response) {
        throw new Error("No response generated from AI");
      }
      return response;
    } catch (error) {
      console.error("Error generating AI review response:", error);
      return this.getFallbackResponse(context, sentiment);
    }
  }
  /**
   * Generate bulk responses for multiple reviews
   */
  async generateBulkResponses(reviews, options = {}) {
    const responses = /* @__PURE__ */ new Map();
    const batchSize = 5;
    for (let i = 0; i < reviews.length; i += batchSize) {
      const batch = reviews.slice(i, i + batchSize);
      const batchPromises = batch.map(async (review, index2) => {
        try {
          const response = await this.generateReviewResponse(review, options);
          return { key: `${i + index2}`, response };
        } catch (error) {
          console.error(`Error processing review ${i + index2}:`, error);
          return { key: `${i + index2}`, response: this.getFallbackResponse(review, this.analyzeSentiment(review.rating)) };
        }
      });
      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(({ key, response }) => {
        responses.set(key, response);
      });
    }
    return responses;
  }
  /**
   * Determine appropriate tone based on rating
   */
  determineTone(rating) {
    if (rating >= 4) return "enthusiastic";
    if (rating === 3) return "professional";
    return "empathetic";
  }
  /**
   * Analyze sentiment from rating
   */
  analyzeSentiment(rating) {
    if (rating >= 4) return "positive";
    if (rating <= 2) return "negative";
    return "neutral";
  }
  /**
   * Build AI prompt for review response
   */
  buildPrompt(context, sentiment, tone, includeCallToAction, maxLength) {
    const { reviewText, rating, platform, businessName, businessCategory, reviewerName } = context;
    return `Generate a ${tone} response to this ${sentiment} ${rating}-star customer review on ${platform}.

**Business Details:**
- Name: ${businessName}
${businessCategory ? `- Category: ${businessCategory}` : ""}

**Review:**
Rating: ${rating}/5 stars
${reviewerName ? `Reviewer: ${reviewerName}` : ""}
Review Text: "${reviewText}"

**Response Guidelines:**
- Tone: ${tone}
- Max length: ${maxLength} words
- ${sentiment === "positive" ? "Express genuine gratitude and reinforce positive experience" : ""}
- ${sentiment === "negative" ? "Acknowledge concerns, apologize sincerely, and offer solution" : ""}
- ${sentiment === "neutral" ? "Thank them for feedback and invite further engagement" : ""}
- ${includeCallToAction ? "Include subtle call-to-action (e.g., invite to return, contact for resolution)" : "Do not include call-to-action"}
- Be authentic and personalized (avoid generic templates)
- Use natural, conversational language
- ${reviewerName ? `Address ${reviewerName} by name` : "Use friendly greeting"}
- Reflect the business's professional image

Generate only the response text, no additional commentary.`;
  }
  /**
   * System prompt for AI model
   */
  getSystemPrompt(language) {
    return `You are an expert customer service representative and reputation management specialist. You craft professional, empathetic, and authentic responses to customer reviews that:

1. Build customer relationships and trust
2. Address concerns professionally and constructively
3. Reinforce positive experiences with genuine appreciation
4. Maintain the business's brand voice and values
5. Encourage future engagement and loyalty

Key Principles:
- Always be authentic and personalized
- Show genuine care for customer feedback
- Use specific details from the review (don't be generic)
- Balance professionalism with warmth
- For negative reviews: acknowledge, apologize, offer solution
- For positive reviews: express gratitude, highlight specifics
- Keep responses concise but meaningful

Language: ${language === "en" ? "English" : language}

Your responses should feel human-written, not AI-generated.`;
  }
  /**
   * Fallback response templates when AI fails
   */
  getFallbackResponse(context, sentiment) {
    const { reviewerName, businessName, rating } = context;
    const greeting = reviewerName ? `Hi ${reviewerName}` : "Hello";
    if (sentiment === "positive") {
      return `${greeting}, thank you so much for your wonderful ${rating}-star review! We're thrilled to hear about your positive experience with ${businessName}. Your feedback means the world to us, and we can't wait to serve you again soon!`;
    }
    if (sentiment === "negative") {
      return `${greeting}, thank you for sharing your feedback. We sincerely apologize that your experience with ${businessName} didn't meet expectations. We take your concerns seriously and would love the opportunity to make things right. Please reach out to us directly so we can address this properly.`;
    }
    return `${greeting}, thank you for taking the time to share your feedback about ${businessName}. We appreciate all input from our customers as it helps us improve. We'd love to hear more about your experience - please feel free to reach out to us directly.`;
  }
  /**
   * Validate review context before processing
   */
  validateContext(context) {
    if (!context.reviewText || context.reviewText.trim().length === 0) {
      return { valid: false, error: "Review text is required" };
    }
    if (context.rating < 1 || context.rating > 5) {
      return { valid: false, error: "Rating must be between 1 and 5" };
    }
    if (!context.businessName || context.businessName.trim().length === 0) {
      return { valid: false, error: "Business name is required" };
    }
    return { valid: true };
  }
};
var reviewAI = new ReviewAIService();

// server/routes.ts
init_jwt();
init_schema();
init_db();
import { eq as eq11, desc as desc4, and as and10 } from "drizzle-orm";
import { z as z3 } from "zod";

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
      maxAge: sessionTtl
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

// server/routes.ts
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
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
  const emailService = new EmailService();
  const synupService2 = new SynupService();
  app2.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(validatedData);
      processAssessmentAsync(assessment.id, googleService, aiService, emailService, storage);
      res.json({
        success: true,
        assessmentId: assessment.id,
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
      if (!["diy", "msp", "combination", "none"].includes(pathway)) {
        return res.status(400).json({ message: "Invalid pathway selection" });
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
      const emailSent = await emailService.sendPathwayReminderEmail(assessment.email, {
        businessName: assessment.businessName,
        digitalScore: assessment.digitalScore || 0,
        assessmentId: id
      });
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
      const subscriptions2 = await db.select().from(subscriptions2).where(eq11(subscriptions2.assessmentId, id));
      if (subscriptions2.length > 0) {
        return res.status(400).json({ message: "Subscription already exists" });
      }
      const pathwayNames = {
        "diy": "DIY Platform",
        "msp": "Managed Services Starter",
        "combination": "Combination Plan"
      };
      const monthlyPrices = {
        "diy": 49,
        "msp": 299,
        "combination": 199
      };
      const emailSent = await emailService.sendCheckoutAbandonmentEmail(assessment.email, {
        businessName: assessment.businessName,
        pathway: assessment.selectedPathway,
        planName: pathwayNames[assessment.selectedPathway],
        monthlyPrice: monthlyPrices[assessment.selectedPathway],
        assessmentId: id
      });
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
  app2.get("/api/clients/:id/dashboard", async (req, res) => {
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
  });
  app2.get("/api/admin/clients", isAuthenticated, async (req, res) => {
    try {
      const clients3 = await storage.getAllClients();
      res.json(clients3);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
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
      if (magicToken.used) {
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
      console.log("[Magic Link Verify] Found client:", client2 ? { id: client2.id, email: client2.email, idType: typeof client2.id } : "null");
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
      console.log("[Magic Link Verify] Client ID validation passed:", client2.id);
      await storage.markTokenAsUsed(token);
      console.log("[Magic Link Verify] Token marked as used");
      console.log("[Magic Link Verify] Updating client login tracking for ID:", client2.id);
      await storage.updateClient(client2.id, {
        lastLoginTime: /* @__PURE__ */ new Date(),
        loginCount: (client2.loginCount || 0) + 1
      });
      console.log("[Magic Link Verify] Login tracking updated");
      console.log("[Magic Link Verify] Creating dashboard token for client ID:", client2.id);
      const jwtToken = await jwtService.createDashboardToken(client2.id, client2.email);
      console.log("[Magic Link Verify] JWT token created successfully");
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
      res.status(500).json({
        success: false,
        message: "Verification failed. Please try again."
      });
    }
  });
  app2.get("/api/clients/:id", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId) || !isFinite(clientId)) {
        console.error("[GET /api/clients/:id] Invalid client ID:", req.params.id);
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
  });
  app2.get("/api/clients/:id/campaign-data", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId) || !isFinite(clientId)) {
        console.error("[GET /api/clients/:id/campaign-data] Invalid client ID:", req.params.id);
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
  });
  app2.get("/api/clients/:id/messages", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit) || 50;
      const messages = await storage.getClientMessages(clientId, limit);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
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
      const [dashboardRecord] = await db.select().from(dashboardAccess).where(eq11(dashboardAccess.accessToken, token));
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
      const client2 = await storage.getClientByEmail(normalizedEmail);
      if (!client2) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email address. Please check your email or contact support."
        });
      }
      const token = randomBytes(32).toString("hex");
      const expiresAt = /* @__PURE__ */ new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      await storage.createMagicLinkToken({
        email: normalizedEmail,
        token,
        expiresAt
      });
      const frontendUrl = process.env.FRONTEND_URL || "https://businessblueprint.io";
      const magicLink = `${frontendUrl}/portal/verify?token=${token}`;
      const emailService2 = new EmailService();
      emailService2.sendMagicLinkEmail(
        normalizedEmail,
        magicLink,
        client2.companyName
      ).then((sent) => {
        if (sent) {
          console.log(`\u2705 Magic link email sent to ${normalizedEmail}`);
        } else {
          console.warn(`\u26A0\uFE0F Failed to send email to ${normalizedEmail}. Magic link: ${magicLink}`);
        }
      }).catch((err) => {
        console.error(`\u274C Error sending magic link email to ${normalizedEmail}:`, err.message);
      });
      res.json({
        success: true,
        message: "Check your email! We've sent you a secure login link.",
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
      const plans = await db.select().from(subscriptionPlans).where(eq11(subscriptionPlans.isActive, true));
      res.json({
        success: true,
        plans: plans.map((plan) => ({
          ...plan,
          features: Array.isArray(plan.features) ? plan.features : [],
          popular: plan.tierLevel === "professional",
          recommended: plan.pathway === "msp" && plan.tierLevel === "basic"
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
      const addons = await db.select().from(subscriptionAddons).where(eq11(subscriptionAddons.isActive, true));
      const categoryIconMap = {
        "seo": "Globe",
        "social": "Users",
        "ppc": "Zap",
        "content": "Sparkles",
        "email": "Users",
        "reputation": "Star",
        "analytics": "Sparkles",
        "website": "Globe",
        "ai-coach": "Brain",
        "coaching": "Ship"
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
      const orderSchema = z3.object({
        items: z3.array(z3.object({
          id: z3.string(),
          name: z3.string(),
          price: z3.number(),
          quantity: z3.number(),
          type: z3.enum(["app", "addon"])
        })),
        paymentToken: z3.string().min(16, "Valid payment token required"),
        customerInfo: z3.object({
          firstName: z3.string().min(1, "First name is required"),
          lastName: z3.string().min(1, "Last name is required"),
          email: z3.string().email("Valid email required"),
          phone: z3.string().optional(),
          address: z3.string().optional(),
          city: z3.string().optional(),
          state: z3.string().optional(),
          zip: z3.string().optional()
        }),
        totals: z3.object({
          subtotal: z3.number(),
          tax: z3.number(),
          total: z3.number()
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
      const calculatedSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      const { planId, addons: selectedAddons = [], billingCycle = "monthly" } = req.body;
      if (!planId) {
        return res.status(400).json({
          success: false,
          message: "Plan ID is required"
        });
      }
      const plan = await db.select().from(subscriptionPlans).where(eq11(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq11(subscriptionAddons.isActive, true));
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
      const { assessmentId, pathway, productIds = [], billingCycle = "monthly" } = req.body;
      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required"
        });
      }
      const planIdMap = {
        "diy": "diy-platform",
        "msp": "msp-starter",
        "combination": "msp-starter"
      };
      const planStringId = planIdMap[pathway];
      const [plan] = await db.select().from(subscriptionPlans).where(eq11(subscriptionPlans.planId, planStringId)).limit(1);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found for pathway"
        });
      }
      const { products: productsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { inArray: inArray2 } = await import("drizzle-orm");
      let selectedProducts = [];
      let productsTotal = 0;
      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable).where(inArray2(productsTable.id, productIds));
        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = pathway === "diy" ? parseFloat(product.diyPrice || "0") : parseFloat(product.mspPrice || "0");
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
          const monthlyPrice = pathway === "diy" ? parseFloat(product.diyPrice || "0") : parseFloat(product.mspPrice || "0");
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
      const { assessmentId, pathway, productIds = [], billingCycle = "monthly" } = req.body;
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
        "diy": "diy-platform",
        "msp": "msp-starter",
        "combination": "msp-starter"
      };
      const planStringId = planIdMap[pathway];
      const [plan] = await db.select().from(subscriptionPlans).where(eq11(subscriptionPlans.planId, planStringId)).limit(1);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const { products: productsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { inArray: inArray2 } = await import("drizzle-orm");
      let selectedProducts = [];
      let productsTotal = 0;
      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable).where(inArray2(productsTable.id, productIds));
        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = pathway === "diy" ? parseFloat(product.diyPrice || "0") : parseFloat(product.mspPrice || "0");
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
        const pathwayName = pathway === "msp" ? "Managed Services" : "DIY Platform";
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
      const [subscription] = await db.select().from(subscriptions).where(eq11(subscriptions.id, parseInt(id)));
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
          daysRemaining: isTrialActive && subscription.trialPeriodEnd ? Math.ceil((subscription.trialPeriodEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1e3)) : 0
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
      const subscriptionSchema = z3.object({
        planId: z3.string().min(1, "Plan ID is required"),
        addons: z3.array(z3.object({
          addonId: z3.string(),
          quantity: z3.number().optional()
        })).default([]),
        billingCycle: z3.enum(["monthly", "quarterly", "annual"]),
        paymentToken: z3.string().min(16, "Valid payment token required"),
        customerInfo: z3.object({
          firstName: z3.string().min(1, "First name is required"),
          lastName: z3.string().min(1, "Last name is required"),
          email: z3.string().email("Valid email required"),
          phone: z3.string().optional(),
          address: z3.string().optional(),
          city: z3.string().optional(),
          state: z3.string().optional(),
          zip: z3.string().optional()
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
      const plan = await db.select().from(subscriptionPlans).where(eq11(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq11(subscriptionAddons.isActive, true));
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
        mspPrice: rec.product.mspPrice,
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
      const { eq: eq14, and: and13 } = await import("drizzle-orm");
      const conditions = [eq14(products2.isActive, true)];
      if (category) {
        conditions.push(eq14(products2.category, category));
      }
      const allProducts = await db.select().from(products2).where(and13(...conditions));
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
      const { eq: eq14 } = await import("drizzle-orm");
      const [product] = await db.select().from(products2).where(eq14(products2.id, productId));
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
  app2.post("/api/synup/locations", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      if (!req.body.synupLocationId) {
        return res.status(400).json({
          success: false,
          message: "synupLocationId is required"
        });
      }
      const { synupLocationId } = req.body;
      const existingLocation = await storage.getSynupLocationBySynupId(synupLocationId);
      if (existingLocation) {
        if (existingLocation.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: This location is already associated with another account"
          });
        }
        return res.json({
          success: true,
          location: existingLocation,
          message: "Location already synced"
        });
      }
      const synupLocation = await synupService2.getLocation(synupLocationId);
      if (!synupLocation) {
        return res.status(404).json({
          success: false,
          message: "Location not found in Synup"
        });
      }
      const client2 = await storage.getClient(clientId);
      if (!client2 || !client2.companyName) {
        console.error(`\u274C Cannot verify location ownership: Client ${clientId} has no company name set`);
        return res.status(400).json({
          success: false,
          message: "Your account must have a company name set before syncing locations. Please update your profile."
        });
      }
      const nameMatch = synupLocation.name.toLowerCase().includes(client2.companyName.toLowerCase()) || client2.companyName.toLowerCase().includes(synupLocation.name.toLowerCase());
      if (!nameMatch) {
        console.error(`\u274C Security: Location name mismatch - Client "${client2.companyName}" attempted to sync location "${synupLocation.name}"`);
        return res.status(403).json({
          success: false,
          message: "Location business name does not match your account. If this is your business, please contact support."
        });
      }
      console.log(`\u2705 Business name verified: "${client2.companyName}" matches "${synupLocation.name}"`);
      const locationData = insertSynupLocationSchema.parse({
        clientId,
        synupLocationId: synupLocation.id,
        name: synupLocation.name,
        address: synupLocation.address,
        city: synupLocation.city,
        state: synupLocation.state,
        country: synupLocation.country,
        postalCode: synupLocation.postalCode,
        phone: synupLocation.phone,
        website: synupLocation.website || null,
        email: synupLocation.email || null,
        category: synupLocation.category || null,
        status: "active"
      });
      const location = await storage.createSynupLocation(locationData);
      await synupService2.syncLocationListings(synupLocationId);
      res.json({
        success: true,
        location,
        message: "Location synced successfully. Listings sync initiated."
      });
    } catch (error) {
      console.error("Error creating Synup location:", error);
      if (error instanceof z3.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create location"
      });
    }
  });
  app2.get("/api/synup/locations", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const locations = await storage.getSynupLocationsByClient(clientId);
      res.json({
        success: true,
        locations
      });
    } catch (error) {
      console.error("Error fetching Synup locations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch locations"
      });
    }
  });
  app2.put("/api/synup/locations/:locationId", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }
      const updateData = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone,
        website: req.body.website
      };
      const updatedLocation = await storage.updateSynupLocation(locationId, updateData);
      res.json({
        success: true,
        location: updatedLocation,
        message: "Location updated successfully"
      });
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update location"
      });
    }
  });
  app2.get("/api/synup/locations/:locationId/listings", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }
      const listings = await storage.getSynupListingsByLocation(locationId);
      res.json({
        success: true,
        listings
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch listings"
      });
    }
  });
  app2.post("/api/synup/locations/:locationId/sync-listings", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }
      const location = await storage.getSynupLocation(locationId);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: "Location not found"
        });
      }
      if (location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied: This location does not belong to your account"
        });
      }
      const synupListings2 = await synupService2.getLocationListings(location.synupLocationId);
      const updatedListings = [];
      for (const listing of synupListings2) {
        const listingData = insertSynupListingSchema.parse({
          locationId,
          synupListingId: listing.id,
          platform: listing.platform,
          status: listing.status,
          url: listing.url || null,
          lastSynced: /* @__PURE__ */ new Date(),
          syncStatus: "success",
          visibility: listing.visibility !== false
        });
        const existingListings = await storage.getSynupListingsByLocation(locationId);
        const existing = existingListings.find((l) => l.synupListingId === listing.id);
        if (existing) {
          const updated = await storage.updateSynupListing(existing.id, listingData);
          updatedListings.push(updated);
        } else {
          const created = await storage.createSynupListing(listingData);
          updatedListings.push(created);
        }
      }
      res.json({
        success: true,
        listings: updatedListings,
        message: `Synced ${updatedListings.length} listings successfully`
      });
    } catch (error) {
      console.error("Error syncing listings:", error);
      if (error instanceof z3.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to sync listings"
      });
    }
  });
  app2.get("/api/synup/locations/:locationId/reviews", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }
      const reviews = await storage.getSynupReviewsByLocation(locationId);
      res.json({
        success: true,
        reviews
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch reviews"
      });
    }
  });
  app2.post("/api/synup/locations/:locationId/sync-reviews", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }
      const location = await storage.getSynupLocation(locationId);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: "Location not found"
        });
      }
      if (location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied: This location does not belong to your account"
        });
      }
      const synupReviews2 = await synupService2.getLocationReviews(location.synupLocationId);
      const updatedReviews = [];
      for (const review of synupReviews2) {
        const reviewData = insertSynupReviewSchema.parse({
          locationId,
          synupReviewId: review.id,
          platform: review.platform,
          rating: review.rating,
          reviewText: review.reviewText || null,
          reviewerName: review.reviewerName || null,
          reviewerAvatar: null,
          // Not provided by Synup API
          reviewDate: new Date(review.reviewDate),
          response: review.response || null,
          responseDate: review.responseDate ? new Date(review.responseDate) : null,
          sentiment: review.sentiment || null,
          status: review.response ? "responded" : "new"
        });
        const existingReviews = await storage.getSynupReviewsByLocation(locationId);
        const existing = existingReviews.find((r) => r.synupReviewId === review.id);
        if (existing) {
          const updated = await storage.updateSynupReview(existing.id, reviewData);
          updatedReviews.push(updated);
        } else {
          const created = await storage.createSynupReview(reviewData);
          updatedReviews.push(created);
          const io = global.io;
          const reviewMonitoring = new ReviewMonitoringService(io);
          reviewMonitoring.processNewReview(created).catch(
            (err) => console.error("Error processing review alert:", err)
          );
        }
      }
      res.json({
        success: true,
        reviews: updatedReviews,
        message: `Synced ${updatedReviews.length} reviews successfully`
      });
    } catch (error) {
      console.error("Error syncing reviews:", error);
      if (error instanceof z3.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to sync reviews"
      });
    }
  });
  app2.post("/api/synup/reviews/:reviewId/respond", requireAuth, async (req, res) => {
    try {
      const reviewId = parseInt(req.params.reviewId);
      if (isNaN(reviewId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID"
        });
      }
      const { response, useAI } = req.body;
      if (!useAI && !response) {
        return res.status(400).json({
          success: false,
          message: "Either response text or useAI flag is required"
        });
      }
      const review = await storage.getSynupReview(reviewId);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found"
        });
      }
      const location = await storage.getSynupLocation(review.locationId);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: "Location not found"
        });
      }
      if (location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied: This review does not belong to your account"
        });
      }
      let finalResponse = response;
      let isAIGenerated = useAI || false;
      if (useAI && !response) {
        const location2 = await storage.getSynupLocation(review.locationId);
        const client2 = location2 ? await storage.getClient(location2.clientId) : null;
        try {
          if (!review.reviewText) {
            return res.status(400).json({
              success: false,
              message: "Review text is required to generate AI response"
            });
          }
          finalResponse = await reviewAI.generateReviewResponse({
            reviewText: review.reviewText,
            rating: review.rating,
            platform: review.platform,
            businessName: client2?.companyName || location2?.name || "our business",
            businessCategory: location2?.category || void 0,
            reviewerName: review.reviewerName || void 0
          }, {
            tone: review.rating >= 4 ? "enthusiastic" : review.rating <= 2 ? "empathetic" : "professional",
            maxLength: 200,
            includeCallToAction: true
          });
          console.log(`\u2705 AI-generated response for review ${reviewId}: ${finalResponse.substring(0, 50)}...`);
        } catch (error) {
          console.error(`Error generating AI response for review ${reviewId}:`, error);
          return res.status(500).json({
            success: false,
            message: "Failed to generate AI response. Please try again or provide a manual response."
          });
        }
      }
      await synupService2.respondToReview(review.synupReviewId, finalResponse || "", isAIGenerated);
      const updatedReview = await storage.updateSynupReview(reviewId, {
        response: finalResponse,
        responseDate: /* @__PURE__ */ new Date(),
        status: "responded",
        isAIGenerated
      });
      res.json({
        success: true,
        review: updatedReview,
        message: "Response submitted successfully"
      });
    } catch (error) {
      console.error("Error responding to review:", error);
      if (error instanceof z3.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to respond to review"
      });
    }
  });
  app2.get("/api/synup/locations/:locationId/analytics", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }
      const reviews = await storage.getSynupReviewsByLocation(locationId);
      const totalReviews = reviews.length;
      const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
      const positiveCount = reviews.filter((r) => r.sentiment === "positive" || r.rating >= 4).length;
      const negativeCount = reviews.filter((r) => r.sentiment === "negative" || r.rating <= 2).length;
      const neutralCount = reviews.filter((r) => r.sentiment === "neutral" || r.rating === 3).length;
      const platformBreakdown = {};
      reviews.forEach((r) => {
        platformBreakdown[r.platform] = (platformBreakdown[r.platform] || 0) + 1;
      });
      const respondedCount = reviews.filter((r) => r.status === "responded").length;
      const responseRate = totalReviews > 0 ? respondedCount / totalReviews * 100 : 0;
      const aiResponseCount = reviews.filter((r) => r.isAIGenerated).length;
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentReviews = reviews.filter((r) => new Date(r.reviewDate) >= thirtyDaysAgo);
      res.json({
        success: true,
        analytics: {
          totalReviews,
          averageRating: Math.round(averageRating * 10) / 10,
          sentiment: {
            positive: positiveCount,
            negative: negativeCount,
            neutral: neutralCount
          },
          platformBreakdown,
          responseMetrics: {
            totalResponded: respondedCount,
            responseRate: Math.round(responseRate * 10) / 10,
            aiGeneratedResponses: aiResponseCount
          },
          recentActivity: {
            last30Days: recentReviews.length,
            averageRatingLast30Days: recentReviews.length > 0 ? Math.round(recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length * 10) / 10 : 0
          }
        }
      });
    } catch (error) {
      console.error("Error fetching review analytics:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch review analytics"
      });
    }
  });
  app2.get("/api/synup/locations/:locationId/review-trends", requireAuth, async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      const { period = "30" } = req.query;
      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }
      const reviews = await storage.getSynupReviewsByLocation(locationId);
      const days = parseInt(period);
      const startDate = /* @__PURE__ */ new Date();
      startDate.setDate(startDate.getDate() - days);
      const periodReviews = reviews.filter((r) => new Date(r.reviewDate) >= startDate);
      const trends = {};
      periodReviews.forEach((review) => {
        const date = new Date(review.reviewDate).toISOString().split("T")[0];
        if (!trends[date]) {
          trends[date] = { count: 0, averageRating: 0, ratings: [] };
        }
        trends[date].count++;
        trends[date].ratings.push(review.rating);
      });
      Object.keys(trends).forEach((date) => {
        const ratings = trends[date].ratings;
        trends[date].averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      });
      res.json({
        success: true,
        trends: Object.entries(trends).map(([date, data]) => ({
          date,
          count: data.count,
          averageRating: Math.round(data.averageRating * 10) / 10
        })).sort((a, b) => a.date.localeCompare(b.date))
      });
    } catch (error) {
      console.error("Error fetching review trends:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch review trends"
      });
    }
  });
  app2.get("/api/review-notifications/preferences", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      let preferences = await storage.getReviewNotificationPreferences(clientId);
      if (!preferences) {
        preferences = await storage.createReviewNotificationPreferences({
          clientId,
          enableEmailAlerts: true,
          enableWebSocketAlerts: true,
          notifyOnNegativeReviews: true,
          minimumRatingThreshold: 2
        });
      }
      res.json({
        success: true,
        preferences
      });
    } catch (error) {
      console.error("Error fetching review notification preferences:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch notification preferences"
      });
    }
  });
  app2.put("/api/review-notifications/preferences", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const validatedData = insertReviewNotificationPreferencesSchema.partial().parse(req.body);
      let preferences = await storage.getReviewNotificationPreferences(clientId);
      if (!preferences) {
        preferences = await storage.createReviewNotificationPreferences({
          clientId,
          ...validatedData
        });
      } else {
        preferences = await storage.updateReviewNotificationPreferences(clientId, validatedData);
      }
      res.json({
        success: true,
        preferences,
        message: "Notification preferences updated successfully"
      });
    } catch (error) {
      console.error("Error updating review notification preferences:", error);
      if (error instanceof z3.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to update notification preferences"
      });
    }
  });
  app2.post("/api/send/contacts", requireAuth, async (req, res) => {
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
  });
  app2.get("/api/send/contacts", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const limit = Math.min(parseInt(req.query.limit) || 100, 1e3);
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
  });
  app2.get("/api/send/contacts/:id", requireAuth, async (req, res) => {
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
  });
  app2.patch("/api/send/contacts/:id", requireAuth, async (req, res) => {
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
  });
  app2.delete("/api/send/contacts/:id", requireAuth, async (req, res) => {
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
  });
  app2.post("/api/send/lists", requireAuth, async (req, res) => {
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
  });
  app2.get("/api/send/lists", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const limit = Math.min(parseInt(req.query.limit) || 100, 1e3);
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
  });
  app2.get("/api/send/lists/:id", requireAuth, async (req, res) => {
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
  });
  app2.patch("/api/send/lists/:id", requireAuth, async (req, res) => {
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
  });
  app2.delete("/api/send/lists/:id", requireAuth, async (req, res) => {
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
  });
  app2.post("/api/send/lists/:listId/contacts/:contactId", requireAuth, async (req, res) => {
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
      res.json({ success: true, message: "Contact added to list successfully" });
    } catch (error) {
      console.error("Error adding contact to list:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add contact to list"
      });
    }
  });
  app2.delete("/api/send/lists/:listId/contacts/:contactId", requireAuth, async (req, res) => {
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
      res.json({ success: true, message: "Contact removed from list successfully" });
    } catch (error) {
      console.error("Error removing contact from list:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove contact from list"
      });
    }
  });
  app2.get("/api/send/lists/:listId/contacts", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const listId = parseInt(req.params.listId);
      const limit = Math.min(parseInt(req.query.limit) || 100, 1e3);
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
  });
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
  app2.use("/api/tasks", tasksRouter);
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
    const googleData = await googleService.searchBusiness(
      assessment.businessName,
      assessment.address
    );
    const presenceScore = googleService.calculatePresenceScore(googleData);
    const productRecommendations = await productRecommendationService.generateRecommendations(
      assessmentId,
      {
        visibility: presenceScore.scores.visibility,
        reviews: presenceScore.scores.reviews,
        completeness: presenceScore.scores.completeness,
        engagement: presenceScore.scores.engagement,
        overall: presenceScore.overallScore
      }
    );
    await productRecommendationService.saveRecommendations(assessmentId, productRecommendations);
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
    await storage2.updateAssessment(assessmentId, {
      googleBusinessData: googleData,
      analysisResults: analysisResult,
      digitalScore: analysisResult.digitalScore,
      status: "completed"
    });
    for (const rec of analysisResult.recommendations) {
      await storage2.createRecommendation({
        assessmentId,
        category: rec.category,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        estimatedImpact: rec.estimatedImpact,
        estimatedEffort: rec.estimatedEffort
      });
    }
    const emailSent = await emailService.sendAssessmentReport(assessment.email, {
      businessName: assessment.businessName,
      digitalScore: analysisResult.digitalScore,
      summary: analysisResult.summary,
      recommendations: analysisResult.recommendations,
      assessmentId
    });
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
      res.json({
        success: true,
        session: {
          id: session2.id,
          sessionId: session2.sessionId,
          conversationId: session2.conversationId,
          status: session2.status
        }
      });
    } catch (error) {
      if (error instanceof z3.ZodError) {
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
  app2.get("/api/inbox/conversations", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const conversations = await db.select().from(inboxConversations).where(eq11(inboxConversations.clientId, clientId)).orderBy(desc4(inboxConversations.updatedAt));
      const conversationsWithMessages = await Promise.all(
        conversations.map(async (conv) => {
          const lastMessage = await db.select().from(inboxMessages2).where(eq11(inboxMessages2.conversationId, conv.id)).orderBy(desc4(inboxMessages2.createdAt)).limit(1);
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
  });
  app2.get("/api/inbox/conversations/:conversationId/messages", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const conversationId = parseInt(req.params.conversationId);
      const [conversation] = await db.select().from(inboxConversations).where(and10(
        eq11(inboxConversations.id, conversationId),
        eq11(inboxConversations.clientId, clientId)
      )).limit(1);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found or access denied" });
      }
      const messages = await db.select().from(inboxMessages2).where(eq11(inboxMessages2.conversationId, conversationId)).orderBy(inboxMessages2.createdAt);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });
  app2.post("/api/inbox/send-message", requireAuth, async (req, res) => {
    try {
      const clientId = req.clientId;
      const { conversationId, message } = req.body;
      if (!conversationId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const [conversation] = await db.select().from(inboxConversations).where(and10(
        eq11(inboxConversations.id, conversationId),
        eq11(inboxConversations.clientId, clientId)
      )).limit(1);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found or access denied" });
      }
      const agentName = "Agent";
      const agentEmail = "agent@businessblueprint.io";
      let deliveryStatus = "sent";
      let errorMessage = null;
      if (conversation.primaryChannelType === "email") {
        try {
          await inboxEmailService.sendMessage(conversationId, message, agentName);
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
      await db.update(inboxConversations).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq11(inboxConversations.id, conversationId));
      res.json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  app2.post("/api/biif/create-location", async (req, res) => {
    try {
      console.log("\u{1F4CD} BIIF: Received location creation request:", req.body);
      const locationData = z3.object({
        name: z3.string(),
        address: z3.string(),
        city: z3.string(),
        state: z3.string(),
        postalCode: z3.string(),
        country: z3.string().default("US"),
        phone: z3.string(),
        website: z3.string().optional(),
        email: z3.string().optional(),
        category: z3.string(),
        description: z3.string().optional()
      }).parse(req.body);
      console.log("\u{1F4CD} BIIF: Creating location in Synup...", locationData.name);
      const biifSynupService = new SynupService();
      const synupLocation = await biifSynupService.createLocation(locationData);
      if (!synupLocation) {
        console.error("\u274C BIIF: Synup API returned null - location creation failed");
        return res.status(500).json({
          success: false,
          error: "Unable to create location. Please verify your Synup API credentials are configured correctly."
        });
      }
      console.log("\u2705 BIIF: Location created in Synup:", synupLocation.id);
      const location = await storage.createSynupLocation({
        clientId: 1,
        synupLocationId: synupLocation.id,
        name: locationData.name,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        postalCode: locationData.postalCode,
        phone: locationData.phone,
        website: locationData.website || null,
        email: locationData.email || null,
        category: locationData.category
      });
      console.log("\u2705 BIIF: Location stored in database:", location.id);
      res.json({
        success: true,
        location,
        message: "Location created and syncing to 200+ directories"
      });
    } catch (error) {
      console.error("\u274C BIIF: Error creating location:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to create location"
      });
    }
  });
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
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
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
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
      const clientTemplate = path2.resolve(
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
  const distPath = path2.resolve(import.meta.dirname, "..", "dist", "public");
  const indexPath = path2.join(distPath, "index.html");
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
import { eq as eq12, and as and11 } from "drizzle-orm";
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
          await db.update(livechatSessions).set({ conversationId }).where(eq12(livechatSessions.sessionId, data.sessionId));
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
          unreadCount: db.$count(inboxMessages2, eq12(inboxMessages2.conversationId, conversationId)),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq12(inboxConversations.id, conversationId));
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
        const [conversation] = await db.select().from(inboxConversations).where(eq12(inboxConversations.id, data.conversationId)).limit(1);
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
        }).where(eq12(inboxConversations.id, data.conversationId));
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
          and11(
            eq12(inboxMessages2.conversationId, data.conversationId),
            eq12(inboxMessages2.direction, "inbound")
          )
        );
        await db.update(inboxConversations).set({ unreadCount: 0 }).where(eq12(inboxConversations.id, data.conversationId));
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
        const [session2] = await db.select().from(livechatSessions).where(eq12(livechatSessions.sessionId, sessionId)).limit(1);
        if (session2 && session2.conversationId) {
          const messages = await db.select().from(inboxMessages2).where(eq12(inboxMessages2.conversationId, session2.conversationId)).orderBy(inboxMessages2.createdAt);
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
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
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

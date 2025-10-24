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
  insertAssessmentProductRecommendationSchema: () => insertAssessmentProductRecommendationSchema,
  insertAssessmentSchema: () => insertAssessmentSchema,
  insertBillingHistorySchema: () => insertBillingHistorySchema,
  insertBrandAssetSchema: () => insertBrandAssetSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertChannelConnectionSchema: () => insertChannelConnectionSchema,
  insertClientSchema: () => insertClientSchema,
  insertConversationSchema: () => insertConversationSchema,
  insertDnsRecordSchema: () => insertDnsRecordSchema,
  insertDomainSchema: () => insertDomainSchema,
  insertDomainTransferSchema: () => insertDomainTransferSchema,
  insertEmailChangeHistorySchema: () => insertEmailChangeHistorySchema,
  insertImpersonationAuditSchema: () => insertImpersonationAuditSchema,
  insertImpersonationSessionSchema: () => insertImpersonationSessionSchema,
  insertInboxMessage2Schema: () => insertInboxMessage2Schema,
  insertInboxMessageSchema: () => insertInboxMessageSchema,
  insertLivechatSessionSchema: () => insertLivechatSessionSchema,
  insertProductSchema: () => insertProductSchema,
  insertQuickReplySchema: () => insertQuickReplySchema,
  insertRecommendationSchema: () => insertRecommendationSchema,
  insertReviewNotificationPreferencesSchema: () => insertReviewNotificationPreferencesSchema,
  insertSendAutomationSchema: () => insertSendAutomationSchema,
  insertSendCampaignSchema: () => insertSendCampaignSchema,
  insertSendContactSchema: () => insertSendContactSchema,
  insertSendListSchema: () => insertSendListSchema,
  insertSendTemplateSchema: () => insertSendTemplateSchema,
  insertSubscriptionAddonSchema: () => insertSubscriptionAddonSchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertSubscriptionSchema: () => insertSubscriptionSchema,
  insertSynupListingSchema: () => insertSynupListingSchema,
  insertSynupLocationSchema: () => insertSynupLocationSchema,
  insertSynupReviewSchema: () => insertSynupReviewSchema,
  livechatSessions: () => livechatSessions,
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
  subscriptionAddonSelections: () => subscriptionAddonSelections,
  subscriptionAddons: () => subscriptionAddons,
  subscriptionPlans: () => subscriptionPlans,
  subscriptions: () => subscriptions,
  synupListings: () => synupListings,
  synupLocations: () => synupLocations,
  synupReviews: () => synupReviews,
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
var sessions, users, assessments, recommendations, clients, inboxMessages, campaigns, emailChangeHistory, dashboardAccess, clientAssessments, synupLocations, synupListings, synupReviews, reviewNotificationPreferences, insertAssessmentSchema, insertRecommendationSchema, insertClientSchema, insertEmailChangeHistorySchema, insertInboxMessageSchema, insertCampaignSchema, insertSynupLocationSchema, insertSynupListingSchema, insertSynupReviewSchema, insertReviewNotificationPreferencesSchema, subscriptionPlans, subscriptionAddons, subscriptions, subscriptionAddonSelections, products, assessmentProductRecommendations, billingHistory, insertSubscriptionPlanSchema, insertSubscriptionAddonSchema, insertSubscriptionSchema, insertBillingHistorySchema, insertProductSchema, insertAssessmentProductRecommendationSchema, sendContacts, sendLists, sendListContacts, sendTemplates, sendCampaigns, sendCampaignSends, sendAutomations, sendConsentRecords, sendSuppressionList, sendBounceLog, sendPreferenceCenter, sendUnsubscribeRecords, insertSendContactSchema, insertSendListSchema, insertSendTemplateSchema, insertSendCampaignSchema, insertSendAutomationSchema, domains, dnsRecords, domainTransfers, nameserverHistory, impersonationSessions, impersonationAuditLog, insertDomainSchema, insertDnsRecordSchema, insertDomainTransferSchema, insertImpersonationSessionSchema, insertImpersonationAuditSchema, inboxChannelConnections, inboxConversations, inboxMessages2, inboxAttachments, inboxQuickReplies, inboxParticipants, livechatSessions, brandAssets, insertChannelConnectionSchema, insertConversationSchema, insertInboxMessage2Schema, insertQuickReplySchema, insertLivechatSessionSchema, insertBrandAssetSchema;
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

// server/services/jwt.ts
var jwt_exports = {};
__export(jwt_exports, {
  JWTService: () => JWTService,
  jwtService: () => jwtService
});
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { eq as eq4 } from "drizzle-orm";
var JWTService, jwtService;
var init_jwt = __esm({
  "server/services/jwt.ts"() {
    "use strict";
    init_db();
    init_schema();
    JWTService = class {
      keyPair;
      algorithm = "RS256";
      constructor() {
        this.keyPair = this.generateKeyPair();
      }
      /**
       * Generate RSA key pair for JWT signing
       */
      generateKeyPair() {
        const existingPrivateKey = process.env.JWT_PRIVATE_KEY;
        const existingPublicKey = process.env.JWT_PUBLIC_KEY;
        if (existingPrivateKey && existingPublicKey) {
          return {
            privateKey: existingPrivateKey.replace(/\\n/g, "\n"),
            publicKey: existingPublicKey.replace(/\\n/g, "\n")
          };
        }
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: "spki",
            format: "pem"
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem"
          }
        });
        console.log("Generated new RSA key pair for JWT signing");
        console.log("\u26A0\uFE0F WARNING: Using ephemeral keys. Set JWT_PRIVATE_KEY and JWT_PUBLIC_KEY environment variables for production.");
        return { publicKey, privateKey };
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
        const token = jwt.sign(payload, this.keyPair.privateKey, options);
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
          const decoded = jwt.verify(token, this.keyPair.publicKey, {
            algorithms: [this.algorithm],
            issuer: "businessblueprint.io",
            audience: "client-portal"
          });
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
        await db.update(dashboardAccess).set({ isActive: false }).where(eq4(dashboardAccess.accessToken, token));
      }
      /**
       * Check if token is active in database
       */
      async isTokenActive(token) {
        const [record] = await db.select().from(dashboardAccess).where(eq4(dashboardAccess.accessToken, token));
        return record?.isActive || false;
      }
      /**
       * Get public key for external verification
       */
      getPublicKey() {
        return this.keyPair.publicKey;
      }
      /**
       * Get JWK (JSON Web Key) for public key distribution
       */
      getJWK() {
        const publicKey = crypto.createPublicKey(this.keyPair.publicKey);
        const jwk = publicKey.export({ format: "jwk" });
        return {
          ...jwk,
          alg: this.algorithm,
          use: "sig",
          kid: crypto.createHash("sha256").update(this.keyPair.publicKey).digest("hex").substring(0, 16)
        };
      }
    };
    jwtService = new JWTService();
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_schema();
init_db();
import { eq, desc, and } from "drizzle-orm";
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
};
var storage = new DatabaseStorage();

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
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
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
        from: process.env.FROM_EMAIL || "le847@icloud.com",
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
        from: process.env.FROM_EMAIL || "le847@icloud.com",
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
        from: process.env.FROM_EMAIL || "le847@icloud.com",
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
        from: process.env.FROM_EMAIL || "le847@icloud.com",
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
import { eq as eq2, and as and2 } from "drizzle-orm";
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
    const [conversation] = await db.select().from(inboxConversations).where(eq2(inboxConversations.id, conversationId)).limit(1);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    if (conversation.primaryChannelType !== "email") {
      throw new Error("Conversation is not an email thread");
    }
    const [channelConnection] = await db.select().from(inboxChannelConnections).where(and2(
      eq2(inboxChannelConnections.clientId, conversation.clientId),
      eq2(inboxChannelConnections.channelType, "email"),
      eq2(inboxChannelConnections.status, "active")
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
      let conversation = await db.select().from(inboxConversations).where(and2(
        eq2(inboxConversations.clientId, data.clientId),
        eq2(inboxConversations.contactIdentifier, data.from),
        eq2(inboxConversations.primaryChannelType, "email")
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
        }).where(eq2(inboxConversations.id, conversationId));
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
import { URLSearchParams } from "url";
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
    const subscriptionData = new URLSearchParams({
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
    const updateData = new URLSearchParams({
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
    const cancelData = new URLSearchParams({
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
    const transactionData = new URLSearchParams({
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
    const params = new URLSearchParams(responseText);
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
import { eq as eq3 } from "drizzle-orm";
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
    const allProducts = await db.select().from(products).where(eq3(products.isActive, true));
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
    }).from(assessmentProductRecommendations).innerJoin(products, eq3(assessmentProductRecommendations.productId, products.id)).where(eq3(assessmentProductRecommendations.assessmentId, assessmentId));
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
import { eq as eq5, desc as desc2, and as and4 } from "drizzle-orm";
import { z } from "zod";

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
  app2.get("/api/clients/:id", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
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
      const [dashboardRecord] = await db.select().from(dashboardAccess).where(eq5(dashboardAccess.accessToken, token));
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
      const client2 = await storage.getClientByEmail(email.toLowerCase().trim());
      if (!client2) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email address. Please check your email or contact support."
        });
      }
      await storage.updateClient(client2.id, {
        lastLoginTime: /* @__PURE__ */ new Date(),
        loginCount: (client2.loginCount || 0) + 1
      });
      const token = await jwtService.createDashboardToken(client2.id, client2.email);
      res.json({
        success: true,
        client: {
          id: client2.id,
          companyName: client2.companyName,
          email: client2.email,
          isEmailVerified: client2.isEmailVerified || false
        },
        token,
        message: "Login successful"
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
      const plans = await db.select().from(subscriptionPlans).where(eq5(subscriptionPlans.isActive, true));
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
      const addons = await db.select().from(subscriptionAddons).where(eq5(subscriptionAddons.isActive, true));
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
      const orderSchema = z.object({
        items: z.array(z.object({
          id: z.string(),
          name: z.string(),
          price: z.number(),
          quantity: z.number(),
          type: z.enum(["app", "addon"])
        })),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional()
        }),
        totals: z.object({
          subtotal: z.number(),
          tax: z.number(),
          total: z.number()
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
      const plan = await db.select().from(subscriptionPlans).where(eq5(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq5(subscriptionAddons.isActive, true));
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
      const [plan] = await db.select().from(subscriptionPlans).where(eq5(subscriptionPlans.planId, planStringId)).limit(1);
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
      const [plan] = await db.select().from(subscriptionPlans).where(eq5(subscriptionPlans.planId, planStringId)).limit(1);
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
      const [subscription] = await db.select().from(subscriptions).where(eq5(subscriptions.id, parseInt(id)));
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
      const subscriptionSchema = z.object({
        planId: z.string().min(1, "Plan ID is required"),
        addons: z.array(z.object({
          addonId: z.string(),
          quantity: z.number().optional()
        })).default([]),
        billingCycle: z.enum(["monthly", "quarterly", "annual"]),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional()
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
      const plan = await db.select().from(subscriptionPlans).where(eq5(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq5(subscriptionAddons.isActive, true));
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
      const { eq: eq7, and: and6 } = await import("drizzle-orm");
      const conditions = [eq7(products2.isActive, true)];
      if (category) {
        conditions.push(eq7(products2.category, category));
      }
      const allProducts = await db.select().from(products2).where(and6(...conditions));
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
      const { eq: eq7 } = await import("drizzle-orm");
      const [product] = await db.select().from(products2).where(eq7(products2.id, productId));
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
      if (error instanceof z.ZodError) {
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
      if (error instanceof z.ZodError) {
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
      if (error instanceof z.ZodError) {
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
      if (error instanceof z.ZodError) {
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
      if (error instanceof z.ZodError) {
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
  app2.get("/assets/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      console.log(`Requesting asset: ${filename}`);
      const [asset] = await db.select().from(brandAssets).where(eq5(brandAssets.fileName, filename)).limit(1);
      if (!asset) {
        console.log(`Asset not found: ${filename}`);
        const allAssets = await db.select({ fileName: brandAssets.fileName }).from(brandAssets);
        console.log("Available assets:", allAssets.map((a) => a.fileName).join(", "));
        return res.status(404).send("Asset not found");
      }
      console.log(`Serving asset: ${filename}, type: ${asset.mimeType}`);
      const contentType = asset.mimeType || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.send(asset.data);
    } catch (error) {
      console.error("Error serving brand asset:", error);
      res.status(500).json({ error: "Failed to serve asset" });
    }
  });
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
      if (error instanceof z.ZodError) {
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
      const conversations = await db.select().from(inboxConversations).where(eq5(inboxConversations.clientId, clientId)).orderBy(desc2(inboxConversations.updatedAt));
      const conversationsWithMessages = await Promise.all(
        conversations.map(async (conv) => {
          const lastMessage = await db.select().from(inboxMessages2).where(eq5(inboxMessages2.conversationId, conv.id)).orderBy(desc2(inboxMessages2.createdAt)).limit(1);
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
      const [conversation] = await db.select().from(inboxConversations).where(and4(
        eq5(inboxConversations.id, conversationId),
        eq5(inboxConversations.clientId, clientId)
      )).limit(1);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found or access denied" });
      }
      const messages = await db.select().from(inboxMessages2).where(eq5(inboxMessages2.conversationId, conversationId)).orderBy(inboxMessages2.createdAt);
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
      const [conversation] = await db.select().from(inboxConversations).where(and4(
        eq5(inboxConversations.id, conversationId),
        eq5(inboxConversations.clientId, clientId)
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
      await db.update(inboxConversations).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq5(inboxConversations.id, conversationId));
      res.json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  app2.post("/api/biif/create-location", async (req, res) => {
    try {
      console.log("\u{1F4CD} BIIF: Received location creation request:", req.body);
      const locationData = z.object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string().default("US"),
        phone: z.string(),
        website: z.string().optional(),
        email: z.string().optional(),
        category: z.string(),
        description: z.string().optional()
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
import { nanoid } from "nanoid";
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
        `src="/src/main.tsx?v=${nanoid()}"`
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
import { eq as eq6, and as and5 } from "drizzle-orm";
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
          await db.update(livechatSessions).set({ conversationId }).where(eq6(livechatSessions.sessionId, data.sessionId));
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
          unreadCount: db.$count(inboxMessages2, eq6(inboxMessages2.conversationId, conversationId)),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq6(inboxConversations.id, conversationId));
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
        const [conversation] = await db.select().from(inboxConversations).where(eq6(inboxConversations.id, data.conversationId)).limit(1);
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
        }).where(eq6(inboxConversations.id, data.conversationId));
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
          and5(
            eq6(inboxMessages2.conversationId, data.conversationId),
            eq6(inboxMessages2.direction, "inbound")
          )
        );
        await db.update(inboxConversations).set({ unreadCount: 0 }).where(eq6(inboxConversations.id, data.conversationId));
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
        const [session2] = await db.select().from(livechatSessions).where(eq6(livechatSessions.sessionId, sessionId)).limit(1);
        if (session2 && session2.conversationId) {
          const messages = await db.select().from(inboxMessages2).where(eq6(inboxMessages2.conversationId, session2.conversationId)).orderBy(inboxMessages2.createdAt);
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

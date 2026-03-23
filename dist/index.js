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
  aiCoachConversations: () => aiCoachConversations,
  aiCoachMessages: () => aiCoachMessages,
  aiSettings: () => aiSettings,
  apiKeys: () => apiKeys,
  assessmentProductRecommendations: () => assessmentProductRecommendations,
  assessments: () => assessments,
  billingHistory: () => billingHistory,
  brandAssets: () => brandAssets,
  brandColors: () => brandColors,
  businessListings: () => businessListings,
  businessReviews: () => businessReviews,
  campaigns: () => campaigns,
  canonicalBusinessProfiles: () => canonicalBusinessProfiles,
  chatAgents: () => chatAgents,
  chatAnalyticsEvents: () => chatAnalyticsEvents,
  chatWidgetSettings: () => chatWidgetSettings,
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
  distributionLogs: () => distributionLogs,
  distributionSubmissions: () => distributionSubmissions,
  distributionTargets: () => distributionTargets,
  dnsRecords: () => dnsRecords,
  domainTransfers: () => domainTransfers,
  domains: () => domains,
  emailChangeHistory: () => emailChangeHistory,
  emailLogs: () => emailLogs,
  emailTemplates: () => emailTemplates,
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
  insertBusinessListingSchema: () => insertBusinessListingSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertCanonicalProfileSchema: () => insertCanonicalProfileSchema,
  insertChannelConnectionSchema: () => insertChannelConnectionSchema,
  insertChatAgentSchema: () => insertChatAgentSchema,
  insertChatAnalyticsEventSchema: () => insertChatAnalyticsEventSchema,
  insertChatWidgetSettingsSchema: () => insertChatWidgetSettingsSchema,
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
  insertEmailLogSchema: () => insertEmailLogSchema,
  insertEmailTemplateSchema: () => insertEmailTemplateSchema,
  insertImpersonationAuditSchema: () => insertImpersonationAuditSchema,
  insertImpersonationSessionSchema: () => insertImpersonationSessionSchema,
  insertInboxMessage2Schema: () => insertInboxMessage2Schema,
  insertInboxMessageSchema: () => insertInboxMessageSchema,
  insertListingSyncLogSchema: () => insertListingSyncLogSchema,
  insertLivechatSessionSchema: () => insertLivechatSessionSchema,
  insertMagicLinkTokenSchema: () => insertMagicLinkTokenSchema,
  insertPrescriptionSchema: () => insertPrescriptionSchema,
  insertProductSchema: () => insertProductSchema,
  insertQuickReplySchema: () => insertQuickReplySchema,
  insertRecommendationSchema: () => insertRecommendationSchema,
  insertScansBluePurchaseSchema: () => insertScansBluePurchaseSchema,
  insertSendAutomationSchema: () => insertSendAutomationSchema,
  insertSendCampaignSchema: () => insertSendCampaignSchema,
  insertSendContactSchema: () => insertSendContactSchema,
  insertSendListSchema: () => insertSendListSchema,
  insertSendTemplateSchema: () => insertSendTemplateSchema,
  insertSeoActionItemSchema: () => insertSeoActionItemSchema,
  insertSeoBacklinkSchema: () => insertSeoBacklinkSchema,
  insertSeoCompetitorDataSchema: () => insertSeoCompetitorDataSchema,
  insertSeoCompetitorSchema: () => insertSeoCompetitorSchema,
  insertSeoContentBriefSchema: () => insertSeoContentBriefSchema,
  insertSeoKeywordRankingSchema: () => insertSeoKeywordRankingSchema,
  insertSeoKeywordSchema: () => insertSeoKeywordSchema,
  insertSeoPageSchema: () => insertSeoPageSchema,
  insertSeoProfileSchema: () => insertSeoProfileSchema,
  insertSeoReportSchema: () => insertSeoReportSchema,
  insertSeoScanSchema: () => insertSeoScanSchema,
  insertSeoTechnicalIssueSchema: () => insertSeoTechnicalIssueSchema,
  insertSocialMediaAccountSchema: () => insertSocialMediaAccountSchema,
  insertSubscriptionAddonSchema: () => insertSubscriptionAddonSchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertSubscriptionSchema: () => insertSubscriptionSchema,
  insertSupportTicketSchema: () => insertSupportTicketSchema,
  insertTaskSchema: () => insertTaskSchema,
  insertTicketCommentSchema: () => insertTicketCommentSchema,
  insertWebhookSubscriptionSchema: () => insertWebhookSubscriptionSchema,
  listingMetricsSnapshots: () => listingMetricsSnapshots,
  listingSyncLogs: () => listingSyncLogs,
  livechatSessions: () => livechatSessions,
  magicLinkTokens: () => magicLinkTokens,
  nameserverHistory: () => nameserverHistory,
  prescriptions: () => prescriptions,
  products: () => products,
  recommendations: () => recommendations,
  scansBluePurchases: () => scansBluePurchases,
  scansBlueResults: () => scansBlueResults,
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
  seoActionItems: () => seoActionItems,
  seoBacklinks: () => seoBacklinks,
  seoCompetitorData: () => seoCompetitorData,
  seoCompetitors: () => seoCompetitors,
  seoContentBriefs: () => seoContentBriefs,
  seoKeywordRankings: () => seoKeywordRankings,
  seoKeywords: () => seoKeywords,
  seoPages: () => seoPages,
  seoProfiles: () => seoProfiles,
  seoReports: () => seoReports,
  seoScans: () => seoScans,
  seoTechnicalIssues: () => seoTechnicalIssues,
  sessions: () => sessions,
  setPinSchema: () => setPinSchema,
  socialMediaAccounts: () => socialMediaAccounts,
  subscriptionAddonSelections: () => subscriptionAddonSelections,
  subscriptionAddons: () => subscriptionAddons,
  subscriptionPlans: () => subscriptionPlans,
  subscriptions: () => subscriptions,
  supportTickets: () => supportTickets,
  tasks: () => tasks,
  ticketComments: () => ticketComments,
  updateBusinessListingSchema: () => updateBusinessListingSchema,
  updateCanonicalProfileSchema: () => updateCanonicalProfileSchema,
  updateChatWidgetSettingsSchema: () => updateChatWidgetSettingsSchema,
  updateEmailTemplateSchema: () => updateEmailTemplateSchema,
  updatePrescriptionSchema: () => updatePrescriptionSchema,
  updateSupportTicketSchema: () => updateSupportTicketSchema,
  users: () => users,
  verifyPinSchema: () => verifyPinSchema,
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
var sessions, users, assessments, recommendations, scansBlueResults, scansBluePurchases, insertScansBluePurchaseSchema, clients, magicLinkTokens, inboxMessages, campaigns, emailChangeHistory, dashboardAccess, clientAssessments, accountStatusHistory, insertAssessmentSchema, insertRecommendationSchema, insertClientSchema, insertAccountStatusHistorySchema, insertMagicLinkTokenSchema, insertEmailChangeHistorySchema, insertInboxMessageSchema, insertCampaignSchema, subscriptionPlans, subscriptionAddons, subscriptions, subscriptionAddonSelections, products, assessmentProductRecommendations, billingHistory, insertSubscriptionPlanSchema, insertSubscriptionAddonSchema, insertSubscriptionSchema, insertBillingHistorySchema, insertProductSchema, insertAssessmentProductRecommendationSchema, sendContacts, sendLists, sendListContacts, sendTemplates, sendCampaigns, sendCampaignSends, sendAutomations, sendConsentRecords, sendSuppressionList, sendBounceLog, sendPreferenceCenter, sendUnsubscribeRecords, insertSendContactSchema, insertSendListSchema, insertSendTemplateSchema, insertSendCampaignSchema, insertSendAutomationSchema, domains, dnsRecords, domainTransfers, nameserverHistory, impersonationSessions, impersonationAuditLog, insertDomainSchema, insertDnsRecordSchema, insertDomainTransferSchema, insertImpersonationSessionSchema, insertImpersonationAuditSchema, inboxChannelConnections, inboxConversations, inboxMessages2, inboxAttachments, inboxQuickReplies, inboxParticipants, livechatSessions, brandAssets, insertChannelConnectionSchema, insertConversationSchema, insertInboxMessage2Schema, insertQuickReplySchema, insertLivechatSessionSchema, insertBrandAssetSchema, socialMediaAccounts, contentMedia, contentPosts, contentAnalytics, contentTemplates, insertSocialMediaAccountSchema, insertContentMediaSchema, insertContentPostSchema, insertContentTemplateSchema, aiCoachConversations, aiCoachMessages, tasks, insertTaskSchema, brandColors, insertBrandColorSchema, crmCompanies, crmContacts, crmPipelines, crmPipelineStages, crmDeals, crmTasks, crmNotes, crmTimeline, crmSegments, crmSegmentMembers, crmCustomFieldDefs, crmAppointments, crmTags, crmSubscriptions, crmLeadForms, insertCrmCompanySchema, insertCrmContactSchema, insertCrmPipelineSchema, insertCrmPipelineStageSchema, insertCrmDealSchema, insertCrmTaskSchema, insertCrmNoteSchema, insertCrmTimelineSchema, insertCrmSegmentSchema, insertCrmAppointmentSchema, insertCrmTagSchema, insertCrmCustomFieldDefSchema, insertCrmSubscriptionSchema, insertCrmLeadFormSchema, crmAutomations, crmAutomationSteps, crmAutomationExecutions, insertCrmAutomationSchema, insertCrmAutomationStepSchema, apiKeys, insertApiKeySchema, webhookSubscriptions, insertWebhookSubscriptionSchema, supportTickets, ticketComments, prescriptions, adminActivityLog, emailLogs, emailTemplates, aiSettings, insertSupportTicketSchema, insertTicketCommentSchema, insertPrescriptionSchema, insertAdminActivityLogSchema, updateSupportTicketSchema, updatePrescriptionSchema, insertEmailLogSchema, insertEmailTemplateSchema, updateEmailTemplateSchema, businessListings, listingSyncLogs, listingMetricsSnapshots, insertBusinessListingSchema, updateBusinessListingSchema, insertListingSyncLogSchema, businessReviews, canonicalBusinessProfiles, distributionTargets, distributionSubmissions, distributionLogs, insertCanonicalProfileSchema, updateCanonicalProfileSchema, setPinSchema, verifyPinSchema, chatWidgetSettings, chatAgents, chatAnalyticsEvents, insertChatWidgetSettingsSchema, updateChatWidgetSettingsSchema, insertChatAgentSchema, insertChatAnalyticsEventSchema, seoProfiles, seoScans, seoKeywords, seoKeywordRankings, seoPages, seoTechnicalIssues, seoBacklinks, seoContentBriefs, seoActionItems, seoReports, seoCompetitors, seoCompetitorData, insertSeoProfileSchema, insertSeoScanSchema, insertSeoKeywordSchema, insertSeoKeywordRankingSchema, insertSeoPageSchema, insertSeoTechnicalIssueSchema, insertSeoBacklinkSchema, insertSeoContentBriefSchema, insertSeoActionItemSchema, insertSeoReportSchema, insertSeoCompetitorSchema, insertSeoCompetitorDataSchema;
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
      // Address fields (SEO-optimized for local listings)
      address: text("address").notNull(),
      // Address Line 1 (street address)
      address2: text("address2"),
      // Address Line 2 (optional)
      unit: varchar("unit", { length: 50 }),
      // Suite/Unit number (optional)
      attention: varchar("attention", { length: 100 }),
      // Attention line (optional)
      city: varchar("city", { length: 100 }).notNull(),
      state: varchar("state", { length: 100 }).notNull(),
      zipCode: varchar("zip_code", { length: 20 }).notNull(),
      country: varchar("country", { length: 100 }).notNull().default("United States"),
      // Legacy field for backwards compatibility
      location: varchar("location", { length: 255 }),
      // Now optional, computed from city/state
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
      // ============================================================================
      // OPERATIONAL ASSESSMENT QUESTIONS (27 questions across 9 areas)
      // ============================================================================
      // Email & SMS Marketing (Q1-Q5)
      collectsEmails: varchar("collects_emails", { length: 50 }),
      // yes_active, yes_not_organized, no, dont_know
      lastEmailCampaign: varchar("last_email_campaign", { length: 50 }),
      // past_week, past_month, past_3_months, past_6_months, 6_months_plus, never
      emailListSize: varchar("email_list_size", { length: 50 }),
      // 0_50, 51_200, 201_500, 501_1000, 1000_plus, no_list
      sendsSMS: varchar("sends_sms", { length: 50 }),
      // yes_regularly, yes_occasionally, no_interested, no_not_interested
      lastSMSCampaign: varchar("last_sms_campaign", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never
      // Social Media Content (Q6-Q8)
      lastSocialPost: varchar("last_social_post", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never
      socialPostFrequency: varchar("social_post_frequency", { length: 50 }),
      // daily, 3_5_week, 1_2_week, few_month, rarely, never
      socialContentCreator: varchar("social_content_creator", { length: 50 }),
      // owner, staff, agency, no_one, inconsistent
      // Reputation Management (Q9-Q11)
      lastReviewResponse: varchar("last_review_response", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never
      reviewResponseRate: varchar("review_response_rate", { length: 50 }),
      // 90_100, 50_89, 10_49, under_10, 0
      lastNewReview: varchar("last_new_review", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never
      // Customer Response & Timing (Q12-Q14)
      inquiryResponseTime: varchar("inquiry_response_time", { length: 50 }),
      // 15_min, 1_hour, 4_hours, 24_hours, 24_hours_plus, inconsistent
      hasUnifiedInbox: varchar("has_unified_inbox", { length: 50 }),
      // yes_unified, partial, no_scattered, dont_know
      missedInquiries: varchar("missed_inquiries", { length: 50 }),
      // never, past_week, past_month, regularly, dont_track
      // Live Chat (Q15-Q17)
      hasLiveChat: varchar("has_live_chat", { length: 50 }),
      // yes_monitored, yes_not_monitored, yes_unsure, no, no_website
      lastChatConversation: varchar("last_chat_conversation", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never_none
      chatResponseTime: varchar("chat_response_time", { length: 50 }),
      // 1_min, 5_min, 15_min, 15_plus, no_chat
      // Business Listings (Q18-Q19)
      lastListingUpdate: varchar("last_listing_update", { length: 50 }),
      // past_month, past_3_months, past_6_months, past_year, year_plus, never
      listingConsistency: varchar("listing_consistency", { length: 50 }),
      // yes_consistent, pretty_sure, not_sure, know_inconsistent, never_checked
      // Google Business Profile (Q20-Q21)
      lastGBPPost: varchar("last_gbp_post", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never
      lastGBPPhoto: varchar("last_gbp_photo", { length: 50 }),
      // past_month, past_3_months, past_6_months, 6_months_plus, never
      // Website & SEO (Q22-Q23)
      lastWebsiteUpdate: varchar("last_website_update", { length: 50 }),
      // past_week, past_month, past_3_months, past_6_months, 6_months_plus, never
      hasBlog: varchar("has_blog", { length: 50 }),
      // yes_weekly, yes_monthly, yes_inconsistent, no_planning, no_not_interested
      // CRM (Q24-Q27)
      usesCRM: varchar("uses_crm", { length: 50 }),
      // yes_daily, yes_underutilized, yes_not_setup, no_planning, manual_tracking, no_dont_track
      crmPlatform: varchar("crm_platform", { length: 50 }),
      // salesforce, hubspot, zoho, monday, pipedrive, sheets_excel, other, none
      lastCRMFollowup: varchar("last_crm_followup", { length: 50 }),
      // past_week, past_month, past_3_months, 3_months_plus, never_no_crm
      hasAutomation: varchar("has_automation", { length: 50 }),
      // yes_full, yes_partial, no_manual, dont_know
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
      productId: varchar("product_id", { length: 50 }),
      // Reference to product in catalog
      bundleId: varchar("bundle_id", { length: 50 }),
      // Reference to bundle if applicable
      createdAt: timestamp("created_at").defaultNow()
    });
    scansBlueResults = pgTable("scans_blue_results", {
      id: serial("id").primaryKey(),
      assessmentId: integer("assessment_id").references(() => assessments.id),
      url: text("url").notNull(),
      // Report type: 'fast_check' or 'full_report'
      type: varchar("type", { length: 20 }).default("fast_check").notNull(),
      // Processing status: 'processing', 'completed', 'failed'
      status: varchar("status", { length: 20 }).default("completed"),
      // Fast Check Results
      overallScore: integer("overall_score"),
      // 0-100
      // SSL
      sslPresent: boolean("ssl_present"),
      sslValid: boolean("ssl_valid"),
      sslIssuer: text("ssl_issuer"),
      sslExpiresIn: integer("ssl_expires_in"),
      // days
      // Performance
      loadTime: decimal("load_time", { precision: 5, scale: 2 }),
      // seconds
      performanceScore: integer("performance_score"),
      // 0-100
      // Mobile
      mobileOptimized: boolean("mobile_optimized"),
      mobileScore: integer("mobile_score"),
      // 0-100
      // Issues (JSON array)
      criticalIssues: text("critical_issues"),
      // JSON string
      // Full Report data (JSON for comprehensive results)
      fullReportData: text("full_report_data"),
      // JSON string for full report
      // Full Report (if requested) - legacy fields
      fullReportId: text("full_report_id"),
      fullReportUrl: text("full_report_url"),
      fullReportStatus: varchar("full_report_status", { length: 20 }),
      // queued, processing, completed
      // Timing
      requestedAt: timestamp("requested_at").defaultNow(),
      completedAt: timestamp("completed_at"),
      // Metadata
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    scansBluePurchases = pgTable("scans_blue_purchases", {
      id: serial("id").primaryKey(),
      assessmentId: integer("assessment_id").notNull().references(() => assessments.id),
      // Provider-agnostic payment fields
      paymentProvider: varchar("payment_provider", { length: 20 }).notNull().default("stripe"),
      // 'stripe' or 'swipesblue'
      transactionId: text("transaction_id").notNull().unique(),
      // Stripe session ID or SwipesBlue transaction ID
      paymentIntentId: text("payment_intent_id"),
      // Provider-specific payment reference
      amount: integer("amount").notNull(),
      // in cents (1000 = $10.00)
      status: varchar("status", { length: 20 }).notNull().default("pending"),
      // pending, paid, refunded, failed
      purchasedAt: timestamp("purchased_at").defaultNow(),
      reportDeliveredAt: timestamp("report_delivered_at"),
      email: text("email"),
      // Customer email for delivery
      createdAt: timestamp("created_at").defaultNow()
    });
    insertScansBluePurchaseSchema = createInsertSchema(scansBluePurchases).omit({ id: true, createdAt: true });
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
      // External dashboard URL (legacy Vendasta integration)
      vendastaDashboardUrl: text("vendasta_dashboard_url"),
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
      address2: true,
      unit: true,
      attention: true,
      city: true,
      state: true,
      zipCode: true,
      country: true,
      phone: true,
      email: true,
      website: true,
      // Operational assessment questions
      collectsEmails: true,
      lastEmailCampaign: true,
      emailListSize: true,
      sendsSMS: true,
      lastSMSCampaign: true,
      lastSocialPost: true,
      socialPostFrequency: true,
      socialContentCreator: true,
      lastReviewResponse: true,
      reviewResponseRate: true,
      lastNewReview: true,
      inquiryResponseTime: true,
      hasUnifiedInbox: true,
      missedInquiries: true,
      hasLiveChat: true,
      lastChatConversation: true,
      chatResponseTime: true,
      lastListingUpdate: true,
      listingConsistency: true,
      lastGBPPost: true,
      lastGBPPhoto: true,
      lastWebsiteUpdate: true,
      hasBlog: true,
      usesCRM: true,
      crmPlatform: true,
      lastCRMFollowup: true,
      hasAutomation: true
    });
    insertRecommendationSchema = createInsertSchema(recommendations).pick({
      assessmentId: true,
      category: true,
      title: true,
      description: true,
      priority: true,
      estimatedImpact: true,
      estimatedEffort: true,
      productId: true,
      bundleId: true
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
      productId: varchar("product_id", { length: 50 }),
      // String ID matching PRODUCTS catalog (inbox, send, etc.)
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
      fullContent: text("full_content"),
      // Full post content (longer form)
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
    aiCoachConversations = pgTable("ai_coach_conversations", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      title: text("title"),
      // Auto-generated from first message
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    aiCoachMessages = pgTable("ai_coach_messages", {
      id: serial("id").primaryKey(),
      conversationId: integer("conversation_id").references(() => aiCoachConversations.id).notNull(),
      role: varchar("role", { length: 20 }).notNull(),
      // "user" | "assistant"
      content: text("content").notNull(),
      messageType: varchar("message_type", { length: 30 }),
      // "guidance" | "help" | "progress"
      createdAt: timestamp("created_at").defaultNow()
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
      assignedTo: varchar("assigned_to", { length: 100 }),
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
      title: text("title").notNull(),
      summary: text("summary"),
      fullContent: text("full_content"),
      // Access token for email link access (allows viewing without login)
      accessToken: varchar("access_token", { length: 64 }).unique(),
      // AI-generated content
      recommendations: jsonb("recommendations"),
      // Array of recommendation objects
      actionItems: jsonb("action_items"),
      // Prioritized action items
      timeline: jsonb("timeline"),
      // Implementation timeline
      // Priority
      priority: varchar("priority", { length: 20 }),
      // Status workflow
      status: varchar("status", { length: 50 }).default("pending_review"),
      // pending_review, approved, delivered, in_progress, completed
      // Review workflow
      reviewedBy: text("reviewed_by"),
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
      index("idx_prescription_status").on(table.status),
      index("idx_prescription_token").on(table.accessToken)
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
    emailLogs = pgTable("email_logs", {
      id: serial("id").primaryKey(),
      // Recipient info
      recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
      recipientName: varchar("recipient_name", { length: 255 }),
      clientId: integer("client_id").references(() => clients.id),
      assessmentId: integer("assessment_id").references(() => assessments.id),
      // Email content
      emailType: varchar("email_type", { length: 50 }).notNull(),
      // welcome, magic_link, assessment_report, etc.
      templateId: integer("template_id"),
      // Reference to email_templates if using custom template
      subject: varchar("subject", { length: 500 }).notNull(),
      htmlBody: text("html_body").notNull(),
      // Status tracking
      status: varchar("status", { length: 30 }).default("pending"),
      // pending, sent, failed, bounced, opened, clicked
      errorMessage: text("error_message"),
      resendApiId: varchar("resend_api_id", { length: 255 }),
      // Resend's email ID for tracking
      // Engagement tracking
      sentAt: timestamp("sent_at"),
      openedAt: timestamp("opened_at"),
      clickedAt: timestamp("clicked_at"),
      bouncedAt: timestamp("bounced_at"),
      // Retry tracking
      retryCount: integer("retry_count").default(0),
      lastRetryAt: timestamp("last_retry_at"),
      // Admin sender (for manual sends)
      sentByAdminId: integer("sent_by_admin_id").references(() => clients.id),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_email_logs_recipient").on(table.recipientEmail),
      index("idx_email_logs_status").on(table.status),
      index("idx_email_logs_type").on(table.emailType),
      index("idx_email_logs_client").on(table.clientId)
    ]);
    emailTemplates = pgTable("email_templates", {
      id: serial("id").primaryKey(),
      // Template identification
      name: varchar("name", { length: 100 }).notNull(),
      // Internal name (e.g., "welcome", "assessment_report")
      displayName: varchar("display_name", { length: 255 }).notNull(),
      // Human-readable name
      description: text("description"),
      // Template content
      subject: varchar("subject", { length: 500 }).notNull(),
      htmlBody: text("html_body").notNull(),
      // Available variables for this template (e.g., {businessName}, {dashboardLink})
      availableVariables: jsonb("available_variables"),
      // Array of {name, description}
      // Template settings
      isSystem: boolean("is_system").default(false),
      // System templates can't be deleted
      isActive: boolean("is_active").default(true),
      // Trigger settings for automated emails
      triggerType: varchar("trigger_type", { length: 50 }),
      // manual, after_assessment, after_subscription, days_after_inactivity
      triggerConfig: jsonb("trigger_config"),
      // Additional config like {daysAfter: 3}
      // Audit
      createdById: integer("created_by_id").references(() => clients.id),
      lastEditedById: integer("last_edited_by_id").references(() => clients.id),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_email_templates_name").on(table.name),
      index("idx_email_templates_trigger").on(table.triggerType)
    ]);
    aiSettings = pgTable("ai_settings", {
      id: serial("id").primaryKey(),
      feature: text("feature").notNull().unique(),
      // 'assessment', 'prescription', 'coach_blue'
      provider: text("provider").notNull(),
      // 'claude', 'openai', 'deepseek'
      isActive: boolean("is_active").default(true).notNull(),
      lastUpdated: timestamp("last_updated").defaultNow().notNull(),
      updatedBy: integer("updated_by").references(() => clients.id)
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
    insertEmailLogSchema = createInsertSchema(emailLogs).omit({
      id: true,
      createdAt: true
    });
    insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateEmailTemplateSchema = z.object({
      displayName: z.string().optional(),
      description: z.string().optional(),
      subject: z.string().optional(),
      htmlBody: z.string().optional(),
      availableVariables: z.array(z.object({ name: z.string(), description: z.string() })).optional(),
      isActive: z.boolean().optional(),
      triggerType: z.enum(["manual", "after_assessment", "after_subscription", "days_after_inactivity"]).optional(),
      triggerConfig: z.record(z.any()).optional()
    });
    businessListings = pgTable("business_listings", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      platform: varchar("platform", { length: 100 }).notNull(),
      // 'google_business', 'yelp', 'facebook', 'bing_places', 'apple_maps', 'manual'
      platformId: varchar("platform_id", { length: 255 }),
      name: varchar("name", { length: 255 }).notNull(),
      address: text("address"),
      phone: varchar("phone", { length: 30 }),
      website: varchar("website", { length: 500 }),
      hours: text("hours"),
      status: varchar("status", { length: 20 }).default("pending"),
      // 'active', 'pending', 'error'
      url: varchar("url", { length: 500 }),
      rating: decimal("rating", { precision: 2, scale: 1 }),
      reviewCount: integer("review_count").default(0),
      source: varchar("source", { length: 20 }).default("manual"),
      // 'sync' or 'manual'
      lastSyncedAt: timestamp("last_synced_at"),
      syncStatus: varchar("sync_status", { length: 20 }).default("none"),
      syncError: text("sync_error"),
      platformData: jsonb("platform_data"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_business_listings_client").on(table.clientId),
      index("idx_business_listings_platform").on(table.platform),
      index("idx_business_listings_status").on(table.status)
    ]);
    listingSyncLogs = pgTable("listing_sync_logs", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      syncType: varchar("sync_type", { length: 20 }).notNull(),
      // 'discovery', 'refresh'
      status: varchar("status", { length: 20 }).notNull(),
      // 'started', 'completed', 'failed'
      platformsScanned: text("platforms_scanned").array(),
      listingsFound: integer("listings_found").default(0),
      listingsCreated: integer("listings_created").default(0),
      listingsUpdated: integer("listings_updated").default(0),
      errors: jsonb("errors"),
      startedAt: timestamp("started_at").defaultNow(),
      completedAt: timestamp("completed_at")
    });
    listingMetricsSnapshots = pgTable("listing_metrics_snapshots", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      listingId: integer("listing_id").references(() => businessListings.id),
      views: integer("views").default(0),
      clicks: integer("clicks").default(0),
      calls: integer("calls").default(0),
      periodStart: timestamp("period_start").notNull(),
      periodEnd: timestamp("period_end").notNull(),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertBusinessListingSchema = createInsertSchema(businessListings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateBusinessListingSchema = z.object({
      name: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      hours: z.string().optional(),
      status: z.enum(["active", "pending", "error"]).optional(),
      url: z.string().optional(),
      rating: z.string().optional(),
      reviewCount: z.number().optional()
    });
    insertListingSyncLogSchema = createInsertSchema(listingSyncLogs).omit({
      id: true,
      startedAt: true
    });
    businessReviews = pgTable("business_reviews", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      platform: varchar("platform", { length: 50 }).notNull(),
      // 'google', 'yelp', 'facebook'
      platformReviewId: varchar("platform_review_id", { length: 255 }),
      reviewerName: varchar("reviewer_name", { length: 255 }).notNull(),
      rating: integer("rating").notNull(),
      // 1-5
      reviewText: text("review_text"),
      reviewDate: timestamp("review_date").notNull(),
      response: text("response"),
      responseDate: timestamp("response_date"),
      isAIGenerated: boolean("is_ai_generated").default(false),
      sentiment: varchar("sentiment", { length: 20 }).default("neutral"),
      // 'positive', 'negative', 'neutral'
      reviewUrl: varchar("review_url", { length: 500 }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    canonicalBusinessProfiles = pgTable("canonical_business_profiles", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull().unique(),
      // Core NAP (Name, Address, Phone)
      businessName: varchar("business_name", { length: 255 }).notNull(),
      address1: text("address1").notNull(),
      address2: text("address2"),
      city: varchar("city", { length: 100 }).notNull(),
      state: varchar("state", { length: 100 }).notNull(),
      zip: varchar("zip", { length: 20 }).notNull(),
      country: varchar("country", { length: 100 }).notNull().default("US"),
      phone: varchar("phone", { length: 30 }).notNull(),
      // Extended contact
      website: varchar("website", { length: 500 }),
      email: varchar("email", { length: 255 }),
      fax: varchar("fax", { length: 30 }),
      // Metadata
      categories: text("categories").array(),
      description: text("description"),
      shortDescription: varchar("short_description", { length: 255 }),
      yearEstablished: integer("year_established"),
      employeeCount: integer("employee_count"),
      // Hours
      hours: jsonb("hours"),
      // {monday: {open: "09:00", close: "17:00"}, ...}
      specialHours: jsonb("special_hours"),
      // Media
      logoUrl: varchar("logo_url", { length: 500 }),
      coverPhotoUrl: varchar("cover_photo_url", { length: 500 }),
      photoUrls: text("photo_urls").array(),
      // Social
      facebookUrl: varchar("facebook_url", { length: 500 }),
      instagramUrl: varchar("instagram_url", { length: 500 }),
      linkedinUrl: varchar("linkedin_url", { length: 500 }),
      twitterUrl: varchar("twitter_url", { length: 500 }),
      youtubeUrl: varchar("youtube_url", { length: 500 }),
      // Extra
      paymentMethods: text("payment_methods").array(),
      amenities: text("amenities").array(),
      serviceArea: jsonb("service_area"),
      // PIN protection
      editPin: varchar("edit_pin", { length: 255 }),
      // bcrypt hash of 4-6 digit PIN
      // Versioning
      dataVersion: integer("data_version").notNull().default(1),
      lastModifiedFields: text("last_modified_fields").array(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_canonical_profiles_client").on(table.clientId)
    ]);
    distributionTargets = pgTable("distribution_targets", {
      id: serial("id").primaryKey(),
      slug: varchar("slug", { length: 50 }).notNull().unique(),
      displayName: varchar("display_name", { length: 100 }).notNull(),
      type: varchar("type", { length: 20 }).notNull(),
      // 'aggregator' | 'direct_api'
      adapterKey: varchar("adapter_key", { length: 50 }).notNull(),
      requiredEnvVars: text("required_env_vars").array(),
      isEnabled: boolean("is_enabled").default(false),
      feedsDirectories: text("feeds_directories").array(),
      description: text("description"),
      estimatedProcessingTime: varchar("estimated_processing_time", { length: 50 }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    distributionSubmissions = pgTable("distribution_submissions", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      targetId: integer("target_id").references(() => distributionTargets.id).notNull(),
      profileId: integer("profile_id").references(() => canonicalBusinessProfiles.id).notNull(),
      status: varchar("status", { length: 20 }).notNull().default("pending"),
      // pending, submitting, submitted, processing, verified, active, error, rejected
      externalId: varchar("external_id", { length: 255 }),
      externalUrl: varchar("external_url", { length: 500 }),
      submittedDataVersion: integer("submitted_data_version"),
      lastSubmittedAt: timestamp("last_submitted_at"),
      lastVerifiedAt: timestamp("last_verified_at"),
      needsResync: boolean("needs_resync").default(false),
      lastError: text("last_error"),
      errorCount: integer("error_count").default(0),
      nextRetryAt: timestamp("next_retry_at"),
      platformResponse: jsonb("platform_response"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_dist_submissions_client").on(table.clientId),
      index("idx_dist_submissions_target").on(table.targetId),
      index("idx_dist_submissions_status").on(table.status),
      index("idx_dist_submissions_resync").on(table.needsResync),
      unique("uq_dist_submissions_client_target").on(table.clientId, table.targetId)
    ]);
    distributionLogs = pgTable("distribution_logs", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      submissionId: integer("submission_id").references(() => distributionSubmissions.id),
      targetSlug: varchar("target_slug", { length: 50 }).notNull(),
      action: varchar("action", { length: 20 }).notNull(),
      // 'submit', 'update', 'verify', 'error', 'retry'
      status: varchar("status", { length: 20 }).notNull(),
      // 'success', 'failure', 'skipped'
      requestPayload: jsonb("request_payload"),
      responsePayload: jsonb("response_payload"),
      errorMessage: text("error_message"),
      durationMs: integer("duration_ms"),
      dataVersion: integer("data_version"),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_dist_logs_client").on(table.clientId),
      index("idx_dist_logs_submission").on(table.submissionId),
      index("idx_dist_logs_target").on(table.targetSlug)
    ]);
    insertCanonicalProfileSchema = createInsertSchema(canonicalBusinessProfiles).omit({
      id: true,
      dataVersion: true,
      createdAt: true,
      updatedAt: true
    });
    updateCanonicalProfileSchema = z.object({
      businessName: z.string().optional(),
      address1: z.string().optional(),
      address2: z.string().nullable().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      fax: z.string().nullable().optional(),
      categories: z.array(z.string()).nullable().optional(),
      description: z.string().nullable().optional(),
      shortDescription: z.string().nullable().optional(),
      yearEstablished: z.number().nullable().optional(),
      employeeCount: z.number().nullable().optional(),
      hours: z.any().nullable().optional(),
      specialHours: z.any().nullable().optional(),
      logoUrl: z.string().nullable().optional(),
      coverPhotoUrl: z.string().nullable().optional(),
      photoUrls: z.array(z.string()).nullable().optional(),
      facebookUrl: z.string().nullable().optional(),
      instagramUrl: z.string().nullable().optional(),
      linkedinUrl: z.string().nullable().optional(),
      twitterUrl: z.string().nullable().optional(),
      youtubeUrl: z.string().nullable().optional(),
      paymentMethods: z.array(z.string()).nullable().optional(),
      amenities: z.array(z.string()).nullable().optional(),
      serviceArea: z.any().nullable().optional()
    });
    setPinSchema = z.object({ pin: z.string().min(4).max(6).regex(/^\d+$/) });
    verifyPinSchema = z.object({ pin: z.string().min(4).max(6) });
    chatWidgetSettings = pgTable("chat_widget_settings", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull().unique(),
      // Appearance
      primaryColor: varchar("primary_color", { length: 20 }).default("#007bff"),
      position: varchar("position", { length: 20 }).default("bottom-right"),
      // bottom-right, bottom-left, top-right, top-left
      welcomeMessage: text("welcome_message").default("Hi! How can we help you today?"),
      offlineMessage: text("offline_message").default("We're currently offline. Leave a message and we'll get back to you."),
      companyName: varchar("company_name", { length: 255 }),
      logoUrl: text("logo_url"),
      // Behavior
      requireEmail: boolean("require_email").default(false),
      enableSound: boolean("enable_sound").default(true),
      autoOpen: boolean("auto_open").default(false),
      autoOpenDelay: integer("auto_open_delay").default(0),
      // seconds before auto-open, 0 = disabled
      // Business hours awareness
      showOfflineForm: boolean("show_offline_form").default(true),
      timezone: varchar("timezone", { length: 50 }).default("America/New_York"),
      // Allowed domains (security — only load widget on these domains)
      allowedDomains: text("allowed_domains").array(),
      // Custom CSS override
      customCss: text("custom_css"),
      // Feature flags
      enableFileUpload: boolean("enable_file_upload").default(false),
      enableEmoji: boolean("enable_emoji").default(true),
      enablePreChatForm: boolean("enable_pre_chat_form").default(true),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    chatAgents = pgTable("chat_agents", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // Agent identity
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 255 }).notNull(),
      avatarUrl: text("avatar_url"),
      displayName: varchar("display_name", { length: 255 }),
      // shown to visitors in chat
      // Role and permissions
      role: varchar("role", { length: 20 }).default("agent"),
      // admin, agent, viewer
      canTransfer: boolean("can_transfer").default(true),
      canCloseConversations: boolean("can_close_conversations").default(true),
      maxConcurrentChats: integer("max_concurrent_chats").default(5),
      // Availability
      isOnline: boolean("is_online").default(false),
      lastSeenAt: timestamp("last_seen_at"),
      statusMessage: varchar("status_message", { length: 255 }),
      // Notification preferences
      notifyEmail: boolean("notify_email").default(true),
      notifySound: boolean("notify_sound").default(true),
      notifyDesktop: boolean("notify_desktop").default(true),
      // Performance tracking
      totalChatsHandled: integer("total_chats_handled").default(0),
      avgResponseTimeSec: integer("avg_response_time_sec"),
      rating: integer("rating"),
      // 1-5 aggregate
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_chat_agent_client").on(table.clientId),
      index("idx_chat_agent_email").on(table.email)
    ]);
    chatAnalyticsEvents = pgTable("chat_analytics_events", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      // Event identification
      eventType: varchar("event_type", { length: 50 }).notNull(),
      // widget_loaded, widget_opened, chat_started, message_sent, message_received, chat_ended, pre_chat_form_submitted, rating_submitted, file_uploaded, agent_assigned, agent_transferred
      visitorId: varchar("visitor_id", { length: 100 }),
      sessionId: varchar("session_id", { length: 100 }),
      conversationId: integer("conversation_id").references(() => inboxConversations.id),
      agentId: integer("agent_id").references(() => chatAgents.id),
      // Event data
      metadata: jsonb("metadata"),
      // event-specific payload
      // Visitor context
      pageUrl: text("page_url"),
      referrer: text("referrer"),
      userAgent: text("user_agent"),
      country: varchar("country", { length: 100 }),
      city: varchar("city", { length: 100 }),
      // Timing
      durationMs: integer("duration_ms"),
      // for timed events like chat_ended
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_chat_analytics_client").on(table.clientId),
      index("idx_chat_analytics_event_type").on(table.eventType),
      index("idx_chat_analytics_session").on(table.sessionId),
      index("idx_chat_analytics_created").on(table.createdAt)
    ]);
    insertChatWidgetSettingsSchema = createInsertSchema(chatWidgetSettings);
    updateChatWidgetSettingsSchema = insertChatWidgetSettingsSchema.partial().omit({ id: true, clientId: true, createdAt: true });
    insertChatAgentSchema = createInsertSchema(chatAgents);
    insertChatAnalyticsEventSchema = createInsertSchema(chatAnalyticsEvents);
    seoProfiles = pgTable("seo_profiles", {
      id: serial("id").primaryKey(),
      clientId: integer("client_id").references(() => clients.id).notNull(),
      domain: varchar("domain", { length: 500 }).notNull(),
      businessName: varchar("business_name", { length: 255 }),
      industry: varchar("industry", { length: 100 }),
      location: varchar("location", { length: 255 }),
      targetKeywords: jsonb("target_keywords"),
      // string[]
      competitors: jsonb("competitors"),
      // string[]
      localEnabled: boolean("local_enabled").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => [
      index("idx_seo_profile_client").on(table.clientId)
    ]);
    seoScans = pgTable("seo_scans", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      scanType: varchar("scan_type", { length: 50 }).default("full"),
      // full, quick, technical, on-page
      overallScore: integer("overall_score"),
      performanceScore: integer("performance_score"),
      seoScore: integer("seo_score"),
      accessibilityScore: integer("accessibility_score"),
      metrics: jsonb("metrics"),
      issues: jsonb("issues"),
      recommendations: jsonb("recommendations"),
      status: varchar("status", { length: 20 }).default("pending"),
      // pending, running, completed, failed
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_scan_profile").on(table.profileId),
      index("idx_seo_scan_status").on(table.status)
    ]);
    seoKeywords = pgTable("seo_keywords", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      keyword: varchar("keyword", { length: 500 }).notNull(),
      searchVolume: integer("search_volume"),
      difficulty: integer("difficulty"),
      currentRank: integer("current_rank"),
      status: varchar("status", { length: 20 }).default("tracking"),
      // tracking, paused, removed
      source: varchar("source", { length: 50 }).default("manual"),
      // manual, ai-suggested, imported
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_keyword_profile").on(table.profileId)
    ]);
    seoKeywordRankings = pgTable("seo_keyword_rankings", {
      id: serial("id").primaryKey(),
      keywordId: integer("keyword_id").references(() => seoKeywords.id).notNull(),
      rank: integer("rank"),
      url: text("url"),
      date: timestamp("date").defaultNow()
    }, (table) => [
      index("idx_seo_ranking_keyword").on(table.keywordId),
      index("idx_seo_ranking_date").on(table.date)
    ]);
    seoPages = pgTable("seo_pages", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      url: text("url").notNull(),
      title: varchar("title", { length: 500 }),
      metaDescription: text("meta_description"),
      h1: varchar("h1", { length: 500 }),
      wordCount: integer("word_count"),
      score: integer("score"),
      issues: jsonb("issues"),
      suggestions: jsonb("suggestions"),
      lastAnalyzed: timestamp("last_analyzed"),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_page_profile").on(table.profileId)
    ]);
    seoTechnicalIssues = pgTable("seo_technical_issues", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      scanId: integer("scan_id").references(() => seoScans.id),
      type: varchar("type", { length: 50 }).notNull(),
      // broken-link, missing-meta, slow-page, no-ssl, etc.
      severity: varchar("severity", { length: 20 }).default("medium"),
      // critical, high, medium, low
      url: text("url"),
      description: text("description"),
      howToFix: text("how_to_fix"),
      status: varchar("status", { length: 20 }).default("open"),
      // open, resolved, dismissed
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_issue_profile").on(table.profileId),
      index("idx_seo_issue_severity").on(table.severity)
    ]);
    seoBacklinks = pgTable("seo_backlinks", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      sourceUrl: text("source_url"),
      targetUrl: text("target_url"),
      anchorText: varchar("anchor_text", { length: 500 }),
      domainAuthority: integer("domain_authority"),
      status: varchar("status", { length: 20 }).default("active"),
      firstSeen: timestamp("first_seen").defaultNow(),
      lastSeen: timestamp("last_seen")
    }, (table) => [
      index("idx_seo_backlink_profile").on(table.profileId)
    ]);
    seoContentBriefs = pgTable("seo_content_briefs", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      targetKeyword: varchar("target_keyword", { length: 500 }).notNull(),
      title: varchar("title", { length: 500 }),
      outline: jsonb("outline"),
      suggestions: jsonb("suggestions"),
      wordCountTarget: integer("word_count_target"),
      status: varchar("status", { length: 20 }).default("draft"),
      // draft, in-progress, completed
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_brief_profile").on(table.profileId)
    ]);
    seoActionItems = pgTable("seo_action_items", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      title: varchar("title", { length: 500 }).notNull(),
      description: text("description"),
      category: varchar("category", { length: 50 }),
      // technical, content, keywords, on-page, local
      priority: varchar("priority", { length: 20 }).default("medium"),
      // critical, high, medium, low
      impact: varchar("impact", { length: 20 }).default("medium"),
      // high, medium, low
      effort: varchar("effort", { length: 20 }).default("medium"),
      // high, medium, low
      status: varchar("status", { length: 20 }).default("pending"),
      // pending, in-progress, completed, dismissed
      dueDate: timestamp("due_date"),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_action_profile").on(table.profileId),
      index("idx_seo_action_status").on(table.status)
    ]);
    seoReports = pgTable("seo_reports", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      type: varchar("type", { length: 50 }).default("monthly"),
      period: varchar("period", { length: 50 }),
      data: jsonb("data"),
      generatedAt: timestamp("generated_at").defaultNow()
    }, (table) => [
      index("idx_seo_report_profile").on(table.profileId)
    ]);
    seoCompetitors = pgTable("seo_competitors", {
      id: serial("id").primaryKey(),
      profileId: integer("profile_id").references(() => seoProfiles.id).notNull(),
      domain: varchar("domain", { length: 500 }).notNull(),
      name: varchar("name", { length: 255 }),
      createdAt: timestamp("created_at").defaultNow()
    }, (table) => [
      index("idx_seo_competitor_profile").on(table.profileId)
    ]);
    seoCompetitorData = pgTable("seo_competitor_data", {
      id: serial("id").primaryKey(),
      competitorId: integer("competitor_id").references(() => seoCompetitors.id).notNull(),
      metric: varchar("metric", { length: 100 }),
      value: text("value"),
      date: timestamp("date").defaultNow()
    }, (table) => [
      index("idx_seo_comp_data_competitor").on(table.competitorId)
    ]);
    insertSeoProfileSchema = createInsertSchema(seoProfiles);
    insertSeoScanSchema = createInsertSchema(seoScans);
    insertSeoKeywordSchema = createInsertSchema(seoKeywords);
    insertSeoKeywordRankingSchema = createInsertSchema(seoKeywordRankings);
    insertSeoPageSchema = createInsertSchema(seoPages);
    insertSeoTechnicalIssueSchema = createInsertSchema(seoTechnicalIssues);
    insertSeoBacklinkSchema = createInsertSchema(seoBacklinks);
    insertSeoContentBriefSchema = createInsertSchema(seoContentBriefs);
    insertSeoActionItemSchema = createInsertSchema(seoActionItems);
    insertSeoReportSchema = createInsertSchema(seoReports);
    insertSeoCompetitorSchema = createInsertSchema(seoCompetitors);
    insertSeoCompetitorDataSchema = createInsertSchema(seoCompetitorData);
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
import { eq as eq3, and as and3, inArray } from "drizzle-orm";
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
        const media = await db.select().from(contentMedia2).where(inArray(contentMedia2.id, post.mediaIds));
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
import jwt2 from "jsonwebtoken";
import crypto5 from "crypto";
import { eq as eq19 } from "drizzle-orm";
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
        if (this.algorithm === "HS256") {
          const hasSecret = !!process.env.JWT_SECRET;
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
        const token = jwt2.sign(payload, signingKey, options);
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
          const decoded = jwt2.verify(token, verificationKey, options);
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
        await db.update(dashboardAccess).set({ isActive: false }).where(eq19(dashboardAccess.accessToken, token));
      }
      /**
       * Check if token is active in database
       */
      async isTokenActive(token) {
        const [record] = await db.select().from(dashboardAccess).where(eq19(dashboardAccess.accessToken, token));
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
          const publicKey = crypto5.createPublicKey(this.keyPair.publicKey);
          const jwk = publicKey.export({ format: "jwk" });
          return {
            ...jwk,
            alg: this.algorithm,
            use: "sig",
            kid: crypto5.createHash("sha256").update(this.keyPair.publicKey).digest("hex").substring(0, 16)
          };
        }
        return null;
      }
    };
    jwtService = new JWTService();
  }
});

// server/services/ai-provider.ts
var ai_provider_exports = {};
__export(ai_provider_exports, {
  UnifiedAIService: () => UnifiedAIService,
  unifiedAI: () => unifiedAI
});
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
var UnifiedAIService, unifiedAI;
var init_ai_provider = __esm({
  "server/services/ai-provider.ts"() {
    "use strict";
    UnifiedAIService = class {
      anthropic;
      openai;
      deepseek;
      constructor() {
        this.anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY || ""
        });
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_SECRET_KEY || ""
        });
        this.deepseek = new OpenAI({
          apiKey: process.env.DEEPSEEK_API_KEY || "",
          baseURL: "https://api.deepseek.com"
        });
      }
      async getCompletion(provider, request) {
        try {
          switch (provider) {
            case "claude":
              return await this.getClaudeCompletion(request);
            case "openai":
              return await this.getOpenAICompletion(request);
            case "deepseek":
              return await this.getDeepSeekCompletion(request);
            default:
              throw new Error(`Unknown AI provider: ${provider}`);
          }
        } catch (error) {
          console.error(`[AI Provider] ${provider} failed:`, error);
          return await this.getCompletionWithFallback(provider, request);
        }
      }
      async getClaudeCompletion(request) {
        const systemMessage = request.messages.find((m) => m.role === "system");
        const userMessages = request.messages.filter((m) => m.role !== "system");
        const response = await this.anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: request.maxTokens || 4096,
          temperature: request.temperature || 0.7,
          system: systemMessage?.content,
          messages: userMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        });
        const content = response.content[0].type === "text" ? response.content[0].text : "";
        return {
          content,
          provider: "claude",
          model: "claude-sonnet-4-20250514",
          tokensUsed: response.usage.input_tokens + response.usage.output_tokens
        };
      }
      async getOpenAICompletion(request) {
        const params = {
          model: "gpt-4o",
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 4096
        };
        if (request.responseFormat === "json") {
          params.response_format = { type: "json_object" };
        }
        const response = await this.openai.chat.completions.create(params);
        return {
          content: response.choices[0]?.message?.content || "",
          provider: "openai",
          model: "gpt-4o",
          tokensUsed: response.usage?.total_tokens
        };
      }
      async getDeepSeekCompletion(request) {
        const params = {
          model: "deepseek-chat",
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 4096
        };
        if (request.responseFormat === "json") {
          params.response_format = { type: "json_object" };
        }
        const response = await this.deepseek.chat.completions.create(params);
        return {
          content: response.choices[0]?.message?.content || "",
          provider: "deepseek",
          model: "deepseek-chat",
          tokensUsed: response.usage?.total_tokens
        };
      }
      async getCompletionWithFallback(failedProvider, request) {
        const fallbackOrder = ["deepseek", "claude", "openai"];
        const remainingProviders = fallbackOrder.filter((p) => p !== failedProvider);
        for (const provider of remainingProviders) {
          try {
            console.log(`[AI Provider] Trying fallback: ${provider}`);
            switch (provider) {
              case "claude":
                return await this.getClaudeCompletion(request);
              case "openai":
                return await this.getOpenAICompletion(request);
              case "deepseek":
                return await this.getDeepSeekCompletion(request);
            }
          } catch (error) {
            console.error(`[AI Provider] Fallback ${provider} also failed:`, error);
            continue;
          }
        }
        throw new Error("All AI providers failed");
      }
      async testProvider(provider) {
        const testRequest = {
          messages: [{ role: "user", content: 'Reply with "OK" if you can read this message.' }],
          maxTokens: 10,
          temperature: 0
        };
        try {
          let response;
          switch (provider) {
            case "claude":
              response = await this.getClaudeCompletion(testRequest);
              break;
            case "openai":
              response = await this.getOpenAICompletion(testRequest);
              break;
            case "deepseek":
              response = await this.getDeepSeekCompletion(testRequest);
              break;
            default:
              throw new Error(`Unknown provider: ${provider}`);
          }
          if (response.provider !== provider) {
            return { success: false, message: `Unexpected provider response: ${response.provider}` };
          }
          return {
            success: true,
            message: `Connected! Response: ${response.content.substring(0, 50)}`,
            tokensUsed: response.tokensUsed
          };
        } catch (error) {
          console.error(`[AI Provider Test] ${provider} test failed:`, error);
          return {
            success: false,
            message: error.message || "Connection failed - check API key configuration"
          };
        }
      }
    };
    unifiedAI = new UnifiedAIService();
  }
});

// server/services/ai-settings.ts
var ai_settings_exports = {};
__export(ai_settings_exports, {
  AISettingsService: () => AISettingsService,
  aiSettingsService: () => aiSettingsService
});
import { eq as eq21 } from "drizzle-orm";
var AISettingsService, aiSettingsService;
var init_ai_settings = __esm({
  "server/services/ai-settings.ts"() {
    "use strict";
    init_db();
    init_schema();
    AISettingsService = class {
      async getProvider(feature) {
        try {
          const setting = await db.query.aiSettings.findFirst({
            where: eq21(aiSettings.feature, feature)
          });
          return setting?.provider || this.getDefaultProvider(feature);
        } catch (error) {
          console.error(`[AI Settings] Error fetching provider for ${feature}:`, error);
          return this.getDefaultProvider(feature);
        }
      }
      getDefaultProvider(feature) {
        switch (feature) {
          case "coach_blue":
            return "claude";
          case "assessment":
          case "prescription":
          default:
            return "deepseek";
        }
      }
      async updateProvider(feature, provider, updatedBy) {
        const existing = await db.query.aiSettings.findFirst({
          where: eq21(aiSettings.feature, feature)
        });
        if (existing) {
          await db.update(aiSettings).set({
            provider,
            lastUpdated: /* @__PURE__ */ new Date(),
            updatedBy
          }).where(eq21(aiSettings.feature, feature));
        } else {
          await db.insert(aiSettings).values({
            feature,
            provider,
            isActive: true,
            lastUpdated: /* @__PURE__ */ new Date(),
            updatedBy
          });
        }
        console.log(`[AI Settings] Updated ${feature} to use ${provider}`);
      }
      async getAllSettings() {
        try {
          const settings = await db.select().from(aiSettings);
          if (settings.length === 0) {
            await this.seedDefaults();
            return await db.select().from(aiSettings);
          }
          return settings;
        } catch (error) {
          console.error("[AI Settings] Error fetching all settings:", error);
          return [];
        }
      }
      async seedDefaults() {
        const defaults = [
          { feature: "assessment", provider: "deepseek", isActive: true },
          { feature: "prescription", provider: "deepseek", isActive: true },
          { feature: "coach_blue", provider: "claude", isActive: true }
        ];
        for (const setting of defaults) {
          const existing = await db.query.aiSettings.findFirst({
            where: eq21(aiSettings.feature, setting.feature)
          });
          if (!existing) {
            await db.insert(aiSettings).values({
              feature: setting.feature,
              provider: setting.provider,
              isActive: setting.isActive,
              lastUpdated: /* @__PURE__ */ new Date()
            });
            console.log(`[AI Settings] Seeded default for ${setting.feature}: ${setting.provider}`);
          }
        }
      }
    };
    aiSettingsService = new AISettingsService();
  }
});

// server/services/reviewAI.ts
var reviewAI_exports = {};
__export(reviewAI_exports, {
  ReviewAIService: () => ReviewAIService,
  reviewAI: () => reviewAI
});
import OpenAI2 from "openai";
var ReviewAIService, reviewAI;
var init_reviewAI = __esm({
  "server/services/reviewAI.ts"() {
    "use strict";
    ReviewAIService = class {
      openai;
      model = "gpt-4o";
      constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error("OPENAI_API_KEY environment variable is required");
        }
        this.openai = new OpenAI2({ apiKey });
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
    reviewAI = new ReviewAIService();
  }
});

// server/services/scheduler.ts
var scheduler_exports = {};
__export(scheduler_exports, {
  getSchedulerStatus: () => getSchedulerStatus,
  startScheduler: () => startScheduler,
  stopScheduler: () => stopScheduler
});
import { eq as eq35, and as and22, lte as lte3, isNull as isNull2, or as or5 } from "drizzle-orm";
import { sql as sql12 } from "drizzle-orm";
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
      and22(
        eq35(contentPosts.status, "scheduled"),
        lte3(contentPosts.scheduledFor, sql12`NOW()`),
        or5(
          isNull2(contentPosts.lockedAt),
          lte3(contentPosts.lockedAt, sql12`NOW() - INTERVAL '5 minutes'`)
        ),
        or5(
          isNull2(contentPosts.nextRetryAt),
          lte3(contentPosts.nextRetryAt, sql12`NOW()`)
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
      lockedAt: sql12`NOW()`,
      status: "publishing"
    }).where(
      and22(
        eq35(contentPosts.id, postId),
        eq35(contentPosts.status, "scheduled"),
        or5(
          isNull2(contentPosts.lockedAt),
          lte3(contentPosts.lockedAt, sql12`NOW() - INTERVAL '5 minutes'`)
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
        publishedAt: sql12`NOW()`,
        lockedAt: null,
        lastError: null,
        updatedAt: sql12`NOW()`
      }).where(eq35(contentPosts.id, postId));
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
        updatedAt: sql12`NOW()`
      }).where(eq35(contentPosts.id, postId));
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
        updatedAt: sql12`NOW()`
      }).where(eq35(contentPosts.id, postId));
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
    const computedLocation = assessmentData.city && assessmentData.state ? `${assessmentData.city}, ${assessmentData.state}` : assessmentData.address || "Not specified";
    const dataWithLocation = {
      ...assessmentData,
      location: computedLocation
    };
    const [assessment] = await db.insert(assessments).values(dataWithLocation).returning();
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
        sql4`${subscriptionAddons.name} LIKE '%Post Management%'`
      )
    ).limit(1);
    if (hasAccess.length === 0) {
      return res.status(403).json({
        message: "Post Management not available. Please upgrade your subscription."
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
      sql4`${subscriptionAddons.name} LIKE '%Post Management%'`
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
  "/portal/respond",
  "/portal/dashboard",
  "/post",
  "/respond"
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
    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/portal/respond";
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
    const returnUrl = isValidReturnPath(stateResult.data.returnUrl) ? stateResult.data.returnUrl : "/portal/respond";
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
        const [existingSocial] = await db.select().from(socialMediaAccounts).where(
          and5(
            eq6(socialMediaAccounts.clientId, clientId),
            eq6(socialMediaAccounts.platform, platform),
            eq6(socialMediaAccounts.platformAccountId, page.id)
          )
        );
        if (existingSocial) {
          await db.update(socialMediaAccounts).set({
            accessToken: page.access_token,
            platformAccountName: page.name,
            isActive: true,
            lastSyncedAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date(),
            metadata: { pageCategory: page.category, userAccessToken }
          }).where(eq6(socialMediaAccounts.id, existingSocial.id));
        } else {
          await db.insert(socialMediaAccounts).values({
            clientId,
            platform,
            platformAccountId: page.id,
            platformAccountName: page.name,
            accessToken: page.access_token,
            accountType: "page",
            permissions: PLATFORM_SCOPES[platform],
            isActive: true,
            lastSyncedAt: /* @__PURE__ */ new Date(),
            metadata: { pageCategory: page.category, userAccessToken }
          });
        }
      }
    }
    const redirectWithStatus = returnUrl.includes("?") ? `${returnUrl}&oauth=success&platform=${platform}` : `${returnUrl}?oauth=success&platform=${platform}`;
    res.redirect(redirectWithStatus);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect("/portal/respond?oauth=error");
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

// server/routes/google.ts
init_db();
init_schema();
import { Router as Router3 } from "express";
import { eq as eq7, and as and6 } from "drizzle-orm";
import crypto2 from "crypto";
var router3 = Router3();
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_STATE_SECRET = process.env.GOOGLE_CLIENT_SECRET || "google-fallback-secret";
var GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];
var ALLOWED_RETURN_PATHS2 = [
  "/post",
  "/portal/dashboard",
  "/publish-app",
  "/elevate-app"
];
function signState2(data) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto2.createHmac("sha256", GOOGLE_STATE_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}
function verifyState2(state) {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };
    const expectedSignature = crypto2.createHmac("sha256", GOOGLE_STATE_SECRET).update(payload).digest("hex");
    if (!crypto2.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false };
    }
    const data = JSON.parse(Buffer.from(payload, "base64").toString());
    return { valid: true, data };
  } catch {
    return { valid: false };
  }
}
function isValidReturnPath2(path4) {
  if (!path4) return false;
  return path4.startsWith("/") && ALLOWED_RETURN_PATHS2.some(
    (allowed) => path4 === allowed || path4.startsWith(allowed + "?") || path4.startsWith(allowed + "/")
  );
}
function getRedirectUri2(req) {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/api/google/oauth/callback`;
}
router3.get("/oauth/start", (req, res) => {
  try {
    const clientId = req.query.clientId;
    const returnUrl = req.query.returnUrl;
    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({ error: "Google OAuth not configured" });
    }
    const safeReturnUrl = isValidReturnPath2(returnUrl) ? returnUrl : "/post";
    const stateData = {
      clientId: parseInt(clientId),
      returnUrl: safeReturnUrl,
      nonce: crypto2.randomBytes(16).toString("hex"),
      timestamp: Date.now()
    };
    const state = signState2(stateData);
    const redirectUri = getRedirectUri2(req);
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", GOOGLE_SCOPES.join(" "));
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "consent");
    console.log(`Starting Google OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("Google OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});
router3.get("/oauth/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const stateParam = req.query.state;
    const error = req.query.error;
    if (error) {
      console.error("Google OAuth denied:", error);
      return res.redirect("/post?oauth=error&reason=denied");
    }
    if (!code || !stateParam) {
      return res.status(400).json({ error: "Missing authorization code or state" });
    }
    const stateResult = verifyState2(stateParam);
    if (!stateResult.valid || !stateResult.data) {
      return res.status(403).json({ error: "Invalid state - possible CSRF attack" });
    }
    const stateAge = Date.now() - (stateResult.data.timestamp || 0);
    if (stateAge > 10 * 60 * 1e3) {
      return res.status(400).json({ error: "OAuth session expired. Please try again." });
    }
    const clientId = stateResult.data.clientId;
    const returnUrl = isValidReturnPath2(stateResult.data.returnUrl) ? stateResult.data.returnUrl : "/post";
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: getRedirectUri2(req),
        grant_type: "authorization_code"
      })
    });
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&reason=token_exchange`);
    }
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile = await profileResponse.json();
    const accountsResponse = await fetch(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const accountsData = await accountsResponse.json();
    if (accountsData.error) {
      console.error("Failed to get Google Business accounts:", accountsData.error);
    }
    const accounts = accountsData.accounts || [];
    if (accounts.length > 0) {
      for (const account of accounts) {
        const accountId = account.name?.split("/").pop() || account.name;
        const accountName = account.accountName || profile.name || "Google Business";
        let locationName = accountName;
        try {
          const locationsResponse = await fetch(
            `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          const locationsData = await locationsResponse.json();
          if (locationsData.locations && locationsData.locations.length > 0) {
            locationName = locationsData.locations[0].title || accountName;
          }
        } catch {
        }
        const [existing] = await db.select().from(socialMediaAccounts).where(
          and6(
            eq7(socialMediaAccounts.clientId, clientId),
            eq7(socialMediaAccounts.platform, "google_business"),
            eq7(socialMediaAccounts.platformAccountId, accountId)
          )
        );
        const tokenExpiry = expiresIn ? new Date(Date.now() + expiresIn * 1e3) : null;
        if (existing) {
          await db.update(socialMediaAccounts).set({
            accessToken,
            refreshToken: refreshToken || existing.refreshToken,
            tokenExpiresAt: tokenExpiry,
            platformAccountName: locationName,
            isActive: true,
            lastSyncedAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date(),
            metadata: {
              accountName: account.accountName,
              accountType: account.type,
              verificationState: account.verificationState,
              profileEmail: profile.email
            }
          }).where(eq7(socialMediaAccounts.id, existing.id));
        } else {
          await db.insert(socialMediaAccounts).values({
            clientId,
            platform: "google_business",
            platformAccountId: accountId,
            platformAccountName: locationName,
            platformAccountHandle: profile.email,
            platformAccountAvatar: profile.picture || null,
            accessToken,
            refreshToken: refreshToken || null,
            tokenExpiresAt: tokenExpiry,
            accountType: account.type || "PERSONAL",
            permissions: GOOGLE_SCOPES,
            isActive: true,
            lastSyncedAt: /* @__PURE__ */ new Date(),
            metadata: {
              accountName: account.accountName,
              accountType: account.type,
              verificationState: account.verificationState,
              profileEmail: profile.email
            }
          });
        }
        console.log(`Connected Google Business: ${locationName}`);
      }
    } else {
      const [existing] = await db.select().from(socialMediaAccounts).where(
        and6(
          eq7(socialMediaAccounts.clientId, clientId),
          eq7(socialMediaAccounts.platform, "google_business"),
          eq7(socialMediaAccounts.platformAccountId, profile.id || profile.email)
        )
      );
      if (!existing) {
        await db.insert(socialMediaAccounts).values({
          clientId,
          platform: "google_business",
          platformAccountId: profile.id || profile.email,
          platformAccountName: profile.name || "Google Account",
          platformAccountHandle: profile.email,
          platformAccountAvatar: profile.picture || null,
          accessToken,
          refreshToken: refreshToken || null,
          tokenExpiresAt: expiresIn ? new Date(Date.now() + expiresIn * 1e3) : null,
          accountType: "PERSONAL",
          permissions: GOOGLE_SCOPES,
          isActive: true,
          lastSyncedAt: /* @__PURE__ */ new Date(),
          metadata: { profileEmail: profile.email, noBusinessProfile: true }
        });
      }
    }
    const redirectWithStatus = returnUrl.includes("?") ? `${returnUrl}&oauth=success&platform=google_business` : `${returnUrl}?oauth=success&platform=google_business`;
    res.redirect(redirectWithStatus);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    res.redirect("/post?oauth=error");
  }
});
var google_default = router3;

// server/routes/tasks.ts
init_db();
init_schema();
import { Router as Router4 } from "express";
import { eq as eq8, and as and7, desc as desc3 } from "drizzle-orm";
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
var tasksRouter = Router4();
tasksRouter.get("/", async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const clientId = user.claims.sub;
    const allTasks = await db.select().from(tasks).where(eq8(tasks.clientId, clientId)).orderBy(desc3(tasks.createdAt));
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
    const [task] = await db.select().from(tasks).where(and7(
      eq8(tasks.id, taskId),
      eq8(tasks.clientId, clientId)
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
          }).where(eq8(tasks.id, newTask.id));
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
    const [updatedTask] = await db.update(tasks).set(updateData).where(and7(
      eq8(tasks.id, taskId),
      eq8(tasks.clientId, clientId)
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
    const [deletedTask] = await db.delete(tasks).where(and7(
      eq8(tasks.id, taskId),
      eq8(tasks.clientId, clientId)
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
import { Router as Router5 } from "express";
import { eq as eq9 } from "drizzle-orm";
var router4 = Router5();
router4.get("/", async (req, res) => {
  try {
    const colors = await db.select().from(brandColors);
    res.json({ success: true, colors });
  } catch (error) {
    console.error("Error fetching brand colors:", error);
    res.status(500).json({ success: false, error: "Failed to fetch colors" });
  }
});
router4.post("/", async (req, res) => {
  try {
    const validatedData = insertBrandColorSchema.parse(req.body);
    const [newColor] = await db.insert(brandColors).values(validatedData).returning();
    res.json({ success: true, color: newColor });
  } catch (error) {
    console.error("Error adding brand color:", error);
    res.status(400).json({ success: false, error: "Failed to add color" });
  }
});
router4.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }
    await db.delete(brandColors).where(eq9(brandColors.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting brand color:", error);
    res.status(500).json({ success: false, error: "Failed to delete color" });
  }
});
var brand_colors_default = router4;

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
  const sessionTtlSeconds = 7 * 24 * 60 * 60;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtlSeconds,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || process.env.REPLIT_DOMAINS !== void 0,
      sameSite: "lax",
      maxAge: sessionTtlSeconds * 1e3
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
    const redirect = req.query.redirect;
    if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
      req.session.loginRedirect = redirect;
    }
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, (err, user) => {
      if (err) {
        console.error("[Auth] Callback error:", err);
        return res.redirect("/api/login");
      }
      if (!user) {
        console.error("[Auth] No user returned from callback");
        return res.redirect("/api/login");
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error("[Auth] Login error:", loginErr);
          return res.redirect("/api/login");
        }
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error("[Auth] Session save error:", saveErr);
          }
          console.log("[Auth] User logged in successfully:", user.claims?.email);
          const redirectTo = req.session.loginRedirect || "/admin";
          delete req.session.loginRedirect;
          return res.redirect(redirectTo);
        });
      });
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
  const session2 = req.session;
  if (session2?.clientId && session2?.isAdmin) {
    console.log("[Auth] Client portal admin session found:", session2.clientId);
    return next();
  }
  const user = req.user;
  if (!req.isAuthenticated() || !user?.expires_at) {
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
import { eq as eq11 } from "drizzle-orm";

// server/middleware/clientPortalAuth.ts
init_db();
init_schema();
import { eq as eq10 } from "drizzle-orm";
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
      where: eq10(clients.id, sessionClientId),
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
      where: eq11(clients.id, parseInt(userId))
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
function registerBillingAdminRoutes(router6) {
  router6.get("/api/admin/subscriptions", requireAdmin, async (req, res) => {
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
  router6.get("/api/admin/clients/:id/billing", requireAdmin, async (req, res) => {
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
  router6.patch("/api/admin/clients/:id/status", requireAdmin, async (req, res) => {
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
  router6.get("/api/portal/subscription", requireClientPortalAccess, async (req, res) => {
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
  router6.get("/api/portal/billing-history", requireClientPortalAccess, async (req, res) => {
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
}

// server/routes/email-admin.ts
init_db();
init_schema();
init_schema();
import { eq as eq12, desc as desc4, and as and8, sql as sql5, ilike, gte, lte, or } from "drizzle-orm";
import { Resend } from "resend";
var connectionSettings;
async function getResendCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY ? "repl " + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? "depl " + process.env.WEB_REPL_RENEWAL : null;
  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }
  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
    {
      headers: {
        "Accept": "application/json",
        "X_REPLIT_TOKEN": xReplitToken
      }
    }
  ).then((res) => res.json()).then((data) => data.items?.[0]);
  if (!connectionSettings || !connectionSettings.settings.api_key) {
    throw new Error("Resend not connected");
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}
function registerEmailAdminRoutes(app2) {
  console.log("[EMAIL ADMIN] Registering email admin routes");
  app2.get("/api/admin/email-logs", isAuthenticated, async (req, res) => {
    console.log("[EMAIL ADMIN] GET /api/admin/email-logs hit, user:", req.user?.claims?.sub);
    try {
      const { status, emailType, search, startDate, endDate, page = "1", limit = "50" } = req.query;
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const offset = (pageNum - 1) * limitNum;
      let conditions = [];
      if (status && status !== "all") {
        conditions.push(eq12(emailLogs.status, status));
      }
      if (emailType && emailType !== "all") {
        conditions.push(eq12(emailLogs.emailType, emailType));
      }
      if (search) {
        conditions.push(or(
          ilike(emailLogs.recipientEmail, `%${search}%`),
          ilike(emailLogs.recipientName, `%${search}%`),
          ilike(emailLogs.subject, `%${search}%`)
        ));
      }
      if (startDate) {
        conditions.push(gte(emailLogs.createdAt, new Date(startDate)));
      }
      if (endDate) {
        conditions.push(lte(emailLogs.createdAt, new Date(endDate)));
      }
      const whereClause = conditions.length > 0 ? and8(...conditions) : void 0;
      const [logs, totalResult] = await Promise.all([
        db.select().from(emailLogs).where(whereClause).orderBy(desc4(emailLogs.createdAt)).limit(limitNum).offset(offset),
        db.select({ count: sql5`count(*)` }).from(emailLogs).where(whereClause)
      ]);
      const total = Number(totalResult[0]?.count || 0);
      const statsResult = await db.select({
        status: emailLogs.status,
        count: sql5`count(*)`
      }).from(emailLogs).groupBy(emailLogs.status);
      const stats = {
        total,
        sent: 0,
        failed: 0,
        pending: 0,
        bounced: 0,
        opened: 0,
        clicked: 0
      };
      statsResult.forEach((s) => {
        if (s.status && s.status in stats) {
          stats[s.status] = Number(s.count);
        }
      });
      res.json({
        logs,
        stats,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } catch (error) {
      console.error("Error fetching email logs:", error);
      res.status(500).json({ error: "Failed to fetch email logs" });
    }
  });
  app2.get("/api/admin/email-logs/:id", isAuthenticated, async (req, res) => {
    try {
      const logId = parseInt(req.params.id);
      const log2 = await db.query.emailLogs.findFirst({
        where: eq12(emailLogs.id, logId)
      });
      if (!log2) {
        return res.status(404).json({ error: "Email log not found" });
      }
      res.json(log2);
    } catch (error) {
      console.error("Error fetching email log:", error);
      res.status(500).json({ error: "Failed to fetch email log" });
    }
  });
  app2.get("/api/admin/emails/failed", isAuthenticated, async (req, res) => {
    try {
      const failedLogs = await db.select().from(emailLogs).where(eq12(emailLogs.status, "failed")).orderBy(desc4(emailLogs.createdAt)).limit(100);
      res.json(failedLogs);
    } catch (error) {
      console.error("Error fetching failed emails:", error);
      res.status(500).json({ error: "Failed to fetch failed emails" });
    }
  });
  app2.post("/api/admin/emails/resend/:logId", isAuthenticated, async (req, res) => {
    try {
      const logId = parseInt(req.params.logId);
      const { subject, htmlBody, recipientEmail } = req.body;
      const originalLog = await db.query.emailLogs.findFirst({
        where: eq12(emailLogs.id, logId)
      });
      if (!originalLog) {
        return res.status(404).json({ error: "Email log not found" });
      }
      const { apiKey, fromEmail } = await getResendCredentials();
      const client2 = new Resend(apiKey);
      const emailSubject = subject || originalLog.subject;
      const emailHtml = htmlBody || originalLog.htmlBody;
      const emailTo = recipientEmail || originalLog.recipientEmail;
      const result = await client2.emails.send({
        from: fromEmail || "noreply@businessblueprint.io",
        to: emailTo,
        subject: emailSubject,
        html: emailHtml
      });
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      const [newLog] = await db.insert(emailLogs).values({
        recipientEmail: emailTo,
        recipientName: originalLog.recipientName,
        clientId: originalLog.clientId,
        assessmentId: originalLog.assessmentId,
        emailType: originalLog.emailType,
        subject: emailSubject,
        htmlBody: emailHtml,
        status: "sent",
        resendApiId: result.data?.id,
        sentAt: /* @__PURE__ */ new Date(),
        sentByAdminId: adminId
      }).returning();
      if (originalLog.status === "failed") {
        await db.update(emailLogs).set({
          retryCount: (originalLog.retryCount || 0) + 1,
          lastRetryAt: /* @__PURE__ */ new Date()
        }).where(eq12(emailLogs.id, logId));
      }
      res.json({ success: true, log: newLog });
    } catch (error) {
      console.error("Error resending email:", error);
      res.status(500).json({ error: "Failed to resend email", details: error instanceof Error ? error.message : String(error) });
    }
  });
  app2.post("/api/admin/emails/send-custom", isAuthenticated, async (req, res) => {
    try {
      const { recipientEmail, recipientName, subject, htmlBody, emailType = "custom" } = req.body;
      if (!recipientEmail || !subject || !htmlBody) {
        return res.status(400).json({ error: "Missing required fields: recipientEmail, subject, htmlBody" });
      }
      const { apiKey, fromEmail } = await getResendCredentials();
      const client2 = new Resend(apiKey);
      const result = await client2.emails.send({
        from: fromEmail || "noreply@businessblueprint.io",
        to: recipientEmail,
        subject,
        html: htmlBody
      });
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      const [log2] = await db.insert(emailLogs).values({
        recipientEmail,
        recipientName: recipientName || null,
        emailType,
        subject,
        htmlBody,
        status: "sent",
        resendApiId: result.data?.id,
        sentAt: /* @__PURE__ */ new Date(),
        sentByAdminId: adminId
      }).returning();
      res.json({ success: true, log: log2 });
    } catch (error) {
      console.error("Error sending custom email:", error);
      res.status(500).json({ error: "Failed to send email", details: error instanceof Error ? error.message : String(error) });
    }
  });
  app2.post("/api/admin/emails/retry/:logId", isAuthenticated, async (req, res) => {
    try {
      const logId = parseInt(req.params.logId);
      const originalLog = await db.query.emailLogs.findFirst({
        where: eq12(emailLogs.id, logId)
      });
      if (!originalLog) {
        return res.status(404).json({ error: "Email log not found" });
      }
      if (originalLog.status !== "failed") {
        return res.status(400).json({ error: "Can only retry failed emails" });
      }
      const { apiKey, fromEmail } = await getResendCredentials();
      const client2 = new Resend(apiKey);
      try {
        const result = await client2.emails.send({
          from: fromEmail || "noreply@businessblueprint.io",
          to: originalLog.recipientEmail,
          subject: originalLog.subject,
          html: originalLog.htmlBody
        });
        await db.update(emailLogs).set({
          status: "sent",
          resendApiId: result.data?.id,
          sentAt: /* @__PURE__ */ new Date(),
          errorMessage: null,
          retryCount: (originalLog.retryCount || 0) + 1,
          lastRetryAt: /* @__PURE__ */ new Date()
        }).where(eq12(emailLogs.id, logId));
        res.json({ success: true, message: "Email resent successfully" });
      } catch (sendError) {
        await db.update(emailLogs).set({
          retryCount: (originalLog.retryCount || 0) + 1,
          lastRetryAt: /* @__PURE__ */ new Date(),
          errorMessage: sendError instanceof Error ? sendError.message : String(sendError)
        }).where(eq12(emailLogs.id, logId));
        throw sendError;
      }
    } catch (error) {
      console.error("Error retrying email:", error);
      res.status(500).json({ error: "Failed to retry email", details: error instanceof Error ? error.message : String(error) });
    }
  });
  app2.get("/api/admin/email-templates", isAuthenticated, async (req, res) => {
    console.log("[EMAIL ADMIN] GET /api/admin/email-templates hit, user:", req.user?.claims?.sub);
    try {
      const templates = await db.select().from(emailTemplates).orderBy(emailTemplates.name);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      res.status(500).json({ error: "Failed to fetch email templates" });
    }
  });
  app2.get("/api/admin/email-templates/:id", isAuthenticated, async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      const template = await db.query.emailTemplates.findFirst({
        where: eq12(emailTemplates.id, templateId)
      });
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching email template:", error);
      res.status(500).json({ error: "Failed to fetch email template" });
    }
  });
  app2.post("/api/admin/email-templates", isAuthenticated, async (req, res) => {
    try {
      const validationResult = insertEmailTemplateSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors
        });
      }
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      const [template] = await db.insert(emailTemplates).values({
        ...validationResult.data,
        createdById: adminId,
        lastEditedById: adminId
      }).returning();
      res.json(template);
    } catch (error) {
      console.error("Error creating email template:", error);
      res.status(500).json({ error: "Failed to create email template" });
    }
  });
  app2.patch("/api/admin/email-templates/:id", isAuthenticated, async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      const validationResult = updateEmailTemplateSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors
        });
      }
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      const [updated] = await db.update(emailTemplates).set({
        ...validationResult.data,
        lastEditedById: adminId,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq12(emailTemplates.id, templateId)).returning();
      if (!updated) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating email template:", error);
      res.status(500).json({ error: "Failed to update email template" });
    }
  });
  app2.delete("/api/admin/email-templates/:id", isAuthenticated, async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      const template = await db.query.emailTemplates.findFirst({
        where: eq12(emailTemplates.id, templateId)
      });
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      if (template.isSystem) {
        return res.status(400).json({ error: "Cannot delete system templates" });
      }
      await db.delete(emailTemplates).where(eq12(emailTemplates.id, templateId));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting email template:", error);
      res.status(500).json({ error: "Failed to delete email template" });
    }
  });
  app2.post("/api/admin/email-templates/:id/send", isAuthenticated, async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      const { recipientEmail, recipientName, variables = {} } = req.body;
      if (!recipientEmail) {
        return res.status(400).json({ error: "Missing required field: recipientEmail" });
      }
      const template = await db.query.emailTemplates.findFirst({
        where: eq12(emailTemplates.id, templateId)
      });
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      if (!template.isActive) {
        return res.status(400).json({ error: "Template is not active" });
      }
      let subject = template.subject;
      let htmlBody = template.htmlBody;
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`\\{${key}\\}`, "g");
        subject = subject.replace(regex, String(value));
        htmlBody = htmlBody.replace(regex, String(value));
      });
      const { apiKey, fromEmail } = await getResendCredentials();
      const client2 = new Resend(apiKey);
      const result = await client2.emails.send({
        from: fromEmail || "noreply@businessblueprint.io",
        to: recipientEmail,
        subject,
        html: htmlBody
      });
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      const [log2] = await db.insert(emailLogs).values({
        recipientEmail,
        recipientName: recipientName || null,
        emailType: template.name,
        templateId: template.id,
        subject,
        htmlBody,
        status: "sent",
        resendApiId: result.data?.id,
        sentAt: /* @__PURE__ */ new Date(),
        sentByAdminId: adminId
      }).returning();
      res.json({ success: true, log: log2 });
    } catch (error) {
      console.error("Error sending template email:", error);
      res.status(500).json({ error: "Failed to send email", details: error instanceof Error ? error.message : String(error) });
    }
  });
}

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
  /**
   * Create a Stripe Checkout Session
   * Used for one-time purchases with hosted checkout
   */
  async createCheckoutSession(params) {
    try {
      const session2 = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: params.productName,
                description: params.productDescription
              },
              unit_amount: params.priceInCents
            },
            quantity: 1
          }
        ],
        mode: "payment",
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        customer_email: params.customerEmail,
        metadata: params.metadata || {}
      });
      return {
        success: true,
        sessionId: session2.id,
        url: session2.url,
        provider: this.name,
        raw: session2
      };
    } catch (error) {
      return {
        success: false,
        error: `Stripe checkout session creation failed: ${error.message}`,
        provider: this.name
      };
    }
  }
  /**
   * Verify and retrieve a checkout session
   */
  async retrieveCheckoutSession(sessionId) {
    try {
      const session2 = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"]
      });
      return {
        success: true,
        session: session2,
        provider: this.name
      };
    } catch (error) {
      return {
        success: false,
        error: `Stripe session retrieval failed: ${error.message}`,
        provider: this.name
      };
    }
  }
  /**
   * Construct and verify webhook event
   */
  constructWebhookEvent(payload, signature, webhookSecret) {
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
};

// server/services/payment-service.ts
var PaymentService = class {
  provider;
  providerType;
  constructor() {
    this.providerType = process.env.PAYMENT_PROVIDER || "stripe";
    if (this.providerType === "stripe") {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        throw new Error("STRIPE_SECRET_KEY not configured in environment");
      }
      this.provider = new StripeProvider(stripeKey);
    } else if (this.providerType === "swipesblue") {
      throw new Error("SwipesBlue payment provider not yet configured. Set PAYMENT_PROVIDER=stripe or wait for SwipesBlue integration.");
    } else {
      throw new Error(`Unknown payment provider: ${this.providerType}. Valid options: stripe, swipesblue`);
    }
    console.log(`[PaymentService] Initialized with provider: ${this.providerType}`);
  }
  /**
   * Get the active provider name
   */
  getProviderName() {
    return this.provider.name;
  }
  /**
   * Get the active provider type
   */
  getProviderType() {
    return this.providerType;
  }
  /**
   * Get supported payment methods for the provider
   */
  getSupportedMethods() {
    if (this.providerType === "stripe") {
      return ["card", "apple_pay", "google_pay"];
    }
    return ["card"];
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
  /**
   * Create a Checkout Session
   */
  async createCheckoutSession(params) {
    return await this.provider.createCheckoutSession(params);
  }
  /**
   * Retrieve a checkout session
   */
  async retrieveCheckoutSession(sessionId) {
    return await this.provider.retrieveCheckoutSession(sessionId);
  }
  /**
   * Verify and construct webhook event
   * Used by webhook handlers to verify incoming payment webhooks
   */
  verifyWebhook(payload, signature) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn("[PaymentService] No webhook secret configured, processing without verification");
      if (typeof payload === "string") {
        return JSON.parse(payload);
      }
      return JSON.parse(payload.toString());
    }
    return this.provider.constructWebhookEvent(payload, signature, webhookSecret);
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
      const methods = paymentService.getSupportedMethods();
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
        where: (users2, { eq: eq36 }) => eq36(users2.id, customerId)
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
        where: (users2, { eq: eq36 }) => eq36(users2.id, customerId)
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
      if (result.success && result.transactionId) {
        await db.insert(billingHistory).values({
          nmiTransactionId: result.transactionId,
          amount: String(result.amount || amount),
          status: "paid",
          billingDate: /* @__PURE__ */ new Date(),
          paidDate: /* @__PURE__ */ new Date(),
          paymentMethod: { provider: result.provider, paymentMethodId }
        });
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
  app2.post("/api/scansblue/checkout", async (req, res) => {
    try {
      const { assessmentId, email } = req.body;
      if (!assessmentId) {
        return res.status(400).json({
          success: false,
          error: "assessmentId is required"
        });
      }
      const assessment = await db.query.assessments.findFirst({
        where: (assessments3, { eq: eq36 }) => eq36(assessments3.id, parseInt(assessmentId))
      });
      if (!assessment) {
        return res.status(404).json({
          success: false,
          error: "Assessment not found"
        });
      }
      const customerEmail = email || assessment.email;
      const baseUrl = process.env.APP_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      const result = await paymentService.createCheckoutSession({
        priceInCents: 1e3,
        // $10.00
        productName: "ScansBlue Full Report",
        productDescription: `Comprehensive website analysis for ${assessment.website || "your business"}`,
        customerEmail,
        successUrl: `${baseUrl}/scansblue/success?session_id={CHECKOUT_SESSION_ID}&assessment=${assessmentId}`,
        cancelUrl: `${baseUrl}/scansblue/purchase?assessment=${assessmentId}&cancelled=true`,
        metadata: {
          type: "scansblue_full_report",
          assessmentId: assessmentId.toString(),
          websiteUrl: assessment.website || ""
        }
      });
      if (!result.success) {
        return res.status(500).json(result);
      }
      res.json({
        success: true,
        sessionId: result.sessionId,
        url: result.url
      });
    } catch (error) {
      console.error("[ScansBlue Checkout] Error:", error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  app2.get("/api/scansblue/verify-session", async (req, res) => {
    try {
      const { session_id } = req.query;
      if (!session_id || typeof session_id !== "string") {
        return res.status(400).json({
          success: false,
          error: "session_id is required"
        });
      }
      const result = await paymentService.retrieveCheckoutSession(session_id);
      if (!result.success) {
        return res.status(400).json(result);
      }
      const session2 = result.session;
      res.json({
        success: true,
        paid: session2.payment_status === "paid",
        assessmentId: session2.metadata?.assessmentId,
        customerEmail: session2.customer_email,
        paymentIntentId: typeof session2.payment_intent === "string" ? session2.payment_intent : session2.payment_intent?.id
      });
    } catch (error) {
      console.error("[ScansBlue Verify] Error:", error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  console.log("[PAYMENT ROUTES] Routes registered successfully!");
}

// server/routes/crm.ts
init_db();
init_schema();
import { Router as Router7 } from "express";
import { eq as eq15, and as and10, desc as desc6, asc as asc2, ilike as ilike3, or as or3, sql as sql7, inArray as inArray2 } from "drizzle-orm";
import { z as z6 } from "zod";

// server/routes/api.ts
init_db();
init_schema();
import { Router as Router6 } from "express";
import { eq as eq14, and as and9, desc as desc5, asc, ilike as ilike2, or as or2, sql as sql6, isNull } from "drizzle-orm";
import { z as z5 } from "zod";
import crypto3 from "crypto";
var publicApiRouter = Router6();
function hashApiKey(key) {
  return crypto3.createHash("sha256").update(key).digest("hex");
}
function generateApiKey() {
  const key = `bb_${crypto3.randomBytes(32).toString("hex")}`;
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
    const [apiKeyRecord] = await db.select().from(apiKeys).where(eq14(apiKeys.keyHash, keyHash));
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
        totalRequests: sql6`${apiKeys.totalRequests} + 1`
      }).where(eq14(apiKeys.id, apiKeyRecord.id));
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
        requestsThisHour: sql6`${apiKeys.requestsThisHour} + 1`,
        lastUsedAt: now,
        totalRequests: sql6`${apiKeys.totalRequests} + 1`
      }).where(eq14(apiKeys.id, apiKeyRecord.id));
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
      conditions.push(eq14(crmContacts.clientId, req.apiKey.clientId));
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
    if (lifecycleStage) {
      conditions.push(eq14(crmContacts.lifecycleStage, lifecycleStage));
    }
    const query = conditions.length > 0 ? db.select().from(crmContacts).where(and9(...conditions)) : db.select().from(crmContacts);
    const contacts = await query.orderBy(desc5(crmContacts.createdAt)).limit(limit).offset(offset);
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
    let conditions = [eq14(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(crmContacts.clientId, req.apiKey.clientId));
    }
    const [contact] = await db.select().from(crmContacts).where(and9(...conditions));
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
    let conditions = [eq14(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(crmContacts.clientId, req.apiKey.clientId));
    }
    const [contact] = await db.update(crmContacts).set({ ...validatedData, updatedAt: /* @__PURE__ */ new Date() }).where(and9(...conditions)).returning();
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
    let conditions = [eq14(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(crmContacts.clientId, req.apiKey.clientId));
    }
    const [deleted] = await db.delete(crmContacts).where(and9(...conditions)).returning();
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
      conditions.push(eq14(crmCompanies.clientId, req.apiKey.clientId));
    }
    if (search) {
      conditions.push(ilike2(crmCompanies.name, `%${search}%`));
    }
    const query = conditions.length > 0 ? db.select().from(crmCompanies).where(and9(...conditions)) : db.select().from(crmCompanies);
    const companies = await query.orderBy(desc5(crmCompanies.createdAt)).limit(limit).offset(offset);
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
      conditions.push(eq14(crmDeals.clientId, req.apiKey.clientId));
    }
    if (status) {
      conditions.push(eq14(crmDeals.status, status));
    }
    if (pipelineId) {
      conditions.push(eq14(crmDeals.pipelineId, pipelineId));
    }
    const query = conditions.length > 0 ? db.select().from(crmDeals).where(and9(...conditions)) : db.select().from(crmDeals);
    const deals = await query.orderBy(desc5(crmDeals.createdAt)).limit(limit).offset(offset);
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
      conditions.push(eq14(crmTasks.clientId, req.apiKey.clientId));
    }
    if (status) {
      conditions.push(eq14(crmTasks.status, status));
    }
    if (contactId) {
      conditions.push(eq14(crmTasks.contactId, contactId));
    }
    const query = conditions.length > 0 ? db.select().from(crmTasks).where(and9(...conditions)) : db.select().from(crmTasks);
    const tasks2 = await query.orderBy(desc5(crmTasks.createdAt)).limit(limit).offset(offset);
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
    const pipelines = req.apiKey?.clientId ? await db.select().from(crmPipelines).where(
      or2(
        eq14(crmPipelines.clientId, req.apiKey.clientId),
        isNull(crmPipelines.clientId)
      )
    ).orderBy(asc(crmPipelines.id)) : await db.select().from(crmPipelines).orderBy(asc(crmPipelines.id));
    const pipelinesWithStages = await Promise.all(
      pipelines.map(async (pipeline) => {
        const stages = await db.select().from(crmPipelineStages).where(eq14(crmPipelineStages.pipelineId, pipeline.id)).orderBy(asc(crmPipelineStages.id));
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
      segments = await db.select().from(crmSegments).where(eq14(crmSegments.clientId, req.apiKey.clientId)).orderBy(asc(crmSegments.name));
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
      conditions.push(eq14(crmTimeline.clientId, req.apiKey.clientId));
    }
    if (contactId) {
      conditions.push(eq14(crmTimeline.contactId, contactId));
    }
    if (companyId) {
      conditions.push(eq14(crmTimeline.companyId, companyId));
    }
    const query = conditions.length > 0 ? db.select().from(crmTimeline).where(and9(...conditions)) : db.select().from(crmTimeline);
    const events = await query.orderBy(desc5(crmTimeline.occurredAt)).limit(limit).offset(offset);
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
    }).from(apiKeys).where(req.apiKey?.clientId ? eq14(apiKeys.clientId, req.apiKey.clientId) : sql6`true`);
    res.json({ data: keys });
  } catch (error) {
    console.error("[API] List API keys error:", error);
    res.status(500).json({ error: "Failed to list API keys" });
  }
});
publicApiRouter.delete("/api-keys/:id", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let conditions = [eq14(apiKeys.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(apiKeys.clientId, req.apiKey.clientId));
    }
    const [deleted] = await db.delete(apiKeys).where(and9(...conditions)).returning();
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
  return crypto3.randomBytes(32).toString("hex");
}
function signWebhookPayload(payload, secret) {
  return crypto3.createHmac("sha256", secret).update(payload).digest("hex");
}
publicApiRouter.get("/webhooks", authenticateApiKey, requireScope("admin:webhooks", "*"), async (req, res) => {
  try {
    let conditions = [];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const query = conditions.length > 0 ? db.select().from(webhookSubscriptions).where(and9(...conditions)) : db.select().from(webhookSubscriptions);
    const webhooks = await query.orderBy(desc5(webhookSubscriptions.createdAt));
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
    let conditions = [eq14(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [webhook] = await db.select().from(webhookSubscriptions).where(and9(...conditions));
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
    let conditions = [eq14(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [webhook] = await db.update(webhookSubscriptions).set({ ...validatedData, updatedAt: /* @__PURE__ */ new Date() }).where(and9(...conditions)).returning();
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
    let conditions = [eq14(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [deleted] = await db.delete(webhookSubscriptions).where(and9(...conditions)).returning();
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
    let conditions = [eq14(webhookSubscriptions.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq14(webhookSubscriptions.clientId, req.apiKey.clientId));
    }
    const [webhook] = await db.update(webhookSubscriptions).set({ secret: newSecret, updatedAt: /* @__PURE__ */ new Date() }).where(and9(...conditions)).returning();
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
      eq14(webhookSubscriptions.isActive, true)
    ];
    if (clientId) {
      conditions.push(eq14(webhookSubscriptions.clientId, clientId));
    }
    const subscriptions2 = await db.select().from(webhookSubscriptions).where(and9(...conditions));
    const matchingSubscriptions = subscriptions2.filter((sub) => {
      if (!sub.events || sub.events.length === 0) return false;
      return sub.events.includes(eventType) || sub.events.includes("*");
    });
    if (matchingSubscriptions.length === 0) {
      console.log(`[Webhooks] No subscriptions for event: ${eventType}`);
      return;
    }
    const event = {
      id: crypto3.randomUUID(),
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
      }).where(eq14(webhookSubscriptions.id, subscription.id));
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
    }).where(eq14(webhookSubscriptions.id, subscription.id));
    console.error(`[Webhooks] Delivery failed to ${subscription.url}:`, error);
    if (newFailureCount >= 10) {
      console.warn(`[Webhooks] Disabled subscription ${subscription.id} after 10 failures`);
    }
  }
}

// server/routes/crm.ts
var crmRouter = Router7();
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
    const automations = await db.select().from(crmAutomations).where(and10(
      eq15(crmAutomations.triggerType, triggerType),
      eq15(crmAutomations.isActive, true)
    ));
    for (const automation of automations) {
      const steps = await db.select().from(crmAutomationSteps).where(eq15(crmAutomationSteps.automationId, automation.id)).orderBy(asc2(crmAutomationSteps.stepOrder));
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
        runCount: sql7`${crmAutomations.runCount} + 1`,
        lastRunAt: /* @__PURE__ */ new Date()
      }).where(eq15(crmAutomations.id, automation.id));
      const executionLog = [];
      let finalStatus = "completed";
      let errorMessage = null;
      let contact = null;
      if (contactId) {
        const [c] = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId));
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
          await db.update(crmAutomationExecutions).set({ currentStep: i + 1 }).where(eq15(crmAutomationExecutions.id, execution.id));
          switch (step.stepType) {
            case "add_tag":
              if (contactId && config.tag) {
                const [contact2] = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId));
                if (contact2) {
                  const currentTags = Array.isArray(contact2.tags) ? contact2.tags : [];
                  if (!currentTags.includes(config.tag)) {
                    await db.update(crmContacts).set({ tags: [...currentTags, config.tag] }).where(eq15(crmContacts.id, contactId));
                  }
                }
              }
              executionLog.push({ step: i + 1, action: "add_tag", result: `Added tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "remove_tag":
              if (contactId && config.tag) {
                const [contact2] = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId));
                if (contact2) {
                  const currentTags = Array.isArray(contact2.tags) ? contact2.tags : [];
                  await db.update(crmContacts).set({ tags: currentTags.filter((t) => t !== config.tag) }).where(eq15(crmContacts.id, contactId));
                }
              }
              executionLog.push({ step: i + 1, action: "remove_tag", result: `Removed tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
              break;
            case "update_contact":
              if (contactId && config.field && config.value !== void 0) {
                await db.update(crmContacts).set({ [config.field]: config.value }).where(eq15(crmContacts.id, contactId));
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
      }).where(eq15(crmAutomationExecutions.id, execution.id));
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
      conditions.push(eq15(crmContacts.clientId, clientId));
    }
    if (companyId) {
      conditions.push(eq15(crmContacts.companyId, companyId));
    }
    if (lifecycleStage) {
      conditions.push(eq15(crmContacts.lifecycleStage, lifecycleStage));
    }
    if (leadSource) {
      conditions.push(eq15(crmContacts.leadSource, leadSource));
    }
    if (search) {
      conditions.push(
        or3(
          ilike3(crmContacts.firstName, `%${search}%`),
          ilike3(crmContacts.lastName, `%${search}%`),
          ilike3(crmContacts.email, `%${search}%`)
        )
      );
    }
    const contacts = await db.select().from(crmContacts).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmContacts.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql7`count(*)` }).from(crmContacts).where(conditions.length > 0 ? and10(...conditions) : void 0);
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
    const contact = await db.select().from(crmContacts).where(eq15(crmContacts.id, id)).limit(1);
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
          const existing = await db.select().from(crmContacts).where(eq15(crmContacts.email, validatedData.email)).limit(1);
          if (existing.length > 0) {
            if (duplicateHandling === "update") {
              await db.update(crmContacts).set({ ...validatedData, updatedAt: /* @__PURE__ */ new Date() }).where(eq15(crmContacts.id, existing[0].id));
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
    const [contact] = await db.update(crmContacts).set(updateData).where(eq15(crmContacts.id, id)).returning();
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
    const [contact] = await db.select().from(crmContacts).where(eq15(crmContacts.id, id));
    await db.delete(crmContacts).where(eq15(crmContacts.id, id));
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
      conditions.push(eq15(crmCompanies.clientId, clientId));
    }
    if (type) {
      conditions.push(eq15(crmCompanies.type, type));
    }
    if (search) {
      conditions.push(
        or3(
          ilike3(crmCompanies.name, `%${search}%`),
          ilike3(crmCompanies.domain, `%${search}%`)
        )
      );
    }
    const companies = await db.select().from(crmCompanies).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmCompanies.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql7`count(*)` }).from(crmCompanies).where(conditions.length > 0 ? and10(...conditions) : void 0);
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
    const company = await db.select().from(crmCompanies).where(eq15(crmCompanies.id, id)).limit(1);
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
    const [company] = await db.update(crmCompanies).set(updateData).where(eq15(crmCompanies.id, id)).returning();
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
    await db.delete(crmCompanies).where(eq15(crmCompanies.id, id));
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
      conditions.push(eq15(crmPipelines.clientId, clientId));
    }
    const pipelines = await db.select().from(crmPipelines).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(asc2(crmPipelines.displayOrder));
    const pipelinesWithStages = await Promise.all(
      pipelines.map(async (pipeline) => {
        const stages = await db.select().from(crmPipelineStages).where(eq15(crmPipelineStages.pipelineId, pipeline.id)).orderBy(asc2(crmPipelineStages.displayOrder));
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
    if (clientId) conditions.push(eq15(crmDeals.clientId, clientId));
    if (companyId) conditions.push(eq15(crmDeals.companyId, companyId));
    if (contactId) conditions.push(eq15(crmDeals.contactId, contactId));
    if (pipelineId) conditions.push(eq15(crmDeals.pipelineId, pipelineId));
    if (stageId) conditions.push(eq15(crmDeals.stageId, stageId));
    if (status) conditions.push(eq15(crmDeals.status, status));
    const deals = await db.select().from(crmDeals).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmDeals.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql7`count(*)` }).from(crmDeals).where(conditions.length > 0 ? and10(...conditions) : void 0);
    const totalValueResult = await db.select({ total: sql7`COALESCE(SUM(amount), 0)` }).from(crmDeals).where(
      and10(
        ...conditions.length > 0 ? conditions : [],
        eq15(crmDeals.status, "open")
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
    const deal = await db.select().from(crmDeals).where(eq15(crmDeals.id, id)).limit(1);
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
    const [deal] = await db.update(crmDeals).set(updateData).where(eq15(crmDeals.id, id)).returning();
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
    const stage = await db.select().from(crmPipelineStages).where(eq15(crmPipelineStages.id, stageId)).limit(1);
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
    const [deal] = await db.update(crmDeals).set(updateData).where(eq15(crmDeals.id, id)).returning();
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
    await db.delete(crmDeals).where(eq15(crmDeals.id, id));
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
    if (clientId) conditions.push(eq15(crmTasks.clientId, clientId));
    if (contactId) conditions.push(eq15(crmTasks.contactId, contactId));
    if (status) conditions.push(eq15(crmTasks.status, status));
    const tasks2 = await db.select().from(crmTasks).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(asc2(crmTasks.dueDate)).limit(limit).offset(offset);
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
    const [task] = await db.update(crmTasks).set(updateData).where(eq15(crmTasks.id, id)).returning();
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
    await db.delete(crmTasks).where(eq15(crmTasks.id, id));
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
    if (contactId) conditions.push(eq15(crmNotes.contactId, contactId));
    if (companyId) conditions.push(eq15(crmNotes.companyId, companyId));
    if (dealId) conditions.push(eq15(crmNotes.dealId, dealId));
    const notes = await db.select().from(crmNotes).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmNotes.isPinned), desc6(crmNotes.createdAt));
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
    const [note] = await db.update(crmNotes).set(updateData).where(eq15(crmNotes.id, id)).returning();
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
    await db.delete(crmNotes).where(eq15(crmNotes.id, id));
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
    if (contactId) conditions.push(eq15(crmTimeline.contactId, contactId));
    if (companyId) conditions.push(eq15(crmTimeline.companyId, companyId));
    const events = await db.select().from(crmTimeline).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmTimeline.occurredAt)).limit(limit).offset(offset);
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
    if (clientId) conditions.push(eq15(crmAppointments.clientId, clientId));
    if (contactId) conditions.push(eq15(crmAppointments.contactId, contactId));
    if (startDate) conditions.push(sql7`start_time >= ${new Date(startDate)}`);
    if (endDate) conditions.push(sql7`start_time <= ${new Date(endDate)}`);
    const appointments = await db.select().from(crmAppointments).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(asc2(crmAppointments.startTime));
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
    const [appointment] = await db.update(crmAppointments).set(updateData).where(eq15(crmAppointments.id, id)).returning();
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
    await db.delete(crmAppointments).where(eq15(crmAppointments.id, id));
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
    if (clientId) conditions.push(eq15(crmTags.clientId, clientId));
    const tags = await db.select().from(crmTags).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmTags.usageCount));
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
    if (clientId) conditions.push(eq15(crmSegments.clientId, clientId));
    const segments = await db.select().from(crmSegments).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(asc2(crmSegments.name));
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
    const subscription = await db.select().from(crmSubscriptions).where(eq15(crmSubscriptions.clientId, clientId)).limit(1);
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
    const conditions = clientId ? [eq15(crmContacts.clientId, clientId)] : [];
    const dealConditions = clientId ? [eq15(crmDeals.clientId, clientId)] : [];
    const taskConditions = clientId ? [eq15(crmTasks.clientId, clientId)] : [];
    const [contactCount] = await db.select({ count: sql7`count(*)` }).from(crmContacts).where(conditions.length > 0 ? and10(...conditions) : void 0);
    const [companyCount] = await db.select({ count: sql7`count(*)` }).from(crmCompanies).where(clientId ? eq15(crmCompanies.clientId, clientId) : void 0);
    const [openDeals] = await db.select({
      count: sql7`count(*)`,
      value: sql7`COALESCE(SUM(amount), 0)`
    }).from(crmDeals).where(and10(
      ...dealConditions,
      eq15(crmDeals.status, "open")
    ));
    const [pendingTasks] = await db.select({ count: sql7`count(*)` }).from(crmTasks).where(and10(
      ...taskConditions,
      eq15(crmTasks.status, "pending")
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
    const conditions = clientId ? [eq15(crmLeadForms.clientId, clientId)] : [];
    const forms = await db.select().from(crmLeadForms).where(conditions.length > 0 ? and10(...conditions) : void 0).orderBy(desc6(crmLeadForms.createdAt));
    res.json({ forms });
  } catch (error) {
    console.error("[CRM] Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});
crmRouter.get("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const form = await db.select().from(crmLeadForms).where(eq15(crmLeadForms.id, id)).limit(1);
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
    const [form] = await db.update(crmLeadForms).set(updateData).where(eq15(crmLeadForms.id, id)).returning();
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
    const [deleted] = await db.delete(crmLeadForms).where(eq15(crmLeadForms.id, id)).returning();
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
    const [form] = await db.select().from(crmLeadForms).where(eq15(crmLeadForms.slug, slug)).limit(1);
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
      const existing = await db.select().from(crmContacts).where(eq15(crmContacts.email, contactData.email)).limit(1);
      if (existing.length > 0) {
        await db.update(crmContacts).set({ ...contactData, updatedAt: /* @__PURE__ */ new Date() }).where(eq15(crmContacts.id, existing[0].id));
        await db.update(crmLeadForms).set({ submissionCount: sql7`submission_count + 1` }).where(eq15(crmLeadForms.id, form.id));
        res.json({ success: true, message: form.successMessage, contactId: existing[0].id });
        return;
      }
    }
    const [contact] = await db.insert(crmContacts).values(contactData).returning();
    await db.update(crmLeadForms).set({ submissionCount: sql7`submission_count + 1` }).where(eq15(crmLeadForms.id, form.id));
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
      const results = await db.select().from(crmContacts).where(eq15(crmContacts.email, email.toLowerCase())).limit(1);
      if (results.length > 0) contact = results[0];
    }
    if (!contact && phone && typeof phone === "string") {
      const results = await db.select().from(crmContacts).where(eq15(crmContacts.phone, phone)).limit(1);
      if (results.length > 0) contact = results[0];
    }
    if (!contact) {
      return res.json({ found: false, contact: null });
    }
    let company = null;
    if (contact.companyId) {
      const companyResults = await db.select().from(crmCompanies).where(eq15(crmCompanies.id, contact.companyId)).limit(1);
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
        jobTitle: contact.jobTitle,
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
    const contacts = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId)).limit(1);
    if (contacts.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    const contact = contacts[0];
    let company = null;
    if (contact.companyId) {
      const companies = await db.select().from(crmCompanies).where(eq15(crmCompanies.id, contact.companyId)).limit(1);
      if (companies.length > 0) company = companies[0];
    }
    const deals = await db.select().from(crmDeals).where(eq15(crmDeals.contactId, contactId)).orderBy(desc6(crmDeals.updatedAt)).limit(5);
    const recentActivity = await db.select().from(crmTimeline).where(eq15(crmTimeline.contactId, contactId)).orderBy(desc6(crmTimeline.occurredAt)).limit(10);
    const contactTags = contact.tags || [];
    res.json({
      contact: {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        jobTitle: contact.jobTitle,
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
        name: d.name,
        amount: d.amount,
        stageId: d.stageId,
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
      totalDealValue: deals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)
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
    }).from(crmSegmentMembers).innerJoin(crmContacts, eq15(crmSegmentMembers.contactId, crmContacts.id)).where(eq15(crmSegmentMembers.segmentId, segmentId)).limit(limit).offset(offset);
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
      const contacts = await db.select({ id: crmContacts.id, clientId: crmContacts.clientId }).from(crmContacts).where(eq15(crmContacts.email, req.body.email)).limit(1);
      if (contacts.length > 0) {
        resolvedContactId = contacts[0].id;
      }
    }
    let clientId = null;
    if (resolvedContactId) {
      const contacts = await db.select({ clientId: crmContacts.clientId }).from(crmContacts).where(eq15(crmContacts.id, resolvedContactId)).limit(1);
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
    }).from(crmContacts).where(inArray2(crmContacts.email, emails.map((e) => e.toLowerCase())));
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
    const automations = await db.select().from(crmAutomations).orderBy(desc6(crmAutomations.createdAt));
    res.json({ automations });
  } catch (error) {
    console.error("[CRM] List automations error:", error);
    res.status(500).json({ error: "Failed to fetch automations" });
  }
});
crmRouter.get("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [automation] = await db.select().from(crmAutomations).where(eq15(crmAutomations.id, id));
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    const steps = await db.select().from(crmAutomationSteps).where(eq15(crmAutomationSteps.automationId, id)).orderBy(asc2(crmAutomationSteps.stepOrder));
    const executions = await db.select().from(crmAutomationExecutions).where(eq15(crmAutomationExecutions.automationId, id)).orderBy(desc6(crmAutomationExecutions.startedAt)).limit(10);
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
    const [automation] = await db.update(crmAutomations).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq15(crmAutomations.id, id)).returning();
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
    await db.delete(crmAutomations).where(eq15(crmAutomations.id, id));
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
    await db.delete(crmAutomationSteps).where(eq15(crmAutomationSteps.automationId, automationId));
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
    const insertedSteps = await db.select().from(crmAutomationSteps).where(eq15(crmAutomationSteps.automationId, automationId)).orderBy(asc2(crmAutomationSteps.stepOrder));
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
    const [automation] = await db.select().from(crmAutomations).where(eq15(crmAutomations.id, automationId));
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    const steps = await db.select().from(crmAutomationSteps).where(eq15(crmAutomationSteps.automationId, automationId)).orderBy(asc2(crmAutomationSteps.stepOrder));
    const [execution] = await db.insert(crmAutomationExecutions).values({
      automationId,
      contactId,
      status: "running",
      currentStep: 0,
      totalSteps: steps.length,
      triggerData: triggerData || {}
    }).returning();
    await db.update(crmAutomations).set({
      runCount: sql7`${crmAutomations.runCount} + 1`,
      lastRunAt: /* @__PURE__ */ new Date()
    }).where(eq15(crmAutomations.id, automationId));
    const executionLog = [];
    let finalStatus = "completed";
    let errorMessage = null;
    let contact = null;
    if (contactId) {
      const [c] = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId));
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
        await db.update(crmAutomationExecutions).set({ currentStep: i + 1 }).where(eq15(crmAutomationExecutions.id, execution.id));
        switch (step.stepType) {
          case "add_tag":
            if (contactId && config.tag) {
              const [contactData] = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId));
              if (contactData) {
                const currentTags = Array.isArray(contactData.tags) ? contactData.tags : [];
                if (!currentTags.includes(config.tag)) {
                  await db.update(crmContacts).set({ tags: [...currentTags, config.tag] }).where(eq15(crmContacts.id, contactId));
                }
              }
            }
            executionLog.push({ step: i + 1, action: "add_tag", result: `Added tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "remove_tag":
            if (contactId && config.tag) {
              const [contact2] = await db.select().from(crmContacts).where(eq15(crmContacts.id, contactId));
              if (contact2) {
                const currentTags = Array.isArray(contact2.tags) ? contact2.tags : [];
                await db.update(crmContacts).set({ tags: currentTags.filter((t) => t !== config.tag) }).where(eq15(crmContacts.id, contactId));
              }
            }
            executionLog.push({ step: i + 1, action: "remove_tag", result: `Removed tag: ${config.tag || "none"}`, timestamp: /* @__PURE__ */ new Date() });
            break;
          case "update_contact":
            if (contactId && config.field && config.value !== void 0) {
              await db.update(crmContacts).set({ [config.field]: config.value }).where(eq15(crmContacts.id, contactId));
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
    }).where(eq15(crmAutomationExecutions.id, execution.id));
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
    }).from(crmAutomationExecutions).leftJoin(crmContacts, eq15(crmAutomationExecutions.contactId, crmContacts.id)).where(eq15(crmAutomationExecutions.automationId, automationId)).orderBy(desc6(crmAutomationExecutions.startedAt)).limit(50);
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
      count: sql7`count(*)::int`
    }).from(crmContacts).groupBy(crmContacts.lifecycleStage);
    const dealStats = await db.select({
      status: crmDeals.status,
      count: sql7`count(*)::int`,
      totalValue: sql7`coalesce(sum(${crmDeals.amount}::float), 0)::float`
    }).from(crmDeals).groupBy(crmDeals.status);
    const pipelineBreakdown = await db.select({
      stageName: crmPipelineStages.name,
      stageId: crmDeals.stageId,
      count: sql7`count(*)::int`,
      totalValue: sql7`coalesce(sum(${crmDeals.amount}::float), 0)::float`
    }).from(crmDeals).leftJoin(crmPipelineStages, eq15(crmDeals.stageId, crmPipelineStages.id)).where(eq15(crmDeals.status, "open")).groupBy(crmDeals.stageId, crmPipelineStages.name);
    const leadSourceStats = await db.select({
      source: crmContacts.leadSource,
      count: sql7`count(*)::int`
    }).from(crmContacts).where(sql7`${crmContacts.leadSource} is not null`).groupBy(crmContacts.leadSource);
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activityByDay = await db.select({
      date: sql7`date(${crmTimeline.occurredAt})`,
      count: sql7`count(*)::int`
    }).from(crmTimeline).where(sql7`${crmTimeline.occurredAt} >= ${thirtyDaysAgo.toISOString()}`).groupBy(sql7`date(${crmTimeline.occurredAt})`).orderBy(sql7`date(${crmTimeline.occurredAt})`);
    const taskStats = await db.select({
      status: crmTasks.status,
      count: sql7`count(*)::int`
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

// server/routes/listing-distribution.ts
init_db();
init_schema();
import { Router as Router8 } from "express";
import { eq as eq18, desc as desc8 } from "drizzle-orm";

// server/services/listing-distribution/distributionService.ts
init_db();
init_schema();
import { eq as eq16, and as and11, desc as desc7 } from "drizzle-orm";

// server/services/listing-distribution/baseListingAdapter.ts
var BaseListingAdapter = class {
  async deleteListing(externalId) {
    return { success: false, status: "error", message: `${this.displayName} does not support deletion` };
  }
  async verifyListing(externalId) {
    return { success: false, status: "error", message: `${this.displayName} does not support verification` };
  }
};

// server/services/listing-distribution/adapters/foursquareAdapter.ts
var FoursquareAdapter = class extends BaseListingAdapter {
  adapterKey = "foursquare";
  displayName = "Foursquare";
  apiKey;
  baseUrl = "https://api.foursquare.com/v3";
  constructor() {
    super();
    this.apiKey = process.env.FOURSQUARE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F FOURSQUARE_API_KEY not set \u2014 Foursquare adapter disabled");
    }
  }
  isConfigured() {
    return !!this.apiKey;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Foursquare not configured" };
    }
    try {
      const payload = this.mapToFoursquareFormat(data);
      const response = await fetch(`${this.baseUrl}/places/submit`, {
        method: "POST",
        headers: {
          "Authorization": this.apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.fsq_id || result.id,
        status: "submitted",
        message: "Submitted to Foursquare \u2014 propagation to downstream directories typically takes 1-4 weeks",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message, rawResponse: null };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Foursquare not configured" };
    }
    try {
      const payload = this.mapToFoursquareFormat(data);
      const response = await fetch(`${this.baseUrl}/places/${externalId}/proposededit`, {
        method: "POST",
        headers: {
          "Authorization": this.apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "Update submitted for review", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: false,
      supportsVerify: false,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: true,
      supportsServiceArea: false
    };
  }
  getDownstreamDirectories() {
    return [
      "Apple Maps",
      "Uber",
      "Snapchat",
      "Samsung",
      "HERE WeGo",
      "TripAdvisor",
      "Waze",
      "OpenTable",
      "Zillow",
      "Booking.com",
      "MapQuest",
      "TomTom",
      "Navmii",
      "Audi",
      "BMW",
      "Mercedes",
      "GasBuddy",
      "Pitney Bowes",
      "Skyscanner",
      "Trivago",
      "Moovit",
      "Citymapper",
      "Scout GPS",
      "Sygic",
      "Swarm"
    ];
  }
  mapToFoursquareFormat(data) {
    return {
      name: data.businessName,
      address: data.address1,
      address_extended: data.address2 || void 0,
      locality: data.city,
      region: data.state,
      postcode: data.zip,
      country: data.country,
      tel: data.phone,
      website: data.website || void 0,
      email: data.email || void 0,
      description: data.description || void 0,
      hours: data.hours ? this.formatHours(data.hours) : void 0
    };
  }
  formatHours(hours) {
    const dayMap = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun"
    };
    return Object.entries(hours).filter(([, v]) => v?.open && v?.close).map(([day, v]) => `${dayMap[day] || day} ${v.open}-${v.close}`).join("; ");
  }
};

// server/services/listing-distribution/adapters/neustarAdapter.ts
var NeustarAdapter = class extends BaseListingAdapter {
  adapterKey = "neustar";
  displayName = "Neustar Localeze";
  apiKey;
  baseUrl = "https://api.neustarlocaleze.com/v1";
  constructor() {
    super();
    this.apiKey = process.env.NEUSTAR_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F NEUSTAR_API_KEY not set \u2014 Neustar adapter disabled");
    }
  }
  isConfigured() {
    return !!this.apiKey;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Neustar not configured" };
    }
    try {
      const payload = this.mapToNeustarFormat(data);
      const response = await fetch(`${this.baseUrl}/listings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.error || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.listingId || result.id,
        status: "submitted",
        message: "Submitted to Neustar/Localeze \u2014 downstream propagation typically takes 2-6 weeks",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Neustar not configured" };
    }
    try {
      const payload = this.mapToNeustarFormat(data);
      const response = await fetch(`${this.baseUrl}/listings/${externalId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.error || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "Update submitted", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: false,
      supportsPhotos: false,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: true
    };
  }
  getDownstreamDirectories() {
    return [
      "Bing",
      "Yahoo",
      "Superpages",
      "DexKnows",
      "CitySearch",
      "Local.com",
      "YellowPages.com",
      "WhitePages",
      "AnyWho",
      "Switchboard",
      "InfoSpace",
      "DogPile",
      "Addresses.com",
      "Where To?",
      "USSearch",
      "PeopleSmart",
      "Neustar Localeze",
      "YellowBot",
      "n49.com",
      "EZLocal",
      "Judy's Book",
      "Cybo",
      "iBegin"
    ];
  }
  mapToNeustarFormat(data) {
    return {
      businessName: data.businessName,
      streetAddress: data.address1,
      streetAddress2: data.address2 || void 0,
      city: data.city,
      state: data.state,
      postalCode: data.zip,
      country: data.country,
      phone: data.phone,
      website: data.website || void 0,
      email: data.email || void 0,
      fax: data.fax || void 0,
      categories: data.categories || [],
      description: data.description || void 0,
      hours: data.hours || void 0,
      serviceArea: data.serviceArea || void 0
    };
  }
};

// server/services/listing-distribution/adapters/dataAxleAdapter.ts
var DataAxleAdapter = class extends BaseListingAdapter {
  adapterKey = "data_axle";
  displayName = "Data Axle";
  apiKey;
  baseUrl = "https://api.data-axle.com/v1";
  constructor() {
    super();
    this.apiKey = process.env.DATA_AXLE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F DATA_AXLE_API_KEY not set \u2014 Data Axle adapter disabled");
    }
  }
  isConfigured() {
    return !!this.apiKey;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Data Axle not configured" };
    }
    try {
      const payload = this.mapToDataAxleFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses`, {
        method: "POST",
        headers: {
          "X-Auth-Token": this.apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.infogroup_id || result.id,
        status: "submitted",
        message: "Submitted to Data Axle \u2014 downstream propagation typically takes 2-4 weeks",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Data Axle not configured" };
    }
    try {
      const payload = this.mapToDataAxleFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses/${externalId}`, {
        method: "PUT",
        headers: {
          "X-Auth-Token": this.apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "Update submitted", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: false,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: true,
      supportsServiceArea: false
    };
  }
  getDownstreamDirectories() {
    return [
      "411.com",
      "Manta",
      "MerchantCircle",
      "Hotfrog",
      "Brownbook",
      "Cylex",
      "eLocal",
      "iGlobal",
      "ShowMeLocal",
      "Tupalo",
      "ChamberofCommerce.com",
      "USCity.net",
      "FindOpen",
      "Data Axle Reference Solutions",
      "Credibility.com",
      "MapQuest Business",
      "Loc8NearMe",
      "BizVotes",
      "MyLocalServices",
      "Opendi",
      "Company.com",
      "YellowBot"
    ];
  }
  mapToDataAxleFormat(data) {
    return {
      company_name: data.businessName,
      street: data.address1,
      street2: data.address2 || void 0,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country_code: data.country,
      phone: data.phone,
      url: data.website || void 0,
      email: data.email || void 0,
      fax: data.fax || void 0,
      sic_codes: data.categories || [],
      business_description: data.description || void 0,
      year_established: data.yearEstablished || void 0,
      employee_count: data.employeeCount || void 0,
      hours_of_operation: data.hours || void 0,
      logo_url: data.logoUrl || void 0,
      photo_urls: data.photoUrls || [],
      social_media: {
        facebook: data.facebookUrl || void 0,
        instagram: data.instagramUrl || void 0,
        linkedin: data.linkedinUrl || void 0,
        twitter: data.twitterUrl || void 0
      },
      payment_methods: data.paymentMethods || []
    };
  }
};

// server/services/listing-distribution/adapters/acxiomAdapter.ts
var AcxiomAdapter = class extends BaseListingAdapter {
  adapterKey = "acxiom";
  displayName = "Acxiom";
  clientId;
  clientSecret;
  baseUrl = "https://api.acxiom.com/v1";
  accessToken = null;
  tokenExpiresAt = 0;
  constructor() {
    super();
    this.clientId = process.env.ACXIOM_CLIENT_ID || "";
    this.clientSecret = process.env.ACXIOM_CLIENT_SECRET || "";
    if (!this.clientId || !this.clientSecret) {
      console.warn("\u26A0\uFE0F ACXIOM_CLIENT_ID/ACXIOM_CLIENT_SECRET not set \u2014 Acxiom adapter disabled");
    }
  }
  isConfigured() {
    return !!(this.clientId && this.clientSecret);
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Acxiom not configured" };
    }
    try {
      const token = await this.getAccessToken();
      const payload = this.mapToAcxiomFormat(data);
      const response = await fetch(`${this.baseUrl}/business-records`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.recordId || result.id,
        status: "submitted",
        message: "Submitted to Acxiom \u2014 propagation to consumer directories typically takes 3-6 weeks",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Acxiom not configured" };
    }
    try {
      const token = await this.getAccessToken();
      const payload = this.mapToAcxiomFormat(data);
      const response = await fetch(`${this.baseUrl}/business-records/${externalId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "Update submitted", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: false,
      supportsVerify: false,
      supportsPhotos: false,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: false
    };
  }
  getDownstreamDirectories() {
    return [
      "Epsilon",
      "Oracle Data Cloud",
      "TransUnion",
      "Equifax",
      "Experian",
      "LiveRamp",
      "Acxiom AbiliTec",
      "Acxiom InfoBase",
      "Nielsen",
      "Dun & Bradstreet",
      "Verisk",
      "CoreLogic"
    ];
  }
  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(`Acxiom auth failed: ${result.error || response.status}`);
    this.accessToken = result.access_token;
    this.tokenExpiresAt = Date.now() + (result.expires_in || 3600) * 1e3 - 6e4;
    return this.accessToken;
  }
  mapToAcxiomFormat(data) {
    return {
      businessName: data.businessName,
      address: { line1: data.address1, line2: data.address2 || void 0, city: data.city, state: data.state, postalCode: data.zip, country: data.country },
      phone: data.phone,
      website: data.website || void 0,
      email: data.email || void 0,
      categories: data.categories || [],
      description: data.description || void 0,
      yearEstablished: data.yearEstablished || void 0,
      hours: data.hours || void 0
    };
  }
};

// server/services/listing-distribution/adapters/gbpListingAdapter.ts
var GbpListingAdapter = class extends BaseListingAdapter {
  adapterKey = "gbp";
  displayName = "Google Business Profile";
  apiKey;
  baseUrl = "https://mybusinessbusinessinformation.googleapis.com/v1";
  constructor() {
    super();
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F GOOGLE_PLACES_API_KEY not set \u2014 GBP listing adapter disabled");
    }
  }
  isConfigured() {
    return !!this.apiKey;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Google Business Profile not configured" };
    }
    try {
      const payload = this.mapToGbpFormat(data);
      const response = await fetch(`${this.baseUrl}/accounts/-/locations?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }
      const locationName = result.name || "";
      return {
        success: true,
        externalId: locationName,
        externalUrl: result.metadata?.mapsUri || void 0,
        status: "submitted",
        message: "Location submitted to Google Business Profile \u2014 verification may be required",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Google Business Profile not configured" };
    }
    try {
      const payload = this.mapToGbpFormat(data);
      const response = await fetch(`${this.baseUrl}/${externalId}?key=${this.apiKey}&updateMask=title,storefrontAddress,phoneNumbers,websiteUri,regularHours,profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "GBP listing updated", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async verifyListing(externalId) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Google Business Profile not configured" };
    }
    try {
      const response = await fetch(`${this.baseUrl}/${externalId}?key=${this.apiKey}`);
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }
      const isVerified = result.metadata?.hasVoiceOfMerchant === true;
      return {
        success: true,
        externalId,
        externalUrl: result.metadata?.mapsUri || void 0,
        status: isVerified ? "active" : "processing",
        message: isVerified ? "Listing is verified and active" : "Listing exists but not yet verified",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: true,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: true
    };
  }
  getDownstreamDirectories() {
    return ["Google Business Profile", "Google Maps", "Google Search Local Pack", "Google Hotels", "Google Shopping Local"];
  }
  mapToGbpFormat(data) {
    const result = {
      title: data.businessName,
      storefrontAddress: {
        addressLines: [data.address1, data.address2].filter(Boolean),
        locality: data.city,
        administrativeArea: data.state,
        postalCode: data.zip,
        regionCode: data.country
      },
      phoneNumbers: { primaryPhone: data.phone }
    };
    if (data.website) result.websiteUri = data.website;
    if (data.description) result.profile = { description: data.description };
    if (data.hours) {
      const dayMap = {
        monday: "MONDAY",
        tuesday: "TUESDAY",
        wednesday: "WEDNESDAY",
        thursday: "THURSDAY",
        friday: "FRIDAY",
        saturday: "SATURDAY",
        sunday: "SUNDAY"
      };
      result.regularHours = {
        periods: Object.entries(data.hours).filter(([, v]) => v?.open && v?.close).map(([day, v]) => ({
          openDay: dayMap[day] || day.toUpperCase(),
          openTime: { hours: parseInt(v.open.split(":")[0]), minutes: parseInt(v.open.split(":")[1]) || 0 },
          closeDay: dayMap[day] || day.toUpperCase(),
          closeTime: { hours: parseInt(v.close.split(":")[0]), minutes: parseInt(v.close.split(":")[1]) || 0 }
        }))
      };
    }
    return result;
  }
};

// server/services/listing-distribution/adapters/facebookListingAdapter.ts
var FacebookListingAdapter = class extends BaseListingAdapter {
  adapterKey = "facebook";
  displayName = "Facebook Business";
  accessToken;
  apiVersion = "v18.0";
  baseUrl;
  constructor() {
    super();
    this.accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "";
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
    if (!this.accessToken) {
      console.warn("\u26A0\uFE0F FACEBOOK_PAGE_ACCESS_TOKEN not set \u2014 Facebook listing adapter disabled");
    }
  }
  isConfigured() {
    return !!this.accessToken;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Facebook not configured" };
    }
    try {
      const payload = this.mapToFacebookFormat(data);
      const response = await fetch(`${this.baseUrl}/me/locations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, access_token: this.accessToken })
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.id,
        externalUrl: `https://facebook.com/${result.id}`,
        status: "submitted",
        message: "Business location submitted to Facebook",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Facebook not configured" };
    }
    try {
      const payload = this.mapToFacebookFormat(data);
      const response = await fetch(`${this.baseUrl}/${externalId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, access_token: this.accessToken })
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId,
        externalUrl: `https://facebook.com/${externalId}`,
        status: "active",
        message: "Facebook listing updated",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: true,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: false
    };
  }
  getDownstreamDirectories() {
    return ["Facebook Business", "Facebook Marketplace", "Instagram Location", "WhatsApp Business", "Threads"];
  }
  mapToFacebookFormat(data) {
    const result = {
      name: data.businessName,
      phone: data.phone,
      location: {
        street: data.address1,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country
      }
    };
    if (data.website) result.website = data.website;
    if (data.description) result.about = data.description;
    if (data.email) result.emails = [data.email];
    if (data.hours) {
      const dayMap = {
        monday: "mon",
        tuesday: "tue",
        wednesday: "wed",
        thursday: "thu",
        friday: "fri",
        saturday: "sat",
        sunday: "sun"
      };
      const fbHours = {};
      Object.entries(data.hours).forEach(([day, v]) => {
        const key = dayMap[day] || day.substring(0, 3).toLowerCase();
        if (v?.open && v?.close) {
          fbHours[`${key}_1_open`] = v.open;
          fbHours[`${key}_1_close`] = v.close;
        }
      });
      result.hours = fbHours;
    }
    return result;
  }
};

// server/services/listing-distribution/adapters/bingPlacesAdapter.ts
var BingPlacesAdapter = class extends BaseListingAdapter {
  adapterKey = "bing";
  displayName = "Bing Places";
  apiKey;
  baseUrl = "https://ssl.bing.com/partner/api/v1";
  constructor() {
    super();
    this.apiKey = process.env.BING_PLACES_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F BING_PLACES_API_KEY not set \u2014 Bing Places adapter disabled");
    }
  }
  isConfigured() {
    return !!this.apiKey;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Bing Places not configured" };
    }
    try {
      const payload = this.mapToBingFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": this.apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.id || result.businessId,
        externalUrl: result.bingUrl || void 0,
        status: "submitted",
        message: "Submitted to Bing Places \u2014 review typically takes 1-2 weeks",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Bing Places not configured" };
    }
    try {
      const payload = this.mapToBingFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses/${externalId}`, {
        method: "PUT",
        headers: {
          "Ocp-Apim-Subscription-Key": this.apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "Bing Places listing updated", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: true,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: false
    };
  }
  getDownstreamDirectories() {
    return ["Bing Places", "Bing Maps", "Cortana", "MSN Local", "Microsoft Edge Local", "Outlook Local"];
  }
  mapToBingFormat(data) {
    return {
      businessName: data.businessName,
      address: {
        addressLine1: data.address1,
        addressLine2: data.address2 || void 0,
        city: data.city,
        stateOrProvince: data.state,
        zipOrPostalCode: data.zip,
        countryOrRegion: data.country
      },
      phone: data.phone,
      website: data.website || void 0,
      email: data.email || void 0,
      categories: data.categories || [],
      description: data.description || void 0,
      hours: data.hours || void 0
    };
  }
};

// server/services/listing-distribution/adapters/appleConnectAdapter.ts
var AppleConnectAdapter = class extends BaseListingAdapter {
  adapterKey = "apple";
  displayName = "Apple Business Connect";
  apiToken;
  baseUrl = "https://businessconnect.apple.com/api/v1";
  constructor() {
    super();
    this.apiToken = process.env.APPLE_BUSINESS_CONNECT_TOKEN || "";
    if (!this.apiToken) {
      console.warn("\u26A0\uFE0F APPLE_BUSINESS_CONNECT_TOKEN not set \u2014 Apple Connect adapter disabled");
    }
  }
  isConfigured() {
    return !!this.apiToken;
  }
  async submitListing(data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Apple Business Connect not configured" };
    }
    try {
      const payload = this.mapToAppleFormat(data);
      const response = await fetch(`${this.baseUrl}/locations`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return {
        success: true,
        externalId: result.locationId || result.id,
        status: "submitted",
        message: "Submitted to Apple Business Connect \u2014 verification and review required",
        rawResponse: result
      };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  async updateListing(externalId, data) {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Apple Business Connect not configured" };
    }
    try {
      const payload = this.mapToAppleFormat(data);
      const response = await fetch(`${this.baseUrl}/locations/${externalId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }
      return { success: true, externalId, status: "processing", message: "Apple listing updated", rawResponse: result };
    } catch (error) {
      return { success: false, status: "error", message: error.message };
    }
  }
  getCapabilities() {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: false,
      supportsVerify: true,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: false
    };
  }
  getDownstreamDirectories() {
    return ["Apple Maps", "Apple Wallet", "Siri", "Safari Suggestions", "Apple Business Chat", "CarPlay POI"];
  }
  mapToAppleFormat(data) {
    return {
      name: data.businessName,
      address: {
        streetAddress: data.address1,
        streetAddress2: data.address2 || void 0,
        city: data.city,
        state: data.state,
        postalCode: data.zip,
        country: data.country
      },
      phoneNumber: data.phone,
      websiteUrl: data.website || void 0,
      email: data.email || void 0,
      categories: data.categories || [],
      description: data.description || void 0,
      hours: data.hours ? this.formatAppleHours(data.hours) : void 0,
      logoUrl: data.logoUrl || void 0,
      coverPhotoUrl: data.coverPhotoUrl || void 0
    };
  }
  formatAppleHours(hours) {
    return Object.entries(hours).filter(([, v]) => v?.open && v?.close).map(([day, v]) => ({
      day: day.toUpperCase(),
      openTime: v.open,
      closeTime: v.close
    }));
  }
};

// server/services/listing-distribution/listingAdapterFactory.ts
var adapterInstances = /* @__PURE__ */ new Map();
var adapterConstructors = {
  foursquare: () => new FoursquareAdapter(),
  neustar: () => new NeustarAdapter(),
  data_axle: () => new DataAxleAdapter(),
  acxiom: () => new AcxiomAdapter(),
  gbp: () => new GbpListingAdapter(),
  facebook: () => new FacebookListingAdapter(),
  bing: () => new BingPlacesAdapter(),
  apple: () => new AppleConnectAdapter()
};
function getAdapter(key) {
  if (!adapterConstructors[key]) return null;
  if (!adapterInstances.has(key)) {
    adapterInstances.set(key, adapterConstructors[key]());
  }
  return adapterInstances.get(key);
}
function getDirectoryCoverage() {
  const coverage = {};
  for (const key of Object.keys(adapterConstructors)) {
    const adapter = getAdapter(key);
    coverage[key] = adapter.getDownstreamDirectories();
  }
  return coverage;
}
function getTotalDirectoryCount() {
  const seen = /* @__PURE__ */ new Set();
  for (const key of Object.keys(adapterConstructors)) {
    const adapter = getAdapter(key);
    adapter.getDownstreamDirectories().forEach((d) => seen.add(d));
  }
  return seen.size;
}

// server/services/listing-distribution/distributionService.ts
var ListingDistributionService = class {
  /**
   * Distribute a client's canonical profile to all (or selected) targets.
   */
  async distributeToAll(clientId, targetSlugs) {
    const profile = await this.getProfile(clientId);
    if (!profile) {
      throw new Error(`No canonical profile found for client ${clientId}`);
    }
    let targets = await db.select().from(distributionTargets);
    if (targetSlugs?.length) {
      targets = targets.filter((t) => targetSlugs.includes(t.slug));
    }
    const listingData = this.profileToListingData(profile);
    const results = [];
    let submitted = 0;
    let skipped = 0;
    let errors = 0;
    for (const target of targets) {
      const result = await this.distributeToSingleTarget(clientId, profile, target.slug, target.id, listingData);
      results.push({ targetSlug: target.slug, ...result });
      if (result.status === "skipped") skipped++;
      else if (result.success) submitted++;
      else errors++;
    }
    return { total: targets.length, submitted, skipped, errors, results };
  }
  /**
   * Distribute to a single target (by slug). Used for retries and single-target pushes.
   */
  async distributeToTarget(clientId, targetSlug) {
    const profile = await this.getProfile(clientId);
    if (!profile) throw new Error(`No canonical profile found for client ${clientId}`);
    const [target] = await db.select().from(distributionTargets).where(eq16(distributionTargets.slug, targetSlug)).limit(1);
    if (!target) throw new Error(`Unknown target: ${targetSlug}`);
    const listingData = this.profileToListingData(profile);
    return this.distributeToSingleTarget(clientId, profile, target.slug, target.id, listingData);
  }
  /**
   * Flag all active submissions as needing resync when canonical data changes.
   */
  async flagResyncNeeded(clientId, changedFields) {
    const subs = await db.select().from(distributionSubmissions).where(and11(
      eq16(distributionSubmissions.clientId, clientId)
    ));
    const activeSubs = subs.filter(
      (s) => ["submitted", "processing", "verified", "active"].includes(s.status)
    );
    let flagged = 0;
    for (const sub of activeSubs) {
      await db.update(distributionSubmissions).set({
        needsResync: true,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq16(distributionSubmissions.id, sub.id));
      flagged++;
    }
    if (flagged > 0) {
      console.log(`Flagged ${flagged} submissions for resync (client ${clientId}, changed: ${changedFields.join(", ")})`);
    }
    return flagged;
  }
  /**
   * Process the resync queue — picks up submissions with needsResync=true and re-pushes.
   */
  async processResyncQueue(batchSize = 10) {
    const pending = await db.select().from(distributionSubmissions).where(eq16(distributionSubmissions.needsResync, true)).limit(batchSize);
    let processed = 0;
    let errors = 0;
    for (const sub of pending) {
      try {
        const profile = await this.getProfile(sub.clientId);
        if (!profile) continue;
        const [target] = await db.select().from(distributionTargets).where(eq16(distributionTargets.id, sub.targetId)).limit(1);
        if (!target) continue;
        const listingData = this.profileToListingData(profile);
        const adapter = getAdapter(target.adapterKey);
        if (!adapter || !adapter.isConfigured()) continue;
        const startTime = Date.now();
        let result;
        if (sub.externalId) {
          result = await adapter.updateListing(sub.externalId, listingData);
        } else {
          result = await adapter.submitListing(listingData);
        }
        const durationMs = Date.now() - startTime;
        await db.update(distributionSubmissions).set({
          status: result.status,
          externalId: result.externalId || sub.externalId,
          externalUrl: result.externalUrl || sub.externalUrl,
          submittedDataVersion: profile.dataVersion,
          lastSubmittedAt: /* @__PURE__ */ new Date(),
          needsResync: false,
          lastError: result.success ? null : result.message || null,
          errorCount: result.success ? sub.errorCount : (sub.errorCount || 0) + 1,
          platformResponse: result.rawResponse || sub.platformResponse,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq16(distributionSubmissions.id, sub.id));
        await this.log(sub.clientId, sub.id, target.slug, "update", result.success ? "success" : "failure", durationMs, profile.dataVersion, null, result.rawResponse, result.message);
        processed++;
      } catch (error) {
        errors++;
        console.error(`Resync error for submission ${sub.id}:`, error.message);
      }
    }
    return { processed, errors };
  }
  /**
   * Get full distribution status summary for a client.
   */
  async getClientDistributionStatus(clientId) {
    const profile = await this.getProfile(clientId);
    const allTargets = await db.select().from(distributionTargets);
    const subs = await db.select().from(distributionSubmissions).where(eq16(distributionSubmissions.clientId, clientId));
    const byStatus = {};
    let needsResync = 0;
    for (const s of subs) {
      byStatus[s.status] = (byStatus[s.status] || 0) + 1;
      if (s.needsResync) needsResync++;
    }
    let configuredTargets = 0;
    for (const t of allTargets) {
      const adapter = getAdapter(t.adapterKey);
      if (adapter?.isConfigured()) configuredTargets++;
    }
    const activeTargetIds = new Set(subs.filter((s) => ["active", "verified", "submitted", "processing"].includes(s.status)).map((s) => s.targetId));
    let directoryCoverage = 0;
    for (const t of allTargets) {
      if (activeTargetIds.has(t.id)) {
        directoryCoverage += t.feedsDirectories?.length || 0;
      }
    }
    return {
      hasProfile: !!profile,
      totalTargets: allTargets.length,
      configuredTargets,
      submissions: { total: subs.length, byStatus, needsResync },
      directoryCoverage
    };
  }
  /**
   * Get all submissions for a client, joined with target details.
   */
  async getClientSubmissions(clientId) {
    const subs = await db.select().from(distributionSubmissions).where(eq16(distributionSubmissions.clientId, clientId)).orderBy(desc7(distributionSubmissions.updatedAt));
    const targets = await db.select().from(distributionTargets);
    const targetMap = new Map(targets.map((t) => [t.id, t]));
    return subs.map((s) => ({
      ...s,
      target: targetMap.get(s.targetId) || null
    }));
  }
  /**
   * Get canonical profile for a client, or null.
   */
  async getProfile(clientId) {
    const [profile] = await db.select().from(canonicalBusinessProfiles).where(eq16(canonicalBusinessProfiles.clientId, clientId)).limit(1);
    return profile || null;
  }
  /**
   * Auto-create a canonical profile from existing client data.
   */
  async autoCreateProfile(clientId) {
    const [client2] = await db.select().from(clients).where(eq16(clients.id, clientId)).limit(1);
    if (!client2) return null;
    const existing = await this.getProfile(clientId);
    if (existing) return existing;
    const addressParts = (client2.address || "").split(",").map((s) => s.trim());
    const [profile] = await db.insert(canonicalBusinessProfiles).values({
      clientId,
      businessName: client2.companyName,
      address1: addressParts[0] || client2.address || "",
      city: addressParts[1] || "",
      state: addressParts[2] || "",
      zip: addressParts[3] || "",
      country: "US",
      phone: client2.phone || "",
      website: client2.website || void 0,
      email: client2.email,
      categories: client2.businessCategory ? [client2.businessCategory] : []
    }).returning();
    return profile;
  }
  // ─── Private helpers ──────────────────────────────────────────────────
  async distributeToSingleTarget(clientId, profile, targetSlug, targetId, listingData) {
    const adapter = getAdapter(targetSlug === "data_axle" ? "data_axle" : targetSlug.replace(/-/g, "_"));
    if (!adapter) {
      const [target] = await db.select().from(distributionTargets).where(eq16(distributionTargets.slug, targetSlug)).limit(1);
      const a = target ? getAdapter(target.adapterKey) : null;
      if (!a) return { success: false, status: "skipped", message: `No adapter for ${targetSlug}` };
      return this.executeSubmission(clientId, profile, targetSlug, targetId, listingData, a);
    }
    if (!adapter.isConfigured()) {
      return { success: false, status: "skipped", message: `${adapter.displayName} not configured (missing env vars)` };
    }
    return this.executeSubmission(clientId, profile, targetSlug, targetId, listingData, adapter);
  }
  async executeSubmission(clientId, profile, targetSlug, targetId, listingData, adapter) {
    let [submission] = await db.select().from(distributionSubmissions).where(and11(
      eq16(distributionSubmissions.clientId, clientId),
      eq16(distributionSubmissions.targetId, targetId)
    )).limit(1);
    if (!submission) {
      [submission] = await db.insert(distributionSubmissions).values({
        clientId,
        targetId,
        profileId: profile.id,
        status: "pending"
      }).returning();
    }
    await db.update(distributionSubmissions).set({ status: "submitting", updatedAt: /* @__PURE__ */ new Date() }).where(eq16(distributionSubmissions.id, submission.id));
    const startTime = Date.now();
    let result;
    try {
      if (submission.externalId) {
        result = await adapter.updateListing(submission.externalId, listingData);
      } else {
        result = await adapter.submitListing(listingData);
      }
    } catch (error) {
      result = { success: false, status: "error", message: error.message };
    }
    const durationMs = Date.now() - startTime;
    await db.update(distributionSubmissions).set({
      status: result.status,
      externalId: result.externalId || submission.externalId,
      externalUrl: result.externalUrl || submission.externalUrl,
      submittedDataVersion: profile.dataVersion,
      lastSubmittedAt: /* @__PURE__ */ new Date(),
      needsResync: false,
      lastError: result.success ? null : result.message || null,
      errorCount: result.success ? 0 : (submission.errorCount || 0) + 1,
      platformResponse: result.rawResponse || submission.platformResponse,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq16(distributionSubmissions.id, submission.id));
    await this.log(
      clientId,
      submission.id,
      targetSlug,
      submission.externalId ? "update" : "submit",
      result.success ? "success" : "failure",
      durationMs,
      profile.dataVersion,
      null,
      result.rawResponse,
      result.message
    );
    return { success: result.success, status: result.status, message: result.message };
  }
  async log(clientId, submissionId, targetSlug, action, status, durationMs, dataVersion, requestPayload, responsePayload, errorMessage) {
    await db.insert(distributionLogs).values({
      clientId,
      submissionId,
      targetSlug,
      action,
      status,
      requestPayload,
      responsePayload,
      errorMessage: errorMessage || void 0,
      durationMs,
      dataVersion
    });
  }
  profileToListingData(profile) {
    return {
      businessName: profile.businessName,
      address1: profile.address1,
      address2: profile.address2,
      city: profile.city,
      state: profile.state,
      zip: profile.zip,
      country: profile.country,
      phone: profile.phone,
      website: profile.website,
      email: profile.email,
      fax: profile.fax,
      categories: profile.categories,
      description: profile.description,
      shortDescription: profile.shortDescription,
      yearEstablished: profile.yearEstablished,
      employeeCount: profile.employeeCount,
      hours: profile.hours,
      specialHours: profile.specialHours,
      logoUrl: profile.logoUrl,
      coverPhotoUrl: profile.coverPhotoUrl,
      photoUrls: profile.photoUrls,
      facebookUrl: profile.facebookUrl,
      instagramUrl: profile.instagramUrl,
      linkedinUrl: profile.linkedinUrl,
      twitterUrl: profile.twitterUrl,
      youtubeUrl: profile.youtubeUrl,
      paymentMethods: profile.paymentMethods,
      amenities: profile.amenities,
      serviceArea: profile.serviceArea
    };
  }
};
var listingDistributionService = new ListingDistributionService();

// server/services/listing-distribution/seedTargets.ts
init_db();
init_schema();
import { eq as eq17 } from "drizzle-orm";
var TARGET_SEEDS = [
  {
    slug: "foursquare",
    displayName: "Foursquare",
    type: "aggregator",
    adapterKey: "foursquare",
    requiredEnvVars: ["FOURSQUARE_API_KEY"],
    feedsDirectories: [
      "Apple Maps",
      "Uber",
      "Snapchat",
      "Samsung",
      "HERE WeGo",
      "TripAdvisor",
      "Waze",
      "OpenTable",
      "Zillow",
      "Booking.com",
      "MapQuest",
      "TomTom",
      "Navmii",
      "Audi",
      "BMW",
      "Mercedes",
      "GasBuddy",
      "Pitney Bowes",
      "Skyscanner",
      "Trivago",
      "Moovit",
      "Citymapper",
      "Scout GPS",
      "Sygic",
      "Swarm"
    ],
    description: "Foursquare/Factual data aggregator \u2014 feeds Apple Maps, Uber, TripAdvisor, Waze, and 21+ other directories",
    estimatedProcessingTime: "1-4 weeks"
  },
  {
    slug: "neustar",
    displayName: "Neustar Localeze",
    type: "aggregator",
    adapterKey: "neustar",
    requiredEnvVars: ["NEUSTAR_API_KEY"],
    feedsDirectories: [
      "Bing",
      "Yahoo",
      "Superpages",
      "DexKnows",
      "CitySearch",
      "Local.com",
      "YellowPages.com",
      "WhitePages",
      "AnyWho",
      "Switchboard",
      "InfoSpace",
      "DogPile",
      "Addresses.com",
      "Where To?",
      "USSearch",
      "PeopleSmart",
      "Neustar Localeze",
      "YellowBot",
      "n49.com",
      "EZLocal",
      "Judy's Book",
      "Cybo",
      "iBegin"
    ],
    description: "Neustar/Localeze aggregator \u2014 feeds Bing, Yahoo, Superpages, YellowPages, and 19+ other directories",
    estimatedProcessingTime: "2-6 weeks"
  },
  {
    slug: "data_axle",
    displayName: "Data Axle",
    type: "aggregator",
    adapterKey: "data_axle",
    requiredEnvVars: ["DATA_AXLE_API_KEY"],
    feedsDirectories: [
      "411.com",
      "Manta",
      "MerchantCircle",
      "Hotfrog",
      "Brownbook",
      "Cylex",
      "eLocal",
      "iGlobal",
      "ShowMeLocal",
      "Tupalo",
      "ChamberofCommerce.com",
      "USCity.net",
      "FindOpen",
      "Data Axle Reference Solutions",
      "Credibility.com",
      "MapQuest Business",
      "Loc8NearMe",
      "BizVotes",
      "MyLocalServices",
      "Opendi",
      "Company.com",
      "YellowBot"
    ],
    description: "Data Axle/Infogroup aggregator \u2014 feeds 411.com, Manta, MerchantCircle, and 19+ other directories",
    estimatedProcessingTime: "2-4 weeks"
  },
  {
    slug: "acxiom",
    displayName: "Acxiom",
    type: "aggregator",
    adapterKey: "acxiom",
    requiredEnvVars: ["ACXIOM_CLIENT_ID", "ACXIOM_CLIENT_SECRET"],
    feedsDirectories: [
      "Epsilon",
      "Oracle Data Cloud",
      "TransUnion",
      "Equifax",
      "Experian",
      "LiveRamp",
      "Acxiom AbiliTec",
      "Acxiom InfoBase",
      "Nielsen",
      "Dun & Bradstreet",
      "Verisk",
      "CoreLogic"
    ],
    description: "Acxiom consumer data aggregator \u2014 feeds Epsilon, Oracle Data Cloud, Nielsen, D&B, credit bureaus, and identity networks",
    estimatedProcessingTime: "3-6 weeks"
  },
  {
    slug: "gbp",
    displayName: "Google Business Profile",
    type: "direct_api",
    adapterKey: "gbp",
    requiredEnvVars: ["GOOGLE_PLACES_API_KEY"],
    feedsDirectories: ["Google Business Profile", "Google Maps", "Google Search Local Pack", "Google Hotels", "Google Shopping Local"],
    description: "Direct Google Business Profile API \u2014 manages your listing on Google Maps, Search, Hotels, and Shopping",
    estimatedProcessingTime: "1-7 days"
  },
  {
    slug: "facebook",
    displayName: "Facebook Business",
    type: "direct_api",
    adapterKey: "facebook",
    requiredEnvVars: ["FACEBOOK_PAGE_ACCESS_TOKEN"],
    feedsDirectories: ["Facebook Business", "Facebook Marketplace", "Instagram Location", "WhatsApp Business", "Threads"],
    description: "Facebook/Meta Business location management \u2014 updates your business page, Instagram, WhatsApp, and Threads",
    estimatedProcessingTime: "1-3 days"
  },
  {
    slug: "bing",
    displayName: "Bing Places",
    type: "direct_api",
    adapterKey: "bing",
    requiredEnvVars: ["BING_PLACES_API_KEY"],
    feedsDirectories: ["Bing Places", "Bing Maps", "Cortana", "MSN Local", "Microsoft Edge Local", "Outlook Local"],
    description: "Bing Places for Business API \u2014 manages your listing on Bing Maps, Cortana, MSN, Edge, and Outlook",
    estimatedProcessingTime: "1-2 weeks"
  },
  {
    slug: "apple",
    displayName: "Apple Business Connect",
    type: "direct_api",
    adapterKey: "apple",
    requiredEnvVars: ["APPLE_BUSINESS_CONNECT_TOKEN"],
    feedsDirectories: ["Apple Maps", "Apple Wallet", "Siri", "Safari Suggestions", "Apple Business Chat", "CarPlay POI"],
    description: "Apple Business Connect API \u2014 manages your listing on Apple Maps, Siri, Safari, Business Chat, and CarPlay",
    estimatedProcessingTime: "1-2 weeks"
  }
];
async function seedDistributionTargets() {
  let created = 0;
  let updated = 0;
  for (const seed of TARGET_SEEDS) {
    const [existing] = await db.select().from(distributionTargets).where(eq17(distributionTargets.slug, seed.slug)).limit(1);
    if (existing) {
      await db.update(distributionTargets).set({
        displayName: seed.displayName,
        type: seed.type,
        adapterKey: seed.adapterKey,
        requiredEnvVars: seed.requiredEnvVars,
        feedsDirectories: seed.feedsDirectories,
        description: seed.description,
        estimatedProcessingTime: seed.estimatedProcessingTime,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq17(distributionTargets.id, existing.id));
      updated++;
    } else {
      await db.insert(distributionTargets).values({
        slug: seed.slug,
        displayName: seed.displayName,
        type: seed.type,
        adapterKey: seed.adapterKey,
        requiredEnvVars: seed.requiredEnvVars,
        feedsDirectories: seed.feedsDirectories,
        description: seed.description,
        estimatedProcessingTime: seed.estimatedProcessingTime,
        isEnabled: false
      });
      created++;
    }
  }
  console.log(`Distribution targets seeded: ${created} created, ${updated} updated`);
  return { created, updated };
}

// server/routes/listing-distribution.ts
import crypto4 from "crypto";
import jwt from "jsonwebtoken";
var listingDistributionRouter = Router8();
function hashPin(pin) {
  const salt = crypto4.randomBytes(16).toString("hex");
  const hash = crypto4.scryptSync(pin, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
function verifyPin(pin, stored) {
  const [salt, hash] = stored.split(":");
  const test = crypto4.scryptSync(pin, salt, 64).toString("hex");
  return hash === test;
}
listingDistributionRouter.get("/clients/:id/distribution/profile", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    let profile = await listingDistributionService.getProfile(clientId);
    if (!profile) {
      profile = await listingDistributionService.autoCreateProfile(clientId);
    }
    if (!profile) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Error fetching canonical profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});
listingDistributionRouter.post("/clients/:id/distribution/profile", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const data = insertCanonicalProfileSchema.parse({ ...req.body, clientId });
    const existing = await listingDistributionService.getProfile(clientId);
    if (existing) {
      await db.delete(canonicalBusinessProfiles).where(eq18(canonicalBusinessProfiles.id, existing.id));
    }
    const [profile] = await db.insert(canonicalBusinessProfiles).values(data).returning();
    res.json({ success: true, profile });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating canonical profile:", error);
    res.status(500).json({ error: "Failed to create profile" });
  }
});
var PROFILE_UNLOCK_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
listingDistributionRouter.get("/clients/:id/distribution/profile/has-pin", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const profile = await listingDistributionService.getProfile(clientId);
    if (!profile) return res.status(404).json({ error: "No profile found" });
    res.json({ success: true, hasPin: !!profile.editPin });
  } catch (error) {
    console.error("Error checking PIN:", error);
    res.status(500).json({ error: "Failed to check PIN status" });
  }
});
listingDistributionRouter.post("/clients/:id/distribution/profile/set-pin", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const { pin } = setPinSchema.parse(req.body);
    const profile = await listingDistributionService.getProfile(clientId);
    if (!profile) return res.status(404).json({ error: "No profile found" });
    const hash = hashPin(pin);
    await db.update(canonicalBusinessProfiles).set({ editPin: hash }).where(eq18(canonicalBusinessProfiles.id, profile.id));
    res.json({ success: true, message: "PIN set successfully" });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "PIN must be 4-6 digits", details: error.errors });
    }
    console.error("Error setting PIN:", error);
    res.status(500).json({ error: "Failed to set PIN" });
  }
});
listingDistributionRouter.post("/clients/:id/distribution/profile/verify-pin", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const { pin } = verifyPinSchema.parse(req.body);
    const profile = await listingDistributionService.getProfile(clientId);
    if (!profile || !profile.editPin) {
      return res.status(404).json({ error: "No PIN set for this profile" });
    }
    const match = verifyPin(pin, profile.editPin);
    if (!match) {
      return res.status(401).json({ error: "Invalid PIN" });
    }
    const unlockToken = jwt.sign(
      { clientId, profileId: profile.id, purpose: "profile-unlock" },
      PROFILE_UNLOCK_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ success: true, unlockToken });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Invalid PIN format" });
    }
    console.error("Error verifying PIN:", error);
    res.status(500).json({ error: "Failed to verify PIN" });
  }
});
listingDistributionRouter.patch("/clients/:id/distribution/profile", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const existing = await listingDistributionService.getProfile(clientId);
    if (!existing) {
      return res.status(404).json({ error: "No canonical profile found for this client" });
    }
    if (existing.editPin) {
      const unlockToken = req.headers["x-profile-unlock-token"];
      if (!unlockToken) {
        return res.status(403).json({ error: "Profile is locked. Provide X-Profile-Unlock-Token header." });
      }
      try {
        const decoded = jwt.verify(unlockToken, PROFILE_UNLOCK_SECRET);
        if (decoded.clientId !== clientId || decoded.purpose !== "profile-unlock") {
          return res.status(403).json({ error: "Invalid unlock token" });
        }
      } catch {
        return res.status(403).json({ error: "Unlock token expired or invalid" });
      }
    }
    const validated = updateCanonicalProfileSchema.parse(req.body);
    const changedFields = Object.keys(validated).filter((k) => validated[k] !== void 0);
    if (changedFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }
    const [updated] = await db.update(canonicalBusinessProfiles).set({
      ...validated,
      dataVersion: existing.dataVersion + 1,
      lastModifiedFields: changedFields,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq18(canonicalBusinessProfiles.id, existing.id)).returning();
    const flagged = await listingDistributionService.flagResyncNeeded(clientId, changedFields);
    res.json({ success: true, profile: updated, resyncFlagged: flagged });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error updating canonical profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});
listingDistributionRouter.get("/distribution/targets", async (_req, res) => {
  try {
    const targets = await db.select().from(distributionTargets).orderBy(distributionTargets.slug);
    const enriched = targets.map((t) => {
      const adapter = getAdapter(t.adapterKey);
      return {
        ...t,
        isConfigured: adapter ? adapter.isConfigured() : false,
        capabilities: adapter ? adapter.getCapabilities() : null
      };
    });
    res.json({ success: true, targets: enriched });
  } catch (error) {
    console.error("Error fetching distribution targets:", error);
    res.status(500).json({ error: "Failed to fetch targets" });
  }
});
listingDistributionRouter.get("/distribution/targets/coverage", async (_req, res) => {
  try {
    const coverage = getDirectoryCoverage();
    const totalDirectories = getTotalDirectoryCount();
    res.json({ success: true, coverage, totalDirectories });
  } catch (error) {
    console.error("Error fetching coverage:", error);
    res.status(500).json({ error: "Failed to fetch coverage" });
  }
});
listingDistributionRouter.get("/clients/:id/distribution/submissions", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const submissions = await listingDistributionService.getClientSubmissions(clientId);
    res.json({ success: true, submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});
listingDistributionRouter.get("/clients/:id/distribution/status", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const status = await listingDistributionService.getClientDistributionStatus(clientId);
    res.json({ success: true, ...status });
  } catch (error) {
    console.error("Error fetching distribution status:", error);
    res.status(500).json({ error: "Failed to fetch status" });
  }
});
listingDistributionRouter.get("/clients/:id/distribution/logs", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const logs = await db.select().from(distributionLogs).where(eq18(distributionLogs.clientId, clientId)).orderBy(desc8(distributionLogs.createdAt)).limit(limit);
    res.json({ success: true, logs });
  } catch (error) {
    console.error("Error fetching distribution logs:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});
listingDistributionRouter.post("/clients/:id/distribution/distribute", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const { targetSlugs } = req.body || {};
    const result = await listingDistributionService.distributeToAll(clientId, targetSlugs);
    res.json(result);
  } catch (error) {
    console.error("Error distributing listings:", error);
    res.status(500).json({ error: error.message || "Failed to distribute" });
  }
});
listingDistributionRouter.post("/clients/:id/distribution/distribute/:targetSlug", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });
    const { targetSlug } = req.params;
    const result = await listingDistributionService.distributeToTarget(clientId, targetSlug);
    res.json(result);
  } catch (error) {
    console.error("Error distributing to target:", error);
    res.status(500).json({ error: error.message || "Failed to distribute" });
  }
});
listingDistributionRouter.post("/admin/distribution/targets/seed", async (_req, res) => {
  try {
    const result = await seedDistributionTargets();
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error seeding targets:", error);
    res.status(500).json({ error: "Failed to seed targets" });
  }
});
listingDistributionRouter.post("/admin/distribution/resync", async (req, res) => {
  try {
    const batchSize = parseInt(req.body?.batchSize) || 10;
    const result = await listingDistributionService.processResyncQueue(batchSize);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error processing resync:", error);
    res.status(500).json({ error: "Failed to process resync" });
  }
});

// server/routes/chat.ts
import { Router as Router9 } from "express";

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

// server/routes/chat.ts
init_db();
init_schema();
import { eq as eq20, and as and12, desc as desc9, sql as sql8 } from "drizzle-orm";
import { z as z7 } from "zod";
import { nanoid as nanoid2 } from "nanoid";
var router5 = Router9();
var widgetCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};
router5.get("/widget/settings/:clientId", widgetCors, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (isNaN(clientId) || clientId <= 0) {
      return res.status(400).json({ error: "Invalid client ID" });
    }
    const [client2] = await db.select({ id: clients.id }).from(clients).where(eq20(clients.id, clientId)).limit(1);
    if (!client2) {
      return res.status(404).json({ error: "Client not found" });
    }
    const [settings] = await db.select().from(chatWidgetSettings).where(eq20(chatWidgetSettings.clientId, clientId)).limit(1);
    if (!settings) {
      return res.json({
        clientId,
        companyName: "Support",
        welcomeMessage: "Hi! How can we help you today?",
        primaryColor: "#0000FF",
        position: "bottom-right",
        requireEmail: false,
        requireName: false,
        customFields: [],
        enableSound: true,
        gdprEnabled: false,
        fileUploadsEnabled: true,
        maxFileSize: 5242880,
        rateLimit: 10
      });
    }
    res.json({
      clientId: settings.clientId,
      companyName: settings.companyName,
      welcomeMessage: settings.welcomeMessage,
      primaryColor: settings.primaryColor,
      position: settings.position,
      requireEmail: settings.requireEmail,
      enableSound: settings.enableSound,
      offlineMessage: settings.offlineMessage,
      autoOpenDelay: settings.autoOpenDelay,
      enableFileUpload: settings.enableFileUpload,
      enableEmoji: settings.enableEmoji,
      enablePreChatForm: settings.enablePreChatForm,
      isActive: settings.isActive
    });
  } catch (error) {
    console.error("Error fetching widget settings:", error);
    res.status(500).json({ error: "Failed to fetch widget settings" });
  }
});
var createSessionSchema = z7.object({
  clientId: z7.number(),
  sessionId: z7.string().optional(),
  visitorName: z7.string().optional(),
  visitorEmail: z7.string().email().optional(),
  customFields: z7.record(z7.any()).optional(),
  pageUrl: z7.string().optional(),
  pageTitle: z7.string().optional(),
  referrer: z7.string().optional(),
  userAgent: z7.string().optional()
});
router5.post("/widget/sessions", widgetCors, async (req, res) => {
  try {
    const data = createSessionSchema.parse(req.body);
    const [client2] = await db.select({ id: clients.id }).from(clients).where(eq20(clients.id, data.clientId)).limit(1);
    if (!client2) {
      return res.status(404).json({ error: "Client not found" });
    }
    const sessionId = data.sessionId || `sess_${nanoid2(16)}`;
    const [existingSession] = await db.select().from(livechatSessions).where(eq20(livechatSessions.sessionId, sessionId)).limit(1);
    if (existingSession) {
      return res.json({
        sessionId: existingSession.sessionId,
        conversationId: existingSession.conversationId,
        visitorName: existingSession.visitorName,
        isExisting: true
      });
    }
    const [conversation] = await db.insert(inboxConversations).values({
      clientId: data.clientId,
      contactName: data.visitorName || "Website Visitor",
      contactIdentifier: data.visitorEmail || sessionId,
      primaryChannelType: "livechat",
      status: "open",
      lastMessageAt: /* @__PURE__ */ new Date()
    }).returning();
    const [session2] = await db.insert(livechatSessions).values({
      clientId: data.clientId,
      conversationId: conversation.id,
      sessionId,
      visitorId: `vis_${nanoid2(12)}`,
      visitorName: data.visitorName,
      visitorEmail: data.visitorEmail,
      pageUrl: data.pageUrl,
      pageTitle: data.pageTitle,
      referrer: data.referrer,
      userAgent: data.userAgent,
      ipAddress: req.ip || req.socket.remoteAddress,
      status: "active"
    }).returning();
    if (data.visitorEmail) {
      try {
        const [existingContact] = await db.select().from(crmContacts).where(and12(
          eq20(crmContacts.clientId, data.clientId),
          eq20(crmContacts.email, data.visitorEmail)
        )).limit(1);
        if (!existingContact) {
          await db.insert(crmContacts).values({
            clientId: data.clientId,
            email: data.visitorEmail,
            firstName: data.visitorName?.split(" ")[0] || "",
            lastName: data.visitorName?.split(" ").slice(1).join(" ") || "",
            lifecycleStage: "lead",
            status: "active"
          });
        }
      } catch (crmError) {
        console.error("CRM sync error:", crmError);
      }
    }
    await db.insert(chatAnalyticsEvents).values({
      clientId: data.clientId,
      eventType: "conversation_started",
      metadata: {
        pageUrl: data.pageUrl,
        referrer: data.referrer
      }
    });
    res.json({
      sessionId: session2.sessionId,
      conversationId: conversation.id,
      visitorName: session2.visitorName,
      isExisting: false
    });
  } catch (error) {
    console.error("Error creating session:", error);
    if (error instanceof z7.ZodError) {
      return res.status(400).json({ error: "Invalid request data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create session" });
  }
});
var sendMessageSchema = z7.object({
  sessionId: z7.string(),
  content: z7.string().min(1).max(5e3),
  messageType: z7.enum(["text", "file", "image"]).default("text"),
  fileUrl: z7.string().optional(),
  fileName: z7.string().optional()
});
router5.post("/widget/messages", widgetCors, async (req, res) => {
  try {
    const data = sendMessageSchema.parse(req.body);
    const [session2] = await db.select().from(livechatSessions).where(eq20(livechatSessions.sessionId, data.sessionId)).limit(1);
    if (!session2 || !session2.conversationId) {
      return res.status(404).json({ error: "Session not found" });
    }
    const [message] = await db.insert(inboxMessages2).values({
      conversationId: session2.conversationId,
      channelType: "livechat",
      messageType: data.messageType === "text" ? "incoming" : "incoming",
      direction: "inbound",
      content: data.content,
      contentType: data.messageType === "text" ? "text" : "file",
      fromIdentifier: session2.visitorEmail || session2.sessionId,
      fromName: session2.visitorName || "Visitor",
      toIdentifier: `client_${session2.clientId}`,
      toName: "Support",
      hasAttachments: !!data.fileUrl,
      attachments: data.fileUrl ? [{ url: data.fileUrl, name: data.fileName }] : []
    }).returning();
    await db.update(inboxConversations).set({
      lastMessageAt: /* @__PURE__ */ new Date(),
      lastMessagePreview: data.content.substring(0, 100),
      unreadCount: sql8`${inboxConversations.unreadCount} + 1`
    }).where(eq20(inboxConversations.id, session2.conversationId));
    await db.insert(chatAnalyticsEvents).values({
      clientId: session2.clientId,
      eventType: "message_sent",
      metadata: { direction: "inbound" }
    });
    res.json({
      messageId: message.id,
      timestamp: message.createdAt
    });
  } catch (error) {
    console.error("Error sending message:", error);
    if (error instanceof z7.ZodError) {
      return res.status(400).json({ error: "Invalid message data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to send message" });
  }
});
router5.get("/widget/messages/:sessionId", widgetCors, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const [session2] = await db.select().from(livechatSessions).where(eq20(livechatSessions.sessionId, sessionId)).limit(1);
    if (!session2 || !session2.conversationId) {
      return res.status(404).json({ error: "Session not found" });
    }
    const messages = await db.select().from(inboxMessages2).where(eq20(inboxMessages2.conversationId, session2.conversationId)).orderBy(inboxMessages2.createdAt);
    res.json({
      messages: messages.map((m) => ({
        id: m.id,
        content: m.content,
        direction: m.direction,
        fromName: m.fromName,
        messageType: m.messageType,
        attachments: m.attachments,
        createdAt: m.createdAt
      }))
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
var trackEventSchema = z7.object({
  clientId: z7.number(),
  eventType: z7.string(),
  eventData: z7.record(z7.any()).optional()
});
router5.post("/widget/analytics", widgetCors, async (req, res) => {
  try {
    const data = trackEventSchema.parse(req.body);
    await db.insert(chatAnalyticsEvents).values({
      clientId: data.clientId,
      eventType: data.eventType,
      metadata: data.eventData || {}
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error tracking event:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});
router5.get("/dashboard/conversations/:clientId", requireAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (clientId !== req.clientId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const status = req.query.status || "open";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const conversations = await db.select({
      id: inboxConversations.id,
      contactName: inboxConversations.contactName,
      contactIdentifier: inboxConversations.contactIdentifier,
      status: inboxConversations.status,
      lastMessageAt: inboxConversations.lastMessageAt,
      lastMessagePreview: inboxConversations.lastMessagePreview,
      unreadCount: inboxConversations.unreadCount,
      createdAt: inboxConversations.createdAt
    }).from(inboxConversations).where(and12(
      eq20(inboxConversations.clientId, clientId),
      eq20(inboxConversations.primaryChannelType, "livechat"),
      status !== "all" ? eq20(inboxConversations.status, status) : void 0
    )).orderBy(desc9(inboxConversations.lastMessageAt)).limit(limit).offset((page - 1) * limit);
    res.json({ conversations, page, limit });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});
router5.get("/dashboard/conversations/:clientId/:conversationId", requireAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (clientId !== req.clientId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const conversationId = parseInt(req.params.conversationId);
    const [conversation] = await db.select().from(inboxConversations).where(and12(
      eq20(inboxConversations.id, conversationId),
      eq20(inboxConversations.clientId, clientId)
    )).limit(1);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const [session2] = await db.select().from(livechatSessions).where(eq20(livechatSessions.conversationId, conversationId)).limit(1);
    const messages = await db.select().from(inboxMessages2).where(eq20(inboxMessages2.conversationId, conversationId)).orderBy(inboxMessages2.createdAt);
    await db.update(inboxConversations).set({ unreadCount: 0 }).where(eq20(inboxConversations.id, conversationId));
    res.json({
      conversation,
      session: session2,
      messages: messages.map((m) => ({
        id: m.id,
        content: m.content,
        direction: m.direction,
        fromName: m.fromName,
        messageType: m.messageType,
        attachments: m.attachments,
        createdAt: m.createdAt
      }))
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
});
var agentMessageSchema = z7.object({
  conversationId: z7.number(),
  content: z7.string().min(1).max(5e3),
  agentId: z7.number().optional(),
  agentName: z7.string().optional()
});
router5.post("/dashboard/messages/:clientId", requireAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (clientId !== req.clientId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const data = agentMessageSchema.parse(req.body);
    const [conversation] = await db.select().from(inboxConversations).where(and12(
      eq20(inboxConversations.id, data.conversationId),
      eq20(inboxConversations.clientId, clientId)
    )).limit(1);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const [session2] = await db.select().from(livechatSessions).where(eq20(livechatSessions.conversationId, data.conversationId)).limit(1);
    const [message] = await db.insert(inboxMessages2).values({
      conversationId: data.conversationId,
      channelType: "livechat",
      messageType: "outgoing",
      direction: "outbound",
      content: data.content,
      contentType: "text",
      fromIdentifier: `client_${clientId}`,
      fromName: data.agentName || "Support Agent",
      toIdentifier: session2?.visitorEmail || session2?.sessionId || "visitor",
      toName: session2?.visitorName || "Visitor",
      sentById: data.agentId
    }).returning();
    await db.update(inboxConversations).set({
      lastMessageAt: /* @__PURE__ */ new Date(),
      lastMessagePreview: data.content.substring(0, 100)
    }).where(eq20(inboxConversations.id, data.conversationId));
    res.json({
      messageId: message.id,
      timestamp: message.createdAt
    });
  } catch (error) {
    console.error("Error sending agent message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});
router5.put("/dashboard/conversations/:clientId/:conversationId/close", requireAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (clientId !== req.clientId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const conversationId = parseInt(req.params.conversationId);
    await db.update(inboxConversations).set({ status: "resolved" }).where(and12(
      eq20(inboxConversations.id, conversationId),
      eq20(inboxConversations.clientId, clientId)
    ));
    await db.update(livechatSessions).set({
      status: "ended",
      endedAt: /* @__PURE__ */ new Date()
    }).where(eq20(livechatSessions.conversationId, conversationId));
    res.json({ success: true });
  } catch (error) {
    console.error("Error closing conversation:", error);
    res.status(500).json({ error: "Failed to close conversation" });
  }
});
router5.get("/settings/:clientId", requireAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (clientId !== req.clientId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const [settings] = await db.select().from(chatWidgetSettings).where(eq20(chatWidgetSettings.clientId, clientId)).limit(1);
    if (!settings) {
      return res.json({
        clientId,
        companyName: "Support",
        welcomeMessage: "Hi! How can we help you today?",
        primaryColor: "#0000FF",
        position: "bottom-right",
        requireEmail: false,
        enableSound: true,
        offlineMessage: "We're offline. Leave a message and we'll get back to you!",
        enableFileUpload: true,
        enableEmoji: true
      });
    }
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});
router5.put("/settings/:clientId", requireAuth, async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (clientId !== req.clientId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const updates = updateChatWidgetSettingsSchema.parse(req.body);
    const [existing] = await db.select().from(chatWidgetSettings).where(eq20(chatWidgetSettings.clientId, clientId)).limit(1);
    if (existing) {
      const [updated] = await db.update(chatWidgetSettings).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq20(chatWidgetSettings.clientId, clientId)).returning();
      return res.json(updated);
    } else {
      const [created] = await db.insert(chatWidgetSettings).values({ clientId, ...updates }).returning();
      return res.json(created);
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    if (error instanceof z7.ZodError) {
      return res.status(400).json({ error: "Invalid settings data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update settings" });
  }
});
router5.get("/embed/:clientId", async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const baseUrl = process.env.BASE_URL || "https://businessblueprint.io";
    const embedCode = `<!-- / chat Widget by BusinessBlueprint -->
<script>
  window.bbChatConfig = {
    clientId: ${clientId}
  };
</script>
<script src="${baseUrl}/chat/widget.js" async></script>`;
    res.json({ embedCode, clientId });
  } catch (error) {
    console.error("Error generating embed code:", error);
    res.status(500).json({ error: "Failed to generate embed code" });
  }
});
router5.get("/analytics/:clientId", async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const period = req.query.period || "week";
    const now = /* @__PURE__ */ new Date();
    let startDate;
    switch (period) {
      case "day":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1e3);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
    }
    const conversationCount = await db.select({ count: sql8`count(*)` }).from(inboxConversations).where(and12(
      eq20(inboxConversations.clientId, clientId),
      eq20(inboxConversations.primaryChannelType, "livechat"),
      sql8`${inboxConversations.createdAt} >= ${startDate}`
    ));
    const messageCount = await db.select({ count: sql8`count(*)` }).from(chatAnalyticsEvents).where(and12(
      eq20(chatAnalyticsEvents.clientId, clientId),
      eq20(chatAnalyticsEvents.eventType, "message_sent"),
      sql8`${chatAnalyticsEvents.createdAt} >= ${startDate}`
    ));
    const widgetOpens = await db.select({ count: sql8`count(*)` }).from(chatAnalyticsEvents).where(and12(
      eq20(chatAnalyticsEvents.clientId, clientId),
      eq20(chatAnalyticsEvents.eventType, "widget_opened"),
      sql8`${chatAnalyticsEvents.createdAt} >= ${startDate}`
    ));
    res.json({
      period,
      totalConversations: conversationCount[0]?.count || 0,
      totalMessages: messageCount[0]?.count || 0,
      widgetOpens: widgetOpens[0]?.count || 0
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});
var chatRouter = router5;

// server/routes/ai-coach.ts
import { Router as Router10 } from "express";

// server/services/aiCoach.ts
init_ai_provider();
init_ai_settings();

// server/services/scansblue.ts
init_db();
init_schema();
import { eq as eq22 } from "drizzle-orm";
var ScansBlueService = class {
  apiKey;
  baseUrl;
  enabled;
  constructor() {
    this.apiKey = process.env.NODE_ENV === "production" ? process.env.SCANSBLUE_API_KEY || process.env.SITEINSPECTOR_API_KEY || "" : process.env.SCANSBLUE_TEST_KEY || process.env.SCANSBLUE_API_KEY || process.env.SITEINSPECTOR_TEST_KEY || process.env.SITEINSPECTOR_API_KEY || "";
    this.baseUrl = process.env.SCANSBLUE_API_URL || process.env.SITEINSPECTOR_API_URL || "https://scansblue.com/api/businessblueprint";
    this.enabled = !!this.apiKey;
    if (!this.enabled) {
      console.log("[ScansBlue] No API key configured - service disabled");
    } else {
      console.log("[ScansBlue] Service initialized");
    }
  }
  isEnabled() {
    return this.enabled;
  }
  async runFastCheck(url) {
    if (!this.enabled) {
      console.log("[ScansBlue] Service disabled - skipping Fast Check");
      return null;
    }
    try {
      console.log(`[ScansBlue] Running Fast Check for: ${url}`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3e4);
      const response = await fetch(`${this.baseUrl}/fast-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey
        },
        body: JSON.stringify({
          url,
          checks: ["comprehensive"]
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!response.ok) {
        throw new Error(`ScansBlue API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "ScansBlue analysis failed");
      }
      console.log(`[ScansBlue] Fast Check completed. Overall score: ${data.results.summary.overallScore}`);
      return data;
    } catch (error) {
      console.error("[ScansBlue] Fast Check error:", error);
      return null;
    }
  }
  async requestFullReport(url, email, assessmentId) {
    if (!this.enabled) {
      console.log("[ScansBlue] Service disabled - skipping Full Report request");
      return null;
    }
    try {
      console.log(`[ScansBlue] Requesting Full Report for: ${url}`);
      const webhookUrl = `${process.env.FRONTEND_URL || "https://businessblueprint.io"}/api/scansblue-webhook`;
      const response = await fetch(`${this.baseUrl}/full-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey
        },
        body: JSON.stringify({
          url,
          email,
          webhookUrl,
          returnUrl: assessmentId ? `${process.env.FRONTEND_URL}/portal/prescriptions/${assessmentId}` : void 0
        })
      });
      if (!response.ok) {
        throw new Error(`ScansBlue API error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to queue report");
      }
      console.log(`[ScansBlue] Full Report queued: ${data.reportId}`);
      return data;
    } catch (error) {
      console.error("[ScansBlue] Full Report error:", error);
      return null;
    }
  }
  async chatWithAuditor(message, context) {
    if (!this.enabled) {
      console.log("[ScansBlue] Service disabled - skipping Auditor chat");
      return null;
    }
    try {
      console.log(`[ScansBlue] Auditor chat: ${message.substring(0, 50)}...`);
      const response = await fetch(`${this.baseUrl}/auditor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey
        },
        body: JSON.stringify({
          message,
          conversationId: context?.conversationId,
          context: {
            businessName: context?.businessName,
            industry: context?.industry,
            currentScore: context?.currentScore,
            url: context?.url
          }
        })
      });
      if (!response.ok) {
        throw new Error(`ScansBlue API error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Auditor chat failed");
      }
      console.log(`[ScansBlue] Auditor response received. Tokens: ${data.tokensUsed}`);
      return data;
    } catch (error) {
      console.error("[ScansBlue] Auditor error:", error);
      return null;
    }
  }
  async saveFastCheckResults(assessmentId, url, results) {
    try {
      await db.insert(scansBlueResults).values({
        assessmentId,
        url,
        overallScore: results.results.summary.overallScore,
        sslPresent: results.results.ssl.present,
        sslValid: results.results.ssl.valid,
        sslIssuer: results.results.ssl.issuer,
        sslExpiresIn: results.results.ssl.expiresIn,
        loadTime: String(results.results.performance.loadTime),
        performanceScore: results.results.performance.score,
        mobileOptimized: results.results.mobile.optimized,
        mobileScore: results.results.mobile.score,
        criticalIssues: JSON.stringify(results.results.criticalIssues)
      });
      console.log(`[ScansBlue] Results saved for assessment ${assessmentId}`);
    } catch (error) {
      console.error("[ScansBlue] Error saving results:", error);
    }
  }
  async updateFullReportStatus(assessmentId, reportId, reportUrl, status) {
    try {
      await db.update(scansBlueResults).set({
        fullReportId: reportId,
        fullReportUrl: reportUrl,
        fullReportStatus: status,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq22(scansBlueResults.assessmentId, assessmentId));
      console.log(`[ScansBlue] Full Report status updated: ${status}`);
    } catch (error) {
      console.error("[ScansBlue] Error updating report status:", error);
    }
  }
  async getResults(assessmentId) {
    try {
      const results = await db.query.scansBlueResults?.findFirst({
        where: eq22(scansBlueResults.assessmentId, assessmentId)
      });
      if (results && results.criticalIssues) {
        return {
          ...results,
          criticalIssues: JSON.parse(results.criticalIssues)
        };
      }
      return results;
    } catch (error) {
      console.error("[ScansBlue] Error getting results:", error);
      return null;
    }
  }
  calculateTechnicalScore(results) {
    if (!results || !results.results) return 0;
    let score = 10;
    if (!results.results.ssl.present) score -= 2;
    else if (!results.results.ssl.valid) score -= 1;
    if (results.results.performance.loadTime > 3) score -= 2;
    else if (results.results.performance.loadTime > 2) score -= 1;
    if (!results.results.mobile.optimized) score -= 2;
    const criticalCount = results.results.criticalIssues.filter((i) => i.severity === "critical").length;
    const highCount = results.results.criticalIssues.filter((i) => i.severity === "high").length;
    if (criticalCount > 2) score -= 2;
    else if (criticalCount > 0) score -= 1;
    if (highCount > 5) score -= 1;
    return Math.max(0, Math.min(10, score));
  }
};
var scansBlueService = new ScansBlueService();

// server/services/aiCoach.ts
init_db();
init_schema();
import { eq as eq23, desc as desc10 } from "drizzle-orm";
var AICoachService = class {
  getProductKnowledgeContext() {
    return `
BUSINESSBLUEPRINT PRODUCT CATALOG (recommend these products when relevant):

COMMVERSE BUNDLE ($99/mo - Save $37 vs buying separately):
- /send: Email & SMS marketing with automation and analytics - for businesses needing email campaigns
- /inbox: Unified inbox for email, SMS, social, chat - never miss a message
- /content: Social media scheduling, AI content creation, engagement tracking
- /livechat: Website chat widget for real-time support and lead capture

LOCALBLUE BUNDLE ($59/mo - Complete local SEO):
- /listings: Manage 50+ directory listings, NAP consistency - for businesses with inconsistent listings
- /reputation: Review monitoring, automated requests, response management - for review problems
- /localblue: Complete package including GBP optimization

STANDALONE:
- /relationships: CRM for customer tracking, pipelines, follow-ups ($29/mo, free tier available)

PARTNERS:
- HostsBlue (hostsblue.com): Web hosting, domains, website builder, SSL - for website issues
- SwipesBlue (swipesblue.com): Payment processing, shopping cart
- ScansBlue (scansblue.com): Website technical analysis, speed/mobile/SEO audits

When giving advice, naturally mention relevant products that solve the user's problem.
Example: "To improve your review response rate, I'd recommend using our Reputation tool at /reputation - it automates review requests and helps you respond faster."
`;
  }
  async getPersonalizedGuidance(context) {
    const prompt = this.buildCoachingPrompt(context);
    const productKnowledge = this.getProductKnowledgeContext();
    try {
      const provider = await aiSettingsService.getProvider("coach_blue");
      console.log(`[Coach Blue] Using ${provider} for coaching`);
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: `You are Coach Blue, an expert digital marketing coach for BusinessBlueprint.io. You help small businesses improve their online presence with encouraging, actionable guidance.

Key principles:
- Be supportive and motivational
- Break down complex tasks into simple steps
- Consider their time constraints and experience
- When recommending solutions, suggest BusinessBlueprint products that solve their specific problem
- Celebrate their progress and acknowledge challenges

${productKnowledge}`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        maxTokens: 1500
      });
      console.log(`[Coach Blue] ${provider} response complete`);
      if (!response.content) throw new Error("No response from AI coach");
      return this.parseCoachingResponse(response.content);
    } catch (error) {
      console.error("Error getting AI coaching:", error);
      return this.getFallbackGuidance(context);
    }
  }
  async getTechnicalWebsiteHelp(question, websiteUrl) {
    try {
      const provider = await aiSettingsService.getProvider("coach_blue");
      let technicalContext = "";
      if (websiteUrl) {
        const auditorResponse = await scansBlueService.chatWithAuditor(question, { url: websiteUrl });
        if (auditorResponse) {
          technicalContext = `

Technical Analysis from ScansBlue:
${auditorResponse.response}`;
        }
      }
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: `You are Coach Blue helping with technical website questions. Provide helpful, non-technical explanations. When relevant, recommend BusinessBlueprint products:
- HostsBlue (hostsblue.com) for hosting, domains, SSL issues
- ScansBlue (scansblue.com) for detailed technical audits
- /livechat for adding live chat to capture leads`
          },
          {
            role: "user",
            content: `Question: ${question}${technicalContext}`
          }
        ],
        temperature: 0.5,
        maxTokens: 1e3
      });
      const products2 = [];
      const content = response.content || "";
      if (content.toLowerCase().includes("hostsblue") || content.toLowerCase().includes("hosting")) {
        products2.push("hostsBlue");
      }
      if (content.toLowerCase().includes("scansblue") || content.toLowerCase().includes("audit")) {
        products2.push("scansBlue");
      }
      if (content.toLowerCase().includes("livechat") || content.toLowerCase().includes("chat")) {
        products2.push("livechat");
      }
      return {
        answer: content,
        technicalDetails: technicalContext || void 0,
        recommendedProducts: products2
      };
    } catch (error) {
      console.error("[Coach Blue] Technical help error:", error);
      return {
        answer: "I can help with website questions! For detailed technical analysis, I recommend running a ScansBlue audit at scansblue.com.",
        recommendedProducts: ["scansBlue"]
      };
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
      const provider = await aiSettingsService.getProvider("coach_blue");
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: "You are Coach Blue, a digital marketing tutor. Break down complex tasks into simple, actionable steps that anyone can follow."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        maxTokens: 1200
      });
      return this.parseStepByStepResponse(response.content);
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
      const provider = await aiSettingsService.getProvider("coach_blue");
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: "You are Coach Blue, an encouraging business coach. Focus on celebrating achievements and providing clear direction for continued growth."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        maxTokens: 800
      });
      return this.parseProgressResponse(response.content);
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
  // ---- Conversation History Persistence ----
  /**
   * Create a new conversation for a client
   */
  async createConversation(clientId, title) {
    const [conversation] = await db.insert(aiCoachConversations).values({ clientId, title: title || "New Conversation" }).returning();
    return conversation;
  }
  /**
   * Get all conversations for a client
   */
  async getConversations(clientId) {
    return db.select().from(aiCoachConversations).where(eq23(aiCoachConversations.clientId, clientId)).orderBy(desc10(aiCoachConversations.updatedAt));
  }
  /**
   * Get all messages in a conversation
   */
  async getMessages(conversationId) {
    return db.select().from(aiCoachMessages).where(eq23(aiCoachMessages.conversationId, conversationId)).orderBy(aiCoachMessages.createdAt);
  }
  /**
   * Send a message in a conversation and get AI response
   */
  async chat(clientId, conversationId, userMessage, context) {
    await db.insert(aiCoachMessages).values({
      conversationId,
      role: "user",
      content: userMessage,
      messageType: "guidance"
    });
    const history = await this.getMessages(conversationId);
    const chatHistory = history.map((m) => ({
      role: m.role,
      content: m.content
    }));
    const productKnowledge = this.getProductKnowledgeContext();
    const contextInfo = context ? `

Business Context:
- Business: ${context.businessInfo.name} (${context.businessInfo.industry})
- Digital Score: ${context.businessInfo.digitalScore}/100
- Experience: ${context.userProgress.experience}` : "";
    try {
      const provider = await aiSettingsService.getProvider("coach_blue");
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: `You are Coach Blue, an expert digital marketing coach for BusinessBlueprint.io. You help small businesses improve their online presence with encouraging, actionable guidance. Be conversational and helpful.${contextInfo}

${productKnowledge}`
          },
          ...chatHistory
        ],
        temperature: 0.7,
        maxTokens: 1500
      });
      const aiMessage = response.content || "I'm having trouble responding right now. Please try again.";
      await db.insert(aiCoachMessages).values({
        conversationId,
        role: "assistant",
        content: aiMessage,
        messageType: "guidance"
      });
      if (history.length <= 1) {
        const title = userMessage.length > 60 ? userMessage.substring(0, 57) + "..." : userMessage;
        await db.update(aiCoachConversations).set({ title, updatedAt: /* @__PURE__ */ new Date() }).where(eq23(aiCoachConversations.id, conversationId));
      } else {
        await db.update(aiCoachConversations).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq23(aiCoachConversations.id, conversationId));
      }
      return { role: "assistant", content: aiMessage };
    } catch (error) {
      console.error("Error in AI Coach chat:", error);
      const fallback = "I'm having trouble connecting right now. Please try again in a moment.";
      await db.insert(aiCoachMessages).values({
        conversationId,
        role: "assistant",
        content: fallback,
        messageType: "guidance"
      });
      return { role: "assistant", content: fallback };
    }
  }
};
var aiCoachService = new AICoachService();

// server/routes/ai-coach.ts
var aiCoachRouter = Router10();
aiCoachRouter.get(
  "/api/ai-coach/conversations",
  requireClientPortalAccess,
  async (req, res) => {
    try {
      const clientId = req.clientId;
      const conversations = await aiCoachService.getConversations(clientId);
      res.json({ conversations });
    } catch (error) {
      console.error("Error fetching AI Coach conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  }
);
aiCoachRouter.post(
  "/api/ai-coach/conversations",
  requireClientPortalAccess,
  async (req, res) => {
    try {
      const clientId = req.clientId;
      const conversation = await aiCoachService.createConversation(clientId);
      res.json({ conversation });
    } catch (error) {
      console.error("Error creating AI Coach conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
);
aiCoachRouter.get(
  "/api/ai-coach/conversations/:id/messages",
  requireClientPortalAccess,
  async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ error: "Invalid conversation ID" });
      }
      const messages = await aiCoachService.getMessages(conversationId);
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching AI Coach messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);
aiCoachRouter.post(
  "/api/ai-coach/conversations/:id/chat",
  requireClientPortalAccess,
  async (req, res) => {
    try {
      const clientId = req.clientId;
      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ error: "Invalid conversation ID" });
      }
      const { message, context } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      const response = await aiCoachService.chat(
        clientId,
        conversationId,
        message,
        context
      );
      res.json(response);
    } catch (error) {
      console.error("Error in AI Coach chat:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  }
);

// server/routes/send.ts
init_db();
init_schema();
import { eq as eq24, desc as desc11, sql as sql9, and as and13 } from "drizzle-orm";
function registerSendRoutes(app2) {
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
  app2.get(
    "/api/send/metrics",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const [contactCount] = await db.select({ count: sql9`count(*)::int` }).from(sendContacts).where(eq24(sendContacts.clientId, clientId));
        const [campaignStats] = await db.select({
          emailsSent: sql9`coalesce(sum(${sendCampaigns.emailsSent}), 0)::int`,
          emailsOpened: sql9`coalesce(sum(${sendCampaigns.emailsOpened}), 0)::int`,
          emailsClicked: sql9`coalesce(sum(${sendCampaigns.emailsClicked}), 0)::int`,
          emailsBounced: sql9`coalesce(sum(${sendCampaigns.emailsBounced}), 0)::int`,
          smsSent: sql9`coalesce(sum(${sendCampaigns.smsSent}), 0)::int`,
          smsDelivered: sql9`coalesce(sum(${sendCampaigns.smsDelivered}), 0)::int`
        }).from(sendCampaigns).where(eq24(sendCampaigns.clientId, clientId));
        const totalContacts = contactCount?.count ?? 0;
        const emailsSent = campaignStats?.emailsSent ?? 0;
        const emailsOpened = campaignStats?.emailsOpened ?? 0;
        const emailsClicked = campaignStats?.emailsClicked ?? 0;
        const emailsBounced = campaignStats?.emailsBounced ?? 0;
        const smsSent = campaignStats?.smsSent ?? 0;
        const smsDelivered = campaignStats?.smsDelivered ?? 0;
        const emailsDelivered = emailsSent - emailsBounced;
        const avgOpenRate = emailsDelivered > 0 ? emailsOpened / emailsDelivered * 100 : 0;
        const avgClickRate = emailsOpened > 0 ? emailsClicked / emailsOpened * 100 : 0;
        const avgDeliverability = emailsSent > 0 ? emailsDelivered / emailsSent * 100 : 0;
        res.json({
          totalContacts,
          contactsGrowth: 0,
          emailsSent,
          emailsDelivered,
          emailsOpened,
          emailsClicked,
          smsSent,
          smsDelivered,
          avgOpenRate: Math.round(avgOpenRate * 10) / 10,
          avgClickRate: Math.round(avgClickRate * 10) / 10,
          avgDeliverability: Math.round(avgDeliverability * 10) / 10
        });
      } catch (error) {
        console.error("Error fetching send metrics:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch send metrics"
        });
      }
    }
  );
  app2.get(
    "/api/send/campaigns/recent",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const limit = Math.min(
          parseInt(req.query.limit) || 10,
          50
        );
        const campaigns2 = await db.select().from(sendCampaigns).where(eq24(sendCampaigns.clientId, clientId)).orderBy(desc11(sendCampaigns.createdAt)).limit(limit);
        const activityItems = campaigns2.map((c) => ({
          id: c.id,
          type: "campaign",
          name: c.name,
          status: c.status ?? "draft",
          time: c.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString(),
          recipients: c.totalRecipients ?? 0
        }));
        res.json(activityItems);
      } catch (error) {
        console.error("Error fetching recent campaigns:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch recent campaigns"
        });
      }
    }
  );
  app2.get(
    "/api/send/campaigns",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const limit = Math.min(
          parseInt(req.query.limit) || 50,
          200
        );
        const offset = parseInt(req.query.offset) || 0;
        const status = req.query.status;
        let query = db.select().from(sendCampaigns).where(
          status ? and13(
            eq24(sendCampaigns.clientId, clientId),
            eq24(sendCampaigns.status, status)
          ) : eq24(sendCampaigns.clientId, clientId)
        ).orderBy(desc11(sendCampaigns.createdAt)).limit(limit).offset(offset);
        const campaigns2 = await query;
        const [countResult] = await db.select({ count: sql9`count(*)::int` }).from(sendCampaigns).where(
          status ? and13(
            eq24(sendCampaigns.clientId, clientId),
            eq24(sendCampaigns.status, status)
          ) : eq24(sendCampaigns.clientId, clientId)
        );
        res.json({
          success: true,
          campaigns: campaigns2,
          pagination: {
            total: countResult?.count ?? 0,
            limit,
            offset,
            hasMore: offset + limit < (countResult?.count ?? 0)
          }
        });
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch campaigns"
        });
      }
    }
  );
  app2.post(
    "/api/send/campaigns",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const {
          name,
          description,
          campaignType,
          emailSubject,
          emailHtml,
          emailText,
          smsBody
        } = req.body;
        if (!name || !campaignType) {
          return res.status(400).json({
            success: false,
            message: "Campaign name and type are required"
          });
        }
        if (!["email", "sms", "both"].includes(campaignType)) {
          return res.status(400).json({
            success: false,
            message: "Campaign type must be email, sms, or both"
          });
        }
        const [campaign] = await db.insert(sendCampaigns).values({
          clientId,
          name,
          description: description || null,
          campaignType,
          status: "draft",
          emailSubject: emailSubject || null,
          emailHtml: emailHtml || null,
          emailText: emailText || null,
          smsBody: smsBody || null
        }).returning();
        res.json({ success: true, campaign });
      } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create campaign"
        });
      }
    }
  );
  app2.get(
    "/api/send/campaigns/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid campaign ID"
          });
        }
        const [campaign] = await db.select().from(sendCampaigns).where(
          and13(
            eq24(sendCampaigns.id, id),
            eq24(sendCampaigns.clientId, clientId)
          )
        );
        if (!campaign) {
          return res.status(404).json({
            success: false,
            message: "Campaign not found"
          });
        }
        res.json({ success: true, campaign });
      } catch (error) {
        console.error("Error fetching campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch campaign"
        });
      }
    }
  );
  app2.patch(
    "/api/send/campaigns/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid campaign ID"
          });
        }
        const [existing] = await db.select().from(sendCampaigns).where(
          and13(
            eq24(sendCampaigns.id, id),
            eq24(sendCampaigns.clientId, clientId)
          )
        );
        if (!existing) {
          return res.status(404).json({
            success: false,
            message: "Campaign not found"
          });
        }
        if (existing.status !== "draft") {
          return res.status(400).json({
            success: false,
            message: "Only draft campaigns can be edited"
          });
        }
        const updateData = { ...req.body, updatedAt: /* @__PURE__ */ new Date() };
        delete updateData.clientId;
        delete updateData.id;
        const [campaign] = await db.update(sendCampaigns).set(updateData).where(eq24(sendCampaigns.id, id)).returning();
        res.json({ success: true, campaign });
      } catch (error) {
        console.error("Error updating campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update campaign"
        });
      }
    }
  );
  app2.delete(
    "/api/send/campaigns/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid campaign ID"
          });
        }
        const [existing] = await db.select().from(sendCampaigns).where(
          and13(
            eq24(sendCampaigns.id, id),
            eq24(sendCampaigns.clientId, clientId)
          )
        );
        if (!existing) {
          return res.status(404).json({
            success: false,
            message: "Campaign not found"
          });
        }
        if (existing.status !== "draft") {
          return res.status(400).json({
            success: false,
            message: "Only draft campaigns can be deleted"
          });
        }
        await db.delete(sendCampaigns).where(eq24(sendCampaigns.id, id));
        res.json({
          success: true,
          message: "Campaign deleted successfully"
        });
      } catch (error) {
        console.error("Error deleting campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete campaign"
        });
      }
    }
  );
  app2.get(
    "/api/send/templates",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const type = req.query.type;
        let query = db.select().from(sendTemplates).where(eq24(sendTemplates.clientId, clientId)).orderBy(desc11(sendTemplates.updatedAt));
        const templates = await (type ? db.select().from(sendTemplates).where(
          and13(
            eq24(sendTemplates.clientId, clientId),
            eq24(sendTemplates.templateType, type)
          )
        ).orderBy(desc11(sendTemplates.updatedAt)) : query);
        res.json({ success: true, templates });
      } catch (error) {
        console.error("Error fetching templates:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch templates"
        });
      }
    }
  );
  app2.post(
    "/api/send/templates",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const { name, description, templateType, emailSubject, emailHtml, emailText, smsBody, category } = req.body;
        if (!name || !templateType) {
          return res.status(400).json({
            success: false,
            message: "Template name and type are required"
          });
        }
        if (!["email", "sms"].includes(templateType)) {
          return res.status(400).json({
            success: false,
            message: "Template type must be email or sms"
          });
        }
        const [template] = await db.insert(sendTemplates).values({
          clientId,
          name,
          description: description || null,
          templateType,
          emailSubject: emailSubject || null,
          emailHtml: emailHtml || null,
          emailText: emailText || null,
          smsBody: smsBody || null,
          category: category || null
        }).returning();
        res.json({ success: true, template });
      } catch (error) {
        console.error("Error creating template:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create template"
        });
      }
    }
  );
  app2.get(
    "/api/send/templates/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID" });
        }
        const [template] = await db.select().from(sendTemplates).where(
          and13(eq24(sendTemplates.id, id), eq24(sendTemplates.clientId, clientId))
        );
        if (!template) {
          return res.status(404).json({ success: false, message: "Template not found" });
        }
        res.json({ success: true, template });
      } catch (error) {
        console.error("Error fetching template:", error);
        res.status(500).json({ success: false, message: "Failed to fetch template" });
      }
    }
  );
  app2.patch(
    "/api/send/templates/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID" });
        }
        const [existing] = await db.select().from(sendTemplates).where(
          and13(eq24(sendTemplates.id, id), eq24(sendTemplates.clientId, clientId))
        );
        if (!existing) {
          return res.status(404).json({ success: false, message: "Template not found" });
        }
        const updateData = { ...req.body, updatedAt: /* @__PURE__ */ new Date() };
        delete updateData.clientId;
        delete updateData.id;
        const [template] = await db.update(sendTemplates).set(updateData).where(eq24(sendTemplates.id, id)).returning();
        res.json({ success: true, template });
      } catch (error) {
        console.error("Error updating template:", error);
        res.status(500).json({ success: false, message: "Failed to update template" });
      }
    }
  );
  app2.delete(
    "/api/send/templates/:id",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID" });
        }
        const [existing] = await db.select().from(sendTemplates).where(
          and13(eq24(sendTemplates.id, id), eq24(sendTemplates.clientId, clientId))
        );
        if (!existing) {
          return res.status(404).json({ success: false, message: "Template not found" });
        }
        if (existing.isSystem) {
          return res.status(400).json({
            success: false,
            message: "System templates cannot be deleted"
          });
        }
        await db.delete(sendTemplates).where(eq24(sendTemplates.id, id));
        res.json({ success: true, message: "Template deleted successfully" });
      } catch (error) {
        console.error("Error deleting template:", error);
        res.status(500).json({ success: false, message: "Failed to delete template" });
      }
    }
  );
}

// server/routes/optimize.ts
init_db();
init_schema();
import { eq as eq25, desc as desc12, and as and14, sql as sql10, asc as asc3 } from "drizzle-orm";

// server/services/seo-crawler.ts
async function analyzePage(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "BusinessBlueprint-SEO-Bot/1.0" },
      signal: AbortSignal.timeout(15e3)
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const html = await response.text();
    return parseHtml(url, html);
  } catch (error) {
    console.error(`[SEO Crawler] Failed to analyze ${url}:`, error.message);
    return {
      url,
      title: null,
      metaDescription: null,
      h1: null,
      h2s: [],
      wordCount: 0,
      images: { total: 0, withoutAlt: 0 },
      links: { internal: 0, external: 0, broken: 0 },
      hasSchemaMarkup: false,
      hasMobileViewport: false,
      hasCanonical: false
    };
  }
}
function parseHtml(url, html) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
  const title = titleMatch ? titleMatch[1].trim() : null;
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*\/?>/is) || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["'][^>]*\/?>/is);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, "").trim() : null;
  const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gis) || [];
  const h2s = h2Matches.map((m) => m.replace(/<[^>]*>/g, "").trim()).slice(0, 20);
  const bodyMatch = html.match(/<body[^>]*>(.*)<\/body>/is);
  const bodyText = bodyMatch ? bodyMatch[1].replace(/<script[^>]*>.*?<\/script>/gis, "").replace(/<style[^>]*>.*?<\/style>/gis, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
  const imgMatches = html.match(/<img[^>]*>/gis) || [];
  const imagesWithoutAlt = imgMatches.filter((img) => !img.match(/alt=["'][^"']+["']/i)).length;
  const linkMatches = html.match(/<a[^>]*href=["']([^"']*?)["'][^>]*>/gis) || [];
  const parsedUrl = new URL(url);
  let internal = 0, external = 0;
  for (const link of linkMatches) {
    const hrefMatch = link.match(/href=["']([^"']*?)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:")) continue;
      try {
        const linkUrl = new URL(href, url);
        if (linkUrl.hostname === parsedUrl.hostname) internal++;
        else external++;
      } catch {
        internal++;
      }
    }
  }
  const hasSchemaMarkup = html.includes("application/ld+json") || html.includes("itemtype=");
  const hasMobileViewport = /meta[^>]*name=["']viewport["']/i.test(html);
  const hasCanonical = /link[^>]*rel=["']canonical["']/i.test(html);
  return {
    url,
    title,
    metaDescription,
    h1,
    h2s,
    wordCount,
    images: { total: imgMatches.length, withoutAlt: imagesWithoutAlt },
    links: { internal, external, broken: 0 },
    hasSchemaMarkup,
    hasMobileViewport,
    hasCanonical
  };
}
async function runTechnicalAudit(domain) {
  const issues = [];
  const baseUrl = domain.startsWith("http") ? domain : `https://${domain}`;
  let hasRobotsTxt = false;
  try {
    const res = await fetch(`${baseUrl}/robots.txt`, { signal: AbortSignal.timeout(1e4) });
    hasRobotsTxt = res.ok && (await res.text()).length > 0;
  } catch {
  }
  if (!hasRobotsTxt) {
    issues.push({
      type: "missing-robots",
      severity: "medium",
      description: "Missing or empty robots.txt file",
      howToFix: "Create a robots.txt file in your website root that tells search engines which pages to crawl."
    });
  }
  let hasSitemap = false;
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`, { signal: AbortSignal.timeout(1e4) });
    hasSitemap = res.ok && (await res.text()).includes("<urlset");
  } catch {
  }
  if (!hasSitemap) {
    issues.push({
      type: "missing-sitemap",
      severity: "high",
      description: "Missing or invalid sitemap.xml",
      howToFix: "Generate an XML sitemap listing all important pages and submit it to Google Search Console."
    });
  }
  let hasSSL = false;
  try {
    const res = await fetch(baseUrl.replace("http://", "https://"), { signal: AbortSignal.timeout(1e4) });
    hasSSL = res.ok;
  } catch {
  }
  if (!hasSSL) {
    issues.push({
      type: "no-ssl",
      severity: "critical",
      description: "Website is not accessible via HTTPS",
      howToFix: "Install an SSL certificate on your web server. Many hosting providers offer free SSL via Let's Encrypt."
    });
  }
  let hasMobileViewport = false;
  try {
    const pageData = await analyzePage(baseUrl);
    hasMobileViewport = pageData.hasMobileViewport;
    if (!pageData.title) {
      issues.push({
        type: "missing-title",
        severity: "critical",
        url: baseUrl,
        description: "Homepage is missing a title tag",
        howToFix: "Add a descriptive <title> tag in the <head> section of your homepage."
      });
    } else if (pageData.title.length > 60) {
      issues.push({
        type: "long-title",
        severity: "low",
        url: baseUrl,
        description: `Title tag is too long (${pageData.title.length} chars, recommended: 50-60)`,
        howToFix: "Shorten your title tag to under 60 characters for optimal search display."
      });
    }
    if (!pageData.metaDescription) {
      issues.push({
        type: "missing-meta-description",
        severity: "high",
        url: baseUrl,
        description: "Homepage is missing a meta description",
        howToFix: 'Add a compelling <meta name="description"> tag (150-160 chars) to your homepage.'
      });
    }
    if (!pageData.h1) {
      issues.push({
        type: "missing-h1",
        severity: "high",
        url: baseUrl,
        description: "Homepage is missing an H1 heading",
        howToFix: "Add a single, descriptive H1 heading to your homepage that includes your primary keyword."
      });
    }
    if (!pageData.hasMobileViewport) {
      issues.push({
        type: "no-mobile-viewport",
        severity: "critical",
        url: baseUrl,
        description: "Missing mobile viewport meta tag",
        howToFix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head>.'
      });
    }
    if (!pageData.hasSchemaMarkup) {
      issues.push({
        type: "no-schema-markup",
        severity: "medium",
        url: baseUrl,
        description: "No structured data (Schema.org) found",
        howToFix: "Add JSON-LD structured data to help search engines understand your content."
      });
    }
    if (pageData.images.withoutAlt > 0) {
      issues.push({
        type: "missing-alt-text",
        severity: "medium",
        url: baseUrl,
        description: `${pageData.images.withoutAlt} of ${pageData.images.total} images missing alt text`,
        howToFix: "Add descriptive alt attributes to all images for accessibility and SEO."
      });
    }
  } catch {
  }
  let performanceScore;
  let seoScore;
  let accessibilityScore;
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (apiKey) {
    try {
      const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(baseUrl)}&key=${apiKey}&category=performance&category=seo&category=accessibility&strategy=mobile`;
      const res = await fetch(psiUrl, { signal: AbortSignal.timeout(3e4) });
      if (res.ok) {
        const data = await res.json();
        performanceScore = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);
        seoScore = Math.round((data.lighthouseResult?.categories?.seo?.score || 0) * 100);
        accessibilityScore = Math.round((data.lighthouseResult?.categories?.accessibility?.score || 0) * 100);
        if (performanceScore < 50) {
          issues.push({
            type: "slow-performance",
            severity: "high",
            url: baseUrl,
            description: `Poor mobile performance score: ${performanceScore}/100`,
            howToFix: "Optimize images, minimize JavaScript/CSS, enable caching, and consider a CDN."
          });
        }
      }
    } catch (err) {
      console.log("[SEO Crawler] PageSpeed API unavailable:", err.message);
    }
  }
  return {
    domain,
    hasRobotsTxt,
    hasSitemap,
    hasSSL,
    hasMobileViewport,
    issues,
    performanceScore,
    seoScore,
    accessibilityScore
  };
}
function calculateSeoScore(metrics) {
  let score = 100;
  score -= metrics.technicalIssues.critical * 15;
  score -= metrics.technicalIssues.high * 8;
  score -= metrics.technicalIssues.medium * 3;
  score -= metrics.technicalIssues.low * 1;
  if (metrics.pageScores.length > 0) {
    const avgPageScore = metrics.pageScores.reduce((a, b) => a + b, 0) / metrics.pageScores.length;
    score = score * 0.7 + avgPageScore * 0.3;
  }
  if (metrics.keywordsTracked > 0) {
    score = Math.min(score + 5, 100);
  }
  if (metrics.performanceScore !== void 0) {
    score = score * 0.8 + metrics.performanceScore * 0.2;
  }
  return Math.max(0, Math.min(100, Math.round(score)));
}

// server/services/seo-keywords.ts
init_ai_provider();
init_ai_settings();
async function researchKeywords(seed, industry, location) {
  const settings = await aiSettingsService.getSettings();
  const provider = settings.defaultProvider || "openai";
  const prompt = `You are an SEO keyword research expert. Given the following seed keywords and business information, generate 15-20 keyword suggestions.

Seed Keywords: ${seed.join(", ")}
Industry: ${industry}
${location ? `Location: ${location}` : ""}

For each keyword, provide:
- keyword: the search term
- estimatedVolume: monthly search volume estimate (realistic numbers)
- difficulty: SEO difficulty score 1-100 (higher = harder to rank)
- relevance: "high", "medium", or "low" relevance to the business
- type: "short-tail", "long-tail", "local", or "question"

Include a mix of:
- Short-tail competitive keywords
- Long-tail opportunities with lower difficulty
- Local variations (if location provided)
- Question-based keywords ("how to...", "what is...", "best...")

Return ONLY a JSON array of objects. No markdown, no explanation.`;
  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: "system", content: "You are an SEO keyword research expert. Return only valid JSON arrays." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      maxTokens: 2e3,
      responseFormat: "json"
    });
    const cleaned = result.content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("[SEO Keywords] Research failed:", error.message);
    return [];
  }
}

// server/services/seo-content.ts
init_ai_provider();
init_ai_settings();
async function generateContentBrief(keyword, industry, currentPageContent) {
  const settings = await aiSettingsService.getSettings();
  const provider = settings.defaultProvider || "openai";
  const prompt = `You are an SEO content strategist. Create a detailed content brief for a page targeting the keyword "${keyword}".

${industry ? `Industry: ${industry}` : ""}
${currentPageContent ? `
Existing page content (first 500 chars): ${currentPageContent.substring(0, 500)}` : ""}

Generate a content brief with:
1. An SEO-optimized title (include the keyword)
2. A detailed outline with H2 and H3 headings
3. Writing suggestions for each section
4. Target word count recommendation
5. Related keywords to include naturally
6. Search intent classification (informational, transactional, navigational, commercial)

Return JSON with this structure:
{
  "title": "",
  "targetKeyword": "${keyword}",
  "outline": [{"heading": "", "type": "h2|h3", "notes": "what to cover"}],
  "suggestions": ["writing tip 1", "writing tip 2"],
  "wordCountTarget": 1500,
  "relatedKeywords": ["related1", "related2"],
  "searchIntent": "informational"
}

Return ONLY valid JSON. No markdown.`;
  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: "system", content: "You are an SEO content strategist. Return only valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      maxTokens: 2e3,
      responseFormat: "json"
    });
    const cleaned = result.content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("[SEO Content] Brief generation failed:", error.message);
    return {
      title: `Guide to ${keyword}`,
      targetKeyword: keyword,
      outline: [{ heading: keyword, type: "h2", notes: "Main topic coverage" }],
      suggestions: ["Include the target keyword in the first paragraph"],
      wordCountTarget: 1500,
      relatedKeywords: [],
      searchIntent: "informational"
    };
  }
}

// server/services/seo-action-plan.ts
init_ai_provider();
init_ai_settings();
async function generateActionPlan(input) {
  const settings = await aiSettingsService.getSettings();
  const provider = settings.defaultProvider || "openai";
  const prompt = `You are an SEO consultant creating a prioritized action plan for a business.

Domain: ${input.domain}
Industry: ${input.industry || "General"}
Current SEO Score: ${input.overallScore ?? "Not yet scored"}
Local SEO Enabled: ${input.localEnabled ? "Yes" : "No"}

Technical Issues Found:
${input.technicalIssues.length > 0 ? input.technicalIssues.map((i) => `- [${i.severity}] ${i.type}: ${i.description}`).join("\n") : "- No technical issues scanned yet"}

Tracked Keywords:
${input.keywords.length > 0 ? input.keywords.slice(0, 10).map((k) => `- "${k.keyword}" (Rank: ${k.currentRank ?? "unranked"})`).join("\n") : "- No keywords tracked yet"}

Analyzed Pages:
${input.pages.length > 0 ? input.pages.slice(0, 5).map((p) => `- ${p.url} (Score: ${p.score ?? "N/A"})`).join("\n") : "- No pages analyzed yet"}

Create 8-12 prioritized action items. Each should be specific and actionable.
Categories: technical, content, keywords, on-page, local
Priority: critical (do immediately), high (this week), medium (this month), low (when time allows)
Impact: high, medium, low \u2014 expected SEO improvement
Effort: high (hours of work), medium (30-60 min), low (under 30 min)

Return a JSON array of objects:
[{"title": "", "description": "", "category": "", "priority": "", "impact": "", "effort": ""}]

Return ONLY valid JSON array. No markdown.`;
  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: "system", content: "You are an SEO consultant. Return only valid JSON arrays." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      maxTokens: 2500,
      responseFormat: "json"
    });
    const cleaned = result.content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("[SEO Action Plan] Generation failed:", error.message);
    return [
      {
        title: "Run initial SEO scan",
        description: "Start by running a full technical SEO scan of your website to identify critical issues.",
        category: "technical",
        priority: "critical",
        impact: "high",
        effort: "low"
      },
      {
        title: "Add target keywords",
        description: "Add 5-10 primary keywords you want to rank for to begin tracking your positions.",
        category: "keywords",
        priority: "high",
        impact: "medium",
        effort: "low"
      }
    ];
  }
}

// server/routes/optimize.ts
function registerOptimizeRoutes(app2) {
  app2.post(
    "/api/seo/profiles",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const { domain, businessName, industry, location, targetKeywords, competitors, localEnabled } = req.body;
        if (!domain) {
          return res.status(400).json({ success: false, message: "Domain is required" });
        }
        const existing = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (existing.length > 0) {
          const [updated] = await db.update(seoProfiles).set({
            domain,
            businessName,
            industry,
            location,
            targetKeywords: targetKeywords || [],
            competitors: competitors || [],
            localEnabled: localEnabled || false,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq25(seoProfiles.id, existing[0].id)).returning();
          return res.json({ success: true, profile: updated });
        }
        const [profile] = await db.insert(seoProfiles).values({
          clientId,
          domain,
          businessName,
          industry,
          location,
          targetKeywords: targetKeywords || [],
          competitors: competitors || [],
          localEnabled: localEnabled || false
        }).returning();
        if (targetKeywords && Array.isArray(targetKeywords) && targetKeywords.length > 0) {
          for (const kw of targetKeywords.slice(0, 10)) {
            await db.insert(seoKeywords).values({
              profileId: profile.id,
              keyword: kw,
              source: "manual"
            });
          }
        }
        res.json({ success: true, profile });
      } catch (error) {
        console.error("[Optimize] Profile create error:", error);
        res.status(500).json({ success: false, message: "Failed to create SEO profile" });
      }
    }
  );
  app2.get(
    "/api/seo/profiles",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profiles = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profiles.length === 0) {
          return res.json({ success: true, profile: null });
        }
        res.json({ success: true, profile: profiles[0] });
      } catch (error) {
        console.error("[Optimize] Profile fetch error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch SEO profile" });
      }
    }
  );
  app2.post(
    "/api/seo/scan",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) {
          return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });
        }
        const profileData = profile[0];
        const [scan] = await db.insert(seoScans).values({
          profileId: profileData.id,
          scanType: req.body.scanType || "full",
          status: "running"
        }).returning();
        (async () => {
          try {
            const auditResult = await runTechnicalAudit(profileData.domain);
            for (const issue of auditResult.issues) {
              await db.insert(seoTechnicalIssues).values({
                profileId: profileData.id,
                scanId: scan.id,
                type: issue.type,
                severity: issue.severity,
                url: issue.url || profileData.domain,
                description: issue.description,
                howToFix: issue.howToFix
              });
            }
            const pageData = await analyzePage(
              profileData.domain.startsWith("http") ? profileData.domain : `https://${profileData.domain}`
            );
            const existingPage = await db.select().from(seoPages).where(and14(eq25(seoPages.profileId, profileData.id), eq25(seoPages.url, pageData.url))).limit(1);
            const pageScore = calculatePageScore(pageData);
            if (existingPage.length > 0) {
              await db.update(seoPages).set({
                title: pageData.title,
                metaDescription: pageData.metaDescription,
                h1: pageData.h1,
                wordCount: pageData.wordCount,
                score: pageScore,
                issues: pageData,
                lastAnalyzed: /* @__PURE__ */ new Date()
              }).where(eq25(seoPages.id, existingPage[0].id));
            } else {
              await db.insert(seoPages).values({
                profileId: profileData.id,
                url: pageData.url,
                title: pageData.title,
                metaDescription: pageData.metaDescription,
                h1: pageData.h1,
                wordCount: pageData.wordCount,
                score: pageScore,
                issues: pageData,
                lastAnalyzed: /* @__PURE__ */ new Date()
              });
            }
            const issueCountResult = await db.select({
              critical: sql10`count(*) filter (where ${seoTechnicalIssues.severity} = 'critical')`,
              high: sql10`count(*) filter (where ${seoTechnicalIssues.severity} = 'high')`,
              medium: sql10`count(*) filter (where ${seoTechnicalIssues.severity} = 'medium')`,
              low: sql10`count(*) filter (where ${seoTechnicalIssues.severity} = 'low')`
            }).from(seoTechnicalIssues).where(and14(
              eq25(seoTechnicalIssues.profileId, profileData.id),
              eq25(seoTechnicalIssues.status, "open")
            ));
            const issueCounts = issueCountResult[0] || { critical: 0, high: 0, medium: 0, low: 0 };
            const keywordCount = await db.select({ count: sql10`count(*)` }).from(seoKeywords).where(eq25(seoKeywords.profileId, profileData.id));
            const overallScore = calculateSeoScore({
              technicalIssues: {
                critical: Number(issueCounts.critical),
                high: Number(issueCounts.high),
                medium: Number(issueCounts.medium),
                low: Number(issueCounts.low)
              },
              pageScores: [pageScore],
              keywordsTracked: Number(keywordCount[0]?.count || 0),
              performanceScore: auditResult.performanceScore,
              seoScore: auditResult.seoScore
            });
            await db.update(seoScans).set({
              overallScore,
              performanceScore: auditResult.performanceScore,
              seoScore: auditResult.seoScore,
              accessibilityScore: auditResult.accessibilityScore,
              metrics: auditResult,
              issues: auditResult.issues,
              status: "completed"
            }).where(eq25(seoScans.id, scan.id));
          } catch (err) {
            console.error("[Optimize] Scan failed:", err);
            await db.update(seoScans).set({ status: "failed" }).where(eq25(seoScans.id, scan.id));
          }
        })();
        res.json({ success: true, scan: { id: scan.id, status: "running" } });
      } catch (error) {
        console.error("[Optimize] Scan trigger error:", error);
        res.status(500).json({ success: false, message: "Failed to trigger scan" });
      }
    }
  );
  app2.get(
    "/api/seo/scans",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, scans: [] });
        const scans = await db.select().from(seoScans).where(eq25(seoScans.profileId, profile[0].id)).orderBy(desc12(seoScans.createdAt)).limit(20);
        res.json({ success: true, scans });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch scans" });
      }
    }
  );
  app2.get(
    "/api/seo/scans/:id",
    requireAuth,
    async (req, res) => {
      try {
        const scan = await db.select().from(seoScans).where(eq25(seoScans.id, parseInt(req.params.id))).limit(1);
        if (scan.length === 0) return res.status(404).json({ success: false, message: "Scan not found" });
        res.json({ success: true, scan: scan[0] });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch scan" });
      }
    }
  );
  app2.get(
    "/api/seo/dashboard",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, data: null });
        const profileId = profile[0].id;
        const latestScan = await db.select().from(seoScans).where(and14(eq25(seoScans.profileId, profileId), eq25(seoScans.status, "completed"))).orderBy(desc12(seoScans.createdAt)).limit(1);
        const issueCounts = await db.select({
          severity: seoTechnicalIssues.severity,
          count: sql10`count(*)::int`
        }).from(seoTechnicalIssues).where(and14(eq25(seoTechnicalIssues.profileId, profileId), eq25(seoTechnicalIssues.status, "open"))).groupBy(seoTechnicalIssues.severity);
        const keywordStats = await db.select({ count: sql10`count(*)::int` }).from(seoKeywords).where(and14(eq25(seoKeywords.profileId, profileId), eq25(seoKeywords.status, "tracking")));
        const pageStats = await db.select({ count: sql10`count(*)::int` }).from(seoPages).where(eq25(seoPages.profileId, profileId));
        const actionStats = await db.select({ count: sql10`count(*)::int` }).from(seoActionItems).where(and14(eq25(seoActionItems.profileId, profileId), eq25(seoActionItems.status, "pending")));
        const recentScans = await db.select().from(seoScans).where(eq25(seoScans.profileId, profileId)).orderBy(desc12(seoScans.createdAt)).limit(5);
        const issueMap = {};
        for (const ic of issueCounts) {
          issueMap[ic.severity || "unknown"] = ic.count;
        }
        res.json({
          success: true,
          data: {
            profile: profile[0],
            overallScore: latestScan[0]?.overallScore ?? null,
            performanceScore: latestScan[0]?.performanceScore ?? null,
            seoScore: latestScan[0]?.seoScore ?? null,
            accessibilityScore: latestScan[0]?.accessibilityScore ?? null,
            issues: {
              critical: issueMap.critical || 0,
              high: issueMap.high || 0,
              medium: issueMap.medium || 0,
              low: issueMap.low || 0,
              total: Object.values(issueMap).reduce((a, b) => a + b, 0)
            },
            keywordsTracked: keywordStats[0]?.count || 0,
            pagesAnalyzed: pageStats[0]?.count || 0,
            pendingActions: actionStats[0]?.count || 0,
            recentScans,
            lastScanDate: latestScan[0]?.createdAt || null
          }
        });
      } catch (error) {
        console.error("[Optimize] Dashboard error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
      }
    }
  );
  app2.get(
    "/api/seo/keywords",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, keywords: [] });
        const keywords = await db.select().from(seoKeywords).where(and14(eq25(seoKeywords.profileId, profile[0].id), eq25(seoKeywords.status, "tracking"))).orderBy(asc3(seoKeywords.keyword));
        res.json({ success: true, keywords });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch keywords" });
      }
    }
  );
  app2.post(
    "/api/seo/keywords",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });
        const { keywords } = req.body;
        const keywordList = Array.isArray(keywords) ? keywords : [keywords];
        const added = [];
        for (const kw of keywordList.slice(0, 20)) {
          if (!kw || typeof kw !== "string") continue;
          const [inserted] = await db.insert(seoKeywords).values({
            profileId: profile[0].id,
            keyword: kw.trim(),
            source: req.body.source || "manual"
          }).returning();
          added.push(inserted);
        }
        res.json({ success: true, keywords: added });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add keywords" });
      }
    }
  );
  app2.delete(
    "/api/seo/keywords/:id",
    requireAuth,
    async (req, res) => {
      try {
        await db.update(seoKeywords).set({ status: "removed" }).where(eq25(seoKeywords.id, parseInt(req.params.id)));
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete keyword" });
      }
    }
  );
  app2.get(
    "/api/seo/keywords/:id/history",
    requireAuth,
    async (req, res) => {
      try {
        const history = await db.select().from(seoKeywordRankings).where(eq25(seoKeywordRankings.keywordId, parseInt(req.params.id))).orderBy(desc12(seoKeywordRankings.date)).limit(90);
        res.json({ success: true, history });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch rank history" });
      }
    }
  );
  app2.post(
    "/api/seo/keywords/research",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });
        const { seeds } = req.body;
        const seedKeywords = seeds || profile[0].targetKeywords || [];
        const industry = profile[0].industry || "General";
        const suggestions = await researchKeywords(seedKeywords, industry, profile[0].location || void 0);
        res.json({ success: true, suggestions });
      } catch (error) {
        console.error("[Optimize] Keyword research error:", error);
        res.status(500).json({ success: false, message: "Failed to research keywords" });
      }
    }
  );
  app2.get(
    "/api/seo/pages",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, pages: [] });
        const pages = await db.select().from(seoPages).where(eq25(seoPages.profileId, profile[0].id)).orderBy(desc12(seoPages.lastAnalyzed));
        res.json({ success: true, pages });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch pages" });
      }
    }
  );
  app2.get(
    "/api/seo/pages/:id",
    requireAuth,
    async (req, res) => {
      try {
        const page = await db.select().from(seoPages).where(eq25(seoPages.id, parseInt(req.params.id))).limit(1);
        if (page.length === 0) return res.status(404).json({ success: false, message: "Page not found" });
        res.json({ success: true, page: page[0] });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch page" });
      }
    }
  );
  app2.post(
    "/api/seo/pages/analyze",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });
        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, message: "URL is required" });
        const pageData = await analyzePage(url);
        const score = calculatePageScore(pageData);
        const existing = await db.select().from(seoPages).where(and14(eq25(seoPages.profileId, profile[0].id), eq25(seoPages.url, url))).limit(1);
        let page;
        if (existing.length > 0) {
          [page] = await db.update(seoPages).set({
            title: pageData.title,
            metaDescription: pageData.metaDescription,
            h1: pageData.h1,
            wordCount: pageData.wordCount,
            score,
            issues: pageData,
            suggestions: generatePageSuggestions(pageData),
            lastAnalyzed: /* @__PURE__ */ new Date()
          }).where(eq25(seoPages.id, existing[0].id)).returning();
        } else {
          [page] = await db.insert(seoPages).values({
            profileId: profile[0].id,
            url,
            title: pageData.title,
            metaDescription: pageData.metaDescription,
            h1: pageData.h1,
            wordCount: pageData.wordCount,
            score,
            issues: pageData,
            suggestions: generatePageSuggestions(pageData),
            lastAnalyzed: /* @__PURE__ */ new Date()
          }).returning();
        }
        res.json({ success: true, page, analysis: pageData });
      } catch (error) {
        console.error("[Optimize] Page analyze error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze page" });
      }
    }
  );
  app2.get(
    "/api/seo/technical-issues",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, issues: [] });
        let query = db.select().from(seoTechnicalIssues).where(eq25(seoTechnicalIssues.profileId, profile[0].id)).orderBy(
          sql10`CASE ${seoTechnicalIssues.severity} WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 WHEN 'low' THEN 4 END`,
          desc12(seoTechnicalIssues.createdAt)
        );
        const issues = await query;
        res.json({ success: true, issues });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch technical issues" });
      }
    }
  );
  app2.patch(
    "/api/seo/technical-issues/:id",
    requireAuth,
    async (req, res) => {
      try {
        const { status } = req.body;
        const [updated] = await db.update(seoTechnicalIssues).set({ status }).where(eq25(seoTechnicalIssues.id, parseInt(req.params.id))).returning();
        res.json({ success: true, issue: updated });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update issue" });
      }
    }
  );
  app2.get(
    "/api/seo/content-briefs",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, briefs: [] });
        const briefs = await db.select().from(seoContentBriefs).where(eq25(seoContentBriefs.profileId, profile[0].id)).orderBy(desc12(seoContentBriefs.createdAt));
        res.json({ success: true, briefs });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch content briefs" });
      }
    }
  );
  app2.post(
    "/api/seo/content-briefs",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });
        const { targetKeyword } = req.body;
        if (!targetKeyword) return res.status(400).json({ success: false, message: "Target keyword is required" });
        const brief = await generateContentBrief(targetKeyword, profile[0].industry || void 0);
        const [saved] = await db.insert(seoContentBriefs).values({
          profileId: profile[0].id,
          targetKeyword,
          title: brief.title,
          outline: brief.outline,
          suggestions: brief.suggestions,
          wordCountTarget: brief.wordCountTarget
        }).returning();
        res.json({ success: true, brief: { ...saved, relatedKeywords: brief.relatedKeywords, searchIntent: brief.searchIntent } });
      } catch (error) {
        console.error("[Optimize] Content brief error:", error);
        res.status(500).json({ success: false, message: "Failed to generate content brief" });
      }
    }
  );
  app2.get(
    "/api/seo/action-items",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, items: [] });
        const items = await db.select().from(seoActionItems).where(eq25(seoActionItems.profileId, profile[0].id)).orderBy(
          sql10`CASE ${seoActionItems.priority} WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 WHEN 'low' THEN 4 END`,
          desc12(seoActionItems.createdAt)
        );
        res.json({ success: true, items });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch action items" });
      }
    }
  );
  app2.post(
    "/api/seo/action-items/generate",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const profile = await db.select().from(seoProfiles).where(eq25(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });
        const profileData = profile[0];
        const latestScan = await db.select().from(seoScans).where(and14(eq25(seoScans.profileId, profileData.id), eq25(seoScans.status, "completed"))).orderBy(desc12(seoScans.createdAt)).limit(1);
        const keywords = await db.select().from(seoKeywords).where(and14(eq25(seoKeywords.profileId, profileData.id), eq25(seoKeywords.status, "tracking")));
        const pages = await db.select().from(seoPages).where(eq25(seoPages.profileId, profileData.id));
        const issues = await db.select().from(seoTechnicalIssues).where(and14(eq25(seoTechnicalIssues.profileId, profileData.id), eq25(seoTechnicalIssues.status, "open")));
        const actionItems = await generateActionPlan({
          domain: profileData.domain,
          industry: profileData.industry || void 0,
          overallScore: latestScan[0]?.overallScore ?? void 0,
          technicalIssues: issues.map((i) => ({ type: i.type, severity: i.severity || "medium", description: i.description || "" })),
          keywords: keywords.map((k) => ({ keyword: k.keyword, currentRank: k.currentRank })),
          pages: pages.map((p) => ({ url: p.url, score: p.score, issues: p.issues })),
          localEnabled: profileData.localEnabled || false
        });
        const saved = [];
        for (const item of actionItems) {
          const [s] = await db.insert(seoActionItems).values({
            profileId: profileData.id,
            title: item.title,
            description: item.description,
            category: item.category,
            priority: item.priority,
            impact: item.impact,
            effort: item.effort
          }).returning();
          saved.push(s);
        }
        res.json({ success: true, items: saved });
      } catch (error) {
        console.error("[Optimize] Action plan error:", error);
        res.status(500).json({ success: false, message: "Failed to generate action plan" });
      }
    }
  );
  app2.patch(
    "/api/seo/action-items/:id",
    requireAuth,
    async (req, res) => {
      try {
        const { status } = req.body;
        const [updated] = await db.update(seoActionItems).set({ status }).where(eq25(seoActionItems.id, parseInt(req.params.id))).returning();
        res.json({ success: true, item: updated });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update action item" });
      }
    }
  );
  app2.get("/api/seo/backlinks", requireAuth, async (_req, res) => {
    res.json({ success: true, backlinks: [], message: "Backlink monitoring coming soon" });
  });
  app2.get("/api/seo/local", requireAuth, async (_req, res) => {
    res.json({ success: true, data: null, message: "Local SEO optimizer coming soon" });
  });
  app2.get("/api/seo/schema-markup", requireAuth, async (_req, res) => {
    res.json({ success: true, data: null, message: "Schema markup generator coming soon" });
  });
  app2.get("/api/seo/reports", requireAuth, async (_req, res) => {
    res.json({ success: true, reports: [], message: "Reporting & insights coming soon" });
  });
}
function calculatePageScore(pageData) {
  let score = 100;
  if (!pageData.title) score -= 20;
  else if (pageData.title.length > 60) score -= 5;
  else if (pageData.title.length < 30) score -= 5;
  if (!pageData.metaDescription) score -= 15;
  else if (pageData.metaDescription.length > 160) score -= 5;
  else if (pageData.metaDescription.length < 70) score -= 5;
  if (!pageData.h1) score -= 15;
  if (pageData.wordCount < 300) score -= 15;
  else if (pageData.wordCount < 600) score -= 5;
  if (!pageData.hasMobileViewport) score -= 10;
  if (!pageData.hasCanonical) score -= 5;
  if (!pageData.hasSchemaMarkup) score -= 5;
  if (pageData.images?.withoutAlt > 0) {
    score -= Math.min(10, pageData.images.withoutAlt * 2);
  }
  return Math.max(0, Math.min(100, score));
}
function generatePageSuggestions(pageData) {
  const suggestions = [];
  if (!pageData.title) suggestions.push("Add a title tag to this page");
  else if (pageData.title.length > 60) suggestions.push(`Shorten title tag from ${pageData.title.length} to under 60 characters`);
  if (!pageData.metaDescription) suggestions.push("Add a meta description (150-160 characters recommended)");
  else if (pageData.metaDescription.length > 160) suggestions.push("Shorten meta description to under 160 characters");
  if (!pageData.h1) suggestions.push("Add an H1 heading with your primary keyword");
  if (pageData.h2s?.length === 0) suggestions.push("Add H2 subheadings to improve content structure");
  if (pageData.wordCount < 300) suggestions.push("Add more content \u2014 aim for at least 600+ words");
  if (!pageData.hasSchemaMarkup) suggestions.push("Add structured data (JSON-LD) for better search results");
  if (!pageData.hasCanonical) suggestions.push("Add a canonical URL tag to prevent duplicate content");
  if (pageData.images?.withoutAlt > 0) {
    suggestions.push(`Add alt text to ${pageData.images.withoutAlt} image(s)`);
  }
  return suggestions;
}

// server/routes/subscriptions.ts
init_schema();

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
import { eq as eq26 } from "drizzle-orm";
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
    const allProducts = await db.select().from(products).where(eq26(products.isActive, true));
    for (const weakCat of weakCategories) {
      const matchingProducts = allProducts.filter(
        (product) => product.improvesCategory?.includes(weakCat.category)
      );
      for (const product of matchingProducts) {
        const improvement = this.calculateImprovement(product.productId, weakCat.category);
        const projectedScore = Math.min(100, weakCat.score + improvement);
        recommendations2.push({
          productId: product.productId,
          // Use string product ID from catalog
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
      currentScore: Math.round(rec.currentScore),
      projectedScore: Math.round(rec.projectedScore),
      scoreImprovement: Math.round(rec.scoreImprovement),
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
      "inbox": { engagement: 20, visibility: 10 },
      "send": { engagement: 25, visibility: 15 },
      "content": { engagement: 18, visibility: 12 },
      "livechat": { engagement: 20, visibility: 15 },
      "commverse": { engagement: 35, visibility: 25 },
      "listings": { visibility: 25, completeness: 20 },
      "reputation": { reviews: 30, engagement: 15 },
      "localblue": { visibility: 30, reviews: 25, completeness: 30 },
      "relationships": { engagement: 20, completeness: 15 },
      "hostsBlue": { completeness: 25, visibility: 15 },
      "swipesBlue": { engagement: 15 }
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
    }).from(assessmentProductRecommendations).innerJoin(products, eq26(assessmentProductRecommendations.productId, products.productId)).where(eq26(assessmentProductRecommendations.assessmentId, assessmentId));
    return recs;
  }
};
var productRecommendationService = new ProductRecommendationService();

// server/routes/subscriptions.ts
init_db();
import { eq as eq27 } from "drizzle-orm";
import { z as z8 } from "zod";
function calculateNextBillingDate(billingCycle) {
  const now = /* @__PURE__ */ new Date();
  switch (billingCycle) {
    case "quarterly":
      return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1e3);
    case "annual":
      return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1e3);
    default:
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1e3);
  }
}
function registerSubscriptionRoutes(app2, emailService) {
  app2.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await db.select().from(subscriptionPlans).where(eq27(subscriptionPlans.isActive, true));
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
      const addons = await db.select().from(subscriptionAddons).where(eq27(subscriptionAddons.isActive, true));
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
      const orderSchema = z8.object({
        items: z8.array(
          z8.object({
            id: z8.string(),
            name: z8.string(),
            price: z8.number(),
            quantity: z8.number(),
            type: z8.enum(["app", "addon"])
          })
        ),
        paymentToken: z8.string().min(16, "Valid payment token required"),
        customerInfo: z8.object({
          firstName: z8.string().min(1, "First name is required"),
          lastName: z8.string().min(1, "Last name is required"),
          email: z8.string().email("Valid email required"),
          phone: z8.string().optional(),
          address: z8.string().optional(),
          city: z8.string().optional(),
          state: z8.string().optional(),
          zip: z8.string().optional()
        }),
        totals: z8.object({
          subtotal: z8.number(),
          tax: z8.number(),
          total: z8.number()
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
      let client2 = await storage.getClientByEmail(customerInfo.email);
      if (!client2) {
        client2 = await storage.createClient({
          companyName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          accountStatus: "active"
        });
      }
      const featureCodeMap = {
        respond: "RS",
        livechat: "LC",
        send: "SE",
        post: "PO",
        list: "LI",
        review: "RE",
        "ai-coach": "AC"
      };
      const purchasedCodes = items.filter((item) => item.type === "app").map((item) => featureCodeMap[item.id]).filter(Boolean);
      const existingCodes = (client2.enabledFeatures || "").split(",").filter(Boolean);
      const allCodes = Array.from(
        /* @__PURE__ */ new Set([...existingCodes, ...purchasedCodes])
      );
      await storage.updateClient(client2.id, {
        enabledFeatures: allCodes.join(",")
      });
      console.log("Marketplace order successful:", {
        subscriptionId: nmiResult.subscription_id,
        clientId: client2.id,
        customerEmail: customerInfo.email,
        items: items.length,
        total: calculatedTotal
      });
      res.json({
        success: true,
        message: "Order processed successfully",
        subscriptionId: nmiResult.subscription_id,
        clientId: client2.id,
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
      const plan = await db.select().from(subscriptionPlans).where(eq27(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq27(subscriptionAddons.isActive, true));
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
      const [plan] = await db.select().from(subscriptionPlans).where(eq27(subscriptionPlans.planId, planStringId)).limit(1);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found for pathway"
        });
      }
      const { products: productsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { inArray: inArray4 } = await import("drizzle-orm");
      let selectedProducts = [];
      let productsTotal = 0;
      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable).where(inArray4(productsTable.id, productIds));
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
      const [plan] = await db.select().from(subscriptionPlans).where(eq27(subscriptionPlans.planId, planStringId)).limit(1);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const { products: productsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { inArray: inArray4 } = await import("drizzle-orm");
      let selectedProducts = [];
      let productsTotal = 0;
      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable).where(inArray4(productsTable.id, productIds));
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
          const product = selectedProducts.find(
            (p) => p.id === prod.id
          );
          return product?.name || "";
        });
        const productNames = await Promise.all(featuresPromises);
        const baseFeatures = Array.isArray(plan.features) ? plan.features : [];
        const allFeatures = [
          ...baseFeatures,
          ...productNames.filter(Boolean)
        ];
        await emailService.sendEnrollmentConfirmation(assessment.email, {
          businessName: assessment.businessName,
          pathway,
          planName,
          monthlyPrice: parseFloat(total.toFixed(2)),
          nextBillingDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1e3
          ),
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
      const [subscription] = await db.select().from(subscriptions).where(eq27(subscriptions.id, parseInt(id)));
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
      const subscriptionSchema = z8.object({
        planId: z8.string().min(1, "Plan ID is required"),
        addons: z8.array(
          z8.object({
            addonId: z8.string(),
            quantity: z8.number().optional()
          })
        ).default([]),
        billingCycle: z8.enum(["monthly", "quarterly", "annual"]),
        paymentToken: z8.string().min(16, "Valid payment token required"),
        customerInfo: z8.object({
          firstName: z8.string().min(1, "First name is required"),
          lastName: z8.string().min(1, "Last name is required"),
          email: z8.string().email("Valid email required"),
          phone: z8.string().optional(),
          address: z8.string().optional(),
          city: z8.string().optional(),
          state: z8.string().optional(),
          zip: z8.string().optional()
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
      const plan = await db.select().from(subscriptionPlans).where(eq27(subscriptionPlans.planId, planId)).limit(1);
      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }
      const addons = await db.select().from(subscriptionAddons).where(eq27(subscriptionAddons.isActive, true));
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
      };
      const nmiResult = await NMIService.createSubscription(nmiRequest);
      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Subscription creation failed"
        });
      }
      let client2 = await storage.getClientByEmail(customerInfo.email);
      if (!client2) {
        client2 = await storage.createClient({
          companyName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          address: [
            customerInfo.address,
            customerInfo.city,
            customerInfo.state,
            customerInfo.zip
          ].filter(Boolean).join(", ") || null,
          accountStatus: "active"
        });
      }
      const coreFeatures = "RS,LC,SE,PO,LI,RE";
      const hasAiCoach = selectedAddons.some(
        (addon) => addons.find((a) => a.addonId === addon.addonId)?.category === "coaching"
      );
      const enabledFeatures = hasAiCoach ? `${coreFeatures},AC` : coreFeatures;
      await storage.updateClient(client2.id, { enabledFeatures });
      const subscriptionData = {
        nmiSubscriptionId: nmiResult.subscription_id,
        clientId: client2.id,
        planId: plan[0].id,
        status: isTrialEligible ? "trial" : "active",
        baseAmount: pricing.basePrice.toFixed(2),
        addonAmount: pricing.totalAddons.toFixed(2),
        totalAmount: pricing.recurringTotal.toFixed(2),
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
      for (const addon of selectedAddons) {
        const addonRecord = addons.find((a) => a.addonId === addon.addonId);
        if (addonRecord) {
          const price = addonRecord.price ? String(addonRecord.price) : "0.00";
          await db.insert(subscriptionAddonSelections).values({
            subscriptionId: newSubscription.id,
            addonId: addonRecord.id,
            unitPrice: price,
            totalPrice: price
          });
        }
      }
      res.json({
        success: true,
        subscription: newSubscription,
        nmiSubscriptionId: nmiResult.subscription_id,
        clientId: client2.id,
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
  app2.get(
    "/api/assessments/:id/product-recommendations",
    async (req, res) => {
      try {
        const assessmentId = parseInt(req.params.id);
        const recs = await productRecommendationService.getRecommendations(assessmentId);
        const recommendations2 = recs.map((rec) => ({
          productId: rec.product.productId,
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
    }
  );
  app2.get("/api/products", async (req, res) => {
    try {
      const deliveryMethod = req.query.deliveryMethod;
      const category = req.query.category;
      const { products: products2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq36, and: and23 } = await import("drizzle-orm");
      const conditions = [eq36(products2.isActive, true)];
      if (category) {
        conditions.push(eq36(products2.category, category));
      }
      const allProducts = await db.select().from(products2).where(and23(...conditions));
      const filteredProducts = deliveryMethod ? allProducts.filter(
        (p) => p.deliveryMethod?.includes(deliveryMethod)
      ) : allProducts;
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
      const { eq: eq36 } = await import("drizzle-orm");
      const [product] = await db.select().from(products2).where(eq36(products2.id, productId));
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
init_ai_provider();
init_ai_settings();
var OpenAIAnalysisService = class {
  async analyzeBusinessPresence(input) {
    try {
      const provider = await aiSettingsService.getProvider("assessment");
      console.log(`[Business Analysis] Using ${provider} for assessment analysis`);
      const prompt = this.buildAnalysisPrompt(input);
      const response = await unifiedAI.getCompletion(provider, {
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
        responseFormat: "json",
        temperature: 0.2,
        maxTokens: 3e3
      });
      console.log(`[Business Analysis] ${provider} analysis complete. Tokens used: ${response.tokensUsed}`);
      let result;
      try {
        result = JSON.parse(response.content || "{}");
      } catch (parseError) {
        console.warn("[Business Analysis] JSON parse failed, attempting repair");
        const cleanedContent = this.repairJSON(response.content || "{}");
        try {
          result = JSON.parse(cleanedContent);
        } catch (retryError) {
          console.error("[Business Analysis] JSON repair failed, using fallback");
          result = this.createFallbackResult(input.businessInfo.name, input.presenceScore.overallScore);
        }
      }
      return this.validateAndFormatResult(result, input.presenceScore.overallScore);
    } catch (error) {
      console.error("Error analyzing business presence:", error);
      return this.createFallbackResult(input.businessInfo.name, input.presenceScore.overallScore);
    }
  }
  buildAnalysisPrompt(input) {
    const productCatalog = this.buildProductCatalogContext();
    const operationalContext = this.buildOperationalContext(input.operationalData);
    const scansBlueContext = this.buildScansBlueContext(input.scansBlueData);
    return `
You are a digital marketing expert for BusinessBlueprint.io. Your job is to analyze this business's digital presence and recommend OUR PRODUCTS to solve their problems.

CRITICAL RULES:
1. Every recommendation MUST include a specific BusinessBlueprint product
2. NEVER recommend external tools/competitors - only OUR products (see catalog below)
3. Lead with the NEED, explain WHY it matters, then recommend OUR solution
4. Highlight bundle savings when multiple products from same bundle are recommended
5. Be specific and actionable - no generic advice

${productCatalog}

BUSINESS INFORMATION:
- Name: ${input.businessInfo.name}
- Industry: ${input.businessInfo.industry}
- Location: ${input.businessInfo.location}
- Website: ${input.businessInfo.website || "None"}

DIGITAL IQ SCORES:
- Combined Digital IQ: ${input.presenceScore.overallScore}/140
- Scan Score: ${input.presenceScore.scanScore || "N/A"}/70
- Operational Score: ${input.presenceScore.operationalScore || "N/A"}/70
- Visibility Score: ${input.presenceScore.scores.visibility}/100
- Reviews Score: ${input.presenceScore.scores.reviews}/100
- Completeness Score: ${input.presenceScore.scores.completeness}/100
- Engagement Score: ${input.presenceScore.scores.engagement}/100

AUTOMATED SCAN INSIGHTS:
${input.presenceScore.insights.join("\n")}

${operationalContext}

${scansBlueContext}

GOOGLE BUSINESS DATA:
${JSON.stringify(input.googleData, null, 2)}

Generate 12-18 PRODUCT-FOCUSED recommendations across these 9 areas:
1. Email & SMS Marketing \u2192 Recommend: Send OR CommVerse Bundle (if multiple comm needs)
2. Social Media Content \u2192 Recommend: Content OR CommVerse Bundle (if multiple comm needs)
3. Reputation Management \u2192 Recommend: Reputation OR LocalBlue Bundle (if also needs Listings)
4. Customer Response & Timing \u2192 Recommend: Inbox OR CommVerse Bundle (if multiple comm needs)
5. Live Chat \u2192 Recommend: LiveChat OR CommVerse Bundle (if multiple comm needs)
6. Business Listings \u2192 Recommend: Listings OR LocalBlue Bundle (if also needs Reputation)
7. Google Business Profile \u2192 Recommend: LocalBlue Bundle
8. Website & SEO \u2192 Recommend: hostsblue (HostsBlue.com)
9. CRM Systems \u2192 Recommend: Relationships

\u2605 BUNDLE RULE: ONLY recommend CommVerse Bundle (productId: "commverse") if business needs ALL 4 communication tools.
\u2605 BUNDLE RULE: ONLY recommend LocalBlue Bundle (productId: "localblue") if business needs BOTH Listings AND Reputation.

RESPOND WITH VALID JSON:
{
  "digitalScore": number (0-140),
  "summary": string (2-3 sentences emphasizing transformation potential),
  "strengths": [array of current strengths - be specific],
  "weaknesses": [array of gaps - tie each to a product that fixes it],
  "areaScores": {
    "emailSms": number (0-15),
    "socialMedia": number (0-13),
    "reputation": number (0-16),
    "customerResponse": number (0-15),
    "liveChat": number (0-15),
    "listings": number (0-18),
    "gbp": number (0-16),
    "websiteSeo": number (0-20),
    "crm": number (0-12)
  },
  "recommendations": [
    {
      "category": "Email & SMS Marketing" | "Social Media Content" | "Reputation Management" | "Customer Response & Timing" | "Live Chat" | "Business Listings" | "Google Business Profile" | "Website & SEO" | "CRM Systems",
      "title": "The Prescription: [specific need statement]",
      "description": "Detailed explanation of WHY this matters (revenue impact, customer experience, competitive advantage) and HOW our product solves it",
      "priority": "high" | "medium" | "low",
      "estimatedImpact": "High ROI" | "Medium ROI" | "Long-term benefit",
      "estimatedEffort": "Quick setup" | "1-2 days" | "1-2 weeks" | "Ongoing",
      "productId": "commverse" | "localblue" | "send" | "inbox" | "content" | "livechat" | "listings" | "reputation" | "relationships" | "hostsBlue" | "swipesBlue",
      "bundleId": "commverse" | "localblue" | null,
      "productBenefits": ["benefit 1", "benefit 2", "benefit 3"],
      "bundleAdvantage": "Save with CommVerse bundle..." or null
    }
  ],
  "competitorInsights": [array of industry-specific competitive insights],
  "nextSteps": ["Start with [product] because...", "Then add [product] to..."]
}
`;
  }
  buildProductCatalogContext() {
    return `
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
\u26A0\uFE0F CRITICAL: AUTHORIZED PRODUCTS WHITELIST - NO EXCEPTIONS \u26A0\uFE0F
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

You may ONLY recommend products with these EXACT productId values:

\u2605\u2605\u2605 BUNDLES (PRIORITIZE THESE - BEST VALUE) \u2605\u2605\u2605
| productId   | Display Name      | Price   | Includes                              | Savings        |
|-------------|-------------------|---------|---------------------------------------|----------------|
| commverse   | CommVerse Bundle  | $99/mo  | Inbox + Send + Content + LiveChat     | Save $37/month |
| localblue   | LocalBlue Bundle  | $59/mo  | Listings + Reputation                 | Save $19/month |

COMMUNICATION TOOLS (Individual apps - recommend CommVerse Bundle instead when 2+ needed):
| productId   | Display Name | Price    | Use For                              |
|-------------|--------------|----------|--------------------------------------|
| inbox       | Inbox        | $34/mo   | Unified inbox, message consolidation |
| send        | Send         | $34/mo   | Email & SMS marketing                |
| content     | Content      | $34/mo   | Social media scheduling & creation   |
| livechat    | LiveChat     | $34/mo   | Website chat widget, lead capture    |

LOCAL PRESENCE TOOLS (Individual apps - recommend LocalBlue Bundle instead when both needed):
| productId   | Display Name | Price    | Use For                              |
|-------------|--------------|----------|--------------------------------------|
| listings    | Listings     | $39/mo   | Directory sync, NAP consistency      |
| reputation  | Reputation   | $39/mo   | Review monitoring & response         |

BUSINESS OPERATIONS:
| productId      | Display Name      | Price    | Use For                    |
|----------------|-------------------|----------|----------------------------|
| relationships  | Relationships CRM | $29/mo   | Customer tracking, pipeline |

PARTNER SERVICES:
| productId     | Display Name   | Price     | Use For                        |
|---------------|----------------|-----------|--------------------------------|
| hostsblue     | HostsBlue.com  | Varies    | Web hosting, domains, SSL      |
| swipesblue    | SwipesBlue.com | 2.9%+30\xA2  | Payment processing             |

\u2605\u2605\u2605 BUNDLE RECOMMENDATION RULES \u2605\u2605\u2605
- ONLY recommend "commverse" (CommVerse Bundle) if business needs ALL 4 communication tools (Inbox, Send, Content, LiveChat)
- ONLY recommend "localblue" (LocalBlue Bundle) if business needs BOTH Listings AND Reputation
- If only 1-3 communication tools needed, recommend individual apps instead
- Bundles ARE products - use productId "commverse" or "localblue" directly
- Always mention bundle savings in description when recommending bundles

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
\u{1F6AB} FORBIDDEN - DO NOT DO ANY OF THESE:
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
- DO NOT invent products that don't exist in the table above
- DO NOT use product names like "Store Locator", "Captaining Journey", etc.
- DO NOT recommend competitors (Mailchimp, HubSpot, etc.)
- DO NOT create generic/fake productIds
- DO NOT recommend products without a valid productId from the table above

EVERY recommendation MUST have a productId from the whitelist above.
If you can't find a matching product, DO NOT create a fake one.
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
`;
  }
  buildOperationalContext(data) {
    if (!data) return "OPERATIONAL DATA: Not provided";
    const sections = [];
    if (data.collectsEmails || data.lastEmailCampaign || data.emailListSize || data.sendsSMS) {
      sections.push(`EMAIL & SMS:
  - Collects emails: ${data.collectsEmails || "Unknown"}
  - Last email campaign: ${data.lastEmailCampaign || "Unknown"}
  - Email list size: ${data.emailListSize || "Unknown"}
  - Uses SMS: ${data.sendsSMS || "Unknown"}
  - Last SMS: ${data.lastSMSCampaign || "Unknown"}`);
    }
    if (data.lastSocialPost || data.socialPostFrequency || data.socialContentCreator) {
      sections.push(`SOCIAL MEDIA:
  - Last post: ${data.lastSocialPost || "Unknown"}
  - Posting frequency: ${data.socialPostFrequency || "Unknown"}
  - Content creator: ${data.socialContentCreator || "Unknown"}`);
    }
    if (data.lastReviewResponse || data.reviewResponseRate || data.lastNewReview) {
      sections.push(`REPUTATION:
  - Last review response: ${data.lastReviewResponse || "Unknown"}
  - Response rate: ${data.reviewResponseRate || "Unknown"}
  - Last new review: ${data.lastNewReview || "Unknown"}`);
    }
    if (data.inquiryResponseTime || data.hasUnifiedInbox || data.missedInquiries) {
      sections.push(`CUSTOMER RESPONSE:
  - Response time: ${data.inquiryResponseTime || "Unknown"}
  - Has unified inbox: ${data.hasUnifiedInbox || "Unknown"}
  - Missed inquiries: ${data.missedInquiries || "Unknown"}`);
    }
    if (data.hasLiveChat || data.lastChatConversation || data.chatResponseTime) {
      sections.push(`LIVE CHAT:
  - Has live chat: ${data.hasLiveChat || "Unknown"}
  - Last conversation: ${data.lastChatConversation || "Unknown"}
  - Response time: ${data.chatResponseTime || "Unknown"}`);
    }
    if (data.lastListingUpdate || data.listingConsistency) {
      sections.push(`LISTINGS:
  - Last update: ${data.lastListingUpdate || "Unknown"}
  - Consistency: ${data.listingConsistency || "Unknown"}`);
    }
    if (data.lastGBPPost || data.lastGBPPhoto) {
      sections.push(`GOOGLE BUSINESS PROFILE:
  - Last post: ${data.lastGBPPost || "Unknown"}
  - Last photo: ${data.lastGBPPhoto || "Unknown"}`);
    }
    if (data.lastWebsiteUpdate || data.hasBlog) {
      sections.push(`WEBSITE:
  - Last update: ${data.lastWebsiteUpdate || "Unknown"}
  - Has blog: ${data.hasBlog || "Unknown"}`);
    }
    if (data.usesCRM || data.crmPlatform || data.lastCRMFollowup || data.hasAutomation) {
      sections.push(`CRM:
  - Uses CRM: ${data.usesCRM || "Unknown"}
  - Platform: ${data.crmPlatform || "Unknown"}
  - Last followup: ${data.lastCRMFollowup || "Unknown"}
  - Has automation: ${data.hasAutomation || "Unknown"}`);
    }
    return sections.length > 0 ? `OPERATIONAL ASSESSMENT DATA:
${sections.join("\n\n")}` : "OPERATIONAL DATA: Minimal data provided";
  }
  buildScansBlueContext(data) {
    if (!data) return "TECHNICAL WEBSITE ANALYSIS: Not available";
    const issues = data.criticalIssues || [];
    const criticalCount = issues.filter((i) => i.severity === "critical").length;
    const highCount = issues.filter((i) => i.severity === "high").length;
    return `TECHNICAL WEBSITE ANALYSIS (from ScansBlue):
- Overall Technical Score: ${data.overallScore || "N/A"}/100
- SSL Certificate: ${data.sslPresent ? data.sslValid ? "Valid" : "Present but Invalid" : "MISSING"}
- Load Time: ${data.loadTime || "N/A"}s (target: <2s)
- Performance Score: ${data.performanceScore || "N/A"}/100
- Mobile Optimized: ${data.mobileOptimized ? "Yes" : "No"} (score: ${data.mobileScore || "N/A"}/100)
- Critical Issues: ${criticalCount}
- High Priority Issues: ${highCount}

${issues.length > 0 ? `TOP ISSUES DETECTED:
${issues.slice(0, 5).map((i) => `- [${i.severity.toUpperCase()}] ${i.issue}: ${i.impact}`).join("\n")}` : "No critical issues detected"}

When recommending Website & SEO improvements:
1. Reference these SPECIFIC technical issues
2. Recommend HostsBlue.com to fix infrastructure issues (hosting, SSL, performance)
3. Then recommend LiveChat to capture leads from improved site`;
  }
  repairJSON(content) {
    let cleaned = content.replace(/[\x00-\x1F\x7F]/g, " ").replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
    const openBraces = (cleaned.match(/{/g) || []).length;
    const closeBraces = (cleaned.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      cleaned += "}".repeat(openBraces - closeBraces);
    }
    const openBrackets = (cleaned.match(/\[/g) || []).length;
    const closeBrackets = (cleaned.match(/]/g) || []).length;
    if (openBrackets > closeBrackets) {
      cleaned += "]".repeat(openBrackets - closeBrackets);
    }
    return cleaned;
  }
  createFallbackResult(businessName, score) {
    return {
      digitalScore: score,
      summary: `${businessName} has opportunities to strengthen their digital presence with our BusinessBlueprint suite of tools.`,
      strengths: ["Business is taking steps to improve digital presence"],
      weaknesses: ["Needs comprehensive digital strategy"],
      recommendations: [
        {
          category: "Email & SMS Marketing",
          title: "Start Building Your Customer Database",
          description: "Use Send to collect emails and SMS subscribers for direct marketing.",
          priority: "high",
          productId: "send",
          bundleId: "commverse"
        },
        {
          category: "Reputation Management",
          title: "Improve Online Reviews",
          description: "Use Reputation to monitor and respond to customer reviews.",
          priority: "high",
          productId: "reputation",
          bundleId: "localblue"
        },
        {
          category: "Business Listings",
          title: "Sync Business Information",
          description: "Use Listings to ensure consistent NAP across directories.",
          priority: "medium",
          productId: "listings",
          bundleId: "localblue"
        }
      ],
      competitorInsights: [],
      nextSteps: ["Complete your BusinessBlueprint assessment", "Review product recommendations"]
    };
  }
  validateAndFormatResult(result, baseScore) {
    const rawRecommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
    const validatedRecommendations = [];
    const rejectedCount = { count: 0, products: [] };
    for (const rec of rawRecommendations) {
      const validated = this.validateRecommendation(rec, rejectedCount);
      if (validated !== null) {
        validatedRecommendations.push(validated);
      }
    }
    console.log(`[Product Validation] ${validatedRecommendations.length}/${rawRecommendations.length} recommendations passed validation`);
    if (rejectedCount.count > 0) {
      console.warn(`[PRODUCT VALIDATION SUMMARY] ${rejectedCount.count} invalid products filtered out: ${rejectedCount.products.join(", ")}`);
    }
    if (validatedRecommendations.length === 0 && rawRecommendations.length > 0) {
      console.warn("[PRODUCT VALIDATION] All AI recommendations had invalid products - using fallback recommendations");
      validatedRecommendations.push(
        {
          category: "Email & SMS Marketing",
          title: "Build Your Email List",
          description: "Start collecting customer emails to build relationships and drive repeat business.",
          priority: "high",
          estimatedImpact: "High ROI",
          estimatedEffort: "1-2 weeks",
          productId: "send",
          productBenefits: ["Automated campaigns", "Customer retention", "Revenue growth"]
        },
        {
          category: "Social Media Content",
          title: "Consistent Content Creation",
          description: "Post regularly on social media to stay top of mind with your audience.",
          priority: "medium",
          estimatedImpact: "Medium ROI",
          estimatedEffort: "2-4 weeks",
          productId: "content",
          productBenefits: ["Brand awareness", "Engagement", "Lead generation"]
        },
        {
          category: "Reputation Management",
          title: "Monitor and Respond to Reviews",
          description: "Build trust by responding to customer reviews promptly.",
          priority: "medium",
          estimatedImpact: "High trust-building",
          estimatedEffort: "1 week",
          productId: "reputation",
          bundleId: "localblue",
          productBenefits: ["Customer trust", "SEO benefits", "Insight gathering"]
        }
      );
    }
    return {
      digitalScore: result.digitalScore || baseScore,
      summary: result.summary || "Your business has significant potential for digital growth with our BusinessBlueprint tools.",
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
      recommendations: validatedRecommendations,
      competitorInsights: Array.isArray(result.competitorInsights) ? result.competitorInsights : [],
      nextSteps: Array.isArray(result.nextSteps) ? result.nextSteps : [],
      areaScores: result.areaScores || void 0
    };
  }
  validateRecommendation(rec, rejectedCount) {
    const VALID_PRODUCT_IDS = [
      "inbox",
      "send",
      "content",
      "livechat",
      "commverse",
      "listings",
      "reputation",
      "localblue",
      "relationships",
      "hostsblue",
      "swipesblue"
      // Lowercase for consistent matching
    ];
    const VALID_BUNDLE_IDS = ["commverse", "localblue"];
    const VALID_CATEGORIES = [
      "Email & SMS Marketing",
      "Social Media Content",
      "Reputation Management",
      "Customer Response & Timing",
      "Live Chat",
      "Business Listings",
      "Google Business Profile",
      "Website & SEO",
      "CRM Systems"
    ];
    const rawProductId = rec.productId;
    const productId = rawProductId?.toLowerCase?.() || rawProductId;
    if (!productId || !VALID_PRODUCT_IDS.includes(productId)) {
      console.warn(`[PRODUCT VALIDATION] Invalid product: "${rawProductId}" - filtering out recommendation`);
      if (rejectedCount) {
        rejectedCount.count++;
        rejectedCount.products.push(rawProductId || "undefined");
      }
      return null;
    }
    const rawBundleId = rec.bundleId;
    const bundleId = rawBundleId?.toLowerCase?.() || rawBundleId;
    if (rawBundleId && !VALID_BUNDLE_IDS.includes(bundleId)) {
      console.warn(`[BUNDLE VALIDATION] Invalid bundleId "${rawBundleId}" stripped from recommendation`);
    }
    return {
      category: VALID_CATEGORIES.includes(rec.category) ? rec.category : "general",
      title: rec.title || "Improve Digital Presence",
      description: rec.description || "Work on improving your online visibility with our tools",
      priority: ["high", "medium", "low"].includes(rec.priority) ? rec.priority : "medium",
      estimatedImpact: rec.estimatedImpact || "Medium ROI",
      estimatedEffort: rec.estimatedEffort || "1-2 weeks",
      productId,
      bundleId: VALID_BUNDLE_IDS.includes(bundleId) ? bundleId : void 0,
      productBenefits: Array.isArray(rec.productBenefits) ? rec.productBenefits : [],
      bundleAdvantage: rec.bundleAdvantage || void 0
    };
  }
};

// server/services/resend-email.ts
import { Resend as Resend2 } from "resend";
var connectionSettings2;
async function getResendCredentials2() {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    if (!hostname) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
      }
      console.warn("[Email Service] No Resend connector or RESEND_API_KEY configured");
      return null;
    }
    const xReplitToken = process.env.REPL_IDENTITY ? "repl " + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? "depl " + process.env.WEB_REPL_RENEWAL : null;
    if (!xReplitToken) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
      }
      console.warn("[Email Service] No Replit token found for connector");
      return null;
    }
    connectionSettings2 = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
      {
        headers: {
          "Accept": "application/json",
          "X_REPLIT_TOKEN": xReplitToken
        }
      }
    ).then((res) => res.json()).then((data) => data.items?.[0]);
    if (!connectionSettings2 || !connectionSettings2.settings?.api_key) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        console.log("[Email Service] Using RESEND_API_KEY from environment");
        return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
      }
      console.warn("[Email Service] Resend connector not configured");
      return null;
    }
    console.log("[Email Service] Using Resend connector credentials");
    return {
      apiKey: connectionSettings2.settings.api_key,
      fromEmail: connectionSettings2.settings.from_email || "noreply@businessblueprint.io"
    };
  } catch (error) {
    console.error("[Email Service] Error fetching Resend credentials:", error);
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
    }
    return null;
  }
}
async function getResendClient() {
  const credentials = await getResendCredentials2();
  if (!credentials) {
    return null;
  }
  return {
    client: new Resend2(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}
var ResendEmailService = class {
  async sendVerificationEmail(email, companyName, verificationCode) {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.warn("[Email Service] Resend not configured");
        return false;
      }
      const htmlContent = this.generateVerificationEmailHTML(companyName, verificationCode);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateEmailChangeNotificationHTML(companyName, newEmail);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
    console.log(`[ResendEmailService] sendAssessmentReport called for ${email}`);
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.error("[ResendEmailService] sendAssessmentReport FAILED - Resend client not available");
        return false;
      }
      console.log(`[ResendEmailService] Generating Digital IQ Report HTML...`);
      const htmlContent = this.generateReportHTML(data);
      console.log(`[ResendEmailService] Sending Digital IQ Report to ${email}...`);
      const result = await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Your Digital IQ Results: Here's Your Growth Blueprint`,
        html: htmlContent
      });
      console.log(`[ResendEmailService] Digital IQ Report SENT to ${email}, Resend ID: ${result.data?.id || "unknown"}`);
      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error sending assessment report:", error);
      return false;
    }
  }
  async sendReviewAlert(email, data) {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateReviewAlertHTML(data);
      const sentiment = data.rating <= 2 ? "Negative" : data.rating >= 4 ? "Positive" : "Neutral";
      const urgency = data.rating <= 2 ? "\u26A0\uFE0F URGENT" : "";
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateEnrollmentConfirmationHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generatePathwayReminderHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateCheckoutAbandonmentHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateMagicLinkHTML(magicLink, companyName);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
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
    console.log(`[ResendEmailService] sendThankYouIntroduction called for ${email}`);
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.error("[ResendEmailService] sendThankYouIntroduction FAILED - Resend client not available");
        return false;
      }
      console.log(`[ResendEmailService] Generating Coach Blue HTML...`);
      const htmlContent = this.generateThankYouIntroductionHTML(data);
      console.log(`[ResendEmailService] Sending Coach Blue email to ${email}...`);
      const result = await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Meet Coach Blue \u{1F916} - Your AI Guide to Digital Success`,
        html: htmlContent
      });
      console.log(`[ResendEmailService] Coach Blue email SENT to ${email}, Resend ID: ${result.data?.id || "unknown"}`);
      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error sending Coach Blue email:", error);
      return false;
    }
  }
  async sendScansBlueFullReport(email, data) {
    console.log(`[ResendEmailService] sendScansBlueFullReport called for ${email}`);
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.error("[ResendEmailService] sendScansBlueFullReport FAILED - Resend client not available");
        return false;
      }
      console.log(`[ResendEmailService] Generating Full Report HTML...`);
      const htmlContent = this.generateScansBlueFullReportHTML(data);
      console.log(`[ResendEmailService] Sending Full Report email to ${email}...`);
      const result = await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Your ScansBlue Full Report is Ready - ${data.businessName}`,
        html: htmlContent
      });
      console.log(`[ResendEmailService] Full Report email SENT to ${email}, Resend ID: ${result.data?.id || "unknown"}`);
      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error sending Full Report email:", error);
      return false;
    }
  }
  generateScansBlueFullReportHTML(data) {
    const baseUrl = process.env.FRONTEND_URL || "https://businessblueprint.io";
    const dashboardUrl = `${baseUrl}/dashboard/${data.assessmentId}`;
    const report = data.reportData || {};
    const overallScore = report.overallScore || 65;
    const securityScore = report.securityScore || 70;
    const performanceScore = report.performanceScore || 60;
    const seoScore = report.seoScore || 55;
    const mobileScore = report.mobileScore || 75;
    const getScoreColor = (score) => {
      if (score >= 80) return "#10B981";
      if (score >= 60) return "#F59E0B";
      return "#EF4444";
    };
    const issues = report.issues || [];
    const recommendations2 = report.recommendations || [];
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ScansBlue Full Report - ${data.businessName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Archivo', Arial, sans-serif; line-height: 1.6; color: #09080E; background-color: #f5f5f5; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #EEFBFF;">
    <!-- Header -->
    <div style="background: linear-gradient(315deg, #EEFBFF 0%, #6EA6FF 50%, #0000FF 100%); padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">ScansBlue</h1>
      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Full Website Analysis Report</p>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 30px 25px; background: white;">
      <p style="font-size: 16px; margin-bottom: 20px;">
        Great news, <strong>${data.businessName}</strong>! Your comprehensive website analysis is complete.
      </p>
      
      <div style="text-align: center; padding: 20px; background: #f9fafb; border-radius: 12px; margin-bottom: 25px;">
        <p style="margin: 0 0 5px; color: #6B7280; font-size: 14px;">Website Analyzed</p>
        <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0000FF; word-break: break-all;">${data.websiteUrl}</p>
      </div>
      
      <!-- Overall Score -->
      <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #0000FF08, #0000FF15); border-radius: 12px; margin-bottom: 25px; border: 2px solid #0000FF20;">
        <p style="margin: 0 0 10px; color: #6B7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Overall Score</p>
        <div style="font-size: 64px; font-weight: 700; color: ${getScoreColor(overallScore)}; line-height: 1;">${overallScore}</div>
        <p style="margin: 5px 0 0; color: #6B7280; font-size: 14px;">out of 100</p>
      </div>
      
      <!-- Category Scores -->
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 15px; color: #09080E;">Category Breakdown</h2>
      <div style="display: grid; gap: 10px; margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">\u{1F512} Security</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(securityScore)};">${securityScore}/100</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">\u26A1 Performance</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(performanceScore)};">${performanceScore}/100</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">\u{1F50D} SEO</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(seoScore)};">${seoScore}/100</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">\u{1F4F1} Mobile</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(mobileScore)};">${mobileScore}/100</span>
        </div>
      </div>
      
      ${issues.length > 0 ? `
      <!-- Critical Issues -->
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 15px; color: #09080E;">\u26A0\uFE0F Issues Found</h2>
      <div style="margin-bottom: 25px;">
        ${issues.slice(0, 5).map((issue) => `
        <div style="padding: 12px 15px; background: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 0 8px 8px 0; margin-bottom: 10px;">
          <p style="margin: 0; font-weight: 600; color: #B91C1C;">${issue.title || issue}</p>
          ${issue.description ? `<p style="margin: 5px 0 0; font-size: 14px; color: #6B7280;">${issue.description}</p>` : ""}
        </div>
        `).join("")}
      </div>
      ` : ""}
      
      ${recommendations2.length > 0 ? `
      <!-- Recommendations -->
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 15px; color: #09080E;">\u{1F4A1} Top Recommendations</h2>
      <div style="margin-bottom: 25px;">
        ${recommendations2.slice(0, 5).map((rec, index2) => `
        <div style="padding: 12px 15px; background: #F0FDF4; border-left: 4px solid #10B981; border-radius: 0 8px 8px 0; margin-bottom: 10px;">
          <p style="margin: 0; font-weight: 600; color: #047857;">${index2 + 1}. ${rec.title || rec}</p>
          ${rec.impact ? `<p style="margin: 5px 0 0; font-size: 14px; color: #6B7280;">Impact: ${rec.impact}</p>` : ""}
        </div>
        `).join("")}
      </div>
      ` : ""}
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${dashboardUrl}" style="display: inline-block; background: #0000FF; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
          View Full Dashboard
        </a>
      </div>
      
      <p style="color: #6B7280; font-size: 14px; text-align: center;">
        Need help implementing these recommendations? Our team is here to help.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f2f4f6; padding: 25px; text-align: center;">
      <p style="margin: 0 0 10px; color: #6B7280; font-size: 14px;">
        Powered by <strong>BusinessBlueprint.io</strong>
      </p>
      <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} TriadBlue \u2022 All rights reserved
      </p>
    </div>
  </div>
</body>
</html>
`;
  }
  generateReportHTML(data) {
    const highPriorityRecs = data.recommendations.filter((r) => r.priority === "high").slice(0, 3);
    const baseUrl = process.env.FRONTEND_URL || "https://businessblueprint.io";
    const getProductIcon = (productId) => {
      const iconMap = {
        "send": "send.png",
        "inbox": "inbox.png",
        "content": "content.png",
        "livechat": "livechat.png",
        "reputation": "reputation.png",
        "listings": "listings.png",
        "localblue": "localblue.png",
        "commverse": "commverse.png"
      };
      return productId ? `${baseUrl}/${iconMap[productId] || "send.png"}` : `${baseUrl}/send.png`;
    };
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Digital IQ Assessment Results</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', sans-serif;
      line-height: 1.6;
      color: #09080E;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #EEFBFF;
    }
    .email-outline {
      border: 2px solid #09080E;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .header h1 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 700;
      font-size: 32px;
      margin: 0 0 10px 0;
      color: #09080E;
    }
    .header .score {
      font-size: 48px;
      font-weight: 700;
      color: #F97316;
      margin: 20px 0 10px 0;
    }
    .header .score-label {
      font-size: 16px;
      color: #09080E;
      opacity: 0.9;
    }
    .content {
      background: #EEFBFF;
      padding: 40px 30px;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #EEFBFF;
    }
    .content p {
      font-size: 16px;
      color: #09080E;
      margin: 16px 0;
    }
    .content h2 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 700;
      font-size: 24px;
      color: #0000FF;
      margin: 30px 0 15px 0;
    }
    .content h3 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: #09080E;
      margin: 20px 0 10px 0;
    }
    .summary-box {
      background: #ffffff;
      border-left: 4px solid #F97316;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .recommendation {
      background: #ffffff;
      border: 2px solid #0000FF;
      border-radius: 8px;
      padding: 25px;
      margin: 25px 0;
    }
    .recommendation-header {
      margin-bottom: 15px;
    }
    .recommendation-header img {
      width: 48px;
      height: 48px;
      vertical-align: middle;
      margin-right: 15px;
    }
    .recommendation-header h3 {
      display: inline;
      vertical-align: middle;
      margin: 0;
      color: #0000FF;
      font-size: 20px;
    }
    .product-name {
      color: #F97316;
      font-weight: 700;
      font-size: 18px;
    }
    .recommendation ul {
      margin: 15px 0;
      padding-left: 20px;
    }
    .recommendation li {
      margin: 8px 0;
      color: #09080E;
    }
    .bundle-callout {
      background: #ffffff;
      border: 2px solid #0000FF;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .bundle-item {
      margin: 15px 0;
    }
    .bundle-item img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 12px;
    }
    .bundle-item p {
      display: inline;
      margin: 0;
      font-size: 15px;
      vertical-align: middle;
    }
    .bundle-callout strong {
      color: #0000FF;
    }
    .cta-button {
      display: inline-block;
      background: #F97316;
      color: #EEFBFF;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-size: 16px;
      margin: 20px 10px 20px 0;
      border: 2px solid #F97316;
    }
    .cta-button.secondary {
      background: #0000FF;
      border: 2px solid #0000FF;
    }
    .footer {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 30px;
      text-align: center;
      border-top: 4px solid #F97316;
    }
    .footer p {
      font-size: 14px;
      color: #09080E;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <!-- HEADER -->
      <div class="header">
        <h1>Your Digital IQ Assessment Results</h1>
        <div class="score">${data.digitalScore}<span style="font-size: 24px; opacity: 0.8;">/140</span></div>
        <div class="score-label">Digital IQ Score</div>
      </div>
      
      <!-- CONTENT -->
      <div class="content">
        <p><strong>Hi ${data.businessName},</strong></p>
        
        <p>Thank you for completing your Digital IQ Assessment! We've analyzed your complete digital presence across 9 critical areas, and your personalized growth prescription is ready.</p>
        
        <!-- EXECUTIVE SUMMARY -->
        <div class="summary-box">
          <h3 style="margin-top: 0; color: #0000FF;">What This Score Means</h3>
          <p>${data.summary}</p>
          <p><strong>The opportunity:</strong> Businesses that implement foundational digital tools typically see 20-40% revenue growth within the first year.</p>
        </div>
        
        <h2>Your Priority Recommendations</h2>
        <p>Based on your assessment, here are the specific tools that will have the biggest impact on your business:</p>
        
        ${highPriorityRecs.map((rec) => `
        <!-- RECOMMENDATION: ${rec.title} -->
        <div class="recommendation">
          <div class="recommendation-header">
            <img src="${getProductIcon(rec.productId)}" alt="${rec.productId || "Product"}" />
            <h3>${rec.title}</h3>
          </div>
          
          <p><strong>You need:</strong> ${rec.description}</p>
          
          <p><strong>Why it matters:</strong> ${rec.estimatedImpact}</p>
          
          ${rec.productId ? `<p><strong>Our recommendation: <span class="product-name">${rec.productId.charAt(0).toUpperCase() + rec.productId.slice(1)}</span></strong></p>` : ""}
          
          ${rec.productBenefits && rec.productBenefits.length > 0 ? `
          <ul>
            ${rec.productBenefits.map((benefit) => `<li><strong>${benefit.split(":")[0]}:</strong>${benefit.includes(":") ? benefit.split(":").slice(1).join(":") : ""}</li>`).join("")}
          </ul>` : ""}
          
          <p><strong>Expected impact:</strong> ${rec.estimatedEffort}</p>
        </div>
        `).join("")}
        
        <!-- BUNDLE ADVANTAGE -->
        <div class="bundle-callout">
          <div style="margin-bottom: 20px;">
            <strong style="font-size: 18px; color: #0000FF;">\u{1F4A1} Smart Move: Save with Bundles</strong>
          </div>
          
          <div class="bundle-item">
            <img src="${baseUrl}/commverse.png" alt="CommVerse Bundle" />
            <p><strong>CommVerse Bundle ($99/mo):</strong> Includes Send, Content, Inbox (unified communications), and LiveChat (website chat widget)\u2014all four tools in one integrated platform. Save money and manage everything from one dashboard.</p>
          </div>
          
          <div class="bundle-item" style="margin-top: 20px;">
            <img src="${baseUrl}/localblue.png" alt="LocalBlue Bundle" />
            <p><strong>LocalBlue Bundle ($59/mo):</strong> Includes Reputation, business Listings management, and Google Business Profile optimization for complete local SEO dominance.</p>
          </div>
        </div>
        
        <h2>Next Steps</h2>
        <p>You've got the diagnosis\u2014now it's time to take action. Here's what to do:</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${baseUrl}/portal/prescriptions" class="cta-button">
            View Your Complete Prescription
          </a>
          <br>
          <a href="${baseUrl}/tour" class="cta-button secondary">
            Take the Free Platform Tour
          </a>
        </div>
        
        <p style="margin-top: 40px;">Your complete prescription includes detailed implementation steps, product comparisons, and a prioritized action plan. Plus, you'll receive a welcome from Coach Blue\u2014our AI mentor who offers a free guided tour of the platform (ongoing mentorship available as optional $99/mo upgrade).</p>
        
        <p><strong>Questions?</strong> Just reply to this email\u2014we're here to help!</p>
        
        <!-- SCANSBLUE FULL REPORT UPSELL -->
        <div style="background: #ffffff; border: 2px solid #0000FF; border-radius: 8px; padding: 25px; margin: 25px 0;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <img src="${baseUrl}/scansblue assets/scansblue icon.png" alt="ScansBlue" style="width: 48px; height: 48px;" />
            <h3 style="margin: 0; color: #0000FF; font-family: 'Archivo Semi Expanded', sans-serif;">Want a Complete Website Audit?</h3>
          </div>
          
          <p style="margin: 0 0 15px 0;">Your Digital IQ Assessment included a quick scan of your website. For a <strong>comprehensive technical analysis</strong> with actionable insights:</p>
          
          <ul style="margin: 15px 0; padding-left: 20px;">
            <li><strong>Performance Analysis:</strong> Page speed, loading times, Core Web Vitals, optimization opportunities</li>
            <li><strong>SEO Deep Dive:</strong> Meta tags, structured data, indexability, mobile SEO, local SEO factors</li>
            <li><strong>Security Audit:</strong> SSL configuration, vulnerabilities, security headers, best practices</li>
            <li><strong>Mobile Optimization:</strong> Responsive design, mobile usability, touch targets, viewport</li>
            <li><strong>Code Quality:</strong> HTML validation, accessibility (WCAG) compliance, best practices</li>
            <li><strong>Competitive Analysis:</strong> How your site compares to industry standards</li>
          </ul>
          
          <p style="font-size: 18px; color: #09080E; margin: 20px 0;">
            <strong>Get your complete ScansBlue Report for just $10</strong>
          </p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="${baseUrl}/scansblue/purchase?assessment=${data.assessmentId}" style="display: inline-block; background: #0000FF; color: #EEFBFF; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Archivo Semi Expanded', sans-serif; font-size: 16px; border: 2px solid #0000FF;">
              Get Full Website Audit - $10
            </a>
          </div>
          
          <p style="font-size: 14px; color: #09080E; opacity: 0.8; text-align: center; margin-top: 15px;">
            <em>Report delivered within 5 minutes of payment \u2022 Detailed PDF included</em>
          </p>
        </div>
      </div>
      
      <!-- FOOTER -->
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong></p>
        <p>Your AI-Powered Partner in Digital Growth</p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
          This assessment was powered by our Business IQ Scanner using advanced AI analysis and real-time digital presence monitoring.
        </p>
        <p style="font-size: 12px; opacity: 0.8;">\xA9 2026 BusinessBlueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>`;
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
    const baseUrl = process.env.FRONTEND_URL || "https://businessblueprint.io";
    const coachBlueIcon = `${baseUrl}/4-AI_Business_Coach_-_Coach_Blue.png`;
    const tourUrl = `${baseUrl}/tour?assessmentId=${data.assessmentId}`;
    const prescriptionUrl = `${baseUrl}/portal/prescriptions`;
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meet Coach Blue</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', sans-serif;
      line-height: 1.6;
      color: #09080E;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #EEFBFF;
    }
    .email-outline {
      border: 2px solid #09080E;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .content {
      background: #EEFBFF;
      padding: 40px 30px;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #EEFBFF;
    }
    .footer {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 30px;
      text-align: center;
      border-top: 4px solid #F97316;
    }
    .cta-button {
      display: inline-block;
      background: #F97316;
      color: #EEFBFF;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-size: 16px;
      margin: 20px 10px 20px 0;
      border: 2px solid #F97316;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <!-- HEADER -->
      <div class="header">
        <img src="${coachBlueIcon}" alt="Coach Blue" style="width: 80px; height: 80px; margin-bottom: 15px;" />
        <h1 style="font-family: 'Archivo Semi Expanded', sans-serif; font-size: 28px; color: #09080E; margin: 0;">
          Meet Coach Blue \u{1F916}
        </h1>
        <p style="font-size: 18px; color: #09080E; margin-top: 10px;">Your AI Guide to Digital Success</p>
      </div>
      
      <!-- CONTENT -->
      <div class="content">
        <p><strong>Hi ${data.businessName},</strong></p>
        
        <p>Congratulations on completing your Digital IQ Assessment! \u{1F389}</p>
        
        <p>I'm <strong>Coach Blue</strong>, your AI business mentor here at BusinessBlueprint. Think of me as your personal guide to digital growth\u2014available 24/7 to help you navigate the world of digital marketing and implement your prescription recommendations.</p>
        
        <h2 style="font-family: 'Archivo Semi Expanded', sans-serif; color: #0000FF; margin-top: 30px;">Your Free Platform Tour</h2>
        
        <p>Before we dive in, let me give you a <strong>FREE guided tour</strong> of BusinessBlueprint. I'll walk you through:</p>
        
        <ul style="margin: 20px 0; padding-left: 20px;">
          <li><strong>Your Prescription:</strong> How to read and prioritize your recommendations</li>
          <li><strong>The 5-Step Journey:</strong> Assessment \u2192 Prescription \u2192 LocalBlue \u2192 Coach Blue \u2192 CommVerse</li>
          <li><strong>Our Tools:</strong> A complete overview of all 9 apps and what they do</li>
          <li><strong>Getting Started:</strong> Which tools to implement first for maximum impact</li>
        </ul>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${tourUrl}" class="cta-button">
            Start Your Free Tour
          </a>
        </div>
        
        <p style="font-size: 14px; color: #09080E; opacity: 0.8; text-align: center;">
          <em>The tour is completely free and you can replay it as many times as you want!</em>
        </p>
        
        <div style="border-top: 2px solid #0000FF; border-bottom: 2px solid #0000FF; padding: 20px; margin: 40px 0; background: #ffffff;">
          <h3 style="font-family: 'Archivo Semi Expanded', sans-serif; color: #0000FF; margin-top: 0;">Want Me as Your Personal Mentor?</h3>
          
          <p>The platform tour is just the beginning. If you want <strong>ongoing, personalized guidance</strong> as you grow your business, I'm available as a premium subscription.</p>
          
          <p><strong>With Coach Blue Premium ($99/mo), I'll help you:</strong></p>
          <ul>
            <li>Implement your prescription step-by-step</li>
            <li>Troubleshoot technical issues</li>
            <li>Answer questions about any of our tools</li>
            <li>Provide strategic advice tailored to your business</li>
            <li>Keep you motivated and on track</li>
          </ul>
          
          <p style="margin-bottom: 0;">Think of it like having a business consultant available 24/7\u2014but for a fraction of the cost.</p>
        </div>
        
        <h2 style="font-family: 'Archivo Semi Expanded', sans-serif; color: #0000FF;">What's Next?</h2>
        
        <p>Here's what I recommend:</p>
        
        <ol style="margin: 20px 0; padding-left: 20px;">
          <li><strong>Take the free tour</strong> (10-15 minutes) to get oriented</li>
          <li><strong>Review your prescription</strong> to see what we recommend</li>
          <li><strong>Pick one tool to start with</strong> (I can help you choose!)</li>
          <li><strong>Implement and see results</strong></li>
        </ol>
        
        <p>Ready to get started? I'm here whenever you need me!</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${tourUrl}" class="cta-button">
            Begin Free Tour
          </a>
          <br>
          <a href="${prescriptionUrl}" class="cta-button" style="background: #0000FF; border: 2px solid #0000FF;">
            View My Prescription
          </a>
        </div>
        
        <p style="margin-top: 40px;"><strong>Questions?</strong> Just reply to this email\u2014I'm here to help!</p>
        
        <p>To your digital success,<br>
        <strong>Coach Blue \u{1F916}</strong><br>
        <em>Your AI Business Mentor</em></p>
      </div>
      
      <!-- FOOTER -->
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong></p>
        <p>Your AI-Powered Partner in Digital Growth</p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">\xA9 2026 BusinessBlueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  }
};

// server/services/inbox-email.ts
init_db();
init_schema();
import nodemailer from "nodemailer";
import { eq as eq28, and as and16 } from "drizzle-orm";
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
    const [conversation] = await db.select().from(inboxConversations).where(eq28(inboxConversations.id, conversationId)).limit(1);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    if (conversation.primaryChannelType !== "email") {
      throw new Error("Conversation is not an email thread");
    }
    const [channelConnection] = await db.select().from(inboxChannelConnections).where(and16(
      eq28(inboxChannelConnections.clientId, conversation.clientId),
      eq28(inboxChannelConnections.channelType, "email"),
      eq28(inboxChannelConnections.status, "active")
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
        <p>This message was sent from Business Blueprint Respond</p>
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
      let conversation = await db.select().from(inboxConversations).where(and16(
        eq28(inboxConversations.clientId, data.clientId),
        eq28(inboxConversations.contactIdentifier, data.from),
        eq28(inboxConversations.primaryChannelType, "email")
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
        }).where(eq28(inboxConversations.id, conversationId));
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
    const [website, socialMedia, directories, reviews, scansBlueData] = await Promise.all([
      this.scanWebsite(params.website),
      this.scanSocialMedia(params.businessName),
      this.scanDirectories(params),
      this.scanReviews({
        businessName: params.businessName,
        address: params.address,
        phone: params.phone
      }),
      this.runScansBluesFastCheck(params.website)
    ]);
    const digitalIQScore = this.calculateDigitalIQ({
      website,
      socialMedia,
      directories,
      reviews,
      scansBlue: scansBlueData
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
      recommendations: recommendations2,
      scansBlue: scansBlueData || void 0
    };
  }
  async runScansBluesFastCheck(websiteUrl) {
    if (!websiteUrl) {
      console.log("[ScansBlue] No website URL provided, skipping Fast Check");
      return null;
    }
    try {
      console.log(`[ScansBlue] Running Fast Check for: ${websiteUrl}`);
      const result = await scansBlueService.runFastCheck(websiteUrl);
      if (!result || !result.results) {
        console.log("[ScansBlue] Fast Check returned no results");
        return null;
      }
      const overallScore = result.results.summary?.overallScore || 0;
      console.log(`[ScansBlue] Fast Check complete - Score: ${overallScore}/100`);
      return {
        overallScore,
        sslPresent: result.results.ssl?.present || false,
        sslValid: result.results.ssl?.valid || false,
        loadTime: result.results.performance?.loadTime || 0,
        performanceScore: result.results.performance?.score || 0,
        mobileOptimized: result.results.mobile?.optimized || false,
        mobileScore: result.results.mobile?.score || 0,
        criticalIssues: result.results.criticalIssues || []
      };
    } catch (error) {
      console.error("[ScansBlue] Fast Check error:", error);
      return null;
    }
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
    const napEntries = [];
    if (params.businessName) {
      napEntries.push({ name: params.businessName, address: params.address, phone: params.phone });
    }
    if (googleResult.exists) {
      napEntries.push({ name: googleResult.name, address: googleResult.address, phone: googleResult.phone });
    }
    if (yelpResult.exists) {
      napEntries.push({ name: yelpResult.name, address: yelpResult.address, phone: yelpResult.phone });
    }
    const consistency = this.calculateNapConsistency(napEntries);
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
    const platformsWithReviews = [platforms.google, platforms.yelp].filter((p) => p.reviewCount > 0);
    const responseRate = platformsWithReviews.length > 0 ? platformsWithReviews.reduce((sum, p) => sum + p.responseRate, 0) / platformsWithReviews.length : 0;
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
   * Calculate scan-based Digital IQ score (0-70)
   * 
   * This returns just the scan component. Use calculateCombinedDigitalIQ() 
   * to get the full 0-140 score with operational data included.
   * 
   * Weight distribution for scans:
   * - Website: 30% (21 points)
   * - Directories: 30% (21 points)
   * - Reviews: 25% (17.5 points)
   * - Social Media: 15% (10.5 points)
   */
  calculateDigitalIQ(data) {
    const websitePoints = data.website.score / 100 * 18;
    const directoriesPoints = data.directories.score / 100 * 18;
    const reviewsPoints = data.reviews.score / 100 * 16;
    const socialPoints = data.socialMedia.score / 100 * 8;
    let scansBluePoints = 0;
    if (data.scansBlue) {
      scansBluePoints = Math.min(10, data.scansBlue.overallScore / 100 * 10);
      console.log(`[ScansBlue] Technical points: ${scansBluePoints.toFixed(1)}/10`);
    }
    const scanTotal = Math.round(websitePoints + directoriesPoints + reviewsPoints + socialPoints + scansBluePoints);
    console.log(`\u{1F4CA} Digital IQ Scan Breakdown: Website=${websitePoints.toFixed(1)}/18, Directories=${directoriesPoints.toFixed(1)}/18, Reviews=${reviewsPoints.toFixed(1)}/16, Social=${socialPoints.toFixed(1)}/8, ScansBlue=${scansBluePoints.toFixed(1)}/10, Scan Total=${scanTotal}/70`);
    return Math.min(70, Math.max(0, scanTotal));
  }
  /**
   * Calculate operational score from self-reported assessment questions (0-70 points)
   * 
   * 9 categories × ~3 questions each = 27 questions total
   * Each category contributes a proportional share of 70 points
   */
  calculateOperationalScore(operationalData) {
    const recencyScores = {
      "past_week": 10,
      "past_month": 8,
      "past_3_months": 5,
      "past_6_months": 3,
      "6_months_plus": 1,
      // Email/GBP photo
      "3_months_plus": 2,
      // SMS/social/reputation/chat/GBP post/CRM
      "past_year": 2,
      // Listings
      "year_plus": 1,
      // Listings
      "never": 0,
      // General
      "never_none": 0,
      // Live chat
      "never_no_crm": 0
      // CRM followup
    };
    const emailCollectionScores = {
      "yes_active": 10,
      "yes_not_organized": 5,
      "no": 0,
      "dont_know": 2
    };
    const listSizeScores = {
      "1000_plus": 10,
      "501_1000": 8,
      "201_500": 6,
      "51_200": 4,
      "0_50": 2,
      "no_list": 0
    };
    const smsScores = {
      "yes_regularly": 10,
      "yes_occasionally": 6,
      "no_interested": 3,
      "no_not_interested": 0
    };
    const frequencyScores = {
      "daily": 10,
      "3_5_week": 8,
      "1_2_week": 6,
      "few_month": 4,
      "rarely": 2,
      "never": 0
    };
    const creatorScores = {
      "agency": 10,
      "staff": 8,
      "owner": 6,
      "inconsistent": 3,
      "no_one": 0
    };
    const responseRateScores = {
      "90_100": 10,
      "50_89": 7,
      "10_49": 4,
      "under_10": 2,
      "0": 0
    };
    const responseTimeScores = {
      "15_min": 10,
      "1_hour": 8,
      "4_hours": 6,
      "24_hours": 4,
      "24_hours_plus": 2,
      "inconsistent": 3,
      "1_min": 10,
      "5_min": 8,
      "15_plus": 4,
      "no_chat": 0
    };
    const unifiedInboxScores = {
      "yes_unified": 10,
      "partial": 6,
      "no_scattered": 2,
      "dont_know": 3
    };
    const missedInquiriesScores = {
      "never": 10,
      "past_week": 4,
      "past_month": 6,
      "regularly": 2,
      "dont_track": 3
    };
    const liveChatScores = {
      "yes_monitored": 10,
      "yes_not_monitored": 5,
      "yes_unsure": 4,
      "no": 2,
      "no_website": 0
    };
    const listingConsistencyScores = {
      "yes_consistent": 10,
      "pretty_sure": 7,
      "not_sure": 4,
      "know_inconsistent": 2,
      "never_checked": 3
    };
    const blogScores = {
      "yes_weekly": 10,
      "yes_monthly": 7,
      "yes_inconsistent": 4,
      "no_planning": 2,
      "no_not_interested": 0
    };
    const crmScores = {
      "yes_daily": 10,
      "yes_underutilized": 6,
      "yes_not_setup": 4,
      "no_planning": 2,
      "manual_tracking": 3,
      "no_dont_track": 0
    };
    const crmPlatformScores = {
      "salesforce": 10,
      "hubspot": 10,
      "zoho": 8,
      "monday": 7,
      "pipedrive": 8,
      "sheets_excel": 3,
      "other": 5,
      "none": 0
    };
    const automationScores = {
      "yes_full": 10,
      "yes_partial": 6,
      "no_manual": 2,
      "dont_know": 3
    };
    const getScore = (value, scoreTable) => {
      if (!value) return 0;
      return scoreTable[value] ?? 0;
    };
    const emailSmsRaw = (getScore(operationalData.collectsEmails, emailCollectionScores) + getScore(operationalData.lastEmailCampaign, recencyScores) + getScore(operationalData.emailListSize, listSizeScores) + getScore(operationalData.sendsSMS, smsScores) + getScore(operationalData.lastSMSCampaign, recencyScores)) / 50 * 7.78;
    const socialRaw = (getScore(operationalData.lastSocialPost, recencyScores) + getScore(operationalData.socialPostFrequency, frequencyScores) + getScore(operationalData.socialContentCreator, creatorScores)) / 30 * 7.78;
    const reputationRaw = (getScore(operationalData.lastReviewResponse, recencyScores) + getScore(operationalData.reviewResponseRate, responseRateScores) + getScore(operationalData.lastNewReview, recencyScores)) / 30 * 7.78;
    const responseRaw = (getScore(operationalData.inquiryResponseTime, responseTimeScores) + getScore(operationalData.hasUnifiedInbox, unifiedInboxScores) + getScore(operationalData.missedInquiries, missedInquiriesScores)) / 30 * 7.78;
    const chatRaw = (getScore(operationalData.hasLiveChat, liveChatScores) + getScore(operationalData.lastChatConversation, recencyScores) + getScore(operationalData.chatResponseTime, responseTimeScores)) / 30 * 7.78;
    const listingsRaw = (getScore(operationalData.lastListingUpdate, recencyScores) + getScore(operationalData.listingConsistency, listingConsistencyScores)) / 20 * 7.78;
    const gbpRaw = (getScore(operationalData.lastGBPPost, recencyScores) + getScore(operationalData.lastGBPPhoto, recencyScores)) / 20 * 7.78;
    const websiteRaw = (getScore(operationalData.lastWebsiteUpdate, recencyScores) + getScore(operationalData.hasBlog, blogScores)) / 20 * 7.78;
    const crmRaw = (getScore(operationalData.usesCRM, crmScores) + getScore(operationalData.crmPlatform, crmPlatformScores) + getScore(operationalData.lastCRMFollowup, recencyScores) + getScore(operationalData.hasAutomation, automationScores)) / 40 * 7.78;
    const operationalTotal = Math.round(
      emailSmsRaw + socialRaw + reputationRaw + responseRaw + chatRaw + listingsRaw + gbpRaw + websiteRaw + crmRaw
    );
    console.log(`\u{1F4CA} Operational Score Breakdown: Email/SMS=${emailSmsRaw.toFixed(1)}, Social=${socialRaw.toFixed(1)}, Reputation=${reputationRaw.toFixed(1)}, Response=${responseRaw.toFixed(1)}, Chat=${chatRaw.toFixed(1)}, Listings=${listingsRaw.toFixed(1)}, GBP=${gbpRaw.toFixed(1)}, Website=${websiteRaw.toFixed(1)}, CRM=${crmRaw.toFixed(1)}, Total=${operationalTotal}/70`);
    return Math.min(70, Math.max(0, operationalTotal));
  }
  /**
   * Calculate combined Digital IQ score (scan + operational)
   */
  calculateCombinedDigitalIQ(scanScore, operationalScore) {
    const combined = scanScore + operationalScore;
    console.log(`\u{1F4CA} Combined Digital IQ: Scan=${scanScore}/70 + Operational=${operationalScore}/70 = ${combined}/140`);
    return Math.min(140, Math.max(0, combined));
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
   * Calculate NAP (Name, Address, Phone) consistency across platforms
   * Returns 0-100 score
   */
  calculateNapConsistency(entries) {
    if (entries.length < 2) return 100;
    const normalize = (val) => (val || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    let matches = 0;
    let comparisons = 0;
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const n1 = normalize(entries[i].name);
        const n2 = normalize(entries[j].name);
        if (n1 && n2) {
          comparisons++;
          if (n1 === n2 || n1.includes(n2) || n2.includes(n1)) matches++;
        }
        const p1 = (entries[i].phone || "").replace(/\D/g, "").slice(-10);
        const p2 = (entries[j].phone || "").replace(/\D/g, "").slice(-10);
        if (p1 && p2) {
          comparisons++;
          if (p1 === p2) matches++;
        }
        const a1 = normalize(entries[i].address);
        const a2 = normalize(entries[j].address);
        if (a1 && a2) {
          comparisons++;
          if (a1 === a2 || a1.includes(a2) || a2.includes(a1)) matches++;
        }
      }
    }
    return comparisons > 0 ? Math.round(matches / comparisons * 100) : 100;
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

// server/services/listingSync.ts
init_db();
init_schema();
import { eq as eq29, and as and17 } from "drizzle-orm";
var ListingSyncService = class {
  /**
   * Sync listings for a client by searching Google Places and Yelp
   */
  async syncClientListings(clientId, businessName, address, phone) {
    const result = { found: 0, created: 0, updated: 0, errors: [] };
    try {
      const google = await googlePlacesService.searchBusiness(businessName, address);
      if (google.exists) {
        result.found++;
        const upserted = await this.upsertListing(clientId, "google_business", {
          platformId: google.placeId || null,
          name: google.name || businessName,
          address: google.address || null,
          phone: google.phone || null,
          website: google.website || null,
          hours: google.hours?.join("; ") || null,
          rating: google.rating?.toString() || null,
          reviewCount: google.reviewCount || 0,
          url: google.placeId ? `https://www.google.com/maps/place/?q=place_id:${google.placeId}` : null,
          platformData: google
        });
        if (upserted === "created") result.created++;
        else result.updated++;
      }
    } catch (error) {
      result.errors.push({ platform: "google_business", message: error.message });
    }
    try {
      const yelp = await yelpApiService.searchBusiness(businessName, address, phone);
      if (yelp.exists) {
        result.found++;
        const upserted = await this.upsertListing(clientId, "yelp", {
          platformId: yelp.id || null,
          name: yelp.name || businessName,
          address: yelp.address || null,
          phone: yelp.phone || null,
          website: yelp.website || null,
          hours: yelp.hours?.join("; ") || null,
          rating: yelp.rating?.toString() || null,
          reviewCount: yelp.reviewCount || 0,
          url: yelp.website || null,
          platformData: yelp
        });
        if (upserted === "created") result.created++;
        else result.updated++;
      }
    } catch (error) {
      result.errors.push({ platform: "yelp", message: error.message });
    }
    return result;
  }
  /**
   * Upsert a listing: update if exists for (clientId, platform), otherwise insert.
   * Returns 'created' or 'updated'.
   */
  async upsertListing(clientId, platform, data) {
    const existing = await db.select().from(businessListings).where(and17(eq29(businessListings.clientId, clientId), eq29(businessListings.platform, platform))).limit(1);
    const now = /* @__PURE__ */ new Date();
    if (existing.length > 0) {
      await db.update(businessListings).set({
        platformId: data.platformId,
        name: data.name,
        address: data.address,
        phone: data.phone,
        website: data.website,
        hours: data.hours,
        rating: data.rating,
        reviewCount: data.reviewCount,
        url: data.url,
        platformData: data.platformData,
        lastSyncedAt: now,
        syncStatus: "synced",
        syncError: null,
        status: "active",
        updatedAt: now
      }).where(eq29(businessListings.id, existing[0].id));
      return "updated";
    }
    await db.insert(businessListings).values({
      clientId,
      platform,
      platformId: data.platformId,
      name: data.name,
      address: data.address,
      phone: data.phone,
      website: data.website,
      hours: data.hours,
      rating: data.rating,
      reviewCount: data.reviewCount,
      url: data.url,
      platformData: data.platformData,
      source: "sync",
      status: "active",
      lastSyncedAt: now,
      syncStatus: "synced"
    });
    return "created";
  }
};
var listingSyncService = new ListingSyncService();

// server/services/reviewSync.ts
init_db();
init_schema();
import { eq as eq30, and as and18, desc as desc13 } from "drizzle-orm";
function classifySentiment(rating) {
  if (rating >= 4) return "positive";
  if (rating <= 2) return "negative";
  return "neutral";
}
var ReviewSyncService = class {
  /**
   * Sync reviews for a client from Google and Yelp
   */
  async syncClientReviews(clientId, businessName, address, phone) {
    const result = { found: 0, created: 0, updated: 0, errors: [] };
    try {
      const google = await googlePlacesService.searchBusiness(businessName, address);
      if (google.exists && google.reviews) {
        for (const review of google.reviews) {
          result.found++;
          const platformReviewId = `google_${review.author}_${review.time}`;
          const upserted = await this.upsertReview(clientId, {
            platform: "google",
            platformReviewId,
            reviewerName: review.author || "Google User",
            rating: review.rating,
            reviewText: review.text || "",
            reviewDate: new Date(review.time * 1e3),
            reviewUrl: google.placeId ? `https://www.google.com/maps/place/?q=place_id:${google.placeId}` : null
          });
          if (upserted === "created") result.created++;
          else result.updated++;
        }
      }
    } catch (error) {
      result.errors.push({ platform: "google", message: error.message });
    }
    try {
      const yelp = await yelpApiService.searchBusiness(businessName, address, phone);
      if (yelp.exists && yelp.reviews) {
        for (const review of yelp.reviews) {
          result.found++;
          const platformReviewId = `yelp_${review.url || review.author}_${review.timeCreated}`;
          const upserted = await this.upsertReview(clientId, {
            platform: "yelp",
            platformReviewId,
            reviewerName: review.author || "Yelp User",
            rating: review.rating,
            reviewText: review.text || "",
            reviewDate: new Date(review.timeCreated),
            reviewUrl: review.url || null
          });
          if (upserted === "created") result.created++;
          else result.updated++;
        }
      }
    } catch (error) {
      result.errors.push({ platform: "yelp", message: error.message });
    }
    return result;
  }
  /**
   * Upsert a review by platformReviewId
   */
  async upsertReview(clientId, data) {
    const existing = await db.select().from(businessReviews).where(
      and18(
        eq30(businessReviews.clientId, clientId),
        eq30(businessReviews.platformReviewId, data.platformReviewId)
      )
    ).limit(1);
    const sentiment = classifySentiment(data.rating);
    if (existing.length > 0) {
      await db.update(businessReviews).set({
        reviewerName: data.reviewerName,
        rating: data.rating,
        reviewText: data.reviewText,
        sentiment,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq30(businessReviews.id, existing[0].id));
      return "updated";
    }
    await db.insert(businessReviews).values({
      clientId,
      platform: data.platform,
      platformReviewId: data.platformReviewId,
      reviewerName: data.reviewerName,
      rating: data.rating,
      reviewText: data.reviewText,
      reviewDate: data.reviewDate,
      sentiment,
      reviewUrl: data.reviewUrl
    });
    return "created";
  }
  /**
   * Get all reviews for a client
   */
  async getClientReviews(clientId) {
    return db.select().from(businessReviews).where(eq30(businessReviews.clientId, clientId)).orderBy(desc13(businessReviews.reviewDate));
  }
  /**
   * Get review analytics for a client
   */
  async getClientReviewAnalytics(clientId) {
    const reviews = await this.getClientReviews(clientId);
    const totalReviews = reviews.length;
    const positiveCount = reviews.filter((r) => r.sentiment === "positive").length;
    const negativeCount = reviews.filter((r) => r.sentiment === "negative").length;
    const neutralCount = reviews.filter((r) => r.sentiment === "neutral").length;
    const respondedCount = reviews.filter((r) => r.response).length;
    const responseRate = totalReviews > 0 ? Math.round(respondedCount / totalReviews * 100) : 0;
    const avgRating = totalReviews > 0 ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)) : 0;
    const platformBreakdown = {
      google: reviews.filter((r) => r.platform === "google").length,
      yelp: reviews.filter((r) => r.platform === "yelp").length,
      facebook: reviews.filter((r) => r.platform === "facebook").length
    };
    return {
      averageRating: avgRating,
      totalReviews,
      positiveCount,
      negativeCount,
      neutralCount,
      responseRate,
      platformBreakdown
    };
  }
  /**
   * Save a response to a review
   */
  async respondToReview(reviewId, response, isAI = false) {
    await db.update(businessReviews).set({
      response,
      responseDate: /* @__PURE__ */ new Date(),
      isAIGenerated: isAI,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq30(businessReviews.id, reviewId));
  }
};
var reviewSyncService = new ReviewSyncService();

// server/services/analyticsSync.ts
init_db();
init_schema();
init_platformFactory();
import { eq as eq31, and as and19, desc as desc14 } from "drizzle-orm";
var AnalyticsSyncService = class {
  /**
   * Sync analytics for all published posts belonging to a client
   */
  async syncClientAnalytics(clientId) {
    const result = { synced: 0, errors: [] };
    const posts = await db.select().from(contentPosts).where(
      and19(
        eq31(contentPosts.clientId, clientId),
        eq31(contentPosts.status, "published")
      )
    ).orderBy(desc14(contentPosts.publishedAt));
    const accounts = await db.select().from(socialMediaAccounts).where(
      and19(
        eq31(socialMediaAccounts.clientId, clientId),
        eq31(socialMediaAccounts.isActive, true)
      )
    );
    const credentialMap = /* @__PURE__ */ new Map();
    for (const account of accounts) {
      credentialMap.set(account.platform, {
        accessToken: account.accessToken || "",
        refreshToken: account.refreshToken || void 0,
        platformAccountId: account.platformAccountId
      });
    }
    for (const post of posts) {
      const publishResults = post.publishResults || {};
      for (const [platform, platformResult] of Object.entries(publishResults)) {
        const pr = platformResult;
        if (!pr?.postId) continue;
        try {
          const creds = credentialMap.get(platform);
          if (!creds?.accessToken) continue;
          const adapter = PlatformFactory.createAdapter(platform, {
            accessToken: creds.accessToken,
            refreshToken: creds.refreshToken,
            platformAccountId: creds.platformAccountId
          });
          if (!adapter) continue;
          const analytics = await adapter.getAnalytics(
            pr.postId
          );
          const totalEngagement = (analytics.likes || 0) + (analytics.comments || 0) + (analytics.shares || 0) + (analytics.clicks || 0);
          const engagementRate = analytics.impressions && analytics.impressions > 0 ? (totalEngagement / analytics.impressions * 100).toFixed(2) : "0.00";
          const existing = await db.select().from(contentAnalytics).where(
            and19(
              eq31(contentAnalytics.postId, post.id),
              eq31(contentAnalytics.platform, platform)
            )
          ).limit(1);
          if (existing.length > 0) {
            await db.update(contentAnalytics).set({
              impressions: analytics.impressions || 0,
              reach: analytics.engagement || 0,
              likes: analytics.likes || 0,
              comments: analytics.comments || 0,
              shares: analytics.shares || 0,
              clicks: analytics.clicks || 0,
              saves: analytics.saves || 0,
              engagementRate,
              lastSyncedAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq31(contentAnalytics.id, existing[0].id));
          } else {
            await db.insert(contentAnalytics).values({
              postId: post.id,
              platform,
              platformPostId: pr.postId,
              platformPostUrl: pr.url || null,
              impressions: analytics.impressions || 0,
              reach: analytics.engagement || 0,
              likes: analytics.likes || 0,
              comments: analytics.comments || 0,
              shares: analytics.shares || 0,
              clicks: analytics.clicks || 0,
              saves: analytics.saves || 0,
              engagementRate
            });
          }
          result.synced++;
        } catch (error) {
          result.errors.push({
            postId: post.id,
            platform,
            message: error.message
          });
        }
      }
    }
    return result;
  }
  /**
   * Get aggregated analytics for a client across all platforms
   */
  async getClientAnalyticsSummary(clientId) {
    const posts = await db.select().from(contentPosts).where(eq31(contentPosts.clientId, clientId));
    const postIds = posts.map((p) => p.id);
    if (postIds.length === 0) {
      return {
        totalPosts: 0,
        publishedPosts: 0,
        totalImpressions: 0,
        totalEngagement: 0,
        totalClicks: 0,
        avgEngagementRate: 0,
        platformBreakdown: {},
        topPosts: []
      };
    }
    const allAnalytics = await db.select().from(contentAnalytics).where(
      eq31(contentAnalytics.postId, postIds[0])
      // Start with first
    );
    const analyticsMap = /* @__PURE__ */ new Map();
    for (const postId of postIds) {
      const records = await db.select().from(contentAnalytics).where(eq31(contentAnalytics.postId, postId));
      if (records.length > 0) {
        analyticsMap.set(postId, records);
      }
    }
    let totalImpressions = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    let totalClicks = 0;
    const platformTotals = {};
    const allRecords = [];
    for (const records of Array.from(analyticsMap.values())) {
      for (const r of records) {
        allRecords.push(r);
        totalImpressions += r.impressions || 0;
        totalLikes += r.likes || 0;
        totalComments += r.comments || 0;
        totalShares += r.shares || 0;
        totalClicks += r.clicks || 0;
        if (!platformTotals[r.platform]) {
          platformTotals[r.platform] = {
            impressions: 0,
            engagement: 0,
            posts: 0
          };
        }
        platformTotals[r.platform].impressions += r.impressions || 0;
        platformTotals[r.platform].engagement += (r.likes || 0) + (r.comments || 0) + (r.shares || 0);
        platformTotals[r.platform].posts++;
      }
    }
    const totalEngagement = totalLikes + totalComments + totalShares;
    const avgEngagementRate = totalImpressions > 0 ? parseFloat(
      (totalEngagement / totalImpressions * 100).toFixed(2)
    ) : 0;
    const postEngagement = /* @__PURE__ */ new Map();
    for (const r of allRecords) {
      const current = postEngagement.get(r.postId) || 0;
      postEngagement.set(
        r.postId,
        current + (r.likes || 0) + (r.comments || 0) + (r.shares || 0)
      );
    }
    const topPostIds = Array.from(postEngagement.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id]) => id);
    const topPosts = posts.filter((p) => topPostIds.includes(p.id)).map((p) => ({
      id: p.id,
      caption: p.caption,
      platform: p.platforms || [],
      publishedAt: p.publishedAt,
      engagement: postEngagement.get(p.id) || 0
    }));
    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === "published").length,
      totalImpressions,
      totalEngagement,
      totalClicks,
      avgEngagementRate,
      platformBreakdown: platformTotals,
      topPosts
    };
  }
  /**
   * Sync analytics for all clients with connected platforms
   * Designed to be called periodically (e.g., every 6 hours)
   */
  async syncAllClients() {
    const summary = { total: 0, synced: 0, errors: 0 };
    try {
      const activeAccounts = await db.select({ clientId: socialMediaAccounts.clientId }).from(socialMediaAccounts).where(eq31(socialMediaAccounts.isActive, true)).groupBy(socialMediaAccounts.clientId);
      summary.total = activeAccounts.length;
      for (const { clientId } of activeAccounts) {
        if (!clientId) continue;
        try {
          const result = await this.syncClientAnalytics(clientId);
          summary.synced += result.synced;
          summary.errors += result.errors.length;
        } catch (error) {
          console.error(`Analytics sync failed for client ${clientId}:`, error.message);
          summary.errors++;
        }
      }
      console.log(
        `Analytics sync complete: ${summary.total} clients, ${summary.synced} posts synced, ${summary.errors} errors`
      );
    } catch (error) {
      console.error("Analytics sync all failed:", error);
    }
    return summary;
  }
  /**
   * Start periodic analytics sync (every 6 hours)
   */
  syncInterval = null;
  startScheduledSync(intervalMs = 6 * 60 * 60 * 1e3) {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    console.log(`Starting analytics sync scheduler (every ${intervalMs / 36e5}h)`);
    this.syncInterval = setInterval(async () => {
      try {
        await this.syncAllClients();
      } catch (error) {
        console.error("Scheduled analytics sync error:", error);
      }
    }, intervalMs);
    setTimeout(() => this.syncAllClients().catch(console.error), 3e4);
  }
  stopScheduledSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
};
var analyticsSyncService = new AnalyticsSyncService();

// server/services/assessment-emails.ts
init_db();
init_schema();
import { Resend as Resend3 } from "resend";
async function getResendCredentials3() {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    if (!hostname) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
      }
      console.warn("[Assessment Email] No Resend connector or RESEND_API_KEY configured");
      return null;
    }
    const xReplitToken = process.env.REPL_IDENTITY ? "repl " + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? "depl " + process.env.WEB_REPL_RENEWAL : null;
    if (!xReplitToken) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
      }
      console.warn("[Assessment Email] No Replit token found for connector");
      return null;
    }
    const connectionSettings3 = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
      {
        headers: {
          "Accept": "application/json",
          "X_REPLIT_TOKEN": xReplitToken
        }
      }
    ).then((res) => res.json()).then((data) => data.items?.[0]);
    if (!connectionSettings3 || !connectionSettings3.settings?.api_key) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        console.log("[Assessment Email] Using RESEND_API_KEY from environment");
        return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
      }
      console.warn("[Assessment Email] Resend connector not configured");
      return null;
    }
    console.log("[Assessment Email] Using Resend connector credentials");
    return {
      apiKey: connectionSettings3.settings.api_key,
      fromEmail: connectionSettings3.settings.from_email || "noreply@businessblueprint.io"
    };
  } catch (error) {
    console.error("[Assessment Email] Error fetching Resend credentials:", error);
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      return { apiKey, fromEmail: process.env.FROM_EMAIL || "noreply@businessblueprint.io" };
    }
    return null;
  }
}
async function getResendClient2() {
  const credentials = await getResendCredentials3();
  if (!credentials) {
    return null;
  }
  return {
    client: new Resend3(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}
function generateAssessmentConfirmationHTML(assessment) {
  const displayName = assessment.businessName || assessment.email.split("@")[0];
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assessment Received</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      line-height: 1.6; 
      color: #09080E; 
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #EEFBFF;
    }
    .email-outline {
      border: 2px solid #09080E;
      border-radius: 8px;
      overflow: hidden;
    }
    .header { 
      background: #f2f4f6;
      color: #09080E;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .logo {
      max-width: 300px;
      height: auto;
      margin-bottom: 20px;
    }
    .content { 
      background: #EEFBFF; 
      padding: 40px 30px;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #EEFBFF;
    }
    .footer { 
      background: #f2f4f6;
      color: #09080E;
      text-align: center; 
      padding: 30px 20px; 
      font-size: 14px; 
      border-top: 4px solid #F97316;
    }
    .button { 
      display: inline-block; 
      background: transparent;
      color: #F97316; 
      border: 2px solid #F97316;
      padding: 14px 32px; 
      text-decoration: none; 
      border-radius: 8px; 
      margin: 20px 0; 
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      transition: all 0.3s ease;
    }
    .button:hover {
      background: #F97316;
      color: white;
    }
    .success-section {
      text-align: center;
      padding: 30px 0;
    }
    .checkmark { 
      font-size: 72px; 
      color: #00FF40; 
      line-height: 1;
      display: block;
      margin-bottom: 20px;
    }
    .timeline { 
      background: #f8fafc; 
      padding: 30px; 
      border-radius: 12px; 
      margin: 30px 0; 
      border-left: 4px solid #F97316;
    }
    .timeline-item { 
      display: flex; 
      align-items: flex-start; 
      margin: 24px 0; 
    }
    .timeline-icon { 
      background: transparent;
      color: #0000FF; 
      border: 3px solid #0000FF;
      min-width: 40px; 
      height: 40px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      margin-right: 20px; 
      flex-shrink: 0; 
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-size: 18px;
    }
    .email-notice {
      background: #EEFBFF;
      border: 2px solid #6EA6FF;
      border-radius: 12px;
      padding: 25px;
      margin: 30px 0;
    }
    .assessment-id {
      color: #0000FF;
      font-weight: 700;
      font-size: 16px;
    }
    h1 {
      margin: 0;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 700;
      font-size: 36px;
      color: #0000FF;
    }
    h2 {
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 700;
      color: #0000FF;
      font-size: 24px;
      margin: 0 0 10px 0;
    }
    h3 {
      color: #0000FF;
      margin: 0 0 8px 0;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 700;
      font-size: 18px;
    }
    h4 {
      color: #0000FF;
      margin: 0 0 12px 0;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 600;
      font-size: 16px;
    }
    .subtitle {
      color: #666;
      font-size: 18px;
      font-weight: 400;
      margin-top: 10px;
    }
    strong {
      color: #0000FF;
      font-weight: 700;
    }
    p {
      font-weight: 400;
      margin: 16px 0;
    }
    .timeline-item p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <div class="header">
        <img src="https://businessblueprint.io/1-Master_business_blueprint_icon_and_logo.png" alt="BusinessBlueprint.io" class="logo" />
      </div>
      
      <div class="content">
      <div class="success-section">
        <span class="checkmark">\u2713</span>
        <h1>Assessment Received!</h1>
        <p class="subtitle">We're analyzing your business right now</p>
        <p class="assessment-id">Assessment ID: ${assessment.id}</p>
      </div>

      <p>Hi ${displayName},</p>
      
      <p><strong>Thank you for completing your BusinessBlueprint.io assessment!</strong> We've received your information and our AI is already getting to work.</p>
      
      <div class="timeline">
        <h2>What Happens Next</h2>
        <p style="color: #666; margin-bottom: 24px;">Your personalized business growth prescription will be ready soon</p>
        
        <div class="timeline-item">
          <div class="timeline-icon">1</div>
          <div>
            <h3>AI Analysis (2-3 minutes)</h3>
            <p>Our AI is analyzing your business using Google Business Intelligence and industry best practices to identify growth opportunities.</p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-icon">2</div>
          <div>
            <h3>Prescription Generation</h3>
            <p>A customized growth prescription with specific, actionable recommendations tailored to your business will be created.</p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-icon">3</div>
          <div>
            <h3>Expert Review & Delivery (within 24 hours)</h3>
            <p>Our team reviews the AI prescription to ensure quality and relevance, then delivers it to your client portal.</p>
          </div>
        </div>
      </div>
      
      <div style="margin: 24px 0;">
        <p><strong>Assessment Details:</strong></p>
        <p style="margin-left: 20px;">
          <strong>Business:</strong> ${assessment.businessName || "N/A"}<br>
          <strong>Industry:</strong> ${assessment.industry || "N/A"}<br>
          <strong>Email:</strong> ${assessment.email}
        </p>
      </div>
      
      <div class="email-notice">
        <h4>\u{1F4E7} Check Your Email</h4>
        <p style="margin: 0;">You'll receive another notification when your prescription is ready. In the meantime, you can check the status anytime in your client portal.</p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://businessblueprint.io/portal/assessments" class="button">
          Check Status in Portal
        </a>
      </div>
      </div>
      
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong></p>
        <p>Your Partner in Local Business Growth</p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">\xA9 2026 BusinessBlueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}
async function sendAssessmentConfirmationEmail(assessment) {
  const subject = `Assessment Received - We're Analyzing Your Business`;
  const htmlBody = generateAssessmentConfirmationHTML(assessment);
  try {
    const resendClient = await getResendClient2();
    if (!resendClient) {
      console.error("[Assessment Email] Resend not configured");
      await db.insert(emailLogs).values({
        recipientEmail: assessment.email,
        recipientName: assessment.businessName || null,
        assessmentId: assessment.id,
        emailType: "assessment_confirmation",
        subject,
        htmlBody,
        status: "failed",
        errorMessage: "Resend email service not configured",
        sentAt: /* @__PURE__ */ new Date()
      });
      return { success: false, error: "Email service not configured" };
    }
    const result = await resendClient.client.emails.send({
      from: resendClient.fromEmail,
      to: assessment.email,
      subject,
      html: htmlBody
    });
    await db.insert(emailLogs).values({
      recipientEmail: assessment.email,
      recipientName: assessment.businessName || null,
      assessmentId: assessment.id,
      emailType: "assessment_confirmation",
      subject,
      htmlBody,
      status: "sent",
      resendApiId: result.data?.id || null,
      sentAt: /* @__PURE__ */ new Date()
    });
    console.log(`[Assessment Email] Confirmation sent to ${assessment.email}, Resend ID: ${result.data?.id}`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Assessment Email] Failed to send confirmation:", errorMessage);
    try {
      await db.insert(emailLogs).values({
        recipientEmail: assessment.email,
        recipientName: assessment.businessName || null,
        assessmentId: assessment.id,
        emailType: "assessment_confirmation",
        subject,
        htmlBody,
        status: "failed",
        errorMessage,
        sentAt: /* @__PURE__ */ new Date()
      });
    } catch (logError) {
      console.error("[Assessment Email] Failed to log email error:", logError);
    }
    return { success: false, error: errorMessage };
  }
}
async function sendAdminNotification(assessment) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@businessblueprint.io";
  try {
    const resendClient = await getResendClient2();
    if (!resendClient) {
      console.warn("[Assessment Email] Cannot send admin notification - Resend not configured");
      return;
    }
    await resendClient.client.emails.send({
      from: resendClient.fromEmail,
      to: adminEmail,
      subject: `New Assessment Submission - ${assessment.businessName || assessment.email}`,
      html: `
        <h2>New Assessment Submitted</h2>
        <p><strong>Assessment ID:</strong> ${assessment.id}</p>
        <p><strong>Email:</strong> ${assessment.email}</p>
        <p><strong>Business:</strong> ${assessment.businessName || "N/A"}</p>
        <p><strong>Industry:</strong> ${assessment.industry || "N/A"}</p>
        <p><a href="https://businessblueprint.io/admin">View in Admin Panel</a></p>
      `
    });
    console.log(`[Assessment Email] Admin notification sent to ${adminEmail}`);
  } catch (error) {
    console.error("[Assessment Email] Failed to send admin notification:", error);
  }
}

// server/routes.ts
init_schema();
init_db();
import { eq as eq32, desc as desc15, and as and20, or as or4, lte as lte2, sql as sql11 } from "drizzle-orm";
import { z as z9 } from "zod";
var platformDisplayNames = {
  google_business: "Google Business",
  yelp: "Yelp",
  facebook: "Facebook",
  bing_places: "Bing Places",
  apple_maps: "Apple Maps",
  manual: "Manual"
};
function platformDisplayName(code) {
  return platformDisplayNames[code] || code;
}
function platformInternalName(display) {
  const entry = Object.entries(platformDisplayNames).find(([, v]) => v === display);
  return entry ? entry[0] : display.toLowerCase().replace(/\s+/g, "_");
}
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
  app2.get("/chat/widget.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(process.cwd(), "client/public/chat-widget.js"));
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
          companyName: "TriadBlue Inc.",
          email: "53947@triadblue.com",
          accountStatus: "active",
          isAdmin: true
        },
        {
          companyName: "BusinessBlueprint User",
          email: "53947@businessblueprint.io",
          accountStatus: "active"
        },
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
        const fullAddress = [
          validatedData.attention ? `Attn: ${validatedData.attention}` : null,
          validatedData.address,
          validatedData.address2,
          validatedData.unit ? `Unit ${validatedData.unit}` : null,
          `${validatedData.city}, ${validatedData.state} ${validatedData.zipCode}`,
          validatedData.country || "United States"
        ].filter(Boolean).join("\n");
        client2 = await storage.createClient({
          companyName: validatedData.businessName,
          email: validatedData.email,
          phone: validatedData.phone,
          website: validatedData.website || void 0,
          address: fullAddress,
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
        const existingCrmContact = await db.select().from(crmContacts).where(eq32(crmContacts.email, validatedData.email)).limit(1);
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
              address2: validatedData.address2 || null,
              unit: validatedData.unit || null,
              attention: validatedData.attention || null,
              city: validatedData.city,
              state: validatedData.state,
              zipCode: validatedData.zipCode,
              country: validatedData.country || "United States",
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
          }).where(eq32(crmContacts.id, crmContactId));
        }
      } catch (crmError) {
        console.error("[Assessment] Failed to create CRM contact:", crmError);
      }
      try {
        const emailResult = await sendAssessmentConfirmationEmail({
          id: assessment.id,
          email: validatedData.email,
          businessName: validatedData.businessName,
          industry: validatedData.industry
        });
        if (emailResult.success) {
          console.log(`[Assessment] Confirmation email sent to ${validatedData.email}`);
        } else {
          console.warn(`[Assessment] Confirmation email failed: ${emailResult.error}`);
        }
        sendAdminNotification({
          id: assessment.id,
          email: validatedData.email,
          businessName: validatedData.businessName,
          industry: validatedData.industry
        }).catch((err) => console.error("[Assessment] Admin notification failed:", err));
      } catch (emailError) {
        console.error("[Assessment] Failed to send confirmation email:", emailError);
      }
      processAssessmentAsync(
        assessment.id,
        googleService,
        aiService,
        emailService,
        storage
      ).catch((err) => {
        console.error(`[Assessment] Background processing FAILED for ID ${assessment.id}:`, err);
      });
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
      const existingSubscriptions = await db.select().from(subscriptions).where(eq32(subscriptions.assessmentId, id));
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
          const contacts = await db.select().from(crmContacts).where(eq32(crmContacts.clientId, clientId));
          crmStats.contactsCount = contacts.length;
          const activeDeals = await db.select().from(crmDeals).where(
            and20(eq32(crmDeals.clientId, clientId), eq32(crmDeals.status, "open"))
          );
          crmStats.activeDeals = activeDeals.length;
          const today = /* @__PURE__ */ new Date();
          today.setHours(23, 59, 59, 999);
          const tasks2 = await db.select().from(crmTasks).where(
            and20(
              eq32(crmTasks.clientId, clientId),
              or4(
                eq32(crmTasks.status, "pending"),
                eq32(crmTasks.status, "in_progress")
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
          listings: await (async () => {
            try {
              const allListings = await db.select().from(businessListings).where(eq32(businessListings.clientId, clientId));
              const activeCount = allListings.filter((l) => l.status === "active").length;
              const pendingCount = allListings.filter((l) => l.status === "pending").length;
              const platforms = Array.from(new Set(allListings.map((l) => l.platform)));
              return {
                total: allListings.length,
                verified: activeCount,
                pending: pendingCount,
                citations: allListings.length,
                platforms
              };
            } catch {
              return { total: 0, verified: 0, pending: 0, citations: 0, platforms: [] };
            }
          })(),
          reviews: await (async () => {
            try {
              const analytics = await reviewSyncService.getClientReviewAnalytics(clientId);
              return {
                average: analytics.averageRating,
                total: analytics.totalReviews,
                recent: analytics.totalReviews,
                // All reviews are "recent" for now
                response_rate: analytics.responseRate
              };
            } catch {
              return { average: 0, total: 0, recent: 0, response_rate: 0 };
            }
          })(),
          campaigns: {
            active: campaigns2.filter((c) => c.status === "active").length,
            pending: campaigns2.filter((c) => c.status === "draft").length,
            total: campaigns2.length,
            performance: {
              reach: campaigns2.reduce((sum, c) => sum + (c.sentCount || 0), 0),
              clicks: campaigns2.reduce((sum, c) => sum + (c.clickCount || 0), 0),
              conversions: campaigns2.reduce((sum, c) => sum + (c.conversionCount || 0), 0)
            },
            latest: latestCampaign ? {
              name: latestCampaign.name || "Recent Campaign",
              status: latestCampaign.status || "active",
              unsubscribes: latestCampaign.unsubscribeCount || 0,
              clickThroughs: latestCampaign.clickCount || 0,
              purchases: latestCampaign.conversionCount || 0,
              sent: latestCampaign.sentCount || 0
            } : null
          },
          socialMedia: await (async () => {
            try {
              const accounts = await db.select().from(socialMediaAccounts).where(and20(eq32(socialMediaAccounts.clientId, clientId), eq32(socialMediaAccounts.isActive, true)));
              return {
                isSetup: accounts.length > 0,
                connectedProfiles: accounts.length,
                newLikes: 0,
                newComments: 0,
                newMessages: 0
              };
            } catch {
              return { isSetup: false, connectedProfiles: 0, newLikes: 0, newComments: 0, newMessages: 0 };
            }
          })(),
          livechat: await (async () => {
            try {
              const [widgetSettings] = await db.select().from(chatWidgetSettings).where(eq32(chatWidgetSettings.clientId, clientId)).limit(1);
              const sessions2 = await db.select().from(livechatSessions).where(eq32(livechatSessions.clientId, clientId));
              const activeSessions = sessions2.filter((s) => s.status === "active" || s.status === "waiting");
              return {
                isSetup: !!widgetSettings,
                participationRating: 0,
                inQueue: activeSessions.length,
                totalChats: sessions2.length,
                avgResponseTime: "N/A"
              };
            } catch {
              return { isSetup: false, participationRating: 0, inQueue: 0, totalChats: 0, avgResponseTime: "N/A" };
            }
          })(),
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
        category: category ?? void 0,
        priority: priority ?? void 0
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
        isInternal: isInternal ?? void 0,
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
  app2.get("/api/admin/ai-settings", isAuthenticated, async (req, res) => {
    try {
      const { aiSettingsService: aiSettingsService2 } = await Promise.resolve().then(() => (init_ai_settings(), ai_settings_exports));
      const settings = await aiSettingsService2.getAllSettings();
      const providers = ["claude", "openai", "deepseek"];
      const features = [
        { id: "assessment", name: "Business Assessment", description: "AI analysis for Digital IQ assessments" },
        { id: "prescription", name: "Prescriptions", description: "AI-generated business recommendations" },
        { id: "coach_blue", name: "Coach Blue", description: "AI coaching conversations (premium quality)" }
      ];
      res.json({
        settings,
        providers,
        features,
        costEstimates: {
          claude: { per1kTokens: 0.015, quality: "Premium" },
          openai: { per1kTokens: 0.03, quality: "Premium" },
          deepseek: { per1kTokens: 14e-4, quality: "Good" }
        }
      });
    } catch (error) {
      console.error("Error fetching AI settings:", error);
      res.status(500).json({ message: "Failed to fetch AI settings" });
    }
  });
  app2.patch("/api/admin/ai-settings/:feature", isAuthenticated, async (req, res) => {
    try {
      const feature = req.params.feature;
      const { provider } = req.body;
      if (!["assessment", "prescription", "coach_blue"].includes(feature)) {
        return res.status(400).json({ message: "Invalid feature" });
      }
      if (!["claude", "openai", "deepseek"].includes(provider)) {
        return res.status(400).json({ message: "Invalid provider" });
      }
      const { aiSettingsService: aiSettingsService2 } = await Promise.resolve().then(() => (init_ai_settings(), ai_settings_exports));
      await aiSettingsService2.updateProvider(feature, provider);
      res.json({ success: true, feature, provider });
    } catch (error) {
      console.error("Error updating AI settings:", error);
      res.status(500).json({ message: "Failed to update AI settings" });
    }
  });
  app2.post("/api/admin/ai-settings/test", isAuthenticated, async (req, res) => {
    try {
      const { provider } = req.body;
      if (!["claude", "openai", "deepseek"].includes(provider)) {
        return res.status(400).json({ message: "Invalid provider" });
      }
      const { unifiedAI: unifiedAI2 } = await Promise.resolve().then(() => (init_ai_provider(), ai_provider_exports));
      const result = await unifiedAI2.testProvider(provider);
      if (result.success) {
        res.json({
          success: true,
          provider,
          message: result.message,
          tokensUsed: result.tokensUsed
        });
      } else {
        res.status(500).json({
          success: false,
          provider,
          error: result.message
        });
      }
    } catch (error) {
      console.error(`Error testing ${req.body.provider}:`, error);
      res.status(500).json({
        success: false,
        provider: req.body.provider,
        error: error.message || "Failed to connect to provider"
      });
    }
  });
  app2.get("/api/portal/subscription", requireClientPortalAccess, async (req, res) => {
    try {
      const clientId = req.clientId;
      const subView = await storage.getClientSubscription(clientId);
      if (!subView) {
        return res.json({ subscription: null });
      }
      res.json({
        subscription: {
          id: subView.subscription.id,
          status: subView.subscription.status,
          billingCycle: subView.subscription.billingCycle,
          totalAmount: subView.subscription.totalAmount,
          nextBillingDate: subView.nextBillingDate,
          lastPaymentDate: subView.lastPaymentDate,
          plan: {
            id: subView.plan.id,
            name: subView.plan.name,
            pathway: subView.plan.pathway,
            tierLevel: subView.plan.tierLevel
          },
          addons: subView.addons.map((a) => ({
            id: a.addon.id,
            name: a.addon.name,
            price: a.unitPrice,
            quantity: a.quantity
          }))
        }
      });
    } catch (error) {
      console.error("Error fetching portal subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });
  app2.get("/api/portal/billing-history", requireClientPortalAccess, async (req, res) => {
    try {
      const clientId = req.clientId;
      const history = await storage.getClientBillingHistory(clientId, 24);
      res.json({
        billingHistory: history.map((tx) => ({
          id: tx.id,
          amount: tx.amount,
          status: tx.status,
          billingDate: tx.billingDate,
          paidDate: tx.paidDate,
          invoiceNumber: tx.invoiceNumber
        }))
      });
    } catch (error) {
      console.error("Error fetching portal billing history:", error);
      res.status(500).json({ message: "Failed to fetch billing history" });
    }
  });
  app2.get("/api/portal/prescriptions/token/:token", async (req, res) => {
    try {
      const { token } = req.params;
      if (!token || token.length !== 64) {
        return res.status(400).json({ message: "Invalid prescription token" });
      }
      const [prescription] = await db.select().from(prescriptions).where(eq32(prescriptions.accessToken, token)).limit(1);
      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }
      const assessment = prescription.assessmentId ? await storage.getAssessment(prescription.assessmentId) : null;
      const recommendations2 = prescription.assessmentId ? await storage.getRecommendationsByAssessmentId(prescription.assessmentId) : [];
      if (!prescription.viewedAt) {
        await db.update(prescriptions).set({ viewedAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }).where(eq32(prescriptions.id, prescription.id));
      }
      res.json({
        prescription: {
          id: prescription.id,
          title: prescription.title,
          summary: prescription.summary,
          status: prescription.status,
          implementationProgress: prescription.implementationProgress,
          deliveredAt: prescription.deliveredAt,
          createdAt: prescription.createdAt
        },
        assessment: assessment ? {
          id: assessment.id,
          businessName: assessment.businessName,
          digitalScore: assessment.digitalScore,
          industry: assessment.industry,
          createdAt: assessment.createdAt
        } : null,
        recommendations: recommendations2
      });
    } catch (error) {
      console.error("Error fetching prescription by token:", error);
      res.status(500).json({ message: "Failed to fetch prescription" });
    }
  });
  app2.get("/api/portal/prescriptions", requireClientPortalAccess, async (req, res) => {
    try {
      const clientEmail = req.clientEmail;
      const [client2] = await db.select().from(clients).where(eq32(clients.email, clientEmail)).limit(1);
      if (!client2) {
        return res.json({ prescriptions: [] });
      }
      const clientPrescriptions = await db.select({
        prescription: prescriptions
      }).from(prescriptions).where(eq32(prescriptions.clientId, client2.id)).orderBy(desc15(prescriptions.createdAt));
      const { assessments: assessmentsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const assessmentPrescriptions = await db.select({
        prescription: prescriptions,
        assessment: assessmentsTable
      }).from(prescriptions).innerJoin(assessmentsTable, eq32(prescriptions.assessmentId, assessmentsTable.id)).where(eq32(assessmentsTable.email, clientEmail)).orderBy(desc15(prescriptions.createdAt));
      const allPrescriptions = [
        ...clientPrescriptions.map((p) => p.prescription),
        ...assessmentPrescriptions.map((p) => p.prescription)
      ];
      const uniquePrescriptions = allPrescriptions.filter(
        (p, index2, self) => index2 === self.findIndex((t) => t.id === p.id)
      );
      res.json({ prescriptions: uniquePrescriptions });
    } catch (error) {
      console.error("Error fetching client prescriptions:", error);
      res.status(500).json({ message: "Failed to fetch prescriptions" });
    }
  });
  app2.get("/api/portal/prescriptions/:id", requireClientPortalAccess, async (req, res) => {
    try {
      const prescriptionId = parseInt(req.params.id);
      const clientEmail = req.clientEmail;
      if (isNaN(prescriptionId)) {
        return res.status(400).json({ message: "Invalid prescription ID" });
      }
      const [prescription] = await db.select().from(prescriptions).where(eq32(prescriptions.id, prescriptionId)).limit(1);
      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }
      let hasAccess = false;
      const [client2] = await db.select().from(clients).where(eq32(clients.email, clientEmail)).limit(1);
      if (client2 && prescription.clientId === client2.id) {
        hasAccess = true;
      }
      if (!hasAccess && prescription.assessmentId) {
        const assessment2 = await storage.getAssessment(prescription.assessmentId);
        if (assessment2 && assessment2.email === clientEmail) {
          hasAccess = true;
        }
      }
      if (!hasAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      const assessment = prescription.assessmentId ? await storage.getAssessment(prescription.assessmentId) : null;
      const recommendations2 = prescription.assessmentId ? await storage.getRecommendationsByAssessmentId(prescription.assessmentId) : [];
      if (!prescription.viewedAt) {
        await db.update(prescriptions).set({ viewedAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }).where(eq32(prescriptions.id, prescription.id));
      }
      res.json({
        prescription,
        assessment: assessment ? {
          id: assessment.id,
          businessName: assessment.businessName,
          digitalScore: assessment.digitalScore,
          industry: assessment.industry,
          analysisResults: assessment.analysisResults,
          createdAt: assessment.createdAt
        } : null,
        recommendations: recommendations2
      });
    } catch (error) {
      console.error("Error fetching prescription:", error);
      res.status(500).json({ message: "Failed to fetch prescription" });
    }
  });
  app2.patch("/api/portal/prescriptions/:id/progress", requireClientPortalAccess, async (req, res) => {
    try {
      const prescriptionId = parseInt(req.params.id);
      const { implementationProgress } = req.body;
      const clientEmail = req.clientEmail;
      if (isNaN(prescriptionId)) {
        return res.status(400).json({ message: "Invalid prescription ID" });
      }
      if (typeof implementationProgress !== "number" || implementationProgress < 0 || implementationProgress > 100) {
        return res.status(400).json({ message: "Progress must be a number between 0 and 100" });
      }
      const [prescription] = await db.select().from(prescriptions).where(eq32(prescriptions.id, prescriptionId)).limit(1);
      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }
      let hasAccess = false;
      const [client2] = await db.select().from(clients).where(eq32(clients.email, clientEmail)).limit(1);
      if (client2 && prescription.clientId === client2.id) {
        hasAccess = true;
      }
      if (!hasAccess && prescription.assessmentId) {
        const assessment = await storage.getAssessment(prescription.assessmentId);
        if (assessment && assessment.email === clientEmail) {
          hasAccess = true;
        }
      }
      if (!hasAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      const [updated] = await db.update(prescriptions).set({
        implementationProgress,
        status: implementationProgress === 100 ? "completed" : "in_progress",
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq32(prescriptions.id, prescriptionId)).returning();
      res.json(updated);
    } catch (error) {
      console.error("Error updating prescription progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
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
        "53947@triadblue.com",
        "53947@businessblueprint.io",
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
        const existingCrmContact = await db.select().from(crmContacts).where(eq32(crmContacts.email, client2.email)).limit(1);
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
            await db.update(crmContacts).set({ clientId: client2.id, updatedAt: /* @__PURE__ */ new Date() }).where(eq32(crmContacts.id, existingCrmContact[0].id));
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
      req.session.isAdmin = client2.isAdmin || false;
      console.log("[Magic Link Verify] Session set for client ID:", client2.id, "isAdmin:", client2.isAdmin);
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
      const [dashboardRecord] = await db.select().from(dashboardAccess).where(eq32(dashboardAccess.accessToken, token));
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
      const autoAccounts = {
        "53947@triadblue.com": { companyName: "TriadBlue Inc.", isAdmin: true },
        "53947@businessblueprint.io": { companyName: "BusinessBlueprint User" },
        "demo@businessblueprint.io": { companyName: "Demo Restaurant" },
        "test@businessblueprint.io": { companyName: "Test Business" },
        "agency@businessblueprint.io": { companyName: "Social Media Agency" }
      };
      let client2 = await storage.getClientByEmail(normalizedEmail);
      if (!client2 && autoAccounts[normalizedEmail]) {
        const acct = autoAccounts[normalizedEmail];
        client2 = await storage.createClient({
          companyName: acct.companyName,
          email: normalizedEmail,
          accountStatus: "active",
          ...acct.isAdmin && { isAdmin: true }
        });
        console.log(
          `[Login] Auto-created account: ${normalizedEmail} (ID: ${client2.id}, admin: ${!!acct.isAdmin})`
        );
      }
      if (client2 && autoAccounts[normalizedEmail]?.isAdmin && !client2.isAdmin) {
        await db.update(clients).set({ isAdmin: true }).where(eq32(clients.id, client2.id));
        client2 = { ...client2, isAdmin: true };
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
        "53947@triadblue.com",
        "53947@businessblueprint.io",
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
  app2.get("/api/client/list/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      const rows = await db.select().from(businessListings).where(eq32(businessListings.clientId, clientId));
      const total = rows.length;
      const verified = rows.filter((r) => r.status === "active").length;
      const pending = rows.filter((r) => r.status === "pending").length;
      const platforms = rows.map((r) => ({
        name: platformDisplayName(r.platform),
        status: r.status === "active" ? "verified" : r.status,
        url: r.url || "#"
      }));
      res.json({ total, verified, pending, platforms });
    } catch (error) {
      console.error("Client list error:", error);
      res.status(500).json({ error: "Failed to load list data" });
    }
  });
  app2.get(
    "/api/clients/:id/list",
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
        const rows = await db.select().from(businessListings).where(eq32(businessListings.clientId, clientId)).orderBy(desc15(businessListings.updatedAt));
        const listings = rows.map((r) => ({
          id: r.id,
          platform: platformDisplayName(r.platform),
          status: r.status,
          name: r.name,
          address: r.address,
          phone: r.phone,
          website: r.website,
          hours: r.hours,
          lastUpdated: r.updatedAt?.toISOString() || r.createdAt?.toISOString(),
          url: r.url,
          rating: r.rating ? parseFloat(r.rating) : null
        }));
        res.json(listings);
      } catch (error) {
        console.error("Error fetching client listings:", error);
        res.status(500).json({ error: "Failed to fetch list" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/list/metrics",
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
        const rows = await db.select().from(businessListings).where(eq32(businessListings.clientId, clientId));
        const totalListings = rows.length;
        const activeListings = rows.filter((r) => r.status === "active").length;
        const pendingListings = rows.filter((r) => r.status === "pending").length;
        const errorListings = rows.filter((r) => r.status === "error").length;
        const ratingsWithValues = rows.filter((r) => r.rating !== null).map((r) => parseFloat(r.rating));
        const avgRating = ratingsWithValues.length > 0 ? parseFloat(
          (ratingsWithValues.reduce((a, b) => a + b, 0) / ratingsWithValues.length).toFixed(1)
        ) : 0;
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3);
        const metricsRows = await db.select().from(listingMetricsSnapshots).where(
          and20(
            eq32(listingMetricsSnapshots.clientId, clientId),
            lte2(sql11`${listingMetricsSnapshots.periodStart}`, /* @__PURE__ */ new Date())
          )
        );
        const recentMetrics = metricsRows.filter(
          (m) => m.periodStart >= thirtyDaysAgo
        );
        const totalViews = recentMetrics.reduce((sum, m) => sum + (m.views || 0), 0);
        const totalClicks = recentMetrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
        res.json({
          totalListings,
          activeListings,
          pendingListings,
          errorListings,
          totalViews,
          totalClicks,
          avgRating
        });
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
        const reviews = await reviewSyncService.getClientReviews(clientId);
        res.json(
          reviews.map((r) => ({
            id: r.id,
            platform: r.platform.charAt(0).toUpperCase() + r.platform.slice(1),
            rating: r.rating,
            reviewText: r.reviewText || "",
            reviewerName: r.reviewerName,
            reviewDate: r.reviewDate.toISOString(),
            response: r.response || void 0,
            responseDate: r.responseDate?.toISOString() || void 0,
            sentiment: r.sentiment || "neutral"
          }))
        );
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
        const analytics = await reviewSyncService.getClientReviewAnalytics(clientId);
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
      let isAI = false;
      if (useAI && !response) {
        try {
          const { reviewAI: reviewAI2 } = await Promise.resolve().then(() => (init_reviewAI(), reviewAI_exports));
          reviewResponse = await reviewAI2.generateReviewResponse({
            reviewText: response || "",
            rating: 5,
            platform: "google",
            businessName: client2.companyName || "our business"
          });
          isAI = true;
        } catch {
          reviewResponse = "Thank you for your feedback! We truly appreciate your business and are committed to providing excellent service.";
          isAI = true;
        }
      }
      await reviewSyncService.respondToReview(reviewId, reviewResponse, isAI);
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
  app2.post(
    "/api/clients/:id/reviews/sync",
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
        const businessName = client2.companyName || "";
        if (!businessName) {
          return res.status(400).json({ error: "Client has no business name set" });
        }
        const result = await reviewSyncService.syncClientReviews(
          clientId,
          businessName,
          client2.address || void 0,
          client2.phone || void 0
        );
        res.json({
          success: true,
          ...result
        });
      } catch (error) {
        console.error("Error syncing reviews:", error);
        res.status(500).json({ error: "Failed to sync reviews" });
      }
    }
  );
  app2.post(
    "/api/clients/:id/analytics/sync",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }
        const result = await analyticsSyncService.syncClientAnalytics(clientId);
        res.json({ success: true, ...result });
      } catch (error) {
        console.error("Error syncing analytics:", error);
        res.status(500).json({ error: "Failed to sync analytics" });
      }
    }
  );
  app2.get(
    "/api/clients/:id/analytics/summary",
    requireClientPortalAccess,
    async (req, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }
        const summary = await analyticsSyncService.getClientAnalyticsSummary(clientId);
        res.json(summary);
      } catch (error) {
        console.error("Error fetching analytics summary:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
      }
    }
  );
  app2.post("/api/clients/:id/list", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      const { platform, name, address, phone, website, hours, url } = req.body;
      if (!platform || !name) {
        return res.status(400).json({ error: "Platform and name are required" });
      }
      const [listing] = await db.insert(businessListings).values({
        clientId,
        platform: platformInternalName(platform),
        name,
        address: address || null,
        phone: phone || null,
        website: website || null,
        hours: hours || null,
        url: url || null,
        source: "manual",
        status: "pending"
      }).returning();
      res.json({
        success: true,
        listing: {
          id: listing.id,
          platform: platformDisplayName(listing.platform),
          status: listing.status,
          name: listing.name,
          address: listing.address,
          phone: listing.phone,
          website: listing.website,
          hours: listing.hours,
          lastUpdated: listing.createdAt?.toISOString(),
          url: listing.url
        }
      });
    } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  });
  app2.post("/api/clients/:id/list/sync", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }
      const client2 = await storage.getClient(clientId);
      if (!client2) {
        return res.status(404).json({ error: "Client not found" });
      }
      const businessName = client2.companyName || "";
      if (!businessName) {
        return res.status(400).json({ error: "Client has no business name set" });
      }
      const [syncLog] = await db.insert(listingSyncLogs).values({
        clientId,
        syncType: "discovery",
        status: "started",
        platformsScanned: ["google_business", "yelp"]
      }).returning();
      const result = await listingSyncService.syncClientListings(
        clientId,
        businessName,
        client2.address || void 0,
        client2.phone || void 0
      );
      try {
        await reviewSyncService.syncClientReviews(
          clientId,
          businessName,
          client2.address || void 0,
          client2.phone || void 0
        );
      } catch (reviewErr) {
        console.error("Review sync error (non-blocking):", reviewErr);
      }
      await db.update(listingSyncLogs).set({
        status: result.errors.length > 0 && result.found === 0 ? "failed" : "completed",
        listingsFound: result.found,
        listingsCreated: result.created,
        listingsUpdated: result.updated,
        errors: result.errors.length > 0 ? result.errors : null,
        completedAt: /* @__PURE__ */ new Date()
      }).where(eq32(listingSyncLogs.id, syncLog.id));
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error("Error syncing listings:", error);
      res.status(500).json({ error: "Failed to sync listings" });
    }
  });
  app2.patch("/api/clients/:id/list/:listingId", async (req, res) => {
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
      const [existing] = await db.select().from(businessListings).where(
        and20(
          eq32(businessListings.id, listingId),
          eq32(businessListings.clientId, clientId)
        )
      ).limit(1);
      if (!existing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      const parsed = updateBusinessListingSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid update data", details: parsed.error.issues });
      }
      const updates = { ...parsed.data, updatedAt: /* @__PURE__ */ new Date() };
      await db.update(businessListings).set(updates).where(eq32(businessListings.id, listingId));
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
  registerSubscriptionRoutes(app2, emailService);
  registerSendRoutes(app2);
  registerOptimizeRoutes(app2);
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
  app2.use("/api/post", content_default);
  app2.use("/api/meta", meta_default);
  app2.use("/api/google", google_default);
  app2.use("/api/tasks", isAuthenticated, tasksRouter);
  app2.use("/api/brand-colors", brand_colors_default);
  registerBillingAdminRoutes(app2);
  registerEmailAdminRoutes(app2);
  registerPaymentRoutes(app2);
  app2.use("/api/crm", crmRouter);
  app2.use("/api/chat", chatRouter);
  app2.use("/api/v1", publicApiRouter);
  app2.use(aiCoachRouter);
  app2.use("/api", listingDistributionRouter);
  app2.post("/api/admin/test-emails", async (req, res) => {
    try {
      const { email, assessmentId } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email address is required" });
      }
      let testData = {
        businessName: "Demo Business",
        digitalScore: 65,
        assessmentId: assessmentId || 1,
        summary: "Your business shows strong potential but has room for improvement in digital presence.",
        recommendations: [
          { category: "Email & SMS Marketing", title: "Start email campaigns", description: "Begin collecting emails and sending regular newsletters", priority: "high", productId: "send" },
          { category: "Social Media Content", title: "Increase posting frequency", description: "Post 3-5 times per week on social media", priority: "high", productId: "content" },
          { category: "Reputation Management", title: "Respond to reviews", description: "Reply to all customer reviews within 24 hours", priority: "medium", productId: "reputation" }
        ]
      };
      if (assessmentId) {
        const assessment = await storage.getAssessment(Number(assessmentId));
        if (assessment) {
          testData = {
            businessName: assessment.businessName,
            digitalScore: assessment.digitalScore || 65,
            assessmentId: assessment.id,
            summary: assessment.analysisResults?.summary || testData.summary,
            recommendations: assessment.analysisResults?.recommendations || testData.recommendations
          };
        }
      }
      console.log(`[Test Email] Sending test emails to ${email}...`);
      const reportSent = await emailService.sendAssessmentReport(email, testData);
      console.log(`[Test Email] Assessment Report: ${reportSent ? "SENT" : "FAILED"}`);
      const coachSent = await emailService.sendThankYouIntroduction(email, {
        businessName: testData.businessName,
        assessmentId: testData.assessmentId
      });
      console.log(`[Test Email] Coach Blue Intro: ${coachSent ? "SENT" : "FAILED"}`);
      res.json({
        success: true,
        results: {
          assessmentReport: reportSent,
          coachBlueIntro: coachSent
        },
        message: `Test emails sent to ${email}`
      });
    } catch (error) {
      console.error("[Test Email] Error:", error);
      res.status(500).json({ error: "Failed to send test emails" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
async function processAssessmentAsync(assessmentId, googleService, aiService, emailService, storage2) {
  console.log(`[Assessment Pipeline] \u25B6\uFE0F STARTING background processing for assessment ID: ${assessmentId}`);
  const startTime = Date.now();
  const logStep = (step, message) => {
    const elapsed = ((Date.now() - startTime) / 1e3).toFixed(1);
    console.log(`[Assessment Pipeline] [${elapsed}s] ${step}: ${message}`);
  };
  try {
    logStep("Step 1", "Updating status to 'analyzing'...");
    await storage2.updateAssessment(assessmentId, { status: "analyzing" });
    const assessment = await storage2.getAssessment(assessmentId);
    if (!assessment) throw new Error("Assessment not found");
    logStep("Step 1", `\u2705 Assessment loaded: ${assessment.businessName} (${assessment.email})`);
    if (assessment.website) {
      logStep("Step 1.5", `\u{1F50D} Starting ScansBlue Fast Check for ${assessment.website}...`);
      (async () => {
        try {
          const fastCheckResult = await scansBlueService.runFastCheck(assessment.website);
          if (fastCheckResult && fastCheckResult.success) {
            const r = fastCheckResult.results;
            await db.insert(scansBlueResults).values({
              assessmentId,
              url: assessment.website,
              type: "fast_check",
              status: "completed",
              overallScore: r.summary?.overallScore || 0,
              sslPresent: r.ssl?.present || false,
              sslValid: r.ssl?.valid || false,
              sslIssuer: r.ssl?.issuer || null,
              sslExpiresIn: r.ssl?.expiresIn || null,
              loadTime: String(r.performance?.loadTime || 0),
              performanceScore: r.performance?.score || 0,
              mobileOptimized: r.mobile?.optimized || false,
              mobileScore: r.mobile?.score || 0,
              criticalIssues: r.criticalIssues ? JSON.stringify(r.criticalIssues) : null,
              requestedAt: /* @__PURE__ */ new Date(),
              completedAt: /* @__PURE__ */ new Date()
            });
            console.log(`[ScansBlue] Fast Check completed and saved for assessment ${assessmentId}`);
          }
        } catch (error) {
          console.error("[ScansBlue] Fast Check error (non-blocking):", error);
        }
      })();
    }
    logStep("Step 2", `\u{1F50D} Starting presence scan for ${assessment.businessName}...`);
    const presenceScan = await presenceScannerService.scanBusiness({
      businessName: assessment.businessName,
      website: assessment.website || void 0,
      phone: assessment.phone,
      address: assessment.address
    });
    logStep("Step 2", `\u2705 Presence scan complete`);
    const operationalScore = presenceScannerService.calculateOperationalScore({
      collectsEmails: assessment.collectsEmails,
      lastEmailCampaign: assessment.lastEmailCampaign,
      emailListSize: assessment.emailListSize,
      sendsSMS: assessment.sendsSMS,
      lastSMSCampaign: assessment.lastSMSCampaign,
      lastSocialPost: assessment.lastSocialPost,
      socialPostFrequency: assessment.socialPostFrequency,
      socialContentCreator: assessment.socialContentCreator,
      lastReviewResponse: assessment.lastReviewResponse,
      reviewResponseRate: assessment.reviewResponseRate,
      lastNewReview: assessment.lastNewReview,
      inquiryResponseTime: assessment.inquiryResponseTime,
      hasUnifiedInbox: assessment.hasUnifiedInbox,
      missedInquiries: assessment.missedInquiries,
      hasLiveChat: assessment.hasLiveChat,
      lastChatConversation: assessment.lastChatConversation,
      chatResponseTime: assessment.chatResponseTime,
      lastListingUpdate: assessment.lastListingUpdate,
      listingConsistency: assessment.listingConsistency,
      lastGBPPost: assessment.lastGBPPost,
      lastGBPPhoto: assessment.lastGBPPhoto,
      lastWebsiteUpdate: assessment.lastWebsiteUpdate,
      hasBlog: assessment.hasBlog,
      usesCRM: assessment.usesCRM,
      crmPlatform: assessment.crmPlatform,
      lastCRMFollowup: assessment.lastCRMFollowup,
      hasAutomation: assessment.hasAutomation
    });
    const scanScore = presenceScan.overall.digitalIQScore;
    const combinedDigitalIQ = presenceScannerService.calculateCombinedDigitalIQ(scanScore, operationalScore);
    console.log(`\u{1F4CA} Final Digital IQ: Scan=${scanScore}/70 + Operational=${operationalScore}/70 = ${combinedDigitalIQ}/140`);
    const enhancedPresenceScan = {
      ...presenceScan,
      overall: {
        ...presenceScan.overall,
        digitalIQScore: combinedDigitalIQ,
        // Combined 0-140 score for backward compatibility
        scanScore,
        // Scan-only 0-70
        operationalScore
        // Operational-only 0-70
      }
    };
    const googleData = await googleService.searchBusiness(
      assessment.businessName,
      assessment.address
    );
    const presenceScore = {
      overallScore: combinedDigitalIQ,
      // Use combined score (scan + operational)
      scanScore,
      // Scan-only score (0-70)
      operationalScore,
      // Operational-only score (0-70)
      scores: {
        visibility: Math.round(
          enhancedPresenceScan.directories.score * 0.7 + enhancedPresenceScan.website.score * 0.3
        ),
        reviews: enhancedPresenceScan.reviews.score,
        completeness: enhancedPresenceScan.overall.completeness,
        engagement: enhancedPresenceScan.socialMedia.score
      },
      insights: enhancedPresenceScan.recommendations
    };
    logStep("Step 4", "Generating product recommendations...");
    const productRecommendations = await productRecommendationService.generateRecommendations(assessmentId, {
      visibility: presenceScore.scores.visibility,
      reviews: presenceScore.scores.reviews,
      completeness: presenceScore.scores.completeness,
      engagement: presenceScore.scores.engagement,
      overall: presenceScore.overallScore
    });
    logStep("Step 4", `\u2705 Generated ${productRecommendations.length} product recommendations`);
    await productRecommendationService.saveRecommendations(
      assessmentId,
      productRecommendations
    );
    logStep("Step 5", "\u{1F916} Starting AI analysis (this may take 30-60 seconds)...");
    let analysisResult = null;
    let aiAnalysisFailed = false;
    try {
      analysisResult = await aiService.analyzeBusinessPresence({
        businessInfo: {
          name: assessment.businessName,
          industry: assessment.industry,
          location: assessment.location,
          website: assessment.website || void 0
        },
        googleData,
        presenceScore
      });
      logStep("Step 5", `\u2705 AI analysis complete - summary length: ${analysisResult.summary?.length || 0} chars`);
    } catch (aiError) {
      aiAnalysisFailed = true;
      logStep("Step 5", `\u26A0\uFE0F AI analysis failed - using fallback data. Error: ${aiError}`);
      console.error("[Assessment Pipeline] AI analysis error (using fallback):", aiError);
      analysisResult = {
        summary: `Based on our automated scan of ${assessment.businessName}, we identified ${productRecommendations.length} opportunities to improve your digital presence. Your Digital IQ Score is ${combinedDigitalIQ}/140.`,
        recommendations: productRecommendations.map((rec) => ({
          category: rec.category || "digital_presence",
          title: rec.title || rec.productName || "Recommendation",
          description: rec.description || rec.reason || "Improve your digital presence",
          priority: rec.priority || "medium",
          estimatedImpact: rec.impact || "moderate",
          estimatedEffort: "medium",
          productId: rec.productId?.toLowerCase?.() || rec.productId,
          // Normalize to lowercase
          bundleId: rec.bundleId?.toLowerCase?.() || rec.bundleId
        })),
        strengths: [],
        weaknesses: enhancedPresenceScan.recommendations || []
        // Keep as string array
      };
    }
    const aiRecs = Array.isArray(analysisResult?.recommendations) ? analysisResult.recommendations : [];
    const scanRecs = Array.isArray(enhancedPresenceScan?.recommendations) ? enhancedPresenceScan.recommendations : [];
    const allRecs = [
      ...aiRecs,
      ...scanRecs.map((rec) => ({
        category: "digital_presence",
        title: rec,
        description: rec,
        priority: "medium",
        estimatedImpact: "moderate",
        estimatedEffort: "low"
      }))
    ];
    const seenProductIds = /* @__PURE__ */ new Set();
    const seenTitles = /* @__PURE__ */ new Set();
    const dedupedRecommendations = allRecs.filter((rec) => {
      if (rec.productId) {
        const normalizedId = rec.productId.toLowerCase();
        if (seenProductIds.has(normalizedId)) return false;
        seenProductIds.add(normalizedId);
        rec.productId = normalizedId;
      }
      if (rec.bundleId) {
        rec.bundleId = rec.bundleId.toLowerCase();
      }
      const titleKey = rec.title?.toLowerCase();
      if (titleKey) {
        if (seenTitles.has(titleKey)) return false;
        seenTitles.add(titleKey);
      }
      return true;
    });
    const enhancedAnalysis = {
      ...analysisResult,
      aiAnalysisFailed,
      // Flag to indicate if we used fallback
      digitalScore: combinedDigitalIQ,
      // Use combined score (scan + operational)
      scanScore,
      // Scan-only score (0-70)
      operationalScore,
      // Operational-only score (0-70)
      presenceScan: enhancedPresenceScan,
      // Include complete scan results with proper scores
      scanDate: enhancedPresenceScan.overall.lastScanned,
      recommendations: dedupedRecommendations
    };
    await storage2.updateAssessment(assessmentId, {
      googleBusinessData: googleData,
      analysisResults: enhancedAnalysis,
      digitalScore: combinedDigitalIQ,
      // Use combined score (scan + operational)
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
        estimatedEffort: rec.estimatedEffort || "low",
        productId: rec.productId || null,
        // String product ID from catalog (inbox, send, etc.)
        bundleId: rec.bundleId || null
        // String bundle ID if applicable (commverse, localblue)
      });
    }
    const highPriorityCount = enhancedAnalysis.recommendations.filter(
      (r) => r.priority === "high"
    ).length;
    const prescriptionSummary = `
Based on your Digital IQ Score of ${combinedDigitalIQ}/140 (Scan: ${scanScore}/70, Operations: ${operationalScore}/70), we've identified ${enhancedAnalysis.recommendations.length} key opportunities to improve your online presence.

${enhancedAnalysis.summary}

Focus on the ${highPriorityCount} high-priority recommendations first for maximum impact.
`.trim();
    try {
      const accessToken = randomBytes(32).toString("hex");
      const client2 = await storage2.getClientByEmail(assessment.email);
      if (!client2) {
        console.error(`[Assessment] Cannot create prescription - client not found for ${assessment.email}`);
      } else {
        const [prescription] = await db.insert(prescriptions).values({
          clientId: client2.id,
          assessmentId,
          title: `Digital Growth Prescription for ${assessment.businessName}`,
          summary: prescriptionSummary,
          accessToken,
          status: "delivered",
          implementationProgress: 0,
          deliveredAt: /* @__PURE__ */ new Date()
        }).returning();
        console.log(`[Assessment] Created prescription ID ${prescription.id} with token ${accessToken.substring(0, 8)}... for assessment ${assessmentId}`);
      }
    } catch (prescriptionError) {
      console.error("[Assessment] Error creating prescription:", prescriptionError);
    }
    logStep("Step 7", `\u{1F4E7} Sending Digital IQ Report email to ${assessment.email}...`);
    try {
      let fastCheckData = void 0;
      try {
        const fastCheckResult = await db.query.scansBlueResults?.findFirst({
          where: (results, { eq: eq36, and: and23 }) => and23(
            eq36(results.assessmentId, assessmentId),
            eq36(results.type, "fast_check"),
            eq36(results.status, "completed")
          )
        });
        if (fastCheckResult) {
          fastCheckData = {
            overallScore: fastCheckResult.overallScore || 0,
            performanceScore: fastCheckResult.performanceScore || 0,
            mobileScore: fastCheckResult.mobileScore || 0,
            sslPresent: fastCheckResult.sslPresent || false,
            sslValid: fastCheckResult.sslValid || false,
            criticalIssues: fastCheckResult.criticalIssues ? JSON.parse(fastCheckResult.criticalIssues) : void 0
          };
          logStep("Step 7", `\u2705 Fast Check data found for email (score: ${fastCheckData.overallScore})`);
        }
      } catch (fastCheckError) {
        logStep("Step 7", `\u26A0\uFE0F Could not retrieve Fast Check data: ${fastCheckError}`);
      }
      const emailSent = await emailService.sendAssessmentReport(
        assessment.email,
        {
          businessName: assessment.businessName,
          digitalScore: presenceScan.overall.digitalIQScore,
          summary: `Your Digital IQ Score: ${presenceScan.overall.digitalIQScore}/140. ${enhancedAnalysis.summary}`,
          recommendations: enhancedAnalysis.recommendations,
          assessmentId,
          fastCheck: fastCheckData
        }
      );
      await storage2.updateAssessment(assessmentId, { emailSent });
      logStep("Step 7", `\u2705 Digital IQ Report email ${emailSent ? "SENT" : "FAILED"}`);
    } catch (emailError) {
      logStep("Step 7", `\u274C Digital IQ Report email ERROR: ${emailError}`);
    }
    logStep("Step 8", `\u{1F4E7} Sending Coach Blue email to ${assessment.email}...`);
    try {
      const coachSent = await emailService.sendThankYouIntroduction(assessment.email, {
        businessName: assessment.businessName,
        assessmentId
      });
      logStep("Step 8", `\u2705 Coach Blue email ${coachSent ? "SENT" : "FAILED"}`);
    } catch (coachEmailError) {
      logStep("Step 8", `\u274C Coach Blue email ERROR: ${coachEmailError}`);
    }
    logStep("COMPLETE", `\u2705 Assessment ${assessmentId} fully processed!`);
  } catch (error) {
    const elapsed = ((Date.now() - startTime) / 1e3).toFixed(1);
    console.error(`[Assessment Pipeline] [${elapsed}s] \u274C FATAL ERROR processing assessment ${assessmentId}:`, error);
    let reportSent = false;
    let coachSent = false;
    try {
      const assessment = await storage2.getAssessment(assessmentId);
      if (assessment && assessment.email) {
        console.log(`[Assessment Pipeline] Attempting fallback emails to ${assessment.email}...`);
        try {
          reportSent = await emailService.sendAssessmentReport(
            assessment.email,
            {
              businessName: assessment.businessName,
              digitalScore: assessment.digitalScore || 50,
              summary: `We've completed your Digital IQ Assessment for ${assessment.businessName}. Due to high demand, some advanced analysis features are still processing. You'll receive a follow-up with additional insights shortly.`,
              recommendations: [
                { category: "Email Marketing", title: "Build Your Email List", description: "Start collecting customer emails to build relationships.", priority: "high", productId: "send" },
                { category: "Reputation", title: "Monitor Reviews", description: "Respond to customer reviews to build trust.", priority: "medium", productId: "reputation" },
                { category: "Content", title: "Create Regular Content", description: "Post consistently on social media.", priority: "medium", productId: "content" }
              ],
              assessmentId
            }
          );
          console.log(`[Assessment Pipeline] Fallback report email: ${reportSent ? "SENT" : "FAILED"}`);
        } catch (reportError) {
          console.error(`[Assessment Pipeline] Fallback report email threw:`, reportError);
        }
        try {
          coachSent = await emailService.sendThankYouIntroduction(assessment.email, {
            businessName: assessment.businessName,
            assessmentId
          });
          console.log(`[Assessment Pipeline] Fallback Coach Blue email: ${coachSent ? "SENT" : "FAILED"}`);
        } catch (coachError) {
          console.error(`[Assessment Pipeline] Fallback Coach Blue email threw:`, coachError);
        }
        if (reportSent || coachSent) {
          await storage2.updateAssessment(assessmentId, {
            emailSent: reportSent,
            status: "partial"
          });
        } else {
          await storage2.updateAssessment(assessmentId, { status: "failed" });
        }
      } else {
        await storage2.updateAssessment(assessmentId, { status: "failed" });
      }
    } catch (fallbackError) {
      console.error(`[Assessment Pipeline] Fallback process failed:`, fallbackError);
      try {
        await storage2.updateAssessment(assessmentId, { status: "failed" });
      } catch (updateError) {
        console.error(`[Assessment Pipeline] Could not update status to failed:`, updateError);
      }
    }
  }
}
async function registerInboxRoutes(app2) {
  app2.post("/api/respond/livechat/session", async (req, res) => {
    try {
      const validatedData = insertLivechatSessionSchema.parse(req.body);
      const [session2] = await db.insert(livechatSessions).values({
        ...validatedData,
        status: "active"
      }).returning();
      let crmContactId = null;
      if (validatedData.visitorEmail) {
        try {
          const existing = await db.select().from(crmContacts).where(eq32(crmContacts.email, validatedData.visitorEmail)).limit(1);
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
              sourceApp: "livechat",
              occurredAt: /* @__PURE__ */ new Date()
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
              sourceApp: "livechat",
              occurredAt: /* @__PURE__ */ new Date()
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
      if (error instanceof z9.ZodError) {
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
    "/api/respond/conversations",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const conversations = await db.select().from(inboxConversations).where(eq32(inboxConversations.clientId, clientId)).orderBy(desc15(inboxConversations.updatedAt));
        const conversationsWithMessages = await Promise.all(
          conversations.map(async (conv) => {
            const lastMessage = await db.select().from(inboxMessages2).where(eq32(inboxMessages2.conversationId, conv.id)).orderBy(desc15(inboxMessages2.createdAt)).limit(1);
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
    "/api/respond/conversations/:conversationId/messages",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const conversationId = parseInt(req.params.conversationId);
        const [conversation] = await db.select().from(inboxConversations).where(
          and20(
            eq32(inboxConversations.id, conversationId),
            eq32(inboxConversations.clientId, clientId)
          )
        ).limit(1);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found or access denied" });
        }
        const messages = await db.select().from(inboxMessages2).where(eq32(inboxMessages2.conversationId, conversationId)).orderBy(inboxMessages2.createdAt);
        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
      }
    }
  );
  app2.post(
    "/api/respond/send-message",
    requireAuth,
    async (req, res) => {
      try {
        const clientId = req.clientId;
        const { conversationId, message } = req.body;
        if (!conversationId || !message) {
          return res.status(400).json({ error: "Missing required fields" });
        }
        const [conversation] = await db.select().from(inboxConversations).where(
          and20(
            eq32(inboxConversations.id, conversationId),
            eq32(inboxConversations.clientId, clientId)
          )
        ).limit(1);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found or access denied" });
        }
        const [client2] = await db.select({ companyName: clients.companyName, email: clients.email }).from(clients).where(eq32(clients.id, clientId)).limit(1);
        const agentName = client2?.companyName || "Support";
        const agentEmail = client2?.email || "support@businessblueprint.io";
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
        await db.update(inboxConversations).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq32(inboxConversations.id, conversationId));
        res.json(newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  );
  app2.get("/api/scansblue/results/:assessmentId", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      if (isNaN(assessmentId)) {
        return res.status(400).json({ error: "Invalid assessment ID" });
      }
      const results = await scansBlueService.getResults(assessmentId);
      if (!results) {
        return res.status(404).json({ error: "No ScansBlue results found" });
      }
      res.json(results);
    } catch (error) {
      console.error("Error fetching ScansBlue results:", error);
      res.status(500).json({ error: "Failed to fetch results" });
    }
  });
  app2.post("/api/scansblue/request-report", async (req, res) => {
    try {
      const { url, assessmentId, email } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL required" });
      }
      const result = await scansBlueService.requestFullReport(
        url,
        email,
        assessmentId
      );
      if (!result) {
        return res.status(500).json({ error: "Failed to queue report" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error requesting full report:", error);
      res.status(500).json({ error: "Failed to request report" });
    }
  });
  app2.post("/api/scansblue-webhook", async (req, res) => {
    try {
      const { reportId, status, url, summary, assessmentId, reportData } = req.body;
      console.log(`[Webhook] ScansBlue report ${reportId} status: ${status}`);
      if (status === "completed" && assessmentId) {
        await scansBlueService.updateFullReportStatus(
          assessmentId,
          reportId,
          `https://scansblue.com/reports/${reportId}`,
          status
        );
        const parsedAssessmentId = parseInt(assessmentId);
        const assessment = await storage.getAssessment(parsedAssessmentId);
        if (assessment) {
          const purchase = await db.query.scansBluePurchases?.findFirst({
            where: (purchases, { eq: eq36 }) => eq36(purchases.assessmentId, parsedAssessmentId)
          });
          const customerEmail = purchase?.email || assessment.email;
          if (customerEmail) {
            console.log(`[Webhook] Sending full report email to ${customerEmail}`);
            const emailService = new ResendEmailService();
            await emailService.sendScansBlueFullReport(customerEmail, {
              businessName: assessment.businessName,
              websiteUrl: url || assessment.website || "",
              assessmentId: parsedAssessmentId,
              reportData: reportData || summary || {}
            });
            if (purchase) {
              await db.update(scansBluePurchases).set({ reportDeliveredAt: /* @__PURE__ */ new Date() }).where(eq32(scansBluePurchases.id, purchase.id));
            }
          }
        }
      }
      res.json({ success: true, received: true });
    } catch (error) {
      console.error("[Webhook] Error processing ScansBlue webhook:", error);
      res.status(500).json({ success: false, error: "Webhook processing failed" });
    }
  });
  app2.post("/api/coach-blue/technical-analysis", async (req, res) => {
    try {
      const { message, context } = req.body;
      const result = await scansBlueService.chatWithAuditor(message, context);
      if (!result) {
        return res.status(500).json({ error: "Analysis failed" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error in technical analysis:", error);
      res.status(500).json({ error: "Analysis failed" });
    }
  });
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
import { nanoid as nanoid3 } from "nanoid";
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
        `src="/src/main.tsx?v=${nanoid3()}"`
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
import { eq as eq33, and as and21 } from "drizzle-orm";
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
          await db.update(livechatSessions).set({ conversationId }).where(eq33(livechatSessions.sessionId, data.sessionId));
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
          unreadCount: db.$count(inboxMessages2, eq33(inboxMessages2.conversationId, conversationId)),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq33(inboxConversations.id, conversationId));
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
        const [conversation] = await db.select().from(inboxConversations).where(eq33(inboxConversations.id, data.conversationId)).limit(1);
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
        }).where(eq33(inboxConversations.id, data.conversationId));
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
          and21(
            eq33(inboxMessages2.conversationId, data.conversationId),
            eq33(inboxMessages2.direction, "inbound")
          )
        );
        await db.update(inboxConversations).set({ unreadCount: 0 }).where(eq33(inboxConversations.id, data.conversationId));
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
        const [session2] = await db.select().from(livechatSessions).where(eq33(livechatSessions.sessionId, sessionId)).limit(1);
        if (session2 && session2.conversationId) {
          const messages = await db.select().from(inboxMessages2).where(eq33(inboxMessages2.conversationId, session2.conversationId)).orderBy(inboxMessages2.createdAt);
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

// server/routes/stripe-webhook.ts
init_db();
init_schema();
import { eq as eq34 } from "drizzle-orm";
var scansBlueService2 = new ScansBlueService();
async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    console.error("[Payment Webhook] No signature provided");
    return res.status(400).json({ error: "No signature" });
  }
  let event;
  try {
    event = paymentService.verifyWebhook(req.body, sig);
  } catch (err) {
    console.error("[Payment Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }
  console.log(`[Payment Webhook] Received event: ${event.type}`);
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session2 = event.data.object;
        await handleCheckoutCompleted(session2);
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`[Payment Webhook] Payment succeeded: ${paymentIntent.id}`);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log(`[Payment Webhook] Payment failed: ${paymentIntent.id}`);
        await handlePaymentFailed(paymentIntent);
        break;
      }
      default:
        console.log(`[Payment Webhook] Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
  } catch (error) {
    console.error("[Payment Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
async function handleCheckoutCompleted(session2) {
  const { metadata } = session2;
  if (!metadata?.type || metadata.type !== "scansblue_full_report") {
    console.log("[Payment Webhook] Not a ScansBlue purchase, skipping");
    return;
  }
  const assessmentId = metadata.assessmentId ? parseInt(metadata.assessmentId) : null;
  const websiteUrl = metadata.websiteUrl || "";
  console.log(`[Payment Webhook] Processing ScansBlue Full Report purchase for assessment ${assessmentId}`);
  if (!assessmentId) {
    console.error("[Payment Webhook] No assessmentId in metadata");
    return;
  }
  try {
    const existingPurchase = await db.query.scansBluePurchases?.findFirst({
      where: (purchases, { eq: eq36 }) => eq36(purchases.transactionId, session2.id)
    });
    if (existingPurchase) {
      console.log(`[Payment Webhook] Purchase already recorded for session ${session2.id}`);
      return;
    }
    await db.insert(scansBluePurchases).values({
      assessmentId,
      paymentProvider: "stripe",
      transactionId: session2.id,
      paymentIntentId: typeof session2.payment_intent === "string" ? session2.payment_intent : session2.payment_intent?.id || null,
      amount: session2.amount_total || 1e3,
      status: "paid",
      email: session2.customer_email || null,
      purchasedAt: /* @__PURE__ */ new Date()
    });
    console.log(`[Payment Webhook] Purchase recorded for assessment ${assessmentId}`);
    const assessment = await db.query.assessments.findFirst({
      where: (assessments3, { eq: eq36 }) => eq36(assessments3.id, assessmentId)
    });
    if (!assessment) {
      console.error(`[Payment Webhook] Assessment ${assessmentId} not found`);
      return;
    }
    const targetUrl = websiteUrl || assessment.website;
    const customerEmail = session2.customer_email || assessment.email;
    if (!targetUrl) {
      console.error("[Payment Webhook] No website URL available for full report");
      return;
    }
    await db.insert(scansBlueResults).values({
      assessmentId,
      url: targetUrl,
      type: "full_report",
      status: "processing",
      requestedAt: /* @__PURE__ */ new Date()
    });
    console.log(`[Payment Webhook] Requesting full report for ${targetUrl}`);
    const reportResult = await scansBlueService2.requestFullReport(
      targetUrl,
      customerEmail || void 0,
      assessmentId
    );
    if (reportResult) {
      console.log(`[Payment Webhook] Full report queued: ${reportResult.reportId}`);
      setTimeout(async () => {
        try {
          await checkAndDeliverReport(assessmentId, customerEmail || void 0, targetUrl);
        } catch (error) {
          console.error("[Payment Webhook] Error in delayed report check:", error);
        }
      }, 3 * 60 * 1e3);
    }
  } catch (error) {
    console.error("[Payment Webhook] Error handling checkout completed:", error);
    throw error;
  }
}
async function handlePaymentFailed(paymentIntent) {
  console.log(`[Payment Webhook] Payment failed for ${paymentIntent.id}`);
  try {
    const existingPurchase = await db.query.scansBluePurchases?.findFirst({
      where: (purchases, { eq: eq36 }) => eq36(purchases.paymentIntentId, paymentIntent.id)
    });
    if (existingPurchase) {
      await db.update(scansBluePurchases).set({ status: "failed" }).where(eq34(scansBluePurchases.id, existingPurchase.id));
      console.log(`[Payment Webhook] Updated purchase ${existingPurchase.id} to failed status`);
    }
  } catch (error) {
    console.error("[Payment Webhook] Error updating failed payment:", error);
  }
}
async function checkAndDeliverReport(assessmentId, email, websiteUrl) {
  try {
    const result = await db.query.scansBlueResults?.findFirst({
      where: (results, { eq: eq36, and: and23 }) => and23(
        eq36(results.assessmentId, assessmentId),
        eq36(results.type, "full_report")
      )
    });
    if (result && result.status === "completed" && email) {
      console.log(`[Payment Webhook] Sending full report email to ${email}`);
      const purchase = await db.query.scansBluePurchases?.findFirst({
        where: (purchases, { eq: eq36 }) => eq36(purchases.assessmentId, assessmentId)
      });
      if (purchase) {
        await db.update(scansBluePurchases).set({ reportDeliveredAt: /* @__PURE__ */ new Date() }).where(eq34(scansBluePurchases.id, purchase.id));
      }
    }
  } catch (error) {
    console.error("[Payment Webhook] Error checking/delivering report:", error);
  }
}

// server/index.ts
var app = express2();
app.post(
  "/api/stripe/webhook",
  express2.raw({ type: "application/json" }),
  handleStripeWebhook
);
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
    analyticsSyncService.startScheduledSync();
  });
})();

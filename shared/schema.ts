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
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for potential future auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Business assessments table
export const assessments = pgTable("assessments", {
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
  grade: varchar("grade", { length: 10 }), // A, B, C, D, F
  
  // Status tracking
  status: varchar("status", { length: 50 }).default("pending"), // pending, analyzing, completed, failed
  emailSent: boolean("email_sent").default(false),
  
  // Pathway selection
  selectedPathway: varchar("selected_pathway", { length: 20 }), // diy, msp, none
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Assessment recommendations table
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id),
  category: varchar("category", { length: 100 }).notNull(), // seo, reviews, website, social, etc.
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  priority: varchar("priority", { length: 20 }).notNull(), // high, medium, low
  estimatedImpact: varchar("estimated_impact", { length: 50 }),
  estimatedEffort: varchar("estimated_effort", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Client data from Vendasta CRM
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  vendastaId: text("vendasta_id").unique(), // External reference
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  website: text("website"),
  address: text("address"),
  businessCategory: text("business_category"),
  enabledFeatures: text("enabled_features"), // CO,VI,SP,RE,SO,RI
  lastLoginTime: timestamp("last_login_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Inbox/communication data for Campaign Pro
export const inboxMessages = pgTable("inbox_messages", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  messageType: text("message_type").notNull(), // email, sms, chat, social
  content: text("content").notNull(),
  sender: text("sender"),
  recipient: text("recipient"),
  platform: text("platform"), // facebook, google, email, etc
  timestamp: timestamp("timestamp").notNull(),
  isRead: boolean("is_read").default(false),
  sentiment: text("sentiment"), // positive, negative, neutral
  createdAt: timestamp("created_at").defaultNow(),
});

// Campaign data for Campaign Pro
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // email, social, sms, etc
  status: text("status").notNull(), // draft, active, paused, completed
  content: text("content"),
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
  metrics: jsonb("metrics"), // open rates, clicks, etc
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Dashboard access tracking
export const dashboardAccess = pgTable("dashboard_access", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  accessToken: text("access_token").unique(),
  vendastaDashboardUrl: text("vendasta_dashboard_url"),
  lastAccessed: timestamp("last_accessed"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Link assessments to clients
export const clientAssessments = pgTable("client_assessments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  assessmentId: integer("assessment_id").references(() => assessments.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertAssessmentSchema = createInsertSchema(assessments).pick({
  businessName: true,
  industry: true,
  address: true,
  location: true,
  phone: true,
  email: true,
  website: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).pick({
  assessmentId: true,
  category: true,
  title: true,
  description: true,
  priority: true,
  estimatedImpact: true,
  estimatedEffort: true,
});

export const insertClientSchema = createInsertSchema(clients).pick({
  vendastaId: true,
  companyName: true,
  email: true,
  phone: true,
  website: true,
  address: true,
  businessCategory: true,
  enabledFeatures: true,
  lastLoginTime: true,
});

export const insertInboxMessageSchema = createInsertSchema(inboxMessages).pick({
  clientId: true,
  messageType: true,
  content: true,
  sender: true,
  recipient: true,
  platform: true,
  timestamp: true,
  sentiment: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  clientId: true,
  name: true,
  type: true,
  status: true,
  content: true,
  scheduledFor: true,
  metrics: true,
});

// Subscription plans table
export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  planId: varchar("plan_id", { length: 50 }).unique().notNull(), // msp-basic, diy-starter, etc.
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  pathway: varchar("pathway", { length: 20 }).notNull(), // msp, diy
  tierLevel: varchar("tier_level", { length: 50 }).notNull(), // basic, professional, enterprise
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).default('0.00'),
  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(), // monthly, quarterly, annual
  features: jsonb("features"), // List of included features/services
  maxUsers: integer("max_users"),
  maxProjects: integer("max_projects"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subscription add-ons for dynamic pricing
export const subscriptionAddons = pgTable("subscription_addons", {
  id: serial("id").primaryKey(),
  addonId: varchar("addon_id", { length: 50 }).unique().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // seo, social, email, ppc, etc.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
  compatiblePathways: text("compatible_pathways").array(), // ["msp", "diy"] or ["msp"]
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Customer subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  nmiSubscriptionId: varchar("nmi_subscription_id", { length: 100 }).unique(), // NMI subscription ID
  assessmentId: integer("assessment_id").references(() => assessments.id),
  clientId: integer("client_id").references(() => clients.id),
  planId: integer("plan_id").references(() => subscriptionPlans.id),
  
  // Subscription details
  status: varchar("status", { length: 30 }).notNull(), // active, cancelled, paused, past_due, trial
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  
  // Trial period support
  trialPeriodEnd: timestamp("trial_period_end"),
  isTrialActive: boolean("is_trial_active").default(false),
  
  // Pricing
  baseAmount: decimal("base_amount", { precision: 10, scale: 2 }).notNull(),
  addonAmount: decimal("addon_amount", { precision: 10, scale: 2 }).default('0.00'),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
  
  // Payment details
  paymentMethod: jsonb("payment_method"), // Masked card info, payment token
  lastPaymentDate: timestamp("last_payment_date"),
  nextPaymentDate: timestamp("next_payment_date"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subscription addon selections
export const subscriptionAddonSelections = pgTable("subscription_addon_selections", {
  id: serial("id").primaryKey(),
  subscriptionId: integer("subscription_id").references(() => subscriptions.id),
  addonId: integer("addon_id").references(() => subscriptionAddons.id),
  quantity: integer("quantity").default(1),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  addedAt: timestamp("added_at").defaultNow(),
}, (table) => [unique().on(table.subscriptionId, table.addonId)]);

// Individual Products - Core services offered à la carte
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 50 }).unique().notNull(), // business-listings, review-management, etc.
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // core, addon, solution
  
  // Assessment category this product improves
  improvesCategory: text("improves_category").array(), // ["visibility", "reviews", "completeness", "engagement"]
  
  // Pricing
  diyPrice: decimal("diy_price", { precision: 10, scale: 2 }), // Price for DIY delivery
  mspPrice: decimal("msp_price", { precision: 10, scale: 2 }), // Price for MSP delivery
  setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).default('0.00'),
  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(), // monthly, one_time
  
  // Service details
  features: jsonb("features"), // List of what's included
  deliveryMethod: text("delivery_method").array(), // ["diy", "msp"] - which pathways can deliver this
  estimatedImpact: varchar("estimated_impact", { length: 50 }), // How much it improves IQ score
  
  isActive: boolean("is_active").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Assessment-based product recommendations
export const assessmentProductRecommendations = pgTable("assessment_product_recommendations", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id),
  productId: integer("product_id").references(() => products.id),
  
  // Why this product is recommended
  reason: text("reason").notNull(), // AI-generated explanation
  priority: varchar("priority", { length: 20 }).notNull(), // critical, high, medium, low
  
  // Impact prediction
  currentScore: integer("current_score"), // Current score in category
  projectedScore: integer("projected_score"), // Expected score after implementation
  scoreImprovement: integer("score_improvement"), // Improvement points
  categoryAffected: varchar("category_affected", { length: 50 }), // visibility, reviews, completeness, engagement
  
  // Recommendation metadata
  isAccepted: boolean("is_accepted").default(false),
  isPurchased: boolean("is_purchased").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Billing history and invoice tracking
export const billingHistory = pgTable("billing_history", {
  id: serial("id").primaryKey(),
  subscriptionId: integer("subscription_id").references(() => subscriptions.id),
  nmiTransactionId: varchar("nmi_transaction_id", { length: 100 }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 30 }).notNull(), // paid, failed, pending, refunded
  billingDate: timestamp("billing_date").notNull(),
  paidDate: timestamp("paid_date"),
  invoiceNumber: varchar("invoice_number", { length: 50 }),
  paymentMethod: jsonb("payment_method"),
  failureReason: text("failure_reason"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for new subscription tables
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).pick({
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
  maxProjects: true,
});

export const insertSubscriptionAddonSchema = createInsertSchema(subscriptionAddons).pick({
  addonId: true,
  name: true,
  description: true,
  category: true,
  price: true,
  billingCycle: true,
  compatiblePathways: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
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
  nextPaymentDate: true,
});

export const insertBillingHistorySchema = createInsertSchema(billingHistory).pick({
  subscriptionId: true,
  nmiTransactionId: true,
  amount: true,
  status: true,
  billingDate: true,
  paidDate: true,
  invoiceNumber: true,
  paymentMethod: true,
  failureReason: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
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
  displayOrder: true,
});

export const insertAssessmentProductRecommendationSchema = createInsertSchema(assessmentProductRecommendations).pick({
  assessmentId: true,
  productId: true,
  reason: true,
  priority: true,
  currentScore: true,
  projectedScore: true,
  scoreImprovement: true,
  categoryAffected: true,
});

// Types
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type InboxMessage = typeof inboxMessages.$inferSelect;
export type InsertInboxMessage = z.infer<typeof insertInboxMessageSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;

// Subscription types
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type SubscriptionAddon = typeof subscriptionAddons.$inferSelect;
export type InsertSubscriptionAddon = z.infer<typeof insertSubscriptionAddonSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type SubscriptionAddonSelection = typeof subscriptionAddonSelections.$inferSelect;
export type BillingHistory = typeof billingHistory.$inferSelect;
export type InsertBillingHistory = z.infer<typeof insertBillingHistorySchema>;

// Product types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type AssessmentProductRecommendation = typeof assessmentProductRecommendations.$inferSelect;
export type InsertAssessmentProductRecommendation = z.infer<typeof insertAssessmentProductRecommendationSchema>;

// ============================================================================
// /SEND - Email + SMS Marketing Platform
// ============================================================================

// Contacts for /send platform
export const sendContacts = pgTable("send_contacts", {
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
  emailConsentMethod: varchar("email_consent_method", { length: 50 }), // form, import, api, etc
  emailDoubleOptin: boolean("email_double_optin").default(false),
  emailDoubleOptinConfirmedAt: timestamp("email_double_optin_confirmed_at"),
  
  smsConsent: boolean("sms_consent").default(false),
  smsConsentDate: timestamp("sms_consent_date"),
  smsConsentIp: varchar("sms_consent_ip", { length: 45 }),
  smsConsentMethod: varchar("sms_consent_method", { length: 50 }),
  smsDoubleOptin: boolean("sms_double_optin").default(false),
  smsDoubleOptinConfirmedAt: timestamp("sms_double_optin_confirmed_at"),
  
  // Subscription status
  emailStatus: varchar("email_status", { length: 20 }).default("subscribed"), // subscribed, unsubscribed, bounced, complained
  smsStatus: varchar("sms_status", { length: 20 }).default("subscribed"),
  
  // Localization
  language: varchar("language", { length: 10 }).default("en"),
  region: varchar("region", { length: 10 }).default("US"),
  timezone: varchar("timezone", { length: 50 }),
  
  // Suppression tracking
  globallySuppressed: boolean("globally_suppressed").default(false),
  suppressionReason: text("suppression_reason"),
  
  // Source tracking
  source: varchar("source", { length: 100 }), // form, api, import, integration
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
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  // Unique constraints for contact identity per client
  unique().on(table.clientId, table.email),
  unique().on(table.clientId, table.phone),
]);

// Contact lists/segments
export const sendLists = pgTable("send_lists", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // List type
  listType: varchar("list_type", { length: 20 }).notNull(), // static, dynamic, segment
  
  // For dynamic lists - segment rules (JSON)
  segmentRules: jsonb("segment_rules"),
  
  // Stats
  totalContacts: integer("total_contacts").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Many-to-many relationship for contacts and lists
export const sendListContacts = pgTable("send_list_contacts", {
  id: serial("id").primaryKey(),
  listId: integer("list_id").references(() => sendLists.id),
  contactId: integer("contact_id").references(() => sendContacts.id),
  addedAt: timestamp("added_at").defaultNow(),
}, (table) => [unique().on(table.listId, table.contactId)]);

// Email/SMS templates
export const sendTemplates = pgTable("send_templates", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Template type
  templateType: varchar("template_type", { length: 20 }).notNull(), // email, sms
  
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Campaigns
export const sendCampaigns = pgTable("send_campaigns", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Campaign type
  campaignType: varchar("campaign_type", { length: 20 }).notNull(), // email, sms, both
  
  // Status
  status: varchar("status", { length: 20 }).default("draft"), // draft, scheduled, sending, sent, paused, cancelled
  
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
  sendRateLimit: integer("send_rate_limit"), // Max sends per hour
  emailThrottleMs: integer("email_throttle_ms"), // Milliseconds between email sends
  smsThrottleMs: integer("sms_throttle_ms"), // Milliseconds between SMS sends
  
  // Frequency capping
  respectFrequencyCaps: boolean("respect_frequency_caps").default(true),
  
  // A/B testing
  isAbTest: boolean("is_ab_test").default(false),
  abTestConfig: jsonb("ab_test_config"), // {variants: [{name: 'A', percentage: 50, emailSubject: '...'}], winnerCriteria: 'open_rate'}
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Individual campaign sends (for tracking)
export const sendCampaignSends = pgTable("send_campaign_sends", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => sendCampaigns.id),
  contactId: integer("contact_id").references(() => sendContacts.id),
  
  // Send type
  sendType: varchar("send_type", { length: 20 }).notNull(), // email, sms
  
  // Status
  status: varchar("status", { length: 20 }).notNull(), // queued, sent, delivered, opened, clicked, bounced, failed, complained
  
  // Email tracking
  emailOpenedAt: timestamp("email_opened_at"),
  emailClickedAt: timestamp("email_clicked_at"),
  emailBouncedAt: timestamp("email_bounced_at"),
  bounceType: varchar("bounce_type", { length: 20 }), // hard, soft
  bounceCode: varchar("bounce_code", { length: 10 }),
  
  // SMS tracking (from Telnyx)
  smsDeliveredAt: timestamp("sms_delivered_at"),
  smsFailedReason: text("sms_failed_reason"),
  smsFailedCode: varchar("sms_failed_code", { length: 20 }),
  
  // Provider metadata
  provider: varchar("provider", { length: 50 }), // telnyx, smtp, ses
  providerMessageId: varchar("provider_message_id", { length: 255 }),
  providerResponse: jsonb("provider_response"),
  
  // Consent snapshot (for audit trail)
  consentSnapshot: jsonb("consent_snapshot"), // {email: true, sms: true, timestamp: '...', ip: '...'}
  
  // Unsubscribe tracking
  unsubscribedAt: timestamp("unsubscribed_at"),
  unsubscribeMethod: varchar("unsubscribe_method", { length: 50 }),
  
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Automation workflows
export const sendAutomations = pgTable("send_automations", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Trigger
  triggerType: varchar("trigger_type", { length: 50 }).notNull(), // contact_added, tag_added, date_based, api_call
  triggerConfig: jsonb("trigger_config"),
  
  // Workflow steps (JSON array)
  workflowSteps: jsonb("workflow_steps"), // [{type: 'email', delay: 0, templateId: 1}, {type: 'sms', delay: 86400}]
  
  // Status
  isActive: boolean("is_active").default(true),
  
  // Stats
  totalTriggered: integer("total_triggered").default(0),
  totalCompleted: integer("total_completed").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Consent audit log (for compliance)
export const sendConsentRecords = pgTable("send_consent_records", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").references(() => sendContacts.id),
  
  // Consent details
  consentType: varchar("consent_type", { length: 20 }).notNull(), // email, sms
  action: varchar("action", { length: 20 }).notNull(), // granted, revoked
  
  // Compliance data
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  consentMethod: varchar("consent_method", { length: 50 }), // form, api, import, double_optin_confirmed
  consentText: text("consent_text"), // Exact text shown to user
  
  // Metadata
  metadata: jsonb("metadata"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Global suppression list (GDPR, unsubscribes, bounces)
export const sendSuppressionList = pgTable("send_suppression_list", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Suppression details
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  
  // Suppression type
  suppressionType: varchar("suppression_type", { length: 20 }).notNull(), // email, sms, both
  reason: varchar("reason", { length: 50 }).notNull(), // unsubscribe, bounce, complaint, manual, gdpr_request
  
  // Global vs tenant suppression
  isGlobal: boolean("is_global").default(false), // If true, suppressed across all clients
  
  // Compliance tracking
  suppressedAt: timestamp("suppressed_at").defaultNow(),
  suppressedBy: varchar("suppressed_by", { length: 100 }), // user_request, auto_bounce, admin
  notes: text("notes"),
  
  // Metadata
  metadata: jsonb("metadata"),
}, (table) => [unique().on(table.clientId, table.email), unique().on(table.clientId, table.phone)]);

// Bounce and complaint log
export const sendBounceLog = pgTable("send_bounce_log", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  contactId: integer("contact_id").references(() => sendContacts.id),
  campaignId: integer("campaign_id").references(() => sendCampaigns.id),
  
  // Bounce/complaint details
  eventType: varchar("event_type", { length: 20 }).notNull(), // bounce, complaint, spam_report
  bounceType: varchar("bounce_type", { length: 20 }), // hard, soft, transient
  bounceCode: varchar("bounce_code", { length: 10 }),
  
  // Channel
  channel: varchar("channel", { length: 10 }).notNull(), // email, sms
  
  // Provider details
  provider: varchar("provider", { length: 50 }), // telnyx, smtp
  providerMessageId: varchar("provider_message_id", { length: 255 }),
  providerResponse: text("provider_response"),
  
  // Diagnostics
  diagnosticCode: varchar("diagnostic_code", { length: 100 }),
  diagnosticMessage: text("diagnostic_message"),
  
  occurredAt: timestamp("occurred_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Customer preference center
export const sendPreferenceCenter = pgTable("send_preference_center", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").references(() => sendContacts.id).unique(),
  
  // Communication preferences
  emailFrequency: varchar("email_frequency", { length: 20 }).default("all"), // all, daily, weekly, monthly, none
  smsFrequency: varchar("sms_frequency", { length: 20 }).default("all"),
  
  // Topic preferences (which campaigns to receive)
  topicPreferences: jsonb("topic_preferences"), // {promotional: true, transactional: true, updates: false}
  
  // Time preferences
  preferredTimeZone: varchar("preferred_time_zone", { length: 50 }),
  doNotSendBefore: varchar("do_not_send_before", { length: 5 }), // HH:MM
  doNotSendAfter: varchar("do_not_send_after", { length: 5 }),
  
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Unsubscribe records (audit trail)
export const sendUnsubscribeRecords = pgTable("send_unsubscribe_records", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").references(() => sendContacts.id),
  campaignId: integer("campaign_id").references(() => sendCampaigns.id),
  
  // Unsubscribe details
  unsubscribeType: varchar("unsubscribe_type", { length: 20 }).notNull(), // email, sms, all
  unsubscribeMethod: varchar("unsubscribe_method", { length: 50 }).notNull(), // link_click, reply_stop, preference_center, admin
  
  // CAN-SPAM compliance
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  
  // Optional feedback
  reason: varchar("reason", { length: 100 }),
  feedbackText: text("feedback_text"),
  
  unsubscribedAt: timestamp("unsubscribed_at").defaultNow(),
});


// /send Insert Schemas
export const insertSendContactSchema = createInsertSchema(sendContacts).pick({
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
  tags: true,
});

export const insertSendListSchema = createInsertSchema(sendLists).pick({
  clientId: true,
  name: true,
  description: true,
  listType: true,
  segmentRules: true,
});

export const insertSendTemplateSchema = createInsertSchema(sendTemplates).pick({
  clientId: true,
  name: true,
  description: true,
  templateType: true,
  emailSubject: true,
  emailHtml: true,
  emailText: true,
  smsBody: true,
  category: true,
});

export const insertSendCampaignSchema = createInsertSchema(sendCampaigns).pick({
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
  smsScheduledFor: true,
});

export const insertSendAutomationSchema = createInsertSchema(sendAutomations).pick({
  clientId: true,
  name: true,
  description: true,
  triggerType: true,
  triggerConfig: true,
  workflowSteps: true,
});

// /send Types
export type SendContact = typeof sendContacts.$inferSelect;
export type InsertSendContact = z.infer<typeof insertSendContactSchema>;
export type SendList = typeof sendLists.$inferSelect;
export type InsertSendList = z.infer<typeof insertSendListSchema>;
export type SendTemplate = typeof sendTemplates.$inferSelect;
export type InsertSendTemplate = z.infer<typeof insertSendTemplateSchema>;
export type SendCampaign = typeof sendCampaigns.$inferSelect;
export type InsertSendCampaign = z.infer<typeof insertSendCampaignSchema>;
export type SendCampaignSend = typeof sendCampaignSends.$inferSelect;
export type SendAutomation = typeof sendAutomations.$inferSelect;
export type InsertSendAutomation = z.infer<typeof insertSendAutomationSchema>;
export type SendConsentRecord = typeof sendConsentRecords.$inferSelect;

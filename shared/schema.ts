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

// Session storage table - Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

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
  
  // Status tracking
  status: varchar("status", { length: 50 }).default("pending"), // pending, analyzing, completed, failed
  emailSent: boolean("email_sent").default(false),
  
  // Pathway selection (DIY-only platform)
  selectedPathway: varchar("selected_pathway", { length: 20 }), // diy, none
  
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

// Client data
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").unique(), // External reference
  companyName: text("company_name").notNull(),
  email: text("email").notNull().unique(), // Primary login identifier
  phone: text("phone"),
  website: text("website"),
  address: text("address"),
  businessCategory: text("business_category"),
  enabledFeatures: text("enabled_features"), // CO,VI,SP,RE,SO,RI
  
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
  accountStatus: varchar("account_status", { length: 20 }).default("active"), // active, suspended, inactive, pending, banned
  suspensionReason: text("suspension_reason"), // Reason if suspended
  statusChangedAt: timestamp("status_changed_at"),
  statusChangedBy: integer("status_changed_by"), // Admin ID who changed status
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Magic link tokens for passwordless client login
export const magicLinkTokens = pgTable("magic_link_tokens", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").default(false),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
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

// Email change audit trail
export const emailChangeHistory = pgTable("email_change_history", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  oldEmail: text("old_email").notNull(),
  newEmail: text("new_email").notNull(),
  verificationCode: text("verification_code"),
  verified: boolean("verified").default(false),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Dashboard access tracking
export const dashboardAccess = pgTable("dashboard_access", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  accessToken: text("access_token").unique(),
  dashboardUrl: text("dashboard_url"),
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

// Account status history for audit trail
export const accountStatusHistory = pgTable("account_status_history", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  previousStatus: varchar("previous_status", { length: 20 }),
  newStatus: varchar("new_status", { length: 20 }).notNull(),
  reason: text("reason"),
  changedBy: integer("changed_by"), // Admin ID who made the change
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
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
  statusChangedBy: true,
});

export const insertAccountStatusHistorySchema = createInsertSchema(accountStatusHistory).pick({
  clientId: true,
  previousStatus: true,
  newStatus: true,
  reason: true,
  changedBy: true,
  ipAddress: true,
  userAgent: true,
});

export const insertMagicLinkTokenSchema = createInsertSchema(magicLinkTokens).pick({
  email: true,
  token: true,
  expiresAt: true,
});

export const insertEmailChangeHistorySchema = createInsertSchema(emailChangeHistory).pick({
  clientId: true,
  oldEmail: true,
  newEmail: true,
  verificationCode: true,
  verified: true,
  ipAddress: true,
  userAgent: true,
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
  planId: varchar("plan_id", { length: 50 }).unique().notNull(), // diy-starter, etc. (DIY-only)
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  pathway: varchar("pathway", { length: 20 }).notNull(), // diy (DIY-only platform)
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
  icon: varchar("icon", { length: 50 }), // Icon name from lucide-react (Brain, Ship, Sparkles, etc.)
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),
  compatiblePathways: text("compatible_pathways").array(), // ["diy"] (DIY-only platform)
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
  
  // Pricing (DIY-only)
  diyPrice: decimal("diy_price", { precision: 10, scale: 2 }), // Price for DIY delivery
  setupFee: decimal("setup_fee", { precision: 10, scale: 2 }).default('0.00'),
  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(), // monthly, one_time
  
  // Service details
  features: jsonb("features"), // List of what's included
  deliveryMethod: text("delivery_method").array(), // ["diy"] - DIY-only platform
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
export type MagicLinkToken = typeof magicLinkTokens.$inferSelect;
export type InsertMagicLinkToken = z.infer<typeof insertMagicLinkTokenSchema>;
export type EmailChangeHistory = typeof emailChangeHistory.$inferSelect;
export type InsertEmailChangeHistory = z.infer<typeof insertEmailChangeHistorySchema>;
export type InboxMessage = typeof inboxMessages.$inferSelect;
export type InsertInboxMessage = z.infer<typeof insertInboxMessageSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type AccountStatusHistory = typeof accountStatusHistory.$inferSelect;
export type InsertAccountStatusHistory = z.infer<typeof insertAccountStatusHistorySchema>;

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

// ========================================
// OPENSRS DOMAIN MANAGEMENT (webhosted.io)
// ========================================

// Domain registrations managed via OpenSRS
export const domains = pgTable("domains", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Domain details
  domain: varchar("domain", { length: 255 }).notNull(),
  tld: varchar("tld", { length: 20 }).notNull(), // com, net, org, etc
  
  // Registration details
  registrar: varchar("registrar", { length: 50 }).default("opensrs"),
  opensrsOrderId: varchar("opensrs_order_id", { length: 100 }),
  registrationDate: timestamp("registration_date"),
  expiryDate: timestamp("expiry_date"),
  autoRenew: boolean("auto_renew").default(true),
  
  // Domain status
  status: varchar("status", { length: 50 }).default("active"), // active, pending, expired, transferred, cancelled
  locked: boolean("locked").default(true), // domain lock protection
  
  // DNS configuration
  dnsProvider: varchar("dns_provider", { length: 50 }).default("opensrs"), // opensrs, cloudflare, other
  nameservers: text("nameservers").array(), // array of nameserver hostnames
  
  // Contact information (WHOIS)
  registrantContact: jsonb("registrant_contact"), // owner contact
  adminContact: jsonb("admin_contact"),
  techContact: jsonb("tech_contact"),
  billingContact: jsonb("billing_contact"),
  
  // Privacy settings
  whoisPrivacy: boolean("whois_privacy").default(false),
  
  // Transfer details
  authCode: varchar("auth_code", { length: 100 }), // EPP/auth code for transfers
  transferLocked: boolean("transfer_locked").default(false),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique().on(table.clientId, table.domain),
]);

// DNS Records management
export const dnsRecords = pgTable("dns_records", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id").references(() => domains.id, { onDelete: "cascade" }),
  
  // DNS record details
  recordType: varchar("record_type", { length: 10 }).notNull(), // A, AAAA, CNAME, MX, TXT, SPF, DKIM, etc
  hostname: varchar("hostname", { length: 255 }).notNull(), // subdomain or @ for root
  value: text("value").notNull(), // IP, domain, text value
  ttl: integer("ttl").default(300), // Time to live in seconds
  priority: integer("priority"), // For MX records
  
  // Status
  status: varchar("status", { length: 20 }).default("active"), // active, pending, deleted
  verified: boolean("verified").default(false),
  verifiedAt: timestamp("verified_at"),
  
  // Metadata
  autoCreated: boolean("auto_created").default(false), // auto-created by system vs manual
  source: varchar("source", { length: 50 }), // wpmudev, manual, imported, etc
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Domain transfer tracking
export const domainTransfers = pgTable("domain_transfers", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id").references(() => domains.id),
  clientId: integer("client_id").references(() => clients.id),
  
  // Transfer details
  domain: varchar("domain", { length: 255 }).notNull(),
  transferType: varchar("transfer_type", { length: 20 }).notNull(), // inbound, outbound
  authCode: varchar("auth_code", { length: 100 }),
  
  // Status tracking
  status: varchar("status", { length: 50 }).default("pending"), // pending, pending_owner, pending_admin, pending_registry, completed, cancelled, failed
  statusMessage: text("status_message"),
  
  // Dates
  initiatedAt: timestamp("initiated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  
  // OpenSRS tracking
  opensrsTransferId: varchar("opensrs_transfer_id", { length: 100 }),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Nameserver change history
export const nameserverHistory = pgTable("nameserver_history", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id").references(() => domains.id, { onDelete: "cascade" }),
  
  previousNameservers: text("previous_nameservers").array(),
  newNameservers: text("new_nameservers").array(),
  changedBy: integer("changed_by").references(() => clients.id),
  reason: text("reason"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// ========================================
// IMPERSONATION SYSTEM
// ========================================

// Impersonation sessions for admin support
export const impersonationSessions = pgTable("impersonation_sessions", {
  id: serial("id").primaryKey(),
  
  // Who is impersonating whom
  adminId: integer("admin_id").references(() => clients.id).notNull(), // admin user
  targetUserId: integer("target_user_id").references(() => clients.id).notNull(), // user being impersonated
  
  // Session tokens (dual-token system)
  sessionToken: varchar("session_token", { length: 500 }).notNull().unique(), // JWT for impersonated user
  superToken: varchar("super_token", { length: 500 }).notNull(), // JWT for admin
  
  // Request details
  reason: text("reason").notNull(), // why impersonation was requested
  requestedAt: timestamp("requested_at").defaultNow(),
  
  // User consent
  requiresConsent: boolean("requires_consent").default(true),
  consentGranted: boolean("consent_granted").default(false),
  consentGrantedAt: timestamp("consent_granted_at"),
  consentMethod: varchar("consent_method", { length: 50 }), // email, sms, in_app
  
  // Session lifecycle
  status: varchar("status", { length: 20 }).default("pending"), // pending, active, expired, ended, rejected
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  expiresAt: timestamp("expires_at"), // 30 min default timeout
  
  // Access restrictions
  readOnly: boolean("read_only").default(true),
  allowedActions: text("allowed_actions").array(), // specific actions admin can perform
  restrictedActions: text("restricted_actions").array().default(sql`ARRAY['delete_account', 'change_password', 'modify_billing']`),
  
  // Metadata
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Comprehensive audit log for impersonation
export const impersonationAuditLog = pgTable("impersonation_audit_log", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => impersonationSessions.id, { onDelete: "cascade" }),
  
  adminId: integer("admin_id").references(() => clients.id).notNull(),
  targetUserId: integer("target_user_id").references(() => clients.id).notNull(),
  
  // Action details
  action: varchar("action", { length: 100 }).notNull(), // view_dashboard, update_contact, send_email, etc
  actionCategory: varchar("action_category", { length: 50 }), // read, write, delete
  resource: varchar("resource", { length: 100 }), // contacts, campaigns, settings
  resourceId: varchar("resource_id", { length: 100 }),
  
  // Request details
  method: varchar("method", { length: 10 }), // GET, POST, PUT, DELETE
  endpoint: varchar("endpoint", { length: 255 }),
  requestBody: jsonb("request_body"),
  responseStatus: integer("response_status"),
  
  // Tracking
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  
  // Result
  success: boolean("success").default(true),
  errorMessage: text("error_message"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for OpenSRS domain management
export const insertDomainSchema = createInsertSchema(domains).pick({
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
  authCode: true,
});

export const insertDnsRecordSchema = createInsertSchema(dnsRecords).pick({
  domainId: true,
  recordType: true,
  hostname: true,
  value: true,
  ttl: true,
  priority: true,
  autoCreated: true,
  source: true,
});

export const insertDomainTransferSchema = createInsertSchema(domainTransfers).pick({
  domainId: true,
  clientId: true,
  domain: true,
  transferType: true,
  authCode: true,
  opensrsTransferId: true,
});

export const insertImpersonationSessionSchema = createInsertSchema(impersonationSessions).pick({
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
  userAgent: true,
});

export const insertImpersonationAuditSchema = createInsertSchema(impersonationAuditLog).pick({
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
  errorMessage: true,
});

// Types for OpenSRS and Impersonation
export type Domain = typeof domains.$inferSelect;
export type InsertDomain = z.infer<typeof insertDomainSchema>;
export type DnsRecord = typeof dnsRecords.$inferSelect;
export type InsertDnsRecord = z.infer<typeof insertDnsRecordSchema>;
export type DomainTransfer = typeof domainTransfers.$inferSelect;
export type InsertDomainTransfer = z.infer<typeof insertDomainTransferSchema>;

export type ImpersonationSession = typeof impersonationSessions.$inferSelect;
export type InsertImpersonationSession = z.infer<typeof insertImpersonationSessionSchema>;
export type ImpersonationAuditLog = typeof impersonationAuditLog.$inferSelect;
export type InsertImpersonationAudit = z.infer<typeof insertImpersonationAuditSchema>;

// ========================================
// UNIFIED INBOX (Communications Hub)
// ========================================

// Channel connections - stores credentials and config for each messaging platform
export const inboxChannelConnections = pgTable("inbox_channel_connections", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Channel details
  channelType: varchar("channel_type", { length: 50 }).notNull(), // livechat, email, sms, whatsapp, facebook, instagram, twitter, tiktok
  channelIdentifier: varchar("channel_identifier", { length: 255 }).notNull(), // phone number, page ID, email address, etc
  channelName: varchar("channel_name", { length: 255 }), // friendly name
  
  // Connection status
  status: varchar("status", { length: 20 }).default("active"), // active, disconnected, expired, error
  isDefault: boolean("is_default").default(false), // default channel for this type
  
  // Authentication & configuration (encrypted)
  credentials: jsonb("credentials"), // API keys, tokens, etc (encrypted)
  config: jsonb("config"), // channel-specific settings
  
  // Webhook info
  webhookUrl: varchar("webhook_url", { length: 500 }),
  webhookSecret: varchar("webhook_secret", { length: 255 }),
  
  // Metadata
  lastSyncedAt: timestamp("last_synced_at"),
  lastError: text("last_error"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique().on(table.clientId, table.channelType, table.channelIdentifier),
]);

// Conversations - unified thread for all messages from a contact across channels
export const inboxConversations = pgTable("inbox_conversations", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  
  // Contact/customer info
  contactName: varchar("contact_name", { length: 255 }),
  contactIdentifier: varchar("contact_identifier", { length: 255 }).notNull(), // phone, email, user ID
  contactAvatar: text("contact_avatar"),
  
  // Primary channel for this conversation
  primaryChannelType: varchar("primary_channel_type", { length: 50 }).notNull(),
  primaryChannelId: integer("primary_channel_id").references(() => inboxChannelConnections.id),
  
  // Conversation metadata
  subject: text("subject"), // for email threads
  status: varchar("status", { length: 20 }).default("open"), // open, pending, resolved, closed, spam
  priority: varchar("priority", { length: 20 }).default("normal"), // low, normal, high, urgent
  
  // Assignment
  assignedToId: integer("assigned_to_id").references(() => clients.id),
  assignedAt: timestamp("assigned_at"),
  
  // Tags and categorization
  tags: text("tags").array(),
  category: varchar("category", { length: 50 }), // support, sales, general
  
  // Message tracking
  lastMessageAt: timestamp("last_message_at"),
  lastMessagePreview: text("last_message_preview"),
  unreadCount: integer("unread_count").default(0),
  
  // Customer satisfaction
  sentiment: varchar("sentiment", { length: 20 }), // positive, neutral, negative
  rating: integer("rating"), // 1-5 stars
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_conversation_client").on(table.clientId),
  index("idx_conversation_status").on(table.status),
  index("idx_conversation_assigned").on(table.assignedToId),
]);

// Messages - individual messages within conversations
export const inboxMessages2 = pgTable("inbox_messages2", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => inboxConversations.id, { onDelete: "cascade" }).notNull(),
  
  // Channel info
  channelType: varchar("channel_type", { length: 50 }).notNull(),
  channelId: integer("channel_id").references(() => inboxChannelConnections.id),
  
  // Message details
  messageType: varchar("message_type", { length: 20 }).notNull(), // incoming, outgoing, internal_note
  direction: varchar("direction", { length: 10 }).notNull(), // inbound, outbound
  
  // Content
  content: text("content").notNull(),
  contentType: varchar("content_type", { length: 50 }).default("text"), // text, html, image, video, audio, file
  
  // Sender/recipient
  fromIdentifier: varchar("from_identifier", { length: 255 }).notNull(), // phone, email, user ID
  fromName: varchar("from_name", { length: 255 }),
  toIdentifier: varchar("to_identifier", { length: 255 }).notNull(),
  toName: varchar("to_name", { length: 255 }),
  
  // Platform-specific IDs
  externalMessageId: varchar("external_message_id", { length: 255 }), // ID from Facebook, WhatsApp, etc
  threadId: varchar("thread_id", { length: 255 }), // thread ID from external platform
  
  // Attachments
  hasAttachments: boolean("has_attachments").default(false),
  attachments: jsonb("attachments"), // array of attachment objects
  
  // Message status
  status: varchar("status", { length: 20 }).default("sent"), // queued, sent, delivered, read, failed
  deliveredAt: timestamp("delivered_at"),
  readAt: timestamp("read_at"),
  
  // Team member who sent (for outgoing)
  sentById: integer("sent_by_id").references(() => clients.id),
  
  // Metadata
  metadata: jsonb("metadata"), // platform-specific data
  isInternal: boolean("is_internal").default(false), // internal note vs customer-facing
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_message_conversation").on(table.conversationId),
  index("idx_message_external").on(table.externalMessageId),
  index("idx_message_created").on(table.createdAt),
]);

// Message attachments
export const inboxAttachments = pgTable("inbox_attachments", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").references(() => inboxMessages2.id, { onDelete: "cascade" }).notNull(),
  
  // File details
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(), // image/jpeg, application/pdf, etc
  fileSize: integer("file_size"), // bytes
  fileUrl: text("file_url").notNull(), // storage URL
  
  // Thumbnail for images/videos
  thumbnailUrl: text("thumbnail_url"),
  
  // External reference
  externalFileId: varchar("external_file_id", { length: 255 }),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Quick replies / canned responses
export const inboxQuickReplies = pgTable("inbox_quick_replies", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  
  // Reply details
  shortcut: varchar("shortcut", { length: 50 }).notNull(), // /greeting, /hours, etc
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  
  // Channel compatibility
  channelTypes: text("channel_types").array(), // which channels this reply works on
  
  // Categorization
  category: varchar("category", { length: 50 }),
  tags: text("tags").array(),
  
  // Usage tracking
  useCount: integer("use_count").default(0),
  lastUsedAt: timestamp("last_used_at"),
  
  // Team sharing
  isShared: boolean("is_shared").default(true), // shared with team or private
  createdById: integer("created_by_id").references(() => clients.id),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique().on(table.clientId, table.shortcut),
]);

// Conversation participants (for group conversations)
export const inboxParticipants = pgTable("inbox_participants", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => inboxConversations.id, { onDelete: "cascade" }).notNull(),
  
  participantIdentifier: varchar("participant_identifier", { length: 255 }).notNull(),
  participantName: varchar("participant_name", { length: 255 }),
  participantType: varchar("participant_type", { length: 20 }).notNull(), // customer, agent, bot
  
  // Participant status
  isActive: boolean("is_active").default(true),
  joinedAt: timestamp("joined_at").defaultNow(),
  leftAt: timestamp("left_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  unique().on(table.conversationId, table.participantIdentifier),
]);

// Live chat widget sessions
export const livechatSessions = pgTable("livechat_sessions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  conversationId: integer("conversation_id").references(() => inboxConversations.id),
  
  // Session details
  sessionId: varchar("session_id", { length: 100 }).notNull().unique(),
  visitorId: varchar("visitor_id", { length: 100 }), // Optional - can be derived from sessionId or tracking
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
  status: varchar("status", { length: 20 }).default("active"), // active, ended, transferred
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
  
  // Assignment
  assignedToId: integer("assigned_to_id").references(() => clients.id),
  
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_livechat_session").on(table.sessionId),
  index("idx_livechat_visitor").on(table.visitorId),
]);

// Brand Studio - Uploaded brand assets
export const brandAssets = pgTable("brand_assets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // logo, icon, additional
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(), // in bytes
  data: text("data").notNull(), // base64 encoded file data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas for unified inbox
export const insertChannelConnectionSchema = createInsertSchema(inboxChannelConnections).pick({
  clientId: true,
  channelType: true,
  channelIdentifier: true,
  channelName: true,
  isDefault: true,
  credentials: true,
  config: true,
  webhookUrl: true,
  webhookSecret: true,
});

export const insertConversationSchema = createInsertSchema(inboxConversations).pick({
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
  sentiment: true,
});

export const insertInboxMessage2Schema = createInsertSchema(inboxMessages2).pick({
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
  isInternal: true,
});

export const insertQuickReplySchema = createInsertSchema(inboxQuickReplies).pick({
  clientId: true,
  shortcut: true,
  title: true,
  content: true,
  channelTypes: true,
  category: true,
  tags: true,
  isShared: true,
  createdById: true,
});

export const insertLivechatSessionSchema = createInsertSchema(livechatSessions).pick({
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
  assignedToId: true,
});

// Insert schema for brand assets
export const insertBrandAssetSchema = createInsertSchema(brandAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types for unified inbox
export type ChannelConnection = typeof inboxChannelConnections.$inferSelect;
export type InsertChannelConnection = z.infer<typeof insertChannelConnectionSchema>;
export type InboxConversation = typeof inboxConversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type InboxMessage2 = typeof inboxMessages2.$inferSelect;
export type InsertInboxMessage2 = z.infer<typeof insertInboxMessage2Schema>;
export type InboxAttachment = typeof inboxAttachments.$inferSelect;
export type QuickReply = typeof inboxQuickReplies.$inferSelect;
export type InsertQuickReply = z.infer<typeof insertQuickReplySchema>;
export type LivechatSession = typeof livechatSessions.$inferSelect;
export type InsertLivechatSession = z.infer<typeof insertLivechatSessionSchema>;

// Types for brand assets
export type BrandAsset = typeof brandAssets.$inferSelect;
export type InsertBrandAsset = z.infer<typeof insertBrandAssetSchema>;

// ============================================================================
// /CONTENT - Social Media Content Management Platform
// ============================================================================

// Connected social media accounts (OAuth credentials)
export const socialMediaAccounts = pgTable("social_media_accounts", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  
  // Platform details
  platform: varchar("platform", { length: 50 }).notNull(), // facebook, instagram, linkedin, x, google_business, tiktok, snapchat
  platformAccountId: varchar("platform_account_id", { length: 255 }).notNull(), // Platform's user/page ID
  platformAccountName: varchar("platform_account_name", { length: 255 }).notNull(), // Display name
  platformAccountHandle: varchar("platform_account_handle", { length: 255 }), // @username
  platformAccountAvatar: text("platform_account_avatar"),
  
  // OAuth credentials
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: timestamp("token_expires_at"),
  
  // Account metadata
  accountType: varchar("account_type", { length: 50 }), // personal, business, page, etc
  permissions: text("permissions").array(), // Granted OAuth scopes
  metadata: jsonb("metadata"), // Platform-specific data
  
  // Status
  isActive: boolean("is_active").default(true),
  lastSyncedAt: timestamp("last_synced_at"),
  syncError: text("sync_error"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique().on(table.clientId, table.platform, table.platformAccountId),
]);

// Media library for content management
export const contentMedia = pgTable("content_media", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  
  // File details
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: integer("file_size").notNull(), // bytes
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileType: varchar("file_type", { length: 20 }).notNull(), // image, video, gif
  
  // Storage location (Cloudflare R2 / S3)
  storageKey: text("storage_key").notNull(), // S3 key / R2 path
  storageUrl: text("storage_url").notNull(), // Public URL
  thumbnailUrl: text("thumbnail_url"), // For videos
  
  // Media metadata
  width: integer("width"),
  height: integer("height"),
  duration: integer("duration"), // For videos (seconds)
  altText: text("alt_text"), // Accessibility
  
  // Organization
  folder: varchar("folder", { length: 255 }).default("Uploads"), // For organizing media
  tags: text("tags").array(),
  
  // Usage tracking
  usageCount: integer("usage_count").default(0), // How many posts use this
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Social media posts
export const contentPosts = pgTable("content_posts", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  
  // Post content
  caption: text("caption").notNull(), // Main text
  hashtags: text("hashtags").array(), // Extracted hashtags
  mediaIds: integer("media_ids").array(), // References to contentMedia
  
  // Platform targeting
  platforms: text("platforms").array().notNull(), // Which platforms to publish to
  
  // Platform-specific customization
  platformCustomizations: jsonb("platform_customizations"), // {facebook: {caption: "..."}, instagram: {...}}
  
  // Scheduling
  scheduledFor: timestamp("scheduled_for"), // When to publish (null = draft)
  timezone: varchar("timezone", { length: 50 }).default("America/New_York"),
  
  // Status tracking
  status: varchar("status", { length: 20 }).default("draft"), // draft, scheduled, publishing, published, failed, cancelled
  publishedAt: timestamp("published_at"),
  
  // Database-backed scheduler fields
  lockedAt: timestamp("locked_at"), // Job lock timestamp for atomic processing
  attempts: integer("attempts").default(0), // Retry count
  nextRetryAt: timestamp("next_retry_at"), // When to retry failed jobs
  lastError: text("last_error"), // Error message from last publishing attempt
  
  // AI assistance metadata
  isAIGenerated: boolean("is_ai_generated").default(false), // Was caption AI-generated
  aiPrompt: text("ai_prompt"), // Original prompt for AI
  contentScore: integer("content_score"), // AI content quality score (0-100)
  
  // Publishing results (per platform)
  publishResults: jsonb("publish_results"), // {facebook: {postId: "123", url: "...", status: "published"}}
  publishErrors: jsonb("publish_errors"), // {instagram: {error: "Token expired"}}
  
  // Template
  templateId: integer("template_id").references(() => contentTemplates.id),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Post analytics (aggregated from platform APIs)
export const contentAnalytics = pgTable("content_analytics", {
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
  saves: integer("saves").default(0), // Instagram/Pinterest
  
  // Video metrics (if applicable)
  videoViews: integer("video_views").default(0),
  videoWatchTime: integer("video_watch_time").default(0), // seconds
  
  // Engagement rate (calculated)
  engagementRate: decimal("engagement_rate", { precision: 5, scale: 2 }), // percentage
  
  // Last synced from platform
  lastSyncedAt: timestamp("last_synced_at").defaultNow(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique().on(table.postId, table.platform),
]);

// Reusable content templates
export const contentTemplates = pgTable("content_templates", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }), // promotional, educational, announcement, etc
  
  // Template content
  captionTemplate: text("caption_template").notNull(), // Can include variables like {business_name}
  hashtagsTemplate: text("hashtags_template").array(),
  defaultMediaIds: integer("default_media_ids").array(),
  
  // Platform recommendations
  recommendedPlatforms: text("recommended_platforms").array(),
  
  // System templates (provided by platform) vs user-created
  isSystem: boolean("is_system").default(false),
  
  // Usage tracking
  useCount: integer("use_count").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Content Management Insert Schemas
export const insertSocialMediaAccountSchema = createInsertSchema(socialMediaAccounts).pick({
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
  metadata: true,
});

export const insertContentMediaSchema = createInsertSchema(contentMedia).pick({
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
  tags: true,
});

export const insertContentPostSchema = createInsertSchema(contentPosts).pick({
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
  templateId: true,
});

export const insertContentTemplateSchema = createInsertSchema(contentTemplates).pick({
  clientId: true,
  name: true,
  description: true,
  category: true,
  captionTemplate: true,
  hashtagsTemplate: true,
  defaultMediaIds: true,
  recommendedPlatforms: true,
});

// Content Management Types
export type SocialMediaAccount = typeof socialMediaAccounts.$inferSelect;
export type InsertSocialMediaAccount = z.infer<typeof insertSocialMediaAccountSchema>;
export type ContentMedia = typeof contentMedia.$inferSelect;
export type InsertContentMedia = z.infer<typeof insertContentMediaSchema>;
export type ContentPost = typeof contentPosts.$inferSelect;
export type InsertContentPost = z.infer<typeof insertContentPostSchema>;
export type ContentAnalytics = typeof contentAnalytics.$inferSelect;
export type ContentTemplate = typeof contentTemplates.$inferSelect;
export type InsertContentTemplate = z.infer<typeof insertContentTemplateSchema>;

// ========================================
// TASK MANAGEMENT SYSTEM
// ========================================

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Task details
  title: text("title").notNull(),
  description: text("description"),
  
  // Status and priority
  status: varchar("status", { length: 20 }).notNull().default("todo"), // todo, in_progress, completed, cancelled
  priority: varchar("priority", { length: 20 }).notNull().default("medium"), // low, medium, high, urgent
  
  // Assignment
  assignedTo: varchar("assigned_to", { length: 50 }), // "user", "assistant", or specific name
  assignedBy: varchar("assigned_by", { length: 50 }), // Who assigned it
  
  // Dates
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  
  // Additional metadata
  tags: text("tags").array(),
  relatedTo: jsonb("related_to"), // Link to other entities (posts, assessments, etc)
  
  // GitHub Integration
  githubIssueId: varchar("github_issue_id", { length: 50 }), // GitHub issue number (e.g., "#214")
  githubIssueUrl: text("github_issue_url"), // Full URL to GitHub issue
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

// ========================================
// BRAND COLORS
// ========================================

export const brandColors = pgTable("brand_colors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  hex: varchar("hex", { length: 7 }).notNull(), // #RRGGBB format
  usage: text("usage"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBrandColorSchema = createInsertSchema(brandColors).omit({
  id: true,
  createdAt: true,
});

export type BrandColor = typeof brandColors.$inferSelect;
export type InsertBrandColor = z.infer<typeof insertBrandColorSchema>;

// ============================================================================
// /RELATIONSHIPS - CRM (Customer Relationship Management)
// ============================================================================

// CRM Companies - Business accounts
export const crmCompanies = pgTable("crm_companies", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Company information
  name: varchar("name", { length: 255 }).notNull(),
  domain: varchar("domain", { length: 255 }),
  industry: varchar("industry", { length: 100 }),
  size: varchar("size", { length: 50 }), // 1-10, 11-50, 51-200, 201-500, 500+
  revenue: varchar("revenue", { length: 50 }), // <1M, 1M-10M, 10M-50M, 50M+
  
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
  type: varchar("type", { length: 50 }).default("prospect"), // prospect, customer, partner, vendor
  status: varchar("status", { length: 50 }).default("active"), // active, inactive, churned
  
  // Owner/assignment
  ownerId: integer("owner_id").references(() => clients.id),
  
  // Custom fields (JSON for flexibility)
  customFields: jsonb("custom_fields"),
  
  // Tags for segmentation
  tags: text("tags").array(),
  
  // Tracking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_companies_client").on(table.clientId),
  index("idx_crm_companies_domain").on(table.domain),
  index("idx_crm_companies_name").on(table.name),
]);

// CRM Contacts - Core contact records (single source of truth)
export const crmContacts = pgTable("crm_contacts", {
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
  status: varchar("status", { length: 50 }).default("active"), // active, inactive, unsubscribed
  lifecycleStage: varchar("lifecycle_stage", { length: 50 }).default("lead"), // lead, subscriber, opportunity, customer, evangelist
  
  // Lead scoring
  leadScore: integer("lead_score").default(0),
  leadSource: varchar("lead_source", { length: 100 }), // website, referral, cold_outreach, event, assessment, etc.
  
  // Source tracking - how this contact entered the system
  sourceType: varchar("source_type", { length: 50 }), // manual, import, assessment, portal_signup, api, form
  sourceId: varchar("source_id", { length: 100 }), // Reference to source entity (e.g., assessment ID)
  sourceMetadata: jsonb("source_metadata"), // Additional source details
  
  // Owner/assignment
  ownerId: integer("owner_id").references(() => clients.id),
  
  // Communication preferences
  emailOptIn: boolean("email_opt_in").default(true),
  smsOptIn: boolean("sms_opt_in").default(false),
  preferredContactMethod: varchar("preferred_contact_method", { length: 20 }), // email, phone, sms
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
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_contacts_client").on(table.clientId),
  index("idx_crm_contacts_company").on(table.companyId),
  index("idx_crm_contacts_email").on(table.email),
  index("idx_crm_contacts_lifecycle").on(table.lifecycleStage),
]);

// CRM Pipelines - Sales pipeline definitions
export const crmPipelines = pgTable("crm_pipelines", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isDefault: boolean("is_default").default(false),
  isActive: boolean("is_active").default(true),
  
  // Display order
  displayOrder: integer("display_order").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRM Pipeline Stages - Stages within a pipeline
export const crmPipelineStages = pgTable("crm_pipeline_stages", {
  id: serial("id").primaryKey(),
  pipelineId: integer("pipeline_id").references(() => crmPipelines.id).notNull(),
  
  name: varchar("name", { length: 100 }).notNull(),
  probability: integer("probability").default(0), // Win probability (0-100%)
  displayOrder: integer("display_order").default(0),
  
  // Stage type
  stageType: varchar("stage_type", { length: 20 }).default("active"), // active, won, lost
  
  // Color for visual display
  color: varchar("color", { length: 7 }).default("#3B82F6"), // Hex color
  
  createdAt: timestamp("created_at").defaultNow(),
});

// CRM Deals - Sales opportunities
export const crmDeals = pgTable("crm_deals", {
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
  probability: integer("probability").default(0), // Win probability (0-100%)
  expectedCloseDate: timestamp("expected_close_date"),
  actualCloseDate: timestamp("actual_close_date"),
  
  // Status
  status: varchar("status", { length: 20 }).default("open"), // open, won, lost
  lostReason: varchar("lost_reason", { length: 100 }),
  
  // Owner/assignment
  ownerId: integer("owner_id").references(() => clients.id),
  
  // Source
  dealSource: varchar("deal_source", { length: 100 }), // website, referral, cold_outreach, etc.
  
  // Custom fields
  customFields: jsonb("custom_fields"),
  
  // Tags
  tags: text("tags").array(),
  
  // Tracking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_deals_client").on(table.clientId),
  index("idx_crm_deals_contact").on(table.contactId),
  index("idx_crm_deals_stage").on(table.stageId),
  index("idx_crm_deals_status").on(table.status),
]);

// CRM Tasks - CRM-specific tasks linked to contacts/deals
export const crmTasks = pgTable("crm_tasks", {
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
  taskType: varchar("task_type", { length: 50 }).default("task"), // task, call, email, meeting, follow_up
  status: varchar("status", { length: 20 }).default("pending"), // pending, completed, cancelled
  priority: varchar("priority", { length: 20 }).default("medium"), // low, medium, high, urgent
  
  // Timing
  dueDate: timestamp("due_date"),
  reminderDate: timestamp("reminder_date"),
  completedAt: timestamp("completed_at"),
  
  // Assignment
  assignedToId: integer("assigned_to_id").references(() => clients.id),
  assignedById: integer("assigned_by_id").references(() => clients.id),
  
  // Tracking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_tasks_client").on(table.clientId),
  index("idx_crm_tasks_contact").on(table.contactId),
  index("idx_crm_tasks_due").on(table.dueDate),
  index("idx_crm_tasks_status").on(table.status),
]);

// CRM Notes - Notes on contacts, companies, deals
export const crmNotes = pgTable("crm_notes", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Linked entities (at least one should be set)
  contactId: integer("contact_id").references(() => crmContacts.id),
  companyId: integer("company_id").references(() => crmCompanies.id),
  dealId: integer("deal_id").references(() => crmDeals.id),
  
  // Note content
  content: text("content").notNull(),
  
  // Type
  noteType: varchar("note_type", { length: 50 }).default("general"), // general, call, meeting, email
  
  // Author
  authorId: integer("author_id").references(() => clients.id),
  
  // Pinned notes appear at top
  isPinned: boolean("is_pinned").default(false),
  
  // Tracking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_notes_contact").on(table.contactId),
  index("idx_crm_notes_company").on(table.companyId),
  index("idx_crm_notes_deal").on(table.dealId),
]);

// CRM Timeline - Unified activity timeline (Performance tier)
export const crmTimeline = pgTable("crm_timeline", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Linked entities
  contactId: integer("contact_id").references(() => crmContacts.id),
  companyId: integer("company_id").references(() => crmCompanies.id),
  dealId: integer("deal_id").references(() => crmDeals.id),
  
  // Event details
  eventType: varchar("event_type", { length: 50 }).notNull(), // email_sent, call_made, note_added, deal_stage_changed, form_submitted, etc.
  eventSubtype: varchar("event_subtype", { length: 50 }), // More specific event classification
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  
  // Source app (for integration events)
  sourceApp: varchar("source_app", { length: 50 }), // relationships, send, inbox, livechat, content, listings, reputation
  sourceEntityType: varchar("source_entity_type", { length: 50 }), // email, message, post, review, etc.
  sourceEntityId: varchar("source_entity_id", { length: 100 }), // ID in source app
  
  // Event metadata
  metadata: jsonb("metadata"), // Additional event-specific data
  
  // Who performed the action
  actorId: integer("actor_id").references(() => clients.id),
  actorType: varchar("actor_type", { length: 20 }), // user, system, automation
  
  // Tracking
  occurredAt: timestamp("occurred_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_timeline_contact").on(table.contactId),
  index("idx_crm_timeline_company").on(table.companyId),
  index("idx_crm_timeline_occurred").on(table.occurredAt),
  index("idx_crm_timeline_event_type").on(table.eventType),
]);

// CRM Segments - Dynamic contact segments
export const crmSegments = pgTable("crm_segments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  
  // Segment type
  segmentType: varchar("segment_type", { length: 20 }).default("dynamic"), // static, dynamic
  
  // Filter criteria (for dynamic segments)
  filterCriteria: jsonb("filter_criteria"), // { field, operator, value }[]
  
  // For static segments, member IDs are stored
  memberCount: integer("member_count").default(0),
  
  // Color for visual display
  color: varchar("color", { length: 7 }).default("#22C55E"),
  
  // Is this a system segment (can't be deleted)
  isSystem: boolean("is_system").default(false),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRM Segment Members - Static segment membership
export const crmSegmentMembers = pgTable("crm_segment_members", {
  id: serial("id").primaryKey(),
  segmentId: integer("segment_id").references(() => crmSegments.id).notNull(),
  contactId: integer("contact_id").references(() => crmContacts.id).notNull(),
  
  addedAt: timestamp("added_at").defaultNow(),
}, (table) => [
  unique().on(table.segmentId, table.contactId),
]);

// CRM Custom Field Definitions - Define custom fields for contacts/companies/deals
export const crmCustomFieldDefs = pgTable("crm_custom_field_defs", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Field details
  fieldName: varchar("field_name", { length: 100 }).notNull(),
  fieldLabel: varchar("field_label", { length: 100 }).notNull(),
  fieldType: varchar("field_type", { length: 30 }).notNull(), // text, number, date, select, multiselect, boolean, email, phone, url
  
  // Where this field applies
  entityType: varchar("entity_type", { length: 30 }).notNull(), // contact, company, deal
  
  // Options for select/multiselect
  options: text("options").array(),
  
  // Validation
  isRequired: boolean("is_required").default(false),
  defaultValue: text("default_value"),
  
  // Display
  displayOrder: integer("display_order").default(0),
  isHidden: boolean("is_hidden").default(false),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRM Appointments - Scheduler (Starter tier)
export const crmAppointments = pgTable("crm_appointments", {
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
  appointmentType: varchar("appointment_type", { length: 50 }).default("meeting"), // meeting, call, demo, consultation
  
  // Location
  location: varchar("location", { length: 255 }),
  meetingUrl: varchar("meeting_url", { length: 500 }), // Zoom, Google Meet, etc.
  
  // Status
  status: varchar("status", { length: 20 }).default("scheduled"), // scheduled, confirmed, cancelled, completed, no_show
  
  // Reminders
  reminderSent: boolean("reminder_sent").default(false),
  reminderMinutesBefore: integer("reminder_minutes_before").default(30),
  
  // Booking metadata
  bookedByContactEmail: varchar("booked_by_email", { length: 255 }),
  bookingNotes: text("booking_notes"),
  
  // Recurrence (optional)
  isRecurring: boolean("is_recurring").default(false),
  recurrenceRule: varchar("recurrence_rule", { length: 255 }), // RRULE format
  parentAppointmentId: integer("parent_appointment_id"),
  
  // Tracking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_appointments_client").on(table.clientId),
  index("idx_crm_appointments_contact").on(table.contactId),
  index("idx_crm_appointments_start").on(table.startTime),
]);

// CRM Tags - Reusable tags for contacts/companies/deals
export const crmTags = pgTable("crm_tags", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 7 }).default("#6B7280"), // Hex color
  
  // Usage count for display
  usageCount: integer("usage_count").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  unique().on(table.clientId, table.name),
]);

// CRM Subscriptions - Track /relationships tier per client
export const crmSubscriptions = pgTable("crm_subscriptions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).unique(),
  
  // Tier: starter (free), performance ($29/mo)
  tier: varchar("tier", { length: 20 }).notNull().default("starter"),
  
  // Billing
  billingCycle: varchar("billing_cycle", { length: 20 }), // monthly, annual (null for starter)
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  
  // Status
  status: varchar("status", { length: 20 }).default("active"), // active, cancelled, past_due
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRM Lead Capture Forms - Embeddable forms for contact collection
export const crmLeadForms = pgTable("crm_lead_forms", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Form identity
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull(), // URL-friendly identifier
  description: text("description"),
  
  // Form configuration
  fields: jsonb("fields").notNull().default([
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: false },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: false },
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
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique().on(table.clientId, table.slug),
  index("idx_crm_lead_forms_client").on(table.clientId),
]);

// Insert schemas for CRM tables
export const insertCrmCompanySchema = createInsertSchema(crmCompanies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmContactSchema = createInsertSchema(crmContacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmPipelineSchema = createInsertSchema(crmPipelines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmPipelineStageSchema = createInsertSchema(crmPipelineStages).omit({
  id: true,
  createdAt: true,
});

export const insertCrmDealSchema = createInsertSchema(crmDeals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmTaskSchema = createInsertSchema(crmTasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmNoteSchema = createInsertSchema(crmNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmTimelineSchema = createInsertSchema(crmTimeline).omit({
  id: true,
  createdAt: true,
});

export const insertCrmSegmentSchema = createInsertSchema(crmSegments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmAppointmentSchema = createInsertSchema(crmAppointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmTagSchema = createInsertSchema(crmTags).omit({
  id: true,
  createdAt: true,
});

export const insertCrmCustomFieldDefSchema = createInsertSchema(crmCustomFieldDefs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmSubscriptionSchema = createInsertSchema(crmSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmLeadFormSchema = createInsertSchema(crmLeadForms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submissionCount: true,
});

// CRM Automations - Workflow automation engine (Performance tier)
export const crmAutomations = pgTable("crm_automations", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Basic info
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Trigger configuration
  triggerType: varchar("trigger_type", { length: 50 }).notNull(), // contact_created, contact_updated, deal_stage_changed, form_submitted, tag_added, manual
  triggerConfig: jsonb("trigger_config").default({}), // Additional trigger conditions
  
  // Status
  isActive: boolean("is_active").default(true),
  
  // Stats
  runCount: integer("run_count").default(0),
  lastRunAt: timestamp("last_run_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Automation steps (actions to perform)
export const crmAutomationSteps = pgTable("crm_automation_steps", {
  id: serial("id").primaryKey(),
  automationId: integer("automation_id").references(() => crmAutomations.id, { onDelete: "cascade" }).notNull(),
  
  // Ordering
  stepOrder: integer("step_order").notNull(),
  
  // Step type and config
  stepType: varchar("step_type", { length: 50 }).notNull(), // wait, update_contact, add_tag, remove_tag, send_email, create_task, add_to_segment, webhook
  config: jsonb("config").default({}), // Step-specific configuration
  
  // Conditional execution
  conditionType: varchar("condition_type", { length: 50 }), // if_tag, if_stage, if_field, always
  conditionConfig: jsonb("condition_config").default({}),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Automation execution log
export const crmAutomationExecutions = pgTable("crm_automation_executions", {
  id: serial("id").primaryKey(),
  automationId: integer("automation_id").references(() => crmAutomations.id, { onDelete: "cascade" }).notNull(),
  contactId: integer("contact_id").references(() => crmContacts.id),
  
  // Execution status
  status: varchar("status", { length: 20 }).notNull().default("running"), // running, completed, failed, cancelled
  
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
  executionLog: jsonb("execution_log").default([]),
});

export const insertCrmAutomationSchema = createInsertSchema(crmAutomations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  runCount: true,
  lastRunAt: true,
});

export const insertCrmAutomationStepSchema = createInsertSchema(crmAutomationSteps).omit({
  id: true,
  createdAt: true,
});

// CRM Types
export type CrmCompany = typeof crmCompanies.$inferSelect;
export type InsertCrmCompany = z.infer<typeof insertCrmCompanySchema>;
export type CrmContact = typeof crmContacts.$inferSelect;
export type InsertCrmContact = z.infer<typeof insertCrmContactSchema>;
export type CrmPipeline = typeof crmPipelines.$inferSelect;
export type InsertCrmPipeline = z.infer<typeof insertCrmPipelineSchema>;
export type CrmPipelineStage = typeof crmPipelineStages.$inferSelect;
export type InsertCrmPipelineStage = z.infer<typeof insertCrmPipelineStageSchema>;
export type CrmDeal = typeof crmDeals.$inferSelect;
export type InsertCrmDeal = z.infer<typeof insertCrmDealSchema>;
export type CrmTask = typeof crmTasks.$inferSelect;
export type InsertCrmTask = z.infer<typeof insertCrmTaskSchema>;
export type CrmNote = typeof crmNotes.$inferSelect;
export type InsertCrmNote = z.infer<typeof insertCrmNoteSchema>;
export type CrmTimeline = typeof crmTimeline.$inferSelect;
export type InsertCrmTimeline = z.infer<typeof insertCrmTimelineSchema>;
export type CrmSegment = typeof crmSegments.$inferSelect;
export type InsertCrmSegment = z.infer<typeof insertCrmSegmentSchema>;
export type CrmSegmentMember = typeof crmSegmentMembers.$inferSelect;
export type CrmAppointment = typeof crmAppointments.$inferSelect;
export type InsertCrmAppointment = z.infer<typeof insertCrmAppointmentSchema>;
export type CrmTag = typeof crmTags.$inferSelect;
export type InsertCrmTag = z.infer<typeof insertCrmTagSchema>;
export type CrmCustomFieldDef = typeof crmCustomFieldDefs.$inferSelect;
export type InsertCrmCustomFieldDef = z.infer<typeof insertCrmCustomFieldDefSchema>;
export type CrmSubscription = typeof crmSubscriptions.$inferSelect;
export type InsertCrmSubscription = z.infer<typeof insertCrmSubscriptionSchema>;
export type CrmLeadForm = typeof crmLeadForms.$inferSelect;
export type InsertCrmLeadForm = z.infer<typeof insertCrmLeadFormSchema>;
export type CrmAutomation = typeof crmAutomations.$inferSelect;
export type InsertCrmAutomation = z.infer<typeof insertCrmAutomationSchema>;
export type CrmAutomationStep = typeof crmAutomationSteps.$inferSelect;
export type InsertCrmAutomationStep = z.infer<typeof insertCrmAutomationStepSchema>;
export type CrmAutomationExecution = typeof crmAutomationExecutions.$inferSelect;

// ============================================================================
// PUBLIC API - API Keys for External Integration
// ============================================================================

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }),
  
  // Key identification
  name: varchar("name", { length: 100 }).notNull(),
  keyHash: varchar("key_hash", { length: 64 }).notNull().unique(), // SHA-256 hash of the actual key
  keyPrefix: varchar("key_prefix", { length: 8 }).notNull(), // First 8 chars for identification
  
  // Permissions and scopes
  scopes: text("scopes").array().default([]), // read:contacts, write:contacts, read:deals, etc.
  
  // Rate limiting
  rateLimit: integer("rate_limit").default(1000), // requests per hour
  requestsThisHour: integer("requests_this_hour").default(0),
  rateLimitResetAt: timestamp("rate_limit_reset_at"),
  
  // Tracking
  lastUsedAt: timestamp("last_used_at"),
  totalRequests: integer("total_requests").default(0),
  
  // Status
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_api_keys_hash").on(table.keyHash),
  index("idx_api_keys_client").on(table.clientId),
]);

export const insertApiKeySchema = createInsertSchema(apiKeys).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Webhook subscriptions for external integrations
export const webhookSubscriptions = pgTable("webhook_subscriptions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }),
  
  // Webhook configuration
  url: text("url").notNull(),
  secret: varchar("secret", { length: 64 }).notNull(), // For signature verification
  
  // Events to subscribe to
  events: text("events").array().default([]), // contact.created, deal.updated, etc.
  
  // Status
  isActive: boolean("is_active").default(true),
  failureCount: integer("failure_count").default(0),
  lastFailedAt: timestamp("last_failed_at"),
  lastSuccessAt: timestamp("last_success_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertWebhookSubscriptionSchema = createInsertSchema(webhookSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// API Types
export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;
export type WebhookSubscription = typeof webhookSubscriptions.$inferSelect;
export type InsertWebhookSubscription = z.infer<typeof insertWebhookSubscriptionSchema>;

// ============================================================================
// SUPPORT TICKETS - Client Support System
// ============================================================================

export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  
  // Ticket details
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).default("general"), // general, billing, technical, feature_request
  
  // Status tracking
  status: varchar("status", { length: 30 }).default("open"), // open, in_progress, waiting_on_client, resolved, closed
  priority: varchar("priority", { length: 20 }).default("medium"), // low, medium, high, urgent
  
  // Assignment
  assignedToId: integer("assigned_to_id").references(() => clients.id),
  assignedAt: timestamp("assigned_at"),
  
  // Resolution
  resolution: text("resolution"),
  resolvedAt: timestamp("resolved_at"),
  
  // SLA tracking
  firstResponseAt: timestamp("first_response_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ticket_client").on(table.clientId),
  index("idx_ticket_status").on(table.status),
]);

// Ticket comments/messages
export const ticketComments = pgTable("ticket_comments", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id").references(() => supportTickets.id, { onDelete: "cascade" }).notNull(),
  
  // Comment author
  authorId: integer("author_id").references(() => clients.id),
  authorType: varchar("author_type", { length: 20 }).notNull(), // admin, client
  
  // Content
  content: text("content").notNull(),
  isInternal: boolean("is_internal").default(false), // internal notes vs client-visible
  
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// AI PRESCRIPTIONS - Generated Business Recommendations
// ============================================================================

export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  assessmentId: integer("assessment_id").references(() => assessments.id),
  
  // Prescription details
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  
  // AI-generated content
  recommendations: jsonb("recommendations"), // Array of recommendation objects
  actionItems: jsonb("action_items"), // Prioritized action items
  timeline: jsonb("timeline"), // Implementation timeline
  
  // Status workflow
  status: varchar("status", { length: 30 }).default("pending_review"), // pending_review, approved, delivered, in_progress, completed
  
  // Review workflow
  reviewedById: integer("reviewed_by_id").references(() => clients.id),
  reviewedAt: timestamp("reviewed_at"),
  reviewNotes: text("review_notes"),
  
  // Delivery tracking
  deliveredAt: timestamp("delivered_at"),
  viewedAt: timestamp("viewed_at"),
  
  // Implementation tracking
  implementationProgress: integer("implementation_progress").default(0), // 0-100
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_prescription_client").on(table.clientId),
  index("idx_prescription_status").on(table.status),
]);

// Admin activity log
export const adminActivityLog = pgTable("admin_activity_log", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => clients.id),
  
  // Action details
  action: varchar("action", { length: 100 }).notNull(), // view_client, update_status, approve_prescription, etc.
  resourceType: varchar("resource_type", { length: 50 }), // client, ticket, prescription, etc.
  resourceId: integer("resource_id"),
  
  // Context
  details: jsonb("details"),
  ipAddress: varchar("ip_address", { length: 45 }),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTicketCommentSchema = createInsertSchema(ticketComments).omit({
  id: true,
  createdAt: true,
});

export const insertPrescriptionSchema = createInsertSchema(prescriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdminActivityLogSchema = createInsertSchema(adminActivityLog).omit({
  id: true,
  createdAt: true,
});

// Update schemas for partial updates
export const updateSupportTicketSchema = z.object({
  status: z.enum(['open', 'in_progress', 'waiting_on_client', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  resolution: z.string().optional(),
});

export const updatePrescriptionSchema = z.object({
  status: z.enum(['pending_review', 'approved', 'delivered', 'in_progress', 'completed']).optional(),
  reviewNotes: z.string().optional(),
  implementationProgress: z.number().min(0).max(100).optional(),
});

// Support & Prescription Types
export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type UpdateSupportTicket = z.infer<typeof updateSupportTicketSchema>;
export type TicketComment = typeof ticketComments.$inferSelect;
export type InsertTicketComment = z.infer<typeof insertTicketCommentSchema>;
export type Prescription = typeof prescriptions.$inferSelect;
export type InsertPrescription = z.infer<typeof insertPrescriptionSchema>;
export type UpdatePrescription = z.infer<typeof updatePrescriptionSchema>;
export type AdminActivityLog = typeof adminActivityLog.$inferSelect;
export type InsertAdminActivityLog = z.infer<typeof insertAdminActivityLogSchema>;

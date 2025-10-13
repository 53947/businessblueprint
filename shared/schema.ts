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

// Client data
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").unique(), // External reference (Synup, etc.)
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

// Synup Locations - Business locations managed through Synup
export const synupLocations = pgTable("synup_locations", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  synupLocationId: text("synup_location_id").unique().notNull(), // Synup's location ID
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull().default('US'),
  postalCode: text("postal_code").notNull(),
  phone: text("phone").notNull(),
  website: text("website"),
  email: text("email"),
  category: text("category"),
  status: text("status").default('active'), // active, inactive, pending
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Synup Listings - Directory listing status across 200+ platforms
export const synupListings = pgTable("synup_listings", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").references(() => synupLocations.id),
  synupListingId: text("synup_listing_id").unique(),
  platform: text("platform").notNull(), // Google, Yelp, Facebook, Bing, etc.
  status: text("status").notNull(), // published, pending, claimed, unclaimed, error
  url: text("url"),
  lastSynced: timestamp("last_synced"),
  syncStatus: text("sync_status"), // success, failed, in_progress
  visibility: boolean("visibility").default(true),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Synup Reviews - Review management across 80+ platforms
export const synupReviews = pgTable("synup_reviews", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").references(() => synupLocations.id),
  synupReviewId: text("synup_review_id").unique(),
  platform: text("platform").notNull(), // Google, Yelp, Facebook, TripAdvisor, etc.
  rating: integer("rating").notNull(), // 1-5 stars
  reviewText: text("review_text"),
  reviewerName: text("reviewer_name"),
  reviewerAvatar: text("reviewer_avatar"),
  reviewDate: timestamp("review_date").notNull(),
  response: text("response"),
  responseDate: timestamp("response_date"),
  sentiment: text("sentiment"), // positive, negative, neutral
  status: text("status").default('new'), // new, responded, flagged, archived
  isAIGenerated: boolean("is_ai_generated").default(false), // Was response AI-generated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

// Synup insert schemas
export const insertSynupLocationSchema = createInsertSchema(synupLocations).pick({
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
  status: true,
});

export const insertSynupListingSchema = createInsertSchema(synupListings).pick({
  locationId: true,
  synupListingId: true,
  platform: true,
  status: true,
  url: true,
  lastSynced: true,
  syncStatus: true,
  visibility: true,
  errorMessage: true,
});

export const insertSynupReviewSchema = createInsertSchema(synupReviews).pick({
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
  isAIGenerated: true,
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
  icon: varchar("icon", { length: 50 }), // Icon name from lucide-react (Brain, Ship, Sparkles, etc.)
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
export type SynupLocation = typeof synupLocations.$inferSelect;
export type InsertSynupLocation = z.infer<typeof insertSynupLocationSchema>;
export type SynupListing = typeof synupListings.$inferSelect;
export type InsertSynupListing = z.infer<typeof insertSynupListingSchema>;
export type SynupReview = typeof synupReviews.$inferSelect;
export type InsertSynupReview = z.infer<typeof insertSynupReviewSchema>;

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

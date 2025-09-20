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
  status: varchar("status", { length: 30 }).notNull(), // active, cancelled, paused, past_due
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  
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

import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean
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

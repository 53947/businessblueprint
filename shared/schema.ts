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

// Types
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;

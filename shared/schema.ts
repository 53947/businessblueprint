                               
  // ===== Business Listings Tables =====

  export const businessListings = pgTable("business_listings", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    platform: varchar("platform", { length: 100 }).notNull(),
    platformId: varchar("platform_id", { length: 255 }),
    name: varchar("name", { length: 255 }).notNull(),
    address: text("address"),
    phone: varchar("phone", { length: 30 }),
    website: varchar("website", { length: 500 }),
    hours: text("hours"),
    status: varchar("status", { length: 20 }).default("pending"),
    url: varchar("url", { length: 500 }),
    rating: decimal("rating", { precision: 2, scale: 1 }),
    reviewCount: integer("review_count").default(0),
    source: varchar("source", { length: 20 }).default("manual"),
    lastSyncedAt: timestamp("last_synced_at"),
    syncStatus: varchar("sync_status", { length: 20 }).default("none"),
    syncError: text("sync_error"),
    platformData: jsonb("platform_data"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  }, (table) => [
    index("idx_business_listings_client").on(table.clientId),
    index("idx_business_listings_platform").on(table.platform),
    index("idx_business_listings_status").on(table.status),
  ]);

  export const listingSyncLogs = pgTable("listing_sync_logs", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    syncType: varchar("sync_type", { length: 20 }).notNull(),
    status: varchar("status", { length: 20 }).notNull(),
    platformsScanned: text("platforms_scanned").array(),
    listingsFound: integer("listings_found").default(0),
    listingsCreated: integer("listings_created").default(0),
    listingsUpdated: integer("listings_updated").default(0),
    errors: jsonb("errors"),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  });

  export const listingMetricsSnapshots = pgTable("listing_metrics_snapshots", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    listingId: integer("listing_id").references(() => businessListings.id),
    views: integer("views").default(0),
    clicks: integer("clicks").default(0),
    calls: integer("calls").default(0),
    periodStart: timestamp("period_start").notNull(),
    periodEnd: timestamp("period_end").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  });

  // Business Listings Schemas
  export const insertBusinessListingSchema = createInsertSchema(businessListings).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

  export const updateBusinessListingSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    hours: z.string().optional(),
    status: z.enum(["active", "pending", "error"]).optional(),
    url: z.string().optional(),
    rating: z.string().optional(),
    reviewCount: z.number().optional(),
  });

  export const insertListingSyncLogSchema = createInsertSchema(listingSyncLogs).omit({
    id: true,
    startedAt: true,
  });

  // Business Listings Types
  export type BusinessListing = typeof businessListings.$inferSelect;
  export type InsertBusinessListing = z.infer<typeof insertBusinessListingSchema>;
  export type UpdateBusinessListing = z.infer<typeof updateBusinessListingSchema>;
  export type ListingSyncLog = typeof listingSyncLogs.$inferSelect;
  export type ListingMetricsSnapshot = typeof listingMetricsSnapshots.$inferSelect;

  // ============================================================================
  // LISTING DISTRIBUTION SYSTEM — Push to 100+ Directories
  // ============================================================================

  // Canonical Business Profiles — Single source of truth per client
  export const canonicalBusinessProfiles = pgTable("canonical_business_profiles", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull().unique(),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    address1: text("address1").notNull(),
    address2: text("address2"),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    zip: varchar("zip", { length: 20 }).notNull(),
    country: varchar("country", { length: 100 }).notNull().default("US"),
    phone: varchar("phone", { length: 30 }).notNull(),
    website: varchar("website", { length: 500 }),
    email: varchar("email", { length: 255 }),
    fax: varchar("fax", { length: 30 }),
    categories: text("categories").array(),
    description: text("description"),
    shortDescription: varchar("short_description", { length: 255 }),
    yearEstablished: integer("year_established"),
    employeeCount: integer("employee_count"),
    hours: jsonb("hours"),
    specialHours: jsonb("special_hours"),
    logoUrl: varchar("logo_url", { length: 500 }),
    coverPhotoUrl: varchar("cover_photo_url", { length: 500 }),
    photoUrls: text("photo_urls").array(),
    facebookUrl: varchar("facebook_url", { length: 500 }),
    instagramUrl: varchar("instagram_url", { length: 500 }),
    linkedinUrl: varchar("linkedin_url", { length: 500 }),
    twitterUrl: varchar("twitter_url", { length: 500 }),
    youtubeUrl: varchar("youtube_url", { length: 500 }),
    paymentMethods: text("payment_methods").array(),
    amenities: text("amenities").array(),
    serviceArea: jsonb("service_area"),
    dataVersion: integer("data_version").notNull().default(1),
    lastModifiedFields: text("last_modified_fields").array(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  }, (table) => [
    index("idx_canonical_profiles_client").on(table.clientId),
  ]);

  // Distribution Targets — Registry of all supported aggregators/platforms
  export const distributionTargets = pgTable("distribution_targets", {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 50 }).notNull().unique(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    type: varchar("type", { length: 20 }).notNull(),
    adapterKey: varchar("adapter_key", { length: 50 }).notNull(),
    requiredEnvVars: text("required_env_vars").array(),
    isEnabled: boolean("is_enabled").default(false),
    feedsDirectories: text("feeds_directories").array(),
    description: text("description"),
    estimatedProcessingTime: varchar("estimated_processing_time", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  });

  // Distribution Submissions — Per-client per-target tracking
  export const distributionSubmissions = pgTable("distribution_submissions", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    targetId: integer("target_id").references(() => distributionTargets.id).notNull(),
    profileId: integer("profile_id").references(() => canonicalBusinessProfiles.id).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
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
    updatedAt: timestamp("updated_at").defaultNow(),
  }, (table) => [
    index("idx_dist_submissions_client").on(table.clientId),
    index("idx_dist_submissions_target").on(table.targetId),
    index("idx_dist_submissions_status").on(table.status),
    index("idx_dist_submissions_resync").on(table.needsResync),
    unique("uq_dist_submissions_client_target").on(table.clientId, table.targetId),
  ]);

  // Distribution Logs — Audit trail of every API call
  export const distributionLogs = pgTable("distribution_logs", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    submissionId: integer("submission_id").references(() => distributionSubmissions.id),
    targetSlug: varchar("target_slug", { length: 50 }).notNull(),
    action: varchar("action", { length: 20 }).notNull(),
    status: varchar("status", { length: 20 }).notNull(),
    requestPayload: jsonb("request_payload"),
    responsePayload: jsonb("response_payload"),
    errorMessage: text("error_message"),
    durationMs: integer("duration_ms"),
    dataVersion: integer("data_version"),
    createdAt: timestamp("created_at").defaultNow(),
  }, (table) => [
    index("idx_dist_logs_client").on(table.clientId),
    index("idx_dist_logs_submission").on(table.submissionId),
    index("idx_dist_logs_target").on(table.targetSlug),
  ]);

  // Distribution Schemas
  export const insertCanonicalProfileSchema = createInsertSchema(canonicalBusinessProfiles).omit({
    id: true,
    dataVersion: true,
    createdAt: true,
    updatedAt: true,
  });

  export const updateCanonicalProfileSchema = z.object({
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
    serviceArea: z.any().nullable().optional(),
  });

  // Distribution Types
  export type CanonicalBusinessProfile = typeof canonicalBusinessProfiles.$inferSelect;
  export type InsertCanonicalProfile = z.infer<typeof insertCanonicalProfileSchema>;
  export type UpdateCanonicalProfile = z.infer<typeof updateCanonicalProfileSchema>;
  export type DistributionTarget = typeof distributionTargets.$inferSelect;
  export type DistributionSubmission = typeof distributionSubmissions.$inferSelect;
  export type DistributionLog = typeof distributionLogs.$inferSelect;

  // ============================================================================
  // / CHAT - HOSTED LIVE CHAT SAAS PLATFORM
  // Multi-tenant live chat widget system hosted by BusinessBlueprint
  // ============================================================================

  // Widget settings per customer (companies using / chat)
  export const chatWidgetSettings = pgTable("chat_widget_settings", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }).notNull().unique(),
    companyName: varchar("company_name", { length: 255 }).default("Support"),
    welcomeMessage: text("welcome_message").default("Hi! How can we help you today?"),
    primaryColor: varchar("primary_color", { length: 7 }).default("#0000FF"),
    position: varchar("position", { length: 20 }).default("bottom-right"),
    requireEmail: boolean("require_email").default(false),
    requireName: boolean("require_name").default(false),
    customFields: jsonb("custom_fields").default([]),
    enableSound: boolean("enable_sound").default(true),
    offlineMessage: text("offline_message").default("We're offline. Leave a message and we'll get back to you!"),
    businessHours: jsonb("business_hours"),
    autoOpenDelay: integer("auto_open_delay"),
    proactiveMessage: text("proactive_message"),
    proactiveDelay: integer("proactive_delay"),
    gdprEnabled: boolean("gdpr_enabled").default(false),
    gdprText: text("gdpr_text"),
    gdprPrivacyUrl: text("gdpr_privacy_url"),
    fileUploadsEnabled: boolean("file_uploads_enabled").default(true),
    maxFileSize: integer("max_file_size").default(5242880),
    rateLimit: integer("rate_limit").default(10),
    crmSyncEnabled: boolean("crm_sync_enabled").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  });

  // Chat agents (customer's team members who respond to chats)
  export const chatAgents = pgTable("chat_agents", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    role: varchar("role", { length: 50 }).default("agent"),
    status: varchar("status", { length: 50 }).default("offline"),
    lastSeenAt: timestamp("last_seen_at"),
    emailNotifications: boolean("email_notifications").default(true),
    soundNotifications: boolean("sound_notifications").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  }, (table) => [
    unique().on(table.clientId, table.email),
    index("idx_chat_agents_client").on(table.clientId),
  ]);

  // Chat analytics events (anonymized behavioral data)
  export const chatAnalyticsEvents = pgTable("chat_analytics_events", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id, { onDelete: "cascade" }).notNull(),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    eventData: jsonb("event_data"),
    createdAt: timestamp("created_at").defaultNow(),
  }, (table) => [
    index("idx_chat_analytics_client").on(table.clientId),
    index("idx_chat_analytics_type").on(table.eventType),
    index("idx_chat_analytics_created").on(table.createdAt),
  ]);

  // Insert schemas for / chat
  export const insertChatWidgetSettingsSchema = createInsertSchema(chatWidgetSettings).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

  export const insertChatAgentSchema = createInsertSchema(chatAgents).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

  export const insertChatAnalyticsEventSchema = createInsertSchema(chatAnalyticsEvents).omit({
    id: true,
    createdAt: true,
  });

  export const updateChatWidgetSettingsSchema = z.object({
    companyName: z.string().optional(),
    welcomeMessage: z.string().optional(),
    primaryColor: z.string().optional(),
    position: z.enum(["bottom-right", "bottom-left"]).optional(),
    requireEmail: z.boolean().optional(),
    requireName: z.boolean().optional(),
    customFields: z.array(z.object({
      name: z.string(),
      label: z.string(),
      type: z.enum(["text", "email", "tel", "select"]),
      required: z.boolean().optional(),
      options: z.array(z.string()).optional(),
    })).optional(),
    enableSound: z.boolean().optional(),
    offlineMessage: z.string().optional(),
    businessHours: z.record(z.object({ start: z.string(), end: z.string() })).optional(),
    autoOpenDelay: z.number().optional(),
    proactiveMessage: z.string().optional(),
    proactiveDelay: z.number().optional(),
    gdprEnabled: z.boolean().optional(),
    gdprText: z.string().optional(),
    gdprPrivacyUrl: z.string().optional(),
    fileUploadsEnabled: z.boolean().optional(),
    maxFileSize: z.number().optional(),
    rateLimit: z.number().optional(),
    crmSyncEnabled: z.boolean().optional(),
  });

  // / chat Types
  export type ChatWidgetSettings = typeof chatWidgetSettings.$inferSelect;
  export type InsertChatWidgetSettings = z.infer<typeof insertChatWidgetSettingsSchema>;
  export type UpdateChatWidgetSettings = z.infer<typeof updateChatWidgetSettingsSchema>;
  export type ChatAgent = typeof chatAgents.$inferSelect;
  export type InsertChatAgent = z.infer<typeof insertChatAgentSchema>;
  export type ChatAnalyticsEvent = typeof chatAnalyticsEvents.$inferSelect;
  export type InsertChatAnalyticsEvent = z.infer<typeof insertChatAnalyticsEventSchema>;
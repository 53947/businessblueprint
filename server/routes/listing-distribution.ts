import { Router } from "express";
import { db } from "../db";
import {
  canonicalBusinessProfiles,
  distributionTargets,
  distributionSubmissions,
  distributionLogs,
  insertCanonicalProfileSchema,
  updateCanonicalProfileSchema,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { listingDistributionService } from "../services/listing-distribution/distributionService";
import { getAdapter, getDirectoryCoverage, getTotalDirectoryCount } from "../services/listing-distribution/listingAdapterFactory";
import { seedDistributionTargets } from "../services/listing-distribution/seedTargets";

export const listingDistributionRouter = Router();

// ─── Canonical Profile CRUD ──────────────────────────────────────────

/**
 * GET /api/clients/:id/distribution/profile
 * Get canonical profile for a client (auto-creates from client data if none exists).
 */
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
  } catch (error: any) {
    console.error("Error fetching canonical profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/**
 * POST /api/clients/:id/distribution/profile
 * Create or replace canonical profile.
 */
listingDistributionRouter.post("/clients/:id/distribution/profile", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const data = insertCanonicalProfileSchema.parse({ ...req.body, clientId });

    // Upsert: delete existing then insert
    const existing = await listingDistributionService.getProfile(clientId);
    if (existing) {
      await db.delete(canonicalBusinessProfiles).where(eq(canonicalBusinessProfiles.id, existing.id));
    }

    const [profile] = await db.insert(canonicalBusinessProfiles).values(data).returning();
    res.json({ success: true, profile });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating canonical profile:", error);
    res.status(500).json({ error: "Failed to create profile" });
  }
});

/**
 * PATCH /api/clients/:id/distribution/profile
 * Partial update — bumps dataVersion and flags resyncs on active submissions.
 */
listingDistributionRouter.patch("/clients/:id/distribution/profile", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const existing = await listingDistributionService.getProfile(clientId);
    if (!existing) {
      return res.status(404).json({ error: "No canonical profile found for this client" });
    }

    const validated = updateCanonicalProfileSchema.parse(req.body);
    const changedFields = Object.keys(validated).filter((k) => validated[k as keyof typeof validated] !== undefined);

    if (changedFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const [updated] = await db.update(canonicalBusinessProfiles).set({
      ...validated,
      dataVersion: existing.dataVersion + 1,
      lastModifiedFields: changedFields,
      updatedAt: new Date(),
    }).where(eq(canonicalBusinessProfiles.id, existing.id)).returning();

    // Flag active submissions for resync
    const flagged = await listingDistributionService.flagResyncNeeded(clientId, changedFields);

    res.json({ success: true, profile: updated, resyncFlagged: flagged });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error updating canonical profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ─── Distribution Targets ────────────────────────────────────────────

/**
 * GET /api/distribution/targets
 * List all targets with enabled/configured status.
 */
listingDistributionRouter.get("/distribution/targets", async (_req, res) => {
  try {
    const targets = await db.select().from(distributionTargets).orderBy(distributionTargets.slug);

    const enriched = targets.map((t) => {
      const adapter = getAdapter(t.adapterKey);
      return {
        ...t,
        isConfigured: adapter ? adapter.isConfigured() : false,
        capabilities: adapter ? adapter.getCapabilities() : null,
      };
    });

    res.json({ success: true, targets: enriched });
  } catch (error: any) {
    console.error("Error fetching distribution targets:", error);
    res.status(500).json({ error: "Failed to fetch targets" });
  }
});

/**
 * GET /api/distribution/targets/coverage
 * Full directory coverage map.
 */
listingDistributionRouter.get("/distribution/targets/coverage", async (_req, res) => {
  try {
    const coverage = getDirectoryCoverage();
    const totalDirectories = getTotalDirectoryCount();

    res.json({ success: true, coverage, totalDirectories });
  } catch (error: any) {
    console.error("Error fetching coverage:", error);
    res.status(500).json({ error: "Failed to fetch coverage" });
  }
});

// ─── Submissions & Status ────────────────────────────────────────────

/**
 * GET /api/clients/:id/distribution/submissions
 * All submissions for client with target details.
 */
listingDistributionRouter.get("/clients/:id/distribution/submissions", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const submissions = await listingDistributionService.getClientSubmissions(clientId);
    res.json({ success: true, submissions });
  } catch (error: any) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

/**
 * GET /api/clients/:id/distribution/status
 * Summary: counts by status, coverage, last distributed.
 */
listingDistributionRouter.get("/clients/:id/distribution/status", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const status = await listingDistributionService.getClientDistributionStatus(clientId);
    res.json({ success: true, ...status });
  } catch (error: any) {
    console.error("Error fetching distribution status:", error);
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

/**
 * GET /api/clients/:id/distribution/logs
 * Audit logs for a client.
 */
listingDistributionRouter.get("/clients/:id/distribution/logs", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
    const logs = await db
      .select()
      .from(distributionLogs)
      .where(eq(distributionLogs.clientId, clientId))
      .orderBy(desc(distributionLogs.createdAt))
      .limit(limit);

    res.json({ success: true, logs });
  } catch (error: any) {
    console.error("Error fetching distribution logs:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// ─── Distribution Triggers ───────────────────────────────────────────

/**
 * POST /api/clients/:id/distribution/distribute
 * Trigger distribution to all (or selected) targets.
 * Body: { targetSlugs?: string[] }
 */
listingDistributionRouter.post("/clients/:id/distribution/distribute", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const { targetSlugs } = req.body || {};
    const result = await listingDistributionService.distributeToAll(clientId, targetSlugs);

    res.json(result);
  } catch (error: any) {
    console.error("Error distributing listings:", error);
    res.status(500).json({ error: error.message || "Failed to distribute" });
  }
});

/**
 * POST /api/clients/:id/distribution/distribute/:targetSlug
 * Re-push to single target.
 */
listingDistributionRouter.post("/clients/:id/distribution/distribute/:targetSlug", async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const { targetSlug } = req.params;
    const result = await listingDistributionService.distributeToTarget(clientId, targetSlug);

    res.json(result);
  } catch (error: any) {
    console.error("Error distributing to target:", error);
    res.status(500).json({ error: error.message || "Failed to distribute" });
  }
});

// ─── Admin ───────────────────────────────────────────────────────────

/**
 * POST /api/admin/distribution/targets/seed
 * Seed/refresh the distribution targets table.
 */
listingDistributionRouter.post("/admin/distribution/targets/seed", async (_req, res) => {
  try {
    const result = await seedDistributionTargets();
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Error seeding targets:", error);
    res.status(500).json({ error: "Failed to seed targets" });
  }
});

/**
 * POST /api/admin/distribution/resync
 * Process resync queue (admin trigger for testing, normally called by scheduler).
 * Body: { batchSize?: number }
 */
listingDistributionRouter.post("/admin/distribution/resync", async (req, res) => {
  try {
    const batchSize = parseInt(req.body?.batchSize) || 10;
    const result = await listingDistributionService.processResyncQueue(batchSize);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Error processing resync:", error);
    res.status(500).json({ error: "Failed to process resync" });
  }
});

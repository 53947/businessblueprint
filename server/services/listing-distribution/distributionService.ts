import { db } from "../../db";
import {
  canonicalBusinessProfiles,
  distributionTargets,
  distributionSubmissions,
  distributionLogs,
  clients,
  type CanonicalBusinessProfile,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import { getAdapter } from "./listingAdapterFactory";
import type { ListingData, SubmissionResult } from "./baseListingAdapter";

/**
 * Core listing distribution orchestrator.
 * Pushes canonical business profiles to aggregators and direct platform APIs,
 * tracks submission status, and handles resync when data changes.
 */
class ListingDistributionService {

  /**
   * Distribute a client's canonical profile to all (or selected) targets.
   */
  async distributeToAll(clientId: number, targetSlugs?: string[]): Promise<{
    total: number;
    submitted: number;
    skipped: number;
    errors: number;
    results: Array<{ targetSlug: string; success: boolean; status: string; message?: string }>;
  }> {
    const profile = await this.getProfile(clientId);
    if (!profile) {
      throw new Error(`No canonical profile found for client ${clientId}`);
    }

    // Get targets to distribute to
    let targets = await db.select().from(distributionTargets);
    if (targetSlugs?.length) {
      targets = targets.filter((t) => targetSlugs.includes(t.slug));
    }

    const listingData = this.profileToListingData(profile);
    const results: Array<{ targetSlug: string; success: boolean; status: string; message?: string }> = [];
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
  async distributeToTarget(clientId: number, targetSlug: string): Promise<{
    success: boolean;
    status: string;
    message?: string;
  }> {
    const profile = await this.getProfile(clientId);
    if (!profile) throw new Error(`No canonical profile found for client ${clientId}`);

    const [target] = await db.select().from(distributionTargets).where(eq(distributionTargets.slug, targetSlug)).limit(1);
    if (!target) throw new Error(`Unknown target: ${targetSlug}`);

    const listingData = this.profileToListingData(profile);
    return this.distributeToSingleTarget(clientId, profile, target.slug, target.id, listingData);
  }

  /**
   * Flag all active submissions as needing resync when canonical data changes.
   */
  async flagResyncNeeded(clientId: number, changedFields: string[]): Promise<number> {
    const subs = await db
      .select()
      .from(distributionSubmissions)
      .where(and(
        eq(distributionSubmissions.clientId, clientId),
      ));

    const activeSubs = subs.filter((s) =>
      ["submitted", "processing", "verified", "active"].includes(s.status)
    );

    let flagged = 0;
    for (const sub of activeSubs) {
      await db.update(distributionSubmissions).set({
        needsResync: true,
        updatedAt: new Date(),
      }).where(eq(distributionSubmissions.id, sub.id));
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
  async processResyncQueue(batchSize = 10): Promise<{ processed: number; errors: number }> {
    const pending = await db
      .select()
      .from(distributionSubmissions)
      .where(eq(distributionSubmissions.needsResync, true))
      .limit(batchSize);

    let processed = 0;
    let errors = 0;

    for (const sub of pending) {
      try {
        const profile = await this.getProfile(sub.clientId);
        if (!profile) continue;

        const [target] = await db.select().from(distributionTargets).where(eq(distributionTargets.id, sub.targetId)).limit(1);
        if (!target) continue;

        const listingData = this.profileToListingData(profile);
        const adapter = getAdapter(target.adapterKey);
        if (!adapter || !adapter.isConfigured()) continue;

        const startTime = Date.now();
        let result: SubmissionResult;

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
          lastSubmittedAt: new Date(),
          needsResync: false,
          lastError: result.success ? null : result.message || null,
          errorCount: result.success ? sub.errorCount : (sub.errorCount || 0) + 1,
          platformResponse: result.rawResponse as any || sub.platformResponse,
          updatedAt: new Date(),
        }).where(eq(distributionSubmissions.id, sub.id));

        await this.log(sub.clientId, sub.id, target.slug, "update", result.success ? "success" : "failure", durationMs, profile.dataVersion, null, result.rawResponse, result.message);

        processed++;
      } catch (error: any) {
        errors++;
        console.error(`Resync error for submission ${sub.id}:`, error.message);
      }
    }

    return { processed, errors };
  }

  /**
   * Get full distribution status summary for a client.
   */
  async getClientDistributionStatus(clientId: number): Promise<{
    hasProfile: boolean;
    totalTargets: number;
    configuredTargets: number;
    submissions: { total: number; byStatus: Record<string, number>; needsResync: number };
    directoryCoverage: number;
  }> {
    const profile = await this.getProfile(clientId);
    const allTargets = await db.select().from(distributionTargets);

    const subs = await db
      .select()
      .from(distributionSubmissions)
      .where(eq(distributionSubmissions.clientId, clientId));

    const byStatus: Record<string, number> = {};
    let needsResync = 0;
    for (const s of subs) {
      byStatus[s.status] = (byStatus[s.status] || 0) + 1;
      if (s.needsResync) needsResync++;
    }

    // Count configured targets
    let configuredTargets = 0;
    for (const t of allTargets) {
      const adapter = getAdapter(t.adapterKey);
      if (adapter?.isConfigured()) configuredTargets++;
    }

    // Count downstream directories from active submissions
    const activeTargetIds = new Set(subs.filter((s) => ["active", "verified", "submitted", "processing"].includes(s.status)).map((s) => s.targetId));
    let directoryCoverage = 0;
    for (const t of allTargets) {
      if (activeTargetIds.has(t.id)) {
        directoryCoverage += (t.feedsDirectories?.length || 0);
      }
    }

    return {
      hasProfile: !!profile,
      totalTargets: allTargets.length,
      configuredTargets,
      submissions: { total: subs.length, byStatus, needsResync },
      directoryCoverage,
    };
  }

  /**
   * Get all submissions for a client, joined with target details.
   */
  async getClientSubmissions(clientId: number) {
    const subs = await db
      .select()
      .from(distributionSubmissions)
      .where(eq(distributionSubmissions.clientId, clientId))
      .orderBy(desc(distributionSubmissions.updatedAt));

    const targets = await db.select().from(distributionTargets);
    const targetMap = new Map(targets.map((t) => [t.id, t]));

    return subs.map((s) => ({
      ...s,
      target: targetMap.get(s.targetId) || null,
    }));
  }

  /**
   * Get canonical profile for a client, or null.
   */
  async getProfile(clientId: number): Promise<CanonicalBusinessProfile | null> {
    const [profile] = await db
      .select()
      .from(canonicalBusinessProfiles)
      .where(eq(canonicalBusinessProfiles.clientId, clientId))
      .limit(1);
    return profile || null;
  }

  /**
   * Auto-create a canonical profile from existing client data.
   */
  async autoCreateProfile(clientId: number): Promise<CanonicalBusinessProfile | null> {
    const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
    if (!client) return null;

    const existing = await this.getProfile(clientId);
    if (existing) return existing;

    // Parse address from client data (best-effort)
    const addressParts = (client.address || "").split(",").map((s) => s.trim());

    const [profile] = await db.insert(canonicalBusinessProfiles).values({
      clientId,
      businessName: client.companyName,
      address1: addressParts[0] || client.address || "",
      city: addressParts[1] || "",
      state: addressParts[2] || "",
      zip: addressParts[3] || "",
      country: "US",
      phone: client.phone || "",
      website: client.website || undefined,
      email: client.email,
      categories: client.businessCategory ? [client.businessCategory] : [],
    }).returning();

    return profile;
  }

  // ─── Private helpers ──────────────────────────────────────────────────

  private async distributeToSingleTarget(
    clientId: number,
    profile: CanonicalBusinessProfile,
    targetSlug: string,
    targetId: number,
    listingData: ListingData,
  ): Promise<{ success: boolean; status: string; message?: string }> {
    const adapter = getAdapter(targetSlug === "data_axle" ? "data_axle" : targetSlug.replace(/-/g, "_"));
    if (!adapter) {
      // Try adapterKey from target
      const [target] = await db.select().from(distributionTargets).where(eq(distributionTargets.slug, targetSlug)).limit(1);
      const a = target ? getAdapter(target.adapterKey) : null;
      if (!a) return { success: false, status: "skipped", message: `No adapter for ${targetSlug}` };
      return this.executeSubmission(clientId, profile, targetSlug, targetId, listingData, a);
    }

    if (!adapter.isConfigured()) {
      return { success: false, status: "skipped", message: `${adapter.displayName} not configured (missing env vars)` };
    }

    return this.executeSubmission(clientId, profile, targetSlug, targetId, listingData, adapter);
  }

  private async executeSubmission(
    clientId: number,
    profile: CanonicalBusinessProfile,
    targetSlug: string,
    targetId: number,
    listingData: ListingData,
    adapter: ReturnType<typeof getAdapter> & {},
  ): Promise<{ success: boolean; status: string; message?: string }> {
    // Find or create submission record
    let [submission] = await db
      .select()
      .from(distributionSubmissions)
      .where(and(
        eq(distributionSubmissions.clientId, clientId),
        eq(distributionSubmissions.targetId, targetId),
      ))
      .limit(1);

    if (!submission) {
      [submission] = await db.insert(distributionSubmissions).values({
        clientId,
        targetId,
        profileId: profile.id,
        status: "pending",
      }).returning();
    }

    // Update status to submitting
    await db.update(distributionSubmissions).set({ status: "submitting", updatedAt: new Date() }).where(eq(distributionSubmissions.id, submission.id));

    const startTime = Date.now();
    let result: SubmissionResult;

    try {
      if (submission.externalId) {
        result = await adapter!.updateListing(submission.externalId, listingData);
      } else {
        result = await adapter!.submitListing(listingData);
      }
    } catch (error: any) {
      result = { success: false, status: "error", message: error.message };
    }

    const durationMs = Date.now() - startTime;

    // Update submission record
    await db.update(distributionSubmissions).set({
      status: result.status,
      externalId: result.externalId || submission.externalId,
      externalUrl: result.externalUrl || submission.externalUrl,
      submittedDataVersion: profile.dataVersion,
      lastSubmittedAt: new Date(),
      needsResync: false,
      lastError: result.success ? null : result.message || null,
      errorCount: result.success ? 0 : (submission.errorCount || 0) + 1,
      platformResponse: result.rawResponse as any || submission.platformResponse,
      updatedAt: new Date(),
    }).where(eq(distributionSubmissions.id, submission.id));

    // Log the action
    await this.log(
      clientId, submission.id, targetSlug,
      submission.externalId ? "update" : "submit",
      result.success ? "success" : "failure",
      durationMs, profile.dataVersion,
      null, result.rawResponse, result.message,
    );

    return { success: result.success, status: result.status, message: result.message };
  }

  private async log(
    clientId: number,
    submissionId: number | null,
    targetSlug: string,
    action: string,
    status: string,
    durationMs: number,
    dataVersion: number | null,
    requestPayload: unknown,
    responsePayload: unknown,
    errorMessage?: string | null,
  ) {
    await db.insert(distributionLogs).values({
      clientId,
      submissionId,
      targetSlug,
      action,
      status,
      requestPayload: requestPayload as any,
      responsePayload: responsePayload as any,
      errorMessage: errorMessage || undefined,
      durationMs,
      dataVersion,
    });
  }

  private profileToListingData(profile: CanonicalBusinessProfile): ListingData {
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
      hours: profile.hours as any,
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
      serviceArea: profile.serviceArea,
    };
  }
}

export const listingDistributionService = new ListingDistributionService();

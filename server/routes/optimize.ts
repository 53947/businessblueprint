/**
 * / OPTIMIZE - SEO Optimization Suite API Routes
 * All routes protected with JWT authentication
 */

import type { Express } from "express";
import { db } from "../db";
import {
  seoProfiles,
  seoScans,
  seoKeywords,
  seoKeywordRankings,
  seoPages,
  seoTechnicalIssues,
  seoBacklinks,
  seoContentBriefs,
  seoActionItems,
  seoReports,
  seoLocalRankings,
  seoCompetitors,
  insertSeoProfileSchema,
  insertSeoKeywordSchema,
  insertSeoContentBriefSchema,
  insertSeoActionItemSchema,
} from "@shared/schema";
import { eq, desc, and, sql, asc } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth";
import { analyzePage, runTechnicalAudit, calculateSeoScore } from "../services/seo-crawler";
import { researchKeywords } from "../services/seo-keywords";
import { generateContentBrief } from "../services/seo-content";
import { generateActionPlan } from "../services/seo-action-plan";

export function registerOptimizeRoutes(app: Express) {
  // =============================================
  // PROFILES
  // =============================================

  /** Create or update SEO profile (setup wizard) */
  app.post(
    "/api/seo/profiles",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const { domain, businessName, industry, location, targetKeywords, competitors, localEnabled } = req.body;

        if (!domain) {
          return res.status(400).json({ success: false, message: "Domain is required" });
        }

        // Check for existing profile
        const existing = await db
          .select()
          .from(seoProfiles)
          .where(eq(seoProfiles.clientId, clientId))
          .limit(1);

        if (existing.length > 0) {
          const [updated] = await db
            .update(seoProfiles)
            .set({
              domain,
              businessName,
              industry,
              location,
              targetKeywords: targetKeywords || [],
              competitors: competitors || [],
              localEnabled: localEnabled || false,
              updatedAt: new Date(),
            })
            .where(eq(seoProfiles.id, existing[0].id))
            .returning();
          return res.json({ success: true, profile: updated });
        }

        const [profile] = await db
          .insert(seoProfiles)
          .values({
            clientId,
            domain,
            businessName,
            industry,
            location,
            targetKeywords: targetKeywords || [],
            competitors: competitors || [],
            localEnabled: localEnabled || false,
          })
          .returning();

        // Auto-add seed keywords
        if (targetKeywords && Array.isArray(targetKeywords) && targetKeywords.length > 0) {
          for (const kw of targetKeywords.slice(0, 10)) {
            await db.insert(seoKeywords).values({
              profileId: profile.id,
              keyword: kw,
              source: 'manual',
            });
          }
        }

        res.json({ success: true, profile });
      } catch (error: any) {
        console.error("[Optimize] Profile create error:", error);
        res.status(500).json({ success: false, message: "Failed to create SEO profile" });
      }
    }
  );

  /** Get client's SEO profile */
  app.get(
    "/api/seo/profiles",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profiles = await db
          .select()
          .from(seoProfiles)
          .where(eq(seoProfiles.clientId, clientId))
          .limit(1);

        if (profiles.length === 0) {
          return res.json({ success: true, profile: null });
        }
        res.json({ success: true, profile: profiles[0] });
      } catch (error: any) {
        console.error("[Optimize] Profile fetch error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch SEO profile" });
      }
    }
  );

  // =============================================
  // SCANS
  // =============================================

  /** Trigger a new SEO scan */
  app.post(
    "/api/seo/scan",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) {
          return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });
        }

        const profileData = profile[0];

        // Create scan record
        const [scan] = await db.insert(seoScans).values({
          profileId: profileData.id,
          scanType: req.body.scanType || 'full',
          status: 'running',
        }).returning();

        // Run audit asynchronously
        (async () => {
          try {
            const auditResult = await runTechnicalAudit(profileData.domain, {
              businessName: profileData.businessName || undefined,
              industry: profileData.industry || undefined,
              location: profileData.location || undefined,
            });

            // Store technical issues
            for (const issue of auditResult.issues) {
              await db.insert(seoTechnicalIssues).values({
                profileId: profileData.id,
                scanId: scan.id,
                type: issue.type,
                severity: issue.severity,
                url: issue.url || profileData.domain,
                description: issue.description,
                howToFix: issue.howToFix,
              });
            }

            // Analyze homepage
            const pageData = await analyzePage(
              profileData.domain.startsWith('http') ? profileData.domain : `https://${profileData.domain}`
            );

            // Store page data
            const existingPage = await db
              .select()
              .from(seoPages)
              .where(and(eq(seoPages.profileId, profileData.id), eq(seoPages.url, pageData.url)))
              .limit(1);

            const pageScore = calculatePageScore(pageData);

            if (existingPage.length > 0) {
              await db.update(seoPages).set({
                title: pageData.title,
                metaDescription: pageData.metaDescription,
                h1: pageData.h1,
                wordCount: pageData.wordCount,
                score: pageScore,
                issues: pageData as any,
                lastAnalyzed: new Date(),
              }).where(eq(seoPages.id, existingPage[0].id));
            } else {
              await db.insert(seoPages).values({
                profileId: profileData.id,
                url: pageData.url,
                title: pageData.title,
                metaDescription: pageData.metaDescription,
                h1: pageData.h1,
                wordCount: pageData.wordCount,
                score: pageScore,
                issues: pageData as any,
                lastAnalyzed: new Date(),
              });
            }

            // Calculate overall score
            const issueCountResult = await db
              .select({
                critical: sql<number>`count(*) filter (where ${seoTechnicalIssues.severity} = 'critical')`,
                high: sql<number>`count(*) filter (where ${seoTechnicalIssues.severity} = 'high')`,
                medium: sql<number>`count(*) filter (where ${seoTechnicalIssues.severity} = 'medium')`,
                low: sql<number>`count(*) filter (where ${seoTechnicalIssues.severity} = 'low')`,
              })
              .from(seoTechnicalIssues)
              .where(and(
                eq(seoTechnicalIssues.profileId, profileData.id),
                eq(seoTechnicalIssues.status, 'open')
              ));

            const issueCounts = issueCountResult[0] || { critical: 0, high: 0, medium: 0, low: 0 };
            const keywordCount = await db
              .select({ count: sql<number>`count(*)` })
              .from(seoKeywords)
              .where(eq(seoKeywords.profileId, profileData.id));

            const overallScore = calculateSeoScore({
              technicalIssues: {
                critical: Number(issueCounts.critical),
                high: Number(issueCounts.high),
                medium: Number(issueCounts.medium),
                low: Number(issueCounts.low),
              },
              pageScores: [pageScore],
              keywordsTracked: Number(keywordCount[0]?.count || 0),
              performanceScore: auditResult.performanceScore,
              seoScore: auditResult.seoScore,
            });

            await db.update(seoScans).set({
              overallScore,
              performanceScore: auditResult.performanceScore,
              seoScore: auditResult.seoScore,
              accessibilityScore: auditResult.accessibilityScore,
              metrics: auditResult as any,
              issues: auditResult.issues as any,
              status: 'completed',
            }).where(eq(seoScans.id, scan.id));
          } catch (err: any) {
            console.error("[Optimize] Scan failed:", err);
            await db.update(seoScans).set({ status: 'failed' }).where(eq(seoScans.id, scan.id));
          }
        })();

        res.json({ success: true, scan: { id: scan.id, status: 'running' } });
      } catch (error: any) {
        console.error("[Optimize] Scan trigger error:", error);
        res.status(500).json({ success: false, message: "Failed to trigger scan" });
      }
    }
  );

  /** List scans */
  app.get(
    "/api/seo/scans",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, scans: [] });

        const scans = await db
          .select()
          .from(seoScans)
          .where(eq(seoScans.profileId, profile[0].id))
          .orderBy(desc(seoScans.createdAt))
          .limit(20);

        res.json({ success: true, scans });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch scans" });
      }
    }
  );

  /** Get scan details */
  app.get(
    "/api/seo/scans/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const scan = await db
          .select()
          .from(seoScans)
          .where(eq(seoScans.id, parseInt(req.params.id)))
          .limit(1);

        if (scan.length === 0) return res.status(404).json({ success: false, message: "Scan not found" });
        res.json({ success: true, scan: scan[0] });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch scan" });
      }
    }
  );

  // =============================================
  // DASHBOARD
  // =============================================

  /** Aggregated dashboard data */
  app.get(
    "/api/seo/dashboard",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, data: null });

        const profileId = profile[0].id;

        // Latest scan
        const latestScan = await db
          .select()
          .from(seoScans)
          .where(and(eq(seoScans.profileId, profileId), eq(seoScans.status, 'completed')))
          .orderBy(desc(seoScans.createdAt))
          .limit(1);

        // Issue counts by severity
        const issueCounts = await db
          .select({
            severity: seoTechnicalIssues.severity,
            count: sql<number>`count(*)::int`,
          })
          .from(seoTechnicalIssues)
          .where(and(eq(seoTechnicalIssues.profileId, profileId), eq(seoTechnicalIssues.status, 'open')))
          .groupBy(seoTechnicalIssues.severity);

        // Keyword count
        const keywordStats = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(seoKeywords)
          .where(and(eq(seoKeywords.profileId, profileId), eq(seoKeywords.status, 'tracking')));

        // Page count
        const pageStats = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(seoPages)
          .where(eq(seoPages.profileId, profileId));

        // Pending action items
        const actionStats = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(seoActionItems)
          .where(and(eq(seoActionItems.profileId, profileId), eq(seoActionItems.status, 'pending')));

        // Recent scans timeline
        const recentScans = await db
          .select()
          .from(seoScans)
          .where(eq(seoScans.profileId, profileId))
          .orderBy(desc(seoScans.createdAt))
          .limit(5);

        const issueMap: Record<string, number> = {};
        for (const ic of issueCounts) {
          issueMap[ic.severity || 'unknown'] = ic.count;
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
              total: Object.values(issueMap).reduce((a, b) => a + b, 0),
            },
            keywordsTracked: keywordStats[0]?.count || 0,
            pagesAnalyzed: pageStats[0]?.count || 0,
            pendingActions: actionStats[0]?.count || 0,
            recentScans,
            lastScanDate: latestScan[0]?.createdAt || null,
          },
        });
      } catch (error: any) {
        console.error("[Optimize] Dashboard error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
      }
    }
  );

  // =============================================
  // KEYWORDS
  // =============================================

  /** List tracked keywords with latest ranks */
  app.get(
    "/api/seo/keywords",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, keywords: [] });

        const keywords = await db
          .select()
          .from(seoKeywords)
          .where(and(eq(seoKeywords.profileId, profile[0].id), eq(seoKeywords.status, 'tracking')))
          .orderBy(asc(seoKeywords.keyword));

        res.json({ success: true, keywords });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch keywords" });
      }
    }
  );

  /** Add keyword(s) */
  app.post(
    "/api/seo/keywords",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const { keywords } = req.body; // string[] or string
        const keywordList = Array.isArray(keywords) ? keywords : [keywords];
        const added = [];

        for (const kw of keywordList.slice(0, 20)) {
          if (!kw || typeof kw !== 'string') continue;
          const [inserted] = await db.insert(seoKeywords).values({
            profileId: profile[0].id,
            keyword: kw.trim(),
            source: req.body.source || 'manual',
          }).returning();
          added.push(inserted);
        }

        res.json({ success: true, keywords: added });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to add keywords" });
      }
    }
  );

  /** Delete keyword */
  app.delete(
    "/api/seo/keywords/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        await db
          .update(seoKeywords)
          .set({ status: 'removed' })
          .where(eq(seoKeywords.id, parseInt(req.params.id)));
        res.json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to delete keyword" });
      }
    }
  );

  /** Keyword rank history */
  app.get(
    "/api/seo/keywords/:id/history",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const history = await db
          .select()
          .from(seoKeywordRankings)
          .where(eq(seoKeywordRankings.keywordId, parseInt(req.params.id)))
          .orderBy(desc(seoKeywordRankings.date))
          .limit(90);
        res.json({ success: true, history });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch rank history" });
      }
    }
  );

  /** AI keyword research */
  app.post(
    "/api/seo/keywords/research",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const { seeds } = req.body;
        const seedKeywords = seeds || (profile[0].targetKeywords as string[]) || [];
        const industry = profile[0].industry || 'General';

        const suggestions = await researchKeywords(seedKeywords, industry, profile[0].location || undefined);
        res.json({ success: true, suggestions });
      } catch (error: any) {
        console.error("[Optimize] Keyword research error:", error);
        res.status(500).json({ success: false, message: "Failed to research keywords" });
      }
    }
  );

  // =============================================
  // PAGES (On-Page SEO)
  // =============================================

  /** List analyzed pages */
  app.get(
    "/api/seo/pages",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, pages: [] });

        const pages = await db
          .select()
          .from(seoPages)
          .where(eq(seoPages.profileId, profile[0].id))
          .orderBy(desc(seoPages.lastAnalyzed));

        res.json({ success: true, pages });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch pages" });
      }
    }
  );

  /** Get page detail */
  app.get(
    "/api/seo/pages/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const page = await db
          .select()
          .from(seoPages)
          .where(eq(seoPages.id, parseInt(req.params.id)))
          .limit(1);
        if (page.length === 0) return res.status(404).json({ success: false, message: "Page not found" });
        res.json({ success: true, page: page[0] });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch page" });
      }
    }
  );

  /** Analyze a URL */
  app.post(
    "/api/seo/pages/analyze",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, message: "URL is required" });

        const pageData = await analyzePage(url);
        const score = calculatePageScore(pageData);

        // Upsert page
        const existing = await db
          .select()
          .from(seoPages)
          .where(and(eq(seoPages.profileId, profile[0].id), eq(seoPages.url, url)))
          .limit(1);

        let page;
        if (existing.length > 0) {
          [page] = await db.update(seoPages).set({
            title: pageData.title,
            metaDescription: pageData.metaDescription,
            h1: pageData.h1,
            wordCount: pageData.wordCount,
            score,
            issues: pageData as any,
            suggestions: generatePageSuggestions(pageData) as any,
            lastAnalyzed: new Date(),
          }).where(eq(seoPages.id, existing[0].id)).returning();
        } else {
          [page] = await db.insert(seoPages).values({
            profileId: profile[0].id,
            url,
            title: pageData.title,
            metaDescription: pageData.metaDescription,
            h1: pageData.h1,
            wordCount: pageData.wordCount,
            score,
            issues: pageData as any,
            suggestions: generatePageSuggestions(pageData) as any,
            lastAnalyzed: new Date(),
          }).returning();
        }

        res.json({ success: true, page, analysis: pageData });
      } catch (error: any) {
        console.error("[Optimize] Page analyze error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze page" });
      }
    }
  );

  // =============================================
  // TECHNICAL ISSUES
  // =============================================

  /** List technical issues */
  app.get(
    "/api/seo/technical-issues",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, issues: [] });

        let query = db
          .select()
          .from(seoTechnicalIssues)
          .where(eq(seoTechnicalIssues.profileId, profile[0].id))
          .orderBy(
            sql`CASE ${seoTechnicalIssues.severity} WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 WHEN 'low' THEN 4 END`,
            desc(seoTechnicalIssues.createdAt)
          );

        const issues = await query;
        res.json({ success: true, issues });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch technical issues" });
      }
    }
  );

  /** Update technical issue status */
  app.patch(
    "/api/seo/technical-issues/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const { status } = req.body;
        const [updated] = await db
          .update(seoTechnicalIssues)
          .set({ status })
          .where(eq(seoTechnicalIssues.id, parseInt(req.params.id)))
          .returning();
        res.json({ success: true, issue: updated });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to update issue" });
      }
    }
  );

  // =============================================
  // CONTENT BRIEFS
  // =============================================

  /** List content briefs */
  app.get(
    "/api/seo/content-briefs",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, briefs: [] });

        const briefs = await db
          .select()
          .from(seoContentBriefs)
          .where(eq(seoContentBriefs.profileId, profile[0].id))
          .orderBy(desc(seoContentBriefs.createdAt));

        res.json({ success: true, briefs });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch content briefs" });
      }
    }
  );

  /** Generate content brief */
  app.post(
    "/api/seo/content-briefs",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const { targetKeyword } = req.body;
        if (!targetKeyword) return res.status(400).json({ success: false, message: "Target keyword is required" });

        const brief = await generateContentBrief(targetKeyword, profile[0].industry || undefined);

        const [saved] = await db.insert(seoContentBriefs).values({
          profileId: profile[0].id,
          targetKeyword,
          title: brief.title,
          outline: brief.outline as any,
          suggestions: brief.suggestions as any,
          wordCountTarget: brief.wordCountTarget,
        }).returning();

        res.json({ success: true, brief: { ...saved, relatedKeywords: brief.relatedKeywords, searchIntent: brief.searchIntent } });
      } catch (error: any) {
        console.error("[Optimize] Content brief error:", error);
        res.status(500).json({ success: false, message: "Failed to generate content brief" });
      }
    }
  );

  // =============================================
  // ACTION ITEMS
  // =============================================

  /** List action items */
  app.get(
    "/api/seo/action-items",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, items: [] });

        const items = await db
          .select()
          .from(seoActionItems)
          .where(eq(seoActionItems.profileId, profile[0].id))
          .orderBy(
            sql`CASE ${seoActionItems.priority} WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 WHEN 'low' THEN 4 END`,
            desc(seoActionItems.createdAt)
          );

        res.json({ success: true, items });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch action items" });
      }
    }
  );

  /** Generate AI action plan */
  app.post(
    "/api/seo/action-items/generate",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const profileData = profile[0];

        // Gather data for AI
        const latestScan = await db.select().from(seoScans)
          .where(and(eq(seoScans.profileId, profileData.id), eq(seoScans.status, 'completed')))
          .orderBy(desc(seoScans.createdAt)).limit(1);

        const keywords = await db.select().from(seoKeywords)
          .where(and(eq(seoKeywords.profileId, profileData.id), eq(seoKeywords.status, 'tracking')));

        const pages = await db.select().from(seoPages)
          .where(eq(seoPages.profileId, profileData.id));

        const issues = await db.select().from(seoTechnicalIssues)
          .where(and(eq(seoTechnicalIssues.profileId, profileData.id), eq(seoTechnicalIssues.status, 'open')));

        const actionItems = await generateActionPlan({
          domain: profileData.domain,
          industry: profileData.industry || undefined,
          overallScore: latestScan[0]?.overallScore ?? undefined,
          technicalIssues: issues.map(i => ({ type: i.type, severity: i.severity || 'medium', description: i.description || '' })),
          keywords: keywords.map(k => ({ keyword: k.keyword, currentRank: k.currentRank })),
          pages: pages.map(p => ({ url: p.url, score: p.score, issues: p.issues })),
          localEnabled: profileData.localEnabled || false,
        });

        // Save action items
        const saved = [];
        for (const item of actionItems) {
          const [s] = await db.insert(seoActionItems).values({
            profileId: profileData.id,
            title: item.title,
            description: item.description,
            category: item.category,
            priority: item.priority,
            impact: item.impact,
            effort: item.effort,
          }).returning();
          saved.push(s);
        }

        res.json({ success: true, items: saved });
      } catch (error: any) {
        console.error("[Optimize] Action plan error:", error);
        res.status(500).json({ success: false, message: "Failed to generate action plan" });
      }
    }
  );

  /** Update action item status */
  app.patch(
    "/api/seo/action-items/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const { status } = req.body;
        const [updated] = await db
          .update(seoActionItems)
          .set({ status })
          .where(eq(seoActionItems.id, parseInt(req.params.id)))
          .returning();
        res.json({ success: true, item: updated });
      } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to update action item" });
      }
    }
  );

  // =============================================
  // BACKLINKS
  // =============================================

  /** List backlinks for the user's SEO profile */
  app.get(
    "/api/seo/backlinks",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, backlinks: [], summary: null });

        const profileId = profile[0].id;

        // If DATAFORSEO_LOGIN exists, we could fetch fresh data here
        const hasDataProvider = !!process.env.DATAFORSEO_LOGIN;

        const backlinks = await db
          .select()
          .from(seoBacklinks)
          .where(eq(seoBacklinks.profileId, profileId))
          .orderBy(desc(seoBacklinks.firstSeen));

        // Calculate summary stats
        const total = backlinks.length;
        const active = backlinks.filter(b => b.status === 'active' && !b.isLost).length;
        const lost = backlinks.filter(b => b.isLost).length;
        const newLinks = backlinks.filter(b => b.isNew).length;
        const referringDomains = new Set(
          backlinks
            .filter(b => b.sourceUrl)
            .map(b => {
              try { return new URL(b.sourceUrl!).hostname; } catch { return b.sourceUrl; }
            })
        ).size;
        const daValues = backlinks.filter(b => b.domainAuthority != null).map(b => b.domainAuthority!);
        const avgDA = daValues.length > 0 ? Math.round(daValues.reduce((a, b) => a + b, 0) / daValues.length) : null;

        res.json({
          success: true,
          backlinks,
          summary: {
            total,
            active,
            lost,
            new: newLinks,
            referringDomains,
            avgDomainAuthority: avgDA,
          },
          dataProviderConnected: hasDataProvider,
          ...(!hasDataProvider && total === 0 ? { message: "Connect a data provider to automatically discover backlinks." } : {}),
        });
      } catch (error: any) {
        console.error("[Optimize] Backlinks fetch error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch backlinks" });
      }
    }
  );

  // =============================================
  // LOCAL RANK TRACKING
  // =============================================

  /** List local rankings for the user's profile */
  app.get(
    "/api/seo/local-rankings",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, rankings: [], grouped: {} });

        const profileId = profile[0].id;
        const rankings = await db
          .select()
          .from(seoLocalRankings)
          .where(eq(seoLocalRankings.profileId, profileId))
          .orderBy(desc(seoLocalRankings.checkedAt));

        // Group by keyword
        const grouped: Record<string, typeof rankings> = {};
        for (const r of rankings) {
          if (!grouped[r.keyword]) grouped[r.keyword] = [];
          grouped[r.keyword].push(r);
        }

        res.json({ success: true, rankings, grouped });
      } catch (error: any) {
        console.error("[Optimize] Local rankings fetch error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch local rankings" });
      }
    }
  );

  /** Trigger a local rank check for a keyword + location */
  app.post(
    "/api/seo/local-rankings/check",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const { keyword, location } = req.body;
        if (!keyword || !location) {
          return res.status(400).json({ success: false, message: "Both keyword and location are required" });
        }

        const hasDataProvider = !!process.env.DATAFORSEO_LOGIN;

        if (!hasDataProvider) {
          // Store the keyword/location pair with null positions so the user can track it manually
          const [ranking] = await db.insert(seoLocalRankings).values({
            profileId: profile[0].id,
            keyword: keyword.trim(),
            location: location.trim(),
            mapPackPosition: null,
            organicPosition: null,
          }).returning();

          return res.json({
            success: true,
            ranking,
            message: "Connect a SERP data provider to track local rankings automatically.",
          });
        }

        // DataForSEO SERP API call
        try {
          const credentials = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
          const serpResponse = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${credentials}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
              keyword: keyword.trim(),
              location_name: location.trim(),
              language_name: 'English',
              device: 'desktop',
            }]),
            signal: AbortSignal.timeout(30000),
          });

          const serpData = await serpResponse.json() as any;
          let mapPackPosition: number | null = null;
          let organicPosition: number | null = null;

          if (serpData?.tasks?.[0]?.result?.[0]?.items) {
            const items = serpData.tasks[0].result[0].items;
            const domain = profile[0].domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

            for (const item of items) {
              if (item.type === 'local_pack' && item.items) {
                const packIdx = item.items.findIndex((p: any) => p.domain?.includes(domain));
                if (packIdx >= 0) mapPackPosition = packIdx + 1;
              }
              if (item.type === 'organic' && item.domain?.includes(domain)) {
                organicPosition = item.rank_absolute;
              }
            }
          }

          const [ranking] = await db.insert(seoLocalRankings).values({
            profileId: profile[0].id,
            keyword: keyword.trim(),
            location: location.trim(),
            mapPackPosition,
            organicPosition,
          }).returning();

          res.json({ success: true, ranking });
        } catch (apiErr: any) {
          console.error("[Optimize] DataForSEO SERP error:", apiErr);
          // Still store the check attempt
          const [ranking] = await db.insert(seoLocalRankings).values({
            profileId: profile[0].id,
            keyword: keyword.trim(),
            location: location.trim(),
            mapPackPosition: null,
            organicPosition: null,
          }).returning();
          res.json({ success: true, ranking, message: "Rank check was stored but the data provider returned an error." });
        }
      } catch (error: any) {
        console.error("[Optimize] Local rank check error:", error);
        res.status(500).json({ success: false, message: "Failed to check local ranking" });
      }
    }
  );

  // =============================================
  // SCHEMA MARKUP
  // =============================================

  /** Generate and analyze schema markup for the user's site */
  app.get(
    "/api/seo/schema-markup",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];

        // Generate LocalBusiness JSON-LD from profile data
        const generated: Record<string, any> = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: profileData.businessName || profileData.domain,
          url: profileData.domain.startsWith('http') ? profileData.domain : `https://${profileData.domain}`,
        };

        if (profileData.industry) {
          // Map common industries to schema.org types
          const industryTypeMap: Record<string, string> = {
            'restaurant': 'Restaurant',
            'dental': 'Dentist',
            'dentist': 'Dentist',
            'plumbing': 'Plumber',
            'plumber': 'Plumber',
            'law': 'LegalService',
            'legal': 'LegalService',
            'attorney': 'Attorney',
            'real estate': 'RealEstateAgent',
            'auto repair': 'AutoRepair',
            'salon': 'BeautySalon',
            'beauty': 'BeautySalon',
            'gym': 'ExerciseGym',
            'fitness': 'ExerciseGym',
            'medical': 'MedicalBusiness',
            'doctor': 'Physician',
            'veterinary': 'VeterinaryCare',
            'accounting': 'AccountingService',
            'insurance': 'InsuranceAgency',
            'hotel': 'Hotel',
          };
          const lowerIndustry = profileData.industry.toLowerCase();
          for (const [key, schemaType] of Object.entries(industryTypeMap)) {
            if (lowerIndustry.includes(key)) {
              generated["@type"] = schemaType;
              break;
            }
          }
        }

        if (profileData.location) {
          generated.address = {
            "@type": "PostalAddress",
            addressLocality: profileData.location,
          };
        }

        // Check existing schema markup on the site
        const existing: any[] = [];
        const recommendations: string[] = [];

        try {
          const siteUrl = profileData.domain.startsWith('http') ? profileData.domain : `https://${profileData.domain}`;
          const siteRes = await fetch(siteUrl, { signal: AbortSignal.timeout(15000) });
          const html = await siteRes.text();

          // Find JSON-LD blocks
          const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
          let match;
          while ((match = jsonLdRegex.exec(html)) !== null) {
            try {
              const parsed = JSON.parse(match[1].trim());
              existing.push(parsed);
            } catch {}
          }

          if (existing.length === 0) {
            recommendations.push("No structured data found on your site. Adding LocalBusiness schema helps search engines understand your business.");
            recommendations.push("Copy the generated JSON-LD below and add it to your site's <head> section.");
          } else {
            const types = existing.map(e => e["@type"] || 'Unknown').flat();
            if (!types.some(t => typeof t === 'string' && t.includes('LocalBusiness') || t === generated["@type"])) {
              recommendations.push(`Your site has schema markup (${types.join(', ')}) but is missing LocalBusiness schema. Add it for better local search visibility.`);
            }
            if (!types.includes('WebSite')) {
              recommendations.push("Consider adding WebSite schema with a SearchAction for sitelinks search box in Google.");
            }
          }

          // Check for breadcrumbs
          if (!html.includes('BreadcrumbList')) {
            recommendations.push("Add BreadcrumbList schema to improve how your pages appear in search results.");
          }
        } catch {
          recommendations.push("Could not fetch your site to check existing schema markup. Make sure the domain is accessible.");
        }

        if (!profileData.location) {
          recommendations.push("Add your business location in the SEO profile to generate complete LocalBusiness schema.");
        }

        // Also check if we have any page-level schema data stored
        const pages = await db
          .select({ url: seoPages.url, schemaMarkup: seoPages.schemaMarkup })
          .from(seoPages)
          .where(eq(seoPages.profileId, profileData.id));

        const pagesWithSchema = pages.filter(p => p.schemaMarkup);

        res.json({
          success: true,
          generated,
          existing,
          recommendations,
          pagesWithSchema: pagesWithSchema.length,
          totalPagesAnalyzed: pages.length,
        });
      } catch (error: any) {
        console.error("[Optimize] Schema markup error:", error);
        res.status(500).json({ success: false, message: "Failed to generate schema markup" });
      }
    }
  );

  // =============================================
  // REPORTS
  // =============================================

  /** List SEO reports, auto-generate current month if missing */
  app.get(
    "/api/seo/reports",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, reports: [] });

        const profileId = profile[0].id;

        // Check if a report exists for the current month
        const now = new Date();
        const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        const reports = await db
          .select()
          .from(seoReports)
          .where(eq(seoReports.profileId, profileId))
          .orderBy(desc(seoReports.generatedAt));

        const hasCurrentMonth = reports.some(r => r.period === currentPeriod);

        if (!hasCurrentMonth) {
          // Auto-generate a report for the current month
          const reportData = await gatherReportData(profileId);
          const [newReport] = await db.insert(seoReports).values({
            profileId,
            type: 'monthly',
            period: currentPeriod,
            data: reportData as any,
          }).returning();
          reports.unshift(newReport);
        }

        res.json({ success: true, reports });
      } catch (error: any) {
        console.error("[Optimize] Reports fetch error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch reports" });
      }
    }
  );

  /** Generate a fresh SEO report on demand */
  app.post(
    "/api/seo/reports/generate",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const now = new Date();
        const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        const reportData = await gatherReportData(profileId);

        const [report] = await db.insert(seoReports).values({
          profileId,
          type: 'monthly',
          period: currentPeriod,
          data: reportData as any,
        }).returning();

        res.json({ success: true, report });
      } catch (error: any) {
        console.error("[Optimize] Report generate error:", error);
        res.status(500).json({ success: false, message: "Failed to generate report" });
      }
    }
  );

  // =============================================
  // CORE WEB VITALS
  // =============================================

  /** Measure Core Web Vitals via Google PageSpeed Insights API */
  app.post(
    "/api/seo/core-web-vitals",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];
        let targetUrl = req.body.url;

        if (!targetUrl) {
          targetUrl = profileData.domain.startsWith('http') ? profileData.domain : `https://${profileData.domain}`;
        }

        // Google PageSpeed Insights API (free, no key required for basic usage)
        const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY || '';
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile${apiKey ? `&key=${apiKey}` : ''}`;

        const psiRes = await fetch(psiUrl, { signal: AbortSignal.timeout(60000) });

        if (!psiRes.ok) {
          const errText = await psiRes.text();
          console.error("[Optimize] PageSpeed API error:", errText);
          return res.status(502).json({ success: false, message: "PageSpeed Insights API returned an error. The URL may be unreachable." });
        }

        const psiData = await psiRes.json() as any;

        // Extract Core Web Vitals from Lighthouse audit
        const audits = psiData.lighthouseResult?.audits || {};
        const fieldData = psiData.loadingExperience?.metrics || {};

        // Lighthouse lab data
        const lcpMs = audits['largest-contentful-paint']?.numericValue ?? null;
        const clsScore = audits['cumulative-layout-shift']?.numericValue ?? null;
        const tbtMs = audits['total-blocking-time']?.numericValue ?? null; // proxy for FID
        const inpMs = audits['interaction-to-next-paint']?.numericValue ?? null;
        const speedIndex = audits['speed-index']?.numericValue ?? null;

        // Field data (CrUX) if available
        const fieldLcp = fieldData.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null;
        const fieldCls = fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ?? null;
        const fieldInp = fieldData.INTERACTION_TO_NEXT_PAINT?.percentile ?? null;
        const fieldFid = fieldData.FIRST_INPUT_DELAY_MS?.percentile ?? null;

        // Thresholds for pass/needs-improvement/fail
        const vitals = {
          lcp: {
            lab: lcpMs ? Math.round(lcpMs) : null,
            field: fieldLcp,
            unit: 'ms',
            status: lcpMs ? (lcpMs <= 2500 ? 'good' : lcpMs <= 4000 ? 'needs-improvement' : 'poor') : 'unknown',
            explanation: 'Largest Contentful Paint measures how long it takes for the biggest visible element to load. Under 2.5 seconds is good — your visitors see your main content quickly.',
          },
          cls: {
            lab: clsScore != null ? Math.round(clsScore * 1000) / 1000 : null,
            field: fieldCls != null ? fieldCls / 100 : null,
            unit: 'score',
            status: clsScore != null ? (clsScore <= 0.1 ? 'good' : clsScore <= 0.25 ? 'needs-improvement' : 'poor') : 'unknown',
            explanation: 'Cumulative Layout Shift measures how much your page jumps around while loading. Under 0.1 is good — your visitors won\'t accidentally click the wrong thing.',
          },
          tbt: {
            lab: tbtMs ? Math.round(tbtMs) : null,
            field: null,
            unit: 'ms',
            status: tbtMs ? (tbtMs <= 200 ? 'good' : tbtMs <= 600 ? 'needs-improvement' : 'poor') : 'unknown',
            explanation: 'Total Blocking Time measures how long the page is unresponsive during load. Under 200ms is good — your visitors can interact with your site without waiting.',
          },
          inp: {
            lab: inpMs ? Math.round(inpMs) : null,
            field: fieldInp,
            unit: 'ms',
            status: fieldInp ? (fieldInp <= 200 ? 'good' : fieldInp <= 500 ? 'needs-improvement' : 'poor') :
                    inpMs ? (inpMs <= 200 ? 'good' : inpMs <= 500 ? 'needs-improvement' : 'poor') : 'unknown',
            explanation: 'Interaction to Next Paint measures how quickly your site responds when someone clicks or taps. Under 200ms is good — your site feels snappy and responsive.',
          },
          fid: {
            lab: null,
            field: fieldFid,
            unit: 'ms',
            status: fieldFid ? (fieldFid <= 100 ? 'good' : fieldFid <= 300 ? 'needs-improvement' : 'poor') : 'unknown',
            explanation: 'First Input Delay measures the time from when a visitor first interacts with your page to when the browser responds. Under 100ms is good.',
          },
        };

        const performanceScore = psiData.lighthouseResult?.categories?.performance?.score ?? null;

        const coreWebVitalsData = {
          url: targetUrl,
          measuredAt: new Date().toISOString(),
          performanceScore: performanceScore != null ? Math.round(performanceScore * 100) : null,
          vitals,
          speedIndex: speedIndex ? Math.round(speedIndex) : null,
          hasFieldData: !!(fieldLcp || fieldCls || fieldInp || fieldFid),
        };

        // Store in seoPages if we have a matching page
        const existingPage = await db
          .select()
          .from(seoPages)
          .where(and(eq(seoPages.profileId, profileData.id), eq(seoPages.url, targetUrl)))
          .limit(1);

        if (existingPage.length > 0) {
          await db.update(seoPages).set({
            coreWebVitals: coreWebVitalsData as any,
          }).where(eq(seoPages.id, existingPage[0].id));
        } else {
          await db.insert(seoPages).values({
            profileId: profileData.id,
            url: targetUrl,
            coreWebVitals: coreWebVitalsData as any,
            lastAnalyzed: new Date(),
          });
        }

        res.json({ success: true, ...coreWebVitalsData });
      } catch (error: any) {
        console.error("[Optimize] Core Web Vitals error:", error);
        res.status(500).json({ success: false, message: "Failed to measure Core Web Vitals" });
      }
    }
  );
}

// =============================================
// REPORT DATA GATHERER
// =============================================

async function gatherReportData(profileId: number) {
  // Latest scan
  const latestScan = await db
    .select()
    .from(seoScans)
    .where(and(eq(seoScans.profileId, profileId), eq(seoScans.status, 'completed')))
    .orderBy(desc(seoScans.createdAt))
    .limit(1);

  // Issue counts
  const issueCounts = await db
    .select({
      severity: seoTechnicalIssues.severity,
      count: sql<number>`count(*)::int`,
    })
    .from(seoTechnicalIssues)
    .where(and(eq(seoTechnicalIssues.profileId, profileId), eq(seoTechnicalIssues.status, 'open')))
    .groupBy(seoTechnicalIssues.severity);

  const issueMap: Record<string, number> = {};
  for (const ic of issueCounts) {
    issueMap[ic.severity || 'unknown'] = ic.count;
  }

  // Keyword stats
  const keywords = await db
    .select()
    .from(seoKeywords)
    .where(and(eq(seoKeywords.profileId, profileId), eq(seoKeywords.status, 'tracking')));

  // Page stats
  const pages = await db
    .select()
    .from(seoPages)
    .where(eq(seoPages.profileId, profileId));

  const avgPageScore = pages.length > 0
    ? Math.round(pages.filter(p => p.score != null).reduce((sum, p) => sum + (p.score || 0), 0) / Math.max(1, pages.filter(p => p.score != null).length))
    : null;

  // Backlink stats
  const backlinks = await db
    .select()
    .from(seoBacklinks)
    .where(eq(seoBacklinks.profileId, profileId));

  // Action items
  const pendingActions = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(seoActionItems)
    .where(and(eq(seoActionItems.profileId, profileId), eq(seoActionItems.status, 'pending')));

  return {
    generatedAt: new Date().toISOString(),
    overallScore: latestScan[0]?.overallScore ?? null,
    performanceScore: latestScan[0]?.performanceScore ?? null,
    seoScore: latestScan[0]?.seoScore ?? null,
    accessibilityScore: latestScan[0]?.accessibilityScore ?? null,
    issues: {
      critical: issueMap.critical || 0,
      high: issueMap.high || 0,
      medium: issueMap.medium || 0,
      low: issueMap.low || 0,
      total: Object.values(issueMap).reduce((a, b) => a + b, 0),
    },
    keywords: {
      tracked: keywords.length,
      withRank: keywords.filter(k => k.currentRank != null).length,
      avgRank: keywords.filter(k => k.currentRank != null).length > 0
        ? Math.round(keywords.filter(k => k.currentRank != null).reduce((sum, k) => sum + (k.currentRank || 0), 0) / keywords.filter(k => k.currentRank != null).length)
        : null,
    },
    pages: {
      total: pages.length,
      avgScore: avgPageScore,
    },
    backlinks: {
      total: backlinks.length,
      active: backlinks.filter(b => !b.isLost).length,
      lost: backlinks.filter(b => b.isLost).length,
    },
    pendingActions: pendingActions[0]?.count || 0,
  };
}

// =============================================
// HELPERS
// =============================================

function calculatePageScore(pageData: any): number {
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

function generatePageSuggestions(pageData: any): string[] {
  const suggestions: string[] = [];

  if (!pageData.title) suggestions.push('Add a title tag to this page');
  else if (pageData.title.length > 60) suggestions.push(`Shorten title tag from ${pageData.title.length} to under 60 characters`);

  if (!pageData.metaDescription) suggestions.push('Add a meta description (150-160 characters recommended)');
  else if (pageData.metaDescription.length > 160) suggestions.push('Shorten meta description to under 160 characters');

  if (!pageData.h1) suggestions.push('Add an H1 heading with your primary keyword');
  if (pageData.h2s?.length === 0) suggestions.push('Add H2 subheadings to improve content structure');

  if (pageData.wordCount < 300) suggestions.push('Add more content — aim for at least 600+ words');
  if (!pageData.hasSchemaMarkup) suggestions.push('Add structured data (JSON-LD) for better search results');
  if (!pageData.hasCanonical) suggestions.push('Add a canonical URL tag to prevent duplicate content');

  if (pageData.images?.withoutAlt > 0) {
    suggestions.push(`Add alt text to ${pageData.images.withoutAlt} image(s)`);
  }

  return suggestions;
}

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
            const auditResult = await runTechnicalAudit(profileData.domain);

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
  // SHELL ENDPOINTS (Coming Soon)
  // =============================================

  app.get("/api/seo/backlinks", requireAuth, async (_req, res) => {
    res.json({ success: true, backlinks: [], message: "Backlink monitoring coming soon" });
  });

  app.get("/api/seo/local", requireAuth, async (_req, res) => {
    res.json({ success: true, data: null, message: "Local SEO optimizer coming soon" });
  });

  app.get("/api/seo/schema-markup", requireAuth, async (_req, res) => {
    res.json({ success: true, data: null, message: "Schema markup generator coming soon" });
  });

  app.get("/api/seo/reports", requireAuth, async (_req, res) => {
    res.json({ success: true, reports: [], message: "Reporting & insights coming soon" });
  });
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

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
  insertSeoCompetitorSchema,
} from "@shared/schema";
import { eq, desc, and, sql, asc, gte } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth";
import { analyzePage, runTechnicalAudit, calculateSeoScore } from "../services/seo-crawler";
import { researchKeywords, analyzeKeywordGap, generateLongTailKeywords, classifySearchIntent } from "../services/seo-keywords";
import { generateContentBrief } from "../services/seo-content";
import { generateActionPlan } from "../services/seo-action-plan";
import { unifiedAI, type AIProvider } from "../services/ai-provider";
import { aiSettingsService } from "../services/ai-settings";

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

  /** Generate long-tail keyword variations */
  app.post(
    "/api/seo/keywords/long-tail",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const { keyword } = req.body;
        if (!keyword || typeof keyword !== 'string') {
          return res.status(400).json({ success: false, message: "A keyword is required" });
        }

        const industry = profile[0].industry || 'General';
        const variations = await generateLongTailKeywords(keyword, industry, profile[0].location || undefined);
        res.json({ success: true, variations });
      } catch (error: any) {
        console.error("[Optimize] Long-tail keyword error:", error);
        res.status(500).json({ success: false, message: "Failed to generate long-tail keywords" });
      }
    }
  );

  /** Classify search intent for keywords */
  app.post(
    "/api/seo/keywords/classify-intent",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const { keywords } = req.body;
        if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
          return res.status(400).json({ success: false, message: "An array of keywords is required" });
        }

        // Limit to 50 keywords per request
        const limited = keywords.slice(0, 50).filter((k: any) => typeof k === 'string' && k.trim().length > 0);
        const classifications = await classifySearchIntent(limited);
        res.json({ success: true, classifications });
      } catch (error: any) {
        console.error("[Optimize] Intent classification error:", error);
        res.status(500).json({ success: false, message: "Failed to classify search intent" });
      }
    }
  );

  /** Get rank by location for a keyword */
  app.get(
    "/api/seo/keywords/:id/locations",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const keywordId = parseInt(req.params.id);
        const profileId = profile[0].id;

        // Get the keyword record
        const keywordRecord = await db.select().from(seoKeywords)
          .where(and(eq(seoKeywords.id, keywordId), eq(seoKeywords.profileId, profileId)))
          .limit(1);
        if (keywordRecord.length === 0) return res.status(404).json({ success: false, message: "Keyword not found" });

        // Build location filter if provided
        let rankings;
        const locationsParam = req.query.locations as string | undefined;

        if (locationsParam) {
          const locationList = locationsParam.split('|').map(l => l.trim()).filter(Boolean);
          rankings = await db.select().from(seoLocalRankings)
            .where(and(
              eq(seoLocalRankings.profileId, profileId),
              eq(seoLocalRankings.keywordId, keywordId),
              sql`${seoLocalRankings.location} = ANY(${locationList})`
            ))
            .orderBy(desc(seoLocalRankings.checkedAt));
        } else {
          rankings = await db.select().from(seoLocalRankings)
            .where(and(
              eq(seoLocalRankings.profileId, profileId),
              eq(seoLocalRankings.keywordId, keywordId)
            ))
            .orderBy(desc(seoLocalRankings.checkedAt));
        }

        res.json({
          success: true,
          keyword: keywordRecord[0].keyword,
          rankings: rankings.map(r => ({
            location: r.location,
            mapPackPosition: r.mapPackPosition,
            organicPosition: r.organicPosition,
            checkedAt: r.checkedAt,
          })),
        });
      } catch (error: any) {
        console.error("[Optimize] Keyword locations error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch keyword location rankings" });
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

  /** Analyze internal link structure across all pages */
  app.post(
    "/api/seo/pages/internal-links",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const domain = profile[0].domain.replace(/^https?:\/\//, '').replace(/\/+$/, '');

        const pages = await db.select().from(seoPages)
          .where(eq(seoPages.profileId, profileId));

        if (pages.length === 0) {
          return res.json({ success: true, pages: [], orphanPages: [], suggestions: [], message: "No pages analyzed yet. Run a site crawl first." });
        }

        // Build the link graph from crawled page data
        const pageUrls = new Set(pages.map(p => p.url));
        const linkMap: Record<string, { internalLinksOut: string[]; internalLinksIn: string[] }> = {};

        for (const p of pages) {
          if (!linkMap[p.url]) linkMap[p.url] = { internalLinksOut: [], internalLinksIn: [] };
        }

        // Parse internal links from each page's crawled data
        for (const p of pages) {
          const data = (p as any).data || (p as any).crawlData || {};
          const links: string[] = data.internalLinks || data.links || [];

          for (const link of links) {
            // Normalize and check if it's an internal link
            let normalized = link;
            try {
              const url = new URL(link, `https://${domain}`);
              if (url.hostname.replace('www.', '') === domain.replace('www.', '')) {
                normalized = url.pathname;
              } else {
                continue; // External link, skip
              }
            } catch {
              if (!link.startsWith('/')) continue;
              normalized = link;
            }

            if (linkMap[p.url]) {
              linkMap[p.url].internalLinksOut.push(normalized);
            }

            // Find the target page
            const targetPage = pages.find(tp => tp.url === normalized || tp.url.endsWith(normalized));
            if (targetPage && linkMap[targetPage.url]) {
              linkMap[targetPage.url].internalLinksIn.push(p.url);
            }
          }
        }

        // Identify orphan pages (no internal links pointing to them, excluding homepage)
        const orphanPages = pages
          .filter(p => {
            const entry = linkMap[p.url];
            return entry && entry.internalLinksIn.length === 0 && p.url !== '/' && p.url !== `https://${domain}/`;
          })
          .map(p => p.url);

        // Generate suggestions
        const suggestions: string[] = [];
        for (const orphan of orphanPages.slice(0, 10)) {
          // Find a high-authority page to suggest linking from
          const bestSource = pages
            .filter(p => p.url !== orphan && (linkMap[p.url]?.internalLinksIn.length || 0) > 0)
            .sort((a, b) => (b.score || 0) - (a.score || 0))[0];
          if (bestSource) {
            suggestions.push(`Add a link from "${bestSource.url}" to "${orphan}" — this page has no internal links pointing to it.`);
          }
        }

        // Pages with very few outbound links
        for (const p of pages) {
          const entry = linkMap[p.url];
          if (entry && entry.internalLinksOut.length < 2 && pages.length > 3) {
            suggestions.push(`"${p.url}" only links to ${entry.internalLinksOut.length} internal page(s). Add links to related content.`);
          }
        }

        const result = pages.map(p => ({
          url: p.url,
          internalLinksIn: linkMap[p.url]?.internalLinksIn.length || 0,
          internalLinksOut: linkMap[p.url]?.internalLinksOut.length || 0,
        }));

        res.json({ success: true, pages: result, orphanPages, suggestions });
      } catch (error: any) {
        console.error("[Optimize] Internal links analysis error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze internal links" });
      }
    }
  );

  /** Audit images across all pages */
  app.post(
    "/api/seo/pages/image-audit",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const pages = await db.select().from(seoPages)
          .where(eq(seoPages.profileId, profileId));

        if (pages.length === 0) {
          return res.json({ success: true, totalImages: 0, withoutAlt: 0, oversized: 0, suggestions: [], message: "No pages analyzed yet. Run a site crawl first." });
        }

        // Collect image data from crawled pages
        const allImages: { pageUrl: string; src: string; alt: string | null; sizeKb: number | null; format: string | null }[] = [];

        for (const p of pages) {
          const data = (p as any).data || (p as any).crawlData || {};
          const images: any[] = data.images || [];

          for (const img of images) {
            allImages.push({
              pageUrl: p.url,
              src: img.src || img.url || '',
              alt: img.alt || null,
              sizeKb: img.sizeKb || img.size || null,
              format: img.format || img.type || null,
            });
          }
        }

        const withoutAlt = allImages.filter(img => !img.alt || img.alt.trim().length === 0);
        const oversized = allImages.filter(img => img.sizeKb != null && img.sizeKb > 200);
        const notWebp = allImages.filter(img => img.format && !['webp', 'avif'].includes(img.format.toLowerCase()));

        // Generate AI alt text suggestions for images without alt text (limit to 20)
        let altSuggestions: { url: string; currentAlt: string | null; suggestedAlt: string }[] = [];

        if (withoutAlt.length > 0) {
          try {
            const settings = await aiSettingsService.getAllSettings();
            const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

            const imagesToDescribe = withoutAlt.slice(0, 20).map(img => ({
              src: img.src,
              pageUrl: img.pageUrl,
            }));

            const prompt = `You are an SEO and accessibility expert. Generate descriptive alt text for these images.
The images are from a business website in the ${profile[0].industry || 'general'} industry.

Images needing alt text:
${imagesToDescribe.map((img, i) => `${i + 1}. URL: ${img.src} (found on page: ${img.pageUrl})`).join('\n')}

For each image, write a concise, descriptive alt text (under 125 characters) based on:
- The image filename/URL pattern
- The page it appears on
- The business industry

Return ONLY a JSON array of objects: [{"url": "...", "suggestedAlt": "..."}]`;

            const result = await unifiedAI.getCompletion(provider, {
              messages: [
                { role: 'system', content: 'You are an SEO alt text expert. Return only valid JSON arrays.' },
                { role: 'user', content: prompt },
              ],
              temperature: 0.5,
              maxTokens: 1500,
              responseFormat: 'json',
            });

            const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed)) {
              altSuggestions = parsed.map((s: any) => ({
                url: s.url || '',
                currentAlt: null,
                suggestedAlt: s.suggestedAlt || '',
              }));
            }
          } catch (aiError: any) {
            console.error("[Optimize] AI alt text generation failed:", aiError.message);
            // Graceful degradation — return audit results without AI suggestions
          }
        }

        res.json({
          success: true,
          totalImages: allImages.length,
          withoutAlt: withoutAlt.length,
          oversized: oversized.length,
          notWebp: notWebp.length,
          suggestions: altSuggestions,
          details: {
            missingAlt: withoutAlt.map(img => ({ src: img.src, pageUrl: img.pageUrl })),
            oversizedImages: oversized.map(img => ({ src: img.src, pageUrl: img.pageUrl, sizeKb: img.sizeKb })),
          },
        });
      } catch (error: any) {
        console.error("[Optimize] Image audit error:", error);
        res.status(500).json({ success: false, message: "Failed to audit images" });
      }
    }
  );

  /** Detect redirect chains across all pages */
  app.post(
    "/api/seo/pages/redirect-chains",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const pages = await db.select().from(seoPages)
          .where(eq(seoPages.profileId, profileId));

        if (pages.length === 0) {
          return res.json({ success: true, chains: [], suggestions: [], message: "No pages analyzed yet. Run a site crawl first." });
        }

        const traceRedirects = async (url: string): Promise<string[]> => {
          const chain: string[] = [url];
          let currentUrl = url;
          for (let i = 0; i < 10; i++) {
            try {
              const fetchRes = await fetch(currentUrl, {
                method: 'HEAD',
                redirect: 'manual',
                signal: AbortSignal.timeout(5000),
              });
              const location = fetchRes.headers.get('location');
              if (!location || fetchRes.status < 300 || fetchRes.status >= 400) break;
              const nextUrl = new URL(location, currentUrl).href;
              chain.push(nextUrl);
              currentUrl = nextUrl;
            } catch {
              break;
            }
          }
          return chain;
        }

        const chains: { originalUrl: string; redirects: string[]; finalUrl: string; hops: number }[] = [];

        // Process pages in parallel batches of 10
        const batchSize = 10;
        for (let i = 0; i < pages.length; i += batchSize) {
          const batch = pages.slice(i, i + batchSize);
          const results = await Promise.allSettled(
            batch.map(async (page) => {
              const chain = await traceRedirects(page.url);
              if (chain.length > 1) {
                return {
                  originalUrl: page.url,
                  redirects: chain,
                  finalUrl: chain[chain.length - 1],
                  hops: chain.length - 1,
                };
              }
              return null;
            })
          );

          for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
              chains.push(result.value);
            }
          }
        }

        // Sort by longest chains first
        chains.sort((a, b) => b.hops - a.hops);

        const suggestions: string[] = [];
        const longChains = chains.filter(c => c.hops > 1);
        if (longChains.length > 0) {
          suggestions.push(`Found ${longChains.length} redirect chain(s) with more than 1 hop. Each extra hop slows page load and dilutes link equity.`);
          for (const chain of longChains.slice(0, 5)) {
            suggestions.push(`Update links pointing to ${chain.originalUrl} to point directly to ${chain.finalUrl} (currently ${chain.hops} hops)`);
          }
        }
        if (chains.length > 0 && longChains.length === 0) {
          suggestions.push("All redirects are single-hop. No redirect chains detected.");
        }
        if (chains.length === 0) {
          suggestions.push("No redirects detected on any crawled pages.");
        }

        res.json({ success: true, chains, suggestions, totalPages: pages.length, pagesWithRedirects: chains.length });
      } catch (error: any) {
        console.error("[Optimize] Redirect chain detection error:", error);
        res.status(500).json({ success: false, message: "Failed to detect redirect chains" });
      }
    }
  );

  /** Analyze heading structure (H1-H6 hierarchy) per page */
  app.post(
    "/api/seo/pages/heading-structure",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const { url: targetUrl } = req.body;

        let pages;
        if (targetUrl) {
          pages = await db.select().from(seoPages)
            .where(and(eq(seoPages.profileId, profileId), eq(seoPages.url, targetUrl)))
            .limit(1);
        } else {
          pages = await db.select().from(seoPages)
            .where(eq(seoPages.profileId, profileId));
        }

        if (pages.length === 0) {
          return res.json({ success: true, pages: [], message: targetUrl ? "Page not found. Run a crawl that includes this URL." : "No pages analyzed yet. Run a site crawl first." });
        }

        const results: { url: string; headings: { level: number; text: string }[]; issues: string[] }[] = [];

        for (const page of pages) {
          const data = (page as any).crawlData || (page as any).data || {};
          let headings: { level: number; text: string }[] = data.headings || [];

          // If no stored headings, try to fetch and parse
          if (headings.length === 0) {
            try {
              const fetchRes = await fetch(page.url, { signal: AbortSignal.timeout(10000) });
              const html = await fetchRes.text();
              const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
              let match;
              while ((match = headingRegex.exec(html)) !== null) {
                const text = match[2].replace(/<[^>]*>/g, '').trim();
                if (text) {
                  headings.push({ level: parseInt(match[1]), text });
                }
              }
            } catch {
              // Page unreachable — use whatever we have
            }
          }

          const issues: string[] = [];

          // Check for multiple H1s
          const h1s = headings.filter(h => h.level === 1);
          if (h1s.length === 0) {
            issues.push("Missing H1 tag — every page should have exactly one H1");
          } else if (h1s.length > 1) {
            issues.push(`Multiple H1 tags found (${h1s.length}) — use only one H1 per page`);
          }

          // Check for skipped heading levels
          const usedLevels = Array.from(new Set(headings.map(h => h.level))).sort((a, b) => a - b);
          for (let i = 0; i < usedLevels.length - 1; i++) {
            if (usedLevels[i + 1] - usedLevels[i] > 1) {
              issues.push(`Skipped heading level: H${usedLevels[i]} jumps to H${usedLevels[i + 1]} — use sequential heading levels`);
            }
          }

          // Check for no H2s
          if (headings.length > 0 && !headings.some(h => h.level === 2)) {
            issues.push("No H2 headings found — use H2s to structure your main content sections");
          }

          // Check if H1 is too long
          for (const h1 of h1s) {
            if (h1.text.length > 70) {
              issues.push(`H1 is ${h1.text.length} characters — keep H1 tags under 70 characters for readability`);
            }
          }

          results.push({ url: page.url, headings, issues });
        }

        res.json({ success: true, pages: results, totalPages: results.length, pagesWithIssues: results.filter(r => r.issues.length > 0).length });
      } catch (error: any) {
        console.error("[Optimize] Heading structure analysis error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze heading structure" });
      }
    }
  );

  /** Keyword density analysis — check keyword placement on a page */
  app.post(
    "/api/seo/pages/keyword-density",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const { url: targetUrl, pageId, keyword } = req.body;

        if (!keyword || typeof keyword !== 'string') {
          return res.status(400).json({ success: false, message: "Keyword is required" });
        }

        let pageUrl: string;
        if (pageId) {
          const page = await db.select().from(seoPages)
            .where(and(eq(seoPages.id, pageId), eq(seoPages.profileId, profileId)))
            .limit(1);
          if (page.length === 0) return res.status(404).json({ success: false, message: "Page not found" });
          pageUrl = page[0].url;
        } else if (targetUrl && typeof targetUrl === 'string') {
          pageUrl = targetUrl;
        } else {
          return res.status(400).json({ success: false, message: "Provide either pageId or url" });
        }

        // Fetch the page
        let html: string;
        try {
          const fetchRes = await fetch(pageUrl, { signal: AbortSignal.timeout(15000) });
          html = await fetchRes.text();
        } catch (fetchErr: any) {
          return res.status(400).json({ success: false, message: `Could not fetch page: ${fetchErr.message}` });
        }

        const lowerKeyword = keyword.toLowerCase();

        // Extract title
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';

        // Extract meta description
        const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i)
          || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
        const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

        // Extract H1
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract body text
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyHtml = bodyMatch ? bodyMatch[1] : html;
        // Strip script/style tags then all HTML tags
        const bodyText = bodyHtml
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        // First paragraph (first 500 chars of body text)
        const firstParagraph = bodyText.substring(0, 500).toLowerCase();

        // URL check
        const urlLower = pageUrl.toLowerCase();

        // Keyword density calculation
        const words = bodyText.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        const totalWords = words.length;
        const keywordWords = lowerKeyword.split(/\s+/);
        let keywordOccurrences = 0;

        if (keywordWords.length === 1) {
          keywordOccurrences = words.filter(w => w.includes(lowerKeyword)).length;
        } else {
          // Multi-word: count phrase occurrences
          const bodyLower = bodyText.toLowerCase();
          let searchFrom = 0;
          while (true) {
            const idx = bodyLower.indexOf(lowerKeyword, searchFrom);
            if (idx === -1) break;
            keywordOccurrences++;
            searchFrom = idx + 1;
          }
        }

        const density = totalWords > 0 ? Math.round((keywordOccurrences / totalWords) * 10000) / 100 : 0;

        const checks: { name: string; passed: boolean; detail: string }[] = [
          {
            name: 'Keyword in Title',
            passed: title.toLowerCase().includes(lowerKeyword),
            detail: title ? `Title: "${title.substring(0, 80)}"` : 'No title tag found',
          },
          {
            name: 'Keyword in H1',
            passed: h1Text.toLowerCase().includes(lowerKeyword),
            detail: h1Text ? `H1: "${h1Text.substring(0, 80)}"` : 'No H1 tag found',
          },
          {
            name: 'Keyword in First Paragraph',
            passed: firstParagraph.includes(lowerKeyword),
            detail: firstParagraph.includes(lowerKeyword) ? 'Found in first 500 characters of body text' : 'Not found in first 500 characters',
          },
          {
            name: 'Keyword in URL',
            passed: urlLower.includes(lowerKeyword.replace(/\s+/g, '-')) || urlLower.includes(lowerKeyword.replace(/\s+/g, '')),
            detail: `URL: ${pageUrl}`,
          },
          {
            name: 'Keyword in Meta Description',
            passed: metaDesc.toLowerCase().includes(lowerKeyword),
            detail: metaDesc ? `Meta: "${metaDesc.substring(0, 120)}"` : 'No meta description found',
          },
          {
            name: 'Keyword Density (1-3%)',
            passed: density >= 0.5 && density <= 3.0,
            detail: `${density}% (${keywordOccurrences} occurrences in ${totalWords} words)`,
          },
        ];

        const passedCount = checks.filter(c => c.passed).length;
        let recommendation: string;
        if (passedCount === checks.length) {
          recommendation = "This page is well-optimized for the target keyword. Keep monitoring your rankings.";
        } else if (passedCount >= 4) {
          recommendation = "Good keyword placement overall. Address the failing checks to strengthen optimization.";
        } else if (passedCount >= 2) {
          recommendation = "Moderate optimization. This page needs significant keyword placement improvements to rank competitively.";
        } else {
          recommendation = "This page is poorly optimized for this keyword. Consider rewriting key elements (title, H1, intro paragraph) to include the target keyword.";
        }

        res.json({
          success: true,
          url: pageUrl,
          keyword,
          checks,
          density,
          totalWords,
          keywordOccurrences,
          recommendation,
        });
      } catch (error: any) {
        console.error("[Optimize] Keyword density analysis error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze keyword density" });
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
  // CONTENT TOOLS — ADVANCED
  // =============================================

  /** Content length recommendations based on AI analysis of top-ranking pages */
  app.post(
    "/api/seo/content/length-recommendations",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const { keyword } = req.body;
        if (!keyword || typeof keyword !== 'string') {
          return res.status(400).json({ success: false, message: "Keyword is required" });
        }

        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO content strategist. For the keyword "${keyword}" in the ${profile[0].industry || 'general business'} industry:

Analyze what typical top-ranking pages look like and recommend an ideal word count.

Return a JSON object:
{
  "keyword": "${keyword}",
  "recommendedWordCount": 1500,
  "topResultsAverage": 1800,
  "range": { "min": 1200, "max": 2500 },
  "contentType": "comprehensive guide",
  "recommendation": "Top results for this keyword average about 1,800 words. We recommend at least 1,500 words with thorough coverage of subtopics to compete effectively."
}

Base your estimates on typical content patterns for this type of keyword.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO content length expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.5,
        });

        let data: any = {};
        try {
          const cleaned = (result.content || '').replace(/```json?\n?/g, '').replace(/```/g, '').trim();
          data = JSON.parse(cleaned);
        } catch {
          data = {
            keyword,
            recommendedWordCount: 1500,
            topResultsAverage: 1500,
            range: { min: 1000, max: 2000 },
            contentType: 'article',
            recommendation: 'Aim for at least 1,500 words with comprehensive coverage of the topic.',
          };
        }

        res.json({ success: true, ...data });
      } catch (error: any) {
        console.error("[Optimize] Content length recommendation error:", error);
        res.status(500).json({ success: false, message: "Failed to generate content length recommendations" });
      }
    }
  );

  /** Click/CTR estimates per keyword */
  app.post(
    "/api/seo/content/click-potential",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;

        let keywordsData: { keyword: string; position: number; searchVolume: number }[];

        if (req.body.keywords && Array.isArray(req.body.keywords)) {
          keywordsData = req.body.keywords.map((kw: any) => ({
            keyword: kw.keyword,
            position: kw.position || 0,
            searchVolume: kw.searchVolume || 0,
          }));
        } else {
          // Pull from tracked keywords
          const keywords = await db.select().from(seoKeywords).where(eq(seoKeywords.profileId, profileId));
          keywordsData = keywords.map(kw => ({
            keyword: kw.keyword,
            position: kw.currentRank || 0,
            searchVolume: kw.searchVolume || 0,
          }));
        }

        const estimates = keywordsData.map(kw => {
          const ctr = getCtrForPosition(kw.position);
          const estimatedClicks = Math.round(kw.searchVolume * ctr);
          return {
            keyword: kw.keyword,
            position: kw.position,
            searchVolume: kw.searchVolume,
            estimatedCtr: Math.round(ctr * 10000) / 100,
            estimatedClicks,
            potentialClicks: kw.position > 1 ? Math.round(kw.searchVolume * getCtrForPosition(1)) : estimatedClicks,
            opportunityGap: kw.position > 1 ? Math.round(kw.searchVolume * getCtrForPosition(1)) - estimatedClicks : 0,
          };
        }).sort((a, b) => b.opportunityGap - a.opportunityGap);

        const totalEstimatedClicks = estimates.reduce((sum, e) => sum + e.estimatedClicks, 0);
        const totalPotentialClicks = estimates.reduce((sum, e) => sum + e.potentialClicks, 0);

        res.json({
          success: true,
          estimates,
          summary: {
            totalKeywords: estimates.length,
            totalEstimatedClicks,
            totalPotentialClicks,
            opportunityGap: totalPotentialClicks - totalEstimatedClicks,
          },
        });
      } catch (error: any) {
        console.error("[Optimize] Click potential error:", error);
        res.status(500).json({ success: false, message: "Failed to estimate click potential" });
      }
    }
  );

  /** Question-based keyword ideas — "People Also Ask" style */
  app.post(
    "/api/seo/content/question-keywords",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const { keyword } = req.body;
        if (!keyword || typeof keyword !== 'string') {
          return res.status(400).json({ success: false, message: "Keyword is required" });
        }

        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO keyword research expert. For the keyword "${keyword}" in the ${profile[0].industry || 'general business'} industry (${profile[0].location || 'US'}):

Generate question-based keywords that people search for — the kind that appear in Google's "People Also Ask" section.

Return a JSON object:
{
  "keyword": "${keyword}",
  "questions": [
    {
      "question": "How much does [keyword] cost?",
      "estimatedVolume": 500,
      "difficulty": 35,
      "intent": "informational",
      "contentFormat": "comparison table with pricing breakdown"
    }
  ]
}

Provide 15-20 questions. Include a mix of:
- "How" questions (process/method)
- "What" questions (definition/explanation)
- "Why" questions (reasoning)
- "Where/When" questions (location/timing)
- "Is/Can/Does" questions (yes/no intent)
- Cost/price questions
- Comparison questions ("vs", "or", "difference between")

Estimate search volume and keyword difficulty (0-100) realistically.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO question keyword expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        });

        let data: any = { keyword, questions: [] };
        try {
          const cleaned = (result.content || '').replace(/```json?\n?/g, '').replace(/```/g, '').trim();
          data = JSON.parse(cleaned);
        } catch {
          // AI response wasn't valid JSON — return empty
        }

        res.json({ success: true, ...data });
      } catch (error: any) {
        console.error("[Optimize] Question keywords error:", error);
        res.status(500).json({ success: false, message: "Failed to generate question keywords" });
      }
    }
  );

  /** Topic clustering — group related keywords into content clusters */
  app.post(
    "/api/seo/content/topic-clusters",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;

        let keywords: string[];
        if (req.body.keywords && Array.isArray(req.body.keywords) && req.body.keywords.length > 0) {
          keywords = req.body.keywords;
        } else {
          const tracked = await db.select().from(seoKeywords).where(eq(seoKeywords.profileId, profileId));
          keywords = tracked.map(kw => kw.keyword);
        }

        if (keywords.length === 0) {
          return res.status(400).json({ success: false, message: "No keywords available. Add keywords to your profile first." });
        }

        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO content strategist. Group these keywords into topic clusters for ${profile[0].domain || 'a business website'} in the ${profile[0].industry || 'general business'} industry:

Keywords: ${keywords.slice(0, 50).join(', ')}

Return a JSON object:
{
  "clusters": [
    {
      "topic": "Cluster name / pillar topic",
      "pillarKeyword": "main keyword for the pillar page",
      "keywords": ["keyword1", "keyword2"],
      "suggestedContent": "A comprehensive guide covering...",
      "contentType": "pillar page",
      "estimatedPages": 5
    }
  ]
}

Group related keywords together. Each cluster should have:
- A clear pillar topic
- The specific keywords that belong in that cluster
- A suggested content piece (pillar page or supporting content)
- The type of content that would work best

Provide 3-8 clusters depending on keyword variety. Every keyword should be in exactly one cluster.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO topic clustering expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.5,
        });

        let data: any = { clusters: [] };
        try {
          const cleaned = (result.content || '').replace(/```json?\n?/g, '').replace(/```/g, '').trim();
          data = JSON.parse(cleaned);
        } catch {
          // Return empty clusters
        }

        res.json({ success: true, clusters: data.clusters || [] });
      } catch (error: any) {
        console.error("[Optimize] Topic clusters error:", error);
        res.status(500).json({ success: false, message: "Failed to generate topic clusters" });
      }
    }
  );

  /** SEO writing assistant — score content for SEO quality */
  app.post(
    "/api/seo/content/seo-score",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const { content, targetKeyword } = req.body;
        if (!content || typeof content !== 'string') {
          return res.status(400).json({ success: false, message: "Content is required" });
        }
        if (!targetKeyword || typeof targetKeyword !== 'string') {
          return res.status(400).json({ success: false, message: "Target keyword is required" });
        }

        const checks: { name: string; passed: boolean; detail: string }[] = [];
        const suggestions: string[] = [];

        // 1. Content length
        const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount >= 1500) {
          checks.push({ name: 'Content Length', passed: true, detail: `${wordCount} words — comprehensive length` });
        } else if (wordCount >= 600) {
          checks.push({ name: 'Content Length', passed: true, detail: `${wordCount} words — adequate, but longer content may rank better` });
          suggestions.push(`Consider expanding to 1,500+ words for more thorough coverage`);
        } else {
          checks.push({ name: 'Content Length', passed: false, detail: `${wordCount} words — too short for competitive keywords` });
          suggestions.push(`Expand content to at least 600 words, ideally 1,500+ for this keyword`);
        }

        // 2. Keyword usage
        const keywordLower = targetKeyword.toLowerCase();
        const contentLower = content.toLowerCase();
        const keywordCount = contentLower.split(keywordLower).length - 1;
        const keywordDensity = wordCount > 0 ? Math.round((keywordCount / wordCount) * 10000) / 100 : 0;

        if (keywordCount === 0) {
          checks.push({ name: 'Keyword Usage', passed: false, detail: 'Target keyword not found in content' });
          suggestions.push(`Include "${targetKeyword}" naturally throughout the content`);
        } else if (keywordDensity > 3) {
          checks.push({ name: 'Keyword Usage', passed: false, detail: `Keyword density ${keywordDensity}% — too high, may be seen as keyword stuffing` });
          suggestions.push(`Reduce keyword density from ${keywordDensity}% to 1-2%`);
        } else if (keywordDensity >= 0.5) {
          checks.push({ name: 'Keyword Usage', passed: true, detail: `Keyword used ${keywordCount} times (${keywordDensity}% density)` });
        } else {
          checks.push({ name: 'Keyword Usage', passed: false, detail: `Keyword density ${keywordDensity}% — too low` });
          suggestions.push(`Use "${targetKeyword}" a few more times naturally — aim for 1-2% density`);
        }

        // 3. Keyword in first 100 words
        const first100Words = content.split(/\s+/).slice(0, 100).join(' ').toLowerCase();
        const keywordInIntro = first100Words.includes(keywordLower);
        checks.push({
          name: 'Keyword in Introduction',
          passed: keywordInIntro,
          detail: keywordInIntro ? 'Target keyword appears in the first 100 words' : 'Target keyword missing from the opening paragraph',
        });
        if (!keywordInIntro) suggestions.push('Include the target keyword in your first paragraph');

        // 4. Heading structure
        const headingMatches = content.match(/^#{1,6}\s+.+/gm) || content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi) || [];
        if (headingMatches.length >= 3) {
          checks.push({ name: 'Heading Structure', passed: true, detail: `${headingMatches.length} headings found — well-structured` });
        } else if (headingMatches.length > 0) {
          checks.push({ name: 'Heading Structure', passed: true, detail: `${headingMatches.length} heading(s) found — consider adding more subheadings` });
          suggestions.push('Add more subheadings (H2, H3) to break up the content and improve readability');
        } else {
          checks.push({ name: 'Heading Structure', passed: false, detail: 'No headings detected' });
          suggestions.push('Add H2 and H3 headings to structure your content — search engines use headings to understand page topics');
        }

        // 5. Sentence length / readability
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgSentenceLength = sentences.length > 0 ? Math.round(wordCount / sentences.length) : 0;
        if (avgSentenceLength <= 20) {
          checks.push({ name: 'Readability', passed: true, detail: `Average sentence length: ${avgSentenceLength} words — easy to read` });
        } else if (avgSentenceLength <= 25) {
          checks.push({ name: 'Readability', passed: true, detail: `Average sentence length: ${avgSentenceLength} words — readable but could be tighter` });
          suggestions.push('Some sentences are long — try breaking them up for better readability');
        } else {
          checks.push({ name: 'Readability', passed: false, detail: `Average sentence length: ${avgSentenceLength} words — too complex` });
          suggestions.push('Shorten your sentences — aim for 15-20 words per sentence for better readability');
        }

        // 6. Paragraph length
        const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
        const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 150);
        if (longParagraphs.length === 0) {
          checks.push({ name: 'Paragraph Length', passed: true, detail: 'All paragraphs are a reasonable length' });
        } else {
          checks.push({ name: 'Paragraph Length', passed: false, detail: `${longParagraphs.length} paragraph(s) over 150 words` });
          suggestions.push('Break up long paragraphs — aim for 3-5 sentences per paragraph for web content');
        }

        // 7. Internal link placeholders (check for markdown links or HTML links)
        const linkMatches = content.match(/\[.*?\]\(.*?\)/g) || content.match(/<a\s+[^>]*href[^>]*>/gi) || [];
        if (linkMatches.length >= 2) {
          checks.push({ name: 'Internal Links', passed: true, detail: `${linkMatches.length} links found` });
        } else if (linkMatches.length === 1) {
          checks.push({ name: 'Internal Links', passed: true, detail: '1 link found — consider adding more' });
          suggestions.push('Add 2-3 more internal links to related content on your site');
        } else {
          checks.push({ name: 'Internal Links', passed: false, detail: 'No links found in content' });
          suggestions.push('Add internal links to related pages on your site — this helps search engines understand your site structure');
        }

        // Calculate overall score
        const passedChecks = checks.filter(c => c.passed).length;
        const score = Math.round((passedChecks / checks.length) * 100);

        res.json({
          success: true,
          score,
          grade: score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F',
          checks,
          suggestions,
          wordCount,
          keywordDensity,
        });
      } catch (error: any) {
        console.error("[Optimize] SEO score error:", error);
        res.status(500).json({ success: false, message: "Failed to score content" });
      }
    }
  );

  // =============================================
  // SNIPPET PREVIEW
  // =============================================

  /** Generate SERP snippet preview for a given URL */
  app.post(
    "/api/seo/pages/snippet-preview",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const { url } = req.body;
        if (!url || typeof url !== 'string') {
          return res.status(400).json({ success: false, message: "URL is required" });
        }

        const profileId = profile[0].id;

        // Check if we have page data stored
        const pages = await db.select().from(seoPages).where(
          and(eq(seoPages.profileId, profileId), eq(seoPages.url, url))
        ).limit(1);

        let title = '';
        let metaDescription = '';

        if (pages.length > 0) {
          title = pages[0].title || '';
          metaDescription = pages[0].metaDescription || '';
        }

        // If no stored data, try to fetch the page
        if (!title && !metaDescription) {
          try {
            const fetchUrl = url.startsWith('http') ? url : `https://${url}`;
            const response = await fetch(fetchUrl, {
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BusinessBlueprint SEO Analyzer)' },
              signal: AbortSignal.timeout(10000),
            });
            const html = await response.text();

            const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            title = titleMatch ? titleMatch[1].trim() : '';

            const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i) ||
              html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*>/i);
            metaDescription = descMatch ? descMatch[1].trim() : '';
          } catch {
            // Can't fetch — return what we have (which may be empty)
          }
        }

        // Build snippet analysis
        const titleLength = title.length;
        const descLength = metaDescription.length;

        const issues: string[] = [];
        if (!title) issues.push('Missing page title');
        else if (titleLength > 60) issues.push(`Title is ${titleLength} characters — Google typically shows 50-60. It may be truncated.`);
        else if (titleLength < 30) issues.push(`Title is only ${titleLength} characters — you have room to add more descriptive keywords.`);

        if (!metaDescription) issues.push('Missing meta description — Google will auto-generate one, which may not be what you want.');
        else if (descLength > 160) issues.push(`Description is ${descLength} characters — Google typically shows 150-160. It may be truncated.`);
        else if (descLength < 70) issues.push(`Description is only ${descLength} characters — a longer description gives you more SERP real estate.`);

        // Generate AI-improved suggestions
        let suggestions: { title: string; description: string } | null = null;
        if (title || metaDescription) {
          try {
            const settings = await aiSettingsService.getAllSettings();
            const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

            const prompt = `You are an SEO specialist. Given this page's current SERP snippet data:
Title: "${title}"
Meta Description: "${metaDescription}"
URL: ${url}
Industry: ${profile[0].industry || 'general business'}

Suggest an improved title (50-60 chars) and meta description (140-155 chars) that would get more clicks. Keep it natural and compelling — not keyword-stuffed.

Return ONLY a JSON object: {"title": "...", "description": "..."}`;

            const result = await unifiedAI.getCompletion(provider, {
              messages: [
                { role: 'system', content: 'You are an SEO copywriter. Return only valid JSON.' },
                { role: 'user', content: prompt },
              ],
              temperature: 0.6,
            });

            const cleaned = (result.content || '').replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            suggestions = JSON.parse(cleaned);
          } catch {
            // AI suggestion failed — still return the preview without suggestions
          }
        }

        const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

        res.json({
          success: true,
          snippet: {
            title: title || '(No title found)',
            titleLength,
            metaDescription: metaDescription || '(No meta description found)',
            descriptionLength: descLength,
            displayUrl,
            issues,
            score: issues.length === 0 ? 'good' : issues.length <= 1 ? 'fair' : 'poor',
          },
          suggestions,
        });
      } catch (error: any) {
        console.error("[Optimize] Snippet preview error:", error);
        res.status(500).json({ success: false, message: "Failed to generate snippet preview" });
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

  /** Referring domains over time — for backlink charts */
  app.get(
    "/api/seo/backlinks/referring-domains",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, dataPoints: [] });

        const profileId = profile[0].id;

        const backlinks = await db.select({
          firstSeen: seoBacklinks.firstSeen,
          sourceUrl: seoBacklinks.sourceUrl,
        })
          .from(seoBacklinks)
          .where(eq(seoBacklinks.profileId, profileId))
          .orderBy(asc(seoBacklinks.firstSeen));

        // Group by date, counting unique referring domains cumulatively
        const seenDomains = new Set<string>();
        const dateMap = new Map<string, number>();

        for (const bl of backlinks) {
          const dateStr = bl.firstSeen
            ? new Date(bl.firstSeen).toISOString().split('T')[0]
            : 'unknown';
          if (dateStr === 'unknown') continue;

          let hostname = '';
          try {
            hostname = new URL(bl.sourceUrl || '').hostname;
          } catch {
            continue;
          }

          seenDomains.add(hostname);
          dateMap.set(dateStr, seenDomains.size);
        }

        const dataPoints = Array.from(dateMap.entries()).map(([date, count]) => ({
          date,
          count,
        }));

        res.json({ success: true, dataPoints });
      } catch (error: any) {
        console.error("[Optimize] Referring domains error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch referring domain history" });
      }
    }
  );

  // =============================================
  // BACKLINKS — TOXIC / OPPORTUNITIES / BROKEN / ANCHOR TEXT
  // =============================================

  /** Flag toxic/spam backlinks */
  app.post(
    "/api/seo/backlinks/toxic-check",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const backlinks = await db.select().from(seoBacklinks).where(eq(seoBacklinks.profileId, profileId));

        const suspiciousTlds = ['.xyz', '.top', '.work', '.click', '.link', '.gq', '.cf', '.tk', '.ml', '.ga', '.buzz', '.icu'];
        const flagged: { id: number; sourceUrl: string | null; spamScore: number; reason: string }[] = [];

        for (const bl of backlinks) {
          let spamScore = 0;
          const reasons: string[] = [];

          // Low domain authority
          if (bl.domainAuthority !== null && bl.domainAuthority < 10) {
            spamScore += 30;
            reasons.push(`Very low domain authority (${bl.domainAuthority})`);
          } else if (bl.domainAuthority !== null && bl.domainAuthority < 20) {
            spamScore += 15;
            reasons.push(`Low domain authority (${bl.domainAuthority})`);
          }

          // Suspicious TLD
          const sourceUrl = bl.sourceUrl || '';
          try {
            const hostname = new URL(sourceUrl).hostname;
            if (suspiciousTlds.some(tld => hostname.endsWith(tld))) {
              spamScore += 35;
              reasons.push(`Suspicious TLD: ${hostname.split('.').pop()}`);
            }
          } catch {
            // invalid URL
          }

          // Keyword-stuffed anchor text (more than 5 words, all lowercase, no brand name)
          const anchor = bl.anchorText || '';
          if (anchor.length > 0) {
            const wordCount = anchor.split(/\s+/).length;
            if (wordCount > 5 && anchor === anchor.toLowerCase()) {
              spamScore += 25;
              reasons.push('Keyword-stuffed anchor text');
            }
            // Exact-match commercial anchors
            const commercialTerms = ['buy', 'cheap', 'best price', 'discount', 'order', 'online'];
            if (commercialTerms.some(t => anchor.toLowerCase().includes(t))) {
              spamScore += 20;
              reasons.push('Commercial/spammy anchor text');
            }
          }

          // nofollow links from low DA are less concerning, but ugc/sponsored from unknown sites still flag
          if (bl.linkType === 'ugc' && (bl.domainAuthority === null || bl.domainAuthority < 15)) {
            spamScore += 10;
            reasons.push('UGC link from low-authority site');
          }

          if (spamScore >= 30) {
            flagged.push({ id: bl.id, sourceUrl: bl.sourceUrl, spamScore: Math.min(100, spamScore), reason: reasons.join('; ') });

            // Update the record in the database
            await db.update(seoBacklinks)
              .set({ isSpam: true, spamScore: Math.min(100, spamScore) })
              .where(eq(seoBacklinks.id, bl.id));
          }
        }

        const recommendation = flagged.length === 0
          ? 'No toxic backlinks detected. Your backlink profile looks healthy.'
          : flagged.length <= 3
            ? `Found ${flagged.length} potentially toxic backlink(s). Consider disavowing them through Google Search Console if they persist.`
            : `Found ${flagged.length} toxic backlinks. We recommend creating a disavow file and submitting it to Google Search Console to protect your rankings.`;

        res.json({ success: true, flagged: flagged.length, backlinks: flagged, recommendation });
      } catch (error: any) {
        console.error("[Optimize] Toxic backlink check error:", error);
        res.status(500).json({ success: false, message: "Failed to run toxic backlink check" });
      }
    }
  );

  /** Link building opportunities — find domains linking to competitors but not to you */
  app.post(
    "/api/seo/backlinks/opportunities",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const profileData = profile[0];

        // Get user's existing backlink domains
        const userBacklinks = await db.select().from(seoBacklinks).where(eq(seoBacklinks.profileId, profileId));
        const userDomains = new Set<string>();
        for (const bl of userBacklinks) {
          try { userDomains.add(new URL(bl.sourceUrl || '').hostname); } catch {}
        }

        // Get competitor info
        const competitors = await db.select().from(seoCompetitors).where(eq(seoCompetitors.profileId, profileId));
        const competitorDomains = competitors.map(c => c.domain).filter(Boolean);

        // Use AI to generate link building opportunities based on industry and competitor info
        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO link building expert. Analyze link building opportunities for:

Domain: ${profileData.domain}
Industry: ${profileData.industry || 'general business'}
Location: ${profileData.location || 'not specified'}
Competitors: ${competitorDomains.join(', ') || 'none specified'}
Current backlink domains (${userDomains.size} total): ${Array.from(userDomains).slice(0, 20).join(', ')}

Return a JSON object with this structure:
{
  "opportunities": [
    {
      "domain": "example.com",
      "domainAuthority": 45,
      "linksToCompetitor": true,
      "suggestedApproach": "Guest posting about [topic]",
      "relevance": "high"
    }
  ]
}

Provide 10-15 realistic link building opportunities. Include a mix of:
- Domains that likely link to competitors in this industry
- Industry directories and resource pages
- Local business directories (if location is known)
- Guest posting targets
- Partnership opportunities

Do NOT include domains the user already has backlinks from: ${Array.from(userDomains).slice(0, 30).join(', ')}`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO link building expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        });

        let opportunities = [];
        try {
          const cleaned = (result.content || '').replace(/```json?\n?/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          opportunities = parsed.opportunities || [];
        } catch {
          opportunities = [];
        }

        res.json({ success: true, opportunities });
      } catch (error: any) {
        console.error("[Optimize] Backlink opportunities error:", error);
        res.status(500).json({ success: false, message: "Failed to find link building opportunities" });
      }
    }
  );

  /** Find broken backlinks — external sites linking to your 404 pages */
  app.post(
    "/api/seo/backlinks/broken",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileId = profile[0].id;
        const backlinks = await db.select().from(seoBacklinks)
          .where(and(eq(seoBacklinks.profileId, profileId), eq(seoBacklinks.isLost, false)));

        const broken: { sourceUrl: string | null; targetUrl: string | null; anchorText: string | null; suggestedFix: string }[] = [];

        // Check each target URL for 404 status (limit to avoid excessive requests)
        const targetUrls = new Map<string, typeof backlinks>();
        for (const bl of backlinks) {
          const target = bl.targetUrl || '';
          if (!target) continue;
          if (!targetUrls.has(target)) targetUrls.set(target, []);
          targetUrls.get(target)!.push(bl);
        }

        // Check up to 50 unique target URLs
        const urlsToCheck = Array.from(targetUrls.keys()).slice(0, 50);

        for (const url of urlsToCheck) {
          try {
            const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(5000) });
            if (response.status === 404 || response.status === 410) {
              const linkedBacklinks = targetUrls.get(url) || [];
              for (const bl of linkedBacklinks) {
                broken.push({
                  sourceUrl: bl.sourceUrl,
                  targetUrl: bl.targetUrl,
                  anchorText: bl.anchorText,
                  suggestedFix: `This page returns a ${response.status}. Set up a 301 redirect to the most relevant live page to reclaim the link equity, or fix the page if the content should still exist.`,
                });
              }
            }
          } catch {
            // Timeout or network error — skip
          }
        }

        res.json({
          success: true,
          broken,
          totalChecked: urlsToCheck.length,
          totalBacklinks: backlinks.length,
          recommendation: broken.length === 0
            ? 'No broken backlinks found. All checked target URLs are returning valid responses.'
            : `Found ${broken.length} broken backlink(s). Each one represents lost link equity — set up 301 redirects to reclaim ranking power.`,
        });
      } catch (error: any) {
        console.error("[Optimize] Broken backlinks error:", error);
        res.status(500).json({ success: false, message: "Failed to check for broken backlinks" });
      }
    }
  );

  /** Anchor text distribution analysis */
  app.get(
    "/api/seo/backlinks/anchor-text",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, distribution: [], warnings: [] });

        const profileId = profile[0].id;
        const backlinks = await db.select().from(seoBacklinks).where(eq(seoBacklinks.profileId, profileId));

        // Group by anchor text
        const anchorCounts = new Map<string, number>();
        for (const bl of backlinks) {
          const anchor = (bl.anchorText || '(no anchor text)').trim();
          anchorCounts.set(anchor, (anchorCounts.get(anchor) || 0) + 1);
        }

        const total = backlinks.length || 1;
        const distribution = Array.from(anchorCounts.entries())
          .map(([anchorText, count]) => ({
            anchorText,
            count,
            percentage: Math.round((count / total) * 10000) / 100,
          }))
          .sort((a, b) => b.count - a.count);

        // Flag over-optimized anchors
        const warnings: string[] = [];
        const domain = profile[0].domain || '';
        const brandName = profile[0].businessName || domain;

        for (const item of distribution) {
          if (item.anchorText === '(no anchor text)') continue;
          // If a single non-brand anchor makes up more than 15% of all backlinks, it's over-optimized
          const isBrandAnchor = item.anchorText.toLowerCase().includes(domain.toLowerCase()) ||
            item.anchorText.toLowerCase().includes(brandName.toLowerCase());
          if (!isBrandAnchor && item.percentage > 15) {
            warnings.push(`"${item.anchorText}" makes up ${item.percentage}% of backlinks — this looks over-optimized and may trigger a penalty`);
          }
        }

        // Check overall diversity
        const uniqueAnchors = distribution.filter(d => d.anchorText !== '(no anchor text)').length;
        if (uniqueAnchors < 5 && backlinks.length >= 10) {
          warnings.push('Low anchor text diversity — a natural backlink profile should have varied anchor text');
        }

        // Check brand vs non-brand ratio
        const brandAnchors = distribution.filter(d => {
          const anchor = d.anchorText.toLowerCase();
          return anchor.includes(domain.toLowerCase()) || anchor.includes(brandName.toLowerCase());
        });
        const brandPercentage = brandAnchors.reduce((sum, d) => sum + d.percentage, 0);
        if (brandPercentage < 20 && backlinks.length >= 10) {
          warnings.push(`Only ${Math.round(brandPercentage)}% of anchors are branded — healthy profiles typically have 30-50% branded anchors`);
        }

        res.json({ success: true, distribution, warnings });
      } catch (error: any) {
        console.error("[Optimize] Anchor text analysis error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze anchor text distribution" });
      }
    }
  );

  // =============================================
  // COMPETITORS
  // =============================================

  /** Add a competitor domain */
  app.post(
    "/api/seo/competitors",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const { domain, name } = req.body;
        if (!domain || typeof domain !== 'string') {
          return res.status(400).json({ success: false, message: "Competitor domain is required" });
        }

        // Normalize domain — strip protocol and trailing slash
        const normalizedDomain = domain.replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();

        // Check for duplicate
        const existing = await db.select().from(seoCompetitors)
          .where(and(eq(seoCompetitors.profileId, profile[0].id), eq(seoCompetitors.domain, normalizedDomain)))
          .limit(1);
        if (existing.length > 0) {
          return res.status(409).json({ success: false, message: "This competitor is already being tracked" });
        }

        const [competitor] = await db.insert(seoCompetitors).values({
          profileId: profile[0].id,
          domain: normalizedDomain,
          name: name || null,
        }).returning();

        res.json({ success: true, competitor });
      } catch (error: any) {
        console.error("[Optimize] Add competitor error:", error);
        res.status(500).json({ success: false, message: "Failed to add competitor" });
      }
    }
  );

  /** List competitors for profile */
  app.get(
    "/api/seo/competitors",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.json({ success: true, competitors: [] });

        const competitors = await db.select().from(seoCompetitors)
          .where(eq(seoCompetitors.profileId, profile[0].id))
          .orderBy(desc(seoCompetitors.createdAt));

        res.json({ success: true, competitors });
      } catch (error: any) {
        console.error("[Optimize] List competitors error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch competitors" });
      }
    }
  );

  /** Remove a competitor */
  app.delete(
    "/api/seo/competitors/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile" });

        const competitorId = parseInt(req.params.id);

        // Ensure the competitor belongs to this profile
        const competitor = await db.select().from(seoCompetitors)
          .where(and(eq(seoCompetitors.id, competitorId), eq(seoCompetitors.profileId, profile[0].id)))
          .limit(1);
        if (competitor.length === 0) return res.status(404).json({ success: false, message: "Competitor not found" });

        await db.delete(seoCompetitors).where(eq(seoCompetitors.id, competitorId));
        res.json({ success: true, message: "Competitor removed" });
      } catch (error: any) {
        console.error("[Optimize] Delete competitor error:", error);
        res.status(500).json({ success: false, message: "Failed to remove competitor" });
      }
    }
  );

  /** AI keyword gap analysis against competitors */
  app.post(
    "/api/seo/competitors/analyze",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];
        const { competitorId } = req.body;

        // Get competitor domains
        let competitorDomains: string[];
        if (competitorId) {
          const comp = await db.select().from(seoCompetitors)
            .where(and(eq(seoCompetitors.id, competitorId), eq(seoCompetitors.profileId, profileData.id)))
            .limit(1);
          if (comp.length === 0) return res.status(404).json({ success: false, message: "Competitor not found" });
          competitorDomains = [comp[0].domain];
        } else {
          const comps = await db.select().from(seoCompetitors)
            .where(eq(seoCompetitors.profileId, profileData.id));
          competitorDomains = comps.map(c => c.domain);
          if (competitorDomains.length === 0) {
            // Fall back to profile-level competitors array
            competitorDomains = (profileData.competitors as string[]) || [];
          }
        }

        if (competitorDomains.length === 0) {
          return res.status(400).json({ success: false, message: "No competitors to analyze. Add at least one competitor first." });
        }

        // Get current tracked keywords
        const trackedKeywords = await db.select().from(seoKeywords)
          .where(and(eq(seoKeywords.profileId, profileData.id), eq(seoKeywords.status, 'tracking')));
        const currentKeywordList = trackedKeywords.map(k => k.keyword);

        const gapAnalysis = await analyzeKeywordGap(
          profileData.domain,
          competitorDomains,
          profileData.industry || 'General',
          currentKeywordList
        );

        res.json({ success: true, analysis: gapAnalysis });
      } catch (error: any) {
        console.error("[Optimize] Competitor analysis error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze competitors" });
      }
    }
  );

  /** Competitor backlink analysis */
  app.post(
    "/api/seo/competitors/backlinks",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];
        const { competitorId, domain: rawDomain } = req.body;

        let targetDomain: string;
        if (competitorId) {
          const comp = await db.select().from(seoCompetitors)
            .where(and(eq(seoCompetitors.id, competitorId), eq(seoCompetitors.profileId, profileData.id)))
            .limit(1);
          if (comp.length === 0) return res.status(404).json({ success: false, message: "Competitor not found" });
          targetDomain = comp[0].domain;
        } else if (rawDomain && typeof rawDomain === 'string') {
          targetDomain = rawDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();
        } else {
          return res.status(400).json({ success: false, message: "Provide either competitorId or domain" });
        }

        const hasDataProvider = !!process.env.DATAFORSEO_LOGIN;

        if (hasDataProvider) {
          try {
            const credentials = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
            const apiRes = await fetch('https://api.dataforseo.com/v3/backlinks/backlinks/live', {
              method: 'POST',
              headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify([{
                target: targetDomain,
                limit: 100,
                order_by: ["rank,desc"],
              }]),
              signal: AbortSignal.timeout(30000),
            });

            const apiData = await apiRes.json() as any;
            const items = apiData?.tasks?.[0]?.result?.[0]?.items || [];

            const backlinks = items.map((item: any) => ({
              sourceUrl: item.url_from || item.source_url || '',
              anchorText: item.anchor || '',
              domainAuthority: item.rank || item.page_rank || null,
            }));

            // Get user's own backlinks for opportunity detection
            const userBacklinks = await db.select().from(seoBacklinks)
              .where(eq(seoBacklinks.profileId, profileData.id));
            const userSourceDomains = new Set(
              userBacklinks.map(b => { try { return new URL(b.sourceUrl!).hostname; } catch { return ''; } }).filter(Boolean)
            );

            const linkOpportunities = backlinks
              .filter((bl: any) => {
                try { return !userSourceDomains.has(new URL(bl.sourceUrl).hostname); } catch { return false; }
              })
              .slice(0, 20)
              .map((bl: any) => `${bl.sourceUrl} links to ${targetDomain} but not to you (anchor: "${bl.anchorText}")`);

            return res.json({ success: true, domain: targetDomain, backlinks, linkOpportunities });
          } catch (apiErr: any) {
            console.error("[Optimize] DataForSEO backlinks API error:", apiErr.message);
            // Fall through to AI estimation
          }
        }

        // AI estimation fallback
        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const userBacklinks = await db.select().from(seoBacklinks)
          .where(eq(seoBacklinks.profileId, profileData.id));
        const userSourceDomains = userBacklinks.map(b => {
          try { return new URL(b.sourceUrl!).hostname; } catch { return ''; }
        }).filter(Boolean);

        const prompt = `You are an SEO backlink analyst. Analyze the domain "${targetDomain}" in the ${profileData.industry || 'general'} industry.

Estimate the types of sites that likely link to this competitor based on their industry and domain.

The user's own site (${profileData.domain}) currently gets links from these domains: ${userSourceDomains.slice(0, 20).join(', ') || 'none yet'}.

Return ONLY a JSON object:
{
  "backlinks": [
    { "sourceUrl": "example.com/page", "anchorText": "relevant anchor", "domainAuthority": 45 }
  ],
  "linkOpportunities": [
    "Description of a site that links to the competitor but likely not to you"
  ]
}

Provide 10-15 estimated backlinks and 5-8 link opportunities.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO backlink expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.6,
          maxTokens: 2000,
          responseFormat: 'json',
        });

        const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        res.json({
          success: true,
          domain: targetDomain,
          backlinks: parsed.backlinks || [],
          linkOpportunities: parsed.linkOpportunities || [],
          estimated: true,
        });
      } catch (error: any) {
        console.error("[Optimize] Competitor backlinks error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze competitor backlinks" });
      }
    }
  );

  /** Content gap analysis — keywords competitors rank for that user doesn't */
  app.post(
    "/api/seo/competitors/content-gap",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];
        const { competitorIds } = req.body;

        // Get competitor domains
        let competitorDomains: string[];
        if (competitorIds && Array.isArray(competitorIds) && competitorIds.length > 0) {
          const comps = await db.select().from(seoCompetitors)
            .where(eq(seoCompetitors.profileId, profileData.id));
          competitorDomains = comps
            .filter(c => competitorIds.includes(c.id))
            .map(c => c.domain);
        } else {
          const comps = await db.select().from(seoCompetitors)
            .where(eq(seoCompetitors.profileId, profileData.id));
          competitorDomains = comps.map(c => c.domain);
          if (competitorDomains.length === 0) {
            competitorDomains = (profileData.competitors as string[]) || [];
          }
        }

        if (competitorDomains.length === 0) {
          return res.status(400).json({ success: false, message: "No competitors to analyze. Add at least one competitor first." });
        }

        // Get user's current keywords
        const userKeywords = await db.select().from(seoKeywords)
          .where(eq(seoKeywords.profileId, profileData.id));
        const userKeywordList = userKeywords.map(k => k.keyword);

        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO content gap analyst. Compare "${profileData.domain}" against these competitors: ${competitorDomains.join(', ')}.

Industry: ${profileData.industry || 'General'}
Location: ${profileData.location || 'Not specified'}

The user currently tracks these keywords: ${userKeywordList.slice(0, 30).join(', ') || 'none yet'}.

Identify keywords that competitors likely rank for but the user probably doesn't.

Return ONLY a JSON object:
{
  "gaps": [
    { "keyword": "keyword phrase", "competitorPosition": 5, "yourPosition": null, "volume": 1200, "difficulty": 45 }
  ],
  "recommendations": [
    "Create a service page targeting 'keyword phrase' — competitors rank in positions 3-8 for this"
  ]
}

Provide 15-20 content gaps and 5-8 actionable recommendations.
For "yourPosition", use null if the user likely doesn't rank, or an estimated position if they might rank poorly.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO content gap expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.6,
          maxTokens: 3000,
          responseFormat: 'json',
        });

        const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        res.json({
          success: true,
          domain: profileData.domain,
          competitors: competitorDomains,
          gaps: parsed.gaps || [],
          recommendations: parsed.recommendations || [],
        });
      } catch (error: any) {
        console.error("[Optimize] Content gap analysis error:", error);
        res.status(500).json({ success: false, message: "Failed to perform content gap analysis" });
      }
    }
  );

  /** Competitor traffic estimation */
  app.post(
    "/api/seo/competitors/traffic",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];
        const { competitorId, domain: rawDomain } = req.body;

        let targetDomain: string;
        if (competitorId) {
          const comp = await db.select().from(seoCompetitors)
            .where(and(eq(seoCompetitors.id, competitorId), eq(seoCompetitors.profileId, profileData.id)))
            .limit(1);
          if (comp.length === 0) return res.status(404).json({ success: false, message: "Competitor not found" });
          targetDomain = comp[0].domain;
        } else if (rawDomain && typeof rawDomain === 'string') {
          targetDomain = rawDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();
        } else {
          return res.status(400).json({ success: false, message: "Provide either competitorId or domain" });
        }

        const hasDataProvider = !!process.env.DATAFORSEO_LOGIN;

        if (hasDataProvider) {
          try {
            const credentials = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
            const apiRes = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/domain_metrics_by_categories/live', {
              method: 'POST',
              headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify([{ target: targetDomain }]),
              signal: AbortSignal.timeout(30000),
            });

            const apiData = await apiRes.json() as any;
            const metrics = apiData?.tasks?.[0]?.result?.[0];

            if (metrics) {
              const topKeywords = (metrics.top_keywords || []).slice(0, 20).map((kw: any) => ({
                keyword: kw.keyword || '',
                position: kw.position || 0,
                estimatedClicks: Math.round((kw.search_volume || 0) * getCtrForPosition(kw.position || 0)),
              }));

              return res.json({
                success: true,
                domain: targetDomain,
                estimatedMonthlyTraffic: metrics.organic_traffic || metrics.etv || 0,
                topKeywords,
              });
            }
          } catch (apiErr: any) {
            console.error("[Optimize] DataForSEO traffic API error:", apiErr.message);
            // Fall through to AI estimation
          }
        }

        // AI estimation fallback
        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO traffic analyst. Estimate the organic search traffic for "${targetDomain}" in the ${profileData.industry || 'general'} industry.

Based on the domain type, industry, and likely keyword rankings, estimate:
1. Monthly organic traffic
2. Top keywords they likely rank for with positions and estimated monthly clicks

Use standard CTR models: Position 1 ≈ 28%, Position 2 ≈ 15%, Position 3 ≈ 11%, positions 4-10 scale down from 8% to 2.5%.

Return ONLY a JSON object:
{
  "estimatedMonthlyTraffic": 5000,
  "topKeywords": [
    { "keyword": "keyword phrase", "position": 3, "estimatedClicks": 150 }
  ]
}

Provide 10-15 estimated top keywords.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO traffic estimation expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.6,
          maxTokens: 2000,
          responseFormat: 'json',
        });

        const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        res.json({
          success: true,
          domain: targetDomain,
          estimatedMonthlyTraffic: parsed.estimatedMonthlyTraffic || 0,
          topKeywords: parsed.topKeywords || [],
          estimated: true,
        });
      } catch (error: any) {
        console.error("[Optimize] Competitor traffic estimation error:", error);
        res.status(500).json({ success: false, message: "Failed to estimate competitor traffic" });
      }
    }
  );

  /** Competitor top pages analysis */
  app.post(
    "/api/seo/competitors/top-pages",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];
        const { competitorId, domain: rawDomain } = req.body;

        let targetDomain: string;
        if (competitorId) {
          const comp = await db.select().from(seoCompetitors)
            .where(and(eq(seoCompetitors.id, competitorId), eq(seoCompetitors.profileId, profileData.id)))
            .limit(1);
          if (comp.length === 0) return res.status(404).json({ success: false, message: "Competitor not found" });
          targetDomain = comp[0].domain;
        } else if (rawDomain && typeof rawDomain === 'string') {
          targetDomain = rawDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();
        } else {
          return res.status(400).json({ success: false, message: "Provide either competitorId or domain" });
        }

        const hasDataProvider = !!process.env.DATAFORSEO_LOGIN;

        if (hasDataProvider) {
          try {
            const credentials = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
            const apiRes = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/relevant_pages/live', {
              method: 'POST',
              headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify([{
                target: targetDomain,
                limit: 50,
                order_by: ["etv,desc"],
              }]),
              signal: AbortSignal.timeout(30000),
            });

            const apiData = await apiRes.json() as any;
            const items = apiData?.tasks?.[0]?.result?.[0]?.items || [];

            const pages = items.map((item: any) => ({
              url: item.page_address || item.url || '',
              estimatedTraffic: item.etv || 0,
              topKeyword: item.main_keyword || '',
            }));

            return res.json({ success: true, domain: targetDomain, pages });
          } catch (apiErr: any) {
            console.error("[Optimize] DataForSEO top pages API error:", apiErr.message);
            // Fall through to AI estimation
          }
        }

        // AI estimation fallback
        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const prompt = `You are an SEO analyst. Estimate the top-performing pages for "${targetDomain}" in the ${profileData.industry || 'general'} industry.

Based on the domain and industry, estimate which pages likely drive the most organic traffic.

Return ONLY a JSON object:
{
  "pages": [
    { "url": "https://${targetDomain}/page-path", "estimatedTraffic": 500, "topKeyword": "primary keyword" }
  ]
}

Provide 10-15 estimated top pages.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO page analysis expert. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.6,
          maxTokens: 2000,
          responseFormat: 'json',
        });

        const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        res.json({
          success: true,
          domain: targetDomain,
          pages: parsed.pages || [],
          estimated: true,
        });
      } catch (error: any) {
        console.error("[Optimize] Competitor top pages error:", error);
        res.status(500).json({ success: false, message: "Failed to analyze competitor top pages" });
      }
    }
  );

  /** Side-by-side domain comparison — user vs up to 3 competitors */
  app.post(
    "/api/seo/competitors/compare",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const profile = await db.select().from(seoProfiles).where(eq(seoProfiles.clientId, clientId)).limit(1);
        if (profile.length === 0) return res.status(404).json({ success: false, message: "No SEO profile found. Complete setup first." });

        const profileData = profile[0];

        // Get all tracked competitors (limit to 3 for comparison)
        const competitors = await db.select().from(seoCompetitors)
          .where(eq(seoCompetitors.profileId, profileData.id))
          .limit(3);

        if (competitors.length === 0) {
          return res.status(400).json({ success: false, message: "No competitors to compare. Add at least one competitor first." });
        }

        // Get user's own metrics
        const userKeywords = await db.select().from(seoKeywords)
          .where(eq(seoKeywords.profileId, profileData.id));
        const userBacklinks = await db.select().from(seoBacklinks)
          .where(eq(seoBacklinks.profileId, profileData.id));

        const userDaValues = userBacklinks.filter(b => b.domainAuthority != null).map(b => b.domainAuthority!);
        const userAvgDA = userDaValues.length > 0
          ? Math.round(userDaValues.reduce((a, b) => a + b, 0) / userDaValues.length)
          : null;

        const domains: {
          domain: string;
          domainAuthority: number | null;
          totalBacklinks: number;
          totalKeywords: number;
          estimatedTraffic: number | null;
          isUser: boolean;
        }[] = [];

        // User's domain
        domains.push({
          domain: profileData.domain,
          domainAuthority: profileData.domainAuthority || userAvgDA,
          totalBacklinks: userBacklinks.length,
          totalKeywords: userKeywords.length,
          estimatedTraffic: null,
          isUser: true,
        });

        // Use AI to estimate competitor metrics
        const settings = await aiSettingsService.getAllSettings();
        const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

        const competitorDomains = competitors.map(c => c.domain);

        const prompt = `You are an SEO analyst. Provide estimated metrics for these competitor domains compared to "${profileData.domain}" in the ${profileData.industry || 'general'} industry.

User's domain: ${profileData.domain}
- Known backlinks: ${userBacklinks.length}
- Tracked keywords: ${userKeywords.length}
- Domain Authority: ${profileData.domainAuthority || 'unknown'}

Competitor domains to estimate: ${competitorDomains.join(', ')}

Return ONLY a JSON object:
{
  "competitors": [
    {
      "domain": "competitor.com",
      "domainAuthority": 35,
      "totalBacklinks": 450,
      "totalKeywords": 120,
      "estimatedTraffic": 3000
    }
  ],
  "userEstimatedTraffic": 1500
}

Base estimates on industry norms and relative domain strength.`;

        const result = await unifiedAI.getCompletion(provider, {
          messages: [
            { role: 'system', content: 'You are an SEO comparison analyst. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.5,
          maxTokens: 1500,
          responseFormat: 'json',
        });

        const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        // Update user's estimated traffic
        if (parsed.userEstimatedTraffic) {
          domains[0].estimatedTraffic = parsed.userEstimatedTraffic;
        }

        // Add competitor metrics
        for (const comp of parsed.competitors || []) {
          domains.push({
            domain: comp.domain,
            domainAuthority: comp.domainAuthority || null,
            totalBacklinks: comp.totalBacklinks || 0,
            totalKeywords: comp.totalKeywords || 0,
            estimatedTraffic: comp.estimatedTraffic || null,
            isUser: false,
          });
        }

        res.json({ success: true, domains });
      } catch (error: any) {
        console.error("[Optimize] Competitor comparison error:", error);
        res.status(500).json({ success: false, message: "Failed to compare domains" });
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

        // Enhance with keyword ranking changes (compare to 30 days ago)
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const recentRankings = await db.select().from(seoKeywordRankings)
          .where(and(
            sql`${seoKeywordRankings.keywordId} IN (SELECT id FROM seo_keywords WHERE profile_id = ${profileId})`,
            gte(seoKeywordRankings.date, thirtyDaysAgo)
          ))
          .orderBy(asc(seoKeywordRankings.date));

        // Group rankings by keyword to find changes
        const rankingChanges: Record<number, { oldest: number | null; newest: number | null }> = {};
        for (const r of recentRankings) {
          if (!rankingChanges[r.keywordId]) {
            rankingChanges[r.keywordId] = { oldest: r.position, newest: r.position };
          } else {
            rankingChanges[r.keywordId].newest = r.position;
          }
        }

        const keywordMovement = {
          improved: 0,
          declined: 0,
          unchanged: 0,
          changes: [] as { keywordId: number; from: number | null; to: number | null; change: number }[],
        };
        for (const [kwId, change] of Object.entries(rankingChanges)) {
          const diff = (change.oldest || 100) - (change.newest || 100); // Lower rank = better, so positive diff = improvement
          if (diff > 0) keywordMovement.improved++;
          else if (diff < 0) keywordMovement.declined++;
          else keywordMovement.unchanged++;
          keywordMovement.changes.push({
            keywordId: parseInt(kwId),
            from: change.oldest,
            to: change.newest,
            change: diff,
          });
        }

        // Enhance backlink stats with new/lost in period
        const allBacklinks = await db.select().from(seoBacklinks)
          .where(eq(seoBacklinks.profileId, profileId));
        const newBacklinks = allBacklinks.filter(b => b.firstSeen && new Date(b.firstSeen) >= thirtyDaysAgo).length;
        const lostBacklinks = allBacklinks.filter(b => b.isLost && b.lastSeen && new Date(b.lastSeen) >= thirtyDaysAgo).length;

        // Check for previous month's report to compare
        const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevPeriod = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
        const prevReports = await db.select().from(seoReports)
          .where(and(eq(seoReports.profileId, profileId), eq(seoReports.period, prevPeriod)))
          .orderBy(desc(seoReports.generatedAt))
          .limit(1);

        const prevData = prevReports.length > 0 ? (prevReports[0].data as any) : null;
        const comparison = prevData ? {
          previousPeriod: prevPeriod,
          scoreChange: (reportData.overallScore ?? 0) - (prevData.overallScore ?? 0),
          keywordCountChange: (reportData.keywords.tracked) - (prevData.keywords?.tracked ?? 0),
          issueCountChange: (reportData.issues.total) - (prevData.issues?.total ?? 0),
          backlinkCountChange: (reportData.backlinks.total) - (prevData.backlinks?.total ?? 0),
        } : null;

        const enhancedData = {
          ...reportData,
          keywordMovement,
          backlinkActivity: {
            newInPeriod: newBacklinks,
            lostInPeriod: lostBacklinks,
          },
          ...(comparison ? { comparison } : {}),
        };

        const [report] = await db.insert(seoReports).values({
          profileId,
          type: 'monthly',
          period: currentPeriod,
          data: enhancedData as any,
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

/** CTR model by SERP position — used for traffic estimation */
function getCtrForPosition(position: number): number {
  const ctrMap: Record<number, number> = {
    1: 0.28, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.065,
    6: 0.05, 7: 0.04, 8: 0.035, 9: 0.03, 10: 0.025,
  };
  if (position <= 0) return 0;
  if (position <= 10) return ctrMap[position] || 0.025;
  if (position <= 20) return 0.01;
  return 0.005;
}

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

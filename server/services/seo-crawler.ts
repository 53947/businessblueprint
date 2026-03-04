/**
 * SEO Crawler Service — Page analysis, technical audits, and scoring.
 * Used by / optimize for site crawling and SEO health checks.
 */

interface PageAnalysis {
  url: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  h2s: string[];
  wordCount: number;
  images: { total: number; withoutAlt: number };
  links: { internal: number; external: number; broken: number };
  hasSchemaMarkup: boolean;
  hasMobileViewport: boolean;
  hasCanonical: boolean;
  loadTimeMs?: number;
}

interface TechnicalIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  url?: string;
  description: string;
  howToFix: string;
}

interface TechnicalAuditResult {
  domain: string;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  hasSSL: boolean;
  hasMobileViewport: boolean;
  issues: TechnicalIssue[];
  performanceScore?: number;
  seoScore?: number;
  accessibilityScore?: number;
}

/**
 * Analyzes a single page URL for SEO metrics.
 */
export async function analyzePage(url: string): Promise<PageAnalysis> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'BusinessBlueprint-SEO-Bot/1.0' },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    return parseHtml(url, html);
  } catch (error: any) {
    console.error(`[SEO Crawler] Failed to analyze ${url}:`, error.message);
    return {
      url,
      title: null,
      metaDescription: null,
      h1: null,
      h2s: [],
      wordCount: 0,
      images: { total: 0, withoutAlt: 0 },
      links: { internal: 0, external: 0, broken: 0 },
      hasSchemaMarkup: false,
      hasMobileViewport: false,
      hasCanonical: false,
    };
  }
}

function parseHtml(url: string, html: string): PageAnalysis {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*\/?>/is)
    || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["'][^>]*\/?>/is);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : null;

  const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gis) || [];
  const h2s = h2Matches.map(m => m.replace(/<[^>]*>/g, '').trim()).slice(0, 20);

  // Word count from body text
  const bodyMatch = html.match(/<body[^>]*>(.*)<\/body>/is);
  const bodyText = bodyMatch ? bodyMatch[1].replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<style[^>]*>.*?<\/style>/gis, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() : '';
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

  // Images
  const imgMatches = html.match(/<img[^>]*>/gis) || [];
  const imagesWithoutAlt = imgMatches.filter(img => !img.match(/alt=["'][^"']+["']/i)).length;

  // Links
  const linkMatches = html.match(/<a[^>]*href=["']([^"']*?)["'][^>]*>/gis) || [];
  const parsedUrl = new URL(url);
  let internal = 0, external = 0;
  for (const link of linkMatches) {
    const hrefMatch = link.match(/href=["']([^"']*?)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) continue;
      try {
        const linkUrl = new URL(href, url);
        if (linkUrl.hostname === parsedUrl.hostname) internal++;
        else external++;
      } catch { internal++; }
    }
  }

  const hasSchemaMarkup = html.includes('application/ld+json') || html.includes('itemtype=');
  const hasMobileViewport = /meta[^>]*name=["']viewport["']/i.test(html);
  const hasCanonical = /link[^>]*rel=["']canonical["']/i.test(html);

  return {
    url,
    title,
    metaDescription,
    h1,
    h2s,
    wordCount,
    images: { total: imgMatches.length, withoutAlt: imagesWithoutAlt },
    links: { internal, external, broken: 0 },
    hasSchemaMarkup,
    hasMobileViewport,
    hasCanonical,
  };
}

/**
 * Runs a technical SEO audit on a domain.
 */
export async function runTechnicalAudit(domain: string): Promise<TechnicalAuditResult> {
  const issues: TechnicalIssue[] = [];
  const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;

  // Check robots.txt
  let hasRobotsTxt = false;
  try {
    const res = await fetch(`${baseUrl}/robots.txt`, { signal: AbortSignal.timeout(10000) });
    hasRobotsTxt = res.ok && (await res.text()).length > 0;
  } catch {}
  if (!hasRobotsTxt) {
    issues.push({
      type: 'missing-robots',
      severity: 'medium',
      description: 'Missing or empty robots.txt file',
      howToFix: 'Create a robots.txt file in your website root that tells search engines which pages to crawl.',
    });
  }

  // Check sitemap.xml
  let hasSitemap = false;
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`, { signal: AbortSignal.timeout(10000) });
    hasSitemap = res.ok && (await res.text()).includes('<urlset');
  } catch {}
  if (!hasSitemap) {
    issues.push({
      type: 'missing-sitemap',
      severity: 'high',
      description: 'Missing or invalid sitemap.xml',
      howToFix: 'Generate an XML sitemap listing all important pages and submit it to Google Search Console.',
    });
  }

  // Check SSL
  let hasSSL = false;
  try {
    const res = await fetch(baseUrl.replace('http://', 'https://'), { signal: AbortSignal.timeout(10000) });
    hasSSL = res.ok;
  } catch {}
  if (!hasSSL) {
    issues.push({
      type: 'no-ssl',
      severity: 'critical',
      description: 'Website is not accessible via HTTPS',
      howToFix: 'Install an SSL certificate on your web server. Many hosting providers offer free SSL via Let\'s Encrypt.',
    });
  }

  // Analyze homepage
  let hasMobileViewport = false;
  try {
    const pageData = await analyzePage(baseUrl);
    hasMobileViewport = pageData.hasMobileViewport;

    if (!pageData.title) {
      issues.push({
        type: 'missing-title',
        severity: 'critical',
        url: baseUrl,
        description: 'Homepage is missing a title tag',
        howToFix: 'Add a descriptive <title> tag in the <head> section of your homepage.',
      });
    } else if (pageData.title.length > 60) {
      issues.push({
        type: 'long-title',
        severity: 'low',
        url: baseUrl,
        description: `Title tag is too long (${pageData.title.length} chars, recommended: 50-60)`,
        howToFix: 'Shorten your title tag to under 60 characters for optimal search display.',
      });
    }

    if (!pageData.metaDescription) {
      issues.push({
        type: 'missing-meta-description',
        severity: 'high',
        url: baseUrl,
        description: 'Homepage is missing a meta description',
        howToFix: 'Add a compelling <meta name="description"> tag (150-160 chars) to your homepage.',
      });
    }

    if (!pageData.h1) {
      issues.push({
        type: 'missing-h1',
        severity: 'high',
        url: baseUrl,
        description: 'Homepage is missing an H1 heading',
        howToFix: 'Add a single, descriptive H1 heading to your homepage that includes your primary keyword.',
      });
    }

    if (!pageData.hasMobileViewport) {
      issues.push({
        type: 'no-mobile-viewport',
        severity: 'critical',
        url: baseUrl,
        description: 'Missing mobile viewport meta tag',
        howToFix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head>.',
      });
    }

    if (!pageData.hasSchemaMarkup) {
      issues.push({
        type: 'no-schema-markup',
        severity: 'medium',
        url: baseUrl,
        description: 'No structured data (Schema.org) found',
        howToFix: 'Add JSON-LD structured data to help search engines understand your content.',
      });
    }

    if (pageData.images.withoutAlt > 0) {
      issues.push({
        type: 'missing-alt-text',
        severity: 'medium',
        url: baseUrl,
        description: `${pageData.images.withoutAlt} of ${pageData.images.total} images missing alt text`,
        howToFix: 'Add descriptive alt attributes to all images for accessibility and SEO.',
      });
    }
  } catch {}

  // Try Google PageSpeed Insights API
  let performanceScore: number | undefined;
  let seoScore: number | undefined;
  let accessibilityScore: number | undefined;

  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (apiKey) {
    try {
      const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(baseUrl)}&key=${apiKey}&category=performance&category=seo&category=accessibility&strategy=mobile`;
      const res = await fetch(psiUrl, { signal: AbortSignal.timeout(30000) });
      if (res.ok) {
        const data = await res.json() as any;
        performanceScore = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);
        seoScore = Math.round((data.lighthouseResult?.categories?.seo?.score || 0) * 100);
        accessibilityScore = Math.round((data.lighthouseResult?.categories?.accessibility?.score || 0) * 100);

        if (performanceScore < 50) {
          issues.push({
            type: 'slow-performance',
            severity: 'high',
            url: baseUrl,
            description: `Poor mobile performance score: ${performanceScore}/100`,
            howToFix: 'Optimize images, minimize JavaScript/CSS, enable caching, and consider a CDN.',
          });
        }
      }
    } catch (err: any) {
      console.log('[SEO Crawler] PageSpeed API unavailable:', err.message);
    }
  }

  return {
    domain,
    hasRobotsTxt,
    hasSitemap,
    hasSSL,
    hasMobileViewport,
    issues,
    performanceScore,
    seoScore,
    accessibilityScore,
  };
}

/**
 * Calculate a weighted overall SEO score from various metrics.
 */
export function calculateSeoScore(metrics: {
  technicalIssues: { critical: number; high: number; medium: number; low: number };
  pageScores: number[];
  keywordsTracked: number;
  performanceScore?: number;
  seoScore?: number;
}): number {
  let score = 100;

  // Technical issues penalty (40% weight)
  score -= metrics.technicalIssues.critical * 15;
  score -= metrics.technicalIssues.high * 8;
  score -= metrics.technicalIssues.medium * 3;
  score -= metrics.technicalIssues.low * 1;

  // Page quality (30% weight)
  if (metrics.pageScores.length > 0) {
    const avgPageScore = metrics.pageScores.reduce((a, b) => a + b, 0) / metrics.pageScores.length;
    score = score * 0.7 + avgPageScore * 0.3;
  }

  // Bonus for tracking keywords
  if (metrics.keywordsTracked > 0) {
    score = Math.min(score + 5, 100);
  }

  // Factor in PageSpeed scores if available
  if (metrics.performanceScore !== undefined) {
    score = score * 0.8 + metrics.performanceScore * 0.2;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

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
  images: { total: number; withoutAlt: number; largeImages: { src: string; estimatedKb?: number }[] };
  links: { internal: number; external: number; broken: number; brokenUrls: string[] };
  headings: { level: number; text: string }[];
  hasSchemaMarkup: boolean;
  hasMobileViewport: boolean;
  hasCanonical: boolean;
  loadTimeMs?: number;
}

interface TechnicalIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  priorityLayer: 'critical' | 'important' | 'relevant' | 'optional';
  url?: string;
  description: string;
  howToFix: string;
}

interface CoreWebVitalMetric {
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
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
  coreWebVitals?: {
    lcp: CoreWebVitalMetric;
    fid: CoreWebVitalMetric;
    cls: CoreWebVitalMetric;
    inp?: CoreWebVitalMetric;
  };
}

interface AuditContext {
  businessName?: string;
  industry?: string;
  location?: string;
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
    return await parseHtml(url, html);
  } catch (error: any) {
    console.error(`[SEO Crawler] Failed to analyze ${url}:`, error.message);
    return {
      url,
      title: null,
      metaDescription: null,
      h1: null,
      h2s: [],
      wordCount: 0,
      images: { total: 0, withoutAlt: 0, largeImages: [] },
      links: { internal: 0, external: 0, broken: 0, brokenUrls: [] },
      headings: [],
      hasSchemaMarkup: false,
      hasMobileViewport: false,
      hasCanonical: false,
    };
  }
}

async function parseHtml(url: string, html: string): Promise<PageAnalysis> {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i)
    || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*\/?>/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : null;

  const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  const h2s = h2Matches.map(m => m.replace(/<[^>]*>/g, '').trim()).slice(0, 20);

  // Extract full headings hierarchy (h1 through h6)
  const headings: { level: number; text: string }[] = [];
  const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let headingMatch;
  while ((headingMatch = headingRegex.exec(html)) !== null) {
    const level = parseInt(headingMatch[1].charAt(1));
    const text = headingMatch[2].replace(/<[^>]*>/g, '').trim();
    if (text) headings.push({ level, text });
  }

  // Word count from body text
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyText = bodyMatch ? bodyMatch[1].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() : '';
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

  // Images — detect missing alt and estimate large images from src attributes
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const imagesWithoutAlt = imgMatches.filter(img => !img.match(/alt=["'][^"']+["']/i)).length;
  const largeImages: { src: string; estimatedKb?: number }[] = [];
  for (const imgTag of imgMatches) {
    const srcMatch = imgTag.match(/src=["']([^"']+?)["']/i);
    if (!srcMatch) continue;
    const src = srcMatch[1];
    // Flag images that are likely large based on file extension patterns (not base64/svg)
    if (src.startsWith('data:')) continue;
    try {
      const imgUrl = new URL(src, url).href;
      const headRes = await fetch(imgUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'BusinessBlueprint-SEO-Bot/1.0' },
      });
      const contentLength = headRes.headers.get('content-length');
      if (contentLength) {
        const kb = Math.round(parseInt(contentLength) / 1024);
        if (kb > 200) {
          largeImages.push({ src: imgUrl, estimatedKb: kb });
        }
      }
    } catch {
      // Skip unreachable images
    }
    // Limit to checking first 20 images to avoid slowdown
    if (largeImages.length >= 10) break;
  }

  // Links — collect all hrefs and check for broken links
  const linkMatches = html.match(/<a[^>]*href=["']([^"']*?)["'][^>]*>/gi) || [];
  const parsedUrl = new URL(url);
  let internal = 0, external = 0, broken = 0;
  const brokenUrls: string[] = [];
  const linkUrlsToCheck: string[] = [];

  for (const link of linkMatches) {
    const hrefMatch = link.match(/href=["']([^"']*?)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      try {
        const linkUrl = new URL(href, url);
        if (linkUrl.hostname === parsedUrl.hostname) {
          internal++;
        } else {
          external++;
        }
        // Collect unique URLs for broken link checking (limit to 30)
        if (linkUrlsToCheck.length < 30 && !linkUrlsToCheck.includes(linkUrl.href)) {
          linkUrlsToCheck.push(linkUrl.href);
        }
      } catch { internal++; }
    }
  }

  // Check for broken links in parallel with concurrency limit
  const checkBrokenLink = async (checkUrl: string): Promise<boolean> => {
    try {
      const res = await fetch(checkUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'BusinessBlueprint-SEO-Bot/1.0' },
        redirect: 'follow',
      });
      return res.status >= 400;
    } catch {
      return true; // Unreachable = broken
    }
  };

  // Check in batches of 10
  for (let i = 0; i < linkUrlsToCheck.length; i += 10) {
    const batch = linkUrlsToCheck.slice(i, i + 10);
    const results = await Promise.all(batch.map(async (linkUrl) => ({
      url: linkUrl,
      isBroken: await checkBrokenLink(linkUrl),
    })));
    for (const result of results) {
      if (result.isBroken) {
        broken++;
        brokenUrls.push(result.url);
      }
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
    images: { total: imgMatches.length, withoutAlt: imagesWithoutAlt, largeImages },
    links: { internal, external, broken, brokenUrls },
    headings,
    hasSchemaMarkup,
    hasMobileViewport,
    hasCanonical,
  };
}

/**
 * Maps issue types to priority layers for triage.
 */
function getPriorityLayer(type: string): 'critical' | 'important' | 'relevant' | 'optional' {
  const layerMap: Record<string, 'critical' | 'important' | 'relevant' | 'optional'> = {
    'no-ssl': 'critical',
    'missing-title': 'critical',
    'missing-meta-description': 'critical',
    'missing-h1': 'critical',
    'no-mobile-viewport': 'critical',
    'slow-performance': 'critical',
    'missing-sitemap': 'important',
    'missing-robots': 'important',
    'missing-alt-text': 'important',
    'no-schema-markup': 'important',
    'long-title': 'relevant',
    'content-length': 'relevant',
  };
  return layerMap[type] || 'optional';
}

/**
 * Generates personalized howToFix text when business context is available.
 */
function personalizedFix(
  type: string,
  genericFix: string,
  ctx?: AuditContext,
  pageData?: PageAnalysis,
): string {
  if (!ctx?.businessName) return genericFix;

  const name = ctx.businessName;
  const industry = ctx.industry || 'services';
  const location = ctx.location || '';
  const locationSuffix = location ? ` in ${location}` : '';

  switch (type) {
    case 'missing-title':
      return `Add this title to your homepage: '${name} — ${industry.charAt(0).toUpperCase() + industry.slice(1)}${locationSuffix}'. Keep it under 60 characters.`;

    case 'long-title': {
      const shortened = `${name} — ${industry.charAt(0).toUpperCase() + industry.slice(1)}${locationSuffix}`;
      return `Shorten your title to under 60 characters. Suggested: '${shortened.substring(0, 58)}'. Currently ${pageData?.title?.length || 'over 60'} characters.`;
    }

    case 'missing-meta-description': {
      const desc = `${name} provides ${industry} services${locationSuffix}. Contact us today for a free consultation.`;
      return `Add this meta description: '${desc.substring(0, 155)}' — keep it between 150-160 characters.`;
    }

    case 'missing-h1':
      return `Add this H1 to your homepage: '${name} — ${industry.charAt(0).toUpperCase() + industry.slice(1)}${locationSuffix}'. Use only one H1 per page.`;

    case 'no-ssl':
      return `Your site ${name.toLowerCase().replace(/\s/g, '')}.com is not secure. Install a free SSL certificate via Let's Encrypt through your hosting provider. Google penalizes non-HTTPS sites in search rankings.`;

    case 'no-mobile-viewport':
      return `Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head> tag. Without this, mobile visitors to ${name} see a tiny desktop version of your site.`;

    case 'no-schema-markup': {
      const schema = `Add LocalBusiness schema markup to your homepage. Include: name "${name}", type "${industry}", ${location ? `address "${location}",` : ''} and your phone number. Use JSON-LD format in your <head> tag.`;
      return schema;
    }

    case 'missing-alt-text': {
      const count = pageData?.images?.withoutAlt || 0;
      return `${count} images on your site are missing alt text. Add descriptions like "alt=\\"${name} ${industry} team\\"" or "alt=\\"${name} storefront${locationSuffix}\\"". This helps Google image search find your business.`;
    }

    case 'missing-robots':
      return `Create a robots.txt file at the root of your site with:\nUser-agent: *\nAllow: /\nSitemap: https://${name.toLowerCase().replace(/\s/g, '')}.com/sitemap.xml\n\nThis tells Google which pages to crawl on your ${name} website.`;

    case 'missing-sitemap':
      return `Generate an XML sitemap listing every page on your ${name} website. Submit it at Google Search Console > Sitemaps. Most CMS platforms (WordPress, Wix, Squarespace) can generate this automatically.`;

    case 'slow-performance':
      return `Your ${name} site scores poorly on mobile speed. Compress images to WebP format, enable browser caching, minimize JavaScript, and consider a CDN. Slow pages lose 53% of mobile visitors.`;

    default:
      return genericFix;
  }
}

/**
 * Runs a technical SEO audit on a domain.
 */
export async function runTechnicalAudit(domain: string, context?: AuditContext): Promise<TechnicalAuditResult> {
  const issues: TechnicalIssue[] = [];
  const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;

  // Check robots.txt
  let hasRobotsTxt = false;
  try {
    const res = await fetch(`${baseUrl}/robots.txt`, { signal: AbortSignal.timeout(10000) });
    hasRobotsTxt = res.ok && (await res.text()).length > 0;
  } catch {}
  if (!hasRobotsTxt) {
    const type = 'missing-robots';
    issues.push({
      type,
      severity: 'medium',
      priorityLayer: getPriorityLayer(type),
      description: 'Missing or empty robots.txt file',
      howToFix: personalizedFix(type, 'Create a robots.txt file in your website root that tells search engines which pages to crawl.', context),
    });
  }

  // Check sitemap.xml
  let hasSitemap = false;
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`, { signal: AbortSignal.timeout(10000) });
    hasSitemap = res.ok && (await res.text()).includes('<urlset');
  } catch {}
  if (!hasSitemap) {
    const type = 'missing-sitemap';
    issues.push({
      type,
      severity: 'high',
      priorityLayer: getPriorityLayer(type),
      description: 'Missing or invalid sitemap.xml',
      howToFix: personalizedFix(type, 'Generate an XML sitemap listing all important pages and submit it to Google Search Console.', context),
    });
  }

  // Check SSL
  let hasSSL = false;
  try {
    const res = await fetch(baseUrl.replace('http://', 'https://'), { signal: AbortSignal.timeout(10000) });
    hasSSL = res.ok;
  } catch {}
  if (!hasSSL) {
    const type = 'no-ssl';
    issues.push({
      type,
      severity: 'critical',
      priorityLayer: getPriorityLayer(type),
      description: 'Website is not accessible via HTTPS',
      howToFix: personalizedFix(type, 'Install an SSL certificate on your web server. Many hosting providers offer free SSL via Let\'s Encrypt.', context),
    });
  }

  // Analyze homepage
  let hasMobileViewport = false;
  let pageData: PageAnalysis | undefined;
  try {
    pageData = await analyzePage(baseUrl);
    hasMobileViewport = pageData.hasMobileViewport;

    if (!pageData.title) {
      const type = 'missing-title';
      issues.push({
        type,
        severity: 'critical',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: 'Homepage is missing a title tag',
        howToFix: personalizedFix(type, 'Add a descriptive <title> tag in the <head> section of your homepage.', context, pageData),
      });
    } else if (pageData.title.length > 60) {
      const type = 'long-title';
      issues.push({
        type,
        severity: 'low',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: `Title tag is too long (${pageData.title.length} chars, recommended: 50-60)`,
        howToFix: personalizedFix(type, 'Shorten your title tag to under 60 characters for optimal search display.', context, pageData),
      });
    }

    if (!pageData.metaDescription) {
      const type = 'missing-meta-description';
      issues.push({
        type,
        severity: 'high',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: 'Homepage is missing a meta description',
        howToFix: personalizedFix(type, 'Add a compelling <meta name="description"> tag (150-160 chars) to your homepage.', context, pageData),
      });
    }

    if (!pageData.h1) {
      const type = 'missing-h1';
      issues.push({
        type,
        severity: 'high',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: 'Homepage is missing an H1 heading',
        howToFix: personalizedFix(type, 'Add a single, descriptive H1 heading to your homepage that includes your primary keyword.', context, pageData),
      });
    }

    if (!pageData.hasMobileViewport) {
      const type = 'no-mobile-viewport';
      issues.push({
        type,
        severity: 'critical',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: 'Missing mobile viewport meta tag',
        howToFix: personalizedFix(type, 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head>.', context, pageData),
      });
    }

    if (!pageData.hasSchemaMarkup) {
      const type = 'no-schema-markup';
      issues.push({
        type,
        severity: 'medium',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: 'No structured data (Schema.org) found',
        howToFix: personalizedFix(type, 'Add JSON-LD structured data to help search engines understand your content.', context, pageData),
      });
    }

    if (pageData.images.withoutAlt > 0) {
      const type = 'missing-alt-text';
      issues.push({
        type,
        severity: 'medium',
        priorityLayer: getPriorityLayer(type),
        url: baseUrl,
        description: `${pageData.images.withoutAlt} of ${pageData.images.total} images missing alt text`,
        howToFix: personalizedFix(type, 'Add descriptive alt attributes to all images for accessibility and SEO.', context, pageData),
      });
    }
  } catch {}

  // Google PageSpeed Insights — works without API key for low volume
  let performanceScore: number | undefined;
  let seoScore: number | undefined;
  let accessibilityScore: number | undefined;
  let coreWebVitals: TechnicalAuditResult['coreWebVitals'];

  try {
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    const keyParam = apiKey ? `&key=${apiKey}` : '';
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(baseUrl)}${keyParam}&category=performance&category=seo&category=accessibility&strategy=mobile`;
    const res = await fetch(psiUrl, { signal: AbortSignal.timeout(60000) });
    if (res.ok) {
      const data = await res.json() as any;
      const lighthouse = data.lighthouseResult;
      performanceScore = Math.round((lighthouse?.categories?.performance?.score || 0) * 100);
      seoScore = Math.round((lighthouse?.categories?.seo?.score || 0) * 100);
      accessibilityScore = Math.round((lighthouse?.categories?.accessibility?.score || 0) * 100);

      // Extract Core Web Vitals from Lighthouse audits
      const audits = lighthouse?.audits;
      if (audits) {
        const lcpMs = audits['largest-contentful-paint']?.numericValue;
        const fidMs = audits['max-potential-fid']?.numericValue;
        const clsVal = audits['cumulative-layout-shift']?.numericValue;
        const inpMs = audits['interaction-to-next-paint']?.numericValue;

        const rateLcp = (ms: number): CoreWebVitalMetric['rating'] =>
          ms <= 2500 ? 'good' : ms <= 4000 ? 'needs-improvement' : 'poor';
        const rateFid = (ms: number): CoreWebVitalMetric['rating'] =>
          ms <= 100 ? 'good' : ms <= 300 ? 'needs-improvement' : 'poor';
        const rateCls = (val: number): CoreWebVitalMetric['rating'] =>
          val <= 0.1 ? 'good' : val <= 0.25 ? 'needs-improvement' : 'poor';
        const rateInp = (ms: number): CoreWebVitalMetric['rating'] =>
          ms <= 200 ? 'good' : ms <= 500 ? 'needs-improvement' : 'poor';

        if (lcpMs !== undefined && fidMs !== undefined && clsVal !== undefined) {
          coreWebVitals = {
            lcp: { value: Math.round(lcpMs), rating: rateLcp(lcpMs) },
            fid: { value: Math.round(fidMs), rating: rateFid(fidMs) },
            cls: { value: parseFloat(clsVal.toFixed(3)), rating: rateCls(clsVal) },
          };
          if (inpMs !== undefined) {
            coreWebVitals.inp = { value: Math.round(inpMs), rating: rateInp(inpMs) };
          }
        }
      }

      if (performanceScore < 50) {
        const type = 'slow-performance';
        issues.push({
          type,
          severity: 'high',
          priorityLayer: getPriorityLayer(type),
          url: baseUrl,
          description: `Poor mobile performance score: ${performanceScore}/100`,
          howToFix: personalizedFix(type, 'Optimize images, minimize JavaScript/CSS, enable caching, and consider a CDN.', context, pageData),
        });
      }
    }
  } catch (err: any) {
    console.log('[SEO Crawler] PageSpeed API unavailable:', err.message);
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
    coreWebVitals,
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

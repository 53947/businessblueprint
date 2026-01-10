/**
 * Independent Online Presence Scanner
 * 
 * Analyzes business online presence across:
 * - Website (SEO, speed, mobile, SSL, content)
 * - Social media platforms
 * - Business directories
 * - Review platforms
 * 
 * No third-party dependencies - all scanning done in-house
 */

import { promises as dns } from 'dns';
import { isIP } from 'net';
import * as http from 'http';
import * as https from 'https';
import * as ipaddr from 'ipaddr.js';
import { googlePlacesService } from './googlePlaces';
import { yelpApiService } from './yelpApi';
import { scansBlueService } from './scansblue';

interface ScansBluesFastCheck {
  overallScore: number;
  sslPresent: boolean;
  sslValid: boolean;
  loadTime: number;
  performanceScore: number;
  mobileOptimized: boolean;
  mobileScore: number;
  criticalIssues: Array<{
    type: string;
    severity: string;
    issue: string;
    impact: string;
    recommendation: string;
  }>;
}

interface ScanResult {
  overall: {
    digitalIQScore: number;
    completeness: number;
    lastScanned: Date;
  };
  website: WebsiteScan;
  socialMedia: SocialMediaScan;
  directories: DirectoryScan;
  reviews: ReviewScan;
  recommendations: string[];
  scansBlue?: ScansBluesFastCheck;
}

interface WebsiteScan {
  exists: boolean;
  hasSSL: boolean;
  isMobileFriendly: boolean;
  loadTime: number;
  seo: {
    hasTitle: boolean;
    hasMetaDescription: boolean;
    hasH1: boolean;
    titleLength: number;
    descriptionLength: number;
    score: number;
  };
  content: {
    hasContactInfo: boolean;
    hasAddress: boolean;
    hasPhone: boolean;
    hasEmail: boolean;
    hasBusinessHours: boolean;
  };
  score: number;
}

interface SocialMediaScan {
  platforms: {
    facebook: PlatformPresence;
    instagram: PlatformPresence;
    twitter: PlatformPresence;
    linkedin: PlatformPresence;
    youtube: PlatformPresence;
  };
  totalPresence: number;
  activeProfiles: number;
  score: number;
}

interface PlatformPresence {
  exists: boolean;
  url?: string;
  followers?: number;
  lastPost?: Date;
  isActive: boolean;
}

interface DirectoryScan {
  platforms: {
    google: DirectoryListing;
    yelp: DirectoryListing;
    facebook: DirectoryListing;
    yellowPages: DirectoryListing;
    bbb: DirectoryListing;
  };
  totalListings: number;
  claimedListings: number;
  consistency: number; // NAP consistency score
  score: number;
}

interface DirectoryListing {
  exists: boolean;
  claimed: boolean;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  isConsistent: boolean;
  url?: string;
}

interface ReviewScan {
  platforms: {
    google: ReviewPlatform;
    yelp: ReviewPlatform;
    facebook: ReviewPlatform;
  };
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  score: number;
}

interface ReviewPlatform {
  exists: boolean;
  reviewCount: number;
  averageRating: number;
  recentReviews: number;
  responseRate: number;
}

interface UrlValidationResult {
  isValid: boolean;
  resolvedIPs: string[]; // Validated, non-private IPs for this hostname
  hostname: string;
}

export class PresenceScannerService {
  /**
   * Run complete presence scan for a business
   */
  async scanBusiness(params: {
    businessName: string;
    website?: string;
    phone?: string;
    address?: string;
  }): Promise<ScanResult> {
    console.log(`🔍 Starting presence scan for: ${params.businessName}`);

    const [website, socialMedia, directories, reviews, scansBlueData] = await Promise.all([
      this.scanWebsite(params.website),
      this.scanSocialMedia(params.businessName),
      this.scanDirectories(params),
      this.scanReviews({
        businessName: params.businessName,
        address: params.address,
        phone: params.phone,
      }),
      this.runScansBluesFastCheck(params.website),
    ]);

    const digitalIQScore = this.calculateDigitalIQ({
      website,
      socialMedia,
      directories,
      reviews,
      scansBlue: scansBlueData,
    });

    const recommendations = this.generateRecommendations({
      website,
      socialMedia,
      directories,
      reviews,
    });

    return {
      overall: {
        digitalIQScore,
        completeness: this.calculateCompleteness({ website, socialMedia, directories, reviews }),
        lastScanned: new Date(),
      },
      website,
      socialMedia,
      directories,
      reviews,
      recommendations,
      scansBlue: scansBlueData || undefined,
    };
  }

  private async runScansBluesFastCheck(websiteUrl?: string): Promise<ScansBluesFastCheck | null> {
    if (!websiteUrl) {
      console.log('[ScansBlue] No website URL provided, skipping Fast Check');
      return null;
    }

    try {
      console.log(`[ScansBlue] Running Fast Check for: ${websiteUrl}`);
      const result = await scansBlueService.runFastCheck(websiteUrl);
      
      if (!result || !result.results) {
        console.log('[ScansBlue] Fast Check returned no results');
        return null;
      }

      const overallScore = result.results.summary?.overallScore || 0;
      console.log(`[ScansBlue] Fast Check complete - Score: ${overallScore}/100`);
      
      return {
        overallScore,
        sslPresent: result.results.ssl?.present || false,
        sslValid: result.results.ssl?.valid || false,
        loadTime: result.results.performance?.loadTime || 0,
        performanceScore: result.results.performance?.score || 0,
        mobileOptimized: result.results.mobile?.optimized || false,
        mobileScore: result.results.mobile?.score || 0,
        criticalIssues: result.results.criticalIssues || [],
      };
    } catch (error) {
      console.error('[ScansBlue] Fast Check error:', error);
      return null;
    }
  }

  /**
   * Check if an IP address is private/internal/loopback
   * Uses ipaddr.js for comprehensive IPv4/IPv6 validation
   */
  private isPrivateIP(ip: string): boolean {
    try {
      // Parse the IP address
      const addr = ipaddr.process(ip); // Auto-converts IPv4-mapped IPv6 to IPv4
      
      // Get the range type
      const range = addr.range();
      
      // Private IPv4 ranges: 'private', 'loopback', 'linkLocal', 'broadcast', 'carrierGradeNat'
      // Private IPv6 ranges: 'uniqueLocal', 'linkLocal', 'loopback', 'unspecified'
      const privateRanges = [
        'private',          // IPv4: 10.x, 172.16-31.x, 192.168.x
        'loopback',         // IPv4: 127.x, IPv6: ::1
        'linkLocal',        // IPv4: 169.254.x, IPv6: fe80::/10 (ALL link-local, not just prefix)
        'uniqueLocal',      // IPv6: fc00::/7 (private IPv6)
        'unspecified',      // IPv6: ::
        'broadcast',        // IPv4: 255.255.255.255
        'carrierGradeNat',  // IPv4: 100.64.0.0/10
        'reserved',         // Reserved ranges
      ];
      
      return privateRanges.includes(range);
    } catch (error) {
      // Invalid IP address
      return false;
    }
  }

  /**
   * Validate URL for security and resolve IPs (prevent SSRF + DNS rebinding)
   * Returns validated IPs that can be pinned for actual request
   */
  private async validateAndResolveUrl(url: string): Promise<UrlValidationResult> {
    try {
      const parsed = new URL(url);
      
      // Only allow http/https
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return { isValid: false, resolvedIPs: [], hostname: '' };
      }
      
      const hostname = parsed.hostname.toLowerCase();
      
      // Block obvious localhost references
      if (hostname === 'localhost' || hostname === '0.0.0.0') {
        return { isValid: false, resolvedIPs: [], hostname };
      }
      
      // If hostname is already an IP, check it directly
      if (isIP(hostname)) {
        if (this.isPrivateIP(hostname)) {
          return { isValid: false, resolvedIPs: [], hostname };
        }
        return { isValid: true, resolvedIPs: [hostname], hostname };
      }
      
      // Resolve DNS to get actual IPs (both IPv4 and IPv6)
      try {
        // Check both A (IPv4) and AAAA (IPv6) records
        const ipv4Addresses: string[] = [];
        const ipv6Addresses: string[] = [];
        
        try {
          ipv4Addresses.push(...await dns.resolve4(hostname));
        } catch {
          // No IPv4 records, that's okay
        }
        
        try {
          ipv6Addresses.push(...await dns.resolve6(hostname));
        } catch {
          // No IPv6 records, that's okay
        }
        
        const allAddresses = [...ipv4Addresses, ...ipv6Addresses];
        
        if (allAddresses.length === 0) {
          console.warn(`⚠️ No DNS records found for: ${hostname}`);
          return { isValid: false, resolvedIPs: [], hostname };
        }
        
        // Check if ANY resolved IP (IPv4 or IPv6) is private/internal
        for (const addr of allAddresses) {
          if (this.isPrivateIP(addr)) {
            console.warn(`⚠️ Blocked private IP resolution: ${hostname} -> ${addr}`);
            return { isValid: false, resolvedIPs: [], hostname };
          }
        }
        
        // Return validated IPs that can be pinned
        return { isValid: true, resolvedIPs: allAddresses, hostname };
      } catch (dnsError) {
        // DNS resolution failed - domain doesn't exist or network issue
        console.warn(`⚠️ DNS resolution failed for: ${hostname}`, dnsError);
        return { isValid: false, resolvedIPs: [], hostname };
      }
    } catch {
      return { isValid: false, resolvedIPs: [], hostname: '' };
    }
  }

  /**
   * Secure HTTP fetch with DNS rebinding protection
   * Uses pinned IPs from validation to prevent DNS re-resolution
   */
  private async secureFetch(url: string, validatedIPs: string[], options: {
    method?: string;
    headers?: Record<string, string>;
    timeout?: number;
  } = {}): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string }> {
    return new Promise((resolve, reject) => {
      const parsed = new URL(url);
      const isHttps = parsed.protocol === 'https:';
      const module = isHttps ? https : http;
      
      // Use the first validated IP (preferring IPv4 over IPv6 for broader compatibility)
      const ipv4 = validatedIPs.find(ip => isIP(ip) === 4);
      const targetIP = ipv4 || validatedIPs[0];
      
      if (!targetIP) {
        reject(new Error('No validated IP available'));
        return;
      }
      
      const requestOptions: http.RequestOptions & https.RequestOptions = {
        hostname: targetIP, // Use IP directly
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: options.method || 'GET',
        headers: {
          'Host': parsed.hostname, // Set Host header to original hostname
          'User-Agent': 'BusinessBlueprint-Scanner/1.0',
          ...options.headers,
        },
        timeout: options.timeout || 10000,
        // For HTTPS: Set SNI hostname for proper TLS certificate validation
        servername: parsed.hostname, // TLS will validate cert against this hostname
        // Custom lookup to prevent any DNS resolution
        lookup: (hostname: string, opts: any, callback: any) => {
          // Always return the pre-validated IP, blocking any DNS resolution
          callback(null, targetIP, isIP(targetIP) || 4);
        },
      };
      
      const req = module.request(requestOptions, (res) => {
        const chunks: Buffer[] = [];
        let totalSize = 0;
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit
        
        res.on('data', (chunk: Buffer) => {
          totalSize += chunk.length;
          if (totalSize > MAX_SIZE) {
            req.destroy();
            reject(new Error('Response too large'));
            return;
          }
          chunks.push(chunk);
        });
        
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf-8');
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body,
          });
        });
        
        res.on('error', reject);
      });
      
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
  }

  /**
   * Scan website for SEO, speed, mobile-friendliness, SSL
   */
  private async scanWebsite(websiteUrl?: string): Promise<WebsiteScan> {
    if (!websiteUrl) {
      return this.getEmptyWebsiteScan();
    }

    try {
      // Ensure URL has protocol
      const url = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
      
      // Validate URL and resolve IPs (SSRF + DNS rebinding protection)
      const validation = await this.validateAndResolveUrl(url);
      if (!validation.isValid) {
        console.warn(`⚠️ Invalid or blocked URL: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      // Check SSL
      const hasSSL = url.startsWith('https://');

      // Fetch website HTML with manual redirect handling and pinned IPs
      const startTime = Date.now();
      let currentUrl = url;
      let currentValidatedIPs = validation.resolvedIPs;
      let redirectCount = 0;
      const MAX_REDIRECTS = 5;
      let response: { status: number; headers: http.IncomingHttpHeaders; body: string };
      
      // Manually handle redirects to validate each hop
      while (redirectCount < MAX_REDIRECTS) {
        // Use secure fetch with pinned IPs (prevents DNS rebinding)
        response = await this.secureFetch(currentUrl, currentValidatedIPs, {
          timeout: 10000,
        });
        
        // If it's a redirect, validate the destination
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers['location'];
          if (!location) {
            console.warn(`⚠️ Redirect without Location header`);
            return this.getEmptyWebsiteScan();
          }
          
          // Resolve relative URLs
          const redirectUrl = new URL(location, currentUrl).toString();
          
          // Validate redirect destination for SSRF and get new pinned IPs
          const redirectValidation = await this.validateAndResolveUrl(redirectUrl);
          if (!redirectValidation.isValid) {
            console.warn(`⚠️ Blocked redirect to private/invalid URL: ${redirectUrl}`);
            return this.getEmptyWebsiteScan();
          }
          
          // Update URL and pinned IPs for next iteration
          currentUrl = redirectUrl;
          currentValidatedIPs = redirectValidation.resolvedIPs;
          redirectCount++;
          continue;
        }
        
        // Not a redirect, we have the final response
        break;
      }
      
      // Check if we hit redirect limit
      if (redirectCount >= MAX_REDIRECTS) {
        console.warn(`⚠️ Too many redirects for: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      const loadTime = Date.now() - startTime;
      const html = response!.body;

      // Parse HTML for SEO analysis
      const seoData = this.analyzeSEO(html);
      const contentData = this.analyzeContent(html);
      const isMobileFriendly = this.checkMobileFriendly(html);

      const score = this.calculateWebsiteScore({
        hasSSL,
        isMobileFriendly,
        loadTime,
        seo: seoData,
        content: contentData,
      });

      return {
        exists: true,
        hasSSL,
        isMobileFriendly,
        loadTime,
        seo: seoData,
        content: contentData,
        score,
      };
    } catch (error) {
      console.error('Website scan error:', error);
      return this.getEmptyWebsiteScan();
    }
  }

  /**
   * Analyze SEO elements from HTML
   */
  private analyzeSEO(html: string) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';
    
    const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1] : '';
    
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const hasH1 = !!h1Match;

    let score = 0;
    if (title.length > 0 && title.length <= 60) score += 25;
    if (metaDescription.length > 50 && metaDescription.length <= 160) score += 25;
    if (hasH1) score += 25;
    if (html.includes('og:title') || html.includes('twitter:title')) score += 25;

    return {
      hasTitle: title.length > 0,
      hasMetaDescription: metaDescription.length > 0,
      hasH1,
      titleLength: title.length,
      descriptionLength: metaDescription.length,
      score,
    };
  }

  /**
   * Analyze content for business information
   */
  private analyzeContent(html: string) {
    const hasPhone = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(html);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(html);
    const hasAddress = /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir)/i.test(html);
    const hasBusinessHours = /(?:monday|mon|hours|open|closed)/i.test(html);
    const hasContactInfo = hasPhone || hasEmail;

    return {
      hasContactInfo,
      hasAddress,
      hasPhone,
      hasEmail,
      hasBusinessHours,
    };
  }

  /**
   * Check if website is mobile-friendly
   */
  private checkMobileFriendly(html: string): boolean {
    // Check for viewport meta tag
    const hasViewport = /<meta\s+name=["']viewport["']/i.test(html);
    
    // Check for responsive framework indicators
    const hasResponsive = /responsive|bootstrap|tailwind|flex|grid/i.test(html);
    
    return hasViewport || hasResponsive;
  }

  /**
   * Scan social media presence
   * NOTE: This is a placeholder implementation. Real implementation requires:
   * - Facebook Graph API integration
   * - Instagram Basic Display API
   * - Twitter API v2
   * - LinkedIn API
   * - YouTube Data API
   */
  private async scanSocialMedia(businessName: string): Promise<SocialMediaScan> {
    console.log(`ℹ️ Social media scanning not yet implemented for: ${businessName}`);
    
    // TODO: Implement real social media discovery
    // For now, return neutral scores to avoid misleading data
    const platforms = {
      facebook: { exists: false, isActive: false },
      instagram: { exists: false, isActive: false },
      twitter: { exists: false, isActive: false },
      linkedin: { exists: false, isActive: false },
      youtube: { exists: false, isActive: false },
    };

    return {
      platforms,
      totalPresence: 0,
      activeProfiles: 0,
      score: 50, // Neutral score (not 0 to avoid penalizing unknowns)
    };
  }

  /**
   * Scan business directories using real APIs
   */
  private async scanDirectories(params: {
    businessName: string;
    phone?: string;
    address?: string;
  }): Promise<DirectoryScan> {
    console.log(`🔍 Scanning directories for: ${params.businessName}`);
    
    // Scan Google Places
    const googleResult = await googlePlacesService.searchBusiness(
      params.businessName,
      params.address
    );

    // Scan Yelp
    const yelpResult = await yelpApiService.searchBusiness(
      params.businessName,
      params.address,
      params.phone
    );

    const platforms = {
      google: { 
        exists: googleResult.exists, 
        claimed: googleResult.isClaimed || false, 
        isConsistent: true 
      },
      yelp: { 
        exists: yelpResult.exists, 
        claimed: yelpResult.isClaimed || false, 
        isConsistent: true 
      },
      facebook: { exists: false, claimed: false, isConsistent: true }, // TODO: Add Facebook API
      yellowPages: { exists: false, claimed: false, isConsistent: true }, // TODO: Add scraping
      bbb: { exists: false, claimed: false, isConsistent: true }, // TODO: Add scraping
    };

    const totalListings = Object.values(platforms).filter(p => p.exists).length;
    const claimedListings = Object.values(platforms).filter(p => p.claimed).length;
    
    // Consistency check (compare business info across platforms)
    const consistency = 100; // TODO: Implement NAP consistency check
    
    // Score based on platforms we ACTUALLY check (Google + Yelp = 2)
    // Don't penalize businesses for platforms we don't check yet
    const SUPPORTED_PLATFORMS = 2; // Google + Yelp (we check these)
    const listingScore = (totalListings / SUPPORTED_PLATFORMS) * 50;
    const claimedScore = totalListings > 0 ? (claimedListings / totalListings) * 50 : 0;
    const score = Math.min(100, listingScore + claimedScore); // Cap at 100

    console.log(`📊 Directory scan: ${totalListings} listings, ${claimedListings} claimed, score: ${score}/100`);

    return {
      platforms,
      totalListings,
      claimedListings,
      consistency,
      score,
    };
  }

  /**
   * Scan reviews across platforms using real APIs
   */
  private async scanReviews(params: {
    businessName: string;
    address?: string;
    phone?: string;
  }): Promise<ReviewScan> {
    console.log(`🔍 Scanning reviews for: ${params.businessName}`);
    
    // Get reviews from Google Places
    const googleResult = await googlePlacesService.searchBusiness(
      params.businessName,
      params.address
    );

    // Get reviews from Yelp
    const yelpResult = await yelpApiService.searchBusiness(
      params.businessName,
      params.address,
      params.phone
    );

    const platforms = {
      google: { 
        exists: googleResult.exists && (googleResult.reviewCount || 0) > 0,
        reviewCount: googleResult.reviewCount || 0,
        averageRating: googleResult.rating || 0,
        recentReviews: (googleResult.reviews || []).length,
        responseRate: 0, // TODO: Calculate response rate
      },
      yelp: { 
        exists: yelpResult.exists && (yelpResult.reviewCount || 0) > 0,
        reviewCount: yelpResult.reviewCount || 0,
        averageRating: yelpResult.rating || 0,
        recentReviews: (yelpResult.reviews || []).length,
        responseRate: 0, // TODO: Calculate response rate
      },
      facebook: { 
        exists: false, 
        reviewCount: 0, 
        averageRating: 0, 
        recentReviews: 0, 
        responseRate: 0 
      }, // TODO: Add Facebook Graph API
    };

    // Calculate totals
    const totalReviews = platforms.google.reviewCount + platforms.yelp.reviewCount;
    
    const ratingsWithCounts = [
      { rating: platforms.google.averageRating, count: platforms.google.reviewCount },
      { rating: platforms.yelp.averageRating, count: platforms.yelp.reviewCount },
    ].filter(p => p.count > 0);

    const averageRating = ratingsWithCounts.length > 0
      ? ratingsWithCounts.reduce((sum, p) => sum + (p.rating * p.count), 0) / totalReviews
      : 0;

    const responseRate = 0; // TODO: Calculate based on review responses

    // Calculate score
    const score = this.calculateReviewScore({ totalReviews, averageRating, responseRate });

    console.log(`📊 Review scan: ${totalReviews} reviews, ${averageRating.toFixed(1)} avg rating, score: ${score}/100`);

    return {
      platforms,
      totalReviews,
      averageRating,
      responseRate,
      score,
    };
  }

  /**
   * Calculate scan-based Digital IQ score (0-70)
   * 
   * This returns just the scan component. Use calculateCombinedDigitalIQ() 
   * to get the full 0-140 score with operational data included.
   * 
   * Weight distribution for scans:
   * - Website: 30% (21 points)
   * - Directories: 30% (21 points)
   * - Reviews: 25% (17.5 points)
   * - Social Media: 15% (10.5 points)
   */
  private calculateDigitalIQ(data: {
    website: WebsiteScan;
    socialMedia: SocialMediaScan;
    directories: DirectoryScan;
    reviews: ReviewScan;
    scansBlue?: ScansBluesFastCheck | null;
  }): number {
    const websitePoints = (data.website.score / 100) * 18;
    const directoriesPoints = (data.directories.score / 100) * 18;
    const reviewsPoints = (data.reviews.score / 100) * 16;
    const socialPoints = (data.socialMedia.score / 100) * 8;
    
    let scansBluePoints = 0;
    if (data.scansBlue) {
      scansBluePoints = Math.min(10, (data.scansBlue.overallScore / 100) * 10);
      console.log(`[ScansBlue] Technical points: ${scansBluePoints.toFixed(1)}/10`);
    }

    const scanTotal = Math.round(websitePoints + directoriesPoints + reviewsPoints + socialPoints + scansBluePoints);
    
    console.log(`📊 Digital IQ Scan Breakdown: Website=${websitePoints.toFixed(1)}/18, Directories=${directoriesPoints.toFixed(1)}/18, Reviews=${reviewsPoints.toFixed(1)}/16, Social=${socialPoints.toFixed(1)}/8, ScansBlue=${scansBluePoints.toFixed(1)}/10, Scan Total=${scanTotal}/70`);
    
    return Math.min(70, Math.max(0, scanTotal));
  }

  /**
   * Calculate operational score from self-reported assessment questions (0-70 points)
   * 
   * 9 categories × ~3 questions each = 27 questions total
   * Each category contributes a proportional share of 70 points
   */
  calculateOperationalScore(operationalData: {
    // Email & SMS Marketing (Q1-Q5)
    collectsEmails?: string | null;
    lastEmailCampaign?: string | null;
    emailListSize?: string | null;
    sendsSMS?: string | null;
    lastSMSCampaign?: string | null;
    // Social Media Content (Q6-Q8)
    lastSocialPost?: string | null;
    socialPostFrequency?: string | null;
    socialContentCreator?: string | null;
    // Reputation Management (Q9-Q11)
    lastReviewResponse?: string | null;
    reviewResponseRate?: string | null;
    lastNewReview?: string | null;
    // Customer Response & Timing (Q12-Q14)
    inquiryResponseTime?: string | null;
    hasUnifiedInbox?: string | null;
    missedInquiries?: string | null;
    // Live Chat (Q15-Q17)
    hasLiveChat?: string | null;
    lastChatConversation?: string | null;
    chatResponseTime?: string | null;
    // Business Listings (Q18-Q19)
    lastListingUpdate?: string | null;
    listingConsistency?: string | null;
    // Google Business Profile (Q20-Q21)
    lastGBPPost?: string | null;
    lastGBPPhoto?: string | null;
    // Website & SEO (Q22-Q23)
    lastWebsiteUpdate?: string | null;
    hasBlog?: string | null;
    // CRM (Q24-Q27)
    usesCRM?: string | null;
    crmPlatform?: string | null;
    lastCRMFollowup?: string | null;
    hasAutomation?: string | null;
  }): number {
    // Define scoring tables: maps answer values to points (0-10 per question, normalized at end)
    // IMPORTANT: Values must match exactly what the form produces
    const recencyScores: Record<string, number> = {
      'past_week': 10,
      'past_month': 8,
      'past_3_months': 5,
      'past_6_months': 3,
      '6_months_plus': 1,     // Email/GBP photo
      '3_months_plus': 2,     // SMS/social/reputation/chat/GBP post/CRM
      'past_year': 2,         // Listings
      'year_plus': 1,         // Listings
      'never': 0,             // General
      'never_none': 0,        // Live chat
      'never_no_crm': 0,      // CRM followup
    };

    const emailCollectionScores: Record<string, number> = {
      'yes_active': 10,
      'yes_not_organized': 5,
      'no': 0,
      'dont_know': 2,
    };

    const listSizeScores: Record<string, number> = {
      '1000_plus': 10,
      '501_1000': 8,
      '201_500': 6,
      '51_200': 4,
      '0_50': 2,
      'no_list': 0,
    };

    const smsScores: Record<string, number> = {
      'yes_regularly': 10,
      'yes_occasionally': 6,
      'no_interested': 3,
      'no_not_interested': 0,
    };

    const frequencyScores: Record<string, number> = {
      'daily': 10,
      '3_5_week': 8,
      '1_2_week': 6,
      'few_month': 4,
      'rarely': 2,
      'never': 0,
    };

    const creatorScores: Record<string, number> = {
      'agency': 10,
      'staff': 8,
      'owner': 6,
      'inconsistent': 3,
      'no_one': 0,
    };

    const responseRateScores: Record<string, number> = {
      '90_100': 10,
      '50_89': 7,
      '10_49': 4,
      'under_10': 2,
      '0': 0,
    };

    const responseTimeScores: Record<string, number> = {
      '15_min': 10,
      '1_hour': 8,
      '4_hours': 6,
      '24_hours': 4,
      '24_hours_plus': 2,
      'inconsistent': 3,
      '1_min': 10,
      '5_min': 8,
      '15_plus': 4,
      'no_chat': 0,
    };

    const unifiedInboxScores: Record<string, number> = {
      'yes_unified': 10,
      'partial': 6,
      'no_scattered': 2,
      'dont_know': 3,
    };

    const missedInquiriesScores: Record<string, number> = {
      'never': 10,
      'past_week': 4,
      'past_month': 6,
      'regularly': 2,
      'dont_track': 3,
    };

    const liveChatScores: Record<string, number> = {
      'yes_monitored': 10,
      'yes_not_monitored': 5,
      'yes_unsure': 4,
      'no': 2,
      'no_website': 0,
    };

    const listingConsistencyScores: Record<string, number> = {
      'yes_consistent': 10,
      'pretty_sure': 7,
      'not_sure': 4,
      'know_inconsistent': 2,
      'never_checked': 3,
    };

    const blogScores: Record<string, number> = {
      'yes_weekly': 10,
      'yes_monthly': 7,
      'yes_inconsistent': 4,
      'no_planning': 2,
      'no_not_interested': 0,
    };

    const crmScores: Record<string, number> = {
      'yes_daily': 10,
      'yes_underutilized': 6,
      'yes_not_setup': 4,
      'no_planning': 2,
      'manual_tracking': 3,
      'no_dont_track': 0,
    };

    const crmPlatformScores: Record<string, number> = {
      'salesforce': 10,
      'hubspot': 10,
      'zoho': 8,
      'monday': 7,
      'pipedrive': 8,
      'sheets_excel': 3,
      'other': 5,
      'none': 0,
    };

    const automationScores: Record<string, number> = {
      'yes_full': 10,
      'yes_partial': 6,
      'no_manual': 2,
      'dont_know': 3,
    };

    // Helper to get score with fallback
    const getScore = (value: string | null | undefined, scoreTable: Record<string, number>): number => {
      if (!value) return 0;
      return scoreTable[value] ?? 0;
    };

    // Calculate scores by category (each category is worth 7.78 points for 9 categories = 70 total)
    
    // Email & SMS Marketing (5 questions) - 7.78 points max
    const emailSmsRaw = (
      getScore(operationalData.collectsEmails, emailCollectionScores) +
      getScore(operationalData.lastEmailCampaign, recencyScores) +
      getScore(operationalData.emailListSize, listSizeScores) +
      getScore(operationalData.sendsSMS, smsScores) +
      getScore(operationalData.lastSMSCampaign, recencyScores)
    ) / 50 * 7.78;

    // Social Media Content (3 questions) - 7.78 points max
    const socialRaw = (
      getScore(operationalData.lastSocialPost, recencyScores) +
      getScore(operationalData.socialPostFrequency, frequencyScores) +
      getScore(operationalData.socialContentCreator, creatorScores)
    ) / 30 * 7.78;

    // Reputation Management (3 questions) - 7.78 points max
    const reputationRaw = (
      getScore(operationalData.lastReviewResponse, recencyScores) +
      getScore(operationalData.reviewResponseRate, responseRateScores) +
      getScore(operationalData.lastNewReview, recencyScores)
    ) / 30 * 7.78;

    // Customer Response & Timing (3 questions) - 7.78 points max
    const responseRaw = (
      getScore(operationalData.inquiryResponseTime, responseTimeScores) +
      getScore(operationalData.hasUnifiedInbox, unifiedInboxScores) +
      getScore(operationalData.missedInquiries, missedInquiriesScores)
    ) / 30 * 7.78;

    // Live Chat (3 questions) - 7.78 points max
    const chatRaw = (
      getScore(operationalData.hasLiveChat, liveChatScores) +
      getScore(operationalData.lastChatConversation, recencyScores) +
      getScore(operationalData.chatResponseTime, responseTimeScores)
    ) / 30 * 7.78;

    // Business Listings (2 questions) - 7.78 points max
    const listingsRaw = (
      getScore(operationalData.lastListingUpdate, recencyScores) +
      getScore(operationalData.listingConsistency, listingConsistencyScores)
    ) / 20 * 7.78;

    // Google Business Profile (2 questions) - 7.78 points max
    const gbpRaw = (
      getScore(operationalData.lastGBPPost, recencyScores) +
      getScore(operationalData.lastGBPPhoto, recencyScores)
    ) / 20 * 7.78;

    // Website & SEO (2 questions) - 7.78 points max
    const websiteRaw = (
      getScore(operationalData.lastWebsiteUpdate, recencyScores) +
      getScore(operationalData.hasBlog, blogScores)
    ) / 20 * 7.78;

    // CRM (4 questions) - 7.78 points max
    const crmRaw = (
      getScore(operationalData.usesCRM, crmScores) +
      getScore(operationalData.crmPlatform, crmPlatformScores) +
      getScore(operationalData.lastCRMFollowup, recencyScores) +
      getScore(operationalData.hasAutomation, automationScores)
    ) / 40 * 7.78;

    const operationalTotal = Math.round(
      emailSmsRaw + socialRaw + reputationRaw + responseRaw + 
      chatRaw + listingsRaw + gbpRaw + websiteRaw + crmRaw
    );

    console.log(`📊 Operational Score Breakdown: Email/SMS=${emailSmsRaw.toFixed(1)}, Social=${socialRaw.toFixed(1)}, Reputation=${reputationRaw.toFixed(1)}, Response=${responseRaw.toFixed(1)}, Chat=${chatRaw.toFixed(1)}, Listings=${listingsRaw.toFixed(1)}, GBP=${gbpRaw.toFixed(1)}, Website=${websiteRaw.toFixed(1)}, CRM=${crmRaw.toFixed(1)}, Total=${operationalTotal}/70`);

    return Math.min(70, Math.max(0, operationalTotal));
  }

  /**
   * Calculate combined Digital IQ score (scan + operational)
   */
  calculateCombinedDigitalIQ(scanScore: number, operationalScore: number): number {
    const combined = scanScore + operationalScore;
    console.log(`📊 Combined Digital IQ: Scan=${scanScore}/70 + Operational=${operationalScore}/70 = ${combined}/140`);
    return Math.min(140, Math.max(0, combined));
  }

  /**
   * Calculate completeness percentage
   */
  private calculateCompleteness(data: {
    website: WebsiteScan;
    socialMedia: SocialMediaScan;
    directories: DirectoryScan;
    reviews: ReviewScan;
  }): number {
    let completed = 0;
    let total = 0;

    // Website checks
    total += 5;
    if (data.website.exists) completed++;
    if (data.website.hasSSL) completed++;
    if (data.website.isMobileFriendly) completed++;
    if (data.website.seo.hasTitle) completed++;
    if (data.website.content.hasContactInfo) completed++;

    // Social media
    total += 5;
    completed += data.socialMedia.activeProfiles;

    // Directories
    total += 5;
    completed += data.directories.claimedListings;

    // Reviews
    total += 3;
    if (data.reviews.totalReviews > 0) completed++;
    if (data.reviews.averageRating >= 4.0) completed++;
    if (data.reviews.responseRate >= 50) completed++;

    return Math.round((completed / total) * 100);
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(data: {
    website: WebsiteScan;
    socialMedia: SocialMediaScan;
    directories: DirectoryScan;
    reviews: ReviewScan;
  }): string[] {
    const recommendations: string[] = [];

    // Website recommendations
    if (!data.website.exists) {
      recommendations.push('Create a professional website for your business');
    } else {
      if (!data.website.hasSSL) recommendations.push('Add SSL certificate to your website for security');
      if (!data.website.isMobileFriendly) recommendations.push('Make your website mobile-friendly');
      if (!data.website.seo.hasTitle) recommendations.push('Add a title tag to your website');
      if (!data.website.seo.hasMetaDescription) recommendations.push('Add meta description for better SEO');
      if (data.website.loadTime > 3000) recommendations.push('Improve website loading speed');
    }

    // Directory recommendations
    if (data.directories.totalListings < 3) {
      recommendations.push('Claim your business on Google, Yelp, and Facebook');
    }
    if (data.directories.consistency < 80) {
      recommendations.push('Fix NAP (Name, Address, Phone) inconsistencies across directories');
    }

    // Review recommendations
    if (data.reviews.totalReviews < 10) {
      recommendations.push('Request reviews from satisfied customers');
    }
    if (data.reviews.responseRate < 50) {
      recommendations.push('Respond to customer reviews to show engagement');
    }

    // Social media recommendations
    if (data.socialMedia.activeProfiles < 2) {
      recommendations.push('Establish active presence on key social media platforms');
    }

    return recommendations.slice(0, 10); // Top 10 recommendations
  }

  /**
   * Helper: Calculate website score
   */
  private calculateWebsiteScore(data: {
    hasSSL: boolean;
    isMobileFriendly: boolean;
    loadTime: number;
    seo: any;
    content: any;
  }): number {
    let score = 0;
    
    if (data.hasSSL) score += 20;
    if (data.isMobileFriendly) score += 20;
    if (data.loadTime < 2000) score += 20;
    else if (data.loadTime < 4000) score += 10;
    
    score += (data.seo.score / 100) * 25;
    
    const contentChecks = Object.values(data.content).filter(Boolean).length;
    score += (contentChecks / 5) * 15;

    return Math.min(100, score);
  }

  /**
   * Helper: Calculate review score
   */
  private calculateReviewScore(data: {
    totalReviews: number;
    averageRating: number;
    responseRate: number;
  }): number {
    let score = 0;

    // Review count (0-40 points)
    if (data.totalReviews >= 50) score += 40;
    else if (data.totalReviews >= 25) score += 30;
    else if (data.totalReviews >= 10) score += 20;
    else if (data.totalReviews >= 5) score += 10;

    // Average rating (0-40 points)
    score += (data.averageRating / 5) * 40;

    // Response rate (0-20 points)
    score += (data.responseRate / 100) * 20;

    return Math.min(100, score);
  }

  /**
   * Helper: Get empty website scan
   */
  private getEmptyWebsiteScan(): WebsiteScan {
    return {
      exists: false,
      hasSSL: false,
      isMobileFriendly: false,
      loadTime: 0,
      seo: {
        hasTitle: false,
        hasMetaDescription: false,
        hasH1: false,
        titleLength: 0,
        descriptionLength: 0,
        score: 0,
      },
      content: {
        hasContactInfo: false,
        hasAddress: false,
        hasPhone: false,
        hasEmail: false,
        hasBusinessHours: false,
      },
      score: 0,
    };
  }
}

export const presenceScannerService = new PresenceScannerService();

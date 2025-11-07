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
import * as ipaddr from 'ipaddr.js';
import { googlePlacesService } from './googlePlaces';
import { yelpApiService } from './yelpApi';

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

    const [website, socialMedia, directories, reviews] = await Promise.all([
      this.scanWebsite(params.website),
      this.scanSocialMedia(params.businessName),
      this.scanDirectories(params),
      this.scanReviews({
        businessName: params.businessName,
        address: params.address,
        phone: params.phone,
      }),
    ]);

    const digitalIQScore = this.calculateDigitalIQ({
      website,
      socialMedia,
      directories,
      reviews,
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
    };
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
   * Validate URL for security (prevent SSRF by resolving DNS)
   */
  private async isValidUrl(url: string): Promise<boolean> {
    try {
      const parsed = new URL(url);
      
      // Only allow http/https
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }
      
      const hostname = parsed.hostname.toLowerCase();
      
      // Block obvious localhost references
      if (hostname === 'localhost' || hostname === '0.0.0.0') {
        return false;
      }
      
      // If hostname is already an IP, check it directly
      if (isIP(hostname)) {
        return !this.isPrivateIP(hostname);
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
          return false;
        }
        
        // Check if ANY resolved IP (IPv4 or IPv6) is private/internal
        for (const addr of allAddresses) {
          if (this.isPrivateIP(addr)) {
            console.warn(`⚠️ Blocked private IP resolution: ${hostname} -> ${addr}`);
            return false;
          }
        }
        
        return true;
      } catch (dnsError) {
        // DNS resolution failed - domain doesn't exist or network issue
        console.warn(`⚠️ DNS resolution failed for: ${hostname}`, dnsError);
        return false;
      }
    } catch {
      return false;
    }
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
      
      // Validate URL for security (async DNS resolution)
      const isValid = await this.isValidUrl(url);
      if (!isValid) {
        console.warn(`⚠️ Invalid or blocked URL: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      // Check SSL
      const hasSSL = url.startsWith('https://');

      // Fetch website HTML with manual redirect handling (SSRF protection)
      const startTime = Date.now();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      let currentUrl = url;
      let redirectCount = 0;
      const MAX_REDIRECTS = 5;
      let response: Response;
      
      // Manually handle redirects to validate each hop
      while (redirectCount < MAX_REDIRECTS) {
        response = await fetch(currentUrl, {
          headers: {
            'User-Agent': 'BusinessBlueprint-Scanner/1.0',
          },
          redirect: 'manual', // Don't auto-follow redirects
          signal: controller.signal,
        });
        
        // If it's a redirect, validate the destination
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('location');
          if (!location) {
            console.warn(`⚠️ Redirect without Location header`);
            clearTimeout(timeout);
            return this.getEmptyWebsiteScan();
          }
          
          // Resolve relative URLs
          const redirectUrl = new URL(location, currentUrl).toString();
          
          // Validate redirect destination for SSRF
          const isRedirectValid = await this.isValidUrl(redirectUrl);
          if (!isRedirectValid) {
            console.warn(`⚠️ Blocked redirect to private/invalid URL: ${redirectUrl}`);
            clearTimeout(timeout);
            return this.getEmptyWebsiteScan();
          }
          
          currentUrl = redirectUrl;
          redirectCount++;
          continue;
        }
        
        // Not a redirect, we have the final response
        break;
      }
      
      clearTimeout(timeout);
      
      // Check if we hit redirect limit
      if (redirectCount >= MAX_REDIRECTS) {
        console.warn(`⚠️ Too many redirects for: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      // Check content length
      const contentLength = response!.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) { // 5MB limit
        console.warn(`⚠️ Website too large: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      const loadTime = Date.now() - startTime;
      const html = await response!.text();

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
   * Calculate overall Digital IQ score (0-140)
   * 
   * NOTE: Until social/directory/review scanning is implemented, scores are weighted heavily
   * toward website analysis. Neutral (50/100) scores are used for unimplemented features
   * to avoid penalizing businesses unfairly.
   */
  private calculateDigitalIQ(data: {
    website: WebsiteScan;
    socialMedia: SocialMediaScan;
    directories: DirectoryScan;
    reviews: ReviewScan;
  }): number {
    // Weight distribution (will be accurate once all scanners are implemented):
    // Website: 30% (42 points) - IMPLEMENTED
    // Directories: 30% (42 points) - NOT YET IMPLEMENTED (using neutral 50 score)
    // Reviews: 25% (35 points) - NOT YET IMPLEMENTED (using neutral 50 score)
    // Social Media: 15% (21 points) - NOT YET IMPLEMENTED (using neutral 50 score)
    
    const websitePoints = (data.website.score / 100) * 42;
    const directoriesPoints = (data.directories.score / 100) * 42;
    const reviewsPoints = (data.reviews.score / 100) * 35;
    const socialPoints = (data.socialMedia.score / 100) * 21;

    const total = Math.round(websitePoints + directoriesPoints + reviewsPoints + socialPoints);
    
    console.log(`📊 Digital IQ Breakdown: Website=${websitePoints.toFixed(1)}, Directories=${directoriesPoints.toFixed(1)}, Reviews=${reviewsPoints.toFixed(1)}, Social=${socialPoints.toFixed(1)}, Total=${total}`);
    
    return Math.min(140, Math.max(0, total));
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

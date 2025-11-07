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
      this.scanReviews(params.businessName),
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
   * Validate URL for security (prevent SSRF)
   */
  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      
      // Only allow http/https
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }
      
      // Block internal/private IPs
      const hostname = parsed.hostname.toLowerCase();
      const blockedHosts = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '::1',
        '169.254.', // Link-local
        '10.', // Private
        '172.16.', // Private
        '192.168.', // Private
      ];
      
      if (blockedHosts.some(blocked => hostname.includes(blocked))) {
        return false;
      }
      
      return true;
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
      
      // Validate URL for security
      if (!this.isValidUrl(url)) {
        console.warn(`⚠️ Invalid or blocked URL: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      // Check SSL
      const hasSSL = url.startsWith('https://');

      // Fetch website HTML with timeout and size limit
      const startTime = Date.now();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'BusinessBlueprint-Scanner/1.0',
        },
        redirect: 'follow',
        signal: controller.signal,
      });
      
      clearTimeout(timeout);
      
      // Check content length
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) { // 5MB limit
        console.warn(`⚠️ Website too large: ${url}`);
        return this.getEmptyWebsiteScan();
      }
      
      const loadTime = Date.now() - startTime;
      const html = await response.text();

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
   * Scan business directories
   * NOTE: This is a placeholder implementation. Real implementation requires:
   * - Google My Business API integration
   * - Yelp Fusion API
   * - Facebook Places API
   * - Directory scraping for YellowPages, BBB, etc.
   */
  private async scanDirectories(params: {
    businessName: string;
    phone?: string;
    address?: string;
  }): Promise<DirectoryScan> {
    console.log(`ℹ️ Directory scanning not yet implemented for: ${params.businessName}`);
    
    // TODO: Implement real directory discovery
    // For now, return neutral scores to avoid misleading data
    const platforms = {
      google: { exists: false, claimed: false, isConsistent: true },
      yelp: { exists: false, claimed: false, isConsistent: true },
      facebook: { exists: false, claimed: false, isConsistent: true },
      yellowPages: { exists: false, claimed: false, isConsistent: true },
      bbb: { exists: false, claimed: false, isConsistent: true },
    };

    return {
      platforms,
      totalListings: 0,
      claimedListings: 0,
      consistency: 100, // Assume consistent until we can check
      score: 50, // Neutral score (not 0 to avoid penalizing unknowns)
    };
  }

  /**
   * Scan reviews across platforms
   * NOTE: This is a placeholder implementation. Real implementation requires:
   * - Google Places API for reviews
   * - Yelp Fusion API for reviews
   * - Facebook Graph API for reviews
   */
  private async scanReviews(businessName: string): Promise<ReviewScan> {
    console.log(`ℹ️ Review scanning not yet implemented for: ${businessName}`);
    
    // TODO: Implement real review aggregation
    // For now, return neutral scores to avoid misleading data
    const platforms = {
      google: { exists: false, reviewCount: 0, averageRating: 0, recentReviews: 0, responseRate: 0 },
      yelp: { exists: false, reviewCount: 0, averageRating: 0, recentReviews: 0, responseRate: 0 },
      facebook: { exists: false, reviewCount: 0, averageRating: 0, recentReviews: 0, responseRate: 0 },
    };

    return {
      platforms,
      totalReviews: 0,
      averageRating: 0,
      responseRate: 0,
      score: 50, // Neutral score (not 0 to avoid penalizing unknowns)
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

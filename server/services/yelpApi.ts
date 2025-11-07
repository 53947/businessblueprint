/**
 * Yelp Fusion API Integration
 * 
 * Fetches real business data from Yelp:
 * - Business listings
 * - Reviews and ratings
 * - Photos
 * - Hours of operation
 */

interface YelpBusinessResult {
  exists: boolean;
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: YelpReview[];
  photos?: string[];
  hours?: string[];
  isClaimed?: boolean;
}

interface YelpReview {
  author: string;
  rating: number;
  text: string;
  timeCreated: string;
  url: string;
}

class YelpApiService {
  private apiKey: string;
  private baseUrl = 'https://api.yelp.com/v3';

  constructor() {
    this.apiKey = process.env.YELP_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ YELP_API_KEY not set - Yelp integration disabled');
    }
  }

  /**
   * Search for a business by name and location
   */
  async searchBusiness(businessName: string, address?: string, phone?: string): Promise<YelpBusinessResult> {
    if (!this.apiKey) {
      return { exists: false };
    }

    try {
      // Try phone match first (most accurate)
      if (phone) {
        const phoneResult = await this.searchByPhone(phone);
        if (phoneResult.exists) {
          return phoneResult;
        }
      }

      // Fall back to name/location search
      const params = new URLSearchParams({
        term: businessName,
        limit: '1',
      });

      if (address) {
        params.append('location', address);
      }

      const searchUrl = `${this.baseUrl}/businesses/search?${params.toString()}`;
      
      const searchResponse = await fetch(searchUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const searchData = await searchResponse.json();

      if (!searchData.businesses?.length) {
        console.log(`ℹ️ No Yelp results for: ${businessName}`);
        return { exists: false };
      }

      const business = searchData.businesses[0];

      // Get reviews for this business
      const reviews = await this.getReviews(business.id);

      return {
        exists: true,
        id: business.id,
        name: business.name,
        address: business.location?.display_address?.join(', '),
        phone: business.display_phone,
        website: business.url,
        rating: business.rating,
        reviewCount: business.review_count,
        reviews,
        photos: business.photos || [],
        hours: this.formatHours(business.hours),
        isClaimed: !business.is_claimed ? false : true,
      };

    } catch (error) {
      console.error('❌ Yelp API error:', error);
      return { exists: false };
    }
  }

  /**
   * Search by phone number (most accurate)
   */
  private async searchByPhone(phone: string): Promise<YelpBusinessResult> {
    try {
      // Clean phone number (remove non-digits)
      const cleanPhone = phone.replace(/\D/g, '');
      
      const searchUrl = `${this.baseUrl}/businesses/search/phone?phone=+1${cleanPhone}`;
      
      const response = await fetch(searchUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const data = await response.json();

      if (!data.businesses?.length) {
        return { exists: false };
      }

      const business = data.businesses[0];
      const reviews = await this.getReviews(business.id);

      return {
        exists: true,
        id: business.id,
        name: business.name,
        address: business.location?.display_address?.join(', '),
        phone: business.display_phone,
        website: business.url,
        rating: business.rating,
        reviewCount: business.review_count,
        reviews,
        photos: business.photos || [],
        isClaimed: !business.is_claimed ? false : true,
      };

    } catch (error) {
      return { exists: false };
    }
  }

  /**
   * Get reviews for a specific business
   */
  async getReviews(businessId: string): Promise<YelpReview[]> {
    if (!this.apiKey) {
      return [];
    }

    try {
      const reviewsUrl = `${this.baseUrl}/businesses/${businessId}/reviews?limit=10&sort_by=yelp_sort`;
      
      const response = await fetch(reviewsUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const data = await response.json();

      if (!data.reviews) {
        return [];
      }

      return data.reviews.map((review: any) => ({
        author: review.user?.name || 'Anonymous',
        rating: review.rating,
        text: review.text,
        timeCreated: review.time_created,
        url: review.url,
      }));

    } catch (error) {
      console.error('❌ Error fetching Yelp reviews:', error);
      return [];
    }
  }

  /**
   * Format hours for display
   */
  private formatHours(hours: any[]): string[] {
    if (!hours || !hours.length) {
      return [];
    }

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const formatted: string[] = [];

    hours[0]?.open?.forEach((slot: any) => {
      const day = daysOfWeek[slot.day];
      const start = this.formatTime(slot.start);
      const end = this.formatTime(slot.end);
      formatted.push(`${day}: ${start} - ${end}`);
    });

    return formatted;
  }

  /**
   * Format time from 24hr (e.g., "1700") to 12hr (e.g., "5:00 PM")
   */
  private formatTime(time: string): string {
    const hours = parseInt(time.substring(0, 2));
    const minutes = time.substring(2);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    return `${displayHours}:${minutes} ${period}`;
  }
}

export const yelpApiService = new YelpApiService();

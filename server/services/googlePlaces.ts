/**
 * Google Places API Integration
 * 
 * Fetches real business data from Google My Business:
 * - Business listings
 * - Reviews and ratings
 * - Photos
 * - Hours of operation
 * - Phone, address, website
 */

interface GooglePlacesResult {
  exists: boolean;
  placeId?: string;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: GoogleReview[];
  photos?: string[];
  hours?: string[];
  isVerified?: boolean;
  isClaimed?: boolean;
}

interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  time: number;
  profilePhoto?: string;
}

class GooglePlacesService {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ GOOGLE_PLACES_API_KEY not set - Google Places integration disabled');
    }
  }

  /**
   * Search for a business by name and location
   */
  async searchBusiness(businessName: string, address?: string): Promise<GooglePlacesResult> {
    if (!this.apiKey) {
      return { exists: false };
    }

    try {
      // Build search query
      const query = address 
        ? `${businessName} ${address}`
        : businessName;

      // Find place using Text Search
      const searchUrl = `${this.baseUrl}/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (searchData.status !== 'OK' || !searchData.results?.length) {
        console.log(`ℹ️ No Google Places results for: ${businessName}`);
        return { exists: false };
      }

      // Get the first result
      const place = searchData.results[0];
      const placeId = place.place_id;

      // Get detailed information
      const detailsUrl = `${this.baseUrl}/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,reviews,photos,opening_hours,business_status&key=${this.apiKey}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (detailsData.status !== 'OK') {
        console.warn(`⚠️ Failed to get place details for ${placeId}`);
        return { exists: true, placeId };
      }

      const details = detailsData.result;

      // Process reviews
      const reviews: GoogleReview[] = (details.reviews || []).map((review: any) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profilePhoto: review.profile_photo_url,
      }));

      // Process photos
      const photos: string[] = (details.photos || []).slice(0, 5).map((photo: any) => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${this.apiKey}`;
      });

      // Extract hours
      const hours = details.opening_hours?.weekday_text || [];

      return {
        exists: true,
        placeId,
        name: details.name,
        address: details.formatted_address,
        phone: details.formatted_phone_number,
        website: details.website,
        rating: details.rating,
        reviewCount: details.user_ratings_total,
        reviews,
        photos,
        hours,
        isVerified: details.business_status === 'OPERATIONAL',
        isClaimed: true, // If it has details, it's likely claimed
      };

    } catch (error) {
      console.error('❌ Google Places API error:', error);
      return { exists: false };
    }
  }

  /**
   * Get reviews for a specific place
   */
  async getReviews(placeId: string): Promise<GoogleReview[]> {
    if (!this.apiKey) {
      return [];
    }

    try {
      const detailsUrl = `${this.baseUrl}/details/json?place_id=${placeId}&fields=reviews&key=${this.apiKey}`;
      
      const response = await fetch(detailsUrl);
      const data = await response.json();

      if (data.status !== 'OK' || !data.result?.reviews) {
        return [];
      }

      return data.result.reviews.map((review: any) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profilePhoto: review.profile_photo_url,
      }));

    } catch (error) {
      console.error('❌ Error fetching Google reviews:', error);
      return [];
    }
  }
}

export const googlePlacesService = new GooglePlacesService();

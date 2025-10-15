/**
 * Synup API Service
 * 
 * Integrates with Synup's Listings Management and Reputation Management APIs
 * - 200+ directory listings synchronization
 * - Review management across 80+ platforms
 * - White-label API capabilities
 * 
 * API Documentation: https://developer.synup.com/docs/
 */

import { 
  getStateId, 
  getCountryId, 
  getCategoryId, 
  formatPhoneNumber 
} from './synupMappings';

interface SynupLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  website?: string;
  email?: string;
  category?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface SynupListing {
  id: string;
  locationId: string;
  platform: string; // Google, Yelp, Facebook, etc.
  status: 'published' | 'pending' | 'claimed' | 'unclaimed' | 'error';
  url?: string;
  lastSynced?: string;
  syncStatus: string;
  visibility: boolean;
}

interface SynupReview {
  id: string;
  locationId: string;
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewDate: string;
  response?: string;
  responseDate?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  status: 'new' | 'responded' | 'flagged';
}

interface SynupApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class SynupService {
  private apiKey: string;
  private baseUrl = 'https://api.synup.com/api/v4'; // Actual Synup API v4 base URL
  
  constructor() {
    this.apiKey = process.env.SYNUP_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ SYNUP_API_KEY not configured - Synup integration will fail');
    } else {
      console.log('✅ Synup API Service initialized with API v4');
    }
  }

  /**
   * Validate Synup configuration
   */
  validateConfig(): void {
    if (!this.apiKey) {
      throw new Error('SYNUP_API_KEY environment variable is required');
    }
  }

  /**
   * Encode location ID to Base64 as required by Synup API
   */
  private encodeLocationId(locationId: string): string {
    return Buffer.from(locationId).toString('base64');
  }

  /**
   * Decode Base64 location ID from Synup API
   */
  private decodeLocationId(encodedId: string): string {
    return Buffer.from(encodedId, 'base64').toString('utf-8');
  }

  /**
   * Make authenticated API request to Synup
   */
  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> {
    this.validateConfig();

    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Synup API error (${response.status}): ${errorData.message || response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Synup API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get all locations for the account
   * Endpoint: GET /locations
   * Note: Returns locations with normal (non-encoded) IDs
   */
  async getAllLocations(): Promise<SynupLocation[]> {
    try {
      const response = await this.makeRequest<any>('/locations');
      const locations = response.data?.locations || response.locations || [];
      
      // Return locations as-is, Synup provides normal IDs in list responses
      return locations;
    } catch (error) {
      console.error('Error fetching Synup locations:', error);
      return [];
    }
  }

  /**
   * Get a specific location by ID
   * Endpoint: GET /locations/{locationId}
   * @param locationId - Raw location ID (will be Base64 encoded for API call)
   */
  async getLocation(locationId: string): Promise<SynupLocation | null> {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      const response = await this.makeRequest<any>(`/locations/${encodedLocationId}`);
      const location = response.data?.location || response.location || null;
      
      if (location) {
        // Ensure we return the raw location ID, not the Base64 encoded one
        location.id = locationId;
      }
      
      return location;
    } catch (error) {
      console.error(`Error fetching Synup location ${locationId}:`, error);
      return null;
    }
  }

  /**
   * Create a new location in Synup
   * Transforms user-friendly data into Synup API v4 format with numeric IDs
   */
  async createLocation(locationData: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
    website?: string;
    email?: string;
    category?: string;
  }): Promise<SynupLocation | null> {
    try {
      // Map state to Synup state_id
      const stateId = getStateId(locationData.state, locationData.country);
      if (!stateId) {
        throw new Error(`Invalid state: ${locationData.state} for country: ${locationData.country}`);
      }

      // Map country to Synup country_id
      const countryId = getCountryId(locationData.country);
      if (!countryId) {
        throw new Error(`Invalid country: ${locationData.country}`);
      }

      // Map category to Synup sub_category_id (optional, use default if not provided)
      let subCategoryId = "999"; // Default: Other
      if (locationData.category) {
        const mappedCategoryId = getCategoryId(locationData.category);
        if (mappedCategoryId) {
          subCategoryId = mappedCategoryId;
        }
      }

      // Format phone number (remove all non-digits)
      const formattedPhone = formatPhoneNumber(locationData.phone);

      // Transform to Synup API v4 format
      const synupPayload = {
        name: locationData.name,
        street: locationData.address, // Synup uses 'street' not 'address'
        city: locationData.city,
        state_id: stateId, // Numeric state ID
        country_id: countryId, // Numeric country ID
        postal_code: locationData.postalCode, // Synup uses underscore
        phone: formattedPhone,
        biz_url: locationData.website || undefined, // Synup uses 'biz_url' not 'website'
        sub_category_id: subCategoryId, // Numeric category ID
        description: undefined, // Will add if needed
      };

      console.log('🔵 Synup API: Creating location with mapped data:', {
        name: synupPayload.name,
        street: synupPayload.street,
        city: synupPayload.city,
        state_id: synupPayload.state_id,
        country_id: synupPayload.country_id,
        sub_category_id: synupPayload.sub_category_id
      });

      const response = await this.makeRequest<{ location: SynupLocation }>(
        '/locations',
        'POST',
        synupPayload
      );

      console.log('🟢 Synup API: Location created successfully:', response);
      
      return response.location || null;
    } catch (error: any) {
      console.error('🔴 Synup API: Error creating location:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      return null;
    }
  }

  /**
   * Get all listings for a location across all platforms
   * Endpoint: GET /locations/{locationId}/listings
   */
  async getLocationListings(locationId: string): Promise<SynupListing[]> {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      const response = await this.makeRequest<any>(
        `/locations/${encodedLocationId}/listings`
      );
      const listings = response.data?.listings || response.listings || [];
      
      return listings.map((listing: any) => ({
        ...listing,
        locationId: locationId // Use original location ID
      }));
    } catch (error) {
      console.error(`Error fetching listings for location ${locationId}:`, error);
      return [];
    }
  }

  /**
   * Sync/update a location's listings across all platforms
   * Endpoint: POST /locations/{locationId}/sync
   */
  async syncLocationListings(locationId: string): Promise<boolean> {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      await this.makeRequest(`/locations/${encodedLocationId}/sync`, 'POST');
      return true;
    } catch (error) {
      console.error(`Error syncing listings for location ${locationId}:`, error);
      return false;
    }
  }

  /**
   * Get all reviews (interactions) for a location
   * Note: Synup API v4 uses "interactions" terminology
   */
  async getLocationReviews(locationId: string, options?: {
    platform?: string;
    rating?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<SynupReview[]> {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      const queryParams = new URLSearchParams();
      
      // Synup API uses siteUrls for platform filtering
      if (options?.platform) queryParams.append('siteUrls', options.platform);
      
      // Rating filters - Synup supports array of ratings
      if (options?.rating) queryParams.append('ratingFilters', options.rating.toString());
      
      // Date range filters (YYYY-MM-DD format)
      if (options?.startDate) queryParams.append('startDate', options.startDate);
      if (options?.endDate) queryParams.append('endDate', options.endDate);
      
      // Category filter - REVIEW for reviews
      queryParams.append('category', 'REVIEW');
      
      const endpoint = `/locations/${encodedLocationId}/reviews${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await this.makeRequest<any>(endpoint);
      
      // Map Synup interaction response to our review format
      const interactions = response.data?.interactions || response.interactions || [];
      return interactions.map((interaction: any) => ({
        id: interaction.id || interaction.interactionId,
        locationId: locationId,
        platform: interaction.siteName || interaction.platform || 'unknown',
        rating: interaction.rating || 0,
        reviewText: interaction.text || interaction.reviewText || '',
        reviewerName: interaction.reviewerName || interaction.author || 'Anonymous',
        reviewDate: interaction.createdAt || interaction.reviewDate || new Date().toISOString(),
        response: interaction.response?.text || interaction.response,
        responseDate: interaction.response?.createdAt || interaction.responseDate,
        sentiment: this.calculateSentiment(interaction.rating),
        status: interaction.response ? 'responded' : 'new',
      }));
    } catch (error) {
      console.error(`Error fetching reviews for location ${locationId}:`, error);
      return [];
    }
  }

  /**
   * Calculate sentiment based on rating
   */
  private calculateSentiment(rating: number): 'positive' | 'negative' | 'neutral' {
    if (rating >= 4) return 'positive';
    if (rating <= 2) return 'negative';
    return 'neutral';
  }

  /**
   * Respond to an interaction (review) using Synup API
   * Endpoint: POST /interactions/{interactionId}/response
   */
  async respondToReview(reviewId: string, responseText: string, useAI: boolean = false): Promise<boolean> {
    try {
      const payload = {
        response: responseText,
        // Synup API may support AI flag - include for future compatibility
        ...(useAI && { aiGenerated: true })
      };
        
      await this.makeRequest(`/interactions/${reviewId}/response`, 'POST', payload);
      return true;
    } catch (error) {
      console.error(`Error responding to interaction ${reviewId}:`, error);
      return false;
    }
  }

  /**
   * Get interaction (review) analytics
   * Endpoint: GET /locations/{locationId}/interactions/analytics
   */
  async getReviewAnalytics(locationId: string): Promise<{
    averageRating: number;
    totalReviews: number;
    positiveCount: number;
    negativeCount: number;
    neutralCount: number;
    platformBreakdown: Record<string, number>;
  }> {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      const response = await this.makeRequest<any>(`/locations/${encodedLocationId}/interactions/analytics`);
      
      return {
        averageRating: response.data?.averageRating || response.averageRating || 0,
        totalReviews: response.data?.totalInteractions || response.totalReviews || 0,
        positiveCount: response.data?.sentiment?.positive || response.sentiment?.positive || 0,
        negativeCount: response.data?.sentiment?.negative || response.sentiment?.negative || 0,
        neutralCount: response.data?.sentiment?.neutral || response.sentiment?.neutral || 0,
        platformBreakdown: response.data?.platformBreakdown || response.platformBreakdown || {},
      };
    } catch (error) {
      console.error(`Error fetching review analytics for location ${locationId}:`, error);
      return {
        averageRating: 0,
        totalReviews: 0,
        positiveCount: 0,
        negativeCount: 0,
        neutralCount: 0,
        platformBreakdown: {},
      };
    }
  }

  /**
   * Get listing sync status summary
   */
  async getListingSyncStatus(locationId: string): Promise<{
    totalListings: number;
    published: number;
    pending: number;
    errors: number;
    lastSyncDate?: string;
  }> {
    try {
      const listings = await this.getLocationListings(locationId);
      
      return {
        totalListings: listings.length,
        published: listings.filter(l => l.status === 'published').length,
        pending: listings.filter(l => l.status === 'pending').length,
        errors: listings.filter(l => l.status === 'error').length,
        lastSyncDate: listings[0]?.lastSynced,
      };
    } catch (error) {
      console.error(`Error getting sync status for location ${locationId}:`, error);
      return {
        totalListings: 0,
        published: 0,
        pending: 0,
        errors: 0,
      };
    }
  }

  /**
   * Bulk update location information across all listings
   * Endpoint: PUT /locations/{locationId}
   */
  async bulkUpdateLocation(locationId: string, updates: {
    phone?: string;
    website?: string;
    email?: string;
    hours?: any;
    description?: string;
  }): Promise<boolean> {
    try {
      const encodedLocationId = this.encodeLocationId(locationId);
      await this.makeRequest(`/locations/${encodedLocationId}`, 'PUT', updates);
      return true;
    } catch (error) {
      console.error(`Error bulk updating location ${locationId}:`, error);
      return false;
    }
  }
}

// Export singleton instance
export const synupService = new SynupService();

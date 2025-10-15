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

import synupSDK from '@mx-inventor/synup';
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
        const errorText = await response.text();
        let errorData: any = {};
        
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { raw: errorText };
        }
        
        console.error(`🔴 Synup API error details:`, {
          status: response.status,
          statusText: response.statusText,
          endpoint,
          method,
          requestBody: body,
          responseBody: errorData,
          responseBodyJSON: JSON.stringify(errorData, null, 2) // Expand nested objects
        });
        
        throw new Error(
          `Synup API error (${response.status}): ${errorData.message || errorData.error || response.statusText}`
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
   * Create a new location in Synup using the official SDK
   * The SDK handles GraphQL formatting automatically
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
      // Map category to Synup sub_category_id (optional, use default if not provided)
      let subCategoryId: number | undefined;
      if (locationData.category) {
        const mappedCategoryId = getCategoryId(locationData.category);
        if (mappedCategoryId) {
          subCategoryId = parseInt(mappedCategoryId);
        }
      }

      // Format phone number (remove all non-digits)
      const formattedPhone = formatPhoneNumber(locationData.phone);

      // Get state ISO code (e.g., "NY" for New York)
      const stateIso = this.getStateIso(locationData.state);
      
      // Get country ISO code (e.g., "US" for United States)
      const countryIso = locationData.country === 'United States' ? 'US' : 
                         locationData.country === 'Canada' ? 'CA' : 
                         locationData.country;

      // Transform to Synup SDK format
      const synupPayload = {
        name: locationData.name,
        street: locationData.address,
        city: locationData.city,
        stateIso,
        countryIso,
        postalCode: locationData.postalCode,
        phone: formattedPhone,
        subCategoryId,
        bizUrl: locationData.website || undefined,
        ownerEmail: locationData.email || undefined,
      };

      console.log('🔵 Synup SDK: Creating location with payload:', synupPayload);

      // Use official Synup SDK
      const synup = synupSDK(this.apiKey);
      const response = await synup.Locations.create(synupPayload);

      console.log('🟢 Synup SDK: Location created successfully:', response);
      
      return response as any;
    } catch (error: any) {
      console.error('🔴 Synup SDK: Error creating location:', {
        message: error?.message || 'Unknown error',
        response: error?.response?.data,
        status: error?.response?.status,
        stack: error?.stack,
        fullError: error
      });
      throw error; // Re-throw so the route handler can provide proper error message to user
    }
  }

  /**
   * Convert state name to ISO code
   */
  private getStateIso(stateName: string): string {
    const stateMap: Record<string, string> = {
      'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
      'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
      'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
      'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
      'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
      'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
      'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
      'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
      'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
      'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
      // Canadian provinces
      'Alberta': 'AB', 'British Columbia': 'BC', 'Manitoba': 'MB', 'New Brunswick': 'NB',
      'Newfoundland and Labrador': 'NL', 'Northwest Territories': 'NT', 'Nova Scotia': 'NS',
      'Nunavut': 'NU', 'Ontario': 'ON', 'Prince Edward Island': 'PE', 'Quebec': 'QC',
      'Saskatchewan': 'SK', 'Yukon': 'YT'
    };
    
    return stateMap[stateName] || stateName;
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

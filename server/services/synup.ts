/**
 * Synup API Service
 * 
 * Integrates with Synup's Listings Management and Reputation Management APIs using official SDK
 * - 200+ directory listings synchronization
 * - Review management across 80+ platforms
 * - White-label API capabilities
 * 
 * API Documentation: https://developer.synup.com/docs/
 * SDK: @mx-inventor/synup v1.1.2
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
  private sdk: any; // Synup SDK instance
  private baseUrl = 'https://api.synup.com/api/v4'; // For raw API calls when SDK doesn't cover it
  
  constructor() {
    this.apiKey = process.env.SYNUP_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ SYNUP_API_KEY not configured - Synup integration will fail');
      this.sdk = null;
    } else {
      // Initialize Synup SDK with API key
      this.sdk = synupSDK(this.apiKey);
      console.log('✅ Synup SDK initialized with API key');
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
   * Get all locations for the account using Synup SDK
   * SDK Method: Locations.list()
   * Returns: GraphQL response with edges[] structure
   */
  async getAllLocations(): Promise<SynupLocation[]> {
    if (!this.sdk) {
      console.warn('⚠️ Synup SDK not initialized - returning empty locations');
      return [];
    }

    try {
      const response = await this.sdk.Locations.list();
      
      // GraphQL response has edges[] structure
      const edges = response.edges || [];
      const locations = edges.map((edge: any) => {
        const node = edge.node;
        return {
          id: node.accountId?.toString() || node.uid,
          name: node.name || node.businessName || '',
          address: `${node.street || ''}${node.street1 ? ' ' + node.street1 : ''}`.trim(),
          city: node.city || '',
          state: node.stateIso || node.stateName || '',
          country: node.countryIso || '',
          postalCode: node.postalCode || node.zipcode || '',
          phone: node.phone || node.primaryPhone || '',
          website: node.bizUrl || node.website || '',
          email: node.email || '',
          category: node.subCategoryName || node.categoryName || '',
          status: node.approved || 'PENDING',
          createdAt: node.createdDate || new Date().toISOString(),
          updatedAt: node.updatedAt || new Date().toISOString(),
        };
      });
      
      console.log(`✅ Fetched ${locations.length} locations from Synup`);
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
    // Development mode: Return mock location if no API key configured
    if (!this.apiKey || this.apiKey.trim() === '') {
      console.warn('⚠️ Synup SDK: No valid API key - returning mock location for development');
      const mockLocation: SynupLocation = {
        id: `mock-${Date.now()}`,
        name: locationData.name,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        postalCode: locationData.postalCode,
        phone: locationData.phone,
        website: locationData.website,
        email: locationData.email,
        category: locationData.category,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockLocation;
    }

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

      // Use official Synup SDK with error handling
      const synup = synupSDK(this.apiKey);
      const response = await synup.Locations.create(synupPayload);

      console.log('🟢 Synup SDK: Location created successfully');
      
      return response as any;
    } catch (error: any) {
      console.error('🔴 Synup SDK: Error creating location:', {
        message: error?.message || 'Unknown error',
        status: error?.response?.status
      });
      
      // Return null instead of throwing to prevent server crashes
      return null;
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
   * Uses SDK Listings methods
   */
  async getLocationListings(locationId: string): Promise<SynupListing[]> {
    if (!this.sdk) {
      console.warn('⚠️ Synup SDK not initialized');
      return [];
    }

    try {
      console.log(`📋 Fetching listings for location ${locationId}...`);
      
      // Try SDK Listings methods (may not work for all account types)
      let listings: any[] = [];
      
      try {
        const premiumListings = await this.sdk.Listings.getPremium(parseInt(locationId));
        if (premiumListings && premiumListings.length > 0) {
          listings = [...listings, ...premiumListings];
        }
      } catch (e) {
        console.log('Premium listings not available for this account');
      }
      
      try {
        const additionalListings = await this.sdk.Listings.getAdittional(parseInt(locationId));
        if (additionalListings && additionalListings.length > 0) {
          listings = [...listings, ...additionalListings];
        }
      } catch (e) {
        console.log('Additional listings not available for this account');
      }
      
      // Map to our format
      return listings.map((listing: any) => ({
        id: listing.id || listing.listingId,
        locationId: locationId,
        platform: listing.siteName || listing.platform || 'unknown',
        status: listing.status || 'pending',
        url: listing.url || listing.listingUrl,
        lastSynced: listing.lastSynced || new Date().toISOString(),
        syncStatus: listing.syncStatus || 'pending',
        visibility: listing.visibility !== false
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
   * Uses SDK Interactions methods
   */
  async getLocationReviews(locationId: string, options?: {
    platform?: string;
    rating?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<SynupReview[]> {
    if (!this.sdk) {
      console.warn('⚠️ Synup SDK not initialized');
      return [];
    }

    try {
      console.log(`⭐ Fetching reviews for location ${locationId}...`);
      
      // Use SDK Interactions method
      const response = await this.sdk.Interactions.getByLocationId(parseInt(locationId));
      
      // Handle different response formats
      const interactions = response?.edges?.map((edge: any) => edge.node) || 
                          response?.data?.interactions || 
                          response?.interactions || 
                          response || 
                          [];
      
      if (!Array.isArray(interactions)) {
        console.log('No reviews found or unexpected format:', typeof interactions);
        return [];
      }
      
      // Map to our review format
      return interactions.map((interaction: any) => ({
        id: interaction.id || interaction.interactionId,
        locationId: locationId,
        platform: interaction.siteName || interaction.platform || interaction.source || 'unknown',
        rating: interaction.rating || interaction.stars || 0,
        reviewText: interaction.text || interaction.reviewText || interaction.content || '',
        reviewerName: interaction.reviewerName || interaction.author || interaction.name || 'Anonymous',
        reviewDate: interaction.createdAt || interaction.reviewDate || interaction.date || new Date().toISOString(),
        response: interaction.response?.text || interaction.responseText || interaction.response,
        responseDate: interaction.response?.createdAt || interaction.responseDate,
        sentiment: this.calculateSentiment(interaction.rating || interaction.stars || 0),
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

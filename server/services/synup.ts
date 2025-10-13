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
  private baseUrl = 'https://api.synup.com/v1'; // Base API URL
  
  constructor() {
    this.apiKey = process.env.SYNUP_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ SYNUP_API_KEY not configured - Synup integration will fail');
    } else {
      console.log('✅ Synup API Service initialized');
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
   */
  async getAllLocations(): Promise<SynupLocation[]> {
    try {
      const response = await this.makeRequest<{ locations: SynupLocation[] }>('/locations');
      return response.locations || [];
    } catch (error) {
      console.error('Error fetching Synup locations:', error);
      return [];
    }
  }

  /**
   * Get a specific location by ID
   */
  async getLocation(locationId: string): Promise<SynupLocation | null> {
    try {
      const response = await this.makeRequest<{ location: SynupLocation }>(`/locations/${locationId}`);
      return response.location || null;
    } catch (error) {
      console.error(`Error fetching Synup location ${locationId}:`, error);
      return null;
    }
  }

  /**
   * Create a new location in Synup
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
      const response = await this.makeRequest<{ location: SynupLocation }>(
        '/locations',
        'POST',
        locationData
      );
      return response.location || null;
    } catch (error) {
      console.error('Error creating Synup location:', error);
      return null;
    }
  }

  /**
   * Get all listings for a location across all platforms
   */
  async getLocationListings(locationId: string): Promise<SynupListing[]> {
    try {
      const response = await this.makeRequest<{ listings: SynupListing[] }>(
        `/locations/${locationId}/listings`
      );
      return response.listings || [];
    } catch (error) {
      console.error(`Error fetching listings for location ${locationId}:`, error);
      return [];
    }
  }

  /**
   * Sync/update a location's listings across all platforms
   */
  async syncLocationListings(locationId: string): Promise<boolean> {
    try {
      await this.makeRequest(`/locations/${locationId}/sync`, 'POST');
      return true;
    } catch (error) {
      console.error(`Error syncing listings for location ${locationId}:`, error);
      return false;
    }
  }

  /**
   * Get all reviews for a location
   */
  async getLocationReviews(locationId: string, options?: {
    platform?: string;
    rating?: number;
    limit?: number;
  }): Promise<SynupReview[]> {
    try {
      const queryParams = new URLSearchParams();
      if (options?.platform) queryParams.append('platform', options.platform);
      if (options?.rating) queryParams.append('rating', options.rating.toString());
      if (options?.limit) queryParams.append('limit', options.limit.toString());
      
      const endpoint = `/locations/${locationId}/reviews${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await this.makeRequest<{ reviews: SynupReview[] }>(endpoint);
      return response.reviews || [];
    } catch (error) {
      console.error(`Error fetching reviews for location ${locationId}:`, error);
      return [];
    }
  }

  /**
   * Respond to a review using Synup's AI-powered response system
   */
  async respondToReview(reviewId: string, responseText: string, useAI: boolean = false): Promise<boolean> {
    try {
      const payload = useAI 
        ? { aiGenerated: true }
        : { response: responseText };
        
      await this.makeRequest(`/reviews/${reviewId}/respond`, 'POST', payload);
      return true;
    } catch (error) {
      console.error(`Error responding to review ${reviewId}:`, error);
      return false;
    }
  }

  /**
   * Get review analytics and sentiment analysis
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
      const response = await this.makeRequest<any>(`/locations/${locationId}/reviews/analytics`);
      return {
        averageRating: response.averageRating || 0,
        totalReviews: response.totalReviews || 0,
        positiveCount: response.sentiment?.positive || 0,
        negativeCount: response.sentiment?.negative || 0,
        neutralCount: response.sentiment?.neutral || 0,
        platformBreakdown: response.platformBreakdown || {},
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
   */
  async bulkUpdateLocation(locationId: string, updates: {
    phone?: string;
    website?: string;
    email?: string;
    hours?: any;
    description?: string;
  }): Promise<boolean> {
    try {
      await this.makeRequest(`/locations/${locationId}`, 'PUT', updates);
      return true;
    } catch (error) {
      console.error(`Error bulk updating location ${locationId}:`, error);
      return false;
    }
  }
}

// Export singleton instance
export const synupService = new SynupService();

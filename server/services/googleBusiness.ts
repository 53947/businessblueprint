interface GoogleBusinessData {
  placeId?: string;
  name: string;
  address: string;
  phone: string;
  website?: string;
  rating?: number;
  userRatingsTotal?: number;
  businessStatus?: string;
  types?: string[];
  photos?: string[];
  reviews?: GoogleReview[];
  openingHours?: any;
}

interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  time: number;
}

export class GoogleBusinessService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("Google API key is required");
    }
  }

  async searchBusiness(businessName: string, address: string): Promise<GoogleBusinessData | null> {
    try {
      const query = `${businessName} ${address}`;
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
        return null;
      }

      const place = searchData.results[0];
      const placeId = place.place_id;

      // Get detailed place information
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,business_status,types,photos,reviews,opening_hours&key=${this.apiKey}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (detailsData.status !== 'OK' || !detailsData.result) {
        return null;
      }

      const result = detailsData.result;
      
      return {
        placeId,
        name: result.name || businessName,
        address: result.formatted_address || address,
        phone: result.formatted_phone_number || "",
        website: result.website,
        rating: result.rating,
        userRatingsTotal: result.user_ratings_total,
        businessStatus: result.business_status,
        types: result.types,
        photos: result.photos?.map((photo: any) => 
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${this.apiKey}`
        ),
        reviews: result.reviews?.slice(0, 5).map((review: any) => ({
          authorName: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.time
        })),
        openingHours: result.opening_hours
      };
    } catch (error) {
      console.error('Error fetching Google Business data:', error);
      return null;
    }
  }

  calculatePresenceScore(data: GoogleBusinessData | null): {
    overallScore: number;
    scores: {
      visibility: number;
      reviews: number;
      completeness: number;
      engagement: number;
    };
    insights: string[];
  } {
    if (!data) {
      return {
        overallScore: 15,
        scores: {
          visibility: 0,
          reviews: 0,
          completeness: 15,
          engagement: 0
        },
        insights: [
          "No Google Business Profile found",
          "Missing from Google Search results",
          "Need to claim and verify Google Business Profile"
        ]
      };
    }

    const scores = {
      visibility: this.calculateVisibilityScore(data),
      reviews: this.calculateReviewScore(data),
      completeness: this.calculateCompletenessScore(data),
      engagement: this.calculateEngagementScore(data)
    };

    const overallScore = Math.round(
      (scores.visibility + scores.reviews + scores.completeness + scores.engagement) / 4
    );

    const insights = this.generateInsights(data, scores);

    return { overallScore, scores, insights };
  }

  private calculateVisibilityScore(data: GoogleBusinessData): number {
    let score = 0;
    if (data.placeId) score += 30;
    if (data.businessStatus === 'OPERATIONAL') score += 20;
    if (data.types && data.types.length > 0) score += 15;
    if (data.photos && data.photos.length > 0) score += 20;
    if (data.openingHours) score += 15;
    return Math.min(score, 140);
  }

  private calculateReviewScore(data: GoogleBusinessData): number {
    if (!data.rating || !data.userRatingsTotal) return 10;
    
    let score = 0;
    if (data.rating >= 4.0) score += 40;
    else if (data.rating >= 3.5) score += 30;
    else if (data.rating >= 3.0) score += 20;
    else score += 10;

    if (data.userRatingsTotal >= 50) score += 30;
    else if (data.userRatingsTotal >= 20) score += 20;
    else if (data.userRatingsTotal >= 5) score += 10;

    if (data.reviews && data.reviews.length > 0) score += 30;

    return Math.min(score, 140);
  }

  private calculateCompletenessScore(data: GoogleBusinessData): number {
    let score = 0;
    if (data.name) score += 15;
    if (data.address) score += 15;
    if (data.phone) score += 15;
    if (data.website) score += 20;
    if (data.openingHours) score += 15;
    if (data.photos && data.photos.length >= 3) score += 20;
    return Math.min(score, 140);
  }

  private calculateEngagementScore(data: GoogleBusinessData): number {
    let score = 30; // Base score for having a profile
    
    if (data.reviews && data.reviews.length > 0) {
      const recentReviews = data.reviews.filter(review => 
        Date.now() - (review.time * 1000) < 90 * 24 * 60 * 60 * 1000 // Last 90 days
      );
      if (recentReviews.length > 0) score += 40;
      else if (data.reviews.length > 0) score += 20;
    }

    if (data.photos && data.photos.length >= 5) score += 30;

    return Math.min(score, 140);
  }

  private generateInsights(data: GoogleBusinessData, scores: any): string[] {
    const insights: string[] = [];

    if (scores.visibility < 70) {
      insights.push("Improve business visibility by adding more photos and complete business hours");
    }
    if (scores.reviews < 70) {
      insights.push("Encourage more customer reviews to build trust and credibility");
    }
    if (scores.completeness < 80) {
      if (!data.website) insights.push("Add a website to your Google Business Profile");
      if (!data.phone) insights.push("Add a phone number for customer contact");
      if (!data.photos || data.photos.length < 3) insights.push("Add more high-quality photos of your business");
    }
    if (scores.engagement < 60) {
      insights.push("Respond to customer reviews and keep your business information updated");
    }

    return insights;
  }
}

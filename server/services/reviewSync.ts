/**
 * Review Sync Service
 *
 * Pulls reviews from Google Places and Yelp APIs,
 * then upserts them into the business_reviews table.
 */

import { db } from "../db";
import { businessReviews, businessListings } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import { googlePlacesService } from "./googlePlaces";
import { yelpApiService } from "./yelpApi";

interface ReviewSyncResult {
  found: number;
  created: number;
  updated: number;
  errors: { platform: string; message: string }[];
}

function classifySentiment(rating: number): "positive" | "negative" | "neutral" {
  if (rating >= 4) return "positive";
  if (rating <= 2) return "negative";
  return "neutral";
}

class ReviewSyncService {
  /**
   * Sync reviews for a client from Google and Yelp
   */
  async syncClientReviews(
    clientId: number,
    businessName: string,
    address?: string,
    phone?: string,
  ): Promise<ReviewSyncResult> {
    const result: ReviewSyncResult = { found: 0, created: 0, updated: 0, errors: [] };

    // Google reviews (from Places API)
    try {
      const google = await googlePlacesService.searchBusiness(businessName, address);
      if (google.exists && google.reviews) {
        for (const review of google.reviews) {
          result.found++;
          const platformReviewId = `google_${review.authorName}_${review.time}`;
          const upserted = await this.upsertReview(clientId, {
            platform: "google",
            platformReviewId,
            reviewerName: review.authorName || "Google User",
            rating: review.rating,
            reviewText: review.text || "",
            reviewDate: new Date(review.time * 1000),
            reviewUrl: google.placeId
              ? `https://www.google.com/maps/place/?q=place_id:${google.placeId}`
              : null,
          });
          if (upserted === "created") result.created++;
          else result.updated++;
        }
      }
    } catch (error: any) {
      result.errors.push({ platform: "google", message: error.message });
    }

    // Yelp reviews
    try {
      const yelp = await yelpApiService.searchBusiness(businessName, address, phone);
      if (yelp.exists && yelp.reviews) {
        for (const review of yelp.reviews) {
          result.found++;
          const platformReviewId = `yelp_${review.url || review.author}_${review.timeCreated}`;
          const upserted = await this.upsertReview(clientId, {
            platform: "yelp",
            platformReviewId,
            reviewerName: review.author || "Yelp User",
            rating: review.rating,
            reviewText: review.text || "",
            reviewDate: new Date(review.timeCreated),
            reviewUrl: review.url || null,
          });
          if (upserted === "created") result.created++;
          else result.updated++;
        }
      }
    } catch (error: any) {
      result.errors.push({ platform: "yelp", message: error.message });
    }

    return result;
  }

  /**
   * Upsert a review by platformReviewId
   */
  private async upsertReview(
    clientId: number,
    data: {
      platform: string;
      platformReviewId: string;
      reviewerName: string;
      rating: number;
      reviewText: string;
      reviewDate: Date;
      reviewUrl: string | null;
    },
  ): Promise<"created" | "updated"> {
    const existing = await db
      .select()
      .from(businessReviews)
      .where(
        and(
          eq(businessReviews.clientId, clientId),
          eq(businessReviews.platformReviewId, data.platformReviewId),
        ),
      )
      .limit(1);

    const sentiment = classifySentiment(data.rating);

    if (existing.length > 0) {
      await db
        .update(businessReviews)
        .set({
          reviewerName: data.reviewerName,
          rating: data.rating,
          reviewText: data.reviewText,
          sentiment,
          updatedAt: new Date(),
        })
        .where(eq(businessReviews.id, existing[0].id));
      return "updated";
    }

    await db.insert(businessReviews).values({
      clientId,
      platform: data.platform,
      platformReviewId: data.platformReviewId,
      reviewerName: data.reviewerName,
      rating: data.rating,
      reviewText: data.reviewText,
      reviewDate: data.reviewDate,
      sentiment,
      reviewUrl: data.reviewUrl,
    });
    return "created";
  }

  /**
   * Get all reviews for a client
   */
  async getClientReviews(clientId: number) {
    return db
      .select()
      .from(businessReviews)
      .where(eq(businessReviews.clientId, clientId))
      .orderBy(desc(businessReviews.reviewDate));
  }

  /**
   * Get review analytics for a client
   */
  async getClientReviewAnalytics(clientId: number) {
    const reviews = await this.getClientReviews(clientId);

    const totalReviews = reviews.length;
    const positiveCount = reviews.filter((r) => r.sentiment === "positive").length;
    const negativeCount = reviews.filter((r) => r.sentiment === "negative").length;
    const neutralCount = reviews.filter((r) => r.sentiment === "neutral").length;
    const respondedCount = reviews.filter((r) => r.response).length;
    const responseRate = totalReviews > 0 ? Math.round((respondedCount / totalReviews) * 100) : 0;

    const avgRating =
      totalReviews > 0
        ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
        : 0;

    const platformBreakdown = {
      google: reviews.filter((r) => r.platform === "google").length,
      yelp: reviews.filter((r) => r.platform === "yelp").length,
      facebook: reviews.filter((r) => r.platform === "facebook").length,
    };

    return {
      averageRating: avgRating,
      totalReviews,
      positiveCount,
      negativeCount,
      neutralCount,
      responseRate,
      platformBreakdown,
    };
  }

  /**
   * Save a response to a review
   */
  async respondToReview(reviewId: number, response: string, isAI: boolean = false) {
    await db
      .update(businessReviews)
      .set({
        response,
        responseDate: new Date(),
        isAIGenerated: isAI,
        updatedAt: new Date(),
      })
      .where(eq(businessReviews.id, reviewId));
  }
}

export const reviewSyncService = new ReviewSyncService();

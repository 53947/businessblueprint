/**
 * Review Sync Service
 *
 * Pulls reviews from Google Places and Yelp APIs,
 * then upserts them into the business_reviews table.
 */

import { db } from "../db";
import { businessReviews, businessListings } from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
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
          const platformReviewId = `google_${review.author}_${review.time}`;
          const upserted = await this.upsertReview(clientId, {
            platform: "google",
            platformReviewId,
            reviewerName: review.author || "Google User",
            rating: review.rating,
            reviewText: review.text || "",
            reviewDate: new Date(review.time * 1000),
            reviewUrl: google.placeId
              ? `https://www.google.com/maps/place/?q=place_id:${google.placeId}`
              : null,
          });
          if (upserted === "created") result.created++;
          else result.updated++;

          // Attempt to match reviewer to CRM contact and log timeline event
          try {
            const { crmContacts } = await import('@shared/schema');
            const { logContactActivity } = await import('./timeline-logger');

            const nameParts = (review.author || '').trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            if (firstName) {
              const contacts = await db
                .select()
                .from(crmContacts)
                .where(
                  and(
                    eq(crmContacts.clientId, clientId),
                    sql`LOWER(${crmContacts.firstName}) = LOWER(${firstName})`,
                    lastName ? sql`LOWER(${crmContacts.lastName}) = LOWER(${lastName})` : sql`1=1`,
                  )
                );

              if (contacts.length === 1) {
                await logContactActivity({
                  clientId,
                  contactId: contacts[0].id,
                  eventType: 'review_received',
                  title: `Left a ${review.rating}-star review on google`,
                  description: (review.text || '').substring(0, 200) || undefined,
                  sourceApp: 'elevate',
                  sourceEntityType: 'review',
                  sourceEntityId: platformReviewId,
                  metadata: { rating: review.rating, platform: 'google' },
                });
              }
            }
          } catch (matchErr) {
            console.error('[ReviewSync] Timeline logging error (non-blocking):', matchErr);
          }
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

          // Attempt to match reviewer to CRM contact and log timeline event
          try {
            const { crmContacts } = await import('@shared/schema');
            const { logContactActivity } = await import('./timeline-logger');

            const nameParts = (review.author || '').trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            if (firstName) {
              const contacts = await db
                .select()
                .from(crmContacts)
                .where(
                  and(
                    eq(crmContacts.clientId, clientId),
                    sql`LOWER(${crmContacts.firstName}) = LOWER(${firstName})`,
                    lastName ? sql`LOWER(${crmContacts.lastName}) = LOWER(${lastName})` : sql`1=1`,
                  )
                );

              if (contacts.length === 1) {
                await logContactActivity({
                  clientId,
                  contactId: contacts[0].id,
                  eventType: 'review_received',
                  title: `Left a ${review.rating}-star review on yelp`,
                  description: (review.text || '').substring(0, 200) || undefined,
                  sourceApp: 'elevate',
                  sourceEntityType: 'review',
                  sourceEntityId: platformReviewId,
                  metadata: { rating: review.rating, platform: 'yelp' },
                });
              }
            }
          } catch (matchErr) {
            console.error('[ReviewSync] Timeline logging error (non-blocking):', matchErr);
          }
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
   * Get a single review by ID
   */
  async getReviewById(reviewId: number) {
    const [review] = await db
      .select()
      .from(businessReviews)
      .where(eq(businessReviews.id, reviewId));
    return review || null;
  }

  /**
   * Save a response to a review, push to Google if possible, and log to CRM timeline
   */
  async respondToReview(reviewId: number, response: string, isAI: boolean = false) {
    // 1. Save to database
    await db
      .update(businessReviews)
      .set({
        response,
        responseDate: new Date(),
        isAIGenerated: isAI,
        updatedAt: new Date(),
      })
      .where(eq(businessReviews.id, reviewId));

    // 2. Get the full review record for API push and timeline logging
    const [review] = await db
      .select()
      .from(businessReviews)
      .where(eq(businessReviews.id, reviewId))
      .limit(1);

    if (!review) return;

    // 3. Attempt Google API push (only for Google reviews)
    if (review.platform === 'google' && review.platformReviewId) {
      try {
        const { socialMediaAccounts } = await import('@shared/schema');
        const [googleAccount] = await db
          .select()
          .from(socialMediaAccounts)
          .where(
            and(
              eq(socialMediaAccounts.clientId, review.clientId),
              eq(socialMediaAccounts.platform, 'google_business'),
              eq(socialMediaAccounts.isActive, true),
            )
          )
          .limit(1);

        if (googleAccount?.accessToken && googleAccount?.platformAccountId) {
          const result = await googlePlacesService.replyToReview(
            googleAccount.platformAccountId.split('/')[0] || '',
            googleAccount.platformAccountId,
            review.platformReviewId.replace('google_', ''),
            response,
            googleAccount.accessToken,
          );

          if (!result.success) {
            console.warn(`[ReviewSync] Google API push failed for review ${reviewId}: ${result.error}. Response saved locally.`);
          }
        } else {
          console.log(`[ReviewSync] No Google Business credentials for client ${review.clientId}. Response saved locally only.`);
        }
      } catch (apiError) {
        console.error('[ReviewSync] Google API push error (response saved locally):', apiError);
      }
    }
    // Note: Yelp does not support automated review replies via API.

    // 4. Contact matching — attempt to find a CRM contact matching this reviewer
    try {
      const { crmContacts } = await import('@shared/schema');
      const { logContactActivity } = await import('./timeline-logger');

      const nameParts = review.reviewerName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      let matchedContact = null;

      if (firstName && lastName) {
        const [contact] = await db
          .select()
          .from(crmContacts)
          .where(
            and(
              eq(crmContacts.clientId, review.clientId),
              sql`LOWER(${crmContacts.firstName}) = LOWER(${firstName})`,
              sql`LOWER(${crmContacts.lastName}) = LOWER(${lastName})`,
            )
          )
          .limit(1);
        matchedContact = contact;
      }

      if (!matchedContact && firstName && firstName.length > 2) {
        const allMatches = await db
          .select()
          .from(crmContacts)
          .where(
            and(
              eq(crmContacts.clientId, review.clientId),
              sql`LOWER(${crmContacts.firstName}) = LOWER(${firstName})`,
            )
          );
        if (allMatches.length === 1) {
          matchedContact = allMatches[0];
        }
      }

      if (matchedContact) {
        await logContactActivity({
          clientId: review.clientId,
          contactId: matchedContact.id,
          eventType: 'review_responded',
          title: `You responded to their ${review.rating}-star review on ${review.platform}`,
          description: response.substring(0, 200),
          sourceApp: 'elevate',
          sourceEntityType: 'review',
          sourceEntityId: String(review.id),
          metadata: {
            rating: review.rating,
            platform: review.platform,
            reviewId: review.id,
            isAIGenerated: isAI,
          },
        });
      }
    } catch (matchError) {
      console.error('[ReviewSync] Contact matching error (non-blocking):', matchError);
    }
  }
}

export const reviewSyncService = new ReviewSyncService();

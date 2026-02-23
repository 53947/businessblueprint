/**
 * Listing Sync Service
 *
 * Discovers business listings via Google Places and Yelp APIs,
 * then upserts results into the business_listings table.
 */

import { db } from "../db";
import { businessListings } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { googlePlacesService } from "./googlePlaces";
import { yelpApiService } from "./yelpApi";

interface SyncResult {
  found: number;
  created: number;
  updated: number;
  errors: { platform: string; message: string }[];
}

class ListingSyncService {
  /**
   * Sync listings for a client by searching Google Places and Yelp
   */
  async syncClientListings(
    clientId: number,
    businessName: string,
    address?: string,
    phone?: string,
  ): Promise<SyncResult> {
    const result: SyncResult = { found: 0, created: 0, updated: 0, errors: [] };

    // Google Places
    try {
      const google = await googlePlacesService.searchBusiness(businessName, address);
      if (google.exists) {
        result.found++;
        const upserted = await this.upsertListing(clientId, "google_business", {
          platformId: google.placeId || null,
          name: google.name || businessName,
          address: google.address || null,
          phone: google.phone || null,
          website: google.website || null,
          hours: google.hours?.join("; ") || null,
          rating: google.rating?.toString() || null,
          reviewCount: google.reviewCount || 0,
          url: google.placeId
            ? `https://www.google.com/maps/place/?q=place_id:${google.placeId}`
            : null,
          platformData: google,
        });
        if (upserted === "created") result.created++;
        else result.updated++;
      }
    } catch (error: any) {
      result.errors.push({ platform: "google_business", message: error.message });
    }

    // Yelp
    try {
      const yelp = await yelpApiService.searchBusiness(businessName, address, phone);
      if (yelp.exists) {
        result.found++;
        const upserted = await this.upsertListing(clientId, "yelp", {
          platformId: yelp.id || null,
          name: yelp.name || businessName,
          address: yelp.address || null,
          phone: yelp.phone || null,
          website: yelp.website || null,
          hours: yelp.hours?.join("; ") || null,
          rating: yelp.rating?.toString() || null,
          reviewCount: yelp.reviewCount || 0,
          url: yelp.website || null,
          platformData: yelp,
        });
        if (upserted === "created") result.created++;
        else result.updated++;
      }
    } catch (error: any) {
      result.errors.push({ platform: "yelp", message: error.message });
    }

    return result;
  }

  /**
   * Upsert a listing: update if exists for (clientId, platform), otherwise insert.
   * Returns 'created' or 'updated'.
   */
  private async upsertListing(
    clientId: number,
    platform: string,
    data: {
      platformId: string | null;
      name: string;
      address: string | null;
      phone: string | null;
      website: string | null;
      hours: string | null;
      rating: string | null;
      reviewCount: number;
      url: string | null;
      platformData: any;
    },
  ): Promise<"created" | "updated"> {
    const existing = await db
      .select()
      .from(businessListings)
      .where(and(eq(businessListings.clientId, clientId), eq(businessListings.platform, platform)))
      .limit(1);

    const now = new Date();

    if (existing.length > 0) {
      await db
        .update(businessListings)
        .set({
          platformId: data.platformId,
          name: data.name,
          address: data.address,
          phone: data.phone,
          website: data.website,
          hours: data.hours,
          rating: data.rating,
          reviewCount: data.reviewCount,
          url: data.url,
          platformData: data.platformData,
          lastSyncedAt: now,
          syncStatus: "synced",
          syncError: null,
          status: "active",
          updatedAt: now,
        })
        .where(eq(businessListings.id, existing[0].id));
      return "updated";
    }

    await db.insert(businessListings).values({
      clientId,
      platform,
      platformId: data.platformId,
      name: data.name,
      address: data.address,
      phone: data.phone,
      website: data.website,
      hours: data.hours,
      rating: data.rating,
      reviewCount: data.reviewCount,
      url: data.url,
      platformData: data.platformData,
      source: "sync",
      status: "active",
      lastSyncedAt: now,
      syncStatus: "synced",
    });
    return "created";
  }
}

export const listingSyncService = new ListingSyncService();

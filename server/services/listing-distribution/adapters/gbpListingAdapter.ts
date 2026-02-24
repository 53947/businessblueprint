import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Google Business Profile Listing Management Adapter
 * Direct API integration for creating/updating GBP listings.
 * Reuses GOOGLE_PLACES_API_KEY + GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET.
 */
export class GbpListingAdapter extends BaseListingAdapter {
  readonly adapterKey = "gbp";
  readonly displayName = "Google Business Profile";

  private apiKey: string;
  private baseUrl = "https://mybusinessbusinessinformation.googleapis.com/v1";

  constructor() {
    super();
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
    if (!this.apiKey) {
      console.warn("⚠️ GOOGLE_PLACES_API_KEY not set — GBP listing adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Google Business Profile not configured" };
    }

    try {
      const payload = this.mapToGbpFormat(data);
      const response = await fetch(`${this.baseUrl}/accounts/-/locations?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }

      const locationName = result.name || "";
      return {
        success: true,
        externalId: locationName,
        externalUrl: result.metadata?.mapsUri || undefined,
        status: "submitted",
        message: "Location submitted to Google Business Profile — verification may be required",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Google Business Profile not configured" };
    }

    try {
      const payload = this.mapToGbpFormat(data);
      const response = await fetch(`${this.baseUrl}/${externalId}?key=${this.apiKey}&updateMask=title,storefrontAddress,phoneNumbers,websiteUri,regularHours,profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return { success: true, externalId, status: "processing", message: "GBP listing updated", rawResponse: result };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async verifyListing(externalId: string): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Google Business Profile not configured" };
    }

    try {
      const response = await fetch(`${this.baseUrl}/${externalId}?key=${this.apiKey}`);
      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }

      const isVerified = result.metadata?.hasVoiceOfMerchant === true;
      return {
        success: true,
        externalId,
        externalUrl: result.metadata?.mapsUri || undefined,
        status: isVerified ? "active" : "processing",
        message: isVerified ? "Listing is verified and active" : "Listing exists but not yet verified",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  getCapabilities(): AdapterCapabilities {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: true,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: true,
    };
  }

  getDownstreamDirectories(): string[] {
    return ["Google Business Profile", "Google Maps", "Google Search Local Pack"];
  }

  private mapToGbpFormat(data: ListingData) {
    const result: Record<string, any> = {
      title: data.businessName,
      storefrontAddress: {
        addressLines: [data.address1, data.address2].filter(Boolean),
        locality: data.city,
        administrativeArea: data.state,
        postalCode: data.zip,
        regionCode: data.country,
      },
      phoneNumbers: { primaryPhone: data.phone },
    };

    if (data.website) result.websiteUri = data.website;
    if (data.description) result.profile = { description: data.description };

    if (data.hours) {
      const dayMap: Record<string, string> = {
        monday: "MONDAY", tuesday: "TUESDAY", wednesday: "WEDNESDAY",
        thursday: "THURSDAY", friday: "FRIDAY", saturday: "SATURDAY", sunday: "SUNDAY",
      };
      result.regularHours = {
        periods: Object.entries(data.hours)
          .filter(([, v]) => v?.open && v?.close)
          .map(([day, v]) => ({
            openDay: dayMap[day] || day.toUpperCase(),
            openTime: { hours: parseInt(v.open.split(":")[0]), minutes: parseInt(v.open.split(":")[1]) || 0 },
            closeDay: dayMap[day] || day.toUpperCase(),
            closeTime: { hours: parseInt(v.close.split(":")[0]), minutes: parseInt(v.close.split(":")[1]) || 0 },
          })),
      };
    }

    return result;
  }
}

import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Apple Business Connect Adapter
 * Direct API for managing listings on Apple Maps, Apple Wallet, Siri, Safari Suggestions.
 */
export class AppleConnectAdapter extends BaseListingAdapter {
  readonly adapterKey = "apple";
  readonly displayName = "Apple Business Connect";

  private apiToken: string;
  private baseUrl = "https://businessconnect.apple.com/api/v1";

  constructor() {
    super();
    this.apiToken = process.env.APPLE_BUSINESS_CONNECT_TOKEN || "";
    if (!this.apiToken) {
      console.warn("⚠️ APPLE_BUSINESS_CONNECT_TOKEN not set — Apple Connect adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.apiToken;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Apple Business Connect not configured" };
    }

    try {
      const payload = this.mapToAppleFormat(data);
      const response = await fetch(`${this.baseUrl}/locations`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return {
        success: true,
        externalId: result.locationId || result.id,
        status: "submitted",
        message: "Submitted to Apple Business Connect — verification and review required",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Apple Business Connect not configured" };
    }

    try {
      const payload = this.mapToAppleFormat(data);
      const response = await fetch(`${this.baseUrl}/locations/${externalId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return { success: true, externalId, status: "processing", message: "Apple listing updated", rawResponse: result };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  getCapabilities(): AdapterCapabilities {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: false,
      supportsVerify: true,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: false,
    };
  }

  getDownstreamDirectories(): string[] {
    return ["Apple Maps", "Apple Wallet", "Siri", "Safari Suggestions"];
  }

  private mapToAppleFormat(data: ListingData) {
    return {
      name: data.businessName,
      address: {
        streetAddress: data.address1,
        streetAddress2: data.address2 || undefined,
        city: data.city,
        state: data.state,
        postalCode: data.zip,
        country: data.country,
      },
      phoneNumber: data.phone,
      websiteUrl: data.website || undefined,
      email: data.email || undefined,
      categories: data.categories || [],
      description: data.description || undefined,
      hours: data.hours ? this.formatAppleHours(data.hours) : undefined,
      logoUrl: data.logoUrl || undefined,
      coverPhotoUrl: data.coverPhotoUrl || undefined,
    };
  }

  private formatAppleHours(hours: Record<string, { open: string; close: string }>) {
    return Object.entries(hours)
      .filter(([, v]) => v?.open && v?.close)
      .map(([day, v]) => ({
        day: day.toUpperCase(),
        openTime: v.open,
        closeTime: v.close,
      }));
  }
}

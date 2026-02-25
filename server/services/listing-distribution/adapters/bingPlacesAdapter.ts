import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Bing Places for Business Adapter
 * Direct API for managing listings on Bing Maps, Cortana, MSN Local.
 */
export class BingPlacesAdapter extends BaseListingAdapter {
  readonly adapterKey = "bing";
  readonly displayName = "Bing Places";

  private apiKey: string;
  private baseUrl = "https://ssl.bing.com/partner/api/v1";

  constructor() {
    super();
    this.apiKey = process.env.BING_PLACES_API_KEY || "";
    if (!this.apiKey) {
      console.warn("⚠️ BING_PLACES_API_KEY not set — Bing Places adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Bing Places not configured" };
    }

    try {
      const payload = this.mapToBingFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": this.apiKey,
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
        externalId: result.id || result.businessId,
        externalUrl: result.bingUrl || undefined,
        status: "submitted",
        message: "Submitted to Bing Places — review typically takes 1-2 weeks",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Bing Places not configured" };
    }

    try {
      const payload = this.mapToBingFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses/${externalId}`, {
        method: "PUT",
        headers: {
          "Ocp-Apim-Subscription-Key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return { success: true, externalId, status: "processing", message: "Bing Places listing updated", rawResponse: result };
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
      supportsServiceArea: false,
    };
  }

  getDownstreamDirectories(): string[] {
    return ["Bing Places", "Bing Maps", "Cortana", "MSN Local", "Microsoft Edge Local", "Outlook Local"];
  }

  private mapToBingFormat(data: ListingData) {
    return {
      businessName: data.businessName,
      address: {
        addressLine1: data.address1,
        addressLine2: data.address2 || undefined,
        city: data.city,
        stateOrProvince: data.state,
        zipOrPostalCode: data.zip,
        countryOrRegion: data.country,
      },
      phone: data.phone,
      website: data.website || undefined,
      email: data.email || undefined,
      categories: data.categories || [],
      description: data.description || undefined,
      hours: data.hours || undefined,
    };
  }
}

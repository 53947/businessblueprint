import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Neustar/Localeze Aggregator Adapter
 * Feeds downstream: Bing, Yahoo, Superpages, DexKnows, CitySearch, Local.com,
 * YellowPages.com, WhitePages, AnyWho, Switchboard, InfoSpace, DogPile,
 * Addresses.com, Where To?, USSearch, PeopleSmart, and more.
 */
export class NeustarAdapter extends BaseListingAdapter {
  readonly adapterKey = "neustar";
  readonly displayName = "Neustar Localeze";

  private apiKey: string;
  private baseUrl = "https://api.neustarlocaleze.com/v1";

  constructor() {
    super();
    this.apiKey = process.env.NEUSTAR_API_KEY || "";
    if (!this.apiKey) {
      console.warn("⚠️ NEUSTAR_API_KEY not set — Neustar adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Neustar not configured" };
    }

    try {
      const payload = this.mapToNeustarFormat(data);
      const response = await fetch(`${this.baseUrl}/listings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.error || `HTTP ${response.status}`, rawResponse: result };
      }

      return {
        success: true,
        externalId: result.listingId || result.id,
        status: "submitted",
        message: "Submitted to Neustar/Localeze — downstream propagation typically takes 2-6 weeks",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Neustar not configured" };
    }

    try {
      const payload = this.mapToNeustarFormat(data);
      const response = await fetch(`${this.baseUrl}/listings/${externalId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.error || `HTTP ${response.status}`, rawResponse: result };
      }

      return { success: true, externalId, status: "processing", message: "Update submitted", rawResponse: result };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  getCapabilities(): AdapterCapabilities {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: true,
      supportsVerify: false,
      supportsPhotos: false,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: true,
    };
  }

  getDownstreamDirectories(): string[] {
    return [
      "Bing", "Yahoo", "Superpages", "DexKnows", "CitySearch",
      "Local.com", "YellowPages.com", "WhitePages", "AnyWho",
      "Switchboard", "InfoSpace", "DogPile", "Addresses.com",
      "Where To?", "USSearch", "PeopleSmart", "Neustar Localeze",
    ];
  }

  private mapToNeustarFormat(data: ListingData) {
    return {
      businessName: data.businessName,
      streetAddress: data.address1,
      streetAddress2: data.address2 || undefined,
      city: data.city,
      state: data.state,
      postalCode: data.zip,
      country: data.country,
      phone: data.phone,
      website: data.website || undefined,
      email: data.email || undefined,
      fax: data.fax || undefined,
      categories: data.categories || [],
      description: data.description || undefined,
      hours: data.hours || undefined,
      serviceArea: data.serviceArea || undefined,
    };
  }
}

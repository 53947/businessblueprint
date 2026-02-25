import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Foursquare/Factual Aggregator Adapter
 * Feeds downstream: Apple Maps, Uber, Snapchat, Samsung, HERE, TripAdvisor,
 * Waze, OpenTable, Zillow, Booking.com, MapQuest, TomTom, Navmii, Audi,
 * BMW, Mercedes, GasBuddy, Pitney Bowes, and more.
 */
export class FoursquareAdapter extends BaseListingAdapter {
  readonly adapterKey = "foursquare";
  readonly displayName = "Foursquare";

  private apiKey: string;
  private baseUrl = "https://api.foursquare.com/v3";

  constructor() {
    super();
    this.apiKey = process.env.FOURSQUARE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("⚠️ FOURSQUARE_API_KEY not set — Foursquare adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Foursquare not configured" };
    }

    try {
      const payload = this.mapToFoursquareFormat(data);
      const response = await fetch(`${this.baseUrl}/places/submit`, {
        method: "POST",
        headers: {
          "Authorization": this.apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return {
        success: true,
        externalId: result.fsq_id || result.id,
        status: "submitted",
        message: "Submitted to Foursquare — propagation to downstream directories typically takes 1-4 weeks",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message, rawResponse: null };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Foursquare not configured" };
    }

    try {
      const payload = this.mapToFoursquareFormat(data);
      const response = await fetch(`${this.baseUrl}/places/${externalId}/proposededit`, {
        method: "POST",
        headers: {
          "Authorization": this.apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return { success: true, externalId, status: "processing", message: "Update submitted for review", rawResponse: result };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  getCapabilities(): AdapterCapabilities {
    return {
      supportsCreate: true,
      supportsUpdate: true,
      supportsDelete: false,
      supportsVerify: false,
      supportsPhotos: true,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: true,
      supportsServiceArea: false,
    };
  }

  getDownstreamDirectories(): string[] {
    return [
      "Apple Maps", "Uber", "Snapchat", "Samsung", "HERE WeGo",
      "TripAdvisor", "Waze", "OpenTable", "Zillow", "Booking.com",
      "MapQuest", "TomTom", "Navmii", "Audi", "BMW", "Mercedes",
      "GasBuddy", "Pitney Bowes",
      "Skyscanner", "Trivago", "Moovit", "Citymapper", "Scout GPS", "Sygic", "Swarm",
    ];
  }

  private mapToFoursquareFormat(data: ListingData) {
    return {
      name: data.businessName,
      address: data.address1,
      address_extended: data.address2 || undefined,
      locality: data.city,
      region: data.state,
      postcode: data.zip,
      country: data.country,
      tel: data.phone,
      website: data.website || undefined,
      email: data.email || undefined,
      description: data.description || undefined,
      hours: data.hours ? this.formatHours(data.hours) : undefined,
    };
  }

  private formatHours(hours: Record<string, { open: string; close: string }>): string {
    const dayMap: Record<string, string> = {
      monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
      friday: "Fri", saturday: "Sat", sunday: "Sun",
    };
    return Object.entries(hours)
      .filter(([, v]) => v?.open && v?.close)
      .map(([day, v]) => `${dayMap[day] || day} ${v.open}-${v.close}`)
      .join("; ");
  }
}

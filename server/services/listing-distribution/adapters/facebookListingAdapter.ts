import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Facebook Business Page Listing Adapter
 * Manages business location data on Facebook/Instagram.
 */
export class FacebookListingAdapter extends BaseListingAdapter {
  readonly adapterKey = "facebook";
  readonly displayName = "Facebook Business";

  private accessToken: string;
  private apiVersion = "v18.0";
  private baseUrl: string;

  constructor() {
    super();
    this.accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "";
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
    if (!this.accessToken) {
      console.warn("⚠️ FACEBOOK_PAGE_ACCESS_TOKEN not set — Facebook listing adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.accessToken;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Facebook not configured" };
    }

    try {
      const payload = this.mapToFacebookFormat(data);
      const response = await fetch(`${this.baseUrl}/me/locations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, access_token: this.accessToken }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return {
        success: true,
        externalId: result.id,
        externalUrl: `https://facebook.com/${result.id}`,
        status: "submitted",
        message: "Business location submitted to Facebook",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Facebook not configured" };
    }

    try {
      const payload = this.mapToFacebookFormat(data);
      const response = await fetch(`${this.baseUrl}/${externalId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, access_token: this.accessToken }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        return { success: false, status: "error", message: result.error?.message || `HTTP ${response.status}`, rawResponse: result };
      }

      return {
        success: true,
        externalId,
        externalUrl: `https://facebook.com/${externalId}`,
        status: "active",
        message: "Facebook listing updated",
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
      supportsServiceArea: false,
    };
  }

  getDownstreamDirectories(): string[] {
    return ["Facebook Business", "Facebook Marketplace", "Instagram Location"];
  }

  private mapToFacebookFormat(data: ListingData) {
    const result: Record<string, any> = {
      name: data.businessName,
      phone: data.phone,
      location: {
        street: data.address1,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      },
    };

    if (data.website) result.website = data.website;
    if (data.description) result.about = data.description;
    if (data.email) result.emails = [data.email];

    if (data.hours) {
      const dayMap: Record<string, string> = {
        monday: "mon", tuesday: "tue", wednesday: "wed",
        thursday: "thu", friday: "fri", saturday: "sat", sunday: "sun",
      };
      const fbHours: Record<string, string> = {};
      Object.entries(data.hours).forEach(([day, v]) => {
        const key = dayMap[day] || day.substring(0, 3).toLowerCase();
        if (v?.open && v?.close) {
          fbHours[`${key}_1_open`] = v.open;
          fbHours[`${key}_1_close`] = v.close;
        }
      });
      result.hours = fbHours;
    }

    return result;
  }
}

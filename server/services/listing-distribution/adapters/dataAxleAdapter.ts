import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Data Axle (formerly Infogroup) Aggregator Adapter
 * Feeds downstream: 411.com, Manta, MerchantCircle, Hotfrog, Brownbook,
 * Cylex, eLocal, iGlobal, ShowMeLocal, Tupalo, ChamberofCommerce.com,
 * Factual, USCity.net, FindOpen, and more.
 */
export class DataAxleAdapter extends BaseListingAdapter {
  readonly adapterKey = "data_axle";
  readonly displayName = "Data Axle";

  private apiKey: string;
  private baseUrl = "https://api.data-axle.com/v1";

  constructor() {
    super();
    this.apiKey = process.env.DATA_AXLE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("⚠️ DATA_AXLE_API_KEY not set — Data Axle adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Data Axle not configured" };
    }

    try {
      const payload = this.mapToDataAxleFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses`, {
        method: "POST",
        headers: {
          "X-Auth-Token": this.apiKey,
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
        externalId: result.infogroup_id || result.id,
        status: "submitted",
        message: "Submitted to Data Axle — downstream propagation typically takes 2-4 weeks",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Data Axle not configured" };
    }

    try {
      const payload = this.mapToDataAxleFormat(data);
      const response = await fetch(`${this.baseUrl}/businesses/${externalId}`, {
        method: "PUT",
        headers: {
          "X-Auth-Token": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, status: "error", message: result.message || `HTTP ${response.status}`, rawResponse: result };
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
      "411.com", "Manta", "MerchantCircle", "Hotfrog", "Brownbook",
      "Cylex", "eLocal", "iGlobal", "ShowMeLocal", "Tupalo",
      "ChamberofCommerce.com", "USCity.net", "FindOpen",
      "Data Axle Reference Solutions", "Credibility.com",
    ];
  }

  private mapToDataAxleFormat(data: ListingData) {
    return {
      company_name: data.businessName,
      street: data.address1,
      street2: data.address2 || undefined,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country_code: data.country,
      phone: data.phone,
      url: data.website || undefined,
      email: data.email || undefined,
      fax: data.fax || undefined,
      sic_codes: data.categories || [],
      business_description: data.description || undefined,
      year_established: data.yearEstablished || undefined,
      employee_count: data.employeeCount || undefined,
      hours_of_operation: data.hours || undefined,
      logo_url: data.logoUrl || undefined,
      photo_urls: data.photoUrls || [],
      social_media: {
        facebook: data.facebookUrl || undefined,
        instagram: data.instagramUrl || undefined,
        linkedin: data.linkedinUrl || undefined,
        twitter: data.twitterUrl || undefined,
      },
      payment_methods: data.paymentMethods || [],
    };
  }
}

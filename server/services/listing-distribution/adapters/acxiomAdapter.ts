import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";

/**
 * Acxiom Aggregator Adapter
 * Feeds downstream: Epsilon, Oracle Data Cloud, TransUnion, Equifax,
 * Experian, LiveRamp, Acxiom AbiliTec, Acxiom InfoBase.
 */
export class AcxiomAdapter extends BaseListingAdapter {
  readonly adapterKey = "acxiom";
  readonly displayName = "Acxiom";

  private clientId: string;
  private clientSecret: string;
  private baseUrl = "https://api.acxiom.com/v1";
  private accessToken: string | null = null;
  private tokenExpiresAt = 0;

  constructor() {
    super();
    this.clientId = process.env.ACXIOM_CLIENT_ID || "";
    this.clientSecret = process.env.ACXIOM_CLIENT_SECRET || "";
    if (!this.clientId || !this.clientSecret) {
      console.warn("⚠️ ACXIOM_CLIENT_ID/ACXIOM_CLIENT_SECRET not set — Acxiom adapter disabled");
    }
  }

  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret);
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Acxiom not configured" };
    }

    try {
      const token = await this.getAccessToken();
      const payload = this.mapToAcxiomFormat(data);
      const response = await fetch(`${this.baseUrl}/business-records`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
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
        externalId: result.recordId || result.id,
        status: "submitted",
        message: "Submitted to Acxiom — propagation to consumer directories typically takes 3-6 weeks",
        rawResponse: result,
      };
    } catch (error: any) {
      return { success: false, status: "error", message: error.message };
    }
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    if (!this.isConfigured()) {
      return { success: false, status: "skipped", message: "Acxiom not configured" };
    }

    try {
      const token = await this.getAccessToken();
      const payload = this.mapToAcxiomFormat(data);
      const response = await fetch(`${this.baseUrl}/business-records/${externalId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
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
      supportsDelete: false,
      supportsVerify: false,
      supportsPhotos: false,
      supportsHours: true,
      supportsCategories: true,
      supportsDescription: true,
      supportsSocialLinks: false,
      supportsServiceArea: false,
    };
  }

  getDownstreamDirectories(): string[] {
    return [
      "Epsilon", "Oracle Data Cloud", "TransUnion", "Equifax",
      "Experian", "LiveRamp", "Acxiom AbiliTec", "Acxiom InfoBase",
    ];
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(`Acxiom auth failed: ${result.error || response.status}`);

    this.accessToken = result.access_token;
    this.tokenExpiresAt = Date.now() + (result.expires_in || 3600) * 1000 - 60000;
    return this.accessToken!;
  }

  private mapToAcxiomFormat(data: ListingData) {
    return {
      businessName: data.businessName,
      address: { line1: data.address1, line2: data.address2 || undefined, city: data.city, state: data.state, postalCode: data.zip, country: data.country },
      phone: data.phone,
      website: data.website || undefined,
      email: data.email || undefined,
      categories: data.categories || [],
      description: data.description || undefined,
      yearEstablished: data.yearEstablished || undefined,
      hours: data.hours || undefined,
    };
  }
}

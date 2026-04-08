/**
 * D&B Listing Distribution Adapter
 *
 * When a business has a verified DUNS number, D&B's data cloud
 * automatically propagates their information to 80+ directories
 * including Apple Maps, Bing, Yahoo, MapQuest, and more.
 *
 * This adapter verifies the DUNS number is active and reports
 * the distribution status. The actual propagation happens on
 * D&B's side once the business's DUNS profile is accurate.
 */

import { BaseListingAdapter, type ListingData, type SubmissionResult, type AdapterCapabilities } from "../baseListingAdapter";
import { dnbService } from "../../dnb";

export class DnBAdapter extends BaseListingAdapter {
  readonly adapterKey = "dnb";
  readonly displayName = "Dun & Bradstreet";

  isConfigured(): boolean {
    return dnbService.isConfigured;
  }

  async submitListing(data: ListingData): Promise<SubmissionResult> {
    // D&B distribution works via DUNS number verification, not direct submission.
    // The DUNS number must already be associated with the business profile.
    return {
      success: false,
      status: "skipped",
      message: "D&B distribution requires a verified DUNS number. Use the DUNS lookup in / publish to verify.",
    };
  }

  async updateListing(externalId: string, data: ListingData): Promise<SubmissionResult> {
    // Verify the DUNS number is still active
    const verification = await dnbService.verifyDuns(externalId);

    if (!verification.valid) {
      return {
        success: false,
        status: "error",
        message: `DUNS number ${externalId} is not active: ${verification.status}`,
      };
    }

    return {
      success: true,
      externalId,
      status: "active",
      message: `DUNS number ${externalId} verified as active. D&B data cloud is propagating your business information to 80+ directories.`,
    };
  }

  async verifyListing(externalId: string): Promise<SubmissionResult> {
    const verification = await dnbService.verifyDuns(externalId);

    return {
      success: verification.valid,
      externalId,
      status: verification.valid ? "active" : "error",
      message: verification.valid
        ? `Active — registered as ${verification.companyName}`
        : `Status: ${verification.status || "Unknown"}`,
    };
  }

  getCapabilities(): AdapterCapabilities {
    return {
      supportsCreate: false, // DUNS numbers are obtained through D&B, not created via API
      supportsUpdate: true,  // Can verify/refresh status
      supportsDelete: false,
      supportsVerify: true,
      supportsPhotos: false,
      supportsHours: false,
      supportsCategories: false,
      supportsDescription: false,
      supportsSocialLinks: false,
      supportsServiceArea: false,
    };
  }

  getDownstreamDirectories(): string[] {
    return [
      "Apple Maps",
      "Bing",
      "Yahoo",
      "MapQuest",
      "HERE Technologies",
      "Garmin",
      "D&B Business Directory",
      "Hoovers",
      "Creditsafe",
      "Kompass",
      "Manta",
      "DandB.com",
    ];
  }
}

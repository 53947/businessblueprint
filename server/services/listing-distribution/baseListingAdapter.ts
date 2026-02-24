/**
 * Base Listing Adapter — Abstract class for all listing distribution adapters.
 * Each adapter maps canonical business data to a platform-specific format
 * and handles submit/update/delete/verify operations.
 */

export interface ListingData {
  businessName: string;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  website?: string | null;
  email?: string | null;
  fax?: string | null;
  categories?: string[] | null;
  description?: string | null;
  shortDescription?: string | null;
  yearEstablished?: number | null;
  employeeCount?: number | null;
  hours?: Record<string, { open: string; close: string }> | null;
  specialHours?: unknown | null;
  logoUrl?: string | null;
  coverPhotoUrl?: string | null;
  photoUrls?: string[] | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
  paymentMethods?: string[] | null;
  amenities?: string[] | null;
  serviceArea?: unknown | null;
}

export interface SubmissionResult {
  success: boolean;
  externalId?: string;
  externalUrl?: string;
  status: "submitted" | "processing" | "active" | "error" | "rejected" | "skipped";
  message?: string;
  rawResponse?: unknown;
}

export interface AdapterCapabilities {
  supportsCreate: boolean;
  supportsUpdate: boolean;
  supportsDelete: boolean;
  supportsVerify: boolean;
  supportsPhotos: boolean;
  supportsHours: boolean;
  supportsCategories: boolean;
  supportsDescription: boolean;
  supportsSocialLinks: boolean;
  supportsServiceArea: boolean;
}

export abstract class BaseListingAdapter {
  abstract readonly adapterKey: string;
  abstract readonly displayName: string;

  abstract isConfigured(): boolean;

  abstract submitListing(data: ListingData): Promise<SubmissionResult>;

  abstract updateListing(externalId: string, data: ListingData): Promise<SubmissionResult>;

  async deleteListing(externalId: string): Promise<SubmissionResult> {
    return { success: false, status: "error", message: `${this.displayName} does not support deletion` };
  }

  async verifyListing(externalId: string): Promise<SubmissionResult> {
    return { success: false, status: "error", message: `${this.displayName} does not support verification` };
  }

  abstract getCapabilities(): AdapterCapabilities;

  abstract getDownstreamDirectories(): string[];
}

/**
 * Dun & Bradstreet API Integration Service
 *
 * Handles DUNS number lookup, verification, and company profile retrieval
 * via the D&B Direct+ API.
 *
 * Requires environment variables: DNB_API_KEY, DNB_API_SECRET
 */

interface DnBTokenResponse {
  access_token: string;
  expiresIn: number;
  token_type: string;
}

interface DnBMatchCandidate {
  organization: {
    duns: string;
    primaryName: string;
    primaryAddress?: {
      addressLocality?: { name: string };
      addressRegion?: { name: string; abbreviatedName?: string };
      postalCode?: string;
      streetAddress?: { line1?: string };
      addressCountry?: { isoAlpha2Code: string };
    };
    telephone?: { telephoneNumber?: string };
    dunsControlStatus?: {
      operatingStatus?: { description: string };
    };
    numberOfEmployees?: Array<{ value: number }>;
    financials?: Array<{ yearlyRevenue?: Array<{ value: number; currencyISOAlpha3Code: string }> }>;
  };
  matchQualityInformation?: {
    confidenceCode: number;
    matchGrade: string;
    nameMatchScore?: number;
  };
}

interface DnBMatchResponse {
  matchCandidates: DnBMatchCandidate[];
  candidatesMatchedQuantity: number;
}

export interface DunsLookupResult {
  found: boolean;
  dunsNumber: string | null;
  confidence: number | null; // 1-10
  companyName: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  phone: string | null;
  operatingStatus: string | null;
  employees: number | null;
  error?: string;
}

export interface DunsProfileResult {
  dunsNumber: string;
  companyName: string;
  tradeName: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  yearStarted: number | null;
  employees: number | null;
  annualRevenue: number | null;
  industryCode: string | null;
  industryDescription: string | null;
  operatingStatus: string | null;
  error?: string;
}

class DnBService {
  private baseUrl = 'https://plus.dnb.com';
  private cachedToken: string | null = null;
  private tokenExpiry: number = 0;

  private get apiKey(): string {
    return process.env.DNB_API_KEY || '';
  }

  private get apiSecret(): string {
    return process.env.DNB_API_SECRET || '';
  }

  get isConfigured(): boolean {
    return !!(this.apiKey && this.apiSecret);
  }

  /**
   * Get OAuth2 bearer token (cached until expiry)
   */
  private async getToken(): Promise<string> {
    if (this.cachedToken && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    const credentials = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');

    const response = await fetch(`${this.baseUrl}/v2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grant_type: 'client_credentials' }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[D&B] Token request failed:', response.status, error);
      throw new Error(`D&B authentication failed: ${response.status}`);
    }

    const data: DnBTokenResponse = await response.json();
    this.cachedToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expiresIn * 1000) - 60000; // 1 min buffer
    return this.cachedToken;
  }

  /**
   * Look up a business by name and address to find its DUNS number.
   * Returns the best match with confidence score.
   */
  async lookupDuns(
    businessName: string,
    address: string,
    city: string,
    state: string,
    postalCode: string,
    country: string = 'US',
  ): Promise<DunsLookupResult> {
    if (!this.isConfigured) {
      return {
        found: false,
        dunsNumber: null,
        confidence: null,
        companyName: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        phone: null,
        operatingStatus: null,
        employees: null,
        error: 'D&B API credentials not configured. Add DNB_API_KEY and DNB_API_SECRET to environment variables.',
      };
    }

    try {
      const token = await this.getToken();

      const response = await fetch(`${this.baseUrl}/v1/match/cleanseMatch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: businessName,
          countryISOAlpha2Code: country,
          streetAddressLine1: address,
          addressLocality: city,
          addressRegion: state,
          postalCode: postalCode,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[D&B] Match request failed:', response.status, errorText);
        return {
          found: false,
          dunsNumber: null,
          confidence: null,
          companyName: null,
          address: null,
          city: null,
          state: null,
          postalCode: null,
          phone: null,
          operatingStatus: null,
          employees: null,
          error: `D&B API error: ${response.status}`,
        };
      }

      const data: DnBMatchResponse = await response.json();

      if (!data.matchCandidates || data.matchCandidates.length === 0) {
        return {
          found: false,
          dunsNumber: null,
          confidence: null,
          companyName: null,
          address: null,
          city: null,
          state: null,
          postalCode: null,
          phone: null,
          operatingStatus: null,
          employees: null,
        };
      }

      // Take the best match (first candidate)
      const best = data.matchCandidates[0];
      const org = best.organization;
      const addr = org.primaryAddress;

      return {
        found: true,
        dunsNumber: org.duns,
        confidence: best.matchQualityInformation?.confidenceCode || null,
        companyName: org.primaryName,
        address: addr?.streetAddress?.line1 || null,
        city: addr?.addressLocality?.name || null,
        state: addr?.addressRegion?.abbreviatedName || addr?.addressRegion?.name || null,
        postalCode: addr?.postalCode || null,
        phone: org.telephone?.telephoneNumber || null,
        operatingStatus: org.dunsControlStatus?.operatingStatus?.description || null,
        employees: org.numberOfEmployees?.[0]?.value || null,
      };
    } catch (error: any) {
      console.error('[D&B] Lookup error:', error);
      return {
        found: false,
        dunsNumber: null,
        confidence: null,
        companyName: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        phone: null,
        operatingStatus: null,
        employees: null,
        error: error.message,
      };
    }
  }

  /**
   * Get detailed company profile by DUNS number.
   */
  async getCompanyProfile(dunsNumber: string): Promise<DunsProfileResult> {
    if (!this.isConfigured) {
      return {
        dunsNumber,
        companyName: '',
        tradeName: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        phone: null,
        yearStarted: null,
        employees: null,
        annualRevenue: null,
        industryCode: null,
        industryDescription: null,
        operatingStatus: null,
        error: 'D&B API credentials not configured.',
      };
    }

    try {
      const token = await this.getToken();

      const response = await fetch(
        `${this.baseUrl}/v1/data/duns/${dunsNumber}?blockIDs=companyinfo_L1_v1`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[D&B] Profile request failed:', response.status, errorText);
        return {
          dunsNumber,
          companyName: '',
          tradeName: null,
          address: null,
          city: null,
          state: null,
          postalCode: null,
          country: null,
          phone: null,
          yearStarted: null,
          employees: null,
          annualRevenue: null,
          industryCode: null,
          industryDescription: null,
          operatingStatus: null,
          error: `D&B API error: ${response.status}`,
        };
      }

      const data = await response.json();
      const org = data.organization || {};
      const addr = org.primaryAddress || {};

      return {
        dunsNumber: org.duns || dunsNumber,
        companyName: org.primaryName || '',
        tradeName: org.tradeStyleNames?.[0]?.name || null,
        address: addr.streetAddress?.line1 || null,
        city: addr.addressLocality?.name || null,
        state: addr.addressRegion?.abbreviatedName || null,
        postalCode: addr.postalCode || null,
        country: addr.addressCountry?.isoAlpha2Code || null,
        phone: org.telephone?.[0]?.telephoneNumber || null,
        yearStarted: org.startedDate ? parseInt(org.startedDate.substring(0, 4)) : null,
        employees: org.numberOfEmployees?.[0]?.value || null,
        annualRevenue: org.financials?.[0]?.yearlyRevenue?.[0]?.value || null,
        industryCode: org.industryCodes?.[0]?.code || null,
        industryDescription: org.industryCodes?.[0]?.description || null,
        operatingStatus: org.dunsControlStatus?.operatingStatus?.description || null,
      };
    } catch (error: any) {
      console.error('[D&B] Profile error:', error);
      return {
        dunsNumber,
        companyName: '',
        tradeName: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        phone: null,
        yearStarted: null,
        employees: null,
        annualRevenue: null,
        industryCode: null,
        industryDescription: null,
        operatingStatus: null,
        error: error.message,
      };
    }
  }

  /**
   * Verify a DUNS number is valid and active.
   */
  async verifyDuns(dunsNumber: string): Promise<{ valid: boolean; status: string | null; companyName: string | null }> {
    const profile = await this.getCompanyProfile(dunsNumber);
    return {
      valid: !profile.error && profile.operatingStatus === 'Active',
      status: profile.operatingStatus,
      companyName: profile.companyName || null,
    };
  }
}

export const dnbService = new DnBService();

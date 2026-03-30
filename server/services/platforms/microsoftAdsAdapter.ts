/**
 * Microsoft Advertising (Bing Ads) Platform Adapter
 * Uses Bing Ads API v13 via REST endpoints
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class MicrosoftAdsAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://campaign.api.bingads.microsoft.com/Api/Advertiser/CampaignManagement/v13';
  private readonly BULK_URL = 'https://bulk.api.bingads.microsoft.com/Api/Advertiser/CampaignManagement/v13';
  private developerToken: string;

  constructor(credentials: PlatformCredentials & { developerToken?: string }) {
    super('microsoft', credentials);
    this.developerToken = credentials.developerToken || process.env.MICROSOFT_ADS_DEVELOPER_TOKEN || 'BBD37VB98';
  }

  /**
   * Create a search campaign on Microsoft Advertising
   */
  async createCampaign(params: {
    accountId: string;
    name: string;
    budget: number;
    budgetType: 'DailyBudgetAccelerated' | 'DailyBudgetStandard';
    timeZone?: string;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header>
    <AuthenticationToken xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${this.credentials.accessToken}</AuthenticationToken>
    <DeveloperToken xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${this.developerToken}</DeveloperToken>
    <CustomerId xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${params.accountId}</CustomerId>
    <AccountId xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${params.accountId}</AccountId>
  </s:Header>
  <s:Body>
    <AddCampaignsRequest xmlns="https://bingads.microsoft.com/CampaignManagement/v13">
      <AccountId>${params.accountId}</AccountId>
      <Campaigns>
        <Campaign>
          <BudgetType>${params.budgetType}</BudgetType>
          <DailyBudget>${params.budget}</DailyBudget>
          <Name>${this.escapeXml(params.name)}</Name>
          <TimeZone>${params.timeZone || 'EasternTimeUSCanada'}</TimeZone>
          <CampaignType>Search</CampaignType>
          <Status>Paused</Status>
        </Campaign>
      </Campaigns>
    </AddCampaignsRequest>
  </s:Body>
</s:Envelope>`;

      const response = await fetch(`${this.BASE_URL}/CampaignManagementService.svc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'AddCampaigns',
        },
        body: soapBody,
      });

      const responseText = await response.text();

      // Parse campaign ID from SOAP response
      const idMatch = responseText.match(/<CampaignIds[^>]*>[\s\S]*?<a:long>(\d+)<\/a:long>/);
      if (idMatch) {
        return { success: true, campaignId: idMatch[1] };
      }

      // Check for errors
      const errorMatch = responseText.match(/<Message>(.*?)<\/Message>/);
      return {
        success: false,
        error: errorMatch ? errorMatch[1] : 'Unknown error creating Microsoft Ads campaign',
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create an ad group within a campaign
   */
  async createAdGroup(params: {
    accountId: string;
    campaignId: string;
    name: string;
    cpcBid: number;
  }): Promise<{ success: boolean; adGroupId?: string; error?: string }> {
    try {
      const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header>
    <AuthenticationToken xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${this.credentials.accessToken}</AuthenticationToken>
    <DeveloperToken xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${this.developerToken}</DeveloperToken>
    <AccountId xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${params.accountId}</AccountId>
  </s:Header>
  <s:Body>
    <AddAdGroupsRequest xmlns="https://bingads.microsoft.com/CampaignManagement/v13">
      <CampaignId>${params.campaignId}</CampaignId>
      <AdGroups>
        <AdGroup>
          <Name>${this.escapeXml(params.name)}</Name>
          <CpcBid>
            <Amount>${params.cpcBid}</Amount>
          </CpcBid>
          <Status>Paused</Status>
        </AdGroup>
      </AdGroups>
    </AddAdGroupsRequest>
  </s:Body>
</s:Envelope>`;

      const response = await fetch(`${this.BASE_URL}/CampaignManagementService.svc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'AddAdGroups',
        },
        body: soapBody,
      });

      const responseText = await response.text();
      const idMatch = responseText.match(/<AdGroupIds[^>]*>[\s\S]*?<a:long>(\d+)<\/a:long>/);

      if (idMatch) {
        return { success: true, adGroupId: idMatch[1] };
      }

      const errorMatch = responseText.match(/<Message>(.*?)<\/Message>/);
      return { success: false, error: errorMatch ? errorMatch[1] : 'Unknown error' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a responsive search ad
   */
  async createAd(params: {
    accountId: string;
    adGroupId: string;
    headlines: string[];
    descriptions: string[];
    finalUrl: string;
    path1?: string;
    path2?: string;
  }): Promise<{ success: boolean; adId?: string; error?: string }> {
    try {
      const headlinesXml = params.headlines.map(h =>
        `<AssetLink><Asset xmlns:i="http://www.w3.org/2001/XMLSchema-instance" i:type="TextAsset"><Text>${this.escapeXml(h)}</Text></Asset><PinnedField>None</PinnedField></AssetLink>`
      ).join('');

      const descriptionsXml = params.descriptions.map(d =>
        `<AssetLink><Asset xmlns:i="http://www.w3.org/2001/XMLSchema-instance" i:type="TextAsset"><Text>${this.escapeXml(d)}</Text></Asset><PinnedField>None</PinnedField></AssetLink>`
      ).join('');

      const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header>
    <AuthenticationToken xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${this.credentials.accessToken}</AuthenticationToken>
    <DeveloperToken xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${this.developerToken}</DeveloperToken>
    <AccountId xmlns="https://bingads.microsoft.com/CampaignManagement/v13">${params.accountId}</AccountId>
  </s:Header>
  <s:Body>
    <AddAdsRequest xmlns="https://bingads.microsoft.com/CampaignManagement/v13">
      <AdGroupId>${params.adGroupId}</AdGroupId>
      <Ads>
        <Ad xmlns:i="http://www.w3.org/2001/XMLSchema-instance" i:type="ResponsiveSearchAd">
          <FinalUrls><a:string xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">${this.escapeXml(params.finalUrl)}</a:string></FinalUrls>
          <Headlines>${headlinesXml}</Headlines>
          <Descriptions>${descriptionsXml}</Descriptions>
          <Path1>${this.escapeXml(params.path1 || '')}</Path1>
          <Path2>${this.escapeXml(params.path2 || '')}</Path2>
        </Ad>
      </Ads>
    </AddAdsRequest>
  </s:Body>
</s:Envelope>`;

      const response = await fetch(`${this.BASE_URL}/CampaignManagementService.svc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'AddAds',
        },
        body: soapBody,
      });

      const responseText = await response.text();
      const idMatch = responseText.match(/<AdIds[^>]*>[\s\S]*?<a:long>(\d+)<\/a:long>/);

      if (idMatch) {
        return { success: true, adId: idMatch[1] };
      }

      const errorMatch = responseText.match(/<Message>(.*?)<\/Message>/);
      return { success: false, error: errorMatch ? errorMatch[1] : 'Unknown error' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    return {
      success: false,
      error: 'Microsoft Advertising does not support organic posts. Use createCampaign() for paid advertising.',
    };
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    return {
      impressions: 0,
      clicks: 0,
      engagement: 0,
    };
  }

  async refreshToken(): Promise<void> {
    if (!this.credentials.refreshToken) return;

    try {
      const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.MICROSOFT_ADS_CLIENT_ID || '',
          client_secret: process.env.MICROSOFT_ADS_CLIENT_SECRET || '',
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refreshToken,
          scope: 'https://ads.microsoft.com/msads.manage openid profile email',
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        this.credentials.accessToken = data.access_token;
        if (data.refresh_token) {
          this.credentials.refreshToken = data.refresh_token;
        }
      }
    } catch (error) {
      console.error('[Microsoft Ads] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 90,
      maxMediaCount: 0,
      supportsVideo: false,
      supportsMultipleImages: false,
      supportsScheduling: true,
      supportsHashtags: false,
      supportsLinks: true,
    };
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

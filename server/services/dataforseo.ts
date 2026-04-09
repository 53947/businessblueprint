/**
 * DataForSEO — Centralized integration point for all DataForSEO API calls.
 * No other file should call DataForSEO directly (except the existing local-rankings/check endpoint).
 */

class DataForSEOService {
  private credentials: string | null = null;

  constructor() {
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
    if (login && password) {
      this.credentials = Buffer.from(`${login}:${password}`).toString('base64');
    }
  }

  isConfigured(): boolean {
    return this.credentials !== null;
  }

  private async request(endpoint: string, body: any[]): Promise<any> {
    if (!this.credentials) throw new Error('DataForSEO not configured');
    const response = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) {
      throw new Error(`DataForSEO ${response.status}: ${await response.text()}`);
    }
    return response.json();
  }

  async getDomainAuthority(domain: string): Promise<{
    domainRank: number;
    organicTraffic: number;
    totalBacklinks: number;
    totalKeywords: number;
  } | null> {
    try {
      const data = await this.request('dataforseo_labs/google/domain_rank/live', [
        { target: domain },
      ]);
      const result = data?.tasks?.[0]?.result?.[0];
      if (!result) return null;
      return {
        domainRank: result.domain_rank ?? 0,
        organicTraffic: result.organic_traffic ?? 0,
        totalBacklinks: result.backlinks ?? 0,
        totalKeywords: result.organic_keywords ?? 0,
      };
    } catch (error) {
      console.error('[DataForSEO] getDomainAuthority error:', error);
      return null;
    }
  }

  async getBacklinks(domain: string, limit: number = 100): Promise<{
    backlinks: Array<{
      sourceUrl: string;
      targetUrl: string;
      anchorText: string;
      domainAuthority: number | null;
      linkType: string;
      firstSeen: string | null;
      lastSeen: string | null;
      isSpam: boolean;
      spamScore: number | null;
    }>;
    summary: {
      totalBacklinks: number;
      referringDomains: number;
      brokenBacklinks: number;
    };
  }> {
    try {
      // Fetch backlinks list
      const listData = await this.request('backlinks/backlinks/live', [
        {
          target: domain,
          limit,
          order_by: ['rank.desc'],
          filters: ['dofollow', '=', true],
        },
      ]);

      const items = listData?.tasks?.[0]?.result?.[0]?.items || [];
      const backlinks = items.map((item: any) => ({
        sourceUrl: item.url_from || '',
        targetUrl: item.url_to || '',
        anchorText: item.anchor || '',
        domainAuthority: item.page_from_rank ?? null,
        linkType: item.dofollow ? 'dofollow' : 'nofollow',
        firstSeen: item.first_seen || null,
        lastSeen: item.last_seen || null,
        isSpam: (item.page_from_spam_score || 0) > 50,
        spamScore: item.page_from_spam_score ?? null,
      }));

      // Fetch summary counts
      let summary = { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 };
      try {
        const summaryData = await this.request('backlinks/summary/live', [
          { target: domain },
        ]);
        const s = summaryData?.tasks?.[0]?.result?.[0];
        if (s) {
          summary = {
            totalBacklinks: s.backlinks ?? 0,
            referringDomains: s.referring_domains ?? 0,
            brokenBacklinks: s.broken_backlinks ?? 0,
          };
        }
      } catch {
        // Summary call failed — still return the backlinks we have
      }

      return { backlinks, summary };
    } catch (error) {
      console.error('[DataForSEO] getBacklinks error:', error);
      return { backlinks: [], summary: { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 } };
    }
  }

  async getCompetitorKeywords(domain: string, limit: number = 100): Promise<Array<{
    keyword: string;
    position: number;
    searchVolume: number;
    difficulty: string;
    url: string;
  }>> {
    try {
      const data = await this.request('dataforseo_labs/google/ranked_keywords/live', [
        {
          target: domain,
          limit,
          order_by: ['keyword_data.keyword_info.search_volume,desc'],
        },
      ]);
      const items = data?.tasks?.[0]?.result?.[0]?.items || [];
      return items.map((item: any) => ({
        keyword: item.keyword_data?.keyword || '',
        position: item.ranked_serp_element?.serp_item?.rank_absolute ?? 0,
        searchVolume: item.keyword_data?.keyword_info?.search_volume ?? 0,
        difficulty: item.keyword_data?.keyword_info?.competition_level || 'unknown',
        url: item.ranked_serp_element?.serp_item?.url || '',
      }));
    } catch (error) {
      console.error('[DataForSEO] getCompetitorKeywords error:', error);
      return [];
    }
  }

  async getCompetitorBacklinks(domain: string): Promise<{
    totalBacklinks: number;
    referringDomains: number;
    brokenBacklinks: number;
  }> {
    try {
      const data = await this.request('backlinks/summary/live', [
        { target: domain },
      ]);
      const result = data?.tasks?.[0]?.result?.[0];
      if (!result) return { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 };
      return {
        totalBacklinks: result.backlinks ?? 0,
        referringDomains: result.referring_domains ?? 0,
        brokenBacklinks: result.broken_backlinks ?? 0,
      };
    } catch (error) {
      console.error('[DataForSEO] getCompetitorBacklinks error:', error);
      return { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 };
    }
  }

  async getKeywordData(keywords: string[], location?: string): Promise<Array<{
    keyword: string;
    searchVolume: number;
    difficulty: string;
    cpc: number;
  }>> {
    try {
      const data = await this.request('dataforseo_labs/google/keyword_info/live', [
        {
          keywords,
          location_name: location || 'United States',
          language_name: 'English',
        },
      ]);
      const items = data?.tasks?.[0]?.result || [];
      return items.map((item: any) => ({
        keyword: item.keyword || '',
        searchVolume: item.search_volume ?? 0,
        difficulty: item.competition_level || 'unknown',
        cpc: item.cpc ?? 0,
      }));
    } catch (error) {
      console.error('[DataForSEO] getKeywordData error:', error);
      return [];
    }
  }
}

export const dataForSEO = new DataForSEOService();

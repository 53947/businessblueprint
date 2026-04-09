/**
 * Moz Links API — Backlink data provider.
 * Used instead of DataForSEO Backlinks API to avoid $100/month commitment.
 * DataForSEO still handles SERP, keywords, domain authority, and competitor keywords.
 */

import { randomUUID } from 'crypto';

const MOZ_API_URL = 'https://api.moz.com/jsonrpc';

class MozBacklinksService {
  private token: string | null = null;

  constructor() {
    this.token = process.env.MOZ_API_TOKEN || null;
  }

  isConfigured(): boolean {
    return this.token !== null;
  }

  private async request(method: string, params: Record<string, any>): Promise<any> {
    if (!this.token) throw new Error('Moz API not configured');

    const response = await fetch(MOZ_API_URL, {
      method: 'POST',
      headers: {
        'x-moz-token': this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: randomUUID(),
        method,
        params: { data: params },
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Moz API ${response.status}: ${text}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(`Moz API error: ${data.error.message || JSON.stringify(data.error)}`);
    }
    return data.result;
  }

  /**
   * Get backlinks for a domain.
   * Moz method: link.list
   */
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
      const linksResult = await this.request('link.list', {
        target: domain,
        target_scope: 'root_domain',
        filter: 'external+nofollow+follow',
        sort: 'source_domain_authority',
        limit,
      });

      const items = linksResult?.results || [];
      const backlinks = items.map((item: any) => ({
        sourceUrl: item.source?.page || '',
        targetUrl: item.target?.page || '',
        anchorText: item.anchor_text || '',
        domainAuthority: item.source?.domain_authority ?? null,
        linkType: item.nofollow ? 'nofollow' : 'dofollow',
        firstSeen: item.first_seen || null,
        lastSeen: item.last_seen || null,
        isSpam: (item.source?.spam_score ?? 0) > 5,
        spamScore: item.source?.spam_score ?? null,
      }));

      let summary = { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 };
      try {
        const metricsResult = await this.request('url_metrics.fetch', {
          targets: [domain],
          daily_history_values: [],
          monthly_history_values: [],
        });
        const metrics = metricsResult?.results?.[0];
        if (metrics) {
          summary = {
            totalBacklinks: metrics.external_links_to_root_domain ?? 0,
            referringDomains: metrics.external_links_to_root_domain_root_domains ?? 0,
            brokenBacklinks: 0,
          };
        }
      } catch {
        // Summary call failed — still return the backlinks we have
      }

      return { backlinks, summary };
    } catch (error) {
      console.error('[Moz] getBacklinks error:', error);
      return { backlinks: [], summary: { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 } };
    }
  }

  /**
   * Get backlink summary for a competitor domain.
   * Moz method: url_metrics.fetch
   */
  async getCompetitorBacklinks(domain: string): Promise<{
    totalBacklinks: number;
    referringDomains: number;
    brokenBacklinks: number;
  }> {
    try {
      const result = await this.request('url_metrics.fetch', {
        targets: [domain],
        daily_history_values: [],
        monthly_history_values: [],
      });
      const metrics = result?.results?.[0];
      if (!metrics) return { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 };
      return {
        totalBacklinks: metrics.external_links_to_root_domain ?? 0,
        referringDomains: metrics.external_links_to_root_domain_root_domains ?? 0,
        brokenBacklinks: 0,
      };
    } catch (error) {
      console.error('[Moz] getCompetitorBacklinks error:', error);
      return { totalBacklinks: 0, referringDomains: 0, brokenBacklinks: 0 };
    }
  }

  /**
   * Get backlinks for a competitor domain (full list).
   * Used by competitors/backlinks endpoint.
   */
  async getCompetitorBacklinksList(domain: string, limit: number = 100): Promise<Array<{
    sourceUrl: string;
    anchorText: string;
    domainAuthority: number | null;
    linkType: string;
    spamScore: number | null;
  }>> {
    try {
      const result = await this.request('link.list', {
        target: domain,
        target_scope: 'root_domain',
        filter: 'external+nofollow+follow',
        sort: 'source_domain_authority',
        limit,
      });
      const items = result?.results || [];
      return items.map((item: any) => ({
        sourceUrl: item.source?.page || '',
        anchorText: item.anchor_text || '',
        domainAuthority: item.source?.domain_authority ?? null,
        linkType: item.nofollow ? 'nofollow' : 'dofollow',
        spamScore: item.source?.spam_score ?? null,
      }));
    } catch (error) {
      console.error('[Moz] getCompetitorBacklinksList error:', error);
      return [];
    }
  }
}

export const mozBacklinks = new MozBacklinksService();

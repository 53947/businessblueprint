import { db } from '../db';
import { siteInspectorResults } from '../../shared/schema';
import { eq } from 'drizzle-orm';

interface FastCheckResult {
  success: boolean;
  url: string;
  results: {
    ssl: {
      present: boolean;
      valid: boolean;
      issuer?: string;
      expiresIn?: number;
    };
    performance: {
      loadTime: number;
      score: number;
      bottlenecks: string[];
    };
    mobile: {
      optimized: boolean;
      score: number;
      issues: string[];
    };
    criticalIssues: Array<{
      type: string;
      severity: string;
      issue: string;
      impact: string;
      recommendation: string;
    }>;
    summary: {
      totalIssues: number;
      critical: number;
      highPriority: number;
      overallScore: number;
    };
  };
}

interface FullReportResult {
  success: boolean;
  reportId: string;
  reportUrl: string;
  status: string;
}

interface AuditorResult {
  success: boolean;
  conversationId: string;
  response: string;
  tokensUsed: number;
}

export class SiteInspectorService {
  private apiKey: string;
  private baseUrl: string;
  private enabled: boolean;
  
  constructor() {
    this.apiKey = process.env.NODE_ENV === 'production' 
      ? process.env.SITEINSPECTOR_API_KEY || ''
      : process.env.SITEINSPECTOR_TEST_KEY || process.env.SITEINSPECTOR_API_KEY || '';
    this.baseUrl = process.env.SITEINSPECTOR_API_URL || 'https://siteinspector.dev/api/businessblueprint';
    this.enabled = !!this.apiKey;
    
    if (!this.enabled) {
      console.log('[SiteInspector] No API key configured - service disabled');
    } else {
      console.log('[SiteInspector] Service initialized');
    }
  }
  
  isEnabled(): boolean {
    return this.enabled;
  }
  
  async runFastCheck(url: string): Promise<FastCheckResult | null> {
    if (!this.enabled) {
      console.log('[SiteInspector] Service disabled - skipping Fast Check');
      return null;
    }
    
    try {
      console.log(`[SiteInspector] Running Fast Check for: ${url}`);
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`${this.baseUrl}/fast-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          url,
          checks: ['comprehensive']
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`SiteInspector API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'SiteInspector analysis failed');
      }
      
      console.log(`[SiteInspector] Fast Check completed. Overall score: ${data.results.summary.overallScore}`);
      
      return data;
      
    } catch (error) {
      console.error('[SiteInspector] Fast Check error:', error);
      return null;
    }
  }
  
  async requestFullReport(url: string, email?: string, assessmentId?: number): Promise<FullReportResult | null> {
    if (!this.enabled) {
      console.log('[SiteInspector] Service disabled - skipping Full Report request');
      return null;
    }
    
    try {
      console.log(`[SiteInspector] Requesting Full Report for: ${url}`);
      
      const webhookUrl = `${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/api/siteinspector-webhook`;
      
      const response = await fetch(`${this.baseUrl}/full-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          url,
          email,
          webhookUrl,
          returnUrl: assessmentId ? `${process.env.FRONTEND_URL}/portal/prescriptions/${assessmentId}` : undefined
        })
      });
      
      if (!response.ok) {
        throw new Error(`SiteInspector API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to queue report');
      }
      
      console.log(`[SiteInspector] Full Report queued: ${data.reportId}`);
      
      return data;
      
    } catch (error) {
      console.error('[SiteInspector] Full Report error:', error);
      return null;
    }
  }
  
  async chatWithAuditor(message: string, context?: {
    businessName?: string;
    industry?: string;
    currentScore?: number;
    url?: string;
    conversationId?: string;
  }): Promise<AuditorResult | null> {
    if (!this.enabled) {
      console.log('[SiteInspector] Service disabled - skipping Auditor chat');
      return null;
    }
    
    try {
      console.log(`[SiteInspector] Auditor chat: ${message.substring(0, 50)}...`);
      
      const response = await fetch(`${this.baseUrl}/auditor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          message,
          conversationId: context?.conversationId,
          context: {
            businessName: context?.businessName,
            industry: context?.industry,
            currentScore: context?.currentScore,
            url: context?.url
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`SiteInspector API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Auditor chat failed');
      }
      
      console.log(`[SiteInspector] Auditor response received. Tokens: ${data.tokensUsed}`);
      
      return data;
      
    } catch (error) {
      console.error('[SiteInspector] Auditor error:', error);
      return null;
    }
  }
  
  async saveFastCheckResults(assessmentId: number, url: string, results: FastCheckResult): Promise<void> {
    try {
      await db.insert(siteInspectorResults).values({
        assessmentId,
        url,
        overallScore: results.results.summary.overallScore,
        sslPresent: results.results.ssl.present,
        sslValid: results.results.ssl.valid,
        sslIssuer: results.results.ssl.issuer,
        sslExpiresIn: results.results.ssl.expiresIn,
        loadTime: String(results.results.performance.loadTime),
        performanceScore: results.results.performance.score,
        mobileOptimized: results.results.mobile.optimized,
        mobileScore: results.results.mobile.score,
        criticalIssues: JSON.stringify(results.results.criticalIssues)
      });
      
      console.log(`[SiteInspector] Results saved for assessment ${assessmentId}`);
    } catch (error) {
      console.error('[SiteInspector] Error saving results:', error);
    }
  }
  
  async updateFullReportStatus(assessmentId: number, reportId: string, reportUrl: string, status: string): Promise<void> {
    try {
      await db.update(siteInspectorResults)
        .set({
          fullReportId: reportId,
          fullReportUrl: reportUrl,
          fullReportStatus: status,
          updatedAt: new Date()
        })
        .where(eq(siteInspectorResults.assessmentId, assessmentId));
      
      console.log(`[SiteInspector] Full Report status updated: ${status}`);
    } catch (error) {
      console.error('[SiteInspector] Error updating report status:', error);
    }
  }
  
  async getResults(assessmentId: number): Promise<any> {
    try {
      const results = await db.query.siteInspectorResults.findFirst({
        where: eq(siteInspectorResults.assessmentId, assessmentId)
      });
      
      if (results && results.criticalIssues) {
        return {
          ...results,
          criticalIssues: JSON.parse(results.criticalIssues)
        };
      }
      
      return results;
    } catch (error) {
      console.error('[SiteInspector] Error getting results:', error);
      return null;
    }
  }
  
  calculateTechnicalScore(results: FastCheckResult): number {
    if (!results || !results.results) return 0;
    
    let score = 10;
    
    if (!results.results.ssl.present) score -= 2;
    else if (!results.results.ssl.valid) score -= 1;
    
    if (results.results.performance.loadTime > 3) score -= 2;
    else if (results.results.performance.loadTime > 2) score -= 1;
    
    if (!results.results.mobile.optimized) score -= 2;
    
    const criticalCount = results.results.criticalIssues.filter(i => i.severity === 'critical').length;
    const highCount = results.results.criticalIssues.filter(i => i.severity === 'high').length;
    
    if (criticalCount > 2) score -= 2;
    else if (criticalCount > 0) score -= 1;
    
    if (highCount > 5) score -= 1;
    
    return Math.max(0, Math.min(10, score));
  }
}

export const siteInspectorService = new SiteInspectorService();

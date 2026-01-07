import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  ShieldCheck, 
  ShieldX, 
  Gauge, 
  Smartphone, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Zap
} from "lucide-react";

interface SiteInspectorResultsProps {
  results: {
    overallScore?: number;
    sslPresent?: boolean;
    sslValid?: boolean;
    loadTime?: number;
    performanceScore?: number;
    mobileOptimized?: boolean;
    mobileScore?: number;
    criticalIssues?: Array<{
      type: string;
      severity: string;
      issue: string;
      impact: string;
      recommendation: string;
    }>;
    fullReportUrl?: string;
  };
  websiteUrl?: string;
  onRequestFullReport?: () => void;
}

export function SiteInspectorResults({ results, websiteUrl, onRequestFullReport }: SiteInspectorResultsProps) {
  if (!results) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const criticalCount = results.criticalIssues?.filter(i => i.severity === 'critical').length || 0;
  const highCount = results.criticalIssues?.filter(i => i.severity === 'high').length || 0;

  return (
    <Card className="border-2 border-[#0000FF] bg-white" data-testid="siteinspector-results">
      <CardHeader className="bg-[#09080E] text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#F97316]" />
            <span style={{ fontFamily: 'Archivo, sans-serif' }}>Website Technical Analysis</span>
          </div>
          <Badge className={`${getScoreBg(results.overallScore || 0)} ${getScoreColor(results.overallScore || 0)}`}>
            Score: {results.overallScore || 0}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-[#EEFBFF] rounded-lg" data-testid="ssl-status">
            <div className="flex items-center gap-2 mb-2">
              {results.sslPresent && results.sslValid ? (
                <ShieldCheck className="w-5 h-5 text-green-600" />
              ) : results.sslPresent ? (
                <Shield className="w-5 h-5 text-yellow-600" />
              ) : (
                <ShieldX className="w-5 h-5 text-red-600" />
              )}
              <span className="font-semibold text-[#09080E]">SSL Certificate</span>
            </div>
            <p className={`text-sm ${results.sslPresent && results.sslValid ? 'text-green-600' : results.sslPresent ? 'text-yellow-600' : 'text-red-600'}`}>
              {results.sslPresent && results.sslValid ? 'Valid & Secure' : results.sslPresent ? 'Present but Invalid' : 'Missing - Security Risk!'}
            </p>
          </div>

          <div className="p-4 bg-[#EEFBFF] rounded-lg" data-testid="load-time">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5 text-[#0000FF]" />
              <span className="font-semibold text-[#09080E]">Load Time</span>
            </div>
            <p className={`text-sm ${(results.loadTime || 0) < 2 ? 'text-green-600' : (results.loadTime || 0) < 3 ? 'text-yellow-600' : 'text-red-600'}`}>
              {results.loadTime?.toFixed(1) || 'N/A'}s {(results.loadTime || 0) < 2 ? '(Good)' : (results.loadTime || 0) < 3 ? '(Needs Work)' : '(Too Slow!)'}
            </p>
          </div>

          <div className="p-4 bg-[#EEFBFF] rounded-lg" data-testid="performance-score">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#F97316]" />
              <span className="font-semibold text-[#09080E]">Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={results.performanceScore || 0} className="flex-1 h-2" />
              <span className={`text-sm font-bold ${getScoreColor(results.performanceScore || 0)}`}>
                {results.performanceScore || 0}%
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#EEFBFF] rounded-lg" data-testid="mobile-score">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-[#0000FF]" />
              <span className="font-semibold text-[#09080E]">Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={results.mobileScore || 0} className="flex-1 h-2" />
              <span className={`text-sm font-bold ${getScoreColor(results.mobileScore || 0)}`}>
                {results.mobileScore || 0}%
              </span>
            </div>
          </div>
        </div>

        {(criticalCount > 0 || highCount > 0) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg" data-testid="critical-issues">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">
                Issues Detected: {criticalCount} Critical, {highCount} High Priority
              </span>
            </div>
            <ul className="space-y-2">
              {results.criticalIssues?.slice(0, 5).map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Badge variant={issue.severity === 'critical' ? 'destructive' : 'default'} className="mt-0.5">
                    {issue.severity}
                  </Badge>
                  <span className="text-gray-700">{issue.issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(criticalCount === 0 && highCount === 0) && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg" data-testid="no-issues">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">
                No critical issues detected. Your website has a solid technical foundation!
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {results.fullReportUrl ? (
            <Button
              className="bg-[#0000FF] hover:bg-[#0000FF]/90 text-white"
              onClick={() => window.open(results.fullReportUrl, '_blank')}
              data-testid="view-full-report"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Technical Report
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border-[#0000FF] text-[#0000FF] hover:bg-[#0000FF] hover:text-white"
              onClick={() => {
                if (onRequestFullReport) {
                  onRequestFullReport();
                } else if (websiteUrl) {
                  window.open(`https://siteinspector.dev?url=${encodeURIComponent(websiteUrl)}`, '_blank');
                }
              }}
              data-testid="request-full-report"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Run Complete Site Analysis
            </Button>
          )}
          
          <Button
            variant="outline"
            className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"
            onClick={() => window.open('https://hostsblue.com', '_blank')}
            data-testid="visit-hostsblue"
          >
            Fix Issues with HostsBlue →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

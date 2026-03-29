import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Target, Search, FileText, Wrench, PenTool, Link2, MapPin,
  Code2, Sparkles, BarChart3, RefreshCw, Plus, Trash2, ExternalLink,
  AlertTriangle, CheckCircle2, Clock, ArrowUp, ArrowDown, Minus,
  Loader2, X, ChevronRight, Eye, TrendingUp
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const OPTIMIZE_COLOR = '#374151';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'keywords', label: 'Keywords', icon: Search },
  { id: 'on-page', label: 'On-Page', icon: FileText },
  { id: 'technical', label: 'Technical', icon: Wrench },
  { id: 'content', label: 'Content', icon: PenTool },
  { id: 'backlinks', label: 'Backlinks', icon: Link2 },
  { id: 'local-seo', label: 'Local SEO', icon: MapPin },
  { id: 'schema', label: 'Schema', icon: Code2 },
  { id: 'action-plan', label: 'Action Plan', icon: Sparkles },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

export default function OptimizeDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/seo/profiles'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/profiles'); return res.json(); },
  });

  // Redirect to setup if no profile
  useEffect(() => {
    if (!profileLoading && profileData && !profileData.profile) {
      setLocation('/optimize/setup');
    }
  }, [profileData, profileLoading, setLocation]);

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!profileData?.profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionHeader
        title="/ optimize"
        subtitle="SEO Optimization Suite"
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-1 mb-6 pb-2 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-white border-b-2'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              style={activeTab === tab.id ? { backgroundColor: OPTIMIZE_COLOR, borderColor: OPTIMIZE_COLOR } : {}}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'keywords' && <KeywordsTab />}
        {activeTab === 'on-page' && <OnPageTab />}
        {activeTab === 'technical' && <TechnicalTab />}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'backlinks' && <ComingSoonTab title="Backlink Monitor" icon={Link2} description="Track your backlink profile, monitor new and lost links, and analyze domain authority. Coming in a future update." />}
        {activeTab === 'local-seo' && <ComingSoonTab title="Local SEO Optimizer" icon={MapPin} description="Optimize for local search with location-specific keyword tracking, Google Business Profile integration, and local citation management." />}
        {activeTab === 'schema' && <ComingSoonTab title="Schema Markup Generator" icon={Code2} description="Generate structured data (JSON-LD) for your pages with a visual wizard. Support for LocalBusiness, Product, FAQ, and more." />}
        {activeTab === 'action-plan' && <ActionPlanTab />}
        {activeTab === 'reports' && <ComingSoonTab title="Reporting & Insights" icon={BarChart3} description="Generate beautiful SEO performance reports with trend analysis, competitive benchmarking, and actionable insights." />}
      </div>
      <Footer />
    </div>
  );
}

// =============================================
// OVERVIEW TAB
// =============================================

function OverviewTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/dashboard'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/dashboard'); return res.json(); },
  });

  const scanMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/scan', { scanType: 'full' });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Scan Started", description: "Your SEO scan is running. Results will appear shortly." });
      setTimeout(() => queryClient.invalidateQueries({ queryKey: ['/api/seo/dashboard'] }), 5000);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to start scan", variant: "destructive" });
    },
  });

  if (isLoading) return <LoadingState />;
  const d = data?.data;
  if (!d) return <EmptyState message="No data yet. Run your first scan to get started." />;

  const score = d.overallScore;

  return (
    <div className="space-y-6">
      {/* Score + Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="60" cy="60" r="54"
                  stroke={score !== null ? (score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444') : '#9ca3af'}
                  strokeWidth="8" fill="none"
                  strokeDasharray={`${((score || 0) / 100) * 339.3} 339.3`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-bold" style={{ color: OPTIMIZE_COLOR }}>
                {score !== null ? score : '—'}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">SEO Health Score</p>
            <Button
              size="sm"
              className="mt-4 text-white"
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              onClick={() => scanMutation.mutate()}
              disabled={scanMutation.isPending}
              data-testid="button-run-scan"
            >
              {scanMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              {scanMutation.isPending ? 'Scanning...' : 'Run Scan'}
            </Button>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Issues" value={d.issues?.total || 0} icon={AlertTriangle}
                subtext={d.issues?.critical > 0 ? `${d.issues.critical} critical` : 'No critical'}
                color={d.issues?.critical > 0 ? '#ef4444' : '#22c55e'} />
              <StatCard label="Keywords" value={d.keywordsTracked || 0} icon={Search}
                subtext="Tracked" color="#3b82f6" />
              <StatCard label="Pages" value={d.pagesAnalyzed || 0} icon={FileText}
                subtext="Analyzed" color="#8b5cf6" />
              <StatCard label="Actions" value={d.pendingActions || 0} icon={Sparkles}
                subtext="Pending" color="#f59e0b" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown */}
      {(d.performanceScore !== null || d.seoScore !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreBar label="Performance" score={d.performanceScore} />
          <ScoreBar label="SEO" score={d.seoScore} />
          <ScoreBar label="Accessibility" score={d.accessibilityScore} />
        </div>
      )}

      {/* Issue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Issue Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-red-50">
              <p className="text-2xl font-bold text-red-600">{d.issues?.critical || 0}</p>
              <p className="text-xs text-red-600 font-medium">Critical</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-50">
              <p className="text-2xl font-bold text-orange-600">{d.issues?.high || 0}</p>
              <p className="text-xs text-orange-600 font-medium">High</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-50">
              <p className="text-2xl font-bold text-yellow-600">{d.issues?.medium || 0}</p>
              <p className="text-xs text-yellow-600 font-medium">Medium</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">{d.issues?.low || 0}</p>
              <p className="text-xs text-blue-600 font-medium">Low</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Scans */}
      {d.recentScans?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {d.recentScans.map((scan: any) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={scan.status === 'completed' ? 'default' : scan.status === 'running' ? 'secondary' : 'destructive'}>
                      {scan.status}
                    </Badge>
                    <span className="text-sm text-gray-600">{scan.scanType} scan</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {scan.overallScore !== null && (
                      <span className="font-bold" style={{ color: OPTIMIZE_COLOR }}>{scan.overallScore}/100</span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(scan.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// =============================================
// KEYWORDS TAB
// =============================================

function KeywordsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [keywordInput, setKeywordInput] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/keywords'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/keywords'); return res.json(); },
  });

  const addKeyword = useMutation({
    mutationFn: async (keyword: string) => {
      const res = await apiRequest('POST', '/api/seo/keywords', { keywords: keyword });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/keywords'] });
      setKeywordInput('');
      toast({ title: "Keyword Added" });
    },
  });

  const deleteKeyword = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/seo/keywords/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/keywords'] });
    },
  });

  const researchKeywords = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/keywords/research', {});
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Research Complete", description: `Found ${data.suggestions?.length || 0} keyword suggestions` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to research keywords", variant: "destructive" });
    },
  });

  if (isLoading) return <LoadingState />;

  const keywords = data?.keywords || [];

  return (
    <div className="space-y-6">
      {/* Add Keyword */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              placeholder="Add a keyword to track..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && keywordInput.trim() && addKeyword.mutate(keywordInput.trim())}
              data-testid="input-add-keyword"
            />
            <Button
              onClick={() => keywordInput.trim() && addKeyword.mutate(keywordInput.trim())}
              disabled={addKeyword.isPending}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
              data-testid="button-add-keyword"
            >
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
            <Button
              variant="outline"
              onClick={() => researchKeywords.mutate()}
              disabled={researchKeywords.isPending}
              data-testid="button-research-keywords"
            >
              {researchKeywords.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              AI Research
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Research Results */}
      {researchKeywords.data?.suggestions?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
              AI Keyword Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {researchKeywords.data.suggestions.map((s: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{s.keyword}</p>
                    <p className="text-xs text-gray-500">
                      Vol: ~{s.estimatedVolume?.toLocaleString()} | Diff: {s.difficulty}/100 | {s.type}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addKeyword.mutate(s.keyword)}
                    data-testid={`button-add-suggestion-${i}`}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tracked Keywords ({keywords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {keywords.length === 0 ? (
            <EmptyState message="No keywords tracked yet. Add keywords above to start monitoring rankings." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Keyword</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Rank</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Est. Volume</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Est. Difficulty</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Source</th>
                    <th className="pb-3 text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw: any) => (
                    <tr key={kw.id} className="border-b last:border-0">
                      <td className="py-3 font-medium text-sm">{kw.keyword}</td>
                      <td className="py-3 text-center">
                        {kw.currentRank ? (
                          <span className={`font-bold ${kw.currentRank <= 10 ? 'text-green-600' : kw.currentRank <= 30 ? 'text-yellow-600' : 'text-gray-500'}`}>
                            #{kw.currentRank}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 text-center text-sm text-gray-600">
                        {kw.searchVolume ? kw.searchVolume.toLocaleString() : '—'}
                      </td>
                      <td className="py-3 text-center">
                        {kw.difficulty ? (
                          <Badge variant={kw.difficulty <= 30 ? 'default' : kw.difficulty <= 60 ? 'secondary' : 'destructive'} className="text-xs">
                            {kw.difficulty}/100
                          </Badge>
                        ) : '—'}
                      </td>
                      <td className="py-3 text-center text-xs text-gray-400">{kw.source}</td>
                      <td className="py-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-600"
                          onClick={() => deleteKeyword.mutate(kw.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================
// ON-PAGE TAB
// =============================================

function OnPageTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [urlInput, setUrlInput] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/pages'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/pages'); return res.json(); },
  });

  const analyzePage = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest('POST', '/api/seo/pages/analyze', { url });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      setUrlInput('');
      toast({ title: "Page Analyzed" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to analyze page", variant: "destructive" });
    },
  });

  if (isLoading) return <LoadingState />;

  const pages = data?.pages || [];

  return (
    <div className="space-y-6">
      {/* Analyze URL */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              placeholder="Enter a URL to analyze (e.g., https://example.com/page)..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && urlInput.trim() && analyzePage.mutate(urlInput.trim())}
              data-testid="input-analyze-url"
            />
            <Button
              onClick={() => urlInput.trim() && analyzePage.mutate(urlInput.trim())}
              disabled={analyzePage.isPending}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
              data-testid="button-analyze-page"
            >
              {analyzePage.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analyzed Pages ({pages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <EmptyState message="No pages analyzed yet. Enter a URL above to start." />
          ) : (
            <div className="space-y-3">
              {pages.map((page: any) => (
                <div key={page.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{page.title || 'Untitled'}</p>
                      <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline truncate block">
                        {page.url} <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <ScoreBadge score={page.score} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>Words: {page.wordCount || '—'}</span>
                    <span>H1: {page.h1 ? '✓' : '✕'}</span>
                    <span>Meta: {page.metaDescription ? '✓' : '✕'}</span>
                    {page.lastAnalyzed && (
                      <span>Analyzed: {new Date(page.lastAnalyzed).toLocaleDateString()}</span>
                    )}
                  </div>
                  {page.suggestions && Array.isArray(page.suggestions) && page.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {(page.suggestions as string[]).slice(0, 3).map((s: string, i: number) => (
                        <p key={i} className="text-xs text-amber-700 flex items-start gap-1">
                          <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" /> {s}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================
// TECHNICAL TAB
// =============================================

function TechnicalTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/technical-issues'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/technical-issues'); return res.json(); },
  });

  const scanMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/scan', { scanType: 'technical' });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Scan Started" });
      setTimeout(() => queryClient.invalidateQueries({ queryKey: ['/api/seo/technical-issues'] }), 5000);
    },
  });

  const updateIssue = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest('PATCH', `/api/seo/technical-issues/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/technical-issues'] });
    },
  });

  if (isLoading) return <LoadingState />;

  const issues = data?.issues || [];
  const openIssues = issues.filter((i: any) => i.status === 'open');
  const resolvedIssues = issues.filter((i: any) => i.status !== 'open');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Technical Issues ({openIssues.length} open)</h3>
        <Button
          onClick={() => scanMutation.mutate()}
          disabled={scanMutation.isPending}
          style={{ backgroundColor: OPTIMIZE_COLOR }}
          className="text-white"
          data-testid="button-technical-scan"
        >
          {scanMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Run Scan
        </Button>
      </div>

      {openIssues.length === 0 && resolvedIssues.length === 0 ? (
        <EmptyState message="No technical issues found. Run a scan to check for issues." />
      ) : (
        <>
          {openIssues.map((issue: any) => (
            <Card key={issue.id} className={`border-l-4 ${
              issue.severity === 'critical' ? 'border-l-red-500' :
              issue.severity === 'high' ? 'border-l-orange-500' :
              issue.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
            }`}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={
                        issue.severity === 'critical' ? 'destructive' :
                        issue.severity === 'high' ? 'destructive' : 'secondary'
                      } className="text-xs">{issue.severity}</Badge>
                      <span className="text-xs text-gray-400">{issue.type}</span>
                    </div>
                    <p className="font-medium text-sm mb-1">{issue.description}</p>
                    {issue.url && (
                      <p className="text-xs text-blue-600 mb-2">{issue.url}</p>
                    )}
                    {issue.howToFix && (
                      <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        <strong>Fix:</strong> {issue.howToFix}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-600"
                      onClick={() => updateIssue.mutate({ id: issue.id, status: 'resolved' })}
                      title="Mark as resolved"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400"
                      onClick={() => updateIssue.mutate({ id: issue.id, status: 'dismissed' })}
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {resolvedIssues.length > 0 && (
            <details className="mt-4">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                {resolvedIssues.length} resolved/dismissed issues
              </summary>
              <div className="mt-2 space-y-2">
                {resolvedIssues.map((issue: any) => (
                  <div key={issue.id} className="p-3 bg-gray-50 rounded-lg opacity-60">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{issue.status}</Badge>
                      <span className="text-sm">{issue.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </>
      )}
    </div>
  );
}

// =============================================
// CONTENT TAB
// =============================================

function ContentTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [keywordInput, setKeywordInput] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/content-briefs'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/content-briefs'); return res.json(); },
  });

  const generateBrief = useMutation({
    mutationFn: async (targetKeyword: string) => {
      const res = await apiRequest('POST', '/api/seo/content-briefs', { targetKeyword });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/content-briefs'] });
      setKeywordInput('');
      toast({ title: "Content Brief Generated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to generate content brief", variant: "destructive" });
    },
  });

  if (isLoading) return <LoadingState />;

  const briefs = data?.briefs || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              placeholder="Enter a target keyword for a content brief..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && keywordInput.trim() && generateBrief.mutate(keywordInput.trim())}
              data-testid="input-brief-keyword"
            />
            <Button
              onClick={() => keywordInput.trim() && generateBrief.mutate(keywordInput.trim())}
              disabled={generateBrief.isPending}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
              data-testid="button-generate-brief"
            >
              {generateBrief.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate Brief
            </Button>
          </div>
        </CardContent>
      </Card>

      {briefs.length === 0 ? (
        <EmptyState message="No content briefs yet. Enter a keyword above to generate your first AI content brief." />
      ) : (
        <div className="space-y-4">
          {briefs.map((brief: any) => (
            <Card key={brief.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-sm">{brief.title}</h4>
                    <p className="text-xs text-gray-500">Target: "{brief.targetKeyword}" | {brief.wordCountTarget} words</p>
                  </div>
                  <Badge variant={brief.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                    {brief.status}
                  </Badge>
                </div>
                {brief.outline && Array.isArray(brief.outline) && (
                  <div className="space-y-1 mb-3">
                    {(brief.outline as any[]).map((item: any, i: number) => (
                      <p key={i} className={`text-sm ${item.type === 'h2' ? 'font-medium' : 'pl-4 text-gray-500'}`}>
                        {item.type === 'h2' ? '##' : '###'} {item.heading}
                        {item.notes && <span className="text-xs text-gray-400 ml-2">— {item.notes}</span>}
                      </p>
                    ))}
                  </div>
                )}
                {brief.suggestions && Array.isArray(brief.suggestions) && (
                  <div className="flex flex-wrap gap-2">
                    {(brief.suggestions as string[]).map((s: string, i: number) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{s}</span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// ACTION PLAN TAB
// =============================================

function ActionPlanTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/action-items'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/action-items'); return res.json(); },
  });

  const generatePlan = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/action-items/generate', {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/action-items'] });
      toast({ title: "Action Plan Generated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to generate action plan", variant: "destructive" });
    },
  });

  const updateItem = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest('PATCH', `/api/seo/action-items/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/action-items'] });
    },
  });

  if (isLoading) return <LoadingState />;

  const items = data?.items || [];
  const pending = items.filter((i: any) => i.status === 'pending' || i.status === 'in-progress');
  const completed = items.filter((i: any) => i.status === 'completed' || i.status === 'dismissed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">AI SEO Action Plan</h3>
        <Button
          onClick={() => generatePlan.mutate()}
          disabled={generatePlan.isPending}
          style={{ backgroundColor: OPTIMIZE_COLOR }}
          className="text-white"
          data-testid="button-generate-plan"
        >
          {generatePlan.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Generate Plan
        </Button>
      </div>

      {pending.length === 0 && completed.length === 0 ? (
        <EmptyState message="No action items yet. Click 'Generate Plan' to get AI-powered SEO recommendations." />
      ) : (
        <>
          {pending.map((item: any) => (
            <Card key={item.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={
                        item.priority === 'critical' ? 'destructive' :
                        item.priority === 'high' ? 'destructive' : 'secondary'
                      } className="text-xs">{item.priority}</Badge>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <span className="text-xs text-gray-400">
                        Impact: {item.impact} | Effort: {item.effort}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-green-600 ml-4"
                    onClick={() => updateItem.mutate({ id: item.id, status: 'completed' })}
                    title="Mark complete"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {completed.length > 0 && (
            <details className="mt-4">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                {completed.length} completed items
              </summary>
              <div className="mt-2 space-y-2">
                {completed.map((item: any) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg opacity-60 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{item.title}</span>
                  </div>
                ))}
              </div>
            </details>
          )}
        </>
      )}
    </div>
  );
}

// =============================================
// COMING SOON TAB
// =============================================

function ComingSoonTab({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100">
            <Icon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-4">{description}</p>
          <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================
// SHARED COMPONENTS
// =============================================

function StatCard({ label, value, icon: Icon, subtext, color }: { label: string; value: number; icon: any; subtext: string; color: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-gray-50">
      <Icon className="w-5 h-5 mx-auto mb-1" style={{ color }} />
      <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{value}</p>
      <p className="text-xs font-medium text-gray-600">{label}</p>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number | null }) {
  if (score === null || score === undefined) return null;
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">{label}</span>
          <span className="text-sm font-bold" style={{ color }}>{score}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null || score === undefined) return <Badge variant="secondary">—</Badge>;
  const color = score >= 70 ? 'bg-green-100 text-green-700' : score >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${color}`}>{score}/100</span>;
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

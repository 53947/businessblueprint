import React, { useState, useEffect } from "react";
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
  Loader2, X, ChevronRight, Eye, TrendingUp, Copy, Download,
  Globe, Phone, Building2, ShieldCheck, Star, Info, Calendar,
  Hash, Tag, Clipboard, Users, Zap, Activity, Gauge
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/section-header";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const OPTIMIZE_COLOR = '#374151';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'site-health', label: 'Site Health', icon: Wrench },
  { id: 'keywords', label: 'Keywords', icon: Search },
  { id: 'competitors', label: 'Competitors', icon: Users },
  { id: 'backlinks', label: 'Backlinks', icon: Link2 },
  { id: 'content', label: 'Content', icon: PenTool },
  { id: 'local', label: 'Local SEO', icon: MapPin },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

// =============================================
// PRIORITY LAYER SYSTEM
// =============================================

type PriorityLevel = 'critical' | 'important' | 'relevant' | 'optional';

const PRIORITY_CONFIG = {
  critical: { label: 'Critical', color: '#DC2626', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', description: 'Fix these immediately. They are actively costing you customers right now.' },
  important: { label: 'Important', color: '#F97316', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', description: 'These significantly impact your rankings. Address them this month.' },
  relevant: { label: 'Relevant', color: '#2563EB', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', description: 'These give you a competitive edge. Work on them as time allows.' },
  optional: { label: 'Optional', color: '#6B7280', bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', description: 'Advanced features for power users. Nice to have, not urgent.' },
};

function PriorityBadge({ level }: { level: PriorityLevel }) {
  const c = PRIORITY_CONFIG[level];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text} ${c.border} border`}>
      {c.label}
    </span>
  );
}

function mapSeverityToLayer(severity: string): PriorityLevel {
  switch (severity) {
    case 'critical': return 'critical';
    case 'high': return 'important';
    case 'medium': return 'relevant';
    case 'low': return 'optional';
    default: return 'relevant';
  }
}

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
        {activeTab === 'overview' && <OverviewTab onTabChange={setActiveTab} />}
        {activeTab === 'site-health' && <SiteHealthTab />}
        {activeTab === 'keywords' && <KeywordsTab />}
        {activeTab === 'competitors' && <CompetitorsTab />}
        {activeTab === 'backlinks' && <BacklinksTab />}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'local' && <LocalSeoTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
      <Footer />
    </div>
  );
}

// =============================================
// OVERVIEW TAB
// =============================================

function OverviewTab({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/dashboard'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/dashboard'); return res.json(); },
  });

  const { data: issuesData } = useQuery({
    queryKey: ['/api/seo/technical-issues'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/technical-issues'); return res.json(); },
  });

  const { data: actionsData } = useQuery({
    queryKey: ['/api/seo/action-items'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/action-items'); return res.json(); },
  });

  const scanMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/scan', { scanType: 'full' });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Scan Started", description: "Your SEO scan is running. Results will appear shortly." });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/seo/dashboard'] });
        queryClient.invalidateQueries({ queryKey: ['/api/seo/technical-issues'] });
      }, 5000);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to start scan", variant: "destructive" });
    },
  });

  if (isLoading) return <LoadingState />;
  const d = data?.data;
  if (!d) return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-8 pb-8 text-center">
          <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-bold mb-2" style={{ color: OPTIMIZE_COLOR }}>Welcome to / optimize</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">Run your first SEO scan to get a complete picture of your website's search health — and a prioritized list of exactly what to fix.</p>
          <Button
            className="text-white"
            style={{ backgroundColor: OPTIMIZE_COLOR }}
            onClick={() => scanMutation.mutate()}
            disabled={scanMutation.isPending}
          >
            {scanMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            {scanMutation.isPending ? 'Scanning...' : 'Run Your First Scan'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const score = d.overallScore;
  const allIssues = (issuesData?.issues || []).filter((i: any) => i.status === 'open');
  const allActions = (actionsData?.items || []).filter((i: any) => i.status === 'pending' || i.status === 'in-progress');

  // Group issues by priority layer
  const criticalItems = allIssues.filter((i: any) => i.severity === 'critical');
  const importantItems = allIssues.filter((i: any) => i.severity === 'high');
  const relevantItems = allIssues.filter((i: any) => i.severity === 'medium');
  const optionalItems = allIssues.filter((i: any) => i.severity === 'low');

  const layerGroups: { level: PriorityLevel; items: any[]; tab: string }[] = [
    { level: 'critical', items: criticalItems, tab: 'site-health' },
    { level: 'important', items: importantItems, tab: 'site-health' },
    { level: 'relevant', items: relevantItems, tab: 'site-health' },
    { level: 'optional', items: optionalItems, tab: 'site-health' },
  ];

  return (
    <div className="space-y-6">
      {/* Score + Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Issues" value={allIssues.length} icon={AlertTriangle}
                subtext={criticalItems.length > 0 ? `${criticalItems.length} critical` : 'No critical'}
                color={criticalItems.length > 0 ? '#DC2626' : '#22c55e'} />
              <StatCard label="Keywords" value={d.keywordsTracked || 0} icon={Search}
                subtext="Tracked" color="#3b82f6" />
              <StatCard label="Pages" value={d.pagesAnalyzed || 0} icon={FileText}
                subtext="Analyzed" color="#8b5cf6" />
              <StatCard label="Actions" value={allActions.length} icon={Sparkles}
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

      {/* Priority Layer Issue Groups */}
      {layerGroups.map(({ level, items, tab }) => {
        if (items.length === 0) return null;
        const config = PRIORITY_CONFIG[level];
        return (
          <Card key={level} className="border-l-4" style={{ borderLeftColor: config.color }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PriorityBadge level={level} />
                  <span className="text-sm font-bold" style={{ color: config.color }}>{items.length} issue{items.length !== 1 ? 's' : ''}</span>
                </div>
                <button
                  onClick={() => onTabChange(tab)}
                  className="text-xs font-medium hover:underline"
                  style={{ color: OPTIMIZE_COLOR }}
                >
                  View in Site Health →
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{config.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.slice(0, 5).map((issue: any) => (
                  <div key={issue.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{issue.description}</p>
                      {issue.howToFix && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{issue.howToFix}</p>
                      )}
                      {issue.url && (
                        <p className="text-xs text-blue-600 mt-0.5 truncate">{issue.url}</p>
                      )}
                    </div>
                  </div>
                ))}
                {items.length > 5 && (
                  <button
                    onClick={() => onTabChange(tab)}
                    className="text-xs font-medium w-full text-center py-2 hover:bg-gray-50 rounded"
                    style={{ color: OPTIMIZE_COLOR }}
                  >
                    +{items.length - 5} more — view all in Site Health
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Action Items from All Layers */}
      {allActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
              Your SEO Action Plan
            </CardTitle>
            <CardDescription>Prioritized tasks from your latest analysis — work through them top to bottom.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allActions.slice(0, 8).map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <PriorityBadge level={mapSeverityToLayer(item.priority)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.description && <p className="text-xs text-gray-500 truncate">{item.description}</p>}
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">{item.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
// SITE HEALTH TAB (merges On-Page + Technical + Schema + Core Web Vitals)
// =============================================

function SiteHealthTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [urlInput, setUrlInput] = useState('');
  const [activeSection, setActiveSection] = useState<'issues' | 'pages' | 'vitals' | 'schema' | 'images' | 'internal-links'>('issues');
  const [imageAuditData, setImageAuditData] = useState<any>(null);

  const { data: issuesData, isLoading: issuesLoading } = useQuery({
    queryKey: ['/api/seo/technical-issues'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/technical-issues'); return res.json(); },
  });

  const { data: pagesData, isLoading: pagesLoading } = useQuery({
    queryKey: ['/api/seo/pages'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/pages'); return res.json(); },
  });

  const { data: profileData } = useQuery({
    queryKey: ['/api/seo/profiles'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/profiles'); return res.json(); },
  });

  const scanMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/scan', { scanType: 'full' });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Scan Started" });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/seo/technical-issues'] });
        queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      }, 5000);
    },
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

  const checkVitals = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/core-web-vitals', {});
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      toast({ title: "Core Web Vitals Checked", description: data.vitals ? "Results are in." : "Check your PageSpeed Insights configuration." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to check Core Web Vitals", variant: "destructive" });
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

  const runImageAudit = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/pages/image-audit', {});
      return res.json();
    },
    onSuccess: (data) => {
      setImageAuditData(data);
      toast({ title: "Image Audit Complete", description: `Found ${data.totalImages || 0} images across your pages` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to run image audit", variant: "destructive" });
    },
  });

  if (issuesLoading || pagesLoading) return <LoadingState />;

  const issues = issuesData?.issues || [];
  const openIssues = issues.filter((i: any) => i.status === 'open');
  const resolvedIssues = issues.filter((i: any) => i.status !== 'open');
  const pages = pagesData?.pages || [];

  // Group open issues by priority layer
  const criticalIssues = openIssues.filter((i: any) => i.severity === 'critical');
  const importantIssues = openIssues.filter((i: any) => i.severity === 'high');
  const relevantIssues = openIssues.filter((i: any) => i.severity === 'medium');
  const optionalIssues = openIssues.filter((i: any) => i.severity === 'low');

  const sections = [
    { id: 'issues' as const, label: 'All Issues', count: openIssues.length },
    { id: 'pages' as const, label: 'Page Analysis', count: pages.length },
    { id: 'vitals' as const, label: 'Core Web Vitals', count: null },
    { id: 'schema' as const, label: 'Schema Markup', count: null },
    { id: 'images' as const, label: 'Image Audit', count: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold" style={{ color: OPTIMIZE_COLOR }}>Site Health</h3>
          <p className="text-sm text-gray-500">Technical issues, page analysis, Core Web Vitals, and schema markup — all in one place.</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => scanMutation.mutate()}
            disabled={scanMutation.isPending}
            style={{ backgroundColor: OPTIMIZE_COLOR }}
            className="text-white"
          >
            {scanMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Run Full Scan
          </Button>
        </div>
      </div>

      {/* Priority Summary Bar */}
      <div className="grid grid-cols-4 gap-3">
        <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-2xl font-bold text-red-600">{criticalIssues.length}</p>
          <p className="text-xs text-red-600 font-medium">Critical</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-orange-50 border border-orange-200">
          <p className="text-2xl font-bold text-orange-600">{importantIssues.length}</p>
          <p className="text-xs text-orange-600 font-medium">Important</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-2xl font-bold text-blue-600">{relevantIssues.length}</p>
          <p className="text-xs text-blue-600 font-medium">Relevant</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-2xl font-bold text-gray-600">{optionalIssues.length}</p>
          <p className="text-xs text-gray-600 font-medium">Optional</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeSection === sec.id
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            style={activeSection === sec.id ? { backgroundColor: OPTIMIZE_COLOR } : {}}
          >
            {sec.label}
            {sec.count !== null && (
              <span className="ml-1.5 text-xs opacity-75">({sec.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Issues Section */}
      {activeSection === 'issues' && (
        <div className="space-y-4">
          {openIssues.length === 0 && resolvedIssues.length === 0 ? (
            <EmptyState message="No technical issues found. Run a scan to check for issues." />
          ) : (
            <>
              {/* Issues grouped by priority layer */}
              {([
                { level: 'critical' as PriorityLevel, items: criticalIssues },
                { level: 'important' as PriorityLevel, items: importantIssues },
                { level: 'relevant' as PriorityLevel, items: relevantIssues },
                { level: 'optional' as PriorityLevel, items: optionalIssues },
              ] as const).map(({ level, items }) => {
                if (items.length === 0) return null;
                const config = PRIORITY_CONFIG[level];
                return (
                  <div key={level} className="space-y-2">
                    <div className="flex items-center gap-2 pt-2">
                      <PriorityBadge level={level} />
                      <span className="text-sm text-gray-500">{config.description}</span>
                    </div>
                    {items.map((issue: any) => (
                      <Card key={issue.id} className="border-l-4" style={{ borderLeftColor: config.color }}>
                        <CardContent className="py-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <PriorityBadge level={level} />
                                <span className="text-xs text-gray-400">{issue.type}</span>
                              </div>
                              <p className="font-medium text-sm mb-1">{issue.description}</p>
                              {issue.url && (
                                <a href={issue.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 mb-2 block hover:underline">
                                  {issue.url} <ExternalLink className="w-3 h-3 inline" />
                                </a>
                              )}
                              {issue.howToFix && (
                                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded mt-2">
                                  <strong className="text-gray-700">How to fix:</strong> {issue.howToFix}
                                </div>
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
                  </div>
                );
              })}

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
      )}

      {/* Pages Section */}
      {activeSection === 'pages' && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter a URL to analyze (e.g., https://example.com/page)..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && urlInput.trim() && analyzePage.mutate(urlInput.trim())}
                />
                <Button
                  onClick={() => urlInput.trim() && analyzePage.mutate(urlInput.trim())}
                  disabled={analyzePage.isPending}
                  style={{ backgroundColor: OPTIMIZE_COLOR }}
                  className="text-white"
                >
                  {analyzePage.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  Analyze
                </Button>
              </div>
            </CardContent>
          </Card>

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
                        <span>Links In: {page.internalLinksIn ?? '—'}</span>
                        <span>Links Out: {page.internalLinksOut ?? '—'}</span>
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
      )}

      {/* Core Web Vitals Section */}
      {activeSection === 'vitals' && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
                  <Gauge className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1" style={{ color: OPTIMIZE_COLOR }}>Core Web Vitals</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Google uses Core Web Vitals as ranking signals. These metrics measure how fast your site loads, how quickly it responds to user input, and how stable the layout is. Poor scores here directly hurt your search rankings.
                  </p>
                  <div className="mt-3">
                    <PriorityBadge level="critical" />
                    <span className="text-xs text-gray-500 ml-2">Google uses these as ranking signals</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Check Your Vitals</CardTitle>
                <Button
                  onClick={() => checkVitals.mutate()}
                  disabled={checkVitals.isPending}
                  style={{ backgroundColor: OPTIMIZE_COLOR }}
                  className="text-white"
                >
                  {checkVitals.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Activity className="w-4 h-4 mr-2" />}
                  {checkVitals.isPending ? 'Checking...' : 'Run Vitals Check'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                const homePage = pages.find((p: any) => {
                  const domain = profileData?.profile?.domain || '';
                  return p.url === `https://${domain}` || p.url === `https://${domain}/` || p.url === domain;
                }) || pages[0];
                const vitals = homePage?.coreWebVitals as any;
                if (!vitals) {
                  return (
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 mb-2">No Core Web Vitals data yet.</p>
                      <p className="text-xs text-gray-400">Click "Run Vitals Check" to measure your site's performance using Google PageSpeed Insights.</p>
                    </div>
                  );
                }
                const metrics = [
                  { key: 'lcp', label: 'Largest Contentful Paint (LCP)', unit: 's', good: 2.5, poor: 4, explain: 'How fast your main content loads. Under 2.5s is good.' },
                  { key: 'fid', label: 'First Input Delay (FID)', unit: 'ms', good: 100, poor: 300, explain: 'How quickly your site responds to the first click or tap. Under 100ms is good.' },
                  { key: 'cls', label: 'Cumulative Layout Shift (CLS)', unit: '', good: 0.1, poor: 0.25, explain: 'How much the page layout jumps around while loading. Under 0.1 is good.' },
                  { key: 'inp', label: 'Interaction to Next Paint (INP)', unit: 'ms', good: 200, poor: 500, explain: 'How responsive your site is to all interactions. Under 200ms is good.' },
                ];
                return (
                  <div className="space-y-4">
                    {metrics.map((m) => {
                      const data = vitals[m.key];
                      if (!data) return null;
                      const rating = data.rating || (data.value <= m.good ? 'good' : data.value <= m.poor ? 'needs-improvement' : 'poor');
                      const ratingColor = rating === 'good' ? '#22c55e' : rating === 'needs-improvement' ? '#f59e0b' : '#ef4444';
                      const ratingLabel = rating === 'good' ? 'Good' : rating === 'needs-improvement' ? 'Needs Work' : 'Poor';
                      return (
                        <div key={m.key} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium">{m.label}</p>
                              <p className="text-xs text-gray-500">{m.explain}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold" style={{ color: ratingColor }}>
                                {m.key === 'cls' ? data.value.toFixed(3) : m.unit === 's' ? data.value.toFixed(1) + 's' : Math.round(data.value) + 'ms'}
                              </p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${ratingColor}15`, color: ratingColor }}>
                                {ratingLabel}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="h-2 rounded-full transition-all" style={{
                              width: `${Math.min(100, (data.value / m.poor) * 100)}%`,
                              backgroundColor: ratingColor,
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Schema Markup Section */}
      {activeSection === 'schema' && <SchemaTab />}

      {/* Image Audit Section */}
      {activeSection === 'images' && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
                  <Eye className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1" style={{ color: OPTIMIZE_COLOR }}>Image Audit</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Images without alt text hurt your accessibility and SEO. Oversized images slow down your site.
                    Run an image audit to find missing alt text, oversized files, and get AI-generated alt text suggestions.
                  </p>
                  <div className="mt-3">
                    <Button
                      onClick={() => runImageAudit.mutate()}
                      disabled={runImageAudit.isPending}
                      style={{ backgroundColor: OPTIMIZE_COLOR }}
                      className="text-white"
                    >
                      {runImageAudit.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                      {runImageAudit.isPending ? 'Auditing...' : 'Run Image Audit'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {imageAuditData && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{imageAuditData.totalImages || 0}</p>
                    <p className="text-xs text-gray-500 font-medium">Total Images</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{imageAuditData.withoutAlt || 0}</p>
                    <p className="text-xs text-gray-500 font-medium">Without Alt Text</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{imageAuditData.oversized || 0}</p>
                    <p className="text-xs text-gray-500 font-medium">Oversized</p>
                  </CardContent>
                </Card>
              </div>

              {/* Alt Text Suggestions */}
              {imageAuditData.suggestions && imageAuditData.suggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
                        AI Alt Text Suggestions
                      </CardTitle>
                      <PriorityBadge level="important" />
                    </div>
                    <CardDescription>AI-generated alt text for images missing descriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b text-left">
                            <th className="pb-3 text-sm font-medium text-gray-500">Image</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Page</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Suggested Alt Text</th>
                          </tr>
                        </thead>
                        <tbody>
                          {imageAuditData.suggestions.map((s: any, i: number) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-3 text-sm">
                                <a href={s.src || s.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block max-w-[200px]">
                                  {s.src || s.imageUrl || 'Image'} <ExternalLink className="w-3 h-3 inline" />
                                </a>
                              </td>
                              <td className="py-3 text-sm text-gray-600 truncate max-w-[200px]">{s.pageUrl || '—'}</td>
                              <td className="py-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-700">{s.suggestedAlt || s.altText || '—'}</span>
                                  {(s.suggestedAlt || s.altText) && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        navigator.clipboard.writeText(s.suggestedAlt || s.altText);
                                        toast({ title: "Copied", description: "Alt text copied to clipboard" });
                                      }}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!imageAuditData && (
            <Card>
              <CardContent className="py-8 text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Click "Run Image Audit" above to scan your pages for image issues and get AI alt text suggestions.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================
// COMPETITORS TAB
// =============================================

function CompetitorsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [domainInput, setDomainInput] = useState('');
  const [gapData, setGapData] = useState<any>(null);

  const { data: competitorsData, isLoading } = useQuery({
    queryKey: ['/api/seo/competitors'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/competitors'); return res.json(); },
  });

  const { data: profileData } = useQuery({
    queryKey: ['/api/seo/profiles'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/profiles'); return res.json(); },
  });

  const addCompetitor = useMutation({
    mutationFn: async (domain: string) => {
      const res = await apiRequest('POST', '/api/seo/competitors', { domain });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/competitors'] });
      setDomainInput('');
      toast({ title: "Competitor Added" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add competitor", variant: "destructive" });
    },
  });

  const deleteCompetitor = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/seo/competitors/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/competitors'] });
      toast({ title: "Competitor Removed" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to remove competitor", variant: "destructive" });
    },
  });

  const analyzeGaps = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/competitors/analyze', {});
      return res.json();
    },
    onSuccess: (data) => {
      setGapData(data);
      toast({ title: "Analysis Complete", description: `Found ${data.gaps?.length || 0} keyword gaps` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to analyze competitors", variant: "destructive" });
    },
  });

  if (isLoading) return <LoadingState />;

  // Merge API competitors with profile competitors
  const apiCompetitors = competitorsData?.competitors || [];
  const profileCompetitors = (profileData?.profile?.competitors as string[]) || [];

  return (
    <div className="space-y-6">
      {/* Explainer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
              <Users className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: OPTIMIZE_COLOR }}>Competitor Analysis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track how your competitors rank for the same keywords you care about.
                See which keywords they rank for that you don't, find backlink opportunities they have that you're missing,
                and understand where you stand in your market.
              </p>
              <div className="mt-2">
                <PriorityBadge level="important" />
                <span className="text-xs text-gray-500 ml-2">Knowing your competition is key to outranking them</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Competitor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Competitor</CardTitle>
          <CardDescription>Enter a competitor's domain to start tracking their SEO performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter competitor domain (e.g., competitor.com)..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && domainInput.trim() && addCompetitor.mutate(domainInput.trim())}
            />
            <Button
              onClick={() => domainInput.trim() && addCompetitor.mutate(domainInput.trim())}
              disabled={addCompetitor.isPending}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
            <Button
              variant="outline"
              onClick={() => analyzeGaps.mutate()}
              disabled={analyzeGaps.isPending || (apiCompetitors.length === 0 && profileCompetitors.length === 0)}
            >
              {analyzeGaps.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <TrendingUp className="w-4 h-4 mr-2" />}
              Keyword Gap Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Competitors Table */}
      {(apiCompetitors.length > 0 || profileCompetitors.length > 0) ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tracked Competitors ({apiCompetitors.length + profileCompetitors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Domain</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Domain Authority</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Last Checked</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Source</th>
                    <th className="pb-3 text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {apiCompetitors.map((comp: any) => (
                    <tr key={comp.id} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-sm">{comp.domain}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center">
                        {comp.domainAuthority ? (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                            comp.domainAuthority >= 50 ? 'bg-green-100 text-green-700' :
                            comp.domainAuthority >= 20 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>{comp.domainAuthority}</span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="py-3 text-center text-xs text-gray-400">
                        {comp.lastChecked ? new Date(comp.lastChecked).toLocaleDateString() : '—'}
                      </td>
                      <td className="py-3 text-center">
                        <Badge variant="default" className="text-xs">tracked</Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-600"
                          onClick={() => deleteCompetitor.mutate(comp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {profileCompetitors.filter((d: string) => !apiCompetitors.some((c: any) => c.domain === d)).map((domain: string, i: number) => (
                    <tr key={`profile-${i}`} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-sm">{domain}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center"><span className="text-gray-400">—</span></td>
                      <td className="py-3 text-center text-xs text-gray-400">—</td>
                      <td className="py-3 text-center">
                        <Badge variant="secondary" className="text-xs">profile</Badge>
                      </td>
                      <td className="py-3 text-right"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No competitors tracked yet. Add competitor domains above or in your SEO profile settings.</p>
          </CardContent>
        </Card>
      )}

      {/* Gap Analysis Results */}
      {gapData?.gaps && gapData.gaps.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
                Keyword Gap Analysis
              </CardTitle>
              <PriorityBadge level="important" />
            </div>
            <CardDescription>Keywords your competitors rank for that you may be missing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Keyword</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Competitor Rank</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Your Rank</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Volume</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {gapData.gaps.map((gap: any, i: number) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 font-medium text-sm">{gap.keyword}</td>
                      <td className="py-3 text-center">
                        {gap.competitorRank ? (
                          <span className="text-sm font-bold text-orange-600">#{gap.competitorRank}</span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="py-3 text-center">
                        {gap.yourRank ? (
                          <span className={`text-sm font-bold ${gap.yourRank <= 10 ? 'text-green-600' : 'text-gray-500'}`}>#{gap.yourRank}</span>
                        ) : <span className="text-xs text-red-500">Not ranking</span>}
                      </td>
                      <td className="py-3 text-center text-sm text-gray-600">
                        {gap.volume?.toLocaleString() || '—'}
                      </td>
                      <td className="py-3 text-center">
                        {gap.difficulty ? (
                          <Badge variant={gap.difficulty <= 30 ? 'default' : gap.difficulty <= 60 ? 'secondary' : 'destructive'} className="text-xs">
                            {gap.difficulty}/100
                          </Badge>
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  const [intentData, setIntentData] = useState<Record<string, { intent: string; confidence: number }>>({});
  const [longTailData, setLongTailData] = useState<Record<number, any[]>>({});
  const [expandedKeyword, setExpandedKeyword] = useState<number | null>(null);
  const [locationKeyword, setLocationKeyword] = useState('');
  const [locationInput, setLocationInput] = useState('');

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

  const classifyIntent = useMutation({
    mutationFn: async (keywords: string[]) => {
      const res = await apiRequest('POST', '/api/seo/keywords/classify-intent', { keywords });
      return res.json();
    },
    onSuccess: (data) => {
      const map: Record<string, any> = {};
      (data.classifications || []).forEach((c: any) => { map[c.keyword] = c; });
      setIntentData(map);
      toast({ title: "Intent Classified", description: `Classified ${data.classifications?.length || 0} keywords` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to classify intent", variant: "destructive" });
    },
  });

  const generateLongTail = useMutation({
    mutationFn: async ({ keywordId, keyword }: { keywordId: number; keyword: string }) => {
      const res = await apiRequest('POST', '/api/seo/keywords/long-tail', { keyword });
      return res.json();
    },
    onSuccess: (data, variables) => {
      setLongTailData(prev => ({ ...prev, [variables.keywordId]: data.variations || [] }));
      setExpandedKeyword(variables.keywordId);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to generate long-tail variations", variant: "destructive" });
    },
  });

  const checkLocationRank = useMutation({
    mutationFn: async ({ keyword, location }: { keyword: string; location: string }) => {
      const res = await apiRequest('POST', '/api/seo/local-rankings/check', { keyword, location });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.ranking) {
        toast({ title: "Rank Checked", description: `Position tracked for "${data.ranking.keyword}" in ${data.ranking.location}` });
      } else {
        toast({ title: "Rank Check", description: data.message || "Check completed." });
      }
      setLocationKeyword('');
      setLocationInput('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to check local ranking", variant: "destructive" });
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
            <Button
              variant="outline"
              onClick={() => {
                const kws = keywords.map((kw: any) => kw.keyword);
                if (kws.length > 0) classifyIntent.mutate(kws);
              }}
              disabled={classifyIntent.isPending || keywords.length === 0}
              data-testid="button-classify-intent"
            >
              {classifyIntent.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Tag className="w-4 h-4 mr-2" />}
              Classify All
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
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Intent</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Source</th>
                    <th className="pb-3 text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw: any) => (
                    <React.Fragment key={kw.id}>
                    <tr className="border-b last:border-0">
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
                      <td className="py-3 text-center">
                        {intentData[kw.keyword] ? (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            intentData[kw.keyword].intent === 'transactional' ? 'bg-green-50 text-green-700 border border-green-200' :
                            intentData[kw.keyword].intent === 'commercial' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                            intentData[kw.keyword].intent === 'navigational' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}>
                            {intentData[kw.keyword].intent}
                          </span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="py-3 text-center text-xs text-gray-400">{kw.source}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => {
                              if (expandedKeyword === kw.id) {
                                setExpandedKeyword(null);
                              } else {
                                generateLongTail.mutate({ keywordId: kw.id, keyword: kw.keyword });
                              }
                            }}
                            title="Long-tail variations"
                            disabled={generateLongTail.isPending}
                          >
                            <ChevronRight className={`w-4 h-4 transition-transform ${expandedKeyword === kw.id ? 'rotate-90' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-600"
                            onClick={() => deleteKeyword.mutate(kw.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedKeyword === kw.id && longTailData[kw.id] && (
                      <tr><td colSpan={7} className="bg-gray-50 p-3">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-600 mb-2">Long-tail variations for "{kw.keyword}":</p>
                          {longTailData[kw.id].length === 0 ? (
                            <p className="text-xs text-gray-400">No variations found.</p>
                          ) : (
                            longTailData[kw.id].map((lt: any, j: number) => (
                              <div key={j} className="flex items-center justify-between text-xs px-2 py-1 rounded hover:bg-gray-100">
                                <span>{lt.keyword}</span>
                                <span className="text-gray-400">Vol: ~{lt.estimatedVolume?.toLocaleString()} | Diff: {lt.difficulty}/100</span>
                              </div>
                            ))
                          )}
                        </div>
                      </td></tr>
                    )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rank by Location */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
                Rank by Location
              </CardTitle>
              <CardDescription>Check how a keyword ranks in a specific geographic location</CardDescription>
            </div>
            <PriorityBadge level="important" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            {keywords.length > 0 ? (
              <Select value={locationKeyword} onValueChange={setLocationKeyword}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a keyword..." />
                </SelectTrigger>
                <SelectContent>
                  {keywords.map((kw: any) => (
                    <SelectItem key={kw.id} value={kw.keyword}>{kw.keyword}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input placeholder="Add keywords above first..." disabled className="flex-1" />
            )}
            <Input
              placeholder="Location (e.g., Hartford, CT)"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => {
                const kw = locationKeyword.trim();
                const loc = locationInput.trim();
                if (kw && loc) checkLocationRank.mutate({ keyword: kw, location: loc });
              }}
              disabled={checkLocationRank.isPending || !locationKeyword.trim() || !locationInput.trim()}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
            >
              {checkLocationRank.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              Check Rank
            </Button>
          </div>
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
// BACKLINKS TAB
// =============================================

function BacklinksTab() {
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState('');
  const [backlinkFilter, setBacklinkFilter] = useState<'all' | 'new' | 'lost' | 'spam'>('all');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/seo/backlinks'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/backlinks'); return res.json(); },
  });

  const { data: profileData } = useQuery({
    queryKey: ['/api/seo/profiles'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/profiles'); return res.json(); },
  });

  const [checkingUrl, setCheckingUrl] = useState(false);
  const [checkedBacklinks, setCheckedBacklinks] = useState<any[]>([]);

  const handleCheckUrl = async () => {
    if (!urlInput.trim()) return;
    setCheckingUrl(true);
    try {
      const res = await apiRequest('POST', '/api/seo/scan', { scanType: 'full' });
      await res.json();
      toast({ title: "Backlink Check Started", description: "We're scanning for backlinks. This may take a moment." });
      // Refresh backlinks data after a delay
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/seo/backlinks'] });
      }, 3000);
    } catch {
      toast({ title: "Error", description: "Failed to check backlinks", variant: "destructive" });
    }
    setCheckingUrl(false);
  };

  if (isLoading) return <LoadingState />;

  const backlinks = data?.backlinks || [];
  const domain = profileData?.profile?.domain || '';

  return (
    <div className="space-y-6">
      {/* Explainer Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
              <Link2 className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: OPTIMIZE_COLOR }}>What Are Backlinks?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Backlinks are links from other websites that point to your site. Think of them as "votes of confidence" from other sites.
                The more quality backlinks you have, the more search engines trust your website, which helps you rank higher in search results.
                Links from well-known, reputable sites carry more weight than links from unknown sites.
              </p>
              <div className="mt-2">
                <PriorityBadge level="important" />
                <span className="text-xs text-gray-500 ml-2">Backlinks are one of Google's top ranking factors</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URL Check */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
            Check Your Backlinks
          </CardTitle>
          <CardDescription>Enter your domain to discover who links to your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder={domain ? domain : "Enter your domain (e.g., example.com)..."}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckUrl()}
              data-testid="input-backlink-url"
            />
            <Button
              onClick={handleCheckUrl}
              disabled={checkingUrl}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
              data-testid="button-check-backlinks"
            >
              {checkingUrl ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              Check
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backlinks Summary */}
      {backlinks.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{backlinks.length}</p>
              <p className="text-xs text-gray-500 font-medium">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {backlinks.filter((b: any) => b.status === 'active').length}
              </p>
              <p className="text-xs text-gray-500 font-medium">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-red-500">
                {backlinks.filter((b: any) => b.isLost).length}
              </p>
              <p className="text-xs text-gray-500 font-medium">Lost</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {backlinks.filter((b: any) => b.isNew).length}
              </p>
              <p className="text-xs text-gray-500 font-medium">New</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {new Set(backlinks.map((b: any) => {
                  try { return new URL(b.sourceUrl || '').hostname; } catch { return b.sourceUrl; }
                })).size}
              </p>
              <p className="text-xs text-gray-500 font-medium">Referring Domains</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(backlinks.reduce((sum: number, b: any) => sum + (b.domainAuthority || 0), 0) / (backlinks.length || 1))}
              </p>
              <p className="text-xs text-gray-500 font-medium">Avg DA</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filter Bar */}
      {backlinks.length > 0 && (
        <div className="flex gap-2">
          {(['all', 'new', 'lost', 'spam'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setBacklinkFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                backlinkFilter === f
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={backlinkFilter === f ? { backgroundColor: OPTIMIZE_COLOR } : {}}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Backlinks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discovered Backlinks ({backlinks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {backlinks.length === 0 ? (
            <EmptyState message="Add your domain above to discover your backlink profile. We'll find sites that link to you." />
          ) : ((() => {
            const filtered = backlinkFilter === 'all' ? backlinks :
              backlinkFilter === 'new' ? backlinks.filter((b: any) => b.isNew) :
              backlinkFilter === 'lost' ? backlinks.filter((b: any) => b.isLost) :
              backlinks.filter((b: any) => b.isSpam);
            return (
            <div className="overflow-x-auto">
              {filtered.length === 0 ? (
                <p className="text-center py-6 text-sm text-gray-500">No backlinks match the "{backlinkFilter}" filter.</p>
              ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Source Domain</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Anchor Text</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">DA</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Type</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Status</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">First Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((bl: any) => {
                    let sourceDomain = bl.sourceUrl || '—';
                    try { sourceDomain = new URL(bl.sourceUrl).hostname; } catch {}
                    return (
                      <tr key={bl.id} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{sourceDomain}</p>
                              <a href={bl.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 truncate block">
                                {bl.sourceUrl} <ExternalLink className="w-3 h-3 inline" />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {bl.anchorText || <span className="text-gray-400 italic">no anchor</span>}
                        </td>
                        <td className="py-3 text-center">
                          {bl.domainAuthority ? (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                              bl.domainAuthority >= 50 ? 'bg-green-100 text-green-700' :
                              bl.domainAuthority >= 20 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>{bl.domainAuthority}</span>
                          ) : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-xs text-gray-500">{bl.linkType || 'dofollow'}</span>
                        </td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Badge variant={bl.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                              {bl.isLost ? 'lost' : bl.isNew ? 'new' : bl.status || 'active'}
                            </Badge>
                            {bl.isSpam && <Badge variant="destructive" className="text-xs">spam</Badge>}
                          </div>
                        </td>
                        <td className="py-3 text-center text-xs text-gray-400">
                          {bl.firstSeen ? new Date(bl.firstSeen).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              )}
            </div>
            );
          })())}
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================
// LOCAL SEO TAB
// =============================================

function LocalSeoTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rankKeyword, setRankKeyword] = useState('');
  const [rankLocation, setRankLocation] = useState('');

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/seo/profiles'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/profiles'); return res.json(); },
  });

  const { data: dashData } = useQuery({
    queryKey: ['/api/seo/dashboard'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/dashboard'); return res.json(); },
  });

  const { data: keywordsData } = useQuery({
    queryKey: ['/api/seo/keywords'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/keywords'); return res.json(); },
  });

  const { data: localRankData } = useQuery({
    queryKey: ['/api/seo/local-rankings'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/local-rankings'); return res.json(); },
  });

  const checkLocalRank = useMutation({
    mutationFn: async ({ keyword, location }: { keyword: string; location: string }) => {
      const res = await apiRequest('POST', '/api/seo/local-rankings/check', { keyword, location });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/local-rankings'] });
      if (data.ranking) {
        toast({ title: "Rank Checked", description: `Position tracked for "${data.ranking.keyword}" in ${data.ranking.location}` });
      } else {
        toast({ title: "Rank Check", description: data.message || "Check completed." });
      }
      setRankKeyword('');
      setRankLocation('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to check local ranking", variant: "destructive" });
    },
  });

  if (profileLoading) return <LoadingState />;

  const profile = profileData?.profile;
  const dashboard = dashData?.data;
  const keywords = keywordsData?.keywords || [];
  const localRankings = localRankData?.rankings || [];
  const localEnabled = profile?.localEnabled || false;
  const location = profile?.location || '';
  const businessName = profile?.businessName || '';

  // Simulated local SEO score based on available data
  const hasLocation = !!location;
  const hasBusinessName = !!businessName;
  const hasKeywords = keywords.length > 0;
  const hasScan = dashboard?.overallScore !== null && dashboard?.overallScore !== undefined;
  let localScore = 0;
  if (hasLocation) localScore += 25;
  if (hasBusinessName) localScore += 25;
  if (hasKeywords) localScore += 25;
  if (hasScan && dashboard?.overallScore >= 50) localScore += 25;

  // Generate local keyword suggestions based on profile
  const localKeywordSuggestions = [];
  if (businessName && location) {
    const industry = profile?.industry || 'business';
    localKeywordSuggestions.push(
      `${industry} near ${location}`,
      `best ${industry} in ${location}`,
      `${businessName} reviews`,
      `${industry} ${location} open now`,
      `affordable ${industry} ${location}`,
      `top rated ${industry} near me`,
    );
  }

  // NAP directories simulation
  const napDirectories = [
    { name: 'Google Business Profile', icon: Globe, status: localEnabled ? 'connected' : 'not connected' },
    { name: 'Yelp', icon: Star, status: 'unknown' },
    { name: 'Facebook Business', icon: Building2, status: 'unknown' },
    { name: 'Apple Maps', icon: MapPin, status: 'unknown' },
    { name: 'Bing Places', icon: Search, status: 'unknown' },
    { name: 'Yellow Pages', icon: Phone, status: 'unknown' },
  ];

  return (
    <div className="space-y-6">
      {/* Local SEO Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="relative inline-flex items-center justify-center w-28 h-28 mb-4">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="60" cy="60" r="54"
                  stroke={localScore >= 70 ? '#22c55e' : localScore >= 40 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8" fill="none"
                  strokeDasharray={`${(localScore / 100) * 339.3} 339.3`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>
                {localScore}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">Local SEO Health</p>
            <p className="text-xs text-gray-400 mt-1">Based on your profile completeness</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
              Local SEO Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ChecklistItem checked={hasBusinessName} label="Business name configured" detail={businessName || 'Set up in your SEO profile'} />
              <ChecklistItem checked={hasLocation} label="Business location set" detail={location || 'Add location in SEO profile settings'} />
              <ChecklistItem checked={localEnabled} label="Local SEO enabled" detail={localEnabled ? 'Active' : 'Enable in your profile settings'} />
              <ChecklistItem checked={hasKeywords} label="Keywords being tracked" detail={hasKeywords ? `${keywords.length} keywords tracked` : 'Add keywords in the Keywords tab'} />
              <ChecklistItem checked={hasScan} label="Site scan completed" detail={hasScan ? `Score: ${dashboard?.overallScore}/100` : 'Run a scan from the Overview tab'} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
            Google Business Profile
          </CardTitle>
          <CardDescription>Your Google Business Profile is essential for appearing in local search results and Google Maps</CardDescription>
        </CardHeader>
        <CardContent>
          {localEnabled ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Local SEO is enabled for your profile</p>
                <p className="text-sm text-green-600">Your business information is being optimized for local search</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-amber-800">Local SEO not enabled</p>
                <p className="text-sm text-amber-600 mb-2">Enable local SEO in your profile settings to optimize for local search results</p>
                <a
                  href="https://business.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Set up Google Business Profile <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* NAP Consistency */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
            NAP Consistency Checker
          </CardTitle>
          <CardDescription>
            NAP stands for Name, Address, Phone. Consistent business information across directories helps search engines trust your business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!businessName && !location ? (
            <EmptyState message="Add your business name and location in your SEO profile to check NAP consistency across directories." />
          ) : (
            <div className="space-y-3">
              {businessName && (
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <p className="text-xs text-gray-500 mb-1">Your Business Info</p>
                  <p className="font-medium text-sm">{businessName}</p>
                  {location && <p className="text-sm text-gray-600">{location}</p>}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {napDirectories.map((dir) => (
                  <div key={dir.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <dir.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium">{dir.name}</span>
                    </div>
                    <Badge variant={dir.status === 'connected' ? 'default' : dir.status === 'not connected' ? 'destructive' : 'secondary'} className="text-xs">
                      {dir.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Local Keyword Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
            Local Keyword Suggestions
          </CardTitle>
          <CardDescription>Keywords that can help your business appear in local search results</CardDescription>
        </CardHeader>
        <CardContent>
          {localKeywordSuggestions.length === 0 ? (
            <EmptyState message="Add your business name and location to get local keyword suggestions." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {localKeywordSuggestions.map((kw, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm font-medium">{kw}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Local Rank Tracking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
                Local Rank Tracking
              </CardTitle>
              <CardDescription>Track your position in Google's local map pack for target keywords in specific locations</CardDescription>
            </div>
            <PriorityBadge level="critical" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Input
              placeholder="Keyword (e.g., plumber)"
              value={rankKeyword}
              onChange={(e) => setRankKeyword(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder={location || "Location (e.g., Hartford, CT)"}
              value={rankLocation}
              onChange={(e) => setRankLocation(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => {
                const kw = rankKeyword.trim();
                const loc = rankLocation.trim() || location;
                if (kw && loc) checkLocalRank.mutate({ keyword: kw, location: loc });
              }}
              disabled={checkLocalRank.isPending || !rankKeyword.trim()}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
            >
              {checkLocalRank.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              Check Rank
            </Button>
          </div>

          {localRankings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Keyword</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Location</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Map Pack</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Organic</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {localRankings.map((r: any) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-3 font-medium text-sm">{r.keyword}</td>
                      <td className="py-3 text-sm text-gray-600">{r.location}</td>
                      <td className="py-3 text-center">
                        {r.mapPackPosition ? (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                            r.mapPackPosition <= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>#{r.mapPackPosition}</span>
                        ) : <span className="text-xs text-gray-400">Not in pack</span>}
                      </td>
                      <td className="py-3 text-center">
                        {r.organicPosition ? (
                          <span className={`font-bold text-sm ${
                            r.organicPosition <= 10 ? 'text-green-600' : r.organicPosition <= 30 ? 'text-yellow-600' : 'text-gray-500'
                          }`}>#{r.organicPosition}</span>
                        ) : <span className="text-xs text-gray-400">Not found</span>}
                      </td>
                      <td className="py-3 text-center text-xs text-gray-400">
                        {r.checkedAt ? new Date(r.checkedAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <MapPin className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500">No local rankings tracked yet. Enter a keyword and location above to start.</p>
              <p className="text-xs text-gray-400 mt-1">For the local map pack, this is the most important ranking to monitor.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ChecklistItem({ checked, label, detail }: { checked: boolean; label: string; detail: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${checked ? 'bg-green-100' : 'bg-gray-100'}`}>
        {checked ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Minus className="w-4 h-4 text-gray-400" />}
      </div>
      <div>
        <p className={`text-sm font-medium ${checked ? 'text-gray-900' : 'text-gray-500'}`}>{label}</p>
        <p className="text-xs text-gray-400">{detail}</p>
      </div>
    </div>
  );
}

// =============================================
// SCHEMA MARKUP TAB
// =============================================

const SCHEMA_TYPES = [
  { value: 'LocalBusiness', label: 'Local Business' },
  { value: 'Product', label: 'Product' },
  { value: 'FAQ', label: 'FAQ' },
  { value: 'Event', label: 'Event' },
  { value: 'Restaurant', label: 'Restaurant' },
];

function SchemaTab() {
  const { toast } = useToast();
  const [schemaType, setSchemaType] = useState('LocalBusiness');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [faqItems, setFaqItems] = useState([{ question: '', answer: '' }]);
  const [generatedSchema, setGeneratedSchema] = useState('');

  const { data: profileData } = useQuery({
    queryKey: ['/api/seo/profiles'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/profiles'); return res.json(); },
  });

  const profile = profileData?.profile;

  // Pre-fill from profile when type changes
  useEffect(() => {
    const defaults: Record<string, string> = {};
    if (schemaType === 'LocalBusiness' || schemaType === 'Restaurant') {
      defaults.name = profile?.businessName || '';
      defaults.address = profile?.location || '';
      defaults.url = profile?.domain ? (profile.domain.startsWith('http') ? profile.domain : `https://${profile.domain}`) : '';
    }
    setFormData(defaults);
    setFaqItems([{ question: '', answer: '' }]);
    setGeneratedSchema('');
  }, [schemaType, profile?.businessName, profile?.location, profile?.domain]);

  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const generateSchema = () => {
    let schema: any = {};

    if (schemaType === 'LocalBusiness') {
      schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": formData.name || "Your Business Name",
        "description": formData.description || "",
        "url": formData.url || "",
        "telephone": formData.phone || "",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": formData.streetAddress || "",
          "addressLocality": formData.city || "",
          "addressRegion": formData.state || "",
          "postalCode": formData.zip || "",
          "addressCountry": formData.country || "US"
        },
        "openingHours": formData.hours || "",
        "priceRange": formData.priceRange || ""
      };
      if (formData.image) schema.image = formData.image;
    } else if (schemaType === 'Restaurant') {
      schema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": formData.name || "Your Restaurant Name",
        "description": formData.description || "",
        "url": formData.url || "",
        "telephone": formData.phone || "",
        "servesCuisine": formData.cuisine || "",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": formData.streetAddress || "",
          "addressLocality": formData.city || "",
          "addressRegion": formData.state || "",
          "postalCode": formData.zip || "",
          "addressCountry": formData.country || "US"
        },
        "openingHours": formData.hours || "",
        "priceRange": formData.priceRange || "",
        "menu": formData.menuUrl || ""
      };
      if (formData.image) schema.image = formData.image;
    } else if (schemaType === 'Product') {
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": formData.productName || "Product Name",
        "description": formData.description || "",
        "image": formData.image || "",
        "brand": {
          "@type": "Brand",
          "name": formData.brand || ""
        },
        "offers": {
          "@type": "Offer",
          "price": formData.price || "",
          "priceCurrency": formData.currency || "USD",
          "availability": formData.availability || "https://schema.org/InStock",
          "url": formData.url || ""
        }
      };
      if (formData.sku) schema.sku = formData.sku;
    } else if (schemaType === 'FAQ') {
      const validFaqs = faqItems.filter(f => f.question.trim() && f.answer.trim());
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": validFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    } else if (schemaType === 'Event') {
      schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": formData.eventName || "Event Name",
        "description": formData.description || "",
        "startDate": formData.startDate || "",
        "endDate": formData.endDate || "",
        "location": {
          "@type": "Place",
          "name": formData.venueName || "",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": formData.streetAddress || "",
            "addressLocality": formData.city || "",
            "addressRegion": formData.state || "",
            "postalCode": formData.zip || ""
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": formData.organizer || "",
          "url": formData.organizerUrl || ""
        }
      };
      if (formData.image) schema.image = formData.image;
      if (formData.ticketUrl) {
        schema.offers = {
          "@type": "Offer",
          "url": formData.ticketUrl,
          "price": formData.ticketPrice || "",
          "priceCurrency": formData.currency || "USD",
          "availability": "https://schema.org/InStock"
        };
      }
    }

    // Clean up empty strings
    const cleanSchema = JSON.parse(JSON.stringify(schema, (key, value) => {
      if (value === "" && key !== "@context" && key !== "@type") return undefined;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const entries = Object.entries(value).filter(([k, v]) => v !== undefined && v !== "");
        if (entries.length === 0) return undefined;
      }
      return value;
    }));

    const output = JSON.stringify(cleanSchema, null, 2);
    setGeneratedSchema(output);
    toast({ title: "Schema Generated", description: "Your JSON-LD markup is ready to copy" });
  };

  const copyToClipboard = () => {
    const scriptTag = `<script type="application/ld+json">\n${generatedSchema}\n</script>`;
    navigator.clipboard.writeText(scriptTag).then(() => {
      toast({ title: "Copied!", description: "Schema markup copied to clipboard. Paste it into your website's <head> section." });
    }).catch(() => {
      toast({ title: "Copy Failed", description: "Please select and copy the markup manually.", variant: "destructive" });
    });
  };

  const renderFormFields = () => {
    if (schemaType === 'LocalBusiness' || schemaType === 'Restaurant') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Business Name *</Label>
            <Input value={formData.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="Acme Coffee Shop" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Phone</Label>
            <Input value={formData.phone || ''} onChange={(e) => updateField('phone', e.target.value)} placeholder="+1-555-123-4567" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="text-sm">Description</Label>
            <Textarea value={formData.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="A brief description of your business..." rows={2} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Website URL</Label>
            <Input value={formData.url || ''} onChange={(e) => updateField('url', e.target.value)} placeholder="https://example.com" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Street Address</Label>
            <Input value={formData.streetAddress || ''} onChange={(e) => updateField('streetAddress', e.target.value)} placeholder="123 Main St" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">City</Label>
            <Input value={formData.city || ''} onChange={(e) => updateField('city', e.target.value)} placeholder="San Francisco" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">State</Label>
            <Input value={formData.state || ''} onChange={(e) => updateField('state', e.target.value)} placeholder="CA" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">ZIP Code</Label>
            <Input value={formData.zip || ''} onChange={(e) => updateField('zip', e.target.value)} placeholder="94102" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Opening Hours</Label>
            <Input value={formData.hours || ''} onChange={(e) => updateField('hours', e.target.value)} placeholder="Mo-Fr 09:00-17:00" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Price Range</Label>
            <Input value={formData.priceRange || ''} onChange={(e) => updateField('priceRange', e.target.value)} placeholder="$$" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Image URL</Label>
            <Input value={formData.image || ''} onChange={(e) => updateField('image', e.target.value)} placeholder="https://example.com/photo.jpg" />
          </div>
          {schemaType === 'Restaurant' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm">Cuisine Type</Label>
                <Input value={formData.cuisine || ''} onChange={(e) => updateField('cuisine', e.target.value)} placeholder="Italian, Mexican, etc." />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Menu URL</Label>
                <Input value={formData.menuUrl || ''} onChange={(e) => updateField('menuUrl', e.target.value)} placeholder="https://example.com/menu" />
              </div>
            </>
          )}
        </div>
      );
    }

    if (schemaType === 'Product') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Product Name *</Label>
            <Input value={formData.productName || ''} onChange={(e) => updateField('productName', e.target.value)} placeholder="Widget Pro 2000" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Brand</Label>
            <Input value={formData.brand || ''} onChange={(e) => updateField('brand', e.target.value)} placeholder="Acme Corp" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="text-sm">Description</Label>
            <Textarea value={formData.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Product description..." rows={2} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Price</Label>
            <Input value={formData.price || ''} onChange={(e) => updateField('price', e.target.value)} placeholder="29.99" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Currency</Label>
            <Input value={formData.currency || 'USD'} onChange={(e) => updateField('currency', e.target.value)} placeholder="USD" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">SKU</Label>
            <Input value={formData.sku || ''} onChange={(e) => updateField('sku', e.target.value)} placeholder="WP-2000" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Product URL</Label>
            <Input value={formData.url || ''} onChange={(e) => updateField('url', e.target.value)} placeholder="https://example.com/product" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Image URL</Label>
            <Input value={formData.image || ''} onChange={(e) => updateField('image', e.target.value)} placeholder="https://example.com/product.jpg" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Availability</Label>
            <Select value={formData.availability || 'https://schema.org/InStock'} onValueChange={(v) => updateField('availability', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="https://schema.org/InStock">In Stock</SelectItem>
                <SelectItem value="https://schema.org/OutOfStock">Out of Stock</SelectItem>
                <SelectItem value="https://schema.org/PreOrder">Pre-Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    if (schemaType === 'FAQ') {
      return (
        <div className="space-y-4">
          {faqItems.map((faq, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Question {idx + 1}</Label>
                {faqItems.length > 1 && (
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-600"
                    onClick={() => setFaqItems(prev => prev.filter((_, i) => i !== idx))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Input
                value={faq.question}
                onChange={(e) => {
                  const updated = [...faqItems];
                  updated[idx] = { ...updated[idx], question: e.target.value };
                  setFaqItems(updated);
                }}
                placeholder="What is your return policy?"
              />
              <Textarea
                value={faq.answer}
                onChange={(e) => {
                  const updated = [...faqItems];
                  updated[idx] = { ...updated[idx], answer: e.target.value };
                  setFaqItems(updated);
                }}
                placeholder="We offer a 30-day money-back guarantee..."
                rows={2}
              />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setFaqItems(prev => [...prev, { question: '', answer: '' }])}>
            <Plus className="w-4 h-4 mr-2" /> Add Question
          </Button>
        </div>
      );
    }

    if (schemaType === 'Event') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Event Name *</Label>
            <Input value={formData.eventName || ''} onChange={(e) => updateField('eventName', e.target.value)} placeholder="Annual Community Fair" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Venue Name</Label>
            <Input value={formData.venueName || ''} onChange={(e) => updateField('venueName', e.target.value)} placeholder="City Convention Center" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="text-sm">Description</Label>
            <Textarea value={formData.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Event description..." rows={2} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Start Date</Label>
            <Input type="datetime-local" value={formData.startDate || ''} onChange={(e) => updateField('startDate', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">End Date</Label>
            <Input type="datetime-local" value={formData.endDate || ''} onChange={(e) => updateField('endDate', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Street Address</Label>
            <Input value={formData.streetAddress || ''} onChange={(e) => updateField('streetAddress', e.target.value)} placeholder="123 Main St" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">City</Label>
            <Input value={formData.city || ''} onChange={(e) => updateField('city', e.target.value)} placeholder="San Francisco" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">State</Label>
            <Input value={formData.state || ''} onChange={(e) => updateField('state', e.target.value)} placeholder="CA" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">ZIP Code</Label>
            <Input value={formData.zip || ''} onChange={(e) => updateField('zip', e.target.value)} placeholder="94102" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Organizer</Label>
            <Input value={formData.organizer || ''} onChange={(e) => updateField('organizer', e.target.value)} placeholder="Community Events Inc." />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Ticket URL</Label>
            <Input value={formData.ticketUrl || ''} onChange={(e) => updateField('ticketUrl', e.target.value)} placeholder="https://tickets.example.com" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Ticket Price</Label>
            <Input value={formData.ticketPrice || ''} onChange={(e) => updateField('ticketPrice', e.target.value)} placeholder="25.00" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Image URL</Label>
            <Input value={formData.image || ''} onChange={(e) => updateField('image', e.target.value)} placeholder="https://example.com/event.jpg" />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Explainer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
              <Code2 className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: OPTIMIZE_COLOR }}>Schema Markup Generator</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Schema markup (JSON-LD) is structured data you add to your website that helps search engines understand your content better.
                It can make your search results more eye-catching with rich snippets like star ratings, pricing, and event dates.
                Fill out the form below, generate the markup, and paste it into your website's HTML.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Hash className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
            Choose Schema Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {SCHEMA_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setSchemaType(type.value)}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  schemaType === type.value
                    ? 'text-white border-transparent'
                    : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
                style={schemaType === type.value ? { backgroundColor: OPTIMIZE_COLOR } : {}}
              >
                {type.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {SCHEMA_TYPES.find(t => t.value === schemaType)?.label} Details
          </CardTitle>
          <CardDescription>Fill in the fields below. Required fields are marked with *</CardDescription>
        </CardHeader>
        <CardContent>
          {renderFormFields()}
          <div className="mt-6">
            <Button
              onClick={generateSchema}
              style={{ backgroundColor: OPTIMIZE_COLOR }}
              className="text-white"
              data-testid="button-generate-schema"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Generate Schema Markup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Output */}
      {generatedSchema && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clipboard className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
                Generated JSON-LD
              </CardTitle>
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                data-testid="button-copy-schema"
              >
                <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
              </Button>
            </div>
            <CardDescription>Paste this code into the {'<head>'} section of your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
                {`<script type="application/ld+json">\n${generatedSchema}\n</script>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// =============================================
// REPORTS TAB
// =============================================

function ReportsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState('30');

  const { data: dashData, isLoading: dashLoading } = useQuery({
    queryKey: ['/api/seo/dashboard'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/dashboard'); return res.json(); },
  });

  const { data: keywordsData, isLoading: keywordsLoading } = useQuery({
    queryKey: ['/api/seo/keywords'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/keywords'); return res.json(); },
  });

  const { data: pagesData, isLoading: pagesLoading } = useQuery({
    queryKey: ['/api/seo/pages'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/pages'); return res.json(); },
  });

  const { data: issuesData, isLoading: issuesLoading } = useQuery({
    queryKey: ['/api/seo/technical-issues'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/technical-issues'); return res.json(); },
  });

  const { data: briefsData } = useQuery({
    queryKey: ['/api/seo/content-briefs'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/content-briefs'); return res.json(); },
  });

  const { data: scansData } = useQuery({
    queryKey: ['/api/seo/scans'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/scans'); return res.json(); },
  });

  const { data: storedReportsData } = useQuery({
    queryKey: ['/api/seo/reports'],
    queryFn: async () => { const res = await apiRequest('GET', '/api/seo/reports'); return res.json(); },
  });

  const generateReport = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/reports/generate', {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/reports'] });
      toast({ title: "Report Generated", description: "Your SEO report has been saved." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to generate report", variant: "destructive" });
    },
  });

  const isLoading = dashLoading || keywordsLoading || pagesLoading || issuesLoading;

  if (isLoading) return <LoadingState />;

  const dashboard = dashData?.data;
  const keywords = keywordsData?.keywords || [];
  const pages = pagesData?.pages || [];
  const issues = issuesData?.issues || [];
  const briefs = briefsData?.briefs || [];
  const scans = scansData?.scans || [];

  const openIssues = issues.filter((i: any) => i.status === 'open');
  const criticalIssues = openIssues.filter((i: any) => i.severity === 'critical');
  const highIssues = openIssues.filter((i: any) => i.severity === 'high');
  const avgPageScore = pages.length > 0
    ? Math.round(pages.reduce((sum: number, p: any) => sum + (p.score || 0), 0) / pages.length)
    : null;

  // Filter scans by date range
  const now = new Date();
  const rangeMs = parseInt(dateRange) * 24 * 60 * 60 * 1000;
  const filteredScans = scans.filter((s: any) => {
    const scanDate = new Date(s.createdAt);
    return now.getTime() - scanDate.getTime() <= rangeMs;
  });

  const handleExport = () => {
    const lines: string[] = [];
    lines.push('SEO Performance Report');
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push(`Period: Last ${dateRange} days`);
    lines.push('');
    lines.push('=== OVERVIEW ===');
    lines.push(`Overall SEO Score: ${dashboard?.overallScore ?? 'N/A'}/100`);
    lines.push(`Performance Score: ${dashboard?.performanceScore ?? 'N/A'}/100`);
    lines.push(`SEO Score: ${dashboard?.seoScore ?? 'N/A'}/100`);
    lines.push(`Accessibility Score: ${dashboard?.accessibilityScore ?? 'N/A'}/100`);
    lines.push('');
    lines.push('=== KEYWORDS ===');
    lines.push(`Keywords Tracked: ${keywords.length}`);
    keywords.forEach((kw: any) => {
      lines.push(`  ${kw.keyword} — Rank: ${kw.currentRank || 'N/A'}, Volume: ${kw.searchVolume || 'N/A'}, Difficulty: ${kw.difficulty || 'N/A'}`);
    });
    lines.push('');
    lines.push('=== PAGES ===');
    lines.push(`Pages Analyzed: ${pages.length}`);
    lines.push(`Average Page Score: ${avgPageScore ?? 'N/A'}/100`);
    pages.forEach((p: any) => {
      lines.push(`  ${p.url} — Score: ${p.score ?? 'N/A'}/100, Words: ${p.wordCount || 'N/A'}`);
    });
    lines.push('');
    lines.push('=== TECHNICAL ISSUES ===');
    lines.push(`Open Issues: ${openIssues.length}`);
    lines.push(`  Critical: ${criticalIssues.length}`);
    lines.push(`  High: ${highIssues.length}`);
    openIssues.forEach((issue: any) => {
      lines.push(`  [${issue.severity?.toUpperCase()}] ${issue.description}`);
    });
    lines.push('');
    lines.push('=== CONTENT BRIEFS ===');
    lines.push(`Total Briefs: ${briefs.length}`);
    briefs.forEach((b: any) => {
      lines.push(`  "${b.targetKeyword}" — ${b.title} (${b.status})`);
    });
    lines.push('');
    lines.push(`=== SCANS (Last ${dateRange} Days) ===`);
    lines.push(`Total Scans: ${filteredScans.length}`);
    filteredScans.forEach((s: any) => {
      lines.push(`  ${new Date(s.createdAt).toLocaleDateString()} — ${s.scanType} — Score: ${s.overallScore ?? 'N/A'} — ${s.status}`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report Exported", description: "Your SEO report has been downloaded." });
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold" style={{ color: OPTIMIZE_COLOR }}>SEO Performance Report</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => generateReport.mutate()}
            disabled={generateReport.isPending}
            style={{ backgroundColor: OPTIMIZE_COLOR }}
            className="text-white"
            size="sm"
            data-testid="button-generate-report"
          >
            {generateReport.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Generate Report
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            data-testid="button-export-report"
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Stored Reports */}
      {(storedReportsData?.reports?.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saved Reports</CardTitle>
            <CardDescription>Previously generated SEO performance reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {storedReportsData.reports.map((report: any) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
                      <BarChart3 className="w-5 h-5" style={{ color: OPTIMIZE_COLOR }} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {report.period || (report.createdAt ? `Report — ${new Date(report.createdAt).toLocaleDateString()}` : 'SEO Report')}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        {report.overallScore !== null && report.overallScore !== undefined && (
                          <span>Score: <strong className={report.overallScore >= 70 ? 'text-green-600' : report.overallScore >= 40 ? 'text-yellow-600' : 'text-red-600'}>{report.overallScore}/100</strong></span>
                        )}
                        {report.issueCount !== null && report.issueCount !== undefined && (
                          <span>Issues: {report.issueCount}</span>
                        )}
                        {report.keywordCount !== null && report.keywordCount !== undefined && (
                          <span>Keywords: {report.keywordCount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
              (dashboard?.overallScore ?? 0) >= 70 ? 'bg-green-100' :
              (dashboard?.overallScore ?? 0) >= 40 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <Target className={`w-5 h-5 ${
                (dashboard?.overallScore ?? 0) >= 70 ? 'text-green-600' :
                (dashboard?.overallScore ?? 0) >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>
            <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>
              {dashboard?.overallScore ?? '—'}
            </p>
            <p className="text-xs text-gray-500 font-medium">Overall Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{keywords.length}</p>
            <p className="text-xs text-gray-500 font-medium">Keywords Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{pages.length}</p>
            <p className="text-xs text-gray-500 font-medium">Pages Analyzed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
              criticalIssues.length > 0 ? 'bg-red-100' : 'bg-green-100'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${criticalIssues.length > 0 ? 'text-red-600' : 'text-green-600'}`} />
            </div>
            <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{openIssues.length}</p>
            <p className="text-xs text-gray-500 font-medium">Open Issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <PenTool className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold" style={{ color: OPTIMIZE_COLOR }}>{briefs.length}</p>
            <p className="text-xs text-gray-500 font-medium">Content Briefs</p>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown */}
      {(dashboard?.performanceScore !== null || dashboard?.seoScore !== null) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScoreBreakdownItem label="Performance" score={dashboard?.performanceScore} />
              <ScoreBreakdownItem label="SEO" score={dashboard?.seoScore} />
              <ScoreBreakdownItem label="Accessibility" score={dashboard?.accessibilityScore} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issue Breakdown */}
      {openIssues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Issue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-red-50">
                <p className="text-2xl font-bold text-red-600">{criticalIssues.length}</p>
                <p className="text-xs text-red-600 font-medium">Critical</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-orange-50">
                <p className="text-2xl font-bold text-orange-600">{highIssues.length}</p>
                <p className="text-xs text-orange-600 font-medium">High</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-50">
                <p className="text-2xl font-bold text-yellow-600">
                  {openIssues.filter((i: any) => i.severity === 'medium').length}
                </p>
                <p className="text-xs text-yellow-600 font-medium">Medium</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-50">
                <p className="text-2xl font-bold text-blue-600">
                  {openIssues.filter((i: any) => i.severity === 'low').length}
                </p>
                <p className="text-xs text-blue-600 font-medium">Low</p>
              </div>
            </div>
            <div className="space-y-2">
              {openIssues.slice(0, 5).map((issue: any) => (
                <div key={issue.id} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                  <Badge variant={issue.severity === 'critical' || issue.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {issue.severity}
                  </Badge>
                  <span className="text-gray-700 truncate">{issue.description}</span>
                </div>
              ))}
              {openIssues.length > 5 && (
                <p className="text-xs text-gray-400 text-center">+{openIssues.length - 5} more issues</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keywords Summary */}
      {keywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Keyword</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Rank</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Volume</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 text-center">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.slice(0, 10).map((kw: any) => (
                    <tr key={kw.id} className="border-b last:border-0">
                      <td className="py-2 text-sm font-medium">{kw.keyword}</td>
                      <td className="py-2 text-center">
                        {kw.currentRank ? (
                          <span className={`font-bold text-sm ${kw.currentRank <= 10 ? 'text-green-600' : kw.currentRank <= 30 ? 'text-yellow-600' : 'text-gray-500'}`}>
                            #{kw.currentRank}
                          </span>
                        ) : <span className="text-gray-400 text-sm">--</span>}
                      </td>
                      <td className="py-2 text-center text-sm text-gray-600">{kw.searchVolume?.toLocaleString() || '--'}</td>
                      <td className="py-2 text-center">
                        {kw.difficulty ? (
                          <Badge variant={kw.difficulty <= 30 ? 'default' : kw.difficulty <= 60 ? 'secondary' : 'destructive'} className="text-xs">
                            {kw.difficulty}/100
                          </Badge>
                        ) : <span className="text-gray-400 text-sm">--</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {keywords.length > 10 && (
              <p className="text-xs text-gray-400 text-center mt-2">Showing top 10 of {keywords.length} keywords</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Page Scores */}
      {pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Page Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Average Page Score:</span>
              <ScoreBadge score={avgPageScore} />
            </div>
            <div className="space-y-2">
              {pages.slice(0, 8).map((page: any) => (
                <div key={page.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium truncate">{page.title || page.url}</p>
                    <p className="text-xs text-gray-400 truncate">{page.url}</p>
                  </div>
                  <ScoreBadge score={page.score} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan History */}
      {filteredScans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan History (Last {dateRange} Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredScans.map((scan: any) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={scan.status === 'completed' ? 'default' : scan.status === 'running' ? 'secondary' : 'destructive'}>
                      {scan.status}
                    </Badge>
                    <span className="text-sm text-gray-600">{scan.scanType} scan</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {scan.overallScore !== null && (
                      <span className="font-bold text-sm" style={{ color: OPTIMIZE_COLOR }}>{scan.overallScore}/100</span>
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

      {/* No Data State */}
      {!dashboard && keywords.length === 0 && pages.length === 0 && (
        <EmptyState message="No SEO data available yet. Run a scan and add keywords from the other tabs to see your report." />
      )}
    </div>
  );
}

function ScoreBreakdownItem({ label, score }: { label: string; score: number | null | undefined }) {
  if (score === null || score === undefined) return null;
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="h-3 rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
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

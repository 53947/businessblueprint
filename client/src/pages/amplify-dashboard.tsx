import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard, Megaphone, Search as SearchIcon, MessageCircle,
  Layers, DollarSign, FileBarChart, Loader2, Plus, Download,
  Pause, Play, Trash2, CheckCircle2, XCircle, Link2,
  Sparkles, ThumbsUp, Users, Settings, Palette,
  BarChart3, Globe, Hash,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { apiRequest } from "@/lib/queryClient";

const AMPLIFY_COLOR = "#6EA6FF";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "meta", label: "Meta Base", icon: Megaphone },
  { id: "google", label: "Google Base", icon: Globe },
  { id: "reddit", label: "Reddit Base", icon: MessageCircle },
  { id: "campaigns", label: "Campaigns", icon: Layers },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "reports", label: "Reports", icon: FileBarChart },
];

// ─── Types ───────────────────────────────────────

interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: "active" | "paused" | "draft" | "completed";
  budget: number;
  spend: number;
  results?: number;
  clicks?: number;
  conversions?: number;
  roas?: number;
  engagementScore?: number;
  upvoteRatio?: number;
  sentiment?: "positive" | "neutral" | "negative";
}

interface ConnectedAccount {
  platform: string;
  connected: boolean;
  accountName?: string;
}

interface BudgetAllocation {
  platform: string;
  percentage: number;
  amount: number;
  spent: number;
}

interface RedditComment {
  id: number;
  campaignName: string;
  subreddit: string;
  author: string;
  body: string;
  sentiment: "positive" | "neutral" | "negative";
  upvotes: number;
  createdAt: string;
}

// ─── Main Component ──────────────────────────────

export default function AmplifyDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionHeader
        title="/ amplify"
        subtitle="Paid Advertising Suite"
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
                  ? "text-white border-b-2"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              style={
                activeTab === tab.id
                  ? { backgroundColor: AMPLIFY_COLOR, borderColor: AMPLIFY_COLOR }
                  : {}
              }
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "meta" && <MetaBaseTab />}
        {activeTab === "google" && <GoogleBaseTab />}
        {activeTab === "reddit" && <RedditBaseTab />}
        {activeTab === "campaigns" && <CampaignsTab />}
        {activeTab === "budget" && <BudgetTab />}
        {activeTab === "reports" && <ReportsTab />}
      </div>
    </div>
  );
}

// ─── Helper: Status Badge ────────────────────────

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    active: { variant: "default", label: "Active" },
    paused: { variant: "secondary", label: "Paused" },
    draft: { variant: "outline", label: "Draft" },
    completed: { variant: "secondary", label: "Completed" },
  };
  const c = config[status] || { variant: "outline" as const, label: status };
  return (
    <Badge
      variant={c.variant}
      style={status === "active" ? { backgroundColor: AMPLIFY_COLOR } : {}}
    >
      {c.label}
    </Badge>
  );
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const colors: Record<string, string> = {
    positive: "#22c55e",
    neutral: "#f59e0b",
    negative: "#ef4444",
  };
  return (
    <Badge style={{ backgroundColor: colors[sentiment] || "#9ca3af", color: "#fff" }}>
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </Badge>
  );
}

function EmptyState({ message, action, onAction }: { message: string; action?: string; onAction?: () => void }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Layers className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">{message}</p>
        {action && onAction && (
          <Button onClick={onAction} style={{ backgroundColor: AMPLIFY_COLOR }}>
            <Plus className="w-4 h-4 mr-2" />
            {action}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

// ─── OVERVIEW TAB ────────────────────────────────

function OverviewTab() {
  const [, setLocation] = useLocation();

  const { data: accountsData, isLoading: accountsLoading } = useQuery({
    queryKey: ["/api/amplify/accounts"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/accounts");
      return res.json();
    },
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/amplify/stats"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/stats");
      return res.json();
    },
  });

  const accounts: ConnectedAccount[] = accountsData?.accounts ?? [
    { platform: "Meta", connected: false },
    { platform: "Google", connected: false },
    { platform: "Microsoft", connected: false },
    { platform: "Reddit", connected: false },
  ];

  const stats = statsData ?? {
    activeCampaigns: 0,
    totalSpend: 0,
    averageRoas: 0,
  };

  const platformIcons: Record<string, React.ReactNode> = {
    Meta: <Megaphone className="w-5 h-5" />,
    Google: <Globe className="w-5 h-5" />,
    Microsoft: <BarChart3 className="w-5 h-5" />,
    Reddit: <MessageCircle className="w-5 h-5" />,
  };

  return (
    <div className="space-y-6">
      {/* Connected Accounts */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Connected Accounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <Card key={account.platform}>
              <CardContent className="flex items-center gap-3 py-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: account.connected ? `${AMPLIFY_COLOR}20` : "#f3f4f6" }}
                >
                  {platformIcons[account.platform] || <Globe className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{account.platform}</p>
                  {account.connected ? (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <XCircle className="w-3 h-3" /> Not Connected
                    </span>
                  )}
                </div>
                {account.connected && account.accountName && (
                  <span className="text-xs text-gray-500">{account.accountName}</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Total Active Campaigns</p>
            <p className="text-3xl font-bold" style={{ color: AMPLIFY_COLOR }}>
              {statsLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.activeCampaigns}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Total Spend This Month</p>
            <p className="text-3xl font-bold" style={{ color: AMPLIFY_COLOR }}>
              {statsLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : formatCurrency(stats.totalSpend)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Average ROAS</p>
            <p className="text-3xl font-bold" style={{ color: AMPLIFY_COLOR }}>
              {statsLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : `${stats.averageRoas.toFixed(2)}x`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ScansBlue Recommendation Card */}
      <Card className="border-dashed border-2" style={{ borderColor: AMPLIFY_COLOR }}>
        <CardContent className="flex items-start gap-4 py-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${AMPLIFY_COLOR}20` }}
          >
            <Sparkles className="w-5 h-5" style={{ color: AMPLIFY_COLOR }} />
          </div>
          <div>
            <h3 className="font-semibold mb-1">ScansBlue Recommendations</h3>
            <p className="text-sm text-gray-500">
              Connect your ad accounts to get personalized recommendations powered by ScansBlue AI.
              We'll analyze your campaigns and suggest optimizations to improve your ROAS.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setLocation("/amplify/campaigns/new")}
          style={{ backgroundColor: AMPLIFY_COLOR }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
        <Button variant="outline" onClick={() => setLocation("/amplify/connect")}>
          <Link2 className="w-4 h-4 mr-2" />
          Connect Account
        </Button>
        <Button variant="outline" onClick={() => setLocation("/amplify/reports")}>
          <FileBarChart className="w-4 h-4 mr-2" />
          View Reports
        </Button>
      </div>
    </div>
  );
}

// ─── META BASE TAB ───────────────────────────────

function MetaBaseTab() {
  const [, setLocation] = useLocation();
  const [subTab, setSubTab] = useState("campaigns");

  const { data, isLoading } = useQuery({
    queryKey: ["/api/amplify/meta/campaigns"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/meta/campaigns");
      return res.json();
    },
  });

  const campaigns: Campaign[] = data?.campaigns ?? [];
  const subTabs = [
    { id: "campaigns", label: "Campaigns", icon: Layers },
    { id: "audiences", label: "Audiences", icon: Users },
    { id: "creatives", label: "Creatives", icon: Palette },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              subTab === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            style={subTab === tab.id ? { backgroundColor: AMPLIFY_COLOR } : {}}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === "campaigns" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Meta Campaigns</h3>
            <Button
              onClick={() => setLocation("/amplify/meta/new")}
              style={{ backgroundColor: AMPLIFY_COLOR }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Meta Campaign
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : campaigns.length === 0 ? (
            <EmptyState
              message="No Meta campaigns yet. Create your first campaign to get started."
              action="Create Meta Campaign"
              onAction={() => setLocation("/amplify/meta/new")}
            />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Results</TableHead>
                    <TableHead className="text-right">ROAS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((c) => (
                    <TableRow key={c.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell><StatusBadge status={c.status} /></TableCell>
                      <TableCell className="text-right">{formatCurrency(c.budget)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.spend)}</TableCell>
                      <TableCell className="text-right">{c.results ?? 0}</TableCell>
                      <TableCell className="text-right">{c.roas?.toFixed(2) ?? "0.00"}x</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </>
      )}

      {subTab === "audiences" && (
        <EmptyState message="No audiences configured yet. Create a campaign first, then define your target audiences." />
      )}
      {subTab === "creatives" && (
        <EmptyState message="No creatives uploaded yet. Add images and videos to use in your Meta campaigns." />
      )}
      {subTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle>Meta Account Settings</CardTitle>
            <CardDescription>Connect and configure your Meta Business account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Meta Business ID</label>
              <Input placeholder="Enter your Meta Business ID" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Ad Account ID</label>
              <Input placeholder="Enter your Ad Account ID" className="mt-1" />
            </div>
            <Button style={{ backgroundColor: AMPLIFY_COLOR }}>Save Settings</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── GOOGLE BASE TAB ─────────────────────────────

function GoogleBaseTab() {
  const [, setLocation] = useLocation();
  const [subTab, setSubTab] = useState("campaigns");

  const { data, isLoading } = useQuery({
    queryKey: ["/api/amplify/google/campaigns"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/google/campaigns");
      return res.json();
    },
  });

  const campaigns: Campaign[] = data?.campaigns ?? [];
  const subTabs = [
    { id: "campaigns", label: "Campaigns", icon: Layers },
    { id: "keywords", label: "Keywords", icon: Hash },
    { id: "audiences", label: "Audiences", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              subTab === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            style={subTab === tab.id ? { backgroundColor: AMPLIFY_COLOR } : {}}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === "campaigns" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Google & Microsoft Campaigns</h3>
            <Button
              onClick={() => setLocation("/amplify/google/new")}
              style={{ backgroundColor: AMPLIFY_COLOR }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Google Campaign
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : campaigns.length === 0 ? (
            <EmptyState
              message="No Google campaigns yet. Create your first campaign to get started."
              action="Create Google Campaign"
              onAction={() => setLocation("/amplify/google/new")}
            />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Conversions</TableHead>
                    <TableHead className="text-right">ROAS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((c) => (
                    <TableRow key={c.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{c.platform === "bing" ? "Microsoft" : "Google"}</Badge>
                      </TableCell>
                      <TableCell><StatusBadge status={c.status} /></TableCell>
                      <TableCell className="text-right">{formatCurrency(c.budget)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.spend)}</TableCell>
                      <TableCell className="text-right">{c.clicks ?? 0}</TableCell>
                      <TableCell className="text-right">{c.conversions ?? 0}</TableCell>
                      <TableCell className="text-right">{c.roas?.toFixed(2) ?? "0.00"}x</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </>
      )}

      {subTab === "keywords" && (
        <EmptyState message="No keywords tracked yet. Launch a Google campaign to start keyword tracking." />
      )}
      {subTab === "audiences" && (
        <EmptyState message="No audiences configured yet. Create a campaign first, then define your target audiences." />
      )}
      {subTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle>Google Ads Settings</CardTitle>
            <CardDescription>Connect and configure your Google Ads account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Google Ads Customer ID</label>
              <Input placeholder="e.g. 123-456-7890" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Microsoft Advertising Account ID</label>
              <Input placeholder="Enter your Microsoft Ads Account ID (optional)" className="mt-1" />
            </div>
            <Button style={{ backgroundColor: AMPLIFY_COLOR }}>Save Settings</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── REDDIT BASE TAB ─────────────────────────────

function RedditBaseTab() {
  const [, setLocation] = useLocation();
  const [subTab, setSubTab] = useState("campaigns");
  const [businessType, setBusinessType] = useState("");
  const [city, setCity] = useState("");

  const { data: campaignData, isLoading: campaignsLoading } = useQuery({
    queryKey: ["/api/amplify/reddit/campaigns"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/reddit/campaigns");
      return res.json();
    },
  });

  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ["/api/amplify/reddit/comments"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/reddit/comments");
      return res.json();
    },
    enabled: subTab === "comments",
  });

  const { data: subredditData, isLoading: subredditsLoading } = useQuery({
    queryKey: ["/api/amplify/reddit/subreddits", businessType, city],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/amplify/reddit/subreddits?type=${encodeURIComponent(businessType)}&city=${encodeURIComponent(city)}`);
      return res.json();
    },
    enabled: subTab === "intelligence" && businessType.length > 0,
  });

  const campaigns: Campaign[] = campaignData?.campaigns ?? [];
  const comments: RedditComment[] = commentsData?.comments ?? [];
  const subreddits = subredditData?.subreddits ?? [];

  const subTabs = [
    { id: "campaigns", label: "Campaigns", icon: Layers },
    { id: "intelligence", label: "Subreddit Intelligence", icon: SearchIcon },
    { id: "comments", label: "Comments", icon: MessageCircle },
    { id: "audiences", label: "Audiences", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            style={subTab === tab.id ? { backgroundColor: AMPLIFY_COLOR } : {}}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Campaigns Sub-tab */}
      {subTab === "campaigns" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reddit Campaigns</h3>
            <Button
              onClick={() => setLocation("/amplify/reddit/new")}
              style={{ backgroundColor: AMPLIFY_COLOR }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Reddit Campaign
            </Button>
          </div>

          {campaignsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : campaigns.length === 0 ? (
            <EmptyState
              message="No Reddit campaigns yet. Create your first campaign to get started."
              action="Create Reddit Campaign"
              onAction={() => setLocation("/amplify/reddit/new")}
            />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Engagement</TableHead>
                    <TableHead className="text-right">Upvote Ratio</TableHead>
                    <TableHead>Sentiment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((c) => (
                    <TableRow key={c.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell><StatusBadge status={c.status} /></TableCell>
                      <TableCell className="text-right">{formatCurrency(c.budget)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.spend)}</TableCell>
                      <TableCell className="text-right">{c.engagementScore ?? 0}</TableCell>
                      <TableCell className="text-right">{c.upvoteRatio != null ? `${(c.upvoteRatio * 100).toFixed(0)}%` : "N/A"}</TableCell>
                      <TableCell>
                        {c.sentiment ? <SentimentBadge sentiment={c.sentiment} /> : <span className="text-gray-400">--</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </>
      )}

      {/* Subreddit Intelligence Sub-tab */}
      {subTab === "intelligence" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subreddit Intelligence</h3>
          <Card>
            <CardContent className="py-4 space-y-4">
              <p className="text-sm text-gray-500">
                Enter your business type and target city to discover the best subreddits for your campaigns.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Business Type</label>
                  <Input
                    placeholder="e.g. Restaurant, SaaS, Real Estate"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <Input
                    placeholder="e.g. Austin, TX"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {subredditsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : subreddits.length > 0 ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subreddit</TableHead>
                    <TableHead className="text-right">Members</TableHead>
                    <TableHead>Relevance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subreddits.map((sr: { name: string; members: number; relevance: string }, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">r/{sr.name}</TableCell>
                      <TableCell className="text-right">{sr.members.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sr.relevance}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : businessType.length > 0 ? (
            <EmptyState message="No subreddit recommendations found. Try a different business type or city." />
          ) : (
            <EmptyState message="Enter a business type above to get subreddit recommendations." />
          )}
        </div>
      )}

      {/* Comments Sub-tab */}
      {subTab === "comments" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Campaign Comments</h3>
          {commentsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : comments.length === 0 ? (
            <EmptyState message="No comments yet. Comments will appear here once your Reddit campaigns are live." />
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">u/{comment.author}</span>
                          <span className="text-xs text-gray-400">in r/{comment.subreddit}</span>
                          <SentimentBadge sentiment={comment.sentiment} />
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{comment.body}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {comment.upvotes}
                          </span>
                          <span>{comment.campaignName}</span>
                          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-3.5 h-3.5 mr-1" />
                        Draft Response
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {subTab === "audiences" && (
        <EmptyState message="No audiences configured yet. Create a Reddit campaign first, then define your target audiences." />
      )}
      {subTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle>Reddit Ads Settings</CardTitle>
            <CardDescription>Connect and configure your Reddit Ads account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Reddit Ads Account ID</label>
              <Input placeholder="Enter your Reddit Ads Account ID" className="mt-1" />
            </div>
            <Button style={{ backgroundColor: AMPLIFY_COLOR }}>Save Settings</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── CAMPAIGNS TAB (Unified) ─────────────────────

function CampaignsTab() {
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data, isLoading } = useQuery({
    queryKey: ["/api/amplify/campaigns"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/campaigns");
      return res.json();
    },
  });

  const allCampaigns: Campaign[] = data?.campaigns ?? [];

  const filtered = allCampaigns.filter((c) => {
    if (platformFilter !== "all" && c.platform !== platformFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-semibold">All Campaigns</h3>
        <div className="flex items-center gap-3">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="meta">Meta</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="bing">Microsoft</SelectItem>
              <SelectItem value="reddit">Reddit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <span className="text-sm font-medium">{selectedIds.size} selected</span>
            <Button variant="outline" size="sm">
              <Pause className="w-3.5 h-3.5 mr-1" /> Pause
            </Button>
            <Button variant="outline" size="sm">
              <Play className="w-3.5 h-3.5 mr-1" /> Resume
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState message={allCampaigns.length === 0 ? "No campaigns yet. Create your first campaign to get started." : "No campaigns match the selected filters."} />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {c.platform === "bing" ? "Microsoft" : c.platform.charAt(0).toUpperCase() + c.platform.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="text-right">{formatCurrency(c.budget)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(c.spend)}</TableCell>
                  <TableCell className="text-right">{c.roas?.toFixed(2) ?? "0.00"}x</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

// ─── BUDGET TAB ──────────────────────────────────

function BudgetTab() {
  const [totalBudget, setTotalBudget] = useState(5000);
  const [allocations, setAllocations] = useState<BudgetAllocation[]>([
    { platform: "Meta", percentage: 40, amount: 2000, spent: 0 },
    { platform: "Google", percentage: 35, amount: 1750, spent: 0 },
    { platform: "Microsoft", percentage: 10, amount: 500, spent: 0 },
    { platform: "Reddit", percentage: 15, amount: 750, spent: 0 },
  ]);

  const { data: budgetData } = useQuery({
    queryKey: ["/api/amplify/budget"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/budget");
      return res.json();
    },
  });

  // Apply fetched budget data if available
  const currentAllocations = budgetData?.allocations ?? allocations;
  const currentTotal = budgetData?.totalBudget ?? totalBudget;

  const updateAllocation = (index: number, newPercentage: number) => {
    const updated = [...allocations];
    updated[index] = {
      ...updated[index],
      percentage: newPercentage,
      amount: (totalBudget * newPercentage) / 100,
    };
    setAllocations(updated);
  };

  const handleTotalBudgetChange = (value: number) => {
    setTotalBudget(value);
    setAllocations((prev) =>
      prev.map((a) => ({ ...a, amount: (value * a.percentage) / 100 }))
    );
  };

  const displayAllocations = allocations[0].amount > 0 ? allocations : currentAllocations;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Budget Allocation</h3>

      {/* Total Budget */}
      <Card>
        <CardContent className="py-4">
          <label className="text-sm font-medium text-gray-700">Total Monthly Budget</label>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-500">$</span>
            <Input
              type="number"
              value={totalBudget}
              onChange={(e) => handleTotalBudgetChange(Number(e.target.value))}
              className="max-w-[200px]"
              min={0}
              step={100}
            />
            <span className="text-sm text-gray-500">/ month</span>
          </div>
        </CardContent>
      </Card>

      {/* Platform Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayAllocations.map((alloc: BudgetAllocation, i: number) => {
          const spentPercent = alloc.amount > 0 ? Math.min((alloc.spent / alloc.amount) * 100, 100) : 0;
          const remaining = Math.max(alloc.amount - alloc.spent, 0);

          return (
            <Card key={alloc.platform}>
              <CardContent className="py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{alloc.platform}</h4>
                  <span className="text-sm font-semibold" style={{ color: AMPLIFY_COLOR }}>
                    {formatCurrency(alloc.amount)}
                  </span>
                </div>

                {/* Slider */}
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={alloc.percentage}
                    onChange={(e) => updateAllocation(i, Number(e.target.value))}
                    className="flex-1 accent-[#6EA6FF]"
                  />
                  <span className="text-sm font-medium w-12 text-right">{alloc.percentage}%</span>
                </div>

                {/* Spend Progress */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Spent: {formatCurrency(alloc.spent)}</span>
                    <span>Remaining: {formatCurrency(remaining)}</span>
                  </div>
                  <Progress value={spentPercent} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Allocation total warning */}
      {(() => {
        const total = allocations.reduce((s, a) => s + a.percentage, 0);
        if (total !== 100) {
          return (
            <p className="text-sm text-amber-600">
              Allocation total is {total}%. Adjust sliders to equal 100%.
            </p>
          );
        }
        return null;
      })()}

      <Button style={{ backgroundColor: AMPLIFY_COLOR }}>
        <DollarSign className="w-4 h-4 mr-2" />
        Save Budget
      </Button>
    </div>
  );
}

// ─── REPORTS TAB ─────────────────────────────────

function ReportsTab() {
  const [dateRange, setDateRange] = useState("30");

  const { data, isLoading } = useQuery({
    queryKey: ["/api/amplify/reports", dateRange],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/amplify/reports?days=${dateRange}`);
      return res.json();
    },
  });

  const platforms = data?.platforms ?? [
    { name: "Meta", spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0 },
    { name: "Google", spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0 },
    { name: "Microsoft", spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0 },
    { name: "Reddit", spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-semibold">Performance Reports</h3>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Platform Comparison Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Comparison</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((p: { name: string; spend: number; impressions: number; clicks: number; conversions: number; roas: number }) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.spend)}</TableCell>
                  <TableCell className="text-right">{p.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{p.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{p.conversions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{p.roas.toFixed(2)}x</TableCell>
                </TableRow>
              ))}
              {/* Totals row */}
              <TableRow className="border-t-2 font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{formatCurrency(platforms.reduce((s: number, p: { spend: number }) => s + p.spend, 0))}</TableCell>
                <TableCell className="text-right">{platforms.reduce((s: number, p: { impressions: number }) => s + p.impressions, 0).toLocaleString()}</TableCell>
                <TableCell className="text-right">{platforms.reduce((s: number, p: { clicks: number }) => s + p.clicks, 0).toLocaleString()}</TableCell>
                <TableCell className="text-right">{platforms.reduce((s: number, p: { conversions: number }) => s + p.conversions, 0).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {(() => {
                    const totalSpend = platforms.reduce((s: number, p: { spend: number }) => s + p.spend, 0);
                    const avgRoas = totalSpend > 0
                      ? platforms.reduce((s: number, p: { roas: number; spend: number }) => s + p.roas * p.spend, 0) / totalSpend
                      : 0;
                    return `${avgRoas.toFixed(2)}x`;
                  })()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Trends</CardTitle>
          <CardDescription>Visual charts coming soon. Data will be displayed as interactive graphs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="h-64 rounded-lg border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: `${AMPLIFY_COLOR}40` }}
          >
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" style={{ color: `${AMPLIFY_COLOR}60` }} />
              <p className="text-sm text-gray-400">Performance chart area</p>
              <p className="text-xs text-gray-300 mt-1">Spend, clicks, and conversions over time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date range picker for custom */}
      {dateRange === "custom" && (
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <Input type="date" className="mt-1" />
              </div>
            </div>
            <Button className="mt-3" style={{ backgroundColor: AMPLIFY_COLOR }}>
              Apply Range
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

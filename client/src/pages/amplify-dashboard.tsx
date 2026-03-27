import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  LayoutDashboard, Megaphone, Search as SearchIcon, MessageCircle,
  Layers, DollarSign, FileBarChart, Loader2, Plus, Download,
  Pause, Play, Trash2, CheckCircle2, XCircle, Link2,
  Sparkles, ThumbsUp, Users, Settings, Palette,
  BarChart3, Globe, Hash, ExternalLink, Eye, Send, ChevronDown, ChevronUp,
  Upload, Copy, AlertTriangle,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { apiRequest } from "@/lib/queryClient";

const AMPLIFY_COLOR = "#97ACCA";

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
  campaignId: number;
  campaignName: string;
  subreddit: string;
  author: string;
  body: string;
  sentiment: "positive" | "neutral" | "negative";
  upvotes: number;
  createdAt: string;
  suggestedResponse?: string;
  responded?: boolean;
  respondedAt?: string;
}

interface RedditCampaign extends Campaign {
  dailyBudget?: number;
  commentCount?: number;
  redditAdUrl?: string;
}

interface Subreddit {
  name: string;
  members: number;
  description: string;
  samplePosts: { title: string; url?: string }[];
  activity: "active" | "very_active";
  relevanceScore: number;
}

interface Audience {
  id: number;
  name: string;
  type: "custom" | "lookalike" | "saved";
  sizeEstimate: number;
  createdAt: string;
  platform: string;
}

interface RedditAccount {
  connected: boolean;
  accountName?: string;
  status?: string;
}

interface RedditPixel {
  installed: boolean;
  pixelId?: string;
}

interface NotificationPrefs {
  engagementDropAlert: boolean;
  budgetSpentAlert: boolean;
  newCommentAlert: boolean;
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

function ComingSoonCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100">
          <AlertTriangle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 max-w-md">{description}</p>
        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
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
        <ComingSoonCard
          title="Meta Audiences"
          description="Define and manage custom audiences, lookalike audiences, and retargeting segments for your Meta campaigns. Requires Meta Business account connection."
        />
      )}
      {subTab === "creatives" && (
        <ComingSoonCard
          title="Meta Creatives Library"
          description="Upload and manage ad images, videos, and carousels for use across your Meta campaigns. Requires Meta Business account connection."
        />
      )}
      {subTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle>Meta Account Connection</CardTitle>
            <CardDescription>
              Meta Ads integration requires OAuth connection to your Meta Business account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Meta Ads API integration is coming soon. Reddit advertising is fully available now.
              </p>
            </div>
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
        <ComingSoonCard
          title="Google Keyword Tracking"
          description="Track keyword bids, quality scores, and search term reports for your Google Ads campaigns. Requires Google Ads account connection."
        />
      )}
      {subTab === "audiences" && (
        <ComingSoonCard
          title="Google & Microsoft Audiences"
          description="Define in-market audiences, affinity segments, and custom intent audiences for Google and Microsoft campaigns. Requires account connection."
        />
      )}
      {subTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle>Google & Microsoft Account Connection</CardTitle>
            <CardDescription>
              Google Ads and Microsoft Advertising integrations require OAuth connection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Google Ads and Microsoft Advertising API integrations are coming soon. Reddit advertising is fully available now.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── REDDIT BASE TAB ─────────────────────────────

function formatMemberCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M members`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K members`;
  return `${count} members`;
}

function EngagementScoreBadge({ score }: { score: number }) {
  const color = score > 60 ? "#22c55e" : score >= 30 ? "#f59e0b" : "#ef4444";
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color }}>
      {score}
    </span>
  );
}

function RedditSentimentBadge({ sentiment }: { sentiment: string }) {
  const config: Record<string, { color: string; label: string }> = {
    positive: { color: "#22c55e", label: "Positive" },
    mixed: { color: "#f59e0b", label: "Mixed" },
    negative: { color: "#ef4444", label: "Negative" },
    neutral: { color: "#f59e0b", label: "Neutral" },
    insufficient_data: { color: "#9ca3af", label: "Insufficient Data" },
  };
  const c = config[sentiment] || { color: "#9ca3af", label: sentiment };
  return (
    <Badge style={{ backgroundColor: c.color, color: "#fff" }}>
      {c.label}
    </Badge>
  );
}

function RedditBaseTab() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [subTab, setSubTab] = useState("campaigns");

  // Campaigns state
  const [expandedCampaignId, setExpandedCampaignId] = useState<number | null>(null);

  // Intelligence state
  const [businessType, setBusinessType] = useState("");
  const [city, setCity] = useState("");
  const [scanTriggered, setScanTriggered] = useState(false);

  // Comments state
  const [commentFilter, setCommentFilter] = useState<"all" | "needs_response" | "responded">("all");
  const [commentSort, setCommentSort] = useState<"newest" | "sentiment">("newest");
  const [draftingCommentId, setDraftingCommentId] = useState<number | null>(null);
  const [draftResponses, setDraftResponses] = useState<Record<number, string>>({});

  // Audiences state
  const [audienceModalOpen, setAudienceModalOpen] = useState(false);
  const [newAudienceName, setNewAudienceName] = useState("");
  const [newAudienceType, setNewAudienceType] = useState<"custom" | "lookalike" | "saved">("custom");

  // Settings state
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>({
    engagementDropAlert: false,
    budgetSpentAlert: false,
    newCommentAlert: false,
  });

  // ── Queries ──

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
    enabled: subTab === "intelligence" && scanTriggered && businessType.length > 0,
  });

  const { data: audiencesData, isLoading: audiencesLoading } = useQuery({
    queryKey: ["/api/amplify/audiences", "reddit"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/audiences?platform=reddit");
      return res.json();
    },
    enabled: subTab === "audiences",
  });

  const { data: redditAccountData } = useQuery({
    queryKey: ["/api/amplify/accounts/reddit"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/accounts");
      return res.json();
    },
    enabled: subTab === "settings",
  });

  const { data: spendAlertsData } = useQuery({
    queryKey: ["/api/amplify/spend-alerts"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/amplify/spend-alerts");
      const data = await res.json();
      if (data) {
        setNotifPrefs({
          engagementDropAlert: data.engagementDropAlert ?? false,
          budgetSpentAlert: data.budgetSpentAlert ?? false,
          newCommentAlert: data.newCommentAlert ?? false,
        });
      }
      return data;
    },
    enabled: subTab === "settings",
  });

  // ── Mutations ──

  const pauseResumeMutation = useMutation({
    mutationFn: async ({ id, action }: { id: number; action: "pause" | "resume" }) => {
      const res = await apiRequest("PUT", `/api/amplify/reddit/campaigns/${id}/${action}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/amplify/reddit/campaigns"] });
    },
  });

  const respondToCommentMutation = useMutation({
    mutationFn: async ({ campaignId, commentId, body }: { campaignId: number; commentId: number; body: string }) => {
      const res = await apiRequest("POST", `/api/amplify/reddit/campaigns/${campaignId}/comments/${commentId}/respond`, { body });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/amplify/reddit/comments"] });
      setDraftingCommentId(null);
    },
  });

  const connectAccountMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/amplify/accounts/connect", { platform: "reddit" });
      return res.json();
    },
    onSuccess: (data) => {
      if (data?.oauthUrl) {
        window.open(data.oauthUrl, "_blank");
      }
      queryClient.invalidateQueries({ queryKey: ["/api/amplify/accounts/reddit"] });
    },
  });

  const disconnectAccountMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/amplify/accounts/disconnect", { platform: "reddit" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/amplify/accounts/reddit"] });
    },
  });

  const createAudienceMutation = useMutation({
    mutationFn: async (payload: { name: string; type: string; platform: string }) => {
      const res = await apiRequest("POST", "/api/amplify/audiences", payload);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/amplify/audiences", "reddit"] });
      setAudienceModalOpen(false);
      setNewAudienceName("");
      setNewAudienceType("custom");
    },
  });

  const exportCrmMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/amplify/audiences/export-crm", { platform: "reddit" });
      return res.json();
    },
  });

  const saveNotifPrefsMutation = useMutation({
    mutationFn: async (prefs: NotificationPrefs) => {
      const res = await apiRequest("PUT", "/api/amplify/spend-alerts", prefs);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/amplify/spend-alerts"] });
    },
  });

  // ── Derived data ──

  const campaigns: RedditCampaign[] = campaignData?.campaigns ?? [];
  const allComments: RedditComment[] = commentsData?.comments ?? [];
  const subreddits: Subreddit[] = subredditData?.subreddits ?? [];
  const audiences: Audience[] = audiencesData?.audiences ?? [];

  const redditAccount: RedditAccount = (() => {
    const accounts = redditAccountData?.accounts ?? [];
    const found = accounts.find((a: ConnectedAccount) => a.platform === "Reddit" || a.platform === "reddit");
    return found ? { connected: found.connected, accountName: found.accountName, status: found.connected ? "active" : "disconnected" } : { connected: false };
  })();

  // Filter & sort comments
  const filteredComments = allComments
    .filter((c) => {
      if (commentFilter === "needs_response") return !c.responded;
      if (commentFilter === "responded") return c.responded;
      return true;
    })
    .sort((a, b) => {
      if (commentSort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      const sentimentOrder: Record<string, number> = { negative: 0, neutral: 1, positive: 2 };
      return (sentimentOrder[a.sentiment] ?? 1) - (sentimentOrder[b.sentiment] ?? 1);
    });

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

      {/* ── 1. CAMPAIGNS SUB-TAB ── */}
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
              message="No Reddit campaigns yet. Create your first Reddit campaign to start advertising on the platform where authenticity wins."
              action="Create Reddit Campaign"
              onAction={() => setLocation("/amplify/reddit/new")}
            />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8" />
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Daily Budget</TableHead>
                    <TableHead className="text-right">Spend to Date</TableHead>
                    <TableHead className="text-right">Engagement</TableHead>
                    <TableHead className="text-right">Upvote Ratio</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead className="text-right">Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((c) => (
                    <>
                      <TableRow
                        key={c.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpandedCampaignId(expandedCampaignId === c.id ? null : c.id)}
                      >
                        <TableCell>
                          {expandedCampaignId === c.id ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell><StatusBadge status={c.status} /></TableCell>
                        <TableCell className="text-right">{formatCurrency(c.dailyBudget ?? c.budget)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(c.spend)}</TableCell>
                        <TableCell className="text-right">
                          <EngagementScoreBadge score={c.engagementScore ?? 0} />
                        </TableCell>
                        <TableCell className="text-right">
                          {c.upvoteRatio != null ? `${(c.upvoteRatio * 100).toFixed(0)}%` : "N/A"}
                        </TableCell>
                        <TableCell>
                          {c.sentiment ? (
                            <RedditSentimentBadge sentiment={c.sentiment} />
                          ) : (
                            <RedditSentimentBadge sentiment="insufficient_data" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">{c.commentCount ?? 0}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => pauseResumeMutation.mutate({ id: c.id, action: c.status === "active" ? "pause" : "resume" })}
                              disabled={pauseResumeMutation.isPending}
                              title={c.status === "active" ? "Pause Campaign" : "Resume Campaign"}
                            >
                              {c.status === "active" ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => { setSubTab("comments"); }}
                              title="View Comments"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            {c.redditAdUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(c.redditAdUrl, "_blank")}
                                title="View in Reddit Ads Manager"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCampaignId === c.id && (
                        <TableRow key={`${c.id}-detail`}>
                          <TableCell colSpan={10} className="bg-gray-50 p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Platform</span>
                                <p className="font-medium">Reddit</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Total Budget</span>
                                <p className="font-medium">{formatCurrency(c.budget)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Daily Budget</span>
                                <p className="font-medium">{formatCurrency(c.dailyBudget ?? c.budget)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Results</span>
                                <p className="font-medium">{c.results ?? 0} conversions</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Clicks</span>
                                <p className="font-medium">{c.clicks ?? 0}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">ROAS</span>
                                <p className="font-medium">{c.roas?.toFixed(2) ?? "0.00"}x</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Engagement Score</span>
                                <p className="font-medium"><EngagementScoreBadge score={c.engagementScore ?? 0} /></p>
                              </div>
                              <div>
                                <span className="text-gray-500">Upvote Ratio</span>
                                <p className="font-medium">{c.upvoteRatio != null ? `${(c.upvoteRatio * 100).toFixed(1)}%` : "N/A"}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => pauseResumeMutation.mutate({ id: c.id, action: c.status === "active" ? "pause" : "resume" })}
                                disabled={pauseResumeMutation.isPending}
                              >
                                {c.status === "active" ? <><Pause className="w-3.5 h-3.5 mr-1" /> Pause</> : <><Play className="w-3.5 h-3.5 mr-1" /> Resume</>}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => { setSubTab("comments"); }}
                              >
                                <MessageCircle className="w-3.5 h-3.5 mr-1" /> View Comments
                              </Button>
                              {c.redditAdUrl ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(c.redditAdUrl, "_blank")}
                                >
                                  <ExternalLink className="w-3.5 h-3.5 mr-1" /> Reddit Ads Manager
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open("https://ads.reddit.com", "_blank")}
                                >
                                  <ExternalLink className="w-3.5 h-3.5 mr-1" /> Reddit Ads Manager
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </>
      )}

      {/* ── 2. SUBREDDIT INTELLIGENCE SUB-TAB ── */}
      {subTab === "intelligence" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subreddit Intelligence</h3>
          <Card>
            <CardContent className="py-4 space-y-4">
              <p className="text-sm text-gray-500">
                Enter your business type and target city to discover the best subreddits for your campaigns.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium text-gray-700">Business Type</label>
                  <Input
                    placeholder="e.g. Restaurant, SaaS, Real Estate"
                    value={businessType}
                    onChange={(e) => { setBusinessType(e.target.value); setScanTriggered(false); }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <Input
                    placeholder="e.g. Austin, TX"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setScanTriggered(false); }}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={() => setScanTriggered(true)}
                  style={{ backgroundColor: AMPLIFY_COLOR }}
                  disabled={!businessType.trim()}
                >
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Scan Communities
                </Button>
              </div>
            </CardContent>
          </Card>

          {subredditsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Scanning subreddits...</span>
            </div>
          ) : subreddits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subreddits.map((sr, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base" style={{ color: AMPLIFY_COLOR }}>
                        r/{sr.name}
                      </CardTitle>
                      <Badge
                        style={{
                          backgroundColor: sr.activity === "very_active" ? "#22c55e" : "#97ACCA",
                          color: "#fff",
                        }}
                      >
                        {sr.activity === "very_active" ? "Very Active" : "Active"}
                      </Badge>
                    </div>
                    <CardDescription>{formatMemberCount(sr.members)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {sr.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{sr.description}</p>
                    )}
                    {sr.samplePosts && sr.samplePosts.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Sample Posts:</p>
                        <ul className="space-y-1">
                          {sr.samplePosts.slice(0, 3).map((post, j) => (
                            <li key={j}>
                              {post.url ? (
                                <a
                                  href={post.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs underline truncate block"
                                  style={{ color: AMPLIFY_COLOR }}
                                >
                                  {post.title}
                                </a>
                              ) : (
                                <span className="text-xs text-gray-600 truncate block">{post.title}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-gray-500">Relevance:</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(sr.relevanceScore ?? 0, 100)}%`,
                            backgroundColor: AMPLIFY_COLOR,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium">{sr.relevanceScore ?? 0}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : scanTriggered && businessType.length > 0 ? (
            <EmptyState message="No subreddit recommendations found. Try a different business type or city." />
          ) : (
            <EmptyState message="Enter your business type and city to discover relevant Reddit communities." />
          )}
        </div>
      )}

      {/* ── 3. COMMENTS SUB-TAB ── */}
      {subTab === "comments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-lg font-semibold">Campaign Comments</h3>
            <div className="flex items-center gap-3">
              <Select value={commentFilter} onValueChange={(v) => setCommentFilter(v as typeof commentFilter)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Comments</SelectItem>
                  <SelectItem value="needs_response">Needs Response</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={commentSort} onValueChange={(v) => setCommentSort(v as typeof commentSort)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="sentiment">Sentiment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {commentsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : filteredComments.length === 0 ? (
            <EmptyState
              message={
                allComments.length === 0
                  ? "No comments yet. Comments will appear here once your Reddit campaigns are live and receiving engagement."
                  : "No comments match the selected filter."
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredComments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">{comment.campaignName}</Badge>
                          <span className="text-sm font-medium">u/{comment.author}</span>
                          <SentimentBadge sentiment={comment.sentiment} />
                          {comment.responded && (
                            <Badge style={{ backgroundColor: "#22c55e", color: "#fff" }}>
                              Responded {comment.respondedAt ? new Date(comment.respondedAt).toLocaleDateString() : ""}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{comment.body}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {comment.upvotes}
                          </span>
                          <span>{new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      {!comment.responded && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setDraftingCommentId(draftingCommentId === comment.id ? null : comment.id);
                            if (!draftResponses[comment.id] && comment.suggestedResponse) {
                              setDraftResponses((prev) => ({ ...prev, [comment.id]: comment.suggestedResponse ?? "" }));
                            }
                          }}
                        >
                          <MessageCircle className="w-3.5 h-3.5 mr-1" />
                          Draft Response
                        </Button>
                      )}
                    </div>

                    {/* Inline response drafting area */}
                    {draftingCommentId === comment.id && !comment.responded && (
                      <div className="mt-3 space-y-2 border-t pt-3">
                        <Textarea
                          placeholder="Write your response..."
                          value={draftResponses[comment.id] ?? ""}
                          onChange={(e) => setDraftResponses((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            style={{ backgroundColor: AMPLIFY_COLOR }}
                            onClick={() => {
                              respondToCommentMutation.mutate({
                                campaignId: comment.campaignId,
                                commentId: comment.id,
                                body: draftResponses[comment.id] ?? "",
                              });
                            }}
                            disabled={respondToCommentMutation.isPending || !(draftResponses[comment.id] ?? "").trim()}
                          >
                            {respondToCommentMutation.isPending ? (
                              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                            ) : (
                              <Send className="w-3.5 h-3.5 mr-1" />
                            )}
                            Send Response
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDraftingCommentId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 4. AUDIENCES SUB-TAB ── */}
      {subTab === "audiences" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reddit Audiences</h3>
            <Button
              onClick={() => setAudienceModalOpen(true)}
              style={{ backgroundColor: AMPLIFY_COLOR }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Audience
            </Button>
          </div>

          {audiencesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : audiences.length === 0 ? (
            <EmptyState
              message="No Reddit audiences yet. Create an audience to target specific user segments with your campaigns."
              action="Create Audience"
              onAction={() => setAudienceModalOpen(true)}
            />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Size Estimate</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audiences.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {a.type === "custom" ? "Custom" : a.type === "lookalike" ? "Lookalike" : "Saved"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{a.sizeEstimate?.toLocaleString() ?? "N/A"}</TableCell>
                      <TableCell>{new Date(a.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Create Audience Modal */}
          <Dialog open={audienceModalOpen} onOpenChange={setAudienceModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Reddit Audience</DialogTitle>
                <DialogDescription>Define a new audience for your Reddit campaigns.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="audience-name">Audience Name</Label>
                  <Input
                    id="audience-name"
                    placeholder="e.g. Local Foodies"
                    value={newAudienceName}
                    onChange={(e) => setNewAudienceName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Audience Type</Label>
                  <Select value={newAudienceType} onValueChange={(v) => setNewAudienceType(v as typeof newAudienceType)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom (Upload Emails)</SelectItem>
                      <SelectItem value="lookalike">Lookalike (From Existing Audience)</SelectItem>
                      <SelectItem value="saved">Saved (From Subreddit Targeting)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newAudienceType === "custom" && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => exportCrmMutation.mutate()}
                    disabled={exportCrmMutation.isPending}
                  >
                    {exportCrmMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Import from /connect CRM
                  </Button>
                )}
                {exportCrmMutation.isSuccess && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> CRM contacts imported successfully
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAudienceModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: AMPLIFY_COLOR }}
                  onClick={() => createAudienceMutation.mutate({ name: newAudienceName, type: newAudienceType, platform: "reddit" })}
                  disabled={createAudienceMutation.isPending || !newAudienceName.trim()}
                >
                  {createAudienceMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Create Audience
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* ── 5. SETTINGS SUB-TAB ── */}
      {subTab === "settings" && (
        <div className="space-y-6">
          {/* Reddit Account Connection */}
          <Card>
            <CardHeader>
              <CardTitle>Reddit Account Connection</CardTitle>
              <CardDescription>Connect your Reddit Ads account to manage campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {redditAccount.connected ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${AMPLIFY_COLOR}20` }}>
                      <MessageCircle className="w-5 h-5" style={{ color: AMPLIFY_COLOR }} />
                    </div>
                    <div>
                      <p className="font-medium">{redditAccount.accountName || "Reddit Ads Account"}</p>
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => disconnectAccountMutation.mutate()}
                    disabled={disconnectAccountMutation.isPending}
                  >
                    {disconnectAccountMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">No Reddit Ads account connected</p>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <XCircle className="w-3 h-3" /> Not Connected
                      </span>
                    </div>
                  </div>
                  <Button
                    style={{ backgroundColor: AMPLIFY_COLOR }}
                    onClick={() => connectAccountMutation.mutate()}
                    disabled={connectAccountMutation.isPending}
                  >
                    {connectAccountMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Link2 className="w-4 h-4 mr-2" />
                    )}
                    Connect Reddit Ads Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reddit Pixel Status */}
          <Card>
            <CardHeader>
              <CardTitle>Reddit Pixel Status</CardTitle>
              <CardDescription>Track conversions and build audiences with the Reddit Pixel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {redditAccount.connected ? (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-700">Pixel Installed</span>
                  </div>
                  <p className="text-sm text-gray-500">Your Reddit Pixel is active and tracking events.</p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-amber-700">Pixel Not Installed</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Follow these steps to install the Reddit Pixel on your site:</p>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">Step 1: Get your Pixel ID</p>
                      <p className="text-xs text-gray-500 mb-2">Log into Reddit Ads Manager and navigate to Events Manager to find your Pixel ID.</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">Step 2: Add the base code</p>
                      <p className="text-xs text-gray-500 mb-2">Add this script to your website&apos;s &lt;head&gt; section:</p>
                      <div className="bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 text-gray-400 hover:text-white"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `<script>\n!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);\nrdt('init','YOUR_PIXEL_ID');\nrdt('track', 'PageVisit');\n</script>`
                            );
                          }}
                          title="Copy to clipboard"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <pre>{`<script>\n!function(w,d){if(!w.rdt){var p=w.rdt=function(){\n  p.sendEvent?p.sendEvent.apply(p,arguments)\n  :p.callQueue.push(arguments)\n};p.callQueue=[];\nvar t=d.createElement("script");\nt.src="https://www.redditstatic.com/ads/pixel.js";\nt.async=!0;\nvar s=d.getElementsByTagName("script")[0];\ns.parentNode.insertBefore(t,s)\n}}(window,document);\nrdt('init','YOUR_PIXEL_ID');\nrdt('track', 'PageVisit');\n</script>`}</pre>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">Step 3: Verify installation</p>
                      <p className="text-xs text-gray-500">Use the Reddit Pixel Helper Chrome extension to verify your pixel is firing correctly.</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure alerts for your Reddit campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="engagement-alert" className="text-sm font-medium">Engagement score drop alert</Label>
                  <p className="text-xs text-gray-500">Alert me when engagement score drops below 30</p>
                </div>
                <Switch
                  id="engagement-alert"
                  checked={notifPrefs.engagementDropAlert}
                  onCheckedChange={(checked) => setNotifPrefs((p) => ({ ...p, engagementDropAlert: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budget-alert" className="text-sm font-medium">Budget spend alert</Label>
                  <p className="text-xs text-gray-500">Alert me when daily budget is 80% spent</p>
                </div>
                <Switch
                  id="budget-alert"
                  checked={notifPrefs.budgetSpentAlert}
                  onCheckedChange={(checked) => setNotifPrefs((p) => ({ ...p, budgetSpentAlert: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="comment-alert" className="text-sm font-medium">New comment alert</Label>
                  <p className="text-xs text-gray-500">Alert me when new comments are received</p>
                </div>
                <Switch
                  id="comment-alert"
                  checked={notifPrefs.newCommentAlert}
                  onCheckedChange={(checked) => setNotifPrefs((p) => ({ ...p, newCommentAlert: checked }))}
                />
              </div>
              <Button
                style={{ backgroundColor: AMPLIFY_COLOR }}
                onClick={() => saveNotifPrefsMutation.mutate(notifPrefs)}
                disabled={saveNotifPrefsMutation.isPending}
              >
                {saveNotifPrefsMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                Save Preferences
              </Button>
              {saveNotifPrefsMutation.isSuccess && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Preferences saved successfully
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── CAMPAIGNS TAB (Unified) ─────────────────────

function CampaignsTab() {
  const queryClient = useQueryClient();
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

  const bulkAction = async (action: "pause" | "resume" | "delete") => {
    const ids = Array.from(selectedIds);
    const endpoint = action === "delete" ? "DELETE" : "PUT";
    const suffix = action === "delete" ? "" : `/${action}`;
    let success = 0;
    for (const id of ids) {
      try {
        await apiRequest(endpoint, `/api/amplify/campaigns/${id}${suffix}`);
        success++;
      } catch { /* continue */ }
    }
    setSelectedIds(new Set());
    queryClient.invalidateQueries({ queryKey: ["/api/amplify/campaigns"] });
    return success;
  };

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
            <Button variant="outline" size="sm" onClick={() => bulkAction("pause")}>
              <Pause className="w-3.5 h-3.5 mr-1" /> Pause
            </Button>
            <Button variant="outline" size="sm" onClick={() => bulkAction("resume")}>
              <Play className="w-3.5 h-3.5 mr-1" /> Resume
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => bulkAction("delete")}>
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
                    className="flex-1 accent-[#97ACCA]"
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

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/app-name";
import { Sparkles } from "lucide-react";
import type { BundleConfig, SlashApp } from "@/config/app-registry";

// ─────────────────────────────────────────────
// Stats mapping — pulls per-app metrics from clientData
// ─────────────────────────────────────────────

interface StatItem {
  label: string;
  value: string | number;
}

function getAppStats(appId: string, clientData: any): StatItem[] {
  switch (appId) {
    case "publish":
      return [
        { label: "Listings", value: clientData?.listings?.verified ?? "--" },
        { label: "Citations", value: clientData?.listings?.citations ?? "--" },
      ];
    case "elevate":
      return [
        { label: "Rating", value: clientData?.reviews?.average ?? "--" },
      ];
    case "optimize":
      return [
        { label: "SEO Score", value: clientData?.seo?.score ?? "--" },
        { label: "Issues", value: clientData?.seo?.issues ?? "--" },
      ];
    case "amplify":
      return [
        { label: "Campaigns", value: clientData?.ads?.active ?? "--" },
        { label: "Spend", value: clientData?.ads?.spend ?? "--" },
      ];
    case "promote": {
      const latest = clientData?.campaigns?.latest;
      return [
        { label: "Clicks", value: latest?.clickThroughs ?? "--" },
        { label: "Sales", value: latest?.purchases ?? "--" },
      ];
    }
    case "respond":
      return [
        { label: "Unread", value: clientData?.messages?.unread ?? 0 },
      ];
    case "engage":
      return [
        { label: "Rating", value: clientData?.livechat?.participationRating ?? "--" },
        { label: "Queue", value: clientData?.livechat?.inQueue ?? 0 },
      ];
    case "post":
      return [
        { label: "Likes", value: clientData?.socialMedia?.newLikes ?? 0 },
        { label: "Comments", value: clientData?.socialMedia?.newComments ?? 0 },
      ];
    default:
      return [];
  }
}

// ─────────────────────────────────────────────
// Cross-app insight copy (static for now, data-driven later)
// ─────────────────────────────────────────────

const BUNDLE_INSIGHTS: Record<string, string> = {
  anchor:
    "Your / publish listings, / elevate reviews, / optimize rankings, and / amplify ads work together to dominate your local market.",
  compass:
    "/ engage chat conversations inform / promote campaigns, while / respond unifies every channel and / post keeps your social presence active.",
};

// ─────────────────────────────────────────────
// Combined stats for the bundle summary bar
// ─────────────────────────────────────────────

interface BundleStat {
  label: string;
  value: string | number;
}

function getBundleStats(bundleId: string, clientData: any): BundleStat[] {
  if (bundleId === "anchor") {
    return [
      { label: "Verified Listings", value: clientData?.listings?.verified ?? "--" },
      { label: "Avg Rating", value: clientData?.reviews?.average ?? "--" },
      { label: "SEO Score", value: clientData?.seo?.score ?? "--" },
      { label: "Ad Campaigns", value: clientData?.ads?.active ?? "--" },
    ];
  }
  if (bundleId === "compass") {
    return [
      { label: "Unread Messages", value: clientData?.messages?.unread ?? 0 },
      { label: "Active Campaigns", value: clientData?.campaigns?.active ?? 0 },
      { label: "Social Engagement", value: (clientData?.socialMedia?.newLikes ?? 0) + (clientData?.socialMedia?.newComments ?? 0) },
      { label: "Chat Queue", value: clientData?.livechat?.inQueue ?? 0 },
    ];
  }
  return [];
}

// ─────────────────────────────────────────────
// BundleSection component
// ─────────────────────────────────────────────

interface BundleSectionProps {
  bundle: BundleConfig;
  apps: SlashApp[];
  clientData: any;
  onNavigate: (route: string) => void;
}

const FONT_FAMILY = "Archivo Semi Expanded, Archivo, sans-serif";

export function BundleSection({ bundle, apps, clientData, onNavigate }: BundleSectionProps) {
  const bundleStats = getBundleStats(bundle.id, clientData);
  const insight = BUNDLE_INSIGHTS[bundle.id];

  // Light tint backgrounds
  const bgTint = bundle.id === "anchor" ? "bg-blue-50/50" : "bg-orange-50/50";

  return (
    <div className={`mb-8 rounded-lg border-l-4 ${bgTint} p-5`} style={{ borderLeftColor: bundle.color }}>
      {/* Bundle Header */}
      <div className="flex items-center gap-3 mb-4">
        <AppIcon name={bundle.icon} size={36} color={bundle.color} />
        <div>
          <h2
            style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 20, color: bundle.color }}
          >
            {bundle.name}
          </h2>
          <p className="text-sm text-gray-500">{bundle.description}</p>
        </div>
      </div>

      {/* Bundle Summary Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {bundleStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-md px-3 py-2 text-center shadow-sm">
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* App Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {apps.map((app) => {
          const stats = getAppStats(app.id, clientData);
          return (
            <Card key={app.id} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-4">
                {/* Stats Row */}
                <div className="flex items-center justify-center gap-3 mb-3 pb-2 border-b border-gray-100">
                  <AppIcon name={app.icon} size={28} color={app.color} />
                  <div className="flex gap-3">
                    {stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{s.value}</div>
                        <p className="text-[9px] text-gray-500">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App Branding */}
                <div className="text-center mb-3">
                  <div className="flex justify-center mb-2">
                    <AppIcon name={app.icon} size={48} color={app.color} />
                  </div>
                  <span
                    style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 15 }}
                  >
                    <span style={{ color: "#09080E" }}>/ </span>
                    <span style={{ color: app.color }}>{app.name}</span>
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{app.description}</p>
                </div>

                {/* Open Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => onNavigate(app.dashboardRoute)}
                >
                  <AppIcon name={app.icon} size={16} color={app.color} />
                  <span>Open</span>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cross-App Insight Banner */}
      {insight && (
        <div className="flex items-start gap-2 px-4 py-3 bg-white/70 rounded-md border border-gray-100">
          <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: bundle.color }} />
          <p className="text-xs text-gray-600">{insight}</p>
        </div>
      )}
    </div>
  );
}

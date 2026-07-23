import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/app-name";
import { Sparkles } from "lucide-react";
import type { BundleConfig, SlashApp } from "@/config/app-registry";

// ─────────────────────────────────────────────
// Stats mapping — richer per-app metrics
// ─────────────────────────────────────────────

interface StatItem {
  label: string;
  value: string | number;
}

function getAppStats(appId: string, clientData: any): StatItem[] {
  switch (appId) {
    case "publish":
      return [
        { label: "Verified", value: clientData?.listings?.verified ?? 0 },
        { label: "Pending", value: clientData?.listings?.pending ?? 0 },
        { label: "Citations", value: clientData?.listings?.citations ?? 0 },
      ];
    case "elevate":
      return [
        { label: "Avg Rating", value: clientData?.reviews?.average ?? "--" },
        { label: "Reviews", value: clientData?.reviews?.total ?? 0 },
      ];
    case "optimize":
      return [
        { label: "SEO Score", value: clientData?.seo?.score ?? "--" },
        { label: "Broken Links", value: clientData?.seo?.brokenLinks ?? "--" },
        { label: "Issues", value: clientData?.seo?.issues ?? "--" },
      ];
    case "amplify":
      return [
        { label: "Spend", value: clientData?.ads?.spend ?? "--" },
        { label: "Earned", value: clientData?.ads?.earned ?? "--" },
        { label: "Campaigns", value: clientData?.ads?.active ?? 0 },
      ];
    case "promote": {
      const latest = clientData?.campaigns?.latest;
      return [
        { label: "Open Rate", value: latest?.openRate ?? "--" },
        { label: "Click-Through", value: latest?.clickThroughs ?? "--" },
        { label: "Sales", value: latest?.purchases ?? 0 },
      ];
    }
    case "respond":
      return [
        { label: "New", value: clientData?.messages?.new ?? 0 },
        { label: "Unread", value: clientData?.messages?.unread ?? 0 },
        { label: "Awaiting", value: clientData?.messages?.awaiting ?? 0 },
      ];
    case "engage":
      return [
        { label: "Rating", value: clientData?.livechat?.participationRating ?? "--" },
        { label: "In Queue", value: clientData?.livechat?.inQueue ?? 0 },
        { label: "Visitors", value: clientData?.livechat?.activeVisitors ?? 0 },
      ];
    case "post":
      return [
        { label: "Scheduled", value: clientData?.socialMedia?.scheduled ?? 0 },
        { label: "Likes", value: clientData?.socialMedia?.newLikes ?? 0 },
        { label: "Follows", value: clientData?.socialMedia?.newFollows ?? 0 },
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
  const insight = BUNDLE_INSIGHTS[bundle.id];

  // Light tint backgrounds
  const bgTint = bundle.id === "anchor" ? "bg-blue-50/50" : "bg-orange-50/50";

  return (
    <div className={`mb-8 rounded-lg border-l-4 ${bgTint} p-5`} style={{ borderLeftColor: bundle.color }}>
      {/* Bundle Header */}
      <div className="flex items-center gap-3 mb-5">
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

      {/* App Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {apps.map((app) => {
          const stats = getAppStats(app.id, clientData);
          return (
            <Card key={app.id} className="hover:shadow-lg transition-shadow bg-white cursor-pointer" onClick={() => onNavigate(app.dashboardRoute)}>
              <CardContent className="p-0">
                {/* Icon upper-left + App Name */}
                <div className="flex items-center gap-2 pt-[10px] pl-[10px] pr-3">
                  <AppIcon name={app.icon} size={28} color={app.color} />
                  <div>
                    <span
                      style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 18 }}
                    >
                      <span style={{ color: "#09080E" }}>/ </span>
                      <span style={{ color: app.color }}>{app.name}</span>
                    </span>
                    <p className="text-[10px] text-gray-400 leading-tight">{app.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid gap-2 px-3 py-3" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </div>
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

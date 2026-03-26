// pricing-layout.tsx — Shared pricing layout for Products mega menu and /pricing page
// All data from app-registry.ts. All names via <AppName> / <BundleHeader>.

import { Link } from "wouter";
import { AppName, BundleHeader, AppIcon } from "@/components/app-name";
import {
  APP_REGISTRY,
  BUNDLE_REGISTRY,
  CONNECT_CRM,
  COACH_BLUE,
  DIGITAL_IQ,
  HOW_IT_WORKS_STEPS,
  SCANNING_TOOL,
  getAppsByBundle,
} from "@/config/app-registry";

const FONT_FAMILY = "Archivo Semi Expanded, Archivo, sans-serif";

interface PricingLayoutProps {
  variant: "menu" | "page";
}

export function PricingLayout({ variant }: PricingLayoutProps) {
  const isPage = variant === "page";
  const gap = isPage ? "gap-6" : "gap-3";
  const pad = isPage ? "p-5" : "p-3";
  const padInner = isPage ? "p-4" : "p-2";

  const anchorBundle = BUNDLE_REGISTRY.find((b) => b.id === "anchor")!;
  const compassBundle = BUNDLE_REGISTRY.find((b) => b.id === "compass")!;
  const anchorApps = getAppsByBundle("anchor");
  const compassApps = getAppsByBundle("compass");

  // Compute totals
  const allStandaloneTotal =
    APP_REGISTRY.reduce((sum, app) => sum + app.standalonePrice, 0) +
    CONNECT_CRM.tiers[1].price +
    COACH_BLUE.standalonePrice;

  const bothBundlesTotal =
    anchorBundle.price +
    compassBundle.price +
    CONNECT_CRM.tiers[1].price +
    COACH_BLUE.withBothBundlesPrice;

  const savings = allStandaloneTotal - bothBundlesTotal;
  const savingsPercent = Math.round((savings / allStandaloneTotal) * 100);

  return (
    <div className={`flex flex-col ${gap}`} style={{ fontFamily: FONT_FAMILY }}>
      {/* ─── DIGITAL IQ ASSESSMENT ─── */}
      <div
        className={`${pad} rounded-lg border-2`}
        style={{ borderColor: DIGITAL_IQ.color, backgroundColor: "rgba(160,0,40,0.03)" }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <img src={DIGITAL_IQ.icon} alt="" className="w-8 h-8" style={{ borderRadius: 5 }} />
            <div>
              <span className="font-bold text-lg" style={{ color: DIGITAL_IQ.color }}>
                {DIGITAL_IQ.name}
              </span>
              <span className="text-gray-400 text-xs ml-2">— Your starting point</span>
            </div>
          </div>
          <span className="text-emerald-600 text-2xl font-bold">Free</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <AppIcon name={HOW_IT_WORKS_STEPS[0].icon} size={20} color="#A00028" />
          <span>Complete assessment</span>
          <span className="text-blue-600">→</span>
          <img src={SCANNING_TOOL.icon} alt="" className="w-5 h-5" />
          <span>We scan your presence</span>
          <span className="text-blue-600">→</span>
          <AppIcon name={HOW_IT_WORKS_STEPS[1].icon} size={20} color="#FFC107" />
          <span>Get your blueprint</span>
          <span className="text-blue-600">→</span>
          <span className="font-bold text-blue-600">Choose your apps below ↓</span>
        </div>
      </div>

      {/* ─── / CONNECT + COACH BLUE (50/50) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* / connect */}
        <div
          className={`${pad} rounded-lg border-2`}
          style={{ borderColor: CONNECT_CRM.color, backgroundColor: "rgba(0,128,96,0.03)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <AppName appId="connect" showDesc size="sm" />
          </div>
          <p className="text-xs text-gray-500 mb-2">Always standalone</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-1.5 text-sm">
              <div>
                <span className="font-semibold">{CONNECT_CRM.tiers[0].name}</span>
                <span className="text-gray-400 text-xs ml-2">
                  {CONNECT_CRM.tiers[0].contactLimit} contacts
                </span>
              </div>
              <span className="font-bold text-sm">Free</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-1.5 text-sm">
              <div>
                <span className="font-semibold">{CONNECT_CRM.tiers[1].name}</span>
                <span className="text-gray-400 text-xs ml-2">Unlimited</span>
              </div>
              <span className="font-bold text-sm">${CONNECT_CRM.tiers[1].price}/mo</span>
            </div>
          </div>
          <a href="/connect" className="text-xs font-bold text-blue-600 underline mt-2 inline-block">
            Learn More →
          </a>
        </div>

        {/* Coach Blue */}
        <div
          className={`${pad} rounded-lg border-2`}
          style={{ borderColor: COACH_BLUE.color, backgroundColor: "rgba(168,85,247,0.03)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <AppName appId="coachblue" showDesc size="sm" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-1.5 text-sm">
              <span className="font-semibold">Standalone</span>
              <span className="font-bold">${COACH_BLUE.standalonePrice}/mo</span>
            </div>
            <div className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded px-3 py-1.5 text-sm">
              <span className="font-semibold">1 Bundle</span>
              <span className="font-bold">${COACH_BLUE.withOneBundlePrice}/mo</span>
            </div>
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded px-3 py-1.5 text-sm">
              <span className="font-semibold">Both Bundles</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
          </div>
          <a href="/coach-blue" className="text-xs font-bold text-blue-600 underline mt-2 inline-block">
            Learn More →
          </a>
        </div>
      </div>

      {/* ─── ANCHOR SUITE BUNDLE ─── */}
      <BundleSection
        bundle={anchorBundle}
        apps={anchorApps}
        columns={3}
        pad={pad}
        padInner={padInner}
      />

      {/* ─── COMPASS SUITE BUNDLE ─── */}
      <BundleSection
        bundle={compassBundle}
        apps={compassApps}
        columns={4}
        pad={pad}
        padInner={padInner}
      />

      {/* ─── THE FULL PICTURE ─── */}
      <div className={`${pad} rounded-lg border-2`} style={{ borderColor: "#0000FF" }}>
        <h3
          className="text-lg font-bold text-gray-900 mb-3"
          style={{ fontFamily: FONT_FAMILY }}
        >
          The Full Picture
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3 text-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">All Standalone</p>
            <p className="text-xl font-bold text-red-500">${allStandaloneTotal}/mo</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Both Bundles + CRM</p>
            <p className="text-xl font-bold text-emerald-600">${bothBundlesTotal}/mo</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">You Save</p>
            <p className="text-xl font-bold text-emerald-600">
              ${savings} ({savingsPercent}%)
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded p-3 grid grid-cols-1 md:grid-cols-2 gap-1 text-xs text-gray-500">
          <p>
            <span className="text-blue-600">→</span> Bundles don't cross-discount each other
          </p>
          <p>
            <span className="text-blue-600">→</span>{" "}
            <AppName appId="connect" size="sm" iconSize={0} /> always standalone — Free or $
            {CONNECT_CRM.tiers[1].price}
          </p>
          <p>
            <span className="text-blue-600">→</span> Coach Blue: ${COACH_BLUE.standalonePrice} → $
            {COACH_BLUE.withOneBundlePrice} (1 bundle) → FREE (both)
          </p>
          <p>
            <span className="text-blue-600">→</span> $
            {anchorBundle.price} bundles — clean, round, ~37% savings
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Bundle Section (reused for Anchor Suite + Compass Suite) ───

function BundleSection({
  bundle,
  apps,
  columns,
  pad,
  padInner,
}: {
  bundle: (typeof BUNDLE_REGISTRY)[number];
  apps: (typeof APP_REGISTRY)[number][];
  columns: number;
  pad: string;
  padInner: string;
}) {
  const gridCols =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className="rounded-lg border-2 overflow-hidden" style={{ borderColor: bundle.color }}>
      {/* Header bar */}
      <div
        className={`${pad} flex items-center justify-between border-b-2`}
        style={{
          borderColor: bundle.color,
          backgroundColor: `${bundle.color}08`,
        }}
      >
        <BundleHeader bundleId={bundle.id} />
        <span className="text-2xl font-bold text-gray-900">
          ${bundle.price}
          <span className="text-sm font-normal text-gray-500">/mo</span>
        </span>
      </div>

      {/* App columns */}
      <div className={`grid ${gridCols}`}>
        {apps.map((app, i) => (
          <div
            key={app.id}
            className={`${padInner} ${i < apps.length - 1 ? "border-r border-gray-100" : ""}`}
          >
            <a href={app.landingRoute} className="block hover:opacity-80 transition-opacity">
              <AppName appId={app.id} showDesc size="sm" />
            </a>
            <div className="pl-8 mt-2 space-y-0.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Standalone</span>
                <span className="font-bold text-gray-700">${app.standalonePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bundle</span>
                <span className="font-bold text-emerald-600">${app.bundlePrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

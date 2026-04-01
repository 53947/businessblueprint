import {
  BookOpen, Star, Target, Mail, Inbox, MessageCircle, Share2, Megaphone,
  Anchor, Compass, Users, BarChart3, ScanLine, ClipboardCheck, FileText,
  GraduationCap, TrendingUp, Layers, ShoppingBasket, Lightbulb, LayoutGrid, Code,
  HelpCircle, Video, MessageSquare, LogIn, Settings,
  type LucideIcon,
} from "lucide-react";
import {
  APP_REGISTRY,
  BUNDLE_REGISTRY,
  CONNECT_CRM,
  COACH_BLUE,
  DIGITAL_IQ,
} from "@/config/app-registry";

// ─────────────────────────────────────────────
// Icon lookup map — explicit imports for tree-shaking
// ─────────────────────────────────────────────

export const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Star, Target, Mail, Inbox, MessageCircle, Share2, Megaphone,
  Anchor, Compass, Users, BarChart3, ScanLine, ClipboardCheck, FileText,
  GraduationCap, TrendingUp, Layers, ShoppingBasket, Lightbulb, LayoutGrid, Code,
  HelpCircle, Video, MessageSquare, LogIn, Settings,
};

// ─────────────────────────────────────────────
// AppIcon — renders Lucide icon in a colored rounded square
// ─────────────────────────────────────────────

export function AppIcon({ name, size, color }: { name: string; size: number; color: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  const iconSize = Math.max(Math.round(size * 0.55), 10);
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.round(size * 0.2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={iconSize} color="white" strokeWidth={2} />
    </div>
  );
}

// ─────────────────────────────────────────────
// AppName
// ─────────────────────────────────────────────

interface AppNameProps {
  appId: string;
  showDesc?: boolean;
  size?: "sm" | "md" | "lg";
  iconSize?: number;
  className?: string;
}

const FONT_SIZES = { sm: 15, md: 18, lg: 22 } as const;
const TRIAD_BLACK = "#09080E";
const FONT_FAMILY = "Archivo Semi Expanded, Archivo, sans-serif";

function lookupApp(id: string): {
  name: string;
  color: string;
  icon: string;
  isSlashApp: boolean;
  description: string;
  isPngIcon?: boolean;
} | null {
  const slashApp = APP_REGISTRY.find((a) => a.id === id);
  if (slashApp) return slashApp;

  if (id === CONNECT_CRM.id)
    return { ...CONNECT_CRM, isSlashApp: CONNECT_CRM.isSlashApp };

  // Coach Blue keeps PNG icon
  if (id === COACH_BLUE.id)
    return { ...COACH_BLUE, isSlashApp: COACH_BLUE.isSlashApp, isPngIcon: true };

  if (id === DIGITAL_IQ.id)
    return { ...DIGITAL_IQ, isSlashApp: DIGITAL_IQ.isSlashApp };

  return null;
}

export function AppName({
  appId,
  showDesc = false,
  size = "md",
  iconSize = 24,
  className = "",
}: AppNameProps) {
  const app = lookupApp(appId);
  if (!app) return null;

  const fontSize = FONT_SIZES[size];

  const iconElement = app.isPngIcon ? (
    <img
      src={app.icon}
      alt={app.name}
      width={iconSize}
      height={iconSize}
      style={{ borderRadius: 5, objectFit: "contain" }}
    />
  ) : (
    <AppIcon name={app.icon} size={iconSize} color={app.color} />
  );

  // Large size: stack name + description vertically
  if (size === "lg") {
    return (
      <div className={className} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: FONT_FAMILY,
            fontWeight: 600,
            fontSize,
            lineHeight: 1,
          }}
        >
          {iconElement}
          {app.isSlashApp && (
            <span style={{ color: TRIAD_BLACK }}>/</span>
          )}
          {app.isSlashApp && " "}
          <span style={{ color: app.color }}>{app.name}</span>
        </span>
        <span
          style={{
            color: app.color,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500,
            fontFamily: FONT_FAMILY,
          }}
        >
          {app.description}
        </span>
      </div>
    );
  }

  // Small and medium: inline layout
  if (showDesc) {
    return (
      <div className={className} style={{ fontFamily: FONT_FAMILY }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 600,
            fontSize,
            lineHeight: 1,
          }}
        >
          {iconElement}
          {app.isSlashApp && (
            <span style={{ color: TRIAD_BLACK }}>/</span>
          )}
          {app.isSlashApp && " "}
          <span style={{ color: app.color }}>{app.name}</span>
        </span>
        <div style={{ color: app.color, fontSize: 11, fontWeight: 400, marginTop: 2 }}>
          {app.description}
        </div>
      </div>
    );
  }

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize,
        lineHeight: 1,
      }}
    >
      {iconElement}
      {app.isSlashApp && (
        <span style={{ color: TRIAD_BLACK }}>/</span>
      )}
      {app.isSlashApp && " "}
      <span style={{ color: app.color }}>{app.name}</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// BundleHeader
// ─────────────────────────────────────────────

interface BundleHeaderProps {
  bundleId: string;
  showPrice?: boolean;
  className?: string;
}

const DESC_COLOR = "#9CA3AF";

export function BundleHeader({
  bundleId,
  showPrice = false,
  className = "",
}: BundleHeaderProps) {
  const bundle = BUNDLE_REGISTRY.find((b) => b.id === bundleId);
  if (!bundle) return null;

  const appCount = bundle.appIds.length;

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 22,
        lineHeight: 1,
      }}
    >
      <AppIcon name={bundle.icon} size={34} color={bundle.color} />
      <span style={{ color: bundle.color }}>{bundle.name}</span>
      <span style={{ color: DESC_COLOR, fontSize: 11, fontWeight: 400 }}>
        — BUNDLE — {appCount} apps
      </span>
      {showPrice && (
        <span style={{ color: DESC_COLOR, fontSize: 11, fontWeight: 400 }}>
          {" "}
          ... ${bundle.price}/mo
        </span>
      )}
    </span>
  );
}

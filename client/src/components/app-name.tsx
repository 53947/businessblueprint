import {
  APP_REGISTRY,
  BUNDLE_REGISTRY,
  CONNECT_CRM,
  COACH_BLUE,
  DIGITAL_IQ,
  type SlashApp,
} from "@/config/app-registry";

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
} | null {
  // Slash apps
  const slashApp = APP_REGISTRY.find((a) => a.id === id);
  if (slashApp) return slashApp;

  // Connect CRM
  if (id === CONNECT_CRM.id)
    return { ...CONNECT_CRM, isSlashApp: CONNECT_CRM.isSlashApp };

  // Coach Blue
  if (id === COACH_BLUE.id)
    return { ...COACH_BLUE, isSlashApp: COACH_BLUE.isSlashApp };

  // Digital IQ
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
          <img
            src={app.icon}
            alt={app.name}
            width={iconSize}
            height={iconSize}
            style={{ borderRadius: 5, objectFit: "contain" }}
          />
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
      <img
        src={app.icon}
        alt={app.name}
        width={iconSize}
        height={iconSize}
        style={{ borderRadius: 5, objectFit: "contain" }}
      />
      {app.isSlashApp && (
        <span style={{ color: TRIAD_BLACK }}>/</span>
      )}
      {app.isSlashApp && " "}
      <span style={{ color: app.color }}>{app.name}</span>
      {showDesc && (
        <span style={{ color: app.color, fontSize: 11, fontWeight: 400 }}>
          {" "}
          — {app.description}
        </span>
      )}
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
      <img
        src={bundle.icon}
        alt={bundle.name}
        width={34}
        height={34}
        style={{ borderRadius: 5, objectFit: "contain" }}
      />
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

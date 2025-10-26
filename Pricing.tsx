// Pricing.tsx
import * as React from "react";

type Plan = {
  id: "start" | "advanced" | "scale";
  icon: string;
  title: string;
  tagline: string;
  annual: number;
  monthly: number;
  notes?: string[];
  bullets: string[];
  accent: "blue" | "purple" | "green";
};

type DiyAddon = {
  id: string;
  icon: string;
  title: string;
  price: number;
  bullets: string[];
  accent: "blue" | "purple" | "red" | "orange" | "green";
};

type MspAddon = {
  id: string;
  icon: string;
  title: string;
  priceLabel: string;
  subtitle?: string;
  bullets: string[];
  accent: "red" | "orange";
};

type MspTier = {
  id: "standard" | "premium";
  icon: string;
  title: string;
  monthly: number;
  hoursIncluded: number;
  extraHourRate: number;
  response: string; // e.g., "P1 90m • P2 120m • P3 180m"
  bullets: string[];
  accent: "blue" | "purple";
};

const COLORS = {
  blue: "#0000FF",
  purple: "#8000FF",
  red: "#FF0040",
  orange: "#F79248",
  green: "#00FF40",
  ink: "#0B1020",
  bg: "#0E1117",
  text: "#FFFFFF",
  muted: "#A9B0C5",
};

const WRAP: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "32px 20px 80px",
  color: COLORS.text,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,"Helvetica Neue",Arial,system-ui,sans-serif',
};

const Section: React.FC<{ kicker: string; title: string; style?: React.CSSProperties }> = ({
  kicker,
  title,
  style,
  children,
}) => (
  <section style={{ margin: "36px 0 12px", ...style }}>
    <div
      style={{
        letterSpacing: ".18em",
        textTransform: "uppercase",
        fontWeight: 700,
        color: "#D5D9FF",
        fontSize: 12,
        marginBottom: 6,
      }}
    >
      {kicker}
    </div>
    <h2 style={{ margin: "0 0 18px", fontSize: 26, lineHeight: 1.15 }}>{title}</h2>
    {children}
  </section>
);

const Grid: React.FC<{ cols: 2 | 3 }> = ({ cols, children }) => (
  <div
    style={{
      display: "grid",
      gap: 18,
      gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
    }}
  >
    {children}
  </div>
);

const Card: React.FC<{ accent: keyof typeof COLORS }> = ({ accent, children }) => (
  <div
    style={{
      background: "linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))",
      border: "1px solid rgba(255,255,255,.12)",
      borderRadius: 18,
      padding: 20,
      position: "relative",
      overflow: "hidden",
      boxShadow: `0 1px 0 ${COLORS[accent]}22`,
    }}
  >
    {children}
  </div>
);

const Tag: React.FC<{ accent: keyof typeof COLORS; children: React.ReactNode }> = ({
  accent,
  children,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 800,
      fontSize: 13,
      padding: "8px 12px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.18)",
      backgroundColor: "rgba(255,255,255,.07)",
      color: COLORS[accent],
    }}
  >
    {children}
  </span>
);

const PriceLine: React.FC<{ value: string; accent: keyof typeof COLORS; sub?: string }> = ({
  value,
  accent,
  sub,
}) => (
  <div style={{ margin: "8px 0 6px" }}>
    <div
      style={{
        fontSize: 32,
        fontWeight: 900,
        background: `linear-gradient(90deg, ${COLORS[accent]}, ${COLORS[accent]}AA)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {value}
    </div>
    {sub && <div style={{ fontSize: 12, color: COLORS.muted }}>{sub}</div>}
  </div>
);

const Bullet: React.FC<{ accent: keyof typeof COLORS }> = ({ accent, children }) => (
  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, margin: "10px 0" }}>
    <span
      aria-hidden
      style={{
        height: 20,
        width: 20,
        borderRadius: 5,
        background: COLORS[accent],
        color: "#000",
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        fontWeight: 900,
        transform: "translateY(1px)",
      }}
    >
      ✓
    </span>
    <span style={{ color: "#E9ECFF" }}>{children}</span>
  </li>
);

const CTA: React.FC<{ label?: string }> = ({ label = "Book a Demo" }) => (
  <a
    href="#"
    style={{
      display: "inline-block",
      marginTop: 12,
      padding: "10px 14px",
      borderRadius: 10,
      fontWeight: 800,
      textDecoration: "none",
      background: "#fff",
      color: "#000",
    }}
  >
    {label}
  </a>
);

/* ---------- DATA ---------- */

const PLANS: Plan[] = [
  {
    id: "start",
    icon: "💡",
    title: "Start",
    tagline: "Get Found",
    annual: 99,
    monthly: 124,
    notes: ["Save 20% with annual billing"],
    bullets: [
      "Up to 5 team members",
      "Up to 25 client accounts",
      "Listings Management across Google, Apple Maps, Bing, Yelp, FB",
      "Reviews Management to monitor + respond",
      "Social Media Tools for scheduling + tracking",
      "Local SEO: map-pack visibility + rank tracking",
      "Free Digital IQ Assessment + Personalized Blueprint",
      "AI Business Coach available as add-on",
    ],
    accent: "blue",
  },
  {
    id: "advanced",
    icon: "⚙️",
    title: "Advanced",
    tagline: "Get Customers",
    annual: 248,
    monthly: 310,
    notes: ["Save 20% with annual billing"],
    bullets: [
      "Up to 10 team members",
      "Up to 100 client accounts",
      "Listings sync across 70+ directories",
      "Reviews: AI reply drafts + sentiment tagging",
      "Social Automation: smart calendar + insights",
      "Local SEO Tools: keywords, competitors, on-page",
      "Digital IQ + Expanded Blueprint",
      "AI Business Coach included",
    ],
    accent: "purple",
  },
  {
    id: "scale",
    icon: "🚀",
    title: "Scale",
    tagline: "Get Business",
    annual: 999,
    monthly: 1249,
    notes: ["Save 20% with annual billing"],
    bullets: [
      "Up to 50 team members",
      "Up to 500 client accounts",
      "Listings: enterprise sync + reporting",
      "Reviews: advanced automation + templates",
      "Social Suite: collaboration + AI content planning",
      "Local SEO Suite: national tracking + analytics",
      "Digital IQ + Blueprint integrated with CRM/automation",
      "Full AI Business Coach access",
    ],
    accent: "green",
  },
];

const DIY_ADDONS: DiyAddon[] = [
  {
    id: "listings",
    icon: "📍",
    title: "Listings",
    price: 44,
    bullets: [
      "Profile sync (NAP, hours, site)",
      "Major directories + long-tail networks",
      "Duplicate suppression",
      "Holiday hours, logos, photos",
      "Change monitoring + health report",
    ],
    accent: "blue",
  },
  {
    id: "reviews-pro",
    icon: "⭐",
    title: "Reviews (Pro)",
    price: 25,
    bullets: [
      "SMS/email requests + QR",
      "Unified inbox (Google, FB, Yelp…)",
      "AI reply drafts + alerts",
      "Widgets + trend reports",
    ],
    accent: "purple",
  },
  {
    id: "reviews-gold",
    icon: "⭐",
    title: "Reviews (Gold)",
    price: 63,
    bullets: [
      "Smart routing + win-back flows",
      "Response templates + guardrails",
      "Competitor benchmarking",
      "Multi-location roll-ups + compliance",
    ],
    accent: "red",
  },
  {
    id: "social",
    icon: "📣",
    title: "Social",
    price: 8,
    bullets: [
      "FB/IG/X/LinkedIn scheduling",
      "Calendar + drag & drop",
      "AI captions + hashtag help",
      "Analytics + link-in-bio page",
    ],
    accent: "orange",
  },
  {
    id: "local-seo",
    icon: "🔎",
    title: "Local SEO",
    price: 6,
    bullets: [
      "Local keyword + map-pack tracking",
      "Competitor comparison",
      "On-page checks + GBP tips",
      "Monthly scorecard + quick wins",
    ],
    accent: "green",
  },
];

const MSP_ADDONS: MspAddon[] = [
  {
    id: "rep-mgmt",
    icon: "⭐",
    title: "Reputation Management",
    priceLabel: "$15/location (50 responses) + $2 each additional",
    bullets: [
      "Monitor & respond across platforms",
      "AI-assisted responses (tone controls)",
      "Alerts, tagging, monthly reporting",
    ],
    accent: "red",
  },
  {
    id: "social-posting",
    icon: "📣",
    title: "Social Media Posting",
    priceLabel: "$25/location/mo + $3 per extra post",
    bullets: [
      "Branded content publishing",
      "Consistent cross-channel cadence",
      "Calendar, approvals, basic analytics",
    ],
    accent: "orange",
  },
];

const MSP_TIERS: MspTier[] = [
  {
    id: "standard",
    icon: "🛠️",
    title: "Standard MSP",
    monthly: 313,
    hoursIncluded: 10,
    extraHourRate: 69, // base 55 +25% → 68.75 → 69
    response: "P1 90m • P2 120m • P3 180m",
    bullets: [
      "Service hours: 24×5",
      "Channels: Email + Phone",
      "Dedicated CSM + Knowledge Base",
      "Monthly analytics + quarterly audits",
      "GMB Support Assist (tickets, located-in fixes, pins)",
      "Listings/profile edits (SLA ~12h), posts 24h, suggest-edit rejection 48h",
      "Apple Business Connect updates",
    ],
    accent: "blue",
  },
  {
    id: "premium",
    icon: "🧷",
    title: "Premium MSP",
    monthly: 625,
    hoursIncluded: 20,
    extraHourRate: 56, // base 45 +25% → 56.25 → 56
    response: "P1 30m • P2 60m • P3 90m",
    bullets: [
      "Service hours: 24×5 + dedicated service support 12×5",
      "Channels: Email + Chat + Phone",
      "Dedicated Slack channel + CSM",
      "Priority reporting + faster resolution queue",
      "All Standard features + proactive monitoring & priority QA",
    ],
    accent: "purple",
  },
];

/* ---------- RENDERERS ---------- */

const listStyle: React.CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

const Divider = () => (
  <div
    style={{
      height: 1,
      background:
        "linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)",
      margin: "36px 0",
    }}
  />
);

const Plans: React.FC = () => (
  <Section kicker="DIY Plans" title="Start • Advanced • Scale">
    <Grid cols={3}>
      {PLANS.map((p) => (
        <Card key={p.id} accent={p.accent}>
          <Tag accent={p.accent}>
            <span aria-hidden>{p.icon}</span> {p.title}
          </Tag>
          <PriceLine
            value={`$${p.annual}/mo`}
            accent={p.accent}
            sub={`or $${p.monthly} billed monthly • ${p.notes?.[0] ?? ""}`}
          />
          <p style={{ color: COLORS.muted, marginTop: 6 }}>
            <strong>{p.tagline}.</strong>{" "}
            {p.id === "start" &&
              "Free Digital IQ + Blueprint. Build a reliable foundation for attracting customers."}
            {p.id === "advanced" &&
              "Automation + AI Coach included to convert attention into revenue."}
            {p.id === "scale" &&
              "Unify marketing, sales, payments, and retention on one intelligent system."}
          </p>
          <ul style={listStyle}>
            {p.bullets.map((b, i) => (
              <Bullet key={i} accent={p.accent}>
                {b}
              </Bullet>
            ))}
          </ul>
          <CTA />
        </Card>
      ))}
    </Grid>
  </Section>
);

const DiyAddons: React.FC = () => (
  <Section kicker="DIY Add-Ons" title="Self-Service Modules">
    <Grid cols={3}>
      {DIY_ADDONS.map((a) => (
        <Card key={a.id} accent={a.accent}>
          <Tag accent={a.accent}>
            <span aria-hidden>{a.icon}</span> {a.title}
          </Tag>
          <PriceLine value={`$${a.price}/mo`} accent={a.accent} />
          <p style={{ color: COLORS.muted, marginTop: 6 }}>
            {a.title === "Listings" && "Accurate profiles across directories, maps, and search engines."}
            {a.title === "Reviews (Pro)" && "Generate more reviews & respond faster."}
            {a.title === "Reviews (Gold)" && "Advanced insights and automation."}
            {a.title === "Social" && "Plan, publish, and track performance."}
            {a.title === "Local SEO" && "Climb (and stay) in the local 3-pack."}
          </p>
          <ul style={listStyle}>
            {a.bullets.map((b, i) => (
              <Bullet key={i} accent={a.accent}>
                {b}
              </Bullet>
            ))}
          </ul>
        </Card>
      ))}
    </Grid>
  </Section>
);

const MspAddons: React.FC = () => (
  <Section kicker="MSP Add-Ons" title="Managed by Our Team">
    <Grid cols={2}>
      {MSP_ADDONS.map((m) => (
        <Card key={m.id} accent={m.accent}>
          <Tag accent={m.accent}>
            <span aria-hidden>{m.icon}</span> {m.title}
          </Tag>
          <PriceLine value={m.priceLabel} accent={m.accent} />
          {m.subtitle && (
            <div style={{ fontSize: 12, color: COLORS.muted }}>{m.subtitle}</div>
          )}
          <ul style={listStyle}>
            {m.bullets.map((b, i) => (
              <Bullet key={i} accent={m.accent}>
                {b}
              </Bullet>
            ))}
          </ul>
        </Card>
      ))}
    </Grid>
  </Section>
);

const MspPackages: React.FC = () => (
  <Section kicker="MSP Packages" title="Managed Service Tiers (+25% applied)">
    <Grid cols={2}>
      {MSP_TIERS.map((t) => (
        <Card key={t.id} accent={t.accent}>
          <Tag accent={t.accent}>
            <span aria-hidden>{t.icon}</span> {t.title}
          </Tag>
          <PriceLine
            value={`$${t.monthly}/mo`}
            accent={t.accent}
            sub={`${t.hoursIncluded} managed hours • $${t.extraHourRate}/hr additional`}
          />
          <div style={{ fontSize: 12, color: COLORS.muted, margin: "4px 0 8px" }}>
            Initial response: {t.response}
          </div>
          <ul style={listStyle}>
            {t.bullets.map((b, i) => (
              <Bullet key={i} accent={t.accent}>
                {b}
              </Bullet>
            ))}
          </ul>
        </Card>
      ))}
    </Grid>
  </Section>
);

/** Root component you can drop anywhere */
export const Pricing: React.FC = () => {
  React.useEffect(() => {
    // set page background once (optional)
    document.body.style.backgroundColor = COLORS.bg;
    document.body.style.color = COLORS.text;
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  return (
    <div style={WRAP} aria-label="TriadBlue Pricing">
      <h1 style={{ margin: "0 0 12px", fontSize: 34, lineHeight: 1.15 }}>
        TriadBlue Pricing
      </h1>
      <p style={{ margin: "0 0 20px", color: COLORS.muted }}>
        Get found. Get customers. Get business.
      </p>

      <Plans />
      <Divider />
      <DiyAddons />
      <Divider />
      <MspAddons />
      <Divider />
      <MspPackages />
    </div>
  );
};

export default Pricing;

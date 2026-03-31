import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/app-name";
import coachBlueIcon from "@assets/images_logos/coachblue48.png";

interface HowItWorksProps {
  onStartAssessment: () => void;
}

const STEPS = [
  {
    number: 1,
    title: "Scan Your Digital Presence",
    description: "Free. Our scanner analyzes your Google Business listing, website, reviews, social presence, and local SEO — and scores every category.",
    shortDesc: "Free scan of your entire digital footprint.",
    icon: "ClipboardCheck",
    color: "#A00028",
  },
  {
    number: 2,
    title: "Get Your Custom Blueprint",
    description: "AI reads your scores and prescribes exactly which apps you need, in what order, specific to your business and your market.",
    shortDesc: "AI-prescribed plan for your business.",
    icon: "FileText",
    color: "#FFC107",
  },
  {
    number: 3,
    title: "Build Your Foundation with / connect",
    description: "Your CRM goes in first. Every app you activate flows data through / connect automatically — contacts, deals, tasks, all in one place.",
    shortDesc: "CRM foundation — everything flows through it.",
    icon: "Users",
    color: "#008060",
  },
  {
    number: 4,
    title: "Own Your Local Presence — / anchor suite",
    description: "Claim your Google Business listing and D&B DUNS number. Get listed on 80+ directories. Manage reviews. Monitor SEO. Run local advertising.",
    shortDesc: "Listings, reviews, SEO, and ads.",
    icon: "Anchor",
    color: "#2073E3",
  },
  {
    number: 5,
    title: "Activate Your Communications — / compass suite",
    description: "Email campaigns, live chat, a unified inbox for every message channel, and social media management — all connected through / connect.",
    shortDesc: "Email, chat, inbox, and social media.",
    icon: "Compass",
    color: "#F97316",
  },
  {
    number: 6,
    title: "Never Grow Alone — Coach Blue",
    description: "Your 24/7 AI business coach guides your setup, monitors your data, and tells you exactly what to do next. Always on.",
    shortDesc: "Your 24/7 AI business coach.",
    icon: "coachblue-png",
    color: "#0000FF",
  },
];

export function HowItWorks({ onStartAssessment }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">A Blueprint to Your Growth</h2>
          <p className="text-lg text-gray-600">Custom digital growth plan built from AI analysis of your business.</p>
        </div>

        {/* Desktop — 6 steps as bordered cards */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-12">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="p-4 rounded-lg"
              style={{ borderLeft: `4px solid ${step.color}` }}
            >
              <div className="flex items-center gap-3 mb-2">
                {step.icon === "coachblue-png" ? (
                  <img src={coachBlueIcon} alt="Coach Blue" width={36} height={36} style={{ borderRadius: 7, objectFit: "contain" }} />
                ) : (
                  <AppIcon name={step.icon} size={36} color={step.color} />
                )}
                <span className="text-sm font-bold text-gray-900">Step {step.number}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile — stacked list */}
        <div className="block md:hidden space-y-3 mb-12">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ borderLeft: `4px solid ${step.color}` }}
            >
              {step.icon === "coachblue-png" ? (
                <img src={coachBlueIcon} alt="Coach Blue" width={32} height={32} style={{ borderRadius: 6, objectFit: "contain" }} />
              ) : (
                <AppIcon name={step.icon} size={32} color={step.color} />
              )}
              <div>
                <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={onStartAssessment}
            className="text-white font-bold px-8 py-3"
            style={{ backgroundColor: "#A00028" }}
            data-testid="button-get-digital-iq"
          >
            Start Your Blueprint Assessment →
          </Button>
        </div>
      </div>
    </section>
  );
}

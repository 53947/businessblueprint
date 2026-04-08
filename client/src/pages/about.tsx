import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const APPS = {
  compass: {
    label: "Compass Suite",
    price: "$99/mo",
    color: "#F97316",
    apps: [
      { name: "promote", color: "#1844A6", desc: "Email and SMS marketing" },
      { name: "respond", color: "#001882", desc: "Unified inbox for all channels" },
      { name: "engage", color: "#660099", desc: "Live chat widget for your website" },
      { name: "post", color: "#FF44CC", desc: "Social media scheduling and management" },
    ],
  },
  anchor: {
    label: "Anchor Suite",
    price: "$99/mo",
    color: "#2073E3",
    apps: [
      { name: "publish", color: "#064A6C", desc: "Directory listing management" },
      { name: "elevate", color: "#E9B307", desc: "Review monitoring and ratings" },
      { name: "optimize", color: "#374151", desc: "SEO health monitoring" },
      { name: "amplify", color: "#97ACCA", desc: "Advertising management" },
    ],
  },
};

const ECOSYSTEM = [
  { name: "businessblueprint.io", tagline: "Get Assessed. Get Prescribed. Get Business." },
  { name: "swipesblue.com", tagline: "Payment processing for every business" },
  { name: "hostsblue.com", tagline: "Domains, hosting, email, website builder" },
  { name: "scansblue.com", tagline: "Website auditing and scanning" },
  { name: "BUILDERBLUE2.COM", tagline: "AI-powered vibe coding platform" },
  { name: "TRIADBLUE.COM", tagline: "The parent company behind it all" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header showNavigation={true} />

      {/* Hero */}
      <section className="bg-[#E9ECF0] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#09080E] mb-4 font-['Archivo_Semi_Expanded',sans-serif]">
            About businessblueprint.io
          </h1>
          <p className="text-xl text-gray-700">
            Get Assessed. Get Prescribed. Get Business.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#09080E] mb-6 font-['Archivo_Semi_Expanded',sans-serif]">
            What We Do
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            businessblueprint.io scans your digital presence, diagnoses what's costing you customers, and prescribes the exact tools to fix it. No guesswork. No generic advice. A plan built from your actual data.
          </p>
          <p className="text-lg text-gray-700">
            Nine integrated apps, one AI coach, one CRM that connects everything. Each piece works together so you're not juggling disconnected tools that don't talk to each other.
          </p>
        </section>

        {/* The Ecosystem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#09080E] mb-6 font-['Archivo_Semi_Expanded',sans-serif]">
            The TRIADBLUE Ecosystem
          </h2>
          <div className="space-y-4">
            {ECOSYSTEM.map((platform) => (
              <div key={platform.name} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <span className="text-sm font-bold text-[#09080E] min-w-[200px]">
                  {platform.name}
                </span>
                <span className="text-sm text-gray-600">{platform.tagline}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The Apps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#09080E] mb-6 font-['Archivo_Semi_Expanded',sans-serif]">
            The Apps
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Compass Suite */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-['Archivo_Semi_Expanded',sans-serif]">
                <span style={{ color: APPS.compass.color }}>Compass Suite</span>
                <span className="text-sm font-normal text-gray-500 ml-2">{APPS.compass.price}</span>
              </h3>
              <div className="space-y-3">
                {APPS.compass.apps.map((app) => (
                  <div key={app.name} className="flex items-start gap-2">
                    <Link href={`/${app.name}`} className="hover:underline">
                      <span className="text-[#09080E] font-bold">/</span>{" "}
                      <span style={{ color: app.color }} className="font-bold">{app.name}</span>
                    </Link>
                    <span className="text-gray-600 text-sm">— {app.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anchor Suite */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-['Archivo_Semi_Expanded',sans-serif]">
                <span style={{ color: APPS.anchor.color }}>Anchor Suite</span>
                <span className="text-sm font-normal text-gray-500 ml-2">{APPS.anchor.price}</span>
              </h3>
              <div className="space-y-3">
                {APPS.anchor.apps.map((app) => (
                  <div key={app.name} className="flex items-start gap-2">
                    <Link href={`/${app.name}`} className="hover:underline">
                      <span className="text-[#09080E] font-bold">/</span>{" "}
                      <span style={{ color: app.color }} className="font-bold">{app.name}</span>
                    </Link>
                    <span className="text-gray-600 text-sm">— {app.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Standalone */}
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
            <div className="flex items-start gap-2">
              <Link href="/connect" className="hover:underline">
                <span className="text-[#09080E] font-bold">/</span>{" "}
                <span style={{ color: "#008060" }} className="font-bold">connect</span>
              </Link>
              <span className="text-gray-600 text-sm">— CRM. Free Starter (100 contacts) or $29/mo Performance.</span>
            </div>
            <div className="flex items-start gap-2">
              <Link href="/coach-blue" className="hover:underline">
                <span style={{ color: "#0000FF" }} className="font-bold">Coach Blue</span>
              </Link>
              <span className="text-gray-600 text-sm">— AI business coach. $99/mo standalone, $59/mo with one suite, free with both suites.</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <Link href="/assessment">
            <Button size="lg" className="bg-[#09080E] hover:bg-[#09080E]/80 text-white text-lg px-8 py-6">
              Start Your Free Digital IQ Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}

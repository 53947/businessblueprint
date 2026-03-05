import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppName, BundleHeader } from "@/components/app-name";
import {
  APP_REGISTRY,
  BUNDLE_REGISTRY,
  CONNECT_CRM,
  COACH_BLUE,
  DIGITAL_IQ,
  HOW_IT_WORKS_STEPS,
  getAppsByBundle,
} from "@/config/app-registry";

const FONT_FAMILY = "Archivo Semi Expanded, Archivo, sans-serif";

export default function PricingPage() {
  const localblueApps = getAppsByBundle("localblue");
  const commverseApps = getAppsByBundle("commverse");

  const allStandaloneTotal =
    APP_REGISTRY.reduce((sum, app) => sum + app.standalonePrice, 0) +
    CONNECT_CRM.tiers[1].price +
    COACH_BLUE.standalonePrice;

  const bothBundlesTotal =
    BUNDLE_REGISTRY[0].price +
    BUNDLE_REGISTRY[1].price +
    CONNECT_CRM.tiers[1].price +
    COACH_BLUE.withBothBundlesPrice;

  const savings = allStandaloneTotal - bothBundlesTotal;
  const savingsPercent = Math.round((savings / allStandaloneTotal) * 100);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: FONT_FAMILY }}
          >
            Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All pricing from app registry. Mix standalone apps or save with bundles.
          </p>
        </div>

        {/* Section 1: Digital IQ Assessment — FREE */}
        <section className="mb-16">
          <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={DIGITAL_IQ.icon}
                  alt="Digital IQ"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Digital IQ Assessment
                  </h2>
                  <p className="text-gray-600 mb-4">Your starting point — completely free.</p>
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-4">
                    {HOW_IT_WORKS_STEPS.map((step) => (
                      <div key={step.step} className="flex items-center gap-1 text-xs text-gray-500">
                        <img src={step.icon} alt={step.title} className="w-6 h-6 object-contain" />
                        <span>{step.title}</span>
                        {step.step < 5 && <span className="ml-1 text-gray-300">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">FREE</div>
                  <Link href="/assessment">
                    <Button className="bg-[#A00028] text-white hover:bg-[#800020]">
                      Start Your Assessment →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: / connect CRM + Coach Blue */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Connect CRM */}
            <div>
              <div className="mb-4">
                <AppName appId="connect" size="lg" showDesc />
              </div>
              <div className="space-y-4">
                {CONNECT_CRM.tiers.map((tier) => (
                  <Card key={tier.name} className="border-2 border-gray-200 hover:shadow-md transition-all">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{tier.name}</h4>
                        <p className="text-sm text-gray-500">
                          {tier.contactLimit
                            ? `${tier.contactLimit} contacts, 1 user`
                            : "Unlimited contacts & users"}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {tier.price === 0 ? "Free" : `$${tier.price}/mo`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Coach Blue */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <img
                  src={COACH_BLUE.icon}
                  alt="Coach Blue"
                  className="w-8 h-8 rounded-md object-contain"
                />
                <span
                  className="font-semibold text-lg"
                  style={{ fontFamily: FONT_FAMILY, color: COACH_BLUE.color }}
                >
                  {COACH_BLUE.name}
                </span>
                <span className="text-sm text-gray-400">— {COACH_BLUE.description}</span>
              </div>
              <div className="space-y-4">
                <Card className="border-2 border-purple-200 hover:shadow-md transition-all">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Standalone</h4>
                      <p className="text-sm text-gray-500">Without any bundle</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${COACH_BLUE.standalonePrice}/mo
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-purple-200 hover:shadow-md transition-all">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">With 1 Bundle</h4>
                      <p className="text-sm text-gray-500">LocalBlue or CommVerse</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${COACH_BLUE.withOneBundlePrice}/mo
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-300 bg-green-50 hover:shadow-md transition-all">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">With Both Bundles</h4>
                      <p className="text-sm text-gray-500">LocalBlue + CommVerse</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">FREE</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: / localblue Bundle — $99/mo */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <BundleHeader bundleId="localblue" showPrice />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {localblueApps.map((app) => (
              <Link key={app.id} href={app.landingRoute}>
                <Card className="border-2 border-blue-200 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <AppName appId={app.id} size="md" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        <span className="font-semibold text-gray-700">${app.standalonePrice}</span>{" "}
                        standalone
                      </span>
                      <span className="text-blue-600 font-semibold">
                        ${app.bundlePrice} in bundle
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: / commverse Bundle — $99/mo */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <BundleHeader bundleId="commverse" showPrice />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commverseApps.map((app) => (
              <Link key={app.id} href={app.landingRoute}>
                <Card className="border-2 border-orange-200 hover:shadow-lg hover:border-orange-400 transition-all cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <AppName appId={app.id} size="md" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        <span className="font-semibold text-gray-700">${app.standalonePrice}</span>{" "}
                        standalone
                      </span>
                      <span className="text-orange-600 font-semibold">
                        ${app.bundlePrice} in bundle
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: The Full Picture */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold text-gray-900 text-center mb-8"
            style={{ fontFamily: FONT_FAMILY }}
          >
            The Full Picture
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">All Standalone</h3>
                <p className="text-sm text-gray-500 mb-4">Every app at individual pricing</p>
                <div className="text-4xl font-bold text-gray-400 line-through">
                  ${allStandaloneTotal}/mo
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-green-400 bg-green-50 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Both Bundles + CRM</h3>
                <p className="text-sm text-gray-500 mb-4">
                  LocalBlue $99 + CommVerse $99 + CRM $29 + Coach Blue FREE
                </p>
                <div className="text-4xl font-bold text-green-600">${bothBundlesTotal}/mo</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">You Save</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Bundle discount vs all standalone
                </p>
                <div className="text-4xl font-bold text-green-600">
                  ${savings} ({savingsPercent}%)
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Rules */}
        <section className="mb-16">
          <Card className="border border-gray-200 bg-gray-50">
            <CardContent className="p-8">
              <h3
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: FONT_FAMILY }}
              >
                Pricing Rules
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    Bundles don't cross-discount each other — LocalBlue and CommVerse are independent
                    bundles at $99/mo each.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    <span style={{ color: '#008060', fontWeight: 600 }}>/ connect</span> is always
                    standalone — Free (100 contacts) or $29/mo (unlimited).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    <span style={{ color: COACH_BLUE.color, fontWeight: 600 }}>Coach Blue</span>:{" "}
                    $99/mo standalone → $59/mo with 1 bundle → FREE with both bundles.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center mb-8">
          <Link href="/assessment">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full font-bold bg-[#A00028] text-white hover:bg-[#800020]"
              style={{ fontFamily: FONT_FAMILY }}
            >
              Start Your Free Assessment →
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

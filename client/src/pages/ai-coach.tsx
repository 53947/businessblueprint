import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Brain, Sparkles, TrendingUp, BarChart3, Zap, MessageSquare, Shield } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COACH_BLUE, BUNDLE_REGISTRY } from "@/config/app-registry";

const COACH_COLOR = COACH_BLUE.color;
const FONT_FAMILY = "Archivo Semi Expanded, Archivo, sans-serif";

export default function AICoachPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img
                src={COACH_BLUE.icon}
                alt="Coach Blue"
                className="h-20 w-20 object-contain drop-shadow-lg rounded-xl"
              />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: FONT_FAMILY, color: COACH_COLOR }}
              >
                {COACH_BLUE.name}
              </h1>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: COACH_COLOR }}>
              {COACH_BLUE.description}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your 24/7 AI Business Coach
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Personalized business guidance powered by AI. Get actionable advice on marketing, operations,
              growth strategy, and digital presence — anytime you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'coach-blue', name: 'Coach Blue', price: COACH_BLUE.standalonePrice, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart — ${COACH_BLUE.standalonePrice}/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: COACH_COLOR }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/assessment">Start Digital IQ Assessment</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md"
                style={{ borderColor: COACH_COLOR, color: COACH_COLOR }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/pricing">View All Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Pricing */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: FONT_FAMILY }}>
              Loyalty Pricing — The More You Use, The Less You Pay
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <h4 className="text-white font-bold mb-1">Standalone</h4>
                <p className="text-gray-400 text-sm mb-3">Without any bundle</p>
                <div className="text-4xl font-bold" style={{ color: COACH_COLOR }}>
                  ${COACH_BLUE.standalonePrice}<span className="text-lg text-gray-400">/mo</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <h4 className="text-white font-bold mb-1">With 1 Bundle</h4>
                <p className="text-gray-400 text-sm mb-3">LocalBlue or CommVerse</p>
                <div className="text-4xl font-bold text-white">
                  ${COACH_BLUE.withOneBundlePrice}<span className="text-lg text-gray-400">/mo</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-900 border-green-700 text-center">
              <CardContent className="p-6">
                <h4 className="text-white font-bold mb-1">With Both Bundles</h4>
                <p className="text-gray-400 text-sm mb-3">LocalBlue + CommVerse</p>
                <div className="text-4xl font-bold text-green-400">FREE</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Coach Blue Does */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: FONT_FAMILY }}>
              What Coach Blue Does For You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Think of it as having a seasoned business consultant available 24/7 —
              one who knows your Digital IQ score, your apps, and your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COACH_COLOR }}>
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Personalized Guidance</h3>
                  <p className="text-gray-600">
                    Coach Blue knows your Digital IQ results and tailors every recommendation to your
                    specific business needs, industry, and growth stage.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COACH_COLOR }}>
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Growth Strategy</h3>
                  <p className="text-gray-600">
                    Get actionable strategies for marketing, customer acquisition, retention,
                    and revenue growth — not generic advice, but plans built for you.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COACH_COLOR }}>
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered Insights</h3>
                  <p className="text-gray-600">
                    Leverages your data across all Business Blueprint apps to surface opportunities
                    you'd never spot on your own.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12" style={{ fontFamily: FONT_FAMILY }}>
            Everything You Get with Coach Blue
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: COACH_COLOR }}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">24/7 AI Chat</h3>
                <p className="text-gray-600">
                  Ask anything about marketing, SEO, customer engagement, or business operations. Get expert-level answers instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: COACH_COLOR }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Blueprint Analysis</h3>
                <p className="text-gray-600">
                  Coach Blue reads your Digital IQ Assessment results and creates a prioritized action plan for improvement.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: COACH_COLOR }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">App Integration</h3>
                <p className="text-gray-600">
                  Coach Blue understands how / publish, / elevate, / optimize, / promote, / respond, / engage, and / post work together.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: COACH_COLOR }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Competitive Intelligence</h3>
                <p className="text-gray-600">
                  Get insights on your competitive landscape, market positioning, and opportunities for differentiation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: `linear-gradient(to bottom right, ${COACH_COLOR}, #7C3AED)` }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: FONT_FAMILY }}>
              How Coach Blue Pricing Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Loyalty Rewards
                </h3>
                <p className="text-purple-100 mb-6">
                  The more Business Blueprint tools you use, the less Coach Blue costs.
                  With both bundles, Coach Blue is completely free — our way of rewarding loyalty.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  No Hidden Costs
                </h3>
                <p className="text-purple-100">
                  Unlimited conversations, unlimited questions, no per-message fees.
                  Your price is your price — simple and predictable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Works With Everything
                </h3>
                <p className="text-purple-100 mb-6">
                  Coach Blue integrates with your Digital IQ results, your{" "}
                  <span style={{ color: BUNDLE_REGISTRY[0].color }}>/ {BUNDLE_REGISTRY[0].name}</span> apps, and your{" "}
                  <span style={{ color: BUNDLE_REGISTRY[1].color }}>/ {BUNDLE_REGISTRY[1].name}</span> apps for context-aware coaching.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Built for Local Business
                </h3>
                <p className="text-purple-100">
                  Enterprise consulting is too expensive. Generic AI chatbots lack business expertise.
                  Coach Blue is the sweet spot — expert-level guidance at a fraction of the cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: FONT_FAMILY }}>
            Ready to Unlock Your Business Potential?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with a free Digital IQ Assessment, then let Coach Blue guide your growth journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: COACH_COLOR }}
              asChild
              data-testid="button-start-free"
            >
              <a href="/assessment">Start Your Digital Assessment</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 shadow-md"
              style={{ borderColor: COACH_COLOR, color: COACH_COLOR }}
              asChild
              data-testid="button-cta-pricing"
            >
              <a href="/pricing">View Pricing</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            ${COACH_BLUE.standalonePrice}/mo standalone · ${COACH_BLUE.withOneBundlePrice}/mo with 1 bundle · FREE with both bundles
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

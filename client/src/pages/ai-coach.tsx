import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Brain, Sparkles, TrendingUp, BarChart3, Zap, MessageSquare, Shield, Compass, Bell, HelpCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { COACH_BLUE } from "@/config/app-registry";

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
              <AppName appId="coachblue" size="lg" iconSize={36} />
            </div>
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

      {/* Dark Band Pricing */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">$99/mo</div>
              <span className="text-white text-2xl">|</span>
              <span className="text-white text-xl">Free with Anchor + Compass Suites</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Modes of Coach Blue */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: FONT_FAMILY }}>
              The 4 Modes of Coach Blue
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Coach Blue adapts to what you need, when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COACH_COLOR }}>
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Guided</h3>
                  <p className="text-gray-600">
                    Step-by-step setup for every app, in the right order. Coach Blue walks you through
                    each tool so nothing gets missed and everything connects.
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
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Advisory</h3>
                  <p className="text-gray-600">
                    Proactive insights from your app data, surfaced before you ask. Coach Blue spots
                    trends and opportunities so you can act on them early.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COACH_COLOR }}>
                    <HelpCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Responsive</h3>
                  <p className="text-gray-600">
                    Ask anything, get answers specific to your business. Coach Blue pulls from your
                    data across every app to give context-aware guidance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COACH_COLOR }}>
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Alert</h3>
                  <p className="text-gray-600">
                    Urgent flags delivered the moment something needs attention. A bad review, a missed
                    follow-up, a listing error — Coach Blue catches it first.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Setup Order */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: FONT_FAMILY }}>
              Your Setup Order
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Coach Blue guides you through each app in the right sequence. Here is the cadence it follows.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { num: 1, app: "/connect", desc: "Your CRM foundation, every app flows through it" },
              { num: 2, app: "/publish", desc: "Get listed on every directory that matters" },
              { num: 3, app: "/elevate", desc: "Start managing reviews from day one" },
              { num: 4, app: "/optimize", desc: "Monitor your SEO health baseline" },
              { num: 5, app: "/promote", desc: "Launch your first email campaign" },
              { num: 6, app: "/respond", desc: "Connect your messaging channels" },
              { num: 7, app: "/engage", desc: "Add live chat to your website" },
              { num: 8, app: "/post", desc: "Schedule your social media content" },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
                  style={{ backgroundColor: COACH_COLOR }}
                >
                  {step.num}
                </div>
                <div>
                  <span className="font-bold text-gray-900">{step.app}</span>
                  <span className="text-gray-500 mx-2">—</span>
                  <span className="text-gray-600">{step.desc}</span>
                </div>
              </div>
            ))}
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

      {/* CTA Section */}
      <section className="py-16 bg-white">
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
        </div>
      </section>

      <Footer />
    </div>
  );
}

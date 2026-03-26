import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Brain, Sparkles, TrendingUp, BarChart3, Zap, MessageSquare, Shield, Compass, Bell, HelpCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { COACH_BLUE } from "@/config/app-registry";

const COACH_COLOR = COACH_BLUE.color;
const FONT_FAMILY = "Archivo Semi Expanded, Archivo, sans-serif";

export default function CoachBluePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="coachblue" size="lg" iconSize={36} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Business Advice You've Always Needed. Available Whenever You Need It.
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Most small business owners have never had access to a business advisor. Not because they didn't want one — because good advisors cost hundreds of dollars an hour and most aren't available at 11pm when you're reviewing your week. Coach Blue is. He knows your Digital IQ Score, your app setup, your data, and your goals. He doesn't give generic advice. He tells you specifically what to do with your specific business — right now.
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
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white text-xl">
              $99/mo Standalone  |  $59/mo with Anchor or Compass Suite  |  FREE with Both Suites
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Modes of Coach Blue */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: FONT_FAMILY }}>
              Four Ways Coach Blue Shows Up For Your Business
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
                    Every time you open a new app for the first time, Coach Blue walks you through it. Not a tutorial video. Not a help article. A step-by-step guide specific to your business — in the right order, with the right explanation for why each step matters. He picks up exactly where you left off every time you return. You never have to figure out where to start.
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
                    Every 30 minutes, Coach Blue reviews the data from every active app and looks for patterns worth your attention. A review rating trending down. A keyword ranking that slipped three positions. A campaign open rate that dropped. He surfaces these as insights — not alarms, not notifications that pile up, but specific observations with specific suggested actions. When it's relevant. When it matters.
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
                    Ask Coach Blue anything about your business. 'Why did my search ranking drop this week?' 'What should I post about this month?' 'How do I get more reviews?' 'Is my email open rate normal?' He answers from the context of your actual businessblueprint data — not from a FAQ, not from a search engine. From what he knows about your business.
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
                    Some things can't wait for the next advisory check. An unauthorized edit to your Google listing. A one-star review with no response after 24 hours. A campaign that stopped sending. Coach Blue fires an alert the moment these things happen — before they cost you a customer, a ranking, or a reputation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Setup Order */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: FONT_FAMILY }}>
              He Knows the Right Order. And He Keeps You In It.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most business owners, left to their own devices, set up things in the wrong order. They run ads before their listings are accurate. They send email campaigns before they have a real contact list. They install chat before they have an inbox to route it to. These mistakes cost time and money.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Coach Blue knows the correct setup sequence — the one that builds each capability on top of the last, so every app you activate makes the ones before it stronger. He guides you through it in order: / connect first, then / publish, then / elevate, then / respond, then / engage, then / post, then / promote, then / amplify. Each step in sequence. Each one building on the last.
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
      <section className="py-16 bg-white border-b border-gray-100">
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
      <section className="py-16 bg-gray-50 border-b border-gray-100">
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

      {/* What This Means */}
      <section className="py-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0000FF] text-white rounded-xl p-8 my-12">
            <h3 className="text-white font-bold text-xl mb-4">You've Never Had an Advisor Like This</h3>
            <p className="text-blue-100 leading-relaxed">
              A good business advisor knows your business, watches your numbers, and tells you what to do before problems become crises. For most small business owners, that kind of advisor has never been accessible — the cost is too high, the availability is too limited. Coach Blue changes that. He's inside your businessblueprint, watching everything, available around the clock, and the more apps you activate, the more he knows about your business and the more specific his advice becomes. He's not a chatbot. He's the advisor you should have had from the start.
            </p>
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

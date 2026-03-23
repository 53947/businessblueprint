import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Megaphone,
  Target,
  DollarSign,
  Eye,
  Clock,
  Users,
  ArrowRight,
  Layers,
  MessageCircle,
  Search,
  Crosshair,
  PenTool,
  Activity,
  LayoutGrid,
  Star,
  Link2,
  ScanLine,
  BotMessageSquare,
  Bell,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function AmplifyLanding() {
  const app = getAppById("amplify")!;
  const bundlePrice = getBundlePrice("anchor");
  const bundleApps = getAppsByBundle("anchor");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="amplify" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Advertise Smarter. Across Every Platform.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Unified ad management across Meta, Google, and Reddit. One dashboard to create,
              manage, and optimize campaigns everywhere your customers spend their time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'amplify-addon', name: '/ amplify', price: app?.standalonePrice ?? 29, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart &mdash; $29/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#6EA6FF', color: '#ffffff' }}
                asChild
                data-testid="button-open-dashboard"
              >
                <a href="/amplify-app">Open Dashboard</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-[#6EA6FF]/10 transition-colors"
                style={{ borderColor: '#6EA6FF', color: '#6EA6FF' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/anchor-pricing">View All Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Band - Pricing Callout */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">$29/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-white text-2xl">|</span>
              <div className="text-4xl font-bold text-white">${bundlePrice ?? 99}/mo</div>
              <span className="text-white text-xl">Anchor Suite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Section 1: Two Bases. One Dashboard. */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Two Bases. One Dashboard.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most ad tools force you into a single platform's logic. /amplify splits the world
              into two advertising bases and unifies them under one reporting layer.
            </p>
          </div>

          {/* Unified Layer on top */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="border-2 shadow-lg bg-white" style={{ borderColor: '#6EA6FF' }}>
              <CardContent className="pt-6 pb-6">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#6EA6FF' }}>
                    <Layers className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Reporting Layer</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-900">Cross-Platform Reporting</p>
                    <p className="text-sm text-gray-600">See all campaigns in one view</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-900">Budget Control</p>
                    <p className="text-sm text-gray-600">Allocate spend across platforms</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-900">AI Recommendations</p>
                    <p className="text-sm text-gray-600">Data-driven optimization tips</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two Base columns */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-blue-600">
                    <Megaphone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Meta Base</h3>
                </div>
                <div className="space-y-3">
                  {["Facebook", "Instagram", "Threads", "WhatsApp"].map((platform) => (
                    <div key={platform} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-600">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{platform}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-red-500">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Google Base</h3>
                </div>
                <div className="space-y-3">
                  {["Google Search", "Display", "YouTube", "Maps", "Gmail", "Bing"].map((platform) => (
                    <div key={platform} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-red-500">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{platform}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unique Section 2: Reddit: The Platform Others Ignore */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reddit: The Platform Others Ignore
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reddit has 1.7 billion monthly visits and the most engaged communities on the internet.
              /amplify is one of the only platforms that treats Reddit as a first-class advertising channel.
            </p>
          </div>

          {/* Reddit Workflow: Scan -> Target -> Create -> Monitor -> Engage */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 mb-12">
            {[
              { icon: Search, label: "Scan", desc: "Subreddit Intelligence" },
              { icon: Crosshair, label: "Target", desc: "Audience Selection" },
              { icon: PenTool, label: "Create", desc: "Reddit-Native Creative" },
              { icon: Activity, label: "Monitor", desc: "Sentiment Tracking" },
              { icon: MessageCircle, label: "Engage", desc: "Comment Assistant" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#6EA6FF' }}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">{step.label}</span>
                  <span className="text-sm text-gray-600 text-center">{step.desc}</span>
                </div>
                {i < 4 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block ml-2" />
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#6EA6FF' }}>
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Subreddit Intelligence Scan</h3>
                  <p className="text-gray-600 text-sm">
                    Discover which subreddits your customers frequent and what topics drive engagement in your industry.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#6EA6FF' }}>
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Reddit-Native Creative Drafting</h3>
                  <p className="text-gray-600 text-sm">
                    AI writes ad copy that fits Reddit's conversational tone. No corporate-speak that gets downvoted.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#6EA6FF' }}>
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Sentiment Monitoring</h3>
                  <p className="text-gray-600 text-sm">
                    Track how Reddit users feel about your brand, competitors, and industry in real time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#6EA6FF' }}>
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Comment Engagement Assistant</h3>
                  <p className="text-gray-600 text-sm">
                    AI-suggested replies to comments on your promoted posts. Engage authentically without the time sink.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unique Section 3: Built Into Your Ecosystem */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built Into Your Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              /amplify is not a silo. It connects to every part of your BusinessBlueprint stack
              to make your ads smarter, your targeting sharper, and your workflow seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#6EA6FF' }}>
                      <LayoutGrid className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">/publish</h3>
                    <p className="text-gray-600 text-sm">
                      Auto-populate location targeting and business hours from your listings data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#6EA6FF' }}>
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">/elevate</h3>
                    <p className="text-gray-600 text-sm">
                      Inject review data into ad creative. Show real customer praise in your campaigns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#6EA6FF' }}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">/connect</h3>
                    <p className="text-gray-600 text-sm">
                      Export CRM contacts as custom audiences. Target the people who already know you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#6EA6FF' }}>
                      <ScanLine className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">/optimize</h3>
                    <p className="text-gray-600 text-sm">
                      ScansBlue-driven ad recommendations. Let site audit data inform your ad strategy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#6EA6FF' }}>
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">/engage</h3>
                    <p className="text-gray-600 text-sm">
                      Chat volume timing insights. Know when customers are most active and schedule ads to match.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#6EA6FF' }}>
                      <BotMessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">Coach Blue</h3>
                    <p className="text-gray-600 text-sm">
                      Guided setup and performance alerts. Your AI advertising assistant walks you through every step.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Section: What Sets /amplify Apart */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Sets /amplify Apart
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6EA6FF' }}>
                    <Layers className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Dual-Base Architecture</h3>
                  <p className="text-gray-600 text-sm">
                    Not one-size-fits-all. Meta and Google are fundamentally different ad ecosystems, and /amplify treats them that way.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6EA6FF' }}>
                    <PenTool className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">AI Creative Drafting</h3>
                  <p className="text-gray-600 text-sm">
                    Pulls from your real business data to generate ad copy and creative that actually sounds like you.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6EA6FF' }}>
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Budget Controller</h3>
                  <p className="text-gray-600 text-sm">
                    Shift spend between platforms in real time. Move dollars to where they perform best, instantly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6EA6FF' }}>
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Reddit Sentiment Monitoring</h3>
                  <p className="text-gray-600 text-sm">
                    Unique to /amplify. Track brand perception on Reddit and adjust your messaging in real time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6EA6FF' }}>
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Business Hours Sync</h3>
                  <p className="text-gray-600 text-sm">
                    Ads pause when you are closed. No wasted spend driving traffic to a business that cannot respond.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6EA6FF' }}>
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">CRM-Powered Audiences</h3>
                  <p className="text-gray-600 text-sm">
                    Your customers become your targeting. Build lookalike and retargeting audiences from real CRM data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Start Advertising Smarter Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses that manage all their advertising from one intelligent dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#6EA6FF', color: '#ffffff' }}
              asChild
              data-testid="button-get-started"
            >
              <a href="/amplify-app">Get Started with /amplify</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-gray-300 shadow-md"
              asChild
              data-testid="button-explore-platform"
            >
              <a href="/assessment">Start Your Digital Assessment</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /amplify is available standalone or as part of the Anchor Suite. No setup fees. No long-term contracts.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Target, Search, FileText, Wrench, PenTool, MapPin, Sparkles, BarChart3, ArrowRight, TrendingDown, Bell, ArrowUp, ArrowDown } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getBundlePrice } from "@/config/app-registry";

const OPTIMIZE_COLOR = '#374151';

export default function OptimizeLanding() {
  const app = getAppById("optimize")!;
  const bundlePrice = getBundlePrice("anchor");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="optimize" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Know Exactly Where You Stand on Google
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Monitor your SEO health, track keyword rankings, analyze pages, fix technical issues,
              and get AI-powered optimization recommendations — all in one dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'optimize-addon', name: '/ optimize', price: app.standalonePrice, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart — ${app.standalonePrice}/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: OPTIMIZE_COLOR }}
                asChild
                data-testid="button-open-dashboard"
              >
                <a href="/optimize/dashboard">Open Dashboard</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md"
                style={{ borderColor: OPTIMIZE_COLOR, color: OPTIMIZE_COLOR }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/pricing">View All Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">${app.standalonePrice}/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-white text-2xl">|</span>
              <div className="text-4xl font-bold text-white">${bundlePrice}/mo</div>
              <span className="text-white text-xl">Anchor Suite</span>
            </div>
            <p className="text-white text-sm">
              / publish + / elevate + / optimize = Complete local presence + SEO management
            </p>
          </div>
        </div>
      </section>

      {/* Your SEO Health Score */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your SEO Health Score
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four categories scored independently so you know exactly where to focus your effort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Technical SEO</h3>
                <p className="text-gray-600 text-sm">
                  Page speed, mobile usability, SSL, broken links, crawl errors, and structured data validation.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">On-Page SEO</h3>
                <p className="text-gray-600 text-sm">
                  Title tags, meta descriptions, heading structure, keyword density, and internal linking.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Local SEO</h3>
                <p className="text-gray-600 text-sm">
                  NAP consistency, Google Business Profile optimization, local citations, and geo-targeted content.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Content</h3>
                <p className="text-gray-600 text-sm">
                  Content quality, word count, readability, keyword targeting, freshness, and topical authority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Keyword Rankings That Matter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Keyword Rankings That Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track the local-intent keywords your customers actually search for — not vanity metrics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Local-Intent Keywords</h3>
                <p className="text-gray-600 text-sm">
                  Focus on "near me" searches, city-specific terms, and service-area keywords that drive real foot traffic and calls.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Weekly Rank Movement</h3>
                <p className="text-gray-600 text-sm">
                  See exactly how your positions change week over week. Identify trends and measure the impact of your optimizations.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Drop Alerts</h3>
                <p className="text-gray-600 text-sm">
                  Get notified immediately when a tracked keyword drops in position so you can investigate and respond fast.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Rank Higher
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade SEO tools powered by AI — no agency required.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'SEO Health Dashboard', desc: 'Real-time health score with performance, SEO, and accessibility metrics. Track improvements over time.' },
              { icon: Search, title: 'Keyword Intelligence', desc: 'AI-powered keyword research, rank tracking, and competitor gap analysis. Know what to target.' },
              { icon: FileText, title: 'On-Page SEO Analyzer', desc: 'Analyze any page for title tags, meta descriptions, headings, content quality, and more.' },
            ].map((feature, i) => (
              <Card key={i} className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Powerful Modules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Wrench, title: 'Technical SEO Monitor', desc: 'Detect broken links, missing meta tags, SSL issues, slow pages, and more. Get clear fix instructions.' },
              { icon: PenTool, title: 'Content Optimizer', desc: 'AI-generated content briefs with outlines, keyword suggestions, and word count targets.' },
              { icon: Sparkles, title: 'AI SEO Action Plan', desc: 'Get a prioritized to-do list generated by AI based on your scan results, keywords, and pages.' },
              { icon: MapPin, title: 'Local SEO', desc: 'Optimize for local search results with location-specific keyword tracking and GBP integration.' },
            ].map((feature, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${OPTIMIZE_COLOR}15` }}>
                      <feature.icon className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why Choose / optimize</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">With / optimize</h3>
              {[
                'Real-time SEO health monitoring',
                'AI-powered keyword research',
                'Automated technical audits',
                'Content optimization briefs',
                'Prioritized action plans',
                'No agency fees required',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Without / optimize</h3>
              {[
                'Guessing what to fix first',
                'Manual keyword tracking in spreadsheets',
                'Missed technical issues hurting rankings',
                'No content strategy guidance',
                'Scattered tools and data',
                'Expensive agency retainers',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-500 text-xs font-bold">&#x2715;</span>
                  </span>
                  <span className="text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Works With Your Stack</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            / optimize integrates seamlessly with other Business Blueprint tools for a complete digital presence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: '/ publish', href: '/publish-landing', desc: 'Directory listings' },
              { name: '/ elevate', href: '/elevate-landing', desc: 'Review management' },
              { name: 'ScansBlue', href: '/scansblue/purchase', desc: 'Website audits' },
              { name: 'Coach Blue', href: '/ai-coach', desc: 'AI business coaching' },
              { name: '/ post', href: '/post', desc: 'Content management' },
            ].map((integration, i) => (
              <a key={i} href={integration.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow min-w-[140px]">
                <p className="font-bold text-gray-900 text-sm">{integration.name}</p>
                <p className="text-xs text-gray-500">{integration.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: OPTIMIZE_COLOR }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Start monitoring your SEO health and get AI-powered recommendations today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
              style={{ backgroundColor: '#FF6B00' }}
              onClick={() => {
                const event = new CustomEvent('addToCart', {
                  detail: { sku: 'optimize-addon', name: '/ optimize', price: app.standalonePrice, type: 'addon' }
                });
                window.dispatchEvent(event);
              }}
              data-testid="button-cta-add-to-cart"
            >
              Add to Cart — ${app.standalonePrice}/mo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 shadow-md bg-white hover:bg-gray-100"
              style={{ color: OPTIMIZE_COLOR }}
              asChild
            >
              <a href="/optimize/dashboard">
                Open Dashboard <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

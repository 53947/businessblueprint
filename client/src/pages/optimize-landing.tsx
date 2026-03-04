import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Target, Search, FileText, Wrench, PenTool, Link2, MapPin, Code2, Sparkles, BarChart3, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const OPTIMIZE_COLOR = '#374151';

const modules = [
  { name: 'SEO Health Dashboard', icon: Target, status: 'Active', desc: 'Overall SEO score and health monitoring' },
  { name: 'Keyword Intelligence', icon: Search, status: 'Active', desc: 'Keyword research and rank tracking' },
  { name: 'On-Page SEO Analyzer', icon: FileText, status: 'Active', desc: 'Page-by-page SEO analysis and suggestions' },
  { name: 'Technical SEO Monitor', icon: Wrench, status: 'Active', desc: 'Technical issues detection and fixes' },
  { name: 'Content Optimizer', icon: PenTool, status: 'Active', desc: 'AI content briefs and optimization' },
  { name: 'Backlink Monitor', icon: Link2, status: 'Coming Soon', desc: 'Track and analyze your backlink profile' },
  { name: 'Local SEO Optimizer', icon: MapPin, status: 'Coming Soon', desc: 'Local search optimization tools' },
  { name: 'Schema Markup Generator', icon: Code2, status: 'Coming Soon', desc: 'Structured data creation wizard' },
  { name: 'AI SEO Action Plan', icon: Sparkles, status: 'Active', desc: 'AI-prioritized optimization tasks' },
  { name: 'Reporting & Insights', icon: BarChart3, status: 'Coming Soon', desc: 'Performance reports and analytics' },
];

export default function OptimizeLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: OPTIMIZE_COLOR }}>
                <Target className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span style={{ color: '#09080E' }}>/ </span>
                <span style={{ color: OPTIMIZE_COLOR }}>optimize</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
              Your Complete SEO Command Center
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
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
                    detail: { sku: 'optimize-addon', name: '/ optimize', price: 29, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart - $29/mo
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
      <section className="py-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-6">
              <div>
                <span className="text-sm text-gray-400 uppercase tracking-wide">FREE</span>
                <p className="text-white font-bold text-lg">Starter Plan</p>
              </div>
              <span className="text-gray-500 text-2xl">|</span>
              <div>
                <span className="text-3xl font-extrabold text-white">$29<span className="text-lg font-normal text-gray-300">/mo</span></span>
                <p className="text-gray-300 text-sm">Performance Plan</p>
              </div>
            </div>
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

      {/* Module Preview Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">10 Modules. One Dashboard.</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Every aspect of SEO covered — from technical health to content strategy.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {modules.map((mod, i) => (
              <Card key={i} className="border border-gray-200 bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <mod.icon className="w-8 h-8 mx-auto mb-2" style={{ color: OPTIMIZE_COLOR }} />
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{mod.name}</h4>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                    mod.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {mod.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-white">
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
                    <span className="text-red-500 text-xs font-bold">✕</span>
                  </span>
                  <span className="text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 bg-gray-50">
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
                  detail: { sku: 'optimize-addon', name: '/ optimize', price: 29, type: 'addon' }
                });
                window.dispatchEvent(event);
              }}
              data-testid="button-cta-add-to-cart"
            >
              Add to Cart - $29/mo
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

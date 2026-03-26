import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin, RefreshCw, BarChart3, Shield, Zap, Globe, Building2, Search, AlertTriangle, Lock, Eye } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function ListingsLanding() {
  const app = getAppById("publish")!;
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
              <AppName appId="publish" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Business. Everywhere It Needs to Be.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sync your business information across 100+ directories automatically.
              Google, Yelp, Facebook, Apple Maps — keep your listings accurate and consistent everywhere customers search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'list-addon', name: '/ publish', price: app.standalonePrice, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart — ${app.standalonePrice}/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#064A6C', color: '#FFF' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/assessment">Start Digital IQ Assessment</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-blue-50 transition-colors"
                style={{ borderColor: '#064A6C', color: '#064A6C' }}
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

      {/* Featured: Google Business Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Google Business Profile
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Google listing is the single most important directory. We treat it differently.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-lg bg-white" style={{ borderColor: '#064A6C' }}>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#064A6C' }}>
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">AI-Validated Setup</h3>
                      <p className="text-gray-600 text-sm">AI reviews every field of your profile for completeness, accuracy, and SEO best practices before publishing.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#064A6C' }}>
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Field-by-Field Guidance</h3>
                      <p className="text-gray-600 text-sm">Step-by-step walkthrough of every GBP field with recommendations tailored to your industry.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#064A6C' }}>
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Listing Locks After Approval</h3>
                      <p className="text-gray-600 text-sm">Once your profile is optimized and approved, we lock it down so no unauthorized changes slip through.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#064A6C' }}>
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Unauthorized Edit Monitoring</h3>
                      <p className="text-gray-600 text-sm">24/7 monitoring detects third-party edits to your listing and alerts you immediately so nothing goes unnoticed.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured: D&B DUNS Number */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              D&B DUNS Number
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A verified DUNS number unlocks syndication to 80+ business directories. We guide you through every step.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-lg bg-white" style={{ borderColor: '#064A6C' }}>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ backgroundColor: '#064A6C' }}>1</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Detection Flow</h3>
                        <p className="text-gray-600 text-sm">We check if your business already has a DUNS number on file. No guesswork needed.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ backgroundColor: '#064A6C' }}>2</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Guided Application</h3>
                        <p className="text-gray-600 text-sm">If you don't have one, we walk you through the free application process step by step.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ backgroundColor: '#064A6C' }}>3</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Claim & Optimize</h3>
                        <p className="text-gray-600 text-sm">Already have one? We help you claim it, verify your data, and optimize your D&B profile.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ backgroundColor: '#064A6C' }}>4</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Syndicate to 80+ Directories</h3>
                        <p className="text-gray-600 text-sm">Your verified DUNS number becomes the foundation for pushing accurate data to 80+ directories.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Directories We Manage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your business synced and monitored across the directories that matter most.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Google', icon: Globe, status: 'Synced' },
              { name: 'Bing Places', icon: Search, status: 'Synced' },
              { name: 'Apple Business Connect', icon: MapPin, status: 'Synced' },
              { name: 'Yelp', icon: Building2, status: 'Synced' },
              { name: 'Facebook', icon: Globe, status: 'Synced' },
            ].map((dir, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <dir.icon className="w-10 h-10 mx-auto mb-3" style={{ color: '#064A6C' }} />
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{dir.name}</h4>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    <Check className="w-3 h-3" />
                    {dir.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">Plus 100+ additional directories synced automatically</p>
        </div>
      </section>

      {/* Why Directory Management Matters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Directory Management Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Inconsistent business information across directories costs you customers. When your hours, phone, or address
              don't match, search engines lose trust and customers lose patience. / publish keeps everything synchronized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#064A6C' }}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">100+ Directory Sync</h3>
                  <p className="text-gray-600">
                    Automatically push your business info to Google, Yelp, Bing, Apple Maps, and 100+ directories instantly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#064A6C' }}>
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Updates</h3>
                  <p className="text-gray-600">
                    Changed your hours? Updated your phone? Sync once, and it updates everywhere — no manual entry needed.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#064A6C' }}>
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Listing Analytics</h3>
                  <p className="text-gray-600">
                    Track which directories drive the most traffic, views, and customer actions to your business.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Fix Your Listings?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with a free Digital IQ Assessment to see how accurate your business listings are across the web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              style={{ backgroundColor: '#064A6C', color: '#FFF' }}
              asChild
              data-testid="button-cta-assessment"
            >
              <a href="/assessment">Get Your Digital IQ Score</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              style={{ borderColor: '#064A6C', color: '#064A6C' }}
              asChild
              data-testid="button-cta-pricing"
            >
              <a href="/pricing">View All Pricing</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

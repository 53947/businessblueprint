import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin, RefreshCw, BarChart3, Shield, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import listingsIcon from "@assets/listings app_1762804610311.png";
import listingsLogo from "@assets/listings_1762930219632.png";

export default function ListingsLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={listingsIcon} alt="/listings icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={listingsLogo} alt="/listings" className="h-16 object-contain drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Be Found Everywhere
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
                    detail: { sku: 'listings-addon', name: '/listings', price: 40, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#FF0040', color: '#FFF' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/assessment">Start Digital IQ Assessment</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-red-50 transition-colors"
                style={{ borderColor: '#FF0040', color: '#FF0040' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/pricing">View Pricing</a>
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
              <div className="text-4xl font-bold" style={{ color: '#FF0040' }}>$40/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold text-white">$60/mo</div>
              <span className="text-white text-xl">for all LocalBlue apps</span>
            </div>
            <p className="text-gray-300 text-sm">
              /listings + /reputation = Complete local presence management
            </p>
          </div>
        </div>
      </section>

      {/* The /listings Difference */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Directory Management Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Inconsistent business information across directories costs you customers. When your hours, phone, or address 
              don't match, search engines lose trust and customers lose patience. /listings keeps everything synchronized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF0040' }}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-sync-title">100+ Directory Sync</h3>
                  <p className="text-gray-600" data-testid="text-feature-sync-description">
                    Automatically push your business info to Google, Yelp, Bing, Apple Maps, and 100+ directories instantly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF0040' }}>
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-update-title">Instant Updates</h3>
                  <p className="text-gray-600" data-testid="text-feature-update-description">
                    Changed your hours? Updated your phone? Sync once, and it updates everywhere — no manual entry needed.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF0040' }}>
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-analytics-title">Listing Analytics</h3>
                  <p className="text-gray-600" data-testid="text-feature-analytics-description">
                    Track which directories drive the most traffic, views, and customer actions to your business.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Complete Directory Control
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF0040' }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Multi-Platform Sync</h3>
                <p className="text-gray-600">
                  Update your business info once and push it across Google My Business, Yelp, Facebook, Bing, Apple Maps, and 100+ directories.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF0040' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Error Detection & Fixing</h3>
                <p className="text-gray-600">
                  Scan for inconsistencies, duplicate listings, and incorrect information — then fix it all automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF0040' }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Performance Tracking</h3>
                <p className="text-gray-600">
                  See which directories bring the most views, clicks, and calls. Optimize your presence where it matters most.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF0040' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">SEO Optimization</h3>
                <p className="text-gray-600">
                  Consistent NAP (Name, Address, Phone) across directories boosts your local SEO rankings and search visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
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
              style={{ backgroundColor: '#FF0040', color: '#FFF' }}
              asChild
              data-testid="button-cta-assessment"
            >
              <a href="/assessment">Get Your Digital IQ Score</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              style={{ borderColor: '#FF0040', color: '#FF0040' }}
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

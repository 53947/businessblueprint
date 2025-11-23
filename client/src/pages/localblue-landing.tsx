import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin, Star, TrendingUp, Shield, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import badge3 from "@assets/generated_images/step_3_blue_badge_icon.png";
import localBlueLogo from "@assets/localblue-logo.png";

export default function LocalBlueLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={badge3} alt="LocalBlue icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={localBlueLogo} alt="LocalBlue" className="h-16 object-contain drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Dominate Your Local Market
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete local SEO management with directory listings, reputation building, and review response — 
              all powered by AI to help customers find and trust your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0000FF', color: '#FFF' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/assessment">Start Digital IQ Assessment</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-blue-50 transition-colors"
                style={{ borderColor: '#0000FF', color: '#0000FF' }}
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
              <div className="text-4xl font-bold" style={{ color: '#0000FF' }}>$75/mo</div>
              <span className="text-white text-xl">for all 3 LocalBlue apps</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold text-white">$40/mo</div>
              <span className="text-white text-xl">each standalone</span>
            </div>
            <p className="text-gray-300 text-sm">
              /listings + /reputation + local SEO = Complete local presence management
            </p>
          </div>
        </div>
      </section>

      {/* The LocalBlue Difference */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose LocalBlue
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Local search drives foot traffic and revenue. LocalBlue ensures your business shows up consistently 
              across every directory, manages your reputation, and converts searches into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0000FF' }}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-listings-title">Accurate Listings Everywhere</h3>
                  <p className="text-gray-600" data-testid="text-feature-listings-description">
                    Sync your business info across 100+ directories. Google, Yelp, Facebook, Apple Maps — we keep it all consistent.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0000FF' }}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-reputation-title">AI-Powered Review Response</h3>
                  <p className="text-gray-600" data-testid="text-feature-reputation-description">
                    Never miss a review. Our AI crafts professional responses that build trust and show customers you care.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0000FF' }}>
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-seo-title">Local SEO Optimization</h3>
                  <p className="text-gray-600" data-testid="text-feature-seo-description">
                    Rank higher in local search. We optimize every signal Google uses to decide which businesses to show.
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
            Everything You Need for Local Success
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#0000FF' }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Directory Sync & Management</h3>
                <p className="text-gray-600">
                  Fix errors, update hours, sync your business across Google, Yelp, Bing, Apple Maps, and 100+ directories instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#0000FF' }}>
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Review Monitoring & AI Response</h3>
                <p className="text-gray-600">
                  Track reviews from every platform in one dashboard. AI generates professional responses to build trust and credibility.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#0000FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Reputation Protection</h3>
                <p className="text-gray-600">
                  Monitor sentiment trends, flag negative reviews, and respond quickly to protect your brand reputation online.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#0000FF' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Local Ranking Insights</h3>
                <p className="text-gray-600">
                  Track your local search rankings, analyze competitors, and get actionable insights to improve visibility.
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
            Ready to Dominate Local Search?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with a free Digital IQ Assessment to see how your business ranks in local search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              style={{ backgroundColor: '#0000FF', color: '#FFF' }}
              asChild
              data-testid="button-cta-assessment"
            >
              <a href="/assessment">Get Your Digital IQ Score</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              style={{ borderColor: '#0000FF', color: '#0000FF' }}
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

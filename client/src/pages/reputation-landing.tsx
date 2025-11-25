import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import reputationIcon from "@assets/reputation app triad blue and repoutation gold_1762804622669.png";
import reputationLogo from "@assets/reputation_1762930219633.png";

export default function ReputationLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={reputationIcon} alt="/reputation icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={reputationLogo} alt="/reputation" className="h-16 object-contain drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Build Trust with Every Review
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered review monitoring and response management across all platforms. 
              Never miss a review, respond professionally, and build the reputation that drives revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', { 
                    detail: { sku: 'reputation-management', name: '/reputation', price: 40, type: 'addon' }
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
                style={{ backgroundColor: '#D59600', color: '#FFF' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/assessment">Start Digital IQ Assessment</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-amber-50 transition-colors"
                style={{ borderColor: '#D59600', color: '#D59600' }}
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
              <div className="text-4xl font-bold" style={{ color: '#D59600' }}>$40/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold text-white">$75/mo</div>
              <span className="text-white text-xl">for all 3 LocalBlue apps</span>
            </div>
            <p className="text-gray-300 text-sm">
              /reputation + /listings + local SEO = Complete local presence management
            </p>
          </div>
        </div>
      </section>

      {/* The /reputation Difference */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Review Management Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              93% of consumers read online reviews before making a purchase. Your reputation online directly impacts revenue. 
              /reputation helps you monitor, respond, and build trust at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D59600' }}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-monitor-title">Multi-Platform Monitoring</h3>
                  <p className="text-gray-600" data-testid="text-feature-monitor-description">
                    Track reviews from Google, Yelp, Facebook, TripAdvisor, and 20+ platforms in one unified dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D59600' }}>
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-ai-title">AI Response Generation</h3>
                  <p className="text-gray-600" data-testid="text-feature-ai-description">
                    Let AI draft professional, empathetic responses to reviews — positive or negative. You review, we respond.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D59600' }}>
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-sentiment-title">Sentiment Analysis</h3>
                  <p className="text-gray-600" data-testid="text-feature-sentiment-description">
                    Track trends in positive, neutral, and negative reviews. Spot issues before they become reputation crises.
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
            Complete Reputation Control
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#D59600' }}>
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Unified Review Dashboard</h3>
                <p className="text-gray-600">
                  See all your reviews from Google, Yelp, Facebook, TripAdvisor, and more in one place. Never miss a review again.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#D59600' }}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">AI-Powered Responses</h3>
                <p className="text-gray-600">
                  Generate professional, empathetic responses to reviews automatically. Customize tone and approve before posting.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#D59600' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Reputation Alerts</h3>
                <p className="text-gray-600">
                  Get instant notifications when new reviews arrive — especially negative ones that need immediate attention.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#D59600' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Sentiment Tracking</h3>
                <p className="text-gray-600">
                  Monitor trends in customer feedback. Identify recurring issues and measure the impact of improvements over time.
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
            Ready to Protect Your Reputation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with a free Digital IQ Assessment to see how your business is reviewed across the web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              style={{ backgroundColor: '#D59600', color: '#FFF' }}
              asChild
              data-testid="button-cta-assessment"
            >
              <a href="/assessment">Get Your Digital IQ Score</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              style={{ borderColor: '#D59600', color: '#D59600' }}
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

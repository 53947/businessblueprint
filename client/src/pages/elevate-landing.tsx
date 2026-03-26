import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, MessageSquare, TrendingUp, Shield, Zap, Mail, Phone, ArrowRight, Bell, Send } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function ReputationLanding() {
  const app = getAppById("elevate")!;
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
              <AppName appId="elevate" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Reputation. Managed.
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
                    detail: { sku: 'review-management', name: '/ elevate', price: app.standalonePrice, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart — ${app.standalonePrice}/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity font-bold"
                style={{ backgroundColor: '#E9B307', color: '#09080E' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/assessment">Start Digital IQ Assessment</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-amber-50 transition-colors"
                style={{ borderColor: '#E9B307', color: '#E9B307' }}
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

      {/* Where We Pull Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Where We Pull Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every review from the platforms that matter most, aggregated into a single dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E9B307' }}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Google Reviews</h3>
                  <ul className="text-gray-600 text-sm text-left space-y-2">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Star ratings and review text</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Reviewer name and photo</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Response status tracking</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Direct reply integration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E9B307' }}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Yelp Reviews</h3>
                  <ul className="text-gray-600 text-sm text-left space-y-2">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Full review content</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Sentiment analysis</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Rating trend tracking</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> New review alerts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E9B307' }}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Facebook Reviews</h3>
                  <ul className="text-gray-600 text-sm text-left space-y-2">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Recommendations and ratings</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Comment monitoring</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Page engagement data</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" /> Response management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Automated Response */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Automated Response Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI reads every review, drafts a professional response, and lets you approve it — or auto-publishes on your behalf.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-gray-200 shadow-md bg-white relative">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#E9B307' }}>1</div>
                  <Bell className="w-10 h-10 mx-auto mb-4" style={{ color: '#E9B307' }} />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">New Review Detected</h3>
                  <p className="text-gray-600 text-sm">AI reads the incoming review, identifies sentiment, and determines priority level.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 shadow-md bg-white relative">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#E9B307' }}>2</div>
                  <MessageSquare className="w-10 h-10 mx-auto mb-4" style={{ color: '#E9B307' }} />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">AI Drafts Response</h3>
                  <p className="text-gray-600 text-sm">A professional, empathetic response is generated matching your brand voice and the review context.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 shadow-md bg-white relative">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#E9B307' }}>3</div>
                  <Send className="w-10 h-10 mx-auto mb-4" style={{ color: '#E9B307' }} />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Approve or Auto-Publish</h3>
                  <p className="text-gray-600 text-sm">Review and edit the draft before posting, or enable auto-publish for hands-free reputation management.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Review Request Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Review Request Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Turn happy customers into 5-star reviews. After a transaction, automatically request feedback via email or SMS.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E9B307' }}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Triggered After Transaction</h3>
              <p className="text-gray-600 text-sm">
                Automatically send a review request after a purchase, appointment, or service completion.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E9B307' }}>
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Email & SMS Delivery</h3>
              <p className="text-gray-600 text-sm">
                Reach customers where they are. Choose email, SMS, or both to maximize response rates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E9B307' }}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Conversion Tracking</h3>
              <p className="text-gray-600 text-sm">
                Track how many requests are sent, opened, and converted into published reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
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
              className="text-lg px-8 py-6 font-bold"
              style={{ backgroundColor: '#E9B307', color: '#09080E' }}
              asChild
              data-testid="button-cta-assessment"
            >
              <a href="/assessment">Get Your Digital IQ Score</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              style={{ borderColor: '#E9B307', color: '#E9B307' }}
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

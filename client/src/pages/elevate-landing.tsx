import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, MessageSquare, TrendingUp, Shield, Zap, Mail, Phone, ArrowRight, Bell, Send } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function ElevateLanding() {
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
              What Customers Say About You Is the Most Powerful Marketing You Have
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Before a new customer ever calls you, they read your reviews. Every one of them. Not just the rating — the actual words. What did people say went wrong. How did you respond. Did you respond at all. Your review profile is a live, public record of how you treat customers — and most business owners are too busy running their business to manage it properly. / elevate manages it for them.
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
            <p className="text-white text-xl">
              $29/mo Standalone  |  $99/mo Anchor Suite — includes / publish, / optimize, and / amplify
            </p>
          </div>
        </div>
      </section>

      {/* Where We Pull Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Platform Where Customers Are Talking About You
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
                  <p className="text-gray-600">
                    Google reviews carry the most weight — for your search ranking, for your credibility, and for the first impression every new customer forms when they find you. / elevate pulls every new Google review the moment it posts, scores the sentiment, drafts a response, and routes it for your approval. You never miss one. You never leave one unanswered.
                  </p>
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
                  <p className="text-gray-600">
                    Yelp users are vocal and they're looking for reasons to trust you — or not. A business with unanswered negative Yelp reviews looks like a business that doesn't care. / elevate gives you the same automated response workflow for Yelp as it does for Google. One dashboard. No platform gets neglected.
                  </p>
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
                  <p className="text-gray-600">
                    Your Facebook followers are often your most loyal customers — and their reviews carry social proof that travels through their networks. / elevate monitors your Facebook recommendations and reviews and brings them into the same dashboard as Google and Yelp. Your reputation is managed in one place, across all three.
                  </p>
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
              You Can't Respond to Every Review Manually. You Don't Have To.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A new review posts on Google at 11pm on a Tuesday. By the time you see it Wednesday morning, twelve hours have passed. / elevate saw it the moment it went live — classified the sentiment, drafted a professional response that matches the tone and context of the review, and queued it for your approval. You read it, make any edits you want, and post it. Or you enable auto-publish and it goes out immediately without you.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              The AI that writes the responses doesn't use a template. It reads the actual review — the words, the tone, the specific complaint or compliment — and writes a response that sounds like a real person who read what the customer wrote. Because that's what builds trust. Not 'Thank you for your feedback!' A real, specific, thoughtful response.
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
              Happy customers rarely leave reviews on their own. Not because they don't want to — because no one asked them to, and by the time they thought about it, the moment had passed. / elevate sends a review request automatically after a transaction — via email, SMS, or both — while the experience is still fresh. The request links directly to your Google listing. One tap and they're writing a review. / elevate tracks how many requests were sent, opened, and converted into published reviews. You see exactly what's working and what isn't.
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

      {/* What This Means */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E9B307] rounded-xl p-8 my-12">
            <h3 className="text-[#09080E] font-bold text-xl mb-4">Your Rating Is a Revenue Number</h3>
            <p className="text-[#09080E] leading-relaxed">
              Studies consistently show that a business moving from a 3.5 to a 4.5 star rating can see a significant increase in calls, clicks, and revenue — without changing anything else. / elevate manages the activities that move that number: consistent responses that show you care, and a steady flow of review requests that keep fresh reviews coming in. The rating improves. The revenue follows.
            </p>
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

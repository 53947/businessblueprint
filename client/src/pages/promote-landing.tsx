import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, MessageSquare, Users, BarChart3, Shield, Zap, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function PromoteLanding() {
  const app = getAppById("promote")!;
  const bundlePrice = getBundlePrice("compass");
  const bundleApps = getAppsByBundle("compass");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="promote" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Customers You Already Have Are Your Best Source of New Revenue
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Email marketing has the highest return of any digital marketing channel — consistently. Not social media. Not ads. Email. Because the people on your list already know you, already trust you, and already bought from you. They opted in. They want to hear from you. / promote gives you the tools to reach them — with campaigns that look professional, send reliably, and track what happens after they land.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'send-addon', name: '/ promote', price: app.standalonePrice, type: 'addon' }
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
                style={{ backgroundColor: '#1844A6', color: '#ffffff' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/promote/dashboard">Get Started with / promote</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-[#1844A6]/10 transition-colors"
                style={{ borderColor: '#1844A6', color: '#1844A6' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/compass-pricing">View All Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white text-xl">
              $29/mo Standalone  |  $99/mo Compass Suite — includes / respond, / engage, and / post
            </p>
          </div>
        </div>
      </section>

      {/* The / promote Difference */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We Built / promote
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most email marketing platforms are built for marketing teams with designers and dedicated staff. The interfaces are complicated, the pricing scales quickly, and the learning curve is steep. Small business owners sign up, get overwhelmed, and never send a single campaign.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              / promote was built for the business owner who wants to send a professional email to their customer list without needing to become an email marketer. The campaign builder is straightforward. The templates are clean. The list comes directly from / connect — the contacts you've already entered don't need to be imported again. You write the email. You pick the list. You schedule it or send it now. / promote does the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-unified-title">Complete Data Ownership</h3>
                  <p className="text-gray-600" data-testid="text-feature-unified-description">
                    Your contacts, your campaigns, your data. No vendor lock-in, no access restrictions, no limitations on your customer information.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-compliant-title">Privacy-First Design</h3>
                  <p className="text-gray-600" data-testid="text-feature-compliant-description">
                    GDPR, CAN-SPAM, and TCPA compliant by design. Your customers' trust is protected with automated consent management.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-channels-title">Unified Multi-Channel</h3>
                  <p className="text-gray-600" data-testid="text-feature-channels-description">
                    Email and SMS from one platform. Create coordinated campaigns that reach customers wherever they are.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Engage Customers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#1844A6' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Contact Management</h3>
                <p className="text-gray-600">
                  Organize contacts with custom fields, segments, and lists. Import from anywhere, export anytime—your data, your way.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#1844A6' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Campaign Automation</h3>
                <p className="text-gray-600">
                  Schedule campaigns, set up drip sequences, and trigger messages based on customer behavior.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#1844A6' }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Real-Time Analytics</h3>
                <p className="text-gray-600">
                  Track open rates, click-throughs, conversions, and ROI. Make data-driven decisions with detailed reporting.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#1844A6' }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Template Library</h3>
                <p className="text-gray-600">
                  Professional templates for every occasion. Customizable designs that look great on any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What $29/mo Gets You */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What $29/mo Gets You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              1,000 emails per month included in your plan. Unused emails roll over — up to 2,000 in your bank at any time. If you need to send more, you can bring your own Resend account for higher volumes. Campaigns don't disappear when you hit the limit — they queue and send when capacity is available, or send immediately if you upgrade.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Your list comes from / connect. Your contacts are already there — no CSV import, no copy-paste, no manual re-entry. Segment by any field in / connect: industry, location, last purchase date, tags you've applied. The right message goes to the right people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">1,000 Emails/Month</h3>
                  <p className="text-gray-600 text-sm">
                    1,000 emails included every month with your subscription. More than enough for most local businesses.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <ArrowRight className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Unused Emails Roll Over</h3>
                  <p className="text-gray-600 text-sm">
                    Did not use all 1,000 this month? They roll over to next month, up to a maximum of 2,000 banked emails.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Campaigns Queue Gracefully</h3>
                  <p className="text-gray-600 text-sm">
                    Hit your limit? Campaigns queue automatically and resume when your allocation refreshes. Nothing gets lost.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1844A6' }}>
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Bring Your Own Resend</h3>
                  <p className="text-gray-600 text-sm">
                    Need higher volume? Connect your own Resend account for unlimited sends at your own rate. Full control, no middleman.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Point of Difference */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What Makes / promote Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#1844A6' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Works Autonomously & Together
                </h3>
                <p className="text-gray-600 mb-6">
                  / promote works well on its own for email and SMS campaigns. But when integrated with / engage and / respond as part of the Compass Suite,
                  it shares customer insights and analytics to create smarter, more effective marketing.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#1844A6' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  No Hidden Costs, No Surprises
                </h3>
                <p className="text-gray-600">
                  Standalone at ${app.standalonePrice}/mo or bundled in Compass Suite for ${bundlePrice}/mo. No per-message fees, no contact limits,
                  no "premium features" upsells. What you see is what you get.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#1844A6' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Purpose-Built for Local Businesses
                </h3>
                <p className="text-gray-600 mb-6">
                  Other platforms force you into their ecosystem. Generic email tools are too complex.
                  / promote hits the sweet spot: capable enough for real growth, simple enough to actually use.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#1844A6' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Compliance You Can Trust
                </h3>
                <p className="text-gray-600">
                  Automated opt-in/opt-out management, geographic compliance rules, and audit trails.
                  Sleep soundly knowing you're following the law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1844A6] text-white rounded-xl p-8 my-12">
            <h3 className="text-white font-bold text-xl mb-4">The Best New Customer Is an Old One</h3>
            <p className="text-blue-100 leading-relaxed">
              Acquiring a new customer costs five to seven times more than retaining an existing one. The customers in your / connect list already chose you. A well-timed, relevant email — a seasonal promotion, a reminder that it's been a while, a new service announcement — brings them back. / promote makes it easy to stay in contact with every customer in your list, on a schedule that makes sense for your business. Not spam. Communication.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Take Control of Your Customer Data
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses who own their customer relationships and marketing strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#1844A6', color: '#ffffff' }}
              asChild
              data-testid="button-start-free"
            >
              <a href="/assessment">Start Your Digital Assessment</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-gray-300 shadow-md"
              asChild
              data-testid="button-explore-platform"
            >
              <a href="/promote/dashboard">Explore / promote Platform</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            / promote is included in all subscription tiers • No setup fees • No long-term contracts
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

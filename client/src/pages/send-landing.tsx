import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, MessageSquare, Users, BarChart3, Shield, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import sendLogo from "@assets/send logo_1760075605263.png";
import sendIcon from "@assets/send icon_1760074368870.png";

export default function SendLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={sendIcon} alt="/send icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={sendLogo} alt="/send" className="h-16 object-contain drop-shadow-md" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Own Your Customer Relationships
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Direct email and SMS marketing built for businesses that demand complete control 
              over their customer data and engagement strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg"
                style={{ backgroundColor: '#E6B747', color: '#000' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/send-app">Get Started with /send</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-gray-300 shadow-md"
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/subscription">View Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The /send Difference */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We Built /send
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your customer data is your most valuable asset. We created /send so you maintain complete control 
              over your customer relationships, contact information, and engagement history—without depending on 
              third-party platforms that limit access to your own data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E6B747' }}>
                    <Mail className="w-8 h-8 text-black" />
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E6B747' }}>
                    <Shield className="w-8 h-8 text-black" />
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E6B747' }}>
                    <MessageSquare className="w-8 h-8 text-black" />
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Engage Customers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6B747' }}>
                  <Users className="w-6 h-6 text-black" />
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6B747' }}>
                  <Zap className="w-6 h-6 text-black" />
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6B747' }}>
                  <BarChart3 className="w-6 h-6 text-black" />
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6B747' }}>
                  <Check className="w-6 h-6 text-black" />
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

      {/* The Point of Difference */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What Makes /send Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#E6B747' }}>
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  Built for the businessblueprint.io Ecosystem
                </h3>
                <p className="text-gray-600 mb-6">
                  Unlike standalone marketing tools, /send is natively integrated with your Digital Blueprint, 
                  AI Coach, and client portal. Your marketing insights inform your growth strategy automatically.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#E6B747' }}>
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  No Hidden Costs, No Surprises
                </h3>
                <p className="text-gray-600">
                  Included in all 6 subscription tiers starting at $250/mo. No per-message fees, no contact limits, 
                  no "premium features" upsells. What you see is what you get.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#E6B747' }}>
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  Purpose-Built for Local Businesses
                </h3>
                <p className="text-gray-600 mb-6">
                  Other platforms force you into their ecosystem. Generic email tools are too complex. 
                  /send hits the sweet spot: powerful enough for growth, simple enough to actually use.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#E6B747' }}>
                    <Check className="w-4 h-4 text-black" />
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

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-200">
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
              className="text-lg px-8 py-6 shadow-lg"
              style={{ backgroundColor: '#E6B747', color: '#000' }}
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
              <a href="/send-app">Explore /send Platform</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /send is included in all subscription tiers • No setup fees • No long-term contracts
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

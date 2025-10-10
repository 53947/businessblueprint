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
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={sendIcon} alt="/send icon" className="h-20 w-20 object-contain" />
              <img src={sendLogo} alt="/send" className="h-16 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Email + SMS Marketing.<br />Unified. Compliant. Powerful.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The marketing platform built for businesses who need more than basic email. 
              Reach customers everywhere with unified campaigns across email and SMS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
                asChild
                data-testid="button-get-started"
              >
                <a href="/send-app">Get Started with /send</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why /send Exists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We built /send because existing platforms like Synup don't offer native email/SMS marketing capabilities. 
              Your business needs more than directory management—you need direct customer engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" data-testid="text-feature-unified-title">Unified Campaigns</h3>
                  <p className="text-gray-600" data-testid="text-feature-unified-description">
                    Create once, deploy everywhere. Send coordinated email and SMS campaigns from a single platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" data-testid="text-feature-compliant-title">Full Compliance Built-In</h3>
                  <p className="text-gray-600" data-testid="text-feature-compliant-description">
                    GDPR, CAN-SPAM, and TCPA compliant out of the box. Automated unsubscribe management and consent tracking.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" data-testid="text-feature-channels-title">Multi-Channel Power</h3>
                  <p className="text-gray-600" data-testid="text-feature-channels-description">
                    Reach customers on their preferred channels. Email for depth, SMS for urgency, both for maximum impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Engage Customers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Contact Management</h3>
                <p className="text-gray-600">
                  Organize contacts with custom fields, segments, and lists. Import from anywhere, export anytime.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Campaign Automation</h3>
                <p className="text-gray-600">
                  Schedule campaigns, set up drip sequences, and trigger messages based on customer behavior.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                <p className="text-gray-600">
                  Track open rates, click-throughs, conversions, and ROI. Make data-driven decisions with detailed reporting.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Template Library</h3>
                <p className="text-gray-600">
                  Professional templates for every occasion. Customizable designs that look great on any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Point of Difference */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes /send Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Built for the businessblueprint.io Ecosystem
                </h3>
                <p className="text-green-50 mb-6">
                  Unlike standalone marketing tools, /send is natively integrated with your Digital Blueprint, 
                  AI Coach, and client portal. Your marketing insights inform your growth strategy automatically.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  No Hidden Costs, No Surprises
                </h3>
                <p className="text-green-50">
                  Included in all 6 subscription tiers starting at $250/mo. No per-message fees, no contact limits, 
                  no "premium features" upsells. What you see is what you get.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Purpose-Built for Local Businesses
                </h3>
                <p className="text-green-50 mb-6">
                  Synup focuses on directories. Generic email tools are too complex. /send hits the sweet spot: 
                  powerful enough for growth, simple enough to actually use.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Compliance You Can Trust
                </h3>
                <p className="text-green-50">
                  Automated opt-in/opt-out management, geographic compliance rules, and audit trails. 
                  Sleep soundly knowing you're following the law.
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
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses who've moved beyond basic directories to direct customer engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
              asChild
              data-testid="button-start-free"
            >
              <a href="/assessment">Start Your Digital Assessment</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
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

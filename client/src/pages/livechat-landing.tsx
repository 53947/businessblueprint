import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageCircle, Clock, Users, BarChart3, Globe, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import livechatLogo from "@assets/logos and wordmarks/: livechat app logo.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";

export default function LivechatLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={livechatIcon} alt="/livechat icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={livechatLogo} alt="/livechat" className="h-16 object-contain drop-shadow-md" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Turn Website Visitors<br />Into Conversations.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The live chat widget that feels natural, remembers everything, and integrates perfectly 
              with your /inbox. Because every visitor is a potential customer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', { 
                    detail: { sku: 'livechat-addon', name: '/livechat', price: 35, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#8000FF' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/livechat-demo">Get Started with /livechat</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-[#8000FF]/10 transition-colors"
                style={{ borderColor: '#8000FF', color: '#8000FF' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/commverse-pricing">View Pricing</a>
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
              <div className="text-4xl font-bold" style={{ color: '#8000FF' }}>$35/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold text-white">$75/mo</div>
              <span className="text-white text-xl">for all 3 Commverse apps</span>
            </div>
            <p className="text-gray-300 text-sm">
              /send + /livechat + /inbox = Complete communication ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why /livechat Was Built
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Standalone chat widgets are disconnected islands. They don't know about your customer data, 
              marketing campaigns, or business insights. /livechat changes that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#8000FF' }}>
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-instant-title">Instant Engagement</h3>
                  <p className="text-gray-600" data-testid="text-feature-instant-description">
                    Catch visitors at the exact moment they're interested. Answer questions before they bounce to competitors.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#8000FF' }}>
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-persistence-title">Session Persistence</h3>
                  <p className="text-gray-600" data-testid="text-feature-persistence-description">
                    Conversations don't disappear when visitors close their browser. Full history is preserved and accessible.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#8000FF' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-unified-title">Unified in /inbox</h3>
                  <p className="text-gray-600" data-testid="text-feature-unified-description">
                    Live chat flows directly into /inbox alongside email, SMS, and social messages. One interface for everything.
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
            Everything You Need for Great Conversations
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8000FF' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time Typing Indicators</h3>
                <p className="text-gray-600">
                  See when visitors are typing. Know when agents are crafting responses. Natural conversation flow.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8000FF' }}>
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visitor Context & History</h3>
                <p className="text-gray-600">
                  See what page they're on, their browsing history, and past conversations. Personalized service from word one.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8000FF' }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Response Time Analytics</h3>
                <p className="text-gray-600">
                  Track average response times, conversation duration, and customer satisfaction scores.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8000FF' }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Customizable Widget Design</h3>
                <p className="text-gray-600">
                  Match your brand colors, position, greeting message, and trigger behavior. Looks native to your site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Point of Difference */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: 'linear-gradient(to bottom right, #8000FF, #A020F0)' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes /livechat Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Works Autonomously & Together
                </h3>
                <p className="text-purple-50 mb-6">
                  /livechat functions perfectly on its own, but gains superpowers when integrated with /send and /inbox—
                  connecting your Digital Blueprint, customer insights, and marketing automation for smarter conversations.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Conversation Continuity
                </h3>
                <p className="text-purple-50">
                  Visitors can start on live chat, continue via email, and follow up on WhatsApp. 
                  One conversation thread, multiple channels. That's the Commverse integration.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Built for Local Business Scale
                </h3>
                <p className="text-purple-50 mb-6">
                  Enterprise chat tools are overkill. Free tools lack features and reliability. 
                  /livechat hits the sweet spot for growing local businesses.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  No Per-Chat or Per-Agent Fees
                </h3>
                <p className="text-purple-50">
                  Standalone at $35/mo or bundled with /send + /inbox for $75/mo. Unlimited chats, unlimited agents, 
                  unlimited websites. Transparent, predictable pricing.
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
            Ready to Capture Every Opportunity?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses turning website visitors into conversations and conversations into customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-6"
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
              data-testid="button-try-demo"
            >
              <a href="/livechat-demo">Try Live Demo</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /livechat is included in all subscription tiers • Session persistence • Unlimited chats
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

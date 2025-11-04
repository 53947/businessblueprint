import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageSquare, Zap, TrendingUp, Users } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import inboxIcon from "@assets/native icons and favicons/: inbox app icon.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";

export default function CommverseLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Commverse:<br />Your Complete Communication Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Three powerful apps that work independently but shine together. 
              Email, SMS, live chat, and unified inbox—all sharing analytics for smarter customer engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#0080FF' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/commverse-pricing">View Pricing</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#0080FF', color: '#0080FF' }}
                asChild
                data-testid="button-learn-more"
              >
                <a href="#how-it-works">How It Works</a>
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
              <div className="text-4xl font-bold" style={{ color: '#E6B747' }}>$35/mo</div>
              <span className="text-white text-xl">each app</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold" style={{ color: '#0080FF' }}>$75/mo</div>
              <span className="text-white text-xl">for all 3</span>
            </div>
            <p className="text-gray-300 text-sm">
              Save $30/month with the complete Commverse bundle
            </p>
          </div>
        </div>
      </section>

      {/* The Three Apps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Three Apps. One Ecosystem.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each app is powerful on its own. Together, they create a communication powerhouse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#E6B747' }}>
              <CardContent className="pt-8">
                <div className="text-center">
                  <img src={sendIcon} alt="/send" className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">/send</h3>
                  <p className="text-sm mb-4" style={{ color: '#E6B747' }}>Email & SMS Marketing</p>
                  <p className="text-gray-600 mb-4">
                    Create unified campaigns, manage contacts, and own your customer data. GDPR and CAN-SPAM compliant.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    style={{ borderColor: '#E6B747', color: '#E6B747' }}
                    asChild
                  >
                    <a href="/send">Learn More →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#8000FF' }}>
              <CardContent className="pt-8">
                <div className="text-center">
                  <img src={livechatIcon} alt="/livechat" className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">/livechat</h3>
                  <p className="text-sm mb-4" style={{ color: '#8000FF' }}>Website Live Chat</p>
                  <p className="text-gray-600 mb-4">
                    Turn visitors into conversations. Real-time chat with session persistence and conversation history.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    style={{ borderColor: '#8000FF', color: '#8000FF' }}
                    asChild
                  >
                    <a href="/livechat">Learn More →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#0080FF' }}>
              <CardContent className="pt-8">
                <div className="text-center">
                  <img src={inboxIcon} alt="/inbox" className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">/inbox</h3>
                  <p className="text-sm mb-4" style={{ color: '#0080FF' }}>Unified Communications</p>
                  <p className="text-gray-600 mb-4">
                    8 channels in one inbox: Email, SMS, WhatsApp, Facebook, Instagram, X, TikTok, and live chat.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    style={{ borderColor: '#0080FF', color: '#0080FF' }}
                    asChild
                  >
                    <a href="/inbox">Learn More →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Commverse Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When integrated, these apps share analytics and customer insights to create smarter automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0080FF' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cross-App Analytics</h3>
                <p className="text-gray-600">
                  /send knows what customers clicked in /livechat. /inbox sees email campaign engagement. Smarter messaging across all channels.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FC6ACD' }}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Conversation Continuity</h3>
                <p className="text-gray-600">
                  Start on live chat, continue via email, follow up on WhatsApp. One thread, multiple channels, seamless experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8000FF' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Unified Customer View</h3>
                <p className="text-gray-600">
                  See every interaction across all apps. Email opens, chat sessions, SMS responses—all in one customer profile.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E6B747' }}>
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Intelligent Automation</h3>
                <p className="text-gray-600">
                  Trigger email campaigns from chat interactions. Auto-respond based on SMS history. Let the ecosystem work smarter, not harder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: 'linear-gradient(to bottom right, #0080FF, #8000FF, #FC6ACD)' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Commverse is Different
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Works Independently or Together
                </h3>
                <p className="text-blue-50 mb-6">
                  Use one app, two apps, or all three. Each functions perfectly on its own, but the real magic happens when they work together.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Built for Blue Link Ecosystem
                </h3>
                <p className="text-blue-50">
                  Commverse is a mini-ecosystem within Blue Link—seamlessly integrating with businessblueprint.io, hostsblue.com, and swipesblue.com.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Transparent Pricing
                </h3>
                <p className="text-blue-50 mb-6">
                  $35 per app or $75 for all three. No hidden fees, no per-message charges, no contact limits. Simple and predictable.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Purpose-Built for Local Business
                </h3>
                <p className="text-blue-50">
                  Enterprise tools are overkill. Generic tools lack features. Commverse hits the sweet spot for growing local businesses.
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
            Ready to Transform Your Customer Communications?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with one app or get the complete ecosystem. Your choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#0080FF' }}
              asChild
              data-testid="button-view-pricing"
            >
              <a href="/commverse-pricing">View Pricing</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 shadow-md"
              style={{ borderColor: '#0080FF', color: '#0080FF' }}
              asChild
              data-testid="button-get-started"
            >
              <a href="/assessment">Get Started</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

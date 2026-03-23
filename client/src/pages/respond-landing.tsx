import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, MessageSquare, Facebook, Instagram, Phone, Zap, MessageCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function InboxLanding() {
  const app = getAppById("respond")!;
  const bundlePrice = getBundlePrice("compass");
  const bundleApps = getAppsByBundle("compass");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="respond" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Every Message. One Inbox.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop juggling multiple apps for customer messages. /respond unifies Facebook Messenger,
              Instagram DM, and SMS into one real-time command center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'respond-addon', name: '/respond', price: app.standalonePrice, type: 'addon' }
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
                style={{ backgroundColor: '#001882', color: '#ffffff' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/respond-app">Launch /respond</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-[#001882]/10 transition-colors"
                style={{ borderColor: '#001882', color: '#001882' }}
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
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">${app.standalonePrice}/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-white text-2xl">|</span>
              <div className="text-4xl font-bold text-white">${bundlePrice}/mo</div>
              <span className="text-white text-xl">Compass Suite</span>
            </div>
            <p className="text-white text-sm">
              / promote + / respond + / engage + / post = Complete communication ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Three Channels Connected */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Three Channels Connected
            </h2>
            <p className="text-xl text-gray-600">
              /respond brings your three most important messaging channels into a single unified inbox
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#001882' }}>
                    <Facebook className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Facebook Messenger</h3>
                  <p className="text-gray-600 mb-4">
                    Connect your Facebook Business Page and receive every Messenger conversation directly in /respond.
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Reply to customers without leaving /respond</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>See full conversation history in one thread</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Assign conversations to team members</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#001882' }}>
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Instagram DM</h3>
                  <p className="text-gray-600 mb-4">
                    Connect your Instagram Business account and manage every direct message from your /respond inbox.
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Respond to DMs in real time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Never miss a story reply or mention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Track response times for your team</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#001882' }}>
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">SMS</h3>
                  <p className="text-gray-600 mb-4">
                    Send and receive text messages from your business number, all managed inside /respond.
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Two-way SMS conversations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Automatic contact matching across channels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#001882' }} />
                      <span>Compliance-ready opt-in/opt-out handling</span>
                    </li>
                  </ul>
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
            Powerful Features for Modern Communication
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Real-Time WebSocket Messaging</h3>
                <p className="text-gray-600">
                  Instant message delivery and updates. No refresh needed—see conversations update live as they happen.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Conversation Threading</h3>
                <p className="text-gray-600">
                  Smart conversation grouping keeps related messages together, no matter which channel they came from.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Team Assignment & Collaboration</h3>
                <p className="text-gray-600">
                  Assign conversations to team members, add internal notes, and track response times across your team.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Smart Filters & Search</h3>
                <p className="text-gray-600">
                  Find any message instantly with powerful search. Filter by channel, status, assignee, or date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Point of Difference */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Why /respond Changes Everything
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Stop the App Switching Madness
                </h3>
                <p className="text-gray-600 mb-6">
                  Your team wastes hours every day switching between Facebook, Instagram, and SMS.
                  /respond gives you one interface for everything. Faster responses. Happier customers.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Works Autonomously & Together
                </h3>
                <p className="text-gray-600">
                  /respond works powerfully on its own, but when integrated with / promote and / engage, it becomes part of the Compass Suite—
                  sharing analytics across apps to deliver context-aware communication that drives better outcomes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Built for Local Business Realities
                </h3>
                <p className="text-gray-600 mb-6">
                  Enterprise tools are too complex. Basic tools miss features you need. /respond is built specifically
                  for local businesses managing customer relationships across multiple channels.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#001882' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  No Per-Seat Pricing Games
                </h3>
                <p className="text-gray-600">
                  Standalone at ${app.standalonePrice}/mo or bundled in Compass Suite for ${bundlePrice}/mo. Unlimited team members, unlimited messages,
                  all channels included. No surprises, no upsells.
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
            Ready to Unify Your Customer Communications?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses who replaced app switching with one powerful inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#001882', color: '#ffffff' }}
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
              <a href="/respond-app">Explore /respond Platform</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /respond is included in all subscription tiers • Real-time WebSocket messaging • No per-seat fees
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

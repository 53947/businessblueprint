import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, MessageSquare, Facebook, Instagram, Twitter, MessageCircle, Phone, Zap } from "lucide-react";
import { SiWhatsapp, SiTiktok } from "react-icons/si";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import inboxLogo from "@assets/inbox logo_1760075605262.png";
import inboxIcon from "@assets/Unified mailbox_1760074368869.png";

export default function InboxLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={inboxIcon} alt="/inbox icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={inboxLogo} alt="/inbox" className="h-16 object-contain drop-shadow-md" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Every Customer Message.<br />One Powerful Inbox.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop juggling 8 different apps for customer messages. /inbox unifies email, live chat, 
              SMS, WhatsApp, Facebook, Instagram, X, and TikTok into one real-time command center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-yellow-600 hover:bg-yellow-700 text-lg px-8 py-6 shadow-lg"
                asChild
                data-testid="button-get-started"
              >
                <a href="/inbox-app">Launch /inbox</a>
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

      {/* Supported Channels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Your Channels. One Interface.
            </h2>
            <p className="text-xl text-gray-600">
              /inbox connects to every platform your customers use to reach you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-email">Email</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-livechat">Live Chat</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <Phone className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-sms">SMS</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <SiWhatsapp className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-whatsapp">WhatsApp</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <Facebook className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-facebook">Facebook</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <Instagram className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-instagram">Instagram</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <Twitter className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-x">X (Twitter)</h3>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 text-center">
                <SiTiktok className="w-12 h-12 text-yellow-600 mx-auto mb-3 drop-shadow" />
                <h3 className="font-bold text-gray-900" data-testid="text-channel-tiktok">TikTok</h3>
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
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time WebSocket Messaging</h3>
                <p className="text-gray-600">
                  Instant message delivery and updates. No refresh needed—see conversations update live as they happen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Conversation Threading</h3>
                <p className="text-gray-600">
                  Smart conversation grouping keeps related messages together, no matter which channel they came from.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Team Assignment & Collaboration</h3>
                <p className="text-gray-600">
                  Assign conversations to team members, add internal notes, and track response times across your team.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Filters & Search</h3>
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
          <div className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why /inbox Changes Everything
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Stop the App Switching Madness
                </h3>
                <p className="text-yellow-50 mb-6">
                  Your team wastes hours every day switching between Facebook, Instagram, email, WhatsApp, and more. 
                  /inbox gives you one interface for everything. Faster responses. Happier customers.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Native Integration with Your Ecosystem
                </h3>
                <p className="text-yellow-50">
                  Unlike standalone inbox tools, /inbox knows about your Digital Blueprint, customer insights, 
                  and marketing campaigns. Context-aware communication that drives better outcomes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Built for Local Business Realities
                </h3>
                <p className="text-yellow-50 mb-6">
                  Enterprise tools are too complex. Basic tools miss features you need. /inbox is built specifically 
                  for local businesses managing customer relationships across multiple channels.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  No Per-Seat Pricing Games
                </h3>
                <p className="text-yellow-50">
                  Included in all 6 subscription tiers starting at $250/mo. Unlimited team members, unlimited messages, 
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
            Join businesses who've replaced 8 apps with one powerful inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-600 hover:bg-yellow-700 text-lg px-8 py-6"
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
              <a href="/inbox-app">Explore /inbox Platform</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /inbox is included in all subscription tiers • Real-time WebSocket messaging • No per-seat fees
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

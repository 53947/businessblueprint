import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageCircle, Clock, Users, BarChart3, Globe, Zap, Palette, MessageSquare, Bot, Settings } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function EngageLanding() {
  const app = getAppById("engage")!;
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
              <AppName appId="engage" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Visitor Who Doesn't Call Will Chat. If You Give Them the Option.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Most website visitors leave without doing anything. They read, they browse, they hesitate — and then they go somewhere else. Not because they weren't interested. Because they had a question they didn't know how to ask, or they weren't ready to make a phone call. A live chat widget changes that. It gives them a low-pressure way to start a conversation in the moment they're most interested. / engage puts that widget on your website and routes every conversation directly into / respond — so nothing gets lost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'livechat-addon', name: '/ engage', price: app.standalonePrice, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart — $29/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#660099' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/engage/demo">Get Started with / engage</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-[#660099]/10 transition-colors"
                style={{ borderColor: '#660099', color: '#660099' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/compass-pricing">View All Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Callout — Dark Band */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white text-xl">
              $29/mo Standalone  |  $99/mo Compass Suite — includes / respond, / post, and / promote
            </p>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Most Chat Widgets Fail Small Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Standalone chat widgets are disconnected from everything else. When a visitor chats and you're not there, the conversation disappears into an app no one is checking. When a visitor becomes a customer, there's no record of what they asked or what you promised. It's a black hole that makes your business look less responsive than it actually is.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              / engage is different because it's not standalone. Every conversation flows directly into / respond — the same inbox where your Facebook messages, Instagram DMs, and SMS messages arrive. And every conversation that includes a name or contact information automatically creates or updates a record in / connect. The visitor becomes a contact. The contact becomes a customer. The entire history is already there.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-unified-title">Unified in / respond</h3>
                  <p className="text-gray-600" data-testid="text-feature-unified-description">
                    Live chat flows directly into / respond alongside email, SMS, and social messages. One interface for everything.
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#660099' }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#660099' }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#660099' }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#660099' }}>
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

      {/* Three Steps to Live */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One Line of Code. That's It.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Installing / engage on your website requires copying one line of JavaScript and pasting it into your website before the closing body tag. If you built your site on Squarespace, Wix, or WordPress, there's a plugin that does it for you without touching any code. / engage walks you through it step by step. Most business owners have it live within fifteen minutes of signing up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold" style={{ backgroundColor: '#660099' }}>
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Customize Your Widget</h3>
              <p className="text-gray-600">
                Pick your brand colors, set your greeting message, and configure offline behavior.
                Preview it in real time before it goes live.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold" style={{ backgroundColor: '#660099' }}>
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Copy One Line of Code</h3>
              <p className="text-gray-600">
                A single script tag is all it takes. Paste it into your website header and the widget
                appears instantly on every page.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold" style={{ backgroundColor: '#660099' }}>
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Start Receiving Chats</h3>
              <p className="text-gray-600">
                Incoming chats appear in / respond immediately. Reply from desktop or mobile.
                No separate dashboard needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Customize */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Can Customize
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make the chat widget yours. Every detail can be tailored to match your brand and workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Widget Color</h3>
                  <p className="text-gray-600 text-sm">
                    Match your brand perfectly. Pick any color and the entire widget adapts — buttons, headers, and accents.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Greeting Message</h3>
                  <p className="text-gray-600 text-sm">
                    Set the first thing visitors see. A warm welcome that invites conversation and sets expectations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Offline Message</h3>
                  <p className="text-gray-600 text-sm">
                    When you're away, visitors can still leave a message. Customize what they see and collect their contact info.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#660099' }}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Auto-Responses</h3>
                  <p className="text-gray-600 text-sm">
                    Set automatic replies for common questions like hours, location, and pricing. Instant answers, no wait.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Point of Difference */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: 'linear-gradient(to bottom right, #660099, #8B00CC)' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes / engage Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Works Autonomously & Together
                </h3>
                <p className="text-purple-50 mb-6">
                  / engage functions perfectly on its own, but gains superpowers when integrated with / promote and / respond —
                  connecting your Digital Blueprint, customer insights, and marketing automation for smarter conversations.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Conversation Continuity
                </h3>
                <p className="text-purple-50">
                  Visitors can start on live chat, continue via email, and follow up on WhatsApp.
                  One conversation thread, multiple channels. That's the Compass Suite integration.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Built for Local Business Scale
                </h3>
                <p className="text-purple-50 mb-6">
                  Enterprise chat tools are overkill. Free tools lack features and reliability.
                  / engage hits the sweet spot for growing local businesses.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  No Per-Chat or Per-Agent Fees
                </h3>
                <p className="text-purple-50">
                  Standalone at ${app.standalonePrice}/mo or bundled in Compass Suite for ${bundlePrice}/mo. Unlimited chats, unlimited agents,
                  unlimited websites. Transparent, predictable pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#660099] text-white rounded-xl p-8 my-12">
            <h3 className="text-white font-bold text-xl mb-4">The Conversation That Starts on Your Website Ends in a Sale</h3>
            <p className="text-purple-100 leading-relaxed">
              A customer who chats with you on your website is a warm lead. They came to you, they were curious enough to ask a question, and they gave you a chance to respond. When you respond quickly, knowledgeably, and helpfully — that conversation converts. / engage captures those conversations. / respond routes them to you immediately. / connect keeps the record. The sale starts with a chat widget. The business is built on what happens next.
            </p>
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
              className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
              style={{ backgroundColor: '#660099' }}
              asChild
              data-testid="button-start-free"
            >
              <a href="/assessment">Start Your Digital Assessment</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              style={{ borderColor: '#660099', color: '#660099' }}
              asChild
              data-testid="button-try-demo"
            >
              <a href="/engage/demo">Try Live Demo</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            / engage is included in all subscription tiers • Session persistence • Unlimited chats
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

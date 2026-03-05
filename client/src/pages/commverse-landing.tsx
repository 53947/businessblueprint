import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageSquare, Zap, TrendingUp, Users } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName, BundleHeader } from "@/components/app-name";
import { getAppsByBundle, getBundlePrice, getAppById } from "@/config/app-registry";

export default function CommverseLanding() {
  const bundlePrice = getBundlePrice("commverse");
  const bundleApps = getAppsByBundle("commverse");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <BundleHeader bundleId="commverse" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Complete Communication Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Four powerful apps that work independently but shine together.
              Email, SMS, live chat, social media, and unified inbox — all sharing analytics for smarter customer engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#F97316' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/commverse-pricing">View Pricing</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#F97316', color: '#F97316' }}
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
              <div className="text-4xl font-bold" style={{ color: '#F97316' }}>${bundleApps[0]?.standalonePrice}/mo</div>
              <span className="text-white text-xl">each app</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold" style={{ color: '#F97316' }}>${bundlePrice}/mo</div>
              <span className="text-white text-xl">for all {bundleApps.length}</span>
            </div>
            <p className="text-gray-300 text-sm">
              Save ${bundleApps.reduce((s, a) => s + a.standalonePrice, 0) - bundlePrice}/month with the complete CommVerse bundle
            </p>
          </div>
        </div>
      </section>

      {/* The Three Apps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Four Apps. One Ecosystem.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each app is powerful on its own. Together, they create a communication powerhouse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bundleApps.map((bApp) => (
              <Card key={bApp.id} className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: bApp.color }}>
                <CardContent className="pt-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <AppName appId={bApp.id} size="md" />
                    </div>
                    <p className="text-sm mb-4" style={{ color: bApp.color }}>{bApp.description}</p>
                    <p className="text-gray-600 mb-4 text-sm">
                      ${bApp.standalonePrice}/mo standalone · ${bApp.bundlePrice}/mo in bundle
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      style={{ borderColor: bApp.color, color: bApp.color }}
                      asChild
                    >
                      <a href={bApp.landingRoute}>Learn More →</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F97316' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cross-App Analytics</h3>
                <p className="text-gray-600">
                  / promote knows what customers clicked in / engage. / respond sees email campaign engagement. Smarter messaging across all channels.
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
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: 'linear-gradient(to bottom right, #F97316, #8000FF, #FC6ACD)' }}>
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
                  Use one app, two apps, or all four. Each functions perfectly on its own, but the real magic happens when they work together.
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
                  $39 per app or $99 for all four. No hidden fees, no per-message charges, no contact limits. Simple and predictable.
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
              style={{ backgroundColor: '#F97316' }}
              asChild
              data-testid="button-view-pricing"
            >
              <a href="/commverse-pricing">View Pricing</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 shadow-md"
              style={{ borderColor: '#F97316', color: '#F97316' }}
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


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar, Image, TrendingUp, BarChart3, Zap, Users, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import contentIcon from "@assets/native icons and favicons/: content app icon.png";
import contentLogo from "@assets/logos and wordmarks/: content app logo.png";

export default function ContentLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={contentIcon} alt="/content icon" className="h-20 w-20 object-contain drop-shadow-lg" />
              <img src={contentLogo} alt="/content" className="h-16 object-contain drop-shadow-lg" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#09080E' }}>
              Social Media Management<br />That Actually Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create, schedule, and publish across all your social platforms from one beautiful interface. 
              Built for businesses who want consistent presence without the chaos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#FC6ACD' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/content">Get Started with /content</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-[#FC6ACD]/10 transition-colors"
                style={{ borderColor: '#FC6ACD', color: '#FC6ACD' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/commverse-pricing">View Pricing</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 shadow-md hover:bg-[#FC6ACD]/10 transition-colors"
                style={{ borderColor: '#FC6ACD', color: '#FC6ACD' }}
                asChild
                data-testid="button-try-demo"
              >
                <a href="/content">Try Live Demo</a>
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
              <div className="text-4xl font-bold" style={{ color: '#FC6ACD' }}>$35/mo</div>
              <span className="text-white text-xl">standalone</span>
              <span className="text-gray-400 text-2xl">|</span>
              <div className="text-4xl font-bold text-white">$75/mo</div>
              <span className="text-white text-xl">for all 4 Commverse apps</span>
            </div>
            <p className="text-gray-300 text-sm">
              /send + /livechat + /inbox + /content = Complete communication ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* The /content Difference */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We Built /content
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Social media shouldn't feel like a second full-time job. /content makes it simple to maintain 
              a consistent presence across all platforms without burning out your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FC6ACD' }}>
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-schedule-title">Plan Ahead, Stay Consistent</h3>
                  <p className="text-gray-600" data-testid="text-feature-schedule-description">
                    Schedule weeks of content in advance. Visual calendar shows your entire content strategy at a glance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FC6ACD' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-multi-title">Multi-Platform Publishing</h3>
                  <p className="text-gray-600" data-testid="text-feature-multi-description">
                    Post to Facebook, Instagram, LinkedIn, X, and Google Business from one composer. Cross-post or customize per platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FC6ACD' }}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-ai-title">AI-Powered Suggestions</h3>
                  <p className="text-gray-600" data-testid="text-feature-ai-description">
                    Built-in AI coach suggests captions, hashtags, and optimal posting times. Never stare at a blank screen again.
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
            Everything You Need to Master Social Media
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FC6ACD' }}>
                  <Image className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Media Library & Management</h3>
                <p className="text-gray-600">
                  Upload images and videos once, use them across all platforms. Organized library keeps everything accessible.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FC6ACD' }}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Smart Scheduling</h3>
                <p className="text-gray-600">
                  Queue posts for optimal engagement times. Automatic time zone adjustments for multi-location businesses.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FC6ACD' }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Performance Analytics</h3>
                <p className="text-gray-600">
                  Track engagement, reach, and growth across all platforms. See what content resonates with your audience.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FC6ACD' }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Content Calendar View</h3>
                <p className="text-gray-600">
                  Visualize your entire content strategy. Drag-and-drop scheduling makes planning effortless.
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
              What Makes /content Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FC6ACD' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Works Autonomously & Together
                </h3>
                <p className="text-gray-600 mb-6">
                  /content functions perfectly on its own for social media management. But when integrated with /send, /livechat, and /inbox as part of Commverse, 
                  it shares customer insights and content performance to create smarter, more cohesive marketing.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FC6ACD' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  No Platform Limits or Hidden Fees
                </h3>
                <p className="text-gray-600">
                  Standalone at $35/mo or bundled with all Commverse apps for $75/mo. Connect unlimited social accounts, 
                  schedule unlimited posts. What you see is what you pay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FC6ACD' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Built for Local Business Reality
                </h3>
                <p className="text-gray-600 mb-6">
                  Enterprise tools are too complex. Free tools lack scheduling and analytics. /content hits the sweet spot—
                  powerful enough to be effective, simple enough to actually use.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FC6ACD' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  AI That Actually Helps
                </h3>
                <p className="text-gray-600">
                  Our AI coach doesn't just generate generic captions. It learns your brand voice, suggests relevant hashtags, 
                  and recommends optimal posting times based on your audience engagement.
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
            Stop Juggling Social Media Apps
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses managing all their social media from one beautiful, powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#FC6ACD' }}
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
              <a href="/content">Explore /content Platform</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /content is included in all subscription tiers • No setup fees • No long-term contracts
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

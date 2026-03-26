import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar, Image, TrendingUp, BarChart3, Zap, Users, Clock, Facebook, Instagram, Linkedin, Twitter, Store, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { getAppById, getAppsByBundle, getBundlePrice } from "@/config/app-registry";

export default function ContentLanding() {
  const app = getAppById("post")!;
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
              <AppName appId="post" size="lg" iconSize={36} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Business Should Be Showing Up.<br />Without You Having to Think About It.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Social media works on consistency. The businesses that show up regularly — with useful, relevant content — build an audience that trusts them. The businesses that post when they remember and go quiet for weeks lose ground slowly and never know why. Most small business owners don't have time to be consistent. / post makes consistency automatic — write your content once, schedule it for the week or the month, and let it publish across every platform on its own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'post-addon', name: '/post', price: app.standalonePrice, type: 'addon' }
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
                style={{ backgroundColor: '#FF44CC' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/post/dashboard">Get Started with /post</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-[#FF44CC]/10 transition-colors"
                style={{ borderColor: '#FF44CC', color: '#FF44CC' }}
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
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white text-xl">
              $29/mo Standalone  |  $99/mo Compass Suite — includes / respond, / engage, and / promote
            </p>
          </div>
        </div>
      </section>

      {/* The /post Difference */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We Built /post
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Social media feels like a full-time job because it is one — if you're doing it manually. Different platforms. Different formats. Different posting times. Different audiences. Most small business owners try to keep up and eventually give up. The platforms don't stop, and the businesses that stayed consistent keep appearing while the ones that stopped go invisible.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              / post removes the daily friction. Write your posts. Upload your photos. Pick your platforms. Set your schedule. After that, / post does the work. Your audience sees consistent, professional content from your business — whether you're in the office, on a job site, or on a day off.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF44CC' }}>
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF44CC' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-multi-title">Multi-Platform Publishing</h3>
                  <p className="text-gray-600" data-testid="text-feature-multi-description">
                    Facebook, Instagram, LinkedIn, X, and Google Business — five platforms with five different audiences, five different content norms, and five different reasons customers use them. / post connects all five. Write a post once and publish it everywhere, or customize the caption and format per platform before it goes out. The same content, optimized for where it lands.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF44CC' }}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900" data-testid="text-feature-ai-title">AI-Powered Suggestions</h3>
                  <p className="text-gray-600" data-testid="text-feature-ai-description">
                    The hardest part of social media isn't posting — it's knowing what to post. / post's built-in AI suggests content ideas based on your industry, your recent posts, and what's performing well in your category. When you sit down to plan your week's content, you're not starting from a blank screen. You're choosing from ideas that are already relevant to your business and your audience.
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
            Everything You Need to Master Social Media
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF44CC' }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF44CC' }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF44CC' }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FF44CC' }}>
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

      {/* Platforms Connected */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platforms Connected
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              One composer, five platforms. Write your post once and publish it everywhere that matters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 pb-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1877F2' }}>
                    <Facebook className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Facebook</h3>
                  <p className="text-gray-600 text-sm">
                    Pages, groups, photo posts, link shares, and scheduled stories.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 pb-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                    <Instagram className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Instagram</h3>
                  <p className="text-gray-600 text-sm">
                    Feed posts, carousels, reels scheduling, and caption optimization.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 pb-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0A66C2' }}>
                    <Linkedin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">LinkedIn</h3>
                  <p className="text-gray-600 text-sm">
                    Company pages, articles, professional content, and employee advocacy.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6 pb-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#000000' }}>
                    <Twitter className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">X</h3>
                  <p className="text-gray-600 text-sm">
                    Tweets, threads, media posts, and optimal timing for engagement.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white col-span-2 md:col-span-1">
              <CardContent className="pt-6 pb-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#4285F4' }}>
                    <Store className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Google Business</h3>
                  <p className="text-gray-600 text-sm">
                    Updates, offers, events, and product posts directly to your listing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule and Forget */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule and Forget
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The content calendar does the heavy lifting. Set it up once, and your social presence runs on autopilot.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold" style={{ backgroundColor: '#FF44CC' }}>
                  1
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Write Once</h3>
                <p className="text-gray-600 text-sm">
                  Compose your content in a single editor. Add images, videos, or links.
                </p>
                <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                  <ArrowRight className="w-6 h-6 text-gray-300 ml-auto" />
                </div>
              </div>

              <div className="text-center relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold" style={{ backgroundColor: '#FF44CC' }}>
                  2
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Pick Platforms</h3>
                <p className="text-gray-600 text-sm">
                  Select which platforms get this post. Customize per platform if needed.
                </p>
                <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                  <ArrowRight className="w-6 h-6 text-gray-300 ml-auto" />
                </div>
              </div>

              <div className="text-center relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold" style={{ backgroundColor: '#FF44CC' }}>
                  3
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Pick Date & Time</h3>
                <p className="text-gray-600 text-sm">
                  Choose when it goes live or let AI pick the best time for engagement.
                </p>
                <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                  <ArrowRight className="w-6 h-6 text-gray-300 ml-auto" />
                </div>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold" style={{ backgroundColor: '#FF44CC' }}>
                  4
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Done</h3>
                <p className="text-gray-600 text-sm">
                  Your post publishes automatically. Track performance from the analytics dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Point of Difference */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What Makes /post Different?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FF44CC' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Works Autonomously & Together
                </h3>
                <p className="text-gray-600 mb-6">
                  /post functions perfectly on its own for social media management. But when integrated with / promote, / engage, and / respond as part of Compass Suite,
                  it shares customer insights and content performance to create smarter, more cohesive marketing.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FF44CC' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  No Platform Limits or Hidden Fees
                </h3>
                <p className="text-gray-600">
                  Standalone at ${app.standalonePrice}/mo or bundled in Compass Suite for ${bundlePrice}/mo. Connect unlimited social accounts,
                  schedule unlimited posts. What you see is what you pay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FF44CC' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Built for Local Business Reality
                </h3>
                <p className="text-gray-600 mb-6">
                  Enterprise tools are too complex. Free tools lack scheduling and analytics. /post hits the sweet spot —
                  capable enough to be effective, simple enough to actually use.
                </p>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#FF44CC' }}>
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

      {/* What This Means */}
      <section className="py-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FF44CC] rounded-xl p-8 my-12">
            <h3 className="text-[#09080E] font-bold text-xl mb-4">Visibility Is Not an Accident</h3>
            <p className="text-[#09080E] leading-relaxed">
              The businesses your customers see regularly are the ones they think of first when they need something. That's not marketing theory — that's how people work. / post keeps your business in front of your audience consistently, professionally, and without requiring you to be a social media manager. You run the business. / post handles the visibility.
            </p>
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
            Join businesses managing all their social media from one clear, capable platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#FF44CC' }}
              asChild
              data-testid="button-start-free"
            >
              <a href="/assessment">Start Your Digital Assessment</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 shadow-md"
              style={{ borderColor: '#FF44CC', color: '#FF44CC' }}
              asChild
              data-testid="button-explore-platform"
            >
              <a href="/post/dashboard">Explore /post Platform</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            /post is included in all subscription tiers • No setup fees • No long-term contracts
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

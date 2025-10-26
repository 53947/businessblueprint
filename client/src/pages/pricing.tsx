import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedPricingTable } from "@/components/animated-pricing-table";
import { useLocation } from "wouter";
import { Sparkles, Shield, Zap, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [, setLocation] = useLocation();

  const handleSelectPlan = (planId: string) => {
    setLocation(`/subscription?plan=${planId}`);
  };

  const handleAddOnSelect = (addonId: string) => {
    setLocation(`/subscription?addon=${addonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Path to Digital Success
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Select from our 6-tier pricing structure designed to grow with your business. 
            Whether you prefer to do it yourself or want managed services, we have the perfect plan for you.
          </p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">AI-Powered</h3>
              <p className="text-sm text-gray-600">Intelligent recommendations based on your business needs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Transparent Pricing</h3>
              <p className="text-sm text-gray-600">No hidden fees, clear value at every tier</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Flexible Terms</h3>
              <p className="text-sm text-gray-600">Monthly, quarterly, or annual billing - you choose</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Subscription Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Core Plans</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Subscription Tiers</h2>
          </div>
          <AnimatedPricingTable onSelectPlan={handleSelectPlan} />
        </div>
      </section>

      {/* DIY Add-Ons Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">DIY Add-Ons</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Self-Service Modules</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your subscription with powerful add-ons you manage yourself
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Listings */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm mb-4">
                  📍 Listings
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    $44
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Accurate profiles across directories, maps, and search engines.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Profile sync (NAP, hours, site)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Major directories + long-tail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Duplicate suppression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Holiday hours, logos, photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Change monitoring + health report</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('listings')}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  data-testid="button-addon-listings"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>

            {/* Reviews Pro */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 font-bold text-sm mb-4">
                  ⭐ Reviews (Pro)
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                    $25
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Generate more reviews & respond faster.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">SMS/email requests + QR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Unified inbox (Google, FB, Yelp…)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">AI reply drafts + alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Widgets + trend reports</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('reviews-pro')}
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  data-testid="button-addon-reviews-pro"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>

            {/* Reviews Gold */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 font-bold text-sm mb-4">
                  ⭐ Reviews (Gold)
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    $63
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Advanced insights and automation.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Smart routing + win-back</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Response templates + guardrails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Competitor benchmarking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Multi-location roll-ups + compliance</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('reviews-gold')}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  data-testid="button-addon-reviews-gold"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>

            {/* Social */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-bold text-sm mb-4">
                  📣 Social
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                    $8
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Plan, publish, and track performance.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">FB/IG/X/LinkedIn scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Calendar + drag & drop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">AI captions + hashtag help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Analytics + link-in-bio page</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('social')}
                  variant="outline"
                  className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                  data-testid="button-addon-social"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>

            {/* Local SEO */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0, 255, 64, 0.1)', borderColor: 'rgba(0, 255, 64, 0.3)', color: '#00AA2A' }}>
                  <span className="font-bold text-sm">🔎 Local SEO</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2 mt-4">
                  <span className="text-4xl font-extrabold" style={{ 
                    background: 'linear-gradient(90deg, #00FF40, #7DFFB2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    $6
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Climb (and stay) in the local 3-pack.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#00FF40' }}>
                      <Check className="w-3 h-3 text-black font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Local keyword + map pack tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#00FF40' }}>
                      <Check className="w-3 h-3 text-black font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Competitor comparison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#00FF40' }}>
                      <Check className="w-3 h-3 text-black font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">On-page checks + GBP tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#00FF40' }}>
                      <Check className="w-3 h-3 text-black font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Monthly scorecard + quick wins</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('local-seo')}
                  variant="outline"
                  className="w-full hover:bg-green-50"
                  style={{ borderColor: '#00FF40', color: '#00AA2A' }}
                  data-testid="button-addon-local-seo"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MSP Add-Ons Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">MSP Add-Ons</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Managed by Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let our experts handle the heavy lifting while you focus on your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Reputation Management */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 font-bold text-sm mb-4">
                  ⭐ Reputation Management
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    $15
                  </span>
                  <span className="text-gray-600">/location</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">Includes 50 responses/mo • +$2 each additional</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Monitor & respond across platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">AI-assisted responses (tone controls)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Alerts, tagging, monthly reporting</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('reputation-management')}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  data-testid="button-addon-reputation"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>

            {/* Social Media Posting */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-bold text-sm mb-4">
                  📣 Social Media Posting
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                    $25
                  </span>
                  <span className="text-gray-600">/location/mo</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">+$3 per extra post</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Branded content publishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Consistent cross-channel cadence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Calendar, approvals, basic analytics</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('social-posting')}
                  variant="outline"
                  className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                  data-testid="button-addon-social-posting"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MSP Packages Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">MSP Packages</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Managed Service Tiers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive managed service packages with dedicated support teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Standard MSP */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm mb-4">
                  🛠️ Standard MSP
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    $313
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">10 managed hours • $69/hr additional</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Initial response: P1 90m • P2 120m • P3 180m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Service hours: 24×5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Channels: Email + Phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Dedicated CSM + Knowledge Base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Monthly analytics + quarterly audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">GMB Support Assist (tickets, fixes, pins)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Listings/profile edits (SLA ~12h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Apple Business Connect updates</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('msp-standard')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-addon-msp-standard"
                >
                  Select Standard MSP
                </Button>
              </CardContent>
            </Card>

            {/* Premium MSP */}
            <Card className="border-2 border-purple-300 hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 font-bold text-sm mb-4">
                  🧷 Premium MSP
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                    $625
                  </span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">20 managed hours • $56/hr additional</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Initial response: P1 30m • P2 60m • P3 90m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Service hours: 24×5 + dedicated support 12×5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Channels: Email + Chat + Phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Dedicated Slack channel + CSM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Priority reporting + faster resolution queue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">All Standard features + proactive monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white font-bold" />
                    </div>
                    <span className="text-sm text-gray-700">Priority QA</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleAddOnSelect('msp-premium')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  data-testid="button-addon-msp-premium"
                >
                  Select Premium MSP
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not Sure Which Plan Is Right for You?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Take our free Digital IQ Assessment to receive personalized recommendations 
            based on your business goals and current digital presence.
          </p>
          <a 
            href="/assessment" 
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            data-testid="button-start-assessment"
          >
            Start Free Assessment
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

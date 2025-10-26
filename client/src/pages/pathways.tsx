import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useLocation } from "wouter";
import { ArrowRight, Compass, Wrench, Lightbulb, Zap, Ship, Brain, Building2, CreditCard, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Compass className="w-4 h-4" />
            Choose Your Pathway
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Two Paths to Digital Success
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you prefer hands-on control or expert guidance, we've built the perfect pathway for your business growth.
          </p>
        </div>
      </section>

      {/* Pathways Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* DIY Pathway */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Do It Yourself (DIY)</h2>
                    <p className="text-sm text-blue-600 font-semibold">You're in control</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Perfect for hands-on business owners who want full control. Access powerful tools, automation, and AI assistance—all at your fingertips.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">You're In Control</h3>
                      <p className="text-sm text-gray-600">Manage campaigns, content, and strategies yourself with intuitive tools</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">AI-Powered Assistance</h3>
                      <p className="text-sm text-gray-600">Coach Blue guides you with smart recommendations and automated workflows</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Scale at Your Pace</h3>
                      <p className="text-sm text-gray-600">Start small, add features as you grow, pay only for what you use</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Pricing starts at:</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">$99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Save 20% with annual billing</p>
                </div>

                <Button 
                  onClick={() => setLocation('/marketplace')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-explore-diy">
                  Explore DIY Plans
                </Button>
              </CardContent>
            </Card>

            {/* MSP Pathway */}
            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Managed Services Provided (MSP)</h2>
                    <p className="text-sm text-orange-600 font-semibold">Expert execution</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  For busy owners who want results without the work. Our expert team handles execution, optimization, and reporting—you focus on running your business.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Team at Your Service</h3>
                      <p className="text-sm text-gray-600">Dedicated specialists manage your digital presence end-to-end</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Done-For-You Execution</h3>
                      <p className="text-sm text-gray-600">Content creation, review responses, social posting—all handled professionally</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Strategic Guidance</h3>
                      <p className="text-sm text-gray-600">Monthly reviews, proactive recommendations, continuous optimization</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Managed services from:</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-orange-600">$15</span>
                    <span className="text-gray-600">/location</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Add-on services • Support packages available</p>
                </div>

                <Button 
                  onClick={() => setLocation('/marketplace')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  data-testid="button-explore-msp">
                  Explore MSP Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Triad Blue Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three powerful platforms working together to power your digital success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Business Blueprint */}
            <Card className="border border-gray-200 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business Blueprint</h3>
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered digital intelligence platform with assessment, coaching, and growth strategies
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Digital IQ Assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Personalized Blueprint
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Client Portal & Dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Listings & Reputation Management
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Hosts Blue */}
            <Card className="border border-gray-200 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hosts Blue</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Managed WordPress hosting, domains, and premium website services
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    WordPress Hosting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Domain Registration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Site Builder & Themes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    24/7 Expert Support
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Swipes Blue */}
            <Card className="border border-gray-200 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Swipes Blue</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Secure payment gateway for accepting online payments across all platforms
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    Credit Card Processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    Subscription Billing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    Fraud Protection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    Multi-Platform Integration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Growth Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Growth Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert guidance available on both pathways
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Coach Blue */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Coach Blue</h3>
                    <p className="text-sm text-blue-600 font-semibold">AI Business Coach</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Your 24/7 AI business advisor. Get personalized strategies, automated insights, and smart recommendations based on your business data.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Real-time business intelligence
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Automated task suggestions
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Progress tracking & insights
                  </li>
                </ul>
                <div className="bg-blue-50 rounded-lg p-3 text-sm">
                  <span className="font-semibold text-gray-900">Available:</span> Included in Advanced & Scale plans, add-on for Start
                </div>
              </CardContent>
            </Card>

            {/* Captain Your Journey */}
            <Card className="border-2 border-orange-200 hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Ship className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Captain Your Journey</h3>
                    <p className="text-sm text-orange-600 font-semibold">Personal Business Coach</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  One-on-one coaching with a dedicated business strategist. Weekly sessions, custom action plans, and accountability support.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-600" />
                    Weekly 1-on-1 sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-600" />
                    Custom growth strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-600" />
                    Accountability & support
                  </li>
                </ul>
                <div className="bg-orange-50 rounded-lg p-3 text-sm">
                  <span className="font-semibold text-gray-900">Premium add-on:</span> $249/month for personalized coaching
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our complete marketplace to build your perfect digital strategy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setLocation('/marketplace')}
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6"
              data-testid="button-view-marketplace">
              View Marketplace
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => setLocation('/assessment')}
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-50 text-lg px-8 py-6"
              data-testid="button-start-assessment">
              Start Free Assessment
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

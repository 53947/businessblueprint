import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useLocation } from "wouter";
import { ArrowRight, Compass, Wrench, Lightbulb, Zap, Ship, Brain, Building2, CreditCard, Server, Mail, Inbox, MessageSquare } from "lucide-react";
import { DIYIcon, MSPIcon, ALCIcon } from "@/components/pathway-icons";
import sendIcon from "@assets/send icon_1760074368870.png";
import inboxIcon from "@assets/Unified mailbox_1760074368869.png";
import livechatIcon from "@assets/LiveChat Widget_1760074368868.png";
import commverseIcon from "@assets/Commverse Bundle_1760662442941.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PathwaysPage() {
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
            Three Pathways to Digital Success
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Choose the perfect pathway for your business: DIY control, expert MSP guidance, or flexible à la carte services.
          </p>
        </div>
      </section>

      {/* Pathways Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* DIY Pathway */}
            <Card className="border-2 border-orange-400 hover:border-orange-500 transition-all hover:shadow-xl" style={{ backgroundColor: '#FFA500' }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Do It Yourself (DIY)</h2>
                    <p className="text-sm text-white/90 font-semibold">You're in control</p>
                  </div>
                </div>
                
                <p className="text-white/90 mb-6 text-lg leading-relaxed">
                  Perfect for hands-on business owners who want full control. Access powerful tools, automation, and AI assistance—all at your fingertips.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Full Control</h3>
                      <p className="text-xs text-white/80">Manage campaigns yourself</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">AI Assistance</h3>
                      <p className="text-xs text-white/80">Coach Blue guidance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Scale Your Way</h3>
                      <p className="text-xs text-white/80">Pay for what you use</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-white mb-2">Pricing starts at:</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">$99</span>
                    <span className="text-white/80">/month</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">Save 20% with annual billing</p>
                </div>

                <Button 
                  onClick={() => setLocation('/marketplace')}
                  className="w-full bg-white hover:bg-white/90 text-orange-600 font-semibold"
                  data-testid="button-explore-diy">
                  Explore DIY Plans
                </Button>
              </CardContent>
            </Card>

            {/* MSP Pathway */}
            <Card className="border-2 border-blue-400 hover:border-blue-500 transition-all hover:shadow-xl" style={{ backgroundColor: '#0000FF' }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Managed Services (MSP)</h2>
                    <p className="text-sm text-white/90 font-semibold">Expert execution</p>
                  </div>
                </div>
                
                <p className="text-white/90 mb-6 text-lg leading-relaxed">
                  For busy owners who want results without the work. Our expert team handles execution, optimization, and reporting—you focus on running your business.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Expert Team</h3>
                      <p className="text-xs text-white/80">Dedicated specialists</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Done-For-You</h3>
                      <p className="text-xs text-white/80">Full execution & content</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Strategic Guidance</h3>
                      <p className="text-xs text-white/80">Monthly optimization</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-white mb-2">Base plan + services</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">$313</span>
                    <span className="text-white/80">/month</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">Start tier • Advanced & Scale available</p>
                </div>

                <Button 
                  onClick={() => setLocation('/marketplace')}
                  className="w-full bg-white hover:bg-white/90 text-blue-600 font-semibold"
                  data-testid="button-explore-msp">
                  Explore MSP Services
                </Button>
              </CardContent>
            </Card>

            {/* ALC Pathway */}
            <Card className="border-2 border-green-400 hover:border-green-500 transition-all hover:shadow-xl" style={{ backgroundColor: '#00FF40' }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ALCIcon className="w-12 h-12" />
                  <div>
                    <h2 className="text-xl font-bold text-black">À La Carte (ALC)</h2>
                    <p className="text-sm text-black/80 font-semibold">Pick & choose</p>
                  </div>
                </div>
                
                <p className="text-black/80 mb-6 text-base leading-relaxed">
                  Build your own solution. Choose exactly which apps and services you need, when you need them.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-sm">Ultimate Flexibility</h3>
                      <p className="text-xs text-black/70">Select individual apps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-sm">No Commitments</h3>
                      <p className="text-xs text-black/70">Add or remove anytime</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-sm">Cost Control</h3>
                      <p className="text-xs text-black/70">Pay only for what you use</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-black mb-2">Individual apps from:</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-black">$35</span>
                    <span className="text-black/70">/month</span>
                  </div>
                  <p className="text-xs text-black/60 mt-1">Bundle savings available</p>
                </div>

                <Button 
                  onClick={() => setLocation('/marketplace')}
                  className="w-full bg-black hover:bg-black/90 text-green-400 font-semibold"
                  data-testid="button-explore-alc">
                  Browse Marketplace
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Communication Apps - Included in Both Pathways */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <MessageSquare className="w-4 h-4" />
              Included in All Plans
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commverse Communication Apps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four proprietary apps that work together to streamline all your customer communications
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* /send */}
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={sendIcon} alt="/send" className="h-16 w-16 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontWeight: 600 }}>
                  <span style={{ color: '#09080E' }}>/</span>
                  <span style={{ color: '#FFD700' }}>send</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Email & SMS Marketing Platform
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                    Unified campaigns
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                    Contact management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                    GDPR/CAN-SPAM compliant
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* /inbox */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={inboxIcon} alt="/inbox" className="h-16 w-16 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontWeight: 600 }}>
                  <span style={{ color: '#09080E' }}>/</span>
                  <span style={{ color: '#0080FF' }}>inbox</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Unified Communications Hub
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Multi-channel messaging
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Real-time notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Team collaboration
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* /livechat */}
            <Card className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={livechatIcon} alt="/livechat" className="h-16 w-16 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontWeight: 600 }}>
                  <span style={{ color: '#09080E' }}>/</span>
                  <span style={{ color: '#8000FF' }}>livechat</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Website Live Chat Widget
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Real-time chat
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Session persistence
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Conversation history
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* /content */}
            <Card className="border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={commverseIcon} alt="/content" className="h-16 w-16 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontWeight: 600 }}>
                  <span style={{ color: '#09080E' }}>/</span>
                  <span style={{ color: '#E91EBC' }}>content</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Social Media Management
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    Content calendar
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    Media library
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    AI caption suggestions
                  </li>
                </ul>
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

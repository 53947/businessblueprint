import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, Link } from "wouter";
import { CheckCircle, Search, BarChart3, Rocket, Star, Shield, Clock, ChevronRight, Compass, MapPin, Gem } from "lucide-react";
import cloudpleaserLogo from "@assets/cloudpleaser_1758744493180.png";
import webhostedLogo from "@assets/webnhosted_1758744493181.png";
import airswipedLogo from "@assets/airswiped_1758744493180.png";
import aiCoachLogo from "@assets/AI Coach_1758744493179.png";
import { HowItWorks } from "@/components/how-it-works";
import { ServicePathways } from "@/components/service-pathways";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/assessment");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showNavigation={true} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Powered by Google Business Intelligence
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-primary">Get Found, Get Customers,</span> Get Business
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
Helping local businesses succeed online. Our AI analyzes your online presence using Google's business intelligence and creates a comprehensive Digital Blueprint in less than 24 hours. No tech experience required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={startAssessment} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Start Free Assessment
                </Button>
                <Link href="/ai-coach">
                  <Button variant="outline" size="lg" className="border-2 w-full sm:w-auto">
                    <img src={aiCoachLogo} alt="AI Coach" className="w-8 h-8 mr-2" />
                    AI Business Coach
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-500 mr-2" />
                  Results in 24 Hours
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  100% Secure
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Path to Success</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-left">
                    <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">1</div>
                    <span className="text-gray-700">AI analyzes your online presence</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">2</div>
                    <span className="text-gray-700">Get your Digital Blueprint</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">3</div>
                    <span className="text-gray-700">Choose DIY or managed services</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">4</div>
                    <span className="text-gray-700">Watch your business grow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-500 font-medium mb-4">Trusted by 10,000+ businesses worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-8 h-8 text-gray-400" />
              <span className="font-bold text-gray-400">Business</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-8 h-8 text-gray-400" />
              <span className="font-bold text-gray-400">Reviews</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-8 h-8 text-gray-400" />
              <span className="font-bold text-gray-400">SEO</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="w-8 h-8 text-gray-400" />
              <span className="font-bold text-gray-400">Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Blueprint */}
      <section id="digital-blueprint" className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="blueprint-dots" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#blueprint-dots)"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Compass Header */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <Compass className="w-12 h-12 text-amber-600 animate-spin" style={{animationDuration: '20s'}} />
            </div>
            <div className="pt-8">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-red-500 mr-3" />
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Your Digital Blueprint</h2>
                <Gem className="w-8 h-8 text-blue-500 ml-3" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
A step-by-step guide designed for complete beginners. Follow this blueprint to build confidence and watch your business grow online and offline.
              </p>
            </div>
          </div>

          {/* The 11 Strategic Blueprint Steps */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Step 1: Business Foundation */}
            <Card className="border-4 border-dashed border-amber-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">1</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🏗️ Business Foundation
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> The core of who you are as a business - your mission, values, and what makes you special.
                </p>
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-amber-800"><strong>🔍 Look for:</strong> Clear answers to "What do I do?" and "Why should customers choose me?" This builds your confidence by giving you a clear identity online.</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-red-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">DOMAINS</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">HOSTING</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">WEBSITE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Know Your Current Position */}
            <Card className="border-4 border-dashed border-green-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">2</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  📍 Know Your Current Position
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> Exactly where you stand online right now - your digital presence assessment.
                </p>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-green-800"><strong>🔍 Look for:</strong> Your current Google Business profile, reviews, and how customers find you. No judgment here - we're just mapping your starting point!</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-green-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">LOCAL SEO</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">REPUTATION</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Know Your Ideal Customers */}
            <Card className="border-4 border-dashed border-purple-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">3</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🎯 Know Your Ideal Customers
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> Who your perfect customers are and what they're looking for.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-800"><strong>🔍 Look for:</strong> Customer demographics, problems they need solved, and where they spend time online. This helps you speak directly to the people who need you most.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-purple-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">SOCIAL</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">CONTENT & EXPERIENCE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Your Brand Voice & Style */}
            <Card className="border-4 border-dashed border-pink-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">4</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🎨 Your Brand Voice & Style
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> How to communicate consistently and professionally across all platforms.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-pink-800"><strong>🔍 Look for:</strong> Your unique tone of voice, visual style, and key messaging that feels authentically "you". This makes you memorable and builds trust with customers.</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-pink-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">WEBSITE</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">SOCIAL</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">CONTENT & EXPERIENCE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: Your Digital Home Base */}
            <Card className="border-4 border-dashed border-indigo-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">5</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🏠 Your Digital Home Base
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> Creating a website that welcomes visitors and turns them into customers.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-indigo-800"><strong>🔍 Look for:</strong> Clear navigation, compelling headlines, and simple ways for customers to contact you. Your website is your 24/7 salesperson - make it count!</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-indigo-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">WEBSITE</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">SEO WEBSITE</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">HOSTING</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6: Be Found Locally */}
            <Card className="border-4 border-dashed border-yellow-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">6</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🗺️ Be Found Locally
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> How to show up when people in your area search for your services.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800"><strong>🔍 Look for:</strong> Complete Google Business profile, accurate listings, and local keyword optimization. Most customers start their search locally - be there when they look!</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-yellow-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">LOCAL SEO</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">SEO WEBSITE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 7: Social Connection Strategy */}
            <Card className="border-4 border-dashed border-cyan-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">7</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  💬 Social Connection Strategy
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> How to use social media to build relationships, not just post randomly.
                </p>
                <div className="bg-cyan-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-cyan-800"><strong>🔍 Look for:</strong> Platforms where your customers spend time, content that starts conversations, and consistent posting schedules. Social media is about relationships - be helpful and authentic.</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-cyan-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">SOCIAL</span>
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">SOCIAL MEDIA</span>
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">CONTENT & EXPERIENCE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 8: Build Trust & Reputation */}
            <Card className="border-4 border-dashed border-emerald-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">8</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  ⭐ Build Trust & Reputation
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> How to encourage reviews and handle feedback professionally.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-emerald-800"><strong>🔍 Look for:</strong> Review request systems, professional responses to feedback, and showcasing customer success stories. Reviews are digital word-of-mouth - the most powerful marketing!</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-emerald-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">REPUTATION</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">CONTENT & EXPERIENCE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 9: Nurture Customer Relationships */}
            <Card className="border-4 border-dashed border-orange-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">9</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  📧 Nurture Customer Relationships
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> How to stay in touch with customers and provide ongoing value.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-orange-800"><strong>🔍 Look for:</strong> Simple email systems, helpful content ideas, and ways to stay top-of-mind without being pushy. Regular, valuable communication keeps customers coming back.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-orange-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">EMAIL MARKETING</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">CONTENT & EXPERIENCE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 10: Strategic Growth Investment */}
            <Card className="border-4 border-dashed border-red-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">10</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🚀 Strategic Growth Investment
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> When and how to invest in advertising to reach more ideal customers.
                </p>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-red-800"><strong>🔍 Look for:</strong> Simple ad platforms, clear targeting options, and budget-friendly starting points. Start small, test what works, then scale your successful campaigns.</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-red-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">ADVERTISING</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">SOCIAL MEDIA</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 11: Measure & Improve */}
            <Card className="border-4 border-dashed border-violet-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-violet-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">11</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  📊 Measure & Improve
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> Simple ways to track what's working and continuously improve your results.
                </p>
                <div className="bg-violet-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-violet-800"><strong>🔍 Look for:</strong> Easy-to-understand reports, key metrics that matter, and actionable insights for growth. Data helps you make smart decisions and invest your time wisely.</p>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg mt-4">
                  <p className="text-xs text-violet-700 font-semibold mb-2">🛠️ Your Tools for This Step:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded text-xs">REPUTATION</span>
                    <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded text-xs">SOCIAL MEDIA</span>
                    <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded text-xs">EMAIL MARKETING</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* X Marks the Spot - Success Destination */}
          <Card className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-center shadow-2xl border-8 border-yellow-400 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-8xl text-red-600 font-bold animate-bounce">×</div>
            <CardContent className="p-12 pt-16">
              <div className="flex items-center justify-center mb-6">
                <Gem className="w-12 h-12 mr-4 animate-pulse" />
                <h3 className="text-4xl font-bold">Digital Success Blueprint!</h3>
                <Gem className="w-12 h-12 ml-4 animate-pulse" />
              </div>
              <p className="text-2xl mb-6 opacity-90">
                You've found it! A thriving, confident online business that serves customers and grows sustainably.
              </p>
              <Button 
                onClick={startAssessment}
                size="lg"
                className="bg-white text-yellow-600 hover:bg-gray-100 font-bold text-xl px-8 py-4"
              >
📋 Start Your Blueprint
              </Button>
              <p className="mt-4 text-sm opacity-75">
Your personalized blueprint will show you which steps to take first!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks onStartAssessment={startAssessment} />

      {/* Service Pathways */}
      <ServicePathways />

      {/* Platform Ecosystem */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Digital Ecosystem</h2>
            <p className="text-xl text-gray-600">Three specialized platforms working together for your success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow p-6">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <img src={cloudpleaserLogo} alt="cloudpleaser.io" className="h-16 w-16" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="text-black">cloud</span><span style={{color: '#0080FF'}}>pleaser</span><span className="text-green-400">.io</span>
                </div>
                <p className="text-gray-600 mb-4">Digital Empowerment Platform</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  <li>• AI-powered business analysis</li>
                  <li>• Personalized coaching</li>
                  <li>• Client portal & dashboard</li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow p-6">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <img src={webhostedLogo} alt="webhosted.io" className="h-16 w-16" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="text-black">web</span><span style={{color: '#660099'}}>hosted</span><span style={{color: '#FF0040'}}>.io</span>
                </div>
                <p className="text-gray-600 mb-4">Website Hosting Platform</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  <li>• High-performance hosting</li>
                  <li>• Domain management</li>
                  <li>• Technical optimization</li>
                </ul>
                <Button className="w-full bg-[#660099] hover:bg-[#5a0088]">
                  Get Hosting
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow p-6">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <img src={airswipedLogo} alt="airswiped.com" className="h-16 w-16" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="text-black">air</span><span style={{color: '#CB0505'}}>swiped</span><span className="text-green-400">.com</span>
                </div>
                <p className="text-gray-600 mb-4">Payment Gateway Platform</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  <li>• Secure payment processing</li>
                  <li>• Transaction management</li>
                  <li>• Financial analytics</li>
                </ul>
                <Button className="w-full bg-[#CB0505] hover:bg-[#a80404]">
                  Setup Payments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees, no long-term contracts, cancel anytime</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Assessment</h3>
              <div className="text-4xl font-bold text-primary mb-6">$0</div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Complete digital analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Personalized recommendations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Email report delivery
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  No commitment required
                </li>
              </ul>
              <Button onClick={startAssessment} variant="secondary" className="w-full">
                Get Free Assessment
              </Button>
            </Card>

            <Card className="border-2 border-primary p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">DIY Plans</h3>
              <div className="text-4xl font-bold text-primary mb-2">Free - $299</div>
              <div className="text-gray-500 mb-6">per month</div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Free listing distribution platform
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Local SEO & social media tools
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Reputation management & CRM
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  AI inbox & website builder
                </li>
              </ul>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
Start Step-by-Step Guide
              </Button>
            </Card>

            <Card className="border-2 border-secondary p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">RECOMMENDED</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Managed Services</h3>
              <div className="text-4xl font-bold text-secondary mb-2">$499+</div>
              <div className="text-gray-500 mb-6">per month</div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Full implementation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Dedicated account manager
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  24/7 priority support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Monthly optimization
                </li>
              </ul>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Get Managed Services
              </Button>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a custom solution? We'll create a plan that fits your business perfectly.</p>
            <Button variant="link" className="text-blue-500">
              Schedule a consultation <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
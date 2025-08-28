import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, Link } from "wouter";
import { CheckCircle, Search, BarChart3, Rocket, Star, Shield, Clock, ChevronRight, MessageCircle, Brain, Globe, Zap, Compass, MapPin, Gem } from "lucide-react";
import { HowItWorks } from "@/components/how-it-works";
import { ServicePathways } from "@/components/service-pathways";

export default function Home() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/assessment");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
                <Brain className="h-6 w-6 text-blue-500" />
                <span>
                  <span className="text-black">cloud</span>
                  <span className="text-blue-500">pleaser</span>
                  <span className="text-green-400">.io</span>
                </span>
              </a>
              <nav className="hidden md:flex space-x-6">
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
                <a href="#assessment" className="text-gray-600 hover:text-primary transition-colors">Assessment</a>
                <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/portal/login">
                <Button variant="outline" size="sm">
                  Client Portal
                </Button>
              </Link>
              <Button onClick={startAssessment} className="bg-blue-500 hover:bg-blue-600">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                <span className="text-primary">Digital Empowerment</span> for Your Business
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover exactly what your business needs to succeed online. Our AI analyzes your online presence using Google's business intelligence. It creates a comprehensive personalized roadmap in less than 24 hours. No tech experience required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={startAssessment} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Start Free Assessment
                </Button>
                <Link href="/ai-coach">
                  <Button variant="outline" size="lg" className="border-2 w-full sm:w-auto">
                    <MessageCircle className="w-5 h-5 mr-2" />
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
                    <span className="text-gray-700">Get your personalized roadmap</span>
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

      {/* Strategic Treasure Map */}
      <section id="treasure-map" className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="treasure-dots" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#treasure-dots)"/>
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
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Your Business Treasure Map</h2>
                <Gem className="w-8 h-8 text-blue-500 ml-3" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A step-by-step journey designed for complete beginners. Follow this map to build confidence and discover the treasures that will make your business thrive online.
              </p>
            </div>
          </div>

          {/* The 11 Strategic Treasure Locations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Location 1: Business Foundation */}
            <Card className="border-4 border-dashed border-amber-300 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">1</div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  🏗️ Business Foundation
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>What you'll discover:</strong> The core of who you are as a business - your mission, values, and what makes you special.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800"><strong>🔍 Look for:</strong> Clear answers to "What do I do?" and "Why should customers choose me?"</p>
                </div>
                <p className="text-sm text-gray-500 italic">This builds your confidence by giving you a clear identity online.</p>
              </CardContent>
            </Card>

            {/* Location 2: Know Your Current Position */}
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
                  <p className="text-sm text-green-800"><strong>🔍 Look for:</strong> Your current Google Business profile, reviews, and how customers find you.</p>
                </div>
                <p className="text-sm text-gray-500 italic">No judgment here - we're just mapping your starting point!</p>
              </CardContent>
            </Card>

            {/* Location 3: Target Audience */}
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
                  <p className="text-sm text-purple-800"><strong>🔍 Look for:</strong> Customer demographics, problems they need solved, and where they spend time online.</p>
                </div>
                <p className="text-sm text-gray-500 italic">This helps you speak directly to the people who need you most.</p>
              </CardContent>
            </Card>

            {/* Location 4: Brand Identity */}
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
                  <p className="text-sm text-pink-800"><strong>🔍 Look for:</strong> Your unique tone of voice, visual style, and key messaging that feels authentically "you".</p>
                </div>
                <p className="text-sm text-gray-500 italic">This makes you memorable and builds trust with customers.</p>
              </CardContent>
            </Card>

            {/* Location 5: Digital Home Base */}
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
                  <p className="text-sm text-indigo-800"><strong>🔍 Look for:</strong> Clear navigation, compelling headlines, and simple ways for customers to contact you.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Your website is your 24/7 salesperson - make it count!</p>
              </CardContent>
            </Card>

            {/* Location 6: Local Discovery */}
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
                  <p className="text-sm text-yellow-800"><strong>🔍 Look for:</strong> Complete Google Business profile, accurate listings, and local keyword optimization.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Most customers start their search locally - be there when they look!</p>
              </CardContent>
            </Card>

            {/* Location 7: Social Connection */}
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
                  <p className="text-sm text-cyan-800"><strong>🔍 Look for:</strong> Platforms where your customers spend time, content that starts conversations, and consistent posting schedules.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Social media is about relationships - be helpful and authentic.</p>
              </CardContent>
            </Card>

            {/* Location 8: Trust Building */}
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
                  <p className="text-sm text-emerald-800"><strong>🔍 Look for:</strong> Review request systems, professional responses to feedback, and showcasing customer success stories.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Reviews are digital word-of-mouth - the most powerful marketing!</p>
              </CardContent>
            </Card>

            {/* Location 9: Content & Email */}
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
                  <p className="text-sm text-orange-800"><strong>🔍 Look for:</strong> Simple email systems, helpful content ideas, and ways to stay top-of-mind without being pushy.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Regular, valuable communication keeps customers coming back.</p>
              </CardContent>
            </Card>

            {/* Location 10: Paid Growth */}
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
                  <p className="text-sm text-red-800"><strong>🔍 Look for:</strong> Simple ad platforms, clear targeting options, and budget-friendly starting points.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Start small, test what works, then scale your successful campaigns.</p>
              </CardContent>
            </Card>

            {/* Location 11: Analytics & Growth */}
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
                  <p className="text-sm text-violet-800"><strong>🔍 Look for:</strong> Easy-to-understand reports, key metrics that matter, and actionable insights for growth.</p>
                </div>
                <p className="text-sm text-gray-500 italic">Data helps you make smart decisions and invest your time wisely.</p>
              </CardContent>
            </Card>
          </div>

          {/* X Marks the Spot - Success Destination */}
          <Card className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-center shadow-2xl border-8 border-yellow-400 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-8xl text-red-600 font-bold animate-bounce">×</div>
            <CardContent className="p-12 pt-16">
              <div className="flex items-center justify-center mb-6">
                <Gem className="w-12 h-12 mr-4 animate-pulse" />
                <h3 className="text-4xl font-bold">Digital Success Treasure!</h3>
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
                🗺️ Start Your Treasure Hunt
              </Button>
              <p className="mt-4 text-sm opacity-75">
                Your personalized map will show you which treasures to find first!
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
                  <Brain className="h-16 w-16 text-blue-500" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="text-black">cloud</span><span className="text-blue-500">pleaser</span><span className="text-green-400">.io</span>
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

            <Card className="text-center border-pink-200 hover:shadow-lg transition-shadow p-6">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <Globe className="h-16 w-16 text-[#FC8EA0]" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="text-black">web</span><span className="text-[#FC8EA0]">hosted</span><span className="text-green-400">.io</span>
                </div>
                <p className="text-gray-600 mb-4">Website Hosting Platform</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  <li>• High-performance hosting</li>
                  <li>• Domain management</li>
                  <li>• Technical optimization</li>
                </ul>
                <Button className="w-full bg-[#FC8EA0] hover:bg-[#f87394]">
                  Get Hosting
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow p-6">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <Zap className="h-16 w-16 text-[#CB0505]" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="text-black">air</span><span className="text-[#CB0505]">swiped</span><span className="text-green-400">.com</span>
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
                Start DIY Journey
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Brain className="h-6 w-6 text-blue-500" />
                <span>
                  <span className="text-white">cloud</span>
                  <span className="text-blue-500">pleaser</span>
                  <span className="text-green-400">.io</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Digital empowerment for businesses through AI-powered insights and comprehensive online solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#assessment" className="hover:text-white transition-colors">Business Assessment</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Website Hosting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Processing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ai-coach" className="hover:text-white transition-colors">AI Business Coach</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><Link href="/portal/login" className="hover:text-white transition-colors">Client Portal</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 cloudpleaser.io. All rights reserved. Powered by cloudpleaser.io technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
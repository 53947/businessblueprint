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
              <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8 rounded-xl shadow-lg border-4 border-dashed border-amber-400 relative overflow-hidden">
                {/* Treasure Map Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="compass" patternUnits="userSpaceOnUse" width="20" height="20">
                        <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#compass)"/>
                  </svg>
                </div>
                
                {/* Compass in top corner */}
                <div className="absolute top-4 right-4">
                  <Compass className="w-8 h-8 text-amber-600 animate-spin" style={{animationDuration: '10s'}} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-red-500 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-900">Your Digital Treasure Map</h3>
                    <Gem className="w-6 h-6 text-blue-500 ml-2" />
                  </div>
                  
                  {/* Treasure Map Path */}
                  <div className="space-y-6">
                    <div className="flex items-center text-left relative">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shadow-lg border-2 border-white">
                        1
                      </div>
                      <span className="text-gray-700 font-medium">🔍 AI analyzes your online presence</span>
                      {/* Dotted path */}
                      <div className="absolute left-5 top-10 w-0.5 h-4 bg-dotted bg-amber-400 opacity-50"></div>
                    </div>
                    
                    <div className="flex items-center text-left relative ml-6">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shadow-lg border-2 border-white">
                        2
                      </div>
                      <span className="text-gray-700 font-medium">📊 Get your personalized roadmap</span>
                      <div className="absolute left-5 top-10 w-0.5 h-4 bg-dotted bg-amber-400 opacity-50"></div>
                    </div>
                    
                    <div className="flex items-center text-left relative">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shadow-lg border-2 border-white">
                        3
                      </div>
                      <span className="text-gray-700 font-medium">🛤️ Choose DIY or managed services</span>
                      <div className="absolute left-5 top-10 w-0.5 h-4 bg-dotted bg-amber-400 opacity-50"></div>
                    </div>
                    
                    <div className="flex items-center text-left ml-6">
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shadow-lg border-2 border-white animate-pulse">
                        🏆
                      </div>
                      <span className="text-gray-700 font-medium">💎 Watch your business grow</span>
                    </div>
                  </div>
                  
                  {/* X marks the spot */}
                  <div className="mt-6 text-center">
                    <div className="inline-block text-4xl text-red-600 font-bold animate-bounce">×</div>
                    <p className="text-sm text-gray-600 mt-1">Digital Success Awaits!</p>
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
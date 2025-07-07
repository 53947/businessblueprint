import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, Link } from "wouter";
import { CheckCircle, Search, BarChart3, Rocket, Star, Shield, Clock, ChevronRight, MessageCircle } from "lucide-react";
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
              <div className="text-2xl font-bold">
                <span className="text-black">cloud</span><span className="text-blue-500">pleaser</span><span className="text-green-400">.io</span>
              </div>
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
              <Button onClick={startAssessment} className="bg-primary hover:bg-primary/90">
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
                <Button onClick={startAssessment} size="lg" className="bg-primary hover:bg-primary/90">
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
            <div className="relative">
              {/* Mock dashboard preview */}
              <Card className="shadow-2xl border border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Business Assessment Report</h3>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-500">Google Verified</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Online Visibility</span>
                      </div>
                      <span className="text-green-600 font-bold">85%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">Customer Reviews</span>
                      </div>
                      <span className="text-yellow-600 font-bold">42%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Website Performance</span>
                      </div>
                      <span className="text-red-600 font-bold">28%</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">C+</div>
                    <p className="text-gray-600 text-sm">Overall Digital Score</p>
                  </div>
                </CardContent>
              </Card>
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

      {/* Pricing */}
      <section id="pricing" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees, no long-term contracts, cancel anytime</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Free Assessment */}
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

            {/* DIY Plans */}
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
              <Button className="w-full bg-primary hover:bg-primary/90">
                Start DIY Journey
              </Button>
            </Card>

            {/* Managed Services */}
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
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                Get Managed Services
              </Button>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a custom solution? We'll create a plan that fits your business perfectly.</p>
            <Button variant="link" className="text-primary">
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
              <div className="text-2xl font-bold mb-4">
                <span className="text-black">cloud</span><span className="text-blue-500">pleaser</span><span className="text-green-400">.io</span>
              </div>
              <p className="text-gray-400 mb-6">
                Digital empowerment for businesses through AI-powered insights and comprehensive online solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Business Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Website Hosting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Processing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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

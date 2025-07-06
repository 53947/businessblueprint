import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wrench, Bell, BarChart3, Server, CreditCard, Brain, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export function ServicePathways() {
  return (
    <section id="services" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Digital Journey</h2>
          <p className="text-xl text-gray-600">Two paths to digital success - pick what works best for you</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* DIY Option */}
          <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">DIY Path</h3>
                  <p className="text-gray-600">Perfect for hands-on business owners</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Listing Platform</h4>
                    <p className="text-gray-600 text-sm">Includes local SEO and listing distribution</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Social Media & Scheduling</h4>
                    <p className="text-gray-600 text-sm">Post scheduling and social media management tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Reputation & CRM</h4>
                    <p className="text-gray-600 text-sm">Citation builder, review management, and customer management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Inbox & Website Builder</h4>
                    <p className="text-gray-600 text-sm">Campaign Pro and complete website building platform</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Business Coach</h4>
                    <p className="text-gray-600 text-sm">Step-by-step guidance and personalized recommendations</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">Free - $299/mo</span>
                  <Badge className="bg-green-100 text-green-800">Start Free</Badge>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Choose DIY Path
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* MSP Option */}
          <Card className="shadow-lg border-2 border-secondary hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-secondary text-white px-6 py-2">MOST POPULAR</Badge>
            </div>
            
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Bell className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Managed Services</h3>
                  <p className="text-gray-600">We handle everything for you</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Full Implementation</h4>
                    <p className="text-gray-600 text-sm">Our team builds and optimizes everything</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Dedicated Account Manager</h4>
                    <p className="text-gray-600 text-sm">Personal expert to guide your digital strategy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Priority Support</h4>
                    <p className="text-gray-600 text-sm">24/7 monitoring and instant issue resolution</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Monthly Optimization</h4>
                    <p className="text-gray-600 text-sm">Continuous improvements and performance tracking</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">Starting at $299/mo</span>
                  <Badge className="bg-blue-100 text-blue-800">Best ROI</Badge>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Choose Managed Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration showcase */}
        <Card className="shadow-lg border border-gray-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Integrated Platform Ecosystem</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">cloudpleaser.io</h4>
                <p className="text-gray-600 text-sm">Complete digital marketing suite with AI-powered recommendations</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">webhosted.io</h4>
                <p className="text-gray-600 text-sm">Reliable hosting platform with automatic scaling and security</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">airswiped.com</h4>
                <p className="text-gray-600 text-sm">Secure payment gateway with competitive rates and easy setup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

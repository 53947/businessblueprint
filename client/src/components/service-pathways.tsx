import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { DIYIcon, MSPIcon, AICoachIcon, CaptainIcon } from "./pathway-icons";
import { Link } from "wouter";

export function ServicePathways() {
  return (
    <section id="services" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Path Forward</h2>
          <p className="text-xl text-gray-600">Two paths to digital success - pick what works best for you</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* DIY Option */}
          <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <DIYIcon className="w-16 h-16" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">DIY Path</h3>
                  <p className="text-gray-600">Self-service platform for hands-on owners</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Automated Listing Management</h4>
                    <p className="text-gray-600 text-sm">Local SEO and listing distribution across 100+ directories</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Social Media Automation</h4>
                    <p className="text-gray-600 text-sm">Post scheduling and social media management tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Review & Reputation Tools</h4>
                    <p className="text-gray-600 text-sm">Automated review monitoring and response templates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Campaign & Website Builder</h4>
                    <p className="text-gray-600 text-sm">Self-service website and campaign creation platform</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-start space-x-3 bg-blue-50 p-3 rounded-lg">
                  <AICoachIcon className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">AI Business Coach</h4>
                    <p className="text-gray-600 text-sm">Optional premium add-on</p>
                    <p className="text-blue-600 font-bold text-sm mt-1">+$99/mo</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 bg-purple-50 p-3 rounded-lg">
                  <CaptainIcon className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Captain Your Journey</h4>
                    <p className="text-gray-600 text-sm">Personal oversight for 8 weeks</p>
                    <p className="text-purple-600 font-bold text-sm mt-1">+$249/mo</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pt-4">
                  <span className="text-2xl font-bold text-gray-900">$99/mo</span>
                  <Badge className="bg-green-100 text-green-800">Start Now</Badge>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" data-testid="button-choose-diy">
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
                <div className="mr-4">
                  <MSPIcon className="w-16 h-16" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Managed Services</h3>
                  <p className="text-gray-600">Fully automated with expert support</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Full Platform Access</h4>
                    <p className="text-gray-600 text-sm">Complete automated listing, social, and review management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Support Team</h4>
                    <p className="text-gray-600 text-sm">Professional support when you need guidance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Priority Assistance</h4>
                    <p className="text-gray-600 text-sm">Faster response times and dedicated help</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Monthly Performance Reports</h4>
                    <p className="text-gray-600 text-sm">Automated insights and optimization recommendations</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-start space-x-3 bg-blue-50 p-3 rounded-lg">
                  <AICoachIcon className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">AI Business Coach</h4>
                    <p className="text-gray-600 text-sm">Optional premium add-on</p>
                    <p className="text-blue-600 font-bold text-sm mt-1">+$59/mo</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-purple-50 p-3 rounded-lg">
                  <CaptainIcon className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Captain Your Journey</h4>
                    <p className="text-gray-600 text-sm">Personal oversight for 8 weeks</p>
                    <p className="text-purple-600 font-bold text-sm mt-1">+$249/mo</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pt-4">
                  <span className="text-2xl font-bold text-gray-900">$299/mo</span>
                  <Badge className="bg-blue-100 text-blue-800">Best Value</Badge>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90" data-testid="button-choose-msp">
                  Choose Managed Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Captain Your Journey Explanation */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <div className="flex items-start space-x-4">
            <CaptainIcon className="w-20 h-20 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Captain Your Journey</h3>
              <p className="text-gray-600 mb-4">
                Get personalized oversight during your critical first 8 weeks. I'll personally guide your Digital Blueprint implementation, 
                ensure everything is properly configured, and help you navigate challenges as they arise. Perfect for new businesses 
                wanting expert reassurance during their digital launch.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="font-semibold text-purple-600 mb-1">Week 1-2</div>
                  <p className="text-gray-700">Foundation setup and initial optimization</p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="font-semibold text-purple-600 mb-1">Week 3-6</div>
                  <p className="text-gray-700">Active monitoring and strategic adjustments</p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="font-semibold text-purple-600 mb-1">Week 7-8</div>
                  <p className="text-gray-700">Transition to independent success</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

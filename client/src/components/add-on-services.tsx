import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Star, 
  Globe, 
  Search, 
  Mail, 
  MessageSquare, 
  BarChart3, 
  Megaphone,
  Building,
  Target,
  Settings,
  Lock
} from "lucide-react";

export function AddOnServices() {
  return (
    <section id="add-ons" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">À La Carte Add-On Services</h2>
          <p className="text-xl text-gray-600">Build your perfect digital strategy with standalone services that work together</p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <Lock className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-gray-600">No long-term contracts</span>
            </div>
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-gray-600">Proven ROI tracking</span>
            </div>
          </div>
        </div>

        {/* Foundation Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Foundation Services</h3>
            <p className="text-gray-600">Essential services that must be completed first</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Google Business Profile Setup */}
            <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">Required First</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Google Business Profile Setup</h3>
                <p className="text-gray-600 text-sm mb-4">Professional setup and verification</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Complete profile setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Business verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Photo optimization</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$100</span>
                      <span className="text-sm text-gray-500 ml-1">one-time</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Domain Registration */}
            <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Foundation</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Domain Registration</h3>
                <p className="text-gray-600 text-sm mb-4">Professional domain setup</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Domain registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">DNS management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">SSL certificate</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$17-25</span>
                      <span className="text-sm text-gray-500 ml-1">per year</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Local SEO Foundation */}
            <Card className="shadow-lg border-2 border-blue-500 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Essential</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Local SEO Foundation</h3>
                <p className="text-gray-600 text-sm mb-4">Essential local search optimization</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Keyword research</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Local citations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Schema markup</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">Starting at $250</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Growth Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth Services</h3>
            <p className="text-gray-600">Expand your reach after foundation is set</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Reputation Management */}
            <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Requires Foundation</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reputation Management</h3>
                <p className="text-gray-600 text-sm mb-4">AI-powered review management</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Review monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Response automation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Rating improvement</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$50-200</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Marketing */}
            <Card className="shadow-lg border-2 border-blue-500 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Popular Add-On</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Social Media Marketing</h3>
                <p className="text-gray-600 text-sm mb-4">Complete social media management</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Content creation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Post scheduling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Performance analytics</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$25-444</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Marketing */}
            <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">High ROI</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Marketing</h3>
                <p className="text-gray-600 text-sm mb-4">Professional email campaigns</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Campaign creation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">List management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Automation flows</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$198-210</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Advanced Services */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Services</h3>
            <p className="text-gray-600">Maximum impact services for established digital presence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Digital Advertising */}
            <Card className="shadow-lg border-2 border-blue-500 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Requires Growth Services</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Advertising</h3>
                <p className="text-gray-600 text-sm mb-4">Targeted ad campaigns</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Google Ads management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Facebook advertising</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">ROI tracking</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$558+</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Advanced SEO */}
            <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800">Enterprise Level</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced SEO</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive SEO strategy</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Technical SEO</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Content optimization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Link building</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$349-599</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Automation */}
            <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">All-in-One</Badge>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Marketing Automation</h3>
                <p className="text-gray-600 text-sm mb-4">Complete automation suite</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Lead nurturing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Workflow automation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Advanced analytics</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">$100+</span>
                      <span className="text-sm text-gray-500 ml-1">per month</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Need Help Choosing?</h4>
            <p className="text-gray-600 mb-6">Our AI assessment will recommend the perfect combination of services for your business</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Get Free Digital IQ Assessment
              </Button>
              <Button variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
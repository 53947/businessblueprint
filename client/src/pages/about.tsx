import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Brain, 
  Globe, 
  Zap, 
  Users, 
  Target,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">
              cloud<span className="text-indigo-600">pleaser</span><span className="text-gray-600">.io</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
              <a href="/assessment" className="text-gray-600 hover:text-indigo-600 transition-colors">Assessment</a>
              <a href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200">
            About cloudpleaser.io
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Digital Empowerment for Every Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe every business deserves to succeed online. Our AI-powered platform provides the insights, 
            tools, and guidance needed to transform your digital presence and accelerate growth.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              To democratize digital marketing success by making enterprise-level tools and insights 
              accessible to businesses of all sizes. We combine AI intelligence with human expertise 
              to create personalized pathways for digital growth.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>AI-powered business intelligence</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Personalized digital strategies</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Complete ecosystem integration</span>
              </div>
            </div>
          </div>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">Our Vision</h3>
              <p className="text-indigo-800 mb-6">
                A world where every business has the digital tools and knowledge to thrive online, 
                regardless of size, industry, or technical expertise.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">10,000+</div>
                  <div className="text-sm text-indigo-700">Businesses Empowered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">95%</div>
                  <div className="text-sm text-indigo-700">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Ecosystem */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Ecosystem</h2>
            <p className="text-xl text-gray-600">
              Three specialized platforms working together for your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Brain className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-xl">
                  cloud<span className="text-blue-600">pleaser</span><span className="text-purple-600">.io</span>
                </CardTitle>
                <CardDescription>Digital Empowerment Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI-powered business assessment, coaching, and strategic guidance
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Business intelligence analysis</li>
                  <li>• AI coaching and guidance</li>
                  <li>• Client portal and dashboard</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Globe className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-xl">
                  web<span className="text-green-600">pleaser</span><span className="text-emerald-600">.io</span>
                </CardTitle>
                <CardDescription>Website Hosting Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Professional website hosting with optimization tools
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• High-performance hosting</li>
                  <li>• Domain management</li>
                  <li>• Technical optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Zap className="h-12 w-12 text-orange-600" />
                </div>
                <CardTitle className="text-xl">
                  air<span className="text-orange-600">pleaser</span><span className="text-amber-600">.com</span>
                </CardTitle>
                <CardDescription>Payment Gateway Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Secure payment processing and financial tools
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Payment gateway services</li>
                  <li>• Transaction processing</li>
                  <li>• Financial analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team & Values */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We're a distributed team of digital marketing experts, AI engineers, and business strategists 
                united by one goal: helping businesses succeed online.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Customer-first approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Innovation through AI</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Global perspective</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-900">Ready to Get Started?</CardTitle>
              <CardDescription className="text-indigo-700">
                Join thousands of businesses already empowering their digital presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/assessment">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  Contact Our Team
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
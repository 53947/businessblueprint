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
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandLogo } from "@/components/brand-logo";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200">
            About businessblueprint.io
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Helping Local Businesses Succeed Online
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help local businesses get found, get customers, and get business. Our AI-powered platform provides the digital intelligence and step-by-step guidance needed to succeed online.
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
                <CheckCircle className="h-5 w-5 text-orange-500" />
                <span>AI-powered business intelligence</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-orange-500" />
                <span>Personalized digital strategies</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-orange-500" />
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
                  <BrandLogo brand="businessblueprint" variant="light" size="md" className="justify-center" />
                </div>
                <CardDescription>Digital Intelligence Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI-powered business assessment, coaching, and complete communication suite
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• /send - Email & SMS Marketing</li>
                  <li>• /inbox - Unified Communications</li>
                  <li>• /livechat - Live Chat Widget</li>
                  <li>• /content - Social Media Mgmt</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <BrandLogo brand="hostsblue" variant="light" size="md" className="justify-center" />
                </div>
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

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <BrandLogo brand="swipesblue" variant="light" size="md" className="justify-center" />
                </div>
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
                <Users className="h-5 w-5 text-orange-500" />
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
                  <Target className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Customer-first approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Innovation through AI</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Global perspective</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Ready to Get Started?</CardTitle>
              <CardDescription className="text-orange-700">
                Join thousands of businesses already empowering their digital presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/assessment">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white">
                  Contact Our Team
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
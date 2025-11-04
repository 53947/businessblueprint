import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Users, 
  CheckCircle,
  Play,
  Target,
  Lightbulb,
  TrendingUp,
  Settings,
  Compass
} from "lucide-react";
import aiCoachIcon from "@assets/native icons and favicons/AI Business Coach Blue icon.png";
import { BrandLogo } from "@/components/brand-logo";
import blueprintIcon from "@assets/businesblueprint assets/Blueprint_Avatar.png";
import digitalSuccessIcon from "@assets/native icons and favicons/digital success accellerated revenue.png";
import digitalAssessmentIcon from "@assets/native icons and favicons/Digital Assessment_1762239599462.png";
import digitalPathIcon from "@assets/native icons and favicons/digital path.png";
import digitalJourneyIcon from "@assets/native icons and favicons/digital path.png";

export default function Journey() {
  const journeySteps = [
    {
      id: "assessment",
      title: "Digital Assessment",
      description: "AI-powered analysis of your online presence",
      icon: () => <img src={digitalAssessmentIcon} alt="Digital Assessment" className="w-16 h-16" />,
      color: "blue" as const,
      path: "/assessment",
      features: ["Google Business Intelligence", "Digital IQ Score (70-140)", "Competitive Analysis", "Priority Action Items"]
    },
    {
      id: "blueprint",
      title: "Digital Blueprint",
      description: "Personalized roadmap for your growth",
      icon: () => <img src={blueprintIcon} alt="Digital Blueprint" className="w-16 h-16" />,
      color: "purple" as const, 
      path: "/assessment",
      features: ["Custom Growth Strategy", "Step-by-Step Guide", "Resource Recommendations", "Timeline & Milestones"]
    },
    {
      id: "pathway",
      title: "Choose Your Path",
      description: "Do It Yourself (DIY) tools or Managed Services Provided (MSP)",
      icon: () => <img src={digitalPathIcon} alt="Choose Your Path" className="w-16 h-16" />,
      color: "green" as const,
      path: "/subscription",
      features: ["Do It Yourself (DIY) Self-Service Tools", "Full Managed Services Provided (MSP)", "Hybrid Approach", "Scalable Solutions"]
    },
    {
      id: "coach",
      title: "AI Business Coach",
      description: "Ongoing guidance and optimization",
      icon: () => <img src={aiCoachIcon} alt="AI Coach" className="w-[86px] h-[86px]" />,
      color: "orange" as const,
      path: "/ai-coach",
      features: ["24/7 AI Guidance", "Progress Tracking", "Strategy Optimization", "Performance Insights"]
    },
    {
      id: "success",
      title: "Digital Success",
      description: "Get found, get customers, get business",
      icon: () => <img src={digitalSuccessIcon} alt="Digital Success" className="w-[74px] h-[74px]" />,
      color: "emerald" as const,
      path: "/portal",
      features: ["Increased Visibility", "More Customers", "Revenue Growth", "Market Leadership"]
    }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Your Digital Growth Journey
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            From Digital Obscurity to Digital Maturity
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Follow our proven 5-step process that has helped thousands of local businesses 
            transform their online presence and achieve sustainable growth.
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-blue-600">
            <Play className="w-5 h-5" />
            <span>Start Your Journey Today</span>
          </div>
        </div>
      </section>

      {/* Journey Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The businessblueprint.io Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our systematic approach combines AI intelligence, proven strategies, 
              and personalized guidance to ensure your digital success.
            </p>
          </div>

          {/* Desktop Journey Flow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Journey Path Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 via-orange-200 to-emerald-200 rounded-full"></div>
              
              <div className="grid grid-cols-5 gap-8">
                {journeySteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const colorClasses = {
                    blue: "bg-blue-500 border-blue-200 text-blue-600",
                    purple: "bg-purple-500 border-purple-200 text-purple-600", 
                    green: "bg-green-500 border-green-200 text-green-600",
                    orange: "bg-orange-500 border-orange-200 text-orange-600",
                    emerald: "bg-emerald-500 border-emerald-200 text-emerald-600"
                  } as const;
                  
                  return (
                    <div key={step.id} className="relative">
                      {/* Step Number Circle */}
                      <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 ${colorClasses[step.color]} bg-white border-4 rounded-full flex items-center justify-center font-bold text-lg z-10`}>
                        {index + 1}
                      </div>
                      
                      {/* Step Card */}
                      <Card className="mt-32 hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                          <div className={`w-20 h-20 ${colorClasses[step.color]} bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                            <IconComponent />
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mb-4">
                            {step.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Link href={step.path}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              data-testid={`button-${step.id}`}
                            >
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Journey Flow */}
          <div className="lg:hidden space-y-8">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const colorClasses = {
                blue: "bg-blue-500 border-blue-200 text-blue-600",
                purple: "bg-purple-500 border-purple-200 text-purple-600",
                green: "bg-green-500 border-green-200 text-green-600", 
                orange: "bg-orange-500 border-orange-200 text-orange-600",
                emerald: "bg-emerald-500 border-emerald-200 text-emerald-600"
              } as const;
              
              return (
                <div key={step.id} className="relative">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${colorClasses[step.color]} bg-white border-4 rounded-full flex items-center justify-center font-bold text-lg`}>
                          {index + 1}
                        </div>
                        <div className={`w-16 h-16 ${colorClasses[step.color]} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                          <IconComponent />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={step.path}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          data-testid={`button-mobile-${step.id}`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for mobile */}
                  {index < journeySteps.length - 1 && (
                    <div className="flex justify-center py-4">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pathway Comparison */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Path
            </h2>
            <p className="text-lg text-gray-600">
              Whether you prefer hands-on control or full-service management, 
              we have the right solution for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* DIY Path */}
            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center bg-blue-50">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-blue-600">Do It Yourself (DIY)</CardTitle>
                <CardDescription className="text-lg">
                  Self-service tools and step-by-step guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Complete control over implementation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Cost-effective solution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Learn while you grow</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>AI Coach support included</span>
                  </li>
                </ul>
                <Link href="/subscription">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-diy-path">
                    Start Do It Yourself (DIY) Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* MSP Path */}
            <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center bg-purple-50">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-purple-600">Managed Services Provided (MSP)</CardTitle>
                <CardDescription className="text-lg">
                  Full-service management by digital experts
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Expert team handles everything</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Faster time to results</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Focus on your business</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Premium AI Coach access</span>
                  </li>
                </ul>
                <Link href="/subscription">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-msp-path">
                    Start Managed Services Provided (MSP) Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why cloudpleaser.io?
            </h2>
            <p className="text-lg text-gray-600">
              Our mission is to democratize digital marketing success for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
                <p className="text-gray-600">
                  Leveraging cutting-edge AI to provide insights and recommendations 
                  that were previously only available to enterprise businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Methodology</h3>
                <p className="text-gray-600">
                  Our systematic approach has helped thousands of businesses 
                  achieve measurable growth in their digital presence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Support</h3>
                <p className="text-gray-600">
                  From AI coaching to expert guidance, we provide the support 
                  you need at every stage of your digital journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Digital Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses that have transformed their online presence with businessblueprint.io
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                data-testid="button-start-assessment"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                data-testid="button-contact-team"
              >
                Talk to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
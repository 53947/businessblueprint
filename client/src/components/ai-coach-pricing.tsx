import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Brain, Users, Target, TrendingUp, Zap } from "lucide-react";

interface AICoachPricingProps {
  currentPlan?: "diy" | "msp";
  showUpgrade?: boolean;
}

export function AICoachPricing({ currentPlan, showUpgrade = false }: AICoachPricingProps) {
  const features = [
    {
      icon: Brain,
      title: "Personalized Business Guidance",
      description: "AI analyzes your specific business context and provides tailored recommendations"
    },
    {
      icon: Target,
      title: "Step-by-Step Task Breakdown",
      description: "Complex marketing tasks simplified into manageable action items"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking & Analytics",
      description: "Monitor your digital score improvements with detailed insights"
    },
    {
      icon: Users,
      title: "Team Training Support",
      description: "Perfect for MSP staff onboarding and standardizing processes"
    },
    {
      icon: Zap,
      title: "Real-Time Help & Support",
      description: "Instant assistance whenever you're stuck on platform navigation"
    }
  ];

  const pricingTiers = [
    {
      plan: "diy",
      title: "DIY + AI Coach",
      price: "$99",
      period: "/month",
      description: "Maximum support for independent business owners",
      features: [
        "All DIY platform features included",
        "Unlimited personalized guidance",
        "Step-by-step task instructions",
        "Progress tracking & motivation",
        "24/7 AI availability",
        "Priority learning support"
      ],
      highlight: true
    },
    {
      plan: "msp",
      title: "MSP + AI Coach",
      price: "$49",
      period: "/month", 
      description: "Team training and standardization tool",
      features: [
        "All MSP platform features included",
        "Team training & onboarding",
        "Process standardization",
        "Client transition support",
        "Multi-user access",
        "Volume pricing benefit"
      ],
      highlight: false
    }
  ];

  if (showUpgrade && currentPlan) {
    const currentTier = pricingTiers.find(tier => tier.plan === currentPlan);
    
    return (
      <Card className="max-w-md mx-auto border-2 border-blue-200 bg-blue-50/50">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Unlock AI Business Coach</CardTitle>
          <CardDescription>
            Supercharge your {currentPlan.toUpperCase()} plan with intelligent guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {currentTier?.price}
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Add-on to your existing plan</p>
          </div>

          <div className="space-y-3">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Add AI Coach to Plan
          </Button>

          <p className="text-xs text-center text-gray-500">
            Cancel anytime. 7-day free trial included.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-blue-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            AI Business Coach Add-On
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance any plan with intelligent guidance that adapts to your business needs and experience level
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <feature.icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.plan} 
              className={`relative ${tier.highlight ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'}`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-6 py-2">MOST POPULAR</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{tier.title}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-lg text-gray-600">{tier.period}</span>
                </div>
                <p className="text-sm text-gray-500">Add-on pricing</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                <Button 
                  className={`w-full mt-6 ${
                    tier.highlight 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Add to {tier.plan.toUpperCase()} Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Not sure which option is right for you?
          </p>
          <Button variant="outline" size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
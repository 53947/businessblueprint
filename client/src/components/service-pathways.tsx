import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { DIYIcon, MSPIcon, AICoachIcon, CaptainIcon } from "./pathway-icons";
import { Link } from "wouter";

export function ServicePathways() {
  const features = [
    {
      category: "Core Platform Features",
      items: [
        { name: "Automated Listing Management", diy: true, msp: true, description: "100+ directory distribution" },
        { name: "Social Media Automation", diy: true, msp: true, description: "Post scheduling & management" },
        { name: "Review & Reputation Tools", diy: true, msp: true, description: "Automated monitoring & templates" },
        { name: "Campaign & Website Builder", diy: true, msp: true, description: "Self-service creation tools" },
      ]
    },
    {
      category: "Support & Services",
      items: [
        { name: "Platform Access", diy: "Self-Service", msp: "Full Access", description: "" },
        { name: "Expert Support Team", diy: false, msp: true, description: "Business Blueprint-powered assistance" },
        { name: "Priority Help", diy: false, msp: true, description: "Faster response times" },
        { name: "Performance Reports", diy: "Basic", msp: "Monthly Pro", description: "" },
      ]
    }
  ];

  return (
    <section id="services" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Path Forward</h2>
          <p className="text-xl text-gray-600">Simple pricing, powerful automation</p>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {/* Header Row */}
          <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            </div>
            <div className="p-6 border-l border-gray-200 text-center">
              <div className="flex justify-center mb-3">
                <DIYIcon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Do It Yourself (DIY)</h3>
              <p className="text-sm text-gray-600 mb-3">Self-service automation</p>
              <div className="text-3xl font-bold text-blue-600 mb-2">$250<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-xs text-gray-500">STARTER tier</p>
            </div>
            <div className="p-6 border-l border-gray-200 text-center bg-secondary/5 relative pt-8">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-secondary text-white px-4 py-1">MOST POPULAR</Badge>
              </div>
              <div className="flex justify-center mb-3">
                <MSPIcon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Managed Services Provided (MSP)</h3>
              <p className="text-sm text-gray-600 mb-3">Automation + Expert support</p>
              <div className="text-3xl font-bold text-secondary mb-2">$399<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-xs text-gray-500">EXPANSION Essential tier</p>
            </div>
          </div>

          {/* Feature Rows */}
          {features.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">{category.category}</h4>
              </div>
              {category.items.map((feature, featureIndex) => (
                <div key={featureIndex} className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="p-4 flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">{feature.name}</div>
                      {feature.description && (
                        <div className="text-sm text-gray-500 mt-1">{feature.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 border-l border-gray-100 flex items-center justify-center">
                    {typeof feature.diy === 'boolean' ? (
                      feature.diy ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-gray-700">{feature.diy}</span>
                    )}
                  </div>
                  <div className="p-4 border-l border-gray-100 flex items-center justify-center bg-secondary/5">
                    {typeof feature.msp === 'boolean' ? (
                      feature.msp ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-gray-700">{feature.msp}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Addon Rows */}
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">Optional Add-ons</h4>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="p-4 flex items-center">
              <AICoachIcon className="w-10 h-10 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">AI Business Coach</div>
                <div className="text-sm text-gray-500 mt-1">Personalized AI guidance</div>
              </div>
            </div>
            <div className="p-4 border-l border-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-blue-600">+$99/mo</span>
            </div>
            <div className="p-4 border-l border-gray-100 flex items-center justify-center bg-secondary/5">
              <span className="text-lg font-bold text-secondary">+$59/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="p-4 flex items-center">
              <CaptainIcon className="w-10 h-10 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Captaining Your Journey</div>
                <div className="text-sm text-gray-500 mt-1">8 weeks personal oversight</div>
              </div>
            </div>
            <div className="p-4 border-l border-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600">+$249/mo</span>
            </div>
            <div className="p-4 border-l border-gray-100 flex items-center justify-center bg-secondary/5">
              <span className="text-lg font-bold text-purple-600">+$249/mo</span>
            </div>
          </div>

          {/* CTA Row */}
          <div className="grid grid-cols-3 bg-gray-50">
            <div className="p-6"></div>
            <div className="p-6 border-l border-gray-200">
              <Link href="/subscription?pathway=diy">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg" data-testid="button-choose-diy">
                  Choose Do It Yourself (DIY)
                </Button>
              </Link>
            </div>
            <div className="p-6 border-l border-gray-200 bg-secondary/5">
              <Link href="/subscription?pathway=msp">
                <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg" data-testid="button-choose-msp">
                  Choose Managed Services Provided (MSP)
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Captain Your Journey Explanation */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8">
          <div className="flex items-start space-x-4">
            <CaptainIcon className="w-20 h-20 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Captaining Your Journey</h3>
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

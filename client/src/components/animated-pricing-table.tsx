import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingPlan {
  planId: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  recommended?: boolean;
  tier: 'starter' | 'growth' | 'expansion_essential' | 'expansion_pro' | 'leadership_essential' | 'leadership_pro';
}

const diyPlans: PricingPlan[] = [
  {
    planId: 'diy_starter',
    name: 'STARTER',
    description: 'Essential tools to begin your digital journey',
    basePrice: 250,
    tier: 'starter',
    features: [
      'Digital IQ Assessment',
      'Personalized Blueprint',
      '/send Email & SMS Marketing',
      '/inbox Unified Communications',
      '/livechat Widget',
      'Basic Analytics',
      'Community Support'
    ]
  },
  {
    planId: 'diy_growth',
    name: 'GROWTH',
    description: 'Advanced features for scaling businesses',
    basePrice: 316,
    tier: 'growth',
    recommended: true,
    features: [
      'Everything in STARTER',
      'Advanced Campaign Automation',
      'Multi-Channel Attribution',
      'Custom Reporting',
      'Priority Support',
      'API Access',
      'Competitor Insights'
    ]
  }
];

const mspPlans: PricingPlan[] = [
  {
    planId: 'msp_expansion_essential',
    name: 'EXPANSION Essential',
    description: 'Professional management for growing presence',
    basePrice: 399,
    tier: 'expansion_essential',
    features: [
      'All DIY GROWTH Features',
      'Dedicated Account Manager',
      'Monthly Strategy Sessions',
      'Content Creation (4/month)',
      'Review Response Management',
      'Local SEO Optimization',
      'Social Media Management'
    ]
  },
  {
    planId: 'msp_expansion_pro',
    name: 'EXPANSION Pro',
    description: 'Complete expansion toolkit with premium support',
    basePrice: 649,
    tier: 'expansion_pro',
    recommended: true,
    features: [
      'Everything in EXPANSION Essential',
      'Advanced Content (8/month)',
      'Paid Ad Management ($500 budget)',
      'Custom Landing Pages',
      'A/B Testing',
      'Conversion Optimization',
      'Weekly Performance Reports'
    ]
  },
  {
    planId: 'msp_leadership_essential',
    name: 'LEADERSHIP Essential',
    description: 'Enterprise-grade solutions for market leaders',
    basePrice: 999,
    tier: 'leadership_essential',
    features: [
      'Everything in EXPANSION Pro',
      'White-Label Platform Access',
      'Multi-Location Management',
      'Custom Integrations',
      'Dedicated Success Team',
      'Quarterly Business Reviews',
      'Priority Feature Requests'
    ]
  },
  {
    planId: 'msp_leadership_pro',
    name: 'LEADERSHIP Pro',
    description: 'Ultimate digital intelligence for industry dominators',
    basePrice: 1249,
    tier: 'leadership_pro',
    features: [
      'Everything in LEADERSHIP Essential',
      'Unlimited Content Creation',
      'Advanced AI Personalization',
      'Custom Development Hours',
      'Market Research Reports',
      '24/7 VIP Support',
      'Revenue Share Opportunities'
    ]
  }
];

interface AnimatedPricingTableProps {
  onSelectPlan?: (planId: string) => void;
  defaultPathway?: 'diy' | 'msp';
  defaultCycle?: 'monthly' | 'quarterly' | 'annual';
}

export function AnimatedPricingTable({ onSelectPlan, defaultPathway = 'diy', defaultCycle = 'monthly' }: AnimatedPricingTableProps) {
  const [pathway, setPathway] = useState<'diy' | 'msp'>(defaultPathway);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>(defaultCycle);

  const currentPlans = pathway === 'diy' ? diyPlans : mspPlans;

  const getDiscountedPrice = (basePrice: number) => {
    if (billingCycle === 'quarterly') return basePrice * 0.95;
    if (billingCycle === 'annual') return basePrice * 0.85;
    return basePrice;
  };

  const getSavingsText = () => {
    if (billingCycle === 'quarterly') return 'Save 5%';
    if (billingCycle === 'annual') return 'Save 15%';
    return '';
  };

  return (
    <div className="w-full">
      {/* Pathway Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setPathway('diy')}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
              pathway === 'diy'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="toggle-pathway-diy"
          >
            Do It Yourself (DIY)
          </button>
          <button
            onClick={() => setPathway('msp')}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
              pathway === 'msp'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="toggle-pathway-msp"
          >
            Managed Services (MSP)
          </button>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="toggle-cycle-monthly"
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'quarterly'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="toggle-cycle-quarterly"
          >
            Quarterly <span className="text-green-600 ml-1">5% off</span>
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'annual'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="toggle-cycle-annual"
          >
            Annual <span className="text-green-600 ml-1">15% off</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={`grid gap-6 ${pathway === 'diy' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'} max-w-7xl mx-auto`}>
        <AnimatePresence mode="wait">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={pathway === 'diy' ? 'md:col-span-1' : ''}
            >
              <Card 
                className={`relative h-full transition-all duration-300 ${
                  plan.recommended
                    ? 'border-2 border-blue-500 shadow-xl scale-105'
                    : 'border border-gray-200 shadow-md hover:shadow-lg'
                }`}
                data-testid={`card-plan-${plan.tier}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900" data-testid={`text-plan-name-${plan.tier}`}>
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2" data-testid={`text-plan-description-${plan.tier}`}>
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <motion.div
                      key={`${plan.planId}-${billingCycle}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900" data-testid={`text-plan-price-${plan.tier}`}>
                          ${Math.round(getDiscountedPrice(plan.basePrice))}
                        </span>
                        <span className="text-gray-600 ml-2">/mo</span>
                      </div>
                      {billingCycle !== 'monthly' && (
                        <div className="text-sm text-green-600 font-semibold mt-1">
                          {getSavingsText()}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2" data-testid={`text-feature-${plan.tier}-${idx}`}>
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onSelectPlan?.(plan.planId)}
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    data-testid={`button-select-${plan.tier}`}
                  >
                    Select {plan.name}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

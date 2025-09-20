import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { NMIPaymentForm, PaymentFormData } from '@/components/nmi-payment-form';
import { SubscriptionPlan, SubscriptionAddon } from '@shared/schema';
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Globe, 
  Brain,
  Shield,
  CreditCard,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

// Using shared types from schema
interface ExtendedSubscriptionPlan extends SubscriptionPlan {
  popular?: boolean;
  recommended?: boolean;
}

interface ExtendedSubscriptionAddon extends SubscriptionAddon {
  billingType: 'monthly' | 'one_time';
  icon: any;
}

interface PricingCalculation {
  basePrice: number;
  addonPrices: Array<{ addonId: string; name: string; price: number; }>;
  totalAddons: number;
  setupFee: number;
  setupFeeTax: number;
  oneTimeTotal: number;
  recurringSubtotal: number;
  recurringTax: number;
  recurringTotal: number;
  subtotal: number;
  taxes: number;
  total: number;
  savings?: number;
  billingCycle: string;
}

export default function SubscriptionPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // State management
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<{ addonId: string; quantity?: number; }[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [pathway, setPathway] = useState<'diy' | 'msp'>('msp'); // Default to MSP as recommended

  // Fetch plans and addons
  const { data: plansData, isLoading: plansLoading } = useQuery({
    queryKey: ['/api/subscription-plans']
  });

  const { data: addonsData, isLoading: addonsLoading } = useQuery({
    queryKey: ['/api/subscription-addons']
  });

  const { data: pricingData, isLoading: pricingLoading } = useQuery({
    queryKey: ['/api/pricing/calculate', selectedPlan?.planId, selectedAddons, billingCycle],
    queryFn: async () => {
      if (!selectedPlan) return null;
      
      const response = await apiRequest('POST', '/api/pricing/calculate', {
        planId: selectedPlan.planId,
        addons: selectedAddons,
        billingCycle
      });
      
      return response;
    },
    enabled: !!selectedPlan
  });

  const plans: ExtendedSubscriptionPlan[] = (plansData as any)?.plans || [];
  const addons: ExtendedSubscriptionAddon[] = (addonsData as any)?.addons || [];
  const pricing: PricingCalculation | undefined = (pricingData as any)?.pricing;

  // Filter plans by pathway
  const diyPlans = plans.filter(p => p.pathway === 'diy');
  const mspPlans = plans.filter(p => p.pathway === 'msp');
  const currentPathwayPlans = pathway === 'diy' ? diyPlans : mspPlans;

  // Filter compatible addons
  const compatibleAddons = addons.filter(addon => 
    addon.compatiblePathways && addon.compatiblePathways.includes(pathway)
  );

  // Auto-select recommended plan when pathway changes
  useEffect(() => {
    if (currentPathwayPlans.length > 0) {
      const recommendedPlan = currentPathwayPlans.find(p => p.recommended) || currentPathwayPlans[0];
      setSelectedPlan(recommendedPlan);
    }
  }, [pathway, plans]);

  const handleAddonToggle = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons(prev => [...prev, { addonId, quantity: 1 }]);
    } else {
      setSelectedAddons(prev => prev.filter(a => a.addonId !== addonId));
    }
  };

  const handlePaymentToken = async (paymentToken: string, formData: PaymentFormData) => {
    if (!selectedPlan || !pricing) return;

    setIsProcessingPayment(true);
    
    try {
      const subscriptionData = {
        planId: selectedPlan.planId,
        addons: selectedAddons,
        billingCycle,
        paymentToken,
        customerInfo: formData
        // Note: Server will recalculate all amounts for security
      };

      const response = await apiRequest('POST', '/api/subscriptions', subscriptionData);
      
      toast({
        title: 'Subscription Created Successfully!',
        description: `Welcome to cloudpleaser.io ${selectedPlan.name}! Your account is now active.`,
      });

      // Redirect to dashboard or confirmation page
      setLocation('/dashboard');
      
    } catch (error) {
      console.error('Subscription creation failed:', error);
      toast({
        title: 'Payment Failed',
        description: 'There was an issue processing your subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: 'Payment Error',
      description: error,
      variant: 'destructive',
    });
  };

  const getBillingCycleDiscount = () => {
    switch (billingCycle) {
      case 'quarterly': return '5% off';
      case 'annual': return '15% off';
      default: return null;
    }
  };

  const isLoading = plansLoading || addonsLoading || (selectedPlan && pricingLoading);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Digital Success Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan to transform your business's digital presence with cloudpleaser.io
          </p>
        </div>

        {/* Pathway Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-sm border">
            <div className="flex space-x-1">
              <button
                onClick={() => setPathway('msp')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  pathway === 'msp'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-testid="button-pathway-msp"
              >
                <Crown className="w-4 h-4 inline mr-2" />
                Managed Services (Recommended)
              </button>
              <button
                onClick={() => setPathway('diy')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  pathway === 'diy'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-testid="button-pathway-diy"
              >
                <Zap className="w-4 h-4 inline mr-2" />
                DIY Platform
              </button>
            </div>
          </div>
        </div>

        {/* Billing Cycle Selection */}
        <div className="flex justify-center mb-8">
          <RadioGroup 
            value={billingCycle} 
            onValueChange={(value: 'monthly' | 'quarterly' | 'annual') => setBillingCycle(value)}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quarterly" id="quarterly" />
              <Label htmlFor="quarterly">Quarterly <Badge variant="secondary" className="ml-1">5% off</Badge></Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="annual" id="annual" />
              <Label htmlFor="annual">Annual <Badge variant="secondary" className="ml-1">15% off</Badge></Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Plan Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {pathway === 'msp' ? (
                    <>
                      <Crown className="w-5 h-5 text-purple-600" />
                      <span>Managed Service Plans</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span>DIY Platform Plans</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentPathwayPlans.map((plan) => (
                      <div
                        key={plan.planId}
                        className={`border rounded-lg p-6 cursor-pointer transition-all ${
                          selectedPlan?.planId === plan.planId
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPlan(plan)}
                        data-testid={`card-plan-${plan.planId}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                              {plan.popular && (
                                <Badge className="bg-orange-100 text-orange-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                              {plan.recommended && (
                                <Badge className="bg-green-100 text-green-800">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4">{plan.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {(plan.features as string[] || []).map((feature: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-6">
                            <div className="text-3xl font-bold text-gray-900">
                              ${plan.basePrice}
                            </div>
                            <div className="text-sm text-gray-500">per month</div>
                            {plan.setupFee && parseFloat(plan.setupFee) > 0 && (
                              <div className="text-sm text-gray-500 mt-1">
                                ${plan.setupFee} setup fee
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add-ons Section */}
                {selectedPlan && compatibleAddons.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Add-on Services</h4>
                    <div className="space-y-3">
                      {compatibleAddons.map((addon) => (
                        <div
                          key={addon.addonId}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={selectedAddons.some(a => a.addonId === addon.addonId)}
                              onCheckedChange={(checked) => handleAddonToggle(addon.addonId, checked as boolean)}
                              data-testid={`checkbox-addon-${addon.addonId}`}
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <addon.icon className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-gray-900">{addon.name}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">${addon.price}</div>
                            <div className="text-sm text-gray-500">
                              {addon.billingType === 'monthly' ? 'per month' : 'one-time'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Pricing Summary & Payment */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPlan && pricing ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{selectedPlan.name}</span>
                      <span>${selectedPlan.basePrice}/mo</span>
                    </div>
                    
                    {pricing.addonPrices.map((addon) => (
                      <div key={addon.addonId} className="flex justify-between text-sm">
                        <span className="text-gray-600">{addon.name}</span>
                        <span>${addon.price.toFixed(2)}/mo</span>
                      </div>
                    ))}
                    
                    {pricing.setupFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Setup Fee</span>
                        <span>${pricing.setupFee.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {pricing.savings > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Total Savings</span>
                        <span>-${pricing.savings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${pricing.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 text-center">
                      Recurring: ${pricing.recurringTotal.toFixed(2)}/{pricing.billingCycle || 'month'}
                    </div>
                    
                    {getBillingCycleDiscount() && (
                      <Alert>
                        <Sparkles className="w-4 h-4" />
                        <AlertDescription>
                          You're saving {getBillingCycleDiscount()} with {billingCycle} billing!
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Select a plan to see pricing details
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Section */}
            {selectedPlan && pricing && (
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  {!showPaymentForm ? (
                    <div className="space-y-4">
                      <Alert>
                        <Shield className="w-4 h-4" />
                        <AlertDescription>
                          Your payment is secured with bank-level encryption. Cancel anytime.
                        </AlertDescription>
                      </Alert>
                      
                      <Button 
                        onClick={() => setShowPaymentForm(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="lg"
                        data-testid="button-proceed-payment"
                      >
                        Proceed to Payment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      <div className="text-xs text-center text-gray-500 space-y-1">
                        <p>✓ 30-day money-back guarantee</p>
                        <p>✓ No long-term contracts</p>
                        <p>✓ Cancel anytime</p>
                      </div>
                    </div>
                  ) : (
                    <NMIPaymentForm
                      onPaymentToken={handlePaymentToken}
                      onError={handlePaymentError}
                      amount={pricing.total}
                      description={`cloudpleaser.io ${selectedPlan.name} Subscription`}
                      loading={isProcessingPayment}
                      disabled={isProcessingPayment}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
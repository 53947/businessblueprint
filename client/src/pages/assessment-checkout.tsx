import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AssessmentData {
  id: number;
  businessName: string;
  digitalScore: number;
  grade: string;
  analysisResults: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
  };
}

interface ProductRecommendation {
  productId: number;
  productName: string;
  reason: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  diyPrice?: string;
  category: string;
}

interface PricingCalculation {
  planName: string;
  planPrice: number;
  selectedAddons: { name: string; price: number; quantity?: number }[];
  subtotal: number;
  discount: number;
  total: number;
  billingCycle: string;
  savings?: number;
}

export default function AssessmentCheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const urlParams = new URLSearchParams(window.location.search);
  const assessmentId = urlParams.get('id');
  
  const [pathway, setPathway] = useState<'diy' | 'none'>('diy');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: assessmentResponse, isLoading: assessmentLoading } = useQuery({
    queryKey: [`/api/assessments/${assessmentId}`],
    enabled: !!assessmentId
  });

  const { data: recommendationsResponse, isLoading: recsLoading } = useQuery({
    queryKey: [`/api/assessments/${assessmentId}/product-recommendations`],
    enabled: !!assessmentId
  });

  const { data: pricingData, isLoading: pricingLoading } = useQuery({
    queryKey: ['/api/pricing/calculate-bundle', assessmentId, pathway, selectedProducts, billingCycle],
    queryFn: async () => {
      if (!assessmentId || selectedProducts.length === 0) return null;
      
      const response = await apiRequest('POST', '/api/pricing/calculate-bundle', {
        assessmentId: parseInt(assessmentId),
        pathway,
        productIds: selectedProducts,
        billingCycle
      });
      
      return await response.json();
    },
    enabled: !!assessmentId && selectedProducts.length > 0
  });

  const assessment: AssessmentData | undefined = (assessmentResponse as any)?.assessment;
  const recommendations: ProductRecommendation[] = (recommendationsResponse as any)?.recommendations || [];
  const pricing: PricingCalculation | undefined = (pricingData as any)?.pricing;

  useEffect(() => {
    if (recommendations.length > 0) {
      const criticalAndHigh = recommendations
        .filter(r => r.priority === 'critical' || r.priority === 'high')
        .map(r => r.productId);
      setSelectedProducts(criticalAndHigh);
    }
  }, [recommendations]);

  if (!assessmentId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Not Found</CardTitle>
            <CardDescription>Please complete an assessment first.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (assessmentLoading || recsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Not Found</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      critical: { variant: 'destructive', label: 'Critical' },
      high: { variant: 'default', label: 'High Priority' },
      medium: { variant: 'secondary', label: 'Medium' },
      low: { variant: 'outline', label: 'Low' }
    };
    return variants[priority] || variants.medium;
  };

  const toggleProduct = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await apiRequest('POST', '/api/subscriptions/create-from-assessment', {
        assessmentId: parseInt(assessmentId),
        pathway,
        productIds: selectedProducts,
        billingCycle
      });

      await apiRequest('PATCH', `/api/assessments/${assessmentId}/pathway`, { pathway });

      toast({
        title: "Success!",
        description: "Your subscription has been created. Redirecting to payment...",
      });

      setTimeout(() => {
        setLocation(`/checkout?assessment=${assessmentId}`);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process checkout. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-testid="heading-assessment-checkout">
            Your Personalized Digital Growth Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your Digital IQ Assessment results
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card data-testid="card-assessment-summary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Assessment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg" data-testid="text-business-name">{assessment.businessName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Digital IQ Score</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600" data-testid="text-digital-score">{assessment.digitalScore}</div>
                      <Badge variant="outline" data-testid="badge-grade">{assessment.grade}</Badge>
                    </div>
                  </div>
                  <Separator />
                  <p className="text-gray-700 dark:text-gray-300" data-testid="text-summary">{assessment.analysisResults.summary}</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-recommended-apps">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Recommended Apps for Your Business
                </CardTitle>
                <CardDescription>
                  Select the apps you'd like to include in your plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No recommendations available</p>
                  </div>
                ) : (
                  recommendations.map((rec) => {
                    const badge = getPriorityBadge(rec.priority);
                    const isSelected = selectedProducts.includes(rec.productId);
                    const price = rec.diyPrice;

                    return (
                      <div
                        key={rec.productId}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => toggleProduct(rec.productId)}
                        data-testid={`product-${rec.productId}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleProduct(rec.productId)}
                            data-testid={`checkbox-product-${rec.productId}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold" data-testid={`text-product-name-${rec.productId}`}>{rec.productName}</h4>
                              <Badge variant={badge.variant as any} data-testid={`badge-priority-${rec.productId}`}>{badge.label}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2" data-testid={`text-reason-${rec.productId}`}>{rec.reason}</p>
                            {price && (
                              <p className="text-sm font-semibold text-blue-600" data-testid={`text-price-${rec.productId}`}>
                                ${price}/month
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-pathway-selection">
              <CardHeader>
                <CardTitle>Choose Your Implementation Path</CardTitle>
                <CardDescription>
                  How would you like to implement these solutions?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={pathway} onValueChange={(value: any) => setPathway(value)}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" data-testid="radio-diy">
                      <RadioGroupItem value="diy" id="diy" data-testid="input-pathway-diy" />
                      <Label htmlFor="diy" className="cursor-pointer flex-1">
                        <div>
                          <h4 className="font-semibold">Do It Yourself (DIY)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Lower cost, you manage everything
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" data-testid="radio-msp">
                      <RadioGroupItem value="msp" id="msp" data-testid="input-pathway-msp" />
                      <Label htmlFor="msp" className="cursor-pointer flex-1">
                        <div>
                          <h4 className="font-semibold">Managed Services Provided (MSP)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We handle everything for you
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" data-testid="radio-combination">
                      <RadioGroupItem value="combination" id="combination" data-testid="input-pathway-combination" />
                      <Label htmlFor="combination" className="cursor-pointer flex-1">
                        <div>
                          <h4 className="font-semibold">Combination</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Mix of DIY and managed services
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4" data-testid="card-order-summary">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!pricing || selectedProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">Select apps to see pricing</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Pathway</span>
                        <span className="font-semibold capitalize" data-testid="text-selected-pathway">{pathway}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Apps Selected</span>
                        <span className="font-semibold" data-testid="text-apps-count">{selectedProducts.length}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2" data-testid="section-selected-apps">
                      {pricing.selectedAddons?.map((addon, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300" data-testid={`text-addon-name-${idx}`}>{addon.name}</span>
                          <span className="font-semibold" data-testid={`text-addon-price-${idx}`}>${addon.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="font-semibold" data-testid="text-subtotal">${pricing.subtotal.toFixed(2)}</span>
                      </div>
                      {pricing.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span data-testid="text-discount">-${pricing.discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-blue-600" data-testid="text-total">
                        ${pricing.total.toFixed(2)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
                      </span>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing || pricingLoading}
                      className="w-full"
                      size="lg"
                      data-testid="button-proceed-checkout"
                    >
                      {isProcessing ? "Processing..." : "Proceed to Checkout"}
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Billed {billingCycle}. Cancel anytime.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

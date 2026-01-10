import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Shield, 
  Zap, 
  BarChart3, 
  Lock, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  ArrowRight
} from "lucide-react";

const FULL_REPORT_PRICE = 10.00;

const reportFeatures = [
  {
    icon: Shield,
    title: "Security Analysis",
    description: "SSL certificates, HTTPS enforcement, security headers, vulnerability scanning"
  },
  {
    icon: Zap,
    title: "Performance Metrics",
    description: "Page load speeds, Core Web Vitals, server response times, optimization recommendations"
  },
  {
    icon: Globe,
    title: "SEO Audit",
    description: "Meta tags, structured data, crawlability, mobile-friendliness, search visibility"
  },
  {
    icon: BarChart3,
    title: "Competitive Benchmarks",
    description: "How your site compares to industry standards and top competitors"
  }
];

export default function SiteInspectorPurchasePage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const params = new URLSearchParams(searchString);
  const assessmentId = params.get('assessment');
  const cancelled = params.get('cancelled');

  useEffect(() => {
    if (cancelled === 'true') {
      toast({
        title: "Purchase Cancelled",
        description: "Your purchase was cancelled. You can try again whenever you're ready.",
        variant: "default"
      });
    }
  }, [cancelled]);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!assessmentId) return;

      try {
        const response = await fetch(`/api/assessments/${assessmentId}`);
        if (response.ok) {
          const data = await response.json();
          setAssessmentData(data);
        }
      } catch (error) {
        console.error("Failed to fetch assessment:", error);
      }
    };

    fetchAssessment();
  }, [assessmentId]);

  const handlePurchase = async () => {
    if (!assessmentId) {
      toast({
        title: "Error",
        description: "Assessment ID is required to purchase a full report.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/siteinspector/checkout', {
        assessmentId,
        email: assessmentData?.email
      });

      const data = await response.json();

      if (!data.success || !data.url) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  if (!assessmentId) {
    return (
      <div className="min-h-screen bg-[#EEFBFF]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Required</h2>
          <p className="text-gray-600 mb-6">
            To purchase a ScansBlue Full Report, you need to complete a Digital IQ Assessment first.
          </p>
          <Button onClick={() => setLocation('/assessment')} className="bg-[#0000FF] hover:bg-blue-700">
            Take Assessment
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEFBFF]">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <Badge className="bg-[#F97316] text-white mb-4">Unlock Full Analysis</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4 font-archivo">
            ScansBlue Full Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive 50+ point analysis of your website with actionable recommendations
            to improve security, performance, and search visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="border-2 border-[#0000FF]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-6 h-6 text-[#0000FF]" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  {reportFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#0000FF]/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-[#0000FF]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#09080E]">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-[#09080E]">You'll also receive:</h4>
                  <ul className="space-y-2">
                    {[
                      "Prioritized action items ranked by impact",
                      "Technical fixes with implementation guides",
                      "Comparison to industry benchmarks",
                      "PDF report for easy sharing with your team"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="border-2 border-[#0000FF] bg-white sticky top-4">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-[#09080E]">Full Report</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-[#0000FF]">${FULL_REPORT_PRICE.toFixed(2)}</span>
                  <span className="text-gray-500 ml-1">one-time</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessmentData?.websiteUrl && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Analyzing</p>
                    <p className="text-sm font-medium text-[#09080E] truncate">
                      {assessmentData.websiteUrl}
                    </p>
                  </div>
                )}

                <Button 
                  className="w-full bg-[#0000FF] hover:bg-blue-700 text-white py-6 text-lg"
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Get Full Report
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  Secure payment via Stripe
                </div>

                <Separator />

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>Delivered within 5 minutes to your email</p>
                  <p>100% satisfaction guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

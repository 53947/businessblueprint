import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  Mail, 
  Clock, 
  FileText,
  Loader2,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

export default function ScansBlueSuccessPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  const params = new URLSearchParams(searchString);
  const sessionId = params.get('session_id');
  const assessmentId = params.get('assessment');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerificationStatus('error');
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch(`/api/scansblue/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        if (data.success && data.paid) {
          setVerificationStatus('success');
          setCustomerEmail(data.customerEmail || '');
        } else {
          setVerificationStatus('error');
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus('error');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#EEFBFF]">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Loader2 className="w-16 h-16 mx-auto text-[#0000FF] mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your purchase.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#EEFBFF]">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Issue</h2>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. If you were charged, please contact support
            and we'll resolve this immediately.
          </p>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation(assessmentId ? `/scansblue/purchase?assessment=${assessmentId}` : '/assessment')}
            >
              Try Again
            </Button>
            <Button 
              className="bg-[#0000FF] hover:bg-blue-700"
              onClick={() => setLocation('/contact')}
            >
              Contact Support
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEFBFF]">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-2 border-green-200 bg-white">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-[#09080E]">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Thank you for purchasing the ScansBlue Full Report.
              </p>
            </div>

            <div className="bg-[#0000FF]/5 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-[#09080E] text-center">What happens next?</h3>
              
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0000FF]/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#0000FF]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#09080E]">Report Generation (2-5 minutes)</p>
                    <p className="text-sm text-gray-600">
                      Our advanced system is now analyzing your website across 50+ data points.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0000FF]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#0000FF]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#09080E]">Email Delivery</p>
                    <p className="text-sm text-gray-600">
                      Your full report will be sent to{' '}
                      {customerEmail ? (
                        <span className="font-medium">{customerEmail}</span>
                      ) : (
                        'your email address'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0000FF]/10 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#0000FF]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#09080E]">Detailed Analysis</p>
                    <p className="text-sm text-gray-600">
                      Review your comprehensive report with prioritized recommendations 
                      and implementation guides.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 mb-4">
                Check your inbox (and spam folder) in the next few minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setLocation(assessmentId ? `/dashboard?id=${assessmentId}` : '/find-results')}
                >
                  View Your Dashboard
                </Button>
                <Button 
                  className="bg-[#0000FF] hover:bg-blue-700"
                  onClick={() => setLocation('/')}
                >
                  Return Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? <button className="text-[#0000FF] underline" onClick={() => setLocation('/contact')}>Contact our support team</button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

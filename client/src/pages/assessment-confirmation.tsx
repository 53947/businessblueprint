import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Mail, ArrowRight, FileText } from 'lucide-react';

export default function AssessmentConfirmation() {
  const [, setLocation] = useLocation();
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem('lastAssessmentId');
    if (id) {
      setAssessmentId(id);
      sessionStorage.removeItem('lastAssessmentId');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header showNavigation={false} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8" data-testid="confirmation-header">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="text-confirmation-title">
            Assessment Received!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300" data-testid="text-confirmation-subtitle">
            We're analyzing your business right now
          </p>
          {assessmentId && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2" data-testid="text-assessment-id">
              Assessment ID: {assessmentId}
            </p>
          )}
        </div>

        <Card className="mb-8" data-testid="card-timeline">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              What Happens Next
            </CardTitle>
            <CardDescription>
              Your personalized business growth prescription will be ready soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4" data-testid="timeline-step-1">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Analysis (2-3 minutes)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI is analyzing your business using Google Business Intelligence and industry best practices to identify growth opportunities.
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="timeline-step-2">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Prescription Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A customized growth prescription with specific, actionable recommendations tailored to your business will be created.
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="timeline-step-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Expert Review & Delivery (within 24 hours)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team reviews the AI prescription to ensure quality and relevance, then delivers it to your client portal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" data-testid="card-email-notice">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Check Your Email</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We've sent a confirmation to your email address. You'll receive another notification when your prescription is ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => setLocation('/portal/assessments')}
            className="flex items-center gap-2"
            data-testid="button-view-status"
          >
            <FileText className="w-5 h-5" />
            View Assessment Status
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation('/portal/dashboard')}
            data-testid="button-view-dashboard"
          >
            Go to Dashboard
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Questions? Contact us at{' '}
            <a 
              href="mailto:support@businessblueprint.io" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              data-testid="link-support-email"
            >
              support@businessblueprint.io
            </a>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

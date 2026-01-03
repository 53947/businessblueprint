import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Mail, ArrowRight, FileText, Sparkles, Users } from 'lucide-react';

export default function AssessmentConfirmation() {
  const [, setLocation] = useLocation();
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem('lastAssessmentId');
    const name = sessionStorage.getItem('lastBusinessName');
    const emailAddr = sessionStorage.getItem('lastAssessmentEmail');
    
    if (id) {
      setAssessmentId(id);
    }
    if (name) {
      setBusinessName(name);
    }
    if (emailAddr) {
      setEmail(emailAddr);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header showNavigation={false} />
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Assessment Received!
          </h1>
          <p className="text-xl text-gray-600">
            We're analyzing {businessName ? `${businessName}'s` : 'your'} business right now
          </p>
          {assessmentId && (
            <p className="text-sm text-gray-500 mt-2" data-testid="text-assessment-id">
              Assessment ID: {assessmentId}
            </p>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              What Happens Next
            </CardTitle>
            <CardDescription>
              Your personalized Digital IQ prescription will be ready soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Analysis (2-3 minutes)</h3>
                <p className="text-gray-600">
                  Our AI is analyzing your business using Google Business Intelligence and industry best practices to calculate your Digital IQ Score.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Prescription Generation</h3>
                <p className="text-gray-600">
                  You'll receive a customized growth prescription with specific action items tailored to your business needs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Review & Delivery</h3>
                <p className="text-gray-600">
                  Our team reviews the AI prescription to ensure quality, then delivers it to your portal. You'll receive an email notification when it's ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Check Your Email</h3>
                <p className="text-gray-600">
                  We've sent a confirmation email to <strong>{email || 'your inbox'}</strong> with details about your assessment and next steps.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Don't see it? Check your spam folder or <a href="/find-results" className="text-blue-600 underline">look up your results by email</a>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => setLocation('/portal/assessments')}
            className="gap-2"
            data-testid="button-view-status"
          >
            <FileText className="w-5 h-5" />
            View Assessment Status
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setLocation('/')}
            data-testid="button-return-home"
          >
            Return to Home
          </Button>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Sparkles className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-gray-600">
                Our AI analyzes 50+ data points about your business's digital presence
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Custom Prescription</h3>
              <p className="text-sm text-gray-600">
                Get a tailored growth plan with prioritized action items for your business
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Expert Review</h3>
              <p className="text-sm text-gray-600">
                Our team reviews every prescription to ensure actionable, quality recommendations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { Search, FileSearch, ArrowRight, Clock, CheckCircle, AlertTriangle, Lock, UserPlus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { getDisplayScore } from "@shared/score-utils";

interface AssessmentResult {
  id: number;
  businessName: string;
  status: string;
  digitalScore: number | null;
  createdAt: string;
}

export default function FindResults() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AssessmentResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasValidToken, setHasValidToken] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Check for valid temporary access token on mount
  useEffect(() => {
    const checkTemporaryAccess = async () => {
      const token = sessionStorage.getItem('assessmentAccessToken');
      const expiryStr = sessionStorage.getItem('assessmentAccessExpiry');
      const assessmentId = sessionStorage.getItem('assessmentId');
      
      if (token && expiryStr && assessmentId) {
        const expiry = parseInt(expiryStr, 10);
        
        if (Date.now() < expiry) {
          // Token is still valid - fetch assessment data
          setHasValidToken(true);
          try {
            const response = await fetch(`/api/assessments/${assessmentId}`);
            if (response.ok) {
              const data = await response.json();
              // API returns { assessment: {...}, recommendations: [...] }
              const assessment = data.assessment;
              if (assessment) {
                setResults([{
                  id: assessment.id,
                  businessName: assessment.businessName || 'Unknown Business',
                  status: assessment.status || 'pending',
                  digitalScore: assessment.digitalScore,
                  createdAt: assessment.createdAt
                }]);
              }
            }
          } catch (err) {
            console.error('Error fetching assessment:', err);
          }
        } else {
          // Token expired - clear sessionStorage and show login prompt
          sessionStorage.removeItem('assessmentAccessToken');
          sessionStorage.removeItem('assessmentAccessExpiry');
          sessionStorage.removeItem('assessmentId');
          setTokenExpired(true);
        }
      }
      
      setIsCheckingToken(false);
    };
    
    checkTemporaryAccess();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/assessments/lookup?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "No assessments found for this email.");
        return;
      }

      if (data.assessments && data.assessments.length > 0) {
        setResults(data.assessments);
      } else {
        setError("No assessments found for this email address. If you just submitted one, please wait a few minutes and try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string, score: number | null) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Score: {score ? getDisplayScore(score) : "N/A"}
          </span>
        );
      case "analyzing":
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Clock className="w-4 h-4 mr-1" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show loading state while checking token
  if (isCheckingToken) {
    return (
      <div className="min-h-screen bg-[#E9ECF0] flex flex-col">
        <Header />
        <main className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading your assessment...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9ECF0] flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Token Expired - Show Login Prompt */}
          {tokenExpired && (
            <div className="mb-8">
              <Card className="shadow-lg border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Lock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-token-expired">
                      Your Temporary Access Has Expired
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Your 15-minute viewing window has ended. Create an account or log in to access your assessment results anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        size="lg"
                        onClick={() => setLocation('/auth/signup')}
                        className="flex items-center gap-2"
                        data-testid="button-create-account"
                      >
                        <UserPlus className="w-5 h-5" />
                        Create Account
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setLocation('/auth/login')}
                        data-testid="button-login"
                      >
                        Log In
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Valid Token - Show Results Directly */}
          {hasValidToken && results && results.length > 0 && (
            <div className="mb-8">
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-assessment-found">
                  Your Assessment Results
                </h1>
                <p className="text-gray-600">
                  Your assessment results are ready. Create a free account to access your full prescription and track improvements over time.
                </p>
              </div>
            </div>
          )}

          {/* Standard Search UI (when no token or searching manually) */}
          {!hasValidToken && (
            <>
              <div className="text-center mb-8">
                <FileSearch className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Find Your Assessment Results
                </h1>
                <p className="text-gray-600">
                  Enter the email address you used when submitting your Digital IQ Assessment.
                </p>
              </div>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                          data-testid="input-lookup-email"
                        />
                        <Button 
                          type="submit" 
                          disabled={isSearching || !email.trim()}
                          data-testid="btn-lookup-submit"
                        >
                          {isSearching ? (
                            <>
                              <Clock className="w-4 h-4 mr-2 animate-spin" />
                              Searching...
                            </>
                          ) : (
                            <>
                              <Search className="w-4 h-4 mr-2" />
                              Find Results
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>

                  {error && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-yellow-800">{error}</p>
                          <p className="text-sm text-yellow-700 mt-2">
                            Haven't taken the assessment yet?{" "}
                            <a href="/assessment" className="underline font-medium">
                              Start your free Digital IQ Assessment
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Results Display - shown for both token-based and manual search */}
          {results && results.length > 0 && (
            <Card className="shadow-lg mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Assessments:</h3>
                <div className="space-y-4">
                  {results.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                      data-testid={`assessment-result-${assessment.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {assessment.businessName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Submitted: {formatDate(assessment.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(assessment.status, assessment.digitalScore)}
                          <Button
                            size="sm"
                            onClick={() => window.location.href = `/dashboard/${assessment.id}`}
                            data-testid={`btn-view-assessment-${assessment.id}`}
                          >
                            View
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Prompt to create account if using temporary token */}
                {hasValidToken && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <UserPlus className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-blue-800 font-medium">Save your results permanently</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Create an account to access your assessment results anytime.
                        </p>
                        <Button
                          size="sm"
                          className="mt-3"
                          onClick={() => setLocation('/auth/signup')}
                          data-testid="button-create-account-prompt"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Need help?{" "}
              <a href="/contact" className="text-blue-600 underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

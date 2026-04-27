import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { Search, ArrowRight, AlertTriangle, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { getDisplayScore, getScoreLabel, getScoreColor } from "@shared/score-utils";
const coachBlueIcon = "https://cdn.triadblue.com/brands/coachblue/logo-image.png";

const APP_COLORS: Record<string, string> = {
  promote: '#1844A6',
  respond: '#001882',
  engage: '#660099',
  post: '#FF44CC',
  publish: '#064A6C',
  elevate: '#E9B307',
  optimize: '#374151',
  amplify: '#97ACCA',
  connect: '#008060',
};

interface Recommendation {
  appId?: string;
  category?: string;
  title: string;
  description: string;
  priority: string;
  estimatedPointIncrease?: number;
  estimatedMinutes?: number;
  estimatedImpact?: string;
  estimatedEffort?: string;
}

interface AnalysisResults {
  strengthsNarrative?: string;
  prescriptionNarrative?: string;
  recommendations?: Recommendation[];
  projectedScore?: number;
}

interface Assessment {
  id: number;
  businessName: string;
  industry?: string;
  status: string;
  digitalScore: number | null;
  analysisResults?: AnalysisResults;
  createdAt: string;
}

interface AssessmentResponse {
  assessment: Assessment;
  recommendations: Recommendation[];
}

function GridPaper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="results-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 30 0" fill="none" stroke="#064A6C" strokeWidth="0.5"/>
              <path d="M 0 0 L 0 30" fill="none" stroke="#064A6C" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#results-grid)" />
        </svg>
      </div>
      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">
        {children}
      </div>
    </div>
  );
}

function ScoreDisplay({ rawScore }: { rawScore: number }) {
  const display = getDisplayScore(rawScore);
  const label = getScoreLabel(display);
  const color = getScoreColor(display);
  const pct = ((display - 70) / 70) * 100;

  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-5xl font-bold" style={{ color }}>{display}</span>
        <span className="text-gray-400 text-sm">out of 140</span>
      </div>
      <p className="text-lg font-semibold mb-3" style={{ color }}>{label}</p>
      <div className="w-full max-w-md bg-gray-100 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all"
          style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between max-w-md text-xs text-gray-400 mt-1">
        <span>70</span>
        <span>140</span>
      </div>
    </div>
  );
}

function NarrativeSection({ title, text }: { title: string; text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4" style={{ color: '#064A6C' }}>{title}</h3>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed whitespace-pre-line">{p.trim()}</p>
        ))}
      </div>
    </div>
  );
}

function ActionItems({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#064A6C' }}>Your Action Items</h3>
      <p className="text-sm text-gray-500 mb-6">Each action below includes an estimated Digital IQ point increase.</p>
      <div className="space-y-0">
        {recommendations.map((rec, i) => {
          const appColor = (rec.appId && APP_COLORS[rec.appId]) || '#374151';
          return (
            <div key={i} className="py-4 border-l-2 pl-4" style={{ borderLeftColor: appColor }}>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-semibold text-sm mt-0.5 flex-shrink-0 w-6 text-right">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: appColor }} />
                    <span className="font-semibold text-gray-900">{rec.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{rec.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    {rec.estimatedPointIncrease != null && (
                      <span>est. <strong className="text-gray-600">+{rec.estimatedPointIncrease} pts</strong></span>
                    )}
                    {rec.estimatedMinutes != null && (
                      <span>~{rec.estimatedMinutes} min</span>
                    )}
                  </div>
                </div>
              </div>
              {i < recommendations.length - 1 && (
                <div className="mt-4 border-b border-gray-100 ml-9" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LegacyRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...recommendations].sort((a, b) => {
    const aP = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 3;
    const bP = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 3;
    return aP - bP;
  });

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#064A6C' }}>Your Recommendations</h3>
      <p className="text-sm text-gray-500 mb-6">Prioritized actions to improve your online presence.</p>
      <div className="space-y-4">
        {sorted.map((rec, i) => {
          const priorityColor = rec.priority === 'high' ? '#E00420' : rec.priority === 'medium' ? '#E9B307' : '#008060';
          return (
            <div key={i} className="py-4 border-l-2 pl-4" style={{ borderLeftColor: priorityColor }}>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-semibold text-sm mt-0.5 flex-shrink-0 w-6 text-right">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-900">{rec.title}</span>
                  {rec.category && <span className="text-xs text-gray-400 ml-2">({rec.category})</span>}
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">{rec.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IQSummary({ rawScore, recommendations, projectedScore }: { rawScore: number; recommendations: Recommendation[]; projectedScore?: number }) {
  const display = getDisplayScore(rawScore);
  const color = getScoreColor(display);
  const totalPoints = recommendations.reduce((sum, r) => sum + (r.estimatedPointIncrease || 0), 0);

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-semibold mb-4" style={{ color: '#064A6C' }}>Your Digital IQ Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
          <p className="text-3xl font-bold" style={{ color }}>{display}</p>
          <p className="text-xs text-gray-500 mt-1">Current Score</p>
        </div>
        {totalPoints > 0 && (
          <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
            <p className="text-3xl font-bold text-green-600">+{totalPoints}</p>
            <p className="text-xs text-gray-500 mt-1">Estimated Point Increase</p>
          </div>
        )}
        {projectedScore != null && (
          <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
            <p className="text-3xl font-bold" style={{ color: getScoreColor(getDisplayScore(projectedScore)) }}>
              {getDisplayScore(projectedScore)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Projected Score</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PrescriptionDisplay({ data }: { data: AssessmentResponse }) {
  const { assessment, recommendations: legacyRecs } = data;
  const analysis = assessment.analysisResults;
  const hasNarratives = analysis?.strengthsNarrative && analysis?.prescriptionNarrative;
  const actionRecs = analysis?.recommendations || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <GridPaper>
      {/* 4A: Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Archivo_Semi_Expanded',sans-serif]" style={{ color: '#09080E' }}>
          Your Digital Prescription
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {assessment.businessName}{assessment.industry ? ` — ${assessment.industry}` : ''}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Assessed {formatDate(assessment.createdAt)}
        </p>
      </div>

      {/* 4B: Score */}
      {assessment.digitalScore != null && (
        <ScoreDisplay rawScore={assessment.digitalScore} />
      )}

      {/* 4C: Strengths */}
      {hasNarratives && analysis!.strengthsNarrative && (
        <NarrativeSection title="What You're Doing Right" text={analysis!.strengthsNarrative} />
      )}

      {/* 4D: Prescription */}
      {hasNarratives && analysis!.prescriptionNarrative && (
        <NarrativeSection title="Your Prescription" text={analysis!.prescriptionNarrative} />
      )}

      {/* 4E: Action Items (modern) or Legacy Recommendations */}
      {actionRecs.length > 0 ? (
        <ActionItems recommendations={actionRecs} />
      ) : legacyRecs.length > 0 ? (
        <LegacyRecommendations recommendations={legacyRecs} />
      ) : null}

      {/* 4F: IQ Summary */}
      {assessment.digitalScore != null && (
        <IQSummary
          rawScore={assessment.digitalScore}
          recommendations={actionRecs}
          projectedScore={analysis?.projectedScore}
        />
      )}
    </GridPaper>
  );
}

function ConversionCTA() {
  const [, setLocation] = useLocation();
  return (
    <>
      {/* CTA */}
      <div className="mt-8 text-center px-4">
        <h2 className="text-2xl font-bold text-[#09080E] mb-3">
          Ready to Start?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          Create your free account to access your personalized Directions for Use —
          step-by-step setup tasks with suggested timelines, built from this prescription.
          Your action items are ready to go.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => setLocation('/auth/signup')}
            className="text-white px-8 py-3 text-lg"
            style={{ backgroundColor: '#008060' }}
          >
            Create Your Free Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation('/auth/login')}
            className="px-8 py-3 text-lg"
          >
            Already Have an Account? Log In
          </Button>
        </div>
      </div>

      {/* Coach Blue Teaser */}
      <div className="mt-6 mb-12 max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200">
          <img
            src={coachBlueIcon}
            alt="Coach Blue"
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div>
            <p className="font-semibold text-[#09080E]">Coach Blue</p>
            <p className="text-sm text-gray-600">
              Your AI business coach is ready to walk you through every step of your prescription.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ExpiredState() {
  const [, setLocation] = useLocation();
  return (
    <div className="text-center py-16 px-4">
      <h2 className="text-2xl font-bold text-[#09080E] mb-3">
        Your Assessment Results Are Saved
      </h2>
      <p className="text-gray-600 max-w-lg mx-auto mb-6">
        Create a free account to access your full prescription, Directions for Use,
        and track your Digital IQ improvements over time.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={() => setLocation('/auth/signup')} className="text-white" style={{ backgroundColor: '#008060' }}>
          Create Your Free Account
        </Button>
        <Button size="lg" variant="outline" onClick={() => setLocation('/auth/login')}>
          Log In
        </Button>
      </div>
    </div>
  );
}

function ProcessingState() {
  return (
    <GridPaper>
      <div className="text-center py-12">
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-spin" />
        <h2 className="text-2xl font-bold text-[#09080E] mb-2">
          Your Assessment Is Being Prepared
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Our AI is scanning your online presence and analyzing your business operations. This usually takes 2-3 minutes.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          We'll update this page automatically when your prescription is ready.
        </p>
      </div>
    </GridPaper>
  );
}

export default function FindResults() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [assessmentData, setAssessmentData] = useState<AssessmentResponse | null>(null);
  const [assessmentList, setAssessmentList] = useState<{ id: number; businessName: string; status: string; digitalScore: number | null; createdAt: string }[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const fetchAssessment = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/assessments/${id}`);
      if (response.ok) {
        const data: AssessmentResponse = await response.json();
        setAssessmentData(data);
        setSelectedId(id);
        return data;
      }
    } catch (err) {
      console.error('Error fetching assessment:', err);
    }
    return null;
  }, []);

  // Check for token on mount
  useEffect(() => {
    const init = async () => {
      const token = sessionStorage.getItem('assessmentAccessToken');
      const expiryStr = sessionStorage.getItem('assessmentAccessExpiry');
      const assessmentId = sessionStorage.getItem('assessmentId');

      if (token && expiryStr && assessmentId) {
        const expiry = parseInt(expiryStr, 10);
        if (Date.now() < expiry) {
          await fetchAssessment(parseInt(assessmentId, 10));
        } else {
          sessionStorage.removeItem('assessmentAccessToken');
          sessionStorage.removeItem('assessmentAccessExpiry');
          sessionStorage.removeItem('assessmentId');
          setTokenExpired(true);
        }
      }
      setIsLoading(false);
    };
    init();
  }, [fetchAssessment]);

  // Poll for in-progress assessments
  useEffect(() => {
    if (!assessmentData || assessmentData.assessment.status === 'completed') return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/assessments/${assessmentData.assessment.id}`);
        if (response.ok) {
          const data: AssessmentResponse = await response.json();
          if (data.assessment.status === 'completed') {
            setAssessmentData(data);
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [assessmentData]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSearching(true);
    setError(null);
    setAssessmentList(null);
    setAssessmentData(null);
    setSelectedId(null);

    try {
      const response = await fetch(`/api/assessments/lookup?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "No assessments found for this email.");
        return;
      }

      if (data.assessments && data.assessments.length > 0) {
        if (data.assessments.length === 1) {
          // Single result — fetch full data directly
          await fetchAssessment(data.assessments[0].id);
        } else {
          // Multiple results — show picker
          setAssessmentList(data.assessments);
        }
      } else {
        setError("No assessments found for this email address. If you just submitted one, please wait a few minutes and try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectAssessment = async (id: number) => {
    await fetchAssessment(id);
  };

  // Loading while checking token
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E9ECF0] flex flex-col">
        <Header showNavigation={false} />
        <main className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <GridPaper>
              <div className="text-center py-12">
                <Loader2 className="w-10 h-10 mx-auto mb-4 text-gray-400 animate-spin" />
                <p className="text-gray-600">Preparing your prescription...</p>
              </div>
            </GridPaper>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Full assessment loaded — decide what to render
  const showPrescription = assessmentData && assessmentData.assessment.status === 'completed';
  const showProcessing = assessmentData && assessmentData.assessment.status !== 'completed';
  const showEmailLookup = !assessmentData && !tokenExpired;

  return (
    <div className="min-h-screen bg-[#E9ECF0] flex flex-col">
      <Header showNavigation={false} />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Token expired */}
          {tokenExpired && !assessmentData && <ExpiredState />}

          {/* Assessment still processing */}
          {showProcessing && <ProcessingState />}

          {/* Full prescription */}
          {showPrescription && (
            <>
              <PrescriptionDisplay data={assessmentData!} />
              <ConversionCTA />
            </>
          )}

          {/* Email lookup form */}
          {showEmailLookup && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#09080E] mb-2">
                  Find Your Assessment Results
                </h1>
                <p className="text-gray-600">
                  Enter the email you used when taking your Digital IQ Assessment.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
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
                      />
                      <Button
                        type="submit"
                        disabled={isSearching || !email.trim()}
                      >
                        {isSearching ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
              </div>

              {/* Multiple results picker */}
              {assessmentList && assessmentList.length > 1 && !selectedId && (
                <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-[#09080E] mb-4">Multiple assessments found — select one:</h3>
                  <div className="space-y-3">
                    {assessmentList.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelectAssessment(a.id)}
                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#064A6C] hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{a.businessName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                          {a.status === 'completed' && a.digitalScore != null && (
                            <span className="text-lg font-bold" style={{ color: getScoreColor(getDisplayScore(a.digitalScore)) }}>
                              {getDisplayScore(a.digitalScore)}
                            </span>
                          )}
                          {a.status !== 'completed' && (
                            <span className="text-sm text-gray-400">In progress</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Need help?{" "}
              <a href="/contact" className="text-[#064A6C] underline">
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

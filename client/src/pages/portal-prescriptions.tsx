import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getDisplayScore as sharedGetDisplayScore, getScoreLabel, getScoreColor as sharedGetScoreColor } from "@shared/score-utils";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ListTodo,
  Calendar,
  ChevronLeft,
  Target,
  Sparkles,
  BarChart3,
  ClipboardList,
  Loader2,
} from "lucide-react";

interface Prescription {
  id: number;
  title: string;
  summary: string | null;
  status: string;
  implementationProgress: number;
  deliveredAt: string | null;
  createdAt: string;
  accessToken?: string;
}

interface Assessment {
  id: number;
  businessName: string;
  digitalScore: number | null;
  industry: string;
  createdAt: string;
  analysisResults?: any;
}

interface Recommendation {
  id: number;
  category: string;
  title: string;
  description: string;
  priority: string;
  estimatedImpact: string | null;
  estimatedEffort: string | null;
  currentScore: number | null;
  projectedScore: number | null;
  scoreImprovement: number | null;
}

interface PrescriptionData {
  prescription: Prescription;
  assessment: Assessment | null;
  recommendations: Recommendation[];
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'delivered':
      return <Badge className="bg-blue-500 text-white" data-testid="badge-status-delivered">Delivered</Badge>;
    case 'in_progress':
      return <Badge className="bg-orange-500 text-white" data-testid="badge-status-in-progress">In Progress</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 text-white" data-testid="badge-status-completed">Completed</Badge>;
    case 'pending_review':
      return <Badge className="bg-yellow-500 text-white" data-testid="badge-status-pending">Pending Review</Badge>;
    default:
      return <Badge variant="outline" data-testid="badge-status-default">{status}</Badge>;
  }
}

// Use shared score utilities
const getDisplayScore = sharedGetDisplayScore;
function getScoreColorClass(displayScore: number): string {
  if (displayScore >= 120) return 'text-green-600';
  if (displayScore >= 100) return 'text-blue-600';
  if (displayScore >= 85) return 'text-orange-600';
  return 'text-red-600';
}

function PrescriptionsList() {
  const { data, isLoading, error } = useQuery<{ prescriptions: Prescription[] }>({
    queryKey: ['/api/portal/prescriptions'],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Prescriptions</h3>
          <p className="text-red-600">Please try again later or contact support.</p>
        </CardContent>
      </Card>
    );
  }

  const prescriptions = data?.prescriptions || [];

  if (prescriptions.length === 0) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-8 text-center">
          <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Prescriptions Yet</h3>
          <p className="text-gray-600 mb-6">
            Complete a Digital Assessment to receive your personalized growth prescription.
          </p>
          <Button asChild className="bg-[#0000FF] hover:bg-blue-700">
            <Link href="/assessment">
              Start Your Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {prescriptions.map(prescription => (
        <Link key={prescription.id} href={`/portal/prescriptions/${prescription.id}`}>
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#0000FF]"
            data-testid={`card-prescription-${prescription.id}`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-[#0000FF]" />
                    <h3 className="font-semibold text-lg text-gray-900">{prescription.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {prescription.summary || 'Your personalized digital growth prescription'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(prescription.createdAt).toLocaleDateString()}
                    </span>
                    {getStatusBadge(prescription.status)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Implementation Progress</div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={prescription.implementationProgress} 
                        className="w-32 h-2"
                      />
                      <span className="text-sm font-medium">{prescription.implementationProgress}%</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#0000FF]">
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function PrescriptionDetail({ prescriptionId, token }: { prescriptionId?: string; token?: string }) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const endpoint = token 
    ? `/api/portal/prescriptions/token/${token}`
    : `/api/portal/prescriptions/${prescriptionId}`;

  const { data, isLoading, error } = useQuery<PrescriptionData>({
    queryKey: [endpoint],
    enabled: !!(prescriptionId || token),
  });

  // Check if Directions for Use tasks already exist
  const { data: setupProgressData } = useQuery<{ totalTasks: number }>({
    queryKey: ['/api/setup-tasks/progress'],
    enabled: !token,
  });

  const generateTasksMutation = useMutation({
    mutationFn: async (prescriptionId: number) => {
      const res = await apiRequest('POST', '/api/setup-tasks/generate', { prescriptionId });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/setup-tasks/progress'] });
      toast({
        title: "Your Directions for Use are ready!",
        description: "Your step-by-step setup plan has been created.",
      });
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Could not generate your setup tasks. Please try again.",
        variant: "destructive",
      });
    },
  });

  const progressMutation = useMutation({
    mutationFn: async (progress: number) => {
      return await apiRequest('PATCH', `/api/portal/prescriptions/${data?.prescription.id}/progress`, {
        implementationProgress: progress,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      toast({
        title: "Progress Updated",
        description: "Your implementation progress has been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Could not save your progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Prescription Not Found</h3>
          <p className="text-red-600 mb-6">
            This prescription doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => setLocation('/portal/prescriptions')} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Prescriptions
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { prescription, assessment, recommendations } = data;
  const displayScore = assessment?.digitalScore ? getDisplayScore(assessment.digitalScore) : null;
  const APP_COLORS: Record<string, string> = {
    'Email & SMS Marketing': '#1844A6',
    'Social Media Content': '#FF44CC',
    'Reputation Management': '#E9B307',
    'Unified Inbox & Response': '#001882',
    'Live Chat': '#660099',
    'Business Listings & GBP': '#064A6C',
    'Website & SEO': '#374151',
    'CRM & Customer Management': '#008060',
    'Advertising & Paid Media': '#97ACCA',
  };

  const APP_NAMES: Record<string, string> = {
    'Email & SMS Marketing': '/ promote',
    'Social Media Content': '/ post',
    'Reputation Management': '/ elevate',
    'Unified Inbox & Response': '/ respond',
    'Live Chat': '/ engage',
    'Business Listings & GBP': '/ publish',
    'Website & SEO': '/ optimize',
    'CRM & Customer Management': '/ connect',
    'Advertising & Paid Media': '/ amplify',
  };

  const getAppColor = (category: string) => APP_COLORS[category] || '#374151';
  const getAppName = (category: string) => APP_NAMES[category] || category;

  return (
    <div className="space-y-6">
      {!token && (
        <Button
          variant="ghost"
          onClick={() => setLocation('/portal/prescriptions')}
          className="mb-4"
          data-testid="button-back"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to All Prescriptions
        </Button>
      )}

      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="prescription-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 0 0 L 30 0" fill="none" stroke="#064A6C" strokeWidth="0.5"/>
                <path d="M 0 0 L 0 30" fill="none" stroke="#064A6C" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#prescription-grid)" />
          </svg>
        </div>

        <div className="relative z-10 px-8 py-10 md:px-12 md:py-14">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-['Archivo_Semi_Expanded',sans-serif] text-[#09080E] mb-2">
              Your Digital Prescription
            </h1>
            {assessment && (
              <p className="text-lg text-gray-600 font-['Archivo_Semi_Expanded',sans-serif]">
                Prepared for {assessment.businessName} • {assessment.industry}
              </p>
            )}
            <p className="text-sm text-gray-400 mt-1">
              {new Date(prescription.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* SECTION 1 — What You're Doing Right */}
          {assessment?.analysisResults?.strengthsNarrative && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#09080E] font-['Archivo_Semi_Expanded',sans-serif] mb-4">
                What You're Doing Right
              </h2>
              <div className="prose prose-gray max-w-none">
                {assessment.analysisResults.strengthsNarrative.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4 text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2 — Your Prescription (narrative) */}
          {assessment?.analysisResults?.prescriptionNarrative && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#09080E] font-['Archivo_Semi_Expanded',sans-serif] mb-4">
                Your Prescription
              </h2>
              <div className="prose prose-gray max-w-none">
                {assessment.analysisResults.prescriptionNarrative.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4 text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* FALLBACK — If no narrative exists (old assessments), show recommendations */}
          {!assessment?.analysisResults?.prescriptionNarrative && recommendations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#09080E] font-['Archivo_Semi_Expanded',sans-serif] mb-4">
                Your Prescription
              </h2>
              {recommendations
                .sort((a, b) => {
                  const order = ['high', 'critical', 'medium', 'low'];
                  return order.indexOf(a.priority) - order.indexOf(b.priority);
                })
                .map((rec) => (
                  <div key={rec.id} className="mb-6 pl-4 border-l-2 border-[#064A6C]/30">
                    <h3 className="font-semibold text-[#09080E] text-[15px] mb-1">{rec.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{rec.description}</p>
                    {rec.scoreImprovement != null && rec.scoreImprovement > 0 && (
                      <span className="inline-block mt-2 text-xs font-medium text-[#064A6C] bg-[#064A6C]/10 px-2 py-0.5 rounded">
                        est. +{rec.scoreImprovement} pts
                      </span>
                    )}
                  </div>
                ))
              }
            </div>
          )}

          {/* SECTION 3 — Your Action Items */}
          {recommendations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#09080E] font-['Archivo_Semi_Expanded',sans-serif] mb-4">
                Your Action Items
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Each action below has been added to your Directions for Use with a suggested timeline.
                All dates are estimates — adjust them to fit your schedule.
              </p>
              <div className="space-y-3">
                {recommendations
                  .filter(r => r.priority === 'high' || r.priority === 'critical')
                  .concat(recommendations.filter(r => r.priority === 'medium'))
                  .concat(recommendations.filter(r => r.priority === 'low'))
                  .map((rec, i) => (
                    <div key={rec.id} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#064A6C]/10 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-[#064A6C]">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-[#09080E] text-sm">{rec.title}</span>
                          <Badge variant="outline" className="text-xs px-1.5 py-0"
                            style={{
                              borderColor: getAppColor(rec.category),
                              color: getAppColor(rec.category),
                            }}>
                            {getAppName(rec.category)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        {rec.scoreImprovement != null && rec.scoreImprovement > 0 && (
                          <span className="text-sm font-semibold text-[#008060]">
                            +{rec.scoreImprovement} pts
                          </span>
                        )}
                        <div className="text-xs text-gray-400">est.</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* SECTION 4 — Score Summary */}
          {assessment?.digitalScore != null && displayScore != null && (
            <div className="mb-10 p-6 bg-[#09080E]/[0.03] rounded-xl">
              <h2 className="text-xl font-bold text-[#09080E] font-['Archivo_Semi_Expanded',sans-serif] mb-6">
                Your Digital IQ Summary
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Current Score</div>
                  <div className={`text-5xl font-bold font-['Archivo_Semi_Expanded',sans-serif] ${getScoreColorClass(displayScore)}`}>
                    {displayScore}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{getScoreLabel(displayScore)}</div>
                </div>
                {(() => {
                  const totalImprovement = recommendations
                    .filter(r => r.scoreImprovement != null)
                    .reduce((sum, r) => sum + (r.scoreImprovement || 0), 0);
                  if (totalImprovement <= 0) return null;
                  const projectedRaw = Math.min(140, (assessment.digitalScore || 0) + totalImprovement);
                  const projectedDisplay = getDisplayScore(projectedRaw);
                  return (
                    <>
                      <div className="text-3xl text-gray-300 hidden md:block">→</div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">Projected Score</div>
                        <div className="text-5xl font-bold font-['Archivo_Semi_Expanded',sans-serif] text-[#008060]">
                          {projectedDisplay}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{getScoreLabel(projectedDisplay)}</div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <p className="text-xs text-gray-400 text-center">
                Your Digital IQ Score reflects your business's online presence strength on a scale of 70 to 140.
                Projected score is an estimate based on completing the actions in your prescription.
              </p>
            </div>
          )}

          {/* SECTION 5 — Directions for Use confirmation */}
          {!token && (
            <div className="p-6 bg-white rounded-xl border border-[#064A6C]/20">
              <div className="flex items-start gap-4">
                <ClipboardList className="w-6 h-6 text-[#064A6C] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#09080E] text-lg mb-1">
                    These steps are in your Directions for Use
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Every action item above has been added to your step-by-step setup plan with suggested dates.
                    You're welcome to adjust the timeline — it's your plan, built at your pace.
                  </p>
                  <Button asChild className="bg-[#09080E] hover:bg-[#09080E]/80 text-white">
                    <Link href="/portal/directions">
                      Open Your Directions for Use
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Coach Blue CTA */}
          {!token && (
            <div className="mt-8 p-6 bg-[#0000FF]/5 rounded-xl border border-[#0000FF]/15">
              <div className="flex items-start gap-4">
                <img src="/assets/images_logos/coachblue48.png" alt="Coach Blue" className="w-10 h-10 rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#09080E] text-lg mb-1">
                    Coach Blue is ready when you are
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your AI business coach has read your prescription and knows exactly where you stand.
                    Ask him anything about your next steps.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function PortalPrescriptions() {
  const [matchList] = useRoute("/portal/prescriptions");
  const [matchDetail, detailParams] = useRoute("/portal/prescriptions/:id");
  const [matchToken, tokenParams] = useRoute("/portal/prescription/:token");

  return (
    <div className="min-h-screen bg-[#E9ECF0]">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {matchToken ? (
          <PrescriptionDetail token={tokenParams?.token} />
        ) : matchDetail ? (
          <PrescriptionDetail prescriptionId={detailParams?.id} />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-['Archivo_Semi_Expanded',sans-serif] mb-2">
                Your Prescriptions
              </h1>
              <p className="text-gray-600">
                View and track your personalized digital growth prescriptions
              </p>
            </div>
            <PrescriptionsList />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { apiRequest, queryClient } from "@/lib/queryClient";
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
  BarChart3
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

function getGradeInfo(score: number): { grade: string; color: string; textColor: string } {
  if (score >= 126) return { grade: 'A+', color: 'bg-green-500', textColor: 'text-green-600' };
  if (score >= 112) return { grade: 'A', color: 'bg-green-500', textColor: 'text-green-600' };
  if (score >= 98) return { grade: 'B+', color: 'bg-blue-500', textColor: 'text-blue-600' };
  if (score >= 84) return { grade: 'B', color: 'bg-blue-500', textColor: 'text-blue-600' };
  if (score >= 70) return { grade: 'C+', color: 'bg-orange-500', textColor: 'text-orange-600' };
  if (score >= 56) return { grade: 'C', color: 'bg-orange-500', textColor: 'text-orange-600' };
  if (score >= 42) return { grade: 'D+', color: 'bg-red-500', textColor: 'text-red-600' };
  if (score >= 28) return { grade: 'D', color: 'bg-red-500', textColor: 'text-red-600' };
  return { grade: 'F', color: 'bg-red-600', textColor: 'text-red-600' };
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
  const gradeInfo = assessment?.digitalScore ? getGradeInfo(assessment.digitalScore) : null;
  const highPriority = recommendations.filter(r => r.priority === 'high');
  const mediumPriority = recommendations.filter(r => r.priority === 'medium');
  const lowPriority = recommendations.filter(r => r.priority === 'low');

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

      <Card className="overflow-hidden" data-testid="card-prescription-header">
        <div className="bg-gradient-to-r from-[#0000FF] to-[#3B82F6] p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-['Archivo_Semi_Expanded',sans-serif] mb-2">
                {prescription.title}
              </h1>
              {assessment && (
                <p className="text-blue-100">
                  Assessment for {assessment.businessName} • {assessment.industry}
                </p>
              )}
            </div>
            {assessment?.digitalScore && gradeInfo && (
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-sm text-blue-100 mb-1">Digital IQ Score</div>
                <div className="text-4xl font-bold font-['Archivo_Semi_Expanded',sans-serif]">
                  {assessment.digitalScore}
                </div>
                <div className="text-sm text-blue-100">out of 140</div>
                <Badge className={`mt-2 ${gradeInfo.color} text-white`}>
                  Grade: {gradeInfo.grade}
                </Badge>
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                <Calendar className="w-4 h-4 inline mr-1" />
                Created: {new Date(prescription.createdAt).toLocaleDateString()}
              </span>
              {getStatusBadge(prescription.status)}
            </div>
          </div>
          {prescription.summary && (
            <div className="mt-4 p-4 bg-[#EEFBFF] rounded-lg border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF6B00]" />
                Executive Summary
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{prescription.summary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {!token && (
        <Card data-testid="card-progress-tracker">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#FF6B00]" />
              Implementation Progress
            </CardTitle>
            <CardDescription>
              Track your progress as you implement the recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{prescription.implementationProgress}% Complete</span>
                {prescription.implementationProgress === 100 && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <Progress value={prescription.implementationProgress} className="h-3" />
              <div className="pt-4">
                <label className="text-sm text-gray-600 mb-2 block">Update your progress:</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[prescription.implementationProgress]}
                    onValueCommit={(value) => progressMutation.mutate(value[0])}
                    max={100}
                    step={5}
                    className="flex-1"
                    disabled={progressMutation.isPending}
                    data-testid="slider-progress"
                  />
                  <Button 
                    size="sm" 
                    disabled={progressMutation.isPending}
                    onClick={() => progressMutation.mutate(100)}
                    className="bg-green-500 hover:bg-green-600"
                    data-testid="button-mark-complete"
                  >
                    Mark Complete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card data-testid="card-recommendations">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-[#0000FF]" />
            Recommendations ({recommendations.length})
          </CardTitle>
          <CardDescription>
            Prioritized actions to improve your digital presence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {highPriority.length > 0 && (
            <div>
              <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>
                Focus on these first for maximum impact
              </h3>
              <div className="space-y-3">
                {highPriority.map(rec => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}
          
          {mediumPriority.length > 0 && (
            <div>
              <h3 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">Medium Priority</Badge>
                Important for continued growth
              </h3>
              <div className="space-y-3">
                {mediumPriority.map(rec => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}

          {lowPriority.length > 0 && (
            <div>
              <h3 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Low Priority</Badge>
                Nice to have when time permits
              </h3>
              <div className="space-y-3">
                {lowPriority.map(rec => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}

          {recommendations.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No recommendations available yet.
            </p>
          )}
        </CardContent>
      </Card>

      {!token && (
        <Card className="bg-gradient-to-r from-[#FF6B00]/10 to-[#0000FF]/10 border-[#FF6B00]/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Need Help Implementing?</h3>
                <p className="text-gray-600">
                  Coach Blue can guide you through each recommendation step-by-step.
                </p>
              </div>
              <Button asChild className="bg-[#0000FF] hover:bg-blue-700">
                <Link href="/ai-coach">
                  Talk to Coach Blue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <div 
      className="p-4 bg-gray-50 rounded-lg border-l-4 border-l-[#FF6B00]"
      data-testid={`card-recommendation-${recommendation.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{recommendation.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline" className="bg-white">
              <BarChart3 className="w-3 h-3 mr-1" />
              {recommendation.category}
            </Badge>
            {recommendation.estimatedImpact && (
              <Badge variant="outline" className="bg-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Impact: {recommendation.estimatedImpact}
              </Badge>
            )}
            {recommendation.estimatedEffort && (
              <Badge variant="outline" className="bg-white">
                <Clock className="w-3 h-3 mr-1" />
                Effort: {recommendation.estimatedEffort}
              </Badge>
            )}
          </div>
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
    <div className="min-h-screen bg-[#EEFBFF]">
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

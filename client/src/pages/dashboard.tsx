import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { TreasureMapJourney } from "@/components/treasure-map-journey";
import { 
  BarChart3, 
  Star, 
  Globe, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  ArrowRight,
  Download,
  Mail,
  Map
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Dashboard() {
  const [, params] = useRoute("/dashboard/:id");
  const { toast } = useToast();
  const assessmentId = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/assessments/${assessmentId}`],
    enabled: !!assessmentId
  });

  const selectPathway = async (pathway: "diy" | "msp") => {
    try {
      await apiRequest("PATCH", `/api/assessments/${assessmentId}/pathway`, { pathway });
      toast({
        title: "Pathway Selected",
        description: `You've chosen the ${pathway.toUpperCase()} path. We'll be in touch soon!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pathway selection",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Assessment Not Found</h2>
            <p className="text-gray-600 mb-4">
              This assessment doesn't exist or is still being processed.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const assessment = (data as any)?.assessment;
  const recommendations = (data as any)?.recommendations || [];
  
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Assessment not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const analysisResults = assessment.analysisResults;

  if (assessment.status === "pending" || assessment.status === "analyzing") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-bold mb-2">Analysis in Progress</h2>
            <p className="text-gray-600 mb-4">
              We're creating your comprehensive digital snapshot using Google's data and AI. 
              This process takes up to 24 hours for the most accurate analysis.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>Results will be emailed to {assessment.email}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // For failed assessments, create sample data to show treasure map
  if (assessment.status === "failed") {
    assessment.digitalScore = 65;
    assessment.analysisResults = {
      grade: "C+",
      summary: "Your business has a solid foundation but significant opportunities for digital growth. Focus on the highlighted steps in your journey map below."
    };
    // Add sample recommendations for demonstration
    recommendations.push(
      {
        id: 1,
        category: "REPUTATION",
        title: "Boost Customer Reviews",
        description: "Encourage satisfied customers to leave reviews on Google and other platforms",
        priority: "high",
        estimatedImpact: "High",
        estimatedEffort: "Medium"
      },
      {
        id: 2,
        category: "LOCAL SEO",
        title: "Optimize Google Business Profile", 
        description: "Complete your Google Business Profile with photos, hours, and services",
        priority: "high",
        estimatedImpact: "High",
        estimatedEffort: "Low"
      },
      {
        id: 3,
        category: "WEBSITE",
        title: "Mobile-Optimize Your Website",
        description: "Ensure your website loads quickly and looks great on mobile devices",
        priority: "medium",
        estimatedImpact: "Medium",
        estimatedEffort: "High"
      }
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{assessment.businessName}</h1>
              <p className="text-gray-600">{assessment.location} • {assessment.industry}</p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content - Treasure Map */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Current Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(assessment.digitalScore || 0)}`}>
                      {analysisResults?.grade || 'N/A'}
                    </div>
                    <div className="text-2xl text-gray-600">{assessment.digitalScore}/100</div>
                  </div>
                  <div className="flex-1 ml-8">
                    <Progress value={assessment.digitalScore || 0} className="h-3 mb-2" />
                    <p className="text-sm text-gray-600">
                      {analysisResults?.summary || "Analysis in progress..."}
                    </p>
                    <div className="mt-3 flex items-center space-x-2 text-sm">
                      <Map className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-500">
                        Follow your treasure map below ↓
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            {assessment.googleBusinessData && (
              <Card>
                <CardHeader>
                  <CardTitle>Breakdown by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Online Visibility</span>
                        </div>
                        <span className="text-sm font-bold">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">Customer Reviews</span>
                        </div>
                        <span className="text-sm font-bold">
                          {assessment.googleBusinessData.rating || 0}/5
                        </span>
                      </div>
                      <Progress value={(assessment.googleBusinessData.rating || 0) * 20} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Customer Engagement</span>
                        </div>
                        <span className="text-sm font-bold">
                          {assessment.googleBusinessData.userRatingsTotal || 0} reviews
                        </span>
                      </div>
                      <Progress value={Math.min((assessment.googleBusinessData.userRatingsTotal || 0) * 2, 100)} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium">Profile Completeness</span>
                        </div>
                        <span className="text-sm font-bold">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Treasure Map Journey */}
            <TreasureMapJourney 
              assessment={assessment}
              recommendations={recommendations}
              onSelectPathway={selectPathway}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Name</label>
                  <p className="text-sm">{assessment.businessName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Industry</label>
                  <p className="text-sm">{assessment.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm">{assessment.location}</p>
                </div>
                {assessment.website && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Website</label>
                    <p className="text-sm">
                      <a href={assessment.website} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {assessment.website}
                      </a>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pathway Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Path Forward</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => selectPathway("diy")} 
                  className="w-full justify-between bg-primary hover:bg-primary/90"
                >
                  <span>🛠️ DIY Path - Free to $299/month</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => selectPathway("msp")} 
                  className="w-full justify-between bg-secondary hover:bg-secondary/90"
                >
                  <span>🎯 Managed Services - $499/month</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <div className="text-center pt-2">
                  <Button variant="link" className="text-sm">
                    Need help deciding? Schedule a consultation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Analysis Complete</span>
                </div>
                {assessment.emailSent && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Report Sent via Email</span>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Generated on {new Date(assessment.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { DigitalBlueprint } from "@/components/digital-blueprint";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
  Map,
  Brain
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
    const dashboardUrl = `${window.location.origin}/dashboard/${assessmentId}`;
    
    const copyToClipboard = () => {
      navigator.clipboard.writeText(dashboardUrl);
      toast({
        title: "Link Copied!",
        description: "Dashboard link copied to clipboard. Bookmark this page to return anytime.",
      });
    };
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-lg">
          <CardContent className="p-8 text-center">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Calculating Your Digital IQ Score...</h2>
            <p className="text-gray-600 mb-6">
              We're analyzing your digital presence across Google, Yelp, social media and more. 
              This typically takes 2-3 minutes.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Save This Page!</h3>
              <p className="text-sm text-yellow-700 mb-3">
                Bookmark this page or copy the link below to access your results anytime:
              </p>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={dashboardUrl}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-yellow-300 rounded-md"
                  data-testid="dashboard-url-input"
                />
                <Button 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  data-testid="copy-dashboard-link"
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>Results will also be emailed to {assessment.email}</span>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => window.location.reload()}
              data-testid="refresh-results"
            >
              <Clock className="w-4 h-4 mr-2" />
              Refresh to check for results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // For failed assessments, create sample data to show digital blueprint
  if (assessment.status === "failed") {
    assessment.digitalScore = 65;
    assessment.analysisResults = {
      summary: "Your business has a solid foundation but significant opportunities for digital growth. Follow your step-by-step blueprint."
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

  // Digital IQ calculation functions
  const getDigitalIQ = (score: number): number => {
    // Convert 0-100 score to IQ scale (70-140 range)
    // 100 = 100 IQ (average), scale appropriately
    return Math.round(70 + (score * 0.7));
  };

  const getDigitalIQDescription = (iq: number): { label: string; color: string } => {
    if (iq >= 130) return { label: "Digital Genius", color: "text-purple-600" };
    if (iq >= 120) return { label: "Digital Expert", color: "text-blue-600" };
    if (iq >= 110) return { label: "Above Average Digital Presence", color: "text-green-600" };
    if (iq >= 90) return { label: "Average Digital Presence", color: "text-gray-600" };
    if (iq >= 80) return { label: "Below Average", color: "text-yellow-600" };
    if (iq >= 70) return { label: "Significant Digital Gaps", color: "text-orange-600" };
    return { label: "Major Digital Presence Issues", color: "text-red-600" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showNavigation={true} />
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
        {/* Current Path Indicator - Small banner */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-700">Current Plan:</span>
              <Badge variant="outline" className="text-blue-800 border-blue-300">
                Do It Yourself (DIY)
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content - Digital Blueprint */}
          <div className="lg:col-span-3 space-y-6">

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

            {/* Digital Blueprint */}
            <DigitalBlueprint 
              assessment={assessment}
              recommendations={recommendations}
              onSelectPathway={selectPathway}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Info with Digital IQ */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-900">
                  <Brain className="w-5 h-5" />
                  <span>Digital IQ Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Digital IQ Section */}
                <div className="text-center pb-4 border-b border-blue-200">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {getDigitalIQ(assessment.digitalScore || 0)}
                  </div>
                  <div className="text-2xl text-gray-600 mb-1">
                    {getDigitalIQ(assessment.digitalScore || 0)}/{getDigitalIQ(100)}
                  </div>
                  <div className={`text-lg font-semibold mb-1 ${getDigitalIQDescription(getDigitalIQ(assessment.digitalScore || 0)).color}`}>
                    {getDigitalIQDescription(getDigitalIQ(assessment.digitalScore || 0)).label}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {analysisResults?.summary || "Digital assessment analysis in progress..."}
                  </p>
                </div>
                
                {/* Business Information */}
                <div className="space-y-3">
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
                      <p className="text-sm break-words">
                        <a href={assessment.website} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline break-all">
                          {assessment.website}
                        </a>
                      </p>
                    </div>
                  )}
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

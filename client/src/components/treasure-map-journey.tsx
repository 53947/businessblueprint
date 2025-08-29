import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Star, 
  Search, 
  Globe, 
  Zap, 
  Users, 
  FileText, 
  Server, 
  Mail, 
  Share2,
  CheckCircle,
  ArrowRight,
  MapPin,
  Trophy,
  Lightbulb
} from "lucide-react";

// The 11 strategic treasure map steps matching user's actual product categories
const treasureMapSteps = [
  {
    id: 1,
    title: "Business Foundation",
    description: "Establish your digital presence fundamentals",
    category: "ADVERTISING",
    icon: Target,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    title: "Reputation Management", 
    description: "Build trust through positive reviews and testimonials",
    category: "REPUTATION",
    icon: Star,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  {
    id: 3,
    title: "Local Discovery",
    description: "Dominate local search results and map listings",
    category: "LOCAL SEO",
    icon: Search,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: 4,
    title: "Professional Website",
    description: "Create a powerful online headquarters for your business",
    category: "WEBSITE",
    icon: Globe,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: 5,
    title: "Search Optimization",
    description: "Attract qualified traffic through strategic SEO",
    category: "SEO WEBSITE",
    icon: Zap,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: 6,
    title: "Social Presence",
    description: "Engage customers on social media platforms",
    category: "SOCIAL",
    icon: Users,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  {
    id: 7,
    title: "Content Strategy",
    description: "Create valuable content that converts visitors",
    category: "CONTENT & EXPERIENCE",
    icon: FileText,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    id: 8,
    title: "Reliable Hosting",
    description: "Ensure fast, secure, and reliable website performance",
    category: "HOSTING",
    icon: Server,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50",
    borderColor: "border-cyan-200"
  },
  {
    id: 9,
    title: "Domain Strategy",
    description: "Secure your brand with strategic domain management",
    category: "DOMAINS",
    icon: Globe,
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    borderColor: "border-teal-200"
  },
  {
    id: 10,
    title: "Email Marketing",
    description: "Nurture leads and retain customers through email",
    category: "EMAIL MARKETING",
    icon: Mail,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    id: 11,
    title: "Social Media Marketing",
    description: "Scale your reach through targeted social campaigns",
    category: "SOCIAL MEDIA",
    icon: Share2,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  }
];

interface TreasureMapJourneyProps {
  assessment: any;
  recommendations: any[];
  onSelectPathway: (pathway: "diy" | "msp") => void;
}

export function TreasureMapJourney({ assessment, recommendations, onSelectPathway }: TreasureMapJourneyProps) {
  // Calculate progress based on digital score and recommendations
  const digitalScore = assessment.digitalScore || 0;
  const completedSteps = Math.floor((digitalScore / 100) * treasureMapSteps.length);
  const currentStep = Math.min(completedSteps + 1, treasureMapSteps.length);
  
  // Map recommendations to treasure map steps
  const getRecommendationsForStep = (stepCategory: string) => {
    return recommendations.filter(rec => 
      rec.category?.toUpperCase().includes(stepCategory.split(' ')[0]) ||
      rec.title?.toUpperCase().includes(stepCategory.split(' ')[0])
    ).slice(0, 2);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId <= completedSteps) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const getStepPriority = (stepId: number) => {
    if (stepId <= completedSteps) return "completed";
    if (stepId === currentStep) return "high";
    if (stepId === currentStep + 1) return "medium";
    return "low";
  };

  return (
    <div className="space-y-6">
      {/* Journey Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Trophy className="w-6 h-6" />
                <span>Your Digital Empowerment Journey</span>
              </h2>
              <p className="text-lg opacity-90">
                Strategic roadmap to transform your business presence
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Step {currentStep} of {treasureMapSteps.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{completedSteps} steps completed</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">{digitalScore}</div>
              <div className="text-sm opacity-75">Digital Score</div>
              <Progress value={digitalScore} className="w-24 h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>Strategic Journey Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500 transition-all duration-1000"
              style={{ height: `${(completedSteps / treasureMapSteps.length) * 100}%` }}
            ></div>

            {/* Journey Steps */}
            <div className="space-y-6">
              {treasureMapSteps.map((step, index) => {
                const stepStatus = getStepStatus(step.id);
                const stepRecs = getRecommendationsForStep(step.category);
                const IconComponent = step.icon;
                
                return (
                  <div key={step.id} className="relative flex items-start space-x-4">
                    {/* Step Icon */}
                    <div className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${stepStatus === "completed" ? `${step.color} border-white text-white` : 
                        stepStatus === "current" ? `${step.lightColor} ${step.borderColor} border-2` :
                        "bg-gray-100 border-gray-200"}
                    `}>
                      {stepStatus === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <IconComponent className={`w-6 h-6 ${
                          stepStatus === "current" ? step.color.replace('bg-', 'text-') : "text-gray-400"
                        }`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`
                        rounded-lg border-2 p-4 transition-all duration-300
                        ${stepStatus === "current" ? `${step.lightColor} ${step.borderColor}` :
                          stepStatus === "completed" ? "bg-green-50 border-green-200" :
                          "bg-white border-gray-200"}
                      `}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{step.title}</h4>
                          <Badge variant={
                            stepStatus === "completed" ? "default" :
                            stepStatus === "current" ? "destructive" : "secondary"
                          }>
                            {stepStatus === "completed" ? "✓ Complete" :
                             stepStatus === "current" ? "👈 You Are Here" : "Upcoming"}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        
                        {/* Step Recommendations */}
                        {stepRecs.length > 0 && stepStatus !== "completed" && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Recommended Actions
                            </h5>
                            {stepRecs.map((rec: any) => (
                              <div key={rec.id} className="bg-white rounded p-3 border">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                                  </div>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {rec.priority}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Current Step Action */}
                        {stepStatus === "current" && (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">Ready to take action?</p>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => onSelectPathway("diy")}
                                >
                                  DIY Guide
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => onSelectPathway("msp")}
                                >
                                  Get Help
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedSteps}</div>
              <p className="text-sm text-gray-600">Steps Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{treasureMapSteps.length - completedSteps}</div>
              <p className="text-sm text-gray-600">Opportunities Ahead</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round((completedSteps / treasureMapSteps.length) * 100)}%</div>
              <p className="text-sm text-gray-600">Journey Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
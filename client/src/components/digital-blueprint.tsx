import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Crown,
  Wrench,
  CheckCircle2
} from "lucide-react";
import blueprintIcon from "@assets/businesblueprint assets/Blueprint_Avatar.png";

// The 11 strategic digital blueprint steps - logical order for beginners
const digitalBlueprintSteps = [
  {
    id: 1,
    title: "Business Foundation",
    description: "Learn digital marketing fundamentals and plan your strategy",
    category: "ADVERTISING",
    icon: Target,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    title: "Domain Strategy",
    description: "Secure your brand with the perfect domain name",
    category: "DOMAINS",
    icon: Globe,
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    borderColor: "border-teal-200"
  },
  {
    id: 3,
    title: "Reliable Hosting",
    description: "Build your foundation with fast, secure website hosting",
    category: "HOSTING",
    icon: Server,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50",
    borderColor: "border-cyan-200"
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
    description: "Optimize your website to attract qualified traffic",
    category: "SEO WEBSITE",
    icon: Zap,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: 6,
    title: "Local Discovery",
    description: "Dominate local search results and map listings",
    category: "LOCAL SEO",
    icon: Search,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: 7,
    title: "Reputation Management", 
    description: "Build trust through positive reviews and testimonials",
    category: "REPUTATION",
    icon: Star,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  {
    id: 8,
    title: "Content Strategy",
    description: "Create valuable content that converts visitors",
    category: "CONTENT & EXPERIENCE",
    icon: FileText,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    id: 9,
    title: "Social Presence",
    description: "Engage customers on social media platforms",
    category: "SOCIAL",
    icon: Users,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    borderColor: "border-pink-200"
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

interface DigitalBlueprintProps {
  assessment: any;
  recommendations: any[];
  onSelectPathway: (pathway: "diy" | "msp") => void;
}

export function DigitalBlueprint({ assessment, recommendations, onSelectPathway }: DigitalBlueprintProps) {
  const [showPathwayModal, setShowPathwayModal] = useState(false);
  // Calculate progress based on digital score and recommendations
  const digitalScore = assessment.digitalScore || 0;
  const completedSteps = Math.floor((digitalScore / 100) * digitalBlueprintSteps.length);
  const currentStep = Math.min(completedSteps + 1, digitalBlueprintSteps.length);
  
  // Get the current step object
  const currentStepObj = digitalBlueprintSteps.find(step => step.id === currentStep);
  
  // Map recommendations to digital blueprint steps
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

  // Scroll to next step functionality
  const scrollToStep = (stepId: number) => {
    const element = document.getElementById(`blueprint-step-${stepId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add temporary highlight
      element.classList.add('blueprint-step-highlight');
      setTimeout(() => element.classList.remove('blueprint-step-highlight'), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Blueprint Header */}
      <Card className="blueprint-surface blueprint-surface--header text-white">
        <CardContent className="blueprint-content p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <img src={blueprintIcon} alt="Blueprint" className="w-6 h-6" />
                <span>Your Digital Blueprint</span>
              </h2>
              <p className="text-lg opacity-90">
                Watch your business grow step by step — Online and Offline
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Step {currentStep} of {digitalBlueprintSteps.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{completedSteps} steps completed</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">{Math.round((completedSteps / digitalBlueprintSteps.length) * 100)}%</div>
              <div className="text-sm opacity-75">Blueprint Progress</div>
              <Progress value={(completedSteps / digitalBlueprintSteps.length) * 100} className="w-24 h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blueprint Progress */}
      <Card className="blueprint-surface blueprint-surface--content">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <img src={blueprintIcon} alt="Blueprint" className="w-5 h-5" />
            <span>Digital Blueprint</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="blueprint-content">
          {/* Current Step - Featured at Top - WHITE background with BLUE lines */}
          {currentStepObj && (
            <div className="mb-8 blueprint-step-inverted">
              <div className="flex items-center space-x-2 mb-3">
                <Badge className="bg-blue-600 text-white border-blue-600">
                  → CURRENT
                </Badge>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 border-2 border-dashed border-blue-400">
                  {(() => {
                    const IconComponent = currentStepObj.icon;
                    return <IconComponent className="w-8 h-8 text-blue-600" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-2">{currentStepObj.title}</h3>
                  <p className="text-gray-800 text-lg mb-4">{currentStepObj.description}</p>
                  
                  {/* Action Station - Show only when no pathway selected */}
                  {!assessment.selectedPathway && (
                    <div className="space-y-2 mb-4">
                      <div className="blueprint-action-station bg-gray-100 border border-dashed border-blue-300 p-4">
                        <h5 className="text-xs font-mono font-medium text-black uppercase tracking-wider mb-3">
                          ACTION REQUIRED
                        </h5>
                        <div className="text-sm text-black mb-3">
                          Select implementation pathway
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-blue-400 text-blue-700 hover:bg-blue-50"
                            onClick={() => setShowPathwayModal(true)}
                          >
                            SELECT PATHWAY
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-blue-400 text-blue-700 hover:bg-blue-50"
                          >
                            GET HELP →
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Show pathway confirmation when selected */}
                  {assessment.selectedPathway && (
                    <div className="space-y-2 mb-4">
                      <div className="blueprint-action-station bg-green-50 border border-green-300 p-4">
                        <h5 className="text-xs font-mono font-medium text-green-800 uppercase tracking-wider mb-3">
                          ✅ PATHWAY SELECTED
                        </h5>
                        <div className="text-sm text-green-700 mb-3">
                          {assessment.selectedPathway === 'msp' 
                            ? 'Managed Services Provided (MSP) - Our experts will handle everything for you'
                            : 'Do It Yourself (DIY) - You\'ll receive step-by-step guidance'
                          }
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-green-400 text-green-700 hover:bg-green-50"
                            onClick={() => setShowPathwayModal(true)}
                          >
                            CHANGE PATHWAY
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 w-0.5 h-full bg-white/20"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-cyan-300 to-emerald-300 transition-all duration-1000"
              style={{ height: `${(completedSteps / digitalBlueprintSteps.length) * 100}%` }}
            ></div>

            {/* All Blueprint Steps */}
            <div className="space-y-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white/80 mb-4 border-b border-white/20 pb-2">
                  📋 All Steps Overview
                </h4>
              </div>
              {digitalBlueprintSteps.map((step, index) => {
                const stepStatus = getStepStatus(step.id);
                const stepRecs = getRecommendationsForStep(step.category);
                const IconComponent = step.icon;
                const nextStep = digitalBlueprintSteps[index + 1];
                
                return (
                  <div 
                    key={step.id} 
                    id={`blueprint-step-${step.id}`}
                    className="relative flex items-start space-x-4 blueprint-step-container"
                  >
                    {/* Technical Step Icon */}
                    <div className={`
                      relative z-10 flex items-center justify-center border-2 transition-all duration-300 blueprint-step-icon
                      ${stepStatus === "completed" ? "w-6 h-6 bg-white/20 border-white text-white" : 
                        stepStatus === "current" ? "w-12 h-12 bg-white/30 border-white border-2 text-white" :
                        "w-12 h-12 bg-white/10 border-white/30 text-white/60"}
                    `}>
                      {stepStatus === "completed" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>

                    {/* Technical Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`blueprint-step-component relative ${
                        stepStatus === "current" ? "blueprint-step-current border-2 border-yellow-400/50" :
                        stepStatus === "completed" ? "blueprint-step-completed" :
                        "blueprint-step-upcoming"
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className={`font-semibold text-white ${
                              stepStatus === "completed" ? "text-xs" : "text-lg"
                            }`}>{step.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`
                                border-white/40 text-xs font-mono
                                ${stepStatus === "completed" ? "bg-green-500/20 text-green-200 border-green-300" :
                                  stepStatus === "current" ? "bg-yellow-500/20 text-yellow-200 border-yellow-300" :
                                  "bg-white/10 text-white/60"}
                              `}
                            >
                              {stepStatus === "completed" ? "✓ COMPLETE" :
                               stepStatus === "current" ? "→ CURRENT" : "PENDING"}
                            </Badge>
                          </div>
                          
                          {/* Step Navigation Arrow */}
                          {(stepStatus === "completed" || nextStep) && (
                            <button
                              onClick={() => {
                                if (stepStatus === "completed" && step.id < digitalBlueprintSteps.length) {
                                  // For completed steps, scroll to next incomplete step
                                  const nextIncompleteStep = digitalBlueprintSteps.find(s => getStepStatus(s.id) !== "completed");
                                  if (nextIncompleteStep) scrollToStep(nextIncompleteStep.id);
                                } else if (nextStep) {
                                  scrollToStep(nextStep.id);
                                }
                              }}
                              className={`blueprint-nav-arrow ${stepStatus === "completed" ? "completed-arrow" : "next-arrow"}`}
                              title={stepStatus === "completed" ? "Go to current step" : `Next: ${nextStep?.title}`}
                              aria-label={stepStatus === "completed" ? "Navigate to current step" : `Navigate to step ${nextStep?.id}: ${nextStep?.title}`}
                              data-testid={`button-${stepStatus === "completed" ? "current" : "next"}-step-${stepStatus === "completed" ? currentStep : nextStep?.id}`}
                            >
                              {stepStatus === "completed" ? (
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 5v14" />
                                  <path d="M19 12l-7 7-7-7" />
                                </svg>
                              ) : (
                                <ArrowRight className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                        
                        {stepStatus !== "completed" && (
                          <p className="text-white/80 mb-4 font-mono leading-relaxed text-sm">
                            {step.description}
                          </p>
                        )}

                        {/* Technical Specifications - Recommendations */}
                        {stepRecs.length > 0 && stepStatus !== "completed" && (
                          <div className="space-y-2 mb-4">
                            <h5 className="text-xs font-mono font-medium text-white/70 uppercase tracking-wider border-b border-white/20 pb-1">
                              RECOMMENDED ACTIONS
                            </h5>
                            {stepRecs.map((rec: any) => (
                              <div key={rec.id} className="bg-white/5 border border-white/20 p-3 blueprint-recommendation">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-white font-mono">{rec.title}</p>
                                    <p className="text-xs text-white/60 mt-1 font-mono">{rec.description}</p>
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={`ml-2 text-xs font-mono border-white/30 ${
                                      rec.priority === 'high' ? 'bg-red-500/20 text-red-200 border-red-300' :
                                      rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-300' :
                                      'bg-blue-500/20 text-blue-200 border-blue-300'
                                    }`}
                                  >
                                    {rec.priority?.toUpperCase() || 'NORMAL'}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Removed action station to avoid confusion with main pathway selection */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Summary */}
      <Card className="blueprint-surface blueprint-surface--content">
        <CardContent className="blueprint-content p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">{completedSteps}</div>
              <p className="text-sm text-white/70">Steps Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">{digitalBlueprintSteps.length - completedSteps}</div>
              <p className="text-sm text-white/70">Steps Remaining</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">{Math.round((completedSteps / digitalBlueprintSteps.length) * 100)}%</div>
              <p className="text-sm text-white/70">Step-by-Step Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pathway Selection Modal */}
      <Dialog open={showPathwayModal} onOpenChange={setShowPathwayModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              Choose Your Implementation Path
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 py-6">
            {/* Managed Services - Recommended */}
            <div className="relative border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  <Crown className="w-3 h-3 mr-1" />
                  RECOMMENDED
                </Badge>
              </div>
              
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Managed Services Provided (MSP)</h3>
                <p className="text-blue-700 text-sm">Let our experts handle everything</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center text-blue-800">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600" />
                  Professional implementation
                </li>
                <li className="flex items-center text-blue-800">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600" />
                  Ongoing optimization
                </li>
                <li className="flex items-center text-blue-800">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600" />
                  Dedicated account manager
                </li>
                <li className="flex items-center text-blue-800">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600" />
                  Faster results
                </li>
              </ul>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  onSelectPathway("msp");
                  setShowPathwayModal(false);
                }}
              >
                Get Expert Help
              </Button>
            </div>
            
            {/* DIY Path */}
            <div className="border-2 border-gray-300 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Do It Yourself (DIY)</h3>
                <p className="text-gray-600 text-sm">Follow our step-by-step guides</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-orange-500" />
                  Detailed instructions
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-orange-500" />
                  Self-paced learning
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-orange-500" />
                  Cost-effective option
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-orange-500" />
                  Build internal expertise
                </li>
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                onClick={() => {
                  onSelectPathway("diy");
                  setShowPathwayModal(false);
                }}
              >
                Do It Myself
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Target, CheckCircle, Clock, MessageCircle } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CoachingContext {
  businessInfo: {
    name: string;
    industry: string;
    location: string;
    digitalScore: number;
    currentStage: string;
  };
  userProgress: {
    completedSteps: string[];
    currentGoals: string[];
    timeAvailable: string;
    experience: "beginner" | "intermediate" | "advanced";
  };
  platformData: {
    hasWebsite: boolean;
    googleListingStatus: string;
    socialMediaPresence: string[];
    reviewCount: number;
  };
}

interface CoachingResponse {
  message: string;
  actionItems: {
    task: string;
    priority: "high" | "medium" | "low";
    estimatedTime: string;
    difficulty: "easy" | "medium" | "hard";
    resources: string[];
  }[];
  encouragement: string;
  nextMilestone: string;
}

interface AICoachProps {
  assessmentData?: any;
}

export function AICoach({ assessmentData }: AICoachProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  // Sample context - in real app, this would come from user data and assessment
  const coachingContext: CoachingContext = {
    businessInfo: {
      name: assessmentData?.businessName || "Your Business",
      industry: assessmentData?.industry || "Service",
      location: assessmentData?.location || "Local Area",
      digitalScore: assessmentData?.digitalScore || 65,
      currentStage: "optimization"
    },
    userProgress: {
      completedSteps: ["google-listing", "basic-website"],
      currentGoals: ["improve-reviews", "social-media"],
      timeAvailable: "2-3 hours per week",
      experience: "beginner"
    },
    platformData: {
      hasWebsite: true,
      googleListingStatus: "claimed",
      socialMediaPresence: ["Facebook"],
      reviewCount: 8
    }
  };

  const guidanceMutation = useMutation({
    mutationFn: async (context: CoachingContext) => {
      return apiRequest("/api/ai-coach/guidance", {
        method: "POST",
        body: JSON.stringify(context),
      });
    },
  });

  const helpMutation = useMutation({
    mutationFn: async ({ task, userContext }: { task: string; userContext: CoachingContext }) => {
      return apiRequest("/api/ai-coach/help", {
        method: "POST",
        body: JSON.stringify({ task, userContext }),
      });
    },
  });

  const progressMutation = useMutation({
    mutationFn: async (context: CoachingContext) => {
      return apiRequest("/api/ai-coach/progress", {
        method: "POST",
        body: JSON.stringify(context),
      });
    },
  });

  const getGuidance = () => {
    guidanceMutation.mutate(coachingContext);
  };

  const getHelp = (task: string) => {
    setSelectedTask(task);
    helpMutation.mutate({ task, userContext: coachingContext });
  };

  const analyzeProgress = () => {
    progressMutation.mutate(coachingContext);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Business Coach
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get personalized guidance to improve your digital presence
        </p>
      </div>

      <Tabs defaultValue="guidance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guidance">Personalized Guidance</TabsTrigger>
          <TabsTrigger value="progress">Progress Analysis</TabsTrigger>
          <TabsTrigger value="help">Step-by-Step Help</TabsTrigger>
        </TabsList>

        <TabsContent value="guidance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Your Personalized Action Plan
              </CardTitle>
              <CardDescription>
                AI-powered recommendations based on your business profile and current digital presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={getGuidance} 
                disabled={guidanceMutation.isPending}
                className="w-full"
              >
                {guidanceMutation.isPending ? "Getting guidance..." : "Get AI Guidance"}
              </Button>

              {guidanceMutation.data && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Coach Message
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200">
                      {guidanceMutation.data.message}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Action Items
                    </h4>
                    {guidanceMutation.data.actionItems?.map((item: any, index: number) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{item.task}</h5>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                            <Badge className={getDifficultyColor(item.difficulty)}>
                              {item.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.estimatedTime}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => getHelp(item.task)}
                        >
                          Get Step-by-Step Help
                        </Button>
                      </Card>
                    ))}
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Encouragement
                    </h3>
                    <p className="text-green-800 dark:text-green-200">
                      {guidanceMutation.data.encouragement}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                      Next Milestone
                    </h3>
                    <p className="text-purple-800 dark:text-purple-200">
                      {guidanceMutation.data.nextMilestone}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Progress Analysis
              </CardTitle>
              <CardDescription>
Track your achievements and get insights on your digital marketing progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Digital Score Progress</span>
                  <span>{coachingContext.businessInfo.digitalScore}/100</span>
                </div>
                <Progress value={coachingContext.businessInfo.digitalScore} className="w-full" />
              </div>

              <Button 
                onClick={analyzeProgress} 
                disabled={progressMutation.isPending}
                className="w-full"
              >
                {progressMutation.isPending ? "Analyzing..." : "Analyze My Progress"}
              </Button>

              {progressMutation.data && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Achievements
                    </h3>
                    <ul className="space-y-1">
                      {progressMutation.data.achievements?.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-green-800 dark:text-green-200">
                          <CheckCircle className="h-4 w-4" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Next Priorities
                    </h3>
                    <ul className="space-y-1">
                      {progressMutation.data.nextPriorities?.map((priority: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                          <Target className="h-4 w-4" />
                          {priority}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      Motivational Message
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-200">
                      {progressMutation.data.motivationalMessage}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Step-by-Step Help
              </CardTitle>
              <CardDescription>
                Get detailed instructions for any digital marketing task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTask && (
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium">Getting help for: </span>
                  <span className="text-sm">{selectedTask}</span>
                </div>
              )}

              {helpMutation.isPending && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Getting detailed help...</p>
                </div>
              )}

              {helpMutation.data && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Step-by-Step Instructions</h3>
                    <ol className="space-y-2">
                      {helpMutation.data.steps?.map((step: string, index: number) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {helpMutation.data.tips?.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Pro Tips</h3>
                      <ul className="space-y-2">
                        {helpMutation.data.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {helpMutation.data.commonMistakes?.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Common Mistakes to Avoid</h3>
                      <ul className="space-y-2">
                        {helpMutation.data.commonMistakes.map((mistake: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
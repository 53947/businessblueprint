import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, ChevronLeft, Play, RotateCcw, Star, MessageSquare, Mail, FileText, Users, MapPin, Award, Bot, Sparkles, ArrowRight } from "lucide-react";

const TOUR_STORAGE_KEY = "blueprintTourProgress";

interface TourStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: JSX.Element;
  icon: JSX.Element;
  color: string;
}

export default function Tour() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(TOUR_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.completedSteps) setCompletedSteps(data.completedSteps);
        if (data.currentStep !== undefined) {
          setCurrentStep(data.currentStep);
          setIsStarted(true);
        }
      } catch (e) {
        console.error("Failed to parse tour progress");
      }
    }
  }, []);

  useEffect(() => {
    if (isStarted) {
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify({
        currentStep,
        completedSteps
      }));
    }
  }, [currentStep, completedSteps, isStarted]);

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const resetTour = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsStarted(false);
    localStorage.removeItem(TOUR_STORAGE_KEY);
  };

  const tourSteps: TourStep[] = [
    {
      id: 1,
      title: "Step 1: Digital IQ Assessment",
      subtitle: "You've Already Completed This!",
      description: "Your 27-question assessment analyzed your digital presence across multiple dimensions.",
      icon: <CheckCircle2 className="w-12 h-12" />,
      color: "#22C55E",
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">Assessment Complete!</h3>
            <p className="text-green-600">You've already taken the first step toward digital transformation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2 border-[#0000FF]">
              <CardContent className="p-5">
                <h4 className="font-semibold text-[#0000FF] mb-2">Digital Presence Scan</h4>
                <p className="text-sm text-gray-600">We analyzed your online visibility, website performance, and digital footprint (0-70 points).</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#F97316]">
              <CardContent className="p-5">
                <h4 className="font-semibold text-[#F97316] mb-2">Operational Analysis</h4>
                <p className="text-sm text-gray-600">We evaluated your business processes, communication, and growth readiness (0-70 points).</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-[#EEFBFF] rounded-xl p-6">
            <h4 className="font-semibold text-[#09080E] mb-3">Your Digital IQ Score</h4>
            <p className="text-gray-600 mb-4">Your combined score (out of 140) tells us exactly where you stand and what tools will help you grow.</p>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-[#0000FF]">0-140</div>
              <div className="text-sm text-gray-500">Combined Score Range</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Step 2: Your Prescribed Blueprint",
      subtitle: "Understanding Your Personalized Recommendations",
      description: "Learn how to read your prescription and prioritize the recommendations.",
      icon: <FileText className="w-12 h-12" />,
      color: "#0000FF",
      content: (
        <div className="space-y-6">
          <div className="bg-[#EEFBFF] border-2 border-[#0000FF] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#0000FF] mb-4">How to Read Your Prescription</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0000FF] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold">Score Breakdown</h4>
                  <p className="text-sm text-gray-600">See your Presence Scan score (0-70) and Operational score (0-70) combined for your Digital IQ.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0000FF] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold">Priority Recommendations</h4>
                  <p className="text-sm text-gray-600">High-priority items should be addressed first. Each recommendation includes impact and effort estimates.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0000FF] text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold">Recommended Products</h4>
                  <p className="text-sm text-gray-600">Based on your needs, we suggest specific tools from our catalog to address your gaps.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="text-red-500 font-semibold text-sm mb-1">HIGH PRIORITY</div>
                <p className="text-xs text-gray-600">Critical issues that significantly impact your business growth.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="text-yellow-600 font-semibold text-sm mb-1">MEDIUM PRIORITY</div>
                <p className="text-xs text-gray-600">Important improvements that will enhance your digital presence.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="text-green-600 font-semibold text-sm mb-1">LOW PRIORITY</div>
                <p className="text-xs text-gray-600">Nice-to-have enhancements for optimization.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => setLocation("/portal/prescriptions")}
              className="bg-[#0000FF] hover:bg-[#0000CC] text-white"
              data-testid="button-view-prescription"
            >
              View Your Prescription <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Step 3: Anchor Suite",
      subtitle: "Get Found Locally — Listings & Reputation",
      description: "Control your local visibility with synchronized listings and reputation management.",
      icon: <MapPin className="w-12 h-12" />,
      color: "#0000FF",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#09080E] to-[#1a1a2e] rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Anchor Suite</h3>
            <p className="opacity-80">Complete local presence management for businesses that need to be found.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-[#FF0040] overflow-hidden">
              <div className="bg-[#09080E] p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-[#FF0040]" />
                  <div>
                    <h4 className="font-bold text-white">/ publish</h4>
                    <p className="text-sm text-gray-400">Directory Sync</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF0040]" /> Sync across 60+ directories</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF0040]" /> Consistent NAP (Name, Address, Phone)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF0040]" /> Duplicate suppression</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF0040]" /> Local SEO boost</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#D59600] overflow-hidden">
              <div className="bg-[#09080E] p-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#D59600]" />
                  <div>
                    <h4 className="font-bold text-white">/ elevate</h4>
                    <p className="text-sm text-gray-400">Review Management</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D59600]" /> Monitor reviews across platforms</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D59600]" /> AI-powered response suggestions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D59600]" /> Review request campaigns</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D59600]" /> Sentiment analysis</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-[#EEFBFF] rounded-xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-[#09080E]">Anchor Suite</h4>
                <p className="text-sm text-gray-600">Listings + Reputation together</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#0000FF]">$59<span className="text-sm font-normal text-gray-500">/mo</span></div>
                <div className="text-sm text-[#F97316]">Save $19 vs. individual</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Step 4: Coach Blue",
      subtitle: "Your 24/7 AI Business Mentor",
      description: "Get personalized guidance from an AI that understands your unique business challenges.",
      icon: <Bot className="w-12 h-12" />,
      color: "#8B5CF6",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0000FF] via-[#97ACCA] to-[#8B5CF6] rounded-xl p-6 text-white text-center">
            <img 
              src="/assets/approved%20icons%20and%20logos/Additional%20Apps/4-AI_Business_Coach_-_Coach_Blue.png" 
              alt="Coach Blue"
              className="w-24 h-24 mx-auto mb-4 rounded-2xl"
            />
            <h3 className="text-2xl font-bold mb-2">Meet Coach Blue</h3>
            <p className="opacity-90">Your personal AI business mentor, available 24/7</p>
          </div>
          
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
            <Sparkles className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-green-700">This tour is FREE! Take it as many times as you like.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5">
                <h4 className="font-semibold text-[#0000FF] mb-3">What Coach Blue Does:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0000FF] mt-0.5" /> Explains your prescription in plain language</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0000FF] mt-0.5" /> Creates step-by-step action plans</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0000FF] mt-0.5" /> Answers questions about your business</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0000FF] mt-0.5" /> Provides ongoing strategic guidance</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h4 className="font-semibold text-[#F97316] mb-3">Why Subscribe?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-[#F97316] mt-0.5" /> Unlimited conversations</li>
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-[#F97316] mt-0.5" /> Remembers your business context</li>
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-[#F97316] mt-0.5" /> Personalized recommendations</li>
                  <li className="flex items-start gap-2"><Star className="w-4 h-4 text-[#F97316] mt-0.5" /> Available 24/7, no waiting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-[#09080E] rounded-xl p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-xl">Coach Blue Subscription</h4>
                <p className="text-gray-400 text-sm">Ongoing AI mentorship for your business</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#F97316]">$99<span className="text-lg font-normal text-gray-400">/mo</span></div>
                <p className="text-xs text-gray-400">Cancel anytime</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-300 mb-4">Ready to unlock unlimited AI business coaching?</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setLocation("/subscription?product=coach-blue")}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white"
                  data-testid="button-subscribe-coach-blue"
                >
                  Subscribe Now — $99/mo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/coach-blue")}
                  className="border-white text-white hover:bg-white hover:text-[#09080E]"
                  data-testid="button-try-coach-blue"
                >
                  Try Coach Blue Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Step 5: Compass Suite",
      subtitle: "Complete Communication Suite",
      description: "Master every channel with integrated tools for email, messaging, content, and live chat.",
      icon: <MessageSquare className="w-12 h-12" />,
      color: "#0000FF",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0000FF] to-[#97ACCA] rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Compass Suite</h3>
            <p className="opacity-90">All four communication tools working together seamlessly.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2 border-[#0000FF]">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-8 h-8 text-[#0000FF]" />
                  <div>
                    <h4 className="font-bold">/ promote</h4>
                    <p className="text-xs text-gray-500">Email Campaigns</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Design and send professional email campaigns with automation and analytics.</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#0000FF]">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-8 h-8 text-[#0000FF]" />
                  <div>
                    <h4 className="font-bold">/ respond</h4>
                    <p className="text-xs text-gray-500">Unified Messaging</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Manage all customer conversations from one unified inbox across all channels.</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#0000FF]">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-8 h-8 text-[#0000FF]" />
                  <div>
                    <h4 className="font-bold">/ post</h4>
                    <p className="text-xs text-gray-500">Content Management</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Create, schedule, and publish content across all your digital channels.</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#0000FF]">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-8 h-8 text-[#0000FF]" />
                  <div>
                    <h4 className="font-bold">/ engage</h4>
                    <p className="text-xs text-gray-500">Live Chat Widget</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Engage visitors in real-time with a customizable chat widget for your website.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-[#EEFBFF] rounded-xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-[#09080E]">Compass Suite</h4>
                <p className="text-sm text-gray-600">All 4 apps: / promote + / respond + / post + / engage</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#0000FF]">$99<span className="text-sm font-normal text-gray-500">/mo</span></div>
                <div className="text-sm text-[#F97316]">Save $37 vs. individual</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Tour Complete!</h3>
            <p className="text-green-600 mb-4">You now understand the full BusinessBlueprint platform.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setLocation("/portal/prescriptions")}
                className="bg-[#0000FF] hover:bg-[#0000CC] text-white"
                data-testid="button-go-to-prescription"
              >
                View My Prescription
              </Button>
              <Button
                variant="outline"
                onClick={resetTour}
                className="border-green-500 text-green-700 hover:bg-green-100"
                data-testid="button-restart-tour"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Replay Tour
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const handleNext = () => {
    markStepComplete(tourSteps[currentStep].id);
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startTour = () => {
    setIsStarted(true);
    setCurrentStep(0);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#EEFBFF] to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="font-['Archivo_Semi_Expanded'] text-3xl font-bold mb-4">
              Business<span className="text-[#F97316]">Blueprint</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#09080E] mb-4">
              Your Free Platform Tour
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A 5-step interactive guide to understanding your prescription and the tools available to grow your business.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {tourSteps.map((step, idx) => (
                <div key={step.id} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: step.color }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-xs font-medium text-gray-700">{step.title.split(":")[1]?.trim() || step.title}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#EEFBFF] rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-[#0000FF]" />
                  <span className="text-sm">Unlimited Replays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#F97316]" />
                  <span className="text-sm">~5 minutes</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={startTour}
                size="lg"
                className="bg-[#F97316] hover:bg-[#EA580C] text-white text-lg px-8 py-6"
                data-testid="button-start-tour"
              >
                <Play className="w-5 h-5 mr-2" /> Begin Your Free Tour
              </Button>
              <p className="text-sm text-gray-500 mt-4">No credit card required</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setLocation("/portal/prescriptions")}
              className="text-[#0000FF]"
              data-testid="link-skip-to-prescription"
            >
              Skip tour and go directly to my prescription →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEFBFF] to-white">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-['Archivo_Semi_Expanded'] text-xl font-bold">
              Business<span className="text-[#F97316]">Blueprint</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetTour}
                data-testid="button-reset-tour"
              >
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
              <span className="text-sm text-gray-500">Step {currentStep + 1} of {tourSteps.length}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tourSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                currentStep === idx
                  ? "bg-[#0000FF] text-white"
                  : completedSteps.includes(step.id)
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              data-testid={`button-step-${idx + 1}`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
              )}
              Step {idx + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-2 border-gray-100">
              <div 
                className="p-6 text-white"
                style={{ backgroundColor: currentTourStep.color }}
              >
                <div className="flex items-center gap-4">
                  {currentTourStep.icon}
                  <div>
                    <h2 className="text-2xl font-bold">{currentTourStep.title}</h2>
                    <p className="opacity-90">{currentTourStep.subtitle}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">{currentTourStep.description}</p>
                {currentTourStep.content}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-2"
            data-testid="button-previous-step"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentStep === idx ? "bg-[#0000FF] w-4" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          
          {currentStep < tourSteps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-[#0000FF] hover:bg-[#0000CC] text-white gap-2"
              data-testid="button-next-step"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                markStepComplete(tourSteps[currentStep].id);
                setLocation("/portal/prescriptions");
              }}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2"
              data-testid="button-finish-tour"
            >
              Finish & View Prescription <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

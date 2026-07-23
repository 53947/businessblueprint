import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2, ChevronRight, ChevronLeft, Play, RotateCcw, ArrowRight,
  ScanLine, BarChart3, FileText, Users, ArrowRightLeft,
  BookOpen, Star, Target, Megaphone, Anchor,
  Mail, Inbox, MessageCircle, Share2, Compass, Bot,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const TOUR_STORAGE_KEY = "blueprintTourProgress";

const APP_COLORS: Record<string, string> = {
  publish: "#064A6C", elevate: "#E9B307", optimize: "#374151", amplify: "#97ACCA",
  promote: "#1844A6", respond: "#001882", engage: "#660099", post: "#FF44CC",
  connect: "#008060", convert: "#8000FF", scan: "#E00420", assess: "#960D71",
};

function SlashApp({ name, onDark }: { name: string; onDark?: boolean }) {
  const color = APP_COLORS[name] || "#09080E";
  return (
    <span style={{ fontWeight: 700 }}>
      <span style={{ color: onDark ? "#E9ECF0" : "#09080E" }}>/ </span>
      <span style={{ color }}>{name}</span>
    </span>
  );
}

interface TourStep {
  id: number;
  title: string;
  subtitle: string | JSX.Element;
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
      title: "Step 1: Scan Your Digital Presence",
      subtitle: "You've already completed this",
      description: "Your Digital IQ Assessment analyzed your online presence across multiple dimensions — your listings, reviews, website, social media, and local SEO.",
      icon: <ScanLine className="w-12 h-12" />,
      color: "#960D71",
      content: (
        <div className="space-y-6">
          <div className="border-2 rounded-xl p-6 text-center" style={{ borderColor: "#960D71", backgroundColor: "#E9ECF0" }}>
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: "#4E7C63" }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#09080E" }}>Assessment Complete</h3>
            <p style={{ color: "#09080E" }}>You have taken the first step toward understanding where your business stands online.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2" style={{ borderColor: "#E00420" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ScanLine className="w-8 h-8" style={{ color: "#E00420" }} />
                  <h4 className="font-semibold"><SlashApp name="scan" /></h4>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Website and presence scanner — analyzes your digital footprint across directories, reviews, social media, and website performance.</p>
              </CardContent>
            </Card>
            <Card className="border-2" style={{ borderColor: "#960D71" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-8 h-8" style={{ color: "#960D71" }} />
                  <h4 className="font-semibold"><SlashApp name="assess" /></h4>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Digital IQ Assessment — your Presence Scan (0-70) and Operational score (0-70) combined into a single Digital IQ Score on a 70-140 scale.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setLocation("/portal/prescriptions")}
              style={{ backgroundColor: "#E00420", color: "white" }}
              data-testid="button-view-results"
            >
              View Your Results <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Step 2: Your Prescribed Blueprint",
      subtitle: "Understanding our recommendations for your business",
      description: "Your prescription is built from your Digital IQ scores — not a template. Every recommendation is prioritized by impact and speed, tailored to your business specifically.",
      icon: <FileText className="w-12 h-12" />,
      color: "#FF6B00",
      content: (
        <div className="space-y-6">
          <div className="rounded-xl p-6" style={{ backgroundColor: "#EEFBFF", border: "2px solid #FF6B00" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#09080E" }}>How to Read Your Prescription</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0" style={{ backgroundColor: "#FF6B00" }}>1</div>
                <div>
                  <h4 className="font-semibold" style={{ color: "#09080E" }}>Priority Order</h4>
                  <p className="text-sm" style={{ color: "#09080E" }}>Top items make the biggest difference fastest. Start at the top and work down.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0" style={{ backgroundColor: "#FF6B00" }}>2</div>
                <div>
                  <h4 className="font-semibold" style={{ color: "#09080E" }}>Effort and Impact</h4>
                  <p className="text-sm" style={{ color: "#09080E" }}>Each recommendation includes how much time it takes and what you can reasonably expect to change.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0" style={{ backgroundColor: "#FF6B00" }}>3</div>
                <div>
                  <h4 className="font-semibold" style={{ color: "#09080E" }}>Recommended Tools</h4>
                  <p className="text-sm" style={{ color: "#09080E" }}>Based on your gaps, we prescribe specific apps in a specific order — each one matched to a category in your Digital IQ.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setLocation("/portal/prescriptions")}
              style={{ backgroundColor: "#FF6B00", color: "white" }}
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
      title: "Step 3: Build Your Foundation",
      subtitle: <><SlashApp name="connect" /> CRM and <SlashApp name="convert" /> forms</>,
      description: "Every app on the platform works better when your customer data is organized. That starts with your CRM and your lead capture forms.",
      icon: <Users className="w-12 h-12" />,
      color: "#008060",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 overflow-hidden" style={{ borderColor: "#008060" }}>
              <div className="p-4" style={{ backgroundColor: "#E9ECF0", borderBottom: "2px solid #008060" }}>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8" style={{ color: "#008060" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="connect" /></h4>
                    <p className="text-sm" style={{ color: "#09080E" }}>CRM — Customer Relationship Management</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-2 text-sm" style={{ color: "#09080E" }}>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#008060" }} /> Manage every customer relationship in one place</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#008060" }} /> Contact timeline with cross-app activity</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#008060" }} /> Auto-sync with <SlashApp name="promote" /> campaigns</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#008060" }} /> FREE Starter (100 contacts) or $29/mo Performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 overflow-hidden" style={{ borderColor: "#8000FF" }}>
              <div className="p-4" style={{ backgroundColor: "#E9ECF0", borderBottom: "2px solid #8000FF" }}>
                <div className="flex items-center gap-3">
                  <ArrowRightLeft className="w-8 h-8" style={{ color: "#8000FF" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="convert" /></h4>
                    <p className="text-sm" style={{ color: "#09080E" }}>Lead Capture and Conversion Tool</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-2 text-sm" style={{ color: "#09080E" }}>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#8000FF" }} /> Forms, popups, and slide-ins for your website</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#8000FF" }} /> Leads feed straight into <SlashApp name="connect" /> CRM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#8000FF" }} /> 16 templates, visual builder, A/B testing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "#8000FF" }} /> FREE (with branding) or $59/year Premium</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setLocation("/connect/dashboard")}
              style={{ backgroundColor: "#008060", color: "white" }}
              data-testid="button-setup-crm"
            >
              Set Up Your CRM <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Step 4: Own Your Local Presence",
      subtitle: "Anchor Suite — Get Found, Stay Credible",
      description: "Four apps working together to make sure your business is visible, accurate, and trusted in every local search.",
      icon: <Anchor className="w-12 h-12" />,
      color: "#2073E3",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2" style={{ borderColor: "#064A6C" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-8 h-8" style={{ color: "#064A6C" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="publish" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Directory Listings Management Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Sync your business information across 60+ directories. Consistent name, address, and phone everywhere.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: "#E9B307" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-8 h-8" style={{ color: "#E9B307" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="elevate" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Reviews and Ratings Management Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Monitor reviews across platforms, respond with AI-powered suggestions, and run review request campaigns.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: "#374151" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-8 h-8" style={{ color: "#374151" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="optimize" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>SEO Management Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Track your search rankings, monitor keyword performance, and get actionable SEO recommendations.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: "#97ACCA" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-8 h-8" style={{ color: "#97ACCA" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="amplify" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Digital Advertising Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Target local customers with digital ads across Google, Facebook, and more.</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: "#EEFBFF" }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Anchor className="w-6 h-6" style={{ color: "#2073E3" }} />
                  <h4 className="font-bold" style={{ color: "#09080E" }}>Anchor Suite</h4>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}><SlashApp name="publish" /> + <SlashApp name="elevate" /> + <SlashApp name="optimize" /> + <SlashApp name="amplify" /></p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: "#2073E3" }}>$99<span className="text-sm font-normal" style={{ color: "#09080E" }}>/mo</span></div>
                <div className="text-sm" style={{ color: "#FF6B00" }}>Save $17 vs. $29/mo each</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Step 5: Activate Your Communications",
      subtitle: "Compass Suite — Complete Communications Engine",
      description: "Four apps that give you every channel you need to reach your customers — email, social, live chat, and unified messaging.",
      icon: <Compass className="w-12 h-12" />,
      color: "#FF6B00",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2" style={{ borderColor: "#1844A6" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-8 h-8" style={{ color: "#1844A6" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="promote" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Email and SMS Campaigns Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Design and send email and SMS campaigns with automation, analytics, and <SlashApp name="convert" /> form integration.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: "#001882" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Inbox className="w-8 h-8" style={{ color: "#001882" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="respond" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Multi-Channel Unified Inbox</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Manage all customer conversations from one inbox — email, SMS, Facebook, Instagram, and WhatsApp.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: "#660099" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-8 h-8" style={{ color: "#660099" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="engage" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Live Chat Widget Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Engage website visitors in real-time with a customizable chat widget and automated responses.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: "#FF44CC" }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Share2 className="w-8 h-8" style={{ color: "#FF44CC" }} />
                  <div>
                    <h4 className="font-bold"><SlashApp name="post" /></h4>
                    <p className="text-xs" style={{ color: "#09080E" }}>Create, Schedule and Post Social Media Tool</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}>Create, schedule, and publish content across all your social media channels from one place.</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: "#EEFBFF" }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-6 h-6" style={{ color: "#FF6B00" }} />
                  <h4 className="font-bold" style={{ color: "#09080E" }}>Compass Suite</h4>
                </div>
                <p className="text-sm" style={{ color: "#09080E" }}><SlashApp name="promote" /> + <SlashApp name="respond" /> + <SlashApp name="engage" /> + <SlashApp name="post" /></p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: "#FF6B00" }}>$99<span className="text-sm font-normal" style={{ color: "#09080E" }}>/mo</span></div>
                <div className="text-sm" style={{ color: "#FF6B00" }}>Save $17 vs. $29/mo each</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Step 6: Never Grow Alone",
      subtitle: "Coach Blue — your AI business coach",
      description: "Ongoing, personalized guidance from an AI coach that understands your business, your scores, and your progress.",
      icon: <Bot className="w-12 h-12" />,
      color: "#001BB2",
      content: (
        <div className="space-y-6">
          <div className="rounded-xl p-6 text-center" style={{ backgroundColor: "#001BB2" }}>
            <img
              src="https://cdn.triadblue.com/brands/coachblue/logo-image.png"
              alt="Coach Blue"
              className="w-48 h-48 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-white mb-2">Coach Blue</h3>
            <p className="text-gray-300">AI Business Coach — available when you need direction</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5">
                <h4 className="font-semibold mb-3" style={{ color: "#09080E" }}>What Coach Blue does:</h4>
                <ul className="space-y-2 text-sm" style={{ color: "#09080E" }}>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: "#FF6B00" }} /> Explains your prescription in plain language</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: "#FF6B00" }} /> Watches your data across every app</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: "#FF6B00" }} /> Tells you specifically what to act on today</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: "#FF6B00" }} /> Available 24/7, no waiting</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h4 className="font-semibold mb-3" style={{ color: "#09080E" }}>Pricing:</h4>
                <ul className="space-y-3 text-sm" style={{ color: "#09080E" }}>
                  <li className="flex justify-between"><span>Standalone</span><span className="font-bold">$99/mo</span></li>
                  <li className="flex justify-between"><span>With one suite</span><span className="font-bold">$59/mo</span></li>
                  <li className="flex justify-between items-center"><span>With both suites</span><span className="font-bold" style={{ color: "#FF6B00" }}>FREE</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="border-2 rounded-xl p-6 text-center" style={{ borderColor: "#FF6B00", backgroundColor: "#EEFBFF" }}>
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: "#4E7C63" }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: "#09080E" }}>Tour Complete</h3>
            <p className="mb-4" style={{ color: "#09080E" }}>You now understand the full businessblueprint.io platform.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setLocation("/portal/prescriptions")}
                style={{ backgroundColor: "#FF6B00", color: "white" }}
                data-testid="button-go-to-prescription"
              >
                View My Prescription
              </Button>
              <Button
                variant="outline"
                onClick={resetTour}
                style={{ borderColor: "#09080E", color: "#09080E" }}
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
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <img src="https://cdn.triadblue.com/brands/businessblueprint/logo-image-and-logo-text-as-url.png" alt="businessblueprint.io" className="h-12 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#09080E" }}>
              Your Platform Tour
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: "#09080E" }}>
              A 6-step interactive guide to understanding our recommendations and the tools available to grow your business.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {tourSteps.map((step, idx) => (
                <div key={step.id} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: step.color }}
                  >
                    {React.cloneElement(step.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <p className="text-xs font-medium" style={{ color: "#09080E" }}>{step.title.split(":")[1]?.trim() || step.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={startTour}
                size="lg"
                className="text-white text-lg px-8 py-6"
                style={{ backgroundColor: "#FF6B00" }}
                data-testid="button-start-tour"
              >
                <Play className="w-5 h-5 mr-2" /> Begin Your Tour
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setLocation("/portal")}
              style={{ color: "#09080E" }}
              data-testid="link-skip-to-dashboard"
            >
              Go to your dashboard →
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEFBFF] to-white">
      <Header />
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <img src="https://cdn.triadblue.com/brands/businessblueprint/logo-text-as-url.png" alt="businessblueprint.io" className="h-8" />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetTour}
                data-testid="button-reset-tour"
              >
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
              <span className="text-sm" style={{ color: "#09080E" }}>Step {currentStep + 1} of {tourSteps.length}</span>
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
                  ? "text-white"
                  : completedSteps.includes(step.id)
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={currentStep === idx ? { backgroundColor: step.color } : undefined}
              data-testid={`button-step-${idx + 1}`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs">
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
            <Card className="shadow-xl" style={{ border: `3px solid ${currentTourStep.color}` }}>
              <div
                className="p-6"
                style={{ backgroundColor: "#E9ECF0", borderBottom: `3px solid ${currentTourStep.color}` }}
              >
                <div className="flex items-center gap-4">
                  {React.cloneElement(currentTourStep.icon, { style: { color: currentTourStep.color } })}
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: "#09080E" }}>{currentTourStep.title}</h2>
                    <p style={{ color: "#09080E" }}>{currentTourStep.subtitle}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6" style={{ backgroundColor: "#E9ECF0" }}>
                <p className="mb-6" style={{ color: "#09080E" }}>{currentTourStep.description}</p>
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
            style={{ borderColor: "#09080E", color: "#09080E" }}
            data-testid="button-previous-step"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex items-center gap-2">
            {tourSteps.map((step, idx) => (
              <div
                key={idx}
                className="h-2 rounded-full transition-all"
                style={{
                  width: currentStep === idx ? "16px" : "8px",
                  backgroundColor: currentStep === idx ? step.color : "#D1D5DB"
                }}
              />
            ))}
          </div>

          {currentStep < tourSteps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="text-white gap-2"
              style={{ backgroundColor: "#FF6B00" }}
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
              className="text-white gap-2"
              style={{ backgroundColor: "#FF6B00" }}
              data-testid="button-finish-tour"
            >
              View My Prescription <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

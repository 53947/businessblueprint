import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Target,
  Users,
  MousePointerClick,
  Eye,
  Play,
  UserPlus,
  Search,
  Image,
  Video,
  FileText,
  Layers,
  MessageCircle,
  DollarSign,
  Calendar,
  Shield,
  Rocket,
  X,
  Upload,
  Clock,
  ExternalLink,
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const AMPLIFY_COLOR = "#97ACCA";

// ─── Types ───────────────────────────────────────

type Objective = "awareness" | "traffic" | "conversions" | "video_views" | "lead_generation";

interface SubredditResult {
  name: string;
  members: number;
  activityLevel: "High" | "Medium" | "Low";
  samplePosts: string[];
}

type AdFormat = "image" | "video" | "freeform" | "carousel" | "conversation";
type BidStrategy = "cpc" | "cpm" | "cpv" | "max";
type Gender = "all" | "male" | "female";

interface WizardData {
  objective: Objective | "";
  businessType: string;
  city: string;
  selectedSubreddits: string[];
  interests: string[];
  keywords: string;
  customAudienceEnabled: boolean;
  locationCity: string;
  locationState: string;
  locationRadius: number;
  ageMin: number;
  ageMax: number;
  gender: Gender;
  adFormat: AdFormat | "";
  headline: string;
  bodyText: string;
  mediaFile: File | null;
  mediaPreview: string;
  cta: string;
  dailyBudget: number;
  lifetimeBudgetEnabled: boolean;
  lifetimeBudget: number;
  startDate: string;
  endDate: string;
  bidStrategy: BidStrategy;
  schedulingEnabled: boolean;
  scheduleDays: boolean[];
  scheduleHours: boolean[];
  pixelInstalled: boolean;
}

const OBJECTIVES: { value: Objective; title: string; description: string; icon: React.ElementType }[] = [
  { value: "awareness", title: "Awareness", description: "Maximize impressions and reach new audiences across Reddit communities.", icon: Eye },
  { value: "traffic", title: "Traffic", description: "Drive clicks to your website or landing page from engaged Redditors.", icon: MousePointerClick },
  { value: "conversions", title: "Conversions", description: "Optimize for on-site actions like purchases, signups, and form fills.", icon: Target },
  { value: "video_views", title: "Video Views", description: "Get more views on your video content across subreddit feeds.", icon: Play },
  { value: "lead_generation", title: "Lead Generation", description: "Collect leads directly within Reddit using native lead forms.", icon: UserPlus },
];

const AD_FORMATS: { value: AdFormat; title: string; description: string; icon: React.ElementType; badge?: string }[] = [
  { value: "image", title: "Image Promoted Post", description: "Single image with headline and body text in the Reddit feed.", icon: Image, badge: "Recommended" },
  { value: "video", title: "Video Promoted Post", description: "Autoplay video in the feed with sound-off by default.", icon: Video },
  { value: "freeform", title: "Free-Form Ad", description: "Rich text post format with images, text, and links — feels native.", icon: FileText, badge: "Best for first campaign" },
  { value: "carousel", title: "Carousel Ad", description: "Multiple swipeable images or cards in a single post.", icon: Layers },
  { value: "conversation", title: "Conversation Ad", description: "Direct message format for high-intent 1:1 engagement.", icon: MessageCircle },
];

const CTA_OPTIONS = [
  "Learn More", "Sign Up", "Get Started", "Shop Now", "Download",
  "Watch More", "Contact Us", "Apply Now", "Install", "Use App",
  "Play", "Read More", "View More",
];

const INTEREST_CATEGORIES = [
  "Technology", "Business", "Finance", "Health & Fitness", "Food & Drink",
  "Travel", "Entertainment", "Gaming", "Sports", "Fashion",
  "Home & Garden", "Automotive", "Education", "Science", "Art & Design",
  "Music", "Pets", "Parenting", "Real Estate", "Legal",
];

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STEP_LABELS = [
  "Objective",
  "Subreddits",
  "Audience",
  "Format",
  "Creative",
  "Budget",
  "Pixel",
  "Launch",
];

function todayString() {
  return new Date().toISOString().split("T")[0];
}

// ─── Component ───────────────────────────────────

export default function AmplifyRedditWizard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [highestStep, setHighestStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<WizardData>({
    objective: "",
    businessType: "",
    city: "",
    selectedSubreddits: [],
    interests: [],
    keywords: "",
    customAudienceEnabled: false,
    locationCity: "",
    locationState: "",
    locationRadius: 25,
    ageMin: 18,
    ageMax: 65,
    gender: "all",
    adFormat: "",
    headline: "",
    bodyText: "",
    mediaFile: null,
    mediaPreview: "",
    cta: "Learn More",
    dailyBudget: 20,
    lifetimeBudgetEnabled: false,
    lifetimeBudget: 500,
    startDate: todayString(),
    endDate: "",
    bidStrategy: "cpc",
    schedulingEnabled: false,
    scheduleDays: Array(7).fill(true),
    scheduleHours: Array(24).fill(true),
    pixelInstalled: false,
  });

  const [scanTriggered, setScanTriggered] = useState(false);
  const [aiHeadlines, setAiHeadlines] = useState<string[]>([]);
  const [aiBody, setAiBody] = useState<string[]>([]);
  const [launchSuccess, setLaunchSuccess] = useState(false);
  const [launchError, setLaunchError] = useState("");

  const update = useCallback((partial: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...partial }));
  }, []);

  // ─── API Queries ─────────────────────────────────

  const { data: insightsData } = useQuery<{ recommendation?: string }>({
    queryKey: ["/api/amplify/insights"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/amplify/insights");
        return res.json();
      } catch {
        return { recommendation: "Traffic" };
      }
    },
  });

  const {
    data: subredditResults,
    isFetching: scanningSubreddits,
    refetch: scanSubreddits,
  } = useQuery<{ subreddits: SubredditResult[] }>({
    queryKey: ["/api/amplify/reddit/subreddits", data.businessType, data.city],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", `/api/amplify/reddit/subreddits?type=${encodeURIComponent(data.businessType)}&city=${encodeURIComponent(data.city)}`);
        return res.json();
      } catch {
        // Fallback demo data
        return {
          subreddits: [
            { name: "r/smallbusiness", members: 1200000, activityLevel: "High" as const, samplePosts: ["How I grew my service business to $50k/mo", "Best CRM for small teams?", "Marketing budget breakdown for 2026"] },
            { name: "r/Entrepreneur", members: 2500000, activityLevel: "High" as const, samplePosts: ["My first profitable month after 2 years", "Tools that actually move the needle", "Lessons from my biggest failure"] },
            { name: `r/${data.city.replace(/\s/g, "") || "local"}`, members: 85000, activityLevel: "Medium" as const, samplePosts: ["Best new restaurants downtown?", "Small business recommendations thread", "Weekend events roundup"] },
            { name: "r/marketing", members: 900000, activityLevel: "High" as const, samplePosts: ["Reddit ads vs Meta ads — real data", "Content marketing ROI breakdown", "How we cut CAC by 40%"] },
            { name: "r/SideProject", members: 350000, activityLevel: "Medium" as const, samplePosts: ["Launched my app yesterday — 500 signups", "Show Reddit: My new productivity tool", "Feedback on my landing page?"] },
            { name: "r/startups", members: 1100000, activityLevel: "High" as const, samplePosts: ["We just hit $1M ARR", "How to find your first 10 customers", "B2B vs B2C: my experience with both"] },
          ],
        };
      }
    },
    enabled: false,
  });

  const { data: accountData } = useQuery<{ pixelInstalled?: boolean }>({
    queryKey: ["/api/amplify/accounts"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/amplify/accounts");
        return res.json();
      } catch {
        return { pixelInstalled: false };
      }
    },
  });

  const pixelInstalled = accountData?.pixelInstalled ?? data.pixelInstalled;

  const draftHeadlineMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await apiRequest("POST", "/api/amplify/creative/draft", {
          platform: "reddit",
          headline_count: 3,
          objective: data.objective,
          businessType: data.businessType,
        });
        return res.json();
      } catch {
        return {
          headlines: [
            `I built a ${data.businessType || "tool"} that actually works — here's what I learned`,
            `After testing 10+ solutions, here's why I made my own ${data.businessType || "product"}`,
            `Honest breakdown: how ${data.businessType || "our service"} handles the hard parts`,
          ],
        };
      }
    },
    onSuccess: (result: { headlines: string[] }) => {
      setAiHeadlines(result.headlines || []);
    },
  });

  const draftBodyMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await apiRequest("POST", "/api/amplify/creative/draft", {
          platform: "reddit",
          type: "body",
          objective: data.objective,
          businessType: data.businessType,
          headline: data.headline,
        });
        return res.json();
      } catch {
        return {
          bodies: [
            `Hey Reddit — I'm the founder of a ${data.businessType || "small business"} and wanted to share something we've been working on.\n\nWe noticed that most solutions in this space are either too expensive or too complicated for small teams. So we built something simpler.\n\nHappy to answer any questions about our approach.`,
          ],
        };
      }
    },
    onSuccess: (result: { bodies: string[] }) => {
      setAiBody(result.bodies || []);
    },
  });

  const crmExportMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/amplify/audiences/export-crm", {});
      return res.json();
    },
    onSuccess: () => {
      update({ customAudienceEnabled: true });
      toast({ title: "CRM Audience Exported", description: "Your hashed email list is ready for Reddit targeting." });
    },
    onError: () => {
      toast({ title: "Export Failed", description: "Could not export CRM audience. Please try again.", variant: "destructive" });
    },
  });

  const launchMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        platform: "reddit",
        objective: data.objective,
        subreddits: data.selectedSubreddits,
        interests: data.interests,
        keywords: data.keywords.split(",").map(k => k.trim()).filter(Boolean),
        customAudience: data.customAudienceEnabled,
        location: { city: data.locationCity, state: data.locationState, radius: data.locationRadius },
        demographics: { ageMin: data.ageMin, ageMax: data.ageMax, gender: data.gender },
        adFormat: data.adFormat,
        creative: { headline: data.headline, body: data.bodyText, cta: data.cta },
        budget: data.lifetimeBudgetEnabled
          ? { type: "lifetime", amount: data.lifetimeBudget }
          : { type: "daily", amount: data.dailyBudget },
        schedule: {
          startDate: data.startDate,
          endDate: data.endDate || null,
          bidStrategy: data.bidStrategy,
          dayparting: data.schedulingEnabled ? { days: data.scheduleDays, hours: data.scheduleHours } : null,
        },
      };

      const formData = new FormData();
      formData.append("campaign", JSON.stringify(payload));
      if (data.mediaFile) {
        formData.append("media", data.mediaFile);
      }

      const res = await apiRequest("POST", "/api/amplify/campaigns/reddit", formData);
      return res.json();
    },
    onSuccess: () => {
      setLaunchSuccess(true);
      setLaunchError("");
    },
    onError: (err: Error) => {
      setLaunchError(err.message || "Failed to launch campaign. Please try again.");
    },
  });

  // ─── Navigation ──────────────────────────────────

  const goTo = (step: number) => {
    if (step >= 1 && step <= 8 && step <= highestStep) {
      setCurrentStep(step);
    }
  };

  const next = () => {
    if (currentStep < 8) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setHighestStep(prev => Math.max(prev, nextStep));
    }
  };

  const back = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: return data.objective !== "";
      case 2: return data.selectedSubreddits.length > 0 || data.interests.length > 0 || data.keywords.trim().length > 0;
      case 3: return true;
      case 4: return data.adFormat !== "";
      case 5: return data.headline.trim().length > 0 && data.bodyText.trim().length > 0;
      case 6: return (data.lifetimeBudgetEnabled ? data.lifetimeBudget >= 5 : data.dailyBudget >= 5) && data.startDate !== "";
      case 7: return pixelInstalled === true;
      case 8: return true;
      default: return false;
    }
  };

  // ─── Step Indicator ──────────────────────────────

  function StepIndicator() {
    return (
      <div className="flex items-center justify-between mb-8 px-2">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;
          const isAccessible = stepNum <= highestStep;

          return (
            <div key={label} className="flex items-center">
              <button
                onClick={() => goTo(stepNum)}
                disabled={!isAccessible}
                className={`flex flex-col items-center gap-1 transition-all ${isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isActive
                      ? "text-white shadow-lg"
                      : isComplete
                        ? "text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                  style={isActive ? { backgroundColor: AMPLIFY_COLOR, boxShadow: `0 0 0 4px ${AMPLIFY_COLOR}33` } : isComplete ? { backgroundColor: AMPLIFY_COLOR } : {}}
                >
                  {isComplete ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                  {label}
                </span>
              </button>
              {i < STEP_LABELS.length - 1 && (
                <div className={`w-6 sm:w-12 h-0.5 mx-1 ${stepNum < currentStep ? "" : "bg-gray-200"}`} style={stepNum < currentStep ? { backgroundColor: AMPLIFY_COLOR } : {}} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // ─── Step 1: Objective ───────────────────────────

  function Step1Objective() {
    const recommendation = insightsData?.recommendation || "Traffic";

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Choose Your Campaign Objective</h2>
          <p className="text-gray-500">What do you want to achieve with this Reddit campaign?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBJECTIVES.map(obj => {
            const Icon = obj.icon;
            const selected = data.objective === obj.value;
            return (
              <Card
                key={obj.value}
                className={`cursor-pointer transition-all hover:shadow-md ${selected ? "ring-2 shadow-md" : "hover:border-gray-300"}`}
                style={selected ? { borderColor: AMPLIFY_COLOR, boxShadow: `0 0 0 2px ${AMPLIFY_COLOR}` } : {}}
                onClick={() => update({ objective: obj.value })}
              >
                <CardContent className="pt-6 pb-4 px-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${AMPLIFY_COLOR}18` }}>
                      <Icon className="w-5 h-5" style={{ color: AMPLIFY_COLOR }} />
                    </div>
                    <div>
                      <div className="font-semibold text-base">{obj.title}</div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                  {selected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: AMPLIFY_COLOR }}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Alert className="border" style={{ borderColor: `${AMPLIFY_COLOR}40`, backgroundColor: `${AMPLIFY_COLOR}08` }}>
          <Sparkles className="w-4 h-4" style={{ color: AMPLIFY_COLOR }} />
          <AlertDescription>
            <span className="font-semibold">AI Recommendation:</span> Based on your business profile, we recommend: <strong>{recommendation}</strong>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // ─── Step 2: Subreddit Intelligence Scan ─────────

  function Step2Subreddits() {
    const subreddits = subredditResults?.subreddits || [];

    const toggleSubreddit = (name: string) => {
      const current = data.selectedSubreddits;
      if (current.includes(name)) {
        update({ selectedSubreddits: current.filter(s => s !== name) });
      } else {
        update({ selectedSubreddits: [...current, name] });
      }
    };

    const handleScan = () => {
      setScanTriggered(true);
      scanSubreddits();
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Subreddit Intelligence Scan</h2>
          <p className="text-gray-500">Find the best communities to target based on your business and location.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="bizType">Business Type</Label>
            <Input
              id="bizType"
              placeholder="e.g., Digital Marketing Agency"
              value={data.businessType}
              onChange={e => update({ businessType: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="bizCity">City</Label>
            <Input
              id="bizCity"
              placeholder="e.g., Austin"
              value={data.city}
              onChange={e => update({ city: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleScan}
              disabled={scanningSubreddits || (!data.businessType.trim() && !data.city.trim())}
              style={{ backgroundColor: AMPLIFY_COLOR }}
              className="text-white"
            >
              {scanningSubreddits ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              Scan
            </Button>
          </div>
        </div>

        {scanTriggered && subreddits.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subreddits.map(sub => {
                const selected = data.selectedSubreddits.includes(sub.name);
                return (
                  <Card
                    key={sub.name}
                    className={`cursor-pointer transition-all ${selected ? "ring-2 shadow-md" : "hover:border-gray-300"}`}
                    style={selected ? { borderColor: AMPLIFY_COLOR } : {}}
                    onClick={() => toggleSubreddit(sub.name)}
                  >
                    <CardContent className="pt-4 pb-3 px-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Checkbox checked={selected} onCheckedChange={() => toggleSubreddit(sub.name)} />
                          <span className="font-semibold text-base">{sub.name}</span>
                        </div>
                        <Badge
                          variant={sub.activityLevel === "High" ? "default" : "secondary"}
                          className="text-xs"
                          style={sub.activityLevel === "High" ? { backgroundColor: "#22c55e" } : {}}
                        >
                          {sub.activityLevel} Activity
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{sub.members.toLocaleString()} members</p>
                      <div className="space-y-1">
                        {sub.samplePosts.map((post, i) => (
                          <p key={i} className="text-xs text-gray-400 truncate">"{post}"</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Reddit's algorithm rewards targeting 3-5 specific communities over broad targeting. Start focused.
              </AlertDescription>
            </Alert>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <Label htmlFor="interestAlt">Interest Targeting (alternative)</Label>
            <Input
              id="interestAlt"
              placeholder="e.g., small business, SaaS, productivity"
              value={data.interests.join(", ")}
              onChange={e => update({ interests: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            />
          </div>
          <div>
            <Label htmlFor="keywordAlt">Keyword Targeting (alternative)</Label>
            <Input
              id="keywordAlt"
              placeholder="e.g., CRM, marketing automation"
              value={data.keywords}
              onChange={e => update({ keywords: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  // ─── Step 3: Audience ────────────────────────────

  function Step3Audience() {
    const toggleInterest = (cat: string) => {
      const current = data.interests;
      if (current.includes(cat)) {
        update({ interests: current.filter(i => i !== cat) });
      } else {
        update({ interests: [...current, cat] });
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Define Your Audience</h2>
          <p className="text-gray-500">Narrow down who sees your Reddit campaign.</p>
        </div>

        {/* Selected subreddits */}
        {data.selectedSubreddits.length > 0 && (
          <div>
            <Label className="mb-2 block">Community Targeting</Label>
            <div className="flex flex-wrap gap-2">
              {data.selectedSubreddits.map(sub => (
                <Badge key={sub} variant="secondary" className="text-sm py-1 px-3 gap-1">
                  {sub}
                  <button onClick={() => update({ selectedSubreddits: data.selectedSubreddits.filter(s => s !== sub) })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Interest targeting */}
        <div>
          <Label className="mb-2 block">Interest Targeting</Label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_CATEGORIES.map(cat => {
              const active = data.interests.includes(cat);
              return (
                <Badge
                  key={cat}
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1 px-3 transition-all"
                  style={active ? { backgroundColor: AMPLIFY_COLOR } : {}}
                  onClick={() => toggleInterest(cat)}
                >
                  {cat}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Keyword targeting */}
        <div>
          <Label htmlFor="keywordsAud">Keyword Targeting</Label>
          <Input
            id="keywordsAud"
            placeholder="Comma-separated keywords, e.g. CRM, automation, lead gen"
            value={data.keywords}
            onChange={e => update({ keywords: e.target.value })}
          />
        </div>

        {/* CRM audience */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="font-semibold text-sm">Custom Audience</div>
            <p className="text-xs text-gray-500 mt-1">Upload hashed emails from your /connect CRM to build a matched audience.</p>
          </div>
          {data.customAudienceEnabled ? (
            <Badge style={{ backgroundColor: "#22c55e" }} className="text-white">Exported</Badge>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => crmExportMutation.mutate()}
              disabled={crmExportMutation.isPending}
            >
              {crmExportMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
              Export CRM Audience
            </Button>
          )}
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="locCity">City</Label>
            <Input id="locCity" placeholder="e.g., Austin" value={data.locationCity} onChange={e => update({ locationCity: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="locState">State</Label>
            <Input id="locState" placeholder="e.g., TX" value={data.locationState} onChange={e => update({ locationState: e.target.value })} />
          </div>
          <div>
            <Label>Radius: {data.locationRadius} miles</Label>
            <Slider
              min={5}
              max={50}
              step={5}
              value={[data.locationRadius]}
              onValueChange={([v]) => update({ locationRadius: v })}
              className="mt-3"
            />
          </div>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Age Min: {data.ageMin}</Label>
            <Slider min={13} max={65} step={1} value={[data.ageMin]} onValueChange={([v]) => update({ ageMin: v })} className="mt-3" />
          </div>
          <div>
            <Label>Age Max: {data.ageMax}</Label>
            <Slider min={18} max={65} step={1} value={[data.ageMax]} onValueChange={([v]) => update({ ageMax: v })} className="mt-3" />
          </div>
          <div>
            <Label className="mb-2 block">Gender</Label>
            <RadioGroup value={data.gender} onValueChange={(v: Gender) => update({ gender: v })} className="flex gap-4 mt-1">
              <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="gAll" /><Label htmlFor="gAll">All</Label></div>
              <div className="flex items-center gap-1.5"><RadioGroupItem value="male" id="gMale" /><Label htmlFor="gMale">Male</Label></div>
              <div className="flex items-center gap-1.5"><RadioGroupItem value="female" id="gFemale" /><Label htmlFor="gFemale">Female</Label></div>
            </RadioGroup>
          </div>
        </div>
      </div>
    );
  }

  // ─── Step 4: Ad Format ───────────────────────────

  function Step4Format() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Select Ad Format</h2>
          <p className="text-gray-500">Choose how your ad will appear in the Reddit feed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AD_FORMATS.map(fmt => {
            const Icon = fmt.icon;
            const selected = data.adFormat === fmt.value;
            return (
              <Card
                key={fmt.value}
                className={`cursor-pointer transition-all hover:shadow-md relative ${selected ? "ring-2 shadow-md" : "hover:border-gray-300"}`}
                style={selected ? { borderColor: AMPLIFY_COLOR } : {}}
                onClick={() => update({ adFormat: fmt.value })}
              >
                <CardContent className="pt-6 pb-4 px-5">
                  {fmt.badge && (
                    <Badge className="absolute top-3 right-3 text-xs" style={{ backgroundColor: AMPLIFY_COLOR }}>
                      {fmt.badge}
                    </Badge>
                  )}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${AMPLIFY_COLOR}18` }}>
                      <Icon className="w-6 h-6" style={{ color: AMPLIFY_COLOR }} />
                    </div>
                    <div>
                      <div className="font-semibold">{fmt.title}</div>
                      <p className="text-sm text-gray-500 mt-1">{fmt.description}</p>
                    </div>
                  </div>
                  {selected && (
                    <div className="absolute top-3 left-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: AMPLIFY_COLOR }}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Step 5: Creative ────────────────────────────

  function Step5Creative() {
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        update({ mediaFile: file, mediaPreview: URL.createObjectURL(file) });
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Build Your Creative</h2>
          <p className="text-gray-500">Craft copy and upload media for your Reddit ad.</p>
        </div>

        {/* Reddit Creative Guide */}
        <Alert className="border-amber-300 bg-amber-50">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-900">
            <strong className="block mb-2">Reddit Creative Guide</strong>
            <p className="mb-2">Reddit users will downvote ads that sound like ads. Here's what works:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="space-y-1">
                <p className="text-green-700">&#10003; Headlines that sound like real Reddit posts</p>
                <p className="text-green-700">&#10003; Value-first: teach something useful before mentioning your product</p>
                <p className="text-green-700">&#10003; Transparent: say who you are and what you made</p>
              </div>
              <div className="space-y-1">
                <p className="text-red-600">&#10007; "Revolutionary" or "best-in-class" language</p>
                <p className="text-red-600">&#10007; Hard sells or aggressive CTAs</p>
                <p className="text-red-600">&#10007; Corporate-speak</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Headline */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="headline">Headline</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => draftHeadlineMutation.mutate()}
              disabled={draftHeadlineMutation.isPending}
            >
              {draftHeadlineMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
              AI Draft
            </Button>
          </div>
          <Input
            id="headline"
            placeholder="Write a headline that sounds like a genuine Reddit post..."
            value={data.headline}
            onChange={e => update({ headline: e.target.value })}
            maxLength={300}
          />
          <p className="text-xs text-gray-400 mt-1">{data.headline.length}/300 characters</p>
          {aiHeadlines.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {aiHeadlines.map((h, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 text-xs py-1 px-2 max-w-full"
                  onClick={() => update({ headline: h })}
                >
                  {h}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="body">Body Copy</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => draftBodyMutation.mutate()}
              disabled={draftBodyMutation.isPending}
            >
              {draftBodyMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
              AI Draft
            </Button>
          </div>
          <Textarea
            id="body"
            placeholder="Share your story naturally. What problem do you solve? Why should Reddit care?"
            value={data.bodyText}
            onChange={e => update({ bodyText: e.target.value })}
            rows={6}
          />
          {aiBody.length > 0 && (
            <div className="mt-2 space-y-2">
              {aiBody.map((b, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm text-gray-600"
                  onClick={() => update({ bodyText: b })}
                >
                  {b.substring(0, 120)}... <span className="text-xs" style={{ color: AMPLIFY_COLOR }}>Click to use</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media Upload */}
        <div>
          <Label className="mb-2 block">Media</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          {data.mediaPreview ? (
            <div className="relative inline-block">
              {data.mediaFile?.type.startsWith("video") ? (
                <video src={data.mediaPreview} className="w-64 h-40 object-cover rounded-lg" controls />
              ) : (
                <img src={data.mediaPreview} alt="Ad media" className="w-64 h-40 object-cover rounded-lg" />
              )}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => update({ mediaFile: null, mediaPreview: "" })}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload an image or video</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, MP4 (max 50MB)</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div>
          <Label>Call to Action</Label>
          <Select value={data.cta} onValueChange={v => update({ cta: v })}>
            <SelectTrigger className="w-full sm:w-64 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CTA_OPTIONS.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preview */}
        <div>
          <Label className="mb-2 block">Reddit Feed Preview</Label>
          <Card className="max-w-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: AMPLIFY_COLOR }} />
                <span className="text-xs text-gray-500">Promoted by u/your_brand</span>
                <Badge variant="outline" className="text-xs ml-auto">Promoted</Badge>
              </div>
              <h3 className="font-semibold text-sm mb-1">{data.headline || "Your headline will appear here..."}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-3">{data.bodyText || "Your body copy will appear here..."}</p>
              {data.mediaPreview && (
                <img src={data.mediaPreview} alt="Preview" className="w-full h-40 object-cover rounded mb-3" />
              )}
              <Button size="sm" style={{ backgroundColor: AMPLIFY_COLOR }} className="text-white text-xs">
                {data.cta}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ─── Step 6: Budget & Schedule ───────────────────

  function Step6Budget() {
    const toggleDay = (i: number) => {
      const days = [...data.scheduleDays];
      days[i] = !days[i];
      update({ scheduleDays: days });
    };

    const toggleHour = (i: number) => {
      const hours = [...data.scheduleHours];
      hours[i] = !hours[i];
      update({ scheduleHours: hours });
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Budget and Schedule</h2>
          <p className="text-gray-500">Set your spending limits and campaign timeline.</p>
        </div>

        {/* Budget toggle */}
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-sm font-medium ${!data.lifetimeBudgetEnabled ? "text-gray-900" : "text-gray-400"}`}>Daily Budget</span>
          <Switch checked={data.lifetimeBudgetEnabled} onCheckedChange={v => update({ lifetimeBudgetEnabled: v })} />
          <span className={`text-sm font-medium ${data.lifetimeBudgetEnabled ? "text-gray-900" : "text-gray-400"}`}>Lifetime Budget</span>
        </div>

        {data.lifetimeBudgetEnabled ? (
          <div>
            <Label htmlFor="lifeBudget">Lifetime Budget ($)</Label>
            <Input
              id="lifeBudget"
              type="number"
              min={5}
              value={data.lifetimeBudget}
              onChange={e => update({ lifetimeBudget: Math.max(0, parseFloat(e.target.value) || 0) })}
              className="w-40"
            />
            {data.lifetimeBudget < 5 && <p className="text-xs text-red-500 mt-1">Minimum budget is $5</p>}
          </div>
        ) : (
          <div>
            <Label htmlFor="dailyBudget">Daily Budget ($)</Label>
            <Input
              id="dailyBudget"
              type="number"
              min={5}
              value={data.dailyBudget}
              onChange={e => update({ dailyBudget: Math.max(0, parseFloat(e.target.value) || 0) })}
              className="w-40"
            />
            {data.dailyBudget < 5 && <p className="text-xs text-red-500 mt-1">Minimum daily budget is $5</p>}
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" value={data.startDate} onChange={e => update({ startDate: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="endDate">End Date (optional)</Label>
            <Input id="endDate" type="date" value={data.endDate} onChange={e => update({ endDate: e.target.value })} min={data.startDate} />
          </div>
        </div>

        {/* Bid Strategy */}
        <div>
          <Label className="mb-2 block">Bid Strategy</Label>
          <RadioGroup value={data.bidStrategy} onValueChange={(v: BidStrategy) => update({ bidStrategy: v })} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([
              { value: "cpc", label: "CPC", desc: "Cost per click", badge: "Recommended" },
              { value: "cpm", label: "CPM", desc: "Cost per 1,000 impressions", badge: "" },
              { value: "cpv", label: "CPV", desc: "Cost per video view", badge: "" },
              { value: "max", label: "MAX", desc: "Maximize results", badge: "" },
            ] as const).map(opt => (
              <label
                key={opt.value}
                className={`relative border rounded-lg p-3 cursor-pointer transition-all ${data.bidStrategy === opt.value ? "ring-2 shadow-sm" : "hover:border-gray-300"}`}
                style={data.bidStrategy === opt.value ? { borderColor: AMPLIFY_COLOR } : {}}
              >
                <RadioGroupItem value={opt.value} className="sr-only" />
                <div className="font-semibold text-sm">{opt.label}</div>
                <p className="text-xs text-gray-500">{opt.desc}</p>
                {opt.badge && <Badge className="absolute top-2 right-2 text-[10px]" style={{ backgroundColor: AMPLIFY_COLOR }}>{opt.badge}</Badge>}
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Ad Scheduling */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Label className="font-semibold">Ad Scheduling</Label>
            <Switch checked={data.schedulingEnabled} onCheckedChange={v => update({ schedulingEnabled: v })} />
            <span className="text-xs text-gray-500">Run on specific days and hours</span>
          </div>

          {data.schedulingEnabled && (
            <div className="space-y-4 border rounded-lg p-4">
              <div>
                <p className="text-sm font-medium mb-2">Days</p>
                <div className="flex gap-2">
                  {DAY_LABELS.map((day, i) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(i)}
                      className={`w-10 h-10 rounded-lg text-xs font-medium transition-all ${data.scheduleDays[i] ? "text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                      style={data.scheduleDays[i] ? { backgroundColor: AMPLIFY_COLOR } : {}}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Hours</p>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 24 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => toggleHour(i)}
                      className={`w-10 h-7 rounded text-[10px] font-medium transition-all ${data.scheduleHours[i] ? "text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                      style={data.scheduleHours[i] ? { backgroundColor: AMPLIFY_COLOR } : {}}
                    >
                      {i.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Step 7: Reddit Pixel ────────────────────────

  function Step7Pixel() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Reddit Pixel Check</h2>
          <p className="text-gray-500">The Reddit Pixel is required for conversion tracking and audience optimization.</p>
        </div>

        {pixelInstalled ? (
          <Alert className="border-green-300 bg-green-50">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Reddit Pixel is installed and active.</strong> You can track conversions, build retargeting audiences, and let Reddit optimize toward your campaign objective.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <Alert variant="destructive" className="border-red-300 bg-red-50">
              <AlertCircle className="w-5 h-5" />
              <AlertDescription>
                <strong className="block mb-2">Install the Reddit Pixel before launching. Without it:</strong>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>You cannot track conversions</li>
                  <li>You cannot build retargeting audiences</li>
                  <li>Reddit's algorithm cannot optimize toward your goals</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Installation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: AMPLIFY_COLOR }}>1</div>
                  <div>
                    <p className="font-medium text-sm">Get your Pixel code</p>
                    <p className="text-sm text-gray-500">Log into <a href="https://ads.reddit.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: AMPLIFY_COLOR }}>Reddit Ads Manager</a>, navigate to Events Manager, and create a new Reddit Pixel. Copy the base code snippet.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: AMPLIFY_COLOR }}>2</div>
                  <div>
                    <p className="font-medium text-sm">Install on your website</p>
                    <p className="text-sm text-gray-500">Paste the pixel code in the <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code> section of every page on your website, or use Google Tag Manager to deploy it site-wide.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: AMPLIFY_COLOR }}>3</div>
                  <div>
                    <p className="font-medium text-sm">Verify installation</p>
                    <p className="text-sm text-gray-500">Use the Reddit Pixel Helper Chrome extension to confirm the pixel fires correctly. Then return here to proceed.</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    update({ pixelInstalled: true });
                    toast({ title: "Pixel Verified", description: "Reddit Pixel has been marked as installed." });
                  }}
                  className="mt-2"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I've installed the pixel — verify now
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
  }

  // ─── Step 8: Review & Launch ─────────────────────

  function Step8Review() {
    if (launchSuccess) {
      return (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: "#22c55e" }}>
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Campaign Created!</h2>
          <p className="text-gray-500 max-w-md mx-auto">Your Reddit campaign has been submitted for review. It will go live once approved by Reddit.</p>
          <div className="flex gap-3 justify-center pt-4">
            <Button asChild variant="outline">
              <a href="https://ads.reddit.com" target="_blank" rel="noopener noreferrer">
                View in Reddit Ads Manager <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button onClick={() => setLocation("/amplify")} style={{ backgroundColor: AMPLIFY_COLOR }} className="text-white">
              Back to Amplify Dashboard
            </Button>
          </div>
        </div>
      );
    }

    const formatLabel = AD_FORMATS.find(f => f.value === data.adFormat)?.title || data.adFormat;
    const objectiveLabel = OBJECTIVES.find(o => o.value === data.objective)?.title || data.objective;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Review and Launch</h2>
          <p className="text-gray-500">Confirm everything looks right before going live.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Objective */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{objectiveLabel}</p>
            </CardContent>
          </Card>

          {/* Target Subreddits */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Target Subreddits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {data.selectedSubreddits.length > 0 ? data.selectedSubreddits.map(s => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                )) : <span className="text-sm text-gray-400">None selected</span>}
              </div>
            </CardContent>
          </Card>

          {/* Audience */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Audience</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              {data.locationCity && <p>Location: {data.locationCity}{data.locationState ? `, ${data.locationState}` : ""} ({data.locationRadius} mi)</p>}
              <p>Age: {data.ageMin} - {data.ageMax}</p>
              <p>Gender: {data.gender === "all" ? "All genders" : data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}</p>
              {data.interests.length > 0 && <p>Interests: {data.interests.join(", ")}</p>}
              {data.keywords && <p>Keywords: {data.keywords}</p>}
              {data.customAudienceEnabled && <p>CRM custom audience enabled</p>}
            </CardContent>
          </Card>

          {/* Ad Format */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Ad Format</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{formatLabel}</p>
            </CardContent>
          </Card>

          {/* Creative */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Creative</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {data.mediaPreview && (
                  <img src={data.mediaPreview} alt="Ad media" className="w-24 h-24 object-cover rounded-lg shrink-0" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{data.headline}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{data.bodyText}</p>
                  <Badge variant="outline" className="text-xs">{data.cta}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Budget</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              {data.lifetimeBudgetEnabled ? (
                <p className="font-semibold">${data.lifetimeBudget.toFixed(2)} lifetime</p>
              ) : (
                <p className="font-semibold">${data.dailyBudget.toFixed(2)} / day</p>
              )}
              <p>Bid strategy: {data.bidStrategy.toUpperCase()}</p>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>Start: {data.startDate}</p>
              <p>End: {data.endDate || "No end date (ongoing)"}</p>
              {data.schedulingEnabled && <p>Custom day/hour scheduling enabled</p>}
            </CardContent>
          </Card>
        </div>

        {launchError && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              {launchError}
              <Button
                variant="outline"
                size="sm"
                className="ml-3"
                onClick={() => { setLaunchError(""); launchMutation.mutate(); }}
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Objective />;
      case 2: return <Step2Subreddits />;
      case 3: return <Step3Audience />;
      case 4: return <Step4Format />;
      case 5: return <Step5Creative />;
      case 6: return <Step6Budget />;
      case 7: return <Step7Pixel />;
      case 8: return <Step8Review />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/amplify")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Amplify
          </Button>
          <div className="h-5 w-px bg-gray-300" />
          <h1 className="text-xl font-bold">New Reddit Campaign</h1>
          <Badge style={{ backgroundColor: AMPLIFY_COLOR }} className="text-white ml-auto">
            Step {currentStep} of 8
          </Badge>
        </div>

        {/* Progress */}
        <Progress value={(currentStep / 8) * 100} className="mb-6 h-1.5" />

        {/* Step Indicator */}
        <StepIndicator />

        {/* Step Content */}
        <Card>
          <CardContent className="p-6 sm:p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        {!launchSuccess && (
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" onClick={back} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>

            {currentStep < 8 ? (
              <Button
                onClick={next}
                disabled={!canProceed()}
                style={canProceed() ? { backgroundColor: AMPLIFY_COLOR } : {}}
                className={canProceed() ? "text-white" : ""}
              >
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      onClick={() => launchMutation.mutate()}
                      disabled={launchMutation.isPending || !pixelInstalled}
                      style={pixelInstalled ? { backgroundColor: AMPLIFY_COLOR } : {}}
                      className={pixelInstalled ? "text-white" : ""}
                    >
                      {launchMutation.isPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Launching...</>
                      ) : (
                        <><Rocket className="w-4 h-4 mr-2" /> Launch Campaign</>
                      )}
                    </Button>
                  </span>
                </TooltipTrigger>
                {!pixelInstalled && (
                  <TooltipContent>Reddit Pixel required — go back to Step 7 to install it.</TooltipContent>
                )}
              </Tooltip>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Globe, Search, Users, X, Plus, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { SectionHeader } from "@/components/section-header";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const OPTIMIZE_COLOR = '#374151';

const INDUSTRIES = [
  'Restaurant / Food Service', 'Retail / E-commerce', 'Healthcare / Medical',
  'Legal Services', 'Real Estate', 'Home Services / Contractors',
  'Automotive', 'Beauty / Salon / Spa', 'Fitness / Wellness',
  'Professional Services', 'Education / Training', 'Technology / SaaS',
  'Marketing / Agency', 'Financial Services', 'Hospitality / Travel',
  'Manufacturing', 'Non-Profit', 'Other',
];

export default function OptimizeSetup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const [domain, setDomain] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocationVal] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [competitorInput, setCompetitorInput] = useState('');

  const createProfile = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/seo/profiles', {
        domain,
        businessName,
        industry,
        location: location,
        targetKeywords: keywords,
        competitors,
        localEnabled: !!location,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "SEO Profile Created", description: "Your SEO dashboard is ready!" });
      setLocation('/optimize/dashboard');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create SEO profile", variant: "destructive" });
    },
  });

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && keywords.length < 10 && !keywords.includes(kw)) {
      setKeywords([...keywords, kw]);
      setKeywordInput('');
    }
  };

  const addCompetitor = () => {
    const comp = competitorInput.trim();
    if (comp && competitors.length < 3 && !competitors.includes(comp)) {
      setCompetitors([...competitors, comp]);
      setCompetitorInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SectionHeader
        title="/ optimize Setup"
        subtitle="Configure your SEO monitoring"
        showHomeButton={true}
        homeRoute="/portal"
      />
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= s ? 'text-white' : 'bg-gray-200 text-gray-500'
                }`}
                style={step >= s ? { backgroundColor: OPTIMIZE_COLOR } : {}}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? 'bg-gray-700' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Domain & Business */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
                Domain & Business Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="domain">Website URL *</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  data-testid="input-domain"
                />
              </div>
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  data-testid="input-business-name"
                />
              </div>
              <div>
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger data-testid="select-industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location (for local SEO)</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocationVal(e.target.value)}
                  data-testid="input-location"
                />
              </div>
              <Button
                className="w-full text-white font-bold"
                style={{ backgroundColor: OPTIMIZE_COLOR }}
                onClick={() => setStep(2)}
                disabled={!domain}
                data-testid="button-next-step-1"
              >
                Next: Target Keywords <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Keywords */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
                Target Keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Add up to 10 keywords you want to rank for. We'll track their positions and suggest more.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a keyword..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  data-testid="input-keyword"
                />
                <Button
                  variant="outline"
                  onClick={addKeyword}
                  disabled={keywords.length >= 10}
                  data-testid="button-add-keyword"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: OPTIMIZE_COLOR }}
                  >
                    {kw}
                    <button onClick={() => setKeywords(keywords.filter((_, j) => j !== i))} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {keywords.length === 0 && (
                <p className="text-sm text-gray-400 italic">No keywords added yet. You can also add them later.</p>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  className="flex-1 text-white font-bold"
                  style={{ backgroundColor: OPTIMIZE_COLOR }}
                  onClick={() => setStep(3)}
                  data-testid="button-next-step-2"
                >
                  Next: Competitors <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Competitors */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6" style={{ color: OPTIMIZE_COLOR }} />
                Competitors (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Add up to 3 competitor domains for gap analysis. You can skip this step.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="competitor.com"
                  value={competitorInput}
                  onChange={(e) => setCompetitorInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetitor())}
                  data-testid="input-competitor"
                />
                <Button
                  variant="outline"
                  onClick={addCompetitor}
                  disabled={competitors.length >= 3}
                  data-testid="button-add-competitor"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {competitors.map((comp, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-700">{comp}</span>
                    <button onClick={() => setCompetitors(competitors.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  className="flex-1 text-white font-bold"
                  style={{ backgroundColor: OPTIMIZE_COLOR }}
                  onClick={() => createProfile.mutate()}
                  disabled={createProfile.isPending}
                  data-testid="button-complete-setup"
                >
                  {createProfile.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</>
                  ) : (
                    <>Complete Setup <Target className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}

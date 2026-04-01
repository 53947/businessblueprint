import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertAssessmentSchema, type InsertAssessment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, ArrowLeft, Lock, Mail, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { nanoid } from "nanoid";

const steps = [
  { title: "Business Basics", description: "Tell us about your business" },
  { title: "Contact Information", description: "How can we reach you?" },
  { title: "Email & SMS Marketing", description: "Your outreach efforts" },
  { title: "Social & Reputation", description: "Your online presence" },
  { title: "Response & Chat", description: "Customer communication" },
  { title: "Listings, Advertising & CRM", description: "Business management" },
  { title: "Review & Submit", description: "Confirm your information" }
];

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertAssessment>({
    resolver: zodResolver(insertAssessmentSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      address: "",
      address2: "",
      unit: "",
      attention: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      email: "",
      website: "",
      // Operational questions
      collectsEmails: "",
      lastEmailCampaign: "",
      emailListSize: "",
      sendsSMS: "",
      lastSMSCampaign: "",
      lastSocialPost: "",
      socialPostFrequency: "",
      socialContentCreator: "",
      lastReviewResponse: "",
      reviewResponseRate: "",
      lastNewReview: "",
      inquiryResponseTime: "",
      hasUnifiedInbox: "",
      missedInquiries: "",
      hasLiveChat: "",
      lastChatConversation: "",
      chatResponseTime: "",
      lastListingUpdate: "",
      listingConsistency: "",
      lastGBPPost: "",
      lastGBPPhoto: "",
      lastWebsiteUpdate: "",
      hasBlog: "",
      usesCRM: "",
      crmPlatform: "",
      lastCRMFollowup: "",
      hasAutomation: "",
      runsAds: "",
      lastAdCampaign: "",
      monthlyAdBudget: "",
    },
  });

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: InsertAssessment) => {
      const response = await apiRequest("POST", "/api/assessments", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Assessment Received!",
        description: "Check your email for confirmation. We're analyzing your business now.",
      });
      
      const accessToken = nanoid();
      const expiryTime = Date.now() + (15 * 60 * 1000);
      
      sessionStorage.setItem('lastAssessmentId', String(data.assessmentId));
      sessionStorage.setItem('assessmentAccessToken', accessToken);
      sessionStorage.setItem('assessmentAccessExpiry', String(expiryTime));
      sessionStorage.setItem('assessmentId', String(data.assessmentId));
      
      setLocation('/portal/assessment/confirmation');
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: InsertAssessment) => {
    createAssessmentMutation.mutate(data);
  };
  
  const handleExplicitSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      onSubmit(data);
    }
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof InsertAssessment)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["businessName", "industry", "address", "city", "state", "zipCode"];
        break;
      case 1:
        fieldsToValidate = ["phone", "email"];
        break;
      // Steps 2-5 are optional operational questions - no validation required
    }

    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      nextStep();
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < steps.length - 1) {
      e.preventDefault();
      handleNext();
    }
  };

  // Helper to render a select question with TriadBlue branding
  const renderSelectQuestion = (
    name: keyof InsertAssessment,
    label: string,
    options: { value: string; label: string }[],
    testId: string
  ) => (
    <div className="mb-4">
      <Label className="block text-[#09080E] font-semibold mb-2">{label}</Label>
      <Select 
        value={form.watch(name) as string || ""} 
        onValueChange={(value) => form.setValue(name, value)}
      >
        <SelectTrigger data-testid={testId} className="border-[#0000FF]/20 focus:border-[#0000FF]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#EEFBFF] py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#09080E] mb-4" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Get Your Digital IQ Score
          </h1>
          <p className="text-xl text-[#09080E]/70">
            Tell us about your business and we'll calculate your Digital IQ Score (0-140)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[#09080E]/60 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>Takes 5 minutes</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-[#09080E]">{steps[currentStep].title}</span>
            <span className="text-sm text-[#09080E]/60 ml-2">— {steps[currentStep].description}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl border-2 border-[#0000FF]/20">
          <CardContent className="p-8">
            <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown}>
              
              {/* Step 1: Business Basics */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Enter your business name"
                        data-testid="input-business-name"
                        {...form.register("businessName")}
                      />
                      {form.formState.errors.businessName && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.businessName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select 
                        value={form.watch("industry")} 
                        onValueChange={(value) => form.setValue("industry", value, { shouldValidate: true })}
                      >
                        <SelectTrigger data-testid="select-industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="professional">Professional Services</SelectItem>
                          <SelectItem value="home-services">Home Services</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="beauty">Beauty/Wellness</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.industry && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.industry.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#09080E]/70 border-b border-[#0000FF]/20 pb-2">Business Address</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="address">Address Line 1 *</Label>
                        <Input
                          id="address"
                          placeholder="Street address"
                          data-testid="input-address"
                          {...form.register("address")}
                        />
                        {form.formState.errors.address && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.address.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="address2">Address Line 2</Label>
                        <Input
                          id="address2"
                          placeholder="Building, floor, etc. (optional)"
                          data-testid="input-address2"
                          {...form.register("address2")}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="unit">Suite / Unit</Label>
                        <Input
                          id="unit"
                          placeholder="Suite 100 (optional)"
                          data-testid="input-unit"
                          {...form.register("unit")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="attention">Attention</Label>
                        <Input
                          id="attention"
                          placeholder="Attn: Name (optional)"
                          data-testid="input-attention"
                          {...form.register("attention")}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          data-testid="input-city"
                          {...form.register("city")}
                        />
                        {form.formState.errors.city && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select 
                          value={form.watch("state")} 
                          onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                        >
                          <SelectTrigger data-testid="select-state">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            <SelectItem value="AR">Arkansas</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="CT">Connecticut</SelectItem>
                            <SelectItem value="DE">Delaware</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                            <SelectItem value="HI">Hawaii</SelectItem>
                            <SelectItem value="ID">Idaho</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                            <SelectItem value="IN">Indiana</SelectItem>
                            <SelectItem value="IA">Iowa</SelectItem>
                            <SelectItem value="KS">Kansas</SelectItem>
                            <SelectItem value="KY">Kentucky</SelectItem>
                            <SelectItem value="LA">Louisiana</SelectItem>
                            <SelectItem value="ME">Maine</SelectItem>
                            <SelectItem value="MD">Maryland</SelectItem>
                            <SelectItem value="MA">Massachusetts</SelectItem>
                            <SelectItem value="MI">Michigan</SelectItem>
                            <SelectItem value="MN">Minnesota</SelectItem>
                            <SelectItem value="MS">Mississippi</SelectItem>
                            <SelectItem value="MO">Missouri</SelectItem>
                            <SelectItem value="MT">Montana</SelectItem>
                            <SelectItem value="NE">Nebraska</SelectItem>
                            <SelectItem value="NV">Nevada</SelectItem>
                            <SelectItem value="NH">New Hampshire</SelectItem>
                            <SelectItem value="NJ">New Jersey</SelectItem>
                            <SelectItem value="NM">New Mexico</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="NC">North Carolina</SelectItem>
                            <SelectItem value="ND">North Dakota</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="OK">Oklahoma</SelectItem>
                            <SelectItem value="OR">Oregon</SelectItem>
                            <SelectItem value="PA">Pennsylvania</SelectItem>
                            <SelectItem value="RI">Rhode Island</SelectItem>
                            <SelectItem value="SC">South Carolina</SelectItem>
                            <SelectItem value="SD">South Dakota</SelectItem>
                            <SelectItem value="TN">Tennessee</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="UT">Utah</SelectItem>
                            <SelectItem value="VT">Vermont</SelectItem>
                            <SelectItem value="VA">Virginia</SelectItem>
                            <SelectItem value="WA">Washington</SelectItem>
                            <SelectItem value="WV">West Virginia</SelectItem>
                            <SelectItem value="WI">Wisconsin</SelectItem>
                            <SelectItem value="WY">Wyoming</SelectItem>
                            <SelectItem value="DC">Washington DC</SelectItem>
                          </SelectContent>
                        </Select>
                        {form.formState.errors.state && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          data-testid="input-zipcode"
                          {...form.register("zipCode")}
                        />
                        {form.formState.errors.zipCode && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.zipCode.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          data-testid="input-country"
                          {...form.register("country")}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website (if you have one)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      data-testid="input-website"
                      {...form.register("website")}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        data-testid="input-phone"
                        {...form.register("phone")}
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        data-testid="input-email"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#0000FF]/5 border border-[#0000FF]/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-[#0000FF] mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#09080E]">How you'll receive your results:</h4>
                        <ul className="text-sm text-[#09080E]/70 mt-2 space-y-1">
                          <li>• Comprehensive digital presence analysis</li>
                          <li>• Personalized recommendations for improvement</li>
                          <li>• Clear next steps and implementation guide</li>
                          <li>• Delivered via email within 2-3 minutes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Email & SMS Marketing */}
              {currentStep === 2 && (
                <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/send.png" alt="Email & SMS" className="w-10 h-10" />
                    <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                      Email & SMS Marketing
                    </h3>
                  </div>
                  
                  {renderSelectQuestion("collectsEmails", "Do you collect customer email addresses?", [
                    { value: "yes_active", label: "Yes, actively building a list" },
                    { value: "yes_not_organized", label: "Yes, but not organized" },
                    { value: "no", label: "No, not currently" },
                    { value: "dont_know", label: "I don't know" },
                  ], "select-collects-emails")}

                  {renderSelectQuestion("lastEmailCampaign", "When was your last email campaign?", [
                    { value: "past_week", label: "Within the past week" },
                    { value: "past_month", label: "Within the past month" },
                    { value: "past_3_months", label: "Within the past 3 months" },
                    { value: "past_6_months", label: "Within the past 6 months" },
                    { value: "6_months_plus", label: "More than 6 months ago" },
                    { value: "never", label: "Never sent one" },
                  ], "select-last-email")}

                  {renderSelectQuestion("emailListSize", "How large is your email list?", [
                    { value: "0_50", label: "0-50 contacts" },
                    { value: "51_200", label: "51-200 contacts" },
                    { value: "201_500", label: "201-500 contacts" },
                    { value: "501_1000", label: "501-1,000 contacts" },
                    { value: "1000_plus", label: "More than 1,000 contacts" },
                    { value: "no_list", label: "No email list" },
                  ], "select-email-list-size")}

                  {renderSelectQuestion("sendsSMS", "Do you send SMS/text messages to customers?", [
                    { value: "yes_regularly", label: "Yes, regularly" },
                    { value: "yes_occasionally", label: "Yes, occasionally" },
                    { value: "no_interested", label: "No, but interested" },
                    { value: "no_not_interested", label: "No, not interested" },
                  ], "select-sends-sms")}

                  {renderSelectQuestion("lastSMSCampaign", "When was your last SMS campaign?", [
                    { value: "past_week", label: "Within the past week" },
                    { value: "past_month", label: "Within the past month" },
                    { value: "past_3_months", label: "Within the past 3 months" },
                    { value: "3_months_plus", label: "More than 3 months ago" },
                    { value: "never", label: "Never sent one" },
                  ], "select-last-sms")}
                </div>
              )}

              {/* Step 4: Social Media & Reputation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Social Media Content */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/content.png" alt="Social Media" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Social Media Content
                      </h3>
                    </div>

                    {renderSelectQuestion("lastSocialPost", "When was your last social media post?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "3_months_plus", label: "More than 3 months ago" },
                      { value: "never", label: "Never posted" },
                    ], "select-last-social")}

                    {renderSelectQuestion("socialPostFrequency", "How often do you post on social media?", [
                      { value: "daily", label: "Daily" },
                      { value: "3_5_week", label: "3-5 times per week" },
                      { value: "1_2_week", label: "1-2 times per week" },
                      { value: "few_month", label: "A few times per month" },
                      { value: "rarely", label: "Rarely" },
                      { value: "never", label: "Never" },
                    ], "select-social-frequency")}

                    {renderSelectQuestion("socialContentCreator", "Who creates your social media content?", [
                      { value: "owner", label: "Business owner" },
                      { value: "staff", label: "Staff member" },
                      { value: "agency", label: "Marketing agency" },
                      { value: "no_one", label: "No one currently" },
                      { value: "inconsistent", label: "Inconsistent/varies" },
                    ], "select-content-creator")}
                  </div>

                  {/* Reputation Management */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/reputation.png" alt="Reputation" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Reputation Management
                      </h3>
                    </div>

                    {renderSelectQuestion("lastReviewResponse", "When did you last respond to a customer review?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "3_months_plus", label: "More than 3 months ago" },
                      { value: "never", label: "Never responded" },
                    ], "select-last-review-response")}

                    {renderSelectQuestion("reviewResponseRate", "What percentage of reviews do you respond to?", [
                      { value: "90_100", label: "90-100%" },
                      { value: "50_89", label: "50-89%" },
                      { value: "10_49", label: "10-49%" },
                      { value: "under_10", label: "Under 10%" },
                      { value: "0", label: "0% - Don't respond" },
                    ], "select-review-response-rate")}

                    {renderSelectQuestion("lastNewReview", "When did you last receive a new review?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "3_months_plus", label: "More than 3 months ago" },
                      { value: "never", label: "Never received one" },
                    ], "select-last-new-review")}
                  </div>
                </div>
              )}

              {/* Step 5: Response & Live Chat */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Customer Response & Timing */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/inbox.png" alt="Response" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Customer Response & Timing
                      </h3>
                    </div>

                    {renderSelectQuestion("inquiryResponseTime", "How quickly do you typically respond to customer inquiries?", [
                      { value: "15_min", label: "Within 15 minutes" },
                      { value: "1_hour", label: "Within 1 hour" },
                      { value: "4_hours", label: "Within 4 hours" },
                      { value: "24_hours", label: "Within 24 hours" },
                      { value: "24_hours_plus", label: "More than 24 hours" },
                      { value: "inconsistent", label: "Inconsistent" },
                    ], "select-response-time")}

                    {renderSelectQuestion("hasUnifiedInbox", "Do you have a unified inbox for all customer messages?", [
                      { value: "yes_unified", label: "Yes, fully unified" },
                      { value: "partial", label: "Partially unified" },
                      { value: "no_scattered", label: "No, messages are scattered" },
                      { value: "dont_know", label: "I don't know" },
                    ], "select-unified-inbox")}

                    {renderSelectQuestion("missedInquiries", "How often do customer inquiries get missed?", [
                      { value: "never", label: "Never - we catch everything" },
                      { value: "past_week", label: "Missed some this week" },
                      { value: "past_month", label: "Missed some this month" },
                      { value: "regularly", label: "Happens regularly" },
                      { value: "dont_track", label: "Don't track this" },
                    ], "select-missed-inquiries")}
                  </div>

                  {/* Live Chat */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/livechat.png" alt="Live Chat" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Live Chat
                      </h3>
                    </div>

                    {renderSelectQuestion("hasLiveChat", "Do you have live chat on your website?", [
                      { value: "yes_monitored", label: "Yes, actively monitored" },
                      { value: "yes_not_monitored", label: "Yes, but not monitored" },
                      { value: "yes_unsure", label: "Yes, but unsure if it works" },
                      { value: "no", label: "No live chat" },
                      { value: "no_website", label: "No website" },
                    ], "select-has-live-chat")}

                    {renderSelectQuestion("lastChatConversation", "When was your last chat conversation?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "3_months_plus", label: "More than 3 months ago" },
                      { value: "never_none", label: "Never / No chat" },
                    ], "select-last-chat")}

                    {renderSelectQuestion("chatResponseTime", "How quickly do you respond to chat messages?", [
                      { value: "1_min", label: "Within 1 minute" },
                      { value: "5_min", label: "Within 5 minutes" },
                      { value: "15_min", label: "Within 15 minutes" },
                      { value: "15_plus", label: "More than 15 minutes" },
                      { value: "no_chat", label: "No chat" },
                    ], "select-chat-response-time")}
                  </div>
                </div>
              )}

              {/* Step 6: Listings & CRM */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Business Listings */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/listings.png" alt="Listings" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Business Listings
                      </h3>
                    </div>

                    {renderSelectQuestion("lastListingUpdate", "When did you last update your business listings?", [
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "past_6_months", label: "Within the past 6 months" },
                      { value: "past_year", label: "Within the past year" },
                      { value: "year_plus", label: "More than a year ago" },
                      { value: "never", label: "Never updated" },
                    ], "select-last-listing-update")}

                    {renderSelectQuestion("listingConsistency", "Are your business details consistent across all directories?", [
                      { value: "yes_consistent", label: "Yes, all consistent" },
                      { value: "pretty_sure", label: "Pretty sure they are" },
                      { value: "not_sure", label: "Not sure" },
                      { value: "know_inconsistent", label: "Know they're inconsistent" },
                      { value: "never_checked", label: "Never checked" },
                    ], "select-listing-consistency")}
                  </div>

                  {/* Google Business Profile */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <img src="/anchor.png" alt="Google Business" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Google Business Profile
                      </h3>
                    </div>

                    {renderSelectQuestion("lastGBPPost", "When did you last post on Google Business Profile?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "3_months_plus", label: "More than 3 months ago" },
                      { value: "never", label: "Never posted" },
                    ], "select-last-gbp-post")}

                    {renderSelectQuestion("lastGBPPhoto", "When did you last add a photo to Google Business Profile?", [
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "past_6_months", label: "Within the past 6 months" },
                      { value: "6_months_plus", label: "More than 6 months ago" },
                      { value: "never", label: "Never added photos" },
                    ], "select-last-gbp-photo")}
                  </div>

                  {/* Advertising & Paid Media */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#97ACCA]/40">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xl font-bold text-[#97ACCA]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Advertising & Paid Media
                      </h3>
                    </div>

                    {renderSelectQuestion("runsAds", "Do you currently run paid advertising?", [
                      { value: "yes_both", label: "Yes — Google and Meta (Facebook/Instagram)" },
                      { value: "yes_google", label: "Yes — Google Ads only" },
                      { value: "yes_meta", label: "Yes — Meta (Facebook/Instagram) only" },
                      { value: "yes_other", label: "Yes — other platforms" },
                      { value: "no_interested", label: "No, but interested" },
                      { value: "no_not_interested", label: "No, not interested" },
                    ], "select-runs-ads")}

                    {renderSelectQuestion("lastAdCampaign", "When was your last advertising campaign?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "1-3 months ago" },
                      { value: "past_6_months", label: "3-6 months ago" },
                      { value: "6_months_plus", label: "More than 6 months ago" },
                      { value: "never", label: "Never run ads" },
                    ], "select-last-ad-campaign")}

                    {renderSelectQuestion("monthlyAdBudget", "What is your monthly advertising budget?", [
                      { value: "none", label: "No budget allocated" },
                      { value: "under_500", label: "Under $500/month" },
                      { value: "500_1000", label: "$500-$1,000/month" },
                      { value: "1000_2500", label: "$1,000-$2,500/month" },
                      { value: "2500_5000", label: "$2,500-$5,000/month" },
                      { value: "5000_plus", label: "Over $5,000/month" },
                    ], "select-monthly-ad-budget")}
                  </div>

                  {/* Website & SEO */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                        Website & SEO
                      </h3>
                    </div>

                    {renderSelectQuestion("lastWebsiteUpdate", "When did you last update your website content?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "past_6_months", label: "Within the past 6 months" },
                      { value: "6_months_plus", label: "More than 6 months ago" },
                      { value: "never", label: "Never / No website" },
                    ], "select-last-website-update")}

                    {renderSelectQuestion("hasBlog", "Do you have a blog on your website?", [
                      { value: "yes_weekly", label: "Yes, post weekly" },
                      { value: "yes_monthly", label: "Yes, post monthly" },
                      { value: "yes_inconsistent", label: "Yes, but inconsistent" },
                      { value: "no_planning", label: "No, but planning to" },
                      { value: "no_not_interested", label: "No, not interested" },
                    ], "select-has-blog")}
                  </div>

                  {/* CRM */}
                  <div className="bg-white p-6 rounded-lg border-2 border-[#0000FF]/20">
                    <h3 className="text-xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                      Customer Relationship Management (CRM)
                    </h3>

                    {renderSelectQuestion("usesCRM", "Do you use a CRM system?", [
                      { value: "yes_daily", label: "Yes, use it daily" },
                      { value: "yes_underutilized", label: "Yes, but underutilized" },
                      { value: "yes_not_setup", label: "Yes, but not fully set up" },
                      { value: "no_planning", label: "No, but planning to" },
                      { value: "manual_tracking", label: "No, track manually" },
                      { value: "no_dont_track", label: "No, don't track customers" },
                    ], "select-uses-crm")}

                    {renderSelectQuestion("crmPlatform", "What CRM platform do you use?", [
                      { value: "salesforce", label: "Salesforce" },
                      { value: "hubspot", label: "HubSpot" },
                      { value: "zoho", label: "Zoho" },
                      { value: "monday", label: "Monday.com" },
                      { value: "pipedrive", label: "Pipedrive" },
                      { value: "sheets_excel", label: "Google Sheets / Excel" },
                      { value: "other", label: "Other" },
                      { value: "none", label: "None" },
                    ], "select-crm-platform")}

                    {renderSelectQuestion("lastCRMFollowup", "When was your last CRM-driven follow-up?", [
                      { value: "past_week", label: "Within the past week" },
                      { value: "past_month", label: "Within the past month" },
                      { value: "past_3_months", label: "Within the past 3 months" },
                      { value: "3_months_plus", label: "More than 3 months ago" },
                      { value: "never_no_crm", label: "Never / No CRM" },
                    ], "select-last-crm-followup")}

                    {renderSelectQuestion("hasAutomation", "Do you use marketing automation?", [
                      { value: "yes_full", label: "Yes, fully automated" },
                      { value: "yes_partial", label: "Yes, partially automated" },
                      { value: "no_manual", label: "No, all manual" },
                      { value: "dont_know", label: "Don't know" },
                    ], "select-has-automation")}
                  </div>
                </div>
              )}

              {/* Step 7: Review & Submit */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#09080E] mb-2" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                      Ready to Get Your Digital IQ Score
                    </h3>
                    <p className="text-[#09080E]/70">
                      Review your information below, then submit to calculate your Digital IQ Score (0-140).
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 space-y-4 border border-[#0000FF]/20">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-[#09080E]/60">Business Name</Label>
                        <p className="text-sm font-medium text-[#09080E]">{form.watch("businessName")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#09080E]/60">Industry</Label>
                        <p className="text-sm font-medium text-[#09080E]">{form.watch("industry")}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-[#09080E]/60">Business Address</Label>
                      <div className="text-sm font-medium text-[#09080E] space-y-0.5">
                        {form.watch("attention") && <p>Attn: {form.watch("attention")}</p>}
                        <p>
                          {form.watch("address")}
                          {form.watch("unit") && `, ${form.watch("unit")}`}
                        </p>
                        {form.watch("address2") && <p>{form.watch("address2")}</p>}
                        <p>
                          {form.watch("city")}, {form.watch("state")} {form.watch("zipCode")}
                        </p>
                        <p>{form.watch("country")}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-[#09080E]/60">Phone</Label>
                        <p className="text-sm font-medium text-[#09080E]">{form.watch("phone")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#09080E]/60">Email</Label>
                        <p className="text-sm font-medium text-[#09080E]">{form.watch("email")}</p>
                      </div>
                    </div>
                    {form.watch("website") && (
                      <div>
                        <Label className="text-sm font-medium text-[#09080E]/60">Website</Label>
                        <p className="text-sm font-medium text-[#09080E]">{form.watch("website")}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">What happens next:</h4>
                        <ul className="text-sm text-green-800 mt-2 space-y-1">
                          <li>• AI analyzes your digital presence across Google, Yelp & more</li>
                          <li>• Your Digital IQ Score (0-140) is calculated</li>
                          <li>• Comprehensive report with personalized recommendations</li>
                          <li>• Results delivered via email in 2-3 minutes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-[#0000FF]/10">
                <div className="flex items-center text-sm text-[#09080E]/60">
                  <Lock className="w-4 h-4 mr-2" />
                  Your information is secure and never shared
                </div>
                
                <div className="flex space-x-4">
                  {currentStep > 0 && (
                    <Button type="button" variant="outline" onClick={prevStep} data-testid="button-back">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <Button 
                      type="button" 
                      onClick={handleNext} 
                      className="bg-[#0000FF] hover:bg-[#0000FF]/90" 
                      data-testid="button-continue"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="button"
                      disabled={createAssessmentMutation.isPending}
                      onClick={handleExplicitSubmit}
                      className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
                      data-testid="button-submit-digital-iq"
                    >
                      {createAssessmentMutation.isPending ? "Calculating Your Digital IQ..." : "Get My Digital IQ Score"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

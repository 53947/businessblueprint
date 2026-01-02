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

const steps = [
  { title: "Business Basics", description: "Tell us about your business" },
  { title: "Contact Information", description: "How can we reach you?" },
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
    },
  });

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: InsertAssessment) => {
      const response = await apiRequest("POST", "/api/assessments", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Digital IQ Analysis Started!",
        description: "We're calculating your Digital IQ Score. You'll receive results via email within 2-3 minutes.",
      });
      setLocation(`/dashboard/${data.assessmentId}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to start Digital IQ analysis. Please try again.",
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

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof InsertAssessment)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["businessName", "industry", "address", "city", "state", "zipCode"];
        break;
      case 1:
        fieldsToValidate = ["phone", "email"];
        break;
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get Your Digital IQ Score
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your business and we'll analyze your digital presence to calculate your Digital IQ Score (70-140)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>Takes 2 minutes</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-gray-900">{steps[currentStep].title}</span>
            <span className="text-sm text-gray-500 ml-2">— {steps[currentStep].description}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl border border-gray-100">
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: Business Basics */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Enter your business name"
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
                    <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Business Address</h3>
                    
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
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">How you'll receive your results:</h4>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1">
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

              {/* Step 3: Review & Submit */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Your Digital IQ Score</h3>
                    <p className="text-gray-600">
                      Review your information below, then submit to calculate your Digital IQ Score (70-140).
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Business Name</Label>
                        <p className="text-sm font-medium">{form.watch("businessName")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Industry</Label>
                        <p className="text-sm font-medium">{form.watch("industry")}</p>
                      </div>
                    </div>
                    
                    {/* Full Address Display */}
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Business Address</Label>
                      <div className="text-sm font-medium space-y-0.5">
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
                        <Label className="text-sm font-medium text-gray-500">Phone</Label>
                        <p className="text-sm font-medium">{form.watch("phone")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-sm font-medium">{form.watch("email")}</p>
                      </div>
                    </div>
                    {form.watch("website") && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Website</Label>
                        <p className="text-sm font-medium">{form.watch("website")}</p>
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
                          <li>• Your Digital IQ Score (70-140) is calculated</li>
                          <li>• Comprehensive report with personalized recommendations</li>
                          <li>• Choose your path: DIY or managed services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 mr-2" />
                  Your information is secure and never shared
                </div>
                
                <div className="flex space-x-4">
                  {currentStep > 0 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={handleNext} className="bg-primary hover:bg-primary/90" data-testid="button-continue">
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={createAssessmentMutation.isPending}
                      className="border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

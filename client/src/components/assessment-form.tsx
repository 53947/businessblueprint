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
      location: "",
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
        fieldsToValidate = ["businessName", "industry", "address", "location"];
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
                      <Select onValueChange={(value) => form.setValue("industry", value)}>
                        <SelectTrigger>
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="address">Business Address *</Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        {...form.register("address")}
                      />
                      {form.formState.errors.address && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.address.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="location">City, State *</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        {...form.register("location")}
                      />
                      {form.formState.errors.location && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.location.message}
                        </p>
                      )}
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
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Address</Label>
                        <p className="text-sm font-medium">{form.watch("address")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Location</Label>
                        <p className="text-sm font-medium">{form.watch("location")}</p>
                      </div>
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
                      className="bg-orange-500 hover:bg-orange-600"
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

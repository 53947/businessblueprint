import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Phone, Globe, Clock } from "lucide-react";

const businessInfoSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().default("US"),
  phone: z.string().min(10, "Phone number is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  category: z.string().min(2, "Business category is required"),
  description: z.string().optional(),
});

type BusinessInfoForm = z.infer<typeof businessInfoSchema>;

export default function BIIF() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const form = useForm<BusinessInfoForm>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
      website: "",
      email: "",
      category: "",
      description: "",
    },
  });

  const createLocationMutation = useMutation({
    mutationFn: async (data: BusinessInfoForm) => {
      const response = await fetch("/api/biif/create-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to create location");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Business location created and syncing to directories...",
      });
      setStep(2);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BusinessInfoForm) => {
    createLocationMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Add Your Business
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We'll distribute your information to 200+ online directories
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s !== 5 ? "space-x-4" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {s}
                </div>
                {s !== 5 && (
                  <div
                    className={`w-12 h-1 ${
                      step > s ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Business Information */}
        {step === 1 && (
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Building2 className="mr-2 h-6 w-6 text-blue-600" />
                Business Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your business
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Acme Coffee Shop"
                          {...field}
                          data-testid="input-business-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Category *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com"
                            {...field}
                            data-testid="input-website"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@business.com"
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Address *
                  </FormLabel>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="123 Main St"
                            {...field}
                            data-testid="input-address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="City"
                              {...field}
                              data-testid="input-city"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="State"
                              {...field}
                              data-testid="input-state"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="ZIP Code"
                              {...field}
                              data-testid="input-postal-code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your business..."
                          {...field}
                          data-testid="input-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={createLocationMutation.isPending}
                    data-testid="button-submit-step1"
                  >
                    {createLocationMutation.isPending
                      ? "Creating..."
                      : "Next: Add Photos"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        )}

        {/* Step 2: Success/Next Steps */}
        {step === 2 && (
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              ✓ Business Created!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your business information has been submitted and is being synced to 200+ directories.
            </p>
            <p className="text-sm text-gray-500">
              More steps (photos, Google/Facebook connections) coming soon...
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

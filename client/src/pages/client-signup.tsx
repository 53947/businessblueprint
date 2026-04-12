import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, UserPlus, Building2, Mail, Lock, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export default function ClientSignup() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim()) {
      setError("Please enter your company or business name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (phone.trim() && !smsConsent) {
      setError("You must agree to receive SMS notifications to save your phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          email: email.trim().toLowerCase(),
          password,
          phone: phone.trim() || undefined,
          smsConsent: smsConsent,
          emailConsent: emailConsent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem("clientId", String(data.client.id));
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("clientName", data.client.companyName);
        window.location.href = "/portal/dashboard";
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9ECF0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <BrandLogo brand="businessblueprint" variant="light" size="md" />
            </a>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Get started with your personalized digital blueprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company / Business Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Your Business Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                  data-testid="input-company-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                  data-testid="input-email"
                />
              </div>
              <div className="flex items-start gap-2 mt-2">
                <input
                  type="checkbox"
                  id="emailConsent"
                  checked={emailConsent}
                  onChange={(e) => setEmailConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#008060] focus:ring-[#008060]"
                  data-testid="checkbox-email-consent"
                />
                <label htmlFor="emailConsent" className="text-xs text-gray-600 leading-tight">
                  I agree to receive email communications from businessblueprint.io about my account, recommendations, and platform updates. View our{" "}
                  <a href="/privacy" className="text-[#008060] underline" target="_blank">Privacy Policy</a> and{" "}
                  <a href="/terms" className="text-[#008060] underline" target="_blank">Terms of Service</a>.
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                  data-testid="input-phone"
                />
              </div>
              {phone.trim() && (
                <div className="flex items-start gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="smsConsent"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#008060] focus:ring-[#008060]"
                    data-testid="checkbox-sms-consent"
                  />
                  <label htmlFor="smsConsent" className="text-xs text-gray-600 leading-tight">
                    I agree to receive SMS notifications from businessblueprint.io about my account and platform updates. Message and data rates may apply. Reply STOP to unsubscribe. View our{" "}
                    <a href="/privacy" className="text-[#008060] underline" target="_blank">Privacy Policy</a> and{" "}
                    <a href="/terms" className="text-[#008060] underline" target="_blank">Terms of Service</a>.
                  </label>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                  disabled={loading}
                  data-testid="input-password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                  disabled={loading}
                  data-testid="input-confirm-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              style={{ backgroundColor: "#008060" }}
              disabled={loading}
              data-testid="button-create-account"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/auth/login" className="text-[#008060] font-medium underline">
                Log in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

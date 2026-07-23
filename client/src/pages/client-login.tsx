import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "wouter";
import { LogIn, Mail, AlertCircle, Lock, Link2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"password" | "magic-link">("password");
  const [emailSent, setEmailSent] = useState(false);
  const [demoLink, setDemoLink] = useState("");
  const [, setLocation] = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Get redirect parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTo = urlParams.get('redirect') || '/portal';

  // Check if already logged in
  useEffect(() => {
    const sessionClientId = sessionStorage.getItem("clientId");
    const authToken = sessionStorage.getItem("authToken");

    // Only redirect if BOTH clientId and authToken exist (fully authenticated)
    if (sessionClientId && authToken) {
      window.location.href = redirectTo;
      return;
    }

    // Store the redirect destination for after magic link verification
    if (redirectTo !== '/portal') {
      sessionStorage.setItem('loginRedirect', redirectTo);
    }

    // Clear ALL auth data on login page load to ensure fresh state
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("clientName");
    sessionStorage.removeItem("externalId");
    sessionStorage.removeItem("isEmailVerified");
    sessionStorage.removeItem("lastLogin");

    localStorage.removeItem("clientId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("clientName");
    localStorage.removeItem("externalId");
    localStorage.removeItem("isEmailVerified");
    localStorage.removeItem("lastLogin");

    setIsCheckingAuth(false);
  }, []);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/clients/password-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem("clientId", String(data.client.id));
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("clientName", data.client.companyName);
        window.location.href = redirectTo;
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmailSent(true);
        setError("");
        if (data.demoLink) {
          setDemoLink(data.demoLink);
        }
      } else {
        setError(data.message || "Unable to send login link. Please check your email address.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading spinner while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#E9ECF0] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008060]"></div>
              <p className="text-gray-600">Checking your login status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9ECF0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <BrandLogo brand="businessblueprint" variant="light" size="md" />
            </a>
          </div>
          <CardTitle className="text-2xl">Client Portal</CardTitle>
          <CardDescription>
            Access your digital intelligence dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <Mail className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Check your email!</strong> We've sent a secure login link to <strong>{email}</strong>
                </AlertDescription>
              </Alert>

              {demoLink && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-amber-900">Demo Account - Instant Access</h3>
                  <p className="text-sm text-amber-800">
                    This is a demo account for testing. Click below to login instantly:
                  </p>
                  <a
                    href={demoLink}
                    className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
                    data-testid="link-demo-login"
                  >
                    Login to Demo Account
                  </a>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-blue-900">What happens next:</h3>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Check your email inbox for a message from Business Blueprint</li>
                  <li>Click the secure login link in the email</li>
                  <li>You'll be automatically logged into your dashboard</li>
                </ol>
                <p className="text-xs text-blue-700 mt-3">
                  The link expires in 15 minutes for your security
                </p>
              </div>

              <Button
                onClick={() => { setEmailSent(false); setMode("password"); }}
                variant="outline"
                className="w-full"
                data-testid="button-back-to-login"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {mode === "password" ? (
                <>
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                          disabled={loading}
                          data-testid="input-password"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white"
                      style={{ backgroundColor: "#008060" }}
                      disabled={loading}
                      data-testid="button-login"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      {loading ? "Logging In..." : "Log In"}
                    </Button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => { setMode("magic-link"); setError(""); }}
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                      data-testid="button-switch-magic-link"
                    >
                      Forgot password? Send a login link instead
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <form onSubmit={handleMagicLink} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="magic-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="magic-email"
                          type="email"
                          placeholder="your.email@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                          disabled={loading}
                          data-testid="input-email-magic"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        We'll email you a secure login link — no password needed
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white"
                      style={{ backgroundColor: "#008060" }}
                      disabled={loading}
                      data-testid="button-send-login-link"
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      {loading ? "Sending Login Link..." : "Send Login Link"}
                    </Button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => { setMode("password"); setError(""); }}
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                      data-testid="button-switch-password-login"
                    >
                      Back to password login
                    </button>
                  </div>
                </>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="/auth/signup" className="text-[#008060] font-medium underline">
                    Create one
                  </a>
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

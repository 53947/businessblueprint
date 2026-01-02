import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "wouter";
import { LogIn, Mail, AlertCircle } from "lucide-react";
import { getBrandClasses } from "@/lib/brand-colors";
import { BrandLogo } from "@/components/brand-logo";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    
    // ALWAYS clear ALL auth data on login page load to ensure fresh state
    // This prevents stale tokens from persisting
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate email
      if (!email) {
        setError("Please enter your email address");
        setLoading(false);
        return;
      }

      // Attempt to authenticate client
      const response = await fetch("/api/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Show success message - user needs to check their email
        setEmailSent(true);
        setError("");
        // Store demo link if provided (for Meta App Review demo accounts)
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

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600">Checking your login status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
                  <p className="text-xs text-amber-700">
                    This link is provided for Meta App Review testing purposes.
                  </p>
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
                  ⏱️ The link expires in 15 minutes for your security
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Why passwordless login?</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>✓ No passwords to remember or forget</li>
                  <li>✓ More secure than traditional passwords</li>
                  <li>✓ Protected by your email inbox</li>
                  <li>✓ Each link is unique and time-limited</li>
                </ul>
              </div>

              <Button 
                onClick={() => setEmailSent(false)}
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
              
              <form onSubmit={handleLogin} className="space-y-4">
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
                  <p className="text-xs text-gray-500">
                    No password needed - we'll email you a secure login link
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={loading}
                  data-testid="button-send-login-link"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? "Sending Login Link..." : "Send Login Link"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don't have an account? <a href="/contact" className="text-purple-600 hover:underline">Contact us</a> to get started.
                </p>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500">
                    Passwordless secure access to your digital intelligence dashboard
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "wouter";
import { LogIn, Mail, AlertCircle, KeyRound, Wand2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { useAuth } from "@/hooks/useAuth";

type LoginTab = "credentials" | "magic-link";

export default function Login() {
  const [tab, setTab] = useState<LoginTab>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      setLocation("/admin");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        window.location.href = "/admin";
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
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

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMagicLinkSent(true);
      } else {
        setError(data.message || "Unable to send login link.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Checking login status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <BrandLogo brand="businessblueprint" variant="light" size="md" />
            </a>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage your Business Blueprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {magicLinkSent ? (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <Mail className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Check your email!</strong> We've sent a secure login link to <strong>{email}</strong>
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-blue-900">What happens next:</h3>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Check your email inbox</li>
                  <li>Click the secure login link</li>
                  <li>You'll be automatically signed in</li>
                </ol>
                <p className="text-xs text-blue-700 mt-3">
                  The link expires in 15 minutes for security.
                </p>
              </div>

              <Button
                onClick={() => { setMagicLinkSent(false); setError(""); }}
                variant="outline"
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              {/* Tab Switcher */}
              <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                <button
                  onClick={() => { setTab("credentials"); setError(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    tab === "credentials"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <KeyRound className="h-4 w-4" />
                  Password
                </button>
                <button
                  onClick={() => { setTab("magic-link"); setError(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    tab === "magic-link"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Wand2 className="h-4 w-4" />
                  Magic Link
                </button>
              </div>

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {tab === "credentials" ? (
                <form onSubmit={handleCredentialLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="magic-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="magic-email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      We'll email you a secure link — no password needed.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {loading ? "Sending..." : "Send Magic Link"}
                  </Button>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

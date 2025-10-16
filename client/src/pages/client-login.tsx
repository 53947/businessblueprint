import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "wouter";
import { LogIn, Building, AlertCircle } from "lucide-react";
import { getBrandClasses } from "@/lib/brand-colors";
import { BrandLogo } from "@/components/brand-logo";

export default function ClientLogin() {
  const [customerIdentifier, setCustomerIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate customer identifier format
      if (!customerIdentifier) {
        setError("Please enter your customer identifier");
        setLoading(false);
        return;
      }

      // Attempt to authenticate client
      const response = await fetch("/api/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: customerIdentifier })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store client data and JWT token in sessionStorage
        sessionStorage.setItem("clientId", data.client.id.toString());
        sessionStorage.setItem("externalId", customerIdentifier);
        sessionStorage.setItem("authToken", data.token); // Store JWT token for API calls
        sessionStorage.setItem("clientName", data.client.name || data.client.companyName || "");
        
        // Check for redirect URL parameter and validate it's a safe internal route
        const urlParams = new URLSearchParams(window.location.search);
        const redirectParam = urlParams.get("redirect");
        
        // Whitelist of allowed internal routes
        const allowedRoutes = ["/portal", "/inbox-app", "/send-app", "/livechat-demo"];
        
        // Validate redirect is a safe same-origin path
        let redirectUrl = "/portal"; // Default fallback
        if (redirectParam) {
          // Must start with "/" and not be a protocol-relative URL
          if (redirectParam.startsWith("/") && !redirectParam.startsWith("//")) {
            // Check if it's in the whitelist or starts with an allowed path
            const isAllowed = allowedRoutes.some(route => 
              redirectParam === route || redirectParam.startsWith(route + "/") || redirectParam.startsWith(route + "?")
            );
            if (isAllowed) {
              redirectUrl = redirectParam;
            }
          }
        }
        
        setLocation(redirectUrl);
      } else {
        setError(data.message || "Unable to access your dashboard. Please check your customer ID.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerIdentifier">Customer ID</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="customerIdentifier"
                  type="text"
                  placeholder="Enter your customer ID"
                  value={customerIdentifier}
                  onChange={(e) => setCustomerIdentifier(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter your customer identifier (provided in your welcome email)
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              disabled={loading}
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? "Accessing Dashboard..." : "Sign In to Portal"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Don't have your customer ID? Check your welcome email or contact support.
            </p>
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500">
                Secure access to your digital intelligence dashboard
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
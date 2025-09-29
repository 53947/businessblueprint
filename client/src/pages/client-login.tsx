import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "wouter";
import { LogIn, Building, AlertCircle } from "lucide-react";
import businessBlueprintLogo from "@assets/businessblueprint_1759187364583.png";
import { getBrandClasses } from "@/lib/brand-colors";

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
      if (!customerIdentifier.startsWith("AG-")) {
        setError("Please enter a valid Vendasta Account Group ID (starts with AG-)");
        setLoading(false);
        return;
      }

      // Attempt to sync customer data from Vendasta
      const response = await fetch("/api/clients/sync-vendasta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerIdentifier })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store client ID in sessionStorage for the portal
        sessionStorage.setItem("clientId", data.client.id.toString());
        sessionStorage.setItem("vendastaId", customerIdentifier);
        setLocation("/portal");
      } else {
        setError(data.message || "Unable to access your dashboard. Please check your Account Group ID.");
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
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={businessBlueprintLogo} alt="businessblueprint.io" className="h-8 w-8" />
              <span className="text-3xl font-bold">
                <span className="text-black">business</span><span style={{color: '#0080FF'}}>blueprint</span><span style={{color: '#FF0040'}}>.io</span>
              </span>
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
              <Label htmlFor="customerIdentifier">Account Group ID</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="customerIdentifier"
                  type="text"
                  placeholder="AG-XXXXXXXXXX"
                  value={customerIdentifier}
                  onChange={(e) => setCustomerIdentifier(e.target.value.toUpperCase())}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter your Vendasta Account Group ID (found in your account URL)
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
              Don't have your Account Group ID? Check your Vendasta account URL or contact your account manager.
            </p>
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500">
                Secure integration with Vendasta Business Center
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
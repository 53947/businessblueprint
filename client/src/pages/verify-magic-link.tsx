import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";

export default function VerifyMagicLink() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          setStatus('error');
          setError("Invalid or missing verification token");
          return;
        }

        const response = await fetch(`/api/clients/verify-magic-link?token=${token}`);
        const data = await response.json();

        if (response.ok && data.success) {
          // Store client data and JWT token
          const clientData = {
            clientId: data.client.id.toString(),
            externalId: data.client.email,
            authToken: data.token,
            clientName: data.client.companyName || "",
            isEmailVerified: data.client.isEmailVerified?.toString() || "false",
            lastLogin: Date.now().toString()
          };
          
          Object.entries(clientData).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
            localStorage.setItem(key, value);
          });

          setStatus('success');
          
          // Redirect to portal after 2 seconds
          setTimeout(() => {
            window.location.href = "/portal";
          }, 2000);
        } else {
          setStatus('error');
          setError(data.message || "Verification failed. Please try again.");
        }
      } catch (err) {
        setStatus('error');
        setError("Connection error. Please try again.");
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <BrandLogo brand="businessblueprint" variant="light" size="md" />
            </a>
          </div>
          <CardTitle className="text-2xl">Verifying Login Link</CardTitle>
          <CardDescription>
            Please wait while we verify your secure login link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'verifying' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
              <p className="text-gray-600">Verifying your login...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Success!</strong> You're being logged in...
                </AlertDescription>
              </Alert>
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <p className="text-sm text-gray-600">Redirecting to your dashboard...</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  This could happen if:
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>The link has expired (15 minute limit)</li>
                  <li>The link has already been used</li>
                  <li>The link is invalid or corrupted</li>
                </ul>
              </div>
              <Button 
                onClick={() => window.location.href = '/portal/login'}
                className="w-full bg-purple-600 hover:bg-purple-700"
                data-testid="button-back-to-login"
              >
                Request New Login Link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

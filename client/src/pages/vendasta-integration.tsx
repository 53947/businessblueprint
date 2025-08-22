import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Database, Webhook, Zap, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";

interface VendastaTestResults {
  status: string;
  ready: boolean;
  details: {
    apiConnection: boolean;
    webhookSetup: boolean;
    databaseSchema: boolean;
    services: {
      vendastaService: boolean;
      clientSync: boolean;
      campaignIntegration: boolean;
    };
  };
  nextSteps: string[];
}

export default function VendastaIntegrationPage() {
  const [customerIdentifier, setCustomerIdentifier] = useState("");
  const queryClient = useQueryClient();

  // Test integration status
  const { data: testResults, isLoading: testLoading } = useQuery<VendastaTestResults>({
    queryKey: ["/api/vendasta/test"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Sync client mutation
  const syncClientMutation = useMutation({
    mutationFn: async (customerIdentifier: string) => {
      return await apiRequest(`/api/clients/sync-vendasta`, "POST", { customerIdentifier });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vendasta/test"] });
    }
  });

  const handleSyncClient = () => {
    if (customerIdentifier.trim()) {
      syncClientMutation.mutate(customerIdentifier);
    }
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusBadge = (status: boolean) => {
    return (
      <Badge variant={status ? "default" : "destructive"}>
        {status ? "Ready" : "Not Ready"}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          <span className="text-black">cloud</span><span className="text-blue-500">pleaser</span><span className="text-green-400">.io</span>
        </h1>
        <h2 className="text-xl text-gray-600">Vendasta Integration Dashboard</h2>
        <p className="text-gray-500">
          Monitor and test the integration with Vendasta's Business Center API and Campaign Pro
        </p>
      </div>

      {/* Integration Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Integration Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {testLoading ? (
            <p>Loading integration status...</p>
          ) : testResults ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Overall Status</h3>
                {getStatusBadge(testResults.ready)}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {testResults.ready 
                    ? "🎉 Vendasta integration is fully operational!"
                    : "⚠️ Integration setup in progress. Complete the steps below to finish setup."
                  }
                </AlertDescription>
              </Alert>

              {/* Next Steps */}
              <div className="space-y-2">
                <h4 className="font-medium">Setup Progress:</h4>
                <ul className="space-y-1">
                  {testResults.nextSteps.map((step, index) => (
                    <li key={index} className="text-sm">{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>Unable to load integration status</p>
          )}
        </CardContent>
      </Card>

      {/* Component Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4" />
              API Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {getStatusIcon(testResults?.details.apiConnection || false)}
              {getStatusBadge(testResults?.details.apiConnection || false)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Connection to Vendasta's API endpoints
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Webhook className="h-4 w-4" />
              Webhook Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {getStatusIcon(testResults?.details.webhookSetup || false)}
              {getStatusBadge(testResults?.details.webhookSetup || false)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Real-time webhook endpoints ready
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4" />
              Database Schema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {getStatusIcon(testResults?.details.databaseSchema || false)}
              {getStatusBadge(testResults?.details.databaseSchema || false)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All database tables created
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Client Sync Service</span>
              </div>
              {getStatusBadge(testResults?.details.services.clientSync || false)}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Campaign Pro Integration</span>
              </div>
              {getStatusBadge(testResults?.details.services.campaignIntegration || false)}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Vendasta Service</span>
              </div>
              {getStatusBadge(testResults?.details.services.vendastaService || false)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Client Sync */}
      <Card>
        <CardHeader>
          <CardTitle>Test Client Synchronization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Test the client data sync by entering a Vendasta customer identifier:
          </p>
          
          <div className="flex gap-2">
            <Input
              placeholder="Enter customer identifier"
              value={customerIdentifier}
              onChange={(e) => setCustomerIdentifier(e.target.value)}
              disabled={syncClientMutation.isPending}
            />
            <Button 
              onClick={handleSyncClient}
              disabled={!customerIdentifier.trim() || syncClientMutation.isPending}
            >
              {syncClientMutation.isPending ? "Syncing..." : "Sync Client"}
            </Button>
          </div>

          {syncClientMutation.isSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Client synchronized successfully! Check the clients table for the new data.
              </AlertDescription>
            </Alert>
          )}

          {syncClientMutation.isError && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to sync client. Check the API credentials and customer identifier.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* JWT Security Information */}
      <Card>
        <CardHeader>
          <CardTitle>Security Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-green-600">✅ RS256 JWT Implementation</h4>
              <p className="text-sm text-gray-600">
                Secure token signing with RSA asymmetric encryption for dashboard access
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-green-600">✅ Token Verification</h4>
              <p className="text-sm text-gray-600">
                Automatic token validation and revocation system for enhanced security
              </p>
            </div>

            <div>
              <h4 className="font-medium text-green-600">✅ Public Key Distribution</h4>
              <p className="text-sm text-gray-600">
                JWK endpoint available at <code className="bg-gray-100 px-1 rounded">/api/auth/jwks</code> for external verification
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Features */}
      <Card>
        <CardHeader>
          <CardTitle>Available Integration Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Data Synchronization</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time client data sync</li>
                <li>• Form submission webhooks</li>
                <li>• Campaign Pro message integration</li>
                <li>• Assessment linking to clients</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Dashboard Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Secure dashboard token access</li>
                <li>• Client portal integration</li>
                <li>• Campaign management</li>
                <li>• Inbox message handling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="bg-gray-100 p-3 rounded text-sm font-mono">
              <strong>Vendasta Webhook URL:</strong><br />
              <code>https://your-domain.replit.app/api/webhooks/vendasta</code>
            </div>
            <p className="text-xs text-gray-500">
              Configure this URL in your Vendasta webhook settings to receive real-time updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
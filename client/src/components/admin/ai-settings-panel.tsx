import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Brain,
  Zap,
  DollarSign,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISettingsData {
  settings: {
    id: number;
    feature: string;
    provider: string;
    isActive: boolean;
    lastUpdated: string;
  }[];
  providers: string[];
  features: {
    id: string;
    name: string;
    description: string;
  }[];
  costEstimates: {
    [key: string]: {
      per1kTokens: number;
      quality: string;
    };
  };
}

export function AISettingsPanel() {
  const { toast } = useToast();
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});

  const { data: aiSettings, isLoading, error } = useQuery<AISettingsData>({
    queryKey: ['/api/admin/ai-settings'],
  });

  const updateProviderMutation = useMutation({
    mutationFn: async ({ feature, provider }: { feature: string; provider: string }) => {
      return await apiRequest('PATCH', `/api/admin/ai-settings/${feature}`, { provider });
    },
    onSuccess: (_, { feature, provider }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-settings'] });
      toast({
        title: "AI Provider Updated",
        description: `${feature} now uses ${provider.toUpperCase()}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update AI provider",
        variant: "destructive",
      });
    },
  });

  const testProviderMutation = useMutation({
    mutationFn: async (provider: string) => {
      const response = await apiRequest('POST', '/api/admin/ai-settings/test', { provider });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Test failed');
      }
      return data;
    },
    onSuccess: (data, provider) => {
      setTestResults(prev => ({
        ...prev,
        [provider]: { success: true, message: data.message || 'Connected!' }
      }));
      toast({
        title: "Connection Successful",
        description: `${provider.toUpperCase()} is working correctly`,
      });
      setTestingProvider(null);
    },
    onError: (error: any, provider) => {
      setTestResults(prev => ({
        ...prev,
        [provider]: { success: false, message: error.message || 'Connection failed' }
      }));
      toast({
        title: "Test Failed",
        description: error.message || "Could not test provider",
        variant: "destructive",
      });
      setTestingProvider(null);
    },
  });

  const handleProviderChange = (feature: string, provider: string) => {
    updateProviderMutation.mutate({ feature, provider });
  };

  const handleTestProvider = (provider: string) => {
    setTestingProvider(provider);
    testProviderMutation.mutate(provider);
  };

  const getProviderSetting = (feature: string) => {
    return aiSettings?.settings.find(s => s.feature === feature)?.provider || 'deepseek';
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'claude': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'openai': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'deepseek': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCostSavings = () => {
    if (!aiSettings) return 0;
    const assessmentProvider = getProviderSetting('assessment');
    const prescriptionProvider = getProviderSetting('prescription');
    
    const openaiCost = aiSettings.costEstimates.openai.per1kTokens;
    const assessmentCost = aiSettings.costEstimates[assessmentProvider]?.per1kTokens || 0;
    const prescriptionCost = aiSettings.costEstimates[prescriptionProvider]?.per1kTokens || 0;
    
    const avgCost = (assessmentCost + prescriptionCost) / 2;
    const savings = ((openaiCost - avgCost) / openaiCost) * 100;
    return Math.max(0, Math.round(savings));
  };

  if (error) {
    return (
      <Card className="lg:col-span-2 border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <p>Failed to load AI settings. Please refresh the page.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2" data-testid="card-ai-settings">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle>AI Provider Settings</CardTitle>
              <CardDescription>
                Configure which AI provider powers each feature. Switch between Claude, OpenAI, and DeepSeek.
              </CardDescription>
            </div>
          </div>
          {getCostSavings() > 0 && (
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1">
              <DollarSign className="h-3 w-3 mr-1" />
              {getCostSavings()}% Cost Savings
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {aiSettings?.providers.map((provider) => (
                <div key={provider} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getProviderColor(provider)}>
                        {provider.toUpperCase()}
                      </Badge>
                      {testResults[provider] && (
                        testResults[provider].success ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTestProvider(provider)}
                      disabled={testingProvider === provider}
                      data-testid={`button-test-${provider}`}
                    >
                      {testingProvider === provider ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>${aiSettings?.costEstimates[provider]?.per1kTokens}/1K tokens</p>
                    <p className="text-xs">{aiSettings?.costEstimates[provider]?.quality} quality</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {aiSettings?.features.map((feature) => {
                const currentProvider = getProviderSetting(feature.id);
                return (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    data-testid={`setting-${feature.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{feature.name}</p>
                        {feature.id === 'coach_blue' && (
                          <Badge variant="outline" className="text-xs">Premium</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getProviderColor(currentProvider)}>
                        {currentProvider.toUpperCase()}
                      </Badge>
                      <Select
                        value={currentProvider}
                        onValueChange={(value) => handleProviderChange(feature.id, value)}
                        disabled={updateProviderMutation.isPending}
                      >
                        <SelectTrigger className="w-[140px]" data-testid={`select-${feature.id}-provider`}>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {aiSettings?.providers.map((provider) => (
                            <SelectItem key={provider} value={provider}>
                              <div className="flex items-center gap-2">
                                <Zap className="h-3 w-3" />
                                {provider.charAt(0).toUpperCase() + provider.slice(1)}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300">Cost Optimization Strategy</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    Use DeepSeek for high-volume operations (assessments, prescriptions) to save ~90% on AI costs.
                    Reserve Claude for premium features like Coach Blue coaching sessions.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

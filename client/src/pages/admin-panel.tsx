import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Copy, 
  ExternalLink,
  Shield,
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  Check,
  Palette,
  FileText,
  Calendar,
  TrendingUp,
  DollarSign,
  CreditCard,
  AlertCircle,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { format } from "date-fns";
import React from "react";

interface Client {
  id: number;
  externalId: string;
  companyName: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  businessCategory?: string;
  enabledFeatures?: string[];
  lastLoginTime?: string;
  createdAt: string;
}

interface Assessment {
  id: number;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  status: string;
  digitalScore?: number;
  selectedPathway?: string;
  createdAt: string;
}

interface SubscriptionWithDetails {
  subscription: {
    id: number;
    clientId: number;
    planId: number;
    status: string;
    billingCycle: string;
    totalAmount: string;
    nextBillingDate: string;
  };
  client: {
    id: number;
    companyName: string;
    email: string;
    accountStatus?: string;
  };
  plan: {
    id: number;
    name: string;
    basePrice: string;
  };
  addons: Array<{
    id: number;
    name: string;
    price: string;
  }>;
  billingHistory: Array<{
    id: number;
    amount: string;
    status: string;
    billingDate: string;
  }>;
}

export default function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [assessmentSearchQuery, setAssessmentSearchQuery] = useState("");
  const [billingSearchQuery, setBillingSearchQuery] = useState("");
  const [expandedSubscription, setExpandedSubscription] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch all clients (admin-only endpoint)
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ['/api/admin/clients'],
  });

  // Fetch all assessments (admin-only endpoint)
  const { data: assessments, isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ['/api/admin/assessments'],
  });

  // Fetch all subscriptions with billing data (admin-only endpoint)
  const { data: subscriptionsData, isLoading: subscriptionsLoading } = useQuery<{
    subscriptions: SubscriptionWithDetails[];
    stats: {
      totalSubscriptions: number;
      activeSubscriptions: number;
      monthlyRecurringRevenue: number;
    };
  }>({
    queryKey: ['/api/admin/subscriptions'],
  });

  // Compute stats safely
  const totalClients = clients?.length ?? 0;
  const activeAccounts = clients?.filter(c => c.lastLoginTime)?.length ?? 0;
  const totalAssessments = assessments?.length ?? 0;
  const completedAssessments = assessments?.filter(a => a.status === 'completed')?.length ?? 0;

  // Filter clients based on search
  const filteredClients = clients?.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.id.toString().includes(query) ||
      client.companyName?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.externalId?.toLowerCase().includes(query)
    );
  }) || [];

  // Filter assessments based on search
  const filteredAssessments = assessments?.filter((assessment) => {
    const query = assessmentSearchQuery.toLowerCase();
    return (
      assessment.id.toString().includes(query) ||
      assessment.businessName?.toLowerCase().includes(query) ||
      assessment.email?.toLowerCase().includes(query) ||
      assessment.industry?.toLowerCase().includes(query)
    );
  }) || [];

  // Filter subscriptions based on search
  const filteredSubscriptions = subscriptionsData?.subscriptions?.filter((sub) => {
    const query = billingSearchQuery.toLowerCase();
    return (
      sub.subscription.id.toString().includes(query) ||
      sub.client.companyName?.toLowerCase().includes(query) ||
      sub.client.email?.toLowerCase().includes(query) ||
      sub.plan.name?.toLowerCase().includes(query)
    );
  }) || [];

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: `Client ID ${id} copied to clipboard`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const accessClientPortal = (clientId: number) => {
    // Set session and navigate directly to portal
    sessionStorage.setItem("clientId", clientId.toString());
    const client = clients?.find(c => c.id === clientId);
    if (client) {
      sessionStorage.setItem("externalId", client.externalId);
    }
    setLocation('/portal');
  };

  // Mutation to update client account status
  const updateAccountStatusMutation = useMutation({
    mutationFn: async ({ clientId, status, reason }: { clientId: number; status: string; reason?: string }) => {
      return await apiRequest('PATCH', `/api/admin/clients/${clientId}/status`, { status, reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/clients'] });
      toast({
        title: "Account Status Updated",
        description: "The client's account status has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update account status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (clientId: number, newStatus: string, clientName: string) => {
    const reason = newStatus === 'suspended' ? 'Admin action' : undefined;
    updateAccountStatusMutation.mutate({ clientId, status: newStatus, reason });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showNavigation={true} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="title-admin-panel">
                  Admin Panel
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage client accounts and view submitted assessments
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setLocation('/brand-studio')}
              className="bg-purple-600 hover:bg-purple-700"
              data-testid="button-brand-studio"
            >
              <Palette className="w-4 h-4 mr-2" />
              Brand Studio
            </Button>
          </div>
        </div>

        {/* Tabs for Clients, Assessments, and Billing */}
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="clients" data-testid="tab-clients">
              <Users className="w-4 h-4 mr-2" />
              Clients ({totalClients})
            </TabsTrigger>
            <TabsTrigger value="assessments" data-testid="tab-assessments">
              <FileText className="w-4 h-4 mr-2" />
              Assessments ({totalAssessments})
            </TabsTrigger>
            <TabsTrigger value="billing" data-testid="tab-billing">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing ({subscriptionsData?.stats?.totalSubscriptions ?? 0})
            </TabsTrigger>
          </TabsList>

          {/* CLIENTS TAB */}
          <TabsContent value="clients"  className="mt-0">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-3xl font-bold" data-testid="stat-total-clients">
                  {totalClients}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-green-600" />
                <span className="text-3xl font-bold" data-testid="stat-active-accounts">
                  {activeAccounts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Search Results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-purple-600" />
                <span className="text-3xl font-bold" data-testid="stat-search-results">
                  {filteredClients.length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by Client ID, Company Name, Email, or External ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                data-testid="input-search-clients"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client Accounts ({filteredClients.length})</CardTitle>
            <CardDescription>
              View and manage all client accounts. Click on a client ID to access their portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-12" data-testid="empty-state">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? "No clients found matching your search" : "No clients registered yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Client ID</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id} data-testid={`row-client-${client.id}`}>
                        <TableCell className="font-mono font-medium">
                          <div className="flex items-center gap-2">
                            <span data-testid={`text-client-id-${client.id}`}>{client.id}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(client.id.toString(), client.id)}
                              className="h-6 w-6 p-0"
                              data-testid={`button-copy-${client.id}`}
                            >
                              {copiedId === client.id ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium" data-testid={`text-company-${client.id}`}>
                              {client.companyName}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Globe className="h-3 w-3" />
                              <span data-testid={`text-external-id-${client.id}`}>
                                {client.externalId}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span data-testid={`text-email-${client.id}`}>
                                {client.email}
                              </span>
                            </div>
                            {client.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span data-testid={`text-phone-${client.id}`}>
                                  {client.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {client.lastLoginTime ? (
                            <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100" data-testid={`badge-status-${client.id}`}>
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" data-testid={`badge-status-${client.id}`}>
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => accessClientPortal(client.id)}
                            data-testid={`button-access-portal-${client.id}`}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Access Portal
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Access Card */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">Admin Access</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You can access any client portal by clicking "Access Portal" or navigating to <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">/client-login?clientId=XX</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          {/* ASSESSMENTS TAB */}
          <TabsContent value="assessments" className="mt-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-3xl font-bold" data-testid="stat-total-assessments">
                      {totalAssessments}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-bold" data-testid="stat-completed-assessments">
                      {completedAssessments}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Search Results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-purple-600" />
                    <span className="text-3xl font-bold" data-testid="stat-search-results-assessments">
                      {filteredAssessments.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by ID, Business Name, Email, or Industry..."
                    value={assessmentSearchQuery}
                    onChange={(e) => setAssessmentSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                    data-testid="input-search-assessments"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Assessments Table */}
            <Card>
              <CardHeader>
                <CardTitle>Submitted Assessments ({filteredAssessments.length})</CardTitle>
                <CardDescription>
                  View all submitted business assessments and their status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessmentsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : filteredAssessments.length === 0 ? (
                  <div className="text-center py-12" data-testid="empty-state-assessments">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {assessmentSearchQuery ? "No assessments found matching your search" : "No assessments submitted yet"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">ID</TableHead>
                          <TableHead>Business</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAssessments.map((assessment) => (
                          <TableRow key={assessment.id} data-testid={`row-assessment-${assessment.id}`}>
                            <TableCell className="font-mono font-medium" data-testid={`text-assessment-id-${assessment.id}`}>
                              {assessment.id}
                            </TableCell>
                            
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium" data-testid={`text-business-${assessment.id}`}>
                                  {assessment.businessName}
                                </div>
                                <div className="text-xs text-gray-500" data-testid={`text-industry-${assessment.id}`}>
                                  {assessment.industry}
                                </div>
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  <span data-testid={`text-email-${assessment.id}`}>
                                    {assessment.email}
                                  </span>
                                </div>
                                {assessment.phone && (
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span>{assessment.phone}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <Badge 
                                variant={assessment.status === 'completed' ? 'default' : 'secondary'}
                                className={assessment.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                data-testid={`badge-status-${assessment.id}`}
                              >
                                {assessment.status}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              {assessment.digitalScore ? (
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-blue-500" />
                                  <span className="font-bold text-blue-600" data-testid={`text-score-${assessment.id}`}>
                                    {assessment.digitalScore}/100
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">N/A</span>
                              )}
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-3 w-3" />
                                <span data-testid={`text-date-${assessment.id}`}>
                                  {format(new Date(assessment.createdAt), 'MMM d, yyyy')}
                                </span>
                              </div>
                            </TableCell>
                            
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLocation(`/dashboard/${assessment.id}`)}
                                data-testid={`button-view-assessment-${assessment.id}`}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* BILLING TAB */}
          <TabsContent value="billing" className="mt-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-3xl font-bold" data-testid="stat-total-subscriptions">
                      {subscriptionsData?.stats?.totalSubscriptions ?? 0}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-bold" data-testid="stat-active-subscriptions">
                      {subscriptionsData?.stats?.activeSubscriptions ?? 0}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Monthly Recurring Revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-bold" data-testid="stat-mrr">
                      ${subscriptionsData?.stats?.monthlyRecurringRevenue?.toFixed(2) ?? '0.00'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by Subscription ID, Company, Email, or Plan..."
                    value={billingSearchQuery}
                    onChange={(e) => setBillingSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                    data-testid="input-search-billing"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Subscriptions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Client Subscriptions ({filteredSubscriptions.length})</CardTitle>
                <CardDescription>
                  View all client subscriptions, billing details, and account status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscriptionsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : filteredSubscriptions.length === 0 ? (
                  <div className="text-center py-12" data-testid="empty-state-billing">
                    <CreditCard className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {billingSearchQuery ? "No subscriptions found matching your search" : "No active subscriptions yet"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">Sub ID</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Next Billing</TableHead>
                          <TableHead className="text-right">Account Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubscriptions.map((sub) => (
                          <React.Fragment key={sub.subscription.id}>
                            <TableRow 
                              data-testid={`row-subscription-${sub.subscription.id}`}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                              onClick={() => setExpandedSubscription(
                                expandedSubscription === sub.subscription.id ? null : sub.subscription.id
                              )}
                            >
                              <TableCell className="font-mono font-medium" data-testid={`text-subscription-id-${sub.subscription.id}`}>
                                <div className="flex items-center gap-2">
                                  {expandedSubscription === sub.subscription.id ? (
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                  )}
                                  {sub.subscription.id}
                                </div>
                              </TableCell>
                            
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium" data-testid={`text-client-name-${sub.subscription.id}`}>
                                  {sub.client.companyName}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Mail className="h-3 w-3" />
                                  <span data-testid={`text-client-email-${sub.subscription.id}`}>
                                    {sub.client.email}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium" data-testid={`text-plan-${sub.subscription.id}`}>
                                  {sub.plan.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {sub.subscription.billingCycle}
                                  {sub.addons.length > 0 && (
                                    <span className="ml-1">+ {sub.addons.length} addon{sub.addons.length > 1 ? 's' : ''}</span>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <Badge 
                                variant={sub.subscription.status === 'active' ? 'default' : 'secondary'}
                                className={sub.subscription.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                data-testid={`badge-subscription-status-${sub.subscription.id}`}
                              >
                                {sub.subscription.status}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-2 font-semibold" data-testid={`text-amount-${sub.subscription.id}`}>
                                <DollarSign className="h-4 w-4 text-gray-400" />
                                {parseFloat(sub.subscription.totalAmount).toFixed(2)}
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-2 text-sm" data-testid={`text-next-billing-${sub.subscription.id}`}>
                                <Calendar className="h-3 w-3 text-gray-400" />
                                {format(new Date(sub.subscription.nextBillingDate), 'MMM d, yyyy')}
                              </div>
                            </TableCell>
                            
                            <TableCell className="text-right">
                              <Badge
                                variant={
                                  sub.client.accountStatus === 'active' ? 'default' :
                                  sub.client.accountStatus === 'suspended' ? 'destructive' :
                                  'secondary'
                                }
                                data-testid={`badge-account-status-${sub.subscription.id}`}
                              >
                                {sub.client.accountStatus || 'active'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded Billing History Row */}
                          {expandedSubscription === sub.subscription.id && (
                            <TableRow key={`${sub.subscription.id}-history`} data-testid={`row-billing-history-${sub.subscription.id}`}>
                              <TableCell colSpan={7} className="bg-gray-50 dark:bg-gray-900 p-6">
                                <div className="space-y-6">
                                  {/* Account Management Controls */}
                                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h5 className="font-semibold mb-1">Account Management</h5>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          Manage {sub.client.companyName}'s account status
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div>
                                          <label className="text-sm font-medium mb-2 block">Account Status</label>
                                          <Select
                                            value={sub.client.accountStatus || 'active'}
                                            onValueChange={(value) => handleStatusChange(sub.client.id, value, sub.client.companyName)}
                                            disabled={updateAccountStatusMutation.isPending}
                                          >
                                            <SelectTrigger className="w-[180px]" data-testid={`select-account-status-${sub.subscription.id}`}>
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="active" data-testid="option-active">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                  Active
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="suspended" data-testid="option-suspended">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                  Suspended
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="inactive" data-testid="option-inactive">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                                  Inactive
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="pending" data-testid="option-pending">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                  Pending
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="banned" data-testid="option-banned">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 rounded-full bg-black"></div>
                                                  Banned
                                                </div>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Billing History */}
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-lg">Billing History</h4>
                                    <Badge variant="outline">
                                      {sub.billingHistory.length} transaction{sub.billingHistory.length !== 1 ? 's' : ''}
                                    </Badge>
                                  </div>
                                  
                                  {sub.billingHistory.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                      <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                      <p>No billing history available</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      {sub.billingHistory.map((transaction) => (
                                        <div 
                                          key={transaction.id} 
                                          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                          data-testid={`transaction-${transaction.id}`}
                                        >
                                          <div className="flex items-center gap-4">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                                              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                              <div className="font-medium">
                                                ${parseFloat(transaction.amount).toFixed(2)}
                                              </div>
                                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(transaction.billingDate), 'MMM d, yyyy')}
                                              </div>
                                            </div>
                                          </div>
                                          <Badge
                                            variant={transaction.status === 'paid' ? 'default' : transaction.status === 'failed' ? 'destructive' : 'secondary'}
                                            className={transaction.status === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                          >
                                            {transaction.status}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {sub.addons.length > 0 && (
                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                      <h5 className="font-semibold mb-3">Active Add-ons</h5>
                                      <div className="grid grid-cols-2 gap-3">
                                        {sub.addons.map((addon) => (
                                          <div 
                                            key={addon.id}
                                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                                          >
                                            <span className="text-sm font-medium">{addon.name}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                              +${parseFloat(addon.price).toFixed(2)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">Billing Management</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      View all client subscriptions, billing history, and manage account status. Click on a client to view their full billing details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

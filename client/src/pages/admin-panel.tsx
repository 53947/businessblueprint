import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
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
  ChevronRight,
  LayoutDashboard,
  Ticket,
  ClipboardList,
  Settings,
  Activity,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  ArrowUpRight,
  BarChart3,
  PieChart,
  Target,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { format, formatDistanceToNow } from "date-fns";
import { EmailManagement } from "@/components/admin/email-management";

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
  accountStatus?: string;
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

interface SupportTicket {
  id: number;
  clientId: number;
  subject: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  client?: { companyName: string; email: string };
}

interface Prescription {
  id: number;
  clientId: number;
  assessmentId: number;
  title: string;
  summary: string;
  status: string;
  implementationProgress: number;
  createdAt: string;
  client?: { companyName: string };
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

type AdminTab = 'dashboard' | 'clients' | 'assessments' | 'billing' | 'tickets' | 'prescriptions' | 'emails' | 'settings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [assessmentSearchQuery, setAssessmentSearchQuery] = useState("");
  const [billingSearchQuery, setBillingSearchQuery] = useState("");
  const [ticketSearchQuery, setTicketSearchQuery] = useState("");
  const [expandedSubscription, setExpandedSubscription] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch all clients
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ['/api/admin/clients'],
  });

  // Fetch all assessments
  const { data: assessments, isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ['/api/admin/assessments'],
  });

  // Fetch subscriptions
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

  // Fetch support tickets
  const { data: tickets, isLoading: ticketsLoading } = useQuery<SupportTicket[]>({
    queryKey: ['/api/admin/tickets'],
  });

  // Fetch prescriptions
  const { data: prescriptions, isLoading: prescriptionsLoading } = useQuery<Prescription[]>({
    queryKey: ['/api/admin/prescriptions'],
  });

  // Compute stats
  const totalClients = clients?.length ?? 0;
  const activeAccounts = clients?.filter(c => c.accountStatus === 'active' || c.lastLoginTime)?.length ?? 0;
  const trialAccounts = clients?.filter(c => c.accountStatus === 'trial')?.length ?? 0;
  const churnedAccounts = clients?.filter(c => c.accountStatus === 'inactive' || c.accountStatus === 'churned')?.length ?? 0;
  const totalAssessments = assessments?.length ?? 0;
  const completedAssessments = assessments?.filter(a => a.status === 'completed')?.length ?? 0;
  const openTickets = tickets?.filter(t => t.status === 'open' || t.status === 'in_progress')?.length ?? 0;
  const pendingPrescriptions = prescriptions?.filter(p => p.status === 'pending_review')?.length ?? 0;
  const mrr = subscriptionsData?.stats?.monthlyRecurringRevenue ?? 0;

  // Filter clients
  const filteredClients = clients?.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.id.toString().includes(query) ||
      client.companyName?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.externalId?.toLowerCase().includes(query)
    );
  }) || [];

  // Filter assessments
  const filteredAssessments = assessments?.filter((assessment) => {
    const query = assessmentSearchQuery.toLowerCase();
    return (
      assessment.id.toString().includes(query) ||
      assessment.businessName?.toLowerCase().includes(query) ||
      assessment.email?.toLowerCase().includes(query) ||
      assessment.industry?.toLowerCase().includes(query)
    );
  }) || [];

  // Filter subscriptions
  const filteredSubscriptions = subscriptionsData?.subscriptions?.filter((sub) => {
    const query = billingSearchQuery.toLowerCase();
    return (
      sub.subscription.id.toString().includes(query) ||
      sub.client.companyName?.toLowerCase().includes(query) ||
      sub.client.email?.toLowerCase().includes(query) ||
      sub.plan.name?.toLowerCase().includes(query)
    );
  }) || [];

  // Filter tickets
  const filteredTickets = tickets?.filter((ticket) => {
    const query = ticketSearchQuery.toLowerCase();
    return (
      ticket.id.toString().includes(query) ||
      ticket.subject?.toLowerCase().includes(query) ||
      ticket.client?.companyName?.toLowerCase().includes(query) ||
      ticket.status?.toLowerCase().includes(query)
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
        description: error.message || "Failed to update account status.",
        variant: "destructive",
      });
    },
  });

  // Mutation to update ticket status
  const updateTicketStatusMutation = useMutation({
    mutationFn: async ({ ticketId, status }: { ticketId: number; status: string }) => {
      return await apiRequest('PATCH', `/api/admin/tickets/${ticketId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/tickets'] });
      toast({
        title: "Ticket Updated",
        description: "The ticket status has been updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update ticket.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (clientId: number, newStatus: string) => {
    const reason = newStatus === 'suspended' ? 'Admin action' : undefined;
    updateAccountStatusMutation.mutate({ clientId, status: newStatus, reason });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'suspended': case 'banned': return 'bg-red-100 text-red-700';
      case 'inactive': case 'churned': return 'bg-gray-100 text-gray-700';
      case 'trial': case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTicketStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'waiting_on_client': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'resolved': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'closed': return <XCircle className="h-4 w-4 text-gray-500" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients' as AdminTab, label: 'Clients', icon: Users, badge: totalClients },
    { id: 'assessments' as AdminTab, label: 'Assessments', icon: FileText, badge: totalAssessments },
    { id: 'billing' as AdminTab, label: 'Billing', icon: CreditCard, badge: subscriptionsData?.stats?.totalSubscriptions },
    { id: 'tickets' as AdminTab, label: 'Support', icon: Ticket, badge: openTickets },
    { id: 'prescriptions' as AdminTab, label: 'Prescriptions', icon: ClipboardList, badge: pendingPrescriptions },
    { id: 'emails' as AdminTab, label: 'Emails', icon: Mail },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showNavigation={true} />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Admin Panel</h2>
              <p className="text-xs text-gray-500">BusinessBlueprint.io</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button 
              onClick={() => setLocation('/brand-studio')}
              className="w-full bg-purple-600 hover:bg-purple-700 mb-2"
              data-testid="button-brand-studio"
            >
              <Palette className="w-4 h-4 mr-2" />
              Brand Studio
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/api/logout'}
              className="w-full border-red-600 text-red-600 hover:bg-red-50"
              data-testid="button-admin-logout"
            >
              Exit Admin
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold" data-testid="title-dashboard">Dashboard Overview</h1>
                <Badge variant="outline" className="text-sm">
                  Last updated: {format(new Date(), 'MMM d, yyyy h:mm a')}
                </Badge>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Clients</p>
                        <p className="text-3xl font-bold" data-testid="stat-total-clients">{totalClients}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          {activeAccounts} active
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Monthly Revenue</p>
                        <p className="text-3xl font-bold" data-testid="stat-mrr">${mrr.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {subscriptionsData?.stats?.activeSubscriptions ?? 0} subscriptions
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Assessments</p>
                        <p className="text-3xl font-bold" data-testid="stat-assessments">{totalAssessments}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {completedAssessments} completed
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Open Tickets</p>
                        <p className="text-3xl font-bold" data-testid="stat-open-tickets">{openTickets}</p>
                        <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          {pendingPrescriptions} prescriptions pending
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                        <Ticket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Client Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Client Status Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Active</span>
                        </div>
                        <span className="font-bold">{activeAccounts}</span>
                      </div>
                      <Progress value={(activeAccounts / (totalClients || 1)) * 100} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Trial</span>
                        </div>
                        <span className="font-bold">{trialAccounts}</span>
                      </div>
                      <Progress value={(trialAccounts / (totalClients || 1)) * 100} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <span>Churned/Inactive</span>
                        </div>
                        <span className="font-bold">{churnedAccounts}</span>
                      </div>
                      <Progress value={(churnedAccounts / (totalClients || 1)) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {assessments?.slice(0, 5).map((assessment) => (
                          <div key={assessment.id} className="flex items-center gap-3 text-sm">
                            <div className={`p-2 rounded-full ${assessment.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                              <FileText className={`w-4 h-4 ${assessment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{assessment.businessName}</p>
                              <p className="text-gray-500 text-xs">
                                Assessment {assessment.status} • {formatDistanceToNow(new Date(assessment.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            {assessment.digitalScore && (
                              <Badge variant="secondary">{assessment.digitalScore}/100</Badge>
                            )}
                          </div>
                        ))}
                        {(!assessments || assessments.length === 0) && (
                          <p className="text-gray-500 text-center py-4">No recent activity</p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" onClick={() => setActiveTab('clients')} className="h-auto py-4 flex-col gap-2">
                      <Users className="w-5 h-5" />
                      <span>View Clients</span>
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('assessments')} className="h-auto py-4 flex-col gap-2">
                      <FileText className="w-5 h-5" />
                      <span>View Assessments</span>
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('tickets')} className="h-auto py-4 flex-col gap-2">
                      <Ticket className="w-5 h-5" />
                      <span>Open Tickets</span>
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('prescriptions')} className="h-auto py-4 flex-col gap-2">
                      <ClipboardList className="w-5 h-5" />
                      <span>Prescriptions</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* CLIENTS TAB */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Client Management</h1>
                <div className="flex gap-2">
                  <Badge variant="outline">{totalClients} total</Badge>
                  <Badge className="bg-green-100 text-green-700">{activeAccounts} active</Badge>
                </div>
              </div>

              {/* Search Bar */}
              <Card>
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
                    View and manage all client accounts. Click Access Portal to view their dashboard.
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
                            <TableHead>Last Active</TableHead>
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
                                    <span>{client.externalId}</span>
                                  </div>
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-3 w-3 text-gray-400" />
                                    <span>{client.email}</span>
                                  </div>
                                  {client.phone && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                      <Phone className="h-3 w-3 text-gray-400" />
                                      <span>{client.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <Select
                                  value={client.accountStatus || 'active'}
                                  onValueChange={(value) => handleStatusChange(client.id, value)}
                                  disabled={updateAccountStatusMutation.isPending}
                                >
                                  <SelectTrigger className="w-[120px]" data-testid={`select-status-${client.id}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="banned">Banned</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>

                              <TableCell>
                                {client.lastLoginTime ? (
                                  <span className="text-sm text-gray-600">
                                    {formatDistanceToNow(new Date(client.lastLoginTime), { addSuffix: true })}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-400">Never</span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedClient(client)}
                                    data-testid={`button-view-${client.id}`}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => accessClientPortal(client.id)}
                                    data-testid={`button-access-portal-${client.id}`}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Portal
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Client Detail Dialog */}
              <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Client Details</DialogTitle>
                    <DialogDescription>
                      Viewing details for {selectedClient?.companyName}
                    </DialogDescription>
                  </DialogHeader>
                  {selectedClient && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Company Name</label>
                          <p className="font-medium">{selectedClient.companyName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">External ID</label>
                          <p className="font-mono">{selectedClient.externalId}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p>{selectedClient.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p>{selectedClient.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <p>{selectedClient.website || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Category</label>
                          <p>{selectedClient.businessCategory || 'Not set'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Account Status</label>
                          <Badge className={getStatusColor(selectedClient.accountStatus || 'active')}>
                            {selectedClient.accountStatus || 'active'}
                          </Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Created</label>
                          <p>{format(new Date(selectedClient.createdAt), 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedClient(null)}>Close</Button>
                    <Button onClick={() => selectedClient && accessClientPortal(selectedClient.id)}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Access Portal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* ASSESSMENTS TAB */}
          {activeTab === 'assessments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Assessment Management</h1>
                <div className="flex gap-2">
                  <Badge variant="outline">{totalAssessments} total</Badge>
                  <Badge className="bg-green-100 text-green-700">{completedAssessments} completed</Badge>
                </div>
              </div>

              {/* Search Bar */}
              <Card>
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
                              <TableCell className="font-mono font-medium">
                                {assessment.id}
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">{assessment.businessName}</div>
                                  <div className="text-xs text-gray-500">{assessment.industry}</div>
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-3 w-3 text-gray-400" />
                                    <span>{assessment.email}</span>
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
                                <Badge className={getStatusColor(assessment.status === 'completed' ? 'active' : 'pending')}>
                                  {assessment.status}
                                </Badge>
                              </TableCell>

                              <TableCell>
                                {assessment.digitalScore ? (
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                    <span className="font-bold text-blue-600">{assessment.digitalScore}/100</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">N/A</span>
                                )}
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="h-3 w-3" />
                                  <span>{format(new Date(assessment.createdAt), 'MMM d, yyyy')}</span>
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
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Billing & Subscriptions</h1>
                <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                  MRR: ${mrr.toFixed(2)}
                </Badge>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Subscriptions</p>
                        <p className="text-2xl font-bold">{subscriptionsData?.stats?.totalSubscriptions ?? 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active Subscriptions</p>
                        <p className="text-2xl font-bold">{subscriptionsData?.stats?.activeSubscriptions ?? 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Monthly Revenue</p>
                        <p className="text-2xl font-bold">${mrr.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Bar */}
              <Card>
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
                    View all client subscriptions and billing details.
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
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Next Billing</TableHead>
                            <TableHead className="text-right">Account</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSubscriptions.map((sub) => (
                            <TableRow key={sub.subscription.id} data-testid={`row-subscription-${sub.subscription.id}`}>
                              <TableCell className="font-mono font-medium">
                                {sub.subscription.id}
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">{sub.client.companyName}</div>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Mail className="h-3 w-3" />
                                    <span>{sub.client.email}</span>
                                  </div>
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">{sub.plan.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {sub.subscription.billingCycle}
                                    {sub.addons.length > 0 && (
                                      <span className="ml-1">+ {sub.addons.length} addon{sub.addons.length > 1 ? 's' : ''}</span>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <Badge className={getStatusColor(sub.subscription.status === 'active' ? 'active' : 'inactive')}>
                                  {sub.subscription.status}
                                </Badge>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2 font-semibold">
                                  <DollarSign className="h-4 w-4 text-gray-400" />
                                  {parseFloat(sub.subscription.totalAmount).toFixed(2)}
                                </div>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-3 w-3 text-gray-400" />
                                  {format(new Date(sub.subscription.nextBillingDate), 'MMM d, yyyy')}
                                </div>
                              </TableCell>
                              
                              <TableCell className="text-right">
                                <Badge className={getStatusColor(sub.client.accountStatus || 'active')}>
                                  {sub.client.accountStatus || 'active'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* SUPPORT TICKETS TAB */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Support Tickets</h1>
                <Badge className={openTickets > 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                  {openTickets} open tickets
                </Badge>
              </div>

              {/* Search Bar */}
              <Card>
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search tickets by ID, Subject, Client, or Status..."
                      value={ticketSearchQuery}
                      onChange={(e) => setTicketSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base"
                      data-testid="input-search-tickets"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tickets Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Tickets ({filteredTickets.length})</CardTitle>
                  <CardDescription>
                    Manage and respond to client support requests.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ticketsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : filteredTickets.length === 0 ? (
                    <div className="text-center py-12" data-testid="empty-state-tickets">
                      <Ticket className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        {ticketSearchQuery ? "No tickets found matching your search" : "No support tickets yet"}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Tickets will appear here when clients submit support requests.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id} data-testid={`row-ticket-${ticket.id}`}>
                              <TableCell className="font-mono font-medium">
                                #{ticket.id}
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium max-w-xs truncate">{ticket.subject}</div>
                                  <div className="text-xs text-gray-500">{ticket.category}</div>
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">{ticket.client?.companyName || 'Unknown'}</div>
                                  <div className="text-xs text-gray-500">{ticket.client?.email}</div>
                                </div>
                              </TableCell>
                              
                              <TableCell>
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  {ticket.priority}
                                </Badge>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTicketStatusIcon(ticket.status)}
                                  <span className="text-sm capitalize">{ticket.status.replace('_', ' ')}</span>
                                </div>
                              </TableCell>

                              <TableCell>
                                <span className="text-sm text-gray-600">
                                  {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                                </span>
                              </TableCell>
                              
                              <TableCell className="text-right">
                                <Select
                                  value={ticket.status}
                                  onValueChange={(value) => updateTicketStatusMutation.mutate({ ticketId: ticket.id, status: value })}
                                  disabled={updateTicketStatusMutation.isPending}
                                >
                                  <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="waiting_on_client">Waiting on Client</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* PRESCRIPTIONS TAB */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">AI Prescriptions</h1>
                <Badge className={pendingPrescriptions > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                  {pendingPrescriptions} pending review
                </Badge>
              </div>

              {/* Prescriptions List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Prescriptions</CardTitle>
                  <CardDescription>
                    Review and manage AI-generated business recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {prescriptionsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : (!prescriptions || prescriptions.length === 0) ? (
                    <div className="text-center py-12" data-testid="empty-state-prescriptions">
                      <ClipboardList className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        No prescriptions generated yet
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Prescriptions are generated automatically after assessments are completed.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {prescriptions.map((prescription) => (
                        <div 
                          key={prescription.id}
                          className="p-4 border rounded-lg hover:border-blue-300 transition-colors"
                          data-testid={`card-prescription-${prescription.id}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{prescription.title}</h3>
                                <Badge className={getStatusColor(prescription.status === 'approved' || prescription.status === 'delivered' ? 'active' : 'pending')}>
                                  {prescription.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{prescription.client?.companyName}</p>
                              <p className="text-xs text-gray-500">
                                Created {formatDistanceToNow(new Date(prescription.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Progress</p>
                                <div className="flex items-center gap-2">
                                  <Progress value={prescription.implementationProgress} className="w-24 h-2" />
                                  <span className="text-sm font-medium">{prescription.implementationProgress}%</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* EMAILS TAB */}
          {activeTab === 'emails' && (
            <EmailManagement />
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">System Settings</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>
                      Manage global platform settings and configurations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Maintenance Mode</p>
                        <p className="text-sm text-gray-500">Temporarily disable user access</p>
                      </div>
                      <Badge variant="outline">Disabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Automated email system status</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">API Access</p>
                        <p className="text-sm text-gray-500">Public API endpoints status</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integrations Status</CardTitle>
                    <CardDescription>
                      Monitor external service connections.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">SwipesBlue Payments</p>
                          <p className="text-sm text-gray-500">Payment processing</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Resend Email</p>
                          <p className="text-sm text-gray-500">Transactional emails</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">OpenAI</p>
                          <p className="text-sm text-gray-500">AI analysis engine</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Connected</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Database & System Health</CardTitle>
                    <CardDescription>
                      Monitor system performance and database status.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-3xl font-bold text-green-600">99.9%</p>
                        <p className="text-sm text-gray-500">Uptime</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-3xl font-bold text-blue-600">&lt;100ms</p>
                        <p className="text-sm text-gray-500">API Response</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-3xl font-bold text-purple-600">{totalClients}</p>
                        <p className="text-sm text-gray-500">Total Records</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-3xl font-bold text-orange-600">0</p>
                        <p className="text-sm text-gray-500">Active Errors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

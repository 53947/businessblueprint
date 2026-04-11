import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/footer";
import { SideNav } from "@/components/side-nav";
import { SetupNotifications } from "@/components/setup-notifications";
import { getDisplayScore } from "@shared/score-utils";
import { BrandLogo } from "@/components/brand-logo";
import { AppIcon } from "@/components/app-name";
import { Header } from "@/components/header";
import { BundleSection } from "@/components/bundle-section";
import { BUNDLE_REGISTRY, getAppsByBundle } from "@/config/app-registry";
import {
  Globe,
  MessageSquare,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Brain,
  Home,
  CheckSquare,
  Lock,
  CreditCard,
  DollarSign,
  Package,
  Users,
  Sparkles,
  Pencil,
  Save,
  X
} from "lucide-react";

export default function ClientPortal() {
  const [, setLocation] = useLocation();
  const [clientId, setClientId] = useState<string | null>(null);
  const [externalId, setExternalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ companyName: "", phone: "", address: "", website: "" });
  const [showProfileConfirm, setShowProfileConfirm] = useState(false);
  const [profileConfirmText, setProfileConfirmText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Get client ID from session storage
    const storedClientId = sessionStorage.getItem("clientId");
    const storedExternalId = sessionStorage.getItem("externalId");
    
    if (!storedClientId) {
      // Redirect to login if no client ID
      setLocation("/portal/login");
      return;
    }
    
    setClientId(storedClientId);
    setExternalId(storedExternalId);
  }, [setLocation]);

  // Fetch client dashboard data
  const { data: dashboardData, isLoading, error } = useQuery<any>({
    queryKey: [`/api/clients/${clientId}/dashboard`],
    enabled: !!clientId,
  });

  // Fetch subscription data for billing tab
  const { data: subscriptionData, isLoading: subscriptionLoading } = useQuery<any>({
    queryKey: ['/api/portal/subscription'],
    enabled: !!clientId,
  });

  // Fetch billing history for billing tab
  const { data: billingHistoryData, isLoading: billingHistoryLoading } = useQuery<any>({
    queryKey: ['/api/portal/billing-history'],
    enabled: !!clientId,
  });

  // Fetch CRM tasks
  const queryClient = useQueryClient();
  const tasksQueryKey = `/api/crm/tasks?clientId=${clientId}`;
  const { data: tasksData } = useQuery<any>({
    queryKey: [tasksQueryKey],
    enabled: !!clientId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/crm/tasks", data).then(r => r.json()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [tasksQueryKey] }); toast({ title: "Task created" }); setShowTaskDialog(false); },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/crm/tasks/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [tasksQueryKey] }); toast({ title: "Task deleted" }); },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest("PATCH", `/api/crm/tasks/${id}`, { status }).then(r => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tasksQueryKey] }),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload: { companyName: string; phone: string; address: string; website: string; confirmationText: string }) =>
      apiRequest("PATCH", "/api/portal/profile", payload).then(r => r.json()),
    onSuccess: (result: any) => {
      if (result?.success === false) {
        toast({ title: "Update failed", description: result.message, variant: "destructive" });
        return;
      }
      toast({ title: "Profile updated", description: "Your business information has been saved." });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/dashboard`] });
      setIsEditingProfile(false);
      setShowProfileConfirm(false);
      setProfileConfirmText("");
    },
    onError: (error: any) => {
      toast({ title: "Update failed", description: error?.message || "Could not update profile", variant: "destructive" });
    },
  });

  const startEditingProfile = () => {
    const c = dashboardData?.data?.client;
    if (!c) return;
    setProfileForm({
      companyName: c.companyName || "",
      phone: c.phone || "",
      address: c.address || "",
      website: c.website || "",
    });
    setIsEditingProfile(true);
  };

  const cancelEditingProfile = () => {
    setIsEditingProfile(false);
    setShowProfileConfirm(false);
    setProfileConfirmText("");
  };

  const handleConfirmProfileSave = () => {
    updateProfileMutation.mutate({ ...profileForm, confirmationText: profileConfirmText });
  };

  const handleSignOut = () => {
    // Clear all session data including JWT token
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("externalId");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("clientName");
    setLocation("/portal/login");
  };

  const handleViewMessages = () => {
    setLocation("/respond");
  };

  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
    toast({
      title: "Navigation",
      description: `Switched to ${tab.charAt(0).toUpperCase() + tab.slice(1)} tab`
    });
  };

  const handleActivityClick = (activity: string) => {
    switch (activity) {
      case 'New review response needed':
        setLocation('/elevate/dashboard');
        break;
      case 'Listing verification pending':
        setLocation('/publish/dashboard');
        break;
      case 'Campaign performance update':
        setLocation('/promote/dashboard');
        break;
      case 'Task deadline approaching':
        navigateToTab('tasks');
        break;
      default:
        toast({
          title: activity,
          description: "More details available in the relevant app"
        });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E9ECF0]">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <BrandLogo brand="businessblueprint" layout="vertical" />
                <Badge variant="outline" className="text-sm">
                  Client Dashboard
                </Badge>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#E9ECF0] flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load dashboard data. Please try signing in again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const clientData = dashboardData?.data;
  if (!clientData) return null;

  return (
    <div className="min-h-screen bg-[#E9ECF0] flex flex-col">
      {/* Main Navigation Header */}
      <Header showNavigation={true} />
      
      <div className="flex flex-1">
      {/* Side Navigation */}
      <SideNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
        enabledFeatures={dashboardData?.client?.enabledFeatures}
        data-testid="portal-side-nav"
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab("overview")}
                  data-testid="button-dashboard"
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
                <h1 className="text-xl font-semibold text-gray-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                <Badge variant="outline" className="text-xs">
                  Client Dashboard
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">Welcome back, {clientData.client.companyName}</span>
              </div>
            </div>
          </div>
        </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Digital IQ + Business Info Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Digital IQ */}
          <Card className="bg-[#09080E] text-white">
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <h2 className="text-lg font-bold mb-1">Digital IQ</h2>
                <div className="text-4xl font-bold mb-1">{getDisplayScore(clientData.digitalScore || 0)}</div>
                <p className="text-xs text-blue-100">Updated {new Date(clientData.lastUpdated).toLocaleDateString()}</p>
              </div>
              {/* Score improvement insights */}
              <div className="space-y-2 mt-3 pt-3 border-t border-white/20">
                {!clientData.listings?.verified && (
                  <div className="flex items-center gap-2 text-xs text-blue-100">
                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                    <span>Set up <strong>/ publish</strong> to add +15 pts (directory listings)</span>
                  </div>
                )}
                {!clientData.reviews?.average && (
                  <div className="flex items-center gap-2 text-xs text-blue-100">
                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                    <span>Activate <strong>/ elevate</strong> to add +10 pts (reputation mgmt)</span>
                  </div>
                )}
                {!clientData.socialMedia?.isSetup && (
                  <div className="flex items-center gap-2 text-xs text-blue-100">
                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                    <span>Connect <strong>/ post</strong> to add +10 pts (social presence)</span>
                  </div>
                )}
                {!clientData.campaigns?.active && (
                  <div className="flex items-center gap-2 text-xs text-blue-100">
                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                    <span>Launch a <strong>/ promote</strong> campaign to add +10 pts</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Brain className="h-4 w-4" />
                <span className="text-xs">Powered by businessblueprint.io AI</span>
              </div>
            </CardContent>
          </Card>

          {/* Business Information - Upper Right */}
          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4" />
                  Business Information
                </CardTitle>
                {!isEditingProfile ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startEditingProfile}
                    data-testid="button-edit-profile"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelEditingProfile}
                      data-testid="button-cancel-profile"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="text-white"
                      style={{ backgroundColor: "#008060" }}
                      onClick={() => setShowProfileConfirm(true)}
                      data-testid="button-save-profile"
                    >
                      <Save className="h-3.5 w-3.5 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {!isEditingProfile ? (
                <>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-sm font-semibold">{clientData.client.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-sm">{clientData.client.email}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Lock className="h-3 w-3 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Contact support to change your email address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-sm">{clientData.client.phone || "Not set"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-sm">{clientData.client.address || "Not set"}</span>
                  </div>
                  {clientData.client.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-gray-500" />
                      <a href={clientData.client.website} target="_blank" rel="noopener noreferrer"
                         className="text-sm text-blue-600 hover:text-blue-800 break-all underline">
                        {clientData.client.website}
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="edit-company" className="text-xs text-gray-600">Business Name</Label>
                    <Input
                      id="edit-company"
                      value={profileForm.companyName}
                      onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                      className="mt-1"
                      data-testid="input-profile-company"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600 flex items-center gap-1">
                      Email <Lock className="h-3 w-3 text-gray-400" />
                    </Label>
                    <Input
                      value={clientData.client.email}
                      disabled
                      className="mt-1 bg-gray-100 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Contact support to change your email address</p>
                  </div>
                  <div>
                    <Label htmlFor="edit-phone" className="text-xs text-gray-600">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="mt-1"
                      data-testid="input-profile-phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-address" className="text-xs text-gray-600">Address</Label>
                    <Input
                      id="edit-address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="mt-1"
                      data-testid="input-profile-address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-website" className="text-xs text-gray-600">Website</Label>
                    <Input
                      id="edit-website"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      className="mt-1"
                      data-testid="input-profile-website"
                    />
                  </div>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Alert className="bg-amber-50 border-amber-200">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-xs text-amber-800">
                    Your business information is used across directory listings and citations. Changes are tracked and logged.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => setLocation("/publish/dashboard")}
                  data-testid="button-use-profile-publish"
                >
                  Use this profile for&nbsp;<span style={{ color: "#09080E" }}>/</span>&nbsp;<span style={{ color: "#064A6C" }}>publish</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Change Confirmation Dialog */}
          <Dialog open={showProfileConfirm} onOpenChange={(open) => { if (!open) { setShowProfileConfirm(false); setProfileConfirmText(""); } }}>
            <DialogContent data-testid="dialog-profile-confirm">
              <DialogHeader>
                <DialogTitle>Confirm Profile Changes</DialogTitle>
                <DialogDescription>
                  Changing your business information affects your directory listings and local SEO. To confirm, type your current business name:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                <Label htmlFor="profile-confirm-input" className="text-sm text-gray-600">
                  Current business name: <strong>{clientData.client.companyName}</strong>
                </Label>
                <Input
                  id="profile-confirm-input"
                  value={profileConfirmText}
                  onChange={(e) => setProfileConfirmText(e.target.value)}
                  placeholder="Type your current business name"
                  data-testid="input-profile-confirm"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => { setShowProfileConfirm(false); setProfileConfirmText(""); }}
                  data-testid="button-profile-confirm-cancel"
                >
                  Cancel
                </Button>
                <Button
                  className="text-white"
                  style={{ backgroundColor: "#008060" }}
                  disabled={
                    profileConfirmText.trim().toLowerCase() !== (clientData.client.companyName || "").trim().toLowerCase() ||
                    updateProfileMutation.isPending
                  }
                  onClick={handleConfirmProfileSave}
                  data-testid="button-profile-confirm-save"
                >
                  {updateProfileMutation.isPending ? "Saving..." : "Confirm & Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* CRM Hub - Prominent Entry Point */}
        <Card className="mb-8 border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50" data-testid="card-relationships-crm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}><span style={{ color: '#09080E' }}>/ </span><span style={{ color: '#008060' }}>connect</span></h3>
                    <Badge className="bg-green-500 text-white">CRM</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your customer command center — manage contacts, deals, and tasks
                  </p>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-crm-contacts-count">
                    {clientData?.crm?.contactsCount || 0}
                  </div>
                  <p className="text-xs text-gray-500">Contacts</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-crm-deals-count">
                    {clientData?.crm?.activeDeals || 0}
                  </div>
                  <p className="text-xs text-gray-500">Active Deals</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-crm-tasks-count">
                    {clientData?.crm?.tasksDue || 0}
                  </div>
                  <p className="text-xs text-gray-500">Tasks Due</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-100"
                  onClick={() => setLocation("/connect/dashboard")}
                  data-testid="button-open-crm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Open CRM
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setLocation("/connect/dashboard?action=add-contact")}
                  data-testid="button-add-contact"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </div>

            {/* First-run prompt for new users - only show when no contacts */}
            {(!clientData?.crm?.contactsCount || clientData.crm.contactsCount === 0) && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <Alert className="bg-green-100 border-green-200">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-sm text-green-800">
                    <strong>Get Started:</strong> Your CRM is the single source of truth for all customer data.
                    Add your first contact to unlock unified timelines, deal tracking, and automation across all your apps.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bundle Sections — Anchor + Compass */}
        {BUNDLE_REGISTRY.map((bundle) => (
          <BundleSection
            key={bundle.id}
            bundle={bundle}
            apps={getAppsByBundle(bundle.id)}
            clientData={clientData}
            onNavigate={setLocation}
          />
        ))}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button 
                      className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                      onClick={() => handleActivityClick('Listing verification pending')}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Google listing updated successfully</span>
                    </button>
                    <button 
                      className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                      onClick={() => handleActivityClick('New review response needed')}
                    >
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">New review received on Yelp</span>
                    </button>
                    <button 
                      className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
                      onClick={() => handleActivityClick('Campaign performance update')}
                    >
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Campaign performance report ready</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Priority Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Tasks</CardTitle>
                <CardDescription>Actions needed to improve your digital presence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="default">medium</Badge>
                      <span className="font-medium">Sync latest business data</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Due today</span>
                      <Button size="sm" onClick={() => setActiveTab("tasks")}>
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">low</Badge>
                      <span className="font-medium">Update business hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Due this week</span>
                      <Button size="sm" onClick={() => setActiveTab("tasks")}>
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                  {clientData.messages.unread > 0 && (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="destructive">high</Badge>
                        <span className="font-medium">Respond to {clientData.messages.unread} unread messages</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Due today</span>
                        <Button size="sm" onClick={handleViewMessages}>
                          View Messages
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>Track and manage your business tasks</CardDescription>
                </div>
                <Button
                  data-testid="button-create-task"
                  onClick={() => setShowTaskDialog(true)}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Task Filters */}
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      variant={taskFilter === "all" ? "default" : "outline"} 
                      size="sm" 
                      data-testid="filter-all-tasks"
                      onClick={() => setTaskFilter("all")}
                    >
                      All Tasks
                    </Button>
                    <Button 
                      variant={taskFilter === "active" ? "default" : "outline"} 
                      size="sm" 
                      data-testid="filter-active-tasks"
                      onClick={() => setTaskFilter("active")}
                    >
                      Active
                    </Button>
                    <Button 
                      variant={taskFilter === "completed" ? "default" : "outline"} 
                      size="sm" 
                      data-testid="filter-completed-tasks"
                      onClick={() => setTaskFilter("completed")}
                    >
                      Completed
                    </Button>
                    <Button 
                      variant={taskFilter === "overdue" ? "default" : "outline"} 
                      size="sm" 
                      data-testid="filter-overdue-tasks"
                      onClick={() => setTaskFilter("overdue")}
                    >
                      Overdue
                    </Button>
                  </div>

                  {/* Task List */}
                  <div className="space-y-3">
                    {(() => {
                      const tasks = (tasksData?.tasks || []) as any[];
                      const filtered = tasks.filter((t: any) => {
                        if (taskFilter === "all") return true;
                        if (taskFilter === "active") return t.status === "pending";
                        if (taskFilter === "completed") return t.status === "completed";
                        if (taskFilter === "overdue") return t.status === "pending" && t.dueDate && new Date(t.dueDate) < new Date();
                        return true;
                      });
                      if (filtered.length === 0) {
                        return <p className="text-center text-gray-500 py-8">No tasks found. Create one to get started.</p>;
                      }
                      return filtered.map((task: any) => {
                        const priorityColors: Record<string, string> = { urgent: "border-red-500 bg-red-50", high: "border-red-500 bg-red-50", medium: "border-yellow-500 bg-yellow-50", low: "border-blue-500 bg-blue-50" };
                        const borderClass = priorityColors[task.priority] || "border-gray-300";
                        const isCompleted = task.status === "completed";
                        return (
                          <div key={task.id} className={`flex items-center justify-between p-4 border-l-4 ${borderClass} rounded-lg ${isCompleted ? "opacity-60" : ""}`}>
                            <div className="flex items-center gap-4 flex-1">
                              <input type="checkbox" className="h-5 w-5" checked={isCompleted}
                                onChange={() => toggleTaskMutation.mutate({ id: task.id, status: isCompleted ? "pending" : "completed" })} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className={`font-medium ${isCompleted ? "line-through" : ""}`}>{task.title}</p>
                                  <Badge variant={task.priority === "high" || task.priority === "urgent" ? "destructive" : "secondary"}>
                                    {task.priority}
                                  </Badge>
                                </div>
                                {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                                <div className="flex items-center gap-4 mt-2">
                                  {task.dueDate && <span className="text-xs text-gray-500">Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>}
                                  {task.taskType && <span className="text-xs text-gray-500">{task.taskType}</span>}
                                </div>
                              </div>
                            </div>
                            {!isCompleted && (
                              <Button variant="ghost" size="sm" onClick={() => deleteTaskMutation.mutate(task.id)}>Delete</Button>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Create Task Dialog */}
                  {showTaskDialog && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-3">
                      <h4 className="font-medium">New Task</h4>
                      <input id="new-task-title" placeholder="Task title" className="w-full border rounded px-3 py-2 text-sm" />
                      <input id="new-task-desc" placeholder="Description (optional)" className="w-full border rounded px-3 py-2 text-sm" />
                      <div className="flex gap-3">
                        <select id="new-task-priority" className="border rounded px-3 py-2 text-sm">
                          <option value="low">Low</option>
                          <option value="medium" selected>Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        <input id="new-task-due" type="date" className="border rounded px-3 py-2 text-sm" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          const title = (document.getElementById("new-task-title") as HTMLInputElement)?.value;
                          if (!title) { toast({ title: "Title required" }); return; }
                          createTaskMutation.mutate({
                            clientId: parseInt(clientId!),
                            title,
                            description: (document.getElementById("new-task-desc") as HTMLInputElement)?.value || undefined,
                            priority: (document.getElementById("new-task-priority") as HTMLSelectElement)?.value || "medium",
                            dueDate: (document.getElementById("new-task-due") as HTMLInputElement)?.value ? new Date((document.getElementById("new-task-due") as HTMLInputElement).value).toISOString() : undefined,
                          });
                        }}>Save Task</Button>
                        <Button size="sm" variant="outline" onClick={() => setShowTaskDialog(false)}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {subscriptionLoading ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </CardContent>
              </Card>
            ) : subscriptionData?.subscription ? (
              <>
                {/* Account Status Alert (if not active) */}
                {clientData?.client?.accountStatus && clientData.client.accountStatus !== 'active' && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your account status is <strong>{clientData.client.accountStatus}</strong>. 
                      {clientData.client.accountStatus === 'suspended' && ' Please contact support to resolve billing issues.'}
                      {clientData.client.accountStatus === 'pending' && ' Your account setup is being processed.'}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Subscription Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Current Subscription
                    </CardTitle>
                    <CardDescription>
                      Your active plan and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Plan</p>
                          <p className="text-2xl font-bold" data-testid="text-plan-name">
                            {subscriptionData.subscription.plan?.name || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Billing Cycle</p>
                          <Badge variant="outline" className="text-base capitalize" data-testid="badge-billing-cycle">
                            {subscriptionData.subscription.billingCycle}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <Badge 
                            variant={subscriptionData.subscription.status === 'active' ? 'default' : 'secondary'}
                            className={subscriptionData.subscription.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                            data-testid="badge-subscription-status"
                          >
                            {subscriptionData.subscription.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                          <p className="text-3xl font-bold text-blue-600" data-testid="text-total-amount">
                            ${parseFloat(subscriptionData.subscription.totalAmount || '0').toFixed(2)}
                            <span className="text-base text-gray-500 ml-2">/ {subscriptionData.subscription.billingCycle}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <p className="text-lg font-medium" data-testid="text-next-billing-date">
                              {format(new Date(subscriptionData.subscription.nextBillingDate), 'MMMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add-ons Section */}
                    {subscriptionData.subscription.addons && subscriptionData.subscription.addons.length > 0 && (
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-3">Active Add-ons</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {subscriptionData.subscription.addons.map((addon: any) => (
                            <div 
                              key={addon.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                              data-testid={`addon-${addon.id}`}
                            >
                              <span className="font-medium">{addon.name}</span>
                              <span className="text-gray-600">+${parseFloat(addon.price).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Billing History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Billing History
                    </CardTitle>
                    <CardDescription>
                      Your recent billing transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {billingHistoryLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ) : billingHistoryData?.billingHistory?.length > 0 ? (
                      <div className="space-y-3">
                        {billingHistoryData.billingHistory.map((transaction: any) => (
                          <div 
                            key={transaction.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border"
                            data-testid={`transaction-${transaction.id}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-blue-100 rounded">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">${parseFloat(transaction.amount).toFixed(2)}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  {format(new Date(transaction.billingDate), 'MMM d, yyyy')}
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant={transaction.status === 'paid' ? 'default' : transaction.status === 'failed' ? 'destructive' : 'secondary'}
                              className={transaction.status === 'paid' ? 'bg-green-100 text-green-700' : ''}
                              data-testid={`badge-status-${transaction.id}`}
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>No billing history available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12">
                  <div className="text-center text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No Active Subscription</p>
                    <p className="text-sm">You don't have an active subscription plan.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      </div>
      </div>
      <Footer />

      <SetupNotifications />
    </div>
  );
}
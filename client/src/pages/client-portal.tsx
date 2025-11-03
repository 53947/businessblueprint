import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { SideNav } from "@/components/side-nav";
import { SynupListings } from "@/components/synup-listings";
import { SynupReviews } from "@/components/synup-reviews";
import { BrandLogo } from "@/components/brand-logo";
import ContentManagement from "@/pages/content-management";
import { 
  BarChart3, 
  Star, 
  Globe, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  LogOut,
  Brain,
  Home,
  Share2,
  CheckSquare,
  MessageCircle,
  Bell,
  Lock
} from "lucide-react";

export default function ClientPortal() {
  const [, setLocation] = useLocation();
  const [clientId, setClientId] = useState<string | null>(null);
  const [externalId, setExternalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
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

  const handleSignOut = () => {
    // Clear all session data including JWT token
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("externalId");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("clientName");
    setLocation("/portal/login");
  };

  const handleManageListing = (platform: string) => {
    const platformUrls = {
      'Google Business': 'https://business.google.com',
      'Yelp': 'https://biz.yelp.com',
      'Facebook': 'https://business.facebook.com',
      'Apple Maps': 'https://mapsconnect.apple.com'
    };
    
    const url = platformUrls[platform as keyof typeof platformUrls];
    if (url) {
      window.open(url, '_blank');
      toast({
        title: "Redirecting to " + platform,
        description: "Opening your " + platform + " business management page..."
      });
    } else {
      toast({
        title: "Coming Soon",
        description: platform + " management integration is being developed."
      });
    }
  };

  const handleCompleteTask = (taskTitle: string) => {
    toast({
      title: "Task Completed!",
      description: `"${taskTitle}" has been marked as complete.`
    });
  };

  const handleViewMessages = () => {
    toast({
      title: "Messages",
      description: "Message management interface is being developed. Check back soon!"
    });
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
        navigateToTab('reviews');
        break;
      case 'Listing verification pending':
        navigateToTab('listings');
        break;
      case 'Campaign performance update':
        navigateToTab('campaigns');
        break;
      case 'Task deadline approaching':
        navigateToTab('tasks');
        break;
      default:
        toast({
          title: activity,
          description: "More details available in the relevant tab"
        });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Side Navigation */}
      <SideNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onSignOut={handleSignOut}
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
          {/* Digital IQ - Half Size */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <h2 className="text-lg font-bold mb-1">Digital IQ</h2>
                <div className="text-4xl font-bold mb-1">{clientData.digitalScore}</div>
                <p className="text-xs text-blue-100">Updated {new Date(clientData.lastUpdated).toLocaleDateString()}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs">Powered by businessblueprint AI</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information - Upper Right */}
          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-sm">{clientData.client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-sm">{clientData.client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-sm">{clientData.client.address}</span>
              </div>
              {clientData.client.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-gray-500" />
                  <a href={clientData.client.website} target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-blue-600 hover:text-blue-800 break-all">
                    {clientData.client.website}
                  </a>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Alert className="bg-amber-50 border-amber-200">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-xs text-amber-800">
                    <strong>Protected:</strong> This information is used for Local SEO listings and citations. Changes require verification.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5 Service Boxes - Official Order */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {/* 1. Local SEO Management */}
          <Card className="hover:shadow-lg transition-shadow" data-testid="card-local-seo">
            <CardContent className="p-6">
              {/* Results Section (TOP) */}
              <div className="flex items-center justify-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <img src="/attached_assets/LOCAL SEO_1760785581174.png" alt="Local SEO" className="w-8 h-8" />
                <div className="text-center">
                  <div className="flex gap-3">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{clientData.listings.verified || 5}</div>
                      <p className="text-[10px] text-gray-600">Listings</p>
                    </div>
                    <div className="border-l border-gray-300"></div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{clientData.listings.citations || 12}</div>
                      <p className="text-[10px] text-gray-600">Citations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Icon & Content (MIDDLE) */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <img src="/attached_assets/LOCAL SEO_1760785581174.png" alt="Local SEO" className="w-16 h-16" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Local SEO Mgmt</h3>
                <p className="text-xs text-gray-600">Manage listings & citations</p>
              </div>
              
              {/* Action Button (BOTTOM) */}
              <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setActiveTab("listings")} data-testid="button-manage-local-seo">
                <img src="/attached_assets/LOCAL SEO_1760785581174.png" alt="" className="w-4 h-4" />
                <span>Manage</span>
              </Button>
            </CardContent>
          </Card>

          {/* 2. /send */}
          <Card className="hover:shadow-lg transition-shadow" data-testid="card-send">
            <CardContent className="p-6">
              {/* Results Section (TOP) */}
              <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <img src="/attached_assets/icons/send-icon-corrected.png" alt="/send" className="w-8 h-8" />
                <div className="text-center w-full">
                  {clientData.campaigns.latest ? (
                    <>
                      <div className="text-sm font-bold text-gray-900 mb-1">{clientData.campaigns.latest.name}</div>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        <div>
                          <div className="text-base font-bold text-gray-900">{clientData.campaigns.latest.clickThroughs}</div>
                          <p className="text-[9px] text-gray-600">Clicks</p>
                        </div>
                        <div>
                          <div className="text-base font-bold text-gray-900">{clientData.campaigns.latest.purchases}</div>
                          <p className="text-[9px] text-gray-600">Sales</p>
                        </div>
                        <div>
                          <div className="text-base font-bold text-gray-900">{clientData.campaigns.latest.unsubscribes}</div>
                          <p className="text-[9px] text-gray-600">Unsubs</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">No campaigns yet</div>
                  )}
                </div>
              </div>
              
              {/* Icon & Content (MIDDLE) */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <img src="/attached_assets/icons/send-icon-corrected.png" alt="/send" className="w-16 h-16" />
                </div>
                <h3 className="font-semibold text-sm mb-2 font-['Archivo']">
                  <span style={{ color: '#84D71A' }}>/</span>
                  <span style={{ color: '#0057FF' }}>send</span>
                </h3>
                <p className="text-xs text-gray-600">Email & SMS campaigns</p>
              </div>
              
              {/* Action Button (BOTTOM) */}
              <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setActiveTab("campaigns")} data-testid="button-schedule-campaign">
                <img src="/attached_assets/icons/send-icon-corrected.png" alt="" className="w-4 h-4" />
                <span>Schedule</span>
              </Button>
            </CardContent>
          </Card>

          {/* 3. Social Media Management */}
          <Card className="hover:shadow-lg transition-shadow" data-testid="card-social-media">
            <CardContent className="p-6">
              {/* Results Section (TOP) */}
              <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <img src="/attached_assets/icons/social-media-mgmt.png" alt="Social Media" className="w-8 h-8" />
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{clientData.socialMedia?.newLikes || 0}</div>
                      <p className="text-[9px] text-gray-600">Likes</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{clientData.socialMedia?.newComments || 0}</div>
                      <p className="text-[9px] text-gray-600">Comments</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{clientData.socialMedia?.newMessages || 0}</div>
                      <p className="text-[9px] text-gray-600">Messages</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Icon & Content (MIDDLE) */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <img src="/attached_assets/icons/social-media-mgmt.png" alt="Social Media" className="w-16 h-16" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Social Media Management</h3>
                <p className="text-xs text-gray-600">social media manager</p>
              </div>
              
              {/* Action Button (BOTTOM) - Conditional */}
              {clientData.socialMedia?.isSetup ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="flex items-center justify-center gap-1" onClick={() => setActiveTab("social")} data-testid="button-schedule-social">
                    <img src="/attached_assets/icons/social-media-mgmt.png" alt="" className="w-4 h-4" />
                    <span className="text-xs">Schedule</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center justify-center gap-1" onClick={() => setActiveTab("social")} data-testid="button-respond-social">
                    <img src="/attached_assets/icons/social-media-mgmt.png" alt="" className="w-4 h-4" />
                    <span className="text-xs">Respond</span>
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setActiveTab("social")} data-testid="button-setup-social">
                  <img src="/attached_assets/icons/social-media-mgmt.png" alt="" className="w-4 h-4" />
                  <span>Setup</span>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* 4. Reputation Management */}
          <Card className="hover:shadow-lg transition-shadow" data-testid="card-reputation">
            <CardContent className="p-6">
              {/* Results Section (TOP) */}
              <div className="flex items-center justify-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <img src="/attached_assets/Reputation Management Icon_1760786977607.png" alt="Reputation" className="w-8 h-8" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{clientData.reviews.average}</div>
                  <p className="text-[10px] text-gray-600">Review Ratings</p>
                </div>
              </div>
              
              {/* Icon & Content (MIDDLE) */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <img src="/attached_assets/Reputation Management Icon_1760786977607.png" alt="Reputation" className="w-16 h-16" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Reputation Mgmt</h3>
                <p className="text-xs text-gray-600">Monitor and respond to ratings and reviews</p>
              </div>
              
              {/* Action Button (BOTTOM) */}
              <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setActiveTab("reviews")} data-testid="button-respond-reviews">
                <img src="/attached_assets/Reputation Management Icon_1760786977607.png" alt="" className="w-4 h-4" />
                <span>Respond</span>
              </Button>
            </CardContent>
          </Card>

          {/* 5. Live Chat */}
          <Card className="hover:shadow-lg transition-shadow" data-testid="card-livechat">
            <CardContent className="p-6">
              {/* Results Section (TOP) */}
              <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <img src="/attached_assets/livechat icon_1760788412068.png" alt="/livechat" className="w-8 h-8" />
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{clientData.livechat?.participationRating || 0}</div>
                      <p className="text-[9px] text-gray-600">Rating</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{clientData.livechat?.inQueue || 0}</div>
                      <p className="text-[9px] text-gray-600">In Queue</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Icon & Content (MIDDLE) */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <img src="/attached_assets/livechat icon_1760788412068.png" alt="/livechat" className="w-16 h-16" />
                </div>
                <h3 className="font-semibold text-sm mb-2 font-['Archivo']">
                  <span style={{ color: '#84D71A' }}>/</span>
                  <span style={{ color: '#0057FF' }}>livechat</span>
                </h3>
                <p className="text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Active chat participation
                  </span>
                </p>
              </div>
              
              {/* Action Button (BOTTOM) - Conditional */}
              {clientData.livechat?.isSetup ? (
                <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setLocation("/livechat-demo")} data-testid="button-engage-livechat">
                  <img src="/attached_assets/livechat icon_1760788412068.png" alt="" className="w-4 h-4" />
                  <span>Engage</span>
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setLocation("/livechat-demo")} data-testid="button-setup-livechat">
                  <img src="/attached_assets/livechat icon_1760788412068.png" alt="" className="w-4 h-4" />
                  <span>Setup Widget</span>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

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
                      <Button size="sm" onClick={() => handleCompleteTask("Sync latest business data")}>
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
                      <Button size="sm" onClick={() => handleCompleteTask("Update business hours")}>
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

          {/* Listings Tab */}
          <TabsContent value="listings">
            <SynupListings />
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <SynupReviews />
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaigns</CardTitle>
                <CardDescription>Track and manage your marketing efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{clientData.campaigns.active}</div>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{clientData.campaigns.pending}</div>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{clientData.campaigns.performance.reach}</div>
                    <p className="text-sm text-gray-600">Monthly Reach</p>
                  </div>
                </div>
                <div className="text-center py-8 text-gray-500">
                  <p>Campaign management interface coming soon...</p>
                  <p className="text-sm mt-2">Your campaigns will be managed through this dashboard.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <ContentManagement />
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
                  onClick={() => {
                    toast({
                      title: "Create Task",
                      description: "Task creation dialog will open here. Connect to backend API to save tasks to database.",
                    });
                  }}
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
                    {/* High Priority Task */}
                    <div className="flex items-center justify-between p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <input type="checkbox" className="h-5 w-5" data-testid="checkbox-task-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Respond to urgent customer reviews</p>
                            <Badge variant="destructive" data-testid="badge-priority-high">High</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">3 negative reviews need immediate attention</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">Due: Today</span>
                            <span className="text-xs text-gray-500">Reviews</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          data-testid="button-edit-task-1"
                          onClick={() => toast({ title: "Edit Task", description: "Edit dialog will open. Backend API integration needed." })}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          data-testid="button-delete-task-1"
                          onClick={() => toast({ title: "Delete Task", description: "Task deleted. Backend API integration needed for persistence." })}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>

                    {/* Medium Priority Task */}
                    <div className="flex items-center justify-between p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <input type="checkbox" className="h-5 w-5" data-testid="checkbox-task-2" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Update business hours on all listings</p>
                            <Badge variant="secondary" data-testid="badge-priority-medium">Medium</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Sync holiday hours across 50+ directories</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">Due: This Week</span>
                            <span className="text-xs text-gray-500">Listings</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" data-testid="button-edit-task-2">Edit</Button>
                        <Button variant="ghost" size="sm" data-testid="button-delete-task-2">Delete</Button>
                      </div>
                    </div>

                    {/* Low Priority Task */}
                    <div className="flex items-center justify-between p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <input type="checkbox" className="h-5 w-5" data-testid="checkbox-task-3" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Review analytics and performance metrics</p>
                            <Badge variant="outline" data-testid="badge-priority-low">Low</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Monthly performance review</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">Due: Next Week</span>
                            <span className="text-xs text-gray-500">Analytics</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" data-testid="button-edit-task-3">Edit</Button>
                        <Button variant="ghost" size="sm" data-testid="button-delete-task-3">Delete</Button>
                      </div>
                    </div>

                    {/* Completed Task */}
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 opacity-60">
                      <div className="flex items-center gap-4 flex-1">
                        <input type="checkbox" className="h-5 w-5" checked disabled data-testid="checkbox-task-4" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium line-through">Set up email integration</p>
                            <Badge variant="outline" data-testid="badge-status-completed">Completed</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Connected Gmail and Outlook accounts</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">Completed: Yesterday</span>
                            <span className="text-xs text-gray-500">Setup</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Task Categories:</strong> Reviews, Listings, Campaigns, Setup, Analytics, Social Media, Messages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
}
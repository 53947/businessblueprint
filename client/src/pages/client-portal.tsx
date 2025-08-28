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
  Brain
} from "lucide-react";

export default function ClientPortal() {
  const [, setLocation] = useLocation();
  const [clientId, setClientId] = useState<string | null>(null);
  const [vendastaId, setVendastaId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  useEffect(() => {
    // Get client ID from session storage
    const storedClientId = sessionStorage.getItem("clientId");
    const storedVendastaId = sessionStorage.getItem("vendastaId");
    
    if (!storedClientId) {
      // Redirect to login if no client ID
      setLocation("/portal/login");
      return;
    }
    
    setClientId(storedClientId);
    setVendastaId(storedVendastaId);
  }, [setLocation]);

  // Fetch client dashboard data
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: [`/api/clients/${clientId}/dashboard`],
    enabled: !!clientId,
  });

  const handleSignOut = () => {
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("vendastaId");
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
                <h1 className="text-2xl font-bold text-gray-900">
                  cloud<span className="text-blue-600">pleaser</span><span className="text-purple-600">.io</span>
                </h1>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:opacity-80 transition-opacity">
                <Brain className="h-6 w-6 text-blue-600" />
                cloud<span className="text-blue-600">pleaser</span><span className="text-purple-600">.io</span>
              </a>
              <Badge variant="outline" className="text-sm">
                Client Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, {clientData.client.companyName}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Digital Score Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Digital Empowerment Score</h2>
                  <p className="text-blue-100">Your comprehensive online presence rating</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Brain className="h-5 w-5" />
                    <span className="text-sm">Powered by cloudpleaser AI</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{clientData.digitalScore}</div>
                  <div className="text-2xl font-semibold">{clientData.grade}</div>
                  <p className="text-sm text-blue-100 mt-1">Updated {new Date(clientData.lastUpdated).toLocaleDateString()}</p>
                  <p className="text-xs text-blue-200">Vendasta ID: {vendastaId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{clientData.listings.verified}</div>
              <p className="text-sm text-gray-600">Active Listings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{clientData.reviews.average}</div>
              <p className="text-sm text-gray-600">Review Rating</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{clientData.campaigns.active}</div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{clientData.campaigns.performance.reach}</div>
              <p className="text-sm text-gray-600">Monthly Reach</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{clientData.client.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{clientData.client.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{clientData.client.address}</span>
                  </div>
                  {clientData.client.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a href={clientData.client.website} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-blue-600 hover:text-blue-800">
                        {clientData.client.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {clientData.client.businessCategory}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

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
            <Card>
              <CardHeader>
                <CardTitle>Business Listings Management</CardTitle>
                <CardDescription>Manage your presence across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{clientData.listings.verified}</div>
                      <p className="text-sm text-gray-600">Verified</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{clientData.listings.pending}</div>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{clientData.listings.total}</div>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientData.listings.platforms.map((platform, index) => (
                    <div key={index} className="p-4 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">{platform}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleManageListing(platform)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
                <CardDescription>Monitor and respond to customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Review management interface coming soon...
                </div>
              </CardContent>
            </Card>
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
                  <p className="text-sm mt-2">Your campaigns are currently managed through Vendasta.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Track your progress and next steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Advanced task management coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
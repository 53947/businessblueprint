import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  TrendingUp,
  Settings,
  BarChart3,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Phone,
  Globe,
  Calendar,
  Building2,
  Shield,
  Network,
  RefreshCw,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { CrmEmptyState, CRM_EMPTY_CONFIGS } from "@/components/crm-empty-state";
import { useCrmPresence } from "@/hooks/use-crm-presence";
import { ProfileView } from "@/components/distribution/ProfileView";
import { ProfileEditDialog } from "@/components/distribution/ProfileEditDialog";
import { PinGateDialog } from "@/components/distribution/PinGateDialog";
import { CoverageGrid } from "@/components/distribution/CoverageGrid";
import type { CanonicalBusinessProfile } from "@shared/schema";

interface BusinessListing {
  id: number;
  platform: string;
  status: 'active' | 'pending' | 'error';
  name: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  lastUpdated: string;
  url?: string;
}

interface ListingsMetrics {
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  errorListings: number;
  totalViews: number;
  totalClicks: number;
  avgRating: number;
}

export default function PublishDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState<BusinessListing | null>(null);

  // Profile tab state
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [unlockToken, setUnlockToken] = useState<string | null>(null);
  
  const crmPresence = useCrmPresence();

  // Get client ID from session
  const clientId = sessionStorage.getItem("clientId");

  // Fetch listings metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery<ListingsMetrics>({
    queryKey: [`/api/clients/${clientId}/list/metrics`],
    enabled: !!clientId,
  });

  // Fetch business listings
  const { data: listings, isLoading: listingsLoading } = useQuery<BusinessListing[]>({
    queryKey: [`/api/clients/${clientId}/list`],
    enabled: !!clientId,
  });

  // Fetch canonical profile for Profile tab
  const { data: profileData } = useQuery<{ profile: CanonicalBusinessProfile }>({
    queryKey: [`/api/clients/${clientId}/distribution/profile`],
    enabled: !!clientId,
  });

  // Check if PIN is set
  const { data: pinData } = useQuery<{ hasPin: boolean }>({
    queryKey: [`/api/clients/${clientId}/distribution/profile/has-pin`],
    enabled: !!clientId,
  });

  const profile = profileData?.profile;
  const hasPin = pinData?.hasPin ?? false;
  const isUnlocked = !!unlockToken;

  const handleEditProfileClick = () => {
    if (!hasPin || isUnlocked) {
      if (!hasPin) {
        // No PIN set, open PIN creation first
        setShowPinDialog(true);
      } else {
        // Already unlocked, open edit directly
        setShowProfileEdit(true);
      }
    } else {
      // PIN set but locked, open PIN entry
      setShowPinDialog(true);
    }
  };

  const handlePinUnlocked = (token: string) => {
    setUnlockToken(token);
    setShowPinDialog(false);
    // Refresh PIN status in case it was just created
    queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/distribution/profile/has-pin`] });
    setShowProfileEdit(true);
  };

  // Use shared CRM data from hook (avoids duplicate queries)
  const crmCompany = crmPresence.companies?.[0]; // Get primary company
  
  // Show CRM empty state for unauthenticated users or when CRM has no data
  const showCrmEmptyState = crmPresence.state === 'unauthenticated' || crmPresence.state === 'empty';

  // Update listing mutation
  const updateListingMutation = useMutation({
    mutationFn: async (data: { id: number; [key: string]: any }) => {
      return await apiRequest(
        'PATCH',
        `/api/clients/${clientId}/list/${data.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/list`] });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/list/metrics`] });
      toast({ title: 'Success', description: 'Listing updated successfully' });
      setShowEditDialog(false);
      setSelectedListing(null);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to update listing',
        variant: 'destructive' 
      });
    }
  });

  const addListingMutation = useMutation({
    mutationFn: async (data: { platform: string; name: string; address?: string; phone?: string; website?: string; hours?: string; url?: string }) => {
      return await apiRequest('POST', `/api/clients/${clientId}/list`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/list`] });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/list/metrics`] });
      toast({ title: 'Success', description: 'Listing added successfully' });
      setShowAddDialog(false);
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message || 'Failed to add listing', variant: 'destructive' });
    }
  });

  const handleEditListing = (listing: BusinessListing) => {
    if (!clientId) {
      toast({ 
        title: 'Authentication Required', 
        description: 'Please log in to edit listings',
        variant: 'destructive' 
      });
      return;
    }
    setSelectedListing(listing);
    setShowEditDialog(true);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  // Sync listings mutation
  const syncMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', `/api/clients/${clientId}/list/sync`);
    },
    onSuccess: async (res) => {
      const data = await res.json();
      // Also trigger a metrics snapshot after sync
      try {
        await apiRequest('POST', `/api/clients/${clientId}/list/metrics/sync`);
      } catch (_) { /* non-blocking */ }
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/list`] });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/list/metrics`] });
      toast({
        title: 'Listings Synced',
        description: `Found ${data.found} listings: ${data.created} new, ${data.updated} updated`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Sync Failed',
        description: error.message || 'Failed to sync listings',
        variant: 'destructive',
      });
    },
  });

  const emptyMetrics: ListingsMetrics = {
    totalListings: 0,
    activeListings: 0,
    pendingListings: 0,
    errorListings: 0,
    totalViews: 0,
    totalClicks: 0,
    avgRating: 0,
  };

  const displayMetrics = metrics || emptyMetrics;
  const displayListings = listings || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SectionHeader 
        title="/ publish — Business Listings Manager"
        subtitle="Keep your business information accurate and identical across 50+ directories and platforms"
        tabs={[
          { 
            label: 'Overview', 
            icon: BarChart3, 
            active: activeTab === 'overview',
            onClick: () => setActiveTab('overview'),
            testId: 'tab-overview'
          },
          { 
            label: 'Listings',
            icon: MapPin,
            active: activeTab === 'list',
            onClick: () => setActiveTab('list'),
            testId: 'tab-list'
          },
          {
            label: 'Analytics',
            icon: TrendingUp,
            active: activeTab === 'analytics',
            onClick: () => setActiveTab('analytics'),
            testId: 'tab-analytics'
          },
          {
            label: 'Profile',
            icon: Shield,
            active: activeTab === 'profile',
            onClick: () => setActiveTab('profile'),
            testId: 'tab-profile'
          },
          {
            label: 'Coverage',
            icon: Network,
            active: activeTab === 'coverage',
            onClick: () => setActiveTab('coverage'),
            testId: 'tab-coverage'
          }
        ]}
        actions={
          <>
            <Button
              onClick={() => syncMutation.mutate()}
              variant="outline"
              size="sm"
              disabled={syncMutation.isPending || !clientId}
              data-testid="button-sync-listings"
            >
              {syncMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-1" />
              )}
              {syncMutation.isPending ? 'Syncing...' : 'Sync Listings'}
            </Button>
            <Button
              onClick={() => setActiveTab('profile')}
              variant="ghost"
              size="sm"
              data-testid="button-settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setShowAddDialog(true)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-listing"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>
          </>
        }
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* CRM Empty State - Show when no company data or no clientId */}
        {showCrmEmptyState && (
          <div className="mb-6">
            <CrmEmptyState {...CRM_EMPTY_CONFIGS.list} variant="compact" />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card data-testid="card-total-listings">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{displayMetrics.totalListings}</div>
                  <p className="text-sm text-gray-500 mt-1">Across all platforms</p>
                </CardContent>
              </Card>

              <Card data-testid="card-active-listings">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <span className="text-3xl font-bold">{displayMetrics.activeListings}</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">Live and verified</p>
                </CardContent>
              </Card>

              <Card data-testid="card-total-views">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{displayMetrics.totalViews.toLocaleString()}</div>
                  <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card data-testid="card-total-clicks">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{displayMetrics.totalClicks.toLocaleString()}</div>
                  <p className="text-sm text-blue-600 mt-1">
                    {displayMetrics.totalViews > 0 ? ((displayMetrics.totalClicks / displayMetrics.totalViews) * 100).toFixed(1) : 0}% CTR
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CRM Company Integration (Performance tier) */}
            {crmCompany && (
              <Card className="mb-8" data-testid="card-crm-company">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-4 w-4 text-green-600" />
                    CRM Business Data
                    <Badge className="bg-green-100 text-green-700 text-xs">Performance</Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Linked from / connect company records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="font-medium text-sm" data-testid="text-crm-company-name">{crmCompany.name}</p>
                      </div>
                    </div>
                    {crmCompany.industry && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Industry</p>
                          <p className="font-medium text-sm" data-testid="text-crm-company-industry">{crmCompany.industry}</p>
                        </div>
                      </div>
                    )}
                    {crmCompany.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-sm" data-testid="text-crm-company-phone">{crmCompany.phone}</p>
                        </div>
                      </div>
                    )}
                    {crmCompany.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Website</p>
                          <p className="font-medium text-sm" data-testid="text-crm-company-website">{crmCompany.website}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => window.location.href = '/connect'} data-testid="button-view-crm">
                      View in / connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Listing Status Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card data-testid="card-status-active">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-sm font-medium">Active</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{displayMetrics.activeListings}</div>
                </CardContent>
              </Card>

              <Card data-testid="card-status-pending">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{displayMetrics.pendingListings}</div>
                </CardContent>
              </Card>

              <Card data-testid="card-status-error">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{displayMetrics.errorListings}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Listings Activity */}
            <Card data-testid="card-recent-activity">
              <CardHeader>
                <CardTitle>Recent Listing Updates</CardTitle>
                <CardDescription>Latest changes to your business listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayListings.slice(0, 5).map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        {getStatusIcon(listing.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{listing.platform}</span>
                            {getStatusBadge(listing.status)}
                          </div>
                          <p className="text-sm text-gray-600">{listing.name}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Updated {new Date(listing.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {listing.url && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(listing.url, '_blank')}
                            data-testid={`button-view-${listing.id}`}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleEditListing(listing)}
                          disabled={!clientId}
                          data-testid={`button-edit-${listing.id}`}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="list">
            <Card data-testid="card-all-listings">
              <CardHeader>
                <CardTitle>All Business Listings</CardTitle>
                <CardDescription>Manage your business information across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                {displayListings.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium mb-1">No listings synced yet</p>
                    <p className="text-sm mb-4">Sync your business listings from Google and Yelp to get started.</p>
                    <Button
                      onClick={() => syncMutation.mutate()}
                      disabled={syncMutation.isPending || !clientId}
                      size="sm"
                    >
                      {syncMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-1" />
                      )}
                      Sync Listings
                    </Button>
                  </div>
                ) : (
                <div className="space-y-4">
                  {displayListings.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-6" data-testid={`listing-${listing.id}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(listing.status)}
                          <div>
                            <h3 className="font-semibold text-lg">{listing.platform}</h3>
                            {getStatusBadge(listing.status)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {listing.url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(listing.url, '_blank')}
                              data-testid={`button-view-listing-${listing.id}`}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Live
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleEditListing(listing)}
                            disabled={!clientId}
                            data-testid={`button-edit-listing-${listing.id}`}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{listing.name}</p>
                            <p className="text-gray-600">{listing.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-900">{listing.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a href={listing.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                            {listing.website}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-900">{listing.hours}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          Last updated: {new Date(listing.lastUpdated).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {displayListings.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">No Analytics Data Yet</h3>
                <p className="text-gray-600">Sync your listings to see analytics and performance metrics.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Listing Health */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Listing Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-green-700">Active</span>
                          <span className="text-sm text-gray-600">{displayMetrics.activeListings} of {displayMetrics.totalListings}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: `${displayMetrics.totalListings > 0 ? (displayMetrics.activeListings / displayMetrics.totalListings) * 100 : 0}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-yellow-700">Pending</span>
                          <span className="text-sm text-gray-600">{displayMetrics.pendingListings}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-yellow-500 h-3 rounded-full" style={{ width: `${displayMetrics.totalListings > 0 ? (displayMetrics.pendingListings / displayMetrics.totalListings) * 100 : 0}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-red-700">Errors</span>
                          <span className="text-sm text-gray-600">{displayMetrics.errorListings}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-red-500 h-3 rounded-full" style={{ width: `${displayMetrics.totalListings > 0 ? (displayMetrics.errorListings / displayMetrics.totalListings) * 100 : 0}%` }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Coverage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(() => {
                        const platformCounts: Record<string, number> = {};
                        displayListings.forEach((l) => {
                          platformCounts[l.platform] = (platformCounts[l.platform] || 0) + 1;
                        });
                        return Object.entries(platformCounts).map(([platform, count]) => (
                          <div key={platform} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm font-medium">{platform}</span>
                            <Badge variant="outline">{count} listing{count !== 1 ? 's' : ''}</Badge>
                          </div>
                        ));
                      })()}
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Engagement Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{displayMetrics.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-gray-500 mt-1">Total Views</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{displayMetrics.totalClicks.toLocaleString()}</div>
                        <p className="text-xs text-gray-500 mt-1">Total Clicks</p>
                      </div>
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{displayMetrics.avgRating}</div>
                        <p className="text-xs text-gray-500 mt-1">Avg Rating</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {displayMetrics.totalViews > 0 ? ((displayMetrics.totalClicks / displayMetrics.totalViews) * 100).toFixed(1) : 0}%
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Click Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Active Listings</span>
                        </div>
                        <span className="text-sm font-bold">{displayMetrics.activeListings}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">Pending Verification</span>
                        </div>
                        <span className="text-sm font-bold">{displayMetrics.pendingListings}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm">Needs Attention</span>
                        </div>
                        <span className="text-sm font-bold">{displayMetrics.errorListings}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            {profile ? (
              <ProfileView
                profile={profile}
                isUnlocked={isUnlocked}
                onEditClick={handleEditProfileClick}
              />
            ) : clientId ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Loading Profile...</h3>
                <p className="text-gray-600">Your canonical business profile is being loaded.</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">No Profile Available</h3>
                <p className="text-gray-600">Log in to view your business profile.</p>
              </div>
            )}
          </TabsContent>

          {/* Coverage Tab */}
          <TabsContent value="coverage">
            {clientId ? (
              <CoverageGrid clientId={clientId} />
            ) : (
              <div className="text-center py-12">
                <Network className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Coverage Dashboard</h3>
                <p className="text-gray-600">Log in to view your directory coverage across 100+ directories.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* PIN Gate Dialog */}
      {clientId && (
        <PinGateDialog
          open={showPinDialog}
          onOpenChange={setShowPinDialog}
          clientId={clientId}
          mode={hasPin ? "enter" : "create"}
          onUnlocked={handlePinUnlocked}
        />
      )}

      {/* Profile Edit Dialog */}
      {clientId && profile && unlockToken && (
        <ProfileEditDialog
          open={showProfileEdit}
          onOpenChange={setShowProfileEdit}
          profile={profile}
          clientId={clientId}
          unlockToken={unlockToken}
        />
      )}

      {/* Edit Listing Dialog */}
      {showEditDialog && selectedListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEditDialog(false)}>
          <Card className="w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Edit Listing</CardTitle>
              <CardDescription>
                {selectedListing.platform} · {selectedListing.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Business Name</Label>
                <Input id="name" defaultValue={selectedListing.name} />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={selectedListing.address} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue={selectedListing.phone} />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue={selectedListing.website} />
                </div>
              </div>

              <div>
                <Label htmlFor="hours">Hours</Label>
                <Input id="hours" defaultValue={selectedListing.hours} />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditDialog(false)}
                  data-testid="button-cancel-edit"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const name = (document.getElementById('name') as HTMLInputElement)?.value;
                    const address = (document.getElementById('address') as HTMLInputElement)?.value;
                    const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
                    const website = (document.getElementById('website') as HTMLInputElement)?.value;
                    const hours = (document.getElementById('hours') as HTMLInputElement)?.value;
                    updateListingMutation.mutate({
                      id: selectedListing.id,
                      name, address, phone, website, hours,
                    });
                  }}
                  disabled={updateListingMutation.isPending}
                  data-testid="button-save-listing"
                >
                  {updateListingMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Listing Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddDialog(false)}>
          <Card className="w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Add New Listing</CardTitle>
              <CardDescription>
                Manually add a business listing to track
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="add-platform">Platform *</Label>
                <select
                  id="add-platform"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue=""
                  data-testid="select-platform"
                >
                  <option value="" disabled>Select platform...</option>
                  <option value="google_business">Google Business</option>
                  <option value="yelp">Yelp</option>
                  <option value="facebook">Facebook</option>
                  <option value="bing_places">Bing Places</option>
                  <option value="apple_maps">Apple Maps</option>
                </select>
              </div>
              <div>
                <Label htmlFor="add-name">Business Name *</Label>
                <Input id="add-name" placeholder="Your business name" data-testid="input-add-name" />
              </div>
              <div>
                <Label htmlFor="add-address">Address</Label>
                <Input id="add-address" placeholder="123 Main St, City, State" data-testid="input-add-address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-phone">Phone</Label>
                  <Input id="add-phone" placeholder="(555) 123-4567" data-testid="input-add-phone" />
                </div>
                <div>
                  <Label htmlFor="add-website">Website</Label>
                  <Input id="add-website" placeholder="https://..." data-testid="input-add-website" />
                </div>
              </div>
              <div>
                <Label htmlFor="add-hours">Hours</Label>
                <Input id="add-hours" placeholder="Mon-Fri 9am-5pm" data-testid="input-add-hours" />
              </div>
              <div>
                <Label htmlFor="add-url">Listing URL</Label>
                <Input id="add-url" placeholder="Direct link to your listing page" data-testid="input-add-url" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                  data-testid="button-cancel-add"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const platform = (document.getElementById('add-platform') as HTMLSelectElement)?.value;
                    const name = (document.getElementById('add-name') as HTMLInputElement)?.value;
                    if (!platform || !name) {
                      toast({ title: 'Required', description: 'Platform and business name are required', variant: 'destructive' });
                      return;
                    }
                    addListingMutation.mutate({
                      platform,
                      name,
                      address: (document.getElementById('add-address') as HTMLInputElement)?.value || undefined,
                      phone: (document.getElementById('add-phone') as HTMLInputElement)?.value || undefined,
                      website: (document.getElementById('add-website') as HTMLInputElement)?.value || undefined,
                      hours: (document.getElementById('add-hours') as HTMLInputElement)?.value || undefined,
                      url: (document.getElementById('add-url') as HTMLInputElement)?.value || undefined,
                    });
                  }}
                  disabled={addListingMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-submit-add"
                >
                  {addListingMutation.isPending ? 'Adding...' : 'Add Listing'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

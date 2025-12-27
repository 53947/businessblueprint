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
  Mail,
  Globe,
  Calendar,
  Link2,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import listingsIcon from "@assets/logos and wordmarks/: listings app logo.png";
import { CrmEmptyState, CRM_EMPTY_CONFIGS } from "@/components/crm-empty-state";
import { useCrmPresence } from "@/hooks/use-crm-presence";

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

export default function ListingsManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState<BusinessListing | null>(null);
  
  const crmPresence = useCrmPresence();

  // Get client ID from session
  const clientId = sessionStorage.getItem("clientId");

  // Fetch listings metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery<ListingsMetrics>({
    queryKey: [`/api/clients/${clientId}/listings/metrics`],
    enabled: !!clientId,
  });

  // Fetch business listings
  const { data: listings, isLoading: listingsLoading } = useQuery<BusinessListing[]>({
    queryKey: [`/api/clients/${clientId}/listings`],
    enabled: !!clientId,
  });

  // Use shared CRM data from hook (avoids duplicate queries)
  const crmCompany = crmPresence.companies?.[0]; // Get primary company
  
  // Show CRM empty state for unauthenticated users or when CRM has no data
  const showCrmEmptyState = crmPresence.state === 'unauthenticated' || crmPresence.state === 'empty';

  // Update listing mutation
  const updateListingMutation = useMutation({
    mutationFn: async (data: { id: number; [key: string]: any }) => {
      return await apiRequest(
        'PATCH',
        `/api/clients/${clientId}/listings/${data.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/listings`] });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/listings/metrics`] });
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

  // Mock data for development
  const mockMetrics = {
    totalListings: 12,
    activeListings: 10,
    pendingListings: 1,
    errorListings: 1,
    totalViews: 4523,
    totalClicks: 892,
    avgRating: 4.6
  };

  const mockListings: BusinessListing[] = [
    {
      id: 1,
      platform: 'Google Business',
      status: 'active',
      name: 'ABC Services',
      address: '123 Main St, City, ST 12345',
      phone: '(555) 123-4567',
      website: 'https://abcservices.com',
      hours: 'Mon-Fri 9AM-5PM',
      lastUpdated: new Date().toISOString(),
      url: 'https://g.page/abc-services'
    },
    {
      id: 2,
      platform: 'Yelp',
      status: 'active',
      name: 'ABC Services',
      address: '123 Main St, City, ST 12345',
      phone: '(555) 123-4567',
      website: 'https://abcservices.com',
      hours: 'Mon-Fri 9AM-5PM',
      lastUpdated: new Date(Date.now() - 86400000).toISOString(),
      url: 'https://yelp.com/biz/abc-services'
    },
    {
      id: 3,
      platform: 'Facebook',
      status: 'pending',
      name: 'ABC Services',
      address: '123 Main St, City, ST 12345',
      phone: '(555) 123-4567',
      website: 'https://abcservices.com',
      hours: 'Mon-Fri 9AM-5PM',
      lastUpdated: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 4,
      platform: 'Bing Places',
      status: 'error',
      name: 'ABC Services',
      address: '123 Main St, City, ST 12345',
      phone: '(555) 123-4567',
      website: 'https://abcservices.com',
      hours: 'Mon-Fri 9AM-5PM',
      lastUpdated: new Date(Date.now() - 259200000).toISOString(),
    }
  ];

  // Only show mock data if we have a valid clientId - otherwise show empty state
  const displayMetrics = metrics || (clientId ? mockMetrics : { totalListings: 0, activeListings: 0, pendingListings: 0, errorListings: 0, totalViews: 0, totalClicks: 0, avgRating: 0 });
  const displayListings = listings || (clientId ? mockListings : []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SectionHeader 
        title="/listings - Directory Sync & Consistency"
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
            active: activeTab === 'listings',
            onClick: () => setActiveTab('listings'),
            testId: 'tab-listings'
          },
          { 
            label: 'Analytics', 
            icon: TrendingUp, 
            active: activeTab === 'analytics',
            onClick: () => setActiveTab('analytics'),
            testId: 'tab-analytics'
          }
        ]}
        actions={
          <>
            <Button 
              onClick={() => toast({ title: 'Settings', description: 'Settings panel coming soon' })} 
              variant="ghost" 
              size="sm"
              data-testid="button-settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => toast({ title: 'Add Listing', description: 'Add listing form coming soon' })} 
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
            <CrmEmptyState {...CRM_EMPTY_CONFIGS.listings} variant="compact" />
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
                    {((displayMetrics.totalClicks / displayMetrics.totalViews) * 100).toFixed(1)}% CTR
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CRM Company Integration (Performance tier) */}
            {crmCompany && (
              <Card className="mb-8" data-testid="card-crm-company">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Link2 className="h-4 w-4 text-green-600" />
                    CRM Business Data
                    <Badge className="bg-green-100 text-green-700 text-xs">Performance</Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Linked from /relationships company records
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
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => window.location.href = '/relationships'} data-testid="button-view-crm">
                      View in /relationships
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
          <TabsContent value="listings">
            <Card data-testid="card-all-listings">
              <CardHeader>
                <CardTitle>All Business Listings</CardTitle>
                <CardDescription>Manage your business information across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
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
                          <a href={listing.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard Coming Soon</h3>
              <p className="text-gray-600">Detailed listing analytics and performance metrics will be available here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
                  onClick={() => toast({ title: 'Coming Soon', description: 'Listing updates will be available soon' })}
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
    </div>
  );
}

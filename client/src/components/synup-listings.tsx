import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertCircle, Clock, MapPin, ExternalLink, RefreshCw } from "lucide-react";
import { authenticatedRequest } from "@/lib/queryClient";

interface SynupLocation {
  id: number;
  synupLocationId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone?: string;
  website?: string;
  status: string;
}

export function SynupListings() {
  // Fetch Synup locations
  const { data: locationsData, isLoading, error, refetch } = useQuery<{ success: boolean; locations: SynupLocation[] }>({
    queryKey: ['/api/synup/locations'],
    queryFn: async () => {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch('/api/synup/locations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch locations');
      return res.json();
    }
  });

  const handleSyncListings = async (locationId: number) => {
    try {
      await authenticatedRequest('POST', `/api/synup/locations/${locationId}/sync-listings`);
      refetch();
    } catch (error) {
      console.error('Failed to sync listings:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Listings Management</CardTitle>
          <CardDescription>Loading your listings...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Listings Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error instanceof Error ? error.message : 'Failed to load listings'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const locations = locationsData?.locations || [];

  if (locations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Listings Management</CardTitle>
          <CardDescription>Manage your presence across 200+ directories</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No locations synced yet. Your location data will appear here once synced with Synup.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {locations.map((location) => (
        <Card key={location.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {location.name}
                </CardTitle>
                <CardDescription className="mt-2">
                  {location.address}, {location.city}, {location.state} {location.country}
                </CardDescription>
              </div>
              <Badge variant={location.status === 'APPROVED' ? 'default' : 'secondary'}>
                {location.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {location.phone && (
                <div className="text-sm">
                  <span className="font-medium">Phone:</span> {location.phone}
                </div>
              )}
              {location.website && (
                <div className="text-sm">
                  <span className="font-medium">Website:</span>{' '}
                  <a href={location.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {location.website}
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSyncListings(location.id)}
                data-testid={`button-sync-listings-${location.id}`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Listings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://business.synup.com', '_blank')}
                data-testid={`button-manage-synup-${location.id}`}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage on Synup
              </Button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                📊 Your business is being distributed across <strong>200+ directories</strong> including Google, Yelp, Facebook, and more through Synup.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Clock, MapPin, ExternalLink, RefreshCw, Edit } from "lucide-react";
import { authenticatedRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [editingLocation, setEditingLocation] = useState<SynupLocation | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    website: '',
  });
  
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

  const handleEditClick = (location: SynupLocation) => {
    setEditingLocation(location);
    setEditForm({
      name: location.name,
      address: location.address,
      city: location.city,
      state: location.state,
      country: location.country,
      phone: location.phone || '',
      website: location.website || '',
    });
  };

  const handleSaveLocation = async () => {
    if (!editingLocation) return;
    
    try {
      await authenticatedRequest('PUT', `/api/synup/locations/${editingLocation.id}`, editForm);
      queryClient.invalidateQueries({ queryKey: ['/api/synup/locations'] });
      toast({
        title: "Location Updated",
        description: "Your business information has been updated successfully.",
      });
      setEditingLocation(null);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update location information. Please try again.",
        variant: "destructive",
      });
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
              <Dialog open={editingLocation?.id === location.id} onOpenChange={(open) => !open && setEditingLocation(null)}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(location)}
                    data-testid={`button-edit-location-${location.id}`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Information
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Business Information</DialogTitle>
                    <DialogDescription>
                      Update your business details. Changes will be synced across all directories.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Business Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">Address</Label>
                      <Input
                        id="address"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-address"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="city" className="text-right">City</Label>
                      <Input
                        id="city"
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-city"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="state" className="text-right">State</Label>
                      <Input
                        id="state"
                        value={editForm.state}
                        onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-state"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="country" className="text-right">Country</Label>
                      <Input
                        id="country"
                        value={editForm.country}
                        onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-country"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">Phone</Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-phone"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="website" className="text-right">Website</Label>
                      <Input
                        id="website"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        className="col-span-3"
                        data-testid="input-edit-website"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingLocation(null)}>Cancel</Button>
                    <Button onClick={handleSaveLocation} data-testid="button-save-location">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSyncListings(location.id)}
                data-testid={`button-sync-listings-${location.id}`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Listings
              </Button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                📊 Your business is being distributed across <strong>200+ directories</strong> including Google, Yelp, Facebook, and more.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

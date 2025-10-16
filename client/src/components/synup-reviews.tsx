import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Star, AlertCircle, MessageSquare, Send, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { authenticatedRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SynupReview {
  id: number;
  locationId: number;
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewDate: string;
  response?: string;
  responseDate?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  status: 'new' | 'responded';
}

interface SynupLocation {
  id: number;
  synupLocationId: string;
  name: string;
}

export function SynupReviews() {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [respondingTo, setRespondingTo] = useState<number | null>(null);
  const [responseText, setResponseText] = useState("");
  const { toast } = useToast();

  // Fetch Synup locations
  const { data: locationsData } = useQuery<{ success: boolean; locations: SynupLocation[] }>({
    queryKey: ['/api/synup/locations'],
    queryFn: async () => {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch('/api/synup/locations', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch locations');
      return res.json();
    }
  });

  // Fetch reviews for selected location
  const { data: reviewsData, isLoading, error } = useQuery<{ success: boolean; reviews: SynupReview[] }>({
    queryKey: ['/api/synup/locations', selectedLocationId, 'reviews'],
    queryFn: async () => {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`/api/synup/locations/${selectedLocationId}/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
    enabled: !!selectedLocationId
  });

  // Respond to review mutation
  const respondMutation = useMutation({
    mutationFn: async ({ reviewId, response }: { reviewId: number; response: string }) => {
      const res = await authenticatedRequest('POST', `/api/synup/reviews/${reviewId}/respond`, {
        responseText: response,
        useAI: false
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/synup/locations', selectedLocationId, 'reviews'] });
      setRespondingTo(null);
      setResponseText("");
      toast({
        title: "Response Posted",
        description: "Your response has been successfully posted to the review."
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Post Response",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
    }
  });

  const locations = locationsData?.locations || [];
  const reviews = reviewsData?.reviews || [];

  // Auto-select first location if available and none selected (using useEffect to avoid render loop)
  useEffect(() => {
    if (locations.length > 0 && !selectedLocationId) {
      setSelectedLocationId(locations[0].id);
    }
  }, [locations, selectedLocationId]);

  const handleRespond = (reviewId: number) => {
    if (responseText.trim()) {
      respondMutation.mutate({ reviewId, response: responseText });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <ThumbsDown className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (locations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
          <CardDescription>Monitor and respond to customer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No locations synced yet. Sync your location first to manage reviews.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error instanceof Error ? error.message : 'Failed to load reviews'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Management</CardTitle>
        <CardDescription>
          Monitor and respond to customer feedback across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Location Selector */}
        {locations.length > 1 && (
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Select Location</label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedLocationId || ""}
              onChange={(e) => setSelectedLocationId(Number(e.target.value))}
              data-testid="select-location"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No reviews found for this location yet. Reviews will appear here once customers leave feedback.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`p-4 border rounded-lg ${getSentimentColor(review.sentiment)}`}
                data-testid={`review-${review.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.reviewerName}</span>
                      <Badge variant="outline">{review.platform}</Badge>
                      {getSentimentIcon(review.sentiment)}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{review.reviewText}</p>

                {review.response ? (
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Your Response</span>
                      {review.responseDate && (
                        <span className="text-xs text-gray-500">
                          {new Date(review.responseDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{review.response}</p>
                  </div>
                ) : (
                  <div className="mt-3">
                    {respondingTo === review.id ? (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Write your response..."
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          rows={3}
                          data-testid={`textarea-response-${review.id}`}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleRespond(review.id)}
                            disabled={respondMutation.isPending || !responseText.trim()}
                            data-testid={`button-submit-response-${review.id}`}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            {respondMutation.isPending ? "Posting..." : "Post Response"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setRespondingTo(null);
                              setResponseText("");
                            }}
                            data-testid={`button-cancel-response-${review.id}`}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRespondingTo(review.id)}
                        data-testid={`button-respond-${review.id}`}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond to Review
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

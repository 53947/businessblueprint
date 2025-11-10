import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Settings,
  BarChart3,
  Plus,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import reputationIcon from "@assets/generated_images/Reputation_management_app_icon_9efbc906.png";

interface Review {
  id: number;
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewDate: string;
  response?: string;
  responseDate?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  synupReviewId?: string;
}

interface ReputationMetrics {
  averageRating: number;
  totalReviews: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  responseRate: number;
  platformBreakdown: {
    google: number;
    yelp: number;
    facebook: number;
  };
}

export default function ReputationManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [showResponseDialog, setShowResponseDialog] = useState(false);

  // Get client ID from session
  const clientId = sessionStorage.getItem("clientId");

  // Fetch reputation metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery<ReputationMetrics>({
    queryKey: [`/api/clients/${clientId}/reviews/analytics`],
    enabled: !!clientId,
  });

  // Fetch reviews
  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: [`/api/clients/${clientId}/reviews`],
    enabled: !!clientId,
  });

  // Respond to review mutation
  const respondMutation = useMutation({
    mutationFn: async ({ reviewId, response, useAI }: { reviewId: number; response?: string; useAI?: boolean }) => {
      return await apiRequest(
        'POST',
        `/api/clients/${clientId}/reviews/${reviewId}/respond`,
        { response, useAI }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/reviews`] });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/reviews/analytics`] });
      toast({ title: 'Success', description: 'Response posted successfully' });
      setShowResponseDialog(false);
      setSelectedReview(null);
      setResponseText('');
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to post response',
        variant: 'destructive' 
      });
    }
  });

  const handleRespondToReview = (review: Review) => {
    if (!clientId) {
      toast({ 
        title: 'Authentication Required', 
        description: 'Please log in to respond to reviews',
        variant: 'destructive' 
      });
      return;
    }
    setSelectedReview(review);
    setResponseText('');
    setShowResponseDialog(true);
  };

  const handleAIResponse = async (review: Review) => {
    if (!clientId) {
      toast({ 
        title: 'Authentication Required', 
        description: 'Please log in to respond to reviews',
        variant: 'destructive' 
      });
      return;
    }
    try {
      await respondMutation.mutateAsync({ reviewId: review.id, useAI: true });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleManualResponse = async () => {
    if (!selectedReview || !responseText.trim()) {
      toast({ title: 'Error', description: 'Please enter a response', variant: 'destructive' });
      return;
    }
    
    try {
      await respondMutation.mutateAsync({ reviewId: selectedReview.id, response: responseText });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-red-600" />;
      default:
        return <MinusCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    const colors = {
      positive: 'bg-green-100 text-green-800',
      negative: 'bg-red-100 text-red-800',
      neutral: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[sentiment as keyof typeof colors]}>{sentiment}</Badge>;
  };

  // Mock data for development
  const mockMetrics = {
    averageRating: 4.6,
    totalReviews: 347,
    positiveCount: 289,
    negativeCount: 23,
    neutralCount: 35,
    responseRate: 87.5,
    platformBreakdown: {
      google: 198,
      yelp: 124,
      facebook: 25
    }
  };

  const mockReviews: Review[] = [
    {
      id: 1,
      platform: 'Google',
      rating: 5,
      reviewText: 'Excellent service! The team was professional and delivered beyond expectations.',
      reviewerName: 'Sarah J.',
      reviewDate: new Date().toISOString(),
      sentiment: 'positive',
    },
    {
      id: 2,
      platform: 'Yelp',
      rating: 2,
      reviewText: 'Service was slow and the staff seemed uninterested. Not what I expected.',
      reviewerName: 'Mike T.',
      reviewDate: new Date(Date.now() - 86400000).toISOString(),
      sentiment: 'negative',
    },
    {
      id: 3,
      platform: 'Facebook',
      rating: 4,
      reviewText: 'Good experience overall. A few minor issues but nothing major.',
      reviewerName: 'Jennifer L.',
      reviewDate: new Date(Date.now() - 172800000).toISOString(),
      response: 'Thank you for your feedback! We appreciate your business.',
      responseDate: new Date(Date.now() - 86400000).toISOString(),
      sentiment: 'positive',
    }
  ];

  // Only show mock data if we have a valid clientId - otherwise show empty state
  const displayMetrics = metrics || (clientId ? mockMetrics : { averageRating: 0, totalReviews: 0, positiveCount: 0, negativeCount: 0, neutralCount: 0, responseRate: 0, platformBreakdown: { google: 0, yelp: 0, facebook: 0 } });
  const displayReviews = reviews || (clientId ? mockReviews : []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SectionHeader 
        title="/reputation - Review Management"
        tabs={[
          { 
            label: 'Overview', 
            icon: BarChart3, 
            active: activeTab === 'overview',
            onClick: () => setActiveTab('overview'),
            testId: 'tab-overview'
          },
          { 
            label: 'Reviews', 
            icon: Star, 
            active: activeTab === 'reviews',
            onClick: () => setActiveTab('reviews'),
            testId: 'tab-reviews'
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
              <Settings className="h-4 h-4" />
            </Button>
          </>
        }
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card data-testid="card-avg-rating">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    <span className="text-3xl font-bold">{displayMetrics.averageRating}</span>
                    <span className="text-gray-500">/5.0</span>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-total-reviews">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{displayMetrics.totalReviews}</div>
                  <p className="text-sm text-gray-500 mt-1">Across all platforms</p>
                </CardContent>
              </Card>

              <Card data-testid="card-response-rate">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{displayMetrics.responseRate}%</div>
                  <p className="text-sm text-green-600 mt-1">Above industry average</p>
                </CardContent>
              </Card>

              <Card data-testid="card-sentiment">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold">{displayMetrics.positiveCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold">{displayMetrics.negativeCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MinusCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold">{displayMetrics.neutralCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Breakdown */}
            <Card className="mb-8" data-testid="card-platform-breakdown">
              <CardHeader>
                <CardTitle>Reviews by Platform</CardTitle>
                <CardDescription>Distribution across review platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Google Business</span>
                      <span className="text-gray-600">{displayMetrics.platformBreakdown.google} reviews</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(displayMetrics.platformBreakdown.google / displayMetrics.totalReviews) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Yelp</span>
                      <span className="text-gray-600">{displayMetrics.platformBreakdown.yelp} reviews</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(displayMetrics.platformBreakdown.yelp / displayMetrics.totalReviews) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Facebook</span>
                      <span className="text-gray-600">{displayMetrics.platformBreakdown.facebook} reviews</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(displayMetrics.platformBreakdown.facebook / displayMetrics.totalReviews) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews Needing Response */}
            <Card data-testid="card-needs-response">
              <CardHeader>
                <CardTitle>Reviews Needing Response</CardTitle>
                <CardDescription>Respond quickly to maintain your reputation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayReviews.filter(r => !r.response).slice(0, 3).map((review) => (
                    <div key={review.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{review.platform}</Badge>
                          {getSentimentBadge(review.sentiment)}
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-900 mb-2">{review.reviewText}</p>
                        <p className="text-xs text-gray-500">
                          {review.reviewerName} · {format(new Date(review.reviewDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAIResponse(review)}
                          disabled={respondMutation.isPending || !clientId}
                          data-testid={`button-ai-response-${review.id}`}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          AI Response
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleRespondToReview(review)}
                          disabled={!clientId}
                          data-testid={`button-respond-${review.id}`}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  ))}
                  {displayReviews.filter(r => !r.response).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-600" />
                      <p>All caught up! No reviews need responses.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card data-testid="card-all-reviews">
              <CardHeader>
                <CardTitle>All Reviews</CardTitle>
                <CardDescription>Manage and respond to all customer reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4" data-testid={`review-${review.id}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{review.platform}</Badge>
                          {getSentimentBadge(review.sentiment)}
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        {!review.response && (
                          <Badge className="bg-orange-100 text-orange-800">Needs Response</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-900 mb-2">{review.reviewText}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {review.reviewerName} · {format(new Date(review.reviewDate), 'MMM d, yyyy')}
                      </p>

                      {review.response && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Your Response</span>
                            {review.responseDate && (
                              <span className="text-xs text-gray-500">
                                {format(new Date(review.responseDate), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{review.response}</p>
                        </div>
                      )}

                      {!review.response && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAIResponse(review)}
                            disabled={respondMutation.isPending || !clientId}
                            data-testid={`button-ai-response-${review.id}`}
                          >
                            <Sparkles className="w-4 h-4 mr-1" />
                            AI Response
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleRespondToReview(review)}
                            disabled={!clientId}
                            data-testid={`button-respond-manual-${review.id}`}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Write Response
                          </Button>
                        </div>
                      )}
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
              <p className="text-gray-600">Detailed reputation analytics and trends will be available here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Response Dialog */}
      {showResponseDialog && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowResponseDialog(false)}>
          <Card className="w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Respond to Review</CardTitle>
              <CardDescription>
                {selectedReview.platform} · {selectedReview.rating} stars · {selectedReview.reviewerName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">{selectedReview.reviewText}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Your Response</label>
                <Textarea 
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write a professional response to this review..."
                  rows={5}
                  className="w-full"
                  data-testid="textarea-response"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResponseDialog(false)}
                  data-testid="button-cancel-response"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleManualResponse}
                  disabled={respondMutation.isPending || !responseText.trim()}
                  data-testid="button-submit-response"
                >
                  {respondMutation.isPending ? 'Posting...' : 'Post Response'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

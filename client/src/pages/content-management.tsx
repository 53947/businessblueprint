import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  CalendarIcon,
  ImagePlus, 
  Send, 
  Clock, 
  Sparkles, 
  X,
  Image as ImageIcon,
  Video,
  FileText,
  AlertCircle,
  CheckCircle,
  Pencil,
  Trash2,
  Eye,
  Hash,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Zap,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";

export default function ContentManagement() {
  const [, setLocation] = useLocation();
  const [clientId, setClientId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("composer");
  const { toast } = useToast();

  // Composer state
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [scheduleTime, setScheduleTime] = useState("12:00");
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiCoach, setShowAiCoach] = useState(true);

  useEffect(() => {
    const storedClientId = sessionStorage.getItem("clientId");
    if (!storedClientId) {
      setLocation("/portal/login");
      return;
    }
    setClientId(storedClientId);
  }, [setLocation]);

  // Fetch client data to determine tier and limits
  const { data: clientData } = useQuery<any>({
    queryKey: [`/api/clients/${clientId}`],
    enabled: !!clientId,
  });

  // Fetch connected platforms
  const { data: platformsData, isLoading: platformsLoading } = useQuery<any>({
    queryKey: [`/api/content/${clientId}/platforms`],
    enabled: !!clientId,
  });

  // Fetch posts
  const { data: postsData, isLoading: postsLoading } = useQuery<any>({
    queryKey: [`/api/content/${clientId}/posts`],
    enabled: !!clientId && activeTab !== "composer",
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      return await apiRequest("POST", `/api/content/${clientId}/posts`, postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/content/${clientId}/posts`] });
      toast({
        title: "Post Created!",
        description: isScheduled ? "Your post has been scheduled." : "Your post has been published.",
      });
      resetComposer();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    },
  });

  // AI suggestions mutation
  const aiSuggestMutation = useMutation({
    mutationFn: async (prompt: string) => {
      return await apiRequest("POST", `/api/content/${clientId}/ai/suggest`, { prompt, type: "caption" });
    },
    onSuccess: (data: any) => {
      if (data.suggestions && data.suggestions.length > 0) {
        setAiSuggestions(data.suggestions);
      }
    },
  });

  const resetComposer = () => {
    setCaption("");
    setHashtags([]);
    setHashtagInput("");
    setSelectedPlatforms([]);
    setScheduleDate(undefined);
    setScheduleTime("12:00");
    setUploadedMedia([]);
    setIsScheduled(false);
    setAiSuggestions([]);
  };

  const handleAddHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
      setHashtagInput("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      const maxPlatforms = clientData?.client?.serviceType === 'msp' ? 7 : 3;
      if (selectedPlatforms.length >= maxPlatforms) {
        toast({
          title: "Platform Limit Reached",
          description: `Your plan allows up to ${maxPlatforms} platforms. Upgrade to add more!`,
          variant: "destructive",
        });
        return;
      }
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await apiRequest("POST", `/api/content/${clientId}/media`, formData);
        setUploadedMedia(prev => [...prev, response]);
        toast({
          title: "Media Uploaded",
          description: `${file.name} uploaded successfully`,
        });
      } catch (error: any) {
        toast({
          title: "Upload Failed",
          description: error.message || "Failed to upload media",
          variant: "destructive",
        });
      }
    }
  };

  const handleCreatePost = () => {
    if (!caption && uploadedMedia.length === 0) {
      toast({
        title: "Content Required",
        description: "Please add a caption or media to your post",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return;
    }

    // Validate scheduled posts have date and time
    if (isScheduled && !scheduleDate) {
      toast({
        title: "Schedule Required",
        description: "Please select a date and time for your scheduled post",
        variant: "destructive",
      });
      return;
    }

    let scheduledFor = undefined;
    if (isScheduled && scheduleDate) {
      const [hours, minutes] = scheduleTime.split(':');
      const scheduled = new Date(scheduleDate);
      scheduled.setHours(parseInt(hours), parseInt(minutes));
      scheduledFor = scheduled.toISOString();
    }

    createPostMutation.mutate({
      caption,
      hashtags,
      platforms: selectedPlatforms,
      mediaIds: uploadedMedia.map(m => m.id),
      status: isScheduled ? "scheduled" : "published",
      scheduledFor,
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      case 'twitter': case 'x': return <Twitter className="h-5 w-5" />;
      case 'google_business': return <Globe className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  if (!clientId) return null;

  const connectedPlatforms = platformsData?.platforms || [];
  const maxPlatforms = clientData?.client?.serviceType === 'msp' ? 7 : 3;
  const characterCount = caption.length;
  const maxCharacters = 2200; // Twitter is most restrictive at 280, but we'll use a general limit

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E91E8C] to-[#FF66CC] bg-clip-text text-transparent" data-testid="heading-content-management">Content Management</h1>
          <p className="text-gray-600 mt-2">Create, schedule, and manage your social media content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid [&>button[data-state=active]]:bg-[#E91E8C] [&>button[data-state=active]]:text-white">
            <TabsTrigger value="composer" data-testid="tab-composer">
              <Pencil className="h-4 w-4 mr-2" />
              Composer
            </TabsTrigger>
            <TabsTrigger value="calendar" data-testid="tab-calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="posts" data-testid="tab-posts">
              <FileText className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* COMPOSER TAB */}
          <TabsContent value="composer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Composer Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Caption Input */}
                <Card data-testid="card-composer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Create Post</span>
                      <Badge variant="outline" className="border-[#E91E8C] text-[#E91E8C]">{characterCount}/{maxCharacters}</Badge>
                    </CardTitle>
                    <CardDescription>Compose your social media content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="caption">Caption</Label>
                      <Textarea
                        id="caption"
                        placeholder="What's on your mind?"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="min-h-[150px]"
                        data-testid="textarea-caption"
                      />
                      <Progress value={(characterCount / maxCharacters) * 100} className="h-1 [&>div]:bg-[#E91E8C]" />
                    </div>

                    {/* Hashtags */}
                    <div className="space-y-2">
                      <Label htmlFor="hashtags">Hashtags</Label>
                      <div className="flex gap-2">
                        <Input
                          id="hashtags"
                          placeholder="Add hashtag (without #)"
                          value={hashtagInput}
                          onChange={(e) => setHashtagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHashtag())}
                          data-testid="input-hashtag"
                        />
                        <Button onClick={handleAddHashtag} variant="outline" data-testid="button-add-hashtag">
                          <Hash className="h-4 w-4" />
                        </Button>
                      </div>
                      {hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hashtags.map((tag) => (
                            <Badge key={tag} className="gap-1 bg-[#E91E8C]/10 text-[#E91E8C] hover:bg-[#E91E8C]/20" data-testid={`badge-hashtag-${tag}`}>
                              #{tag}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveHashtag(tag)} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Media Upload */}
                    <div className="space-y-2">
                      <Label>Media</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="media-upload"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          data-testid="input-media-upload"
                        />
                        <label htmlFor="media-upload" className="cursor-pointer">
                          <ImagePlus className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload images or videos</p>
                        </label>
                      </div>
                      {uploadedMedia.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {uploadedMedia.map((media) => (
                            <div key={media.id} className="relative group" data-testid={`media-preview-${media.id}`}>
                              <img src={media.storageUrl} alt="" className="w-full h-24 object-cover rounded-lg" />
                              <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => setUploadedMedia(uploadedMedia.filter(m => m.id !== media.id))}
                                data-testid={`button-remove-media-${media.id}`}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Select Platforms</span>
                      <Badge variant="outline" className="border-[#E91E8C] text-[#E91E8C]">{selectedPlatforms.length}/{maxPlatforms}</Badge>
                    </CardTitle>
                    <CardDescription>Choose where to publish your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {platformsLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ) : connectedPlatforms.length === 0 ? (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No platforms connected. Connect your accounts to start posting.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {connectedPlatforms.map((platform: any) => (
                          <Button
                            key={platform.id}
                            variant={selectedPlatforms.includes(platform.platform) ? "default" : "outline"}
                            className={`justify-start h-auto py-3 ${selectedPlatforms.includes(platform.platform) ? 'bg-[#E91E8C] hover:bg-[#D1187A]' : 'border-gray-300 hover:border-[#E91E8C]'}`}
                            onClick={() => handlePlatformToggle(platform.platform)}
                            data-testid={`button-platform-${platform.platform}`}
                          >
                            {getPlatformIcon(platform.platform)}
                            <span className="ml-2">{platform.accountName || platform.platform}</span>
                            {selectedPlatforms.includes(platform.platform) && (
                              <CheckCircle className="h-4 w-4 ml-auto" />
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Schedule Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule</CardTitle>
                    <CardDescription>Choose when to publish your post</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="schedule-mode"
                        checked={isScheduled}
                        onCheckedChange={setIsScheduled}
                        data-testid="switch-schedule"
                      />
                      <Label htmlFor="schedule-mode">Schedule for later</Label>
                    </div>
                    {isScheduled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start" data-testid="button-select-date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={scheduleDate}
                                onSelect={setScheduleDate}
                                initialFocus
                                data-testid="calendar-schedule"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                            data-testid="input-schedule-time"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleCreatePost}
                    disabled={createPostMutation.isPending}
                    className="flex-1 bg-[#E91E8C] hover:bg-[#D1187A] text-white"
                    data-testid="button-create-post"
                  >
                    {createPostMutation.isPending ? (
                      <>Creating...</>
                    ) : isScheduled ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule Post
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Publish Now
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetComposer} data-testid="button-reset">
                    Clear
                  </Button>
                </div>
              </div>

              {/* AI Coach Sidebar */}
              {showAiCoach && (
                <div className="lg:col-span-1">
                  <Card className="sticky top-6" data-testid="card-ai-coach">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-[#E91E8C]" />
                          AI Coach
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAiCoach(false)}
                          data-testid="button-close-ai-coach"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      <CardDescription>Get AI-powered suggestions for your content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full border-[#E91E8C] text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white"
                        onClick={() => aiSuggestMutation.mutate(caption || "Generate social media post ideas")}
                        disabled={aiSuggestMutation.isPending}
                        data-testid="button-ai-suggest"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        {aiSuggestMutation.isPending ? "Generating..." : "Generate Ideas"}
                      </Button>

                      {aiSuggestions.length > 0 && (
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-3">
                            {aiSuggestions.map((suggestion, index) => (
                              <Card key={index} className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => setCaption(suggestion)} data-testid={`ai-suggestion-${index}`}>
                                <p className="text-sm">{suggestion}</p>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                      )}

                      <Separator />

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Quick Tips</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Use emojis to increase engagement</li>
                          <li>• Post during peak hours (9-11am, 7-9pm)</li>
                          <li>• Include a clear call-to-action</li>
                          <li>• Use 5-10 relevant hashtags</li>
                          <li>• Add high-quality visuals</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* CALENDAR TAB */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar View */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>View and manage your scheduled posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={scheduleDate}
                    onSelect={setScheduleDate}
                    className="rounded-md border w-full"
                    data-testid="calendar-view"
                  />
                </CardContent>
              </Card>

              {/* Scheduled Posts Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Posts</CardTitle>
                  <CardDescription>Posts scheduled for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {postsLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : (() => {
                    const scheduledPosts = (postsData?.posts ?? []).filter((p: any) => p.status === 'scheduled');
                    return (
                      <ScrollArea className="h-[400px]">
                        {scheduledPosts.length === 0 ? (
                          <Alert>
                            <Clock className="h-4 w-4" />
                            <AlertDescription>
                              No scheduled posts. Create one from the Composer!
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <div className="space-y-3">
                            {scheduledPosts.map((post: any) => (
                              <Card key={post.id} className="p-3" data-testid={`scheduled-post-${post.id}`}>
                                <div className="space-y-2">
                                  <p className="text-sm font-medium line-clamp-2">{post.caption}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Clock className="h-3 w-3" />
                                    {post.scheduledFor ? format(new Date(post.scheduledFor), "MMM dd, h:mm a") : "Not scheduled"}
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {(post.platforms ?? []).slice(0, 3).map((platform: string) => (
                                      <Badge key={platform} variant="secondary" className="text-xs">{platform}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* POSTS TAB */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
                <CardDescription>Manage your published and scheduled posts</CardDescription>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : postsData?.posts?.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No posts yet. Create your first post in the Composer tab!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {postsData?.posts?.map((post: any) => (
                      <Card key={post.id} data-testid={`post-card-${post.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{post.caption}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">{post.status}</Badge>
                                {post.platforms?.map((platform: string) => (
                                  <Badge key={platform} variant="secondary">{platform}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" data-testid={`button-view-${post.id}`}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" data-testid={`button-delete-${post.id}`}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            {(() => {
              // Compute filtered arrays once with safe defaults
              const allPosts = postsData?.posts ?? [];
              const publishedPosts = allPosts.filter((p: any) => p.status === 'published');
              const scheduledPosts = allPosts.filter((p: any) => p.status === 'scheduled');
              
              return (
                <>
                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Total Posts</CardDescription>
                        <CardTitle className="text-3xl text-[#E91E8C]">{allPosts.length}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          <TrendingUp className="h-3 w-3 inline mr-1" />
                          All time
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Published</CardDescription>
                        <CardTitle className="text-3xl text-green-600">
                          {publishedPosts.length}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                          Live posts
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Scheduled</CardDescription>
                        <CardTitle className="text-3xl text-blue-600">
                          {scheduledPosts.length}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Upcoming
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Platforms</CardDescription>
                        <CardTitle className="text-3xl text-[#E91E8C]">
                          {connectedPlatforms.length}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          <Globe className="h-3 w-3 inline mr-1" />
                          Connected
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Metrics Placeholder */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Post Performance</CardTitle>
                        <CardDescription>Engagement metrics across platforms</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">Performance analytics will appear here</p>
                          <p className="text-xs mt-2">Connect your accounts and publish posts to see insights</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Distribution</CardTitle>
                        <CardDescription>Posts by platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {connectedPlatforms.length === 0 ? (
                          <div className="h-[300px] flex items-center justify-center text-center text-gray-500">
                            <div>
                              <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                              <p className="text-sm">No platforms connected</p>
                              <p className="text-xs mt-2">Connect platforms from the Composer tab</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 pt-4">
                            {connectedPlatforms.map((platform: any) => {
                              const platformPosts = allPosts.filter((p: any) => 
                                (p.platforms ?? []).includes(platform.platform)
                              );
                              const percentage = allPosts.length > 0
                                ? (platformPosts.length / allPosts.length) * 100
                                : 0;
                              
                              return (
                                <div key={platform.id} className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      {getPlatformIcon(platform.platform)}
                                      <span>{platform.platform}</span>
                                    </div>
                                    <span className="font-medium">
                                      {platformPosts.length} posts
                                    </span>
                                  </div>
                                  <Progress 
                                    value={percentage} 
                                    className="h-2 [&>div]:bg-[#E91E8C]" 
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest posts and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {postsLoading ? (
                        <div className="space-y-3">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ) : allPosts.length === 0 ? (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No activity yet. Create your first post to get started!
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <div className="space-y-3">
                          {allPosts.slice(0, 5).map((post: any) => (
                            <div key={post.id} className="flex items-start gap-3 p-3 border rounded-lg" data-testid={`activity-post-${post.id}`}>
                              <div className="flex-1">
                                <p className="text-sm font-medium line-clamp-1">{post.caption || 'No caption'}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                                  <Badge variant="outline" className="text-xs">{post.status}</Badge>
                                  {post.scheduledFor && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {format(new Date(post.scheduledFor), "MMM dd")}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    {(post.platforms ?? []).length} platforms
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  MessageCircle, 
  Settings, 
  Code, 
  BarChart3, 
  Users,
  Send,
  Check,
  Clock,
  RefreshCw,
  Copy,
  CheckCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Conversation {
  id: number;
  contactName: string;
  contactIdentifier: string;
  status: string;
  lastMessageAt: string;
  lastMessagePreview: string;
  unreadCount: number;
  createdAt: string;
}

interface Message {
  id: number;
  content: string;
  direction: string;
  fromName: string;
  messageType: string;
  createdAt: string;
}

interface ConversationDetail {
  conversation: Conversation;
  session?: {
    visitorEmail: string;
    visitorName: string;
    pageUrl: string;
    userAgent: string;
    ipAddress: string;
  };
  messages: Message[];
}

function ChatSettingsPanel({ clientId }: { clientId: number }) {
  const { toast } = useToast();
  const { data: settings, isLoading } = useQuery<any>({
    queryKey: [`/api/chat/settings/${clientId}`],
  });

  const [companyName, setCompanyName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0000FF");
  const [position, setPosition] = useState("bottom-right");
  const [offlineMessage, setOfflineMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setCompanyName(settings.companyName || "");
      setWelcomeMessage(settings.welcomeMessage || "");
      setPrimaryColor(settings.primaryColor || "#0000FF");
      setPosition(settings.position || "bottom-right");
      setOfflineMessage(settings.offlineMessage || "");
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiRequest("PUT", `/api/chat/settings/${clientId}`, {
        companyName, welcomeMessage, primaryColor, position, offlineMessage,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/chat/settings/${clientId}`] });
      toast({ title: "Settings saved" });
    } catch {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="max-w-2xl mx-auto"><Card><CardContent className="pt-6"><p className="text-gray-500">Loading settings...</p></CardContent></Card></div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Widget Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your company name" data-testid="input-company-name" />
          </div>
          <div className="space-y-2">
            <Label>Welcome Message</Label>
            <Textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} placeholder="Hi! How can we help?" rows={2} data-testid="input-welcome-message" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-10 rounded border cursor-pointer" />
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1" data-testid="input-primary-color" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Widget Position</Label>
              <select value={position} onChange={(e) => setPosition(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="select-position">
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Offline Message</Label>
            <Textarea value={offlineMessage} onChange={(e) => setOfflineMessage(e.target.value)} placeholder="We're offline. Leave a message!" rows={2} data-testid="input-offline-message" />
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full" data-testid="button-save-settings">
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ChatDashboard() {
  const { toast } = useToast();
  const queryClientRef = useQueryClient();
  const [activeTab, setActiveTab] = useState("conversations");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const storedClientId = sessionStorage.getItem("clientId") || localStorage.getItem("clientId");
  const clientId = storedClientId ? parseInt(storedClientId) : 1;

  const { data: conversationsData, isLoading: conversationsLoading, refetch: refetchConversations } = useQuery<{ conversations: Conversation[] }>({
    queryKey: [`/api/chat/dashboard/conversations/${clientId}`],
    refetchInterval: 10000,
  });

  const { data: conversationDetail, isLoading: detailLoading } = useQuery<ConversationDetail>({
    queryKey: [`/api/chat/dashboard/conversations/${clientId}/${selectedConversation}`],
    enabled: !!selectedConversation,
    refetchInterval: 5000,
  });

  const { data: embedData } = useQuery<{ embedCode: string; clientId: number }>({
    queryKey: [`/api/chat/embed/${clientId}`],
    enabled: activeTab === "installation",
  });

  const { data: analyticsData } = useQuery<{ 
    period: string; 
    totalConversations: number; 
    totalMessages: number; 
    widgetOpens: number; 
  }>({
    queryKey: [`/api/chat/analytics/${clientId}`],
    enabled: activeTab === "analytics",
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", `/api/chat/dashboard/messages/${clientId}`, {
        conversationId: selectedConversation,
        content,
        agentName: "Support Agent",
      });
    },
    onSuccess: () => {
      setNewMessage("");
      queryClientRef.invalidateQueries({ 
        queryKey: [`/api/chat/dashboard/conversations/${clientId}/${selectedConversation}`] 
      });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    },
  });

  const closeConversationMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PUT", `/api/chat/dashboard/conversations/${clientId}/${selectedConversation}/close`);
    },
    onSuccess: () => {
      toast({ title: "Conversation closed" });
      refetchConversations();
      setSelectedConversation(null);
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationDetail?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      sendMessageMutation.mutate(newMessage.trim());
    }
  };

  const copyEmbedCode = () => {
    if (embedData?.embedCode) {
      navigator.clipboard.writeText(embedData.embedCode);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
      toast({ title: "Copied!", description: "Embed code copied to clipboard" });
    }
  };

  const conversations = conversationsData?.conversations || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SectionHeader 
        title="/ engage - Live Chat Dashboard"
        tabs={[
          { 
            label: 'Conversations', 
            icon: MessageCircle, 
            active: activeTab === 'conversations',
            onClick: () => setActiveTab('conversations'),
            testId: 'tab-conversations'
          },
          { 
            label: 'Installation', 
            icon: Code, 
            active: activeTab === 'installation',
            onClick: () => setActiveTab('installation'),
            testId: 'tab-installation'
          },
          { 
            label: 'Analytics', 
            icon: BarChart3, 
            active: activeTab === 'analytics',
            onClick: () => setActiveTab('analytics'),
            testId: 'tab-analytics'
          }
        ]}
        actions={
          <Button 
            onClick={() => setActiveTab('settings')} 
            variant="ghost" 
            size="sm"
            data-testid="button-settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        }
        showHomeButton={true}
        homeRoute="/portal"
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === "conversations" && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => refetchConversations()}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {conversationsLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading...</div>
                  ) : conversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No conversations yet</p>
                      <p className="text-sm mt-2">Conversations will appear when visitors use the chat widget</p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          selectedConversation === conv.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => setSelectedConversation(conv.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{conv.contactName}</span>
                          {conv.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conv.lastMessagePreview || 'No messages'}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant={conv.status === 'open' ? 'default' : 'secondary'}>
                            {conv.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {conv.lastMessageAt && formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              {selectedConversation ? (
                <>
                  <CardHeader className="flex flex-row items-center justify-between border-b">
                    <div>
                      <CardTitle className="text-lg">
                        {conversationDetail?.conversation?.contactName || 'Loading...'}
                      </CardTitle>
                      {conversationDetail?.session?.visitorEmail && (
                        <p className="text-sm text-gray-500">{conversationDetail.session.visitorEmail}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => closeConversationMutation.mutate()}
                        disabled={closeConversationMutation.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Close
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col h-[450px]">
                    <ScrollArea className="flex-1 p-4">
                      {detailLoading ? (
                        <div className="text-center text-gray-500">Loading messages...</div>
                      ) : (
                        <div className="space-y-4">
                          {conversationDetail?.messages?.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.direction === 'inbound' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[70%] p-3 rounded-lg ${
                                  msg.direction === 'inbound'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                              >
                                {msg.direction === 'outbound' && (
                                  <p className="text-xs font-medium mb-1 opacity-70">{msg.fromName}</p>
                                )}
                                <p>{msg.content}</p>
                                <p className="text-xs opacity-60 mt-1">
                                  {new Date(msg.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </ScrollArea>
                    <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply..."
                        disabled={sendMessageMutation.isPending}
                      />
                      <Button 
                        type="submit" 
                        disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                  <Users className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-lg">Select a conversation</p>
                  <p className="text-sm">Choose a conversation from the list to view messages</p>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {activeTab === "installation" && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Install Chat Widget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Step 1: Copy the embed code</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Add this code to your website, just before the closing &lt;/body&gt; tag.
                  </p>
                  <div className="relative">
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                      {embedData?.embedCode || 'Loading...'}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={copyEmbedCode}
                    >
                      {copiedEmbed ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Step 2: Platform-specific guides</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">WordPress</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add to your theme's footer.php or use a plugin like "Insert Headers and Footers"
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Shopify</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Go to Online Store → Themes → Edit code → theme.liquid, paste before &lt;/body&gt;
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Custom HTML</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Paste the code in your HTML file before the closing &lt;/body&gt; tag
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Conversations</p>
                      <p className="text-3xl font-bold">{analyticsData?.totalConversations || 0}</p>
                    </div>
                    <MessageCircle className="h-10 w-10 text-blue-500 opacity-50" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Messages</p>
                      <p className="text-3xl font-bold">{analyticsData?.totalMessages || 0}</p>
                    </div>
                    <Send className="h-10 w-10 text-green-500 opacity-50" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Widget Opens</p>
                      <p className="text-3xl font-bold">{analyticsData?.widgetOpens || 0}</p>
                    </div>
                    <BarChart3 className="h-10 w-10 text-purple-500 opacity-50" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <ChatSettingsPanel clientId={clientId} />
        )}
      </main>
    </div>
  );
}

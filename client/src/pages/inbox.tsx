import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { io, Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SectionHeader } from '@/components/section-header';
import { 
  Send, 
  Mail, 
  MessageCircle, 
  Phone, 
  Facebook, 
  Instagram, 
  Twitter,
  Check,
  CheckCheck,
  Loader2,
  AlertCircle,
  Home,
  Settings,
  Filter,
  Archive,
  User,
  Building2,
  DollarSign,
  Clock,
  ExternalLink,
  Link2
} from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { BRAND_HEX } from '@/lib/brand-colors';
import { CrmEmptyState, CRM_EMPTY_CONFIGS } from '@/components/crm-empty-state';
import { useCrmPresence } from '@/hooks/use-crm-presence';

interface Conversation {
  id: number;
  contactName: string;
  contactIdentifier: string;
  primaryChannelType: string;
  subject: string | null;
  status: string;
  priority: string;
  unreadCount: number;
  lastMessageAt: string;
  lastMessagePreview: string | null;
}

interface Message {
  id: number;
  conversationId: number;
  content: string;
  direction: 'inbound' | 'outbound';
  fromName: string;
  status: string;
  createdAt: string;
}

interface CrmContext {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    title?: string;
    lifecycleStage?: string;
    leadSource?: string;
    customFields?: Record<string, any>;
  };
  company?: {
    id: number;
    name: string;
    industry?: string;
    website?: string;
    size?: string;
  };
  deals: Array<{
    id: number;
    title: string;
    value: number;
    stage?: string;
    probability?: number;
  }>;
  recentActivity: Array<{
    id: number;
    eventType: string;
    title: string;
    description?: string;
    sourceApp?: string;
    occurredAt: string;
  }>;
  tags: string[];
  totalDealValue: number;
}

interface CrmLookupResult {
  found: boolean;
  contact: { id: number } | null;
}

const CHANNEL_ICONS: Record<string, any> = {
  email: Mail,
  livechat: MessageCircle,
  sms: Phone,
  whatsapp: SiWhatsapp,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: SiTiktok,
};

const CHANNEL_COLORS: Record<string, string> = {
  email: 'bg-[#0080FF]', // Inbox blue
  livechat: 'bg-[#8000FF]', // Livechat purple
  sms: 'bg-[#FF96DD]', // Inbox alt pink
  whatsapp: 'bg-[#84D71A]', // TLD green
  facebook: 'bg-[#0057FF]', // Triad blue
  instagram: 'bg-[#FF96DD]', // Inbox alt pink
  twitter: 'bg-[#0080FF]', // Inbox blue
  tiktok: 'bg-[#09080E]', // Black
};

export default function InboxPage() {
  const [, setLocation] = useLocation();
  const [clientId, setClientId] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();
  
  const crmPresence = useCrmPresence();

  // Check authentication
  useEffect(() => {
    const storedClientId = sessionStorage.getItem("clientId");
    const storedAuthToken = sessionStorage.getItem("authToken");
    
    if (!storedClientId || !storedAuthToken) {
      // Redirect to login if not authenticated
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to access the inbox.',
      });
      setLocation("/portal/login");
      return;
    }
    
    setClientId(storedClientId);
    setAuthToken(storedAuthToken);
  }, [setLocation, toast]);

  // Fetch conversations (only when authenticated)
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/inbox/conversations'],
    enabled: !!authToken && !!clientId,
  });

  // Fetch messages for selected conversation (only when authenticated)
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ['/api/inbox/conversations', selectedConversation, 'messages'],
    enabled: !!selectedConversation && !!authToken && !!clientId,
  });

  // Get selected conversation for CRM lookup
  const selectedConv = conversations.find(c => c.id === selectedConversation);

  // CRM lookup by contact identifier (email/phone)
  const contactEmail = selectedConv?.contactIdentifier && selectedConv.contactIdentifier.includes('@') 
    ? selectedConv.contactIdentifier 
    : undefined;
  
  const { data: crmLookup, isLoading: crmLookupLoading } = useQuery<CrmLookupResult>({
    queryKey: [`/api/crm/integration/lookup?email=${encodeURIComponent(contactEmail || '')}`],
    enabled: !!contactEmail,
  });

  // Fetch CRM context when contact is found
  const crmContactId = crmLookup?.contact?.id;
  const { data: crmContext, isLoading: crmContextLoading } = useQuery<CrmContext>({
    queryKey: [`/api/crm/integration/context/${crmContactId}`],
    enabled: !!crmLookup?.found && !!crmContactId,
  });

  // CRM empty state - show when CRM has no data (uses shared hook)
  const showCrmEmptyState = crmPresence.state === 'empty';

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: { conversationId: number; message: string }) => {
      return apiRequest('POST', '/api/inbox/send-message', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inbox/conversations', selectedConversation, 'messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/inbox/conversations'] });
      setMessageInput('');
    },
    onError: async (error: any) => {
      // Try to extract error details from response
      let errorDetails = 'Please try again';
      try {
        if (error instanceof Response) {
          const errorData = await error.json();
          errorDetails = errorData.details || errorData.error || errorDetails;
        } else if (error.message) {
          errorDetails = error.message;
        }
      } catch {
        // Use default error message
      }
      
      toast({
        variant: 'destructive',
        title: 'Failed to send message',
        description: errorDetails,
        duration: 5000, // Show longer for error messages
      });
    },
  });

  // WebSocket setup (only when authenticated)
  useEffect(() => {
    if (!authToken || !clientId) {
      // Don't connect to WebSocket if not authenticated
      return;
    }
    
    const socketInstance = io({
      auth: {
        role: 'agent',
        token: authToken, // Pass JWT token for authentication
      },
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('Inbox WebSocket connected');
      
      // Join all conversation rooms
      conversations.forEach(conv => {
        socketInstance.emit('join:conversation', conv.id);
      });
    });

    socketInstance.on('message:new', (data: Message) => {
      // Update messages list
      queryClient.invalidateQueries({ queryKey: ['/api/inbox/conversations', data.conversationId, 'messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/inbox/conversations'] });
      
      // Show notification if not viewing this conversation
      if (selectedConversation !== data.conversationId && data.direction === 'inbound') {
        toast({
          title: 'New message',
          description: `From ${data.fromName}: ${data.content.substring(0, 50)}...`,
        });
      }
    });

    socketInstance.on('user:typing', (data: { conversationId: number; name: string }) => {
      if (data.conversationId === selectedConversation) {
        setIsTyping(true);
      }
    });

    socketInstance.on('user:stop-typing', (data: { conversationId: number }) => {
      if (data.conversationId === selectedConversation) {
        setIsTyping(false);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [conversations, selectedConversation, toast, authToken, clientId]);

  // Join conversation room when selection changes
  useEffect(() => {
    if (socket && selectedConversation) {
      socket.emit('join:conversation', selectedConversation);
      
      // Mark as read
      socket.emit('message:read', {
        conversationId: selectedConversation,
      });
    }
  }, [socket, selectedConversation]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !selectedConversation) return;

    sendMessageMutation.mutate({
      conversationId: selectedConversation,
      message: messageInput,
    });

    // Emit via WebSocket for real-time updates
    if (socket) {
      socket.emit('agent:message', {
        conversationId: selectedConversation,
        message: messageInput,
        agentName: 'Agent', // TODO: Get from session
      });
    }
  };

  const handleInputChange = (value: string) => {
    setMessageInput(value);

    // Emit typing indicator
    if (socket && selectedConversation) {
      socket.emit('user:typing', {
        conversationId: selectedConversation,
        name: 'Agent',
      });

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Stop typing after 2 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('user:stop-typing', {
          conversationId: selectedConversation,
        });
      }, 2000);
    }
  };

  const inboxTabs = [
    {
      label: 'All',
      icon: MessageCircle,
      active: activeTab === 'all',
      onClick: () => setActiveTab('all'),
      testId: 'tab-all-messages'
    },
    {
      label: 'Unread',
      active: activeTab === 'unread',
      onClick: () => setActiveTab('unread'),
      testId: 'tab-unread-messages'
    },
    {
      label: 'Archive',
      icon: Archive,
      active: activeTab === 'archive',
      onClick: () => setActiveTab('archive'),
      testId: 'tab-archive'
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Section Header - Inbox Navigation */}
      <SectionHeader 
        title="Inbox" 
        tabs={inboxTabs}
        actions={
          <Button 
            variant="outline" 
            size="sm" 
            data-testid="button-inbox-settings"
            onClick={() => toast({ 
              title: "Inbox Settings", 
              description: "Configure email accounts (Gmail, Outlook), SMS, and social media messaging channels here." 
            })}
          >
            <Settings className="h-4 w-4" />
          </Button>
        }
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <ScrollArea className="h-[calc(100vh-80px)]">
          {conversationsLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin" data-testid="loader-conversations" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-4" data-testid="text-no-conversations">
              {crmPresence.state === 'loading' ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  Loading...
                </p>
              ) : showCrmEmptyState ? (
                <CrmEmptyState 
                  {...CRM_EMPTY_CONFIGS.inbox} 
                  variant="compact" 
                />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No conversations yet
                </p>
              )}
            </div>
          ) : (
            conversations.map((conversation) => {
              const ChannelIcon = CHANNEL_ICONS[conversation.primaryChannelType] || MessageCircle;
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                  data-testid={`conversation-${conversation.id}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {conversation.contactName?.substring(0, 2).toUpperCase() || 'AN'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" data-testid={`text-contact-name-${conversation.id}`}>
                            {conversation.contactName || 'Anonymous'}
                          </p>
                          <div className={`p-1 rounded ${CHANNEL_COLORS[conversation.primaryChannelType] || 'bg-gray-500'}`}>
                            <ChannelIcon className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="ml-auto" data-testid={`badge-unread-${conversation.id}`}>
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      {conversation.lastMessagePreview && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1" data-testid={`text-preview-${conversation.id}`}>
                          {conversation.lastMessagePreview}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1" data-testid={`text-time-${conversation.id}`}>
                        {conversation.lastMessageAt && formatDistanceToNow(new Date(conversation.lastMessageAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </ScrollArea>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Conversation Header */}
            <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedConv.contactName?.substring(0, 2).toUpperCase() || 'AN'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg" data-testid="text-conversation-contact-name">{selectedConv.contactName || 'Anonymous'}</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="text-conversation-identifier">
                    {selectedConv.contactIdentifier}
                  </p>
                </div>
                <Badge variant={selectedConv.status === 'open' ? 'default' : 'secondary'} data-testid="badge-conversation-status">
                  {selectedConv.status}
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin" data-testid="loader-messages" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400" data-testid="text-no-messages">
                  No messages yet
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                      data-testid={`message-${message.id}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.direction === 'outbound'
                            ? 'bg-[#0080FF] text-white'
                            : 'bg-white dark:bg-gray-800 text-[#09080E] dark:text-gray-100'
                        }`}
                      >
                        <p className="text-sm font-medium mb-1" data-testid={`text-sender-${message.id}`}>
                          {message.fromName}
                        </p>
                        <p className="text-sm whitespace-pre-wrap" data-testid={`text-content-${message.id}`}>
                          {message.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-xs opacity-75" data-testid={`text-timestamp-${message.id}`}>
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </p>
                          {message.direction === 'outbound' && (
                            <div className="ml-auto">
                              {message.status === 'delivered' ? (
                                <CheckCheck className="w-3 h-3" data-testid={`icon-delivered-${message.id}`} />
                              ) : message.status === 'sent' ? (
                                <Check className="w-3 h-3" data-testid={`icon-sent-${message.id}`} />
                              ) : message.status === 'failed' ? (
                                <AlertCircle className="w-3 h-3 text-red-500" data-testid={`icon-failed-${message.id}`} />
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  data-testid="input-message"
                />
                <Button 
                  type="submit" 
                  disabled={!messageInput.trim() || sendMessageMutation.isPending}
                  data-testid="button-send"
                >
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400" data-testid="text-select-conversation">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* CRM Context Panel */}
      {selectedConv && (
        <div className="w-72 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-y-auto" data-testid="crm-context-panel">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white" data-testid="text-crm-title">CRM Context</h3>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs" data-testid="badge-performance-tier">
                Performance
              </Badge>
            </div>

            {crmLookupLoading || crmContextLoading ? (
              <div className="space-y-3" data-testid="crm-loading-skeleton">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : crmContext ? (
              <div className="space-y-4" data-testid="crm-context-content">
                {/* Contact Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3" data-testid="crm-contact-section">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Contact</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white" data-testid="crm-contact-name">
                    {crmContext.contact.firstName} {crmContext.contact.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="crm-contact-email">{crmContext.contact.email}</p>
                  {crmContext.contact.lifecycleStage && (
                    <Badge className="mt-2 capitalize" variant="outline" data-testid="crm-lifecycle-stage">{crmContext.contact.lifecycleStage}</Badge>
                  )}
                </div>

                {/* Company */}
                {crmContext.company && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3" data-testid="crm-company-section">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Company</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white" data-testid="crm-company-name">{crmContext.company.name}</p>
                    {crmContext.company.industry && (
                      <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="crm-company-industry">{crmContext.company.industry}</p>
                    )}
                  </div>
                )}

                {/* Deals */}
                {crmContext.deals.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3" data-testid="crm-deals-section">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Deals</span>
                    </div>
                    <div className="space-y-2">
                      {crmContext.deals.slice(0, 3).map((deal) => (
                        <div key={deal.id} className="flex justify-between items-center text-sm" data-testid={`crm-deal-${deal.id}`}>
                          <span className="text-gray-900 dark:text-white truncate">{deal.title}</span>
                          <span className="text-green-600 font-medium" data-testid={`crm-deal-value-${deal.id}`}>${deal.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-2" data-testid="crm-total-deal-value">
                      Total: ${crmContext.totalDealValue.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Recent Activity */}
                {crmContext.recentActivity.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3" data-testid="crm-activity-section">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Recent Activity</span>
                    </div>
                    <div className="space-y-2">
                      {crmContext.recentActivity.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="text-sm" data-testid={`crm-activity-${activity.id}`}>
                          <p className="text-gray-900 dark:text-white">{activity.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(activity.occurredAt), { addSuffix: true })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View in CRM Button */}
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation('/relationships')}
                  data-testid="button-view-crm"
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View in /relationships
                </Button>
              </div>
            ) : (
              <div className="text-center py-6" data-testid="crm-empty-state">
                <User className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3" data-testid="text-no-crm-record">
                  No CRM record found
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation('/relationships')}
                  data-testid="button-create-crm-contact"
                >
                  Create Contact
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  AlertCircle
} from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

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
  email: 'bg-blue-500',
  livechat: 'bg-green-500',
  sms: 'bg-purple-500',
  whatsapp: 'bg-emerald-500',
  facebook: 'bg-blue-600',
  instagram: 'bg-pink-500',
  twitter: 'bg-sky-500',
  tiktok: 'bg-black',
};

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  // Fetch conversations
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/inbox/conversations'],
  });

  // Fetch messages for selected conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ['/api/inbox/conversations', selectedConversation, 'messages'],
    enabled: !!selectedConversation,
  });

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

  // WebSocket setup
  useEffect(() => {
    const socketInstance = io({
      auth: {
        role: 'agent',
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
  }, [conversations, selectedConversation, toast]);

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

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="text-xl" data-testid="title-inbox">Inbox</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-80px)]">
          {conversationsLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin" data-testid="loader-conversations" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400" data-testid="text-no-conversations">
              No conversations yet
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
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
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
    </div>
  );
}

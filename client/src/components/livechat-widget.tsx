import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { nanoid } from 'nanoid';

interface Message {
  id: string;
  content: string;
  fromName: string;
  direction: 'inbound' | 'outbound';
  timestamp: string;
}

interface LiveChatWidgetProps {
  clientId: number;
  companyName: string;
  primaryColor?: string;
}

export function LiveChatWidget({ clientId, companyName, primaryColor = '#007bff' }: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [sessionId] = useState(() => {
    // Persist sessionId in localStorage for reconnection
    const stored = localStorage.getItem('livechat-sessionId');
    if (stored) return stored;
    const newId = nanoid();
    localStorage.setItem('livechat-sessionId', newId);
    return newId;
  });
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [agentTyping, setAgentTyping] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io({
      auth: {
        sessionId,
        role: 'customer'
      },
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join:session', sessionId);
      console.log('Live chat connected:', sessionId);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Live chat disconnected');
    });

    // Listen for agent messages
    socket.on('agent:message', (data: { id?: number; message: string; agentName: string; timestamp: string }) => {
      setMessages(prev => [...prev, {
        id: data.id?.toString() || nanoid(),
        content: data.message,
        fromName: data.agentName,
        direction: 'outbound',
        timestamp: data.timestamp
      }]);
    });

    // Listen for message history
    socket.on('message:history', (data: { messages: any[] }) => {
      const historyMessages = data.messages.map((msg: any) => ({
        id: msg.id.toString(),
        content: msg.content,
        fromName: msg.direction === 'inbound' ? (visitorName || 'You') : msg.fromName,
        direction: msg.direction,
        timestamp: msg.createdAt
      }));
      setMessages(historyMessages);
      
      // Restore conversationId from message history to prevent duplicate conversations
      if (data.messages.length > 0) {
        const firstMessage = data.messages[0];
        if (firstMessage.conversationId) {
          setConversationId(firstMessage.conversationId);
          // Join the conversation room for future messages
          socket.emit('join:conversation', firstMessage.conversationId);
        }
      }
    });

    // Listen for message sent confirmation
    socket.on('message:sent', (data: { messageId: number; conversationId: number }) => {
      if (!conversationId) {
        setConversationId(data.conversationId);
        socket.emit('join:conversation', data.conversationId);
      }
    });

    // Listen for typing indicators
    socket.on('user:typing', (data: { name: string }) => {
      setAgentTyping(true);
    });

    socket.on('user:stop-typing', () => {
      setAgentTyping(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartChat = () => {
    if (!visitorName.trim()) return;
    
    setHasStartedChat(true);
    
    // Create livechat session in database
    fetch('/api/inbox/livechat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        sessionId,
        visitorName,
        visitorEmail,
        pageUrl: window.location.href,
        pageTitle: document.title,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      })
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: nanoid(),
      content: inputMessage,
      fromName: visitorName || 'You',
      direction: 'inbound',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Send message via WebSocket
    socketRef.current?.emit('chat:message', {
      sessionId,
      conversationId,
      message: inputMessage,
      visitorName,
      visitorEmail,
      clientId
    });

    setInputMessage('');
    
    // Clear typing indicator timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socketRef.current?.emit('typing:stop', { conversationId });
  };

  const handleInputChange = (value: string) => {
    setInputMessage(value);
    
    if (!conversationId) return;
    
    // Send typing indicator
    socketRef.current?.emit('typing:start', { 
      conversationId,
      name: visitorName || 'Visitor'
    });
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit('typing:stop', { conversationId });
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
          style={{ backgroundColor: primaryColor }}
          data-testid="button-open-chat"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card 
          className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col"
          data-testid="card-livechat-widget"
        >
          {/* Header */}
          <CardHeader 
            className="p-4 rounded-t-lg text-white flex flex-row items-center justify-between"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                <CardTitle className="text-lg font-semibold" data-testid="text-company-name">
                  {companyName} Chat
                </CardTitle>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 rounded"
                data-testid="button-minimize-chat"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded"
                data-testid="button-close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {!hasStartedChat ? (
                /* Welcome Form */
                <div className="flex-1 flex flex-col justify-center p-6 gap-4" data-testid="form-start-chat">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Welcome! 👋
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Start a conversation with our team
                    </p>
                  </div>
                  <Input
                    type="text"
                    placeholder="Your name *"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    data-testid="input-visitor-name"
                  />
                  <Input
                    type="email"
                    placeholder="Your email (optional)"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    data-testid="input-visitor-email"
                  />
                  <Button
                    onClick={handleStartChat}
                    disabled={!visitorName.trim()}
                    style={{ backgroundColor: primaryColor }}
                    className="w-full text-white hover:opacity-90"
                    data-testid="button-start-chat"
                  >
                    Start Chat
                  </Button>
                </div>
              ) : (
                <>
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="container-messages">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                        <p className="text-sm">Send a message to start the conversation</p>
                      </div>
                    )}
                    
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.direction === 'inbound' ? 'justify-end' : 'justify-start'}`}
                        data-testid={`message-${msg.direction}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 ${
                            msg.direction === 'inbound'
                              ? 'text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                          }`}
                          style={msg.direction === 'inbound' ? { backgroundColor: primaryColor } : {}}
                        >
                          {msg.direction === 'outbound' && (
                            <p className="text-xs font-semibold mb-1" data-testid="text-agent-name">
                              {msg.fromName}
                            </p>
                          )}
                          <p className="text-sm break-words" data-testid="text-message-content">
                            {msg.content}
                          </p>
                          <p className="text-xs opacity-70 mt-1" data-testid="text-message-time">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {agentTyping && (
                      <div className="flex justify-start" data-testid="indicator-agent-typing">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            Agent is typing...
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="flex-1"
                        data-testid="input-message"
                      />
                      <Button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        style={{ backgroundColor: primaryColor }}
                        className="text-white hover:opacity-90"
                        data-testid="button-send-message"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}

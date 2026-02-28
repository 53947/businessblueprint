import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Plus,
  Send,
  Loader2,
  Trash2,
  Brain,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Conversation {
  id: number;
  clientId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: number;
  conversationId: number;
  role: "user" | "assistant";
  content: string;
  messageType: string;
  createdAt: string;
}

interface AICoachProps {
  assessmentData?: any;
}

export function AICoach({ assessmentData }: AICoachProps) {
  const [activeConversationId, setActiveConversationId] = useState<
    number | null
  >(null);
  const [inputMessage, setInputMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const isAuthenticated = !!sessionStorage.getItem("clientId");

  // Fetch conversations
  const { data: conversationsData } = useQuery<{ conversations: Conversation[] }>({
    queryKey: ["/api/ai-coach/conversations"],
    enabled: isAuthenticated,
  });
  const conversations = conversationsData?.conversations || [];

  // Fetch messages for active conversation
  const { data: messagesData, isLoading: messagesLoading } = useQuery<{ messages: Message[] }>({
    queryKey: [
      `/api/ai-coach/conversations/${activeConversationId}/messages`,
    ],
    enabled: isAuthenticated && !!activeConversationId,
  });
  const messages = messagesData?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create new conversation
  const createConversation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/ai-coach/conversations");
      return res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["/api/ai-coach/conversations"],
      });
      setActiveConversationId(data.conversation.id);
    },
  });

  // Send chat message
  const chatMutation = useMutation({
    mutationFn: async ({
      conversationId,
      message,
    }: {
      conversationId: number;
      message: string;
    }) => {
      const res = await apiRequest(
        "POST",
        `/api/ai-coach/conversations/${conversationId}/chat`,
        { message },
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          `/api/ai-coach/conversations/${activeConversationId}/messages`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/ai-coach/conversations"],
      });
    },
  });

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    let conversationId = activeConversationId;

    // Auto-create conversation if none active
    if (!conversationId) {
      const result: any = await createConversation.mutateAsync();
      conversationId = result.conversation.id;
      setActiveConversationId(conversationId);
    }

    const message = inputMessage;
    setInputMessage("");
    chatMutation.mutate({ conversationId: conversationId!, message });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setActiveConversationId(null);
    setInputMessage("");
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Unauthenticated preview
  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Coach Blue - AI Business Coach
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized, AI-powered guidance to grow your digital presence.
            Coach Blue understands your business and provides actionable
            step-by-step advice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Conversational Coaching</h3>
            <p className="text-sm text-gray-600">
              Chat naturally with Coach Blue about your business challenges and
              get tailored strategies.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Remembers Your Context</h3>
            <p className="text-sm text-gray-600">
              Coach Blue remembers your conversation history and builds on
              previous advice.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Send className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Actionable Guidance</h3>
            <p className="text-sm text-gray-600">
              Get specific, prioritized action items with time estimates and
              difficulty levels.
            </p>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-center text-gray-500">
            Sample Conversation
          </h3>
          <div className="max-w-lg mx-auto space-y-3">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs text-sm">
                How can I get more Google reviews for my restaurant?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border px-4 py-2 rounded-2xl rounded-bl-md max-w-sm text-sm text-gray-700">
                Great question! Here are 3 quick wins for your restaurant: 1)
                Add a QR code to receipts linking to your Google review page, 2)
                Train staff to ask happy customers for reviews, 3) Use our
                Reputation tool at /reputation to automate review requests after
                each visit.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated chat UI
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex h-[calc(100vh-200px)] min-h-[500px] rounded-xl border bg-white overflow-hidden">
        {/* Sidebar - conversation list */}
        {showSidebar && (
          <div className="w-72 border-r flex flex-col bg-gray-50">
            <div className="p-3 border-b">
              <Button
                onClick={startNewChat}
                className="w-full gap-2"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8 px-4">
                    No conversations yet. Start chatting with Coach Blue!
                  </p>
                )}
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeConversationId === conv.id
                        ? "bg-blue-100 text-blue-900"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="font-medium truncate">{conv.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {formatTime(conv.updatedAt)}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-4 py-3 border-b flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-1.5 rounded hover:bg-gray-100 md:hidden"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Coach Blue</h2>
                <p className="text-xs text-gray-500">
                  AI Business Coach
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {!activeConversationId && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">
                    How can I help your business today?
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Ask me about improving your online presence, getting more
                    reviews, social media strategy, or any digital marketing
                    challenge.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {[
                    "How do I improve my Google Business listing?",
                    "Help me get more customer reviews",
                    "What should I post on social media?",
                    "How can I improve my website SEO?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInputMessage(suggestion);
                      }}
                      className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messagesLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            )}

            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div
                      className={`text-xs mt-1.5 ${msg.role === "user" ? "text-blue-200" : "text-gray-400"}`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {chatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Coach Blue is thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 items-end">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Coach Blue anything about growing your business..."
                className="resize-none min-h-[44px] max-h-32"
                rows={1}
                disabled={chatMutation.isPending}
              />
              <Button
                onClick={handleSend}
                disabled={
                  !inputMessage.trim() ||
                  chatMutation.isPending ||
                  createConversation.isPending
                }
                size="icon"
                className="h-11 w-11 shrink-0"
              >
                {chatMutation.isPending || createConversation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

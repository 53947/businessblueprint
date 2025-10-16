import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LiveChatWidget } from "@/components/livechat-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { MessageCircle, Settings, Code, BarChart3, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LiveChatDemo() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('demo');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SectionHeader 
        title="/livechat - Website Chat Widget"
        tabs={[
          { 
            label: 'Demo', 
            icon: MessageCircle, 
            active: activeTab === 'demo',
            onClick: () => setActiveTab('demo'),
            testId: 'tab-demo'
          },
          { 
            label: 'Installation', 
            icon: Code, 
            active: activeTab === 'installation',
            onClick: () => {
              setLocation('/livechat-install');
            },
            testId: 'tab-installation'
          },
          { 
            label: 'Conversations', 
            icon: Users, 
            active: activeTab === 'conversations',
            onClick: () => {
              setActiveTab('conversations');
              toast({ title: 'Conversations', description: 'Conversation history coming soon' });
            },
            testId: 'tab-conversations'
          },
          { 
            label: 'Analytics', 
            icon: BarChart3, 
            active: activeTab === 'analytics',
            onClick: () => {
              setActiveTab('analytics');
              toast({ title: 'Analytics', description: 'Chat analytics coming soon' });
            },
            testId: 'tab-analytics'
          }
        ]}
        actions={
          <Button 
            onClick={() => toast({ title: 'Settings', description: 'Widget settings coming soon' })} 
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
        <div className="max-w-4xl mx-auto">

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-semibold mb-2">Click the Chat Button</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Look for the blue chat button in the bottom right corner
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="font-semibold mb-2">Enter Your Details</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Provide your name and optionally your email
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold mb-2">Start Chatting</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send messages in real-time with WebSocket technology
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Real-time messaging with WebSocket</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Typing indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Message delivery status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Session persistence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Visitor context tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Customizable branding</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">💡 Try it now!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Click the chat button in the bottom right corner to start a conversation. 
              All messages are stored in the unified inbox and can be viewed by agents in real-time.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Live Chat Widget */}
      <LiveChatWidget 
        clientId={1} 
        companyName="businessblueprint.io"
        primaryColor="#007bff"
      />
    </div>
  );
}

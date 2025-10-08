import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Plus, 
  Send, 
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { BrandLogo } from "@/components/brand-logo";

export default function SendDashboard() {
  const [, setLocation] = useLocation();
  const [timeRange, setTimeRange] = useState("30d");

  // Fetch dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['/api/send/metrics', timeRange],
  });

  // Fetch recent campaigns
  const { data: recentCampaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/send/campaigns/recent'],
  });

  // Fetch contacts summary
  const { data: contactsSummary, isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/send/contacts/summary'],
  });

  // Mock data for development (remove when API is ready)
  const mockMetrics = {
    totalContacts: 12847,
    contactsGrowth: 12.5,
    emailsSent: 45234,
    emailsDelivered: 44123,
    emailsOpened: 18567,
    emailsClicked: 6234,
    smsSent: 8934,
    smsDelivered: 8876,
    avgOpenRate: 42.1,
    avgClickRate: 14.1,
    avgDeliverability: 97.5,
  };

  const mockRecentActivity = [
    { id: 1, type: 'campaign', name: 'Summer Sale Email', status: 'sent', time: '2 hours ago', recipients: 4521 },
    { id: 2, type: 'contact', name: '124 new contacts imported', status: 'completed', time: '5 hours ago' },
    { id: 3, type: 'automation', name: 'Welcome Series', status: 'active', time: '1 day ago', triggered: 43 },
    { id: 4, type: 'campaign', name: 'Product Launch SMS', status: 'scheduled', time: 'Tomorrow 9:00 AM', recipients: 2341 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header showNavigation={true} />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header with Brand */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <BrandLogo brand="send" size="lg" className="mb-2" />
              <p className="text-gray-600 dark:text-gray-400">Email + SMS Marketing Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setLocation('/send/contacts')}>
                <Users className="w-4 h-4 mr-2" />
                Manage Contacts
              </Button>
              <Button onClick={() => setLocation('/send/campaigns/new')} data-testid="button-new-campaign">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockMetrics.totalContacts.toLocaleString()}
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{mockMetrics.contactsGrowth}%
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last {timeRange === '30d' ? 'month' : 'week'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Open Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockMetrics.avgOpenRate}%
                </div>
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Industry avg: 21.5%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Click Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockMetrics.avgClickRate}%
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Industry avg: 2.6%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Deliverability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mockMetrics.avgDeliverability}%
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Excellent performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Recent Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest campaigns, imports, and automations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            {activity.type === 'campaign' && <Send className="w-5 h-5 text-blue-500" />}
                            {activity.type === 'contact' && <Users className="w-5 h-5 text-green-500" />}
                            {activity.type === 'automation' && <Activity className="w-5 h-5 text-purple-500" />}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{activity.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {activity.recipients && (
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {activity.recipients.toLocaleString()} recipients
                              </span>
                            )}
                            {activity.triggered && (
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {activity.triggered} triggered
                              </span>
                            )}
                            <Badge variant={
                              activity.status === 'sent' ? 'default' :
                              activity.status === 'completed' ? 'default' :
                              activity.status === 'active' ? 'default' :
                              'secondary'
                            }>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setLocation('/send/campaigns/new')}
                      data-testid="button-create-campaign"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Create Email Campaign
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setLocation('/send/campaigns/new?type=sms')}
                      data-testid="button-create-sms"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send SMS Campaign
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setLocation('/send/contacts/import')}
                      data-testid="button-import-contacts"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Import Contacts
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setLocation('/send/templates')}
                      data-testid="button-templates"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Email Templates
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setLocation('/send/automations')}
                      data-testid="button-automations"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Automation Workflows
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Email and SMS delivery metrics for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email Metrics */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Email Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Sent</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mockMetrics.emailsSent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Delivered</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mockMetrics.emailsDelivered.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Opened</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mockMetrics.emailsOpened.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Clicked</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mockMetrics.emailsClicked.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* SMS Metrics */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">SMS Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Sent</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mockMetrics.smsSent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Delivered</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mockMetrics.smsDelivered.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Rate</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {((mockMetrics.smsDelivered / mockMetrics.smsSent) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>View and manage your email and SMS campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">Campaign list coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Deep dive into performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

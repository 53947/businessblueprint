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
  Plus, 
  Send, 
  FileText,
  CheckCircle2,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { BrandLogo } from "@/components/brand-logo";

interface DashboardMetrics {
  totalContacts: number;
  contactsGrowth: number;
  emailsSent: number;
  emailsDelivered: number;
  emailsOpened: number;
  emailsClicked: number;
  smsSent: number;
  smsDelivered: number;
  avgOpenRate: number;
  avgClickRate: number;
  avgDeliverability: number;
}

interface ActivityItem {
  id: number;
  type: 'campaign' | 'contact' | 'automation';
  name: string;
  status: string;
  time: string;
  recipients?: number;
  triggered?: number;
}

export default function SendDashboard() {
  const [, setLocation] = useLocation();

  // Fetch dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ['/api/send/metrics'],
  });

  // Fetch recent campaigns
  const { data: recentCampaigns, isLoading: campaignsLoading } = useQuery<ActivityItem[]>({
    queryKey: ['/api/send/campaigns/recent'],
  });

  // Mock data for development (will be replaced by real API data)
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

  // Use real data when available, fallback to mock for development
  const displayMetrics = metrics || mockMetrics;
  const displayActivity = recentCampaigns || mockRecentActivity;

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
              <Button variant="outline" onClick={() => setLocation('/send/contacts')} data-testid="button-manage-contacts">
                <Users className="w-4 h-4 mr-2" />
                Manage Contacts
              </Button>
              <Button onClick={() => setLocation('/send/campaigns/new')} data-testid="button-new-campaign" className="bg-[#E5A100] hover:bg-[#c98e00] text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        {metricsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="metric-total-contacts">
                    {displayMetrics.totalContacts.toLocaleString()}
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" data-testid="badge-contacts-growth">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{displayMetrics.contactsGrowth}%
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="metric-open-rate">
                    {displayMetrics.avgOpenRate}%
                  </div>
                  <Mail className="w-8 h-8 text-[#E5A100]" />
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
                  <div className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="metric-click-rate">
                    {displayMetrics.avgClickRate}%
                  </div>
                  <Activity className="w-8 h-8 text-[#E5A100]" />
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
                  <div className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="metric-deliverability">
                    {displayMetrics.avgDeliverability}%
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Excellent performance</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns" data-testid="tab-campaigns">Recent Campaigns</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
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
                    {campaignsLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {displayActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" data-testid={`activity-${activity.id}`}>
                            <div className="flex items-center gap-3">
                              {activity.type === 'campaign' && <Send className="w-5 h-5 text-[#E5A100]" />}
                              {activity.type === 'contact' && <Users className="w-5 h-5 text-green-500" />}
                              {activity.type === 'automation' && <Activity className="w-5 h-5 text-[#E5A100]" />}
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white" data-testid={`activity-name-${activity.id}`}>{activity.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400" data-testid={`activity-time-${activity.id}`}>{activity.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {activity.recipients && (
                                <span className="text-sm text-gray-600 dark:text-gray-400" data-testid={`activity-recipients-${activity.id}`}>
                                  {activity.recipients.toLocaleString()} recipients
                                </span>
                              )}
                              {activity.triggered && (
                                <span className="text-sm text-gray-600 dark:text-gray-400" data-testid={`activity-triggered-${activity.id}`}>
                                  {activity.triggered} triggered
                                </span>
                              )}
                              <Badge variant={
                                activity.status === 'sent' ? 'default' :
                                activity.status === 'completed' ? 'default' :
                                activity.status === 'active' ? 'default' :
                                'secondary'
                              } data-testid={`activity-status-${activity.id}`}>
                                {activity.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="metric-emails-sent">{displayMetrics.emailsSent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Delivered</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="metric-emails-delivered">{displayMetrics.emailsDelivered.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Opened</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="metric-emails-opened">{displayMetrics.emailsOpened.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Clicked</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="metric-emails-clicked">{displayMetrics.emailsClicked.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* SMS Metrics */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">SMS Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Sent</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="metric-sms-sent">{displayMetrics.smsSent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Delivered</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="metric-sms-delivered">{displayMetrics.smsDelivered.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Rate</span>
                        <span className="font-medium text-green-600 dark:text-green-400" data-testid="metric-sms-delivery-rate">
                          {((displayMetrics.smsDelivered / displayMetrics.smsSent) * 100).toFixed(1)}%
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

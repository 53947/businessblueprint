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
  Plus, 
  Send, 
  FileText,
  CheckCircle2,
  Activity,
  BarChart3,
  Settings,
  Link2,
  ExternalLink,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { BrandLogo } from "@/components/brand-logo";
import { SectionHeader } from "@/components/section-header";
import { useToast } from "@/hooks/use-toast";
import { CrmEmptyState, CRM_EMPTY_CONFIGS } from "@/components/crm-empty-state";
import { useCrmPresence } from "@/hooks/use-crm-presence";

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const crmPresence = useCrmPresence();

  // Fetch dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ['/api/send/metrics'],
  });

  // Fetch recent campaigns
  const { data: recentCampaigns, isLoading: campaignsLoading } = useQuery<ActivityItem[]>({
    queryKey: ['/api/send/campaigns/recent'],
  });

  // Use shared CRM data from hook (avoids duplicate queries)
  const crmContacts = crmPresence.contacts;
  const crmSegments = crmPresence.segments;
  
  // Show CRM empty state for unauthenticated users or when CRM has no data
  const showCrmEmptyState = crmPresence.state === 'unauthenticated' || crmPresence.state === 'empty';

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
      <SectionHeader 
        title="/send - Email + SMS Marketing"
        tabs={[
          { 
            label: 'Overview', 
            icon: BarChart3, 
            active: activeTab === 'overview',
            onClick: () => setActiveTab('overview'),
            testId: 'tab-overview'
          },
          { 
            label: 'Campaigns', 
            icon: Mail, 
            active: activeTab === 'campaigns',
            onClick: () => {
              setActiveTab('campaigns');
              toast({ title: 'Campaigns', description: 'Campaign management coming soon' });
            },
            testId: 'tab-campaigns'
          },
          { 
            label: 'Contacts', 
            icon: Users, 
            active: activeTab === 'contacts',
            onClick: () => {
              setActiveTab('contacts');
              toast({ title: 'Contacts', description: 'Contact management coming soon' });
            },
            testId: 'tab-contacts'
          },
          { 
            label: 'Analytics', 
            icon: TrendingUp, 
            active: activeTab === 'analytics',
            onClick: () => {
              setActiveTab('analytics');
              toast({ title: 'Analytics', description: 'Analytics dashboard coming soon' });
            },
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
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => toast({ title: 'New Campaign', description: 'Campaign creation coming soon' })} 
              size="sm"
              className="bg-[#E6B747] hover:bg-[#d1a440] text-white"
              data-testid="button-new-campaign"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </>
        }
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* CRM Empty State - Show for unauthenticated users OR when CRM has no data */}
        {showCrmEmptyState && (
          <div className="mb-6">
            <CrmEmptyState {...CRM_EMPTY_CONFIGS.send} variant="compact" />
          </div>
        )}

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
            <TabsTrigger value="contacts" data-testid="tab-contacts-list">Contacts</TabsTrigger>
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

                {/* CRM Integration Card */}
                <Card className="mt-6 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-green-600" />
                      <CardTitle className="text-base">CRM Integration</CardTitle>
                    </div>
                    <CardDescription>Pull contacts from /relationships</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {crmContactsLoading ? (
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">CRM Contacts</span>
                          <span className="font-semibold text-green-700 dark:text-green-400" data-testid="crm-contacts-count">
                            {(crmContacts?.length || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Segments</span>
                          <span className="font-semibold text-green-700 dark:text-green-400" data-testid="crm-segments-count">
                            {crmSegments.length}
                          </span>
                        </div>
                      </>
                    )}
                    <Button 
                      className="w-full justify-center mt-2" 
                      variant="outline"
                      onClick={() => setLocation('/relationships')}
                      data-testid="button-manage-crm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Manage in /relationships
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

          {/* Contacts Tab - CRM Integration */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Contact List from CRM */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>CRM Contacts</CardTitle>
                        <CardDescription>Contacts synced from /relationships</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        <Link2 className="w-3 h-3 mr-1" />
                        Performance
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {crmContactsLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : crmContacts && crmContacts.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {crmContacts.slice(0, 20).map((contact) => (
                          <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" data-testid={`crm-contact-${contact.id}`}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                                  {contact.firstName?.[0]?.toUpperCase() || '?'}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {contact.firstName} {contact.lastName}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                              </div>
                            </div>
                            {contact.lifecycleStage && (
                              <Badge variant="outline" className="capitalize">{contact.lifecycleStage}</Badge>
                            )}
                          </div>
                        ))}
                        {crmContacts.length > 20 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                            Showing 20 of {crmContacts.length} contacts
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No contacts in CRM yet</p>
                        <Button onClick={() => setLocation('/relationships')} data-testid="button-add-crm-contacts">
                          Add Contacts in /relationships
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Segments for Targeting */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Segments
                    </CardTitle>
                    <CardDescription>Target specific audiences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {crmSegmentsLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ))}
                      </div>
                    ) : crmSegments.length > 0 ? (
                      <div className="space-y-2">
                        {crmSegments.map((segment) => (
                          <div key={segment.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" data-testid={`segment-${segment.id}`}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900 dark:text-white">{segment.name}</span>
                              <Badge variant="secondary">{segment.memberCount || 0}</Badge>
                            </div>
                            {segment.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{segment.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Filter className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">No segments created yet</p>
                        <Button variant="outline" size="sm" onClick={() => setLocation('/relationships')} data-testid="button-create-segment">
                          Create Segment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Manage Contacts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setLocation('/relationships')}
                      data-testid="button-go-to-crm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open /relationships CRM
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => toast({ title: 'Sync', description: 'Contacts are synced in real-time' })}
                      data-testid="button-sync-contacts"
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      Sync Status: Live
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
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

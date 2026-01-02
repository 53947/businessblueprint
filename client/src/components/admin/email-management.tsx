import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Mail,
  Send,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  MailOpen,
  MousePointer,
  AlertTriangle,
  Plus,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";

interface EmailLog {
  id: number;
  recipientEmail: string;
  recipientName?: string;
  emailType: string;
  subject: string;
  htmlBody: string;
  status: string;
  errorMessage?: string;
  resendApiId?: string;
  sentAt?: string;
  openedAt?: string;
  clickedAt?: string;
  bouncedAt?: string;
  retryCount: number;
  createdAt: string;
}

interface EmailTemplate {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  subject: string;
  htmlBody: string;
  availableVariables?: { name: string; description: string }[];
  isSystem: boolean;
  isActive: boolean;
  triggerType?: string;
  createdAt: string;
  updatedAt: string;
}

interface EmailLogsResponse {
  logs: EmailLog[];
  stats: {
    total: number;
    sent: number;
    failed: number;
    pending: number;
    bounced: number;
    opened: number;
    clicked: number;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function EmailManagement() {
  const [activeSubTab, setActiveSubTab] = useState<'logs' | 'compose' | 'templates' | 'failed'>('logs');
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [resendModalOpen, setResendModalOpen] = useState(false);
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const [templateEditModalOpen, setTemplateEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  
  const [composeData, setComposeData] = useState({
    recipientEmail: "",
    recipientName: "",
    subject: "",
    htmlBody: "",
  });
  
  const [resendData, setResendData] = useState({
    recipientEmail: "",
    subject: "",
    htmlBody: "",
  });
  
  const { toast } = useToast();

  const { data: emailLogsData, isLoading: logsLoading } = useQuery<EmailLogsResponse>({
    queryKey: ['/api/admin/email-logs', { status: statusFilter, search: searchQuery, emailType: typeFilter }],
    enabled: activeSubTab === 'logs',
  });

  const { data: failedEmails, isLoading: failedLoading } = useQuery<EmailLog[]>({
    queryKey: ['/api/admin/emails/failed'],
    enabled: activeSubTab === 'failed',
  });

  const { data: templates, isLoading: templatesLoading } = useQuery<EmailTemplate[]>({
    queryKey: ['/api/admin/email-templates'],
    enabled: activeSubTab === 'templates',
  });

  const resendMutation = useMutation({
    mutationFn: async (data: { logId: number; subject?: string; htmlBody?: string; recipientEmail?: string }) => {
      return apiRequest('POST', `/api/admin/emails/resend/${data.logId}`, {
        subject: data.subject,
        htmlBody: data.htmlBody,
        recipientEmail: data.recipientEmail,
      });
    },
    onSuccess: () => {
      toast({ title: "Email resent successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/email-logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/emails/failed'] });
      setResendModalOpen(false);
    },
    onError: (error: any) => {
      toast({ title: "Failed to resend email", description: error.message, variant: "destructive" });
    },
  });

  const retryMutation = useMutation({
    mutationFn: async (logId: number) => {
      return apiRequest('POST', `/api/admin/emails/retry/${logId}`);
    },
    onSuccess: () => {
      toast({ title: "Email retry successful" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/emails/failed'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/email-logs'] });
    },
    onError: (error: any) => {
      toast({ title: "Failed to retry email", description: error.message, variant: "destructive" });
    },
  });

  const sendCustomMutation = useMutation({
    mutationFn: async (data: { recipientEmail: string; recipientName?: string; subject: string; htmlBody: string }) => {
      return apiRequest('POST', '/api/admin/emails/send-custom', data);
    },
    onSuccess: () => {
      toast({ title: "Email sent successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/email-logs'] });
      setComposeModalOpen(false);
      setComposeData({ recipientEmail: "", recipientName: "", subject: "", htmlBody: "" });
    },
    onError: (error: any) => {
      toast({ title: "Failed to send email", description: error.message, variant: "destructive" });
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<EmailTemplate> }) => {
      return apiRequest('PATCH', `/api/admin/email-templates/${data.id}`, data.updates);
    },
    onSuccess: () => {
      toast({ title: "Template updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/email-templates'] });
      setTemplateEditModalOpen(false);
    },
    onError: (error: any) => {
      toast({ title: "Failed to update template", description: error.message, variant: "destructive" });
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; icon: any }> = {
      sent: { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", icon: CheckCircle2 },
      failed: { className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", icon: XCircle },
      pending: { className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300", icon: Clock },
      bounced: { className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", icon: AlertTriangle },
      opened: { className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", icon: MailOpen },
      clicked: { className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", icon: MousePointer },
    };
    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    return (
      <Badge className={variant.className}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const emailTypes = [
    'welcome', 'magic_link', 'assessment_report', 'verification', 'email_change',
    'enrollment_confirmation', 'pathway_reminder', 'checkout_abandonment', 'review_alert', 'coach_blue_intro', 'custom'
  ];

  const handleViewLog = (log: EmailLog) => {
    setSelectedLog(log);
    setViewModalOpen(true);
  };

  const handleResendClick = (log: EmailLog) => {
    setSelectedLog(log);
    setResendData({
      recipientEmail: log.recipientEmail,
      subject: log.subject,
      htmlBody: log.htmlBody,
    });
    setResendModalOpen(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setTemplateEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Management</h1>
        <Button onClick={() => setComposeModalOpen(true)} data-testid="btn-compose-email">
          <Plus className="h-4 w-4 mr-2" />
          Compose Email
        </Button>
      </div>

      <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="logs" data-testid="tab-email-logs">
            <Mail className="h-4 w-4 mr-2" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="failed" data-testid="tab-failed-emails">
            <AlertCircle className="h-4 w-4 mr-2" />
            Failed Queue ({failedEmails?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="templates" data-testid="tab-email-templates">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Email Activity Log</CardTitle>
              <CardDescription>View all emails sent from the platform with status tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by email, name, or subject..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                      data-testid="input-email-search"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]" data-testid="select-status-filter">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                    <SelectItem value="opened">Opened</SelectItem>
                    <SelectItem value="clicked">Clicked</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]" data-testid="select-type-filter">
                    <SelectValue placeholder="Email Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {emailTypes.map(type => (
                      <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {emailLogsData?.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-xl font-bold">{emailLogsData.stats.total}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-xl font-bold text-green-600">{emailLogsData.stats.sent}</p>
                    <p className="text-xs text-gray-500">Sent</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <p className="text-xl font-bold text-red-600">{emailLogsData.stats.failed}</p>
                    <p className="text-xs text-gray-500">Failed</p>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <p className="text-xl font-bold text-yellow-600">{emailLogsData.stats.pending}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <p className="text-xl font-bold text-orange-600">{emailLogsData.stats.bounced}</p>
                    <p className="text-xs text-gray-500">Bounced</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-xl font-bold text-blue-600">{emailLogsData.stats.opened}</p>
                    <p className="text-xs text-gray-500">Opened</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p className="text-xl font-bold text-purple-600">{emailLogsData.stats.clicked}</p>
                    <p className="text-xs text-gray-500">Clicked</p>
                  </div>
                </div>
              )}

              {logsLoading ? (
                <div className="text-center py-8">Loading email logs...</div>
              ) : emailLogsData?.logs?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No emails found matching your filters</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emailLogsData?.logs?.map((log) => (
                        <TableRow key={log.id} data-testid={`email-log-row-${log.id}`}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{log.recipientEmail}</p>
                              {log.recipientName && (
                                <p className="text-xs text-gray-500">{log.recipientName}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{log.emailType.replace(/_/g, ' ')}</Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{log.subject}</TableCell>
                          <TableCell>{getStatusBadge(log.status)}</TableCell>
                          <TableCell>
                            {log.sentAt ? (
                              <span className="text-sm text-gray-500">
                                {formatDistanceToNow(new Date(log.sentAt), { addSuffix: true })}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">Not sent</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleViewLog(log)} data-testid={`btn-view-${log.id}`}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleResendClick(log)} data-testid={`btn-resend-${log.id}`}>
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Failed Email Queue
              </CardTitle>
              <CardDescription>Emails that failed to send. Review errors and retry or resend.</CardDescription>
            </CardHeader>
            <CardContent>
              {failedLoading ? (
                <div className="text-center py-8">Loading failed emails...</div>
              ) : failedEmails?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p>No failed emails in queue</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {failedEmails?.map((email) => (
                    <div key={email.id} className="border rounded-lg p-4 space-y-3" data-testid={`failed-email-${email.id}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{email.recipientEmail}</p>
                          <p className="text-sm text-gray-600">{email.subject}</p>
                          <Badge variant="outline" className="mt-1">{email.emailType.replace(/_/g, ' ')}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => retryMutation.mutate(email.id)}
                            disabled={retryMutation.isPending}
                            data-testid={`btn-retry-${email.id}`}
                          >
                            <RefreshCw className={`h-4 w-4 mr-1 ${retryMutation.isPending ? 'animate-spin' : ''}`} />
                            Retry
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleResendClick(email)} data-testid={`btn-edit-resend-${email.id}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit & Resend
                          </Button>
                        </div>
                      </div>
                      {email.errorMessage && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                          <p className="text-sm text-red-700 dark:text-red-300 font-medium">Error:</p>
                          <p className="text-sm text-red-600 dark:text-red-400">{email.errorMessage}</p>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 flex gap-4">
                        <span>Retries: {email.retryCount}</span>
                        <span>Created: {formatDistanceToNow(new Date(email.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Manage and customize system email templates</CardDescription>
            </CardHeader>
            <CardContent>
              {templatesLoading ? (
                <div className="text-center py-8">Loading templates...</div>
              ) : templates?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No templates found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {templates?.map((template) => (
                    <div 
                      key={template.id} 
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      data-testid={`template-${template.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{template.displayName}</h3>
                            {template.isSystem && (
                              <Badge variant="outline" className="text-xs">System</Badge>
                            )}
                            {!template.isActive && (
                              <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-700">Inactive</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Trigger: {template.triggerType || 'manual'}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {template.availableVariables?.length || 0} variables
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)} data-testid={`btn-edit-template-${template.id}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                        <p className="text-gray-600 dark:text-gray-400">Subject: <span className="text-gray-900 dark:text-gray-100">{template.subject}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Email Details</DialogTitle>
            <DialogDescription>View the complete email content and tracking details</DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Recipient</Label>
                    <p className="font-medium">{selectedLog.recipientEmail}</p>
                    {selectedLog.recipientName && <p className="text-sm text-gray-500">{selectedLog.recipientName}</p>}
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <div>{getStatusBadge(selectedLog.status)}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Type</Label>
                    <Badge variant="outline">{selectedLog.emailType.replace(/_/g, ' ')}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-500">Resend API ID</Label>
                    <p className="text-sm font-mono">{selectedLog.resendApiId || 'N/A'}</p>
                  </div>
                </div>
                
                {selectedLog.errorMessage && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                    <Label className="text-red-700 dark:text-red-300">Error Message</Label>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{selectedLog.errorMessage}</p>
                  </div>
                )}
                
                <div>
                  <Label className="text-gray-500">Subject</Label>
                  <p className="font-medium">{selectedLog.subject}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Email Content</Label>
                  <div className="border rounded mt-1 p-4 bg-white dark:bg-gray-900 max-h-[300px] overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: selectedLog.htmlBody }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-500">Created</Label>
                    <p>{format(new Date(selectedLog.createdAt), 'PPp')}</p>
                  </div>
                  {selectedLog.sentAt && (
                    <div>
                      <Label className="text-gray-500">Sent</Label>
                      <p>{format(new Date(selectedLog.sentAt), 'PPp')}</p>
                    </div>
                  )}
                  {selectedLog.openedAt && (
                    <div>
                      <Label className="text-gray-500">Opened</Label>
                      <p>{format(new Date(selectedLog.openedAt), 'PPp')}</p>
                    </div>
                  )}
                  {selectedLog.clickedAt && (
                    <div>
                      <Label className="text-gray-500">Clicked</Label>
                      <p>{format(new Date(selectedLog.clickedAt), 'PPp')}</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
            {selectedLog && (
              <Button onClick={() => { setViewModalOpen(false); handleResendClick(selectedLog); }}>
                <Send className="h-4 w-4 mr-2" />
                Resend
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resendModalOpen} onOpenChange={setResendModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Resend Email</DialogTitle>
            <DialogDescription>Edit the email content before resending</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div>
                <Label>Recipient Email</Label>
                <Input
                  value={resendData.recipientEmail}
                  onChange={(e) => setResendData({ ...resendData, recipientEmail: e.target.value })}
                  data-testid="input-resend-recipient"
                />
              </div>
              <div>
                <Label>Subject</Label>
                <Input
                  value={resendData.subject}
                  onChange={(e) => setResendData({ ...resendData, subject: e.target.value })}
                  data-testid="input-resend-subject"
                />
              </div>
              <div>
                <Label>HTML Content</Label>
                <Textarea
                  value={resendData.htmlBody}
                  onChange={(e) => setResendData({ ...resendData, htmlBody: e.target.value })}
                  rows={10}
                  className="font-mono text-sm"
                  data-testid="textarea-resend-body"
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResendModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => selectedLog && resendMutation.mutate({
                logId: selectedLog.id,
                ...resendData,
              })}
              disabled={resendMutation.isPending}
              data-testid="btn-confirm-resend"
            >
              {resendMutation.isPending ? 'Sending...' : 'Resend Email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={composeModalOpen} onOpenChange={setComposeModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Compose New Email</DialogTitle>
            <DialogDescription>Send a custom one-off email to any recipient</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Recipient Email *</Label>
                  <Input
                    value={composeData.recipientEmail}
                    onChange={(e) => setComposeData({ ...composeData, recipientEmail: e.target.value })}
                    placeholder="email@example.com"
                    data-testid="input-compose-email"
                  />
                </div>
                <div>
                  <Label>Recipient Name</Label>
                  <Input
                    value={composeData.recipientName}
                    onChange={(e) => setComposeData({ ...composeData, recipientName: e.target.value })}
                    placeholder="John Doe"
                    data-testid="input-compose-name"
                  />
                </div>
              </div>
              <div>
                <Label>Subject *</Label>
                <Input
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  placeholder="Email subject line"
                  data-testid="input-compose-subject"
                />
              </div>
              <div>
                <Label>HTML Content *</Label>
                <Textarea
                  value={composeData.htmlBody}
                  onChange={(e) => setComposeData({ ...composeData, htmlBody: e.target.value })}
                  rows={12}
                  placeholder="<p>Your email content here...</p>"
                  className="font-mono text-sm"
                  data-testid="textarea-compose-body"
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComposeModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => sendCustomMutation.mutate(composeData)}
              disabled={sendCustomMutation.isPending || !composeData.recipientEmail || !composeData.subject || !composeData.htmlBody}
              data-testid="btn-send-email"
            >
              {sendCustomMutation.isPending ? 'Sending...' : 'Send Email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={templateEditModalOpen} onOpenChange={setTemplateEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.displayName} - Update the subject and content
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <ScrollArea className="max-h-[65vh]">
              <div className="space-y-4">
                <div>
                  <Label>Display Name</Label>
                  <Input
                    value={selectedTemplate.displayName}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, displayName: e.target.value })}
                    data-testid="input-template-display-name"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={selectedTemplate.description || ''}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, description: e.target.value })}
                    data-testid="input-template-description"
                  />
                </div>
                <div>
                  <Label>Subject (use {'{variableName}'} for dynamic content)</Label>
                  <Input
                    value={selectedTemplate.subject}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                    data-testid="input-template-subject"
                  />
                </div>
                <div>
                  <Label>Available Variables</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedTemplate.availableVariables?.map((v: any) => (
                      <Badge key={v.name} variant="secondary" className="text-xs">
                        {'{' + v.name + '}'} - {v.description}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>HTML Content</Label>
                  <Textarea
                    value={selectedTemplate.htmlBody}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, htmlBody: e.target.value })}
                    rows={15}
                    className="font-mono text-sm"
                    data-testid="textarea-template-body"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={selectedTemplate.isActive}
                      onChange={(e) => setSelectedTemplate({ ...selectedTemplate, isActive: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateEditModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => selectedTemplate && updateTemplateMutation.mutate({
                id: selectedTemplate.id,
                updates: {
                  displayName: selectedTemplate.displayName,
                  description: selectedTemplate.description,
                  subject: selectedTemplate.subject,
                  htmlBody: selectedTemplate.htmlBody,
                  isActive: selectedTemplate.isActive,
                },
              })}
              disabled={updateTemplateMutation.isPending}
              data-testid="btn-save-template"
            >
              {updateTemplateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { 
  Users, 
  Building2, 
  Kanban, 
  CheckSquare, 
  History, 
  BarChart3, 
  BarChart2,
  Settings, 
  Plus, 
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  CalendarDays,
  ChevronRight,
  Star,
  TrendingUp,
  UserPlus,
  Target,
  Clock,
  ArrowUpRight,
  Download,
  MoreHorizontal,
  Trash2,
  Tag,
  ChevronLeft,
  ChevronDown,
  X,
  Check,
  FileText,
  Briefcase,
  DollarSign,
  MapPin,
  Globe,
  Loader2,
  ArrowLeft,
  Eye,
  Linkedin,
  List,
  User,
  Building,
  Upload,
  FileSpreadsheet,
  ArrowRight,
  LogIn,
  Send,
  Zap,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import relationshipsIcon from "@assets/__relationships_1766748093805.png";
import bbLogo from "@assets/1-Master_business_blueprint_logo_only_1767324548364.png";

interface CrmStats {
  contacts: number;
  companies: number;
  openDeals: number;
  dealValue: number;
  pendingTasks: number;
}

interface CrmContact {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  mobilePhone: string | null;
  jobTitle: string | null;
  lifecycleStage: string | null;
  leadSource: string | null;
  lastActivityDate: string | null;
  lastContactedAt: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  createdAt: string;
}

interface CrmTask {
  id: number;
  title: string;
  taskType: string;
  status: string;
  priority: string;
  dueDate: string | null;
  contactId: number | null;
  completedAt: string | null;
  createdAt: string;
}

interface CrmDeal {
  id: number;
  contactId: number | null;
  name: string;
  amount: string | null;
  status: string;
  createdAt: string;
}

interface CrmNote {
  id: number;
  contactId: number | null;
  content: string;
  noteType: string;
  isPinned: boolean;
  createdAt: string;
}

interface CrmTimeline {
  id: number;
  contactId: number | null;
  eventType: string;
  title: string;
  description: string | null;
  sourceApp: string | null;
  occurredAt: string;
  createdAt: string;
}

interface CrmPipeline {
  id: number;
  name: string;
  description: string | null;
  isDefault: boolean | null;
  isActive: boolean | null;
  displayOrder: number | null;
  stages: CrmPipelineStage[];
  createdAt: string;
}

interface CrmPipelineStage {
  id: number;
  pipelineId: number;
  name: string;
  probability: number | null;
  displayOrder: number | null;
  stageType: string | null;
  color: string | null;
  createdAt: string;
}

interface CrmDealWithDetails {
  id: number;
  contactId: number | null;
  companyId: number | null;
  pipelineId: number | null;
  stageId: number | null;
  name: string;
  description: string | null;
  amount: string | null;
  currency: string | null;
  probability: number | null;
  expectedCloseDate: string | null;
  status: string | null;
  contact?: CrmContact;
  company?: CrmCompany;
  createdAt: string;
  updatedAt: string;
}

interface CrmAppointment {
  id: number;
  clientId: number | null;
  contactId: number | null;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  timezone: string | null;
  appointmentType: string | null;
  location: string | null;
  meetingUrl: string | null;
  status: string | null;
  reminderSent: boolean | null;
  createdAt: string;
  updatedAt: string;
}

type Section = "dashboard" | "contacts" | "companies" | "pipeline" | "tasks" | "scheduler" | "timeline" | "automations" | "analytics" | "settings";

const sidebarItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { id: "contacts" as const, label: "Contacts", icon: Users },
  { id: "companies" as const, label: "Companies", icon: Building2 },
  { id: "pipeline" as const, label: "Pipeline", icon: Kanban },
  { id: "tasks" as const, label: "Tasks", icon: CheckSquare },
  { id: "scheduler" as const, label: "Scheduler", icon: CalendarDays },
  { id: "timeline" as const, label: "Timeline", icon: History },
  { id: "automations" as const, label: "Automations", icon: Zap },
  { id: "analytics" as const, label: "Analytics", icon: TrendingUp },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

export default function RelationshipsPage() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stats, isLoading: statsLoading } = useQuery<CrmStats>({
    queryKey: ["/api/crm/stats"],
  });

  const { data: contactsData, isLoading: contactsLoading } = useQuery<{ contacts: CrmContact[] }>({
    queryKey: ["/api/crm/contacts", { limit: 10 }],
  });

  const { data: tasksData, isLoading: tasksLoading } = useQuery<{ tasks: CrmTask[] }>({
    queryKey: ["/api/crm/tasks", { status: "pending", limit: 5 }],
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/relationships">
            <div className="flex items-center gap-2">
              <img src={relationshipsIcon} alt="/relationships" className="w-8 h-8" />
              <div className="flex items-center">
                <span className="text-lg font-bold text-[#09080E] dark:text-white">/</span>
                <span className="text-lg font-bold text-[#22C55E]">relationships</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  data-testid={`nav-${item.id}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Subscription Status */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Starter Plan</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Upgrade to Performance for unified timeline & integrations
            </p>
            <Button 
              size="sm" 
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white"
              data-testid="btn-upgrade"
            >
              Upgrade to Performance
            </Button>
          </div>
        </div>

        {/* Exit to Portal */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/portal/dashboard">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2"
              data-testid="btn-exit-to-portal"
            >
              <img src={bbLogo} alt="BusinessBlueprint" className="h-4" />
              <span>Exit to Portal</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                {activeSection === "dashboard" ? "Overview" : activeSection}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activeSection === "dashboard" 
                  ? "Your customer relationship management at a glance"
                  : `Manage your ${activeSection}`
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                  data-testid="input-search"
                />
              </div>
              <Button 
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                data-testid="btn-header-add-contact"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeSection === "dashboard" && (
            <DashboardView 
              stats={stats} 
              contacts={contactsData?.contacts || []} 
              tasks={tasksData?.tasks || []}
              isLoading={statsLoading || contactsLoading || tasksLoading}
            />
          )}
          {activeSection === "contacts" && <ContactsView />}
          {activeSection === "companies" && <CompaniesView />}
          {activeSection === "pipeline" && <PipelineView />}
          {activeSection === "tasks" && <TasksView />}
          {activeSection === "scheduler" && <SchedulerView />}
          {activeSection === "timeline" && <TimelineView />}
          {activeSection === "automations" && <AutomationsView />}
          {activeSection === "analytics" && <AnalyticsView />}
          {activeSection === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

function DashboardView({ 
  stats, 
  contacts, 
  tasks,
  isLoading 
}: { 
  stats?: CrmStats; 
  contacts: CrmContact[];
  tasks: CrmTask[];
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Contacts" 
          value={stats?.contacts || 0}
          icon={Users}
          change="+12%"
          isLoading={isLoading}
        />
        <StatCard 
          title="Companies" 
          value={stats?.companies || 0}
          icon={Building2}
          change="+5%"
          isLoading={isLoading}
        />
        <StatCard 
          title="Open Deals" 
          value={stats?.openDeals || 0}
          icon={Target}
          suffix={stats?.dealValue ? `$${(stats.dealValue / 1000).toFixed(1)}k value` : undefined}
          isLoading={isLoading}
        />
        <StatCard 
          title="Pending Tasks" 
          value={stats?.pendingTasks || 0}
          icon={CheckSquare}
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <QuickActionCard 
          title="Add Contact" 
          description="Import or create a new contact"
          icon={UserPlus}
          action="Add Contact"
        />
        <QuickActionCard 
          title="Schedule Meeting" 
          description="Book time with a contact"
          icon={Calendar}
          action="Schedule"
        />
        <QuickActionCard 
          title="Create Deal" 
          description="Start tracking a new opportunity"
          icon={Target}
          action="Create Deal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Contacts</CardTitle>
              <CardDescription>Your latest customer additions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[#22C55E]">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  No contacts yet
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Start building your customer database
                </p>
                <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Contact
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.slice(0, 5).map((contact) => (
                  <div 
                    key={contact.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    data-testid={`contact-row-${contact.id}`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#22C55E]/10 text-[#22C55E]">
                        {(contact.firstName?.[0] || "") + (contact.lastName?.[0] || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {contact.email || contact.phone || "No contact info"}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {contact.lifecycleStage || "Lead"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
              <CardDescription>Tasks due soon</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[#22C55E]">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  No pending tasks
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Create tasks to stay organized
                </p>
                <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    data-testid={`task-row-${task.id}`}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.priority === "high" ? "bg-red-500" : 
                      task.priority === "medium" ? "bg-yellow-500" : "bg-gray-400"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.taskType}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="bg-gradient-to-r from-[#22C55E]/5 to-transparent border-[#22C55E]/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Welcome to /relationships
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Your single source of truth for all customer data. Get started by importing contacts or creating your first customer record.
              </p>
              <div className="flex gap-3">
                <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  Import Contacts
                </Button>
                <Button variant="outline">
                  Watch Tutorial
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon,
  change,
  suffix,
  isLoading 
}: { 
  title: string; 
  value: number;
  icon: any;
  change?: string;
  suffix?: string;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
          <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#22C55E]" />
          </div>
        </div>
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {value.toLocaleString()}
            </div>
            {(change || suffix) && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {change && <span className="text-[#22C55E]">{change}</span>}
                {suffix && <span className="ml-1">{suffix}</span>}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function QuickActionCard({ 
  title, 
  description, 
  icon: Icon,
  action 
}: { 
  title: string; 
  description: string;
  icon: any;
  action: string;
}) {
  return (
    <Card className="hover:border-[#22C55E]/50 transition-colors cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
            <Icon className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#22C55E] transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
}

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  lifecycleStage: z.string().optional(),
  leadSource: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const lifecycleStages = [
  { value: "subscriber", label: "Subscriber" },
  { value: "lead", label: "Lead" },
  { value: "marketing_qualified", label: "Marketing Qualified" },
  { value: "sales_qualified", label: "Sales Qualified" },
  { value: "opportunity", label: "Opportunity" },
  { value: "customer", label: "Customer" },
  { value: "evangelist", label: "Evangelist" },
];

const leadSources = [
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral" },
  { value: "social", label: "Social Media" },
  { value: "email", label: "Email Campaign" },
  { value: "event", label: "Event" },
  { value: "other", label: "Other" },
];

function ContactDetailView({ contactId, onBack }: { contactId: number; onBack: () => void }) {
  const { toast } = useToast();
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  // Fetch contact details
  const { data: contact, isLoading: contactLoading } = useQuery<CrmContact>({
    queryKey: [`/api/crm/contacts/${contactId}`],
  });

  // Fetch timeline events
  const { data: timelineData } = useQuery<{ timeline: CrmTimeline[] }>({
    queryKey: [`/api/crm/timeline?contactId=${contactId}`],
  });

  // Fetch linked deals
  const { data: dealsData } = useQuery<{ deals: CrmDeal[] }>({
    queryKey: [`/api/crm/deals?contactId=${contactId}`],
  });

  // Fetch linked tasks
  const { data: tasksData } = useQuery<{ tasks: CrmTask[] }>({
    queryKey: [`/api/crm/tasks?contactId=${contactId}`],
  });

  // Fetch notes
  const { data: notesData } = useQuery<{ notes: CrmNote[] }>({
    queryKey: [`/api/crm/notes?contactId=${contactId}`],
  });

  const timeline = timelineData?.timeline || [];
  const deals = dealsData?.deals || [];
  const tasks = tasksData?.tasks || [];
  const notes = notesData?.notes || [];

  const createNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/crm/notes", {
        contactId,
        content,
        noteType: "general",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].includes('/api/crm/notes')
      });
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].includes('/api/crm/timeline')
      });
      setShowAddNoteDialog(false);
      setNoteContent("");
      toast({ title: "Note added", description: "Your note has been saved." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add note", variant: "destructive" });
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: { title: string; dueDate?: string }) => {
      return apiRequest("POST", "/api/crm/tasks", {
        contactId,
        title: data.title,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        status: "pending",
        priority: "medium",
        taskType: "follow_up",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].includes('/api/crm/tasks')
      });
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].includes('/api/crm/timeline')
      });
      setShowAddTaskDialog(false);
      setTaskTitle("");
      setTaskDueDate("");
      toast({ title: "Task created", description: "Your task has been added." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create task", variant: "destructive" });
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      return apiRequest("PATCH", `/api/crm/tasks/${taskId}`, {
        status: "completed",
        completedAt: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].includes('/api/crm/tasks')
      });
    },
  });

  if (contactLoading || !contact) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <Card>
          <CardContent className="p-6">
            <div className="h-20 bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTimelineIcon = (eventType: string) => {
    switch (eventType) {
      case "note_added": return <FileText className="w-4 h-4" />;
      case "task_created": case "task_completed": return <CheckSquare className="w-4 h-4" />;
      case "deal_created": case "deal_stage_changed": return <Briefcase className="w-4 h-4" />;
      case "email_sent": case "email_received": return <Mail className="w-4 h-4" />;
      case "call_made": case "call_received": return <Phone className="w-4 h-4" />;
      case "contact_created": return <UserPlus className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} data-testid="btn-back-to-contacts">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Contacts
        </Button>
      </div>

      {/* Contact Header */}
      <Card data-testid="contact-header">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-[#22C55E]/10 text-[#22C55E] text-xl">
                  {(contact.firstName?.[0] || "") + (contact.lastName?.[0] || "")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="contact-name">
                  {contact.firstName} {contact.lastName}
                </h2>
                {contact.jobTitle && (
                  <p className="text-gray-500" data-testid="contact-job-title">{contact.jobTitle}</p>
                )}
                <Badge 
                  variant="outline"
                  className={cn(
                    "mt-2",
                    contact.lifecycleStage === "customer" && "border-[#22C55E] text-[#22C55E]",
                    contact.lifecycleStage === "opportunity" && "border-blue-500 text-blue-500",
                    contact.lifecycleStage === "lead" && "border-yellow-500 text-yellow-500"
                  )}
                  data-testid="contact-stage-badge"
                >
                  {contact.lifecycleStage || "Lead"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddNoteDialog(true)} data-testid="btn-add-note">
                <FileText className="w-4 h-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAddTaskDialog(true)} data-testid="btn-add-task">
                <CheckSquare className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white" size="sm" data-testid="btn-create-deal">
                <DollarSign className="w-4 h-4 mr-2" />
                Create Deal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Contact Details & Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card data-testid="contact-info-card">
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contact.email && (
                <div className="flex items-center gap-3" data-testid="contact-email">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${contact.email}`} className="text-sm text-[#22C55E] hover:underline">
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-3" data-testid="contact-phone">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${contact.phone}`} className="text-sm text-gray-700 dark:text-gray-300">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.mobilePhone && (
                <div className="flex items-center gap-3" data-testid="contact-mobile">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{contact.mobilePhone} (Mobile)</span>
                </div>
              )}
              {(contact.city || contact.state || contact.country) && (
                <div className="flex items-center gap-3" data-testid="contact-location">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {[contact.city, contact.state, contact.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              {contact.linkedinUrl && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#22C55E] hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {contact.websiteUrl && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={contact.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#22C55E] hover:underline">
                    Website
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card data-testid="contact-details-card">
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Lead Source</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {contact.leadSource || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
              {contact.lastContactedAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Contacted</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(contact.lastContactedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Linked Deals */}
          <Card data-testid="contact-deals-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Deals</CardTitle>
              <Badge variant="secondary">{deals.length}</Badge>
            </CardHeader>
            <CardContent>
              {deals.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No deals yet</p>
              ) : (
                <div className="space-y-3">
                  {deals.slice(0, 5).map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800" data-testid={`deal-item-${deal.id}`}>
                      <div>
                        <p className="text-sm font-medium">{deal.name}</p>
                        <p className="text-xs text-gray-500">{deal.status}</p>
                      </div>
                      <span className="text-sm font-medium text-[#22C55E]">
                        ${Number(deal.amount || 0).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Middle Column: Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Timeline */}
          <Card data-testid="contact-timeline-card">
            <CardHeader>
              <CardTitle className="text-base">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {timeline.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No activity yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {timeline.slice(0, 10).map((event) => (
                    <div key={event.id} className="flex gap-3" data-testid={`timeline-event-${event.id}`}>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                          {getTimelineIcon(event.eventType)}
                        </div>
                        <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                        {event.description && (
                          <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(event.occurredAt).toLocaleString()}
                          {event.sourceApp && ` · via ${event.sourceApp}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card data-testid="contact-tasks-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Tasks</CardTitle>
              <Badge variant="secondary">{tasks.filter(t => t.status !== "completed").length} pending</Badge>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No tasks yet</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowAddTaskDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Task
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" data-testid={`task-item-${task.id}`}>
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={() => task.status !== "completed" && completeTaskMutation.mutate(task.id)}
                        data-testid={`checkbox-task-${task.id}`}
                      />
                      <div className="flex-1">
                        <p className={cn("text-sm", task.status === "completed" && "line-through text-gray-400")}>
                          {task.title}
                        </p>
                        {task.dueDate && (
                          <p className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          task.priority === "high" && "border-red-500 text-red-500",
                          task.priority === "urgent" && "border-red-600 text-red-600",
                          task.priority === "medium" && "border-yellow-500 text-yellow-500"
                        )}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card data-testid="contact-notes-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Notes</CardTitle>
              <Badge variant="secondary">{notes.length}</Badge>
            </CardHeader>
            <CardContent>
              {notes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No notes yet</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowAddNoteDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Note
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.slice(0, 5).map((note) => (
                    <div key={note.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800" data-testid={`note-item-${note.id}`}>
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>Add a note for {contact.firstName} {contact.lastName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your note..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={4}
              data-testid="input-note-content"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddNoteDialog(false)}>Cancel</Button>
              <Button 
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                onClick={() => createNoteMutation.mutate(noteContent)}
                disabled={!noteContent.trim() || createNoteMutation.isPending}
                data-testid="btn-save-note"
              >
                Save Note
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Create a task for {contact.firstName} {contact.lastName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Task Title</Label>
              <Input
                placeholder="Enter task title..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                data-testid="input-task-title"
              />
            </div>
            <div>
              <Label>Due Date (Optional)</Label>
              <Input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                data-testid="input-task-due-date"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>Cancel</Button>
              <Button 
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                onClick={() => createTaskMutation.mutate({ title: taskTitle, dueDate: taskDueDate })}
                disabled={!taskTitle.trim() || createTaskMutation.isPending}
                data-testid="btn-save-task"
              >
                Create Task
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactsView() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importStep, setImportStep] = useState<"upload" | "mapping" | "preview">("upload");
  const [csvData, setCsvData] = useState<{ headers: string[]; rows: string[][] }>({ headers: [], rows: [] });
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [duplicateHandling, setDuplicateHandling] = useState<"skip" | "update">("skip");
  const limit = 25;

  const buildContactsUrl = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedStage !== "all") params.set("lifecycleStage", selectedStage);
    if (selectedSource !== "all") params.set("leadSource", selectedSource);
    params.set("limit", limit.toString());
    params.set("offset", ((page - 1) * limit).toString());
    return `/api/crm/contacts?${params.toString()}`;
  };

  const { data: contactsData, isLoading, refetch } = useQuery<{ contacts: CrmContact[]; total: number }>({
    queryKey: [buildContactsUrl()],
    enabled: selectedContactId === null,
  });

  const contacts = contactsData?.contacts || [];
  const total = contactsData?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const createContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/crm/contacts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/crm/contacts')
      });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setShowAddDialog(false);
      form.reset();
      toast({ title: "Contact created", description: "The contact has been added successfully." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create contact", variant: "destructive" });
    },
  });

  const deleteContactsMutation = useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map(id => apiRequest("DELETE", `/api/crm/contacts/${id}`)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/crm/contacts')
      });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setSelectedContacts(new Set());
      toast({ title: "Contacts deleted", description: `${selectedContacts.size} contact(s) deleted.` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contacts", variant: "destructive" });
    },
  });

  const importContactsMutation = useMutation({
    mutationFn: async (data: { contacts: Record<string, string>[]; duplicateHandling: string }) => {
      return apiRequest("POST", "/api/crm/contacts/import", data);
    },
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/crm/contacts')
      });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setShowImportDialog(false);
      setImportStep("upload");
      setCsvData({ headers: [], rows: [] });
      setColumnMapping({});
      toast({ 
        title: "Import complete", 
        description: `Created: ${result.imported}, Updated: ${result.updated}, Skipped: ${result.skipped}${result.totalErrors > 0 ? `, Errors: ${result.totalErrors}` : ""}` 
      });
    },
    onError: (error: any) => {
      toast({ title: "Import failed", description: error.message || "Failed to import contacts", variant: "destructive" });
    },
  });

  const csvFieldOptions = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "jobTitle", label: "Job Title" },
    { value: "company", label: "Company" },
    { value: "lifecycleStage", label: "Lifecycle Stage" },
    { value: "leadSource", label: "Lead Source" },
    { value: "address", label: "Address" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
    { value: "country", label: "Country" },
    { value: "postalCode", label: "Postal Code" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/).filter(line => line.trim());
      if (lines.length < 2) {
        toast({ title: "Invalid file", description: "CSV must have at least a header row and one data row", variant: "destructive" });
        return;
      }
      
      const parseCSVLine = (line: string) => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (const char of line) {
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };
      
      const headers = parseCSVLine(lines[0]);
      const rows = lines.slice(1).map(line => parseCSVLine(line));
      
      const autoMapping: Record<string, string> = {};
      headers.forEach((header) => {
        const normalized = header.toLowerCase().replace(/[^a-z]/g, "");
        if (normalized.includes("first") || normalized === "firstname") autoMapping[header] = "firstName";
        else if (normalized.includes("last") || normalized === "lastname") autoMapping[header] = "lastName";
        else if (normalized.includes("email")) autoMapping[header] = "email";
        else if (normalized.includes("phone") || normalized.includes("tel")) autoMapping[header] = "phone";
        else if (normalized.includes("title") || normalized.includes("position")) autoMapping[header] = "jobTitle";
        else if (normalized.includes("company") || normalized.includes("org")) autoMapping[header] = "company";
        else if (normalized.includes("city")) autoMapping[header] = "city";
        else if (normalized.includes("state")) autoMapping[header] = "state";
        else if (normalized.includes("country")) autoMapping[header] = "country";
        else if (normalized.includes("zip") || normalized.includes("postal")) autoMapping[header] = "postalCode";
        else if (normalized.includes("address")) autoMapping[header] = "address";
        else if (normalized.includes("source")) autoMapping[header] = "leadSource";
      });
      
      setCsvData({ headers, rows });
      setColumnMapping(autoMapping);
      setImportStep("mapping");
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    const mappedContacts = csvData.rows.map(row => {
      const contact: Record<string, string> = {};
      csvData.headers.forEach((header, index) => {
        const fieldName = columnMapping[header];
        if (fieldName && row[index]) {
          contact[fieldName] = row[index];
        }
      });
      return contact;
    }).filter(c => c.email || c.firstName || c.lastName);
    
    if (mappedContacts.length === 0) {
      toast({ title: "No valid contacts", description: "Please map at least email, first name, or last name", variant: "destructive" });
      return;
    }
    
    importContactsMutation.mutate({ contacts: mappedContacts, duplicateHandling });
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      lifecycleStage: "lead",
      leadSource: "",
    },
  });

  // If a contact is selected, show detail view (must be after all hooks)
  if (selectedContactId !== null) {
    return <ContactDetailView contactId={selectedContactId} onBack={() => setSelectedContactId(null)} />;
  }

  const toggleSelectAll = () => {
    if (selectedContacts.size === contacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(contacts.map(c => c.id)));
    }
  };

  const toggleSelectContact = (id: number) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedContacts(newSelected);
  };

  const exportContacts = () => {
    const dataToExport = selectedContacts.size > 0 
      ? contacts.filter(c => selectedContacts.has(c.id))
      : contacts;
    
    const headers = ["First Name", "Last Name", "Email", "Phone", "Job Title", "Stage", "Created"];
    const rows = dataToExport.map(c => [
      c.firstName || "",
      c.lastName || "",
      c.email || "",
      c.phone || "",
      c.jobTitle || "",
      c.lifecycleStage || "Lead",
      new Date(c.createdAt).toLocaleDateString(),
    ]);
    
    const csv = [headers.join(","), ...rows.map(r => r.map(cell => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export complete", description: `Exported ${dataToExport.length} contacts.` });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStage("all");
    setSelectedSource("all");
    setPage(1);
  };

  const hasActiveFilters = searchQuery || selectedStage !== "all" || selectedSource !== "all";

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="pl-9 w-64"
              data-testid="input-search-contacts"
            />
          </div>

          {/* Filter Toggle */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={hasActiveFilters ? "border-[#22C55E] text-[#22C55E]" : ""}
            data-testid="btn-toggle-filters"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && <Badge className="ml-2 bg-[#22C55E] text-white text-xs">Active</Badge>}
          </Button>

          {/* Segment Tabs */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            {["all", "lead", "customer", "opportunity"].map((stage) => (
              <Button
                key={stage}
                variant={selectedStage === stage ? "default" : "ghost"}
                size="sm"
                onClick={() => { setSelectedStage(stage); setPage(1); }}
                className={selectedStage === stage ? "bg-[#22C55E] hover:bg-[#16A34A] text-white" : ""}
                data-testid={`btn-segment-${stage}`}
              >
                {stage === "all" ? "All" : stage.charAt(0).toUpperCase() + stage.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Bulk Actions */}
          {selectedContacts.size > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" data-testid="btn-bulk-actions">
                  <MoreHorizontal className="w-4 h-4 mr-2" />
                  {selectedContacts.size} selected
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportContacts}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => deleteContactsMutation.mutate(Array.from(selectedContacts))}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Dialog open={showImportDialog} onOpenChange={(open) => {
            setShowImportDialog(open);
            if (!open) {
              setImportStep("upload");
              setCsvData({ headers: [], rows: [] });
              setColumnMapping({});
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="btn-import">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {importStep === "upload" && "Import Contacts"}
                  {importStep === "mapping" && "Map Columns"}
                  {importStep === "preview" && "Preview Import"}
                </DialogTitle>
                <DialogDescription>
                  {importStep === "upload" && "Upload a CSV file with your contacts."}
                  {importStep === "mapping" && "Map your CSV columns to contact fields."}
                  {importStep === "preview" && "Review and confirm your import."}
                </DialogDescription>
              </DialogHeader>

              {importStep === "upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="csv-upload" className="cursor-pointer">
                      <span className="text-[#22C55E] font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </Label>
                    <p className="text-sm text-gray-500 mt-2">CSV files only (max 5,000 rows)</p>
                    <Input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      data-testid="input-csv-upload"
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    <h4 className="font-medium mb-2">Expected format:</h4>
                    <p>First row should contain column headers (First Name, Last Name, Email, etc.)</p>
                  </div>
                </div>
              )}

              {importStep === "mapping" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Found {csvData.rows.length} contact(s). Map your CSV columns to the appropriate fields.
                  </p>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {csvData.headers.map((header) => (
                      <div key={header} className="flex items-center gap-4">
                        <div className="w-1/3 text-sm font-medium truncate">{header}</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <Select
                          value={columnMapping[header] || "skip"}
                          onValueChange={(value) => setColumnMapping({ ...columnMapping, [header]: value === "skip" ? "" : value })}
                        >
                          <SelectTrigger className="w-2/3" data-testid={`select-mapping-${header}`}>
                            <SelectValue placeholder="Select field..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skip">Skip this column</SelectItem>
                            {csvFieldOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium">Duplicate handling:</Label>
                    <Select value={duplicateHandling} onValueChange={(v: "skip" | "update") => setDuplicateHandling(v)}>
                      <SelectTrigger className="mt-2" data-testid="select-duplicate-handling">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skip">Skip duplicates (by email)</SelectItem>
                        <SelectItem value="update">Update existing contacts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setImportStep("upload")}>Back</Button>
                    <Button
                      className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                      onClick={handleImport}
                      disabled={importContactsMutation.isPending}
                      data-testid="btn-run-import"
                    >
                      {importContactsMutation.isPending ? "Importing..." : `Import ${csvData.rows.length} Contacts`}
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" onClick={exportContacts} data-testid="btn-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white" size="sm" data-testid="btn-add-contact">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>Enter the contact details below.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => createContactMutation.mutate(data))} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} data-testid="input-first-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} data-testid="input-last-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Marketing Manager" {...field} data-testid="input-job-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="lifecycleStage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lifecycle Stage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-lifecycle-stage">
                                <SelectValue placeholder="Select stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lifecycleStages.map((stage) => (
                                <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leadSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lead Source</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-lead-source">
                                <SelectValue placeholder="Select source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {leadSources.map((source) => (
                                <SelectItem key={source.value} value={source.value}>{source.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                      disabled={createContactMutation.isPending}
                      data-testid="btn-save-contact"
                    >
                      {createContactMutation.isPending ? "Saving..." : "Save Contact"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="border-[#22C55E]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Stage:</Label>
                <Select value={selectedStage} onValueChange={(v) => { setSelectedStage(v); setPage(1); }}>
                  <SelectTrigger className="w-40" data-testid="filter-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {lifecycleStages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Source:</Label>
                <Select value={selectedSource} onValueChange={(v) => { setSelectedSource(v); setPage(1); }}>
                  <SelectTrigger className="w-40" data-testid="filter-source">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {leadSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>{source.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing {contacts.length} of {total} contacts
          {hasActiveFilters && " (filtered)"}
        </span>
        {totalPages > 1 && (
          <span>Page {page} of {totalPages}</span>
        )}
      </div>

      {/* Contact Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox 
                    checked={contacts.length > 0 && selectedContacts.size === contacts.length}
                    onCheckedChange={toggleSelectAll}
                    data-testid="checkbox-select-all"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-4 py-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {hasActiveFilters ? "No contacts match your filters" : "No contacts yet"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {hasActiveFilters ? "Try adjusting your filters" : "Add your first contact to get started"}
                    </p>
                    {!hasActiveFilters && (
                      <Button 
                        onClick={() => setShowAddDialog(true)}
                        className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Contact
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    data-testid={`contact-row-${contact.id}`}
                  >
                    <td className="px-4 py-4">
                      <Checkbox 
                        checked={selectedContacts.has(contact.id)}
                        onCheckedChange={() => toggleSelectContact(contact.id)}
                        data-testid={`checkbox-contact-${contact.id}`}
                      />
                    </td>
                    <td className="px-4 py-4" onClick={() => setSelectedContactId(contact.id)}>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                            {(contact.firstName?.[0] || "") + (contact.lastName?.[0] || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white block hover:text-[#22C55E]" data-testid={`link-contact-name-${contact.id}`}>
                            {contact.firstName} {contact.lastName}
                          </span>
                          {contact.jobTitle && (
                            <span className="text-xs text-gray-500">{contact.jobTitle}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{contact.email || "-"}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{contact.phone || "-"}</td>
                    <td className="px-4 py-4">
                      <Badge 
                        variant="outline"
                        className={cn(
                          contact.lifecycleStage === "customer" && "border-[#22C55E] text-[#22C55E]",
                          contact.lifecycleStage === "opportunity" && "border-blue-500 text-blue-500",
                          contact.lifecycleStage === "lead" && "border-yellow-500 text-yellow-500"
                        )}
                      >
                        {contact.lifecycleStage || "Lead"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" data-testid={`btn-contact-menu-${contact.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedContactId(contact.id)} data-testid={`btn-view-details-${contact.id}`}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                          <DropdownMenuItem>Create Task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => deleteContactsMutation.mutate([contact.id])}
                          >
                            Delete Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            data-testid="btn-prev-page"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page <= 3 ? i + 1 : page + i - 2;
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                  className={pageNum === page ? "bg-[#22C55E] hover:bg-[#16A34A]" : ""}
                  data-testid={`btn-page-${pageNum}`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            data-testid="btn-next-page"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

interface CrmCompany {
  id: number;
  name: string;
  domain: string | null;
  industry: string | null;
  size: string | null;
  revenue: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  type: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  domain: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().optional(),
  type: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companyFormSchema>;

function CompanyDetailView({ companyId, onBack }: { companyId: number; onBack: () => void }) {
  const { toast } = useToast();
  
  const { data: company, isLoading } = useQuery<CrmCompany>({
    queryKey: [`/api/crm/companies/${companyId}`],
    enabled: companyId !== null,
  });
  
  const buildContactsUrl = () => {
    const params = new URLSearchParams();
    params.set("companyId", companyId.toString());
    params.set("limit", "100");
    return `/api/crm/contacts?${params.toString()}`;
  };
  
  const { data: contactsData } = useQuery<{ contacts: CrmContact[]; total: number }>({
    queryKey: [buildContactsUrl()],
  });
  
  const { data: dealsData } = useQuery<{ deals: CrmDeal[]; total: number }>({
    queryKey: [`/api/crm/deals?companyId=${companyId}&limit=10`],
  });
  
  const { data: notesData } = useQuery<{ notes: CrmNote[] }>({
    queryKey: [`/api/crm/notes?companyId=${companyId}&limit=20`],
  });
  
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  
  const addNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/crm/notes", {
        companyId,
        content,
        noteType: "general",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/crm/notes?companyId=${companyId}&limit=20`] });
      setShowNoteDialog(false);
      setNoteContent("");
      toast({ title: "Note added", description: "Note has been saved to this company." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add note", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Company not found</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Back to Companies
        </Button>
      </div>
    );
  }

  const contacts = contactsData?.contacts || [];
  const deals = dealsData?.deals || [];
  const notes = notesData?.notes || [];

  return (
    <div className="space-y-6" data-testid="company-detail-view">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} data-testid="btn-back-to-companies">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Companies
        </Button>
      </div>
      
      {/* Company header card */}
      <Card data-testid="company-header">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[#22C55E]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="company-name">
                  {company.name}
                </h1>
                <Badge className={cn(
                  "capitalize",
                  company.type === "customer" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                  company.type === "partner" ? "bg-blue-100 text-blue-800" :
                  company.type === "vendor" ? "bg-purple-100 text-purple-800" :
                  "bg-gray-100 text-gray-800"
                )}>
                  {company.type || "Prospect"}
                </Badge>
              </div>
              {company.industry && (
                <p className="text-gray-600 dark:text-gray-400">{company.industry}</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                {company.size && <span>{company.size} employees</span>}
                {company.domain && (
                  <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" 
                     className="text-[#22C55E] hover:underline flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {company.domain}
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowNoteDialog(true)} data-testid="btn-add-company-note">
                <FileText className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Info + Contacts */}
        <div className="space-y-6">
          {/* Company Information */}
          <Card data-testid="company-info-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {company.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${company.email}`} className="text-sm text-[#22C55E] hover:underline">
                    {company.email}
                  </a>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{company.phone}</span>
                </div>
              )}
              {company.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={company.website.startsWith("http") ? company.website : `https://${company.website}`} 
                     target="_blank" rel="noopener noreferrer" className="text-sm text-[#22C55E] hover:underline">
                    {company.website}
                  </a>
                </div>
              )}
              {(company.city || company.state) && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {[company.city, company.state, company.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              {company.linkedinUrl && (
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                  <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#22C55E] hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Industry</span>
                <span className="text-sm font-medium">{company.industry || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Size</span>
                <span className="text-sm font-medium">{company.size || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Revenue</span>
                <span className="text-sm font-medium">{company.revenue || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm font-medium">
                  {new Date(company.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle column - Contacts */}
        <div className="space-y-6">
          <Card data-testid="company-contacts-card">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Contacts ({contacts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <div className="text-center py-6">
                  <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No contacts linked</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                          {(contact.firstName?.[0] || "")}{(contact.lastName?.[0] || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {contact.jobTitle || contact.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deals */}
          <Card data-testid="company-deals-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Deals ({deals.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {deals.length === 0 ? (
                <div className="text-center py-6">
                  <DollarSign className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No deals yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {deals.map((deal) => (
                    <div key={deal.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{deal.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {deal.status || "open"}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#22C55E] font-medium">
                        ${parseFloat(deal.amount || "0").toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column - Notes */}
        <div className="space-y-6">
          <Card data-testid="company-notes-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Notes ({notes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {notes.length === 0 ? (
                <div className="text-center py-6">
                  <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No notes yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{note.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>Add a note to this company record.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your note..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={4}
              data-testid="input-company-note-content"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => addNoteMutation.mutate(noteContent)}
              disabled={!noteContent.trim() || addNoteMutation.isPending}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
              data-testid="btn-save-company-note"
            >
              {addNoteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CompaniesView() {
  const { toast } = useToast();
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const pageSize = 20;

  const buildCompaniesUrl = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedType !== "all") params.set("type", selectedType);
    params.set("limit", pageSize.toString());
    params.set("offset", ((page - 1) * pageSize).toString());
    return `/api/crm/companies?${params.toString()}`;
  };

  const { data: companiesData, isLoading } = useQuery<{ companies: CrmCompany[]; total: number }>({
    queryKey: [buildCompaniesUrl()],
  });

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      domain: "",
      industry: "",
      size: "",
      phone: "",
      email: "",
      website: "",
      type: "prospect",
    },
  });

  const createCompanyMutation = useMutation({
    mutationFn: async (data: CompanyFormData) => {
      return apiRequest("POST", "/api/crm/companies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => 
        typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/crm/companies')
      });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setShowAddDialog(false);
      form.reset();
      toast({ title: "Company created", description: "New company has been added successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create company", variant: "destructive" });
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    createCompanyMutation.mutate(data);
  };

  // If a company is selected, show detail view (must be after all hooks)
  if (selectedCompanyId !== null) {
    return <CompanyDetailView companyId={selectedCompanyId} onBack={() => setSelectedCompanyId(null)} />;
  }

  const companies = companiesData?.companies || [];
  const totalCompanies = companiesData?.total || 0;
  const totalPages = Math.ceil(totalCompanies / pageSize);

  return (
    <div className="space-y-6" data-testid="companies-view">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Companies</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalCompanies} {totalCompanies === 1 ? "company" : "companies"}
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white" data-testid="btn-add-company">
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
              <DialogDescription>Create a new company record.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} data-testid="input-company-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <FormControl>
                        <Input placeholder="acme.com" {...field} data-testid="input-company-domain" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-company-industry">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="professional_services">Professional Services</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-company-size">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201-500">201-500</SelectItem>
                            <SelectItem value="500+">500+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || "prospect"}>
                        <FormControl>
                          <SelectTrigger data-testid="select-company-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="prospect">Prospect</SelectItem>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="partner">Partner</SelectItem>
                          <SelectItem value="vendor">Vendor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="info@acme.com" {...field} data-testid="input-company-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 555-0123" {...field} data-testid="input-company-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createCompanyMutation.isPending}
                    className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                    data-testid="btn-save-company"
                  >
                    {createCompanyMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Create Company
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="pl-10"
            data-testid="input-search-companies"
          />
        </div>
        <Select value={selectedType} onValueChange={(v) => { setSelectedType(v); setPage(1); }}>
          <SelectTrigger className="w-40" data-testid="select-company-type-filter">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="partner">Partner</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Company Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No companies yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Add your first company to get started.</p>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Industry</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Size</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Created</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {companies.map((company) => (
                  <tr 
                    key={company.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    data-testid={`company-row-${company.id}`}
                    onClick={() => setSelectedCompanyId(company.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-[#22C55E]" />
                        </div>
                        <div>
                          <p 
                            className="font-medium text-gray-900 dark:text-white hover:text-[#22C55E]"
                            data-testid={`link-company-name-${company.id}`}
                          >
                            {company.name}
                          </p>
                          {company.domain && (
                            <p className="text-xs text-gray-500">{company.domain}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {company.industry?.replace(/_/g, " ") || "—"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {company.size || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cn(
                        "capitalize",
                        company.type === "customer" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                        company.type === "partner" ? "bg-blue-100 text-blue-800" :
                        company.type === "vendor" ? "bg-purple-100 text-purple-800" :
                        "bg-gray-100 text-gray-800"
                      )}>
                        {company.type || "Prospect"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(company.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedCompanyId(company.id)}
                        data-testid={`btn-view-company-${company.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, totalCompanies)} of {totalCompanies}
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              data-testid="btn-prev-company-page"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-testid="btn-next-company-page"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function PipelineView() {
  const { toast } = useToast();
  const [showAddDealDialog, setShowAddDealDialog] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<CrmDealWithDetails | null>(null);
  const [showDealDetail, setShowDealDetail] = useState(false);
  const [draggedDealId, setDraggedDealId] = useState<number | null>(null);
  const [selectedPipelineId, setSelectedPipelineId] = useState<number | null>(null);

  const { data: pipelinesData, isLoading: pipelinesLoading } = useQuery<CrmPipeline[]>({
    queryKey: ["/api/crm/pipelines"],
  });

  const { data: dealsData, isLoading: dealsLoading, refetch: refetchDeals } = useQuery<{ deals: CrmDealWithDetails[]; total: number }>({
    queryKey: ["/api/crm/deals?limit=500"],
  });

  const { data: contactsData } = useQuery<{ contacts: CrmContact[]; total: number }>({
    queryKey: ["/api/crm/contacts?limit=200"],
  });

  const { data: companiesData } = useQuery<{ companies: CrmCompany[]; total: number }>({
    queryKey: ["/api/crm/companies?limit=200"],
  });

  const createPipelineMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      return apiRequest("POST", "/api/crm/pipelines", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/pipelines") });
      toast({ title: "Pipeline created" });
    },
  });

  const createDealMutation = useMutation({
    mutationFn: async (data: { name: string; amount?: string; contactId?: number; companyId?: number; pipelineId: number; stageId: number; expectedCloseDate?: string }) => {
      return apiRequest("POST", "/api/crm/deals", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/deals") });
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/stats") });
      setShowAddDealDialog(false);
      toast({ title: "Deal created" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create deal", description: error.message, variant: "destructive" });
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number; stageId?: number; status?: string }) => {
      return apiRequest("PATCH", `/api/crm/deals/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/deals") });
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/stats") });
    },
  });

  const pipelines = pipelinesData || [];
  const deals = dealsData?.deals || [];
  const contacts = contactsData?.contacts || [];
  const companies = companiesData?.companies || [];

  const activePipeline = pipelines.find(p => selectedPipelineId ? p.id === selectedPipelineId : p.isDefault) || pipelines[0];
  const stages = activePipeline?.stages?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];

  const dealsByStage = useMemo(() => {
    const grouped: Record<number, CrmDealWithDetails[]> = {};
    stages.forEach(stage => { grouped[stage.id] = []; });
    deals.forEach(deal => {
      if (deal.stageId && grouped[deal.stageId]) {
        grouped[deal.stageId].push(deal);
      }
    });
    return grouped;
  }, [deals, stages]);

  const stageStats = useMemo(() => {
    return stages.map(stage => {
      const stageDeals = dealsByStage[stage.id] || [];
      const totalValue = stageDeals.reduce((sum, d) => sum + (parseFloat(d.amount || "0") || 0), 0);
      const weightedValue = totalValue * ((stage.probability || 0) / 100);
      return { stage, count: stageDeals.length, totalValue, weightedValue };
    });
  }, [stages, dealsByStage]);

  const totalPipelineValue = stageStats.reduce((sum, s) => sum + s.totalValue, 0);
  const totalWeightedValue = stageStats.reduce((sum, s) => sum + s.weightedValue, 0);

  const handleDragStart = (e: React.DragEvent, dealId: number) => {
    e.dataTransfer.setData("dealId", dealId.toString());
    setDraggedDealId(dealId);
  };

  const handleDragEnd = () => {
    setDraggedDealId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetStageId: number) => {
    e.preventDefault();
    const dealId = parseInt(e.dataTransfer.getData("dealId"));
    if (dealId && dealId !== draggedDealId) return;
    
    const deal = deals.find(d => d.id === dealId);
    if (deal && deal.stageId !== targetStageId) {
      const targetStage = stages.find(s => s.id === targetStageId);
      await updateDealMutation.mutateAsync({ 
        id: dealId, 
        stageId: targetStageId,
        status: targetStage?.stageType === "won" ? "won" : targetStage?.stageType === "lost" ? "lost" : "open"
      });
      toast({ title: `Deal moved to ${targetStage?.name}` });
    }
    setDraggedDealId(null);
  };

  const dealFormSchema = z.object({
    name: z.string().min(1, "Deal name is required"),
    amount: z.string().optional(),
    contactId: z.string().optional(),
    companyId: z.string().optional(),
    expectedCloseDate: z.string().optional(),
  });

  const dealForm = useForm<z.infer<typeof dealFormSchema>>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: { name: "", amount: "", contactId: "", companyId: "", expectedCloseDate: "" },
  });

  const handleCreateDeal = (values: z.infer<typeof dealFormSchema>) => {
    if (!activePipeline || stages.length === 0) {
      toast({ title: "No pipeline available", variant: "destructive" });
      return;
    }
    const firstActiveStage = stages.find(s => s.stageType === "active") || stages[0];
    createDealMutation.mutate({
      name: values.name,
      amount: values.amount || undefined,
      contactId: values.contactId ? parseInt(values.contactId) : undefined,
      companyId: values.companyId ? parseInt(values.companyId) : undefined,
      pipelineId: activePipeline.id,
      stageId: firstActiveStage.id,
      expectedCloseDate: values.expectedCloseDate || undefined,
    });
  };

  if (pipelinesLoading || dealsLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="pipeline-loading">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
      </div>
    );
  }

  if (pipelines.length === 0) {
    return (
      <div className="text-center py-12" data-testid="pipeline-empty">
        <Kanban className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Pipelines Yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Create your first sales pipeline to start tracking deals</p>
        <Button 
          className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
          onClick={() => createPipelineMutation.mutate({ name: "Sales Pipeline", description: "Default sales pipeline" })}
          disabled={createPipelineMutation.isPending}
          data-testid="btn-create-pipeline"
        >
          {createPipelineMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
          Create Pipeline
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="pipeline-view">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sales Pipeline</h2>
          {pipelines.length > 1 && (
            <Select 
              value={activePipeline?.id?.toString()} 
              onValueChange={(val) => setSelectedPipelineId(parseInt(val))}
            >
              <SelectTrigger className="w-48" data-testid="select-pipeline">
                <SelectValue placeholder="Select pipeline" />
              </SelectTrigger>
              <SelectContent>
                {pipelines.map(p => (
                  <SelectItem key={p.id} value={p.id.toString()} data-testid={`pipeline-option-${p.id}`}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Button 
          className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
          onClick={() => setShowAddDealDialog(true)}
          data-testid="btn-add-deal"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Forecast Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card data-testid="stat-total-deals">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{deals.length}</div>
            <p className="text-sm text-gray-500">Total Deals</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-pipeline-value">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${totalPipelineValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500">Pipeline Value</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-weighted-value">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-[#22C55E]">${totalWeightedValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500">Weighted Forecast</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-avg-deal">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${deals.length > 0 ? Math.round(totalPipelineValue / deals.length).toLocaleString() : 0}
            </div>
            <p className="text-sm text-gray-500">Avg Deal Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4" data-testid="kanban-board">
        <div className="flex gap-4 min-w-max">
          {stages.map((stage) => {
            const stageDeals = dealsByStage[stage.id] || [];
            const stageValue = stageDeals.reduce((sum, d) => sum + (parseFloat(d.amount || "0") || 0), 0);
            return (
              <div 
                key={stage.id}
                className="w-72 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-lg"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
                data-testid={`stage-column-${stage.id}`}
              >
                {/* Stage Header */}
                <div 
                  className="p-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg"
                  style={{ borderTopColor: stage.color || "#3B82F6", borderTopWidth: "3px" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white" data-testid={`stage-name-${stage.id}`}>
                        {stage.name}
                      </span>
                      <Badge variant="secondary" className="text-xs" data-testid={`stage-count-${stage.id}`}>
                        {stageDeals.length}
                      </Badge>
                    </div>
                    {stage.probability !== null && (
                      <span className="text-xs text-gray-500">{stage.probability}%</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ${stageValue.toLocaleString()}
                  </div>
                </div>

                {/* Deals */}
                <div className="p-2 space-y-2 min-h-[200px]" data-testid={`stage-deals-${stage.id}`}>
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => { setSelectedDeal(deal); setShowDealDetail(true); }}
                      className={cn(
                        "p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow",
                        draggedDealId === deal.id && "opacity-50"
                      )}
                      data-testid={`deal-card-${deal.id}`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white text-sm mb-1" data-testid={`deal-name-${deal.id}`}>
                        {deal.name}
                      </div>
                      {deal.amount && (
                        <div className="flex items-center gap-1 text-sm text-[#22C55E] font-semibold mb-2">
                          <DollarSign className="w-3 h-3" />
                          {parseFloat(deal.amount).toLocaleString()}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {deal.contact && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {deal.contact.firstName} {deal.contact.lastName}
                          </span>
                        )}
                        {deal.company && (
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {deal.company.name}
                          </span>
                        )}
                      </div>
                      {deal.expectedCloseDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(deal.expectedCloseDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm" data-testid={`stage-empty-${stage.id}`}>
                      Drop deals here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Deal Dialog */}
      <Dialog open={showAddDealDialog} onOpenChange={setShowAddDealDialog}>
        <DialogContent data-testid="add-deal-dialog">
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
            <DialogDescription>Create a new deal in your pipeline</DialogDescription>
          </DialogHeader>
          <Form {...dealForm}>
            <form onSubmit={dealForm.handleSubmit(handleCreateDeal)} className="space-y-4">
              <FormField
                control={dealForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Website Redesign Project" {...field} data-testid="input-deal-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} data-testid="input-deal-amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealForm.control}
                name="contactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-deal-contact">
                          <SelectValue placeholder="Select a contact" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contacts.map(c => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.firstName} {c.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealForm.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-deal-company">
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map(c => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealForm.control}
                name="expectedCloseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Close Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-deal-close-date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddDealDialog(false)}>Cancel</Button>
                <Button 
                  type="submit" 
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                  disabled={createDealMutation.isPending}
                  data-testid="btn-save-deal"
                >
                  {createDealMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Create Deal
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Deal Detail Dialog */}
      <Dialog open={showDealDetail} onOpenChange={setShowDealDetail}>
        <DialogContent className="max-w-lg" data-testid="deal-detail-dialog">
          {selectedDeal && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDeal.name}</DialogTitle>
                <DialogDescription>Deal Details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Amount</Label>
                    <p className="text-lg font-semibold text-[#22C55E]">
                      ${selectedDeal.amount ? parseFloat(selectedDeal.amount).toLocaleString() : "0"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Status</Label>
                    <Badge variant={selectedDeal.status === "won" ? "default" : selectedDeal.status === "lost" ? "destructive" : "secondary"}>
                      {selectedDeal.status || "open"}
                    </Badge>
                  </div>
                </div>

                {selectedDeal.description && (
                  <div>
                    <Label className="text-xs text-gray-500">Description</Label>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedDeal.description}</p>
                  </div>
                )}

                {selectedDeal.contact && (
                  <div>
                    <Label className="text-xs text-gray-500">Contact</Label>
                    <p className="text-sm">{selectedDeal.contact.firstName} {selectedDeal.contact.lastName}</p>
                  </div>
                )}

                {selectedDeal.company && (
                  <div>
                    <Label className="text-xs text-gray-500">Company</Label>
                    <p className="text-sm">{selectedDeal.company.name}</p>
                  </div>
                )}

                {selectedDeal.expectedCloseDate && (
                  <div>
                    <Label className="text-xs text-gray-500">Expected Close Date</Label>
                    <p className="text-sm">{new Date(selectedDeal.expectedCloseDate).toLocaleDateString()}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 text-[#22C55E] border-[#22C55E]"
                    onClick={async () => {
                      const wonStage = stages.find(s => s.stageType === "won");
                      if (wonStage) {
                        await updateDealMutation.mutateAsync({ id: selectedDeal.id, stageId: wonStage.id, status: "won" });
                        setShowDealDetail(false);
                        toast({ title: "Deal marked as won!" });
                      }
                    }}
                    disabled={updateDealMutation.isPending}
                    data-testid="btn-mark-won"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Mark Won
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={async () => {
                      const lostStage = stages.find(s => s.stageType === "lost");
                      if (lostStage) {
                        await updateDealMutation.mutateAsync({ id: selectedDeal.id, stageId: lostStage.id, status: "lost" });
                        setShowDealDetail(false);
                        toast({ title: "Deal marked as lost" });
                      }
                    }}
                    disabled={updateDealMutation.isPending}
                    data-testid="btn-mark-lost"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Mark Lost
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TasksView() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CrmTask | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const buildTasksUrl = () => {
    const params = new URLSearchParams();
    params.append("limit", "200");
    if (statusFilter !== "all") params.append("status", statusFilter);
    return `/api/crm/tasks?${params.toString()}`;
  };

  const { data: tasksData, isLoading: tasksLoading } = useQuery<{ tasks: CrmTask[]; total: number }>({
    queryKey: [buildTasksUrl()],
  });

  const { data: contactsData } = useQuery<{ contacts: CrmContact[]; total: number }>({
    queryKey: ["/api/crm/contacts?limit=200"],
  });

  const { data: companiesData } = useQuery<{ companies: CrmCompany[]; total: number }>({
    queryKey: ["/api/crm/companies?limit=200"],
  });

  const { data: dealsData } = useQuery<{ deals: CrmDeal[]; total: number }>({
    queryKey: ["/api/crm/deals?limit=200"],
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: { title: string; description?: string; taskType?: string; priority?: string; dueDate?: string; contactId?: number; companyId?: number; dealId?: number }) => {
      return apiRequest("POST", "/api/crm/tasks", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/tasks") });
      setShowAddTaskDialog(false);
      toast({ title: "Task created" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create task", description: error.message, variant: "destructive" });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number; status?: string; title?: string; description?: string; priority?: string; dueDate?: string | null }) => {
      return apiRequest("PATCH", `/api/crm/tasks/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/tasks") });
      setSelectedTask(null);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/crm/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/tasks") });
      setSelectedTask(null);
      toast({ title: "Task deleted" });
    },
  });

  const tasks = tasksData?.tasks || [];
  const contacts = contactsData?.contacts || [];
  const companies = companiesData?.companies || [];
  const deals = dealsData?.deals || [];

  const filteredTasks = tasks.filter(task => {
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
    return true;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const overdueTasks = filteredTasks.filter(t => t.status !== "completed" && t.dueDate && new Date(t.dueDate) < today);
  const todayTasks = filteredTasks.filter(t => t.status !== "completed" && t.dueDate && new Date(t.dueDate) >= today && new Date(t.dueDate) < tomorrow);
  const upcomingTasks = filteredTasks.filter(t => t.status !== "completed" && t.dueDate && new Date(t.dueDate) >= tomorrow && new Date(t.dueDate) < nextWeek);
  const laterTasks = filteredTasks.filter(t => t.status !== "completed" && (!t.dueDate || new Date(t.dueDate) >= nextWeek));
  const completedTasks = filteredTasks.filter(t => t.status === "completed");

  const getContactName = (contactId: number | null) => {
    if (!contactId) return null;
    const contact = contacts.find(c => c.id === contactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : null;
  };

  const getCompanyName = (companyId: number | null) => {
    if (!companyId) return null;
    const company = companies.find(c => c.id === companyId);
    return company?.name || null;
  };

  const getDealName = (dealId: number | null) => {
    if (!dealId) return null;
    const deal = deals.find(d => d.id === dealId);
    return deal?.name || null;
  };

  const taskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    taskType: z.string().default("task"),
    priority: z.string().default("medium"),
    dueDate: z.string().optional(),
    contactId: z.string().optional(),
    companyId: z.string().optional(),
    dealId: z.string().optional(),
  });

  const taskForm = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { title: "", description: "", taskType: "task", priority: "medium", dueDate: "", contactId: "", companyId: "", dealId: "" },
  });

  const handleCreateTask = (values: z.infer<typeof taskFormSchema>) => {
    createTaskMutation.mutate({
      title: values.title,
      description: values.description || undefined,
      taskType: values.taskType,
      priority: values.priority,
      dueDate: values.dueDate || undefined,
      contactId: values.contactId && values.contactId !== "none" ? parseInt(values.contactId) : undefined,
      companyId: values.companyId && values.companyId !== "none" ? parseInt(values.companyId) : undefined,
      dealId: values.dealId && values.dealId !== "none" ? parseInt(values.dealId) : undefined,
    });
  };

  const handleToggleComplete = (task: CrmTask) => {
    updateTaskMutation.mutate({
      id: task.id,
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "urgent": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTaskTypeIcon = (taskType: string | null) => {
    switch (taskType) {
      case "call": return <Phone className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "meeting": return <Users className="w-4 h-4" />;
      case "follow_up": return <Clock className="w-4 h-4" />;
      default: return <CheckSquare className="w-4 h-4" />;
    }
  };

  const TaskCard = ({ task }: { task: CrmTask }) => (
    <div
      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${task.status === "completed" ? "opacity-60" : ""}`}
      onClick={() => setSelectedTask(task)}
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); handleToggleComplete(task); }}
          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${task.status === "completed" ? "bg-[#22C55E] border-[#22C55E] text-white" : "border-gray-300 hover:border-[#22C55E]"}`}
          data-testid={`task-checkbox-${task.id}`}
        >
          {task.status === "completed" && <Check className="w-3 h-3" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-400">{getTaskTypeIcon(task.taskType)}</span>
            <span className={`font-medium text-sm ${task.status === "completed" ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </span>
          </div>
          {task.description && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-1">{task.description}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {task.priority && (
              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
            )}
            {task.dueDate && (
              <span className={`text-xs flex items-center gap-1 ${new Date(task.dueDate) < today && task.status !== "completed" ? "text-red-500" : "text-gray-500"}`}>
                <Calendar className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {task.contactId && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <User className="w-3 h-3" />
                {getContactName(task.contactId)}
              </span>
            )}
            {task.companyId && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Building className="w-3 h-3" />
                {getCompanyName(task.companyId)}
              </span>
            )}
            {task.dealId && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {getDealName(task.dealId)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const TaskSection = ({ title, tasks, color }: { title: string; tasks: CrmTask[]; color: string }) => {
    if (tasks.length === 0) return null;
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
          <Badge variant="outline" className="text-xs">{tasks.length}</Badge>
        </div>
        <div className="space-y-2">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    );
  };

  const calendarStartOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
  const calendarEndOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
  const daysInMonth = calendarEndOfMonth.getDate();
  const startDayOfWeek = calendarStartOfMonth.getDay();

  const getTasksForDate = (date: Date) => {
    return filteredTasks.filter(t => {
      if (!t.dueDate) return false;
      const taskDate = new Date(t.dueDate);
      return taskDate.getFullYear() === date.getFullYear() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getDate() === date.getDate();
    });
  };

  if (tasksLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="tasks-loading">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="tasks-view">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage follow-ups, calls, and to-dos</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#22C55E] hover:bg-[#16A34A]" : ""}
              data-testid="btn-view-list"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-[#22C55E] hover:bg-[#16A34A]" : ""}
              data-testid="btn-view-calendar"
            >
              <CalendarDays className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => setShowAddTaskDialog(true)}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
            data-testid="btn-add-task"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40" data-testid="select-priority-filter">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <span className="text-sm text-gray-500">{filteredTasks.length} tasks</span>
      </div>

      {viewMode === "list" ? (
        <div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tasks yet</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Create your first task to stay organized</p>
              <Button onClick={() => setShowAddTaskDialog(true)} className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          ) : (
            <>
              <TaskSection title="Overdue" tasks={overdueTasks} color="bg-red-500" />
              <TaskSection title="Today" tasks={todayTasks} color="bg-[#22C55E]" />
              <TaskSection title="This Week" tasks={upcomingTasks} color="bg-blue-500" />
              <TaskSection title="Later" tasks={laterTasks} color="bg-gray-400" />
              {statusFilter === "all" && <TaskSection title="Completed" tasks={completedTasks} color="bg-gray-300" />}
            </>
          )}
        </div>
      ) : (
        <Card data-testid="calendar-view">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="font-semibold">
                {calendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-gray-50 dark:bg-gray-800 rounded-lg" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), i + 1);
                const dayTasks = getTasksForDate(date);
                const isToday = date.toDateString() === today.toDateString();
                return (
                  <div
                    key={i}
                    className={`h-24 p-1 rounded-lg border overflow-hidden ${isToday ? "border-[#22C55E] bg-[#22C55E]/5" : "border-gray-200 dark:border-gray-700"}`}
                  >
                    <div className={`text-xs font-medium mb-1 ${isToday ? "text-[#22C55E]" : "text-gray-600 dark:text-gray-400"}`}>
                      {i + 1}
                    </div>
                    <div className="space-y-0.5">
                      {dayTasks.slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          className={`text-xs truncate px-1 py-0.5 rounded cursor-pointer ${task.status === "completed" ? "bg-gray-100 text-gray-400 line-through" : "bg-[#22C55E]/10 text-[#22C55E]"}`}
                          onClick={() => setSelectedTask(task)}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-gray-400 px-1">+{dayTasks.length - 3} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent className="max-w-lg" data-testid="add-task-dialog">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new task or follow-up</DialogDescription>
          </DialogHeader>
          <Form {...taskForm}>
            <form onSubmit={taskForm.handleSubmit(handleCreateTask)} className="space-y-4">
              <FormField
                control={taskForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Call to follow up..." {...field} data-testid="input-task-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={taskForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional details..." {...field} data-testid="input-task-description" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={taskForm.control}
                  name="taskType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-task-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="task">Task</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="follow_up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={taskForm.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-task-priority">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={taskForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-task-due-date" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={taskForm.control}
                  name="contactId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-task-contact">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {contacts.map(contact => (
                            <SelectItem key={contact.id} value={contact.id.toString()}>
                              {contact.firstName} {contact.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={taskForm.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-task-company">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {companies.map(company => (
                            <SelectItem key={company.id} value={company.id.toString()}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={taskForm.control}
                  name="dealId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-task-deal">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {deals.map(deal => (
                            <SelectItem key={deal.id} value={deal.id.toString()}>
                              {deal.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddTaskDialog(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createTaskMutation.isPending}
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                  data-testid="btn-save-task"
                >
                  {createTaskMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Task"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className="max-w-lg" data-testid="task-detail-dialog">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-gray-400">{getTaskTypeIcon(selectedTask.taskType)}</span>
                  {selectedTask.title}
                </DialogTitle>
                <DialogDescription>
                  Created {new Date(selectedTask.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedTask.description && (
                  <div>
                    <Label className="text-sm text-gray-500">Description</Label>
                    <p className="mt-1">{selectedTask.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Status</Label>
                    <Badge className={selectedTask.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                      {selectedTask.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Priority</Label>
                    <Badge className={getPriorityColor(selectedTask.priority)}>
                      {selectedTask.priority}
                    </Badge>
                  </div>
                </div>
                {selectedTask.dueDate && (
                  <div>
                    <Label className="text-sm text-gray-500">Due Date</Label>
                    <p className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedTask.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-4">
                  {selectedTask.contactId && (
                    <div>
                      <Label className="text-sm text-gray-500">Contact</Label>
                      <p className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4" />
                        {getContactName(selectedTask.contactId)}
                      </p>
                    </div>
                  )}
                  {selectedTask.companyId && (
                    <div>
                      <Label className="text-sm text-gray-500">Company</Label>
                      <p className="flex items-center gap-2 mt-1">
                        <Building className="w-4 h-4" />
                        {getCompanyName(selectedTask.companyId)}
                      </p>
                    </div>
                  )}
                  {selectedTask.dealId && (
                    <div>
                      <Label className="text-sm text-gray-500">Deal</Label>
                      <p className="flex items-center gap-2 mt-1">
                        <DollarSign className="w-4 h-4" />
                        {getDealName(selectedTask.dealId)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTaskMutation.mutate(selectedTask.id)}
                  disabled={deleteTaskMutation.isPending}
                  data-testid="btn-delete-task"
                >
                  {deleteTaskMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                </Button>
                <Button
                  onClick={() => handleToggleComplete(selectedTask)}
                  disabled={updateTaskMutation.isPending}
                  className={selectedTask.status === "completed" ? "" : "bg-[#22C55E] hover:bg-[#16A34A] text-white"}
                  data-testid="btn-toggle-complete"
                >
                  {updateTaskMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : selectedTask.status === "completed" ? (
                    "Mark Incomplete"
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SchedulerView() {
  const { toast } = useToast();
  const [showAddAppointmentDialog, setShowAddAppointmentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<CrmAppointment | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: appointmentsData, isLoading: appointmentsLoading } = useQuery<{ appointments: CrmAppointment[] }>({
    queryKey: ["/api/crm/appointments?limit=200"],
  });

  const { data: contactsData } = useQuery<{ contacts: CrmContact[]; total: number }>({
    queryKey: ["/api/crm/contacts?limit=200"],
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: { title: string; description?: string; startTime: string; endTime: string; appointmentType?: string; location?: string; meetingUrl?: string; contactId?: number }) => {
      return apiRequest("POST", "/api/crm/appointments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/appointments") });
      setShowAddAppointmentDialog(false);
      toast({ title: "Appointment scheduled" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to schedule appointment", description: error.message, variant: "destructive" });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number; status?: string }) => {
      return apiRequest("PATCH", `/api/crm/appointments/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/appointments") });
      setSelectedAppointment(null);
      toast({ title: "Appointment updated" });
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/crm/appointments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => (query.queryKey[0] as string).startsWith("/api/crm/appointments") });
      setSelectedAppointment(null);
      toast({ title: "Appointment deleted" });
    },
  });

  const appointments = appointmentsData?.appointments || [];
  const contacts = contactsData?.contacts || [];

  const getContactName = (contactId: number | null) => {
    if (!contactId) return null;
    const contact = contacts.find(c => c.id === contactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : null;
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700 border-green-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      case "completed": return "bg-gray-100 text-gray-700 border-gray-200";
      case "no_show": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getTypeIcon = (type: string | null) => {
    switch (type) {
      case "call": return <Phone className="w-4 h-4" />;
      case "demo": return <Eye className="w-4 h-4" />;
      case "consultation": return <Users className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const appointmentFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    appointmentType: z.string().default("meeting"),
    location: z.string().optional(),
    meetingUrl: z.string().optional(),
    contactId: z.string().optional(),
  });

  const appointmentForm = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: { title: "", description: "", date: "", startTime: "09:00", endTime: "10:00", appointmentType: "meeting", location: "", meetingUrl: "", contactId: "" },
  });

  const handleCreateAppointment = (values: z.infer<typeof appointmentFormSchema>) => {
    const startDateTime = new Date(`${values.date}T${values.startTime}`);
    const endDateTime = new Date(`${values.date}T${values.endTime}`);
    createAppointmentMutation.mutate({
      title: values.title,
      description: values.description || undefined,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      appointmentType: values.appointmentType,
      location: values.location || undefined,
      meetingUrl: values.meetingUrl || undefined,
      contactId: values.contactId && values.contactId !== "none" ? parseInt(values.contactId) : undefined,
    });
  };

  const calendarStartOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDayOfWeek = calendarStartOfMonth.getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return aptDate.getFullYear() === date.getFullYear() &&
             aptDate.getMonth() === date.getMonth() &&
             aptDate.getDate() === date.getDate();
    });
  };

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.startTime) >= today && apt.status !== "cancelled")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 10);

  if (appointmentsLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="scheduler-loading">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="scheduler-view">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scheduler</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage appointments and meetings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-[#22C55E] hover:bg-[#16A34A]" : ""}
              data-testid="btn-view-calendar-scheduler"
            >
              <CalendarDays className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#22C55E] hover:bg-[#16A34A]" : ""}
              data-testid="btn-view-list-scheduler"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => setShowAddAppointmentDialog(true)}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
            data-testid="btn-add-appointment"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2" data-testid="scheduler-calendar">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-semibold">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                  const dayAppointments = getAppointmentsForDate(date);
                  const isToday = date.toDateString() === today.toDateString();
                  return (
                    <div
                      key={i}
                      className={`h-20 p-1 rounded-lg border overflow-hidden ${isToday ? "border-[#22C55E] bg-[#22C55E]/5" : "border-gray-200 dark:border-gray-700"}`}
                    >
                      <div className={`text-xs font-medium mb-1 ${isToday ? "text-[#22C55E]" : "text-gray-600 dark:text-gray-400"}`}>
                        {i + 1}
                      </div>
                      <div className="space-y-0.5">
                        {dayAppointments.slice(0, 2).map(apt => (
                          <div
                            key={apt.id}
                            className="text-xs truncate px-1 py-0.5 rounded cursor-pointer bg-[#22C55E]/10 text-[#22C55E]"
                            onClick={() => setSelectedAppointment(apt)}
                          >
                            {new Date(apt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} {apt.title}
                          </div>
                        ))}
                        {dayAppointments.length > 2 && (
                          <div className="text-xs text-gray-400 px-1">+{dayAppointments.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="upcoming-appointments">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-6">
                  <CalendarDays className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No upcoming appointments</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map(apt => (
                    <div
                      key={apt.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setSelectedAppointment(apt)}
                      data-testid={`appointment-card-${apt.id}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">{getTypeIcon(apt.appointmentType)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{apt.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(apt.startTime).toLocaleDateString()} at {new Date(apt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          {apt.contactId && (
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <User className="w-3 h-3" />
                              {getContactName(apt.contactId)}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card data-testid="scheduler-list">
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No appointments yet</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Schedule your first appointment</p>
                <Button onClick={() => setShowAddAppointmentDialog(true)} className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {appointments.map(apt => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="text-gray-400">{getTypeIcon(apt.appointmentType)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{apt.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(apt.startTime).toLocaleDateString()} {new Date(apt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(apt.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {apt.contactId && (
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {getContactName(apt.contactId)}
                      </div>
                    )}
                    <Badge variant="outline" className={getStatusColor(apt.status)}>
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={showAddAppointmentDialog} onOpenChange={setShowAddAppointmentDialog}>
        <DialogContent className="max-w-lg" data-testid="add-appointment-dialog">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>Create a new appointment or meeting</DialogDescription>
          </DialogHeader>
          <Form {...appointmentForm}>
            <form onSubmit={appointmentForm.handleSubmit(handleCreateAppointment)} className="space-y-4">
              <FormField
                control={appointmentForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Sales call with..." {...field} data-testid="input-appointment-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={appointmentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Meeting details..." {...field} data-testid="input-appointment-description" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={appointmentForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} data-testid="input-appointment-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={appointmentForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} data-testid="input-appointment-start" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={appointmentForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} data-testid="input-appointment-end" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={appointmentForm.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-appointment-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="demo">Demo</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={appointmentForm.control}
                  name="contactId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-appointment-contact">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {contacts.map(contact => (
                            <SelectItem key={contact.id} value={contact.id.toString()}>
                              {contact.firstName} {contact.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={appointmentForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Office, conference room..." {...field} data-testid="input-appointment-location" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={appointmentForm.control}
                name="meetingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://zoom.us/..." {...field} data-testid="input-appointment-url" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddAppointmentDialog(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createAppointmentMutation.isPending}
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                  data-testid="btn-save-appointment"
                >
                  {createAppointmentMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Schedule"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAppointment} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
        <DialogContent className="max-w-lg" data-testid="appointment-detail-dialog">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-gray-400">{getTypeIcon(selectedAppointment.appointmentType)}</span>
                  {selectedAppointment.title}
                </DialogTitle>
                <DialogDescription>
                  <Badge variant="outline" className={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-500">Date & Time</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedAppointment.startTime).toLocaleDateString()} {new Date(selectedAppointment.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(selectedAppointment.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {selectedAppointment.description && (
                  <div>
                    <Label className="text-sm text-gray-500">Description</Label>
                    <p className="mt-1">{selectedAppointment.description}</p>
                  </div>
                )}
                {selectedAppointment.contactId && (
                  <div>
                    <Label className="text-sm text-gray-500">Contact</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {getContactName(selectedAppointment.contactId)}
                    </p>
                  </div>
                )}
                {selectedAppointment.location && (
                  <div>
                    <Label className="text-sm text-gray-500">Location</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedAppointment.location}
                    </p>
                  </div>
                )}
                {selectedAppointment.meetingUrl && (
                  <div>
                    <Label className="text-sm text-gray-500">Meeting Link</Label>
                    <a href={selectedAppointment.meetingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-2 text-[#22C55E] hover:underline">
                      <Globe className="w-4 h-4" />
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteAppointmentMutation.mutate(selectedAppointment.id)}
                  disabled={deleteAppointmentMutation.isPending}
                  data-testid="btn-delete-appointment"
                >
                  {deleteAppointmentMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                </Button>
                <div className="flex gap-2">
                  {selectedAppointment.status === "scheduled" && (
                    <Button
                      variant="outline"
                      onClick={() => updateAppointmentMutation.mutate({ id: selectedAppointment.id, status: "confirmed" })}
                      disabled={updateAppointmentMutation.isPending}
                      data-testid="btn-confirm-appointment"
                    >
                      {updateAppointmentMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm"}
                    </Button>
                  )}
                  {(selectedAppointment.status === "scheduled" || selectedAppointment.status === "confirmed") && (
                    <Button
                      onClick={() => updateAppointmentMutation.mutate({ id: selectedAppointment.id, status: "completed" })}
                      disabled={updateAppointmentMutation.isPending}
                      className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                      data-testid="btn-complete-appointment"
                    >
                      {updateAppointmentMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Mark Complete"}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface TimelineEvent {
  id: number;
  contactId: number | null;
  companyId: number | null;
  dealId: number | null;
  eventType: string;
  eventSubtype: string | null;
  title: string;
  description: string | null;
  sourceApp: string | null;
  sourceEntityType: string | null;
  occurredAt: string;
  actorType: string | null;
}

function TimelineView() {
  const { data: timelineData, isLoading } = useQuery<{ events: TimelineEvent[] }>({
    queryKey: ["/api/crm/timeline"],
  });

  const events = timelineData?.events || [];

  const getEventIcon = (eventType: string, sourceApp: string | null) => {
    switch (eventType) {
      case 'contact_created':
        return <UserPlus className="w-4 h-4" />;
      case 'assessment_started':
        return <BarChart2 className="w-4 h-4" />;
      case 'portal_login':
        return <LogIn className="w-4 h-4" />;
      case 'deal_created':
      case 'deal_stage_changed':
        return <DollarSign className="w-4 h-4" />;
      case 'note_added':
        return <FileText className="w-4 h-4" />;
      case 'task_created':
      case 'task_completed':
        return <CheckSquare className="w-4 h-4" />;
      case 'email_sent':
        return <Send className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getSourceAppColor = (sourceApp: string | null) => {
    switch (sourceApp) {
      case 'relationships': return 'bg-[#22C55E]/10 text-[#22C55E]';
      case 'send': return 'bg-blue-100 text-blue-600';
      case 'inbox': return 'bg-purple-100 text-purple-600';
      case 'livechat': return 'bg-orange-100 text-orange-600';
      case 'content': return 'bg-pink-100 text-pink-600';
      case 'listings': return 'bg-red-100 text-red-600';
      case 'reputation': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Activity Timeline</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          All customer interactions across apps will appear here
        </p>
        <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
          Performance Tier Feature
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="timeline-view">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Timeline</h2>
          <p className="text-sm text-gray-500">Unified view of all customer interactions</p>
        </div>
        <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
          Performance Tier
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {events.map((event, index) => (
              <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" data-testid={`timeline-event-${event.id}`}>
                <div className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", getSourceAppColor(event.sourceApp))}>
                    {getEventIcon(event.eventType, event.sourceApp)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimeAgo(event.occurredAt)}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {event.sourceApp && (
                        <Badge variant="outline" className="text-xs">
                          /{event.sourceApp}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {event.eventType.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// AUTOMATIONS VIEW
// ============================================================================

interface CrmAutomation {
  id: number;
  clientId: number | null;
  name: string;
  description: string | null;
  triggerType: string;
  triggerConfig: Record<string, any>;
  isActive: boolean | null;
  runCount: number | null;
  lastRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CrmAutomationStep {
  id: number;
  automationId: number;
  stepOrder: number;
  stepType: string;
  config: Record<string, any>;
  conditionType: string | null;
  conditionConfig: Record<string, any>;
  createdAt: string;
}

// Note: Only triggers with backend dispatcher wiring are shown
const TRIGGER_TYPES = [
  { value: "contact_created", label: "Contact Created", description: "When a new contact is added" },
  { value: "deal_stage_changed", label: "Deal Stage Changed", description: "When a deal moves stages" },
  { value: "deal_won", label: "Deal Won", description: "When a deal is marked as won" },
  { value: "deal_lost", label: "Deal Lost", description: "When a deal is marked as lost" },
  { value: "manual", label: "Manual Trigger", description: "Run manually via Run Now" },
];

const STEP_TYPES = [
  { value: "wait", label: "Wait", icon: Clock },
  { value: "update_contact", label: "Update Contact", icon: User },
  { value: "add_tag", label: "Add Tag", icon: Tag },
  { value: "remove_tag", label: "Remove Tag", icon: X },
  { value: "create_task", label: "Create Task", icon: CheckSquare },
  { value: "add_to_segment", label: "Add to Segment", icon: Users },
  { value: "send_email", label: "Send Email", icon: Mail },
  { value: "webhook", label: "Webhook", icon: Globe },
];

function AutomationsView() {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<CrmAutomation | null>(null);
  const [showStepsDialog, setShowStepsDialog] = useState(false);
  const [editingSteps, setEditingSteps] = useState<{ stepType: string; config: Record<string, any> }[]>([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTriggerType, setNewTriggerType] = useState("contact_created");

  const { data: automationsData, isLoading } = useQuery<{ automations: CrmAutomation[] }>({
    queryKey: ["/api/crm/automations"],
  });
  
  // Fetch steps when editing
  const { data: automationDetail } = useQuery<{ automation: CrmAutomation; steps: CrmAutomationStep[] }>({
    queryKey: ["/api/crm/automations", selectedAutomation?.id],
    enabled: !!selectedAutomation && showStepsDialog,
  });

  const automations = automationsData?.automations || [];

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; description: string; triggerType: string }) => {
      return apiRequest("POST", "/api/crm/automations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/automations"] });
      setShowCreateDialog(false);
      setNewName("");
      setNewDescription("");
      setNewTriggerType("contact_created");
      toast({ title: "Automation created", description: "Your automation workflow is ready to configure." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create automation", variant: "destructive" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return apiRequest("PATCH", `/api/crm/automations/${id}`, { isActive });
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/automations"] });
      toast({ title: vars.isActive ? "Automation activated" : "Automation paused" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/crm/automations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/automations"] });
      toast({ title: "Automation deleted" });
    },
  });

  const triggerMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("POST", `/api/crm/automations/${id}/trigger`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/automations"] });
      toast({ title: "Automation triggered", description: "The automation is now running." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to trigger automation", variant: "destructive" });
    },
  });

  const saveStepsMutation = useMutation({
    mutationFn: async ({ automationId, steps }: { automationId: number; steps: { stepType: string; config: Record<string, any> }[] }) => {
      return apiRequest("POST", `/api/crm/automations/${automationId}/steps`, { steps });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/automations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/automations", selectedAutomation?.id] });
      setShowStepsDialog(false);
      setSelectedAutomation(null);
      setEditingSteps([]);
      toast({ title: "Steps saved", description: "Automation workflow updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save steps", variant: "destructive" });
    },
  });

  const openStepsDialog = (automation: CrmAutomation) => {
    setSelectedAutomation(automation);
    setEditingSteps([]);
    setShowStepsDialog(true);
  };

  // Sync steps when automationDetail loads
  const currentSteps = automationDetail?.steps || [];
  if (showStepsDialog && currentSteps.length > 0 && editingSteps.length === 0) {
    setEditingSteps(currentSteps.map(s => ({ stepType: s.stepType, config: s.config || {} })));
  }

  const addStep = (stepType: string) => {
    setEditingSteps([...editingSteps, { stepType, config: {} }]);
  };

  const removeStep = (index: number) => {
    setEditingSteps(editingSteps.filter((_, i) => i !== index));
  };

  const updateStepConfig = (index: number, key: string, value: string) => {
    const updated = [...editingSteps];
    updated[index] = { ...updated[index], config: { ...updated[index].config, [key]: value } };
    setEditingSteps(updated);
  };

  const getStepLabel = (stepType: string) => {
    return STEP_TYPES.find(s => s.value === stepType)?.label || stepType;
  };

  const getStepIcon = (stepType: string) => {
    return STEP_TYPES.find(s => s.value === stepType)?.icon || Clock;
  };

  const getTriggerLabel = (triggerType: string) => {
    return TRIGGER_TYPES.find(t => t.value === triggerType)?.label || triggerType;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="automations-loading">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="automations-view">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Automation Workflows</h2>
          <p className="text-gray-500 dark:text-gray-400">Automate follow-ups, sequences, and actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
            Performance Tier
          </Badge>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white" data-testid="btn-create-automation">
                <Plus className="w-4 h-4 mr-2" />
                Create Automation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Automation</DialogTitle>
                <DialogDescription>Set up a new workflow to automate your CRM processes.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    placeholder="Welcome new contacts"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    data-testid="input-automation-name"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe what this automation does..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    data-testid="input-automation-description"
                  />
                </div>
                <div>
                  <Label>Trigger</Label>
                  <Select value={newTriggerType} onValueChange={setNewTriggerType}>
                    <SelectTrigger data-testid="select-trigger-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TRIGGER_TYPES.map((trigger) => (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          <div className="flex flex-col items-start">
                            <span>{trigger.label}</span>
                            <span className="text-xs text-gray-500">{trigger.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                <Button
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                  onClick={() => createMutation.mutate({ 
                    name: newName, 
                    description: newDescription, 
                    triggerType: newTriggerType 
                  })}
                  disabled={!newName.trim() || createMutation.isPending}
                  data-testid="btn-save-automation"
                >
                  {createMutation.isPending ? "Creating..." : "Create Automation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {automations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No automations yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Create your first automation to streamline your workflows.
            </p>
            <Button
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
              onClick={() => setShowCreateDialog(true)}
              data-testid="btn-create-first-automation"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Automation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {automations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-md transition-shadow" data-testid={`automation-card-${automation.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      automation.isActive 
                        ? "bg-[#22C55E]/10" 
                        : "bg-gray-100 dark:bg-gray-800"
                    )}>
                      <Zap className={cn(
                        "w-5 h-5",
                        automation.isActive ? "text-[#22C55E]" : "text-gray-400"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{automation.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="secondary" className="text-xs">
                          {getTriggerLabel(automation.triggerType)}
                        </Badge>
                        <span>•</span>
                        <span>{automation.runCount || 0} runs</span>
                        {automation.lastRunAt && (
                          <>
                            <span>•</span>
                            <span>Last run: {new Date(automation.lastRunAt).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                      {automation.description && (
                        <p className="text-sm text-gray-500 mt-1">{automation.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {automation.triggerType === 'manual' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => triggerMutation.mutate(automation.id)}
                        disabled={triggerMutation.isPending}
                        data-testid={`btn-trigger-${automation.id}`}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Run
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleMutation.mutate({ 
                        id: automation.id, 
                        isActive: !automation.isActive 
                      })}
                      data-testid={`btn-toggle-${automation.id}`}
                    >
                      {automation.isActive ? (
                        <Pause className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Play className="w-4 h-4 text-green-500" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" data-testid={`btn-automation-menu-${automation.id}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openStepsDialog(automation)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure Steps
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => deleteMutation.mutate(automation.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Steps Configuration Dialog */}
      <Dialog open={showStepsDialog} onOpenChange={(open) => {
        setShowStepsDialog(open);
        if (!open) {
          setSelectedAutomation(null);
          setEditingSteps([]);
        }
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Configure Steps - {selectedAutomation?.name}</DialogTitle>
            <DialogDescription>
              Add actions that will execute when this automation triggers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Current Steps */}
            {editingSteps.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                No steps configured. Add steps below.
              </div>
            ) : (
              <div className="space-y-2">
                {editingSteps.map((step, index) => {
                  const StepIcon = getStepIcon(step.stepType);
                  return (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 space-y-2"
                      data-testid={`step-item-${index}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-xs font-medium text-[#22C55E]">
                            {index + 1}
                          </div>
                          <StepIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">{getStepLabel(step.stepType)}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(index)}
                          data-testid={`btn-remove-step-${index}`}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      {/* Step configuration inputs */}
                      {(step.stepType === 'add_tag' || step.stepType === 'remove_tag') && (
                        <Input
                          placeholder="Tag name"
                          value={step.config.tag || ''}
                          onChange={(e) => updateStepConfig(index, 'tag', e.target.value)}
                          className="text-sm"
                          data-testid={`input-step-tag-${index}`}
                        />
                      )}
                      {step.stepType === 'create_task' && (
                        <Input
                          placeholder="Task title"
                          value={step.config.title || ''}
                          onChange={(e) => updateStepConfig(index, 'title', e.target.value)}
                          className="text-sm"
                          data-testid={`input-step-title-${index}`}
                        />
                      )}
                      {step.stepType === 'wait' && (
                        <Input
                          placeholder="Duration (e.g., 1 day, 2 hours)"
                          value={step.config.duration || ''}
                          onChange={(e) => updateStepConfig(index, 'duration', e.target.value)}
                          className="text-sm"
                          data-testid={`input-step-duration-${index}`}
                        />
                      )}
                      {step.stepType === 'send_email' && (
                        <Input
                          placeholder="Email subject"
                          value={step.config.subject || ''}
                          onChange={(e) => updateStepConfig(index, 'subject', e.target.value)}
                          className="text-sm"
                          data-testid={`input-step-subject-${index}`}
                        />
                      )}
                      {step.stepType === 'webhook' && (
                        <Input
                          placeholder="Webhook URL"
                          value={step.config.url || ''}
                          onChange={(e) => updateStepConfig(index, 'url', e.target.value)}
                          className="text-sm"
                          data-testid={`input-step-url-${index}`}
                        />
                      )}
                      {step.stepType === 'add_to_segment' && (
                        <Input
                          placeholder="Segment ID"
                          value={step.config.segmentId || ''}
                          onChange={(e) => updateStepConfig(index, 'segmentId', e.target.value)}
                          className="text-sm"
                          data-testid={`input-step-segmentId-${index}`}
                        />
                      )}
                      {step.stepType === 'update_contact' && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Field name (e.g., lifecycleStage)"
                            value={step.config.field || ''}
                            onChange={(e) => updateStepConfig(index, 'field', e.target.value)}
                            className="text-sm flex-1"
                            data-testid={`input-step-field-${index}`}
                          />
                          <Input
                            placeholder="New value"
                            value={step.config.value || ''}
                            onChange={(e) => updateStepConfig(index, 'value', e.target.value)}
                            className="text-sm flex-1"
                            data-testid={`input-step-value-${index}`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add Step */}
            <div>
              <Label className="text-sm font-medium">Add Step</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {STEP_TYPES.map((step) => (
                  <Button
                    key={step.value}
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => addStep(step.value)}
                    data-testid={`btn-add-step-${step.value}`}
                  >
                    <step.icon className="w-4 h-4 mr-2" />
                    {step.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStepsDialog(false)}>Cancel</Button>
            <Button
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
              onClick={() => {
                if (selectedAutomation) {
                  saveStepsMutation.mutate({ automationId: selectedAutomation.id, steps: editingSteps });
                }
              }}
              disabled={saveStepsMutation.isPending}
              data-testid="btn-save-steps"
            >
              {saveStepsMutation.isPending ? "Saving..." : "Save Steps"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Automation step types reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Available Step Types</CardTitle>
          <CardDescription>Actions you can add to your automation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STEP_TYPES.map((step) => (
              <div 
                key={step.value} 
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                data-testid={`step-type-${step.value}`}
              >
                <step.icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{step.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AnalyticsData {
  summary: {
    totalContacts: number;
    totalDeals: number;
    pipelineValue: number;
    winRate: number;
    avgDealValue: number;
    openDeals: number;
    wonDeals: number;
    lostDeals: number;
  };
  lifecycleDistribution: { stage: string | null; count: number }[];
  dealsByStatus: { status: string; count: number; totalValue: number }[];
  pipelineBreakdown: { stageName: string | null; stageId: number | null; count: number; totalValue: number }[];
  leadSources: { source: string | null; count: number }[];
  activityTrend: { date: string; count: number }[];
  taskStats: { status: string; count: number }[];
}

function AnalyticsView() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/crm/analytics"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="analytics-loading">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12" data-testid="analytics-error">
        <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unable to load analytics</h2>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  const { summary, lifecycleDistribution, pipelineBreakdown, leadSources, taskStats } = analytics;

  const lifecycleColors: Record<string, string> = {
    subscriber: "#6366F1",
    lead: "#22C55E",
    opportunity: "#F59E0B",
    customer: "#3B82F6",
    evangelist: "#8B5CF6",
    other: "#9CA3AF",
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="space-y-6" data-testid="analytics-view">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">Customer lifecycle and deal forecasting insights</p>
        </div>
        <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
          Performance Tier
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-testid="stat-total-contacts">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.totalContacts}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-pipeline-value">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(summary.pipelineValue)}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-win-rate">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.winRate}%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-avg-deal">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg Deal Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(summary.avgDealValue)}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card data-testid="stat-open-deals">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Timer className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.openDeals}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open Deals</p>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-won-deals">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.wonDeals}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Won Deals</p>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-lost-deals">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.lostDeals}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Lost Deals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer Lifecycle Distribution */}
        <Card data-testid="chart-lifecycle">
          <CardHeader>
            <CardTitle className="text-base">Customer Lifecycle</CardTitle>
            <CardDescription>Contact distribution by stage</CardDescription>
          </CardHeader>
          <CardContent>
            {lifecycleDistribution.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No contacts yet</div>
            ) : (
              <div className="space-y-3">
                {lifecycleDistribution.map((item) => {
                  const stage = item.stage || 'unknown';
                  const percentage = summary.totalContacts > 0 
                    ? (item.count / summary.totalContacts) * 100 
                    : 0;
                  return (
                    <div key={stage} className="space-y-1" data-testid={`lifecycle-${stage}`}>
                      <div className="flex justify-between text-sm">
                        <span className="capitalize text-gray-700 dark:text-gray-300">{stage}</span>
                        <span className="text-gray-500">{item.count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: lifecycleColors[stage] || lifecycleColors.other
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pipeline Breakdown */}
        <Card data-testid="chart-pipeline">
          <CardHeader>
            <CardTitle className="text-base">Pipeline Breakdown</CardTitle>
            <CardDescription>Open deals by stage</CardDescription>
          </CardHeader>
          <CardContent>
            {pipelineBreakdown.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No open deals in pipeline</div>
            ) : (
              <div className="space-y-3">
                {pipelineBreakdown.map((item, index) => {
                  const totalPipelineCount = pipelineBreakdown.reduce((sum, p) => sum + p.count, 0);
                  const percentage = totalPipelineCount > 0 
                    ? (item.count / totalPipelineCount) * 100 
                    : 0;
                  const stageColors = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"];
                  return (
                    <div key={item.stageId || index} className="space-y-1" data-testid={`pipeline-stage-${item.stageId}`}>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{item.stageName || 'Unknown Stage'}</span>
                        <span className="text-gray-500">{item.count} deals • {formatCurrency(item.totalValue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: stageColors[index % stageColors.length]
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card data-testid="chart-lead-sources">
          <CardHeader>
            <CardTitle className="text-base">Lead Sources</CardTitle>
            <CardDescription>Where your contacts come from</CardDescription>
          </CardHeader>
          <CardContent>
            {leadSources.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No lead source data</div>
            ) : (
              <div className="space-y-2">
                {leadSources.slice(0, 6).map((item) => {
                  const source = item.source || 'unknown';
                  const totalLeads = leadSources.reduce((sum, s) => sum + s.count, 0);
                  const percentage = totalLeads > 0 ? (item.count / totalLeads) * 100 : 0;
                  return (
                    <div key={source} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800" data-testid={`source-${source}`}>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{source.replace(/_/g, ' ')}</span>
                      </div>
                      <Badge variant="secondary">{item.count} ({percentage.toFixed(0)}%)</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Task Stats */}
        <Card data-testid="chart-tasks">
          <CardHeader>
            <CardTitle className="text-base">Task Overview</CardTitle>
            <CardDescription>Task completion status</CardDescription>
          </CardHeader>
          <CardContent>
            {taskStats.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No tasks yet</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {taskStats.map((item) => {
                  const statusColors: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
                    completed: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600", icon: CheckCircle },
                    pending: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600", icon: Clock },
                    in_progress: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600", icon: Timer },
                    cancelled: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600", icon: XCircle },
                  };
                  const config = statusColors[item.status] || statusColors.pending;
                  const Icon = config.icon;
                  return (
                    <div key={item.status} className={cn("p-3 rounded-lg", config.bg)} data-testid={`task-${item.status}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={cn("w-4 h-4", config.text)} />
                        <span className={cn("text-sm font-medium capitalize", config.text)}>
                          {item.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.count}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface CrmLeadForm {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  fields: { name: string; label: string; type: string; required: boolean }[];
  buttonText: string | null;
  successMessage: string | null;
  defaultLifecycleStage: string | null;
  defaultLeadSource: string | null;
  submissionCount: number | null;
  isActive: boolean | null;
  createdAt: string;
}

function SettingsView() {
  const { toast } = useToast();
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [showEmbedCode, setShowEmbedCode] = useState<CrmLeadForm | null>(null);

  const { data: formsData, isLoading } = useQuery<{ forms: CrmLeadForm[] }>({
    queryKey: ["/api/crm/forms"],
  });

  const forms = formsData?.forms || [];

  const createFormMutation = useMutation({
    mutationFn: async (data: { name: string; slug: string }) => {
      return apiRequest("POST", "/api/crm/forms", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/forms"] });
      setShowFormBuilder(false);
      setFormName("");
      setFormSlug("");
      toast({ title: "Form created", description: "Your lead capture form is ready to use." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create form", variant: "destructive" });
    },
  });

  const deleteFormMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/crm/forms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/forms"] });
      toast({ title: "Form deleted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete form", variant: "destructive" });
    },
  });

  const toggleFormMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return apiRequest("PATCH", `/api/crm/forms/${id}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/forms"] });
    },
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const getEmbedCode = (form: CrmLeadForm) => {
    const baseUrl = window.location.origin;
    return `<iframe 
  src="${baseUrl}/embed/form/${form.slug}" 
  width="100%" 
  height="400" 
  frameborder="0"
  style="border: none; max-width: 500px;">
</iframe>`;
  };

  return (
    <div className="space-y-6" data-testid="settings-view">
      <Card>
        <CardHeader>
          <CardTitle>CRM Settings</CardTitle>
          <CardDescription>Manage your /relationships configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Pipeline Stages</h3>
              <p className="text-sm text-gray-500">Customize your deal stages</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Custom Fields</h3>
              <p className="text-sm text-gray-500">Add custom properties to contacts</p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">App Integrations</h3>
              <p className="text-sm text-gray-500">Connect /relationships with other apps</p>
            </div>
            <Badge className="bg-[#22C55E]/10 text-[#22C55E]">Performance</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lead Capture Forms</CardTitle>
            <CardDescription>Create embeddable forms to capture leads on your website</CardDescription>
          </div>
          <Dialog open={showFormBuilder} onOpenChange={setShowFormBuilder}>
            <DialogTrigger asChild>
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white" size="sm" data-testid="btn-create-form">
                <Plus className="w-4 h-4 mr-2" />
                Create Form
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Lead Form</DialogTitle>
                <DialogDescription>Set up a new form to capture leads on your website.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Form Name *</Label>
                  <Input
                    placeholder="Contact Us Form"
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      setFormSlug(generateSlug(e.target.value));
                    }}
                    data-testid="input-form-name"
                  />
                </div>
                <div>
                  <Label>URL Slug</Label>
                  <Input
                    placeholder="contact-us"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    data-testid="input-form-slug"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used in embed URLs</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowFormBuilder(false)}>Cancel</Button>
                <Button
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                  onClick={() => createFormMutation.mutate({ name: formName, slug: formSlug })}
                  disabled={!formName.trim() || !formSlug.trim() || createFormMutation.isPending}
                  data-testid="btn-save-form"
                >
                  {createFormMutation.isPending ? "Creating..." : "Create Form"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No forms yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create your first lead capture form to start collecting contacts.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {forms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-4 border rounded-lg" data-testid={`form-row-${form.id}`}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      form.isActive ? "bg-green-500" : "bg-gray-400"
                    )} />
                    <div>
                      <h4 className="font-medium">{form.name}</h4>
                      <p className="text-sm text-gray-500">/{form.slug} • {form.submissionCount || 0} submissions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEmbedCode(form)}
                      data-testid={`btn-embed-${form.id}`}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Embed
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFormMutation.mutate({ id: form.id, isActive: !form.isActive })}
                    >
                      {form.isActive ? <Eye className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFormMutation.mutate(form.id)}
                      className="text-red-600 hover:text-red-700"
                      data-testid={`btn-delete-form-${form.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!showEmbedCode} onOpenChange={() => setShowEmbedCode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Embed Form: {showEmbedCode?.name}</DialogTitle>
            <DialogDescription>Copy this code to embed the form on your website.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                {showEmbedCode && getEmbedCode(showEmbedCode)}
              </pre>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (showEmbedCode) {
                  navigator.clipboard.writeText(getEmbedCode(showEmbedCode));
                  toast({ title: "Copied", description: "Embed code copied to clipboard" });
                }
              }}
              data-testid="btn-copy-embed"
            >
              Copy to Clipboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

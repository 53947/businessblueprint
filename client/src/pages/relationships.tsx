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
  Settings, 
  Plus, 
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
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
  Check
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import relationshipsIcon from "@assets/__relationships_1766748093805.png";

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
  jobTitle: string | null;
  lifecycleStage: string | null;
  lastActivityDate: string | null;
  createdAt: string;
}

interface CrmTask {
  id: number;
  title: string;
  taskType: string;
  status: string;
  priority: string;
  dueDate: string | null;
}

type Section = "dashboard" | "contacts" | "companies" | "pipeline" | "tasks" | "timeline" | "analytics" | "settings";

const sidebarItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { id: "contacts" as const, label: "Contacts", icon: Users },
  { id: "companies" as const, label: "Companies", icon: Building2 },
  { id: "pipeline" as const, label: "Pipeline", icon: Kanban },
  { id: "tasks" as const, label: "Tasks", icon: CheckSquare },
  { id: "timeline" as const, label: "Timeline", icon: History },
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
          {activeSection === "timeline" && <TimelineView />}
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

function ContactsView() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
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
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                            {(contact.firstName?.[0] || "") + (contact.lastName?.[0] || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white block">
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
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

function CompaniesView() {
  return (
    <div className="text-center py-12">
      <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Companies</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Track business accounts and their contacts</p>
      <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
        <Plus className="w-4 h-4 mr-2" />
        Add Company
      </Button>
    </div>
  );
}

function PipelineView() {
  return (
    <div className="text-center py-12">
      <Kanban className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sales Pipeline</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Visualize and manage your deals through stages</p>
      <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
        <Plus className="w-4 h-4 mr-2" />
        Create Deal
      </Button>
    </div>
  );
}

function TasksView() {
  return (
    <div className="text-center py-12">
      <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tasks</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Stay organized with follow-up tasks and reminders</p>
      <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
        <Plus className="w-4 h-4 mr-2" />
        Create Task
      </Button>
    </div>
  );
}

function TimelineView() {
  return (
    <div className="text-center py-12">
      <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Activity Timeline</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">View all customer interactions across apps</p>
      <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
        Performance Tier Feature
      </Badge>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="text-center py-12">
      <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Customer lifecycle and deal forecasting insights</p>
      <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
        Performance Tier Feature
      </Badge>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-6">
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
              <h3 className="font-medium">Import/Export</h3>
              <p className="text-sm text-gray-500">Bulk import or export contact data</p>
            </div>
            <Button variant="outline">Open</Button>
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
    </div>
  );
}

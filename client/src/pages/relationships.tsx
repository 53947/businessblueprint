import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
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
                data-testid="btn-add-contact"
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

function ContactsView() {
  const { data: contactsData, isLoading } = useQuery<{ contacts: CrmContact[]; total: number }>({
    queryKey: ["/api/crm/contacts"],
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            All Contacts
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : contactsData?.contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No contacts yet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add your first contact to get started</p>
                  </td>
                </tr>
              ) : (
                contactsData?.contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                            {(contact.firstName?.[0] || "") + (contact.lastName?.[0] || "")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {contact.firstName} {contact.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{contact.email || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{contact.phone || "-"}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{contact.lifecycleStage || "Lead"}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
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

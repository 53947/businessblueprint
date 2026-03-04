import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { routeManifest, getRouteStatus, getRouteStats, getRoutesByCategory, type RouteDefinition, type RouteStatus } from "@shared/routes";
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Users, 
  Mail, 
  Info,
  LogIn,
  Settings,
  Brain,
  Compass,
  Map,
  MapPin,
  Palette,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  ShoppingCart,
  Building2,
  FileText,
  Shield,
  Trash2,
  Search,
  Zap,
  Star,
  Globe,
  Send,
  Inbox,
  MessagesSquare,
  Pencil,
  Store,
  Layout,
  BookOpen,
  Code,
  ExternalLink,
  Check,
  Lock,
  Eye,
  Play
} from "lucide-react";

const statusConfig: Record<RouteStatus, { color: string; label: string; icon: any }> = {
  LIVE: { color: "bg-green-100 text-green-800 border-green-300", label: "Live", icon: Check },
  BUILT: { color: "bg-blue-100 text-blue-800 border-blue-300", label: "Built", icon: Check },
  AUTH: { color: "bg-purple-100 text-purple-800 border-purple-300", label: "Login Required", icon: Lock },
  ADMIN: { color: "bg-orange-100 text-orange-800 border-orange-300", label: "Admin Only", icon: Shield },
  DYNAMIC: { color: "bg-gray-100 text-gray-800 border-gray-300", label: "Dynamic", icon: Zap },
};

const categoryConfig: Record<string, { icon: any; color: string; description: string }> = {
  Public: { icon: Globe, color: "text-green-600", description: "Accessible to everyone" },
  Assessment: { icon: BarChart3, color: "text-blue-600", description: "Business assessment tools" },
  "AI Coach": { icon: Brain, color: "text-purple-600", description: "AI-powered coaching" },
  Pricing: { icon: CreditCard, color: "text-emerald-600", description: "Plans and checkout" },
  Commverse: { icon: MessagesSquare, color: "text-orange-600", description: "Communication suite" },
  LocalBlue: { icon: Building2, color: "text-pink-600", description: "Local business tools" },
  Relationships: { icon: Users, color: "text-blue-600", description: "CRM and customer management" },
  Portal: { icon: Layout, color: "text-indigo-600", description: "Client portal pages" },
  ScansBlue: { icon: BarChart3, color: "text-cyan-600", description: "Website analysis" },
  Resources: { icon: BookOpen, color: "text-amber-600", description: "Documentation & learning" },
  Admin: { icon: Settings, color: "text-red-600", description: "Administrative tools" },
};

const routeIcons: Record<string, any> = {
  "/": Home,
  "/about": Info,
  "/contact": Mail,
  "/sitemap": Compass,
  "/privacy": Shield,
  "/terms": FileText,
  "/data-deletion": Trash2,
  "/journey": MapPin,
  "/tour": Play,
  "/biif": Zap,
  "/connect": Users,
  "/connect/dashboard": Users,
  "/assessment": BarChart3,
  "/dashboard/:id": Map,
  "/find-results": Search,
  "/assessment-checkout": CreditCard,
  "/ai-coach": Brain,
  "/pricing": CreditCard,
  "/subscription": CreditCard,
  "/pathways": MapPin,
  "/marketplace": Store,
  "/marketplace/checkout": ShoppingCart,
  "/cart": ShoppingCart,
  "/checkout": CreditCard,
  "/commverse": MessagesSquare,
  "/commverse-pricing": CreditCard,
  "/promote": Send,
  "/promote-app": Send,
  "/respond": Inbox,
  "/respond/dashboard": Inbox,
  "/engage": MessageSquare,
  "/engage/dashboard": MessageSquare,
  "/engage-demo": MessageSquare,
  "/engage-install": Code,
  "/post": Pencil,
  "/post/dashboard": Pencil,
  "/localblue": Building2,
  "/publish-landing": Globe,
  "/publish-app": Globe,
  "/elevate-landing": Star,
  "/elevate-app": Star,
  "/portal/login": LogIn,
  "/portal/verify": Mail,
  "/portal/test": Settings,
  "/portal/dashboard": Layout,
  "/portal/inbox": Inbox,
  "/portal/prescriptions/:id": FileText,
  "/portal/prescriptions": FileText,
  "/portal/prescription/:token": FileText,
  "/portal": Building2,
  "/portal/assessment/confirmation": Check,
  "/scansblue/purchase": BarChart3,
  "/scansblue/success": Check,
  "/knowledge-base": BookOpen,
  "/api-docs": Code,
  "/admin": Settings,
  "/brand-studio": Palette,
  "/logo-preview": Eye,
};

export default function Sitemap() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(categoryConfig)));
  const [viewMode, setViewMode] = useState<"tree" | "table">("tree");

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const groupedRoutes = getRoutesByCategory();
  const stats = getRouteStats();
  const lastUpdated = "January 11, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header showNavigation={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Compass className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build, grow, and manage your digital presence - all in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total Pages</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.live}</div>
              <div className="text-xs text-green-700">Live</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.built}</div>
              <div className="text-xs text-blue-700">Built</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.auth}</div>
              <div className="text-xs text-purple-700">Auth Required</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.admin}</div>
              <div className="text-xs text-orange-700">Admin Only</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.dynamic}</div>
              <div className="text-xs text-gray-700">Dynamic</div>
            </CardContent>
          </Card>
          <Card className="bg-indigo-50 border-indigo-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.linkedInNav}</div>
              <div className="text-xs text-indigo-700">In Navigation</div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "tree" | "table")} className="mb-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="tree">Tree View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tree" className="mt-6">
            {/* Tree View */}
            <div className="space-y-4">
              {Object.entries(groupedRoutes).map(([category, routes]) => {
                const config = categoryConfig[category] || { icon: ChevronRight, color: "text-gray-600", description: "" };
                const CategoryIcon = config.icon;
                const isExpanded = expandedCategories.has(category);
                
                return (
                  <Card key={category} className="overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 transition-colors py-4"
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className={`w-6 h-6 ${config.color}`} />
                          <div>
                            <CardTitle className="text-lg">{category}</CardTitle>
                            <p className="text-sm text-gray-500">{config.description}</p>
                          </div>
                          <Badge variant="secondary" className="ml-2">{routes.length} pages</Badge>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    
                    {isExpanded && (
                      <CardContent className="pt-0 pb-4">
                        <div className="grid gap-2">
                          {routes.map((route: RouteDefinition) => {
                            const RouteIcon = routeIcons[route.path] || ChevronRight;
                            const status = getRouteStatus(route);
                            const statusCfg = statusConfig[status];
                            const displayPath = route.path.includes(":") ? route.path.replace(/:[\w]+/g, "{id}") : route.path;
                            
                            return (
                              <Link key={route.path} href={route.isDynamic ? "#" : route.path}>
                                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 hover:border-blue-300 transition-all cursor-pointer group">
                                  <RouteIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-medium text-gray-900 group-hover:text-blue-600">{route.name}</span>
                                      {route.badge && (
                                        <Badge variant="secondary" className="text-xs">{route.badge}</Badge>
                                      )}
                                      <Badge className={`text-xs ${statusCfg.color}`}>
                                        {statusCfg.label}
                                      </Badge>
                                      {route.surfacedInNav && (
                                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                                          <Check className="w-3 h-3 mr-1" /> In Nav
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{route.description}</p>
                                    <code className="text-xs text-gray-400 font-mono">{displayPath}</code>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="mt-6">
            {/* Table View */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Route</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Page Name</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-700">In Nav?</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {routeManifest.map((route) => {
                        const status = getRouteStatus(route);
                        const statusCfg = statusConfig[status];
                        const displayPath = route.path.includes(":") ? route.path.replace(/:[\w]+/g, "{id}") : route.path;
                        return (
                          <tr key={route.path} className="hover:bg-gray-50">
                            <td className="p-4">
                              <Link href={route.isDynamic ? "#" : route.path}>
                                <code className="text-sm text-blue-600 hover:underline font-mono">{displayPath}</code>
                              </Link>
                            </td>
                            <td className="p-4 font-medium text-gray-900">
                              {route.name}
                              {route.badge && (
                                <Badge variant="secondary" className="ml-2 text-xs">{route.badge}</Badge>
                              )}
                            </td>
                            <td className="p-4 text-gray-600">{route.category}</td>
                            <td className="p-4">
                              <Badge className={`text-xs ${statusCfg.color}`}>
                                {statusCfg.label}
                              </Badge>
                            </td>
                            <td className="p-4">
                              {route.surfacedInNav ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{route.description}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Legend */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Status Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(statusConfig).map(([status, config]) => {
                const StatusIcon = config.icon;
                return (
                  <div key={status} className="flex items-center gap-2">
                    <Badge className={`${config.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {status === "LIVE" && "Public & in nav"}
                      {status === "BUILT" && "Works, not in nav"}
                      {status === "AUTH" && "Requires login"}
                      {status === "ADMIN" && "Admin access only"}
                      {status === "DYNAMIC" && "Has URL params"}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready to get started? Take our free assessment or{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline font-medium">
              talk to our team
            </Link>
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/assessment">
              <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-start-assessment">
                <BarChart3 className="w-4 h-4 mr-2" />
                Get Your Free Digital IQ Score
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" data-testid="button-return-home">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
          <p>Routes imported from shared/routes.ts manifest (synchronized with App.tsx)</p>
          <p className="mt-1">Last updated: {lastUpdated}</p>
          <p className="mt-2 text-xs">
            <strong>{stats.total}</strong> total | <strong>{stats.live}</strong> live | <strong>{stats.built}</strong> built | <strong>{stats.auth}</strong> auth | <strong>{stats.admin}</strong> admin | <strong>{stats.dynamic}</strong> dynamic | <strong>{stats.linkedInNav}</strong> in nav
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Copy, 
  ExternalLink,
  Shield,
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface Client {
  id: number;
  externalId: string;
  companyName: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  businessCategory?: string;
  enabledFeatures?: string[];
  lastLoginTime?: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch all clients
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  // Compute stats safely
  const totalClients = clients?.length ?? 0;
  const activeAccounts = clients?.filter(c => c.lastLoginTime)?.length ?? 0;

  // Filter clients based on search
  const filteredClients = clients?.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.id.toString().includes(query) ||
      client.companyName?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.externalId?.toLowerCase().includes(query)
    );
  }) || [];

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: `Client ID ${id} copied to clipboard`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const accessClientPortal = (clientId: number) => {
    // Navigate to client login with pre-filled ID
    setLocation(`/client-login?clientId=${clientId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showNavigation={true} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="title-admin-panel">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage all client accounts and access client portals
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-3xl font-bold" data-testid="stat-total-clients">
                  {totalClients}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-green-600" />
                <span className="text-3xl font-bold" data-testid="stat-active-accounts">
                  {activeAccounts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Search Results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-purple-600" />
                <span className="text-3xl font-bold" data-testid="stat-search-results">
                  {filteredClients.length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by Client ID, Company Name, Email, or External ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                data-testid="input-search-clients"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client Accounts ({filteredClients.length})</CardTitle>
            <CardDescription>
              View and manage all client accounts. Click on a client ID to access their portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-12" data-testid="empty-state">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? "No clients found matching your search" : "No clients registered yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Client ID</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id} data-testid={`row-client-${client.id}`}>
                        <TableCell className="font-mono font-medium">
                          <div className="flex items-center gap-2">
                            <span data-testid={`text-client-id-${client.id}`}>{client.id}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(client.id.toString(), client.id)}
                              className="h-6 w-6 p-0"
                              data-testid={`button-copy-${client.id}`}
                            >
                              {copiedId === client.id ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium" data-testid={`text-company-${client.id}`}>
                              {client.companyName}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Globe className="h-3 w-3" />
                              <span data-testid={`text-external-id-${client.id}`}>
                                {client.externalId}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span data-testid={`text-email-${client.id}`}>
                                {client.email}
                              </span>
                            </div>
                            {client.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span data-testid={`text-phone-${client.id}`}>
                                  {client.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {client.lastLoginTime ? (
                            <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100" data-testid={`badge-status-${client.id}`}>
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" data-testid={`badge-status-${client.id}`}>
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => accessClientPortal(client.id)}
                            data-testid={`button-access-portal-${client.id}`}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Access Portal
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Access Card */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">Admin Access</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You can access any client portal by clicking "Access Portal" or navigating to <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">/client-login?clientId=XX</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

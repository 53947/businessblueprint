import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Copy, 
  Check, 
  Key, 
  Shield, 
  Webhook, 
  Users, 
  Building2, 
  Target, 
  CheckSquare,
  Clock,
  Zap,
  ChevronRight,
  Code2,
  BookOpen,
  Terminal
} from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Code examples for different languages
const codeExamples = {
  authentication: {
    curl: `curl -X GET "https://api.businessblueprint.io/api/v1/contacts" \\
  -H "Authorization: Bearer bb_your_api_key_here" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch("https://api.businessblueprint.io/api/v1/contacts", {
  method: "GET",
  headers: {
    "Authorization": "Bearer bb_your_api_key_here",
    "Content-Type": "application/json"
  }
});
const data = await response.json();`,
    python: `import requests

headers = {
    "Authorization": "Bearer bb_your_api_key_here",
    "Content-Type": "application/json"
}
response = requests.get(
    "https://api.businessblueprint.io/api/v1/contacts",
    headers=headers
)
data = response.json()`
  },
  createContact: {
    curl: `curl -X POST "https://api.businessblueprint.io/api/v1/contacts" \\
  -H "Authorization: Bearer bb_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1-555-123-4567",
    "company": "Acme Corp",
    "title": "CEO",
    "tags": ["lead", "enterprise"]
  }'`,
    javascript: `const contact = await fetch("https://api.businessblueprint.io/api/v1/contacts", {
  method: "POST",
  headers: {
    "Authorization": "Bearer bb_your_api_key_here",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1-555-123-4567",
    company: "Acme Corp",
    title: "CEO",
    tags: ["lead", "enterprise"]
  })
});
const data = await contact.json();`,
    python: `import requests

headers = {
    "Authorization": "Bearer bb_your_api_key_here",
    "Content-Type": "application/json"
}
payload = {
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1-555-123-4567",
    "company": "Acme Corp",
    "title": "CEO",
    "tags": ["lead", "enterprise"]
}
response = requests.post(
    "https://api.businessblueprint.io/api/v1/contacts",
    headers=headers,
    json=payload
)
data = response.json()`
  },
  webhookVerification: {
    javascript: `import crypto from "crypto";

function verifyWebhookSignature(payload, signature, timestamp, secret) {
  const signedPayload = \`\${timestamp}.\${JSON.stringify(payload)}\`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Express middleware example
app.post("/webhook", (req, res) => {
  const signature = req.headers["x-webhook-signature"];
  const timestamp = req.headers["x-webhook-timestamp"];
  const webhookId = req.headers["x-webhook-id"];
  
  if (!verifyWebhookSignature(req.body, signature, timestamp, WEBHOOK_SECRET)) {
    return res.status(401).json({ error: "Invalid signature" });
  }
  
  // Process the webhook event
  const { event, data } = req.body;
  console.log(\`Received event: \${event}\`, data);
  
  res.status(200).json({ received: true });
});`,
    python: `import hmac
import hashlib
import json
from flask import Flask, request, jsonify

app = Flask(__name__)
WEBHOOK_SECRET = "your_webhook_secret"

def verify_signature(payload, signature, timestamp, secret):
    signed_payload = f"{timestamp}.{json.dumps(payload, separators=(',', ':'))}"
    expected = hmac.new(
        secret.encode(),
        signed_payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)

@app.route("/webhook", methods=["POST"])
def webhook():
    signature = request.headers.get("X-Webhook-Signature")
    timestamp = request.headers.get("X-Webhook-Timestamp")
    
    if not verify_signature(request.json, signature, timestamp, WEBHOOK_SECRET):
        return jsonify({"error": "Invalid signature"}), 401
    
    event = request.json.get("event")
    data = request.json.get("data")
    print(f"Received event: {event}", data)
    
    return jsonify({"received": True})`
  }
};

// API Endpoints documentation
const endpoints = {
  contacts: [
    {
      method: "GET",
      path: "/api/v1/contacts",
      description: "List all contacts with pagination and filtering",
      scopes: ["read:contacts"],
      params: [
        { name: "limit", type: "number", description: "Max results (default: 50, max: 100)" },
        { name: "offset", type: "number", description: "Pagination offset" },
        { name: "status", type: "string", description: "Filter by status (active, inactive, etc.)" },
        { name: "search", type: "string", description: "Search by email, name, or phone" }
      ]
    },
    {
      method: "POST",
      path: "/api/v1/contacts",
      description: "Create a new contact",
      scopes: ["write:contacts"],
      body: {
        email: "string (required)",
        firstName: "string",
        lastName: "string",
        phone: "string",
        company: "string",
        title: "string",
        tags: "string[]",
        customFields: "object"
      }
    },
    {
      method: "GET",
      path: "/api/v1/contacts/:id",
      description: "Get a specific contact by ID",
      scopes: ["read:contacts"]
    },
    {
      method: "PATCH",
      path: "/api/v1/contacts/:id",
      description: "Update a contact",
      scopes: ["write:contacts"]
    },
    {
      method: "DELETE",
      path: "/api/v1/contacts/:id",
      description: "Delete a contact",
      scopes: ["write:contacts"]
    }
  ],
  companies: [
    {
      method: "GET",
      path: "/api/v1/companies",
      description: "List all companies",
      scopes: ["read:companies"]
    },
    {
      method: "POST",
      path: "/api/v1/companies",
      description: "Create a new company",
      scopes: ["write:companies"]
    },
    {
      method: "GET",
      path: "/api/v1/companies/:id",
      description: "Get a specific company",
      scopes: ["read:companies"]
    },
    {
      method: "PATCH",
      path: "/api/v1/companies/:id",
      description: "Update a company",
      scopes: ["write:companies"]
    }
  ],
  deals: [
    {
      method: "GET",
      path: "/api/v1/deals",
      description: "List all deals with pipeline filtering",
      scopes: ["read:deals"],
      params: [
        { name: "pipelineId", type: "number", description: "Filter by pipeline" },
        { name: "stageId", type: "number", description: "Filter by stage" },
        { name: "status", type: "string", description: "Filter by status (open, won, lost)" }
      ]
    },
    {
      method: "POST",
      path: "/api/v1/deals",
      description: "Create a new deal",
      scopes: ["write:deals"]
    },
    {
      method: "GET",
      path: "/api/v1/deals/:id",
      description: "Get a specific deal",
      scopes: ["read:deals"]
    },
    {
      method: "PATCH",
      path: "/api/v1/deals/:id",
      description: "Update a deal",
      scopes: ["write:deals"]
    }
  ],
  tasks: [
    {
      method: "GET",
      path: "/api/v1/tasks",
      description: "List tasks with filtering",
      scopes: ["read:tasks"]
    },
    {
      method: "POST",
      path: "/api/v1/tasks",
      description: "Create a new task",
      scopes: ["write:tasks"]
    },
    {
      method: "PATCH",
      path: "/api/v1/tasks/:id",
      description: "Update a task",
      scopes: ["write:tasks"]
    }
  ],
  webhooks: [
    {
      method: "GET",
      path: "/api/v1/webhooks",
      description: "List all webhook subscriptions",
      scopes: ["admin:webhooks"]
    },
    {
      method: "POST",
      path: "/api/v1/webhooks",
      description: "Create a webhook subscription",
      scopes: ["admin:webhooks"],
      body: {
        url: "string (required) - The URL to receive webhook events",
        events: "string[] (required) - Events to subscribe to (e.g., ['contact.created', 'deal.won'])"
      }
    },
    {
      method: "DELETE",
      path: "/api/v1/webhooks/:id",
      description: "Delete a webhook subscription",
      scopes: ["admin:webhooks"]
    },
    {
      method: "POST",
      path: "/api/v1/webhooks/:id/rotate-secret",
      description: "Rotate the webhook signing secret",
      scopes: ["admin:webhooks"]
    }
  ]
};

const webhookEvents = [
  { event: "contact.created", description: "Fired when a new contact is created" },
  { event: "contact.updated", description: "Fired when a contact is updated" },
  { event: "contact.deleted", description: "Fired when a contact is deleted" },
  { event: "deal.created", description: "Fired when a new deal is created" },
  { event: "deal.stage_changed", description: "Fired when a deal moves to a new stage" },
  { event: "deal.won", description: "Fired when a deal is marked as won" },
  { event: "deal.lost", description: "Fired when a deal is marked as lost" },
  { event: "*", description: "Subscribe to all events (wildcard)" }
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={copyToClipboard}
        data-testid={`button-copy-${language}`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    PATCH: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    PUT: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  };

  return (
    <Badge className={`${colors[method]} font-mono text-xs`} data-testid={`badge-method-${method.toLowerCase()}`}>
      {method}
    </Badge>
  );
}

function EndpointCard({ endpoint, index }: { endpoint: any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const pathSlug = endpoint.path.replace(/[/:]/g, '-').toLowerCase();

  return (
    <Card className="mb-3" data-testid={`card-endpoint-${endpoint.method.toLowerCase()}-${index}`}>
      <CardHeader 
        className="py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => setExpanded(!expanded)}
        data-testid={`button-toggle-endpoint-${endpoint.method.toLowerCase()}-${index}`}
      >
        <div className="flex items-center gap-3">
          <MethodBadge method={endpoint.method} />
          <code className="text-sm font-mono flex-1" data-testid={`text-endpoint-path-${index}`}>{endpoint.path}</code>
          <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
        <CardDescription className="mt-1 text-sm">{endpoint.description}</CardDescription>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0 border-t">
          <div className="space-y-3 pt-3">
            <div>
              <Label className="text-xs text-gray-500">Required Scopes</Label>
              <div className="flex gap-1 mt-1">
                {endpoint.scopes.map((scope: string) => (
                  <Badge key={scope} variant="outline" className="text-xs font-mono">
                    {scope}
                  </Badge>
                ))}
              </div>
            </div>
            {endpoint.params && (
              <div>
                <Label className="text-xs text-gray-500">Query Parameters</Label>
                <div className="mt-1 space-y-1">
                  {endpoint.params.map((param: any) => (
                    <div key={param.name} className="flex gap-2 text-sm">
                      <code className="text-blue-600 dark:text-blue-400">{param.name}</code>
                      <span className="text-gray-400">({param.type})</span>
                      <span className="text-gray-600 dark:text-gray-400">- {param.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {endpoint.body && (
              <div>
                <Label className="text-xs text-gray-500">Request Body</Label>
                <pre className="mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">
                  {JSON.stringify(endpoint.body, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function ApiDocsPage() {
  const [selectedLang, setSelectedLang] = useState<"curl" | "javascript" | "python">("javascript");

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/relationships" className="hover:text-blue-600" data-testid="link-breadcrumb-relationships">Relationships CRM</Link>
              <span>/</span>
              <span>API Documentation</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold" data-testid="text-api-docs-title">API Reference</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">
                  Build integrations with the BusinessBlueprint CRM API
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Badge variant="outline" className="text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                REST API v1
              </Badge>
              <Badge variant="outline" className="text-sm">Performance Tier Required</Badge>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <nav className="space-y-1">
                    <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">
                      Getting Started
                    </h3>
                    <a href="#authentication" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-auth-section">
                      <Key className="h-4 w-4" />
                      Authentication
                    </a>
                    <a href="#rate-limits" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-rate-limits">
                      <Clock className="h-4 w-4" />
                      Rate Limits
                    </a>
                    
                    <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3 mt-6">
                      Core Resources
                    </h3>
                    <a href="#contacts" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-contacts-section">
                      <Users className="h-4 w-4" />
                      Contacts
                    </a>
                    <a href="#companies" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-companies-section">
                      <Building2 className="h-4 w-4" />
                      Companies
                    </a>
                    <a href="#deals" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-deals-section">
                      <Target className="h-4 w-4" />
                      Deals
                    </a>
                    <a href="#tasks" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-tasks-section">
                      <CheckSquare className="h-4 w-4" />
                      Tasks
                    </a>

                    <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3 mt-6">
                      Webhooks
                    </h3>
                    <a href="#webhooks" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-webhooks-section">
                      <Webhook className="h-4 w-4" />
                      Webhook Setup
                    </a>
                    <a href="#webhook-events" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-webhook-events">
                      <Zap className="h-4 w-4" />
                      Event Types
                    </a>
                    <a href="#webhook-security" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" data-testid="link-webhook-security">
                      <Shield className="h-4 w-4" />
                      Signature Verification
                    </a>
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-12">
                {/* Authentication Section */}
                <section id="authentication">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Key className="h-6 w-6 text-blue-600" />
                        <CardTitle>Authentication</CardTitle>
                      </div>
                      <CardDescription>
                        All API requests require authentication using an API key
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">API Keys</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Generate API keys from your CRM Settings page. Keys are prefixed with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">bb_</code> and 
                          include scoped permissions for different resources.
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            <strong>Security Note:</strong> Keep your API keys secure. Never expose them in 
                            client-side code or public repositories.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Making Requests</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Include your API key in the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Authorization</code> header:
                        </p>
                        
                        <Tabs value={selectedLang} onValueChange={(v) => setSelectedLang(v as any)}>
                          <TabsList>
                            <TabsTrigger value="curl" data-testid="tab-curl">cURL</TabsTrigger>
                            <TabsTrigger value="javascript" data-testid="tab-javascript">JavaScript</TabsTrigger>
                            <TabsTrigger value="python" data-testid="tab-python">Python</TabsTrigger>
                          </TabsList>
                          <TabsContent value="curl" className="mt-4">
                            <CodeBlock code={codeExamples.authentication.curl} language="curl" />
                          </TabsContent>
                          <TabsContent value="javascript" className="mt-4">
                            <CodeBlock code={codeExamples.authentication.javascript} language="javascript" />
                          </TabsContent>
                          <TabsContent value="python" className="mt-4">
                            <CodeBlock code={codeExamples.authentication.python} language="python" />
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Available Scopes</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {[
                            { scope: "read:contacts", desc: "Read contact data" },
                            { scope: "write:contacts", desc: "Create/update contacts" },
                            { scope: "read:companies", desc: "Read company data" },
                            { scope: "write:companies", desc: "Create/update companies" },
                            { scope: "read:deals", desc: "Read deal data" },
                            { scope: "write:deals", desc: "Create/update deals" },
                            { scope: "read:tasks", desc: "Read task data" },
                            { scope: "write:tasks", desc: "Create/update tasks" },
                            { scope: "read:timeline", desc: "Read timeline events" },
                            { scope: "admin:webhooks", desc: "Manage webhooks" }
                          ].map(({ scope, desc }) => (
                            <div key={scope} className="flex items-center gap-2 text-sm">
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{scope}</code>
                              <span className="text-gray-500">- {desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Rate Limits Section */}
                <section id="rate-limits">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-blue-600" />
                        <CardTitle>Rate Limits</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          API requests are rate-limited to ensure fair usage and system stability.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-semibold">Standard Limit</h4>
                            <p className="text-2xl font-bold text-blue-600">100</p>
                            <p className="text-sm text-gray-500">requests per minute</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-semibold">Rate Limit Headers</h4>
                            <div className="text-xs font-mono mt-2 space-y-1">
                              <div>X-RateLimit-Limit</div>
                              <div>X-RateLimit-Remaining</div>
                              <div>X-RateLimit-Reset</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          When rate limited, you'll receive a 429 status code. Wait until the reset time before retrying.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Contacts Section */}
                <section id="contacts">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-blue-600" />
                        <CardTitle>Contacts</CardTitle>
                      </div>
                      <CardDescription>
                        Manage your CRM contacts - create, read, update, and delete
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {endpoints.contacts.map((endpoint, i) => (
                          <EndpointCard key={i} endpoint={endpoint} index={i} />
                        ))}
                      </div>

                      <Separator className="my-6" />
                      
                      <div>
                        <h4 className="font-semibold mb-3">Example: Create a Contact</h4>
                        <Tabs value={selectedLang} onValueChange={(v) => setSelectedLang(v as any)}>
                          <TabsList>
                            <TabsTrigger value="curl" data-testid="tab-contacts-curl">cURL</TabsTrigger>
                            <TabsTrigger value="javascript" data-testid="tab-contacts-javascript">JavaScript</TabsTrigger>
                            <TabsTrigger value="python" data-testid="tab-contacts-python">Python</TabsTrigger>
                          </TabsList>
                          <TabsContent value="curl" className="mt-4">
                            <CodeBlock code={codeExamples.createContact.curl} language="curl" />
                          </TabsContent>
                          <TabsContent value="javascript" className="mt-4">
                            <CodeBlock code={codeExamples.createContact.javascript} language="javascript" />
                          </TabsContent>
                          <TabsContent value="python" className="mt-4">
                            <CodeBlock code={codeExamples.createContact.python} language="python" />
                          </TabsContent>
                        </Tabs>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Companies Section */}
                <section id="companies">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-blue-600" />
                        <CardTitle>Companies</CardTitle>
                      </div>
                      <CardDescription>
                        Manage business accounts and organization data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {endpoints.companies.map((endpoint, i) => (
                          <EndpointCard key={i} endpoint={endpoint} index={i} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Deals Section */}
                <section id="deals">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-blue-600" />
                        <CardTitle>Deals</CardTitle>
                      </div>
                      <CardDescription>
                        Track sales opportunities through your pipeline
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {endpoints.deals.map((endpoint, i) => (
                          <EndpointCard key={i} endpoint={endpoint} index={i} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Tasks Section */}
                <section id="tasks">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckSquare className="h-6 w-6 text-blue-600" />
                        <CardTitle>Tasks</CardTitle>
                      </div>
                      <CardDescription>
                        Manage tasks and follow-ups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {endpoints.tasks.map((endpoint, i) => (
                          <EndpointCard key={i} endpoint={endpoint} index={i} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Webhooks Section */}
                <section id="webhooks">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Webhook className="h-6 w-6 text-blue-600" />
                        <CardTitle>Webhook Subscriptions</CardTitle>
                      </div>
                      <CardDescription>
                        Receive real-time notifications when events occur in your CRM
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {endpoints.webhooks.map((endpoint, i) => (
                          <EndpointCard key={i} endpoint={endpoint} index={i} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Webhook Events Section */}
                <section id="webhook-events">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Zap className="h-6 w-6 text-blue-600" />
                        <CardTitle>Webhook Event Types</CardTitle>
                      </div>
                      <CardDescription>
                        Available events you can subscribe to
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {webhookEvents.map(({ event, description }) => (
                          <div key={event} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                              {event}
                            </code>
                            <span className="text-sm text-gray-600 dark:text-gray-400 pt-0.5">
                              {description}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Webhook Payload Structure</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`{
  "id": "evt_abc123xyz",
  "event": "contact.created",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "id": 123,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  }
}`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Webhook Security Section */}
                <section id="webhook-security">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <CardTitle>Signature Verification</CardTitle>
                      </div>
                      <CardDescription>
                        Verify webhook authenticity using HMAC-SHA256 signatures
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Webhook Headers</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Every webhook request includes these headers for verification:
                        </p>
                        <div className="space-y-2">
                          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <code className="font-mono text-sm">X-Webhook-Id</code>
                            <span className="text-sm text-gray-500">- Unique identifier for the subscription</span>
                          </div>
                          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <code className="font-mono text-sm">X-Webhook-Signature</code>
                            <span className="text-sm text-gray-500">- HMAC-SHA256 signature</span>
                          </div>
                          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <code className="font-mono text-sm">X-Webhook-Timestamp</code>
                            <span className="text-sm text-gray-500">- Unix timestamp of the event</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Verification Example</h4>
                        <Tabs defaultValue="javascript">
                          <TabsList>
                            <TabsTrigger value="javascript" data-testid="tab-webhook-javascript">JavaScript/Node.js</TabsTrigger>
                            <TabsTrigger value="python" data-testid="tab-webhook-python">Python</TabsTrigger>
                          </TabsList>
                          <TabsContent value="javascript" className="mt-4">
                            <CodeBlock code={codeExamples.webhookVerification.javascript} language="javascript" />
                          </TabsContent>
                          <TabsContent value="python" className="mt-4">
                            <CodeBlock code={codeExamples.webhookVerification.python} language="python" />
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Important:</strong> Always verify signatures before processing webhook payloads. 
                          Use constant-time comparison to prevent timing attacks.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Getting Started CTA */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="py-8 text-center">
                    <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to Build?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Generate your API key and start integrating with the CRM API today.
                    </p>
                    <Link href="/relationships" data-testid="link-go-to-crm">
                      <Button size="lg" data-testid="button-go-to-crm">
                        <Terminal className="h-4 w-4 mr-2" />
                        Go to CRM Settings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

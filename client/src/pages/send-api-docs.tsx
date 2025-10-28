
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Code, 
  Key, 
  Zap, 
  Shield, 
  Mail,
  MessageSquare,
  Users,
  Download,
  ExternalLink
} from "lucide-react";

export default function SendAPIDocs() {
  const [activeTab, setActiveTab] = useState("overview");

  const codeExamples = {
    nodejs: `const axios = require('axios');

const sendClient = {
  baseURL: 'https://businessblueprint.io/api/send',
  token: process.env.SEND_API_TOKEN,
  
  async createContact(data) {
    const response = await axios.post(
      \`\${this.baseURL}/contacts\`,
      data,
      { headers: { 'Authorization': \`Bearer \${this.token}\` } }
    );
    return response.data;
  }
};

// Create a contact
const contact = await sendClient.createContact({
  email: 'driver@example.com',
  phone: '+15551234567',
  firstName: 'John',
  lastName: 'Doe',
  emailConsent: true,
  smsConsent: true,
  tags: ['driver-applicant']
});`,
    
    python: `import requests

class SendAPIClient:
    def __init__(self, api_token):
        self.base_url = 'https://businessblueprint.io/api/send'
        self.headers = {
            'Authorization': f'Bearer {api_token}',
            'Content-Type': 'application/json'
        }
    
    def create_contact(self, contact_data):
        response = requests.post(
            f'{self.base_url}/contacts',
            json=contact_data,
            headers=self.headers
        )
        return response.json()

# Usage
client = SendAPIClient(os.getenv('SEND_API_TOKEN'))
contact = client.create_contact({
    'email': 'driver@example.com',
    'emailConsent': True,
    'tags': ['driver-applicant']
})`,
    
    php: `<?php
class SendAPIClient {
    private $baseURL = 'https://businessblueprint.io/api/send';
    private $apiToken;
    
    public function createContact($data) {
        $ch = curl_init($this->baseURL . '/contacts');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->apiToken,
            'Content-Type: application/json'
        ]);
        return json_decode(curl_exec($ch), true);
    }
}

$client = new SendAPIClient(getenv('SEND_API_TOKEN'));
$contact = $client->createContact([
    'email' => 'driver@example.com',
    'emailConsent' => true
]);`
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Code className="w-8 h-8 text-[#E6B747]" />
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              /send API Documentation
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Build powerful email and SMS campaigns with our developer-friendly API. 
            Complete integration guide with code examples in multiple languages.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button 
              size="lg"
              className="bg-[#E6B747] hover:bg-[#d1a440] text-black"
              onClick={() => window.open('/docs/SEND_API_INTEGRATION_GUIDE.md', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Guide
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/assessment'}
            >
              Get API Credentials
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Zap className="w-8 h-8 text-[#E6B747] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100/min</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">API Rate Limit</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#E6B747] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">JWT</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure Auth</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-[#E6B747] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Unlimited</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contacts</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Mail className="w-8 h-8 text-[#E6B747] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Emails/Month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Documentation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What is /send?</CardTitle>
                <CardDescription>
                  A unified email and SMS marketing platform with complete API access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#E6B747]" />
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>✓ Contact & list management</li>
                      <li>✓ Email & SMS campaigns</li>
                      <li>✓ Automated compliance (GDPR, CAN-SPAM, TCPA)</li>
                      <li>✓ Real-time analytics</li>
                      <li>✓ Custom fields & tags</li>
                      <li>✓ Webhook notifications (coming soon)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#E6B747]" />
                      Built-in Compliance
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>✓ Consent management</li>
                      <li>✓ Automatic unsubscribe links</li>
                      <li>✓ Geographic compliance rules</li>
                      <li>✓ Audit trail logging</li>
                      <li>✓ Double opt-in verification</li>
                      <li>✓ Data ownership guarantee</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Base URL</span>
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      https://businessblueprint.io/api/send
                    </code>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Authentication</span>
                    <Badge>JWT Bearer Token</Badge>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Rate Limit</span>
                    <span>100 requests/minute</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Response Format</span>
                    <Badge>JSON</Badge>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">API Version</span>
                    <Badge variant="outline">v1.0</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Start Tab */}
          <TabsContent value="quickstart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started in 3 Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E6B747] text-black flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Get Your API Token</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Sign up for a businessblueprint.io account and navigate to Settings → API Keys
                    </p>
                    <Button size="sm" onClick={() => window.location.href = '/assessment'}>
                      Get API Credentials
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E6B747] text-black flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Test Your Connection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Make your first API call to verify authentication
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`curl -X GET https://businessblueprint.io/api/send/contacts \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E6B747] text-black flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Start Building</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Use our code examples to integrate /send into your application
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setActiveTab("examples")}
                    >
                      View Code Examples
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Endpoints</CardTitle>
                <CardDescription>RESTful API for contact and list management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600">POST</Badge>
                      <code className="text-sm">/api/send/contacts</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create a new contact</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">GET</Badge>
                      <code className="text-sm">/api/send/contacts</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">List all contacts with pagination</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-600">PATCH</Badge>
                      <code className="text-sm">/api/send/contacts/:id</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update contact information</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-600">DELETE</Badge>
                      <code className="text-sm">/api/send/contacts/:id</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Delete a contact</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600">POST</Badge>
                      <code className="text-sm">/api/send/lists</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create a new list</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600">POST</Badge>
                      <code className="text-sm">/api/send/lists/:listId/contacts/:contactId</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add contact to a list</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Integration examples in popular languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="nodejs">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="php">PHP</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="nodejs">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto mt-4">
                      {codeExamples.nodejs}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="python">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto mt-4">
                      {codeExamples.python}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="php">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto mt-4">
                      {codeExamples.php}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>/send Standalone</CardTitle>
                  <CardDescription>Full API access for email & SMS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">$35<span className="text-lg text-gray-600">/mo</span></div>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Full API access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      50,000 emails/month
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      5,000 SMS/month
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Unlimited contacts
                    </li>
                  </ul>
                  <Button className="w-full bg-[#E6B747] hover:bg-[#d1a440] text-black">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commverse Bundle</CardTitle>
                  <CardDescription>/send + /livechat + /inbox</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">$119<span className="text-lg text-gray-600">/mo</span></div>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Everything in /send
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      100,000 emails/month
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      10,000 SMS/month
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Live chat + unified inbox
                    </li>
                  </ul>
                  <Button className="w-full">
                    Get Bundle
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-[#E6B747] to-[#d1a440] text-black">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-lg mb-6">
              Download the complete integration guide and start building your first campaign
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => window.open('/docs/SEND_API_INTEGRATION_GUIDE.md', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Guide
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-black text-black hover:bg-black/10"
                onClick={() => window.location.href = '/assessment'}
              >
                Get API Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CommversePricing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Commverse Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Choose individual apps at $35/month each, or get all four for $75/month
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              No hidden fees • No per-message charges • No contact limits • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* /send Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#E6B747' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#E6B747' }}>/send</CardTitle>
                <CardDescription>Email & SMS Marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$35</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#E6B747' }} />
                    <span className="text-sm text-gray-600">Unlimited email campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#E6B747' }} />
                    <span className="text-sm text-gray-600">SMS messaging included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#E6B747' }} />
                    <span className="text-sm text-gray-600">Contact management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#E6B747' }} />
                    <span className="text-sm text-gray-600">Campaign analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#E6B747' }} />
                    <span className="text-sm text-gray-600">GDPR & CAN-SPAM compliant</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#E6B747' }}
                  data-testid="button-send-individual"
                  asChild
                >
                  <a href="/send">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* /livechat Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#8000FF' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#8000FF' }}>/livechat</CardTitle>
                <CardDescription>Website Live Chat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$35</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#8000FF' }} />
                    <span className="text-sm text-gray-600">Real-time website chat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#8000FF' }} />
                    <span className="text-sm text-gray-600">Session persistence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#8000FF' }} />
                    <span className="text-sm text-gray-600">Conversation history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#8000FF' }} />
                    <span className="text-sm text-gray-600">Mobile responsive widget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#8000FF' }} />
                    <span className="text-sm text-gray-600">Team collaboration</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#8000FF' }}
                  data-testid="button-livechat-individual"
                  asChild
                >
                  <a href="/livechat">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* /inbox Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#0080FF' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#0080FF' }}>/inbox</CardTitle>
                <CardDescription>Unified Communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$35</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#0080FF' }} />
                    <span className="text-sm text-gray-600">8 channels unified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#0080FF' }} />
                    <span className="text-sm text-gray-600">Real-time WebSocket sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#0080FF' }} />
                    <span className="text-sm text-gray-600">Team assignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#0080FF' }} />
                    <span className="text-sm text-gray-600">Smart filters & search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#0080FF' }} />
                    <span className="text-sm text-gray-600">AI-powered responses</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#0080FF' }}
                  data-testid="button-inbox-individual"
                  asChild
                >
                  <a href="/inbox">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* /content Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#EF4444' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#EF4444' }}>/content</CardTitle>
                <CardDescription>Social Media Management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$35</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#EF4444' }} />
                    <span className="text-sm text-gray-600">Multi-platform posting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#EF4444' }} />
                    <span className="text-sm text-gray-600">Content scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#EF4444' }} />
                    <span className="text-sm text-gray-600">Analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#EF4444' }} />
                    <span className="text-sm text-gray-600">Media library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#EF4444' }} />
                    <span className="text-sm text-gray-600">Team collaboration</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#EF4444' }}
                  data-testid="button-content-individual"
                  asChild
                >
                  <a href="/content-management">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* Bundle - Most Popular */}
            <Card className="border-4 shadow-2xl hover:shadow-3xl transition-shadow bg-white relative" style={{ borderColor: '#FC6ACD' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-sm font-bold px-4 py-1 rounded-full" style={{ backgroundColor: '#FC6ACD' }}>
                  BEST VALUE
                </span>
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl" style={{ color: '#FC6ACD' }}>Complete Bundle</CardTitle>
                <CardDescription>All 4 Commverse Apps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$75</span>
                  <span className="text-gray-600">/month</span>
                  <p className="text-sm mt-1" style={{ color: '#FC6ACD' }}>Save $65/month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FC6ACD' }} />
                    <span className="text-sm text-gray-600">Everything in all 4 apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FC6ACD' }} />
                    <span className="text-sm text-gray-600">Cross-app analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FC6ACD' }} />
                    <span className="text-sm text-gray-600">Unified customer profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FC6ACD' }} />
                    <span className="text-sm text-gray-600">Conversation continuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FC6ACD' }} />
                    <span className="text-sm text-gray-600">Intelligent automation</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#FC6ACD' }}
                  data-testid="button-bundle"
                  asChild
                >
                  <a href="/assessment">Select</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What's Included?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#E6B747' }}>/send</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#8000FF' }}>/livechat</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#0080FF' }}>/inbox</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#EF4444' }}>/content</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#FC6ACD' }}>Bundle</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Email Marketing</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#E6B747' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">SMS Campaigns</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#E6B747' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Website Live Chat</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#8000FF' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Unified Inbox (8 channels)</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#0080FF' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Social Media Management</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#EF4444' }} /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Cross-App Analytics</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Unified Customer Profiles</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FC6ACD' }} /></td>
                </tr>
                <tr className="border-b-2 border-gray-200">
                  <td className="py-3 px-4 font-bold text-gray-900">Monthly Price</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#E6B747' }}>$35</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#8000FF' }}>$35</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#0080FF' }}>$35</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#EF4444' }}>$35</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#FC6ACD' }}>$75</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Can I start with one app and add others later?</h3>
              <p className="text-gray-600">
                Absolutely! Start with whichever app makes sense for you, and upgrade to the bundle anytime to unlock the ecosystem benefits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Are there any setup fees or contracts?</h3>
              <p className="text-gray-600">
                No setup fees, no contracts, no commitments. Pay month-to-month and cancel anytime. What you see is what you pay.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">What's included in "unlimited messages"?</h3>
              <p className="text-gray-600">
                Send as many emails and SMS messages as you need. No per-message fees, no contact limits. Fair use policy applies for extremely high volumes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">How does the bundle ecosystem work?</h3>
              <p className="text-gray-600">
                When you have all four apps, they share customer data and analytics. For example, /inbox knows about email campaigns from /send, /livechat conversations flow into /inbox, and /content posts are tracked—creating smarter automation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Can I use these apps with my existing tools?</h3>
              <p className="text-gray-600">
                Yes! While they're designed to work together, each app also works standalone and integrates with common business tools through APIs and webhooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your business. No credit card required to explore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg text-white"
              style={{ backgroundColor: '#FC6ACD' }}
              asChild
              data-testid="button-get-bundle"
            >
              <a href="/assessment">Get Bundle ($75/mo)</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 shadow-md"
              style={{ borderColor: '#0080FF', color: '#0080FF' }}
              asChild
              data-testid="button-explore-apps"
            >
              <a href="/commverse">Explore Individual Apps</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

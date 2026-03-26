
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CompassPricing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span style={{ color: '#09080E' }}>Compass Suite </span>
              <span style={{ color: '#F97316' }}>Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Choose individual apps at $39/month each, or get all four for $99/month
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
            
            {/* / promote Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#1844A6' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#1844A6' }}>/ promote</CardTitle>
                <CardDescription>Email & SMS Marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$39</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#1844A6' }} />
                    <span className="text-sm text-gray-600">Unlimited email campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#1844A6' }} />
                    <span className="text-sm text-gray-600">SMS messaging included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#1844A6' }} />
                    <span className="text-sm text-gray-600">Contact management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#1844A6' }} />
                    <span className="text-sm text-gray-600">Campaign analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#1844A6' }} />
                    <span className="text-sm text-gray-600">GDPR & CAN-SPAM compliant</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#1844A6' }}
                  data-testid="button-send-individual"
                  asChild
                >
                  <a href="/promote">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* / engage Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#8000FF' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#8000FF' }}>/ engage</CardTitle>
                <CardDescription>Website Live Chat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$39</span>
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
                  <a href="/engage">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* / respond Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#6EA6FF' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#6EA6FF' }}>/ respond</CardTitle>
                <CardDescription>Unified Communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$39</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#6EA6FF' }} />
                    <span className="text-sm text-gray-600">8 channels unified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#6EA6FF' }} />
                    <span className="text-sm text-gray-600">Real-time WebSocket sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#6EA6FF' }} />
                    <span className="text-sm text-gray-600">Team assignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#6EA6FF' }} />
                    <span className="text-sm text-gray-600">Smart filters & search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#6EA6FF' }} />
                    <span className="text-sm text-gray-600">AI-powered responses</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#6EA6FF' }}
                  data-testid="button-respond-individual"
                  asChild
                >
                  <a href="/respond">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* / post Individual */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white" style={{ borderColor: '#FF44CC' }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: '#FF44CC' }}>/ post</CardTitle>
                <CardDescription>Social Media Management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$39</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FF44CC' }} />
                    <span className="text-sm text-gray-600">Multi-platform posting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FF44CC' }} />
                    <span className="text-sm text-gray-600">Content scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FF44CC' }} />
                    <span className="text-sm text-gray-600">Analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FF44CC' }} />
                    <span className="text-sm text-gray-600">Media library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#FF44CC' }} />
                    <span className="text-sm text-gray-600">Team collaboration</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#FF44CC' }}
                  data-testid="button-post-individual"
                  asChild
                >
                  <a href="/post-landing">Select</a>
                </Button>
              </CardContent>
            </Card>

            {/* Bundle - Most Popular */}
            <Card className="border-4 shadow-2xl hover:shadow-3xl transition-shadow bg-white relative" style={{ borderColor: '#F97316' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-sm font-bold px-4 py-1 rounded-full" style={{ backgroundColor: '#F97316' }}>
                  BEST VALUE
                </span>
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl" style={{ color: '#F97316' }}>Complete Bundle</CardTitle>
                <CardDescription>All 4 Compass Suite Apps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/month</span>
                  <p className="text-sm mt-1" style={{ color: '#F97316' }}>Save $57/month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#F97316' }} />
                    <span className="text-sm text-gray-600">Everything in all 4 apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#F97316' }} />
                    <span className="text-sm text-gray-600">Cross-app analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#F97316' }} />
                    <span className="text-sm text-gray-600">Unified customer profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#F97316' }} />
                    <span className="text-sm text-gray-600">Conversation continuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#F97316' }} />
                    <span className="text-sm text-gray-600">Intelligent automation</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#F97316' }}
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
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#1844A6' }}>/ promote</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#8000FF' }}>/ engage</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#6EA6FF' }}>/ respond</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#FF44CC' }}>/ post</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: '#F97316' }}>Bundle</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Email Marketing</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#1844A6' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">SMS Campaigns</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#1844A6' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Website Live Chat</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#8000FF' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Unified Inbox (8 channels)</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#6EA6FF' }} /></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Social Media Management</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#FF44CC' }} /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Cross-App Analytics</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">Unified Customer Profiles</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto" style={{ color: '#F97316' }} /></td>
                </tr>
                <tr className="border-b-2 border-gray-200">
                  <td className="py-3 px-4 font-bold text-gray-900">Monthly Price</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#1844A6' }}>$39</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#8000FF' }}>$39</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#6EA6FF' }}>$39</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#FF44CC' }}>$39</td>
                  <td className="text-center py-3 px-4 font-bold" style={{ color: '#F97316' }}>$99</td>
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
                When you have all four apps, they share customer data and analytics. For example, / respond knows about email campaigns from / promote, / engage conversations flow into / respond, and / post posts are tracked—creating smarter automation.
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
              style={{ backgroundColor: '#F97316' }}
              asChild
              data-testid="button-get-bundle"
            >
              <a href="/assessment">Get Bundle ($99/mo)</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 shadow-md"
              style={{ borderColor: '#0080FF', color: '#0080FF' }}
              asChild
              data-testid="button-explore-apps"
            >
              <a href="/compass">Explore Individual Apps</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users, Building2, Target, BarChart3, Kanban, Clock, Zap, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { CONNECT_CRM } from "@/config/app-registry";

export default function RelationshipsLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="connect" size="lg" iconSize={36} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Complete CRM Command Center
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Manage contacts, companies, deals, and tasks in one powerful platform.
              Built for businesses that demand complete control over their customer relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  const event = new CustomEvent('addToCart', {
                    detail: { sku: 'relationships-addon', name: '/ connect', price: CONNECT_CRM.tiers[1].price, type: 'addon' }
                  });
                  window.dispatchEvent(event);
                }}
                data-testid="button-add-to-cart"
              >
                Add to Cart - $29/mo
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#008060', color: '#fff' }}
                asChild
                data-testid="button-get-started"
              >
                <a href="/connect/dashboard">Open Dashboard</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 shadow-md hover:bg-blue-50 transition-colors"
                style={{ borderColor: '#008060', color: '#008060' }}
                asChild
                data-testid="button-view-pricing"
              >
                <a href="/pricing">View All Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">FREE</div>
              <span className="text-white text-xl">Starter Plan</span>
              <span className="text-white text-2xl">|</span>
              <div className="text-4xl font-bold text-white">$29/mo</div>
              <span className="text-white text-xl">Unlimited Plan</span>
            </div>
            <p className="text-gray-300 text-sm">
              Start free with up to 250 contacts. Scale to unlimited with Performance.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Relationships
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A complete CRM solution designed for growing businesses. Track contacts, close deals,
              and build lasting customer relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#008060' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Contact Management</h3>
                  <p className="text-gray-600">
                    Store and organize all your contacts with custom fields, tags, and lifecycle stages.
                    Import from CSV or add manually.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#008060' }}>
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Company Profiles</h3>
                  <p className="text-gray-600">
                    Link contacts to companies. Track company size, industry, and revenue potential
                    for better B2B relationship management.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#008060' }}>
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Deal Pipeline</h3>
                  <p className="text-gray-600">
                    Visualize your sales pipeline with customizable stages. Track deal values,
                    close dates, and probability to forecast revenue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Powerful Tools for Your Team
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#008060' }}>
                  <Kanban className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Kanban Board View</h3>
                <p className="text-gray-600">
                  Drag-and-drop deals between stages. Visual pipeline management that keeps your team aligned.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#008060' }}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Task Management</h3>
                <p className="text-gray-600">
                  Create tasks linked to contacts and deals. Set due dates, priorities, and never miss a follow-up.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#008060' }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Analytics Dashboard</h3>
                <p className="text-gray-600">
                  Track key metrics: contact growth, deal velocity, task completion rates, and pipeline value.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: '#008060' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Activity Timeline</h3>
                <p className="text-gray-600">
                  Complete history of all interactions. See emails, calls, meetings, and notes in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Hub Every App Flows Through */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Hub Every App Flows Through
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every app in Business Blueprint feeds data into /connect. Your contacts, conversations, reviews,
              campaigns, and social interactions all live here — giving you one unified view of every customer relationship.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Left column - apps flowing in */}
              <div className="space-y-4">
                {[
                  { name: "/publish", desc: "Listings" },
                  { name: "/elevate", desc: "Reviews" },
                  { name: "/optimize", desc: "SEO" },
                  { name: "/promote", desc: "Email" },
                ].map((app) => (
                  <div key={app.name} className="flex items-center gap-2 justify-end">
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm">{app.name}</div>
                      <div className="text-xs text-gray-500">{app.desc}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* Center - /connect hub */}
              <div className="flex flex-col items-center">
                <div
                  className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center shadow-xl border-4"
                  style={{ backgroundColor: '#008060', borderColor: '#006B4F' }}
                >
                  <Users className="w-10 h-10 text-white mb-1" />
                  <span className="text-white font-bold text-lg">/connect</span>
                  <span className="text-green-200 text-xs">CRM Hub</span>
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center font-medium">
                  All data flows here
                </p>
              </div>

              {/* Right column - apps flowing in */}
              <div className="space-y-4">
                {[
                  { name: "/respond", desc: "Messaging" },
                  { name: "/engage", desc: "Live Chat" },
                  { name: "/post", desc: "Social" },
                  { name: "/coach-blue", desc: "AI Coach" },
                ].map((app) => (
                  <div key={app.name} className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 rotate-180" />
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{app.name}</div>
                      <div className="text-xs text-gray-500">{app.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Why Choose / connect?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#008060' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Built for Your Business
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Unlimited custom fields for your specific needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Flexible lifecycle stages and deal pipelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>CSV import/export with full data ownership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Integrates with / promote, / respond, and / post</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#008060' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Simple, Transparent Pricing
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Free Starter: Up to 250 contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Performance: $29/mo for unlimited everything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No per-user fees or hidden charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Annual billing saves 20%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Customer Relationships?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with our free Starter plan today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
              style={{ backgroundColor: '#008060' }}
              asChild
            >
              <a href="/connect/dashboard">Start Free Today</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 shadow-md"
              asChild
            >
              <a href="/contact">Talk to Sales</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

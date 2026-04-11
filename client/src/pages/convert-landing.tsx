import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Bell, UserCheck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppName } from "@/components/app-name";
import { CONVERT_FORM } from "@/config/app-registry";

const ACCENT = CONVERT_FORM.color; // #8000FF

export default function ConvertLanding() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const clientId = sessionStorage.getItem("clientId");
    const authToken = sessionStorage.getItem("authToken");
    setIsLoggedIn(!!(clientId && authToken));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <AppName appId="convert" size="lg" iconSize={36} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Every Lead You Earn Should Land Somewhere
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              You worked hard for that visit to your website. You paid for that ad. You earned that referral. Then what happens? For most local businesses — nothing. The visitor leaves, and there's nothing you can do to reach them again. / convert changes that. A contact form, an opt-in, a popup, an SMS sign-up — built in minutes, embedded anywhere, and every submission lands in / connect where your relationships live.
            </p>
            {isLoggedIn ? (
              <div className="space-y-4 text-center">
                <div className="inline-block border-2 rounded-lg px-6 py-4" style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}1A` }}>
                  <p className="text-lg font-bold" style={{ color: ACCENT }}>
                    ✓ / convert is Free With Your Account
                  </p>
                  <p className="text-sm text-gray-600">Build unlimited forms with businessblueprint.io branding</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 shadow-lg hover:opacity-90 text-white font-bold"
                    style={{ backgroundColor: ACCENT }}
                    asChild
                    data-testid="button-open-convert"
                  >
                    <a href="/convert/dashboard">Open Your Forms →</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 shadow-lg hover:opacity-90 text-white font-bold"
                  style={{ backgroundColor: ACCENT }}
                  asChild
                  data-testid="button-get-started"
                >
                  <a href="/portal/login">Start Free</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 shadow-md"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                  asChild
                  data-testid="button-view-pricing"
                >
                  <a href="/pricing">View All Pricing</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What it is callout */}
      <section className="py-12 bg-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#E9ECF0] text-xl">
            FREE forever with your account — forms, popups, and opt-ins, all with branding. Premium removes branding for $59/year.
          </p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Three Tools, One Purpose: Capture Every Lead
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pick the format that fits where your lead is in their journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT }}>
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Forms</h3>
                  <p className="text-gray-600">
                    Contact forms, quote requests, event registrations, feedback surveys. Embed them on your website, link them from email, post them in social. Whatever the ask, there's a field for it.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT }}>
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Popups</h3>
                  <p className="text-gray-600">
                    Exit-intent, timed, scroll-triggered, announcement bars. Catch a visitor's attention at the moment it matters — before they leave, when they're engaged, or with a special offer.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md hover:shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT }}>
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Opt-ins</h3>
                  <p className="text-gray-600">
                    Email subscribers. SMS subscribers. Newsletter signups. Contest entries. Every opt-in captures TCPA-compliant consent — so when / promote sends a campaign, you're on the right side of the law.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#E9ECF0] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How / convert Works
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Pick a template", body: "16 pre-built templates covering contact, quote, booking, feedback, opt-in, contest, and more." },
              { step: "2", title: "Embed anywhere", body: "Drop a single line of code on your website, or share the hosted form link directly." },
              { step: "3", title: "Leads flow to / connect", body: "Every submission auto-creates a CRM contact with full timeline history." },
              { step: "4", title: "/ promote picks it up", body: "Subscribers with consent are ready for your next email or SMS campaign." },
            ].map(({ step, title, body }) => (
              <div key={step} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl" style={{ backgroundColor: ACCENT }}>
                  {step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What this means for your business */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 rounded-lg p-8 md:p-12" style={{ borderColor: ACCENT }}>
            <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: ACCENT }}>
              What This Means For Your Business
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              No more lost leads. No more "I forgot to follow up."
            </h3>
            <p className="text-lg text-gray-700">
              Every person who shows interest — a form submission, a phone number left in a popup, an email opt-in — lands in / connect with their timeline already started. You know where they came from, what they asked about, and what they consented to receive. Then you follow up, because now you can.
            </p>
          </div>
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free or Premium
            </h2>
            <p className="text-xl text-gray-600">
              Free is more than enough for most businesses. Premium is for when you want the / convert branding off and full control of the look.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CONVERT_FORM.tiers.map((tier) => (
              <Card key={tier.name} className="border-2 border-gray-200 shadow-md bg-white">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-4xl font-bold" style={{ color: ACCENT }}>
                      {tier.price === 0 ? "Free" : `$${tier.price}`}
                      {tier.price > 0 && <span className="text-base text-gray-500">/{tier.period}</span>}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

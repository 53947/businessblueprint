import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

import digitalAssessmentImg from '@assets/Digital Assessment_1762239599462.png';
import digitalPathImg from '@assets/digital path_1762239599462.png';
import localSeoImg from '@assets/LOCAL SEO_1762239599463.png';
import sendAppImg from '@assets/send app_1762239599464.png';
import contentImg from '@assets/content_1762239599461.png';
import livechatImg from '@assets/livechat icon_1762239599463.png';
import inboxImg from '@assets/Inbox_1762239599463.png';
import commverseImg from '@assets/Commverse_1762239599461.png';
import coachBlueImg from '@assets/AI Business Coach Blue_1762239599460.png';
import captainImg from '@assets/Captaining Icon_1762239599461.png';
import swipesblueImg from '@assets/swipesblue brandmark_1762239599464.png';
import hostsblueImg from '@assets/Hosts Blue Brandmark_1762239599462.png';
import diyImg from '@assets/DO IT YOURSELF_1762239599462.png';
import alcImg from '@assets/A LA CARTE_1762239599460.png';

const systemIcons = [
  { img: digitalAssessmentImg, label: 'Digital Assessment' },
  { img: digitalPathImg, label: 'Digital Path' },
  { img: localSeoImg, label: 'Local SEO' },
  { img: sendAppImg, label: '/Send' },
  { img: contentImg, label: '/Content' },
  { img: livechatImg, label: '/LiveChat' },
  { img: inboxImg, label: '/Inbox' },
  { img: commverseImg, label: 'Commverse' },
  { img: coachBlueImg, label: 'Coach Blue' },
  { img: captainImg, label: "Captain's Chair" },
  { img: swipesblueImg, label: 'SwipesBlue' },
  { img: hostsblueImg, label: 'HostsBlue' },
];

const basePlans = [
  {
    id: 'start',
    title: 'Start',
    subtitle: 'Primary / Hero',
    price: 99,
    description: 'Start — lay the foundation',
    details: 'Blueprint set includes: assessment, Digital IQ, core listings (~50 doors), starter SEO, and prescription.',
    gradient: 'linear-gradient(315deg, #FF5F00 0%, #F79248 100%)',
    badgeText: '315° #FF5F00 → #F79248'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'Supportive / Balanced',
    price: 299,
    description: 'Advanced — build out your framework',
    details: 'Deeper plan set: extended listings (~150 doors), automation, review flow, content scaffolding, and upgraded prescription.',
    gradient: 'linear-gradient(315deg, #0000FF 0%, #8000FF 100%)',
    badgeText: '315° #0000FF → #8000FF'
  },
  {
    id: 'scale',
    title: 'Scale',
    subtitle: 'Prestige / Future Tier',
    price: 999,
    description: 'Scale — full build & systems',
    details: 'Complete spec sheet: multi-location controls, advanced automations, and executive dashboards.',
    gradient: 'linear-gradient(315deg, #00FF40 0%, #0090FF 100%)',
    badgeText: '315° #00FF40 → #0090FF',
    note: 'Note: ALC and Scale do not combine.'
  }
];

const executionStyles = [
  { id: 'diy', img: diyImg, label: 'DIY', description: 'you install from the plan' },
  { id: 'msp', img: hostsblueImg, label: 'MSP', description: 'our crew manages the build' },
  { id: 'alc', img: alcImg, label: 'ALC', description: 'pick modules; no base plan' }
];

const apps = [
  { id: 'send', img: sendAppImg, title: '/Send', description: 'SMS & Email Marketing / CRM', price: 35 },
  { id: 'content', img: contentImg, title: '/Content', description: 'Social Media Management', price: 35 },
  { id: 'livechat', img: livechatImg, title: '/LiveChat', description: 'Real-time website chat widget', price: 35 },
  { id: 'inbox', img: inboxImg, title: '/Inbox', description: 'Unified communications hub', price: 35 }
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<string | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const handleAppToggle = (appId: string) => {
    setSelectedApps(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}>
            BusinessBlueprint
          </h1>
          <p className="text-lg text-gray-300">Get Found, Get Customers, Get Business</p>
        </div>

        {/* Architectural Framing Note */}
        <div className="max-w-4xl mx-auto mb-12 p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <p className="text-sm text-gray-300">
            <strong className="text-white">Blueprint Overview — Architectural framing:</strong><br />
            Foundation (Assessment) → Framing (Base Plan) → Build Method (Execution Style) → Fixtures (Apps) → Inspections (Coaching) → Handover (Checkout & Dashboard).
          </p>
        </div>

        {/* System Icons Grid */}
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-sm text-gray-400"><strong className="text-white">System Icons — Flat Grid:</strong> embedded visual language for assessment → pathway → SEO, apps, coaching and platform.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {systemIcons.map((icon, idx) => (
              <div
                key={idx}
                className="bg-[#0E1225] border border-white/10 rounded-2xl p-4 text-center hover:border-blue-500/50 transition-all"
                data-testid={`icon-tile-${icon.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <img src={icon.img} alt={icon.label} className="w-14 h-14 object-contain mx-auto mb-2" />
                <div className="text-xs text-gray-400">{icon.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Base Plans */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Foundation</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {basePlans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-[#0E1020] border-white/10 overflow-hidden cursor-pointer transition-all ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/25' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
                data-testid={`plan-${plan.id}`}
              >
                <div
                  className="p-6 text-white"
                  style={{ background: plan.gradient, fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}
                >
                  <div className="text-sm opacity-90">{plan.subtitle}</div>
                  <div className="text-4xl font-extrabold my-2">
                    ${plan.price}<span className="text-sm font-normal"> / mo</span>
                  </div>
                  <div className="text-sm opacity-90">{plan.description}</div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-400 mb-3">{plan.details}</p>
                  <div className="inline-block text-xs px-3 py-1.5 rounded-full border border-white/30">
                    {plan.badgeText}
                  </div>
                  {plan.note && (
                    <p className="text-xs text-gray-500 mt-3 opacity-80">{plan.note}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-4xl mx-auto p-4 rounded-2xl border border-white/10 bg-blue-500/5">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Plan context:</strong> each Base Plan is a different <em>plan set</em>. Choose the structural depth you want before selecting your build method.
            </p>
          </div>
        </section>

        {/* Execution Style */}
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-sm text-gray-400 text-center">
              <strong className="text-white">Build Methods (Execution Style):</strong> DIY (owner-builder), MSP (managed contractor), or ALC (a la carte) where you select individual modules without a base plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {executionStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedExecution(style.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-all ${
                  selectedExecution === style.id
                    ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                data-testid={`execution-${style.id}`}
              >
                <img src={style.img} alt={style.label} className="w-6 h-6 rounded" />
                <span className="font-semibold">{style.label}</span>
                <span className="text-sm text-gray-400">— {style.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Native Apps */}
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-sm text-gray-400 text-center">
              <strong className="text-white">Native Apps — Fixtures & Systems:</strong> Add individual utilities or take the Commverse bundle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {apps.map((app) => (
              <div
                key={app.id}
                onClick={() => handleAppToggle(app.id)}
                className={`flex gap-3 items-center p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedApps.includes(app.id)
                    ? 'bg-blue-500/10 border-blue-500'
                    : 'bg-[#0E1225] border-white/10 hover:border-white/20'
                }`}
                data-testid={`app-${app.id}`}
              >
                <img src={app.img} alt={app.title} className="w-11 h-11 rounded-lg object-contain" />
                <div className="flex-1">
                  <div className="font-bold text-sm">{app.title}</div>
                  <div className="text-xs text-gray-400">{app.description}</div>
                </div>
                <div className="text-lg font-bold">${app.price}</div>
              </div>
            ))}
          </div>

          {/* Commverse Bundle */}
          <div className="max-w-4xl mx-auto mb-4">
            <p className="text-sm text-gray-400 text-center mb-4">
              <strong className="text-white">Commverse Bundle:</strong> all four native apps for $100. Best value, minimal wiring.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-center p-5 rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <img src={commverseImg} alt="Commverse" className="w-12 h-12 rounded-lg object-contain" />
              <div className="flex-1">
                <div className="font-bold text-lg">Commverse Bundle</div>
                <div className="text-sm text-gray-400">/Send + /Content + /LiveChat + /Inbox</div>
              </div>
              <div className="text-2xl font-bold">$100</div>
            </div>
          </div>
        </section>

        {/* Coaching */}
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-sm text-gray-400 text-center">
              <strong className="text-white">Inspections & Punch List — Coaching:</strong> keep the build on-spec with AI or hands-on guidance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#0E1122] border-white/10">
              <CardContent className="p-6">
                <div className="flex gap-3 items-center mb-3">
                  <img src={coachBlueImg} alt="Coach Blue" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <div className="font-bold">AI Business Coach — Coach Blue</div>
                    <div className="text-sm text-gray-400">Blueprint guidance, automation tips, checklists.</div>
                  </div>
                  <div className="text-xl font-bold">$99</div>
                </div>
                <div className="text-xs text-gray-500">DIY: $99 · MSP: $59 · ALC: $99</div>
              </CardContent>
            </Card>

            <Card className="bg-[#0E1122] border-white/10">
              <CardContent className="p-6">
                <div className="flex gap-3 items-center">
                  <img src={captainImg} alt="Captain's Chair" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <div className="font-bold">Captain's Chair</div>
                    <div className="text-sm text-gray-400">Personal coaching by our CEO (max 2 months).</div>
                  </div>
                  <div className="text-xl font-bold">$499</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0E1122] border-white/10">
              <CardContent className="p-6">
                <div className="flex gap-3 items-center">
                  <img src={swipesblueImg} alt="SwipesBlue" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <div className="font-bold">Checkout — SwipesBlue</div>
                    <div className="text-sm text-gray-400">Secure payment — plug your path directly into the gateway.</div>
                  </div>
                  <div className="text-xl font-bold">→</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full font-bold"
            style={{
              background: 'linear-gradient(315deg, #0000FF 0%, #8000FF 100%)',
              fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif'
            }}
            data-testid="button-start-blueprint"
          >
            Start Your Blueprint
          </Button>
        </div>

        {/* Dev Schema */}
        <div className="max-w-4xl mx-auto p-6 rounded-xl bg-[#0A0C18] border border-white/10">
          <pre className="text-xs text-blue-200 font-mono overflow-x-auto">
{`// Purchase Schema (use as implementation spec)
{
  "stage_1": "AI Assessment → Digital IQ Score",
  "stage_2": "Base Plan: start|advanced|scale",
  "stage_3": "Execution: diy|msp|alc",
  "rules": ["ALC incompatible with Scale"],
  "addons": {
    "apps": ["/send","/content","/livechat","/inbox"],
    "bundle": "commverse",
    "coaching": ["coach_blue","captains_chair"]
  },
  "checkout": "SwipesBlue embedded",
  "post_purchase": "Dashboard → manage blueprint"
}`}
          </pre>
        </div>
      </main>

      <Footer />
    </div>
  );
}

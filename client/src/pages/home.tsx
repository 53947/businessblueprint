import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, Link } from "wouter";
import { AICoachIcon } from "@/components/pathway-icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandLogo } from "@/components/brand-logo";
import { ClipboardCheck, FileText, Layers, Wrench, Rocket, Star, MessageCircle, Mail, Target, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { DigitalAssessmentIcon, DigitalIQIcon, CoachBlueIcon, BasePlanIcon, ActionPlanIcon, BuildMethodIcon } from "@/components/brand-icons";
import bbIcon from "@assets/images_logos/bb-favicon.png";
import bbLogo from "@assets/images_logos/bb-favicon.png";
import coachBlueLarge from "@assets/images_logos/coachblue.png";
import webhostedIcon from "@assets/images_logos/hostsblue-brandmark.png";
import webhostedLogo from "@assets/images_logos/hostsblue-url.png";
import airswipedLogo from "@assets/images_logos/swipesblue-brandmark.png";
import { AppName, AppIcon, BundleHeader } from "@/components/app-name";
import coachBlueStepIcon from "@assets/images_logos/coachblue48.png";
import {
  APP_REGISTRY, BUNDLE_REGISTRY, CONNECT_CRM, COACH_BLUE, DIGITAL_IQ,
  HOW_IT_WORKS_STEPS, getAppsByBundle,
} from "@/config/app-registry";

export default function Home() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/assessment");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showNavigation={true} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-gray-50 py-12 lg:py-20 border-b border-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                We Assess. We Prescribe. You Grow.
              </h1>
              
              {/* Desktop copy */}
              <p className="hidden lg:block text-xl text-gray-600 mb-8 leading-relaxed">
                Your full digital footprint is scored across six categories — website performance, reviews, social media presence, local search rankings, directory accuracy, and overall visibility. Our AI then delivers your prescribed Digital Blueprint — a custom, data-driven plan with the exact apps, actions, and pricing your business needs to grow.
              </p>
              
              {/* Mobile copy */}
              <p className="lg:hidden text-xl text-gray-600 mb-8 leading-relaxed">
                Your digital footprint scored across six categories. Get your prescribed Digital Blueprint — the apps, actions, and pricing your business needs to grow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={startAssessment}
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#0000FF] bg-white hover:bg-gray-50 text-[#A00028] font-semibold"
                  data-testid="button-start-assessment"
                >
                  <AppIcon name="ClipboardCheck" size={24} color="#A00028" />
                  <span className="ml-2">Start Here</span>
                </Button>
                <Link href="/coach-blue">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#0000FF] bg-white hover:bg-gray-50 text-[#FF6B00] font-semibold w-full sm:w-auto"
                    data-testid="button-ai-coach"
                  >
                    <img src={coachBlueStepIcon} alt="" className="w-6 h-6 mr-2 rounded" />
                    AI Business Coach
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  100% Secure
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="p-4 rounded-xl shadow-lg relative overflow-hidden" style={{ backgroundColor: "#064A6C" }}>
                {/* Blueprint Grid Lines — Triad White on green */}
                <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 0 0 L 30 0" fill="none" stroke="#E9ECF0" strokeWidth="1"/>
                        <path d="M 0 0 L 0 30" fill="none" stroke="#E9ECF0" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold mb-2 relative z-10" style={{ color: "#E9ECF0" }}>A Blueprint to Your Growth</h3>
                <p className="text-xs mb-4 relative z-10" style={{ color: "rgba(233,236,240,0.8)" }}>
                  Custom digital growth plan built from AI analysis of your business.
                </p>
                <div className="space-y-3 relative z-10">
                  {[
                    { title: "Scan Your Digital Presence", titleJsx: null, desc: "Free. Five minutes. We score your website, your reviews, your social presence, and how consistently your business information appears across the web.", descJsx: null, color: "#A00028" },
                    { title: "Get Your Custom Blueprint", titleJsx: null, desc: "Your scores tell the AI what's broken. It builds a prescription specific to your business — not a generic checklist, not a sales pitch.", descJsx: null, color: "#FFC107" },
                    { title: "", titleJsx: <>Build Your Foundation — <Link href="/connect" className="hover:underline" style={{ color: "#E9ECF0" }}>/ connect</Link></>, desc: "", descJsx: <><Link href="/connect" className="hover:underline" style={{ color: "#E9ECF0" }}>/ connect</Link> is your CRM — the central record for every customer, conversation, and deal. Every app you activate feeds into it automatically.</>, color: "#008060" },
                    { title: "", titleJsx: <>Own Your Local Presence — <Link href="/anchor" className="hover:underline" style={{ color: "#E9ECF0" }}>/ anchor suite</Link></>, desc: "Claim your Google Business listing. Register your D&B DUNS number. Get listed everywhere your customers are looking — all from one place.", descJsx: null, color: "#2073E3" },
                    { title: "", titleJsx: <>Activate Your Communications — <Link href="/compass" className="hover:underline" style={{ color: "#E9ECF0" }}>/ compass suite</Link></>, desc: "Email campaigns, live chat on your website, one inbox for every message channel, and social media scheduling — all connected, all talking to each other.", descJsx: null, color: "#F97316" },
                    { title: "", titleJsx: <>Never Grow Alone — <Link href="/coach-blue" className="hover:underline" style={{ color: "#E9ECF0" }}>Coach Blue</Link></>, desc: "", descJsx: <><Link href="/coach-blue" className="hover:underline" style={{ color: "#E9ECF0" }}>Coach Blue</Link> watches your data, guides your setup, and tells you exactly what needs attention before it becomes a problem.</>, color: "#0000FF", isPng: true },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg border-l-4" style={{ borderColor: step.color, backgroundColor: "rgba(6,74,108,0.7)" }}>
                      <div className="flex-shrink-0 -mt-2">
                        {step.isPng ? (
                          <img src={coachBlueStepIcon} alt="Coach Blue" width={40} height={40} style={{ borderRadius: 8, objectFit: "contain" }} />
                        ) : (
                          <AppIcon name={HOW_IT_WORKS_STEPS[i].icon} size={40} color={step.color} />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm" style={{ color: "#E9ECF0" }}>Step {i + 1} — {step.titleJsx || step.title}</div>
                        <p className="text-xs" style={{ color: "rgba(233,236,240,0.85)" }}>{step.descJsx || step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <a href="/journey" style={{ color: '#E9ECF0', fontSize: 13, fontWeight: 600 }}>
                    Read the full story →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections 1–6 below */}

      {/* Section 1: / connect */}
      <section className="bg-white py-20 border-b border-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Link href="/connect"><AppName appId="connect" size="lg" iconSize={64} /></Link>
              <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-4">Every Customer. Every Conversation. One Place.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Most business owners keep customer information in their head, in a spreadsheet, or scattered across their phone. When someone asks about a client — there's no clean answer. <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link> changes that. Every contact, every company, every deal, every task in one organized place.</p>
              <p className="text-gray-600 leading-relaxed mb-4">Every app in businessblueprint.io flows through <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link>. A chat from your website widget logs here automatically. A review response from <Link href="/elevate" className="font-semibold hover:underline" style={{color: '#E9B307'}}>/ elevate</Link> links to the customer's record. An email campaign from <Link href="/promote" className="font-semibold hover:underline" style={{color: '#1844A6'}}>/ promote</Link> draws from your contact list. You don't manage the connections — they happen on their own.</p>
              <p className="text-gray-600 leading-relaxed mb-8">Start free. 100 contacts, no credit card, no time limit. Unlimited for $29/mo when you're ready.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/connect"><Button style={{ backgroundColor: '#FF6B00' }} className="text-white font-bold">Add to Cart — Free</Button></Link>
                <Link href="/connect/dashboard"><Button style={{ backgroundColor: '#008060' }} className="text-white">Open Dashboard</Button></Link>
                <Link href="/pricing"><Button variant="outline" style={{ borderColor: '#008060', color: '#008060' }}>View All Pricing</Button></Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative h-96 flex items-center justify-center">
                <Link href="/connect"><div className="rounded-full w-24 h-24 flex items-center justify-center text-white text-sm font-bold text-center" style={{ backgroundColor: '#008060' }}>/ connect</div></Link>
                <Link href="/publish" className="absolute" style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #064A6C', backgroundColor: '#064A6C', color: '#E9ECF0', letterSpacing: '0.05em' }}>/ publish</div></Link>
                <Link href="/elevate" className="absolute" style={{ top: '15%', right: '5%' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #E9B307', backgroundColor: '#E9B307', color: '#09080E', letterSpacing: '0.05em' }}>/ elevate</div></Link>
                <Link href="/optimize" className="absolute" style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #374151', backgroundColor: '#374151', color: '#E9ECF0', letterSpacing: '0.05em' }}>/ optimize</div></Link>
                <Link href="/amplify" className="absolute" style={{ bottom: '15%', right: '5%' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #97ACCA', backgroundColor: '#97ACCA', color: '#09080E', letterSpacing: '0.05em' }}>/ amplify</div></Link>
                <Link href="/respond" className="absolute" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #001882', backgroundColor: '#001882', color: '#E9ECF0', letterSpacing: '0.05em' }}>/ respond</div></Link>
                <Link href="/engage" className="absolute" style={{ bottom: '15%', left: '5%' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #660099', backgroundColor: '#660099', color: '#E9ECF0', letterSpacing: '0.05em' }}>/ engage</div></Link>
                <Link href="/post" className="absolute" style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #FF44CC', backgroundColor: '#FF44CC', color: '#09080E', letterSpacing: '0.05em' }}>/ post</div></Link>
                <Link href="/promote" className="absolute" style={{ top: '15%', left: '5%' }}><div className="text-xs font-medium px-3 py-2.5 rounded-full shadow-sm" style={{ border: '2px solid #1844A6', backgroundColor: '#1844A6', color: '#E9ECF0', letterSpacing: '0.05em' }}>/ promote</div></Link>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">Every app in businessblueprint.io connects through <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: / anchor suite */}
      <section className="bg-gray-50 py-20 border-b border-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BundleHeader bundleId="anchor" />
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">Get Found Before You Do Anything Else</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">There's no point running ads or sending emails if customers can't find accurate information about your business online. The Anchor Suite builds your local presence from the ground up — and keeps it built.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#064A6C' }}>
              <div className="flex items-center gap-2">
                <Link href="/publish"><AppName appId="publish" size="md" /></Link>
                <span className="bg-[#064A6C] text-white text-xs px-2 py-0.5 rounded-full">FEATURED</span>
              </div>
              <p className="text-gray-600 text-sm mt-3 mb-4">Two listings define whether a local business gets found: your Google Business Profile and your D&B DUNS number. <Link href="/publish" className="font-semibold hover:underline" style={{color: '#064A6C'}}>/ publish</Link> handles both. Google Business — AI-guided setup, every field validated, locked after approval so no one edits it without you. D&B DUNS — the global business identifier that pushes your information to 80+ platforms including Apple Maps, Bing, and Yahoo automatically. After that, <Link href="/publish" className="font-semibold hover:underline" style={{color: '#064A6C'}}>/ publish</Link> manages every major directory and monitors your information for consistency every week.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Google Business Profile</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">D&B DUNS</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">80+ Directories</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Weekly Monitoring</span>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#97ACCA' }}>
              <div className="flex items-center gap-2">
                <Link href="/amplify"><AppName appId="amplify" size="md" /></Link>
                <span className="bg-[#97ACCA] text-white text-xs px-2 py-0.5 rounded-full">FEATURED</span>
              </div>
              <p className="text-gray-600 text-sm mt-3 mb-4">Facebook and Google have completely different ad structures — so <Link href="/amplify" className="font-semibold hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link> builds two separate bases, each native to how that platform works, unified by one budget controller and one reporting dashboard. And Reddit is a priority platform inside <Link href="/amplify" className="font-semibold hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link> — because that's where real local conversations happen. Neighbors recommending businesses. Customers asking who to trust. <Link href="/amplify" className="font-semibold hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link> puts you in those conversations the right way.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Meta Ads</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Google Ads</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Reddit Priority</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Unified Budget Control</span>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#E9B307' }}>
              <Link href="/elevate"><AppName appId="elevate" size="md" /></Link>
              <p className="text-gray-600 text-sm mt-3 mb-4">Reviews are the first thing a new customer reads about your business. <Link href="/elevate" className="font-semibold hover:underline" style={{color: '#E9B307'}}>/ elevate</Link> pulls your reviews from Google, Yelp, and Facebook into one dashboard, drafts a response for every new review, and sends review requests after each transaction. Your reputation is managed — you just approve before it goes out.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Google</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Yelp</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Facebook</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Auto-Response</span>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#374151' }}>
              <Link href="/optimize"><AppName appId="optimize" size="md" /></Link>
              <p className="text-gray-600 text-sm mt-3 mb-4">Search rankings change constantly. Most businesses don't know when they slip. <Link href="/optimize" className="font-semibold hover:underline" style={{color: '#374151'}}>/ optimize</Link> tracks where you rank for the local-intent searches your customers actually make. When your ranking drops, you get an alert before you lose the customer. It reads your listing data from <Link href="/publish" className="font-semibold hover:underline" style={{color: '#064A6C'}}>/ publish</Link> and review signals from <Link href="/elevate" className="font-semibold hover:underline" style={{color: '#E9B307'}}>/ elevate</Link> to give you a complete local SEO score.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Keyword Rankings</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Weekly Alerts</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Local SEO Score</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Technical SEO</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/anchor"><Button style={{ backgroundColor: '#FF6B00' }} className="text-white font-bold">Add Anchor Suite — $99/mo</Button></Link>
            <Link href="/anchor"><Button style={{ backgroundColor: '#2073E3' }} className="text-white ml-4">See All 4 Apps</Button></Link>
            <p className="text-sm text-gray-500 mt-3">Or get each app for $29/mo standalone.</p>
          </div>
        </div>
      </section>

      {/* Section 3: / compass suite */}
      <section className="bg-white py-20 border-b border-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BundleHeader bundleId="compass" />
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">Your Customers Are Reaching Out. Are You There?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A customer texts. Another sends a Facebook message. A third starts a chat on your website. If those messages live in different apps, some of them don't get answered. The Compass Suite puts every conversation in one place and gives you the tools to start them.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-3"><Link href="/engage" className="hover:underline" style={{color: '#660099'}}>/ engage</Link> talks directly to <Link href="/respond" className="hover:underline" style={{color: '#001882'}}>/ respond</Link></h3>
            <p className="text-gray-600 text-sm mb-4">Install <Link href="/engage" className="font-semibold hover:underline" style={{color: '#660099'}}>/ engage</Link> on your website — one line of code — and every chat your visitors start flows directly into <Link href="/respond" className="font-semibold hover:underline" style={{color: '#001882'}}>/ respond</Link>. You don't check two places. A visitor chats on your website at 2pm, you reply from the same inbox where your Facebook and Instagram messages live. The conversation logs automatically in <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link> against the customer's record. Nothing gets lost.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/engage"><span className="text-xs bg-white border border-purple-300 text-purple-700 px-3 py-1 rounded-full hover:underline">/ engage — website chat</span></Link>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <Link href="/respond"><span className="text-xs bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded-full hover:underline">/ respond — unified inbox</span></Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#001882' }}>
              <Link href="/respond"><AppName appId="respond" size="md" /></Link>
              <p className="text-gray-600 text-sm mt-3 mb-4"><Link href="/respond" className="font-semibold hover:underline" style={{color: '#001882'}}>/ respond</Link> is the inbox every other Compass app feeds into. Facebook Messenger, Instagram DM, and SMS all arrive here. Set it up first — because without it, the responses from <Link href="/engage" className="font-semibold hover:underline" style={{color: '#660099'}}>/ engage</Link> and <Link href="/promote" className="font-semibold hover:underline" style={{color: '#1844A6'}}>/ promote</Link> have nowhere to go.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Facebook Messenger</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Instagram DM</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">SMS</span>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#660099' }}>
              <Link href="/engage"><AppName appId="engage" size="md" /></Link>
              <p className="text-gray-600 text-sm mt-3 mb-4">One line of code. That's all it takes to add a live chat widget to your website that routes every conversation into <Link href="/respond" className="font-semibold hover:underline" style={{color: '#001882'}}>/ respond</Link> automatically. Most website visitors leave without saying a word. <Link href="/engage" className="font-semibold hover:underline" style={{color: '#660099'}}>/ engage</Link> gives them a reason to stay and a way to reach you.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">One Line of Code</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Custom Widget</span>
                <Link href="/respond"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:underline">Auto-Routes to / respond</span></Link>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#FF44CC' }}>
              <Link href="/post"><AppName appId="post" size="md" /></Link>
              <p className="text-gray-600 text-sm mt-3 mb-4">Write once, schedule once, post everywhere. <Link href="/post" className="font-semibold hover:underline" style={{color: '#FF44CC'}}>/ post</Link> connects Facebook, Instagram, LinkedIn, X, and your Google Business account. Plan your content for the week, set the times, and let it run. Your social presence stays active without requiring you to be.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Facebook</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Instagram</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">LinkedIn</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">X</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Google Business</span>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 border-l-4" style={{ borderColor: '#1844A6' }}>
              <Link href="/promote"><AppName appId="promote" size="md" /></Link>
              <p className="text-gray-600 text-sm mt-3 mb-4">Email is still the highest-return marketing channel available to small businesses. <Link href="/promote" className="font-semibold hover:underline" style={{color: '#1844A6'}}>/ promote</Link> comes last in the Compass Suite because your best email list comes from the customers already in <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link>. Campaign builder, list segmentation, scheduling, and delivery analytics built in. 1,000 emails per month included. Unused emails roll over.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Campaign Builder</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">List Segmentation</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">1,000 Emails/mo</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/compass"><Button style={{ backgroundColor: '#FF6B00' }} className="text-white font-bold">Add Compass Suite — $99/mo</Button></Link>
            <Link href="/compass"><Button style={{ backgroundColor: '#F97316' }} className="text-white ml-4">See All 4 Apps</Button></Link>
            <p className="text-sm text-gray-500 mt-3">Or get each app for $29/mo standalone.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Coach Blue */}
      <section className="bg-gray-50 py-20 border-b border-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center mb-12 lg:mb-0">
              <img src={coachBlueLarge} alt="Coach Blue" style={{ width: 360, height: 360, objectFit: 'contain' }} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#0000FF' }}>YOUR AI BUSINESS COACH</p>
              <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}><Link href="/coach-blue" className="hover:underline" style={{color: '#0000FF'}}>Coach Blue</Link></h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Difference Between Data and Direction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Every app in businessblueprint.io generates data. Your review scores. Your ranking changes. Your chat volume. Your email open rates. Most platforms give you that data and leave you to figure out what to do with it. <Link href="/coach-blue" className="font-semibold hover:underline" style={{color: '#0000FF'}}>Coach Blue</Link> reads all of it and tells you specifically what to act on today.</p>
              <p className="text-gray-600 leading-relaxed mb-4">He's built into every authenticated page as a persistent sidebar — not a chatbot, not a help widget. When your listing gets an unauthorized edit, he alerts you. When your review response time slips, he tells you. When you've set up <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link> but haven't started <Link href="/publish" className="font-semibold hover:underline" style={{color: '#064A6C'}}>/ publish</Link> yet, he explains exactly why that needs to happen next and walks you through it.</p>
              <p className="text-gray-600 leading-relaxed mb-8"><Link href="/coach-blue" className="font-semibold hover:underline" style={{color: '#0000FF'}}>Coach Blue</Link> is $99/mo standalone. With one suite active — Anchor or Compass — he's $59/mo. With both suites active, he's free. The more you build, the less he costs.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/coach-blue"><Button style={{ backgroundColor: '#FF6B00' }} className="text-white font-bold">Add to Cart — $99/mo</Button></Link>
                <Link href="/coach-blue"><Button style={{ backgroundColor: '#0000FF' }} className="text-white">Meet Coach Blue</Button></Link>
                <Link href="/pricing"><Button variant="outline" style={{ borderColor: '#0000FF', color: '#0000FF' }}>View All Pricing</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Integration */}
      <section className="bg-[#09080E] py-20 border-b border-[#09080E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">BUILT TO WORK TOGETHER</p>
            <h2 className="text-3xl font-bold text-white mb-4">We Built the Most Connected Set of Apps We Knew How to Build</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-4">Every app in businessblueprint.io was designed with the others in mind. Not added on later. Not bolted together. Designed from the start to share data, trigger actions, and make each other more powerful.</p>
            <p className="text-gray-300 max-w-3xl mx-auto">And we priced it the way we did on purpose. Because every small business owner deserves access to the tools that used to cost enterprise budgets — and the future shouldn't only belong to the businesses that can already afford to compete in it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <ArrowRight className="w-8 h-8 mb-4 text-[#97ACCA]" />
              <h4 className="text-gray-900 font-bold mb-2"><Link href="/publish" className="hover:underline" style={{color: '#064A6C'}}>/ publish</Link> hours pause <Link href="/amplify" className="hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link> ads</h4>
              <p className="text-gray-600 text-sm">Your business hours in <Link href="/publish" className="font-semibold hover:underline" style={{color: '#064A6C'}}>/ publish</Link> automatically sync to your ad schedules in <Link href="/amplify" className="font-semibold hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link>. When you close, your ads pause. When you open, they resume. You stop paying for clicks you can't convert.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <Star className="w-8 h-8 mb-4 text-[#E9B307]" />
              <h4 className="text-gray-900 font-bold mb-2"><Link href="/elevate" className="hover:underline" style={{color: '#E9B307'}}>/ elevate</Link> reviews power <Link href="/amplify" className="hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link> ads</h4>
              <p className="text-gray-600 text-sm">Your current star rating from <Link href="/elevate" className="font-semibold hover:underline" style={{color: '#E9B307'}}>/ elevate</Link> feeds into your <Link href="/amplify" className="font-semibold hover:underline" style={{color: '#97ACCA'}}>/ amplify</Link> ad copy automatically. 'Rated 4.8 stars by 140 customers' — updated in real time as your reviews change. Your best proof point stays current without you touching anything.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <MessageCircle className="w-8 h-8 mb-4 text-[#660099]" />
              <h4 className="text-gray-900 font-bold mb-2"><Link href="/engage" className="hover:underline" style={{color: '#660099'}}>/ engage</Link> chats log in <Link href="/connect" className="hover:underline" style={{color: '#008060'}}>/ connect</Link></h4>
              <p className="text-gray-600 text-sm">Every website chat from <Link href="/engage" className="font-semibold hover:underline" style={{color: '#660099'}}>/ engage</Link> links to a contact record in <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link>. If the visitor becomes a customer, the entire conversation history is already there. No copy-paste. No manual entry. No lost context.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <Mail className="w-8 h-8 mb-4 text-[#1844A6]" />
              <h4 className="text-gray-900 font-bold mb-2"><Link href="/promote" className="hover:underline" style={{color: '#1844A6'}}>/ promote</Link> draws from <Link href="/connect" className="hover:underline" style={{color: '#008060'}}>/ connect</Link> lists</h4>
              <p className="text-gray-600 text-sm">Your email campaigns in <Link href="/promote" className="font-semibold hover:underline" style={{color: '#1844A6'}}>/ promote</Link> use your actual customer lists from <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link>. Segment by industry, by location, by last contact date. The list is always current because <Link href="/connect" className="font-semibold hover:underline" style={{color: '#008060'}}>/ connect</Link> is always current.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <Target className="w-8 h-8 mb-4 text-gray-300" />
              <h4 className="text-gray-900 font-bold mb-2"><Link href="/optimize" className="hover:underline" style={{color: '#374151'}}>/ optimize</Link> reads <Link href="/publish" className="hover:underline" style={{color: '#064A6C'}}>/ publish</Link> and <Link href="/elevate" className="hover:underline" style={{color: '#E9B307'}}>/ elevate</Link></h4>
              <p className="text-gray-600 text-sm">Your local SEO score in <Link href="/optimize" className="font-semibold hover:underline" style={{color: '#374151'}}>/ optimize</Link> is calculated from your listing consistency in <Link href="/publish" className="font-semibold hover:underline" style={{color: '#064A6C'}}>/ publish</Link> and your review signals from <Link href="/elevate" className="font-semibold hover:underline" style={{color: '#E9B307'}}>/ elevate</Link>. Fix your listings — your SEO improves. Get more reviews — it improves further. The apps make each other better.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <GraduationCap className="w-8 h-8 mb-4 text-blue-400" />
              <h4 className="text-gray-900 font-bold mb-2"><Link href="/coach-blue" className="hover:underline" style={{color: '#0000FF'}}>Coach Blue</Link> reads everything</h4>
              <p className="text-gray-600 text-sm"><Link href="/coach-blue" className="font-semibold hover:underline" style={{color: '#0000FF'}}>Coach Blue</Link> has access to data from every app you've activated. He doesn't give generic advice — he gives advice based on what's actually happening in your businessblueprint.io. That's only possible because everything is connected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Business Is Already Out There. The Question Is What It's Saying.</h2>
            <p className="text-xl text-gray-600 mb-8">Take the Digital IQ Assessment. Free. Five minutes. No credit card. It shows you exactly what the internet says about your business right now — and what to do about it.</p>
            <Link href="/assessment"><Button style={{ backgroundColor: '#A00028' }} className="text-white font-bold px-10 py-4 text-lg rounded-lg">Start My Free Assessment →</Button></Link>
            <p className="text-sm text-gray-400 mt-4">Free · No credit card · Results in minutes</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { AppIcon } from "@/components/app-name";

const APP_COLORS: Record<string, string> = {
  publish: "#064A6C", elevate: "#E9B307", optimize: "#374151", amplify: "#97ACCA",
  promote: "#1844A6", respond: "#001882", engage: "#660099", post: "#FF44CC",
  connect: "#008060", convert: "#8000FF", scan: "#E00420", assess: "#960D71",
};

function SlashApp({ name, onDark }: { name: string; onDark?: boolean }) {
  const color = APP_COLORS[name] || "#09080E";
  return (
    <span style={{ fontWeight: 700 }}>
      <span style={{ color: onDark ? "#E9ECF0" : "#09080E" }}>/ </span>
      <span style={{ color }}>{name}</span>
    </span>
  );
}

export default function Journey() {
  return (
    <div className="min-h-screen bg-white">
      <Header showNavigation={true} />

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            From Invisible to Unstoppable
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Six steps. One platform. Everything your local business needs to get found, get trusted, and get customers — in the right order.
          </p>
          <p className="text-gray-400 text-sm text-center mt-3">12 minute read — worth every one of them.</p>
          <Link href="/assessment">
            <Button className="text-white font-bold px-8 py-3 text-lg" style={{ backgroundColor: "#A00028" }}>
              Start Free with Your Digital IQ Assessment →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ STEP 1 ═══ */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#A00028" }}>1</div>
            <div className="flex items-center gap-3">
              <AppIcon name="ClipboardCheck" size={40} color="#A00028" />
              <h2 className="text-3xl font-bold text-gray-900">Scan Your Digital Presence</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Most local businesses don't know where they actually stand online. They assume they have a presence. They don't know their website is losing customers on mobile. They don't know their reviews have gone unanswered for months. They don't know their business name, address, and phone number are listed differently across a dozen directories — and that inconsistency alone is enough to push them off the first page of local search results. They don't know three competitors are outranking them for their own service category. They don't know their website is invisible on mobile. The Digital IQ Assessment changes that in 5 minutes. Our scanner analyzes your entire digital footprint using Google Business Intelligence: your listing accuracy, review volume and rating, website performance, social media presence, local SEO positioning, and citation consistency across directories. Every category is scored. You get a Digital IQ Score and a breakdown showing exactly where you're strong and where you're losing ground to competitors.
          </p>
          <div className="bg-white border-l-4 p-6 rounded-lg shadow-sm mb-6" style={{ borderColor: "#A00028" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#A00028" }}>WHAT THIS MEANS FOR YOUR BUSINESS</p>
            <p className="text-gray-900 text-base leading-relaxed">You've spent years building a reputation in your community. The internet either confirms that reputation or contradicts it — and most business owners have no idea which. The Digital IQ Assessment is the first honest look at what a potential customer sees when they search for you.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 italic text-gray-600 text-sm">
            Your scores feed directly into Step 2 — the AI uses every category result to build your custom blueprint.
          </div>
          <Link href="/assessment">
            <Button className="text-white font-bold" style={{ backgroundColor: "#A00028" }}>
              Take Your Free Assessment →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ STEP 2 ═══ */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#FFC107" }}>2</div>
            <div className="flex items-center gap-3">
              <AppIcon name="FileText" size={40} color="#FFC107" />
              <h2 className="text-3xl font-bold text-gray-900">Receive Your Prescribed Blueprint</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Generic marketing advice is useless. A restaurant in Phoenix with 12 reviews and no Google listing has completely different needs than a law firm in Nashville with 200 reviews but no email list. Your blueprint is built from your scores — not a template. Our AI reads every category of your Digital IQ Assessment and prescribes a specific set of apps, in a specific order, with a specific explanation of why each one matters for your business right now. If your local SEO score is critically low, you go to the Anchor Suite first. If your communications are the gap, you go to Compass first. The blueprint tells you exactly what to do and in what sequence. It is not a PDF. It is a live action plan inside your dashboard that updates as your scores improve.
          </p>
          <div className="bg-white border-l-4 p-6 rounded-lg shadow-sm mb-6" style={{ borderColor: "#FFC107" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#FFC107" }}>WHAT THIS MEANS FOR YOUR BUSINESS</p>
            <p className="text-gray-900 text-base leading-relaxed">A plumber with 8 reviews and no Google listing needs a completely different plan than a dentist with 200 reviews and no email list. Generic advice wastes your time and your money. Your blueprint is built from your actual scores — it tells you what to fix, in what order, and why it matters for your specific business.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 italic text-gray-600 text-sm">
            The blueprint always recommends <SlashApp name="connect" /> first — because every app requires a data foundation to work properly.
          </div>
        </div>
      </section>

      {/* ═══ STEP 3 ═══ */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#008060" }}>3</div>
            <div className="flex items-center gap-3">
              <AppIcon name="Users" size={40} color="#008060" />
              <h2 className="text-3xl font-bold text-gray-900">Build Your Foundation — <SlashApp name="connect" /></h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Every app in businessblueprint.io pulls from and pushes to <SlashApp name="connect" />. Your contacts, companies, deals, and tasks live here. When a customer chats with you through <SlashApp name="engage" />, that conversation logs in <SlashApp name="connect" />. When <SlashApp name="elevate" /> surfaces a new review from a known contact, it links to their record. When <SlashApp name="promote" /> sends a campaign, it draws from your <SlashApp name="connect" /> lists. This is why <SlashApp name="connect" /> comes before everything else — it is the hub the entire platform is built around. <SlashApp name="connect" /> starts free for up to 250 contacts. When you're ready for unlimited contacts and full CRM capabilities, the Performance plan is $29/mo.
          </p>
          <div className="bg-white border-l-4 p-6 rounded-lg shadow-sm mb-6" style={{ borderColor: "#008060" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#008060" }}>WHAT THIS MEANS FOR YOUR BUSINESS</p>
            <p className="text-gray-900 text-base leading-relaxed">Every customer you've ever served, every conversation you've ever had — it all belongs in one place. <SlashApp name="connect" /> is that place. Once it's set up, every other app feeds into it automatically. You'll never lose track of a customer again.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 italic text-gray-600 text-sm">
            Every app activated in Steps 4 and 5 flows data automatically into <SlashApp name="connect" />. Set it up once. It connects everything.
          </div>
          <Link href="/connect">
            <Button className="text-white font-bold" style={{ backgroundColor: "#008060" }}>
              Start with <SlashApp name="connect" /> Free →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ STEP 4 ═══ */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#2073E3" }}>4</div>
            <div className="flex items-center gap-3">
              <AppIcon name="Anchor" size={40} color="#2073E3" />
              <h2 className="text-3xl font-bold text-gray-900">Own Your Local Presence — Anchor Suite</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Before you spend a dollar on advertising or send a single email, your local presence needs to be solid. This is the most overlooked step in local business marketing and the one with the highest return on getting it right.
          </p>

          {/* / publish */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#064A6C" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="BookOpen" size={24} color="#064A6C" /> <SlashApp name="publish" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="publish" /> starts with the two most critical listings any local business can have. Your Google Business Profile — our AI guides you through every field, validates the information before submission, and locks the listing after approval to prevent unauthorized edits. Your D&B DUNS number — the global standard business identifier that syndicates your information to 80+ downstream platforms including Apple Maps, Bing, Yahoo Local, MapQuest, and more. <SlashApp name="publish" /> then manages your presence across all major directories from one dashboard. NAP consistency — your Name, Address, and Phone — is monitored weekly and any mismatch is flagged immediately.
            </p>
          </div>

          {/* / elevate */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#E9B307" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Star" size={24} color="#E9B307" /> <SlashApp name="elevate" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="elevate" /> aggregates your reviews from Google, Yelp, and Facebook into one dashboard. New reviews trigger an AI-drafted response for your approval — or auto-publish if you prefer. Review request campaigns send follow-up emails or SMS after transactions. Your rating trend is tracked over time and drops trigger immediate alerts.
            </p>
          </div>

          {/* / optimize */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#374151" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Target" size={24} color="#374151" /> <SlashApp name="optimize" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="optimize" /> tracks where you rank for the local-intent keywords your customers actually search. Technical SEO, on-page health, and local ranking signals are scored and monitored weekly. When your ranking drops on a keyword, you're alerted before you lose the customer. <SlashApp name="optimize" /> reads your <SlashApp name="publish" /> listing data and your <SlashApp name="elevate" /> review data to give you a complete picture of your local SEO health.
            </p>
          </div>

          {/* / amplify */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#97ACCA" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Megaphone" size={24} color="#97ACCA" /> <SlashApp name="amplify" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="amplify" /> runs paid advertising across Meta, Google, and Microsoft. It is the last Anchor app for a reason — you never run ads on a weak local presence. By the time you reach <SlashApp name="amplify" />, your listings are clean, your reviews are managed, and your SEO baseline is set. <SlashApp name="amplify" /> syncs your business hours from <SlashApp name="publish" /> into ad scheduling automatically and injects your <SlashApp name="elevate" /> rating into ad copy in real time.
            </p>
          </div>

          <div className="bg-white border-l-4 p-6 rounded-lg shadow-sm mb-6" style={{ borderColor: "#2073E3" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#2073E3" }}>WHAT THIS MEANS FOR YOUR BUSINESS</p>
            <p className="text-gray-900 text-base leading-relaxed">Most business owners assume their Google listing is fine. It's usually not. Hours wrong, photos missing, categories mismatched — and anyone on the internet can submit an edit. <SlashApp name="publish" /> fixes all of it, locks your listing down, and makes sure the information people find about your business is accurate everywhere they look.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 italic text-gray-600 text-sm">
            All four Anchor apps share data through <SlashApp name="connect" />. Listing hours from <SlashApp name="publish" /> pause <SlashApp name="amplify" /> ads when you're closed. <SlashApp name="optimize" /> reads from <SlashApp name="publish" /> and <SlashApp name="elevate" />. Review data from <SlashApp name="elevate" /> improves <SlashApp name="amplify" /> ad copy automatically.
          </div>
        </div>
      </section>

      {/* ═══ STEP 5 ═══ */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#FF6B00" }}>5</div>
            <div className="flex items-center gap-3">
              <AppIcon name="Compass" size={40} color="#FF6B00" />
              <h2 className="text-3xl font-bold text-gray-900">Activate Your Communications — Compass Suite</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed">
            With your local presence solid and your foundation in place, it's time to activate your communications. The Compass Suite connects you to your customers across every channel — and routes all of it through <SlashApp name="connect" />.
          </p>

          {/* / respond */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#001882" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Inbox" size={24} color="#001882" /> <SlashApp name="respond" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="respond" /> comes first in the Compass Suite because it's the container that receives everything else. Facebook Messenger, Instagram DM, and SMS messages all land in one inbox. Before you put a chat widget on your website or run an email campaign, you need a place for the responses to go. <SlashApp name="respond" /> is that place.
            </p>
          </div>

          {/* / engage */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#660099" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="MessageCircle" size={24} color="#660099" /> <SlashApp name="engage" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="engage" /> installs on your website in one line of code. Visitors can chat with you in real time. When they do, the conversation automatically flows into <SlashApp name="respond" /> and logs against their contact record in <SlashApp name="connect" />. You customize the widget, write your greeting, and set auto-responses for your most common questions.
            </p>
          </div>

          {/* / post */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#FF44CC" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Share2" size={24} color="#FF44CC" /> <SlashApp name="post" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="post" /> connects your Facebook, Instagram, LinkedIn, X, and Google Business accounts and lets you schedule content across all of them from one place. Write once, post everywhere, on a schedule that matches when your audience is actually online.
            </p>
          </div>

          {/* / promote */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#1844A6" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Mail" size={24} color="#1844A6" /> <SlashApp name="promote" />
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <SlashApp name="promote" /> is the last Compass app because email campaigns are most effective when your list comes from real customer relationships already in <SlashApp name="connect" />. Campaign builder, list segmentation, scheduling, and delivery analytics — all built in. 1,000 emails per month included, unused roll over up to 2,000.
            </p>
          </div>

          <div className="bg-white border-l-4 p-6 rounded-lg shadow-sm mb-6" style={{ borderColor: "#FF6B00" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#FF6B00" }}>WHAT THIS MEANS FOR YOUR BUSINESS</p>
            <p className="text-gray-900 text-base leading-relaxed">Your customers don't all reach out the same way. Some text. Some use Facebook. Some fill out your website form. If those messages are scattered across different apps, some of them don't get answered. Unanswered messages become lost customers. The Compass Suite puts every message in one place.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 italic text-gray-600 text-sm">
            Every Compass app routes through <SlashApp name="respond" /> and logs into <SlashApp name="connect" />. <SlashApp name="promote" /> draws lists from <SlashApp name="connect" /> contacts. <SlashApp name="engage" /> conversations link to <SlashApp name="connect" /> records.
          </div>
        </div>
      </section>

      {/* ═══ STEP 6 ═══ */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#001BB2" }}>6</div>
            <div className="flex items-center gap-3">
              <img src="https://cdn.triadblue.com/brands/coachblue/logo-image.png" alt="Coach Blue" width={56} height={56} style={{ borderRadius: 8, objectFit: "contain" }} />
              <h2 className="text-3xl font-bold text-gray-900">Never Grow Alone — Coach Blue</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Coach Blue is not a help widget. He is an AI business coach built into every page of businessblueprint.io — persistent, proactive, and always watching your data. He guides your setup in the exact order that produces results. He walks you through each app step by step and picks up exactly where you left off every time you return. When your Google listing gets an unauthorized edit, Coach Blue alerts you. When your average review response time exceeds 10 minutes, he tells you. When your <SlashApp name="engage" /> widget has been live for a week with no conversations, he suggests exactly what to change. Coach Blue is $99/mo standalone. With one suite active, $59/mo. With both Anchor and Compass suites active, Coach Blue is free.
          </p>
          <div className="bg-white border-l-4 p-6 rounded-lg shadow-sm mb-6" style={{ borderColor: "#001BB2" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#001BB2" }}>WHAT THIS MEANS FOR YOUR BUSINESS</p>
            <p className="text-gray-900 text-base leading-relaxed">There's a difference between having information and knowing what to do with it. Coach Blue watches all your data — your scores, your apps, your activity — and tells you specifically what to act on today. Not a dashboard. A coach.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 italic text-gray-600 text-sm">
            Coach Blue reads data from every app and uses all of it to give you advice specific to your business.
          </div>
          <Link href="/coach-blue">
            <Button className="text-white font-bold" style={{ backgroundColor: "#001BB2" }}>
              Meet Coach Blue →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gray-400 text-xs uppercase tracking-widest mb-4 block text-center">YOU'VE READ THE STEPS</span>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-lg text-white mb-8">
            Take your free Digital IQ Assessment. It takes 5 minutes and shows you exactly where your business stands.
          </p>
          <Link href="/assessment">
            <Button className="text-white font-bold px-8 py-3 text-lg" style={{ backgroundColor: "#A00028" }}>
              Start My Free Assessment →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

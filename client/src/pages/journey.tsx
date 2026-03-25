import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { AppIcon } from "@/components/app-name";
import coachBlueIcon from "@assets/images_logos/coachblue48.png";

export default function Journey() {
  return (
    <div className="min-h-screen bg-white">
      <Header showNavigation={true} />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            From Invisible to Unstoppable
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Six steps. One platform. Everything your local business needs to get found, get trusted, and get customers — in the right order.
          </p>
          <Link href="/assessment">
            <Button className="text-white font-bold px-8 py-3 text-lg" style={{ backgroundColor: "#A00028" }}>
              Start Free with Your Digital IQ Assessment →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ STEP 1 ═══ */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#A00028" }}>1</div>
            <div className="flex items-center gap-3">
              <AppIcon name="ClipboardCheck" size={40} color="#A00028" />
              <h2 className="text-3xl font-bold text-gray-900">Scan Your Digital Presence</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Most local businesses don't know where they actually stand online. They assume they have a presence. They don't know their Google Business listing has wrong hours. They don't know three competitors are outranking them for their own service category. They don't know their website is invisible on mobile. The Digital IQ Assessment changes that in 5 minutes. Our scanner analyzes your entire digital footprint using Google Business Intelligence: your listing accuracy, review volume and rating, website performance, social media presence, local SEO positioning, and citation consistency across directories. Every category is scored. You get a Digital IQ Score and a breakdown showing exactly where you're strong and where you're losing ground to competitors.
          </p>
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
      <section className="bg-gray-50 py-16">
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
          <div className="bg-gray-100 rounded-lg p-4 italic text-gray-600 text-sm">
            The blueprint always recommends / connect first — because every app requires a data foundation to work properly.
          </div>
        </div>
      </section>

      {/* ═══ STEP 3 ═══ */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#008060" }}>3</div>
            <div className="flex items-center gap-3">
              <AppIcon name="Users" size={40} color="#008060" />
              <h2 className="text-3xl font-bold text-gray-900">Build Your Foundation — / connect</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Every app in businessblueprint pulls from and pushes to / connect. Your contacts, companies, deals, and tasks live here. When a customer chats with you through / engage, that conversation logs in / connect. When / elevate surfaces a new review from a known contact, it links to their record. When / promote sends a campaign, it draws from your / connect lists. This is why / connect comes before everything else — it is the hub the entire platform is built around. / connect starts free for up to 250 contacts. When you're ready for unlimited contacts and full CRM capabilities, the Performance plan is $29/mo.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 italic text-gray-600 text-sm">
            Every app activated in Steps 4 and 5 flows data automatically into / connect. Set it up once. It connects everything.
          </div>
          <Link href="/connect">
            <Button className="text-white font-bold" style={{ backgroundColor: "#008060" }}>
              Start with / connect Free →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ STEP 4 ═══ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#064A6C" }}>4</div>
            <div className="flex items-center gap-3">
              <AppIcon name="Anchor" size={40} color="#064A6C" />
              <h2 className="text-3xl font-bold text-gray-900">Own Your Local Presence — / anchor suite</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Before you spend a dollar on advertising or send a single email, your local presence needs to be solid. This is the most overlooked step in local business marketing and the one with the highest return on getting it right.
          </p>

          {/* / publish */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#064A6C" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="BookOpen" size={24} color="#064A6C" /> / publish
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / publish starts with the two most critical listings any local business can have. Your Google Business Profile — our AI guides you through every field, validates the information before submission, and locks the listing after approval to prevent unauthorized edits. Your D&B DUNS number — the global standard business identifier that syndicates your information to 80+ downstream platforms including Apple Maps, Bing, Yahoo Local, MapQuest, and more. / publish then manages your presence across all major directories from one dashboard. NAP consistency — your Name, Address, and Phone — is monitored weekly and any mismatch is flagged immediately.
            </p>
          </div>

          {/* / elevate */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#E9B307" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Star" size={24} color="#E9B307" /> / elevate
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / elevate aggregates your reviews from Google, Yelp, and Facebook into one dashboard. New reviews trigger an AI-drafted response for your approval — or auto-publish if you prefer. Review request campaigns send follow-up emails or SMS after transactions. Your rating trend is tracked over time and drops trigger immediate alerts.
            </p>
          </div>

          {/* / optimize */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#374151" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Target" size={24} color="#374151" /> / optimize
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / optimize tracks where you rank for the local-intent keywords your customers actually search. Technical SEO, on-page health, and local ranking signals are scored and monitored weekly. When your ranking drops on a keyword, you're alerted before you lose the customer. / optimize reads your / publish listing data and your / elevate review data to give you a complete picture of your local SEO health.
            </p>
          </div>

          {/* / amplify */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#6EA6FF" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Megaphone" size={24} color="#6EA6FF" /> / amplify
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / amplify runs paid advertising across Meta, Google, and Microsoft. It is the last Anchor app for a reason — you never run ads on a weak local presence. By the time you reach / amplify, your listings are clean, your reviews are managed, and your SEO baseline is set. / amplify syncs your business hours from / publish into ad scheduling automatically and injects your / elevate rating into ad copy in real time.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 italic text-gray-600 text-sm">
            All four Anchor apps share data through / connect. Listing hours from / publish pause / amplify ads when you're closed. / optimize reads from / publish and / elevate. Review data from / elevate improves / amplify ad copy automatically.
          </div>
        </div>
      </section>

      {/* ═══ STEP 5 ═══ */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#F97316" }}>5</div>
            <div className="flex items-center gap-3">
              <AppIcon name="Compass" size={40} color="#F97316" />
              <h2 className="text-3xl font-bold text-gray-900">Activate Your Communications — / compass suite</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed">
            With your local presence solid and your foundation in place, it's time to activate your communications. The Compass Suite connects you to your customers across every channel — and routes all of it through / connect.
          </p>

          {/* / respond */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#001882" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Inbox" size={24} color="#001882" /> / respond
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / respond comes first in the Compass Suite because it's the container that receives everything else. Facebook Messenger, Instagram DM, and SMS messages all land in one inbox. Before you put a chat widget on your website or run an email campaign, you need a place for the responses to go. / respond is that place.
            </p>
          </div>

          {/* / engage */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#660099" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="MessageCircle" size={24} color="#660099" /> / engage
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / engage installs on your website in one line of code. Visitors can chat with you in real time. When they do, the conversation automatically flows into / respond and logs against their contact record in / connect. You customize the widget, write your greeting, and set auto-responses for your most common questions.
            </p>
          </div>

          {/* / post */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#FF44CC" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Share2" size={24} color="#FF44CC" /> / post
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / post connects your Facebook, Instagram, LinkedIn, X, and Google Business accounts and lets you schedule content across all of them from one place. Write once, post everywhere, on a schedule that matches when your audience is actually online.
            </p>
          </div>

          {/* / promote */}
          <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "#1844A6" }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AppIcon name="Mail" size={24} color="#1844A6" /> / promote
            </h3>
            <p className="text-gray-600 leading-relaxed">
              / promote is the last Compass app because email campaigns are most effective when your list comes from real customer relationships already in / connect. Campaign builder, list segmentation, scheduling, and delivery analytics — all built in. 1,000 emails per month included, unused roll over up to 2,000.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 italic text-gray-600 text-sm">
            Every Compass app routes through / respond and logs into / connect. / promote draws lists from / connect contacts. / engage conversations link to / connect records.
          </div>
        </div>
      </section>

      {/* ═══ STEP 6 ═══ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: "#0000FF" }}>6</div>
            <div className="flex items-center gap-3">
              <img src={coachBlueIcon} alt="Coach Blue" width={40} height={40} style={{ borderRadius: 8, objectFit: "contain" }} />
              <h2 className="text-3xl font-bold text-gray-900">Never Grow Alone — Coach Blue</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Coach Blue is not a help widget. He is an AI business coach built into every page of businessblueprint — persistent, proactive, and always watching your data. He guides your setup in the exact order that produces results. He walks you through each app step by step and picks up exactly where you left off every time you return. When your Google listing gets an unauthorized edit, Coach Blue alerts you. When your average review response time exceeds 10 minutes, he tells you. When your / engage widget has been live for a week with no conversations, he suggests exactly what to change. Coach Blue is $99/mo standalone. With one suite active, $59/mo. With both Anchor and Compass suites active, Coach Blue is free.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 italic text-gray-600 text-sm">
            Coach Blue reads data from every app and uses all of it to give you advice specific to your business.
          </div>
          <Link href="/coach-blue">
            <Button className="text-white font-bold" style={{ backgroundColor: "#0000FF" }}>
              Meet Coach Blue →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

export interface ControlledResponse {
  trigger: string[];              // array of keyword/phrase patterns to match
  response: string;               // exact response Coach Blue gives
  priority: "critical" | "standard";
  category: string;
}

export const CONTROLLED_RESPONSES: ControlledResponse[] = [
  {
    trigger: ["cancel", "cancel subscription", "cancel my account", "how do i cancel"],
    response: "You can manage your subscription from Settings in the left sidebar — look for the Billing section. If you're thinking about canceling, I'd love to understand what's not working. I might be able to help solve it before you go.",
    priority: "critical",
    category: "billing",
  },
  {
    trigger: ["digital iq", "my score", "what is my score", "digital iq score"],
    response: "Your Digital IQ score measures your online presence across 9 key areas, each weighted by how much it impacts your visibility and revenue. Click 'Digital IQ' in the left sidebar to see your full breakdown. I can explain any specific area if you want to dig deeper.",
    priority: "critical",
    category: "scoring",
  },
  {
    trigger: ["what order", "where do i start", "what should i do first", "setup order", "what order should i set up"],
    response: "Follow your Directions for Use — click it in the left sidebar under your guide section. It's customized to your prescription. The general order is: 1. / connect (your foundation), 2. / publish (get found online), 3. / elevate (manage your reputation), then communications and advertising. Each step builds on the last.",
    priority: "critical",
    category: "setup",
  },
  {
    trigger: ["how much", "pricing", "what does it cost", "price"],
    response: "Here's how pricing works: individual apps are $29/mo each. The Anchor Suite bundles / publish, / elevate, / optimize, and / amplify for $99/mo. The Compass Suite bundles / promote, / engage, / respond, and / post for $99/mo. / connect CRM has a free Starter tier (100 contacts) or $29/mo for unlimited. I'm $99/mo standalone, $59/mo if you have one suite, and free if you have both suites. All payments go through swipesblue.",
    priority: "critical",
    category: "billing",
  },
  {
    trigger: ["what is connect", "what does connect do", "tell me about connect"],
    response: "/ connect is your CRM — the central hub where all your contacts, deals, and customer data lives. Every other app reads from and writes to / connect. When someone fills out your / engage chat widget, they become a contact in / connect. When you send campaigns from / promote, you're sending to your / connect lists. It's the foundation — that's why it's always step 1 in your Directions for Use.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is publish", "what does publish do", "tell me about publish"],
    response: "/ publish manages your business listings across online directories — Google, Yelp, Apple Maps, Facebook, and dozens more. It makes sure your name, address, phone number, and hours are correct everywhere. When that info is inconsistent, Google penalizes your search ranking. / publish fixes that and monitors for changes.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is elevate", "what does elevate do", "tell me about elevate"],
    response: "/ elevate is your reputation manager. It pulls in reviews from Google, Yelp, Facebook, and other platforms into one place so you can see and respond to all of them. It helps you request new reviews from happy customers and gives you templates for responding to negative ones. Reviews are the #1 factor in local purchase decisions.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is promote", "what does promote do", "tell me about promote"],
    response: "/ promote is your email campaign tool. You build and send email campaigns to your / connect contact lists — newsletters, promotions, announcements, automated sequences. It tracks opens, clicks, and conversions so you know what's working.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is engage", "what does engage do", "tell me about engage"],
    response: "/ engage is a live chat widget you install on your website. When visitors have questions, they can chat with you in real time. Every conversation flows into / respond (your unified inbox) and every visitor becomes a contact in / connect.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is respond", "what does respond do", "tell me about respond"],
    response: "/ respond is your unified inbox. Messages from email, chat, social media, and SMS all land in one place. You never miss a message and you never have to check five different platforms. Everything is connected back to the contact in / connect.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is post", "what does post do", "tell me about post"],
    response: "/ post is your social media management tool. Schedule and publish content across Facebook, Instagram, LinkedIn, and more from one dashboard. It helps you stay consistent — which is the single biggest factor in social media success.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is optimize", "what does optimize do", "tell me about optimize"],
    response: "/ optimize monitors your SEO health — keyword rankings, site performance, backlinks, and technical issues that affect your search visibility. It shows you what's working and what needs attention so you can climb higher in search results.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["what is amplify", "what does amplify do", "tell me about amplify"],
    response: "/ amplify is your advertising platform. Run paid ads across Google, Meta (Facebook/Instagram), and Reddit from one dashboard. It uses data from your other apps — your / connect contacts, your / publish listing hours, your / elevate reviews — to make your ads smarter and more targeted.",
    priority: "standard",
    category: "apps",
  },
  {
    trigger: ["compass suite", "what is compass", "compass bundle"],
    response: "The Compass Suite is your communications bundle — $99/mo for four apps: / promote (email campaigns), / engage (live chat widget), / respond (unified inbox), and / post (social media management). Buying the suite saves you $17/mo versus buying all four apps individually at $29 each.",
    priority: "standard",
    category: "suites",
  },
  {
    trigger: ["anchor suite", "what is anchor", "anchor bundle"],
    response: "The Anchor Suite is your local presence bundle — $99/mo for four apps: / publish (directory listings), / elevate (reputation management), / optimize (SEO monitoring), and / amplify (advertising). It covers everything you need to be found locally and manage how your business appears online.",
    priority: "standard",
    category: "suites",
  },
  {
    trigger: ["directions for use", "setup checklist", "what do i do next", "next step"],
    response: "Your Directions for Use is in the left sidebar — click it to see your personalized setup checklist. It shows every step you need to complete, organized by app in the order that matters most. You can check off steps as you go, add your own notes, and track your progress. Start at the top and work your way down.",
    priority: "critical",
    category: "setup",
  },
  {
    trigger: ["support", "help", "talk to someone", "contact support"],
    response: "For support, you can use the chat widget in the bottom-right corner — the Support Agent tab connects you with our team. You can also email support@businessblueprint.io. If you have a question about setup or strategy, I can help with that right here.",
    priority: "standard",
    category: "support",
  },
  {
    trigger: ["hostsblue", "hosting", "domain", "website builder"],
    response: "hostsblue.com is our cloud hosting platform — domains, hosting, email, website builder, and SSL certificates. If you need a website or want to improve your current one, that's where to start. Visit hostsblue.com to explore plans.",
    priority: "standard",
    category: "ecosystem",
  },
  {
    trigger: ["swipesblue", "payment", "payment processing"],
    response: "swipesblue.com is our payment processing platform. All billing and payment processing across the businessblueprint.io ecosystem goes through swipesblue. If you have billing questions, check Settings in the left sidebar.",
    priority: "standard",
    category: "ecosystem",
  },
];

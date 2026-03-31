export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  benefits: string[];
  icon?: string;
  url: string;
  bundle?: string;
  isPartner?: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  savings: string;
  products: string[];
  benefits: string[];
  icon?: string;
  url: string;
}

export const PRODUCTS: Record<string, Product> = {
  respond: {
    id: 'respond',
    name: '/ respond',
    description: 'Unified Multi-Channel Inbox — Consolidates email, SMS, social messages, live chat into ONE inbox',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Consolidates all messages into ONE inbox',
      'Never miss a customer message again',
      'Respond faster, close more deals',
      'Track response times and conversation history',
      'Works across email, SMS, social, and chat'
    ],
    url: '/respond',
    bundle: 'compass'
  },
  promote: {
    id: 'promote',
    name: '/ promote',
    description: 'Email Campaign Manager — Build and segment your customer list, create campaigns',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Build and segment your customer list',
      'Create professional email campaigns in minutes',
      'Send targeted SMS messages',
      'Automated drip campaigns that run themselves',
      'Track open rates, clicks, and conversions'
    ],
    url: '/promote',
    bundle: 'compass'
  },
  post: {
    id: 'post',
    name: '/ post',
    description: 'Social Media Manager — Schedule posts, create content with AI, track engagement',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Schedule posts across all platforms',
      'Create engaging content with AI assistance',
      'Track engagement and performance',
      'Respond to comments and DMs',
      'Content calendar and planning tools'
    ],
    url: '/post',
    bundle: 'compass'
  },
  engage: {
    id: 'engage',
    name: '/ engage',
    description: 'Live Chat Widget — Real-time customer support and lead capture',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Real-time customer support',
      'Proactive chat invitations',
      'Mobile app for on-the-go responses',
      'Chat transcripts and history',
      'Lead capture and qualification'
    ],
    url: '/engage',
    bundle: 'compass'
  },
  publish: {
    id: 'publish',
    name: '/ publish',
    description: 'Business Listings Manager — Manage 50+ directory listings from one dashboard',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Manage 50+ directory listings from one dashboard',
      'Ensure NAP (Name, Address, Phone) consistency',
      'Update hours, services, photos across all platforms',
      'Monitor listing performance',
      'Fix duplicate and incorrect listings'
    ],
    url: '/publish',
    bundle: 'anchor'
  },
  elevate: {
    id: 'elevate',
    name: '/ elevate',
    description: 'Reputation & Reviews Manager — Monitor and respond to reviews across all platforms',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Monitor reviews across all platforms',
      'Automated review request campaigns',
      'Respond to reviews from one dashboard',
      'Sentiment analysis and trending',
      'Showcase positive reviews on your website'
    ],
    url: '/elevate',
    bundle: 'anchor'
  },
  optimize: {
    id: 'optimize',
    name: '/ optimize',
    description: 'SEO Health Monitor — Complete SEO health monitoring, keyword tracking, and AI-powered optimization',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Real-time SEO health score and monitoring',
      'AI-powered keyword research and rank tracking',
      'On-page SEO analysis with actionable suggestions',
      'Technical SEO audit with fix instructions',
      'AI content briefs and optimization',
      'Prioritized action plans'
    ],
    url: '/optimize',
    bundle: 'anchor'
  },
  amplify: {
    id: 'amplify',
    name: '/ amplify',
    description: 'Advertising Platform — Manage and optimize your digital advertising campaigns',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Manage digital advertising campaigns',
      'Track ad performance and ROI',
      'Optimize ad spend across platforms',
      'Targeted audience management',
      'Performance reporting and analytics'
    ],
    url: '/amplify',
    bundle: 'anchor'
  },
  connect: {
    id: 'connect',
    name: '/ connect',
    description: 'Customer Relationship Management Tool — Centralized customer database and sales pipeline',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Centralized customer database (single source of truth)',
      'Track every interaction across all channels',
      'Sales pipeline and opportunity tracking',
      'Automated follow-ups and reminders',
      'Integration with all Compass and Anchor tools'
    ],
    url: '/connect'
  },
  coachblue: {
    id: 'coachblue',
    name: 'Coach Blue',
    description: 'Your 24/7 AI Business Guide — Personalized guidance based on YOUR business',
    price: '$99/mo',
    priceValue: 99,
    benefits: [
      'Personalized guidance based on YOUR business',
      'Teaches you how to use the platform',
      'Helps you implement prescription recommendations',
      'Creates step-by-step action plans',
      'Available anytime, anywhere'
    ],
    url: '/products/coach-blue'
  },
  hostsblue: {
    id: 'hostsblue',
    name: 'hostsblue.com',
    description: 'Complete Web Services — Domain, hosting, email, website builder',
    price: 'Varies',
    priceValue: 0,
    benefits: [
      'Domain registration and transfer',
      'Professional email hosting (@yourbusiness.com)',
      'SSL certificates and trust badges',
      'Website builder (drag-and-drop)',
      'One-click WordPress install',
      '99.9% uptime guarantee'
    ],
    url: 'https://hostsblue.com',
    isPartner: true
  },
  swipesblue: {
    id: 'swipesblue',
    name: 'swipesblue.com',
    description: 'Payment Processing — Integrated payment gateway',
    price: '2.9% + 30¢',
    priceValue: 0,
    benefits: [
      'Integrated payment gateway',
      'Shopping cart and checkout',
      'Secure payment processing',
      'All features included free',
      'Transaction-fee model only'
    ],
    url: 'https://swipesblue.com',
    isPartner: true
  },
  siteinspector: {
    id: 'siteinspector',
    name: 'ScansBlue',
    description: 'Website Analysis Tool — Professional-grade website audits',
    price: 'Free',
    priceValue: 0,
    benefits: [
      'Fast Check: Quick SSL, mobile, speed tests',
      'Full Report: Complete site crawl with prioritized tasks',
      'AI Auditor: DeepSeek-powered analysis',
      'Professional-grade analysis without agency fees',
      'Prioritized by impact so you fix what matters first'
    ],
    url: 'https://scansblue.com',
    isPartner: true
  }
};

export const BUNDLES: Record<string, Bundle> = {
  compass: {
    id: 'compass',
    name: 'Compass Suite',
    description: 'Communication & Marketing Bundle — All 4 communication tools in one integrated platform',
    price: '$99/mo',
    priceValue: 99,
    savings: 'Save vs buying apps separately',
    products: ['promote', 'respond', 'engage', 'post'],
    benefits: [
      'All 4 communication tools in one platform',
      'Unified dashboard for all customer communications',
      'Save vs buying apps separately',
      'Perfect sync between email, SMS, social, and chat',
      'One login, one bill, complete control'
    ],
    url: '/compass'
  },
  anchor: {
    id: 'anchor',
    name: 'Anchor Suite',
    description: 'Local SEO & Reputation Bundle — / publish, / elevate, / optimize, / amplify in one integrated platform',
    price: '$99/mo',
    priceValue: 99,
    savings: 'Save vs buying apps separately',
    products: ['publish', 'elevate', 'optimize', 'amplify'],
    benefits: [
      'Complete control of your local presence',
      '/ publish + / elevate + / optimize + / amplify',
      'Google Business Profile optimization',
      'AI-powered SEO health monitoring and keyword tracking',
      'Save vs buying all 4 apps separately',
      'Dominate local search results'
    ],
    url: '/anchor'
  }
};

export const CATEGORY_PRODUCT_MAP: Record<string, { primary: string; bundle?: string; secondary?: string[] }> = {
  'Email & SMS Marketing': { primary: 'promote', bundle: 'compass' },
  'Social Media Content': { primary: 'post', bundle: 'compass' },
  'Reputation Management': { primary: 'elevate', bundle: 'anchor' },
  'Unified Inbox & Response': { primary: 'respond', bundle: 'compass' },
  'Live Chat': { primary: 'engage', bundle: 'compass' },
  'Business Listings & GBP': { primary: 'publish', bundle: 'anchor' },
  'Website & SEO': { primary: 'optimize', bundle: 'anchor' },
  'CRM & Customer Management': { primary: 'connect' },
  'Advertising & Paid Media': { primary: 'amplify', bundle: 'anchor' },
};

export const SCORING_AREAS = [
  { id: 'promote', name: 'Email & SMS Marketing', maxPoints: 15 },
  { id: 'post', name: 'Social Media Content', maxPoints: 13 },
  { id: 'elevate', name: 'Reputation Management', maxPoints: 16 },
  { id: 'respond', name: 'Unified Inbox & Response', maxPoints: 15 },
  { id: 'engage', name: 'Live Chat', maxPoints: 15 },
  { id: 'publish', name: 'Business Listings & GBP', maxPoints: 18 },
  { id: 'optimize', name: 'Website & SEO', maxPoints: 14 },
  { id: 'connect', name: 'CRM & Customer Management', maxPoints: 12 },
  { id: 'amplify', name: 'Advertising & Paid Media', maxPoints: 12 },
];

export const COACH_PERSONALITY = {
  role: 'Patient teacher and mentor',
  tone: 'Encouraging, supportive, knowledgeable',
  approach: [
    'Celebrate successes',
    'Break down complex topics',
    'Provide specific examples',
    'Offer step-by-step guidance',
    'Recommend products when appropriate'
  ],
  whenToRecommendProducts: [
    'User asks how to solve a problem we have a product for',
    'User expresses frustration with current tools/process',
    'User asks "what should I do about [X]"',
    'User is implementing a prescription recommendation'
  ],
  howToRecommend: [
    'Lead with the benefit/outcome',
    'Explain how our product solves their specific problem',
    'Mention suite savings when relevant',
    'Offer to walk them through setup',
    'Never pushy - always helpful'
  ]
};

export function getProductById(id: string): Product | undefined {
  return PRODUCTS[id];
}

export function getBundleById(id: string): Bundle | undefined {
  return BUNDLES[id];
}

export function getProductsForCategory(category: string): { primary: Product; bundle?: Bundle; secondary?: Product[] } | null {
  const mapping = CATEGORY_PRODUCT_MAP[category];
  if (!mapping) return null;

  const primary = PRODUCTS[mapping.primary];
  if (!primary) return null;

  const bundle = mapping.bundle ? BUNDLES[mapping.bundle] : undefined;
  const secondary = mapping.secondary?.map(id => PRODUCTS[id]).filter(Boolean) as Product[] | undefined;

  return { primary, bundle, secondary };
}

export function getBundleAdvantageMessage(category: string): string | null {
  if (['Email & SMS Marketing', 'Social Media Content', 'Unified Inbox & Response', 'Live Chat'].includes(category)) {
    return 'Get all communication tools in the Compass Suite for $99/month — all four apps in one integrated platform. Save compared to buying separately.';
  }
  if (['Business Listings & GBP', 'Reputation Management', 'Website & SEO', 'Advertising & Paid Media'].includes(category)) {
    return 'Get complete local SEO control with the Anchor Suite for $99/month — includes / publish, / elevate, / optimize, and / amplify.';
  }
  return null;
}

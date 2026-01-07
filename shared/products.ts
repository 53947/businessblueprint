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
  inbox: {
    id: 'inbox',
    name: 'Inbox',
    description: 'Unified Communication Hub - Consolidates email, SMS, social messages, live chat into ONE inbox',
    price: '$34/mo',
    priceValue: 34,
    benefits: [
      'Consolidates all messages into ONE inbox',
      'Never miss a customer message again',
      'Respond faster, close more deals',
      'Track response times and conversation history',
      'Works across email, SMS, social, and chat'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-inbox.png',
    url: '/products/inbox',
    bundle: 'commverse'
  },
  send: {
    id: 'send',
    name: 'Send',
    description: 'Email & SMS Marketing Platform - Build and segment your customer list, create campaigns',
    price: '$34/mo',
    priceValue: 34,
    benefits: [
      'Build and segment your customer list',
      'Create professional email campaigns in minutes',
      'Send targeted SMS messages',
      'Automated drip campaigns that run themselves',
      'Track open rates, clicks, and conversions'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-send.png',
    url: '/products/send',
    bundle: 'commverse'
  },
  content: {
    id: 'content',
    name: 'Content',
    description: 'Social Media Management - Schedule posts, create content with AI, track engagement',
    price: '$34/mo',
    priceValue: 34,
    benefits: [
      'Schedule posts across all platforms',
      'Create engaging content with AI assistance',
      'Track engagement and performance',
      'Respond to comments and DMs',
      'Content calendar and planning tools'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-content.png',
    url: '/products/content',
    bundle: 'commverse'
  },
  livechat: {
    id: 'livechat',
    name: 'LiveChat',
    description: 'Website Chat Widget - Real-time customer support and lead capture',
    price: '$34/mo',
    priceValue: 34,
    benefits: [
      'Real-time customer support',
      'Proactive chat invitations',
      'Mobile app for on-the-go responses',
      'Chat transcripts and history',
      'Lead capture and qualification'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-livechat.png',
    url: '/products/livechat',
    bundle: 'commverse'
  },
  listings: {
    id: 'listings',
    name: 'Listings',
    description: 'Business Listings Management - Manage 50+ directory listings from one dashboard',
    price: '$39/mo',
    priceValue: 39,
    benefits: [
      'Manage 50+ directory listings from one dashboard',
      'Ensure NAP (Name, Address, Phone) consistency',
      'Update hours, services, photos across all platforms',
      'Monitor listing performance',
      'Fix duplicate and incorrect listings'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-listings.png',
    url: '/products/listings',
    bundle: 'localblue'
  },
  reputation: {
    id: 'reputation',
    name: 'Reputation',
    description: 'Ratings & Review Management - Monitor and respond to reviews across all platforms',
    price: '$39/mo',
    priceValue: 39,
    benefits: [
      'Monitor reviews across all platforms',
      'Automated review request campaigns',
      'Respond to reviews from one dashboard',
      'Sentiment analysis and trending',
      'Showcase positive reviews on your website'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-reputation.png',
    url: '/products/reputation',
    bundle: 'localblue'
  },
  localblue: {
    id: 'localblue',
    name: 'LocalBlue Complete',
    description: 'Full Local SEO Package - Includes Listings + Reputation + GBP optimization',
    price: '$59/mo',
    priceValue: 59,
    benefits: [
      'Includes Listings + Reputation management',
      'Google Business Profile optimization',
      'Local keyword tracking',
      'Competitor analysis',
      'Monthly performance reports'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-localblue.png',
    url: '/products/localblue',
    bundle: 'localblue'
  },
  relationships: {
    id: 'relationships',
    name: 'Relationships CRM',
    description: 'The Truth Center - Centralized customer database and sales pipeline',
    price: '$29/mo',
    priceValue: 29,
    benefits: [
      'Centralized customer database (single source of truth)',
      'Track every interaction across all channels',
      'Sales pipeline and opportunity tracking',
      'Automated follow-ups and reminders',
      'Seamless integration with all CommVerse and LocalBlue tools'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/approved-apps-relationship-icon.png',
    url: '/products/relationships'
  },
  coachblue: {
    id: 'coachblue',
    name: 'Coach Blue',
    description: 'Your 24/7 AI Business Guide - Personalized guidance based on YOUR business',
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
    name: 'HostsBlue.com',
    description: 'Complete Web Services - Domain, hosting, email, website builder',
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
    name: 'SwipesBlue.com',
    description: 'Payment Processing and E-commerce - Integrated payment gateway',
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
    name: 'SiteInspector',
    description: 'Website Analysis Tool - Professional-grade website audits',
    price: 'Free',
    priceValue: 0,
    benefits: [
      'Fast Check: Quick SSL, mobile, speed tests',
      'Full Report: Complete site crawl with prioritized tasks',
      'AI Auditor: DeepSeek-powered analysis',
      'Professional-grade analysis without agency fees',
      'Prioritized by impact so you fix what matters first'
    ],
    url: 'https://siteinspector.dev',
    isPartner: true
  }
};

export const BUNDLES: Record<string, Bundle> = {
  commverse: {
    id: 'commverse',
    name: 'CommVerse Bundle',
    description: 'Complete Communications Universe - All 4 communication tools in one integrated platform',
    price: '$99/mo',
    priceValue: 99,
    savings: 'Save $37/month vs buying separately',
    products: ['inbox', 'send', 'content', 'livechat'],
    benefits: [
      'All 4 communication tools in one platform',
      'Unified dashboard for all customer communications',
      'Save $37/month vs buying apps separately',
      'Perfect sync between email, SMS, social, and chat',
      'One login, one bill, complete control'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-commverse.png',
    url: '/products/commverse'
  },
  localblue: {
    id: 'localblue',
    name: 'LocalBlue Bundle',
    description: 'Complete Local SEO Package - Listings + Reputation + GBP optimization',
    price: '$59/mo',
    priceValue: 59,
    savings: 'Save $19/month vs buying separately',
    products: ['listings', 'reputation'],
    benefits: [
      'Complete control of your local presence',
      'Listings management + Reputation monitoring',
      'Google Business Profile optimization',
      'Save vs buying Listings + Reputation separately',
      'Dominate local search results'
    ],
    icon: '/assets/approved icons and logos/Additional Apps/icon-localblue.png',
    url: '/products/localblue'
  }
};

export const CATEGORY_PRODUCT_MAP: Record<string, { primary: string; bundle?: string; secondary?: string[] }> = {
  'Email & SMS Marketing': { primary: 'send', bundle: 'commverse' },
  'Social Media Content': { primary: 'content', bundle: 'commverse' },
  'Reputation Management': { primary: 'reputation', bundle: 'localblue' },
  'Customer Response & Timing': { primary: 'inbox', bundle: 'commverse' },
  'Live Chat': { primary: 'livechat', bundle: 'commverse' },
  'Business Listings': { primary: 'listings', bundle: 'localblue' },
  'Google Business Profile': { primary: 'localblue', bundle: 'localblue' },
  'Website & SEO': { primary: 'hostsblue', secondary: ['siteinspector', 'livechat'] },
  'CRM Systems': { primary: 'relationships' }
};

export const SCORING_AREAS = [
  { id: 'email_sms', name: 'Email & SMS Marketing', maxPoints: 15 },
  { id: 'social_media', name: 'Social Media Content', maxPoints: 13 },
  { id: 'reputation', name: 'Reputation Management', maxPoints: 16 },
  { id: 'customer_response', name: 'Customer Response & Timing', maxPoints: 15 },
  { id: 'live_chat', name: 'Live Chat', maxPoints: 15 },
  { id: 'listings', name: 'Business Listings', maxPoints: 18 },
  { id: 'gbp', name: 'Google Business Profile', maxPoints: 16 },
  { id: 'website_seo', name: 'Website & SEO', maxPoints: 20 },
  { id: 'crm', name: 'CRM Systems', maxPoints: 12 }
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
    'Mention bundle savings when relevant',
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
  if (['Email & SMS Marketing', 'Social Media Content', 'Customer Response & Timing', 'Live Chat'].includes(category)) {
    return 'Get all communication tools in the CommVerse bundle for $99/month - that\'s all four apps in one integrated platform. Save compared to buying separately.';
  }
  if (['Business Listings', 'Reputation Management', 'Google Business Profile'].includes(category)) {
    return 'Get complete local SEO control with LocalBlue for $59/month - includes listings management, reputation monitoring, and Google Business Profile optimization.';
  }
  return null;
}

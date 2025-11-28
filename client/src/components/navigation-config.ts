// Shared navigation configuration for desktop and mobile menus
// Single source of truth for all navigation content

export interface NavItem {
  label: string;
  href: string;
  testId: string;
  type: 'main' | 'action';
  title?: string;
  description?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  href: string;
  testId: string;
  icon: string;
  borderColor: string;
}

export interface MegaMenu {
  title: string;
  description: string;
  steps?: Step[];
  buttonText?: string;
  buttonHref?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'How It Works',
    href: '#how-it-works',
    testId: 'menu-trigger-how-it-works',
    type: 'main',
    title: 'A Blueprint to your growth',
    description: 'Custom digital growth plan based on AI analysis of your business',
  },
  {
    label: 'Products',
    href: '#products',
    testId: 'menu-trigger-products',
    type: 'main',
    title: 'Our Products',
    description: 'Apps & bundles with pricing',
  },
  {
    label: 'Solutions',
    href: '#solutions',
    testId: 'menu-trigger-solutions',
    type: 'main',
    title: 'Solutions',
    description: 'Platforms & services for your business',
  },
  {
    label: 'Resources',
    href: '#resources',
    testId: 'menu-trigger-resources',
    type: 'main',
    title: 'Resources',
    description: 'Learn, support, and manage your account',
  },
];

export const ACTION_ITEMS: NavItem[] = [
  {
    label: 'Cart',
    href: '/cart',
    testId: 'button-cart',
    type: 'action',
  },
  {
    label: 'Inbox',
    href: '/portal/inbox',
    testId: 'button-quick-inbox',
    type: 'action',
  },
  {
    label: 'Dashboard',
    href: '/portal/dashboard',
    testId: 'button-dashboard',
    type: 'action',
  },
  {
    label: 'Digital IQ',
    href: '/assessment',
    testId: 'button-digital-iq',
    type: 'action',
  },
];

// How It Works 5-step journey
export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: 1,
    title: 'Complete Your Digital IQ Assessment',
    description: 'You start with a quick assessment, and we generate your custom blueprint.',
    href: '/assessment',
    testId: 'link-step1',
    icon: 'badge1',
    borderColor: '#A00028',
  },
  {
    number: 2,
    title: 'Prescribed Blueprint',
    description: 'Your custom action plan with SEO, content strategy, and revenue-focused steps.',
    href: '#',
    testId: 'link-step2',
    icon: 'badge2',
    borderColor: '#FFC107',
  },
  {
    number: 3,
    title: 'LocalBlue',
    description: 'Listings management + reputation building for stronger local visibility.',
    href: '/localblue',
    testId: 'link-step3',
    icon: 'badge3',
    borderColor: '#0000FF',
  },
  {
    number: 4,
    title: 'Coach Blue',
    description: '24/7 AI business coach guiding you through every step of your growth journey.',
    href: '/ai-coach',
    testId: 'link-step4',
    icon: 'badge4',
    borderColor: '#A855F7',
  },
  {
    number: 5,
    title: 'Commverse Bundle',
    description: 'Complete communication suite: /send, /inbox, /livechat, /content.',
    href: '/pricing?addon=commverse',
    testId: 'link-step5',
    icon: 'badge5',
    borderColor: '#22C55E',
  },
];

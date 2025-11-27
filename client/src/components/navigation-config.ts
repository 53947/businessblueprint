// Shared navigation configuration for desktop and mobile menus
// Single source of truth for main navigation items

export interface NavItem {
  label: string;
  href: string;
  testId: string;
  type: 'main' | 'action'; // 'main' for mega menu items, 'action' for buttons
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'How It Works',
    href: '#how-it-works',
    testId: 'menu-trigger-how-it-works',
    type: 'main',
  },
  {
    label: 'Products',
    href: '#products',
    testId: 'menu-trigger-products',
    type: 'main',
  },
  {
    label: 'Solutions',
    href: '#solutions',
    testId: 'menu-trigger-solutions',
    type: 'main',
  },
  {
    label: 'Resources',
    href: '#resources',
    testId: 'menu-trigger-resources',
    type: 'main',
  },
];

// Action items (right side of header)
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

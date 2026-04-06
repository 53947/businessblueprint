export interface CadenceStep {
  order: number;
  appId: string;
  milestone: string;
  why: string;
}

export const SETUP_CADENCE: CadenceStep[] = [
  {
    order: 1,
    appId: "connect",
    milestone: "Foundation Set",
    why: "Every other app reads from and writes to / connect. Without it, nothing connects.",
  },
  {
    order: 2,
    appId: "publish",
    milestone: "Discoverable Online",
    why: "Your business identity needs to be locked in across directories before anything else matters.",
  },
  {
    order: 3,
    appId: "elevate",
    milestone: "Reputation Active",
    why: "Reviews are flowing. You need to surface them and respond before investing in communications.",
  },
  {
    order: 4,
    appId: "optimize",
    milestone: "SEO Healthy",
    why: "Your website's technical health and search visibility need attention before you drive traffic to it.",
  },
  {
    order: 5,
    appId: "respond",
    milestone: "Inbox Unified",
    why: "All incoming messages from every channel now land in one place. Nothing falls through cracks.",
  },
  {
    order: 6,
    appId: "engage",
    milestone: "Chat Live",
    why: "Your website visitors can now talk to you in real time. Conversations flow into / respond.",
  },
  {
    order: 7,
    appId: "post",
    milestone: "Social Active",
    why: "You're posting consistently across platforms. Content drives traffic, traffic drives leads.",
  },
  {
    order: 8,
    appId: "promote",
    milestone: "Campaigns Running",
    why: "Email campaigns to your / connect contact list. Targeted, measurable, revenue-driving.",
  },
  {
    order: 9,
    appId: "amplify",
    milestone: "Advertising Live",
    why: "Paid advertising across Meta, Google, Reddit. Data from every other app informs targeting.",
  },
];

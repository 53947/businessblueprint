import { renderCoachBlueEmail } from './coach-blue-email-template';

const baseUrl = () => process.env.FRONTEND_URL || 'https://businessblueprint.io';

export function generateEmail1_MeetCoachBlue(data: { businessName: string; assessmentId: number }): string {
  const base = baseUrl();
  return renderCoachBlueEmail({
    title: 'Meet Coach Blue',
    subtitle: 'YOUR AI GUIDE TO DIGITAL SUCCESS',
    businessName: data.businessName,
    opening: 'Welcome \u2014 and congratulations on completing your Digital IQ Assessment. You\u2019ve taken the first step.',
    coachVoice: 'I\u2019m Coach Blue, your AI guide to digital growth. Think of me as your on-demand coach \u2014 here to help you understand where you stand, what matters most, and how to move forward with clarity. I\u2019ll walk you through your results, explain what\u2019s possible, and show you how to put your recommendations into action.',
    highlightHeader: 'Here\u2019s what\u2019s waiting for you:',
    highlightBullets: [
      '<strong>Your Prescription</strong> \u2014 How to read, prioritize, and act on our recommendations',
      '<strong>The 6-Step Journey</strong> \u2014 Scan \u2192 Blueprint \u2192 Connect \u2192 Anchor Suite \u2192 Compass Suite \u2192 Coach Blue',
      '<strong>Our Tools</strong> \u2014 A clear overview of each app and what it does',
      '<strong>Getting Started</strong> \u2014 Where to begin for the fastest impact',
    ],
    closingLine: 'Let\u2019s build your path forward.',
    topCtaText: 'Go to Your Dashboard',
    topCtaUrl: `${base}/portal`,
    ctaText: 'Start Your Free Tour',
    ctaUrl: `${base}/tour?assessmentId=${data.assessmentId}`,
  });
}

export function generateEmail2_DigitalIQ(data: { businessName: string; assessmentId: number }): string {
  const base = baseUrl();
  return renderCoachBlueEmail({
    title: 'Your Digital IQ',
    subtitle: 'WHERE YOU STAND TODAY',
    businessName: data.businessName,
    opening: 'Your Digital IQ score is ready. This is the clearest picture you have of where your business stands online today.',
    coachVoice: 'I pulled your Digital IQ from the full assessment you completed \u2014 your web presence, your reputation signals, how easy you are to find for the people searching right now. The score itself isn\u2019t the point. What matters is what it tells us about the gaps you can close fastest and the strengths worth building on. Read through your breakdown carefully. The recommendations that follow will make more sense once you see where they came from.',
    highlightHeader: 'Here\u2019s what your Digital IQ shows you:',
    highlightBullets: [
      '<strong>Your Score</strong> \u2014 Where you stand against local businesses like yours',
      '<strong>Your Strengths</strong> \u2014 What\u2019s already working and worth doing more of',
      '<strong>Your Gaps</strong> \u2014 The specific areas holding your business back today',
      '<strong>Your Priority</strong> \u2014 The one move that will improve your score fastest',
    ],
    closingLine: 'Let\u2019s put your score to work.',
    topCtaText: 'Go to Your Dashboard',
    topCtaUrl: `${base}/portal`,
    ctaText: 'See Your Results',
    ctaUrl: `${base}/find-results?id=${data.assessmentId}`,
  });
}

export function generateEmail3_Prescription(data: { businessName: string }): string {
  const base = baseUrl();
  return renderCoachBlueEmail({
    title: 'Your Prescription',
    subtitle: 'WHAT TO DO FIRST',
    businessName: data.businessName,
    opening: 'Your prescription is ready. These are the specific actions I\u2019ve prioritized based on your assessment.',
    coachVoice: 'A prescription is different from advice. Advice tells you what could work in general. Your prescription tells you what to do, in what order, for your business specifically. I\u2019ve ranked every recommendation by impact and speed \u2014 so the items at the top are the ones that will move your numbers the most in the least amount of time. You don\u2019t need to tackle everything at once. Start at the top and work down.',
    highlightHeader: 'How to read your prescription:',
    highlightBullets: [
      '<strong>Priority Order</strong> \u2014 Top items make the biggest difference fastest',
      '<strong>Effort Level</strong> \u2014 How much time and focus each action takes',
      '<strong>Expected Impact</strong> \u2014 What you can reasonably expect to change',
      '<strong>Your First Week</strong> \u2014 The two or three items to do right now',
    ],
    closingLine: 'Let\u2019s start at the top.',
    topCtaText: 'Go to Your Dashboard',
    topCtaUrl: `${base}/portal`,
    ctaText: 'Open Your Blueprint',
    ctaUrl: `${base}/portal/prescriptions`,
  });
}

export function generateEmail4_PathForward(data: { businessName: string }): string {
  const base = baseUrl();
  return renderCoachBlueEmail({
    title: 'Your Path Forward',
    subtitle: 'THE 6-STEP JOURNEY',
    businessName: data.businessName,
    opening: 'Before you dive in, here\u2019s the full path you\u2019re on. Knowing where each step leads makes the work ahead easier.',
    coachVoice: 'Every business that comes through businessblueprint.io follows the same six-step journey \u2014 Scan, Blueprint, Connect, Anchor Suite, Compass Suite, and Coach Blue. You\u2019ve already completed the Scan and received your Blueprint. What comes next is connecting your business to the right tools, in the right order, so each one builds on the last. I\u2019ll be with you at every step. You won\u2019t have to figure out what comes next on your own.',
    highlightHeader: 'Your 6-step journey:',
    highlightBullets: [
      '<strong>Scan</strong> \u2014 Your assessment, already complete',
      '<strong>Blueprint</strong> \u2014 Your prescription, ready for action',
      '<strong>Connect</strong> \u2014 Bring your contacts and customers in',
      '<strong>Anchor Suite</strong> \u2014 Lock in visibility and reputation',
      '<strong>Compass Suite</strong> \u2014 Grow your voice and reach',
      '<strong>Coach Blue</strong> \u2014 Guidance at every step along the way',
    ],
    closingLine: 'Let\u2019s walk the path together.',
    topCtaText: 'Go to Your Dashboard',
    topCtaUrl: `${base}/portal`,
    ctaText: 'See the Journey',
    ctaUrl: `${base}/portal/directions`,
  });
}

export function generateEmail5_Toolkit(data: { businessName: string }): string {
  const base = baseUrl();
  return renderCoachBlueEmail({
    title: 'Your Toolkit',
    subtitle: 'EVERY APP, EXPLAINED',
    businessName: data.businessName,
    opening: 'Before you start using the tools, here\u2019s what each one does. Clear on the tools, clear on the work.',
    coachVoice: 'businessblueprint.io gives you a set of focused apps \u2014 each one built to do one job well. You don\u2019t need to learn them all at once. Most businesses start with the apps that match their biggest gap from the assessment, then add from there as they grow. I\u2019ll point you toward the right starting app when you\u2019re ready. For now, take a minute to see what\u2019s available and how the pieces fit together.',
    highlightHeader: 'Your apps, grouped by suite:',
    highlightBullets: [
      '<strong>/ connect</strong> \u2014 Your free CRM, built to run at the center of everything',
      '<strong>Anchor Suite</strong> \u2014 / publish, / elevate, / amplify: lock in visibility and reputation',
      '<strong>Compass Suite</strong> \u2014 / promote, / respond, / engage, / post: grow your voice and reach',
      '<strong>Coach Blue</strong> \u2014 Me, at every step, whenever you need direction',
    ],
    closingLine: 'Let\u2019s get your toolkit working.',
    topCtaText: 'Go to Your Dashboard',
    topCtaUrl: `${base}/portal`,
    ctaText: 'Explore Your Apps',
    ctaUrl: `${base}/portal`,
  });
}

export function generateEmail6_FirstMove(data: { businessName: string }): string {
  const base = baseUrl();
  return renderCoachBlueEmail({
    title: 'Your First Move',
    subtitle: 'FASTEST PATH TO IMPACT',
    businessName: data.businessName,
    opening: 'You\u2019ve seen the path. You have your prescription. Now it\u2019s time to take your first move \u2014 the one that matters most.',
    coachVoice: 'The hardest part of any journey is starting. That\u2019s why I picked one thing for you to do first, based on your prescription and the business you run. This isn\u2019t busywork. It\u2019s the single action that will move your numbers in a way you can feel. Don\u2019t open every tool at once. Open the one I\u2019m pointing you to, spend fifteen minutes with it, and let the rest follow.',
    highlightHeader: 'What to do in the next 15 minutes:',
    highlightBullets: [
      '<strong>Open the app</strong> \u2014 The one I\u2019ve flagged for you in your prescription',
      '<strong>Connect your first piece</strong> \u2014 Add your business information',
      '<strong>Complete one setup step</strong> \u2014 The one that unlocks the tool',
      '<strong>Come back</strong> \u2014 I\u2019ll show you what\u2019s next',
    ],
    closingLine: 'Let\u2019s get moving.',
    topCtaText: 'Go to Your Dashboard',
    topCtaUrl: `${base}/portal`,
    ctaText: 'Take Your First Step',
    ctaUrl: `${base}/portal`,
  });
}

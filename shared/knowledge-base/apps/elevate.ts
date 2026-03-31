import type { AppKnowledge } from "../types";

export const elevateKnowledge: AppKnowledge = {
  appId: "elevate",
  appName: "elevate",
  suite: "anchor",
  purpose:
    "Monitor, manage, and grow your online reputation by aggregating reviews from every platform into one dashboard and giving you the tools to respond quickly and strategically.",
  whyItMatters:
    "88% of consumers trust online reviews as much as personal recommendations. A single unanswered negative review can cost you dozens of customers who read it and quietly go elsewhere. / elevate brings all your reviews together so you see them as they come in and can respond before the damage spreads. It also helps you actively ask happy customers for reviews, which is the single fastest way to improve how your business looks online.",

  setupSteps: [
    {
      id: "elevate-step-1",
      order: 1,
      title: "Connect Your Review Platforms",
      description:
        "Your reviews are scattered across Google, Yelp, Facebook, and industry-specific sites. Right now you would have to check each one individually to see what people are saying. Connecting them to / elevate means every review from every platform shows up in one place, in real time.",
      estimatedMinutes: 10,
      substeps: [
        {
          id: "elevate-step-1-sub-a",
          title: "Connect Google Business Profile reviews",
          helpText:
            "Google reviews are the most visible and impactful for local businesses — they show up directly in search results. Click 'Connect Google' and authorize / elevate to read your Google Business reviews. This is read-only access; it does not change anything on your Google profile.",
        },
        {
          id: "elevate-step-1-sub-b",
          title: "Connect Yelp reviews",
          helpText:
            "Yelp reviews carry significant weight, especially for restaurants, home services, and healthcare. Connect your Yelp business page so new reviews appear in your / elevate dashboard automatically.",
        },
        {
          id: "elevate-step-1-sub-c",
          title: "Connect at least one other review platform",
          helpText:
            "Depending on your industry, you may have reviews on Facebook, TripAdvisor, Angi, Healthgrades, Avvo, Houzz, or other platforms. Connect at least one more so you have a broader view of your reputation. The more platforms you connect, the more complete your picture.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "elevate-step-1-complete",
          subject: "Review platforms connected — your reputation dashboard is live",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_review_platforms_connected",
        nextStepPrompt: "Your review platforms are connected. Now let's set up alerts so you never miss a new review.",
      },
    },
    {
      id: "elevate-step-2",
      order: 2,
      title: "Set Up Review Alerts",
      description:
        "The window for responding to a review effectively is 24-48 hours. After that, the reviewer has moved on and other potential customers have already seen the unanswered review. Alerts make sure you know about every new review as soon as it posts.",
      estimatedMinutes: 5,
      substeps: [
        {
          id: "elevate-step-2-sub-a",
          title: "Set alert frequency",
          helpText:
            "Choose how quickly you want to be notified: immediately (as soon as a review is detected), daily digest (summary each morning), or weekly. For most businesses, immediate alerts for negative reviews and a daily digest for everything else is the right balance.",
        },
        {
          id: "elevate-step-2-sub-b",
          title: "Choose notification channels",
          helpText:
            "Pick where you want to receive alerts: email, in-app notification, or both. If you are not at your computer all day, make sure email notifications go to an inbox you check on your phone. A review that sits unresponded for a week is a missed opportunity.",
        },
      ],
      triggerOnComplete: {
        email: null,
        coachBlueAction: "celebrate_alerts_configured",
        nextStepPrompt: "Alerts are set up — you will not miss a review. Now let's create response templates so you can reply quickly and consistently.",
      },
    },
    {
      id: "elevate-step-3",
      order: 3,
      title: "Create Response Templates",
      description:
        "Having templates ready means you can respond to any review within minutes instead of agonizing over what to say. You are not going to copy-paste the same response to every review — that looks robotic and customers notice. Instead, you will have a starting framework you can personalize quickly.",
      estimatedMinutes: 15,
      substeps: [
        {
          id: "elevate-step-3-sub-a",
          title: "Create a positive review response template",
          helpText:
            "For happy customers, your response should: (1) thank them by name if possible, (2) reference something specific they mentioned, (3) invite them back. Example framework: 'Thank you [Name]! We are glad [specific thing they mentioned]. We look forward to seeing you again.' Personalize each one — customers can tell when it is a template.",
        },
        {
          id: "elevate-step-3-sub-b",
          title: "Create a neutral review response template",
          helpText:
            "Neutral reviews (3 stars) are an opportunity. The customer was not unhappy enough to complain but not impressed enough to rave. Your response should: (1) thank them for their feedback, (2) ask what could have made it a 5-star experience, (3) offer to make it right. This often turns a 3-star customer into a loyal one.",
        },
        {
          id: "elevate-step-3-sub-c",
          title: "Create a negative review response template",
          helpText:
            "Negative reviews feel personal, but your response is not for the reviewer — it is for every future customer who reads it. Your response should: (1) apologize without being defensive, (2) acknowledge the specific issue, (3) offer to make it right offline (provide a phone number or email). Never argue publicly. Never offer excuses. A professional response to a negative review actually builds trust with readers.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "elevate-step-3-complete",
          subject: "Response templates ready — time to respond to your first review",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_templates_created",
        nextStepPrompt: "Your templates are saved. Now let's put them to use — pick an existing review and respond to it using the tools.",
      },
    },
    {
      id: "elevate-step-4",
      order: 4,
      title: "Respond to Your First Review",
      description:
        "Practice makes it real. Pick one of your existing reviews — ideally a recent one — and respond to it using / elevate. This is not just practice; it is a real response that the reviewer and every future customer will see.",
      estimatedMinutes: 5,
      substeps: [
        {
          id: "elevate-step-4-sub-a",
          title: "Select a review to respond to",
          helpText:
            "Look at your recent reviews and pick one that has not been responded to yet. If you have a mix, start with a positive one to build confidence. If you only have negative reviews waiting, start with the most recent — it is the most visible to potential customers right now.",
        },
        {
          id: "elevate-step-4-sub-b",
          title: "Compose and send your response",
          helpText:
            "Use your template as a starting point, then personalize it for this specific review. Reference something the reviewer mentioned, use their name if available, and keep it concise — 2-4 sentences is ideal. Once you are satisfied, click send. The response will be posted directly to the review platform.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "elevate-step-4-complete",
          subject: "/ elevate is set up — your reputation is now actively managed",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_elevate_complete",
        nextStepPrompt: "/ elevate is fully set up. You are now actively managing your online reputation. Next: / respond — we are going to unify all your incoming messages into one inbox so nothing falls through the cracks.",
      },
    },
  ],

  whatDoneLooksLike: [
    "Three or more review platforms connected and syncing",
    "Review alerts are active and configured to your preferences",
    "Response templates saved for positive, neutral, and negative reviews",
    "At least one real review has been responded to through / elevate",
  ],

  commonMistakes: [
    "Ignoring negative reviews — silence looks like indifference to every potential customer who reads it",
    "Copy-pasting identical responses to every review — reviewers and readers notice, and it makes your business look like it does not care",
    "Waiting more than 48 hours to respond — the effectiveness of a response drops sharply after the first two days",
    "Getting defensive in responses to negative reviews — your response is for future customers reading the review, not for winning an argument with the reviewer",
  ],

  troubleshooting: [
    {
      question: "A review platform is not showing all my reviews. What happened?",
      answer:
        "Some platforms (especially Yelp) filter reviews they consider suspicious or less reliable. These filtered reviews are not visible to / elevate because they are not visible on the platform itself. This is normal and not something you can control. Focus on the reviews that are visible — those are the ones customers see.",
      relatedStepId: "elevate-step-1",
    },
    {
      question: "Can I delete a negative review?",
      answer:
        "You cannot delete reviews left by customers. You can report a review to the platform if it violates their policies (fake review, spam, contains threats, etc.), but the platform decides whether to remove it. Your best strategy is always to respond professionally. A thoughtful response to a negative review often does more for your reputation than no negative reviews at all.",
      relatedStepId: "elevate-step-4",
    },
    {
      question: "How do I get more positive reviews?",
      answer:
        "The best way is to ask. After a positive interaction with a customer, send them a direct link to leave a review on Google or your preferred platform. / elevate can automate this with follow-up emails after appointments or purchases. Most happy customers are willing to leave a review — they just need a nudge and a direct link.",
      relatedStepId: "elevate-step-3",
    },
  ],

  coachBlueGuidance: {
    onFirstOpen:
      "Welcome to / elevate. Your online reputation is one of the most valuable assets your business has — and right now it might be working against you without you even knowing it. We are going to connect your review platforms, set up alerts, create response templates, and respond to your first review. The whole setup takes about 35 minutes, and the payoff is immediate.",
    onStall:
      "I noticed you connected your review platforms but have not set up your response templates yet. Here is why this matters: right now you are seeing reviews come in, but you do not have a fast way to respond to them. The 24-48 hour response window is real — every day you wait, the impact of your response drops. Let's get those templates done in 15 minutes.",
    onComplete:
      "/ elevate is fully set up. Your review platforms are connected, alerts are active, templates are ready, and you have responded to your first review. From here on out, you will see every new review as it comes in and be able to respond quickly and professionally. Next: / respond — that is where we unify all your incoming messages from email, social, and web into one inbox.",
    criticalWarnings: [
      "Never offer compensation publicly in a review response. Saying 'we will give you a refund' in a public response teaches every future customer that complaining publicly gets them free stuff. Take the conversation offline.",
      "Never respond to reviews when you are angry or upset. Write your response, wait 30 minutes, re-read it, then send. A response written in anger almost always makes the situation worse.",
    ],
  },

  relatedApps: ["publish", "respond", "connect"],
  nextInCadence: "respond",
};

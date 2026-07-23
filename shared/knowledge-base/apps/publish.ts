import type { AppKnowledge } from "../types";

export const publishKnowledge: AppKnowledge = {
  appId: "publish",
  appName: "publish",
  suite: "anchor",
  purpose:
    "Manage your business listings across online directories so customers find accurate, consistent information about you everywhere they look — Google, Yelp, Apple Maps, Bing, Facebook, and dozens of industry-specific sites.",
  whyItMatters:
    "When someone searches for a business like yours, they check multiple places. If your name is spelled differently on Yelp than on Google, or your phone number on Apple Maps goes to an old line, search engines lose confidence in your business and rank you lower. Worse, customers who find wrong information just call your competitor instead. / publish fixes this by pushing your verified information to every directory from one place.",

  setupSteps: [
    {
      id: "publish-step-1",
      order: 1,
      title: "Verify Your Business Information",
      description:
        "Before we push your business details anywhere, we need to make sure they are exactly right. Your Name, Address, and Phone (NAP) must be identical everywhere — one typo on one directory can hurt your ranking across all of them. This step pulls from what you entered in / connect, but you should double-check everything here with fresh eyes.",
      estimatedMinutes: 10,
      substeps: [
        {
          id: "publish-step-1-sub-a",
          title: "Confirm business name consistency",
          helpText:
            "Your business name must be exactly the same across every directory. That means the same punctuation, the same abbreviations (or lack of them), the same legal suffix. If your Google listing says 'Joe's Auto Repair' but your Yelp says 'Joes Auto Repair LLC', that counts as a mismatch.",
          validationRule: "business_name_matches_connect",
        },
        {
          id: "publish-step-1-sub-b",
          title: "Format address to USPS standard",
          helpText:
            "Directories compare your address against the USPS database. Use the standardized format: abbreviate Street to St, Avenue to Ave, Suite to Ste. Include your ZIP+4 if you know it. This is not about being formal — it is about matching the format that the algorithms expect.",
          validationRule: "address_usps_format",
        },
        {
          id: "publish-step-1-sub-c",
          title: "Confirm local phone number",
          helpText:
            "Use your local-area-code phone number, not a toll-free number. Local phone numbers are a ranking signal — they tell Google you are actually located where you say you are. If you use a tracking number for marketing, make sure the area code matches your service area.",
          validationRule: "phone_is_local",
        },
        {
          id: "publish-step-1-sub-d",
          title: "Set accurate hours including holidays",
          helpText:
            "Enter your regular business hours and any known holiday closures or adjusted hours. Google specifically penalizes businesses with inaccurate hours because it creates a bad experience for searchers. If you close early on Saturdays or are closed on holidays, list that here.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "publish-step-1-complete",
          subject: "Business info verified — ready to submit your listings",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_publish_nap_verified",
        nextStepPrompt: "Your business information is verified and ready to go. Now let's pick which directories to list you on.",
      },
    },
    {
      id: "publish-step-2",
      order: 2,
      title: "Select Target Directories",
      description:
        "Not every directory matters equally for every business. A restaurant needs Yelp and TripAdvisor. A plumber needs HomeAdvisor and Angi. We will recommend the directories that matter most for your industry, but you pick the final list.",
      estimatedMinutes: 5,
      substeps: [
        {
          id: "publish-step-2-sub-a",
          title: "Review industry-specific recommendations",
          helpText:
            "Based on your business category, we recommend specific directories where your customers are most likely to search. These are not random — they are based on which directories rank highest in search results for businesses like yours in your area.",
        },
        {
          id: "publish-step-2-sub-b",
          title: "Select your initial directory list",
          helpText:
            "Check the directories you want to submit to. We recommend starting with at least 10 — the core ones (Google Business Profile, Yelp, Apple Maps, Bing Places, Facebook) plus industry-specific directories. You can always add more later, but starting with a solid foundation gives you the best ranking boost.",
        },
      ],
      triggerOnComplete: {
        email: null,
        coachBlueAction: "celebrate_directories_selected",
        nextStepPrompt: "Good choices. Now let's submit your listings — this is where your business starts showing up.",
      },
    },
    {
      id: "publish-step-3",
      order: 3,
      title: "Submit Your Listings",
      description:
        "This is where it gets real. We are going to push your verified business information to every directory you selected. Each directory has its own format and requirements — / publish handles all of that for you. You just review and confirm.",
      estimatedMinutes: 5,
      substeps: [
        {
          id: "publish-step-3-sub-a",
          title: "Review submission preview",
          helpText:
            "Before anything goes live, you will see exactly what will be submitted to each directory. Check that your business name, address, phone, hours, and category look correct on every listing. This is your last chance to catch any issues before they go live.",
        },
        {
          id: "publish-step-3-sub-b",
          title: "Confirm and submit",
          helpText:
            "Click submit and your listings will be pushed to all selected directories. Most directories process submissions within 24-48 hours, though some (like Google Business Profile) may take up to a week for new listings. You will be notified as each one goes live.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "publish-step-3-complete",
          subject: "Your listings are submitted — here's what to expect",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_listings_submitted",
        nextStepPrompt: "Your listings are on their way. While they process, let's set up monitoring so you will know immediately if anything changes.",
      },
    },
    {
      id: "publish-step-4",
      order: 4,
      title: "Set Up Monitoring",
      description:
        "Listings are not set-it-and-forget-it. Directories can change your information without telling you — a user might 'suggest an edit' on Google that changes your hours, or a data aggregator might overwrite your phone number with an old one. Monitoring catches these changes before they cost you customers.",
      estimatedMinutes: 5,
      substeps: [
        {
          id: "publish-step-4-sub-a",
          title: "Configure monitoring frequency",
          helpText:
            "Choose how often / publish checks your listings for changes. Weekly is good for most businesses. If you are in a highly competitive market or have had listing issues before, daily monitoring catches problems faster.",
        },
        {
          id: "publish-step-4-sub-b",
          title: "Set up change alerts",
          helpText:
            "Choose how you want to be notified when a listing changes: email, in-app notification, or both. We recommend both — email for the detailed report, in-app for the quick flag. You will also see a summary in your / publish dashboard anytime a change is detected.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "publish-step-4-complete",
          subject: "/ publish is fully set up — your business is now discoverable",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_publish_complete",
        nextStepPrompt: "/ publish is fully set up. Your business is now discoverable across the directories that matter. Next: / elevate — let's make sure your online reputation is working for you, not against you.",
      },
    },
  ],

  whatDoneLooksLike: [
    "NAP (Name, Address, Phone) is verified and consistent across all listings",
    "Business is listed on 10 or more relevant directories",
    "Google Business Profile is connected and verified",
    "Listing monitoring is active with alerts configured",
  ],

  commonMistakes: [
    "Using different business names on different platforms — even small differences like 'LLC' on one and not another count as a mismatch",
    "Using a toll-free number instead of a local number — this hurts local search ranking",
    "Forgetting to update holiday hours — customers who find you closed when Google says you are open leave bad reviews",
    "Not responding to Questions & Answers on directory listings — unanswered questions signal a neglected business",
  ],

  troubleshooting: [
    {
      question: "My Google Business Profile says 'pending verification'. How long does this take?",
      answer:
        "Google typically verifies new listings within 5-7 business days via postcard, phone, or email. If your business has been operating for a while, you may get instant verification. If it has been more than 2 weeks, contact Google Business support directly — do not create a duplicate listing.",
      relatedStepId: "publish-step-3",
    },
    {
      question: "A directory has the wrong information and I cannot edit it. What do I do?",
      answer:
        "Some directories pull data from aggregators rather than accepting direct edits. / publish can push corrections through these aggregator channels, but it may take 2-4 weeks to propagate. In the meantime, if you can claim the listing directly on the directory's website, that gives you faster control.",
      relatedStepId: "publish-step-4",
    },
    {
      question: "Do I need to list my home address if I run a home-based business?",
      answer:
        "No. Google and most directories allow service-area businesses to hide their street address while still appearing in local results. Set your listing as a 'service area business' and define the areas you serve instead of showing your home address.",
      relatedStepId: "publish-step-1",
    },
  ],

  coachBlueGuidance: {
    onFirstOpen:
      "Welcome to / publish. This is where we make your business findable. Right now, customers searching for what you do might not find you — or worse, they might find wrong information about you. We are going to fix that. First step: let's make sure your business details are exactly right.",
    onStall:
      "I see you verified your business info but have not submitted your listings yet. Here is why this matters: every day your business is not listed correctly on major directories, potential customers are finding your competitors instead. The submission step takes about 5 minutes. Want to knock it out?",
    onComplete:
      "/ publish is set up and your listings are live. Your business is now showing up accurately across the directories that matter most for your industry. Next up: / elevate. That is where we manage your online reputation — reviews, ratings, and how customers talk about you online.",
    criticalWarnings: [
      "Never create duplicate listings on any directory. If you already have a Google Business Profile, claim it instead of creating a new one. Duplicate listings confuse search engines and split your reviews.",
      "Do not use a PO Box as your business address. Most directories reject PO Boxes, and Google will suspend listings that use them for non-PO-Box businesses.",
    ],
  },

  relatedApps: ["connect", "elevate", "optimize"],
  nextInCadence: "elevate",
};

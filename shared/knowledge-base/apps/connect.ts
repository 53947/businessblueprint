import type { AppKnowledge } from "../types";

export const connectKnowledge: AppKnowledge = {
  appId: "connect",
  appName: "connect",
  suite: "standalone",
  purpose:
    "Central CRM that all other apps read from and write to. This is the foundation of your entire digital presence — your contacts, your business details, your pipeline.",
  whyItMatters:
    "Without / connect set up properly, every other tool on the platform is working with incomplete information. When your business details are accurate here, they flow automatically into your listings, your email campaigns, your chat widget, and your ad targeting. Get this right first, and everything else gets easier.",

  setupSteps: [
    {
      id: "connect-step-1",
      order: 1,
      title: "Verify Your Business Information",
      description:
        "Your business name, address, phone number, and hours are the foundation of your online presence. Every directory, every listing, every search result pulls from this data. If it is inconsistent anywhere, search engines penalize you and customers get confused. Take ten minutes to make sure everything here is exactly right.",
      estimatedMinutes: 10,
      substeps: [
        {
          id: "connect-step-1-sub-a",
          title: "Confirm NAP consistency",
          helpText:
            "NAP stands for Name, Address, Phone. Your business name must be spelled exactly the same way everywhere — including punctuation. If your legal name is 'Smith & Sons Plumbing LLC' but your Google listing says 'Smith and Sons Plumbing', that inconsistency hurts your search rankings.",
          validationRule: "business_name_matches_assessment",
        },
        {
          id: "connect-step-1-sub-b",
          title: "Format address to USPS standard",
          helpText:
            "Use the official USPS format for your address. That means 'St' not 'Street', 'Ste' not 'Suite', and the correct ZIP+4 if you have it. Search engines compare your address against USPS records, so matching their format gives you a ranking advantage.",
          validationRule: "address_usps_format",
        },
        {
          id: "connect-step-1-sub-c",
          title: "Use a local phone number",
          helpText:
            "Use a local area code phone number, not a toll-free 800 number. Google and other directories prioritize businesses with local phone numbers because it signals you are actually located in the area you serve. If you use a call tracking number, make sure it has a local area code.",
          validationRule: "phone_is_local",
        },
        {
          id: "connect-step-1-sub-d",
          title: "Set accurate business hours",
          helpText:
            "Enter your actual business hours, including any seasonal or holiday variations. Nothing frustrates a potential customer more than driving to a business that Google says is open but is actually closed. If your hours change seasonally, set a reminder to update them.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "connect-step-1-complete",
          subject: "Your business information is verified — here's what happens next",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_nap_verified",
        nextStepPrompt: "Great — your business information is locked in. Now let's get your contacts imported so you have people to reach.",
      },
    },
    {
      id: "connect-step-2",
      order: 2,
      title: "Import Your Existing Contacts",
      description:
        "You already have customers and leads — they are in your email, your phone, maybe a spreadsheet somewhere. Getting them into / connect means every tool on the platform can work with your actual customer list instead of starting from zero.",
      estimatedMinutes: 15,
      substeps: [
        {
          id: "connect-step-2-sub-a",
          title: "Export contacts from your current system",
          helpText:
            "If you are using Gmail, Outlook, Mailchimp, Constant Contact, or any other tool, export your contacts as a CSV file. Most systems have an 'Export' option in their contacts or audience section. If you are not sure how, search '[your tool name] export contacts CSV' — there are step-by-step guides for every major platform.",
        },
        {
          id: "connect-step-2-sub-b",
          title: "Clean up your CSV before importing",
          helpText:
            "Open your CSV file and remove obvious junk: test emails you sent to yourself, old employees, duplicates, and anyone who has asked to be removed from your list. Importing dirty data means every campaign and report you run later will be less accurate. Fifteen minutes of cleanup now saves hours of frustration later.",
        },
        {
          id: "connect-step-2-sub-c",
          title: "Upload and map your fields",
          helpText:
            "Upload your CSV file and match your spreadsheet columns to the / connect fields (first name, last name, email, phone, etc.). The import tool will show you a preview so you can verify everything looks right before it goes in. If a field does not match, you can skip it — you can always add that data later.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "connect-step-2-complete",
          subject: "Your contacts are in — now let's organize them",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_contacts_imported",
        nextStepPrompt: "Your contacts are imported. Now let's organize them into categories so you can target the right people with the right messages.",
      },
    },
    {
      id: "connect-step-3",
      order: 3,
      title: "Set Up Contact Categories",
      description:
        "Not every customer is the same. Some are loyal regulars, some are one-time buyers, some are leads who have never purchased. Categorizing your contacts means you can send the right message to the right group instead of blasting everyone with the same thing.",
      estimatedMinutes: 10,
      substeps: [
        {
          id: "connect-step-3-sub-a",
          title: "Create categories relevant to your business",
          helpText:
            "Think about how you naturally group your customers. A restaurant might use 'Regulars', 'Catering Clients', and 'Event Inquiries'. A plumber might use 'Residential', 'Commercial', and 'Property Managers'. Use terms that make sense for YOUR business, not generic marketing labels.",
        },
        {
          id: "connect-step-3-sub-b",
          title: "Identify your VIP customers",
          helpText:
            "Tag your best customers — the ones who spend the most, refer the most, or have been with you the longest. These are the people you want to treat differently: early access to promotions, personal check-ins, priority service. Knowing who they are is the first step.",
        },
        {
          id: "connect-step-3-sub-c",
          title: "Set up lead source tracking",
          helpText:
            "When a new contact comes in, where did they come from? Google search? A referral? Your website? Tracking lead sources tells you which marketing channels are actually working so you can invest more in what works and stop wasting money on what does not.",
        },
      ],
      triggerOnComplete: {
        email: null,
        coachBlueAction: "celebrate_categories_created",
        nextStepPrompt: "Your contacts are organized. Now let's build a pipeline to track your deals from first conversation to closed sale.",
      },
    },
    {
      id: "connect-step-4",
      order: 4,
      title: "Create Your First Pipeline",
      description:
        "A pipeline is a visual way to track where each potential deal stands — from first contact to closed sale. Instead of keeping it all in your head or on sticky notes, you will see every opportunity laid out in stages so nothing falls through the cracks.",
      estimatedMinutes: 10,
      substeps: [
        {
          id: "connect-step-4-sub-a",
          title: "Name your pipeline stages",
          helpText:
            "Keep it simple. Most businesses need 4-6 stages: 'New Lead', 'Contacted', 'Proposal Sent', 'Negotiating', 'Won', 'Lost'. Use language that matches how you actually talk about deals in your business. You can always add or rename stages later.",
        },
        {
          id: "connect-step-4-sub-b",
          title: "Assign values to your stages",
          helpText:
            "For each deal in your pipeline, estimate its value. This does not have to be exact — a rough number is fine. When you can see that you have $50,000 in your pipeline, it changes how you prioritize your day. It also helps you forecast revenue, which matters when you are planning expenses or hiring.",
        },
        {
          id: "connect-step-4-sub-c",
          title: "Set up basic automation rules",
          helpText:
            "/ connect can automatically move deals between stages or send you reminders based on triggers you set. For example: if a deal has been in 'Proposal Sent' for 7 days with no activity, you get a reminder to follow up. Start with one or two simple rules — you can add more as you learn what works.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "connect-step-4-complete",
          subject: "Your pipeline is ready — one more step to finish / connect setup",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_pipeline_created",
        nextStepPrompt: "Your pipeline is set up. Last step — connect your business email so everything syncs automatically.",
      },
    },
    {
      id: "connect-step-5",
      order: 5,
      title: "Connect Your Email",
      description:
        "Connecting your business email lets / connect automatically log conversations with your contacts, track email opens, and keep everything in one place. No more switching between your inbox and your CRM — it all syncs.",
      estimatedMinutes: 5,
      substeps: [
        {
          id: "connect-step-5-sub-a",
          title: "Authorize your email provider",
          helpText:
            "Click the 'Connect Email' button and sign in with your business email (Gmail, Outlook, or other provider). You will be asked to grant permission for / connect to read and send emails on your behalf. This is secure — your password is never stored, and you can revoke access at any time.",
        },
        {
          id: "connect-step-5-sub-b",
          title: "Configure sync settings",
          helpText:
            "Choose which emails to sync: all emails, only emails to/from your contacts, or only emails you manually tag. For most businesses, syncing emails to/from known contacts is the right balance between keeping a complete record and not cluttering your CRM with every newsletter you receive.",
        },
      ],
      triggerOnComplete: {
        email: {
          templateId: "connect-step-5-complete",
          subject: "/ connect is fully set up — your foundation is solid",
          delayMinutes: 5,
        },
        coachBlueAction: "celebrate_connect_complete",
        nextStepPrompt: "/ connect is fully set up. Your foundation is solid. Next up: / publish — let's get your business showing up on every directory that matters.",
      },
    },
  ],

  whatDoneLooksLike: [
    "Business name, address, phone, and hours are verified and consistent",
    "Existing contacts are imported and free of duplicates",
    "Contacts are categorized with at least 3 meaningful tags",
    "At least one deal pipeline is created with named stages",
    "Business email is connected and syncing",
  ],

  commonMistakes: [
    "Importing contacts without cleaning the list first — duplicates and bad data pollute every report and campaign you run later",
    "Creating too many pipeline stages — 4 to 6 is ideal. More than that and deals get stuck in stages nobody checks",
    "Not categorizing contacts at all — sending the same message to everyone is the fastest way to get unsubscribes",
    "Skipping email connection — without it, you are manually logging every conversation, which means you will stop doing it within a week",
  ],

  troubleshooting: [
    {
      question: "My CSV import failed. What do I do?",
      answer:
        "The most common cause is special characters in your CSV file (curly quotes, em dashes, accented characters). Open the file in a plain text editor, save it as UTF-8 CSV, and try again. If it still fails, check that your column headers do not contain spaces at the beginning or end.",
      relatedStepId: "connect-step-2",
    },
    {
      question: "I see duplicate contacts after importing. How do I fix it?",
      answer:
        "Go to your contact list and use the 'Find Duplicates' tool. It will show you contacts with matching email addresses or phone numbers. You can merge them with one click — the system keeps the most complete record and discards the rest.",
      relatedStepId: "connect-step-2",
    },
    {
      question: "My email provider is not listed. Can I still connect?",
      answer:
        "If your email provider supports IMAP (most do), you can connect it manually using your IMAP server settings. Check with your email provider or hosting company for the IMAP server address, port, and whether it requires SSL. If you are using hostsblue.com for email, the settings are pre-configured.",
      relatedStepId: "connect-step-5",
    },
  ],

  coachBlueGuidance: {
    onFirstOpen:
      "Welcome to / connect — this is your home base. Everything on the platform starts here. I am going to walk you through five steps that will take about 50 minutes total. You do not have to do them all at once, but the sooner your foundation is set, the sooner every other tool starts working for you. Let's start with your business information.",
    onStall:
      "I noticed you started importing your contacts but have not finished. That is the step where most people pause — it feels like a big task. Here is the thing: even importing 20 contacts is better than zero. You can always add more later. Want to pick up where you left off?",
    onComplete:
      "/ connect is fully set up. Your business information is verified, your contacts are organized, your pipeline is tracking deals, and your email is connected. This is a solid foundation. Next step: / publish. That is where we make sure your business shows up correctly on every directory that matters — Google, Yelp, Apple Maps, and dozens more.",
    criticalWarnings: [
      "Do not skip the NAP verification step. Inconsistent business information across directories is one of the top reasons businesses rank poorly in local search.",
      "Do not import contacts who have previously unsubscribed from your emails. This violates CAN-SPAM regulations and can get your email sending privileges suspended.",
    ],
  },

  relatedApps: ["publish", "promote", "respond"],
  nextInCadence: "publish",
};

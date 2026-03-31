export interface AppKnowledge {
  appId: string;
  appName: string;
  suite: "compass" | "anchor" | "standalone";
  purpose: string;
  whyItMatters: string;

  setupSteps: SetupStep[];

  whatDoneLooksLike: string[];
  commonMistakes: string[];
  troubleshooting: FAQ[];

  coachBlueGuidance: {
    onFirstOpen: string;
    onStall: string;
    onComplete: string;
    criticalWarnings: string[];
  };

  relatedApps: string[];
  nextInCadence: string | null;
}

export interface SetupStep {
  id: string;                       // e.g. "connect-step-1"
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  substeps: SubStep[];

  triggerOnComplete: {
    email: EmailTrigger | null;
    coachBlueAction: string | null;
    nextStepPrompt: string | null;
  };
}

export interface SubStep {
  id: string;                       // e.g. "connect-step-1-sub-a"
  title: string;
  helpText: string;
  validationRule?: string;
}

export interface EmailTrigger {
  templateId: string;
  subject: string;
  delayMinutes: number;
}

export interface FAQ {
  question: string;
  answer: string;
  relatedStepId?: string;
}

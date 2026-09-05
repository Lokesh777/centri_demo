import { type RemoteImage, audienceImages, doodles } from "@/content/media";

export const hero = {
  banner: { label: "Read the Ballance blog", href: "/blog" },
  title: "Move payments without friction",
  description:
    "Issue cards, approve spend and reconcile in one place. Ballance gives growing teams the controls of a finance department without the paperwork of one.",
  primaryCta: { label: "Request a demo", href: "/contact" },
  secondaryCta: { label: "See in action", href: "/customers" },
} as const;

export type Stat = {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
};

export const stats: readonly Stat[] = [
  { value: 94, suffix: "%", label: "increase in spending visibility within the first year" },
  { value: 6, suffix: "x", label: "faster setup time from onboarding to first use" },
  { value: 71, suffix: "%", label: "reduction in manual follow-ups across payment workflows" },
];

export type Capability = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly image: RemoteImage;
  /** Wide cards span the full grid width. */
  readonly wide: boolean;
};

export const capabilities: readonly Capability[] = [
  {
    id: "individuals",
    label: "Individuals",
    title: "Spend without fronting your own money",
    description:
      "A card that carries its own limits, so there is nothing to claim back and nothing to explain later.",
    image: doodles.individuals,
    wide: false,
  },
  {
    id: "growing-teams",
    label: "Growing teams",
    title: "Give everyone a budget and keep the guardrails",
    description:
      "Issue cards by team in seconds, set what they can be used for once, and let people get on with the work.",
    image: doodles.financeOps,
    wide: false,
  },
  {
    id: "finance-operations",
    label: "Finance operations",
    title: "A close that assembles itself",
    description:
      "Transactions arrive coded, documented and matched to a budget, so reconciliation runs continuously instead of arriving all at once.",
    image: doodles.growingTeams,
    wide: true,
  },
];

export type Audience = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly image: RemoteImage;
};

export const audiences: readonly Audience[] = [
  {
    id: "finance",
    label: "Finance teams",
    title: "Close the month before it ends",
    description:
      "Card spend, bills and vendor payments land in one ledger, already coded. Nothing has to be reconstructed in the final week because nothing was lost along the way.",
    image: audienceImages.finance,
  },
  {
    id: "operations",
    label: "Operations teams",
    title: "Buy what the work needs",
    description:
      "Recurring subscriptions and one-off purchases run through the same rules, so procurement stops being a queue and starts being a decision made at the point of spend.",
    image: audienceImages.operations,
  },
  {
    id: "growing",
    label: "Growing companies",
    title: "Add headcount, not process",
    description:
      "Budgets, roles and entities are structural rather than bolted on, so doubling the team means adding people to a system that already fits rather than rebuilding it.",
    image: audienceImages.growing,
  },
  {
    id: "founders",
    label: "Founders & leaders",
    title: "Know the number without asking",
    description:
      "Committed and actual spend, current as of this morning. Enough detail to make the call, without being pulled into approving every purchase to get it.",
    image: audienceImages.founders,
  },
];

export type Certification = {
  readonly name: string;
  readonly description: string;
};

export const certifications: readonly Certification[] = [
  {
    name: "SOC II",
    description:
      "An independent auditor tests our security, availability and confidentiality controls each year, and we publish the report to customers under NDA.",
  },
  {
    name: "ISO 27001",
    description:
      "Our information security management system is certified against ISO 27001, covering how we classify, protect and review access to data.",
  },
  {
    name: "GDPR",
    description:
      "Data processing agreements come as standard, with plain commitments on what we collect, the purpose it serves and how long it is kept.",
  },
  {
    name: "HIPAA",
    description:
      "Safeguards for regulated healthcare spend, so clinical organisations run the same controls as everyone else rather than a carved-out exception.",
  },
];

export const complianceSummary =
  "Funds are held with regulated partner institutions, and every control we claim here is independently tested rather than self-attested.";

export const faqs: readonly { question: string; answer: string }[] = [
  {
    question: "What is Ballance?",
    answer:
      "A spend management platform. Ballance issues corporate cards, moves outbound payments and reports on both in real time, replacing the mix of bank portals, spreadsheets and reimbursement forms most teams run on.",
  },
  {
    question: "What types of cards does Ballance offer?",
    answer:
      "Virtual cards for software, media and one-off vendors, and physical cards for people who spend in person. Both sit under the same limits, categories and reporting.",
  },
  {
    question: "How quickly can cards be issued?",
    answer:
      "Virtual cards are available the moment your account is verified — usually the same working day. Physical cards are produced and delivered within five business days.",
  },
  {
    question: "Can I control how cards are used?",
    answer:
      "You define limits by person, team, vendor or merchant category. Ballance checks each transaction against those rules at authorisation, so anything outside policy is declined rather than discovered later.",
  },
  {
    question: "What is a corporate card, in practice?",
    answer:
      "A payment card issued to your business rather than to an individual. Spend draws on a company balance, so employees never front money and never file a reimbursement.",
  },
  {
    question: "Why move off reimbursements entirely?",
    answer:
      "Reimbursements delay visibility by weeks and push cash flow onto employees. Company-issued cards give you the transaction, the receipt and the budget impact at the same moment.",
  },
  {
    question: "What does onboarding involve?",
    answer:
      "A verification step, an accounting connection and an import of your team. Most companies are issuing cards within a week, and an implementation lead stays with you through the first close.",
  },
  {
    question: "Will it still fit when the team doubles?",
    answer:
      "Yes. Permissions, budgets and entities are structural rather than per-seat workarounds, so the same setup carries from ten people to several hundred.",
  },
];

export const getStarted = {
  title: "Get started with Ballance",
  description:
    "See it against your own spend. Twenty minutes, no slides, and a straight answer on whether it fits the way your team already works.",
  placeholder: "What's your work email?",
  cta: "Book a demo",
} as const;

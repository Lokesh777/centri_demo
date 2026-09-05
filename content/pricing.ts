export type Plan = {
  readonly id: string;
  readonly name: string;
  readonly monthlyPrice: number | null;
  readonly description: string;
  readonly cta: { readonly label: string; readonly href: string };
  readonly featured: boolean;
  readonly features: readonly string[];
};

/** Two months free when billed annually. */
export const YEARLY_MONTHS_CHARGED = 10;

export const plans: readonly Plan[] = [
  {
    id: "baseline",
    name: "Baseline",
    monthlyPrice: 180,
    description: "For independents and solo operators",
    cta: { label: "Begin 7-day trial", href: "/contact" },
    featured: false,
    features: [
      "Guided account setup",
      "Virtual cards, issued instantly",
      "Real-time spend tracking",
      "Basic limits and controls",
      "Transaction alerts and notifications",
      "Card payments",
      "Category restrictions",
      "Up to 3 team members",
      "Email and in-app support",
    ],
  },
  {
    id: "core",
    name: "Core",
    monthlyPrice: 420,
    description: "For growing teams",
    cta: { label: "Book a demo", href: "/contact" },
    featured: true,
    features: [
      "Everything in Baseline",
      "Virtual and physical cards",
      "Team-based card issuance",
      "Approval workflows for spending",
      "Role-based permissions",
      "Category-level spend visibility",
      "Shared budgets and limits",
      "Cards and bill payments",
      "Priority processing",
      "Up to 25 team members",
      "Priority support",
    ],
  },
  {
    id: "extended",
    name: "Extended",
    monthlyPrice: null,
    description: "For larger and multi-entity businesses",
    cta: { label: "Talk to sales", href: "/contact" },
    featured: false,
    features: [
      "Everything in Core",
      "Multi-entity support",
      "Custom configurations and limits",
      "Unlimited team members",
      "Advanced audit and export controls",
      "Dedicated account manager",
      "Phone support",
      "Implementation and migration help",
    ],
  },
];

export const pricingFaqs: readonly { question: string; answer: string }[] = [
  {
    question: "Is there a per-card fee?",
    answer:
      "No. Every plan includes unlimited virtual cards, and physical cards are issued at no additional cost.",
  },
  {
    question: "Can we change plans later?",
    answer:
      "Yes, at any point. Upgrades apply immediately and are prorated; downgrades take effect at the start of the next billing period.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "Nothing automatic. We will let you know before the seven days are up and you decide whether to continue — cards issued during the trial stay active either way.",
  },
  {
    question: "Do you offer nonprofit pricing?",
    answer:
      "We do. Registered nonprofits receive a reduced rate on Core and Extended; get in touch and we will apply it before you start.",
  },
];

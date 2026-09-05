export const site = {
  name: "Ballance",
  /** The reference design sets the wordmark with a trailing asterisk. */
  wordmark: "ballance",
  tagline: "Move payments without friction",
  description:
    "Ballance issues cards, moves payments and shows every dollar as it is spent — so finance teams stop chasing receipts and start closing the month early.",
  url: "https://ballance.example.com",
  footerTagline: "Governance, everywhere you spend.",
} as const;

export type NavLink = {
  readonly label: string;
  readonly href: string;
  /** Optional pill rendered beside the label, e.g. "we are hiring!". */
  readonly badge?: string;
};

export type NavGroup = {
  readonly title: string;
  readonly links: readonly NavLink[];
};

/** Drives both the full-screen menu and the footer columns. */
export const navGroups: readonly NavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Ballance Home", href: "/" },
      { label: "Company", href: "/company" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "/contact" },
      { label: "404", href: "/404" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customer Stories", href: "/customers" },
      { label: "Careers", href: "/careers", badge: "we are hiring!" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];

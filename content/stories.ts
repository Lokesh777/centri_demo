import { type RemoteImage, storyImages } from "@/content/media";

export type Story = {
  readonly slug: string;
  readonly metric: string;
  readonly metricLabel: string;
  readonly industry: string;
  /** Two stacked pills on the carousel card. */
  readonly tags: readonly [string, string];
  readonly customer: string;
  readonly title: string;
  readonly intro: string;
  readonly publishedAt: string;
  readonly readingMinutes: number;
  readonly image: RemoteImage;
  readonly body: readonly string[];
  readonly pullQuote: { readonly text: string; readonly attribution: string };
  readonly closingQuote: { readonly text: string; readonly attribution: string };
};

export const stories: readonly Story[] = [
  {
    slug: "kessler-co",
    metric: "10x",
    metricLabel: "faster turnaround time",
    industry: "Legal",
    tags: ["Legal", "Professional services"],
    customer: "Kessler & Co",
    title: "Client disbursements that clear the same afternoon",
    intro:
      "Kessler & Co handles disbursements on behalf of clients who expect an exact accounting of every pound. As the firm grew, the paperwork behind each payment grew faster than the payments themselves.",
    publishedAt: "2026-04-22",
    readingMinutes: 3,
    image: storyImages.legal,
    body: [
      "Partners were approving payments over email and reconstructing the reasoning weeks later, when a client asked. The information existed, but it was scattered across inboxes and a shared drive.",
      "Cards were issued per matter, with the client reference attached at the point of issue. Spend arrives already coded to the matter it belongs to, which removed the reconstruction step entirely.",
      "Turnaround on a routine disbursement fell from a fortnight to a single afternoon, and the audit trail is now a by-product of doing the work rather than a separate task.",
    ],
    pullQuote: {
      text: "We were not slow because the work was hard. We were slow because the record of the work lived in six places.",
      attribution: "Priya Raghunathan, Managing Partner",
    },
    closingQuote: {
      text: "Clients ask harder questions than regulators do. Being able to answer them in the moment, with the detail attached, changed how those conversations go.",
      attribution: "Priya Raghunathan, Managing Partner, Kessler & Co",
    },
  },
  {
    slug: "hawthorne-hospitals",
    metric: "46%",
    metricLabel: "decrease in manual reconciliation",
    industry: "Healthcare",
    tags: ["Healthcare", "Patient care"],
    customer: "Hawthorne Hospitals",
    title: "Removing friction from spend so clinicians do not carry it",
    intro:
      "Hawthorne runs four sites with procurement needs that shift by the hour. Their priority is patient care, which means financial process has to be dependable enough to stop being a topic.",
    publishedAt: "2026-02-14",
    readingMinutes: 4,
    image: storyImages.healthcare,
    body: [
      "Departmental spend ran through a mix of requisition forms and personal cards, with reimbursements landing weeks after the fact. Ward managers were absorbing cost and administrative load that was never part of their role.",
      "Each department now holds its own budget with category limits set once by finance. Purchases inside policy simply go through; anything outside it is declined at the till rather than queried a month later.",
      "Manual reconciliation dropped by nearly half, and the finance team stopped spending the first week of every month chasing context for transactions nobody remembered making.",
    ],
    pullQuote: {
      text: "The best outcome is that clinical staff no longer think about how a purchase gets approved. It just works.",
      attribution: "Dr. Elena Vasquez, Medical Director",
    },
    closingQuote: {
      text: "We are accountable for public money and for patient outcomes at the same time. Systems that make the first easier without touching the second are rare.",
      attribution: "Dr. Elena Vasquez, Medical Director, Hawthorne Hospitals",
    },
  },
  {
    slug: "harbor-trust",
    metric: "18 hrs",
    metricLabel: "saved every month",
    industry: "Nonprofit",
    tags: ["Religion", "Nonprofit"],
    customer: "Harbor Trust",
    title: "Eighteen hours a month back into programme work",
    intro:
      "Harbor Trust supports community programmes across three regions. Every hour spent on financial administration is an hour not spent on the work the organisation exists to do.",
    publishedAt: "2025-11-30",
    readingMinutes: 3,
    image: storyImages.nonprofit,
    body: [
      "Grant reporting demanded a level of detail the previous process could not produce without a manual rebuild each quarter. Two staff members lost most of a week to it, every time.",
      "Programme cards carry the fund they draw on. Restricted and unrestricted spend separate automatically, which means grant reports assemble from records that were already correct.",
      "The eighteen hours a month that used to go into reconciliation now go into delivery. For an organisation this size, that is a meaningful fraction of a role.",
    ],
    pullQuote: {
      text: "Funders want to know their money did what we said it would. We can now show that without stopping the work to prove it.",
      attribution: "Marcus Aliev, Director of Operations",
    },
    closingQuote: {
      text: "What matters most is that our teams can focus on serving people rather than navigating systems.",
      attribution: "Marcus Aliev, Director of Operations, Harbor Trust",
    },
  },
  {
    slug: "bright-harbor",
    metric: "> 50",
    metricLabel: "vendors managed across collections",
    industry: "Fashion & retail",
    tags: ["B2B", "Fintech"],
    customer: "Bright Harbor",
    title: "Fifty suppliers, one ledger, no seasonal scramble",
    intro:
      "Bright Harbor works with more than fifty suppliers across two collections a year. Commitments are made months ahead of the invoices that follow them.",
    publishedAt: "2025-09-08",
    readingMinutes: 4,
    image: storyImages.retail,
    body: [
      "Committed spend lived in a production spreadsheet while actual spend lived in the bank. The two were compared at the end of a season, which is exactly too late to act on the difference.",
      "Vendor-locked cards mean a supplier can only draw what was agreed, and the commitment is visible against the budget from the day it is made rather than the day it clears.",
      "Planning conversations now start from a number the team trusts. The season is still busy; it is no longer uncertain.",
    ],
    pullQuote: {
      text: "We stopped guessing what we had committed to and started planning against it. That is the entire difference.",
      attribution: "Naomi Clarke, VP Finance",
    },
    closingQuote: {
      text: "Every supplier, every season, on one ledger. It sounds unremarkable until you have spent a decade without it.",
      attribution: "Naomi Clarke, VP Finance, Bright Harbor",
    },
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export const featuredQuote = {
  text: "Good financial tooling should stay out of the way. Ballance is the first system we have used that our team simply does not think about — which is the highest compliment I can pay it.",
  author: "Dana Whitfield",
  role: "Head of Finance",
  company: "Summit Forge",
} as const;

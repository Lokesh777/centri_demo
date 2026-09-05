export type LegalDocument = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly updatedAt: string;
  readonly sections: readonly { heading: string; body: string }[];
};

/**
 * Placeholder legal copy for the design study. Replace with reviewed text
 * before this is used anywhere real.
 */
export const legalDocuments: readonly LegalDocument[] = [
  {
    slug: "terms",
    title: "Terms of service",
    summary: "The agreement that governs your use of Ballance.",
    updatedAt: "2026-06-01",
    sections: [
      {
        heading: "Using the service",
        body: "You may use Ballance for lawful business purposes, in line with the plan you have subscribed to. You are responsible for the activity of the people you invite to your account.",
      },
      {
        heading: "Accounts and access",
        body: "Keep your credentials secure and tell us promptly if you believe an account has been compromised. We may suspend access where we reasonably believe it is necessary to protect funds.",
      },
      {
        heading: "Fees and billing",
        body: "Subscription fees are charged in advance for the period you select. Upgrades take effect immediately and are prorated; downgrades take effect at the next renewal.",
      },
      {
        heading: "Ending the agreement",
        body: "You may cancel at any time and will retain access until the end of the paid period. Exports of your transaction history remain available for thirty days afterwards.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    summary: "What we collect, why we collect it, and how long we keep it.",
    updatedAt: "2026-06-01",
    sections: [
      {
        heading: "What we collect",
        body: "Account details, transaction records and the technical logs needed to operate the service securely. We do not sell personal data or share it for advertising.",
      },
      {
        heading: "Why we collect it",
        body: "To operate your account, meet financial regulations that apply to us, prevent fraud and improve the product. Each purpose is limited to the data it genuinely needs.",
      },
      {
        heading: "How long we keep it",
        body: "Transaction records are retained for the period required by applicable financial regulation. Other data is deleted once it is no longer needed for the purpose it was collected for.",
      },
      {
        heading: "Your rights",
        body: "You can request access to, correction of, or deletion of your personal data. Write to privacy@ballance.example and we will respond within one month.",
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    summary: "The small number of cookies this site sets, and what each one does.",
    updatedAt: "2026-06-01",
    sections: [
      {
        heading: "Strictly necessary",
        body: "Session and security cookies that keep you signed in and protect against request forgery. These cannot be switched off without breaking the product.",
      },
      {
        heading: "Preferences",
        body: "Remember choices such as your billing view or dismissed notices. Removing them resets those choices but does not affect functionality.",
      },
      {
        heading: "Analytics",
        body: "Aggregated, privacy-preserving usage measurement so we can see which parts of the product are used. Opt out at any time from your account settings.",
      },
    ],
  },
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug);
}

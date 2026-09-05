export type Job = {
  readonly id: string;
  readonly title: string;
  readonly team: string;
  readonly location: string;
  readonly type: string;
};

export const jobs: readonly Job[] = [
  { id: "eng-payments", title: "Senior Engineer, Payments", team: "Engineering", location: "London / Remote", type: "Full-time" },
  { id: "eng-platform", title: "Platform Engineer", team: "Engineering", location: "Remote (UK & EU)", type: "Full-time" },
  { id: "design-product", title: "Product Designer", team: "Design", location: "London", type: "Full-time" },
  { id: "ops-risk", title: "Risk & Compliance Analyst", team: "Operations", location: "London", type: "Full-time" },
  { id: "gtm-ae", title: "Account Executive, Mid-Market", team: "Go-to-market", location: "Remote (UK)", type: "Full-time" },
  { id: "gtm-support", title: "Customer Support Specialist", team: "Go-to-market", location: "Manchester / Hybrid", type: "Full-time" },
];

export const benefits: readonly { title: string; description: string }[] = [
  { title: "Equity for everyone", description: "Every permanent employee holds meaningful ownership from their first day." },
  { title: "Four-day fortnights", description: "Every second Friday is yours. No expectation to catch up over the weekend." },
  { title: "Health, properly covered", description: "Private medical, dental and mental health support for you and your dependants." },
  { title: "Somewhere to work", description: "A budget for a desk that suits you, whether that is at home or in an office we pay for." },
  { title: "Learning that is used", description: "An annual budget with time set aside to actually spend it." },
  { title: "Parental leave", description: "Six months at full pay for all new parents, however they become one." },
];

export const values: readonly { title: string; description: string }[] = [
  { title: "Precision over polish", description: "Money software earns trust by being correct first and attractive second. We do not ship a beautiful screen that reports the wrong number." },
  { title: "Fewer moving parts", description: "Every feature we add is a thing that can fail at month-end. We remove more than we add, deliberately." },
  { title: "Close to the problem", description: "Everyone here spends time with the finance teams who use Ballance. Nobody designs for a user they have never met." },
];

import { type RemoteImage, audienceImages, storyImages } from "@/content/media";

export type Post = {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly publishedAt: string;
  readonly readingMinutes: number;
  readonly author: { readonly name: string; readonly role: string };
  /** Reused from the shared media pool — swap for real article art. */
  readonly image: RemoteImage;
  /** Body paragraphs, rendered in order. */
  readonly body: readonly string[];
};

export const posts: readonly Post[] = [
  {
    slug: "designing-cards-people-actually-use",
    title: "Designing cards that people actually use",
    excerpt:
      "A corporate card only works if reaching for it is the path of least resistance. Most of them are not.",
    category: "Product",
    publishedAt: "2026-08-18",
    readingMinutes: 6,
    author: { name: "Dana Whitfield", role: "Head of Finance, Summit Forge" },
    image: audienceImages.finance,
    body: [
      "Adoption is the whole game. A card programme with perfect controls and forty per cent usage has not replaced anything — it has added a second system alongside the one people were already using.",
      "The failure is usually not the card. It is the twenty minutes of justification required before someone is allowed to hold one, repeated every time a need appears.",
      "Issuing instantly, with the limit already attached, removes the negotiation. The control moves from a conversation before the purchase to a rule enforced during it.",
      "Once the easy path and the compliant path are the same path, usage stops being something you have to drive.",
    ],
  },
  {
    slug: "reducing-friction-in-business-spending",
    title: "Reducing friction in business spending",
    excerpt:
      "Every approval step exists for a reason. Most of those reasons stopped applying several years ago.",
    category: "Operations",
    publishedAt: "2026-07-02",
    readingMinutes: 5,
    author: { name: "Marcus Aliev", role: "Director of Operations" },
    image: audienceImages.operations,
    body: [
      "Approval chains accumulate. Someone is burned once, a step is added, and it is never removed because removing it requires arguing that the original risk has passed.",
      "The cost is invisible in any budget line: work that waits, decisions deferred, and a slow drift toward asking permission for things nobody would actually refuse.",
      "Limits set in advance do the same job as an approval, without the wait. The question moves from who signs this to what is this card allowed to do.",
      "The measure of a good spending process is how rarely anyone has to think about it.",
    ],
  },
  {
    slug: "what-real-time-actually-means",
    title: "What real-time actually means in finance",
    excerpt:
      "A dashboard that refreshes nightly is not real-time. The distinction matters more than most teams expect.",
    category: "Engineering",
    publishedAt: "2026-05-21",
    readingMinutes: 7,
    author: { name: "Priya Raghunathan", role: "Engineering" },
    image: storyImages.healthcare,
    body: [
      "Real-time is one of the most abused words in financial software. In practice it usually means a batch job that runs overnight and a chart that redraws in the morning.",
      "The gap sounds academic until a budget is exhausted at ten in the morning and nobody finds out until the following day.",
      "Authorisation-time data is different in kind, not degree. The decision to allow a transaction and the decision to record it become the same event.",
      "Building that way is harder. It also removes an entire class of question that finance teams should never have had to ask.",
    ],
  },
  {
    slug: "the-cost-of-reimbursements",
    title: "The hidden cost of reimbursements",
    excerpt:
      "Asking employees to spend their own money is a financing decision. Most companies have never priced it.",
    category: "Finance operations",
    publishedAt: "2026-03-09",
    readingMinutes: 4,
    author: { name: "Naomi Clarke", role: "VP Finance" },
    image: storyImages.nonprofit,
    body: [
      "Reimbursement pushes working capital onto the people least able to absorb it, then charges the company for the privilege in processing time.",
      "There is a second cost that rarely appears in any model: the spend you learn about weeks late, after the decision it should have informed has already been made.",
      "Company-issued cards collapse both costs at once. The transaction, the receipt and the budget impact arrive together.",
      "It is a small operational change that quietly removes a recurring source of friction between finance and everyone else.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Shown inside the full-screen menu. */
export const featuredPosts = posts.slice(0, 2);

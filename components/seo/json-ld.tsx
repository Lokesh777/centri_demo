import { faqs } from "@/content/home";
import { site } from "@/content/site";

/**
 * Emits JSON-LD. Next hoists `<script type="application/ld+json">` in the body
 * without executing it, so this is safe to render from a server component.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
} as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
} as const;

export function breadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  authorName: string;
  imageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    image: article.imageUrl,
    author: { "@type": "Person", name: article.authorName },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}${article.path}`,
  };
}

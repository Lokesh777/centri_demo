import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/section";
import { posts } from "@/content/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on spend management, finance operations and building payment systems.",
};

const [latest, ...rest] = posts;

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the finance function"
        description="Occasional writing about spend, controls and the unglamorous work of making money move correctly."
      />

      <Section className="pt-0">
        <Container className="flex flex-col gap-4">
          <Reveal>
            <Link
              href={`/blog/${latest.slug}`}
              className="group flex flex-col gap-6 rounded-card border border-ink/10 bg-cream p-8 transition-colors duration-300 hover:border-ink/30 sm:p-12"
            >
              <span className="flex items-center gap-3 label text-ink/60">
                {latest.category}
                <span aria-hidden="true">·</span>
                {formatDate(latest.publishedAt)}
              </span>

              <h2 className="max-w-3xl text-headline text-balance">{latest.title}</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-ink/65 text-pretty">
                {latest.excerpt}
              </p>

              <span className="flex items-center gap-2 text-sm font-semibold">
                Read the post
                <ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          <ul className="grid gap-4 md:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 80} className="h-full">
                <li className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex h-full flex-col gap-4 rounded-card border border-ink/10 bg-cream p-8 transition-colors duration-300 hover:border-ink/30"
                  >
                    <span className="label text-ink/60">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-balance">{post.title}</h3>
                    <p className="text-sm leading-relaxed text-ink/65 text-pretty">{post.excerpt}</p>
                    <span className="mt-auto border-t border-ink/10 pt-4 text-xs text-ink/65">
                      {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

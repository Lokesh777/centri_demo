import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GetStarted } from "@/components/sections/get-started";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/section";
import { getPost, posts } from "@/content/posts";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <>
      {/* Dark masthead like every other route: the fixed-position header
          renders white, and its 80px height has to be cleared by the padding
          here rather than reserved in flow. */}
      <Section className="bg-night pt-32 pb-14 text-white sm:pt-40">
        <Container className="flex max-w-3xl flex-col gap-6">
          <Link href="/blog" className="label text-white/60 transition-colors hover:text-white">
            ← All posts
          </Link>

          <p className="label flex flex-wrap items-center gap-3 text-white/60">
            {post.category}
            <span aria-hidden="true">·</span>
            {formatDate(post.publishedAt)}
            <span aria-hidden="true">·</span>
            {post.readingMinutes} min read
          </p>

          <h1 className="text-headline text-balance">{post.title}</h1>

          <p className="text-sm text-white/60">
            <span className="font-medium text-white">{post.author.name}</span> · {post.author.role}
          </p>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container>
          <article className="flex max-w-3xl flex-col gap-6 border-t border-ink/10 pt-12 text-lg leading-relaxed text-ink/75">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </article>

          <nav className="mt-14 max-w-3xl border-t border-ink/10 pt-8" aria-label="More posts">
            <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold">
              Read more from the blog
              <ArrowRightIcon />
            </Link>
          </nav>
        </Container>
      </Section>

      <GetStarted />
    </>
  );
}

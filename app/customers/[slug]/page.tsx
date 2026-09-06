import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GetStarted } from "@/components/sections/get-started";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { StarRating } from "@/components/ui/star-rating";
import { Container, Section } from "@/components/ui/section";
import { getStory, stories } from "@/content/stories";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/customers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) return {};

  return {
    title: story.title,
    description: story.intro,
    alternates: { canonical: `/customers/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.intro,
      images: [{ url: story.image.src }],
    },
  };
}

export default async function StoryPage({ params }: PageProps<"/customers/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  const meta = [
    { label: "Customer", value: story.customer },
    { label: "Date", value: formatDate(story.publishedAt) },
    { label: "Length", value: `${story.readingMinutes} min read` },
    { label: "Industry", value: story.industry },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Customer stories", path: "/customers" },
          { name: story.customer, path: `/customers/${story.slug}` },
        ])}
      />

      <section className="bg-sand pt-32 pb-14 sm:pt-40">
        <Container className="flex max-w-4xl flex-col gap-8">
          <Link
            href="/customers"
            className="label inline-flex items-center gap-2.5 text-ink/65 transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeftIcon width={14} height={14} />
            Case studies
          </Link>
          <h1 className="text-headline text-balance">{story.title}</h1>
        </Container>
      </section>

      <div className="bg-linear-to-b from-sand to-white">
        <Container className="max-w-4xl">
          <div className="relative aspect-16/9 overflow-hidden rounded-card">
            <Image
              src={story.image.src}
              alt={story.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="object-cover"
            />
          </div>
        </Container>
      </div>

      <Section className="bg-white pt-14">
        <Container className="grid max-w-4xl gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)] lg:gap-16">
          <p className="text-xl leading-relaxed text-ink/75 text-pretty sm:text-2xl">
            {story.intro}
          </p>

          <dl className="flex flex-col gap-4 self-start">
            {meta.map((entry) => (
              <div key={entry.label} className="flex flex-col gap-1">
                <dt className="label text-ink/60">{entry.label}</dt>
                <dd className="text-sm font-medium text-red-deep">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </Container>

        <Container className="mt-16 flex max-w-3xl flex-col gap-7">
          {story.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-ink/70 text-pretty">
              {paragraph}
            </p>
          ))}

          <figure className="my-6 border-l-2 border-olive pl-6">
            <blockquote className="text-lg leading-relaxed text-ink/80 italic text-pretty">
              “{story.pullQuote.text}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-ink/65">
              — {story.pullQuote.attribution}
            </figcaption>
          </figure>

          <figure className="mt-8 flex flex-col gap-6 border-t border-ink/10 pt-12">
            <StarRating className="text-ink/25" />
            <blockquote className="text-2xl leading-snug font-medium tracking-tight text-olive text-balance">
              “{story.closingQuote.text}”
            </blockquote>
            <figcaption className="label text-ink/60">{story.closingQuote.attribution}</figcaption>
          </figure>
        </Container>
      </Section>

      <GetStarted />
    </>
  );
}

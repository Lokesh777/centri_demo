import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { GetStarted } from "@/components/sections/get-started";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/section";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Customer stories",
  description:
    "How finance, operations and leadership teams use Ballance to close earlier and spend with confidence.",
  alternates: { canonical: "/customers" },
};

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customer stories"
        title="The month after they switched"
        description="No vanity metrics. Each of these is a number the team measured themselves, before and after."
      />

      <Section className="bg-white">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2">
            {stories.map((story, index) => (
              <Reveal key={story.slug} delay={(index % 2) * 90} className="h-full">
                <li className="h-full">
                  <Link
                    href={`/customers/${story.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card bg-cream"
                  >
                    <div className="relative aspect-16/11 overflow-hidden">
                      <Image
                        src={story.image.src}
                        alt={story.image.alt}
                        fill
                        sizes="(min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-7 text-white">
                        <p className="text-4xl font-medium tracking-tight">{story.metric}</p>
                        <p className="text-sm text-white/80">{story.metricLabel}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
                      <p className="label text-ink/60">
                        {story.industry} · {story.customer}
                      </p>
                      <h2 className="text-title text-balance">{story.title}</h2>
                      <p className="leading-relaxed text-ink/65 text-pretty">{story.intro}</p>
                      <span className="label mt-auto inline-flex items-center gap-2 pt-2 text-ink">
                        Read the story
                        <ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <GetStarted />
    </>
  );
}

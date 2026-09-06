import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { benefits, jobs } from "@/content/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Ballance across engineering, design, operations and go-to-market.",
};

const TEAMS = [...new Set(jobs.map((job) => job.team))];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Come build financial software that behaves"
        description="Sixty-three people across six countries, one shared allergy to systems that lose track of money."
      />

      <Section className="pt-0">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Open roles" title={`${jobs.length} roles open right now`} />

          <div className="flex flex-col gap-12">
            {TEAMS.map((team) => (
              <div key={team} className="flex flex-col gap-1">
                <h3 className="label text-ink/60">{team}</h3>
                <ul className="flex flex-col border-t border-ink/10">
                  {jobs
                    .filter((job) => job.team === team)
                    .map((job, index) => (
                      <Reveal key={job.id} delay={index * 60}>
                        <li className="border-b border-ink/10">
                          <Link
                            href="/contact"
                            className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6"
                          >
                            <span className="text-xl font-bold tracking-tight">{job.title}</span>
                            <span className="flex items-center gap-4 text-sm text-ink/65">
                              <span>{job.location}</span>
                              <span aria-hidden="true">·</span>
                              <span>{job.type}</span>
                              <ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                        </li>
                      </Reveal>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Benefits"
            title="What you get, plainly stated"
            description="No perks page full of fruit bowls. These are the things that materially change how the job feels."
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={(index % 3) * 80} className="h-full">
                <li className="flex h-full flex-col gap-2 rounded-card border border-ink/10 p-7">
                  <h3 className="font-bold tracking-tight">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/65 text-pretty">
                    {benefit.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

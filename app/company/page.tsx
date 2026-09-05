import type { Metadata } from "next";

import { GetStarted } from "@/components/sections/get-started";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { values } from "@/content/jobs";

export const metadata: Metadata = {
  title: "Company",
  description: "Why Ballance exists, how we work, and who is building it.",
};

const TIMELINE = [
  { year: "2021", event: "Founded after one too many month-end scrambles at a previous company." },
  { year: "2022", event: "First cards issued to design partners; the product had exactly one screen." },
  { year: "2024", event: "SOC 2 Type II and ISO 27001 certified; multi-entity support shipped." },
  { year: "2026", event: "Over 1,400 finance teams close their books on Ballance every month." },
] as const;

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title="We build the boring part properly"
        description="Ballance exists because the systems companies use to move money were designed for banks, not for the people who have to explain the numbers afterwards."
      />

      <Section className="pt-0">
        <Container className="grid gap-4 sm:grid-cols-3">
          {[
            { value: "1,400+", label: "Finance teams" },
            { value: "$4.2bn", label: "Processed annually" },
            { value: "63", label: "People, six countries" },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 100}>
              <div className="rounded-card border border-ink/10 bg-cream p-8">
                <p className="text-4xl font-bold tracking-tight">{item.value}</p>
                <p className="mt-2 text-ink/55">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <SectionHeading
            eyebrow="How we work"
            title="Three commitments we actually hold each other to"
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <ul className="flex flex-col">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <li className="flex flex-col gap-2 border-b border-ink/10 py-7 first:border-t">
                  <h3 className="text-xl font-bold tracking-tight">{value.title}</h3>
                  <p className="leading-relaxed text-ink/55 text-pretty">{value.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Timeline" title="A short history" />
          <ol className="flex flex-col">
            {TIMELINE.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 80}>
                <li className="flex gap-6 border-b border-ink/10 py-6 first:border-t sm:gap-12">
                  <span className="font-mono text-sm text-ink/55">{entry.year}</span>
                  <p className="leading-relaxed text-ink/75 text-pretty">{entry.event}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <GetStarted />
    </>
  );
}

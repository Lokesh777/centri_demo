import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { certifications, complianceSummary } from "@/content/home";

/** Low-contrast marks anchoring the foot of each card. */
const WATERMARKS: Record<string, ReactNode> = {
  "SOC II": (
    <>
      <path d="M32 5 55 13v19c0 14-9.6 26-23 30C18.6 58 9 46 9 32V13L32 5Z" />
      <path d="M23 32.5 29.5 39 42 26" />
    </>
  ),
  "ISO 27001": (
    <>
      <circle cx="32" cy="32" r="25" />
      <ellipse cx="32" cy="32" rx="11" ry="25" />
      <path d="M7 32h50M12 18h40M12 46h40" />
    </>
  ),
  GDPR: (
    <>
      <circle cx="32" cy="32" r="25" />
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index * Math.PI) / 6;
        return (
          <circle
            key={index}
            cx={32 + Math.sin(angle) * 16}
            cy={32 - Math.cos(angle) * 16}
            r="1.9"
            fill="currentColor"
            stroke="none"
          />
        );
      })}
    </>
  ),
  HIPAA: (
    <>
      <path d="M32 12v46" />
      <circle cx="32" cy="8" r="4" />
      <path d="M24 16a8 8 0 0 1 16 0M23 25c-6 4.5-6 15 0 19M41 25c6 4.5 6 15 0 19M25 52h14" />
    </>
  ),
};

export function Compliance() {
  return (
    <Section className="bg-ink text-white">
      <Container className="flex flex-col gap-12">
        <div className="flex justify-center">
          <Eyebrow className="text-white/60">Certified &amp; compliant</Eyebrow>
        </div>

        {/* Four across on desktop, matching the reference's single row. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certification, index) => (
            <Reveal key={certification.name} delay={(index % 4) * 70} className="h-full">
              <article className="relative flex h-full min-h-80 flex-col overflow-hidden rounded-card bg-white/4 p-7">
                <h3 className="text-xl tracking-tight">{certification.name}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/50 text-pretty">
                  {certification.description}
                </p>

                <svg
                  aria-hidden
                  focusable="false"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute bottom-6 left-6 size-12 text-white/10"
                >
                  {WATERMARKS[certification.name]}
                </svg>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-[1.0625rem] leading-relaxed text-white/55 text-pretty">
            {complianceSummary}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

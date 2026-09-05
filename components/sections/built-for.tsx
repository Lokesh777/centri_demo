import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CommandIcon } from "@/components/ui/icons";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { audiences } from "@/content/home";

/**
 * Every audience card shares this frame, so the four read as one set and each
 * card fits the window. The knob for how tall the photos run.
 */
const IMAGE_RATIO = "16 / 10";

export function BuiltFor() {
  return (
    <Section id="built-for" className="bg-ink text-white">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-5 text-center">
          <Eyebrow className="text-white/45">For modern teams managing spend</Eyebrow>
          <h2 className="max-w-3xl text-headline text-balance">Who Ballance is built for</h2>
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-white/55 text-pretty">
            One product, four vantage points. Everyone sees the part of the money they are
            accountable for, and nobody has to ask someone else for it.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
          {audiences.map((audience, index) => (
            <Reveal key={audience.id} delay={index === 0 ? 0 : 60} amount={0.08}>
              <article className="flex flex-col rounded-card border border-line-dark">
                <Eyebrow className="px-6 py-5 text-white/45 sm:px-8">{audience.label}</Eyebrow>

                {/*
                  One uniform box for all four cards. The sources range from a
                  1.5 landscape to 0.67 portraits, so `object-cover` fills the
                  frame edge to edge — no letterboxing, and the card's own copy
                  below is never pushed around by a differently shaped image.
                */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: IMAGE_RATIO }}>
                  <Image
                    src={audience.image.src}
                    alt={audience.image.alt}
                    fill
                    sizes="(min-width: 896px) 56rem, 92vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex flex-col items-start gap-4 px-6 py-8 sm:px-8 sm:py-10">
                  <h3 className="max-w-md text-[1.75rem] leading-tight tracking-tight text-balance">
                    {audience.title}
                  </h3>
                  <p className="max-w-lg text-[1.0625rem] leading-relaxed text-white/55 text-pretty">
                    {audience.description}
                  </p>
                  <ButtonLink href="/contact" variant="primary" size="md" className="mt-2">
                    <CommandIcon width={14} height={14} />
                    Request a demo
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

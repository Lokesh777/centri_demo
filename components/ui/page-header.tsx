import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/section";

/**
 * Dark masthead used at the top of every interior page.
 *
 * Keeping it dark on all routes means the fixed header only ever renders white
 * on a dark ground, so it needs no per-route tone switching.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-night pt-36 pb-20 text-white sm:pt-44 sm:pb-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <Eyebrow className="text-white/60">{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-4xl text-headline text-balance">{title}</h1>
        </Reveal>

        {description ? (
          <Reveal delay={160}>
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-white/60 text-pretty">
              {description}
            </p>
          </Reveal>
        ) : null}

        {children}
      </Container>
    </section>
  );
}

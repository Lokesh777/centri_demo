import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container, Eyebrow, Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-sand),transparent_70%)]"
      />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Eyebrow>Error 404</Eyebrow>
        <p className="text-display text-red/25">404</p>
        <h1 className="max-w-2xl text-headline text-balance">
          This page did not reconcile
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-ink/65 text-pretty">
          The link you followed points somewhere that no longer exists. Everything else is exactly
          where you left it.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
            <ArrowRightIcon />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Tell us what broke
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

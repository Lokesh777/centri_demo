import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ChevronsRightIcon, CommandIcon, LabelMarkIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { hero } from "@/content/home";
import { heroImage } from "@/content/media";

/** Rendered width of the hero image — the one knob for how large it runs. */
const HERO_IMAGE_WIDTH = "min(100vw, 64rem)";

/** How far the stats ride up over the image, as a fraction of its width. */
const STATS_OVERLAP = 0.26;

/**
 * The headline sits on the night ground, the image runs beneath it, and
 * `children` (the stats) overlaps the bottom of that image where it fades to
 * white — rather than sitting in a separate band below it.
 *
 * Both the image cap and the overlap derive from `--hero-w`. They must stay in
 * step: the overlap is a share of the image's *width*, and the image's height
 * is a fixed multiple of its width, so a percentage that resolves against
 * anything else (the section, the viewport) drifts as soon as the cap changes.
 */
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-night"
      style={
        {
          "--hero-w": HERO_IMAGE_WIDTH,
          // Held as a custom property rather than an inline margin so the
          // overlap can be applied at a breakpoint by a utility class.
          "--stats-overlap": `calc(var(--hero-w) * -${STATS_OVERLAP})`,
        } as CSSProperties
      }
    >
      {/* Top padding must clear the 80px header, which overlays this section
          rather than sitting above it in flow. */}
      <Container className="relative z-10 flex flex-col items-center pt-28 text-center sm:pt-32">
        <Reveal>
          <Link
            href={hero.banner.href}
            className="label group inline-flex items-center gap-3.5 rounded-card bg-white/8 px-3 py-2 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:bg-white/15 hover:text-white"
          >
            <LabelMarkIcon className="opacity-60" />
            {hero.banner.label}
            <ChevronsRightIcon
              width={15}
              height={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>

        <Reveal delay={90}>
          {/* Sized locally rather than via `text-display`, so the hero headline
              can be tuned without moving the 404 numeral that shares the token. */}
          <h1 className="mt-2 max-w-4xl text-[clamp(2.25rem,5.5vw,3.5rem)] leading-none font-normal tracking-[-0.028em] text-white text-balance">
            {hero.title}
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-96 text-base leading-normal text-white/65 text-pretty">
            {hero.description}
          </p>
        </Reveal>

        <Reveal delay={270}>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.secondaryCta.href} variant="dark" size="md">
              {hero.secondaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.primaryCta.href} variant="primary" size="md">
              <CommandIcon width={15} height={15} />
              {hero.primaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>

      <div className="relative mt-16 sm:mt-20">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          sizes="(min-width: 1024px) 1024px, 100vw"
          priority
          fetchPriority="high"
          className="mx-auto h-auto w-full max-w-(--hero-w)"
        />
        {/*
          Below `sm` the image dissolves into `haze` and the stats band picks
          that same colour up, so the blue runs unbroken behind the figures.
          From `sm` it fades to white instead, because there the stats overlap
          the image rather than following it.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent to-haze sm:via-white/65 sm:via-55% sm:to-white"
        />
      </div>

      {/*
        The overlap is sm-and-up only: below that the stats stack into a tall
        column that would run past the short mobile image onto the section's
        night ground — dark ink on dark navy.

        The band reaches pure white partway down and holds it, rather than
        arriving there only at the final pixel — otherwise the near-white tail
        meets the next section's true white and shows as a hard seam. Below
        `sm` it starts at `haze`, carrying the image blue down behind the
        figures; from `sm` it starts transparent so the image shows through the
        overlap, and reaching white early also covers the night ground at tablet
        widths, where the band can finish below the image.
      */}
      {children ? (
        <div className="relative bg-linear-to-b from-haze via-white via-70% to-white pt-10 pb-20 sm:mt-(--stats-overlap) sm:from-transparent sm:via-60% sm:pt-0 sm:pb-32">
          {children}
        </div>
      ) : null}
    </section>
  );
}

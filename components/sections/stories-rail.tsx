"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Story } from "@/content/stories";

/**
 * Horizontal story rail.
 *
 * Uses native scroll-snap rather than a drag library: it keeps keyboard and
 * trackpad behaviour for free, degrades to a plain scroller without JS, and
 * costs nothing in bundle size. The arrows page by one card width.
 */
export function StoriesRail({ stories }: { stories: readonly Story[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncBounds = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 2);
    setAtEnd(rail.scrollLeft >= maxScroll - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    syncBounds();
    rail.addEventListener("scroll", syncBounds, { passive: true });

    const observer = new ResizeObserver(syncBounds);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", syncBounds);
      observer.disconnect();
    };
  }, [syncBounds]);

  const page = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.clientWidth + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8"
      >
        {stories.map((story) => (
          <li
            key={story.slug}
            className="w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[29vw]"
          >
            <Link
              href={`/customers/${story.slug}`}
              /* `isolate` is load-bearing: it gives the negative-z image a
                 stacking context to sit in. Without it the image escapes and
                 renders behind the section background.

                 `bg-ink` matters too. Contrast tooling ignores background
                 images and gradients, so without a real background-color here
                 the white text is measured against the section's cream and
                 reads as ~1:1. It is also the honest fallback: if the image
                 fails to load, the card stays legible instead of going white
                 on cream. */
              className="group relative isolate flex aspect-4/5 flex-col justify-between overflow-hidden rounded-card bg-ink p-6"
            >
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="(min-width: 1024px) 29vw, (min-width: 640px) 46vw, 80vw"
                className="-z-10 object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-b from-ink/60 via-ink/10 via-45% to-ink/70"
              />

              <div className="flex flex-col gap-1 text-white">
                <p className="text-[2.25rem] leading-none font-normal tracking-tight">
                  {story.metric}
                </p>
                <p className="text-[1.0625rem] text-white/85 text-pretty">{story.metricLabel}</p>
              </div>

              <ul className="flex flex-col items-start gap-2">
                {story.tags.map((tag) => (
                  <li
                    key={tag}
                    className="label rounded-card bg-ink/65 px-3 py-2 text-white backdrop-blur-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      <RailButton side="left" disabled={atStart} onClick={() => page(-1)} />
      <RailButton side="right" disabled={atEnd} onClick={() => page(1)} />
    </div>
  );
}

function RailButton({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous stories" : "Next stories"}
      className={cn(
        "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md transition duration-200 hover:bg-white/40 sm:grid",
        side === "left" ? "left-6" : "right-6",
        disabled && "pointer-events-none opacity-0",
      )}
    >
      <Icon width={20} height={20} />
    </button>
  );
}

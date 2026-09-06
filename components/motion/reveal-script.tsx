"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { observeReveal } from "@/lib/reveal-observer";

/**
 * Mounted once in the root layout. Finds every `.reveal` on the page and hands
 * it to a shared IntersectionObserver.
 *
 * This is the only client code the scroll animations need. `<Reveal>` itself is
 * a server component, so no matter how many appear on a page they add nothing
 * to the hydration payload.
 *
 * Re-runs on navigation because the App Router swaps page content without
 * remounting the layout, so a new route arrives with reveals nobody is watching.
 */
export function RevealScript() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not([data-visible])");
    const cleanups: Array<() => void> = [];

    for (const target of targets) {
      const raw = target.dataset.revealAmount;
      const amount = raw ? Number(raw) : undefined;
      cleanups.push(observeReveal(target, Number.isFinite(amount) ? amount : undefined));
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [pathname]);

  return null;
}

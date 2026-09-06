"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The accessible name is always the final value, so assistive technology never
 * announces the intermediate frames. Reduced-motion collapses the tween to zero
 * duration rather than skipping it, which keeps the code path identical.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Kept deliberately loose, and matched to the surrounding Reveal's viewport
  // settings. A stricter threshold plus a negative root margin meant the
  // count-up could run while the parent Reveal was still at opacity 0, so the
  // figure had already reached its final value by the time it faded in.
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration: shouldReduceMotion ? 0 : 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayed(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {/*
        The final value is exposed as visually-hidden text rather than an
        aria-label: `aria-label` is prohibited on a generic element like a bare
        <span>, and screen readers should never hear the intermediate frames.
      */}
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {displayed}
        {suffix}
      </span>
    </span>
  );
}

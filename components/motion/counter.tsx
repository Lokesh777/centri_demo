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
  // The bottom margin holds the trigger back until the figure is properly
  // inside the viewport, so the count-up reads as a reaction to arriving at
  // the section rather than firing off-screen as its top edge grazes it.
  const inView = useInView(ref, { once: true, amount: 0.6, margin: "0px 0px -12% 0px" });
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
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {displayed}
        {suffix}
      </span>
    </span>
  );
}

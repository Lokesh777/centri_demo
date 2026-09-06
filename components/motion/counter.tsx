"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1700;

const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Hand-rolled on requestAnimationFrame rather than an animation library: it is
 * a single eased tween over one number, which does not justify pulling a
 * runtime into the initial bundle.
 *
 * The final value is exposed as visually-hidden text, so assistive technology
 * reads the real figure and never the intermediate frames. (`aria-label` is
 * prohibited on a generic element like a bare span.)
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
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (prefersReducedMotion()) {
          setDisplayed(value);
          return;
        }

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setDisplayed(Math.round(easeOutQuint(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {displayed}
        {suffix}
      </span>
    </span>
  );
}

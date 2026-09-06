"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/**
 * Content resolves out of a soft blur as it rises into view, rather than only
 * fading. `filter` is animatable through the `domAnimation` feature bundle, so
 * this costs nothing extra in bundle size — but it is kept shallow, since large
 * blur radii are expensive to composite on mobile.
 */
const VARIANTS = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** How much of the element must be visible before it animates. */
  amount?: number;
};

/**
 * Fades and lifts its children in the first time they enter the viewport.
 * Reduced-motion handling comes from `MotionConfig` at the root.
 */
export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  return (
    <m.div
      className={cn(className)}
      variants={VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, ease: EASE_OUT_QUINT, delay: delay / 1000 }}
    >
      {children}
    </m.div>
  );
}

/**
 * Parent that drives a staggered sequence. Pair with `RevealItem` children —
 * the children inherit the animation state rather than each observing scroll.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={cn(className)}
      variants={VARIANTS}
      transition={{ duration: 0.75, ease: EASE_OUT_QUINT }}
    >
      {children}
    </m.div>
  );
}

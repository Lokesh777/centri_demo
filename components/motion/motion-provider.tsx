"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the tree once, at the root.
 *
 * `LazyMotion` with the `domAnimation` feature bundle keeps the animation
 * runtime at roughly a third of the full `motion` import, and `strict` makes
 * the tree-shaken `m.*` components the only option — importing `motion.*`
 * anywhere below this throws rather than silently shipping the full bundle.
 *
 * `reducedMotion="user"` disables transforms and opacity animations for anyone
 * who has asked their OS for reduced motion, so no component needs its own check.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

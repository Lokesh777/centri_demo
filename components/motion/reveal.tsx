"use client";

import {
  Children,
  isValidElement,
  cloneElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { observeReveal } from "@/lib/reveal-observer";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
};

function useRevealOnScroll(amount?: number) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return observeReveal(node, amount);
  }, [amount]);

  return ref;
}

/**
 * Fades, lifts and un-blurs its children the first time they enter view.
 *
 * The animation itself is CSS (`.reveal` in globals.css) — this only flips a
 * `data-visible` attribute via a shared observer. Reduced motion is handled in
 * the stylesheet, so no component needs its own check.
 */
export function Reveal({ children, className, delay = 0, amount }: RevealProps) {
  const ref = useRevealOnScroll(amount);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Staggers its `RevealItem` children by giving each an increasing delay.
 * Each item still reveals on its own intersection, so a group taller than the
 * viewport does not animate its lower half off-screen.
 */
export function RevealGroup({
  children,
  className,
  stagger = 90,
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds between each child. */
  stagger?: number;
}) {
  return (
    <div className={cn(className)}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const element = child as ReactElement<{ delay?: number }>;
        return cloneElement(element, { delay: element.props.delay ?? index * stagger });
      })}
    </div>
  );
}

export function RevealItem({ children, className, delay = 0, amount }: RevealProps) {
  return (
    <Reveal className={className} delay={delay} amount={amount}>
      {children}
    </Reveal>
  );
}

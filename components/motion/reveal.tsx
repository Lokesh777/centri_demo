import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
  /**
   * Play immediately on first paint instead of waiting to be scrolled into
   * view. Use for above-the-fold content: the scroll variant starts at
   * opacity 0 and needs JavaScript to reveal it, which would hold back the
   * largest contentful paint until hydration.
   */
  intro?: boolean;
};

/**
 * Fades, lifts and un-blurs its children the first time they enter view.
 *
 * Deliberately a *server* component. It renders nothing but a class and two
 * data attributes — the animation is CSS (`.reveal` in globals.css), and a
 * single `<RevealScript>` mounted once in the layout does the observing for
 * every instance on the page. Making this a client component instead would add
 * a hydration boundary per element, roughly twenty on the home page, to
 * accomplish setting one attribute.
 */
export function Reveal({ children, className, delay = 0, amount, intro }: RevealProps) {
  return (
    <div
      className={cn(intro ? "reveal-intro" : "reveal", className)}
      data-reveal-amount={intro ? undefined : amount}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Staggers its children by giving each an increasing delay. Each child still
 * reveals on its own intersection, so a group taller than the viewport does not
 * animate its lower half off-screen.
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

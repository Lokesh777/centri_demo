import type { ReactNode } from "react";

import { LabelMarkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

/**
 * Mono eyebrow with the small square bullet the reference design puts ahead of
 * every section label.
 */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("label inline-flex items-center gap-2.5", className)}>
      <LabelMarkIcon className="shrink-0 opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowClassName,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** `dark` = ink type on a light ground; `light` = white type on a dark ground. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center text-center",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={cn(tone === "light" ? "text-white/55" : "text-ink/45", eyebrowClassName)}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <h2 className={cn("text-headline text-balance", centered && "max-w-4xl")}>{title}</h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[1.0625rem] leading-relaxed text-pretty",
            tone === "light" ? "text-white/60" : "text-ink/55",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

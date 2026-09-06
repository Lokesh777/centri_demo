import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "light" | "outline";
type Size = "md" | "lg";

export type ButtonStyleProps = {
  readonly variant?: Variant;
  readonly size?: Size;
};

const BASE =
  "label inline-flex items-center justify-center gap-2.5 rounded-card transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-red-cta text-white hover:bg-red-deep",
  dark: "bg-white/8 text-white backdrop-blur-sm hover:bg-white/16",
  light: "bg-white text-ink hover:bg-cream",
  outline: "border border-ink/15 text-ink hover:border-ink/40",
};

const SIZES: Record<Size, string> = {
  md: "h-12 px-6",
  lg: "h-16 px-8",
};

export function buttonStyles({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ComponentPropsWithoutRef<"button">) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

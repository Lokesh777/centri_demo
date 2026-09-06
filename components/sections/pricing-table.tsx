"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { YEARLY_MONTHS_CHARGED, plans } from "@/content/pricing";
import { cn, formatPrice } from "@/lib/utils";

type Billing = "monthly" | "yearly";

/** Effective monthly price for the selected billing period. */
function monthlyRate(price: number, billing: Billing) {
  return billing === "monthly" ? price : Math.round((price * YEARLY_MONTHS_CHARGED) / 12);
}

export function PricingTable() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="flex flex-col gap-12">
      <BillingToggle value={billing} onChange={setBilling} />

      <div className="grid items-start gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 100} className="h-full">
            <article
              className={cn(
                "flex h-full flex-col gap-7 rounded-card border p-8 sm:p-10",
                plan.featured
                  ? "border-red bg-ink text-white"
                  : "border-ink/10 bg-cream text-ink",
              )}
            >
              <header className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold tracking-tight">{plan.name}</h2>
                  {plan.featured ? (
                    <span className="rounded-full bg-highlight px-2.5 py-1 label text-red">
                      Most chosen
                    </span>
                  ) : null}
                </div>
                <p className={cn("text-sm", plan.featured ? "text-white/65" : "text-ink/65")}>
                  {plan.description}
                </p>
              </header>

              <p className="flex items-baseline gap-1.5">
                {plan.monthlyPrice === null ? (
                  <span className="text-4xl font-bold tracking-tight">Custom</span>
                ) : (
                  <>
                    <span className="text-5xl font-bold tracking-tight tabular-nums">
                      {formatPrice(monthlyRate(plan.monthlyPrice, billing))}
                    </span>
                    <span className={cn("text-sm", plan.featured ? "text-white/65" : "text-ink/65")}>
                      /month
                    </span>
                  </>
                )}
              </p>

              <p
                className={cn(
                  "-mt-5 text-xs",
                  plan.featured ? "text-white/55" : "text-ink/65",
                )}
              >
                {plan.monthlyPrice === null
                  ? "Priced to your entities and volume"
                  : billing === "yearly"
                    ? `Billed annually · ${formatPrice(plan.monthlyPrice * YEARLY_MONTHS_CHARGED)} per year`
                    : "Billed monthly · cancel any time"}
              </p>

              <ButtonLink
                href={plan.cta.href}
                variant={plan.featured ? "light" : "outline"}
                size="lg"
                className="w-full"
              >
                {plan.cta.label}
              </ButtonLink>

              <ul
                className={cn(
                  "flex flex-col gap-3 border-t pt-7",
                  plan.featured ? "border-canvas/15" : "border-ink/10",
                )}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <CheckIcon
                      width={14}
                      height={14}
                      className={cn(
                        "mt-1 shrink-0",
                        plan.featured ? "text-highlight" : "text-red",
                      )}
                    />
                    <span className={plan.featured ? "text-white/85" : "text-ink/75"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (next: Billing) => void;
}) {
  const options: { id: Billing; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly · 2 months free" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="mx-auto inline-flex rounded-full border border-ink/10 bg-cream p-1"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
            value === option.id ? "bg-ink text-white" : "text-ink/65 hover:text-ink",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

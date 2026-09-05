"use client";

import { useId, useState } from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  readonly question: string;
  readonly answer: string;
};

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="border-t border-ink/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={item.question} className="border-b border-ink/10">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-8 py-7 text-left"
              >
                <span className="text-lg tracking-tight text-pretty sm:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-card border transition-colors duration-200",
                    isOpen
                      ? "border-ink bg-ink text-white"
                      : "border-ink/15 text-ink/60 group-hover:border-ink/40",
                  )}
                >
                  <ChevronDownIcon
                    width={16}
                    height={16}
                    className={cn(
                      "transition-transform duration-300 ease-out-quint",
                      isOpen && "rotate-180",
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-out-quint",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 text-[1.0625rem] leading-relaxed text-ink/55 text-pretty">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container, Eyebrow, Section } from "@/components/ui/section";

export function Faq({
  items,
  eyebrow = "Questions = answers",
  title = "Frequent questions.",
  description = "Common answers on how Ballance works, what to expect, and how teams use it to manage spending with confidence.",
}: {
  items: readonly AccordionItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section id="faq" className="bg-cream-2">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Eyebrow className="text-blue">{eyebrow}</Eyebrow>
          <h2 className="max-w-2xl text-headline text-balance">{title}</h2>
          <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink/55 text-pretty">{description}</p>
        </div>

        <Accordion items={items} />
      </Container>
    </Section>
  );
}

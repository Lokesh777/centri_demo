import { Counter } from "@/components/motion/counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/section";
import { stats } from "@/content/home";

/**
 * Renders inside the hero's fade, so it stays transparent and lets the
 * dissolving image show through behind it.
 */
export function Stats() {
  return (
    <Container>
      <RevealGroup className="grid gap-14 sm:grid-cols-3 sm:gap-8">
        {stats.map((stat) => (
          <RevealItem key={stat.label}>
            <div className="flex flex-col items-center gap-5 text-center">
              <p className="text-[clamp(3rem,5vw,3.25rem)] leading-none font-normal tracking-tight text-ink tabular-nums">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="max-w-64 text-[1.0625rem] leading-snug text-ink/60 text-balance">
                {stat.label}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Container>
  );
}

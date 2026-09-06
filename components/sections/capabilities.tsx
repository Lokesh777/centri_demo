import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { capabilities } from "@/content/home";
import { cn } from "@/lib/utils";

export function Capabilities() {
  return (
    <Section id="product" className="bg-white pt-0">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow className="text-blue">Built for modern teams</Eyebrow>
          <h2 className="max-w-3xl text-headline text-balance">What Ballance does</h2>
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink/65 text-pretty">
            Issue cards, set the boundaries once, and watch spending land in real time — without
            adding a process anyone has to be trained on.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <Reveal
              key={capability.id}
              delay={(index % 2) * 90}
              className={cn(capability.wide && "md:col-span-2")}
            >
              <article className="flex h-full flex-col gap-8 rounded-card bg-cream p-8 sm:p-10">
                <Eyebrow className="text-ink/60">{capability.label}</Eyebrow>

                <div
                  className={cn(
                    "relative flex items-center justify-center",
                    capability.wide ? "h-56 sm:h-72" : "h-64 sm:h-80",
                  )}
                >
                  <Image
                    src={capability.image.src}
                    alt={capability.image.alt}
                    width={capability.image.width}
                    height={capability.image.height}
                    sizes="(min-width: 768px) 40vw, 85vw"
                    className="h-full w-auto object-contain mix-blend-multiply"
                  />
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <h3 className="text-title text-balance">{capability.title}</h3>
                  <p className="max-w-xl leading-relaxed text-ink/65 text-pretty">
                    {capability.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

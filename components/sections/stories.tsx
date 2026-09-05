import { Reveal } from "@/components/motion/reveal";
import { StoriesRail } from "@/components/sections/stories-rail";
import { StarRating } from "@/components/ui/star-rating";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { featuredQuote, stories } from "@/content/stories";

export function Stories() {
  return (
    <Section className="bg-cream-2">
      <div className="flex flex-col gap-14">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Eyebrow className="text-red">Real messages · Real feedback</Eyebrow>
          <h2 className="max-w-3xl text-headline text-balance">What they say about Ballance</h2>
        </Container>

        <StoriesRail stories={stories} />

        <Container>
          <Reveal>
            <figure className="mx-auto flex max-w-4xl flex-col items-center gap-8 pt-10 text-center">
              <StarRating className="text-ink/25" />
              <blockquote className="text-[clamp(1.5rem,2.2vw,2.125rem)] leading-tight tracking-tight text-balance">
                “{featuredQuote.text}”
              </blockquote>
              <figcaption className="label text-ink/45">
                {featuredQuote.author} · {featuredQuote.role}, {featuredQuote.company}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

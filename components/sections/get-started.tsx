import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/section";
import { getStarted } from "@/content/home";
import { doodles, getStartedBackground } from "@/content/media";

export function GetStarted() {
  return (
    <>
      <section className="bg-cream-2 px-0 pb-16 sm:px-0">
        <div className="relative isolate mx-auto flex min-h-[32rem] max-w-[110rem] items-center justify-center overflow-hidden rounded-card py-24 sm:min-h-[38rem]">
          <Image
            src={getStartedBackground.src}
            alt=""
            fill
            sizes="100vw"
            aria-hidden
            className="-z-10 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/55" />

          <Container className="flex flex-col items-center gap-7 text-center text-white">
            <Reveal>
              <h2 className="max-w-3xl text-headline text-balance">{getStarted.title}</h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-white/70 text-pretty">
                {getStarted.description}
              </p>
            </Reveal>

            <Reveal delay={180} className="w-full">
              {/*
                A plain GET form: it hands the address to /contact as a query
                param and prefills the real enquiry form there. No client JS,
                and it still works before hydration.
              */}
              <form
                action="/contact"
                method="get"
                className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-card border border-white/25 sm:flex-row"
              >
                <label htmlFor="get-started-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="get-started-email"
                  name="email"
                  type="email"
                  required
                  placeholder={getStarted.placeholder}
                  className="min-w-0 flex-1 bg-ink/35 px-5 py-4 text-white backdrop-blur-sm placeholder:text-white/55 focus:outline-none"
                />
                <button
                  type="submit"
                  className="label bg-white px-7 py-4 text-ink transition-colors duration-200 hover:bg-cream"
                >
                  {getStarted.cta}
                </button>
              </form>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* Decorative strip that separates the CTA from the footer. */}
      <div className="bg-cream-2 pb-1">
        <Image
          src={doodles.divider.src}
          alt=""
          width={doodles.divider.width}
          height={doodles.divider.height}
          sizes="100vw"
          aria-hidden
          className="h-auto w-full mix-blend-multiply"
        />
      </div>
    </>
  );
}

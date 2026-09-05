import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { footerBackground } from "@/content/media";
import { navGroups, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      {/* Full-strength photograph. Legibility comes from the wash and the
          translucent link panel rather than from dimming the image itself. */}
      <Image
        src={footerBackground.src}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/35" />

      {/* Stacked, not side by side: wordmark at the top, credit pushed down by
          `mt-auto`, and the link panel spanning the full width at the foot. The
          min-height gives the photograph room to read as an image rather than
          a texture. */}
      <Container className="flex min-h-136 flex-col py-12 sm:min-h-160">
        <Link
          href="/"
          className="flex w-fit items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <Logo className="size-7" />
          <span className="text-[1.6rem] leading-none font-normal tracking-tight lowercase">
            {site.wordmark}
          </span>
        </Link>

        <p className="mt-6 max-w-64 text-[1.6rem] leading-tight tracking-tight text-balance">
          {site.footerTagline}
        </p>

        <p className="label mt-auto pt-24 text-white/60">A design study, built with Next.js</p>

        {/* Stacked on mobile, so the groups need horizontal rules there and
            vertical ones once they sit side by side. */}
        <div className="mt-8 grid divide-y divide-white/12 border-t border-white/15 bg-ink/25 backdrop-blur-[2px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {navGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-5 p-7">
              <h2 className="label text-white">{group.title}</h2>
              <ul className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <li key={link.href} className="flex flex-wrap items-center gap-2.5">
                    <Link
                      href={link.href}
                      className="text-[1.1875rem] text-white/85 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                    {link.badge ? (
                      <span className="label rounded-card bg-white/15 px-2.5 py-1.5 text-white/75">
                        {link.badge}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </footer>
  );
}

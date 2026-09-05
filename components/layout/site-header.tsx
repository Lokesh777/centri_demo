"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ArrowUpRightIcon, CloseGlyphIcon, Logo, MenuGlyphIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { featuredPosts } from "@/content/posts";
import { navGroups, site } from "@/content/site";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation. Adjusting state during render is React's
  // recommended alternative to a navigation effect.
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Captured on open so focus returns to the element that opened the menu.
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      {/*
        Absolute, not fixed: the bar sits over the dark masthead every page
        opens with and scrolls away with the content. Positioning is relative
        to <body>, which carries `relative` for this.
      */}
      <header className="absolute inset-x-0 top-0 z-50">
        <Container className="flex h-20 items-center justify-between gap-6 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white"
            aria-label={`${site.name} home`}
          >
            <Logo className="size-7" />
            <span className="text-[1.6rem] leading-none font-normal tracking-tight lowercase">{site.wordmark}</span>
          </Link>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="label flex h-12 items-center gap-3 rounded-card bg-white/10 px-6 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          >
            <MenuGlyphIcon width={15} height={15} />
            Menu
          </button>
        </Container>
      </header>

      <AnimatePresence>{open ? <MenuOverlay onClose={() => setOpen(false)} /> : null}</AnimatePresence>
    </>
  );
}

function MenuOverlay({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-60 overflow-y-auto bg-night"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
    >
      <Container className="flex min-h-dvh flex-col py-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-white" aria-label={`${site.name} home`}>
            <Logo className="size-7" />
            <span className="text-[1.6rem] leading-none font-normal tracking-tight lowercase">{site.wordmark}</span>
          </Link>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="label flex h-12 items-center gap-3 rounded-card bg-white/10 px-6 text-white transition-colors duration-200 hover:bg-white/20"
          >
            <CloseGlyphIcon width={15} height={15} />
            Close
          </button>
        </div>

        <m.nav
          aria-label="Menu"
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.06, delayChildren: 0.08 }}
        >
          {navGroups.map((group) => (
            <MenuColumn key={group.title} title={group.title} links={group.links} />
          ))}
        </m.nav>

        <m.div
          className="mt-auto grid gap-5 pt-16 sm:grid-cols-2 lg:max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUINT, delay: 0.28 }}
        >
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-4/3 overflow-hidden rounded-card">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(min-width: 640px) 20rem, 90vw"
                  className="object-cover transition-transform duration-500 ease-out-quint group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl leading-tight font-normal tracking-tight text-white text-balance">
                    {post.title}
                  </h3>
                  <p className="label text-white/40">{post.category}</p>
                </div>
                <ArrowUpRightIcon className="mt-1 shrink-0 text-white/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </m.div>
      </Container>
    </m.div>
  );
}

function MenuColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; badge?: string }[];
}) {
  return (
    <m.div
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, ease: EASE_OUT_QUINT }}
      className="flex flex-col gap-6"
    >
      <h2 className="label text-white/35">{title}</h2>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href} className="flex items-center gap-3">
            <Link
              href={link.href}
              className="text-[1.6rem] font-normal tracking-tight text-white/85 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
            {link.badge ? (
              <span className="label rounded-card bg-white/10 px-2 py-1.5 text-white/70">
                {link.badge}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </m.div>
  );
}

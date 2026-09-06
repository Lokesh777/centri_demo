"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { ArrowUpRightIcon, CloseGlyphIcon, Logo } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { featuredPosts } from "@/content/posts";
import { navGroups, site } from "@/content/site";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/**
 * The full-screen menu, and the only part of the site that still uses `motion`.
 *
 * It lives in its own module so the header can import it lazily: the animation
 * runtime is roughly 60 KB gzipped, and nothing needs it until someone actually
 * opens the menu. Scroll reveals and the stat counters run on CSS and rAF
 * instead, which keeps that cost off the initial page load entirely.
 *
 * `motion` earns its place here specifically for the exit animation — a
 * component being removed from the tree cannot be transitioned out with CSS
 * alone without hand-rolling the unmount delay.
 */
export function MenuPortal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>{open ? <MenuOverlay onClose={onClose} /> : null}</AnimatePresence>
      </LazyMotion>
    </MotionConfig>
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
              <Link
                href="/"
                className="flex items-center gap-2.5 text-white"
                aria-label={`${site.name} home`}
              >
                <Logo className="size-7" />
                <span className="text-[1.6rem] leading-none font-normal tracking-tight lowercase">
                  {site.wordmark}
                </span>
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
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-card bg-ink">
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
                      <p className="label text-white/60">{post.category}</p>
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
      <h2 className="label text-white/60">{title}</h2>
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

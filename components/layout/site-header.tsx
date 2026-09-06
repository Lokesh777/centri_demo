"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo, MenuGlyphIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { site } from "@/content/site";

/**
 * Loaded on demand. The overlay is the only part of the site that still needs
 * the animation runtime (~60 KB gzipped), and nobody needs it until they open
 * the menu — so it stays out of the initial bundle. `ssr: false` because a
 * closed dialog has nothing worth rendering on the server.
 *
 * Note this header imports nothing from `motion` itself, not even
 * `AnimatePresence`: that would pull the runtime back into the initial chunk
 * and undo the split. The portal owns it instead.
 */
const MenuPortal = dynamic(
  () => import("@/components/layout/menu-overlay").then((mod) => mod.MenuPortal),
  { ssr: false },
);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  // Latches on first open and stays mounted, so AnimatePresence inside the
  // portal has something to animate *out* when the menu closes.
  const [portalLoaded, setPortalLoaded] = useState(false);
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

  const openMenu = () => {
    setPortalLoaded(true);
    setOpen(true);
  };

  return (
    <>
      {/*
        Absolute, not fixed: the bar sits over the dark masthead every page
        opens with and scrolls away with the content. Positioning is relative
        to <body>, which carries `relative` for this.
      */}
      <header className="absolute inset-x-0 top-0 z-50">
        <Container className="flex h-20 items-center justify-between gap-6">
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
            ref={triggerRef}
            type="button"
            onClick={openMenu}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="label flex h-12 items-center gap-3 rounded-card bg-white/10 px-6 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          >
            <MenuGlyphIcon width={15} height={15} />
            Menu
          </button>
        </Container>
      </header>

      {portalLoaded ? <MenuPortal open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

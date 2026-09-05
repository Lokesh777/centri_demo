import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5 6.2 12 13 4.5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.5 8 10.5l4-4" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 3.5 5 8l4.5 4.5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5 11 8l-4.5 4.5" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 11 11 5M5.5 5H11v5.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 8H3M7 4 3 8l4 4" />
    </svg>
  );
}

export function ChevronsRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4.5 6.5 8 3 11.5M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

/** The ⌘-style glyph the reference design uses inside its buttons. */
export function CommandIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.2} {...props}>
      <path d="M5.5 4.5a1.5 1.5 0 1 0-1.5 1.5h8a1.5 1.5 0 1 0-1.5-1.5v7a1.5 1.5 0 1 0 1.5-1.5H4a1.5 1.5 0 1 0 1.5 1.5v-7Z" />
    </svg>
  );
}

export function MenuGlyphIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="4.5" cy="4.5" r="1.6" />
      <circle cx="11.5" cy="4.5" r="1.6" />
      <circle cx="4.5" cy="11.5" r="1.6" />
      <circle cx="11.5" cy="11.5" r="1.6" />
    </svg>
  );
}

export function CloseGlyphIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** Small square bullet used ahead of every mono eyebrow label. */
export function LabelMarkIcon(props: IconProps) {
  return (
    <svg {...base} width={10} height={10} viewBox="0 0 10 10" strokeWidth={1.2} {...props}>
      <rect x="1" y="1" width="8" height="8" />
    </svg>
  );
}

/** Brand mark — an eight-point asterisk burst. */
export function Logo({ className }: { className?: string }) {
  const spokes = Array.from({ length: 8 }, (_, index) => index * 45);

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      {spokes.map((angle) => (
        <ellipse
          key={angle}
          cx="12"
          cy="6.1"
          rx="2.15"
          ry="5.4"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

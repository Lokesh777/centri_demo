/**
 * Every remote image used by the site, in one place.
 *
 * These are hosted on Framer's CDN. Point them at your own storage before this
 * goes anywhere public — hotlinking a third party's CDN is neither reliable nor
 * licensed to you. `next.config.ts` allowlists the host.
 */
const cdn = "https://framerusercontent.com/images";

export type RemoteImage = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
};

export const heroImage: RemoteImage = {
  src: `${cdn}/9r5XmI1lXI9KcCeKmM5JkMYgZB8.png?scale-down-to=2048&width=1920&height=2107`,
  width: 1920,
  height: 2107,
  alt: "A person holding a metal Travel Élite payment card against a deep blue backdrop",
};

export const doodles = {
  individuals: {
    src: `${cdn}/GbwK5Grd5cWLJuDTgALWacTt5Cs.png?width=439&height=560`,
    width: 439,
    height: 560,
    alt: "Line drawing of a person juggling a laptop, a phone and a cup of coffee",
  },
  growingTeams: {
    src: `${cdn}/pmxeD64hHKa0fiWWoqiFzgw8SQ.png?width=394&height=560`,
    width: 394,
    height: 560,
    alt: "Line drawing of a person riding a paper plane trailing lightning bolts",
  },
  financeOps: {
    src: `${cdn}/AzgtOBiCfs2fkWOrNdrTl5JCWI.png?scale-down-to=1024&width=1161&height=987`,
    width: 1161,
    height: 987,
    alt: "Line drawing of a person fitting two puzzle pieces together",
  },
  divider: {
    src: `${cdn}/odyimKNrsooSNvoVaMQ5uPkE.png?width=2202&height=200`,
    width: 2202,
    height: 200,
    alt: "",
  },
} as const satisfies Record<string, RemoteImage>;

export const audienceImages = {
  finance: {
    src: `${cdn}/HTHMXqJ1BOJIT1QD7yRnwyb2OU.jpg?scale-down-to=1024&width=6123&height=4082`,
    width: 6123,
    height: 4082,
    alt: "A finance lead reviewing figures in a bright meeting room",
  },
  operations: {
    src: `${cdn}/APsKWMFyzkyFhEt2kObMZZeXE.jpg?scale-down-to=2048&width=5371&height=8049`,
    width: 5371,
    height: 8049,
    alt: "An operations manager working at a desk in a white studio",
  },
  growing: {
    src: `${cdn}/09BK1jpZOxyhFZuSjrk2CActDI.jpg?scale-down-to=2048&width=4085&height=5951`,
    width: 4085,
    height: 5951,
    alt: "A modern office tower photographed from street level",
  },
  founders: {
    src: `${cdn}/X5HQFA0qBC5uRsXoTi1bElG9kqY.jpg?scale-down-to=2048&width=4480&height=6720`,
    width: 4480,
    height: 6720,
    alt: "A studio owner standing behind her workbench",
  },
} as const satisfies Record<string, RemoteImage>;

export const storyImages = {
  legal: {
    src: `${cdn}/5TuC8dag5g29D54MoXnUDLODdm4.jpg?scale-down-to=2048&width=5184&height=3456`,
    width: 5184,
    height: 3456,
    alt: "A law library with a gavel resting on the desk",
  },
  healthcare: {
    src: `${cdn}/OnT1fUCQdan90tc3Balfx9F7RI.jpg?scale-down-to=4096&width=6000&height=9000`,
    width: 6000,
    height: 9000,
    alt: "A glass hospital facade reflecting the sky",
  },
  nonprofit: {
    src: `${cdn}/M3wrjjnomDYAHi0wywZoTjWMnQ.jpg?scale-down-to=4096&width=3822&height=5733`,
    width: 3822,
    height: 5733,
    alt: "Volunteers sorting donations into boxes",
  },
  retail: {
    src: `${cdn}/oqA68SOIN1OMB9qd6EZcTZ7GE.jpg?width=2624&height=3936`,
    width: 2624,
    height: 3936,
    alt: "A dancer lit in deep red, arms framed overhead",
  },
} as const satisfies Record<string, RemoteImage>;

export const getStartedBackground: RemoteImage = {
  src: `${cdn}/TrMHO9PGoKcWAJ6ro7k5fsO06U.jpg?scale-down-to=2048&width=2600&height=1733`,
  width: 2600,
  height: 1733,
  alt: "",
};

export const footerBackground: RemoteImage = {
  src: `${cdn}/LO6cf7PuUSbAsswhNPsu0IvAM.jpg?scale-down-to=2048&width=4000&height=3000`,
  width: 4000,
  height: 3000,
  alt: "",
};

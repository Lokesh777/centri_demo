import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Imagery is served from Framer's CDN. Every URL lives in `content/media.ts`,
    // so swapping to self-hosted assets is a one-file change.
    remotePatterns: [{ protocol: "https", hostname: "framerusercontent.com", pathname: "/images/**" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

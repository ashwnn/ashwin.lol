import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      {
        source: "/b/:slug*",
        destination: "/blog/:slug*",
        permanent: true
      },
      {
        source: "/socials/github/:slug*",
        destination: "https://github.com/ashwnn/:slug*",
        permanent: true
      },
      {
        source: "/socials/linkedin",
        destination: "https://linkedin.com/ax2",
        permanent: true
      },
      {
        source: "/socials/signal",
        destination: "https://signal.me/#eu/Q3RPuNH-LFhJjNF8wqfIh4opnlSimz_KbvNpjk3Mt6humpwcOzFIxJm-tk3GVuIU",
        permanent: true
      },
      {
        source: "/pgp",
        destination: "https://keys.openpgp.org/search?q=ashwincharath%40gmail.com",
        permanent: true
      }
    ]
  },
};

export default nextConfig;

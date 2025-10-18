import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bepo.ca',
        port: '',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images in public folder for 1 year
        source: '/:path*.{jpg,jpeg,png,gif,webp,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts for 1 year
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache Next.js static files for 1 year
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache API routes with shorter duration
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ];
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
        destination: "https://www.linkedin.com/in/ax2/",
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

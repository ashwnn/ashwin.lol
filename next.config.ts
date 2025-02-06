import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pb.bepo.ca', '1m.cx']
},
  async redirects() {
    return [
      {
        "source": "/b/:slug*",
        "destination": "/blog/:slug*",
        "permanent": true
    }
    ]
  },
};

export default nextConfig;

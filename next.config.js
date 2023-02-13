/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.scdn.co', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/qr',
        destination: '/?from=qr',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig

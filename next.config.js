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
      {
        source: '/roadmap',
        destination: 'https://19x.notion.site/adb0c3c077ee46d7a22fe0cc357132c7?v=8760973cae554b94b4e54e848ca37917',
        permanent: true,
      },
      {
        source: '/p/:slug',
        destination: 'https://dev.a7.wtf/projects/:slug',
        permanent: true,
      },
      {
        source: '/b/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig

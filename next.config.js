/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'i.scdn.co',            // spotify
            'images.unsplash.com'   // unsplash
        ]
    },
    async redirects() {
        return [
            {
                "source": "/in",
                "destination": "https://www.linkedin.com/in/ax2/",
                "permanent": true
            },
            {
                "source": "/b/:slug*",
                "destination": "/blog/:slug*",
                "permanent": true
            }
        ]
    }
}

module.exports = nextConfig

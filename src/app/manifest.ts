import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Ashwin Charathsandran',
        short_name: 'Ashwin',
        description: 'Personal website of Ashwin Charathsandran',
        start_url: '/',
        display: 'standalone',
        background_color: '#222222',
        theme_color: '#222222',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}

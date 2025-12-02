import { MetadataRoute } from 'next'
import { getLocalPosts } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getLocalPosts()
    const baseUrl = 'https://ashwin.lol'

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const routes = [
        '',
        '/about',
        '/blog',
        '/projects',
        '/snippets',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes, ...blogPosts]
}

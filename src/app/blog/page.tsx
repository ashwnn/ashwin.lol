import { BlogPostConfig } from "@/types";
import BlogPageClient from "./BlogPageClient";

// Enable ISR with revalidation every 30 minutes (1800 seconds)
// Blog list page revalidates more frequently to show new posts faster
export const revalidate = 1800;

export const metadata = {
  title: 'Blog - Ashwin C.',
  description: 'Collection of my thoughts and experiences.',
  openGraph: {
    images: [
      {
        url: '/memoji-wide.png',
        width: 2000,
        height: 1000,
        alt: 'Ashwin Charathsandran',
      },
    ],
  },
};

import { getLocalPosts } from "@/lib/blog";

export default async function BlogIndex() {
  const posts = await getLocalPosts();

  return <BlogPageClient initialPosts={posts} />;
}
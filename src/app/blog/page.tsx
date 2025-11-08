import fs from "fs/promises";
import path from "path";
import { BlogPostConfig } from "@/types";
import matter from "gray-matter";
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

async function getLocalPosts(): Promise<BlogPostConfig[]> {
  const postsDir = path.join(process.cwd(), "src/data/blog");
  const files = await fs.readdir(postsDir);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title,
          description: data.description,
          date: data.date,
          author: data.author,
          cover_image: data.cover_image,
          tags: data.tags,
          content: content,
          published_date: data.published_date || data.date
        } as BlogPostConfig;
      })
  );

  // Sort by newest first by default
  return posts.sort((a, b) => {
    const dateA = new Date(a.published_date).getTime();
    const dateB = new Date(b.published_date).getTime();
    return dateB - dateA;
  });
}

export default async function BlogIndex() {
  const posts = await getLocalPosts();

  return <BlogPageClient initialPosts={posts} />;
}
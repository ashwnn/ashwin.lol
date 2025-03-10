import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostContent from "@/components/Blog/BlogPost";

interface PostData {
  title: string;
  description: string;
  date: string;
  author: string;
  cover_image: string;
  tags?: string;
  content: string;
}

async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const postFilePath = path.join(process.cwd(), "src/data/blog", `${slug}.md`);
    const fileContent = await fs.readFile(postFilePath, "utf8");
    const { data, content } = matter(fileContent, { excerpt: true });
    return { ...data, content } as PostData;
  } catch (error) {
    console.error("Failed to load post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Make sure params is fully resolved
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [
        {
          url: post.cover_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Make sure params is fully resolved
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tags = post.tags ? post.tags.split(",").map((tag) => tag.trim()) : [];

  // Pass all the data to the client component
  return <PostContent post={post} formattedDate={formattedDate} tags={tags} />;
}
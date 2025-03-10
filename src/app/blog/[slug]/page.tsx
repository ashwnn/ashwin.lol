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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tags = post.tags ? post.tags.split(",").map((tag) => tag.trim()) : [];

  return <PostContent post={post} formattedDate={formattedDate} tags={tags} />;
}
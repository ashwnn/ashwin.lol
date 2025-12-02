import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPost from "@/components/blog/BlogPost";
import type { PostDataConfig, BlogPageParams } from '@/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import MDXComponents from "@/components/mdx/MDXComponents";

// Enable ISR with revalidation every 1 hour (3600 seconds)
// This allows the page to be statically generated and revalidated periodically
export const revalidate = 3600;

async function getPostBySlug(slug: string): Promise<PostDataConfig | null> {
  try {
    // Try .mdx first, then .md (for backward compatibility if needed, though we renamed them)
    let postFilePath = path.join(process.cwd(), "src/data/blog", `${slug}.mdx`);

    try {
      await fs.access(postFilePath);
    } catch {
      postFilePath = path.join(process.cwd(), "src/data/blog", `${slug}.md`);
    }

    const fileContent = await fs.readFile(postFilePath, "utf8");
    const { data, content } = matter(fileContent, { excerpt: true });
    return { ...data, content } as PostDataConfig;
  } catch (error) {
    console.error("Failed to load post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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

export default async function Page({ params }: BlogPageParams) {
  const { slug } = await params;
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

  const options = {
    theme: 'github-dark',
    keepBackground: true,
  };

  return (
    <BlogPost post={post} formattedDate={formattedDate} tags={tags}>
      <MDXRemote
        source={post.content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypePrettyCode, options]
            ],
          },
        }}
      />
    </BlogPost>
  );
}
import Image from "next/image";
import styles from "@/styles/markdown.module.css";
import BlogPostLayout from "@/components/blog/PostLayout";
import BackToTop from "@/components/blog/BackToTop";
import Link from "next/link";
import type { PostDataConfig } from '@/types';

interface BlogPostProps {
  post: PostDataConfig;
  formattedDate: string;
  tags: string[];
  children: React.ReactNode;
}

export default function BlogPost({ post, formattedDate, tags, children }: BlogPostProps) {
  return (
    <BlogPostLayout>
      <Link
        href="/blog"
        className="group flex items-center px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-all duration-200 shadow-sm shadow-black/20 border border-neutral-700/30 w-fit"
      >
        <svg
          className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to articles</span>
      </Link>
      <article className="mt-6">
        <h1 className="text-3xl font-bold shine">{post.title}</h1>
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-400 text-sm">
          <span>{formattedDate} by {post.author}</span>
          {tags && tags.length > 0 && (
            <span className="mt-2 sm:mt-0">{tags.join(" • ")}</span>
          )}
        </div>
        <div className="mb-6 max-h-[400px] overflow-hidden rounded-md">
          <div
            className="relative group"
          >
            <Image
              src={post.cover_image}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-[400px] object-cover"
              priority
            />
          </div>
        </div>
        <div className={`prose prose-invert max-w-none ${styles.markdown_body}`}>
          {children}
        </div>
      </article>
      <BackToTop />
    </BlogPostLayout>
  );
}
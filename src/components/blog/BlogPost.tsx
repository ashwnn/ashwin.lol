"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import powershell from 'react-syntax-highlighter/dist/cjs/languages/prism/powershell';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from "@/styles/markdown.module.css";
import BlogPostLayout from "@/components/blog/PostLayout";
import BackToTop from "@/components/blog/BackToTop";
import Link from "next/link";
import type { PostDataConfig } from '@/types';
import ModernImageModal from "./ModernImageModal";

// Define plugins outside component to prevent hydration mismatches due to reference changes
const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeSlug];

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('ps1', powershell);

interface BlogPostProps {
  post: PostDataConfig;
  formattedDate: string;
  tags: string[];
}

export default function BlogPost({ post, formattedDate, tags }: BlogPostProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  const openImageModal = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

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
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            className={styles.markdown_body}
            remarkPlugins={REMARK_PLUGINS}
            rehypePlugins={REHYPE_PLUGINS}
            components={{
              code: ({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';

                return !inline && language ? (
                  <SyntaxHighlighter
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    style={vscDarkPlus as any}
                    language={language}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img: ({ src, alt, ...props }) => {
                if (!src) return null;

                return (
                  <span className="my-6 relative group inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={alt || ""}
                      {...props}
                      className="w-full rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(src, alt || "")}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                    <span className="absolute bottom-3 right-3 mb-8 bg-black/70 text-white px-2 py-1 rounded text-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to zoom
                    </span>
                  </span>
                );
              },
              a: ({ href, children }) => {
                if (!href) return <>{children}</>;
                return (
                  <Link href={href} className="text-blue-500">
                    {children}
                  </Link>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <BackToTop />

      {/* Image Modal */}
      {isImageModalOpen && modalImageSrc && (
        <ModernImageModal
          src={modalImageSrc}
          alt={modalImageAlt}
          onClose={closeImageModal}
        />
      )}
    </BlogPostLayout>
  );
}
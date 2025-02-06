import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
// import remarkRehype from "remark-rehype";
// import rehypeStringify from "rehype-stringify";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import powershell from 'react-syntax-highlighter/dist/cjs/languages/prism/powershell'
// import github from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from "@/components/Link";
import ReactMarkdown from "react-markdown";
import styles from "@/page.module.css"


SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('sh', bash)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('ps1', powershell)

// const MDObjects = {
//   code: ({ node, inline, className, children, ...props }: { node: any, inline: boolean, className: string, children: React.ReactNode }) => {
//     const match = /language-(\w+)/.exec(className || '');
//     const supportedLanguages = ['tsx', 'ts', 'sh', 'json', 'ps1'];

//     return !inline && match && supportedLanguages.includes(match[1]) ? (
//       <SyntaxHighlighter style={github} language={match[1]} PreTag="div" {...props}>
//         {String(children).replace(/\n$/, '')}
//       </SyntaxHighlighter>
//     ) : (
//       <code className={className} {...props} />
//     );
//   }
// };

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
    const postFilePath = path.join(process.cwd(), "data", `${slug}.md`);
    const fileContent = await fs.readFile(postFilePath, "utf8");
    const { data, content } = matter(fileContent, { excerpt: true });
    return { ...data, content } as PostData;
  } catch (error) {
    console.error("Failed to load post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tags = post.tags ? post.tags.split(",").map((tag: string) => tag.trim()) : [];

  // const file = await unified()
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .use(remarkRehype)
  //   .use(rehypeStringify)
  //   .process(post.content);
  // const html = String(file);

  return (
    <div className="px-3 w-full max-w-screen-xl mx-auto">
      <Link
        href={`/blog`}
        className="flex items-center mt-2 text-md font-medium text-gray-100 opacity-70 hover:text-gray-400 transition-colors duration-200"
        passHref
      >
        <svg
          className="inline mr-2"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"
          ></path>
        </svg>
        <span>All Blog Posts</span>
      </Link>
      <article className="mt-6">
        <h1 className="text-3xl font-bold shine">{post.title}</h1>
        <div className="mb-4 flex justify-between items-center text-gray-400 text-sm">
          <span>{formattedDate} by {post.author}</span>
          <span>{tags.join(" • ")}</span>
        </div>
        <div className="mb-6 max-h-[400px] overflow-hidden rounded-md">
          <Image
            alt={post.title}
            src={post.cover_image}
            width={1200}
            height={630}
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div
          className="prose prose-invert max-w-none"
        // dangerouslySetInnerHTML={{ __html: html }}
        >
          <ReactMarkdown className={styles.markdown_body} remarkPlugins={[remarkGfm]} components={{
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", marginTop: "2rem", marginBottom: "2rem" }}
              />
            ),
            a: ({ href, children }) => (
              href && href.startsWith("/") ? (
                <Link
                  href={href}
                  className="text-blue-500"
                  passHref
                >
                  {children}
                </Link>
              ) : (
                <a
                  href={href}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              )
            )
          }}>
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="pb-60"></div>
      </article>
    </div>
  );
}
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import styles from "../../styles/md.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import remarkGfm from 'remark-gfm'
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
// import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
// import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
// import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
// import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
// import powershell from 'react-syntax-highlighter/dist/cjs/languages/prism/powershell'
// import github from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Head from "next/head";

// SyntaxHighlighter.registerLanguage('tsx', tsx)
// SyntaxHighlighter.registerLanguage('ts', typescript)
// SyntaxHighlighter.registerLanguage('sh', bash)
// SyntaxHighlighter.registerLanguage('json', json)
// SyntaxHighlighter.registerLanguage('ps1', powershell)

// const MDObjects: object = {
//   code: ({ node, inline, className, children, ...props }: any) => {
//     const match = /language-(\w+)/.exec(className || '')
//     return !inline && match ? (
//       <SyntaxHighlighter style={github} language={match[1]} PreTag="div" {...props} >
//         {String(children).replace(/\n$/, '')}
//       </SyntaxHighlighter>
//     ) : (
//       <code className={className} {...props} />
//     )
//   }
// }

function Blog({ post }: any) {
  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      img.setAttribute("loading", "lazy");

      if (img === imgs[0]) {
        return;
      }
      const link = document.createElement("a");
      link.href = img.src;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      img.parentNode!.insertBefore(link, img);
      link.appendChild(img);

    });
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      if (link.host !== window.location.host) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }

      if (link.href.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        if (link.querySelector("img") !== null) {
          return;
        }
        link.addEventListener("mouseover", (event) => {
          const modal = document.createElement("div");
          modal.style.position = "absolute";
          modal.style.top = `${link.offsetTop - link.offsetHeight}px`;
          modal.style.left = `${link.offsetLeft + link.offsetWidth / 2}px`;
          modal.style.transform = "translate(-50%, -100%)";
          modal.style.backgroundColor = "rgba(255, 255, 255, 1)";
          modal.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
          modal.style.padding = "15px";
          modal.style.borderRadius = "5px";
          modal.style.zIndex = "999";

          const image = document.createElement("img");
          image.src = link.href;
          image.style.display = "block";
          image.style.margin = "auto";
          image.style.maxHeight = "200px";
          image.style.borderRadius = "5px";

          modal.appendChild(image);
          document.body.appendChild(modal);
        });

        link.addEventListener("mouseout", (event) => {
          const modal: any = document.querySelector("div[style*='position: absolute']");
          document.body.removeChild(modal);
        });
      }
    });
  }, []);

  return (
    <Layout title={post.meta.title}>
      <Head>
        <meta name="description" content={post.meta.description} />
        <meta name="keywords" content={post.meta.tags} />
        <meta name="author" content={post.meta.author} />
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:description" content={post.meta.description} />
        <meta property="og:image" content={post.meta.cover_image} />
        <meta property="og:url" content={`https://ashwin.lol/blog/${post.meta.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta.title} />
        <meta name="twitter:description" content={post.meta.description} />
        <meta name="twitter:image" content={post.meta.cover_image} />
      </Head>
      <Container>
        <div className="max-w-4xl px-6 mx-auto mt-10">
          <Link href="/blog" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
            <p className="inline-block ml-2">All Posts</p>
          </Link>
          <div>
            <div
              className="relative mx-auto bg-cover bg-center shadow-md h-[200px] md:h-[350px] w-full my-4"
            >
              <Image
                alt={post.meta.title}
                src={post.meta.cover_image}
                quality={100}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
                className="rounded-3xl"
              />
            </div>
            <div className="flex flex-wrap mt-4 mb-2 gap-x-4">
              {post.meta.tags.map((tag: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 mb-2 text-lg font-medium text-white lowercase rounded-lg bg-zinc-600 space"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-2 text-3xl leading-snug shine">
              <b className="font-semibold">
                <span>{post.meta.title}</span>
              </b>
            </h1>
            <div className="flex items-center mb-5 space-x-2">
              <span>
                <Icon
                  icon="ic:outline-date-range"
                  width="20"
                  className="inline-block mb-1.5 mr-1"
                />
                {new Date(post.meta.date).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <hr className="my-5" />
          </div>
          <ReactMarkdown className={styles.markdown_body} remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const file = fs.readdirSync(path.join(process.cwd(), "data/posts"));

  return {
    paths: file.map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), "data/posts", slug + ".md"),
    "utf-8"
  );
  const { data: meta, content } = matter(markdownWithMeta);

  const post = {
    slug,
    meta,
    content,
  };

  return {
    props: {
      post: post,
    },
  };
}

export default Blog;

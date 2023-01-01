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
import rehypeRaw from "rehype-raw"

function Blog({ post }: any) {
  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      img.classList.add("w-full");
      img.classList.add("md:w-[300px]");
    });
  }, []);

  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-10">
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
                  className="px-3 py-1 mb-2 text-sm font-medium text-white rounded-lg bg-zinc-600"
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
                {post.meta.date}
              </span>
            </div>
            <hr className="my-5" />
          </div>
          <ReactMarkdown className={styles.markdown_body} remarkPlugins={[remarkGfm]} >
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

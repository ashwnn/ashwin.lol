import Layout from "../../components/Layout";
import Container from "../../components/Container";
import fs, { readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { BlogCard } from "../../components/Card";

function Blog({ posts } : any) {
  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-10">
          <Link href="/" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="mb-10 text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Blog</span>
            </b>
          </h2>
          <div className="grid gap-4 md:gap-y-5 sm:grid-cols-2">
            {posts.map((post : any, index : any) => (
                <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "data/posts");
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = readFileSync(
      path.join(postsDirectory, filename),
      "utf-8"
    );

    const { data: metadata, content } = matter(markdownWithMeta);

    return {
      slug,
      metadata,
      content,
    };
  });

  return {
    props: {
      posts: posts,
    },
  };
}

export default Blog;

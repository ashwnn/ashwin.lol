import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

function Blog({ post }: any) {
  return (
    <div>
      <h1>{post.meta.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
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
  const { data: meta, content: raw } = matter(markdownWithMeta);

  const content = marked(raw);

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

import fs from "fs/promises";
import path from "path";
import Card from "@/components/Blog/Card";
import { BlogPost } from "@/types";
import matter from "gray-matter";
import Layout from "@/layouts/Page";

async function getLocalPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), "data");
  const files = await fs.readdir(postsDir);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title,
          description: data.description,
          date: data.date,
          author: data.author,
          cover_image: data.cover_image,
          tags: data.tags,
          content: content,
          published_date: data.published_data
        } as BlogPost;
      })
  );

  return posts;
}

export default async function BlogIndex() {
  const posts = await getLocalPosts();

  return (
    <Layout>
      <h1 className="text-3xl font-bold shine mt-6">Blog Posts</h1>
      <p className="text-gray-400">Collection</p>

      <ul className="mt-6 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug} className="my-3 inline-block w-full">
              <Card {...post} />
            </li>
          ))
        ) : (
          <p className="text-gray-300">
            I&apos;m writing something, check back soon!
          </p>
        )}
      </ul>
    </Layout>
  );
}
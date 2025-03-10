import fs from "fs/promises";
import path from "path";
import Card from "@/components/Blog/Card";
import { BlogPost } from "@/types";
import matter from "gray-matter";

async function getLocalPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), "src/data/blog");
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
    <div className="w-full md:max-w-3xl mx-auto px-4 md:px-0">
      <div className="my-5">
        <h1 className="text-3xl font-bold text-gray-100">Blog Posts</h1>
        <p className="mt-2 text-gray-400">
          Collection of my thoughts and experiences.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.slug} {...post} />
          ))
        ) : (
          <p className="text-gray-300 text-center col-span-2">
            I&apos;m writing something, check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
import fs from "fs/promises";
import path from "path";
import { BlogPostConfig } from "@/types";
import matter from "gray-matter";

export async function getLocalPosts(): Promise<BlogPostConfig[]> {
    const postsDir = path.join(process.cwd(), "src/data/blog");
    const files = await fs.readdir(postsDir);

    const posts = await Promise.all(
        files
            .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
            .map(async (file) => {
                const filePath = path.join(postsDir, file);
                const fileContent = await fs.readFile(filePath, 'utf8');
                const { data, content } = matter(fileContent);

                return {
                    slug: file.replace(/\.mdx?$/, ""),
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    author: data.author,
                    cover_image: data.cover_image,
                    tags: data.tags,
                    content: content,
                    published_date: data.published_date || data.date
                } as BlogPostConfig;
            })
    );

    // Sort by newest first by default
    return posts.sort((a, b) => {
        const dateA = new Date(a.published_date).getTime();
        const dateB = new Date(b.published_date).getTime();
        return dateB - dateA;
    });
}

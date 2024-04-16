import BlogCard from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/Skeleton";
import { Blog } from "@/types";
import { Suspense } from "react";

async function getPosts() {
    const res = await fetch("https://pb.bepo.ca/api/collections/posts/records", { cache: 'force-cache'}).then((res) => res.json());

    return res.items;
}

export default async function Posts() {
    
    const posts = await getPosts();

    return (
        <div>
            <h2 className="mb-6 text-2xl leading-snug shine">
                <b className="font-medium">
                    <span>Posts</span>
                </b>
            </h2>
            <ul>
                <Suspense fallback={<BlogCardSkeleton />}>
                    {posts.map((post: Blog) => (
                        <li key={post.id} className="my-3">
                            <BlogCard {...post}
                            />
                        </li>
                    ))}
                </Suspense>
            </ul>
        </div>
    )
}

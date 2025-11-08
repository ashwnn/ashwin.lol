"use client";

import { useState } from "react";
import BlogCard from "@/components/blog/Card";
import { BlogPostConfig } from "@/types";

type SortOrder = "newest" | "oldest";

interface BlogPageClientProps {
  initialPosts: BlogPostConfig[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const sortedPosts = [...initialPosts].sort((a, b) => {
    const dateA = new Date(a.published_date).getTime();
    const dateB = new Date(b.published_date).getTime();
    
    if (sortOrder === "newest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
    <div className="w-full md:max-w-3xl mx-auto px-4 md:px-0">
      <div className="my-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Blog Posts</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-400">
              Collection of my thoughts and experiences.
            </p>
          </div>
          
          <div className="relative group flex-shrink-0">
            <label htmlFor="sort-order" className="sr-only">Sort order</label>
            <div className="relative">
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="appearance-none bg-neutral-800/80 border border-neutral-700 rounded-lg pl-9 pr-9 py-2 sm:py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:border-neutral-600 hover:bg-neutral-800 cursor-pointer shadow-elevation-dark-sm hover:shadow-elevation-dark-md backdrop-blur-sm relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:rounded-t-lg"
              >
                <option value="newest" className="bg-neutral-900 text-white">Descending</option>
                <option value="oldest" className="bg-neutral-900 text-white">Ascending</option>
              </select>
              {/* Filter icon on left */}
              <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-blue-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6M11 16h2" />
                </svg>
              </div>
              {/* Dropdown arrow on right */}
              <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-blue-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
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

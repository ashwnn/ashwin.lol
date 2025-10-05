"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/types";

export default function BlogCard({ slug, title, description, cover_image, tags, published_date, author }: BlogPost) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/blog/${slug}`);
  };

  return (
    <div
      className="relative flex flex-col h-full bg-[#2a2a2a] border border-zinc-700/50 rounded-xl shadow-elevation-dark-lg hover:shadow-elevation-dark-xl hover:border-zinc-600 transition-all duration-300 overflow-hidden group hover:scale-[1.01] hover:-translate-y-1 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent before:rounded-t-xl before:z-10 hover:cursor-pointer"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      data-umami-event={`blog_${slug}`}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin mb-3"></div>
            <span className="text-sm text-blue-300">Loading article...</span>
          </div>
        </div>
      )}

      <div className="relative h-52 w-full bg-center bg-cover overflow-hidden">
        <Image
          src={cover_image}
          alt={title}
          quality={60}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {/* Add a subtle overlay gradient that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex-grow p-5 flex flex-col">
        <h3 className="text-xl font-bold leading-tight mb-2 text-gray-100 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{description}</p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap mt-auto pt-3">
            {tags.split(",").slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 mr-2 mb-2 text-xs font-medium text-gray-200 rounded-md bg-zinc-700/70 transition-all duration-300 group-hover:bg-zinc-700"
              >
                {tag.trim()}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-400 self-center">+ more</span>
            )}
          </div>
        )}

        <div className="mt-3 pt-3 text-xs border-t border-zinc-700/50 text-gray-400 flex justify-between items-center">
          {author && <span>{author}</span>}
          {published_date && <span>{formatDate(published_date)}</span>}
        </div>
      </div>

      {/* Add a subtle shine effect that animates once on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>
    </div>
  );
}
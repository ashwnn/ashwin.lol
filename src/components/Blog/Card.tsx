import Link from "@/components/Link";
import Image from "next/image";
import { BlogPost } from "@/types";

export default function BlogCard({ slug, title, description, cover_image, tags, published_date, author }: BlogPost) {
  
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col bg-[#222222] text-gray-200 border border-zinc-700 rounded-xl shadow-white hover:opacity-50  duration-100 ease-in-out"
    >
      <div className="relative h-48 bg-center bg-cover rounded-t-xl">
        <Image
          src={cover_image}
          alt={title}
          quality={50}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="rounded-t-xl"
        />
      </div>
      <div className="flex-grow p-6">
        <h3 className="mb-2 text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mb-2 italic text-gray-300">{description}</p>
        <div className="flex flex-wrap items-center">
          {tags.split(",").map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 mt-1 mr-2 font-medium text-white lowercase rounded-lg bg-zinc-800"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-right text-gray-400">
          {author && `${author}${published_date ? " - " : ""}`}
          {published_date && formatDate(published_date)}
        </p>
      </div>
    </Link>
  );
}
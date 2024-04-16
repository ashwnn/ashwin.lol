import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types';

export default function BlogCard({ id, slug, title, description, cover_image, tags, published_date, author,}: Blog) {

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <Link
      href={`/posts/${slug}`}
      className="flex flex-col border rounded-xl border-zinc-700 hover:shadow-lg hover:shadow-zinc-600/50 hover:-translate-y-0.5 duration-150 ease-in-out"
    >
      <div className="relative h-48 bg-center bg-cover rounded-t-xl">
        <Image
          src={`https://pb.bepo.ca/api/files/posts/${id}/${cover_image}`}
          alt={title}
          quality={50}
          fill
          loading="eager"
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="rounded-t-xl"
        />
      </div>
      <div className="flex-grow p-6">
        <h3 className="mb-2 text-2xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="mb-2 text-gray-600">
          {description}
        </p>

        <div className="flex flex-wrap items-center">
          {tags.split(',').map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 mt-1 mr-2 font-medium text-white lowercase rounded-lg bg-zinc-700"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
        <p className="text-sm font-medium text-right text-gray-300">
          {author && `${author}${published_date ? ' - ' : ''}`}
          {published_date && formatDate(published_date)}
        </p>
      </div>
    </Link>
  );
}

import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export default function ProjectCard({ title, description, image, tags, link, github }: ProjectCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row h-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 transition-all duration-300 hover:border-neutral-700 shadow-elevation-dark-lg hover:shadow-elevation-dark-xl hover:scale-[1.01] hover:-translate-y-1 mb-4 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent before:rounded-t-xl before:z-10">
      <div className="relative h-56 sm:h-auto sm:w-48 md:w-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 256px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-transparent opacity-80 sm:bg-gradient-to-t"></div>

      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="mb-3 text-sm text-neutral-400 sm:line-clamp-3">{description}</p>

        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-auto">
          {link && (<Link
            href={link}
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-700 transition-all duration-200 shadow-elevation-dark-sm hover:shadow-elevation-dark-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:rounded-t-lg"
            data-umami-event={`explore_project_${title}`}
          >
            Explore
            <svg className="ml-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>)}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg bg-neutral-800/50 p-1.5 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all duration-200 shadow-elevation-dark-sm hover:shadow-elevation-dark-md hover:scale-[1.05] hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
              aria-label="GitHub"
              title="View on GitHub"
              data-umami-event={`github_project_${title}`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
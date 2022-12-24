import { Icon } from "@iconify/react";

function Card({ title, data, link }: any) {
  return (
    <div className="p-4 border rounded-lg border-zinc-200 dark:border-zinc-700">
      <span className="mt-1 text-lg font-semibold shine spacing-sm opacity-90">
        {title}
      </span>

      <div className="pt-3 mx-2 opacity-60">
        <a target="_blank" rel="noopener noreferrer" href={link}>
          {data}
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ project }: any) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      href={project.url}
      className="relative p-4 duration-150 border rounded-lg text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:shadow-zinc-600/50 hover:-translate-y-0.5"
    >
      <div>
        <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
        <p className="mb-4">{project.description}</p>
      </div>
      <div>
        <a href="#" className="absolute top-0 right-0 p-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
    </a>
  );
}

export { Card, ProjectCard };

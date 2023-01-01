import { Icon } from "@iconify/react";
import Image from "next/image";

function Card({ title, data }: any) {
  return (
    <div className="p-4 border rounded-lg border-zinc-700">
      <a>
        <span className="opacity-60">{title}</span>
      </a>
      <div className="mt-1 text-3xl font-semibold shine spacing-sm opacity-90">
        {data}
      </div>
    </div>
  );
}

function DisplayCard({ display }: any) {
  return (
    <a
      target={display.local ? "_self" : "_blank"}
      rel="noopener noreferrer nofollow"
      href={display.url}
      className={`umami--click--${display.title} relative p-4 duration-150 border rounded-lg text-zinc-300 border-zinc-700 hover:shadow-lg hover:shadow-zinc-600/50 hover:-translate-y-0.5`}
    >
      <div>
        <h3 className="mb-2 text-2xl font-semibold">{display.title}</h3>
        <p className="mb-4">{display.description}</p>
      </div>
      <div>
        <a href="#" className="absolute top-0 right-0 p-4">
          {!display.local && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          )}
        </a>
      </div>
    </a>
  );
}

function ProjectCard({ project }: any) {
  return (
    <div className="relative p-4 duration-150 border rounded-lg text-zinc-300 border-zinc-700">
      <div>
        <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
        <p className="md:mb-4">{project.description}</p>
        <div className="flex flex-wrap items-center mb-4">
          {project.tags.split(",").map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 mt-3 mr-2 rounded-lg lg:mt-0 bg-zinc-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="my-2 ml-1">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`umami--click--${project.title.replace(' ', '-')}-github mr-4 my-2 text-[#bfbfbf] hover:text-[#fff]`}
            >
              <Icon
                icon="charm:github"
                width={20}
                height={20}
                className="mr-1.5 inline align-text-bottom"
              />
              <span className="hidden md:inline-block">GitHub</span>
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`umami--click--${project.title.replace(' ', '-')}-demo mr-4 my-2 text-[#bfbfbf] hover:text-[#fff]`}
            >
              <Icon
                icon="charm:globe"
                width={20}
                height={20}
                className="mr-1.5 inline align-text-bottom"
              />
              <span className="hidden md:inline-block">Demo</span>
            </a>
          )}
          {project.case_study_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`umami--click--${project.title.replace(' ', '-')}-case-study mr-4 my-2 text-[#bfbfbf] hover:text-[#fff]`}
            >
              <Icon
                icon="fluent-mdl2:documentation"
                width={20}
                height={20}
                className="mr-1.5 inline align-text-bottom"
              />
              <span className="hidden md:inline-block">Case Study</span>
            </a>
          )}
          {!project.github_url && !project.demo_url && !project.case_study_url && (
            <span className="text-[#bfbfbf] text-xl">Coming Soon...</span>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <span className="text-sm font-medium text-gray-600">
          {project.date}
        </span>
      </div>
    </div>
  );
}

function BlogCard({ post }: any) {
  return (
    <a
      target="_self"
      rel="noopener noreferrer nofollow"
      href={`/blog/${post.slug}`}
      className={`umami--click--${post.slug} flex flex-col border rounded-xl ease-in-out duration-150 border-zinc-700 hover:shadow-lg hover:shadow-zinc-600/50 hover:-translate-y-0.5`}
    >
      <div
        className="relative h-48 bg-center bg-cover rounded-xl"
        // style={{ backgroundImage: `url(${post.meta.cover_image})` }}
      >
        <Image
          alt={post.meta.title}
          src={post.meta.cover_image}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="rounded-t-xl"
        />
      </div>
      <div className="flex-grow p-6">
        <h3 className="mb-2 text-2xl font-semibold leading-tight">
          {post.meta.title}
        </h3>
        <p className="mb-2 text-gray-600">{post.meta.description}</p>
        <div className="flex items-center mb-4">
          <p className="text-sm font-medium text-gray-600">
            {post.meta.author && post.meta.author}
            {post.meta.date && ` - ${post.meta.date}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center">
          {post.meta.tags &&
            post.meta.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 mr-2 rounded-lg bg-zinc-700"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </a>
  );
}

export { Card, DisplayCard, ProjectCard, BlogCard };

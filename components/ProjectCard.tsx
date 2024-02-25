'use client' // !! TODO: Convert Icon to SVG & remove use client

import { Icon } from '@iconify/react';

type ProjectCardProps = {
    tags: string[];
    title: string;
    description: string;
    github?: string;
    demo?: string;
    case_study?: string;
    date: string;
}

export default function ProjectCard(project : ProjectCardProps) {
    return (
      <div className="relative p-4 duration-150 border rounded-lg text-zinc-300 border-zinc-700">
        
        <div>
          <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
          <p className="md:mb-4">{project.description}</p>
          <div className="flex flex-wrap items-center mb-4">
            {project.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 mt-3 mr-2 rounded-lg lg:mt-0 bg-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="my-2 ml-1">
            {project.github && (
              <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-click={`View Project ${project.title} on GitHub`}
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
            {project.demo && (
                <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-click={`View Project ${project.title} Demo`}
                    className="ml-4"
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
            {project.case_study && (
                <a
                href={project.case_study}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-click={`View Project ${project.title} Demo`}
                className="ml-4"
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
            {!project.github && !project.demo && !project.case_study && (
                <span className="text-[#bfbfbf] text-xl">Private</span>
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
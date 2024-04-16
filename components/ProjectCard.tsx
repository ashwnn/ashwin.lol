import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';

export default function ProjectCard(project: Project) {
    
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(undefined, {
          month: 'long', day: 'numeric', year: 'numeric'
        });
      };

    return (
        <div className="overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg bg-zinc-800 hover:shadow-xl text-zinc-300">
            <div className="p-4">
                <h3 className="mb-1 text-xl font-semibold">{project.title}</h3>
                <p className="mb-2 text-sm text-zinc-400">{project.description}</p>
                <div className="flex items-center justify-start mb-3 space-x-3 font-semibold">
                    {project.case_study && (
                        <Link href={project.case_study} legacyBehavior>
                            <a className="text-blue-500 transition-colors duration-300 hover:text-blue-600">
                                Case Study
                            </a>
                        </Link>
                    )}
                    {project.demo && (
                        <Link href={project.demo} legacyBehavior>
                            <a className="text-green-500 transition-colors duration-300 hover:text-green-600">
                                Demo
                            </a>
                        </Link>
                    )}
                    {project.github && (
                        <Link href={project.github} legacyBehavior>
                            <a className="transition-colors duration-300 text-zinc-200 hover:text-zinc-400">
                                Code
                            </a>
                        </Link>
                    )}
                </div>
                <div className="flex flex-wrap gap-1 mb-1">
                    {project.tags.split(",").map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 mx-0.5 rounded-md"
                        >
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-2 text-xs font-medium text-right uppercase bg-zinc-700 text-zinc-100">
                {formatDate(project.start_date)} - {project.end_date ? formatDate(project.end_date) : "Present"}
            </div>
        </div>
    );
}

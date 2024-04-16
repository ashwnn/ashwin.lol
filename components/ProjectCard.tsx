import React from "react";
import Link from "next/link";
import { Project } from "@/types";

export default function ProjectCard(project: Project) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="border rounded-sm border-zinc-700 shadow-md shadow-zinc-600">
            <div className="p-4 bg-zinc-800">
                <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                </h3>
                <p className="text-lg text-zinc-40">{project.description}</p>
                <div className="space-x-3 font-semibold my-3">
                    {project.case_study && (
                        <>
                            <Link href={project.case_study} legacyBehavior>
                                <a className="text-gray-300 transition-colors duration-300 hover:text-white">
                                    Case Study
                                </a>
                            </Link>
                            {(project.demo || project.github) && (
                                <span className="mx-2">/</span>
                            )}
                        </>
                    )}
                    {project.demo && (
                        <>
                            <Link href={project.demo} legacyBehavior>
                                <a className="text-gray-300 transition-colors duration-300 hover:text-white">
                                    Demo
                                </a>
                            </Link>
                            {project.github && <span className="mx-2">/</span>}
                        </>
                    )}
                    {project.github && (
                        <Link href={project.github} legacyBehavior>
                            <a className="text-gray-300 transition-colors duration-300 hover:text-white">
                                Code
                            </a>
                        </Link>
                    )}
                </div>

                <div className="flex flex-wrap">
                    {project.tags.split(",").map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 mr-2 font-medium text-white lowercase rounded-lg bg-zinc-700"
                        >
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="pb-2 px-2 text-md font-medium text-right text-gray-300 bg-zinc-800">
                {formatDate(project.start_date)} -{" "}
                {project.end_date ? formatDate(project.end_date) : "Present"}
            </div>
        </div>
    );
}

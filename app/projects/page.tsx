import ProjectCard from "@/components/ProjectCard";
import { ProjectCardSkeleton } from "@/components/Skeleton";
import { Project } from "@/types";
import { Suspense } from "react";

async function getProjects() {
    const response = await fetch(
        "https://pb.bepo.ca/api/collections/projects/records"
    ).then((res) => res.json());
    return response.items;
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <div>
            <ul className="grid gap-y">
                <Suspense fallback={<ProjectCardSkeleton />}>
                    {projects.length > 0 ? (
                        <>
                            {projects.map((project: Project) => (
                                <li key={project.id} className="my-3">
                                    <ProjectCard {...project} />
                                </li>
                            ))}
                        </>
                    ) : (
                        <p>I&apos;m upadting things, check back soon!</p>
                    )}
                </Suspense>
            </ul>
        </div>
    );
}

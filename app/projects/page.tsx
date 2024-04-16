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
            <ul>
                <Suspense fallback={<ProjectCardSkeleton />}>
                    {projects.map((project: Project) => (
                        <li key={project.id} className="my-3">
                            <ProjectCard {...project} />
                        </li>
                    ))}
                </Suspense>
            </ul>
        </div>
    );
}

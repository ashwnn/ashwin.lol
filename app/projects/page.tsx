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
    const projects = getProjects();

    const [data] = await Promise.all([projects]);
    return (
        <div>
            <ul>
                <Suspense fallback={<ProjectCardSkeleton />}>
                    {data.map((project: Project) => (
                        <li key={project.id} className="my-3">
                            <ProjectCard {...project}
                            />
                        </li>
                    ))}
                </Suspense>
            </ul>
        </div>
    );
}

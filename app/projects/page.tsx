import ProjectCard from "@/components/ProjectCard";
import { ProjectCardSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";

async function getProjects() {
    const response = await fetch(
        "https://pb.bepo.ca/api/collections/projects/records"
    ).then((res) => res.json());
    return response.items;
}

type ProjectType = {
    id: string;
    title: string;
    description: string;
    tags: string;
    start_date: string;
    end_date: string;
    demo: string;
    github: string;
    case_study: string;
};

export default async function Projects() {
    const projects = getProjects();

    const [data] = await Promise.all([projects]);
    return (
        <div>
            <ul>
                <Suspense fallback={<ProjectCardSkeleton />}>
                    {data.map((project: ProjectType) => (
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

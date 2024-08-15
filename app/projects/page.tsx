'use client';
import ProjectCard from "@/components/ProjectCard";
import { ProjectCardSkeleton } from "@/components/Skeleton";
import { Project } from "@/types";
import fetcher from "@/util/fetcher";
import useSWR from "swr";

export default function Projects() {
    const { data: projects } = useSWR<any>("https://pb.bepo.ca/api/collections/projects/records", fetcher);

    return (
        <div>
            <ul className="grid gap-y">
                    {projects && projects?.items.length > 0 ? (
                        <>
                            {projects.items.map((project: Project) => (
                                <li key={project.id} className="my-3">
                                    <ProjectCard {...project} />
                                </li>
                            ))}
                        </>
                    ) : (
                        <ProjectCardSkeleton />
                    )}
            </ul>
        </div>
    );
}

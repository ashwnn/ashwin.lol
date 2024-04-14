import ProjectCard from "@/components/ProjectCard";

async function getProjects() {
    const response = await fetch('https://pb.bepo.ca/api/collections/projects/records').then((res) => res.json());
    return response.items;
}

export default async function Projects() {

    const projects = getProjects();

    const [data] = await Promise.all([projects]); 
    return (
        <div>
            <ul>
                {data.map((project: any) => (
                    <li key={project._id} className="my-3">
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            startDate={project.start_date}
                            endDate={project.end_date}
                            demo={project.demo}
                            github={project.github}
                            caseStudy={project.case_study}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

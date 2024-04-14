import Link from "next/link";
import { format, isValid } from "date-fns";

interface ProjectCardProps {
    caseStudy?: string;
    demo?: string;
    github?: string;
    title: string;
    description: string;
    tags: string;
    startDate: string;
    endDate?: string;
}

const ProjectCard = ({
    caseStudy,
    demo,
    github,
    title,
    description,
    tags,
    startDate,
    endDate,
}: ProjectCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (!isValid(date)) {
            return "Invalid date";
        }
        return format(date, "MMM d, yyyy");
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = endDate ? formatDate(endDate) : "Present";

    return (
        <div className="bg-zinc-800 text-zinc-300 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <p className="text-zinc-400 text-sm mb-2">{description}</p>
                <div className="flex items-center justify-start space-x-3 mb-3 font-semibold">
                    {caseStudy && (
                        <Link href={caseStudy} legacyBehavior>
                            <a className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                                Case Study
                            </a>
                        </Link>
                    )}
                    {demo && (
                        <Link href={demo} legacyBehavior>
                            <a className="text-green-500 hover:text-green-600 transition-colors duration-300">
                                Demo
                            </a>
                        </Link>
                    )}
                    {github && (
                        <Link href={github} legacyBehavior>
                            <a className="text-zinc-200 hover:text-zinc-400 transition-colors duration-300">
                                Code
                            </a>
                        </Link>
                    )}
                </div>
                <div className="flex flex-wrap gap-1 mb-1">
                    {tags.split(",").map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 mx-0.5 rounded-md"
                        >
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-zinc-700 text-zinc-100 p-2 text-right text-xs uppercase font-medium">
                {formattedStartDate} - {formattedEndDate}
            </div>
        </div>
    );
};

export default ProjectCard;

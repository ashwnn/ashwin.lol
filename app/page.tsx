import Card from "@/components/Card";
import SocialLinks from "@/components/SocialLinks";

export default function Root() {
    return (
        <div className="max-w-screen-xl px-3 mx-auto mt-20">
            {/* !! TODO: Add refferal system */}
            <h2 className="text-2xl leading-snug shine">
                <b className="font-semibold">
                    <span>Hello, I&apos;m Ashwin.</span>
                </b>
                <br />
                <span>a Student/Developer living in Canada.</span>
            </h2>
            <SocialLinks />
            <p className="max-w-3xl mt-4 text-lg leading-snug text-gray-300">
                Currently a third year student enrolled in <a className="underline text-white" target="_blank" rel="noopener noreferrer nofollow" href="https://www.bcit.ca/programs/forensic-investigation-digital-forensics-and-cybersecurity-option-bachelor-of-technology-full-time-part-time-847cbtech/">Forensic Investigation</a> with a strong
                understanding of computer science and software development. In my free
                time, I enjoy exploring the field of machine learning and
                delving into security topics.
            </p>
            <div className="max-w-4xl mt-6">
                <span className="grid gap-4 md:gap-y-5 sm:grid-cols-2">
                    <Card
                        title="Projects"
                        description="Discover how I've tackled challenges and built innovative solutions."
                        url="/projects"
                    />
                    <Card
                        title="Posts"
                        description="Dive into my thoughts on tech, development, and working out."
                        url="/posts"
                    />
                    <Card
                        title="Snippets"
                        description="Find a treasure trove of code – the useful, the bizarre, and the 'why did I write that?' kind."
                        url="/snippets"
                    />
                    <Card
                        title="About"
                        description="My story, passions, and what drives me."
                        url="/about"
                    />
                </span>
            </div>
        </div>
    );
}

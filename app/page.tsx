import Container from "@/components/Container";
import DisplayCard from "@/components/DisplayCard";
import Link from "@/components/Link";
import SocialLink from "@/components/SocialLink";

export default function Home() {
    return (
        <Container>
            <div className="max-w-screen-xl px-3 mx-auto mt-20">

                {/* TODO: Add Refferer Notification */}

                <h2 className="text-2xl leading-snug shine">
                    <span className="font-semibold">
                        <span>Hello, I&apos;m Ashwin.</span>
                    </span>
                    <br />
                    <span>a Student/Developer living in Canada.</span>
                </h2>

                <div className="flex flex-row mt-4 gap-x-2 socials">
                    <SocialLink
                        trackingName="GitHub"
                        href="https://github.com/xxiz/"
                        iconName="charm:github"
                    />
                    <SocialLink
                        trackingName="StackOverflow"
                        href="https://stackoverflow.com/users/9254757/"
                        iconName="simple-icons:stackoverflow"
                    />
                    <SocialLink
                        trackingName="LinkedIn"
                        href="https://linkedin.com/in/ax2"
                        iconName="fa-brands:linkedin-in"
                    />
                    <SocialLink
                        trackingName="PGP Key"
                        href="/pgp.asc"
                        iconName="charm:key"
                    />
                    <SocialLink
                        trackingName="Email"
                        href="mailto:its@ashwin.lol"
                        iconName="charm:mail"
                    />
                </div>

                <div>
                    <p className="max-w-3xl mt-4 text-lg leading-snug text-gray-300">
                        Currently a computer science student with a strong
                        understanding of computer science, security and
                        development. Currently studying{" "}
                        <Link href="https://www.bcit.ca/programs/forensic-investigation-digital-forensics-and-cybersecurity-option-bachelor-of-technology-full-time-part-time-847cbtech/">
                            Digital Forensics and Cybersecurity
                        </Link>{" "}
                        at <Link href="https://www.bcit.ca/">BCIT</Link>. In my
                        free time I enjoy learning new technologies and working
                        on open source projects.
                    </p>

                    {/* TOOD: Add spotify now playing */}
                </div>

                <div className="max-w-4xl mt-10">
                    <div className="grid gap-4 md:gap-y-5 sm:grid-cols-2">
                        <DisplayCard
                            title="Projects"
                            description="A collection of curated projects I have worked or working on currently."
                            url="/projects"
                        />
                        <DisplayCard
                            title="Blog"
                            description="My thoughts and breakdowns on various topics that interest me."
                            url="/blog"
                        />
                        <DisplayCard
                            title="About"
                            description="Learn more about me, and why I do what I do and how I do what I do."
                            url="/about"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

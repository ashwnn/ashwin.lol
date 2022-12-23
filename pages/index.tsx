import Layout from "../components/Layout";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import { ProjectCard } from "../components/Card";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Image from "next/image";

function HomePage() {
  const { data, error } = useSWR("/api/now-playing", fetcher);
  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto">
          <h2 className="text-2xl leading-snug shine">
            <b className="font-semibold">
              <span>Hello, I&apos;m Ashwin.</span>
            </b>
            <br />
            <span>a Student/Developer living in Canada.</span>
          </h2>
          {/* social media icons */}
          <div className="flex flex-row mt-4 gap-x-2 socials">
            <a href="https://github.com/xxiz/" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="charm:github"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a>
            <a href="https://stackoverflow.com/users/9254757/" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="simple-icons:stackoverflow"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a>
            <a href="https://linkedin.com/in/ax2" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="fa-brands:linkedin-in"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a>
            <a href="mailto:its@ashwin.lol" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="charm:mail"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a>
            <a href="https://keybase.io/34x/pgp_keys.asc?fingerprint=086c9e5aa1111c8cfc7da687f150c22ac0bcce57" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="charm:key"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="charm:file"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a>
          </div>
          <div className="max-w-4xl mt-10">
            <div className="grid gap-5 md:gap-y-5 sm:grid-cols-2">
              <ProjectCard
                project={{
                  title: "Portfolio",
                  description:
                    "A website where you can learn basically everything about myself, including my projects.",
                  url: "https://ashwin.lol",
                }}
              />
              <ProjectCard
                project={{
                  title: "Blog",
                  description:
                    "I write about anything and everything I find interesting, want to share or just learnt!",
                  url: "/blog",
                }}
              />
              <ProjectCard
                project={{
                  title: "Code",
                  description:
                    "A collection of all my open-source projects, and code I've written. Hosted on GitHub.",
                  url: "https://github.com/xxiz?tab=repositories",
                }}
              />
              <ProjectCard
                project={{
                  title: "Photos",
                  description:
                    "As someone who enjoys photography, a collection of some amateur photos. Hosted on Unsplash.",
                  url: "https://unsplash.com/@axole",
                }}
              />
              <ProjectCard
                project={{
                  title: "Snippets",
                  description:
                    "Completley random snippets of useful, and weird code I have found over the years. Hosted on GitHub.",
                  url: "https://gist.github.com/xxiz",
                }}
              />
              <ProjectCard
                project={{
                  title: "Tools",
                  description:
                    "Quirky, and useful tools I have found for various from security to downloading mangas. Hosted on GitHub.",
                  url: "https://a7.wtf/tools",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
export default HomePage;

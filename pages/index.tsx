import Layout from "../components/Layout";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import { DisplayCard } from "../components/Card";

function HomePage() {
  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-20">
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
            <a href="/pgp" target="_blank" rel="noopener noreferrer nofollow">
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
          <div>
            <p className="max-w-3xl mt-4 text-lg text-gray-400">
            Currently a second year computer science student with a strong understanding of computer science and development. In my free time, I enjoy exploring the field of machine learning and delving into security topics.
            </p>
          </div>
          <div className="max-w-4xl mt-10">
            <div className="grid gap-4 md:gap-y-5 sm:grid-cols-2">
              <DisplayCard
                display={{
                  title: "Projects",
                  description:
                    "A collection of curated projects I have worked or working on currently.",
                  url: "/projects",
                  local: true,
                }}
              />
              <DisplayCard
                display={{
                  title: "Blog",
                  description:
                    "A collection of blog posts I have written on various topics.",
                  url: "/blog",
                  local: true,
                }}
              />
              <DisplayCard
                display={{
                  title: "Snippets",
                  description:
                    "Completley random snippets of useful, and weird code I have found over the years. Hosted on GitHub.",
                  url: "/snippets",
                  local: true,
                }}
              />
              <DisplayCard
                display={{
                  title: "Tools",
                  description:
                    "Quirky, and useful tools I have found for various from security to downloading mangas.",
                  url: "/tools",
                  local: true,
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

import Layout from "../components/Layout";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import { DisplayCard } from "../components/Card";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Link from "next/link";
import { useRouter } from 'next/router'
import { getMessage } from "../lib/refferer";

function HomePage() {

  const { data: insight } = useSWRImmutable<any>("/api/insights", fetcher);
  const { data: track } = useSWR<any>("/api/now-playing", fetcher);

  const router = useRouter();
  const { from } = router.query;

  let ref = from && getMessage(from as string);


  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-20">
          {ref && (
            <div id="notif" className={`relative px-5 py-2 rounded-lg shadow-md my-7 text-zinc-800 ${ref.color}`}>
              <span className="float-left">
                <p>
                  <span className="-ml-3 text-5xl font-semibold md:-ml-5">{ref.logo}</span>
                </p>
              </span>
              <p className="font-normal drop-shadow-lg">
                <span className="mr-2 text-lg font-semibold">{ref.title}</span>
                <br />
                {ref.message}
              </p>
              <button
                className="absolute top-0 right-0 px-3 py-1 text-2xl font-semibold leading-none bg-transparent border-0 outline-none opacity-50 focus:outline-none"
                onClick={() => {
                  document.getElementById("notif")!.style.display = "none";
                }}
              >
                <span className="block w-6 h-6 text-2xl text-black opacity-50">
                  ×
                </span>
              </button>
            </div>
          )}
          <h2 className="text-2xl leading-snug shine">
            <b className="font-semibold">
              <span>Hello, I&apos;m Ashwin.</span>
            </b>
            <br />
            <span>a Student/Developer living in Canada.</span>
          </h2>
          {/* social media icons */}
          <div className="flex flex-row mt-4 gap-x-2 socials">
            <Link
              href="https://github.com/xxiz/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon
                icon="charm:github"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </Link>
            <Link
              href="https://stackoverflow.com/users/9254757/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon
                icon="simple-icons:stackoverflow"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </Link>
            <Link
              href="https://linkedin.com/in/ax2"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon
                icon="fa-brands:linkedin-in"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </Link>
            <Link href="/pgp.asc" target="_blank" rel="noopener noreferrer nofollow">
              <Icon
                icon="charm:key"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </Link>
            <Link
              href="mailto:its@ashwin.lol"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon
                icon="charm:mail"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </Link>
            {/* <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Icon
                icon="charm:file"
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
              />
            </a> */}
          </div>
          <div>
            <p className="max-w-3xl mt-4 text-lg leading-snug text-gray-300">
              Currently a second year computer science student with a strong
              understanding of computer science and development. In my free
              time, I enjoy exploring the field of machine learning and delving
              into security topics.
              <span>
                {" "}
                This week I have been mostly working with{" "}
                {!insight && (
                  <>
                    <span className="skeleton">█████</span> and{" "}
                    <span className="skeleton">█████</span>
                  </>
                )}
                {insight &&
                  insight.languages
                    .slice(0, 2)
                    .map((lang: any, index: number) => (
                      <>
                        {index === 0 ? "" : index === 2 - 1 ? " and " : ", "}
                        <Link
                          key={index}
                          href={`https://www.google.com/search?q=${lang.name}+programming+language`}
                          className="underline decoration-dotted"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {lang.name}
                        </Link>
                      </>
                    ))}{" "}
                with{" "}
                <Link
                  className="underline decoration-dotted"
                  href="https://github.com/xxiz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {!insight && <span className="skeleton">██</span>}
                  {insight && insight.commits}
                </Link>{" "}
                commits and{" "}
                <Link
                  className="underline decoration-dotted"
                  href="https://wakatime.com/@why"
                  target="_blank"
                  rel="noreferrer"
                >
                  {!insight && <span className="skeleton">██████</span>}
                  {insight && insight.total_time_coding}
                </Link>{" "}
                spent coding.
                {/* spent coding mainly on{" "}
                  {insight!.projectsp
                    .slice(0, 2)
                    .map((project: any, index: number) => (
                      <>
                        {index === 0 ? "" : index === 2 - 1 ? " and " : ", "}
                        <span
                          key={index}
                          className="underline decoration-dotted"
                        >
                          {project.name}
                        </span>
                      </>
                    ))}
                  .{" "} */}
                <br />
                <br />
                {track && track.isPlaying && (
                  <span>
                    <svg
                      className='w-3 animate-pulse fill-current text-green-500 inline-block mr-1.5 mb-0.5 relative'
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M10.29 16.89L13.11 14.08L14.08 13.11L16.89 10.29L14.08 7.47L13.11 6.5L10.29 8.71L7.47 6.5L6.5 7.47L8.71 10.29L6.5 13.11L7.47 14.08L10.29 16.89Z" />
                    </svg>
                    Listening to {" "}
                    <Link
                      href={track.songUrl}
                      className={`underline decoration-dotted ${track.isLocal ?? "text-green-500/90"
                        }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {track!.title}
                    </Link>{" "}
                    by{" "}
                    <Link
                      href={`https://open.spotify.com/search/${encodeURIComponent(
                        track!.artist
                      )}`}
                      className={`underline decoration-dotted`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {track!.artist}
                    </Link>{" "}
                  </span>
                )}
              </span>
            </p>

            {/* <div className="container max-w-4xl my-12">
              <h2 className="mb-8 text-xl font-medium shine">
                My Favorite Tools
              </h2>
              <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto mt-8 gap-x-16 gap-y-8">
                {tools.map((tool : any) => (
                    <a key={tool.name} className="flex items-center justify-center rounded-lg">
                      <span 
                        className="mr-4 w-30"
                      >
                        <div dangerouslySetInnerHTML={{ __html: tool.logo }} />
                      </span>
                    </a>
                ))}
              </div>
            </div> */}
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
                  title: "About",
                  description:
                    "A collection of information about me, and my life alongside links to explore this website.",
                  url: "/about",
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

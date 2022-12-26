import Layout from "../components/Layout";
import Container from "../components/Container";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";

function Uses() {
  const { data: top_tracks } = useSWRImmutable<any>("/api/top-tracks", fetcher);
  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-10">
          <Link href="/" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="mb-6 text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Hey, I&apos;m Ashwin!</span>
            </b>
          </h2>
          <div className="my-3">
            <p>
              Hi, I&apos;m Ashwin, a 20-year-old developer who loves software
              development and technology. I&apos;m currently working on backend
              projects and recently started learning frontend development with
              Next.js, Tailwind & Mantine. In my free time, I enjoy exploring
              security vulnerabilities and learning about machine learning.
              I&apos;m also a social person who is always looking for new
              opportunities to learn and grow.
            </p>
            <br />
            <p>
              I&apos;ve worked with quite a variety technologies over the years,
              such as Node.js, Python, Java, Shell and more. I&apos;ve been
              focusing most of my the last year on frontend development with
              Next.js, Tailwind and Mantine. Backend development is still my
              main focus, but I&apos;ve always been curious if frontend
              development is something I&apos;d like to do in the future.
            </p>
            <br />
            <p>
              When I&apos;m not coding, I&apos;m usually playing video games, or
              messing around with machine learning or security. Outside of my
              computer, I&apos;m usually out at the gym or hiking with my
              friends and family! Working at a dealership in the past I also
              have a huge love for cars! As a car nerd and love hearing,
              watching and reading about cars everywhere and their advancements.
            </p>
          </div>
          <h2 className="mt-3 mb-6 text-xl leading-snug md:mt-6 shine">
            <b className="font-medium">
              <span>
                A collection of various podcasts, channels & media I love!
              </span>
            </b>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-10 gap-y-3 gap-x-0 md:gap-x-0 md:gap-y-0">
            <a
              href="https://lexfridman.com/podcast/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/lex-fridman-podcast.jpg"
                alt="Lex Fridman Podcast"
                width={110}
                height={110}
              />
            </a>
            <a
              href="https://www.youtube.com/@LinusTechTips"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/linus-tech-tips.png"
                alt="Linus Tech Tips"
                width={110}
                height={110}
              />
            </a>
            <a
              href="https://www.youtube.com/@TwoMinutePapers"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/two-minute-papers.png"
                alt="Two Minute Papers"
                width={110}
                height={110}
              />
            </a>
            <a
              href="https://darknetdiaries.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/darknet-diaries.jpg"
                alt="Darknet Diaries"
                width={110}
                height={110}
              />
            </a>
            <a
              href="https://www.youtube.com/@Fireship"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/fireship.png"
                alt="Fireship"
                width={110}
                height={110}
              />
            </a>
            <a
              href="https://thecyberwire.com/podcasts/daily-podcast"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/cyberwire-daily.jpg"
                alt="Cyberwire Daily"
                width={110}
                height={110}
              />
            </a>
            <a
              href="https://www.youtube.com/@freecodecamp"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/freecodecamp.png"
                alt="freeCodeCamp.org"
                width={110}
                height={110}
              />
            </a>
            <a
              href="http://youtube.com/@DougDeMuro"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/doug-demero.jpg"
                alt="Doug Demero"
                width={110}
                height={110}
              />
            </a>
            <a
              href="http://youtube.com/@schaefchen/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/static/images/about/og-schaefchen.jpg"
                alt="OG Schaefchen"
                width={110}
                height={110}
              />
            </a>
          </div>
          <div>
            <h2 className="mt-3 mb-1 text-xl leading-snug md:mt-6 shine">
              <b className="font-medium">
                <span>Explore other pages</span>
              </b>
            </h2>
          </div>
          <ul className="py-1">
            <li>
              <Link
                href="https://19x.notion.site/adb0c3c077ee46d7a22fe0cc357132c7?v=8760973cae554b94b4e54e848ca37917"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /roadmap
              </Link>{" "}
              of my journey through the world of technology.
            </li>
            <li>
              <Link
                href="javascript:alert('Coming soon!');"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /uses
              </Link>{" "}
              a list of (almost) everything that I use
            </li>
            <li>
              <Link
                href="/instances"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /instances
              </Link>{" "}
              I host on my own server
            </li>
            <li>
              <Link
                href="/tools"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /tools
              </Link>{" "}
              I use to get things done.
            </li>
            <li>
              <Link
                href="javascript:alert('Coming soon!');"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /tor
              </Link>{" "}
              websites that focus on providing information.
            </li>
            <li>
              <Link
                href="javascript:alert('Coming soon!');"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /software
              </Link>{" "}
              that I believe in and cannot live without.
            </li>
          </ul>
          {/* <div className="my-7">
            <p>
              There are a three things I can&apos;t live without: my computer,
              my phone and music! Here are some of recent favorite songs
              I&apos;ve been listening to. Updated every week by Spotify!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-0 md:gap-x-0 md:gap-y-0">
            {top_tracks?.tracks.map((track: any, index: any) => (
              <a
                key={index}
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center py-2"
              >
                <Image
                  src={track.albumUrl}
                  alt={track.title}
                  width={70}
                  height={70}
                  className="rounded-lg"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-xs text-gray-500">{track.artist}</p>
                </div>
              </a>
            ))}
          </div> */}
        </div>
      </Container>
    </Layout>
  );
}

export default Uses;

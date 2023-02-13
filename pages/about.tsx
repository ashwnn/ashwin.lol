import Layout from "../components/Layout";
import Container from "../components/Container";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { UnsplashPhotoAPI } from "../types";

function Uses() {
  const { data: photos } = useSWRImmutable<UnsplashPhotoAPI>(`/api/photos`, fetcher);

  const media = [
    {
      name: "Lex Fridman Podcast",
      url: "https://lexfridman.com/podcast/",
      src: "/static/images/about/lex-fridman-podcast.jpg",
    },
    {
      name: "Two Minute Papers",
      url: "https://www.youtube.com/@TwoMinutePapers",
      src: "/static/images/about/two-minute-papers.png",
    },
    {
      name: "Darknet Diaries",
      url: "https://darknetdiaries.com/",
      src: "/static/images/about/darknet-diaries.jpg",
    },
    {
      name: "Fireship",
      url: "https://www.youtube.com/@Fireship",
      src: "/static/images/about/fireship.png",
    },
    {
      name: "Cyberwire Daily",
      url: "https://thecyberwire.com/podcasts/daily-podcast",
      src: "/static/images/about/cyberwire-daily.jpg",
    },
    {
      name: "freeCodeCamp.org",
      url: "https://www.youtube.com/@freecodecamp",
      src: "/static/images/about/freecodecamp.png",
    },
    {
      name: "Doug Demero",
      url: "http://youtube.com/@DougDeMuro",
      src: "/static/images/about/doug-demero.jpg",
    },
    {
      name: "OG Schaefchen",
      url: "http://youtube.com/@schaefchen/",
      src: "/static/images/about/og-schaefchen.jpg",
    },
    {
      name: "John Hammond",
      url: "https://www.youtube.com/@_JohnHammond",
      src: "/static/images/about/john-hammond.jpg",
    },
  ];

  return (
    <Layout title="About Me">
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
          <div>
            <h2 className="mt-3 mb-1 text-xl leading-snug md:mt-6 shine">
              <b className="font-medium">
                <span>Explore other pages</span>
              </b>
            </h2>
            <ul className="py-1">
              <li>
                <Link
                  href="/roadmap"
                  className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
                >
                  /roadmap
                </Link>{" "}
                of my journey through the world of technology.
              </li>
              <li>
                <Link
                  href="/uses"
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
                I use to get things done
              </li>
              {/* <li>
              <Link
                href="/tor"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /tor
              </Link>{" "}
              websites that I use for the utmost privacy
            </li> */}
              {/* <li>
              <Link
                href="javascript:alert('Coming soon!');"
                className="text-blue-300/80 hover:text-blue-300/90 hover:underline"
              >
                /software
              </Link>{" "}
              that I believe in and cannot live without
            </li> */}
            </ul>
          </div>
          <h2 className="mt-3 mb-2 text-xl leading-snug md:mt-6 shine">
            <b className="font-medium">
              <span>
                A collection of various podcasts, channels & media I love!
              </span>
            </b>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-10 gap-y-1 gap-x-0 md:gap-x-0 md:gap-y-0">
            {media.map((item: {
              name: string;
              url: string;
              src: string;
            }, index : number) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  width={110}
                  height={110}
                  className="transition-opacity duration-200 ease-in-out hover:opacity-50 hover:shadow-lg"
                />
              </a>
            ))}
          </div>
          <div className="my-10">
            <h2 className="mt-3 mb-2 text-xl leading-snug md:mt-6 shine">
              <b className="font-medium">
                <span>Amaetur Photography</span>
              </b>
              <span className="block text-xs md:ml-2 md:inline">
                Taken on iPhone XS/13 Pro
              </span>
            </h2>
            {/* show all photos in responsive gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {photos?.data.map((photo: {
                alt_description: string;
                thumbnail: {
                  url: string;
                  width: number;
                  height: number;
                };
                unsplash: string;
              }, index: any) => (
                <a
                  key={index}
                  href={photo.unsplash}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block p-1.5 w-auto"
                >
                  <Image
                    src={photo.thumbnail.url}
                    alt={photo.alt_description}
                    width={photo.thumbnail.width}
                    height={photo.thumbnail.height}
                    className="items-center inline-block text-center align-middle transition-opacity duration-200 ease-in-out hover:opacity-50 hover:shadow-lg"
                  />
                </a>
              ))}
            </div>
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
        </div>
      </Container>
    </Layout>
  );
}

export default Uses;
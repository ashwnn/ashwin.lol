import Layout from "../components/Layout";
import Container from "../components/Container";
import fetcher from "../lib/fetcher";
import useSWR from 'swr';
import { Icon } from "@iconify/react";
import Link from "next/link";

function Tools() {
  const { data: bookmarks } = useSWR<any>("/api/bookmarks", fetcher);

  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto">
          <Link href="/" className="pb-10">
            <Icon className="inline-block w-5 h-5 mb-5 align-text-top" icon="charm:arrow-left" />
          </Link>
          <h2 className="mb-5 text-2xl leading-snug shine">
            <b className="font-medium">
             <span>Tools</span>
            </b>
            <span className="ml-2 text-xs ">
              powered by{" "}
              <a className="text-blue-500" href="https://raindrop.io/">
                Raindrop
              </a>
            </span>
          </h2>
          <div className="mt-6 divide-y divide-zinc-100 dark:divide-zinc-800">
            {bookmarks?.data.map((bookmark: any) => (
              <article key={bookmark._id} className="py-4">
                <h3 className="font-medium shine">
                  <a
                    href={bookmark.link}
                    className=""
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {bookmark.title}
                  </a>
                </h3>
                <div className="flex items-center mt-1 space-x-2">
                  <span>{bookmark.domain}</span>
                  <span>•</span>
                  <span className="text-sm">
                    {bookmark.tags.map((tag: any, index: number) => (
                      <span key={index}>
                        {tag}
                        {index !== bookmark.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              </article>
            ))}
            {!bookmarks && (
              <div className="py-4">
                <h3 className="font-medium shine"><Icon icon="line-md:loading-loop" className="inline w-8 h-8" /></h3>
                </div>
                )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Tools;

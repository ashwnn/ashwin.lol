import Layout from "../components/Layout";
import Container from "../components/Container";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { Icon } from "@iconify/react";
import Link from "next/link";

function Snippets() {
  const { data: snippets } = useSWRImmutable<any>("/api/snippets", fetcher);
  return (
    <Layout title="Random Useful Code">
      <Container>
        <div className="max-w-screen-xl px-3 mx-auto mt-10">
          <Link href="/" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Snippets</span>
            </b>
            <span className="ml-2 text-xs">
              powered by{" "}
              <a className="text-zinc-500" href="https://gist.github.com/" target="_blank" rel="noreferrer">
                GitHub Gists
              </a>
            </span>
          </h2>
          <div className="pt-5 divide-y divide-zinc-800">
            {snippets?.data.map((gist: any) => (
              <article key={gist.id} className="py-4">
                <a
                  href={gist.html_url}
                  className=""
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    <h3>
                  {/* file name(s) */}
                  {Object.keys(gist.files).map((file: any) => (
                    <span key={file} className="text-lg font-medium text-zinc-200">
                      {file}
                    </span>
                  ))}
                    </h3>
                    <div>
                        <span className="text-sm">
                        {gist.description.length > 50 ? gist.description.substring(0, 50) + "..." : gist.description} 
                        </span>
                    </div>
                </a>
              </article>
            ))}
            {!snippets && (
              <div className="py-4">
                <h3 className="font-medium shine">
                  <Icon
                    icon="line-md:loading-loop"
                    className="inline w-8 h-8"
                  />
                </h3>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Snippets;

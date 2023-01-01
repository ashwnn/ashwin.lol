import Layout from "../components/Layout";
import Container from "../components/Container";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Stats } from "../components/Card";

function Tools() {
  const { data: insights } = useSWRImmutable<any>(
    "/api/insights?span=last_7_days",
    fetcher
  );

  return (
    <Layout>
      <Container>
        <div className="max-w-screen-xl px-6 mx-auto mt-10">
          <Link href="javascript:window.history.back();" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="mb-5 text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Statistics</span>
            </b>
          </h2>
          {insights && (
            <div>
              <p className="text-lg text-gray-500 shine">
                <span>Most Used Language(s): </span>
                {insights.languages
                  .slice(0, 5)
                  .map((lang: any, index: number) => (
                    <>
                      {index > 0 && <span>, </span>}
                      <a
                        key={index}
                        href={`https://www.google.com/search?q=${lang.name}+programming+language`}
                        className="underline decoration-dotted"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {lang.name}
                      </a>
                    </>
                  ))}
              </p>
              <p className="text-lg text-gray-500 shine">
                <span>Recently Starred Repos: </span>
                {insights.github.starred.map((repo: any, index: number) => (
                  <>
                    {index > 0 && <span>, </span>}
                    <a
                      key={index}
                      href={repo.url}
                      className="underline decoration-dotted"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.name}
                    </a>
                  </>
                ))}
              </p>
            </div>
          )}
          {!insights && (
            <div className="py-4">
              <h3 className="font-medium shine">
                <Icon icon="line-md:loading-loop" className="inline w-8 h-8" />
              </h3>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Tools;

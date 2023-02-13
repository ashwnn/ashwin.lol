import Layout from "../components/Layout";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import Link from "next/link";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";

function Instances() {
  const { data: instances } = useSWRImmutable<any>("/api/instances", fetcher);

  return (
    <Layout title="Self-Hosting > Paid">
      <Container>
        <div className="max-w-screen-xl px-3 mx-auto mt-10">
          <Link href="javascript:window.history.back();" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Instances</span>
            </b>
            <span className="ml-2 text-xs">
              Powered by{" "}
              <a className="text-[#b8dbe4]" href="https://pocketbase.io/">
                PocketBase
              </a>
            </span>
          </h2>

          <div className="mt-6 divide-y divide-zinc-800">
            {instances?.data.map((instance: any) => (
              <article key={instance.id} className="py-4">
                <h3 className="font-medium shine">
                  <a
                    href={instance.repository}
                    className="text-zinc-200"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {instance.name}{" "}
                    <span className="text-xs font-normal">
                      ({instance.language})
                    </span>
                  </a>
                </h3>
                <div className="flex items-center mt-1 space-x-2">
                  <span>{instance.description}</span>
                </div>
              </article>
            ))}
            {!instances && (
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

export default Instances;

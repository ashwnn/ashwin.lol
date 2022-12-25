import Layout from "../components/Layout";
import Container from "../components/Container";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ProjectCard } from "../components/Card";

function Projects() {
  const { data: projects } = useSWRImmutable<any>("/api/projects", fetcher);
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
          <h2 className="text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Projects</span>
            </b>
            <span className="ml-2 text-xs">
              Powered by {" "}<a
                className="text-[#b8dbe4]"
                href="https://pocketbase.io/"
              >
                PocketBase
              </a>
            </span>
            <div className="flex float-none mt-3 -mb-2 md:my-0 i md:float-right">
              <Link
                href="https://github.com/xxiz?tab=repositories"
                className="flex items-center justify-center w-full h-full px-3 py-2 text-sm font-medium text-center rounded-lg shadow-md text-zinc-800 bg-blue-300/80 hover:bg-blue-300/90"
              >
                <Icon
                  icon="line-md:external-link"
                  className="inline w-5 h-5 mr-2"
                />
                <span>View All</span>
              </Link>
            </div>
          </h2>
          
          <div className="p-2 my-5 text-center rounded-lg shadow-md text-zinc-800 bg-yellow-300/80">
              <p className="font-normal drop-shadow-lg">
                <span className="mr-2 font-semibold">Notice:</span>
                The data displayed on this page is currently placeholder data, and may not be accurate.
              </p>
            </div>

          <div className="grid gap-4 md:gap-y-5 sm:grid-cols-2">
            {projects?.data.map((project : any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {!projects && (
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

export default Projects;

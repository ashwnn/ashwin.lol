import Container from "@/components/Container";
import Link from "next/link";

export default function ProjectLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Container>
            <div className="max-w-screen-xl px-3 mx-auto mt-10">
                <Link href="/" className="pb-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="inline-block w-5 h-5 mb-5 align-text-top iconify iconify--charm"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m7.25 3.75l-4.5 4.5l4.5 4.5m6-4.5H2.75"
                        ></path>
                    </svg>
                </Link>
                <h2 className="mb-6 text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Projects</span>
            </b>
            <span className="ml-2 text-xs">
              Powered by{" "}
              <a className="text-[#b8dbe4]" href="https://pocketbase.io/">
                PocketBase
              </a>
            </span>
            <div className="flex float-none mt-3 -mb-2 md:my-0 i md:float-right">
              <Link
                href="https://github.com/xxiz?tab=repositories"
                className="flex items-center justify-center w-full h-full px-3 py-2 text-sm font-medium text-center rounded-lg shadow-md text-zinc-800 bg-blue-300/80 hover:bg-blue-300/90"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <span className="ml-1">View All</span>
              </Link>
            </div>
          </h2>
                {children}
            </div>
        </Container>
    );
}

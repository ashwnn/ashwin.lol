import Link from "next/link";

export const metadata = {
    title: "Projects"
}

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-screen-xl px-3 mx-auto mt-10">
            <Link href="/" className="pb-10">
                <svg
                    className="inline-block w-8 h-8 mb-5 align-text-top text-[#bfbfbf] hover:text-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m7.25 3.75l-4.5 4.5l4.5 4.5m6-4.5H2.75"
                    ></path>
                </svg>
            </Link>
            <Link href="/">
                <svg className="inline-block w-8 h-8 ml-2 mb-5 align-text-top text-[#bfbfbf] hover:text-[#fff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path>
                </svg>
            </Link>
            <h2 className="mb-6 text-2xl leading-snug shine">
                <b className="font-medium">
                    <span>Projects</span>
                </b>
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
    );
}

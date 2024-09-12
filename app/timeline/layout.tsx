import Link from "next/link";

export const metadata = {
    title: "Timeline"
}

export default function TimelineLayout({
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
            <svg className="inline-block w-8 h-8 ml-2 mb-5 align-text-top text-[#bfbfbf]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path>
            </svg>
            <h2 className="mb-6 text-2xl leading-snug shine">
                <b className="font-medium">
                    <span>Timeline</span>
                </b>
            </h2>
            {children}
        </div>
    );
}

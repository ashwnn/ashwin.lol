import Link from "next/link";

export default function PostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-screen-xl px-3 mx-auto mt-10">
            <Link href="/" className="pb-10">
                <svg
                    className="inline-block w-8 h-8 mb-5 align-text-top"
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
            <h2 className="mb-6 text-2xl leading-snug shine">
                <b className="font-medium">
                    <span>Posts</span>
                </b>
            </h2>
            {children}
        </div>
    );
}

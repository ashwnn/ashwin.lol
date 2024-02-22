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
                {children}
            </div>
        </Container>
    );
}

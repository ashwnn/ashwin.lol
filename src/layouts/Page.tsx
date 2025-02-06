import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="px-3 w-full max-w-screen-xl mx-auto">
            <Link
                href={`/`}
                className="flex items-center mt-2 text-md font-medium text-gray-100 opacity-70 hover:text-gray-400 transition-colors duration-200"
                passHref
            >
                <svg
                    className="inline mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"
                    ></path>
                </svg>
                <span>Home</span>
            </Link>
            {children}
        </div>
    )
}
import Link from "next/link";

type DisplayCardProps = {
    title: string;
    description: string;
    url: string;
};

function DisplayCard(display: DisplayCardProps) {
    let local = display.url.startsWith("/");

    return (
        <Link
            target={local ? "_self" : "_blank"}
            rel="noopener noreferrer nofollow"
            href={display.url}
            data-umami-event={`View ${display.title} Page`}
            className="relative p-4 duration-150 border rounded-lg text-zinc-300 border-zinc-700 hover:shadow-lg hover:shadow-zinc-600/50 hover:-translate-y-0.5"
        >
            <div>
                <h3 className="mb-2 text-2xl font-semibold">{display.title}</h3>
                <p className="mb-4">{display.description}</p>
            </div>
            <div>
                <span className="absolute top-0 right-0 p-4">
                    {!local && (
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                    )}
                </span>
            </div>
        </Link>
    );
}

export default DisplayCard;

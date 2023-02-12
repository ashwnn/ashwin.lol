import Link from "next/link";

function Bounce({text, href} : {text: string, href: string}) {
    return (
        <Link className="text-blue-500 hover:text-blue-700 hover:underline" target="_blank" rel="noreferrer" href={href}>{text}</Link>
    )
}

export default Bounce;
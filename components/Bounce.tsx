function Bounce({text, href} : {text: string, href: string}) {
    return (
        <a className="text-blue-500 hover:text-blue-700 hover:underline" target="_blank" rel="noreferrer" href={href}>{text}</a>
    )
}

export default Bounce;
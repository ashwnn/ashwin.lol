function Bounce({text, href} : any) {
    return (
        <a className="text-blue-500 hover:text-blue-700 hover:underline" target="_blank" rel="noreferrer" href={href}>{text}</a>
    )
}

export default Bounce;
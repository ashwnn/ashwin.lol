
function Link({href, children} : {href: string, children: React.ReactNode}) {
    return (
        <a className="text-blue-500 hover:text-blue-700 hover:underline" target="_blank" rel="noreferrer" href={href}>{children}</a>
    )
}

export default Link;
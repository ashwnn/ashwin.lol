async function getGists() {
    return await fetch("https://api.github.com/users/xxiz/gists")
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export default async function Snippets() {
    const gists = getGists();
    const [data] = await Promise.all([gists]);

    return (
        <div>
            <h2 className="text-2xl leading-snug shine">
                <b className="font-medium">
                    <span>Snippets</span>
                </b>
            </h2>
            <div className="pt-5 divide-y divide-zinc-800">
                {data.map((gist: any) => (
                    <article key={gist.id} className="py-4">
                        <a
                            href={gist.html_url}
                            className=""
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <h3>
                                {Object.keys(gist.files).map((file: any) => (
                                    <span
                                        key={file}
                                        className="text-lg font-medium text-zinc-200"
                                    >
                                        {file}
                                    </span>
                                ))}
                            </h3>
                            <div>
                                <span className="text-sm">
                                    {gist.description.length > 50
                                        ? gist.description.substring(0, 50) +
                                          "..."
                                        : gist.description}
                                </span>
                            </div>
                        </a>
                    </article>
                ))}
                {!data && <div>Loading...</div>}
            </div>
        </div>
    );
}

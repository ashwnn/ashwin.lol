'use client';
import { GistSkeleton } from "@/components/Skeleton";
import fetcher from "@/util/fetcher";
import useSWR from "swr";

export default function Snippets() {
    const { data: gists } = useSWR<any>("https://api.github.com/users/xxiz/gists", fetcher);

    return (
        <div>
            <h2 className="text-2xl leading-snug shine">
                <b className="font-medium">
                    <span>Snippets</span>
                </b>
            </h2>
            <div className="pt-5 divide-y divide-zinc-800">
                {gists && gists?.length > 0 ? (
                    <>
                    {gists?.map((gist: any) => (
                        <article key={gist.id} className="py-4">
                            <a
                                href={gist.html_url}
                                className=""
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <h3>
                                    {Object.keys(gist.files).map(
                                        (file: any) => (
                                            <span
                                                key={file}
                                                className="text-lg font-medium text-zinc-200"
                                            >
                                                {file}
                                            </span>
                                        )
                                    )}
                                </h3>
                                <div>
                                    <span className="text-sm">
                                        {gist.description.length > 50
                                            ? gist.description.substring(
                                                  0,
                                                  50
                                              ) + "..."
                                            : gist.description}
                                    </span>
                                </div>
                            </a>
                        </article>
                    ))}
                    </>
                ) : (
                    <GistSkeleton />
                )}
                    
            </div>
        </div>
    );
}

async function getTimeline() {
    const res = await fetch(
        "https://pb.bepo.ca/api/collections/timeline/records",
        { cache: "force-cache" }
    ).then((res) => res.json());
    return res.items;
}

export default async function Timeline() {
    const timeline = await getTimeline();
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
        });
    };

    timeline.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div>
            <ol className="relative border-l-4 border-s border-zinc-400">
                {timeline.map((timeline: any) => (
                    <li key={timeline.id} className="mb-8 ms-4 max-w-[800px]">
                        <div className="absolute w-4 h-4 rounded-md -start-[8px] border border-white bg-white mt-0.5"></div>
                        <time className="mb-1 text-xl font-semibold leading-none shine">
                            {formatDate(timeline.date)}
                        </time>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://pb.bepo.ca/api/files/timeline/${timeline.id}/${timeline.cover_image}`}
                            alt={timeline.title}
                            className="w-full h-auto rounded-md my-3"
                        />
                        <h3 className="text-lg font-semibold text-white">
                            {timeline.title}
                        </h3>
                        <div
                            className="mb-4 text-base font-normal text-zinc-400"
                            dangerouslySetInnerHTML={{
                                __html: timeline.content,
                            }}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
}
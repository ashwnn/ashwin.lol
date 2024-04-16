import Image from "next/image";

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
    return (
        <div>
            <ol className="relative border-l-4 border-s border-zinc-400">
                {timeline.reverse().map((timeline: any) => (
                    <li key={timeline.id} className="mb-8 ms-4">
                        <div className="absolute w-3 h-3 rounded-sm -start-[8px] border border-white bg-white"></div>
                        <time className="mb-1 text-sm font-semibold leading-none text-zinc-400">
                            {formatDate(timeline.date)}
                        </time>
                        

                        <h3 className="text-lg font-semibold text-white">
                            {timeline.title}
                        </h3>
                        <div
                            className="mb-4 text-base font-normal text-zinc-400 max-w-[800px]"
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

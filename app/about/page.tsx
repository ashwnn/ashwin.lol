import { format } from "path";

async function getTimeline() {
    const res = await fetch("https://pb.bepo.ca/api/collections/timeline/records", { cache: 'force-cache'}).then((res) => res.json());
 
    return res.items;
}

export default async function About() {
    
    const timeline = await getTimeline();

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(undefined, {
          month: 'long', year: 'numeric'
        });
    };

    return (
        <div>
            <ol className="relative border-s border-zinc-400 border-l-4">
                {timeline.reverse().map((timeline : any) => (
                    <li key={timeline.id} className="mb-8 ms-4">
                        <div className="absolute w-3 h-3 rounded-sm -start-[8px] border border-white bg-white"></div>
                        <time className="mb-1 text-sm leading-none text-zinc-400 font-semibold">
                            {formatDate(timeline.date)}
                        </time>
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

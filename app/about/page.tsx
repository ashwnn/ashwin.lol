import getUnsplashPhotos from "@/util/unsplash";
import Image from "next/image";

async function getTimeline() {
    const res = await fetch(
        "https://pb.bepo.ca/api/collections/timeline/records",
        { cache: "force-cache" }
    ).then((res) => res.json());
    return res.items;
}

async function getPhotos() {
    const res = await fetch("https://api.unsplash.com/users/ashwin?client_id= " + process.env.UNSPLASH_CLIENT_ID, { cache: 'force-cache'}).then((res) => res.json());

    // const photos = res.map((photo: any) => {
    //     return {
    //         id: photo.id,
    //         alt_description: photo.alt_description,
    //         unsplash: photo.links.html,
    //         thumbnail: {
    //             url: photo.urls.small,
    //             width: parseInt(photo.urls.small.match(/w=(\d+)/)[0].replace("w=", "")),
    //             height: Math.round(parseInt(photo.urls.small.match(/w=(\d+)/)[0].replace("w=", "")) / photo.width * photo.height),
    //             quality: parseInt(photo.urls.small.match(/q=(\d+)/)[0].replace("q=", ""))
    //         },
    //         image: {
    //             url: photo.urls.full,
    //             width: photo.width,
    //             height: photo.height,
    //         },
    //         regular: {
    //             url: photo.urls.regular,
    //             width: parseInt(photo.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")),
    //             height: Math.round(parseInt(photo.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")) / photo.width * photo.height),
    //             quality: parseInt(photo.urls.regular.match(/q=(\d+)/)[0].replace("q=", ""))
    //         }
    //     };
    // });

    return res;
}

export default async function About() {
    const timeline = await getTimeline();
    const photos = await getPhotos();

    console.log(photos);

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
                            className="mb-4 text-base font-normal text-zinc-400"
                            dangerouslySetInnerHTML={{
                                __html: timeline.content,
                            }}
                        />
                    </li>
                ))}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* {photos?.data.map(
                        (
                            photo: {
                                alt_description: string;
                                thumbnail: {
                                    url: string;
                                    width: number;
                                    height: number;
                                };
                                unsplash: string;
                            },
                            index: any
                        ) => (
                            <a
                                key={index}
                                href={photo.unsplash}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block p-1.5 w-auto"
                            >
                                <Image
                                    src={photo.thumbnail.url}
                                    alt={photo.alt_description}
                                    width={photo.thumbnail.width}
                                    height={photo.thumbnail.height}
                                    className="items-center inline-block text-center align-middle transition-opacity duration-200 ease-in-out hover:opacity-50 hover:shadow-lg"
                                />
                            </a>
                        )
                    )} */}
                </div>
            </ol>
        </div>
    );
}

type Response = {
    success: boolean;
    data: UnsplashPhoto[];   
}
import type { NextApiRequest, NextApiResponse } from "next";
import { isCacheExpired, cacheData, getCacheByKey } from "../../lib/cache";
import { UnsplashPhoto } from "../../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    let data: UnsplashPhoto[] = [];

    if (isCacheExpired("api_unsplash")) {
        data = await fetch(`https://api.unsplash.com/users/axole/photos?client_id=${process.env.UNSPLASH_CLIENT_ID}&per_page=100`).then((res) => res.json()).then((data) => data);
        cacheData("api_unsplash", data);

    } else {
        data = await getCacheByKey("api_unsplash");
    }

    const photos = data.map((photo: any) => {
        return {
            id: photo.id,
            alt_description: photo.alt_description,
            unsplash: photo.links.html,
            thumbnail: {
                url: photo.urls.small,
                width: parseInt(photo.urls.small.match(/w=(\d+)/)[0].replace("w=", "")),
                height: Math.round(parseInt(photo.urls.small.match(/w=(\d+)/)[0].replace("w=", "")) / photo.width * photo.height),
                quality: parseInt(photo.urls.small.match(/q=(\d+)/)[0].replace("q=", ""))
            },
            image: {
                url: photo.urls.full,
                width: photo.width,
                height: photo.height,
            },
            regular: {
                url: photo.urls.regular,
                width: parseInt(photo.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")),
                height: Math.round(parseInt(photo.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")) / photo.width * photo.height),
                quality: parseInt(photo.urls.regular.match(/q=(\d+)/)[0].replace("q=", ""))
            }
        };
    });


    photos.sort(() => Math.random() - 0.5); // sort random
    photos.sort((a: any, b: any) => {
        return a.regular.width / a.regular.height - b.regular.width / b.regular.height;
    }); // sort by aspect ratio


    return res.status(200).json({
        success: true,
        data: photos,
    });
}

import { Bookmark } from './../../types/index';
type Response = {
    success: boolean;
    data: Bookmark[];
}
import type { NextApiRequest, NextApiResponse } from 'next'

import { getBookmarks } from '../../lib/raindrop'
import { getCacheByKey, isCacheExpired, cacheData } from '../../lib/cache';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {

    let data: Bookmark[] = [];

    if (isCacheExpired("api_bookmarks")) {
        console.log("Cache expired, fetching new data");
        const tools = "29995273"
        const created = new Date();
        data = await getBookmarks(tools, 0, created.toISOString());
        await cacheData({ key: "api_bookmarks", data });
    }
    else {
        console.log("Cache not expired, fetching from cache");
        data = await getCacheByKey("api_bookmarks");
        console.log("Cache data: ", data);
    }


    const bookmarks = data.map((bookmark : Bookmark) => {
        return {
            collectionId: bookmark.collectionId,
            _id: bookmark._id,
            title: bookmark.title,
            excerpt: bookmark.excerpt,
            link: bookmark.link,
            domain: bookmark.domain,
            created: bookmark.created,
            year: bookmark.year,
            tags: bookmark.tags,
            type: bookmark.type,
            cover: bookmark.cover,
        }
    });

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=150"
      );

    return res.status(200).json({
        success: true,
        data: bookmarks
    })
}
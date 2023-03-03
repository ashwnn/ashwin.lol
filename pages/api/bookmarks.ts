import { Bookmark } from './../../types/index';
type Response = {
    success: boolean;
    data: Bookmark[];
}
import type { NextApiRequest, NextApiResponse } from 'next'

import { getBookmarks } from '../../lib/raindrop'
import { cache } from '../../lib/cache';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {

    let data: Bookmark[] = [];

    const cachedData = cache.get<Bookmark[]>('bookmarks');

    if (cachedData) {
        data = cachedData;
    } else {
        const tools = "29995273"
        const created = new Date();
        data = await getBookmarks(tools, 0, created.toISOString());
        cache.set('bookmarks', data);
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
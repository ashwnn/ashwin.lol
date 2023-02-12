import { IBookmark } from './../../types/index';
type Response = {
    success: boolean;
    data: IBookmark[];
}
import type { NextApiRequest, NextApiResponse } from 'next'

import { getBookmarks } from '../../lib/raindrop'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {

    const tools = "29995273"
    const created = new Date();
    const data = await getBookmarks(tools, 0, created.toISOString());

    const bookmarks = data.map((bookmark : IBookmark) => {
        return {
            collectionId: bookmark.collectionId,
            _id: bookmark._id,
            title: bookmark.title,
            excerpt: bookmark.excerpt,
            link: bookmark.link,
            domain: bookmark.domain,
            created: bookmark.created,
            tags: bookmark.tags,
            type: bookmark.type,
            cover: bookmark.cover,
            media: bookmark.media,
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
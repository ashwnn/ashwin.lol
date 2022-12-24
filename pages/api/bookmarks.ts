import type { NextApiRequest, NextApiResponse } from 'next'

import { getBookmarks } from '../../lib/raindrop'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const tools = "29995273"

    const created = new Date();
    const data = await getBookmarks(tools, 0, created.toISOString());

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=150"
      );

    return res.status(200).json({
        success: true,
        data: data
    })
}
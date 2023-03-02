import type { NextApiRequest, NextApiResponse } from "next";

import { isCacheExpired, cacheData, getCacheByKey } from "../../lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: any = [];

  if (isCacheExpired("api_snippets")) {
    data = await fetch("https://api.github.com/users/xxiz/gists")
    .then((res) => res.json())
    .then((data) => data);
    cacheData("api_snippets", data);
  } else {
    data = await getCacheByKey("api_snippets");
  }


    data.map((item: any) => {
        delete item.comments_url;
    });

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=150"
  );

  return res.status(200).json({
    success: true,
    data: data,
  });
}

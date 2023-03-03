import type { NextApiRequest, NextApiResponse } from "next";

import { cache } from "../../lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: any = [];


  const cachedData = cache.get("snippets");

  if (cachedData) {
    data = cachedData;
  } else {
    data = await fetch("https://api.github.com/users/xxiz/gists")
      .then((res) => res.json())
      .then((data) => data);

    cache.set("snippets", data);
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

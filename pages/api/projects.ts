import type { NextApiRequest, NextApiResponse } from "next";

import { cache } from "../../lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let data = null;

  const cachedData = cache.get("projects");

  if (cachedData) {
    data = cachedData;
  } else {
    data = await fetch("https://pb.a7.wtf/api/collections/projects/records").then((res) => res.json()).then((data) => data);

    cache.set("projects", data);
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=500, stale-while-revalidate=250"
  );

  return res.status(200).json({
    success: true,
    data: data.items,
  });
}

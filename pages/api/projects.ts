import type { NextApiRequest, NextApiResponse } from "next";
import { isCacheExpired, getCacheByKey, cacheData } from "../../lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let data = null;

  if (isCacheExpired("api_projects")) {
    data = await fetch("https://pb.a7.wtf/api/collections/projects/records").then((res) => res.json()).then((data) => data);
    cacheData("api_projects", data);
  } else {
    data = await getCacheByKey("api_projects");
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

import type { NextApiRequest, NextApiResponse } from "next";
import { isCacheExpired, cacheData, getCacheByKey } from "../../lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let data : any = [];

  if (isCacheExpired("api_instances")) {
    data = await fetch("https://pb.a7.wtf/api/collections/instances/records").then((res) => res.json()).then((data) => data);
    cacheData("api_instances", data);
  } else {
    data = await getCacheByKey("api_instances");
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

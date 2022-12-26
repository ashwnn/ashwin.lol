import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch("https://pb.a7.wtf/api/collections/instances/records")
    .then((res) => res.json())
    .then((data) => data);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=500, stale-while-revalidate=250"
  );

  return res.status(200).json({
    success: true,
    data: data.items,
  });
}

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch("https://api.github.com/users/xxiz/gists")
    .then((res) => res.json())
    .then((data) => data);


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

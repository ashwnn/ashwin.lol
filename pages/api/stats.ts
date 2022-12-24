import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("https://stats.a7.wtf/");
  const data = await response.json();

  res.status(200).json(data);
}

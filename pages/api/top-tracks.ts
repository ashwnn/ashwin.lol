import type { NextApiRequest, NextApiResponse } from "next";

import { getTopTracks } from "../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getTopTracks();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ success: false });
  }

  const data = await response.json();

  return res.status(200).json({
    success: true,
    tracks: data.items.map((track: any) => ({
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      albumUrl: track.album.images[0].url,
      title: track.name,
      url: track.external_urls.spotify,
    })),
  });
}

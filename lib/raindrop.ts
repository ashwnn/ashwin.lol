import { IBookmark } from "../types";

const perPage = 50;
const client_id = process.env.RAINDROP_CLIENT_ID;
const client_secret = process.env.RAINDROP_CLIENT_SECRET;
const refresh_token = process.env.RAINDROP_REFRESH_TOKEN;
const TOKEN_ENDPOINT = `https://raindrop.io/oauth/access_token`;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

function getEndpoint(collectionId: string, page: number, created: string) {
  return `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page}&search=created:>${created}&sort=-created`;
}

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: client_id,
      client_secret: client_secret,
      refferer: "http://localhost:3000",
    }),
  });
  return response.json();
}

async function getBookmarks(collectionId: string, page: number = 0, created: string): Promise<IBookmark[]> {
  const { access_token } = await getAccessToken();
  const res = await fetch(getEndpoint(collectionId, page, created), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();
  if (data.items.length === perPage) {
    return data.items.concat(
      await getBookmarks(collectionId, page + 1, created)
    );
  } else {
    return data.items;
  }
}

export { getBookmarks };

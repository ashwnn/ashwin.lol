const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    })
    return response.json()
}

async function getNowPlaying() {
    const { access_token } = await getAccessToken()

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

async function getTopTracks() {
    const { access_token } = await getAccessToken()

    return fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

async function getSpotifyData() {
    const response = await getNowPlaying();

    console.log(response)

    if (response.status === 204 || response.status > 400) {
        return { isPlaying: false }
    }

    const song = await response.json();

    if (song.item === null) {
        return { isPlaying: false }
    }

    if (!song.item.is_local) {
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists
            .map((_artist: any) => _artist.name)
            .join(", ");
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        return {
            album,
            albumImageUrl,
            artist,
            isPlaying,
            songUrl,
            title,
        }

    } else {
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists
            .map((_artist: any) => _artist.name)
            .join(", ");
        const album = song.item.album.name;
        const isLocal = true;

        return {
            album,
            artist,
            isPlaying,
            title,
            isLocal
        }
    }
}

export { getSpotifyData }
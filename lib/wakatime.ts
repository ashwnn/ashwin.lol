const client_id = process.env.WAKATIME_CLIENT_ID
const client_secret = process.env.WAKATIME_CLIENT_SECRET
const refresh_token = process.env.WAKATIME_REFRESH_TOKEN!
const redirect_uri = process.env.WAKATIME_REDIRECT_URI

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const ALL_TIME_ENDPOINT = `https://wakatime.com/api/v1/users/current/all_time_since_today`
const WEEK_STATS_ENDPOINT = `https://wakatime.com/api/v1/users/current/stats`
const TOKEN_ENDPOINT = `https://wakatime.com/oauth/token`
const INSIGHT_LANGUAGE_ENDPOINT = `https://wakatime.com/api/v1/users/current/insights/languages/`
const INSIGHT_PROJECT_ENDPOINT = `https://wakatime.com/api/v1/users/current/insights/projects/`


async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: client_id!,
            client_secret: client_secret!,
            redirect_uri: redirect_uri!,
            grant_type: 'refresh_token',
            refresh_token: refresh_token!,
        }),

    })

    const regex = /access_token=([^&]+)/;
    const match = regex.exec(await response.text())!;

    const accessToken = match[1];
    return { access_token: accessToken };

}

async function getAllTime() {
    const { access_token } = await getAccessToken();
    return fetch(ALL_TIME_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

async function getWeekly() {
    const { access_token } = await getAccessToken()

    return fetch(WEEK_STATS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

async function getLanguageInsight(length:  any) {
    const { access_token } = await getAccessToken()
    return fetch(INSIGHT_LANGUAGE_ENDPOINT + length, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

async function getProjectInsight(length : any) {
    const { access_token } = await getAccessToken()
    return fetch(INSIGHT_PROJECT_ENDPOINT + length, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

export { getAllTime, getWeekly, getLanguageInsight, getProjectInsight }

import useSWR from "swr";

function useUmami(event: string) {
    const url = 'https://umami.1m.cx/api/collect/';
    const body = {
        type: 'event',
        payload: {
            event_type: event,
            url: '/',
            website: 'edf4e66f-70e5-44c9-877a-d7cacf96a476',
            hostname: 'ashwin.lol',
        }
    };

    const fetcher = (url: string, body: any) =>
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => res.json());

        const { data: result } = useSWR<any>(url, () => fetcher(url, body));

    return;
}

export default useUmami;
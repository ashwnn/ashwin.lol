import Head from "next/head";

function Header({ title }: { title: string }) {
    return (
        <Head>
            <title>Ashwin — {title}</title>
            <link rel="icon" type="image/x-icon" href="https://safe.1m.cx/Z6G18xQ7.png" />
            <script async defer data-website-id="d4f97cd3-807b-4837-964d-3b6e7525f991" src="https://umami.1m.cx/umami.js" ></script>
        </Head>
    )
}

export default Header;
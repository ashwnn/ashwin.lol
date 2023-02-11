import Head from "next/head";

function Header({ title }: { title: string }) {

    let fullTitle = "Ashwin — " + title;

    return (
        <Head>
            <title>{fullTitle}</title>
            <link rel="icon" type="image/x-icon" href="https://safe.1m.cx/Z6G18xQ7.png" />
            <script async defer data-website-id="edf4e66f-70e5-44c9-877a-d7cacf96a476" src="https://umami.1m.cx/umami.js"></script>
        </Head>
    )
}

export default Header;
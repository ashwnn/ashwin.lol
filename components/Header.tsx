import Head from "next/head";

function Header({ title }: { title: string }) {

    let fullTitle = "Ashwin — " + title;

    return (
        <Head>
            <title>{fullTitle}</title>
            <link rel="icon" type="image/x-icon" href="https://safe.1m.cx/Z6G18xQ7.png" />
        </Head>
    )
}

export default Header;
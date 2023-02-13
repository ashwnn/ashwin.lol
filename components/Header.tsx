import Head from "next/head";

function Header({ title }: { title: string }) {

    let fullTitle = "Ashwin — " + title;

    return (
        <Head>
            <title>{fullTitle}</title>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#18181B" />
            <meta name="description" content="Ashwin is a second year computer science student with a strong understanding of computer science and development. He has a neverending passion for learning and creating new things through technology." />
            <meta name="tite" content={fullTitle} />
            
            {/* Safari/Apple */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#18181B" />
            <meta name="apple-mobile-web-app-title" content="Ashwin" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://ashwin.lol/" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content="Ashwin is a second year computer science student with a strong understanding of computer science and development. He has a neverending passion for learning and creating new things through technology." />
            <meta name="twitter:image" content="" />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:image" content="/favicon.ico" />
            <meta property="og:description" content="Ashwin is a second year computer science student with a strong understanding of computer science and development. He has a neverending passion for learning and creating new things through technology." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ashwin.lol" />

            {/*  */}
        </Head>
    )
}

export default Header;
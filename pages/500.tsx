import Container from "../components/Container"
import { Press_Start_2P } from "@next/font/google"
import Link from "next/link"
import { useEffect } from "react"
import Head from "next/head"

const p2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

function InternalError() {

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                window.location.href = "/";
            }
        });

        let message = `Error: 500\nDescription: Internal Server Error\nURL: ${window.location.href}\nUser Agent: ${navigator.userAgent}\nReferrer: ${document.referrer}\nTimestamp: ${new Date().toLocaleString()}\nPath: ${window.location.pathname}\n`

        fetch(`${process.env.NTFY_SERVER}/website`, {
            method: 'POST',
            headers: {
                'Title': '5XX Error @ ashwin.lol',
                'Priority': 'urgent',
                'Tags': 'warning'
            },
            body: message
        })

    }, []);

    return (
        <Container>
            <Head>
                <title>5XX: Interal Server Error</title>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#18181B" />
                <meta name="description" content="Ashwin is a second year computer science student with a strong understanding of computer science and development. He has a neverending passion for learning and creating new things through technology." />
                <meta name="tite" content="5XX: Interal Server Error" />

                {/* Safari/Apple */}
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#18181B" />
                <meta name="apple-mobile-web-app-title" content="Ashwin" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://ashwin.lol/" />
                <meta name="twitter:title" content="5XX: Interal Server Error" />
                <meta name="twitter:description" content="Ashwin is a second year computer science student with a strong understanding of computer science and development. He has a neverending passion for learning and creating new things through technology." />
                <meta name="twitter:image" content="/banner.png" />

                {/* Open Graph */}
                <meta property="og:title" content="5XX: Interal Server Error" />
                <meta property="og:image" content="/banner.png" />
                <meta property="og:description" content="Ashwin is a second year computer science student with a strong understanding of computer science and development. He has a neverending passion for learning and creating new things through technology." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ashwin.lol" />
            </Head>
            {/* center div horizontally and vertically */}
            <div className={`flex flex-col items-center justify-center h-screen bg-[#0102AC] text-[#ABABAD] ${p2p.className} px-8`}>
                <h1 className="text-4xl font-semibold text-center bg-[#ABABAD]  text-[#0102AC] px-2 py-1">
                    ashwin.lol
                </h1>
                <h2 className="mt-6 text-2xl text-center">
                    5XX: Internal Server Error.
                </h2>
                <div className="items-start max-w-4xl mt-10 leading-loose">
                    <p>
                        An error has occured. To continue:
                    </p>
                    <br />
                    <p>
                        Click <a href="javascript:window.history.back();" className="bg-[#ABABAD] text-[#0102AC] px-2 py-2 hover:bg-white">here</a> to return the previous page, or
                    </p>
                    <br />
                    <p>
                        Click <Link href="/" className="bg-[#ABABAD] text-[#0102AC] px-2 py-2 hover:bg-white">here</Link> to return to the home page. If you do this, you may lose any unsaved information in all open applications.
                    </p>

                    <br />
                    <p>
                        Error: 0E{"  "}:{"  "}016F{"  "}:{"  "}BFF9B3D4
                    </p>
                </div>
                <br /><br />
                <p>Press enter to continue{" "}<span className="blink">_</span></p>
            </div>
        </Container>
    )
}

export default InternalError
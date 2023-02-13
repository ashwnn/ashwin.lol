import Container from "../components/Container"
import { Press_Start_2P } from "@next/font/google"
import Link from "next/link"
import { useEffect } from "react"

const p2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

function NotFound() {

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                window.location.href = "/";
            }
        });
    }, []);
    

    return (
        <Container>
            {/* center div horizontally and vertically */}
            <div className={`flex flex-col items-center justify-center h-screen bg-[#0102AC] text-[#ABABAD] ${p2p.className} px-8`}>
            <h1 className="text-4xl font-semibold text-center bg-[#ABABAD]  text-[#0102AC] px-3 py-1">
                ashwin.lol
            </h1>
            <h2 className="mt-6 text-2xl text-center">
                404: Page Not Found
            </h2>
            <div className="items-start max-w-4xl mt-10 leading-loose">
            <p>
                An error has occured. To continue:
            </p>
            <br />
            <p>
                Click <a href="javascript:window.history.back();" className="bg-[#ABABAD] text-[#0102AC] px-2 py-2">here</a> to return the previous page, or
            </p>
            <br />
            <p>
                Click <Link href="/" className="bg-[#ABABAD] text-[#0102AC] px-2 py-2">here</Link> to return to the home page. If you do this, you may lose any unsaved information in all open applications.
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

export default NotFound
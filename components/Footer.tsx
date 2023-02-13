import Link from "next/link";
import { Icon } from '@iconify/react';

function Footer() {

    return (
        <footer className="bottom-0 w-full px-6 py-4 pt-0 mt-0 text-xs text-center rounded-b-lg">
            <div className="mx-auto mt-10">
                <p className="pt-5 border-t border-t-zinc-800">
                    Licensed under{" "}
                    <Link
                        className="text-gray-400 underline hover:text-gray-200"
                        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                    >
                        CC BY-NC-SA 4.0
                    </Link>
                    {"  /  "}
                    <Link
                        className="text-gray-400 underline hover:text-gray-200"
                        href="https://status.ashwin.lol"
                    >
                        Status
                    </Link>
                </p>
                <p className="block md:inline-block">&copy; Ashwin Charathsandran 2022 - <>{new Date().getFullYear()}</></p> <span className="invisible md:visible md:inline">{" / "}</span> Powered by{" "} <a className="inline-block -mt-0.5 -ml-0.5 align-middle" target="_blank" rel="noreferrer" href="https://nextjs.org/"><Icon className="h-2.5 text-white/50 fill-current hover:text-white" icon="logos:nextjs" /></a>
            </div>
        </footer>
    )
}

export default Footer;
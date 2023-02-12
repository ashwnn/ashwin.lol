import Link from "next/link";

function Footer() {
    return (
        <footer className="px-6 py-4 pt-0 mt-0 text-xs text-center rounded-b-lg">
            <div className="mx-auto mt-10">
                <p>
                    Licensed under{" "}
                    <Link
                        className="text-gray-400 underline hover:text-gray-200"
                        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                    >
                        CC BY-NC-SA 4.0
                    </Link>
                </p>
                <p>&copy; Ashwin Charathsandran 2022 - <>{new Date().getFullYear()}</></p>
            </div>
        </footer>
    )
}

export default Footer;
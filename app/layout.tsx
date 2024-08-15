import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Ashwin C.",
        template: "%s - Ashwin C.",
    },
    description: "A student/developer from Vancouver, Canada.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="icon" href="/favicon.svg" sizes="any" />
            <html lang="en">
                <body
                    className={`flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400 ${inter.className}`}
                >
                    <div className="flex-grow">{children}</div>
                    <Footer />
                </body>
            </html>
        </>
    );
}

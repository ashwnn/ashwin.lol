import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/public/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "a Student/Developer living in Canada",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={`flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400 ${inter.className}`}>
                {children}
            </body>
        </html>
    );
}
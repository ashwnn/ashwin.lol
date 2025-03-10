import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashwin C.",
  description: "Personal website of Ashwin Charathsandran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#222222] text-gray-200 flex flex-col`}>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Script
          src="https://umm.ashwin.lol/script.js"
          data-website-id="cdd6e3c0-1aa1-4a10-83b7-56157157bab8"
          strategy="afterInteractive"
          data-auto-track="true"
          defer
        />
      </body>
    </html>
  );
}
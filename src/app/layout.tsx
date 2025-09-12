import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import Template from "@/components/layout/TransitionTemplate";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
// import ReferralAnimationWrapper from "@/components/referrals/ReferralAnimationWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - Ashwin C.",
  description: "Personal website of Ashwin Charathsandran",
  metadataBase: new URL("https://ashwin.lol"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-[#222222] text-gray-200 flex flex-col relative`}>
        {/* <ReferralAnimationWrapper /> */}
        <Header />
        <Template>
          <main className="flex-1 flex flex-col pt-6">
            {children}
          </main>
        </Template>
        <div className="mt-auto">
          <Footer />
        </div>
        <Script
          src="https://bomboclatt.ashwin.lol/script.js"
          data-website-id="cdd6e3c0-1aa1-4a10-83b7-56157157bab8"
          strategy="afterInteractive"
          data-auto-track="true"
          defer
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
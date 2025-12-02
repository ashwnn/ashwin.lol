import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import Template from "@/components/layout/TransitionTemplate";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import ReferralAnimationWrapper from "@/components/referrals/ReferralAnimationWrapper";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ashwin Charathsandran",
    template: "%s - Ashwin C.",
  },
  description: "Personal website of Ashwin Charathsandran - Cybersecurity Student & Service Desk Analyst.",
  metadataBase: new URL("https://ashwin.lol"),
  keywords: ["Ashwin Charathsandran", "Cybersecurity", "IT", "Service Desk", "BCIT", "Forensics", "Portfolio", "Blog"],
  authors: [{ name: "Ashwin Charathsandran" }],
  creator: "Ashwin Charathsandran",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashwin.lol",
    title: "Ashwin Charathsandran",
    description: "Personal website of Ashwin Charathsandran - Cybersecurity Student & Service Desk Analyst.",
    siteName: "Ashwin Charathsandran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwin Charathsandran",
    description: "Personal website of Ashwin Charathsandran - Cybersecurity Student & Service Desk Analyst.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-[#222222] text-gray-200 flex flex-col relative`}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ReferralAnimationWrapper />
          </Suspense>
          <Header />
          <Template>
            <main className="flex-1 flex flex-col pt-6">
              {children}
            </main>
          </Template>
          <div className="mt-auto">
            <Footer />
          </div>
        </ErrorBoundary>
        <Script
          src="https://bomboclatt.ashwin.lol/script.js"
          data-website-id="cdd6e3c0-1aa1-4a10-83b7-56157157bab8"
          strategy="afterInteractive"
          data-auto-track="true"
          defer
        />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ashwin Charathsandran',
              url: 'https://ashwin.lol',
              sameAs: [
                'https://github.com/ashwnn',
                'https://www.linkedin.com/in/ax2/',
              ],
              jobTitle: 'Service Desk Analyst',
              worksFor: {
                '@type': 'Organization',
                name: 'Tecnet',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
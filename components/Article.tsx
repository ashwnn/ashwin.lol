import Footer from "./Footer";
import { Inter } from '@next/font/google'
import Script from "next/script";
import Head from "next/head";

type LayoutProps = {
    children: React.ReactNode;
    slug: string;
    meta: {
        title?: string;
        tags?: string[];
        author?: string;
        description?: string;
        cover_image?: string;
        date?: string;
        excerpt?: string;
    };
};

const inter = Inter({ subsets: ['latin'] })

function Article({ children, meta }: LayoutProps) {

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#18181B" />
                <meta name="description" content={meta.excerpt} />
                <meta name="tite" content={meta.title} />
                <meta name="language" content="English" />

                {/* Safari/Apple */}
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#18181B" />
                <meta name="apple-mobile-web-app-title" content="Ashwin" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://ashwin.lol/" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.excerpt} />
                <meta name="twitter:image" content={meta.cover_image} />

                {/* Open Graph */}
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.cover_image} />
                <meta property="og:description" content={meta.excerpt} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ashwin.lol" />

                <meta property="article:published_time" content={meta.date} />
                <meta property="article:author" content={meta.author} />

                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="google" content="nositelinkssearchbox" />
                <meta name="google" content="notranslate" />

            </Head>
            <Script async defer data-website-id="edf4e66f-70e5-44c9-877a-d7cacf96a476" src="https://umami.1m.cx/umami.js"></Script>
            <div className={`flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400 ${inter.className}`}>
                {children}
                <Footer />
            </div>
        </>
    );
}

export default Article;

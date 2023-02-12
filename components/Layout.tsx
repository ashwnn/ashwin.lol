import Header from "./Header";
import Footer from "./Footer";
import { Inter } from '@next/font/google'
import Script from "next/script";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const inter = Inter({ subsets: ['latin'] })

function Layout({ children, title }: LayoutProps) {
  
  if (title == undefined) {
    title = "Student/Developer living in Canada";
  }

  return (
    <>
    <Header title={title} />
    <Script async defer data-website-id="edf4e66f-70e5-44c9-877a-d7cacf96a476" src="https://umami.1m.cx/umami.js"></Script>
    <div className={`flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400 ${inter.className}`}>
      {children}
      <Footer /> 
    </div>
    </>
  );
}

export default Layout;

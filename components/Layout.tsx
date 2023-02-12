import Header from "./Header";
import Footer from "./Footer";
import { Inter } from '@next/font/google'

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
    <div className={`flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400 ${inter.className}`}>
      {children}
      <Footer /> 
    </div>
    </>
  );
}

export default Layout;

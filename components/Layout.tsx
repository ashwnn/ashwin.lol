import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

function Layout({ children, title }: LayoutProps) {
  
  if (title == undefined) {
    title = "Student/Developer living in Canada";
  }

  return (
    <>
    <Header title={title} />
    <div className="flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400">
      {children}
      <Footer /> 
    </div>
    </>
  );
}

export default Layout;

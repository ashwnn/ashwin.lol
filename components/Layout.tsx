import Head from "next/head";

function Layout({ children, title }: any) {
  return (
    <>
    <Head>
      <title>Ashwin — {title}</title>
      <link rel="icon" type="image/x-icon" href="https://safe.1m.cx/Z6G18xQ7.png" />
      
    <script async defer data-website-id="d4f97cd3-807b-4837-964d-3b6e7525f991" src="https://umami.1m.cx/umami.js" />
    </Head>
    <div className="flex flex-col min-h-screen antialiased bg-zinc-900 text-zinc-400">
      {children}
      <footer className="px-6 py-4 pt-0 mt-0 text-xs text-center rounded-b-lg">
        <div className="mx-auto mt-10">
          <p>
            Licensed under{" "}
            <a
              className="text-gray-400 underline hover:text-gray-200"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >
                CC BY-NC-SA 4.0
            </a>
          </p>
          <p>&copy; Ashwin Charathsandran 2022 - <>{new Date().getFullYear()}</></p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Layout;

import Head from "next/head";

function Layout({ children }: any) {
  return (
    <>
    <Head>
      <title>Ashwin — Student/Developer</title>
    </Head>
    <div className="flex flex-col min-h-screen antialiased dark:bg-zinc-900 dark:text-zinc-400">
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
          <p>&copy; Ashwin Charathsandran <>{new Date().getFullYear()}</></p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Layout;

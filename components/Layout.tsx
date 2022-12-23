function Layout({ children }: any) {
  return (
    <div className="flex flex-col min-h-screen antialiased bg-white text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
      {children}
      <footer className="px-6 py-4 pt-0 mt-0 text-xs text-center rounded-b-lg">
        <div className="container mx-auto">
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
  );
}

export default Layout;

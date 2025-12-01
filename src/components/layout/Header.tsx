"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navItems = ['Home', 'Blog', 'Projects', 'Snippets', 'About'];

  return (
    <header className="w-full pt-6 pb-4">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            <div className="w-12 h-12 mr-3 rounded-full overflow-hidden">
              <Image
                src="/favicon.png"
                alt="Logo"
                width={48}
                height={48}
                className="transition-transform duration-300"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold shine">Ashwin C.</h1>
              <p className="text-sm text-gray-400">Cybersecurity & IT</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center sm:justify-start gap-1 mt-2 sm:mt-0 border-t border-neutral-800 pt-3 sm:pt-0 sm:border-0">
            {navItems.map((item) => {
              const href = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = pathname === href ||
                (pathname === '/' && item.toLowerCase() === 'home') ||
                (pathname.includes('/blog') && item.toLowerCase() === 'blog');

              return (
                <Link
                  key={item}
                  href={href}
                  className={`
                    ${item === 'Snippets' ? 'hidden sm:inline-block' : ''}
                    px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg
                    relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    ${isActive
                      ? 'text-white bg-neutral-800 shadow-elevation-dark-md scale-[1.02] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:rounded-t-lg'
                      : 'text-gray-400 hover:text-white hover:bg-neutral-800/70 hover:shadow-elevation-dark-md'}
                  `}
                  data-umami-event={`nav_${item.toLowerCase()}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Throttle scroll events to improve performance
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        return; // Skip if we're still in the throttle period
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 100); // Throttle to ~10fps

      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      className={`${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        } group fixed bottom-6 right-6 flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800/30 hover:bg-gray-700/40 rounded-lg transition-all duration-200 shadow-elevation-dark-lg hover:shadow-elevation-dark-xl z-50 backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
      aria-label="Scroll back to top of page"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1 w-4 h-4 transform group-hover:translate-y-[-2px] transition-transform duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 19V5M5 12L12 5L19 12" />
      </svg>
      <span>Top</span>
    </button>
  );
}
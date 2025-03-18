"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } group fixed bottom-6 right-6 flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800/30 hover:bg-gray-700/40 rounded-lg transition-all duration-200 shadow-lg z-50`}
      aria-label="Back to top"
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
      >
        <path d="M12 19V5M5 12L12 5L19 12" />
      </svg>
      <span>Top</span>
    </button>
  );
}
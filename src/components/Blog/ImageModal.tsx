"use client";

import { useEffect } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when modal unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img
          src={src}
          alt={alt || "Image"}
          className="max-w-full max-h-[85vh] object-contain rounded shadow-xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
        />
        <button
          className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
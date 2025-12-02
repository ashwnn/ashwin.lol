"use client";

import { useState } from "react";
import ModernImageModal from "@/components/blog/ModernImageModal";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
}

export default function CustomImage({ src, alt, ...props }: CustomImageProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!src) return null;

    return (
        <>
            <span className="my-6 relative group inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt || ""}
                    {...props}
                    className="w-full rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
                    onClick={() => setIsOpen(true)}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                />
                <span className="absolute bottom-3 right-3 mb-8 bg-black/70 text-white px-2 py-1 rounded text-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to zoom
                </span>
            </span>

            {isOpen && (
                <ModernImageModal
                    src={src}
                    alt={alt || ""}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

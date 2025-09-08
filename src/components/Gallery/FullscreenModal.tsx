'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface FullscreenModalProps {
    image: {
        src: string;
        alt: string;
        thumbnail: string;
    };
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    currentIndex: number;
    totalImages: number;
}

export default function FullscreenModal({
    image,
    isOpen,
    onClose,
    onNext,
    onPrev,
    currentIndex,
    totalImages
}: FullscreenModalProps) {
    const touchStartX = useRef<number>(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
            {/* Main Image Container */}
            <div 
                className="relative flex items-center justify-center w-full h-full p-4 sm:p-8 cursor-zoom-out"
                onClick={onClose}
            >
                <div 
                    className="relative flex items-center justify-center max-w-full max-h-full group"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-contain w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto',
                            height: 'auto',
                        }}
                        priority
                        quality={95}
                    />

                    {/* Close Button - positioned over the image */}
                    <button
                        onClick={onClose}
                        className="absolute z-10 p-2 text-white transition-all duration-200 rounded-full top-2 right-2 sm:top-4 sm:right-4 hover:text-gray-300 sm:p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-80 hover:opacity-100 group-hover:opacity-100"
                        aria-label="Close"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation Buttons - responsive positioning for both horizontal and vertical images */}
                    {totalImages > 1 && (
                        <>
                            {/* Previous Button */}
                            <button
                                onClick={onPrev}
                                className="absolute z-10 p-3 text-white transition-all duration-200 -translate-y-1/2 rounded-full left-2 top-1/2 sm:left-4 hover:text-gray-300 sm:p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-70 hover:opacity-100 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            {/* Next Button */}
                            <button
                                onClick={onNext}
                                className="absolute z-10 p-3 text-white transition-all duration-200 -translate-y-1/2 rounded-full right-2 top-1/2 sm:right-4 hover:text-gray-300 sm:p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-70 hover:opacity-100 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Image Counter - positioned over the image with responsive positioning */}
                    {totalImages > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:bottom-4 text-white text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            {currentIndex + 1} of {totalImages}
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced swipe area for mobile with improved vertical image support */}
            <div 
                className="absolute inset-0 md:hidden"
                onTouchStart={(e) => {
                    const touch = e.touches[0];
                    if (touch) {
                        touchStartX.current = touch.clientX;
                    }
                }}
                onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    if (touch && touchStartX.current) {
                        const diffX = touch.clientX - touchStartX.current;
                        // Increased threshold for better usability with vertical images
                        if (Math.abs(diffX) > 75) {
                            if (diffX > 0) {
                                onPrev();
                            } else {
                                onNext();
                            }
                        }
                    }
                }}
            />
        </div>,
        document.body
    );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { GalleryImageConfig } from '@/types';

// FullscreenModal Component
interface FullscreenModalProps {
    image: GalleryImageConfig;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    currentIndex: number;
    totalImages: number;
}

export const FullscreenModal = ({
    image,
    isOpen,
    onClose,    
    onNext,
    onPrev,
    currentIndex,
    totalImages
}: FullscreenModalProps) => {
    const touchStartX = useRef<number>(0);
    const [isImageLoading, setIsImageLoading] = useState(true);

    // Reset loading state when image changes
    useEffect(() => {
        setIsImageLoading(true);
    }, [image.src]);

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
            <div 
                className="relative flex items-center justify-center w-full h-full p-4 sm:p-8 cursor-zoom-out"
                onClick={onClose}
            >
                <div 
                    className="relative flex items-center justify-center w-full h-full group"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Loading skeleton */}
                        {isImageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Translucent skeleton background */}
                                <div className="absolute inset-8 sm:inset-16 md:inset-24 lg:inset-32 bg-gradient-to-br from-neutral-800/40 via-neutral-700/30 to-neutral-800/40 rounded-lg backdrop-blur-sm animate-pulse">
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer rounded-lg" 
                                         style={{
                                             backgroundSize: '200% 100%',
                                             animation: 'shimmer 2s infinite'
                                         }}
                                    />
                                </div>
                                {/* Loading icon in center */}
                                <div className="relative z-10 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Outer ring */}
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-neutral-700/50 rounded-full" />
                                        {/* Spinning ring */}
                                        <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 border-4 border-transparent border-t-blue-400 border-r-blue-400 rounded-full animate-spin" 
                                             style={{ animationDuration: '1s' }}
                                        />
                                        {/* Center icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="100vw"
                            className={`object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                                isImageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            style={{
                                objectFit: 'contain',
                            }}
                            priority
                            quality={95}
                            onLoad={() => setIsImageLoading(false)}
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute z-10 p-2 text-white transition-all duration-200 rounded-full top-2 right-2 sm:top-4 sm:right-4 hover:text-gray-300 sm:p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-80 hover:opacity-100 group-hover:opacity-100 shadow-elevation-dark-md hover:shadow-elevation-dark-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="Close fullscreen modal"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {totalImages > 1 && (
                        <>
                            <button
                                onClick={onPrev}
                                className="absolute z-10 p-3 text-white transition-all duration-200 -translate-y-1/2 rounded-full left-2 top-1/2 sm:left-4 hover:text-gray-300 sm:p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-70 hover:opacity-100 group-hover:opacity-100 shadow-elevation-dark-md hover:shadow-elevation-dark-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={onNext}
                                className="absolute z-10 p-3 text-white transition-all duration-200 -translate-y-1/2 rounded-full right-2 top-1/2 sm:right-4 hover:text-gray-300 sm:p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-70 hover:opacity-100 group-hover:opacity-100 shadow-elevation-dark-md hover:shadow-elevation-dark-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                    {(image.caption || image.location?.displayText) && (
                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-10 space-y-2">
                            {image.location?.displayText && (
                                <div className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-black/70 backdrop-blur-sm w-fit mx-auto">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{image.location.displayText}</span>
                                </div>
                            )}
                            {image.caption && (
                                <div className="text-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-black/70 backdrop-blur-sm max-w-2xl mx-auto text-center">
                                    <p className="italic">{image.caption}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {totalImages > 1 && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 sm:top-4 text-white text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            {currentIndex + 1} of {totalImages}
                        </div>
                    )}
                </div>
            </div>
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
};

// MasonryImage Component
interface MasonryImageProps {
    src: string;
    alt: string;
    index: number;
    onClick: (index: number) => void;
    location?: {
        displayText: string | null;
        city: string | null;
        sublocation: string | null;
        country: string | null;
    };
}

const MasonryImage = ({ src, alt, index, onClick, location }: MasonryImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
    const [loadError, setLoadError] = useState(false);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        }
        setIsLoaded(true);
    };

    const handleError = () => {
        setLoadError(true);
        setIsLoaded(true);
    };

    return (
        <button
            className="relative overflow-hidden transition-all duration-300 border rounded-lg cursor-pointer group border-neutral-800/50 bg-neutral-900/30 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/20 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 block"
            onClick={() => onClick(index)}
            aria-label={`View ${alt} in fullscreen`}
            title={location?.displayText || undefined}
        >
            {loadError ? (
                <div className="flex items-center justify-center bg-neutral-900 min-h-[200px]">
                    <div className="text-center text-neutral-500">
                        <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs">Failed to load</p>
                    </div>
                </div>
            ) : (
                <>
                    {!isLoaded && (
                        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse min-h-[200px]">
                            <div className="flex items-center justify-center h-full min-h-[200px]">
                                <div className="w-8 h-8 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin" />
                            </div>
                        </div>
                    )}
                    <Image
                        src={src}
                        alt={alt}
                        width={dimensions?.width || 400}
                        height={dimensions?.height || 300}
                        loading="lazy"
                        className={`w-full h-auto object-cover transition-all duration-300 ${
                            isLoaded ? 'opacity-100' : 'opacity-0 absolute'
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleError}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                </>
            )}
            {/* Tooltip that appears on hover */}
            {location?.displayText && (
                <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm rounded-md px-3 py-1.5 text-white text-xs font-medium shadow-lg text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21L12 3l9 18H3z M12 3l-4.5 9h9L12 3z" />
                            </svg>
                            <span className="truncate">{location.displayText}</span>
                        </div>
                    </div>
                </div>
            )}
            {/* Dim overlay on hover */}
            <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/40" />
        </button>
    );
};

// EnhancedMasonryLayout Component
interface EnhancedMasonryLayoutProps {
    images: GalleryImageConfig[];
    onImageClick: (index: number) => void;
}

export function EnhancedMasonryLayout({ images, onImageClick }: EnhancedMasonryLayoutProps) {
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            // Optimized breakpoints for better responsive behavior with larger images
            if (width < 640) setColumns(2);      // Mobile: 1 column
            else if (width < 768) setColumns(3);  // Small tablet: 2 columns
            else if (width < 1024) setColumns(4); // Tablet: 3 columns
            else if (width < 1536) setColumns(3); // Desktop: 3 columns
            else setColumns(3);                   // Large desktop: 4 columns
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    return (
        <div 
            className="w-full"
            style={{
                columnCount: columns,
                columnGap: '1.5rem',
                columnFill: 'balance', // Distribute items evenly
            }}
        >
            {images.map((image, index) => (
                <div 
                    key={image.id || index} 
                    className="mb-6"
                    style={{ 
                        breakInside: 'avoid',
                        pageBreakInside: 'avoid',
                        display: 'block',
                    }}
                >
                    <MasonryImage
                        src={image.thumbnail}
                        alt={image.alt}
                        index={index}
                        onClick={onImageClick}
                        location={image.location}
                    />
                </div>
            ))}
        </div>
    );
}

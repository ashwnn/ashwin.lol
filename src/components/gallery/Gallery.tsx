'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useImageExif } from '@/hooks/useImageExif';
import type { GalleryImage } from '@/types';

// Internal FullscreenModal Component
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

const FullscreenModal = ({
    image,
    isOpen,
    onClose,
    onNext,
    onPrev,
    currentIndex,
    totalImages
}: FullscreenModalProps) => {
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
};

// Internal MasonryImage Component
interface MasonryImageProps {
    src: string;
    alt: string;
    index: number;
    onClick: (index: number) => void;
}

const MasonryImage = ({ src, alt, index, onClick }: MasonryImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setIsLoaded(true);
    };

    return (
        <div
            className="relative overflow-hidden transition-all duration-300 rounded-xl cursor-pointer group 
                border border-neutral-800/50 bg-neutral-900/30 hover:border-neutral-700 
                hover:shadow-xl hover:shadow-black/25 hover:-translate-y-2 hover:scale-[1.02]
                break-inside-avoid mb-4"
            style={{
                aspectRatio: isLoaded && dimensions.width && dimensions.height 
                    ? `${dimensions.width} / ${dimensions.height}` 
                    : '1 / 1'
            }}
            onClick={() => onClick(index)}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={90}
            />
            
            {/* Loading skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/30 to-transparent animate-pulse" />
                </div>
            )}
            
            {/* Hover overlay with gradient */}
            <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100" />
            
            {/* Zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="p-4 transition-all duration-300 transform scale-50 rounded-full bg-white/95 backdrop-blur-sm group-hover:scale-100 shadow-xl">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

// Internal MasonryLayout Component
interface MasonryLayoutProps {
    images: { src: string; alt: string; thumbnail: string }[];
    onImageClick: (index: number) => void;
}

const MasonryLayout = ({ images, onImageClick }: MasonryLayoutProps) => {
    const [columns, setColumns] = useState(4);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 640) setColumns(1);
            else if (width < 768) setColumns(2);
            else if (width < 1024) setColumns(3);
            else if (width < 1280) setColumns(4);
            else if (width < 1536) setColumns(5);
            else setColumns(6);
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
                columnFill: 'auto'
            }}
        >
            {images.map((image, index) => (
                <div 
                    key={index} 
                    className="break-inside-avoid"
                    style={{ breakInside: 'avoid' }}
                >
                    <MasonryImage
                        src={image.thumbnail}
                        alt={image.alt}
                        index={index}
                        onClick={onImageClick}
                    />
                </div>
            ))}
        </div>
    );
};

// Main ImageGallery Component
interface ImageGalleryProps {
    images: GalleryImage[];
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export function ImageGallery({ images, title, isOpen, onClose }: ImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleModalClose = () => {
        setSelectedImageIndex(null);
    };

    const handleNext = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % images.length);
        }
    };

    const handlePrev = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedImageIndex(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-40 flex items-center justify-center mx-auto">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Gallery Modal */}
            <div className="relative z-10 w-full max-w-6xl max-h-[90vh] mx-4 bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="transition-colors text-neutral-400 hover:text-white"
                        aria-label="Close gallery"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Gallery Grid */}
                <div className="p-6 max-h-[calc(90vh-5rem)] overflow-y-auto">
                    {images.length === 0 ? (
                        <div className="py-12 text-center">
                            <div className="mb-4 text-neutral-500">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-neutral-300">No images yet</h3>
                            <p className="text-neutral-500">Images for this interest will appear here soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden border rounded-lg cursor-pointer aspect-square group border-neutral-800 bg-neutral-800/50"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <Image
                                        src={image.thumbnail}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 transition-colors duration-300 bg-black/0 group-hover:bg-black/20" />
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                        <div className="p-2 rounded-full bg-white/90">
                                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            {selectedImageIndex !== null && (
                <FullscreenModal
                    image={images[selectedImageIndex]}
                    isOpen={true}
                    onClose={handleModalClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    currentIndex={selectedImageIndex}
                    totalImages={images.length}
                />
            )}
        </div>,
        document.body
    );
}

// Enhanced MasonryImage with EXIF support
interface EnhancedMasonryImageProps {
    src: string;
    alt: string;
    index: number;
    onClick: (index: number) => void;
}

const EnhancedMasonryImage = ({ src, alt, index, onClick }: EnhancedMasonryImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const { location } = useImageExif(src);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const ratio = img.naturalHeight / img.naturalWidth;
        setAspectRatio(ratio);
        setIsLoaded(true);
    };

    return (
        <div
            className="relative overflow-hidden transition-all duration-300 border rounded-lg cursor-pointer group border-neutral-800/50 bg-neutral-900/30 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1"
            style={{
                aspectRatio: isLoaded ? `1 / ${aspectRatio}` : '1 / 1',
            }}
            onClick={() => onClick(index)}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
            
            {/* Loading skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent animate-shimmer" />
                </div>
            )}
            
            {/* Location overlay - floating at the top */}
            {location?.displayText && (
                <div className="absolute top-2 left-2 right-2 z-10">
                    <div className="bg-black/70 backdrop-blur-sm rounded-md px-2 py-1 text-white text-xs font-medium shadow-lg">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{location.displayText}</span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/30" />
            
            {/* Zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="p-3 transition-transform duration-300 transform scale-75 rounded-full bg-white/95 backdrop-blur-sm group-hover:scale-100">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

// Enhanced MasonryLayout with EXIF support
interface EnhancedMasonryLayoutProps {
    images: { src: string; alt: string; thumbnail: string }[];
    onImageClick: (index: number) => void;
}

export function EnhancedMasonryLayout({ images, onImageClick }: EnhancedMasonryLayoutProps) {
    const [columns, setColumns] = useState(4);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) setColumns(2);
            else if (window.innerWidth < 768) setColumns(3);
            else if (window.innerWidth < 1024) setColumns(4);
            else if (window.innerWidth < 1280) setColumns(5);
            else setColumns(6);
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
                columnGap: '1rem',
                columnFill: 'balance'
            }}
        >
            {images.map((image, index) => (
                <div 
                    key={index} 
                    className="mb-4 break-inside-avoid"
                    style={{ breakInside: 'avoid' }}
                >
                    <EnhancedMasonryImage
                        src={image.thumbnail}
                        alt={image.alt}
                        index={index}
                        onClick={onImageClick}
                    />
                </div>
            ))}
        </div>
    );
}

export { MasonryLayout };

// Export FullscreenModal for backward compatibility
export { FullscreenModal };
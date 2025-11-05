'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { GalleryImage } from '@/types';

// FullscreenModal Component
interface FullscreenModalProps {
    image: GalleryImage;
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
    const [isPlaying, setIsPlaying] = useState(true);
    const [showPlayPause, setShowPlayPause] = useState(false);

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
                    className="relative flex items-center justify-center max-w-full max-h-full group"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (image.mediaType === 'video') {
                            const video = e.currentTarget.querySelector('video');
                            if (video) {
                                if (video.paused) {
                                    video.play();
                                    setIsPlaying(true);
                                } else {
                                    video.pause();
                                    setIsPlaying(false);
                                }
                                setShowPlayPause(true);
                                setTimeout(() => setShowPlayPause(false), 600);
                            }
                        }
                    }}
                >
                    {image.mediaType === 'video' ? (
                        <>
                            <video
                                src={image.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="object-contain w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl cursor-pointer"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                            {showPlayPause && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/70 backdrop-blur-sm rounded-full p-4 animate-fade-in-out">
                                        {isPlaying ? (
                                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
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
                    )}
                    <button
                        onClick={onClose}
                        className="absolute z-10 p-2 text-white transition-all duration-200 rounded-full top-2 right-2 sm:top-4 sm:right-4 hover:text-gray-300 sm:p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-80 hover:opacity-100 group-hover:opacity-100 shadow-elevation-dark-md hover:shadow-elevation-dark-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
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
                                className="absolute z-10 p-3 text-white transition-all duration-200 -translate-y-1/2 rounded-full left-2 top-1/2 sm:left-4 hover:text-gray-300 sm:p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-70 hover:opacity-100 group-hover:opacity-100 shadow-elevation-dark-md hover:shadow-elevation-dark-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={onNext}
                                className="absolute z-10 p-3 text-white transition-all duration-200 -translate-y-1/2 rounded-full right-2 top-1/2 sm:right-4 hover:text-gray-300 sm:p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 opacity-70 hover:opacity-100 group-hover:opacity-100 shadow-elevation-dark-md hover:shadow-elevation-dark-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
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
    mediaType?: 'image' | 'video';
    location?: {
        displayText: string | null;
        city: string | null;
        sublocation: string | null;
        country: string | null;
    };
}

const MasonryImage = ({ src, alt, index, onClick, mediaType = 'image', location }: MasonryImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [loadError, setLoadError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const ratio = img.naturalHeight / img.naturalWidth;
        // Batch state updates
        if (ratio !== aspectRatio || !isLoaded) {
            setAspectRatio(ratio);
            setIsLoaded(true);
        }
    }, [aspectRatio, isLoaded]);

    const handleVideoLoad = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        const ratio = video.videoHeight / video.videoWidth;
        // Batch state updates
        if ((ratio || 1) !== aspectRatio || !isLoaded) {
            setAspectRatio(ratio || 1);
            setIsLoaded(true);
        }
    }, [aspectRatio, isLoaded]);

    const handleError = useCallback(() => {
        if (!loadError || !isLoaded) {
            setLoadError(true);
            setIsLoaded(true);
        }
    }, [loadError, isLoaded]);

    return (
        <button
            className="relative overflow-hidden transition-all duration-300 border rounded-lg cursor-pointer group border-neutral-800/50 bg-neutral-900/30 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            style={{
                aspectRatio: isLoaded ? `1 / ${aspectRatio}` : '1 / 1',
            }}
            onClick={() => onClick(index)}
            aria-label={`View ${alt} in fullscreen`}
        >
            {loadError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                    <div className="text-center text-neutral-500">
                        <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs">Failed to load</p>
                    </div>
                </div>
            ) : mediaType === 'video' ? (
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="metadata"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23171717' width='100' height='100'/%3E%3C/svg%3E"
                    onLoadedData={handleVideoLoad}
                    onError={handleError}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleError}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
            )}
            {!isLoaded && !loadError && (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin" />
                    </div>
                </div>
            )}
            {mediaType === 'video' && isLoaded && (
                <div className="absolute top-2 right-2 z-10 pointer-events-none">
                    <div className="bg-black/70 backdrop-blur-sm rounded-md p-1.5">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </div>
                </div>
            )}
            {location?.displayText && (
                <div className="absolute top-2 left-2 right-2 z-10">
                    <div className="bg-black/70 backdrop-blur-sm rounded-md px-2 py-1 text-white text-xs font-medium shadow-lg">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{location.displayText}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                <div className="p-3 transition-transform duration-300 transform scale-75 rounded-full bg-white/95 backdrop-blur-sm group-hover:scale-100 group-focus:scale-100">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </button>
    );
};

// EnhancedMasonryLayout Component
interface EnhancedMasonryLayoutProps {
    images: GalleryImage[];
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
        
        // Debounce resize event for better performance
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateColumns, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
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
                    <MasonryImage
                        src={image.thumbnail}
                        alt={image.alt}
                        index={index}
                        onClick={onImageClick}
                        mediaType={image.mediaType}
                        location={image.location}
                    />
                </div>
            ))}
        </div>
    );
}

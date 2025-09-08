'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useImageExif } from '@/hooks/useImageExif';

interface MasonryImageProps {
    src: string;
    alt: string;
    index: number;
    onClick: (index: number) => void;
}

const MasonryImage = ({ src, alt, index, onClick }: MasonryImageProps) => {
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

interface MasonryLayoutProps {
    images: { src: string; alt: string; thumbnail: string }[];
    onImageClick: (index: number) => void;
}

export default function MasonryLayout({ images, onImageClick }: MasonryLayoutProps) {
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
}
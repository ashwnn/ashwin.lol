'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

    // Calculate aspect ratio for better layout decisions
    // const aspectRatio = dimensions.width && dimensions.height ? dimensions.width / dimensions.height : 1;
    
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

interface MasonryLayoutProps {
    images: { src: string; alt: string; thumbnail: string }[];
    onImageClick: (index: number) => void;
}

export default function MasonryLayout({ images, onImageClick }: MasonryLayoutProps) {
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
}

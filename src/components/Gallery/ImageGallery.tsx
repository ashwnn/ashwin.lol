'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface GalleryImage {
    src: string;
    alt: string;
    thumbnail: string;
}

interface ImageGalleryProps {
    images: GalleryImage[];
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

const ImageModal = ({ 
    image, 
    isOpen, 
    onClose, 
    onNext, 
    onPrev, 
    currentIndex, 
    totalImages 
}: {
    image: GalleryImage;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    currentIndex: number;
    totalImages: number;
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative z-10 max-w-7xl max-h-[90vh] mx-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-0 text-white transition-colors -top-12 hover:text-neutral-300"
                    aria-label="Close gallery"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Navigation Buttons */}
                {totalImages > 1 && (
                    <>
                        <button
                            onClick={onPrev}
                            className="absolute z-20 p-2 text-white transition-colors -translate-y-1/2 rounded-full left-4 top-1/2 hover:text-neutral-300 bg-black/50 backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={onNext}
                            className="absolute z-20 p-2 text-white transition-colors -translate-y-1/2 rounded-full right-4 top-1/2 hover:text-neutral-300 bg-black/50 backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {totalImages > 1 && (
                    <div className="absolute text-sm text-white -translate-x-1/2 -bottom-12 left-1/2">
                        {currentIndex + 1} of {totalImages}
                    </div>
                )}

                {/* Image */}
                <div className="relative">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        priority
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default function ImageGallery({ images, title, isOpen, onClose }: ImageGalleryProps) {
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

            {/* Image Modal */}
            {selectedImageIndex !== null && (
                <ImageModal
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

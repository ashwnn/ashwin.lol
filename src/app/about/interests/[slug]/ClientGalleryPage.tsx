'use client';

import { useState } from 'react';
import { EnhancedMasonryLayout, FullscreenModal } from '@/components/gallery';
import type { GalleryImageConfig } from '@/types';

interface ClientGalleryPageProps {
    images: GalleryImageConfig[];
    title: string;
}

export default function ClientGalleryPage({ images, title }: ClientGalleryPageProps) {
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

    if (images.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-6 text-neutral-500">
                    <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="mb-3 text-xl font-medium text-neutral-300">No images yet</h3>
                <p className="max-w-md mx-auto text-neutral-500">
                    Images for {title.toLowerCase()} will appear here once you add them to the gallery folder.
                </p>
            </div>
        );
    }

    return (
        <>
            <EnhancedMasonryLayout images={images} onImageClick={handleImageClick} />

            {/* Fullscreen Modal */}
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
        </>
    );
}

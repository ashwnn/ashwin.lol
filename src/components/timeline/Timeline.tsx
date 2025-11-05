'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import type { TimelineItem } from '@/types';
import { categorizeItem } from '@/utils/timeline';
import ImageModal from '@/components/blog/ImageModal';
import { TimelineCard } from './TimelineCard';
import { TimelineFilters } from './TimelineFilters';
import { TimelineHeader } from './TimelineHeader';

// Main Timeline Component
interface TimelineProps {
  data: TimelineItem[];
}

const Timeline = ({ data }: TimelineProps) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Memoize filtered data calculation
    const filteredData = useMemo(() => {
        if (activeFilter === 'all') {
            return data;
        }
        // More efficient: check categories directly without creating array
        return data.filter(item => {
            if (!item.categories) return false;
            return item.categories.includes(activeFilter);
        });
    }, [activeFilter, data]);

    // Memoize image modal handlers
    const openImageModal = useCallback((imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedImage(null);
    }, []);

    // Memoize filter handler
    const handleFilterChange = useCallback((filterKey: string) => {
        setActiveFilter(filterKey);
    }, []);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="mb-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-bold mb-4 lg:mb-0 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                    My Journey
                </h2>
                
                {/* Filter Controls */}
                <TimelineFilters 
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* Timeline Content */}
            <div className="relative">
                {/* Start Marker */}
                <TimelineHeader />

                {/* Desktop Center Line */}
                <div className="absolute left-1/2 top-16 w-0.5 h-[calc(100%-8rem)] bg-blue-500 transform -translate-x-1/2 hidden lg:block z-0">
                </div>

                {/* Mobile Left Line */}
                <div className="absolute left-6 top-16 w-0.5 h-[calc(100%-8rem)] bg-blue-500 lg:hidden z-0">
                </div>

                {/* Timeline Items */}
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {filteredData.map((item, index) => (
                        <div
                            key={`${item.year}-${index}`}
                            className="animate-fade-in-up"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'both'
                            }}
                        >
                            <TimelineCard
                                item={item}
                                index={index}
                                isLast={index === filteredData.length - 1}
                                onImageClick={openImageModal}
                            />
                        </div>
                    ))}
                </div>

                {/* End Marker */}
                <div className="relative mt-8">
                    {/* Desktop End Marker (center-aligned) */}
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-neutral-600 to-neutral-800 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-4 text-sm text-neutral-500">
                            Where it all began
                        </div>
                    </div>
                    
                    {/* Mobile End Marker (left-aligned) */}
                    <div className="flex lg:hidden items-center pl-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-neutral-600 to-neutral-800 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-4 text-sm text-neutral-500">
                            Where it all began
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && selectedImage && (
                <ImageModal
                    src={selectedImage}
                    alt="Timeline Image"
                    onClose={closeModal}
                />
            )}
        </section>
    );
}

export default memo(Timeline);

'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import Image from 'next/image';
import type { TimelineItemConfig } from '@/types';
import { categorizeItem, getTechStack, getCategories } from '@/utils/timeline';
import ImageModal from '@/components/blog/ImageModal';
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, LightningIcon } from '@/components/icons';

// ============================================
// Timeline Configuration
// ============================================

export interface TimelineCategory {
    key: string;
    label: string;
    icon: string;
}

export const TIMELINE_CATEGORIES: TimelineCategory[] = [
    { key: 'all', label: 'All', icon: '🎯' },
    { key: 'development', label: 'Development', icon: '💻' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { key: 'hardware', label: 'Hardware', icon: '⚡' }
];

// Helper function to create timeline items with common defaults
export const createTimelineItem = ({
    year,
    title,
    description,
    image,
    images,
    techStack = [],
    categories = [],
    takeaways = [],
    buttons = []
}: {
    year: string;
    title: string;
    description: string;
    image?: string;
    images?: string[];
    techStack?: string[];
    categories?: string[];
    takeaways?: string[];
    buttons?: Array<{
        label: string;
        url: string;
        icon?: React.ReactNode;
    }>;
}) => ({
    year,
    title,
    description,
    image,
    images,
    techStack,
    categories,
    takeaways,
    buttons
});

// Helper to create button objects
export const createButton = (
    label: string, 
    url: string, 
    icon?: React.ReactNode
) => ({
    label,
    url,
    icon
});

// ============================================
// Timeline Header Component
// ============================================

const TimelineHeader = memo(function TimelineHeader() {
  return (
    <div className="relative flex items-center justify-center mb-8">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30" aria-hidden="true">
        <LightningIcon className="w-4 h-4 text-white" />
      </div>
      <div className="ml-4 text-sm text-neutral-400">
        Current
      </div>
    </div>
  );
});

// ============================================
// Timeline Filters Component
// ============================================

interface TimelineFiltersProps {
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
}

const TimelineFilters = memo(function TimelineFilters({ 
  activeFilter, 
  onFilterChange 
}: TimelineFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIMELINE_CATEGORIES.map((category) => (
        <button
          key={category.key}
          onClick={() => onFilterChange(category.key)}
          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            activeFilter === category.key
              ? 'bg-blue-600 text-white shadow-elevation-dark-md shadow-blue-600/40 scale-[1.02] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:rounded-t-lg'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/30 shadow-elevation-dark-sm hover:shadow-elevation-dark-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0'
          }`}
          aria-label={`Filter by ${category.label}`}
          aria-pressed={activeFilter === category.key}
        >
          <span className="mr-1.5 text-xs" aria-hidden="true">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
});

// ============================================
// Timeline Card Component
// ============================================

interface TimelineCardProps {
  item: TimelineItemConfig;
  index: number;
  isLast: boolean;
  onImageClick: (imageSrc: string) => void;
}

const TimelineCard = memo(function TimelineCard({ 
  item, 
  index, 
  isLast, 
  onImageClick 
}: TimelineCardProps) {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Get all images for the current item
  const allImages = useMemo(() => {
    return item.images || (item.image ? [item.image] : []);
  }, [item]);
  
  // Memoize expensive calculations
  const isEven = useMemo(() => index % 2 === 0, [index]);
  const categories = useMemo(() => getCategories(item), [item]);
  const techStack = useMemo(() => getTechStack(item), [item]);
  
  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentImageIndex]);
  
  // Memoize the image error handler
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Navigate to previous image
  const handlePreviousImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  }, [allImages.length]);

  // Navigate to next image
  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  }, [allImages.length]);

  // Handle image click to open modal
  const handleImageClick = useCallback(() => {
    if (allImages.length > 0) {
      onImageClick(allImages[currentImageIndex]);
    }
  }, [allImages, currentImageIndex, onImageClick]);

  return (
    <div className="relative flex items-center justify-center mb-16 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 w-0.5 h-16 bg-blue-500 transform -translate-x-1/2 hidden lg:block z-0" />
      )}

      {/* Timeline Node */}
      <div className="absolute left-1/2 top-8 w-4 h-4 bg-blue-500 border-2 border-blue-400 rounded-full z-10 transform -translate-x-1/2 shadow-lg shadow-blue-400/20 hidden lg:block">
        <div className="absolute inset-0.5 bg-blue-300 rounded-full opacity-90" />
      </div>

      {/* Card Container */}
      <div className={`w-full lg:w-[calc(75%-1rem)] pl-12 lg:pl-0 ${
        isEven 
          ? 'lg:mr-auto lg:pr-6' 
          : 'lg:ml-auto lg:pl-12'
      }`}>
        {/* Year Badge */}
        <div className={`inline-flex items-center px-3 py-1 mb-4 text-sm font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full ${
          isEven ? 'lg:ml-auto' : ''
        }`}>
          {item.year}
        </div>

        {/* Main Card */}
        <div className="bg-neutral-900 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300 shadow-elevation-dark-lg hover:shadow-elevation-dark-xl hover:scale-[1.01] hover:-translate-y-1 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent before:rounded-t-xl">
          
          {/* Header */}
          <div className={`mb-4 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-left`}>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
              {item.title}
            </h3>
            <div className={`flex flex-wrap gap-1.5 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
              {categories.map((category, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-md"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          {allImages.length > 0 && !imageError && (
            <div className="mb-4 rounded-lg overflow-hidden border border-neutral-800 shadow-lg relative group/image cursor-pointer">
              <div className="relative aspect-video" onClick={handleImageClick}>
                {/* Loading skeleton */}
                {isImageLoading && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse z-[1]" />
                )}
                
                {/* Current visible image */}
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className={`object-cover transition-all duration-300 hover:scale-105 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onError={handleImageError}
                  onLoad={() => setIsImageLoading(false)}
                  priority={index < 3}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                />
                
                {/* Preload adjacent images */}
                {allImages.length > 1 && allImages.map((img, idx) => {
                  if (idx === currentImageIndex) return null;
                  const isAdjacent = Math.abs(idx - currentImageIndex) === 1;
                  return (
                    <Image
                      key={idx}
                      src={img}
                      alt=""
                      fill
                      className="opacity-0 pointer-events-none"
                      priority={isAdjacent}
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                    />
                  );
                })}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-[2]" />
                
                {/* Image Navigation */}
                {allImages.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover/image:opacity-100 focus:opacity-100 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                      aria-label="Previous image"
                    >
                      <ChevronLeftIcon className="w-4 h-4 text-white" />
                    </button>
                    
                    {/* Next Button */}
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover/image:opacity-100 focus:opacity-100 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon className="w-4 h-4 text-white" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="mb-4">
              <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className={`text-neutral-300 leading-relaxed mb-4 text-left ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
            <p className="transition-all duration-300">
              {item.description}
            </p>
          </div>

          {/* External Buttons */}
          {item.buttons && item.buttons.length > 0 && (
            <div className={`flex flex-wrap gap-3 justify-start ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
              {item.buttons.map((button, idx) => (
                <a
                  key={idx}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-elevation-dark-md hover:shadow-elevation-dark-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 group/button relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                  aria-label={`${button.label} - Opens in new tab`}
                >
                  {button.icon && (
                    <span className="mr-2 group-hover/button:translate-y-[-1px] transition-transform" aria-hidden="true">
                      {button.icon}
                    </span>
                  )}
                  {button.label}
                  <ArrowRightIcon className="ml-2 h-3 w-3 group-hover/button:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Timeline (left-aligned) */}
      <div className="absolute left-4 top-8 lg:hidden">
        <div className="w-4 h-4 bg-blue-500 border-2 border-blue-400 rounded-full shadow-lg shadow-blue-400/20">
          <div className="absolute inset-0.5 bg-blue-300 rounded-full opacity-90" />
        </div>
        {!isLast && (
          <div className="absolute left-1/2 top-4 w-0.5 h-16 bg-blue-500 transform -translate-x-1/2" />
        )}
      </div>
    </div>
  );
});

// ============================================
// Main Timeline Component
// ============================================

// Main Timeline Component
interface TimelineProps {
  data: TimelineItemConfig[];
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
        return data.filter(item => categorizeItem(item).includes(activeFilter));
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
                    Journey Thorugh Tech
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
                            Day One
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
                            Day One
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

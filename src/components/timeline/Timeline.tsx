'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import Image from 'next/image';
import { TimelineItem } from '@/types';
import { categorizeItem, calculateTimelineStats, getTechStack, getTakeaways, getCategories } from '@/utils/timeline';
import { timelineCategories, timelineModalTabs } from '@/data/timeline';

// Internal TimelineModal Component
interface TimelineModalProps {
    item: TimelineItem | null;
    isOpen: boolean;
    onClose: () => void;
}

const TimelineModal = memo(function TimelineModal({ item, isOpen, onClose }: TimelineModalProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset image index when item changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [item]);

    // Memoize expensive calculations
    const techStack = useMemo(() => 
        item ? getTechStack(item) : [], 
        [item]
    );
    
    const takeaways = useMemo(() => 
        item ? getTakeaways(item) : [], 
        [item]
    );

    // Get all images for the current item
    const allImages = useMemo(() => {
        return item ? (item.images || (item.image ? [item.image] : [])) : [];
    }, [item]);

    // Memoize tab change handler
    const handleTabChange = useCallback((tabKey: string) => {
        setActiveTab(tabKey);
    }, []);

    // Navigate to previous image
    const handlePreviousImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
    }, [allImages.length]);

    // Navigate to next image
    const handleNextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
    }, [allImages.length]);

    // Add keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (allImages.length <= 1) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePreviousImage();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNextImage();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, allImages.length, handlePreviousImage, handleNextImage]);

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                        <p className="text-blue-400 text-sm mt-1">{item.year}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                    >
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-neutral-800">
                    {timelineModalTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === tab.key
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-neutral-400 hover:text-neutral-300'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {activeTab === 'overview' && (
                        <div>
                            {/* Tech Stack at the top */}
                            {techStack.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {allImages.length > 0 && (
                                <div className="mb-6 rounded-lg overflow-hidden border border-neutral-800 relative group">
                                    <Image
                                        src={allImages[currentImageIndex]}
                                        alt={`${item.title} - Image ${currentImageIndex + 1}`}
                                        width={800}
                                        height={400}
                                        className="object-cover w-full h-auto"
                                    />
                                    
                                    {/* Image Navigation */}
                                    {allImages.length > 1 && (
                                        <>
                                            {/* Previous Button */}
                                            <button
                                                onClick={handlePreviousImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            
                                            {/* Next Button */}
                                            <button
                                                onClick={handleNextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                            
                                            {/* Image Counter */}
                                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                                {currentImageIndex + 1} / {allImages.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            <p className="text-neutral-300 leading-relaxed">{item.description}</p>
                        </div>
                    )}

                    {activeTab === 'takeaways' && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Key Takeaways</h3>
                            {takeaways.length > 0 ? (
                                <div className="space-y-3">
                                    {takeaways.map((takeaway, idx) => (
                                        <div key={idx} className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 mr-3 flex-shrink-0" />
                                            <p className="text-neutral-300">{takeaway}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-neutral-400">No specific takeaways listed for this project.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {item.buttons && item.buttons.length > 0 && (
                    <div className="flex items-center justify-between p-6 border-t border-neutral-800">
                        <div className="text-sm text-neutral-400">
                            Want to learn more?
                        </div>
                        <div className="flex gap-3">
                            {item.buttons.map((button, idx) => (
                                <a
                                    key={idx}
                                    href={button.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200"
                                >
                                    {button.icon && (
                                        <span className="mr-2">{button.icon}</span>
                                    )}
                                    {button.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

// Internal TimelineCard Component
interface TimelineCardProps {
    item: TimelineItem;
    index: number;
    isLast: boolean;
    onOpenModal: () => void;
}

const TimelineCard = memo(function TimelineCard({ item, index, isLast, onOpenModal }: TimelineCardProps) {
    const [imageError, setImageError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Content truncation settings
    const TRUNCATE_LENGTH = 150;

    // Get all images for the current item
    const allImages = useMemo(() => {
        return item.images || (item.image ? [item.image] : []);
    }, [item]);

    // Check if content needs truncation
    const shouldTruncate = useMemo(() => {
        return item.description.length > TRUNCATE_LENGTH;
    }, [item.description]);

    // Get display description with word-aware truncation - still truncate to encourage "View Details"
    const displayDescription = useMemo(() => {
        if (!shouldTruncate) {
            return item.description;
        }
        const truncated = item.description.slice(0, TRUNCATE_LENGTH);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        return truncated.slice(0, lastSpaceIndex) + '...';
    }, [item.description, shouldTruncate]);
    
    // Memoize expensive calculations
    const isEven = useMemo(() => index % 2 === 0, [index]);
    const categories = useMemo(() => getCategories(item), [item]);
    
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

    return (
        <div className="relative flex items-center justify-center mb-16 group">
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-1/2 top-16 w-0.5 h-16 bg-blue-500 transform -translate-x-1/2 hidden lg:block" />
            )}

            {/* Timeline Node */}
            <div className="absolute left-1/2 top-8 w-4 h-4 bg-blue-500 border-2 border-blue-400 rounded-full z-10 transform -translate-x-1/2 shadow-lg shadow-blue-400/20 hidden lg:block">
                <div className="absolute inset-0.5 bg-blue-300 rounded-full opacity-90" />
            </div>

            {/* Card Container - Made wider */}
            <div className={`w-full lg:w-[calc(55%-1rem)] pl-12 lg:pl-0 ${
                isEven 
                    ? 'lg:mr-auto lg:pr-6' 
                    : 'lg:ml-auto lg:pl-6'
            }`}>
                {/* Year Badge */}
                <div className={`inline-flex items-center px-3 py-1 mb-4 text-sm font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full ${
                    isEven ? 'lg:ml-auto' : ''
                }`}>
                    {item.year}
                </div>

                {/* Main Card */}
                <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 group-hover:bg-neutral-900/90">
                    
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

                    {/* Image */}
                    {allImages.length > 0 && !imageError && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-neutral-800 shadow-lg relative group/image">
                            <div className="relative aspect-video">
                                <Image
                                    src={allImages[currentImageIndex]}
                                    alt={`${item.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                
                                {/* Image Navigation */}
                                {allImages.length > 1 && (
                                    <>
                                        {/* Previous Button */}
                                        <button
                                            onClick={handlePreviousImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover/image:opacity-100"
                                        >
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Next Button */}
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover/image:opacity-100"
                                        >
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Image Counter */}
                                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                            {currentImageIndex + 1} / {allImages.length}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className={`text-neutral-300 leading-relaxed mb-4 text-left ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                        <p className={`transition-all duration-300`}>
                            {displayDescription}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex flex-wrap gap-3 justify-start ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        {/* View Details Button */}
                        <button
                            onClick={onOpenModal}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-all duration-200 border border-neutral-700/30"
                        >
                            <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                        </button>
                        
                        {/* External Buttons */}
                        {item.buttons && item.buttons.length > 0 && (
                            <>
                                {item.buttons.map((button, idx) => (
                                    <a
                                        key={idx}
                                        href={button.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group/button"
                                    >
                                        {button.icon && (
                                            <span className="mr-2 group-hover/button:translate-y-[-1px] transition-transform">
                                                {button.icon}
                                            </span>
                                        )}
                                        {button.label}
                                        <svg className="ml-2 h-3 w-3 group-hover/button:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                ))}
                            </>
                        )}
                    </div>
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

// Main Timeline Component
interface TimelineProps {
    data: TimelineItem[];
}

function Timeline({ data }: TimelineProps) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Memoize filtered data calculation
    const filteredData = useMemo(() => {
        if (activeFilter === 'all') {
            return data;
        }
        return data.filter(item => categorizeItem(item).includes(activeFilter));
    }, [activeFilter, data]);

    // Memoize stats calculation
    const timelineStats = useMemo(() => 
        calculateTimelineStats(filteredData), 
        [filteredData]
    );

    // Memoize modal handlers
    const openModal = useCallback((item: TimelineItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedItem(null);
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
                <div className="flex flex-wrap gap-2">
                    {timelineCategories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => handleFilterChange(category.key)}
                            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                activeFilter === category.key
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/30'
                            }`}
                        >
                            <span className="mr-1.5 text-xs">{category.icon}</span>
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{timelineStats.projectCount}</div>
                    <div className="text-xs text-neutral-400">Projects</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{timelineStats.yearSpan}</div>
                    <div className="text-xs text-neutral-400">Years</div>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="relative">
                {/* Start Marker */}
                <div className="relative flex items-center justify-center mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7" />
                        </svg>
                    </div>
                    <div className="ml-4 text-sm text-neutral-400">
                        The journey continues...
                    </div>
                </div>

                {/* Desktop Center Line */}
                <div className="absolute left-1/2 top-16 w-0.5 h-[calc(100%-8rem)] bg-blue-500 transform -translate-x-1/2 hidden lg:block">
                </div>

                {/* Mobile Left Line */}
                <div className="absolute left-6 top-16 w-0.5 h-[calc(100%-8rem)] bg-blue-500 lg:hidden">
                </div>

                {/* Timeline Items */}
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {filteredData.map((item, index) => {
                        const modalHandler = () => openModal(item);
                        return (
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
                                    onOpenModal={modalHandler}
                                />
                            </div>
                        );
                    })}
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

            {/* Modal */}
            <TimelineModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}

export default memo(Timeline);

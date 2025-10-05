// Timeline Configuration
// This file contains all the categories and common configurations for the timeline

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

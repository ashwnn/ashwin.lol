import type { TimelineItemConfig } from '@/types';

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
}): TimelineItemConfig => ({
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

import { TimelineItem } from '@/types';

export function getTechStack(item: TimelineItem): string[] {
    return item.techStack || [];
}

export function getCategories(item: TimelineItem): string[] {
    return item.categories?.map(cat => 
        cat.charAt(0).toUpperCase() + cat.slice(1)
    ) || [];
}

export function categorizeItem(item: TimelineItem): string[] {
    return ['all', ...(item.categories || [])];
}

export function getTakeaways(item: TimelineItem): string[] {
    return item.takeaways || [];
}
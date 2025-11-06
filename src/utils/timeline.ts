import { TimelineItemConfig } from '@/types';

export function getTechStack(item: TimelineItemConfig): string[] {
    return item.techStack || [];
}

export function getCategories(item: TimelineItemConfig): string[] {
    return item.categories?.map(cat => 
        cat.charAt(0).toUpperCase() + cat.slice(1)
    ) || [];
}

export function categorizeItem(item: TimelineItemConfig): string[] {
    return ['all', ...(item.categories || [])];
}

export function getTakeaways(item: TimelineItemConfig): string[] {
    return item.takeaways || [];
}
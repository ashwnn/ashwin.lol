import pb from '@/lib/pocketbase';
import type { GalleryImageConfig, InterestSlug, PocketbaseGalleryRecord } from '@/types';

export async function getInterestImages(interest: string): Promise<GalleryImageConfig[]> {
    try {
        // Fetch images from Pocketbase where category matches the interest
        const records = await pb.collection('gallery').getFullList<PocketbaseGalleryRecord>({
            filter: `category = "${interest}"`,
            sort: '-takenAt', // Sort by date, newest first
        });

        const images: GalleryImageConfig[] = records.map((record) => {
            // Use the direct CDN URL from the image field
            const imageUrl = record.image;
            
            // Determine media type based on file extension
            const isVideo = /\.(mp4|webm|mov)$/i.test(imageUrl);
            
            return {
                id: record.id,
                src: imageUrl,
                alt: record.title || `${interest} ${isVideo ? 'video' : 'image'}`,
                thumbnail: imageUrl,
                title: record.title,
                caption: record.caption,
                category: record.category,
                takenAt: record.takenAt,
                tags: record.tags,
                mediaType: isVideo ? 'video' : 'image',
                location: record.location ? {
                    displayText: record.location,
                    city: null,
                    sublocation: null,
                    country: null,
                } : undefined,
            };
        });

        return images;
    } catch (error) {
        console.error(`Error fetching images for ${interest} from Pocketbase:`, error);
        return [];
    }
}

export const interestSlugs = ['hiking', 'working-out', 'travelling', 'gym'] as const;

export function getInterestDisplayName(slug: InterestSlug): string {
    const displayNames: Record<InterestSlug, string> = {
        'hiking': 'Hiking',
        'working-out': 'Working Out',
        'travelling': 'Travelling',
        'gym': 'Gym'
    };
    return displayNames[slug];
}

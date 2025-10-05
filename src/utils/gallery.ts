import pb from '@/lib/pocketbase';
import type { GalleryImage, InterestSlug, PocketbaseGalleryRecord } from '@/types';

export async function getInterestImages(interest: string): Promise<GalleryImage[]> {
    try {
        // Fetch images from Pocketbase where category matches the interest
        const records = await pb.collection('Gallery').getFullList<PocketbaseGalleryRecord>({
            filter: `category = "${interest}"`,
            sort: '-takenAt', // Sort by date, newest first
        });

        const images: GalleryImage[] = records.map((record) => {
            // Build the full URL for the image
            const imageUrl = pb.files.getUrl(record, record.image);
            
            return {
                id: record.id,
                src: imageUrl,
                alt: record.title || `${interest} image`,
                thumbnail: imageUrl,
                title: record.title,
                caption: record.caption,
                category: record.category,
                takenAt: record.takenAt,
                tags: record.tags,
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

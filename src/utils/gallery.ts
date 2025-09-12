import fs from 'fs';
import path from 'path';
import type { GalleryImage, InterestSlug } from '@/types';

export async function getInterestImages(interest: string): Promise<GalleryImage[]> {
    const imagesDirectory = path.join(process.cwd(), 'public', 'about', 'interests', interest);
    
    try {
        // Check if directory exists
        if (!fs.existsSync(imagesDirectory)) {
            return [];
        }

        const filenames = fs.readdirSync(imagesDirectory);
        
        // Filter for image files
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const imageFiles = filenames.filter(name => 
            imageExtensions.some(ext => name.toLowerCase().endsWith(ext)) && 
            !name.startsWith('.') // Exclude hidden files like .DS_Store
        );

        const images: GalleryImage[] = imageFiles.map((filename) => {
            const imagePath = `/about/interests/${interest}/${filename}`;
            return {
                src: imagePath,
                alt: `${interest} - ${filename.replace(/\.[^/.]+$/, '')}`, // Remove extension for alt text
                thumbnail: imagePath, // For now, use the same image. You could generate thumbnails later
            };
        });

        // Sort images by filename for consistent ordering
        images.sort((a, b) => a.src.localeCompare(b.src));

        return images;
    } catch (error) {
        console.error(`Error reading images from ${imagesDirectory}:`, error);
        return [];
    }
}

export const interestSlugs = ['hiking', 'working-out', 'travelling'] as const;

export function getInterestDisplayName(slug: InterestSlug): string {
    const displayNames: Record<InterestSlug, string> = {
        'hiking': 'Hiking',
        'working-out': 'Working Out',
        'travelling': 'Travelling'
    };
    return displayNames[slug];
}

export async function getImageExifData(imagePath: string): Promise<GalleryImage['location']> {
    try {
        const response = await fetch(`/api/exif?path=${encodeURIComponent(imagePath)}`);
        if (!response.ok) {
            return undefined;
        }
        const data = await response.json();
        return {
            displayText: data.displayText,
            city: data.location.city,
            sublocation: data.location.sublocation,
            country: data.location.country,
        };
    } catch (error) {
        console.error('Error fetching EXIF data:', error);
        return undefined;
    }
}

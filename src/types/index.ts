// Gallery Types
interface GalleryImage {
    id?: string;
    src: string;
    alt: string;
    thumbnail: string;
    title?: string;
    caption?: string;
    category?: string;
    takenAt?: string;
    tags?: string[];
    mediaType?: 'image' | 'video'; // Type of media
    location?: {
        displayText: string | null;
        city: string | null;
        sublocation: string | null;
        country: string | null;
    };
}

interface PocketbaseGalleryRecord {
    id: string;
    title: string;
    category: string;
    caption?: string;
    takenAt: string;
    location?: string;
    tags?: string[];
    image: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
}

// Location Types
interface LocationData {
    displayText: string | null;
    city: string | null;
    sublocation: string | null;
    country: string | null;
}

// Blog Types
interface BlogPost {
    slug: string;
    title: string;
    description?: string;
    cover_image: string;
    tags?: string;
    published_date: Date;
    author?: string;
}

interface PostData {
    title: string;
    description: string;
    date: string;
    author: string;
    cover_image: string;
    tags?: string;
    content: string;
}

// Timeline Types
interface TimelineItem {
    year: string;
    title: string;
    description: string;
    image?: string; // For backward compatibility
    images?: string[]; // New multi-image support
    techStack?: string[];
    takeaways?: string[];
    categories?: string[];
    buttons?: {
        label: string;
        url: string;
        icon?: React.ReactNode;
    }[];
}

// Referral Types
interface ReferralSource {
      id: string;
      name: string;
      message: string;
      icon: string;
      theme: {
        primary: string;
        secondary: string;
        accent: string;
      };
      recommendations: {
        title: string;
        description: string;
        url: string;
        icon: React.ReactNode;
      }[];
      quickActions: {
        label: string;
        url: string;
        type: 'primary' | 'secondary';
        icon: React.ReactNode;
      }[];
      stats?: {
        label: string;
        value: string;
      }[];
}

// GitHub/Gist Types
interface Gist {
    id: string;
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    files: {
        [key: string]: {
            filename: string;
            language: string;
            raw_url: string;
            size: number;
            type: string;
        };
    };
}

// Gallery Interest Types
type InterestSlug = 'hiking' | 'working-out' | 'travelling' | 'gym';

// Next.js Dynamic Route Params Types
// For Next.js 15+ with async params
interface PageParams<T extends Record<string, string> = Record<string, string>> {
    params: Promise<T>;
}

interface BlogPageParams {
    params: Promise<{
        slug: string;
    }>;
}

interface InterestPageParams {
    params: Promise<{
        slug: string;
    }>;
}

export type { 
    GalleryImage,
    PocketbaseGalleryRecord,
    LocationData,
    BlogPost,
    PostData,
    TimelineItem, 
    ReferralSource,
    Gist,
    InterestSlug,
    PageParams,
    BlogPageParams,
    InterestPageParams
};
// ============================================
// Shared Common Types
// ============================================

/**
 * Common button configuration used across components
 * Provides consistent structure for action buttons
 */
export interface ButtonConfig {
  label: string;
  url: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  target?: '_blank' | '_self';
}

/**
 * Common link configuration with optional icon
 */
export interface LinkConfig {
  title: string;
  description: string;
  url: string;
  icon?: React.ReactNode;
}

/**
 * Theme configuration for branded components
 */
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
}

/**
 * Statistics display configuration
 */
export interface StatConfig {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

/**
 * Media type discriminator for images and videos
 */
export type MediaType = 'image' | 'video';

// ============================================
// Gallery Types
// ============================================

export interface LocationConfig {
  displayText: string | null;
  city: string | null;
  sublocation: string | null;
  country: string | null;
}

export interface GalleryImageConfig {
  id?: string;
  src: string;
  alt: string;
  thumbnail: string;
  title?: string;
  caption?: string;
  category?: string;
  takenAt?: string;
  tags?: string[];
  mediaType?: MediaType;
  location?: LocationConfig;
}

export interface PocketbaseGalleryRecord {
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

// ============================================
// Blog Types
// ============================================

export interface BlogPostConfig {
  slug: string;
  title: string;
  description?: string;
  cover_image: string;
  tags?: string;
  published_date: Date;
  author?: string;
}

export interface PostDataConfig {
  title: string;
  description: string;
  date: string;
  author: string;
  cover_image: string;
  tags?: string;
  content: string;
}

// ============================================
// Timeline Types
// ============================================

export interface TimelineItemConfig {
  year: string;
  title: string;
  description: string;
  image?: string; // For backward compatibility
  images?: string[]; // New multi-image support
  techStack?: string[];
  takeaways?: string[];
  categories?: string[];
  buttons?: ButtonConfig[];
}

// ============================================
// Referral Types
// ============================================

export interface ReferralConfig {
  id: string;
  name: string;
  message: string;
  icon: string;
  theme: ThemeConfig;
  recommendations: LinkConfig[];
  quickActions: ButtonConfig[];
  stats?: StatConfig[];
}

// ============================================
// GitHub/Gist Types
// ============================================

export interface GistFileConfig {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  type: string;
}

export interface GistConfig {
  id: string;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  files: {
    [key: string]: GistFileConfig;
  };
}

// ============================================
// Project Types
// ============================================

export interface ProjectConfig {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

// ============================================
// Gallery Interest Types
// ============================================

export type InterestSlug = 'hiking' | 'working-out' | 'travelling' | 'gym';

// ============================================
// Discriminated Union Types for Component Variants
// ============================================

/**
 * Button action types using discriminated union
 * Allows type-safe handling of different button variants
 */
export type ButtonAction =
  | { variant: 'link'; href: string; target?: '_blank' | '_self' }
  | { variant: 'button'; onClick: () => void }
  | { variant: 'submit'; form?: string };

/**
 * Modal types using discriminated union
 */
export type ModalType =
  | { type: 'image'; src: string; alt: string }
  | { type: 'resume'; downloadUrl: string }
  | { type: 'confirmation'; message: string; onConfirm: () => void };

/**
 * Timeline card display variant
 */
export type TimelineCardVariant =
  | { variant: 'detailed'; showTechStack: true; showTakeaways: true }
  | { variant: 'compact'; showTechStack: false; showTakeaways: false };

// ============================================
// Next.js Dynamic Route Params Types
// ============================================

/**
 * Generic page params for Next.js 15+ with async params
 */
export interface PageParams<T extends Record<string, string> = Record<string, string>> {
  params: Promise<T>;
}

export interface BlogPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export interface InterestPageParams {
  params: Promise<{
    slug: string;
  }>;
}

// ============================================
// Legacy Type Aliases (for backward compatibility)
// ============================================

/**
 * @deprecated Use GalleryImageConfig instead
 */
export type GalleryImage = GalleryImageConfig;

/**
 * @deprecated Use LocationConfig instead
 */
export type LocationData = LocationConfig;

/**
 * @deprecated Use BlogPostConfig instead
 */
export type BlogPost = BlogPostConfig;

/**
 * @deprecated Use PostDataConfig instead
 */
export type PostData = PostDataConfig;

/**
 * @deprecated Use TimelineItemConfig instead
 */
export type TimelineItem = TimelineItemConfig;

/**
 * @deprecated Use ReferralConfig instead
 */
export type ReferralSource = ReferralConfig;

/**
 * @deprecated Use GistConfig instead
 */
export type Gist = GistConfig;
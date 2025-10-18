/**
 * Component Props Types
 * 
 * Centralized, consistently-named prop interfaces for all components.
 * Naming convention: {ComponentName}Props
 */

import type { ReactNode, SVGProps } from 'react';
import type { 
  TimelineItem, 
  GalleryImage, 
  ReferralSource,
  ButtonConfig,
  MediaType,
  LocationConfig
} from './index';

// ============================================
// Layout Component Props
// ============================================

export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// ============================================
// Timeline Component Props
// ============================================

export interface TimelineProps {
  data: TimelineItem[];
  initialFilter?: string;
}

export interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isLast: boolean;
  onImageClick: (imageSrc: string) => void;
}

export interface TimelineFiltersProps {
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
}

export interface TimelineHeaderProps {
  className?: string;
}

// ============================================
// Gallery Component Props
// ============================================

export interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: number;
}

export interface MasonryImageProps {
  src: string;
  alt: string;
  index: number;
  onClick: (index: number) => void;
  mediaType?: MediaType;
  location?: LocationConfig;
}

export interface FullscreenModalProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

// ============================================
// Blog Component Props
// ============================================

export interface BlogPostProps {
  slug: string;
  content: string;
}

export interface PostContentProps {
  content: string;
}

export interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface BackToTopProps {
  threshold?: number;
}

// ============================================
// Referral Component Props
// ============================================

export interface ReferralAnimationProps {
  source: ReferralSource;
  onComplete?: () => void;
}

export interface ReferralAnimationWrapperProps {
  className?: string;
}

// ============================================
// Modal Component Props
// ============================================

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl?: string;
  fileName?: string;
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: ReactNode;
}

// ============================================
// UI Component Props
// ============================================

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

export interface ButtonProps extends ButtonConfig {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface SocialsProps {
  className?: string;
  iconSize?: number;
}

// ============================================
// Icon Component Props
// ============================================

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// ============================================
// Error Boundary Props
// ============================================

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// ============================================
// Client Page Props (for Next.js client components)
// ============================================

export interface ClientGalleryPageProps {
  slug: string;
  images: GalleryImage[];
}

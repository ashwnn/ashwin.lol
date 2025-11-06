/**
 * Component Props Types
 * 
 * Centralized, consistently-named prop interfaces for all components.
 * Naming convention: {ComponentName}Props
 */

import type { ReactNode, SVGProps } from 'react';
import type { 
  TimelineItemConfig, 
  GalleryImageConfig, 
  ReferralConfig,
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
  data: TimelineItemConfig[];
  initialFilter?: string;
}

// ============================================
// Gallery Component Props
// ============================================

export interface GalleryProps {
  images: GalleryImageConfig[];
  columns?: 2 | 3 | 4;
  gap?: number;
}

export interface FullscreenModalProps {
  images: GalleryImageConfig[];
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
  source: ReferralConfig;
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
  images: GalleryImageConfig[];
}

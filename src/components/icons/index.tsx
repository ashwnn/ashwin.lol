/**
 * Icon Library
 * 
 * Centralized SVG icon components to eliminate duplication across the codebase.
 * All icons accept className prop for styling and aria-hidden by default.
 */

import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// ============================================
// Navigation & UI Icons
// ============================================

export const ChevronLeftIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
);

export const ChevronRightIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ArrowUpIcon = ({ className = "w-5 h-5", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-3 h-3", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// ============================================
// Location & Map Icons
// ============================================

export const LocationIcon = ({ className = "w-4 h-4", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// ============================================
// Media Icons
// ============================================

export const PlayIcon = ({ className = "w-12 h-12", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
    {...props}
  >
    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
  </svg>
);

export const PauseIcon = ({ className = "w-12 h-12", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
  </svg>
);

// ============================================
// Status & Alert Icons
// ============================================

export const ErrorIcon = ({ className = "w-12 h-12", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LightningIcon = ({ className = "w-4 h-4", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7" />
  </svg>
);

// ============================================
// Social Media Icons
// ============================================

export const GitHubIcon = ({ className = "h-8 w-8", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const LinkedInIcon = ({ className = "h-8 w-8", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const TwitterIcon = ({ className = "h-8 w-8", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const RedditIcon = ({ className = "h-8 w-8", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

export const DocumentIcon = ({ className = "h-8 w-8", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

// ============================================
// Timeline/Tech Icons
// ============================================

export const BoltIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const ServerIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

export const CodeIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const CloudIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

export const ChipIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

export const LockIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const AdjustmentsIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

export const TerminalIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const BookIcon = ({ className = "w-6 h-6", size, ...props }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

// Export all icons as a named collection
export const Icons = {
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  Close: CloseIcon,
  ArrowUp: ArrowUpIcon,
  ArrowRight: ArrowRightIcon,
  Search: SearchIcon,
  Location: LocationIcon,
  Play: PlayIcon,
  Pause: PauseIcon,
  Error: ErrorIcon,
  Lightning: LightningIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Twitter: TwitterIcon,
  Reddit: RedditIcon,
  Document: DocumentIcon,
  Bolt: BoltIcon,
  Server: ServerIcon,
  Code: CodeIcon,
  Cloud: CloudIcon,
  Chip: ChipIcon,
  Lock: LockIcon,
  Adjustments: AdjustmentsIcon,
  Terminal: TerminalIcon,
  Book: BookIcon,
};

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

interface StyledLinkProps extends Omit<LinkProps, 'href'>, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: LinkProps['href'] | AnchorHTMLAttributes<HTMLAnchorElement>['href']
  styled?: boolean
}

const StyledLink = ({ href, styled = true, className = '', ...rest }: StyledLinkProps) => {
  const isInternalLink = typeof href === 'string' && href.startsWith('/')
  const isAnchorLink = typeof href === 'string' && href.startsWith('#')
  
  const styledClasses = styled 
    ? 'text-blue-500 no-underline transition-all duration-200 ease-in-out border-b border-dotted border-blue-500/40 pb-px hover:text-blue-400 hover:border-solid hover:border-blue-400/80'
    : ''
  
  const combinedClasses = `break-words ${styledClasses} ${className}`.trim()

  if (isInternalLink) {
    return <Link className={combinedClasses} href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a 
      className={combinedClasses} 
      href={typeof href === 'string' ? href : undefined} 
      onClick={(e) => {
        e.preventDefault()
        // Extract target ID, handling both with and without hash
        const targetId = typeof href === 'string' ? 
          href.startsWith('#') ? href.substring(1) : href : '';
        
        // Try to find the element - React Markdown might generate different IDs
        let targetElement = document.getElementById(targetId);
        
        // If not found, try with GitHub-style slugified ID (common in markdown processors)
        if (!targetElement) {
          // Try lowercase version (some markdown processors convert to lowercase)
          targetElement = document.getElementById(targetId.toLowerCase());
        }
        
        // If still not found, try to find headers with matching text content
        if (!targetElement) {
          const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headers.forEach((header) => {
            if (header.textContent && 
                header.textContent.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') === targetId.toLowerCase()) {
              targetElement = header as HTMLElement;
            }
          });
        }
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }}
      {...rest} 
    />
  }

  return (
    <a 
      className={combinedClasses} 
      target="_blank" 
      rel="noopener noreferrer" 
      href={typeof href === 'string' ? href : undefined} 
      {...rest} 
    />
  )
}

export default StyledLink
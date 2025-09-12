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
        const targetId = typeof href === 'string' ?
          href.startsWith('#') ? href.substring(1) : href : '';

        let targetElement = document.getElementById(targetId);

        if (!targetElement) {
          targetElement = document.getElementById(targetId.toLowerCase());
        }

        if (!targetElement) {
          const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

          const normalizeText = (text: string) => {
            return text
              .toLowerCase()
              .replace(/[\s_:&,;.?!'"()\[\]]+/g, '-') // Replace common punctuation and whitespace with hyphens
              .replace(/--+/g, '-')                   // Replace multiple hyphens with single hyphen
              .replace(/^-+|-+$/g, '')                // Remove leading and trailing hyphens
              .replace(/[^\w-]/g, '');                // Remove any remaining non-alphanumeric chars except hyphens
          };

          const normalizedTargetId = normalizeText(targetId);
          headers.forEach((header) => {
            if (header.textContent) {
              const normalizedHeader = normalizeText(header.textContent);

              if (normalizedHeader === normalizedTargetId) {
                targetElement = header as HTMLElement;
              }

              // Also check if the header has an id attribute that matches
              const headerId = header.getAttribute('id');
              if (headerId && (headerId === targetId || normalizeText(headerId) === normalizedTargetId)) {
                targetElement = header as HTMLElement;
              }
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
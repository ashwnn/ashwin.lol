'use client';

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnchorLink({ href, children, className }: AnchorLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
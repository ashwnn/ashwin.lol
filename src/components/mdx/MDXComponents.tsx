import Link from "next/link";
import CustomImage from "./CustomImage";

const MDXComponents = {
    img: CustomImage,
    // code: CodeBlock, // Removed as rehype-pretty-code handles it
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        if (!href) return <a {...props}>{children}</a>;
        // Check if external link
        const isExternal = href.startsWith("http");
        if (isExternal) {
            return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500" {...props}>{children}</a>;
        }
        return (
            <Link href={href} className="text-blue-500" {...props}>
                {children}
            </Link>
        );
    },
};

export default MDXComponents;


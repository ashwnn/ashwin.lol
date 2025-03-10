export default function BlogPostLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12">
        {children}
      </div>
    );
  }
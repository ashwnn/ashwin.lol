import Template from "@/components/layout/TransitionTemplate";

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0">
      <Template>
        {children}
      </Template>
    </div>
  );
}
function BlogCardSkeleton() {
    return (
        <div className="flex flex-col border rounded-xl border-zinc-700 overflow-hidden">
            <div className="animate-pulse">
                <div className="h-48 bg-gray-500 rounded-t-xl animate-shimmer"></div>
                <div className="flex-grow p-6 space-y-4">
                    <div className="h-6 bg-gray-500 rounded animate-shimmer"></div>
                    <div className="h-4 bg-gray-500 rounded animate-shimmer"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-500 rounded w-3/4 animate-shimmer"></div>
                        <div className="h-4 bg-gray-500 rounded w-1/2 animate-shimmer"></div>
                    </div>
                    <div className="flex justify-end">
                        <div className="h-4 w-24 bg-gray-500 rounded animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectCardSkeleton() {
    return (
        <div className="overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg bg-zinc-800 text-zinc-300">
          <div className="p-4 animate-pulse">
            <div className="h-6 bg-zinc-700 rounded-md mb-2"></div> {/* Title */}
            <div className="h-4 bg-zinc-700 rounded mb-2"></div> {/* Description */}
            <div className="flex items-center justify-start mb-3 space-x-3">
              {/* Placeholder for links */}
              <div className="h-4 bg-blue-500 w-24 rounded"></div>
              <div className="h-4 bg-green-500 w-24 rounded"></div>
              <div className="h-4 bg-zinc-200 w-24 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-1 mb-1">
              {/* Tags placeholder */}
              <div className="h-4 bg-gray-200 w-16 rounded-md"></div>
              <div className="h-4 bg-gray-200 w-12 rounded-md"></div>
              <div className="h-4 bg-gray-200 w-8 rounded-md"></div>
            </div>
          </div>
          <div className="p-2 bg-zinc-700">
            <div className="h-4 bg-zinc-600 rounded-md w-32 mx-auto"></div> {/* Dates */}
          </div>
        </div>
      );
}

function GistSkeleton() {
  return (
    <article className="py-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-6 bg-zinc-700 rounded w-3/4"></div> {/* Placeholder for the filename */}
        <div className="h-4 bg-zinc-700 rounded w-full"></div> {/* Placeholder for the description */}
      </div>
    </article>
  )
}

export { BlogCardSkeleton, ProjectCardSkeleton, GistSkeleton };

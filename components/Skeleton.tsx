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
        <div className="border rounded-sm border-zinc-700 shadow-md shadow-zinc-600 animate-pulse">
            <div className="p-4 bg-zinc-800">
                <div className="h-6 bg-zinc-700 rounded-md w-3/4 mb-4"></div>{" "}
                {/* Title placeholder */}
                <div className="h-4 bg-zinc-700 rounded-md w-full mb-3"></div>{" "}
                {/* Description placeholder */}
                <div className="flex space-x-3 mb-3">
                    <div className="h-4 bg-zinc-700 rounded-md w-20"></div>{" "}
                    {/* Case study link placeholder */}
                    <div className="h-4 bg-zinc-700 rounded-md w-20"></div>{" "}
                    {/* Demo link placeholder */}
                    <div className="h-4 bg-zinc-700 rounded-md w-20"></div>{" "}
                    {/* Code link placeholder */}
                </div>
                <div className="flex flex-wrap">
                    <div className="h-4 bg-zinc-700 rounded-md w-12 mr-2 mb-2"></div>{" "}
                    {/* Tag placeholder */}
                    <div className="h-4 bg-zinc-700 rounded-md w-12 mr-2 mb-2"></div>{" "}
                    {/* Tag placeholder */}
                    <div className="h-4 bg-zinc-700 rounded-md w-12 mr-2 mb-2"></div>{" "}
                    {/* Tag placeholder */}
                </div>
            </div>
            <div className="pb-2 px-2 text-md font-medium text-right text-gray-300 bg-zinc-800">
                <div className="h-4 bg-zinc-700 rounded-md w-24 inline-block mr-2"></div>{" "}
                {/* Start date placeholder */}
                <div className="h-4 bg-zinc-700 rounded-md w-24 inline-block"></div>{" "}
                {/* End date placeholder */}
            </div>
        </div>
    );
}

function GistSkeleton() {
    return (
        <article className="py-4 animate-pulse">
            <div className="space-y-2">
                <div className="h-6 bg-zinc-700 rounded w-3/4"></div>{" "}
                {/* Placeholder for the filename */}
                <div className="h-4 bg-zinc-700 rounded w-full"></div>{" "}
                {/* Placeholder for the description */}
            </div>
        </article>
    );
}

export { BlogCardSkeleton, ProjectCardSkeleton, GistSkeleton };

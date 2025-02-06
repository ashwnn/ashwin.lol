export default function BlogCardSkeleton() {
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
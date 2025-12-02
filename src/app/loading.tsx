export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-zinc-700 rounded-full opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    )
}

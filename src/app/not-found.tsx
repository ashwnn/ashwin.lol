import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-400 max-w-md mb-8">
        Oops! It seems like you&#39;ve ventured into uncharted territory. The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Link 
        href="/" 
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-all duration-200 px-5 py-3 rounded-lg text-gray-200 group shadow-elevation-dark-md hover:shadow-elevation-dark-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:rounded-t-lg"
      >
        <svg
          className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
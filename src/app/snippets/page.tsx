import { Metadata } from 'next';
import type { Gist } from '@/types';

export const metadata: Metadata = {
  title: 'Snippets - Ashwin',
  description: 'Code snippets and gists from my GitHub.',
  openGraph: {
    title: 'Snippets - Ashwin',
    description: 'Code snippets and gists from my GitHub.',
    type: 'website',
  },
};

async function getGists(): Promise<Gist[]> {
  const response = await fetch('https://api.github.com/users/ashwnn/gists', {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gists');
  }

  return response.json();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-200 text-yellow-800',
    TypeScript: 'bg-blue-200 text-blue-800',
    Python: 'bg-green-200 text-green-800',
    Java: 'bg-orange-200 text-orange-800',
    HTML: 'bg-red-200 text-red-800',
    CSS: 'bg-purple-200 text-purple-800',
    Shell: 'bg-gray-200 text-gray-800',
    Go: 'bg-cyan-200 text-cyan-800',
    Rust: 'bg-amber-200 text-amber-800',
  };

  return colors[language] || 'bg-gray-200 text-gray-800';
}

export default async function SnippetsPage() {
  const gists = await getGists();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Snippets</h1>
      <p className="text-neutral-400 mb-8">A collection of useful code snippets and gists that I&apos;ve created and shared.</p>

      <div className="grid grid-cols-1 gap-2">
        {gists.map((gist) => {
          const files = Object.values(gist.files);
          const mainFile = files[0];
          const fileCount = files.length;

          return (
            <a
              href={gist.html_url}
              key={gist.id}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 transition-all duration-300 hover:border-neutral-700 shadow-elevation-dark-lg hover:shadow-elevation-dark-xl hover:scale-[1.01] hover:-translate-y-1 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent before:rounded-t-xl before:z-10"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {mainFile.filename}
                    </h2>
                    {gist.description && (
                      <p className="text-sm text-neutral-400 mt-1">{gist.description}</p>
                    )}
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-full ${getLanguageColor(mainFile.language)}`}>
                    {mainFile.language}
                  </span>
                </div>

                <div className="flex items-center mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Updated {formatDate(gist.updated_at)}</span>
                  </div>

                  {fileCount > 1 && (
                    <div className="ml-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{fileCount} files</span>
                    </div>
                  )}

                  <div className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {gists.length === 0 && (
          <div className="text-center py-12 border border-neutral-800 rounded-xl bg-neutral-900/80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-neutral-400">No snippets found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
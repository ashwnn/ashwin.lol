import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInterestImages, interestSlugs, getInterestDisplayName } from '@/utils/gallery';
import type { InterestSlug, InterestPageParams } from '@/types';
import ClientGalleryPage from './ClientGalleryPage';

export async function generateStaticParams() {
    return interestSlugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: InterestPageParams): Promise<Metadata> {
    const { slug } = await params;
    const typedSlug = slug as InterestSlug;

    if (!interestSlugs.includes(typedSlug)) {
        return {
            title: 'Interest Not Found - Ashwin C.',
        };
    }

    const displayName = getInterestDisplayName(typedSlug);

    return {
        title: `${displayName} Gallery - Ashwin C.`,
        description: `Browse photos from my ${displayName.toLowerCase()} adventures and experiences.`,
        openGraph: {
            title: `${displayName} Gallery - Ashwin C.`,
            description: `Browse photos from my ${displayName.toLowerCase()} adventures and experiences.`,
            images: [
                {
                    url: '/memoji-wide.png',
                    width: 2000,
                    height: 1000,
                    alt: 'Ashwin Charathsandran',
                },
            ],
        },
    };
}

export default async function InterestGalleryPage({ params }: InterestPageParams) {
    const { slug } = await params;
    const typedSlug = slug as InterestSlug;

    if (!interestSlugs.includes(typedSlug)) {
        notFound();
    }

    const images = await getInterestImages(typedSlug);
    const displayName = getInterestDisplayName(typedSlug);

    return (
        <div className="max-w-3xl mx-auto px-4 md:px-0">
            <a
                href={`/about`}
                className="group flex items-center px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-all duration-200 shadow-sm shadow-black/20 border border-neutral-700/30 w-fit"
            >
                <svg
                    className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
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
                <span>Back to about</span>
            </a>

            <div className="my-5">
                <h1 className="text-3xl font-bold text-gray-100">{displayName} Gallery</h1>
                <p className="mt-2 text-gray-400">
                    {images.length === 0
                        ? `No photos available yet for ${displayName.toLowerCase()}.`
                        : `Browse through ${images.length} photo${images.length === 1 ? '' : 's'} from my ${displayName.toLowerCase()} adventures.`
                    }
                </p>
            </div>

            <div className="mt-8">
                <ClientGalleryPage images={images} title={displayName} />
            </div>
        </div>
    );
}

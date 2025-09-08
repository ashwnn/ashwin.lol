import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getInterestImages, interestSlugs, getInterestDisplayName, type InterestSlug } from '@/utils/gallery';
import ClientGalleryPage from './ClientGalleryPage';

export async function generateStaticParams() {
    return interestSlugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function InterestGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const typedSlug = slug as InterestSlug;
    
    if (!interestSlugs.includes(typedSlug)) {
        notFound();
    }

    const images = await getInterestImages(typedSlug);
    const displayName = getInterestDisplayName(typedSlug);

    return (
        <div className="w-full py-8 px-4 md:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto">
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-neutral-400">
                        <li>
                            <Link href="/about" className="hover:text-neutral-300 transition-colors">
                                About
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="text-neutral-300">{displayName}</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{displayName} Gallery</h1>
                    <p className="text-neutral-400">
                        {images.length === 0 
                            ? `No photos available yet for ${displayName.toLowerCase()}.`
                            : `Browse through ${images.length} photo${images.length === 1 ? '' : 's'} from my ${displayName.toLowerCase()} adventures.`
                        }
                    </p>
                </div>
            </div>

            {/* Gallery - Full Width */}
            <div className="max-w-7xl mx-auto">
                <ClientGalleryPage images={images} title={displayName} />
            </div>
        </div>
    );
}

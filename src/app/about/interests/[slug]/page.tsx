import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getInterestImages, interestSlugs, getInterestDisplayName } from '@/utils/gallery';
import type { InterestSlug, InterestPageParams } from '@/types';
import { ChevronRightIcon } from '@/components/icons';
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
            <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-neutral-400">
                    <li>
                        <Link href="/about" className="hover:text-neutral-300 transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <ChevronRightIcon className="w-4 h-4" />
                    </li>
                    <li className="text-neutral-300">{displayName}</li>
                </ol>
            </nav>

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

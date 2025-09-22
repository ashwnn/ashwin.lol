import { Metadata } from 'next';
import { data as TimelineData } from '@/data/timeline';
import { interests } from '@/data/interests';
import Socials from '@/components/ui/Socials';
import { Timeline } from '@/components/timeline';

export const metadata: Metadata = {
    title: 'About - Ashwin C.',
    description: 'Learn more about Ashwin C. - student, developer, and tech enthusiast.',
    openGraph: {
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

export default function AboutPage() {

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
            <section className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Ashwin Charathsandran</h2>
                        <p className="text-neutral-400 mb-4">Student, Developer & Tech Enthusiast</p>
                        <p className="text-neutral-300">
                            I&apos;m a computer science student who discovered a passion for cybersecurity, dedicated to building software that addresses real-world challenges. My interests range from web development to machine learning, with a strong emphasis on crafting elegant solutions through clean, efficient code.
                        </p>
                    </div>
                </div>
            </section>

            <section className='mb-8'>
                <Socials />
            </section>


            <section className="mb-8">
                <h2 className="text-xl font-bold mb-2 pb-2 border-b border-neutral-800">Beyond The Computer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {interests.map((interest, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-3 border border-neutral-800 rounded-xl bg-neutral-900/70">
                            {interest.icon}
                            <h3 className="font-medium mb-2">{interest.title}</h3>
                            <p className="text-sm text-neutral-400 mb-4">{interest.description}</p>

                            <a
                                href={interest.link}
                                className="w-full mt-auto inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300
                                hover:bg-neutral-700 hover:text-white transition-all duration-200
                                border border-neutral-700/30"
                            >
                                View Gallery
                                <svg className="ml-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <Timeline data={TimelineData} />
        </div>
    );
}
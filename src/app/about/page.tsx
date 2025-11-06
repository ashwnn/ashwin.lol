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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {interests.map((interest, idx) => (
                        <a
                            key={idx}
                            href={interest.link}
                            className="group flex flex-col items-center justify-center text-center p-6 border border-neutral-800 rounded-xl bg-neutral-900/70 hover:bg-neutral-800/70 hover:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 min-w-[160px] max-w-[180px]"
                        >
                            <div className="mb-3 transform transition-transform duration-300 group-hover:scale-110">
                                {interest.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">{interest.title}</h3>
                        </a>
                    ))}
                </div>
            </section>

            <Timeline data={TimelineData} />
        </div>
    );
}
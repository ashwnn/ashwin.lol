import { Metadata } from 'next';
import Image from 'next/image';
import { data as TimelineData } from '@/data/timeline';
import Socials from '@/components/Socials';

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
                    {[
                        {
                            title: 'Working Out',
                            description: 'Weightlifting and calisthenics to stay active and healthy.',
                            link: '#',
                            icon: (
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 485.535 485.535"
                                    className="h-8 w-8 mb-3 text-neutral-400"
                                    fill="currentColor"
                                    xmlSpace="preserve">
                                    <g>
                                        <g id="_x35__13_">
                                            <g>
                                                <path d="M55.465,123.228c-15.547,0-28.159,12.608-28.159,28.161v56.673C11.653,211.908,0,225.928,0,242.765 c0,16.842,11.652,30.861,27.306,34.707v56.666c0,15.555,12.612,28.16,28.159,28.16c15.546,0,28.16-12.605,28.16-28.16V151.389 C83.625,135.837,71.011,123.228,55.465,123.228z" />
                                                <path d="M334.498,65.278c-23.092,0-41.811,18.719-41.811,41.812v93.864h-12.801h-60.585h-19.625l-6.827-0.163V107.09 c0-23.092-18.72-41.812-41.813-41.812c-23.091,0-41.812,18.719-41.812,41.812v271.355c0,23.093,18.721,41.812,41.812,41.812 c23.094,0,41.813-18.719,41.813-41.812v-93.653c0,0,4.501-0.211,6.827-0.211h19.625h60.585h12.801v93.864 c0,23.093,18.719,41.812,41.811,41.812c23.094,0,41.812-18.719,41.812-41.812V107.089 C376.311,83.998,357.592,65.278,334.498,65.278z" />
                                                <path d="M458.229,208.062v-56.673c0-15.552-12.613-28.161-28.158-28.161c-15.547,0-28.16,12.608-28.16,28.161v182.749 c0,15.555,12.613,28.16,28.16,28.16c15.545,0,28.158-12.605,28.158-28.16v-56.666c15.654-3.846,27.307-17.865,27.307-34.707 C485.535,225.927,473.883,211.908,458.229,208.062z" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            )
                        },
                        {
                            title: 'Hiking',
                            description: 'Exploring the great outdoors and capturing the beauty of nature.',
                            link: '#',
                            icon: (
                                <svg className="h-8 w-8 mb-3 text-neutral-400" viewBox="0 0 24 24" fillOpacity={0} xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M13 14L17 9L22 18H2.84444C2.46441 18 2.2233 17.5928 2.40603 17.2596L10.0509 3.31896C10.2429 2.96885 10.7476 2.97394 10.9325 3.32786L15.122 11.3476" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            )
                        },
                        {
                            title: 'Travelling',
                            description: 'Exploring new cultures and experiencing the world.',
                            link: '#',
                            icon: (
                                <svg
                                    className="h-8 w-8 mb-3 text-neutral-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.75 6C9.75 5.17157 10.4216 4.5 11.25 4.5L13 4.5C13.6098 4.5 14.25 5.08609 14.25 6L15.75 6C15.75 4.42863 14.5994 3 13 3H11.25C9.59315 3 8.25 4.34315 8.25 6H3.75L3 6.75V19.5L3.75 20.25H20.25L21 19.5V6.75L20.25 6L9.75 6ZM4.5 15.75V7.5L6 7.5C6 8.32843 5.32843 9 4.5 9V10.5C6.15685 10.5 7.5 9.15685 7.5 7.5H16.5C16.5 9.15685 17.8431 10.5 19.5 10.5V15.75C17.8431 15.75 16.5 17.0931 16.5 18.75H7.5C7.5 17.0931 6.15685 15.75 4.5 15.75ZM4.5 17.25V18.75H6C6 17.9216 5.32843 17.25 4.5 17.25ZM19.5 9C18.6716 9 18 8.32843 18 7.5L19.5 7.5V9ZM18 18.75H19.5V17.25C18.6716 17.25 18 17.9216 18 18.75ZM12.3849 12.0978L14.8281 11.4432L14.1735 9L11.7303 9.65465L12.3849 12.0978ZM11.25 14.25C11.25 15.0784 10.5784 15.75 9.75 15.75C8.92157 15.75 8.25 15.0784 8.25 14.25C8.25 13.4216 8.92157 12.75 9.75 12.75C10.5784 12.75 11.25 13.4216 11.25 14.25ZM14.3675 17.3799L16.4946 14.6125L13.0343 14.1541L14.3675 17.3799Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            )
                        }
                    ].map((interest, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-3 border border-neutral-800 rounded-xl bg-neutral-900/70">
                            {interest.icon}
                            <h3 className="font-medium mb-2">{interest.title}</h3>
                            <p className="text-sm text-neutral-400 mb-4">{interest.description}</p>

                            <a
                                href={interest.link}
                                className="w-full mt-auto inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300
                                hover:bg-neutral-700 hover:text-white transition-all duration-200
                                border border-neutral-700/30 cursor-not-allowed"
                            >
                                Coming Soon
                                <svg className="ml-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-2 pb-2 border-b border-neutral-800">My Journey</h2>
                <div className="relative">
                    <div className="absolute w-[2px] bg-gradient-to-b from-neutral-700 via-neutral-700 to-neutral-800/50 h-[calc(100%-2rem)] left-[7px] top-[10px]"></div>

                    <ol className="relative">
                        {TimelineData.map((item, index) => (
                            <li key={index} className={`mb-10 pl-8 relative ${index === TimelineData.length - 1 ? 'pb-0' : ''}`}>
                                <div className="absolute left-0 top-1.5 group">
                                    <div className="w-4 h-4 bg-neutral-800 border border-neutral-700 rounded-full z-10 shadow-md shadow-black/20 flex items-center justify-center group-hover:bg-neutral-700 transition-colors duration-300">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <time className="mb-1 text-sm font-normal leading-none text-neutral-500">{item.year}</time>
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>

                                    {item.image && (
                                        <div className="my-4 rounded-lg overflow-hidden border border-neutral-800 shadow-lg shadow-black/10 group/image">
                                            <div className="relative overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={500}
                                                    height={280}
                                                    className="w-full h-auto object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50"></div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="mb-4 text-base font-normal text-neutral-400">{item.description}</p>

                                    {item.buttons && item.buttons.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mt-3">
                                            {item.buttons.map((button, idx) => (
                                                <a
                                                    key={idx}
                                                    href={button.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-all duration-200 shadow-sm shadow-black/20 border border-neutral-700/30"
                                                >
                                                    {button.icon && (
                                                        <span className="mr-2 transform group-hover:translate-y-[-1px] transition-transform">{button.icon}</span>
                                                    )}
                                                    {button.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
}
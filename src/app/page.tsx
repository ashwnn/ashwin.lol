import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#22222] text-gray-200 flex flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <Image src="/favicon.png" alt="Logo" width={64} height={64} />
                    </div>
                </div>
                {/* <div className="mb-6">
                    <div className="w-16 h-16 flex items-center justify-center border border-white rounded-lg">
                        <span className="text-3xl font-bold">AC</span>
                    </div>
                </div> */}

                {/* Title */}
                <h1 className="text-3xl font-bold shine">Ashwin C.</h1>
                <p className="text-gray-400">Student</p>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center mt-6 space-x-1">
                    {['Home', 'Blog', 'Projects', 'Snippets', 'About'].map((item, index, arr) => (
                        <span key={item} className="flex items-center">
                            <a
                                href={`/${item.toLowerCase()}`}
                                className="text-md font-medium text-gray-100 opacity-70 hover:text-gray-400 transition-colors duration-200"
                            >
                                {item}
                            </a>
                            {index < arr.length - 1 && <span className="mx-2 text-gray-400">/</span>}
                        </span>
                    ))}
                </div>
                {/* Description */}
                <div className="mt-6 max-w-2xl text-gray-300 text-center">
                    <p className="text-md">
                        Hey, my name is Ashwin Charathsandran, I am currently a student enrolled in the <a href="" className="text-[#58a6ff] bg-transparent no-underline hover:text-[#18181b] hover:bg-[#58a6ff]/90"> Forensic Investigation</a> program at <a href="" className="text-[#58a6ff] bg-transparent no-underline hover:text-[#18181b] hover:bg-[#58a6ff]/90">BCIT</a>. I love to tinker with all sorts of tech, from repurposing old technology to building new software, and everything in between.
                    </p>
                    <p className="mt-4">
                    </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex flex-wrap justify-center space-x-4">
                    {[
                        { name: 'GitHub', url: 'https://github.com' },
                        { name: 'LinkedIn', url: 'https://linkedin.com' },
                        { name: 'Email', url: 'mailto:its@ashwin.lol' },
                        { name: 'PGP Key', url: '/pgp.asc' },
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            className="text-[#58a6ff] bg-transparent no-underline hover:text-[#18181b] hover:bg-[#58a6ff]/90"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

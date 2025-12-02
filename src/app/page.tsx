import { default as Link } from '@/components/ui/Link';
import Socials from '@/components/ui/Socials';
import { getLocalPosts } from '@/lib/blog';
import projects from '@/data/projects';


export default async function Home() {
  const latestPosts = (await getLocalPosts()).slice(0, 1);
  const latestProjects = projects.slice(0, 1);

  return (
    <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
      <div className="mt-4 text-gray-300 px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-bold text-white mb-4">Ashwin Charathsandran</h1>
        <p className="text-base sm:text-md mb-8 leading-relaxed">
          Hey, my name is Ashwin Charathsandran. I&apos;m a student in the{' '}
          <Link href="https://www.bcit.ca/programs/forensic-investigation-digital-forensics-and-cybersecurity-option-bachelor-of-technology-full-time-part-time-847cbtech/">
            Forensic Investigation &amp; Cyber Security
          </Link>{' '}
          program at <Link href="https://bcit.ca/">BCIT</Link> and work at{' '}
          <Link
            href="https://tecnet.ca/"
          >
            Tecnet
          </Link>{' '}
          as a{' '}
          <span
            className="cursor-help border-b border-dotted border-gray-400/40 pb-px text-white transition-all duration-200 ease-in-out hover:border-solid hover:border-gray-300/80 hover:text-gray-300"
            title="As a Service Desk Analyst, I support Windows 10 to 11 migration across ~50,000 devices delivering both onsite and remote help desk support."
          >
            Service Desk Analyst
          </span>
          . My interests are centered on cybersecurity with a
          growing focus on red teaming and understanding how systems fail and can be
          made stronger. I enjoy tackling complex problems, researching how things work
          at a deeper level, and experimenting with everything from older hardware to
          custom tools. I also enjoy <Link href="/about/interests/hiking">hiking</Link> and <Link href="/about/interests/travelling">travelling</Link> in my free time.
        </p>


        <section className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Latest Projects</h2>
            <Link href="/projects" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1 group">
              View all <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {latestProjects.map((project) => (
              <a
                key={project.title}
                href={project.link || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 rounded-xl bg-[#2a2a2a] border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="text-base font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-medium text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-700/50">
                      {project.year}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Latest Posts</h2>
            <Link href="/blog" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1 group">
              Read all <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative p-5 rounded-xl bg-[#2a2a2a] border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 block no-underline"
                styled={false}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="text-base font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-medium text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-700/50">
                      {new Date(post.published_date).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric',
                        year: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div >
      <div className="px-4 sm:px-6 md:px-0 w-full">
        <Socials />
      </div>
    </div >
  );
}
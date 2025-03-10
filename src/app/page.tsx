import Image from 'next/image';
import { default as Link } from '@/components/Link';
import Socials from '@/components/Socials';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-80 h-80 mx-auto">
        <Image
          src="/memoji.png"
          alt="Ashwin Charathsandran"
          fill
          sizes="500px"
          priority
        />
      </div>
      <div className="mt-4 max-w-2xl text-gray-300 text-center px-2 md:px-0">
        <p className="text-md">
          Hey, my name is Ashwin Charathsandran, I am currently a student enrolled in the{" "}
          <Link href="https://www.bcit.ca/programs/forensic-investigation-digital-forensics-and-cybersecurity-option-bachelor-of-technology-full-time-part-time-847cbtech/">
            Forensic Investigation & Cyber Security
          </Link>{" "}

          program at{" "}
          <Link href="https://bcit.ca/">
            BCIT
          </Link>
          . I love to tinker with all sorts of tech, from repurposing old technology to building new software, and
          everything in between.
        </p>
        <p className="mt-4"></p>
      </div>
      <Socials />
    </div>
  );
}
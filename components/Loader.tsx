import Image from "next/image";

export default function Loader() {
    return (
        <span className="text-center">
            <p  >Loading Posts</p>

            <div className="flex justify-center items-center">                
                <Image
                src="/spinner.svg"
                alt="Loading..."
                width={50}
                height={50}
            />
            </div>
            
        </span>
    );
}

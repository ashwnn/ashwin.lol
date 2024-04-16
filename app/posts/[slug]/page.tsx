import { error } from "console";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
    const response = await fetch(
        `https://pb.bepo.ca/api/collections/posts/records?filter=(slug='${slug}')`
    ).then((res) => res.json());

    return response.items[0];
}

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await getPost(params.slug);

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString(undefined, {
        month: 'long', day: 'numeric', year: 'numeric'
      });
    };
    
    if (post === undefined) {
        return notFound();
    }

    post.tags = post.tags.split(",").map((tag: string) => tag.trim());
    post.cover_image = `https://pb.bepo.ca/api/files/posts/${post.id}/${post.cover_image}`;

    post.date = formatDate(post.published_date);

    return (
        <div>
            <div className="justify-center mx-auto">
            <div>
              <div
                className="relative mx-auto bg-cover bg-center shadow-md h-[200px] md:h-[350px] w-full my-4"
              >
                <Image
                  alt={post.title}
                  src={post.cover_image}
                  quality={100}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                  className="border border-zinc-700 rounded-3xl"
                />
              </div>
              <h1 className="mb-2 text-3xl leading-snug shine">
                <b className="font-semibold">
                  <span>{post.title}</span>
                </b>
              </h1>
              <div className="flex items-center mb-5 space-x-2">
                <span>
                  {post.date} by {post.author}
                </span>
              </div>
              <hr className="my-5" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
    );
}
// import Pocketbase from 'pocketbase';

export const POCKETBASE_INSTANCE = "https://pb.bepo.ca";

// const pb = new Pocketbase(POCKETBASE_INSTANCE);

// async function ListPosts(): Promise<BlogPost[]> {
//     try {
//         const posts = await pb.collection('posts').getList(1, 50);

//         const mappedPosts = posts.items.map((post: any) => ({
//             slug: post.slug,
//             title: post.title,
//             description: post.description,
//             cover_image: post.cover_image,
//             tags: post.tags,
//             published_date: post.published_date,
//             author: post.author,
//             content: post.content,
//         }));

//         return mappedPosts;
//     } catch (error) {
//         console.error("Failed to fetch posts: ", error);
//         return [];
//     }
// }

// async function getPostBySlug(slug: string): Promise<BlogPost> {
//     try {
//         const post = await pb.collection('posts').getFirstListItem(`slug="${slug}"`);
        
//         return {
//             slug: post.slug,
//             title: post.title,
//             description: post.description,
//             cover_image: post.cover_image,
//             tags: post.tags,
//             published_date: post.published_date,
//             author: post.author,
//             content: post.content,
//         };
        

//     } catch (error) {
//         console.error("Failed to fetch posts: ", error);
//         return {} as BlogPost;
//     }
// }

// export { ListPosts, getPostBySlug };
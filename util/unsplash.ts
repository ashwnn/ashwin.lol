export default async function getUnsplashPhotos() {
    const res = await fetch("https://api.unsplash.com/users/axole?client_id= " + process.env.UNSPLASH_CLIENT_ID + "&per_page=30").then((res) => res.json()); 

    const photos = res.map((photo: any) => {
        return {
            id: photo.id,
            alt_description: photo.alt_description,
            unsplash: photo.links.html,
            thumbnail: {
                url: photo.urls.small,
                width: parseInt(photo.urls.small.match(/w=(\d+)/)[0].replace("w=", "")),
                height: Math.round(parseInt(photo.urls.small.match(/w=(\d+)/)[0].replace("w=", "")) / photo.width * photo.height),
                quality: parseInt(photo.urls.small.match(/q=(\d+)/)[0].replace("q=", ""))
            },
            image: {
                url: photo.urls.full,
                width: photo.width,
                height: photo.height,
            },
            regular: {
                url: photo.urls.regular,
                width: parseInt(photo.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")),
                height: Math.round(parseInt(photo.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")) / photo.width * photo.height),
                quality: parseInt(photo.urls.regular.match(/q=(\d+)/)[0].replace("q=", ""))
            }
        };
    });

    photos.sort(() => Math.random() - 0.5);
    photos.sort((a: any, b: any) => {
        return a.regular.width / a.regular.height - b.regular.width / b.regular.height;
    });

    return photos;
}
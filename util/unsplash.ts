export default async function getUnsplashPhotos() {
    const res = await fetch("https://api.unsplash.com/collections/H5OKO5bYbiM/photos?client_id=" + process.env.UNSPLASH_CLIENT_ID).then((res) => res.json()); 

    const randomPhoto = res[Math.floor(Math.random() * res.length)]; 
    const photo = {
        id: randomPhoto.id,
        alt_description: randomPhoto.alt_description,
        unsplash: randomPhoto.links.html,
        thumbnail: {
            url: randomPhoto.urls.small,
            width: parseInt(randomPhoto.urls.small.match(/w=(\d+)/)[0].replace("w=", "")),
            height: Math.round(parseInt(randomPhoto.urls.small.match(/w=(\d+)/)[0].replace("w=", "")) / randomPhoto.width * randomPhoto.height),
            quality: parseInt(randomPhoto.urls.small.match(/q=(\d+)/)[0].replace("q=", ""))
        },
        image: {
            url: randomPhoto.urls.raw,
            width: randomPhoto.width,
            height: randomPhoto.height,
        },
        regular: {
            url: randomPhoto.urls.regular,
            width: parseInt(randomPhoto.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")),
            height: Math.round(parseInt(randomPhoto.urls.regular.match(/w=(\d+)/)[0].replace("w=", "")) / randomPhoto.width * randomPhoto.height),
            quality: parseInt(randomPhoto.urls.regular.match(/q=(\d+)/)[0].replace("q=", ""))
        }
    }

    return photo;
}
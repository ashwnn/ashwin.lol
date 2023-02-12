export type UnsplashPhoto = {
    id: string;
    alt_description: string;
    unsplash: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
        quality: number;
    };
    image: {
        url: string;
        width: number;
        height: number;
    };
    regular: {
        url: string;
        width: number;
        height: number;
        quality: number;
    };
};

export type UnsplashPhotoAPI = {
    success: boolean;
    data: UnsplashPhoto[];
}

export type BookmarkCollection = {
    success: boolean;
    data: {
        collectionId: number;
        _id: number;
        title: string;
        excerpt: string;
        link: string;
        domain: string;
        created: string;
        year: number;
        tags: string[];
        type: "link" | "article" | "video" | "document" | "audio";
        cover: string;
    }[];
}

export type Bookmark = {
    collectionId: number;
    _id: number;
    title: string;
    excerpt: string;
    link: string;
    domain: string;
    created: string;
    year: number;
    tags: string[];
    type: "link" | "article" | "video" | "document" | "audio";
    cover: string;
}

export type Insights = {
    daily_average: string;
    commits: number;
    total_time_coding: string;
    editor: string;
    os: string;
    github: {
        starred: {
            name: string;
            url: string;
        }[];
    };
    languages: {
        name: string;
        total_seconds: number;
    }[];
}
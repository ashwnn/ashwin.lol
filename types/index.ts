export type Blog = {
    id: string;
    created: Date;
    updated: Date;
    slug: string;
    title: string;
    description: string;
    cover_image: string;
    content: string;
    tags: string;
    excerpt: string;
    published_date: Date;
    author: string;
};

export type Timeline = {
    id: string;
    created: Date;
    updated: Date;
    title: string;
    content: string;
    date: Date;
};

export type Project = {
    id: string;
    created: Date;
    updated: Date;
    title: string;
    description: string;
    tags: string;
    github: string;
    case_study: string;
    demo: string;
    cover_image: string;
    start_date: Date;
    end_date: Date;
}

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
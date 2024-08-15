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

export type Referral = {
    message: string;
    title: string;
    logo: string;
    color: string;
};
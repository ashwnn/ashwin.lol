interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
    buttons?: {
        label: string;
        url: string;
        icon?: React.ReactNode;
    }[];
}

interface BlogPost {
    slug: string;
    title: string;
    description?: string;
    cover_image: string;
    tags?: string;
    published_date: Date;
    author?: string;
  }

export type { TimelineItem, BlogPost };
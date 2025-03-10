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

export type { TimelineItem };
import { TimelineItem } from "@/types"

export const timelineCategories = [
    { key: 'all', label: 'All', icon: '🎯' },
    { key: 'development', label: 'Development', icon: '💻' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { key: 'hardware', label: 'Hardware', icon: '⚡' }
];

// Timeline modal tabs
export const timelineModalTabs = [
    { key: 'overview', label: 'Overview', icon: '📋' },
    { key: 'tech', label: 'Tech Stack', icon: '⚡' },
    { key: 'gallery', label: 'Gallery', icon: '🖼️' },
    { key: 'takeaways', label: 'Takeaways', icon: '💡' }
];

export const data: TimelineItem[] = [
    {
        year: '2025',
        title: "IT Support for Large Clients",
        description: "My first experience into working and supporting a large userbase specializing in the migration to Windows 11 & modern management. I provided technical support for software issues both in person and remotely. In addition I worked on various projects related to cybersecurity and hardware.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        techStack: ['Windows 11', 'Remote Support', 'Hardware', 'Cybersecurity'],
        categories: ['infrastructure', 'security'],
        takeaways: [
            'Gained hands-on experience supporting enterprise users',
            'Learned modern device management and Windows 11 migration strategies',
            'Developed skills in remote troubleshooting and technical support',
            'Enhanced understanding of cybersecurity in corporate environments'
        ]
    },
    {
        year: '2023',
        title: 'Installation & Large Networks',
        description: 'Working as an installation technician for guest entertainment and WiFi infrastructure, I gained experience with enterprise hardware and large network design. I worked with various technologies like fiber optics, ethernet, and telecommunications.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        image: "/about/timeline/install_LxaKvbENuK.webp",
        techStack: ['Networking', 'Fiber Optics', 'Ethernet', 'Enterprise Hardware'],
        categories: ['infrastructure', 'hardware'],
        takeaways: [
            'Experience with enterprise-grade networking hardware',
            'Understanding of large-scale network design and implementation',
            'Knowledge of fiber optics and telecommunications infrastructure',
            'Skills in troubleshooting complex network issues'
        ]
    },
    {
        year: '2022',
        title: 'System Administration',
        description: 'I began self-hosting my services on a Lenovo ThinkServer TD340 instead of using VPS services. My homelab runs everything from DNS ad-blocking to media services and open-source alternatives to popular cloud services.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        image: "/about/timeline/nat_e3WBOUDBrl.webp",
        techStack: ['Linux', 'Docker', 'DNS', 'Self-hosting', 'Media Services'],
        categories: ['infrastructure'],
        takeaways: [
            'Self-hosting and infrastructure management experience',
            'Docker containerization and service orchestration',
            'DNS configuration and network security implementation',
            'Media services and cloud alternatives deployment'
        ],
        buttons: [
            {
                label: "Read More",
                url: "/blog/homelab",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                )
            }
        ]
    },
    {
        year: '2021',
        title: 'Full-Stack Development',
        description: 'I ventured into web development, working mainly with React.js & Next.js. Created projects like a fuel efficiency tracker, multiple iterations of my portfolio website, and other projects for school.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        image: "/about/timeline/untitled_Sq19xsYrM7.webp",
        techStack: ['React.js', 'Next.js', 'JavaScript', 'Web Development'],
        categories: ['development'],
        takeaways: [
            'Modern web development with React.js and Next.js',
            'Understanding of full-stack application architecture',
            'Experience with responsive design and user interfaces',
            'Project management and development lifecycle skills'
        ]
    },
    {
        year: '2020',
        title: 'Introduction to the Web',
        description: 'I started with PHP to create my first authenticated API for SMS notifications. Later explored Django and Flask to build self-hosted applications like an image file converter.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        image: "/about/timeline/untitle2d_a8ZP8B4m0L.webp",
        techStack: ['PHP', 'Django', 'Flask', 'Python', 'API Development'],
        categories: ['development'],
        takeaways: [
            'Foundation in web technologies and server-side programming',
            'Database design and management experience',
            'API design and development experience',
            'Understanding of web application architecture'
        ]
    },
    {
        year: '2018',
        title: 'Working with Arduinos',
        description: 'During IT classes, I worked with Arduino kits to create vehicles that could navigate pre-determined routes and motion detection sensors that would send SMS notifications when triggered.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        image: "/about/timeline/arduino_2_3NbEzEH6lR.webp",
        techStack: ['Arduino', 'C++', 'IoT', 'Sensors', 'Hardware'],
        categories: ['hardware', 'development'],
        takeaways: [
            'Embedded systems programming experience',
            'IoT device development and sensor integration',
            'Problem-solving through hardware-software integration'
        ]
    },
    {
        year: '2018',
        title: 'Importance of Security',
        description: 'I started scripting and trying to exploit websites and vulnerable servers using Shodan. Using Python, PowerShell, and Batch to write automation scripts, I learned valuable lessons about network and server security.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        image: "/about/timeline/security_2_xUwUDLmdEe.webp",
        techStack: ['Python', 'PowerShell', 'Cybersecurity', 'Network Security'],
        categories: ['security'],
        takeaways: [
            'Understanding of cybersecurity fundamentals',
            'Experience with security testing and automation',
            'Knowledge of network and server security principles'
        ]
    },
    {
        year: '2017',
        title: 'Application Development',
        description: 'After exploring modding with Minecraft, I began creating GUI applications with Java to build tools for obfuscating compiled programs, file encryption, and utilities like screenshot applications.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
        image: "/about/timeline/java_apps_HdE2gwTd2u.webp",
        techStack: ['Java', 'GUI', 'Desktop Apps', 'File Encryption'],
        categories: ['development', 'security'],
        takeaways: [
            'Desktop application development with Java',
            'GUI design and user experience principles',
            'Understanding of software security and encryption'
        ]
    },
    {
        year: '2016',
        title: 'Tinkering with Minecraft',
        description: 'My first taste of tinkering and programming started with Minecraft, where I began working with Java. I created cheats and exploits by reverse engineering mods, then eventually switched to developing anti-cheat solutions.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        image: "/about/timeline/minecraft_Z8mh0MnMqj.webp",
        techStack: ['Java', 'Reverse Engineering', 'Modding', 'Anti-cheat'],
        categories: ['development', 'security'],
        takeaways: [
            'Introduction to programming through gaming',
            'Reverse engineering and code analysis skills',
            'Understanding of anti-cheat and security mechanisms'
        ]
    }
];
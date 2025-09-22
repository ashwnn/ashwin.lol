import { TimelineItem } from "@/types"

export const timelineCategories = [
    { key: 'all', label: 'All', icon: '🎯' },
    { key: 'development', label: 'Development', icon: '💻' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { key: 'hardware', label: 'Hardware', icon: '⚡' }
];

export const timelineModalTabs = [
    { key: 'overview', label: 'Overview', icon: '📋' },
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
        description: 'I began self-hosting my services on a Lenovo ThinkServer TD340 instead of using VPS services. My homelab runs everything from DNS ad-blocking to media services and open-source alternatives to popular cloud services. This journey into self-hosting taught me valuable lessons about infrastructure management, security hardening, and the complexities of running production services at home. I learned to configure reverse proxies, manage SSL certificates, implement backup strategies, and monitor system performance. The experience of troubleshooting network issues, optimizing resource usage, and ensuring high availability has been invaluable for my understanding of enterprise infrastructure.',
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
        description: 'I ventured into actual web development, working mainly with React.js & Next.js. Created projects like a fuel efficiency tracker, multiple iterations of my portfolio website, and other projects for school. This period marked a significant transition in my development journey as I moved from desktop applications to modern web development. I learned about component-based architecture, state management, responsive design principles, and the importance of user experience. Working with Next.js introduced me to server-side rendering, static site generation, and API routes. I also gained experience with CSS frameworks, deployment strategies, and modern development workflows including Git version control, continuous integration, and collaborative development practices.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        images: ["/about/timeline/untitled_Sq19xsYrM7.webp", "/about/timeline/untitle2d_a8ZP8B4m0L.webp"],
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
        title: 'Exploring the Unknown',
        description: 'Starting with the ancient language of PHP, I created my first ever API which I used with scripts to send SMS notifications to my phone. Later on I felt the desire to create something public and useful for myself and others this led me to create a self-hosted image converter using Django, later moving onto Flask. This started my journey into web development. Spent most of my time trying to break my own website and making sure that threat actors couldnt break it.`',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        images: ["/about/timeline/rest_api_fcf7c1189f.jpg", "/about/timeline/image_magick_fcf7c1189f.png", "/about/timeline/django_sample_fcf7c1189f.png"], 
        techStack: ['PHP', 'Django', 'Flask', 'Python', 'API Development'],
        categories: ['development'],
        takeaways: [
            'Server-side programming with PHP and Python frameworks',
            'UI Design with CSS frameworks like Bootstrap, TailwindCSS',
            'Creating secure and reliable RESTful APIs and web services',
            'Understanding of web application architecture'
        ]
    },
    {
        year: '2018',
        title: 'Working with Arduinos',
        description: 'During IT class, I got my hands on a Arduino kit, with this I worked a lot with motion sensors and cameras to do very basic object recogniton and to send SMS notifications as alerts when a specific object/item was present. Alongside a "security" sensor that would alert you if motion was detected during as specified time.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        images: ["/about/timeline/arduino_5f020f5bdf.jpg", "/about/timeline/arduino_sensor_5f020f5bdf.jpg", "/about/timeline/camera_arduino_5f020f5bdf.jpg"],
        techStack: ['Arduino', 'C++', 'IoT', 'Sensors', 'Hardware'],
        categories: ['hardware', 'development'],
        takeaways: [
            'Worked with Arduino microcontrollers to create a security system that sends SMS alerts',
            'IoT development and integration with software systems like SMS APIs',
        ]
    },
    {
        year: '2018',
        title: 'Security & ScriptKiddie Phase',
        description: 'Started with using publicly available combo lists to brute force SSH & FTP servers that I found exposed on Shodan & Google Dorking. Continued exploring Google Dorking, eventually trying to break into unprotected .asp applications and exploring unprotected CCTV IP cameras.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        images: ["/about/timeline/security_b5c8b1a2f0.jpg", "/about/timeline/shodan_b5c8b1a2f0.png", "/about/timeline/powershell_b5c8b1a2f0.png", "/about/timeline/exploit_db_google_dork_b5c8b1a2f0.png"],
        techStack: ['Python', 'PowerShell', 'Google Dorking', 'Cybersecurity'],
        categories: ['security'],
        takeaways: [
            'Understanding vulnerabilities in web applications and servers and how to exploit them',
            'Automation of attack vectors using scripting languages, such as Brute forcing SSH & FTP servers',
            'Reconnaissance techniques using Shodan and other services to find vulnerable IoT targets'
        ]
    },
    {
        year: '2017',
        title: 'Application Development',
        description: 'After exploring Java with Minecraft, I moved onto learning Java to create applications to use. I created a few to automate tasks like file encryption, screenshot applications, and obfuscation of software. Learning a bit about AV and how they work.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
        images: ["/about/timeline/window_builder_0da0900b53.png" ,"/about/timeline/blind_bytecode_0da0900b53.png", "/about/timeline/memory_screenshot_0da0900b53.png"],
        techStack: ['Java', 'GUI', 'Desktop Apps', 'File Encryption'],
        categories: ['development', 'security'],
        takeaways: [
            'Explored using Java to perform system-level functions like screenshots and file encryption',
            'GUI design with WindowBuilder and Swing',
            'Obfuscation and AV evasion techniques with Java executables'
        ]
    },
    {
        year: '2016',
        title: 'Tinkering with Minecraft',
        description: 'My first taste of programming started with tinkering around Minecraftit started off with learning Java making simple mods eventually moving onto create cheats and exploits. After which I moved onto reverse engineering mods and hacked clients to develop anti-cheat solutions.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        images: ['/about/timeline/hacked_client_601dbd75dd.jpg', '/about/timeline/enderpeal_check_601dbd75dd.png', '/about/timeline/hacks_sample_601dbd75dd.jpg'],
        techStack: ['Java', 'Reverse Engineering', 'Modding', 'Anti-cheat'],
        categories: ['development', 'security'],
        takeaways: [
            'Exposure to real-world applications of Java in gaming',
            'Learned how to reverse engineer hacked clients and create anti-cheat mitigations',
            'Deep understanding of game mechanics, client-server interactions, and minecraft packet analysis'
        ]
    }
];
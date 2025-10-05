import { TimelineItem } from "@/types"
import { BookIcon } from "@/components/timeline/TimelineIcons"
import { TIMELINE_CATEGORIES, createTimelineItem, createButton } from "@/components/timeline/TimelineConfig"

// Export categories for use in Timeline component
export const timelineCategories = TIMELINE_CATEGORIES;

export const data: TimelineItem[] = [
    createTimelineItem({
        year: '2025',
        title: 'Enterprise IT Support & Forensics',
        description:
            'Provided support for a 30,000+ users during the Windows 11 migration and the adoption of modern device management. Delivered in-person and remote technical assistance for software and endpoint issues. Worked on a few forensics initiatives with smaller private clients.',
        images: [
            '/about/timeline/mdm_c0be16a6c5.png',
            '/about/timeline/win11upgrade_788d7b28c8.jpg',
            '/about/timeline/intune_788d7b28c8.png',
        ],
        techStack: ['Windows 11', 'Remote Support', 'Hardware', 'Digital Forensics'],
        categories: ['infrastructure', 'security']
    }),
    createTimelineItem({
        year: '2024',
        title: 'Centralized Homelab Server',
        description:
            'Upgraded the homelab to a Lenovo TD340 ThinkServer to increase performance and scalability. Implemented redundant monitoring, recovery, and update automations with smart alerts via Webhooks. Self-hosted services included DNS ad-blocking, AI inference, personal cloud, databases, and task automation.',
        images: [
            '/about/timeline/dashboard_49fef17412.png',
            '/about/timeline/bepo_internal_49fef17412.png',
            '/about/timeline/bepo_49fef17412.png'
        ],
        techStack: ['Networking', 'Docker', 'Linux', 'Monitoring', 'Security'],
        categories: ['infrastructure'],
        buttons: [createButton('Read More', '/blog/homelab', <BookIcon />)]
    }),

    createTimelineItem({
        year: '2023',
        title: 'Field Deployments: Large-Scale Networks',
        description:
            'Worked as a field technician on enterprise-scale projects deploying guest entertainment systems, Wi-Fi, and wired Ethernet. Installed and maintained enterprise hardware and performed live upgrades to production network and guest infrastructure.',
        images: [
            '/about/timeline/network_rack_1_ee642e7a26.jpg',
            '/about/timeline/network_rack_ee642e7a26.jpg',
            '/about/timeline/network_rack_2_ee642e7a26.jpg'
        ],
        techStack: ['Networking', 'Fiber Optics', 'Ethernet', 'Enterprise Hardware'],
        categories: ['infrastructure', 'hardware']
    }),
    createTimelineItem({
        year: '2022',
        title: 'System Administration',
        description:
            'Transitioned from a VPS to two small tower servers (OptiPlex 8010 and Lenovo). Evaluated Proxmox and TrueNAS, ultimately standardizing on bare-metal. Hosted media services (Plex/Jellyfin) and additional applications.',
        images: [
            '/about/timeline/optiplex_1ff76756bf.jpg',
            '/about/timeline/lenovo_1ff76756bf.jpg',
            '/about/timeline/jellyfin_1ff76756bf.png'
        ],
        techStack: ['Linux', 'Docker', 'Self-Hosting', 'Media Services'],
        categories: ['infrastructure'],
    }),
    createTimelineItem({
        year: '2021',
        title: 'Full-Stack Development',
        description:
            'Built applications with React and Next.js, including a fuel-efficiency tracker and portfolio sites. Developed expertise in component design, state management, responsive UI, SSR/SSG, and deployment. Established CI/CD workflows and Git best practices.',
        images: [
            '/about/timeline/nextjs_fcf7c1189f.webp',
            '/about/timeline/fueld_manager_fcf7c1189f.png',
            '/about/timeline/ci_cd_fcf7c1189f.png'
        ],
        techStack: ['React', 'Next.js', 'JavaScript', 'Node', 'Web'],
        categories: ['development']
    }),

    createTimelineItem({
        year: '2020',
        title: 'Backend & Security Foundations',
        description:
            'Developed a PHP API for SMS alerts. Built a self-hosted image conversion service (initially Django, later Flask). Conducted security reviews of my personal site and remediated identified issues, reinforcing server-side fundamentals, REST design, and practical security practices.',
        images: [
            '/about/timeline/rest_api_fcf7c1189f.jpg',
            '/about/timeline/php_api_35b4eb3560.png',
            '/about/timeline/django_sample_fcf7c1189f.png'
        ],
        techStack: ['PHP', 'Python', 'Flask/Django', 'APIs'],
        categories: ['development']
    }),
    createTimelineItem({
        year: '2019',
        title: 'Embedded Systems with Arduino',
        description:
            'Prototyped motion-sensor camera solutions with basic object detection and built an SMS-alert security sensor. Integrated microcontrollers with IoT services, bridging hardware and software workflows.',
        images: [
            '/about/timeline/arduino_5f020f5bdf.jpg',
            '/about/timeline/arduino_sensor_5f020f5bdf.jpg',
            '/about/timeline/camera_arduino_5f020f5bdf.jpg'
        ],
        techStack: ['Arduino', 'C/C++', 'IoT', 'Sensors', 'Hardware'],
        categories: ['hardware', 'development']
    }),

    createTimelineItem({
        year: '2018',
        title: 'Security Research',
        description:
            'Used public datasets and OSINT to analyze exposed services and weak credentials in controlled environments. Studied legacy .asp vulnerabilities and misconfigured CCTV to understand operational risk. Focus areas included vulnerability awareness, brute-force risk mitigation, and ethical reconnaissance workflows.',
        images: [
            '/about/timeline/security_b5c8b1a2f0.jpg',
            '/about/timeline/shodan_b5c8b1a2f0.png',
            '/about/timeline/powershell_b5c8b1a2f0.png',
            '/about/timeline/exploit_db_google_dork_b5c8b1a2f0.png'
        ],
        techStack: ['Python', 'PowerShell', 'OSINT/Shodan', 'Cybersecurity'],
        categories: ['security']
    }),
    createTimelineItem({
        year: '2017',
        title: 'Application Development',
        description:
            'Created Java utilities such as file-encryption and screenshot tools and explored desktop GUI design. Developed system-level Java capabilities with a focus on secure-by-design principles and user experience.',
        image: '/about/timeline/window_builder_0da0900b53.png',
        techStack: ['Java', 'Swing', 'Desktop Apps', 'Crypto Primitives'],
        categories: ['development', 'security']
    }),

    createTimelineItem({
        year: '2016',
        title: 'Java Modding via Minecraft',
        description:
            'Began programming through Java modding. Investigated exploit mechanics and subsequently developed anti-cheat measures, gaining early experience in reverse engineering, packet analysis, and game mechanics.',
        images: [
            '/about/timeline/hacked_client_601dbd75dd.jpg',
            '/about/timeline/enderpeal_check_601dbd75dd.png',
            '/about/timeline/hacks_sample_601dbd75dd.jpg'
        ],
        techStack: ['Java', 'Reverse Engineering', 'Modding', 'Anti-Cheat'],
        categories: ['development', 'security']
    })

];
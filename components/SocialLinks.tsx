export default function SocialLinks() {
    return (
        <span className="flex flex-row mt-4 gap-x-2">
            <a
                href="https://github.com/xxiz/"
                target="_blank"
                rel="noopener noreferrer nofollow"
            >
                <svg
                    className="w-8 h-8 text-[#bfbfbf] hover:text-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                    ></path>
                </svg>
            </a>
            <a
                href="https://stackoverflow.com/users/9254757/"
                target="_blank"
                rel="noopener noreferrer nofollow"
            >
                <svg
                    className="w-8 h-8 text-[#bfbfbf] hover:text-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M17.36 20.2v-5.38h1.79V22H3v-7.18h1.8v5.38zM6.77 14.32l.37-1.76l8.79 1.85l-.37 1.76zm1.16-4.21l.76-1.61l8.14 3.78l-.76 1.62zm2.26-3.99l1.15-1.38l6.9 5.76l-1.15 1.37zm4.45-4.25L20 9.08l-1.44 1.07l-5.36-7.21zM6.59 18.41v-1.8h8.98v1.8z"
                    ></path>
                </svg>
            </a>
            <a
                href="https://linkedin.com/in/ax2/"
                target="_blank"
                rel="noopener noreferrer nofollow"
            >
                <svg
                    className="w-8 h-8 text-[#bfbfbf] hover:text-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                    ></path>
                </svg>
            </a>
            <a
                href="/pgp.asc"
                target="_blank"
                rel="noopener noreferrer nofollow"
            >
                <svg
                    className="w-8 h-8 text-[#bfbfbf] hover:text-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m5.6-4c-.8-2.3-3-4-5.6-4c-3.3 0-6 2.7-6 6s2.7 6 6 6c2.6 0 4.8-1.7 5.6-4H16v4h4v-4h3v-4z"
                    ></path>
                </svg>
            </a>
            <a 
                href="mailto:its@ashwin.lol"
                target="_blank"
                rel="noopener noreferrer nofollow"
                >
                <svg
                    className="w-8 h-8 text-[#bfbfbf] hover:text-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                    ></path>
                </svg>
            </a>
        </span>
    );
}

{
    /* <SocialItem href="https://github.com/xxiz/" icon="mdi:github" />
                <SocialItem href="https://stackoverflow.com/users/9254757/" icon="mdi:stackoverflow" />
                <SocialItem href="https://linkedin.com/in/ax2/" icon="mdi:linkedin" />
                <SocialItem href="/pgp.asc" icon="mdi:key" />
                <SocialItem href="mailto:its@ashwin.lol" icon="mdi:email-outline" /> */
}

'use client' // !! TODO: Convert Icon to SVG & remove use client

import React from "react";
import { Icon } from "@iconify/react";

const SocialLink = ({ href, trackingName, iconName } : { href: string, trackingName: string, iconName: string }) => {
    return (
        <a
            data-umami-event={`Click ${trackingName} Logo`}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
        >
            <Icon
                icon={iconName}
                className="w-7 h-7 text-[#bfbfbf] hover:text-[#fff]"
            />
        </a>
    );
};

export default SocialLink;

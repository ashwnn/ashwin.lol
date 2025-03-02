---
title: "Bepo: My Homelab Setup"
description: "My homelab setup with my server, network, and services."
date: "2025-02-12"
author: "Ashwin C."
cover_image: "/blog/homelab.png"
tags: "self-hosting, homelab, server"
---


# Bepo: My HomeLab Adventure

**Bepo**, my very own HomeLab, is the fruit of my past mistakes, learnings, and experiences setting up my own server. Currently built on a Lenovo Thinkserver TD340, it will go through the hardware setup, software stack, problems I faced, and how I overcame them so you can learn from my mistakes and build your own HomeLab one day.

## Inspiration

Before setting up a home lab, I always had a more robust VPS to run my projects and other applications. Still, I did not trust the security and privacy of my data. The saying "The cloud is just someone else's computer" always stuck with me. I wanted more control over my data and services while reducing my dependency on third-party providers. It started with a Dell Optiplex 7010 I picked up for free, a Lenovo ThinkCentre M93P I got for $20 working together, and finally, my Lenovo ThinkServer TD340.

## Hardware Specifications & Cost

My home lab is built on a Lenovo ThinkServer TD340, an enterprise-grade server targeted for smaller businesses, released in 2013. I got it for $60 from a local seller who had it sitting in brand-new condition. After some research, it was a great deal and compatible with relatively inexpensive hardware. Here are the key specifications of my setup:

- **Model:** Lenovo ThinkServer TD340
    - Cost: $60
    - Notes: *Came with 16GB of DDR3 1333MHz ECC RAM & 1x Intel Xeon E5-2420 v2*
- **CPU:** 2x Intel Xeon E5-2450 v2 (8 cores, 16 threads each)
    - Cost: $20
- **Memory:** 48GB DDR3 1333MHz ECC RAM
    - Cost: $50
- **Storage:** 2x 14TB Exos mach.2 14TB, 1x 10TB IronWolf Pro, 1x Crucial MX500 1TB
    - Cost: $854.75 = $269.18 x 2 + $246.39 + $70

## Redundancy & Software
The main goal of using a server-grade platform like ThinkServer is the built-in use of RAID, extensive support, and the drive's hot-swapping ability. However, due to my requirements and restrictions, I had to rethink and use a software-based RAID solution when setting up RAID. The main reason is that uneven drives with a mix of 14 & 10TB significantly limited my choices on RAID setups. Ultimately, I ended up going with SnapRaid, which is software-based and offered significant flexibility alongside performance, the only downside being it must be synced & scrubbed via a command.

### Why Snapraid?
When looking at RAID setups, I was mainly focused on RAID 5. However, I had already purchased the drives and did not want to buy another drive.

Here are my requirements:
Being able to use variously sized drives
Ability to add drives later on without rebuilding the entire array
Performant speeds
Full control

This left me with two options:
- Unraid
- SnapRaid

Unraid was a closed source, requiring a license purchase and an entire operating system to install and use. This was too much overhead, and I did not need real-time parity sync.

Instead, I decided on SnapRAID, a fantastic alternative; however, it lacked a few things, such as real-time parity sync, and required an average of 15 - 30 minutes, making it hard to be synced frequently so I opted for a daily sync.

### Software

- **Operating System:** Ubuntu Server 24.0..1 LTS
- **Containerization:** Docker Compose

Rather than opting for Proxmox, I ran bare metal and used Docker to manage all my applications. Specifically, Docker Compose let me organize my applications and made it significantly easier to manage them.

**File Layout**
- `~/apps` - application configuration
- `~/pool` - SnapRAID pool via MergerFS
    - `appdata/` - application data

**Networking**
For networking I opted to use Cloudflared for it's simplicty to setup, privacy and DOS protection. It lets me easily publish a local application to my domains without the hastle of SSL certificates and port forwarding.

**Security**
Security is my main concern when building a homelab was it contains all of my personal information, therefore all public connections are made through Cloudflared. I use Crowdsec to mitigate any potential attacks and have a strict firewall setup via UFW.

**Applications**
I run a variety of applications on my server, all managed via Docker Compose. Here are some applications I run that I cannot live without:

| Application       | Description                                  |
|-------------------|----------------------------------------------|
| **Portainer**     | Docker container management tool             |
| **Pi-hole**       | Network-wide ad blocking                     |
| **Soft Serve**    | Git Server                                   |
| **Nextcloud**     | Personal Cloud                               |
| **Umami**         | Analytics                                    |
| **Jenkins**       | CI/CD Server                                 |
| **Paperless-ngx** | Document Management System                   |
| **13ft**          | Alternative to 12ft                          |
| **Cloudbeaver**   | Database Management                          |

## Challenges and Lessons Learned
I ran into many issues when starting homelabbing, from 2AM debugging sessions in software to hardware compatibility issues and bricking my server. Here are some noteworthy challenges I faced and how I learned from them:

- **Organization**: On my previous servers, I would install applications via Docker and on the system itself and not document or use a structured way; this led to confusion and issues. So, I use a strict file layout on my current server and Docker Compose to manage all my applications. My configuration and system files are placed on my SSD, and all data is on my HDDs. Alongside which applications are isolated in their designated Docker networks.

- **Hardware Compatibility**: Using an old server like the ThinkServer, I failed to plan out my hardware upgrades and compatibility. The particular fan mounting bracket LGA 1366 was a pain, as finding any coolers that would fit was impossible. After a month of looking around, I finally found an obscure factory cooler on a Chinese website that was compatible with the system.

- **Security**: Upon setting up my first server, I was unaware of the security risks and how to secure it properly. This led to my server being compromised with a Bitcoin miner installed; this continued for a few weeks until I checked my Pi-hole logs and saw a lot of traffic to an obscure domain, which, upon further analysis, led to a C2 server. I spent countless hours afterwards learning about UFW, iptables, EDRs, proper security practices and mitigation techniques for my server.

- **Networking:** Setting up networking was somewhat tricky initially; however, after planning out my network, it was straightforward. Public and private applications are isolated in their designated docker networks, after which containers are explicitly exposed to the Internet, with the rest of the traffic remaining on the local network.

- **Remote Management**: From configuring SSH to configuring IPTables and UFW, I would lock myself out of my server via SSH access and have to physically connect a monitor and keyboard to fix it. However, after research, I discovered the world of IPMI and PiKVM; this made setting up and configuring my server significantly easier and lets me manage it from anywhere without requiring physical access.
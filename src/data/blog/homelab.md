---
title: "Bepo: My Homelab Setup"
description: "A look at my homelab setup: server specs, network configuration, storage strategy, virtualization with KVM/libvirt, and the extensive suite of self-hosted services."
date: "2025-04-12"
author: "Ashwin C."
cover_image: "/blog/homelab.png"
tags: "self-hosting, homelab, server"
---


## Table of Contents

- [Introduction](#introduction)
- [Inspiration](#inspiration)
- [Hardware Specifications & Cost](#hardware-specifications--cost)
- [The Core Infrastructure: OS, Storage, and Virtualization](#the-core-infrastructure-os-storage-and-virtualization)
  - [Operating System & Containerization](#operating-system--containerization)
  - [Virtualization Layer: KVM & Libvirt](#virtualization-layer-kvm--libvirt)
  - [Storage Strategy: MergerFS and SnapRAID](#storage-strategy-mergerfs-and-snapraid)
  - [Why SnapRAID?](#why-snapraid)
  - [File Layout & Data Management](#file-layout--data-management)
- [Networking, Security, and Applications](#networking-security-and-applications)
  - [Networking Approach](#networking-approach)
  - [Security Measures](#security-measures)
  - [The Application Ecosystem (via Docker)](#the-application-ecosystem-via-docker)
- [Challenges Faced and Lessons Learned](#challenges-faced-and-lessons-learned)
- [Conclusion](#conclusion)

> **TLDR:** Bepo is my home server and ongoing homelab experiment, built on a cheap Lenovo ThinkServer TD340 with mixed storage drives pooled using MergerFS and protected by SnapRAID. Most of my workloads run as Docker containers on Ubuntu Server, with KVM/libvirt handling full VMs when I need stronger isolation or a different OS. Networking is handled with Cloudflared tunnels, Pi-hole, Gluetun, and a few carefully planned Docker and VM networks, while security leans on UFW, Crowdsec, OpenVAS, and solid access control. This post walks through the hardware, storage layout, virtualization stack, apps, networking, and the many mistakes and lessons that shaped the current setup.

## Introduction

**Bepo**, my home server and ongoing homelab project, grew out of past mistakes, lessons learned, and a lot of experimentation. It currently runs on a [Lenovo ThinkServer TD340](https://www.lenovo.com/ca/en/p/servers-storage/servers/towers/thinkserver-td340/77ls7td340d), and this post walks through the hardware choices, storage layout, software stack, and the many applications that make up the system. I also cover the challenges I have run into along the way and what each one taught me.

This writeup is aimed at anyone interested in getting into homelabbing, even if you are just starting to explore the idea. If you want to see what a real setup looks like, how the pieces connect, and what is possible once things grow beyond a few containers, this overview should help you think through your own build.

By the time you finish reading, you will have a clear picture of:

- The hardware that powers this homelab  
- How storage, virtualization, and containers work together in practice  
- The apps and services that are genuinely useful day to day  
- The network and security considerations that matter at home  
- The real challenges behind it all and how they were solved  

Hopefully, my experience helps you design a setup that fits your own needs and not make the same mistakes as me.

## Inspiration

Before building Bepo, I always had a more robust VPS to run my projects and other applications. Still, I did not trust the security and privacy of my data. The saying "The cloud is just someone else's computer" always stuck with me. I wanted more control over my data and services while reducing my dependency on third-party providers.

It started with a [Dell Optiplex 7010](https://www.amazon.ca/Dell-Optiplex-7010-Professional-Refurbished/dp/B01LKOZEF0?th=1) I picked up for free and a [Lenovo ThinkCentre M93P](https://www.ebay.ca/itm/255116333817) I got for 20 dollars, eventually ending up with my Lenovo ThinkServer TD340.

## Hardware Specifications & Cost

![Hardware Specifications](/blog/extra/hardware-specs.jpg)

Bepo is built on a Lenovo ThinkServer TD340, an enterprise-grade server targeted at smaller businesses, released in 2013. I got it for 60 dollars from a local seller who had it sitting in brand-new condition. After some research, it turned out to be a great deal and compatible with relatively inexpensive parts.

Here are the hardware specifications of my setup and how much it cost me:

- **Model:** Lenovo ThinkServer TD340  
  - Cost: 60 dollars  
  - Notes: *Came with 16 GB of DDR3 1333 MHz ECC RAM and 1x Intel Xeon E5-2420 v2*
- **CPU:** 2x Intel Xeon E5-2450 v2 (8 cores, 16 threads each, totaling 16c/32t)  
  - Cost: 20 dollars
- **Memory:** 110 GB DDR3 1333 MHz ECC RAM  
  - Cost: 50 dollars  
  - Notes: Picked up 94 GB of matching sticks off a local recycler
- **Storage:**
  - 2x 14 TB Exos Mach.2 HDD: 269.18 dollars each  
  - 1x 10 TB IronWolf Pro HDD: 246.39 dollars  
  - 4x 2 TB Seagate Constellation HDD: Free  
  - 1x Crucial MX500 1 TB SSD: 70 dollars  
  - 1x Kingston KC600 256 GB SSD: Free  

#### Total Cost: 984.75 dollars

## The Core Infrastructure: OS, Storage, and Virtualization

My server runs a combination of bare-metal services, containerized applications, and full virtual machines, managed through specific software choices.

### Operating System & Containerization

![Virtualization Setup](/blog/extra/virtualization-showcase.jpg)

- **Host Operating System:** Ubuntu Server 24.04 LTS  
- **Containerization:** Docker and Docker Compose  

I chose a bare-metal Ubuntu Server installation as the foundation. The vast majority of my applications run inside **Docker containers**, managed using **Docker Compose**. This gives me lightweight isolation, simpler deployment, a clean host OS, and straightforward dependency management. Each application or logical group of services has its own `docker-compose.yml` file for easy management.

### Virtualization Layer: KVM & Libvirt

While Docker is my primary tool, sometimes a full virtual machine is necessary or just more appropriate.

- **Hypervisor:** KVM (Kernel-based Virtual Machine), integrated directly into the Linux kernel and capable of excellent performance  
- **Management Toolkit:** `libvirt`, which provides a stable, unified API and tooling (`virsh` on the command line, `virt-manager` on a remote desktop, or integration via web UIs like Cockpit) to manage KVM virtual machines

**Why use VMs alongside Docker?**

- **Operating System Diversity:** Running workloads that require a completely different OS (for example, Windows Server for specific applications, or testing different Linux distributions).  
- **Full Kernel Isolation:** When I want stronger security boundaries than containers provide, or when something needs kernel-level access or tweaks.  
- **Hardware Passthrough:** Assigning specific hardware devices directly to a VM (like a GPU for transcoding or a USB device).  
- **Legacy Applications:** Running older or awkward applications that are not easily containerized.

VMs do consume more resources (RAM and disk space for the full OS) than containers, but they give me maximum compatibility and isolation when needed. VM disk images live on the SSD for better performance.

### Storage Strategy: MergerFS and SnapRAID

![SnapRAID Strategy](/blog/extra/snapraid.jpg)

My primary storage goal was to combine my data drives (14 TB and 10 TB) into a single, large pool while maintaining redundancy against single drive failure. Hardware RAID was not ideal because of the mismatched drive sizes.

So I went with a two-layer approach.

1. **MergerFS**  
   I use `mergerfs` to create a unified filesystem view (`~/pool`) from my individual data drives (`/mnt/data1`, `/mnt/data2`, `/mnt/data3`, `/mnt/data4`, `/mnt/data5`). This presents all the files across these drives as if they were in one large directory, which simplifies data access for applications and VMs that need bulk storage. It pools space but does not provide redundancy.

2. **SnapRAID**  
   For data protection, I use SnapRAID. It calculates parity information from the data drives (`/mnt/data1` to `/mnt/data5`) and stores it on dedicated parity drives (`/mnt/parity1` and `/mnt/parity2`). If a data drive fails, I can recover its contents using the parity data.

### Why SnapRAID?

When I started looking at redundancy options, RAID 5 was an early contender, but the existing mix of drive sizes (14 TB, 10 TB, and smaller drives) clashed with standard RAID levels.

My requirements were:

- Ability to use differently sized drives  
- Ability to add drives later without rebuilding the entire array  
- Decent read performance (writes are less critical for my media)  
- Full control over the setup  

This pushed me to compare Unraid and SnapRAID.

- **Unraid:** Popular, but it is a full OS, requires a license, and felt like more overhead than I wanted in a Linux-first environment.  
- **SnapRAID:** Open source, flexible, and handles mixed drive sizes and expansion very well. The tradeoff is that parity is not real-time, so you need manual or scheduled `sync` commands. I run these daily via cron, which usually takes 15 to 30 minutes. This is totally fine for my use case. I also schedule regular `scrub` commands to check data integrity.

### File Layout & Data Management

My file structure is designed around clarity and separation of concerns:

- `~/apps`  
  Contains Docker Compose files and application **configuration** data (bind-mounted volumes). This lives on the fast SSD.

- `~/vms`  
  Stores virtual machine disk images (qcow2 files). Also on the SSD for performance.

- `~/pool`  
  The MergerFS pooled mount point for all bulk data (the data drives). Inside that:

  - `media/` - All media files (movies, TV shows, music)  
  - `share/` - General network shares (for example, SMB/CIFS)  
  - `downloads/` - Temporary storage for downloads  
  - `backups/` - Backup storage (VM backups, configuration backups, Time Machine backups, etc.)

## Networking, Security, and Applications

With the core infrastructure defined, here is how networking, security, and actual applications are put together.

### Networking Approach

![Networking](/blog/extra/network-diagram.jpg)

- **Exposure:** `Cloudflared` tunnels provide secure, easy-to-manage public access to specific web services without opening firewall ports or wrestling with SSL certificates directly.  
- **VPN:** `Gluetun` manages VPN connections for specific containers (mainly `qBittorrent`), so their traffic is routed securely.  
- **DNS and Ad Blocking:** `Pi-hole` acts as my local DNS resolver and blocks ads and trackers across the network.  
- **Internal Git:** `Soft-Serve` provides a self-hosted Git server.  
- **Container and VM Networking:** Docker networks isolate application groups, while libvirt manages virtual networks for VMs. These can be bridged to the LAN or kept isolated. Only the services that genuinely need it are exposed externally.

### Security Measures

![Security Measures](/blog/extra/security-measures.jpg)

Security is a priority, especially once anything touches the public internet.

- **Access Control:** Public access is strictly limited via `Cloudflared`. Internal access uses strong passwords and SSH keys.  
- **Firewall:** UFW (Uncomplicated Firewall) is configured with a default deny policy.  
- **Intrusion Detection and Prevention:** [Crowdsec](https://www.crowdsec.net/) monitors logs and automatically blocks malicious IPs.  
  - **Log Monitoring:** Automated log scanning covers `Pi-hole`, Docker containers, and system logs for unusual activity. I wrote a custom script that aggregates and analyzes logs, sending alerts when domains or addresses show abnormally high DNS request counts.  
- **Vulnerability Scanning:** `OpenVAS` (via an `open-vas` container) runs periodic vulnerability scans.  
- **Updates:** `Watchtower` automatically updates Docker containers. Regular OS updates and `libvirt`/KVM updates are handled manually, and VM guest OS updates are done inside each VM.

### The Application Ecosystem (via Docker)

![Application Ecosystem](/blog/extra/application-ecosystem.jpg)

Most of my day-to-day services run as Docker containers for efficiency and ease of management.

**Cloud and Productivity**

- `Nextcloud` - My core personal cloud for files, contacts, calendars, and photos.  
- `Paperless-ngx` - Ingests, OCRs, and manages scanned documents, making them searchable.  
- `Affine` / `Siyuan` - I am exploring these for knowledge management and collaborative note-taking or whiteboarding.  
- `Cloudbeaver` - Web-based UI for managing various databases.  
- `Pocketbase` - Simple, self-hosted backend-as-a-service (database, auth, file storage).  
- `Glance` - A self-hosted dashboard to monitor services and servers.  
- `Hoarder` - Bookmarking and content curation service.

**Development and CI/CD**

- `Coder` - Provides remote development environments in the browser, similar to VS Code.  
- `Jenkins` - Automates building, testing, and deploying my software projects.  
- `Supabase` - Open source Firebase alternative (Postgres DB, Auth, Storage, Functions).  
- `Soft-Serve` - Self-hosted Git server.

**File Sharing**

- `Spacebin` - Temporary text or code snippet sharing (pastebin alternative).  
- `Zipline` - File sharing with URL shortening and image hosting support.

**Media Management**

- `Jellyfin` - Media server for streaming movies, TV shows, and music.  
- `Sonarr` - Automates downloading and managing TV series.  
- `Radarr` - Automates downloading and managing movies.  
- `Prowlarr` - Central indexer manager for Sonarr, Radarr, and related tools.  
- `qBittorrent` (x2) - Torrent clients for downloading Linux ISOs and other content.  
- `Autobrr` - Monitors IRC announce channels for releases and forwards them to download clients.  
- `Unpackerr` - Automatically extracts downloaded archives.

**Networking and Infrastructure**

- `Cloudflared` - Secure tunneling for public access.  
- `Gluetun` - VPN client container manager.  
- `Pi-hole` - Network-wide ad and tracker blocking DNS sinkhole.

**System Management and Monitoring**

- `Portainer` - Web UI for managing Docker environments (containers, images, networks, volumes).  
- `Watchtower` - Automatically updates running Docker containers.  
- `Dashdot` - Clean server dashboard with real-time stats.  
- `Umami` - Simple, privacy-friendly web analytics.  
- `Ntfy` - Push notification service (publish/subscribe) for scripts and services.

**Utilities**

- `IT-Tools` - A collection of useful tools (converters, formatters, etc.) self-hosted.  
- `13ft` - Alternative frontend for bypassing certain website paywalls or restrictions (use responsibly).

## Challenges Faced and Lessons Learned

Building and maintaining a homelab is a continuous learning process, usually involving late nights and unexpected problems. Here are some of the bigger challenges I ran into and what they taught me.

### Challenge 1: Taming the Chaos - Organization is Key

- **The Problem:** My early server setups had no structure. Some apps were in Docker, some were installed directly on the host, configs were scattered, and I documented almost nothing. This became a mess and made troubleshooting and updates painful.  
- **The Lesson and Solution:** A strict, documented filesystem layout made a huge difference. Separating OS/configs (SSD) from bulk data (HDD pool) and VM images (SSD) brought clarity. Committing to Docker Compose for containerized apps enforced consistency. Now, everything is managed deliberately, which keeps the system predictable and easier to maintain.

### Challenge 2: Wrestling with Aging Hardware - Compatibility Hurdles

- **The Problem:** Using an older enterprise box like the ThinkServer TD340 meant weird parts and potential compatibility issues. Finding a replacement CPU cooler for the LGA 1366 socket with its specific mounting was incredibly annoying.  
- **The Lesson and Solution:** Do thorough research before buying older or enterprise hardware. Check compatibility lists, forum posts, and part availability. I eventually found an obscure compatible cooler online, but proper planning could have saved a lot of time and stress.

### Challenge 3: Fortifying the Gates - Initial Security Naivety

- **The Problem:** The first time I exposed a server to the internet, I underestimated the security risks. Lack of proper firewall rules and monitoring led to a compromise, and a crypto miner ran undetected for weeks.  
- **The Lesson and Solution:** Security cannot be an afterthought. That incident pushed me into Linux security fundamentals: `UFW`/`iptables`, intrusion detection (`Crowdsec`), regular vulnerability scanning (`OpenVAS`), reducing the attack surface (Cloudflared tunnels instead of direct port forwards), and sane practices like strong passwords, SSH keys, and regular updates. Proactive monitoring using `Pi-hole` and log analysis is now part of the routine.

### Challenge 4: Untangling the Network - Complexity Creep

- **The Problem:** As the number of services grew (containers, VMs, internal tools, public endpoints), network management became a tangle. I originally bound Docker container ports directly on the host, which led to conflicts and headaches. On top of that, routing only specific containers through a VPN (`Gluetun`) while others used the LAN directly added more complexity.  
- **The Lesson and Solution:** Plan your network architecture up front. Migrating from host-bound ports to dedicated **private Docker networks** improved isolation and manageability. Using Docker networks alongside libvirt virtual networks for VMs, and centralizing DNS with `Pi-hole`, helped bring order. Carefully mapping which services need external access versus internal-only access makes firewall rules and routing much easier to reason about, and tools like `Gluetun` fit more cleanly into that structure.

### Challenge 5: Avoiding Lockouts - The Perils of Remote Management

- **The Problem:** Misconfiguring SSH, UFW, or network interfaces used to lock me out regularly. This usually meant a physical visit with a monitor and keyboard to fix things.  
- **The Lesson and Solution:** Out-of-band management is a lifesaver. IPMI on the ThinkServer, or a PiKVM, gives you console access that is independent of the OS network stack. That makes remote troubleshooting and initial setup far safer. And regardless, double-check network or firewall changes before applying them remotely.

### Challenge 6: Balancing Act - Containers vs VMs

- **The Problem:** With both Docker and KVM/libvirt available, choosing the right option for a new workload is not always obvious. Using a VM when a container would do wastes resources; trying to cram an awkward workload into a container can be just as bad.  
- **The Lesson and Solution:** Understand the tradeoffs and be honest about requirements. Docker is my default for standard applications due to efficiency and simple deployment. VMs are reserved for full OS isolation, special hardware requirements, or non-Linux operating systems. Once you start running multiple VMs alongside a lot of containers, resource planning for CPU cores and RAM allocation becomes much more important.

### Challenge 7: Ensuring Mount Points - MergerFS Boot Timing

- **The Problem:** Many containers depend on the pooled storage at `~/pool` via `mergerfs`. Early on, I hit issues where the system would boot and Docker would start before the `mergerfs` mount was ready. Containers failed at startup because their volumes did not exist yet. Basic `fstab` settings were not always enough to guarantee the right timing.  
- **The Lesson and Solution:** FUSE mounts like `mergerfs` need explicit ordering during boot when other services depend on them. I ended up creating custom systemd unit files that define clear dependencies, so the `mergerfs` mount completes successfully before Docker or specific application services start. That guarantees the pooled storage is ready when the containers need it.

## Conclusion

Building and evolving Bepo has been a fantastic learning experience, touching everything from hardware and Linux administration to Docker, KVM/libvirt, networking, storage with MergerFS and SnapRAID, and security best practices. It has taught me a lot about managing and securing my own infrastructure and data. The current setup, balancing efficient containers with flexible VMs, has become genuinely useful day to day.

I hope this overview gives you ideas for your own homelab journey, whether you are starting from an old office PC or already running a few services. If you have any questions, feel free to reach out.

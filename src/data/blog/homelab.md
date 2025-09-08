---
title: "Bepo: My Homelab Setup"
description: "A look at my homelab setup: server specs, network configuration, storage strategy, virtualization with KVM/libvirt, and the extensive suite of self-hosted services."
date: "2025-02-12"
author: "Ashwin C."
cover_image: "/blog/homelab.png"
tags: "self-hosting, homelab, server"
---

# Table of Contents
- [Introduction](#introduction)
- [Inspiration](#inspiration)
- [Hardware Specifications & Cost](#hardware-specifications--cost)
- [The Core Infrastructure: OS, Storage, and Virtualization](#the-core-infrastructure-os-storage-and-virtualization)
  - [Operating System & Containerization](#operating-system--containerization)
  - [Virtualization Layer: KVM & Libvirt](#virtualization-layer-kvm--libvirt)
  - [Storage Strategy: MergerFS + SnapRAID](#storage-strategy-mergerfs--snapraid)
  - [Why SnapRAID?](#why-snapraid)
  - [File Layout & Data Management](#file-layout--data-management)
- [Networking, Security, and Applications](#networking-security-and-applications)
  - [Networking Approach](#networking-approach)
  - [Security Measures](#security-measures)
  - [The Application Ecosystem (via Docker)](#the-application-ecosystem-via-docker)
- [Challenges Faced and Lessons Learned](#challenges-faced-and-lessons-learned)
- [Conclusion](#conclusion)

# Bepo: My HomeLab Adventure (Containers & VMs)

**Bepo**, my very own HomeLab, is the fruit of my past mistakes, learnings, and experiences setting up my own server. Currently built on a [Lenovo Thinkserver TD340](https://www.lenovo.com/ph/en/p/servers-storage/servers/towers/thinkserver-td340/77ls7td340d), this post details the hardware setup, my storage and software strategy (including both **Docker containers** and **KVM virtual machines**), the extensive suite of applications I run, problems I faced, and how I overcame them. Hopefully, you can learn from my journey and build your own HomeLab one day!

## Inspiration

Before setting up a home lab, I always had a more robust VPS to run my projects and other applications. Still, I did not trust the security and privacy of my data. The saying "The cloud is just someone else's computer" always stuck with me. I wanted more control over my data and services while reducing my dependency on third-party providers. It started with a [Dell Optiplex 7010](https://www.amazon.ca/Dell-Optiplex-7010-Professional-Refurbished/dp/B01LKOZEF0?th=1) I picked up for free, a [Lenovo ThinkCentre M93P](https://www.ebay.ca/itm/255116333817) I got for $20 working together, and finally, my Lenovo ThinkServer TD340.

## Hardware Specifications & Cost

My home lab is built on a Lenovo ThinkServer TD340, an enterprise-grade server targeted for smaller businesses, released in 2013. I got it for $60 from a local seller who had it sitting in brand-new condition. After some research, it was a great deal and compatible with relatively inexpensive hardware. Here are the key specifications of my setup:

-   **Model:** Lenovo ThinkServer TD340
    -   Cost: $60
    -   Notes: *Came with 16GB of DDR3 1333MHz ECC RAM & 1x Intel Xeon E5-2420 v2*
-   **CPU:** 2x Intel Xeon E5-2450 v2 (8 cores, 16 threads each, totaling 16c/32t)
    -   Cost: $20
-   **Memory:** 101GB DDR3 1333MHz ECC RAM
    -   Cost: $50
-   **Storage:**
    -   Data Drives: 1x 14TB Exos Mach.2, 1x 10TB IronWolf Pro, 3x 2TB Generic HDD (`/mnt/data1`, `/mnt/data2`, `/mnt/data3`, `/mnt/data4`, `/mnt/data5`)
    -   Parity Drive: 1x 14TB Exos Mach.2, 1x 2TB Generic HDD (`/mnt/parity1`, `/mnt/parity2`)
    -   OS/Appdata/VM Drive: 1x Crucial MX500 1TB (SATA SSD)
    -   Cost: $854.75 = $269.18 x 2 + $246.39 + $70

#### Total Cost: $984.75

## The Core Infrastructure: OS, Storage, and Virtualization

My server runs a combination of bare-metal services, containerized applications, and full virtual machines, managed through specific software choices.

### Operating System & Containerization

-   **Host Operating System:** Ubuntu Server 24.04 LTS
-   **Containerization:** Docker & Docker Compose

I chose a bare-metal Ubuntu Server installation as the foundation. The vast majority of my applications run inside **Docker containers**, managed using **Docker Compose**. This approach offers lightweight isolation, simplifies deployment, keeps the host OS clean, and makes managing dependencies straightforward. Each application or service group has its own `docker-compose.yml` file for easy management.

### Virtualization Layer: KVM & Libvirt

While Docker is my primary tool, sometimes a full virtual machine is necessary or more appropriate.
-   **Hypervisor:** KVM (Kernel-based Virtual Machine) - integrated directly into the Linux kernel, offering excellent performance.
-   **Management Toolkit:** `libvirt` - provides a stable, unified API and tools (`virsh` command-line, `virt-manager` GUI on a remote desktop, or integration with web UIs like Cockpit) to manage KVM virtual machines.

**Why use VMs alongside Docker?**
* **Operating System Diversity:** Running workloads that require a different OS entirely (e.g., Windows Server for specific applications, testing different Linux distributions).
* **Full Kernel Isolation:** When stronger security boundaries are needed than containers provide, or when an application needs deep kernel-level access/modifications.
* **Hardware Passthrough:** Assigning specific hardware devices (like a GPU for transcoding or a USB device) directly to a VM.
* **Legacy Applications:** Running older applications that aren't easily containerized.

VMs consume more resources (RAM, disk space for the full OS) than containers but offer maximum compatibility and isolation when needed. My VM disk images reside on the SSD for performance.

### Storage Strategy: MergerFS + SnapRAID

My primary goal was to combine my data drives (14TB and 10TB) into a single, large pool while maintaining redundancy against single drive failure. Hardware RAID wasn't ideal due to the mismatched drive sizes.

1.  **MergerFS:** I use `mergerfs` to create a unified filesystem view (`~/pool`) from my individual data drives (`/mnt/data1`, `/mnt/data2`, `/mnt/data3`, `/mnt/data4`, `/mnt/data5`). This presents all the files across these drives as if they were in one large directory, simplifying data access for my applications and VMs needing bulk storage access. It pools the space without providing redundancy itself.
2.  **SnapRAID:** For data protection, I use SnapRAID. It calculates parity information from the data drives (`/mnt/data1`, `/mnt/data2`, `/mnt/data3`, `/mnt/data4`, `/mnt/data5`) and stores it on a dedicated parity drives (`/mnt/parity1` & `/mnt/parity2`). This allows me to recover the data from a failed drive using the parity information.

### Why SnapRAID?

When looking at redundancy options, RAID 5 was initially considered, but my existing mix of drive sizes (14TB, 10TB) limited standard RAID levels. My requirements were:

-   Ability to use differently sized drives.
-   Ability to add drives later without rebuilding the entire array.
-   Decent performance for reads (writes are less critical for my media).
-   Full control over the setup.

This led me to compare Unraid and SnapRAID:

-   **Unraid:** A popular choice, but it's a full OS, requires a license, and felt like more overhead than I needed for my primarily Linux-based environment.
-   **SnapRAID:** An excellent, open-source alternative. It perfectly handles mixed drive sizes and expansion. The main trade-off is that parity is *not* real-time. It requires manual or scheduled `sync` commands to update the parity data. I run this daily via a cron job, which typically takes 15-30 minutes. This is acceptable for my use case. I also schedule regular `scrub` commands to check data integrity.

### File Layout & Data Management

My file structure is designed for clarity and separation of concerns:

-   `~/apps`: Contains Docker Compose files and application *configuration* data (bind-mounted volumes). This resides on the fast SSD.
-   `~/vms`: Stores virtual machine disk images (qcow2 files). Also on the SSD for performance.
-   `~/pool`: The MergerFS pooled mount point for all bulk data (`/mnt/data1` + `/mnt/data2`).
    -   `media/`: All media files (movies, TV shows, music).
    -   `share/`: General network shares (e.g., SMB/CIFS).
    -   `downloads/`: Temporary storage for downloads.
    -   `backups/`: Backup storage location (e.g., VM backups, configuration backups, time machine backups).

## Networking, Security, and Applications

With the core infrastructure defined, here's how networking, security, and the actual applications are handled.

### Networking Approach

-   **Exposure:** `Cloudflared` tunnels provide secure, easy-to-manage public access to specific web services without opening firewall ports or complex SSL certificate management.
-   **VPN:** `Gluetun` manages VPN connections for specific containers (primarily `qBittorrent`) ensuring their traffic is routed securely.
-   **DNS & Ad-Blocking:** `Pi-hole` serves as my local DNS resolver, blocking ads and trackers network-wide.
-   **Internal Git:** `Soft-Serve` provides a self-hosted Git server.
-   **Container & VM Networking:** Docker's internal networking isolates application groups. Libvirt manages virtual networks for VMs, which can be bridged to the LAN or kept isolated as needed. Only necessary services are exposed externally.

### Security Measures

Security is paramount:
-   **Access Control:** Public access is strictly limited via `Cloudflared`. Internal access uses strong passwords and SSH keys.
-   **Firewall:** UFW (Uncomplicated Firewall) is configured with a default deny policy.
-   **Intrusion Detection/Prevention:** [Crowdsec](https://www.crowdsec.net/) monitors logs and automatically blocks malicious IPs.
    - **Log Monitoring:** Automated log scanning from `Pi-hole`, Docker containers, and system logs for unusual activity. I wrote a custom script to aggregate and analyze logs, sending alerts for domains/addresses that have a high number of DNS requests.
-   **Vulnerability Scanning:** `OpenVAS` (via `open-vas` container) is used for periodic vulnerability scans.
-   **Updates:** `Watchtower` automatically updates Docker containers. Regular OS updates and `libvirt`/KVM updates are applied manually. VM guest OS updates are managed within the VMs themselves.

### The Application Ecosystem (via Docker)

The vast majority of my day-to-day services run as Docker containers for efficiency and ease of management:

**Cloud & Productivity:**
* `Nextcloud`: My core personal cloud for files, contacts, calendars, and photos.
* `Paperless-ngx`: Ingests, OCRs, and manages scanned documents, making them searchable.
* `Affine`/`Siyuan`: Exploring these for knowledge management and collaborative note-taking/whiteboarding.
* `Cloudbeaver`: Web-based UI for managing various databases.
* `Pocketbase`: Simple, self-hosted backend-as-a-service (database, auth, file storage).
* `Glance`: A self-hosted dashboard to monitor services and servers.
* `Hoarder`: A bookmarking and content curation service.

**Development & CI/CD:**
* `Coder`: Provides remote development environments accessible via a browser (like VS Code).
* `Jenkins`: Automates building, testing, and deploying my software projects.
* `Supabase`: Open-source Firebase alternative (Postgres DB, Auth, Storage, Functions).
* `Soft-Serve`: Self-hosted Git server.

**File Sharing:**
* `Spacebin`: Temporary text/code snippet sharing (pastebin alternative).
* `Zipline`: File sharing service with features like URL shortening and image hosting.

**Media Management:**
* `Jellyfin`: Media server for streaming movies, TV shows, and music.
* `Sonarr`: Automates downloading and management of TV series.
* `Radarr`: Automates downloading and management of movies.
* `Prowlarr`: Manages indexer configurations for Sonarr, Radarr, etc.
* `qBittorrent` (x2): Torrent clients for downloading Linux ISOs and other content.
* `Autobrr`: Monitors IRC announce channels for releases and sends them to download clients.
* `Unpackerr`: Automatically extracts downloaded archives.

**Networking & Infrastructure:**
* `Cloudflared`: Secure tunneling for public access.
* `Gluetun`: VPN client container manager.
* `Pi-hole`: Network-wide ad and tracker blocking DNS sinkhole.

**System Management & Monitoring:**
* `Portainer`: Web UI for managing Docker environments (containers, images, networks, volumes).
* `Watchtower`: Automatically updates running Docker containers.
* `Dashdot`: Minimalist, beautiful server dashboard showing real-time stats.
* `Umami`: Simple, privacy-focused web analytics.
* `Ntfy`: Push notification service (publish/subscribe model) for scripts and services.

**Utilities:**
* `IT-Tools`: A collection of useful online tools (converters, formatters, etc.) self-hosted.
* `13ft`: Alternative frontend for bypassing certain website paywalls/restrictions (use responsibly).

## Personal Infrastructure Security
Because all of my devices DNS traffic pass through Pi-Hole I am able to analyze and keep track of what devices are making the most requests. I wrote a custom script that aggregates and analyzes logs, sending alerts for domains/addresses that have a high number of DNS requests. This helps me identify any unusual activity or potential security issues on all of my devices. Although using something like Wazuh would be more robust, this simple solution works well for my needs.

## Challenges Faced and Lessons Learned

Building and maintaining a homelab is a continuous learning process, often involving late nights and unexpected problems. Here are some key challenges I encountered and the lessons derived:

#### **Challenge 1: Taming the Chaos - Organization is Key**

* **The Problem:** My initial server setups lacked structure. Applications were installed haphazardly (some Docker, some bare-metal), configurations were scattered, and documentation was non-existent. This quickly became unmanageable, leading to confusion during troubleshooting and updates.
* **The Lesson & Solution:** Implementing a strict, documented file system layout was crucial. Separating OS/Configs (SSD) from bulk data (HDD pool) and VM images (SSD) brought clarity. Adopting Docker Compose exclusively for containerized apps enforced consistency. *Everything* is now managed deliberately, making the system predictable and easier to maintain.

#### **Challenge 2: Wrestling with Aging Hardware - Compatibility Hurdles**

* **The Problem:** Using an older enterprise server like the ThinkServer TD340 meant dealing with less common parts and potential compatibility issues. Finding a replacement CPU cooler for the specific LGA 1366 socket with its unique mounting mechanism proved incredibly difficult.
* **The Lesson & Solution:** Thorough research *before* purchasing hardware is essential, especially for older or enterprise gear. Check compatibility lists, forum discussions, and part availability. Patience and persistence paid off when I eventually found an obscure compatible cooler online, but planning ahead could have saved significant time and stress.

#### **Challenge 3: Fortifying the Gates - Initial Security Naivety**

* **The Problem:** When I first set up a server exposed to the internet, I underestimated the security risks. Lack of proper firewalling and monitoring led to a compromise – a crypto miner was installed and ran undetected for weeks.
* **The Lesson & Solution:** Security cannot be an afterthought. This incident forced me to dive deep into Linux security fundamentals: `UFW`/`iptables` for firewalling, intrusion detection systems (`Crowdsec`), regular vulnerability scanning (`OpenVAS`), minimizing the attack surface (using `Cloudflared` tunnels instead of direct port forwarding), and adopting secure practices like strong passwords, SSH keys, and regular updates. Proactive monitoring (checking logs via `Pi-hole` and other tools) is vital.

#### **Challenge 4: Untangling the Network - Complexity Creep**

* **The Problem:** As the number of services grew (containers, VMs, internal tools, exposed services), managing network traffic became complex. I initially relied on binding Docker container ports directly to the host, which led to port conflicts and management headaches. Furthermore, ensuring *specific* containers routed their traffic through a VPN (using `Gluetun`) while others accessed the LAN directly added another layer of complexity.
* **The Lesson & Solution:** Planning the network architecture upfront is critical. Transitioning away from host-bound ports to using dedicated, **private Docker networks** for container communication significantly improved isolation and manageability. Utilizing Docker's network features, alongside setting up dedicated virtual networks for VMs via `libvirt` and centralizing DNS (`Pi-hole`), helped impose order. Carefully mapping out which services need external access versus internal-only access simplifies firewall rules and routing, and tools like `Gluetun` become easier to integrate correctly within this structured network environment.

#### **Challenge 5: Avoiding Lockouts - The Perils of Remote Management**

* **The Problem:** Early on, misconfiguring SSH, firewall rules (`UFW`), or network interfaces often resulted in locking myself out of remote access, requiring the "walk of shame" to physically connect a monitor and keyboard.
* **The Lesson & Solution:** Discovering and utilizing out-of-band management like IPMI (available on the ThinkServer) or building a PiKVM was a game-changer. These tools provide console access independent of the operating system's network configuration, making remote troubleshooting and initial setup vastly easier and safer. Always double-check network/firewall changes before applying them remotely!

#### **Challenge 6: Balancing Act - Containers vs. VMs**

* **The Problem:** With both Docker and KVM/libvirt available, deciding which technology to use for a new application or service requires consideration. Using VMs when a container would suffice wastes resources; trying to force an unsuitable application into a container can be overly complex.
* **The Lesson & Solution:** Understand the trade-offs. Docker is generally preferred for its efficiency and ease of deployment for standard applications. VMs are reserved for tasks requiring full OS isolation, specific hardware access, or running non-Linux operating systems. Resource planning (CPU cores, RAM allocation) becomes more critical when running multiple VMs alongside many containers.

#### **Challenge 7: Ensuring Mount Points - MergerFS Boot Timing**

* **The Problem:** My Docker containers rely heavily on the pooled storage provided by `mergerfs` at `~/pool`. Initially, I faced issues where the system would boot, and the Docker service would start *before* the `mergerfs` mount was ready. This caused containers to fail at startup because their required volumes weren't accessible. Standard `fstab` entries sometimes weren't sufficient to guarantee the timing.
* **The Lesson & Solution:** File system mounts, especially FUSE-based ones like `mergerfs`, need to be explicitly ordered in the boot process if other services depend on them. I learned to create custom systemd unit files or scripts. These explicitly define dependencies, ensuring the `mergerfs` mount service runs and completes successfully *before* the Docker service (or specific application services) attempts to start. This guarantees the pooled storage is available when needed.

## Conclusion

Building and evolving Bepo has been a fantastic learning experience, diving deep into hardware, Linux administration, containerization with Docker, virtualization with KVM/libvirt, networking, storage solutions like MergerFS and SnapRAID, and security best practices. It has taught me invaluable lessons about managing and securing my own infrastructure and data. The current setup, balancing efficient containers with flexible VMs, provides immense utility. I hope this detailed overview inspires you to embark on your own homelab journey or provides some ideas for your existing setup. If you have any questions, feel free to reach out!
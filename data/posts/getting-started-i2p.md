---
title: 'Explore I2P: A Tor Alternative'
date: '2023-01-06T00:00:00.000Z'
excerpt: 'Alternative to browsing on the Tor network'
tags: ["i2p", "security", "peer-to-peer"]
cover_image: '/static/images/posts/getting-started-i2p.png'
icon: 'logos:markdown'
author: 'Ashwin'
---
# Introduction

## What is I2P?
I2P is a popular service which has the same goals as the well known TOR browser providing the user to browse the internet anonymously and with the utmost privacy. Similar to torrenting it works via peers. With Tor you are using a centralized client-server architecture and it has a higher possibility of being vunerable to attacks. With i2P you are using a peer-to-peer decerlized network which makes it much more secure and less prone to being attacked. Due to the FBI using methods such as traffic analysis to track down users of the TOR network, I2P has become a popular alternative.

## How does it work?
For the full documentation and specification for all the protocols used by I2P it's available on their website [here](https://geti2p.net/en/docs). Written in Java, I2P is a peer-to-peer network that uses a distributed hash table to store and retrieve data. The network is made up of thousands of computers, called routers, that are connected to each other. The routers are responsible for storing and retrieving data, and they are also responsible for creating tunnels that allow data to be sent from one router to another. The routers are also responsible for encrypting and decrypting data, so that the data is not readable by anyone other than the intended recipient.

## TOR vs I2P
- Architecture: I2P uses a decentralized, peer-to-peer architecture, while Tor uses a centralized client-server architecture. This means that I2P is less reliant on any single entity or server, and is therefore more resilient to attacks.

- Network size: I2P has a smaller network size compared to Tor, which means that it may not be as fast or as widely used.

- Use cases: I2P is often used for anonymous communication, such as web browsing, messaging, and file sharing. Tor, on the other hand, is more widely used for a variety of purposes, including anonymous communication, access to the "dark web," and bypassing censorship.

- Security: Both I2P and Tor provide strong anonymity protection, but I2P is designed to be more secure against certain types of attacks, such as traffic analysis.

- Routing: I2P uses a routing algorithm called Garlic Routing, which is designed to be more efficient and secure than the Onion Routing algorithm used by Tor.

# Getting Started

## Installation
I2P is currently supported on almost all platforms, to check if your platform is supported you can check [here](https://geti2p.net/en/download). For this tutorial I will be using Windows alongside the Firefox browser.

### Step 1: Download and Setup I2P
Straightforward, just download the latest version of I2P from [here](https://geti2p.net/en/download). Once downloaded, run the installer and follow the instructions.

### Step 2: Follow I2P Setup Wizard
![I2P Setup Wizard](https://safe.1m.cx/SBJxu5cb.png)
After you install and start the router you will be prompted to setup, this setup proccess basically goes through configuration of traffic and data through your network. Everything should be straightforward and you can just click next until you reach the end.

> Note: You maybe be prompted to install their I2P profile for Firefox, however you can skip all of that.

### Step 3: Configure Firefox
Now that your I2P client is setup and serving you need to configure FireFox so links that end in `.i2p` can be opened in I2P.

- Open Firefox and go to your settings (`about:prefrences`)
- Search for `Network Settings` and expand the settings.
![FireFox](https://safe.1m.cx/OtlkGV8E.png)
- Once the modal opens, select `Manual proxy configuration` and enter as the following image shows. For HTTP Proxy and SSL enter `127.0.0.1` and for Port enter `4444`, then make sure you select SOCKS v5 and in the No Proxy for field enter `localhost, 127.0.0.1`. Then click OK.
![FireFox](https://safe.1m.cx/IbCoqbGf.png)
- Once you have done that head over to your FireFox config by going to `about:config` and search for the property `media.peerConnection.ice.proxy_only` and set it to `true`.

### Step 4: Done!
That's it your done! Now you can browse the internet anonymously and securely. This guide was written by looking at the websites offiical installation instructions.

> Note: These instructions were written for I2P v2.0.0-0 and FireFox v108.0.1

# Conclusion
I2P is a great alternative to the TOR network and is a great way to browse the internet anonymously and securely. I hope you enjoyed this guide and found it useful.
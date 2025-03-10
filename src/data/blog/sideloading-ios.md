---
title: "iOS Sideloading"
description: "Discover how to sideload iOS apps, bypass App Store restrictions."
date: "2025-02-05"
author: "Ashwin C."
cover_image: "/blog/sideloading-ios.jpg"
tags: "ios, sideloading, development"
---

## Table of Contents
- [Introduction](#introduction)
- [The Landscape of iOS App Installation](#the-landscape-of-ios-app-installation)
   - [Why Sideload?](#why-sideload)
- [The Workaround: Self-Signing Certificates](#the-workaround-self-signing-certificates)
- [How to Sign Your Apps](#how-to-sign-your-apps)
- [Step-by-Step Guide: Using E-Sign to Import and Sign Certificates](#step-by-step-guide-using-e-sign-to-import-and-sign-certificates)
   - [Step 1: Import Your Certificates](#step-1-import-your-certificates)
   - [Step 2: Signing an IPA File](#step-2-signing-an-ipa-file)
- [Alternatives](#alternatives)
- [Tips and Additional Insights](#tips-and-additional-insights)
- [Conclusion](#conclusion)

Sideloading on iOS is a way to install applications from their IPA file, which I thought would be a very technical task requiring you to jailbreak your phone. However, it couldn't be simpler. By signing apps this way, you are still eligible for hardware support since your phone has not been modified in any way. It is the best way to download apps outside Apple's strict App Store ecosystem.


## The Landscape of iOS App Installation

Apple's iOS has long been synonymous with a controlled environment, where every app must pass through the App Store's rigorous review process. This strict curation ensures security and quality but comes at the cost of flexibility; unlike Android, which allows users to install applications via APK files, iOS confines app installations mainly to the App Store or TestFlight for beta testing. This makes it hard for developers to get their apps on the app store without facing the mandatory fees and strict filtering process.

### Why Sideload?

So, why would anyone consider sideloading apps? Here are a few reasons why I personally sideload:

- **Ad-Free Experience:** I use pi.hole and various plugins to block ads on all my devices; however, I hate the mobile ad experience. Almost all third-party apps have some built-in ad component delivered from their CDN servers, making it hard to block without modifying the app itself.

- **Support for Open Source:** As an avid open source advocate, I love testing out new applications from GitHub; however, regardless of how well the app is created, most of them remain unpublished due to the App Store charging high developer fees. 

- **Enhanced Functionality:** Some apps, dubbed "PlusPlus" apps, provide extra features that bypass/add features for apps, allowing for ease of use and a more streamlined experience. These are crucial for apps that are no longer on the app store. 

While TestFlight does offer a route to sideload apps, it comes with limitations—most notably, a required developer certificate that costs **$99 USD** per year and a cap on the number of beta testers. This isn't a viable option for open-source developers or anyone looking for a more affordable alternative.

## The Workaround: Self-Signing Certificates

When the official paths seem restrictive, there is one way which is provided by Apple for developers who build their apps. Here’s the gist:

 **Self-Signing with Developer Certificates:** Apple allows developers to manually sign their `.ipa` files (the iOS application package) using an Apple Developer Certificate. However, the price tag of $99 USD per year for an official developer account makes this approach less accessible for casual users.

However, that is quite pricey for a user who is just looking to sign some apps for personal use, there is one alternative (though quite a gray market):

**Third-Party Providers to the Rescue:** Thankfully, several providers have stepped in to offer a cost-effective solution. These services let up to 50 users share a developer certificate for a fraction of the cost—typically between $10 and $20 USD per year. Notable providers include:
   - [AppTesters](https://apptesters.org/)
   - [Signulous](https://www.signulous.com/)

Using these services, you can obtain a certificate that lets you sideload virtually any `.ipa` file available online.


## How to Sign Your Apps

Before you get started, **make sure Developer Mode is enabled on your iOS device**. If you’re unsure how to do this, check out [Expo’s guide on enabling Developer Mode](https://docs.expo.dev/guides/ios-developer-mode/).

Once you have access to a certificate via one of the third-party providers, you’ll receive two essential files:

- **`x.p12`:** This file contains your private key and the Apple Developer Certificate.
- **`x.mobileprovision`:** This file links your apps to the Apple developer account.

With these files in hand, you’re ready to sign and install any `.ipa` file you download. The most popular tool for this task is [E-Sign](https://esign.yyyue.xyz/), an application that streamlines the process and trusted by the community.


## Step-by-Step Guide: Using E-Sign to Import and Sign Certificates

### Step 1: Import Your Certificates

1. **Open E-Sign** and navigate to the **File** tab.
2. Click on the three dots at the top-right corner and select **Import**.
3. Locate and select both your `.p12` and `.mobileprovision` files.
4. Once imported, click on the `.p12` file and choose **Import Certificate Management**. You may be prompted to enter a password if one was set.

After successfully importing, head over to the **Certificate Management** section within the **Settings** tab. Here, you can verify your certificate’s details, including its expiry date and availability for signing apps.

![Import Certificates](/blog/extra/1d04b67b490ae8ed570d0772ae87d821c1ad4780.png)

### Step 2: Signing an IPA File

1. Again in the **File** tab, click the three dots and choose **Import**.
2. Locate your desired `.ipa` file and import it into the app.
3. Switch over to the **Apps** tab, select the imported application, and tap on **Signature**.
4. After the app is signed, E-Sign will prompt you to install it. Follow the on-screen instructions, and you’ll soon have your newly signed app ready for use.

![Sign Apps](/blog/extra/e340491b54dd3c043f217316379372883c58db6a.png)

## Alternatives
There is one alternative that does not require a purchase at all. In the unpaid version of an Apple Developer account, you are able to sign apps; however, you have strict limits.
- A maximum of three apps can be signed at a time
- Certificates expire after 7 days, requiring renewal
- A companion device is required to sign them on your phone.

Rather than manually signing each application, requiring more work and an understanding of Apple Development, you can use a few applications which automate the process for you:
- [AltStore](https://altstore.io/): Open source, and the gold standard in terms of Sideloading this way, the most popular way; however, due to requiring a company app on your device, your app limit is cut down to two rather than three.
- [Sideloady](https://sideloadly.io/): Partially closed source, however does not offer the same UX as AltStore, rather it is strictly focused on installing `.ipa` files on your phone. Easier than AltStore, and you can use all three slots.


## Tips and Additional Insights

- **Stay Informed:** The world of iOS sideloading is a relatively small community, and hopefully, sideloading will eventually be added to native iOS. Monitor provider updates and community forums for the latest developments and potential workarounds.
- **Security Considerations:** While sideloading opens up a realm of possibilities, always exercise caution. Only download `.ipa` files from trusted sources to avoid compromising your device. Generally, `.ipa` files installed and run on your device cannot cause damage to your phone due to being strictly limited and strict permission control, as your device is not jailbroken; however, some apps may steal credentials or use known vulnerabilities.
- **Backup Your Certificates:** Losing your certificate files can mean losing access to your apps. Keep your `.p12` and `.mobileprovision` files, and do not share them with others as they are tied to your device UUID.


## Conclusion

Sideloading on iOS is something I believe everyone should have access to without requiring workarounds above, or a payment as it provides developers and users with a better experience. Jailbreaking your phone is also a great option to load apps, however due to warranty and certain support functionalities being voided I opted out of jailbreaking on my current phone in favour of Sideloading.

Happy sideloading, and may your iOS experience be ever more personal and powerful.
---
title: "iOS Sideloading"
description: "Build your own apps and install whatever you want; Sideloading is the way to go."
date: "2025-02-05"
author: "Ashwin C."
cover_image: "/blog/sideloading-ios.jpg"
tags: "ios,freedom,app,development"
---
## Sideloading
Apple's iOS ecosystem is known for its strict App Store policies, making sideloading—installing apps from outside the App Store—more complicated than on platforms like Android. For example, on Android, a user can download any application via an APK file; however, iOS takes an entirely polar approach, limiting application installation to strictly via the AppStore or via TestFlight. Recently, however, they announced that the [EU has support for side loading](https://support.apple.com/en-mk/117767); however, devices must be purchased and used in the EU, and there is no recent workaround for this to work in North America.

TestFlight is still viable but requires you to pay for a developer certificate. It has limited slots for beta test apps, making it hard for open-source developers to let an end user try it out without the developer publishing it in the App Store.

## Workaround
We are left with one other option, signing our own certificates. Apple lets developers manually sign their .ipa files (Application Files) with an Apple Developer Certificate. However, the certificate costs $99 USD/year, which is a steep price to sideload some applications. Thankfully, a variety of providers take advantage of the fact that up to 50 users can share a developer certificate and provide services to buy a slot in the program from $10-20 USD/year.

Some providers include:
- [AppTesters](https://apptesters.org/)
- [Signulous](https://www.signulous.com/)

## Signing Apps
> Note: Ensure you have Developer Mode enabled on your device before proceeding; if you do not [click here](https://docs.expo.dev/guides/ios-developer-mode/).

Once purchased, you provide them with your device UUID, after which they add to a developer account; you are then provided with two files to sign your applications with:
- `x.p12`: contains private key & apple developer certificate
- `x.mobileprovision`: links applications to Apple developer account

Using these two provided files, we can now start signing and using any `.ipa` file from the internet directly on your phone. To sign these apps, you first need an application that provides this functionality, the most popular of which is [ESign](https://esign.yyyue.xyz/). To start using App Signing apps, you need to sign them; depending on your provider, they will generally give you a pre-signed IPA with your certificate or offer an online service to sign an App Signer to get started.

### Using certificates with E-Sign:

#### Step 1: Import certificates
- Click the three dots on the top right on the `File` tab
- Click `Import`
- Find both your `.p12` and `.mobileprovision` files
- Once both are imported, click on the `.p12` and click on `Import Certificate Management`, enter the password if needed.

> Once imported, you should be able to head over to `Certificate Management` in the `Settings` tab and see your certificate, it's expiry and whether it is available to sign.

![Import Certificates](/blog/extra/1d04b67b490ae8ed570d0772ae87d821c1ad4780.png)

#### Step 2: Signing IPAs
- Click the three dots on the top right on the `File` tab
- Click Import
- Find your desired `.ipa` file
- Once imported, click on the `.ipa` file and press `Import app library`
- Head over to the `Apps` tab and click on the application, then `Signature`
- After signing the app, it should prompt you to install it, after which you can install it like normal.


#### Why Sideload?
Why would anyone sideload? What are the benefits of it? Although for the majority of users, the App Store is more than enough, however there are a few reasons why sideloading is something I can't live without:
- **Advertisements**: I absolutely hate the built-in app integration of ads. They constantly play and often ruin my experience when using apps such as YouTube.
- **PlusPlus Apps**: These applications provide "extra" features for applications often behind a paywall. Although I only use this with applications that are older and have a broken payment portal
- **Open Source**: I am an avid open source advocate and use open source applications as much as possible because I can trust the security and always fix bugs/issues if needed without waiting for an update. In addition, many beautifully designed open-source applications are unavailable on the App Store due to ludicrous pricing for the developer.
let refs: { [key: string]: { message: string, title: string, logo: string } } = {
    "qr": {
        "logo": "🧙‍♂️",
        "title": "Hello QR Code Traveller, Welcome To My Abode!",
        "message": "You've stumbled upon my online home. Let me show you what I'm capable of and why I love what I do. Enjoy your visit! 🚀❤️"
    }
}

function getMessage(from: string) {
    return refs[from];
}

export { getMessage }
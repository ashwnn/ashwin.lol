let refs: { [key: string]: { message: string, title: string, logo: string, color : string } } = {
    "qr": {
        "logo": "🧙‍♂️",
        "title": "Hello QR Code Traveller, Welcome To My Abode!",
        "message": "Discover my online home, where you can explore my skills and passion. Enjoy! 🚀❤️",
        "color": "bg-blue-300/80"
    },
}

function getMessage(from: string) {
    return refs[from];
}

export { getMessage }
import { Referral } from '@/types';

const refs: Record<string, Referral> = {
    "qr": {
        "logo": "🔎",
        "title": "You scanned a QR code!",
        "message": "Explore & discover my showcase of my projects, skills and experiences over the years!",
        "color": "bg-blue-300/80"
    },
};

function getMessage(from: string): Referral | undefined {
    return refs[from];
}

export default getMessage;
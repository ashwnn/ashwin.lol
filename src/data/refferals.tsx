import { ReferralSource } from "@/types";

const referrals: Record<string, ReferralSource> = {
  resume: {
    id: "resume",
    name: "Resume",
    message: "Thanks for checking out my resume! Feel free to explore more of my work.",
    icon: "document"
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    message: "Welcome from LinkedIn! Thank you for checking my website out.",
    icon: "linkedin"
  },
  github: {
    id: "github",
    name: "GitHub",
    message: "Hello fellow developer! Thanks for visiting from GitHub.",
    icon: "github"
  },
  email: {
    id: "email",
    name: "Email",
    message: "Thanks for visiting from my email!",
    icon: "email"
  },
};

export default referrals;
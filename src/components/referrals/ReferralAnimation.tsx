"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReferralSource } from "@/types";
import { useRouter } from "next/navigation";

interface ReferralAnimationProps {
  referral: ReferralSource | null;
}

export default function ReferralAnimation({ referral }: ReferralAnimationProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (referral && referral.id !== 'default') {
      setShowWelcome(true);

      const timer = setTimeout(() => {
        setShowWelcome(false);

        setTimeout(() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('r');
          router.replace(url.pathname, { scroll: false });
        }, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [referral, router]);

  if (!referral || referral.id === 'default') return null;

  const getAnimationVariants = () => {
    switch (referral.icon) {
      case "github":
        return {
          initial: { scale: 0.8, rotate: -10, y: 20, opacity: 0 },
          animate: { scale: 1, rotate: 0, y: 0, opacity: 1, transition: { type: "spring", damping: 12 } },
          exit: { scale: 0.8, y: -20, opacity: 0 }
        };
      case "linkedin":
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
          exit: { x: 100, opacity: 0 }
        };
      case "email":
        return {
          initial: { scale: 0.5, opacity: 0 },
          animate: { scale: 1, opacity: 1, transition: { type: "spring" } },
          exit: { scale: 1.2, opacity: 0 }
        };
      case "resume":
        return {
          initial: { height: 0, opacity: 0 },
          animate: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
          exit: { height: 0, opacity: 0 }
        };
    }
  };

  const getIconForReferral = (iconType: string) => {
    switch (iconType) {
      case "resume":
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case "linkedin":
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "github":
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05 1.883 0 3.616-.636 5.001-1.721-1.771-.037-3.255-1.197-3.767-2.793.249.037.499.062.761.062.361 0 .724-.05 1.061-.137-1.847-.374-3.23-1.995-3.23-3.953v-.05c.537.299 1.16.486 1.82.511-1.086-.722-1.796-1.957-1.796-3.354 0-.748.199-1.434.548-2.032 1.983 2.443 4.964 4.04 8.306 4.215-.062-.3-.1-.611-.1-.923 0-2.22 1.796-4.028 4.028-4.028 1.16 0 2.207.486 2.943 1.272.904-.175 1.771-.512 2.541-.973-.3.93-.93 1.72-1.771 2.22.811-.088 1.597-.312 2.32-.624-.537.836-1.224 1.571-2.007 2.158z" />
          </svg>
        );
      case "email":
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      default:
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
    }
  };

  const variants = getAnimationVariants();

  return (
    <AnimatePresence mode="wait">
      {showWelcome && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-neutral-900 rounded-lg p-6 shadow-xl border border-neutral-700/30 max-w-md w-full text-center"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex justify-center mb-4 text-blue-500">
              {getIconForReferral(referral.icon)}
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-white">{referral.name}</h2>
            <p className="text-neutral-300 mb-4">{referral.message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
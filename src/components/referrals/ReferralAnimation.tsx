"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReferralSource } from "@/types";
import { useRouter } from "next/navigation";

interface ReferralAnimationProps {
  referral: ReferralSource | null;
}

type GtagFunction = (command: string, eventName: string, parameters?: Record<string, unknown>) => void;

type WindowWithGtag = Window & { gtag: GtagFunction };

export default function ReferralAnimation({ referral }: ReferralAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (referral && referral.id !== 'default') {
      setIsVisible(true);
    }
  }, [referral]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      // Clean up URL after animation
      const url = new URL(window.location.href);
      url.searchParams.delete('r');
      router.replace(url.pathname, { scroll: false });
    }, 300);
  };

  const handleQuickAction = (url: string, actionType: string) => {
    // Track the action
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as WindowWithGtag).gtag === 'function') {
      (window as WindowWithGtag).gtag('event', 'referral_action', {
        referral_source: referral?.id,
        action_type: actionType,
        destination_url: url
      });
    }
    
    // Navigate
    if (url.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(url);
      element?.scrollIntoView({ behavior: 'smooth' });
      handleClose();
    } else if (url === '#' && actionType === 'Download Resume') {
      // Special case for resume download - trigger resume modal
      // This assumes there's a global resume modal handler
      const resumeEvent = new CustomEvent('openResumeModal');
      window.dispatchEvent(resumeEvent);
      handleClose();
    } else {
      router.push(url);
      handleClose();
    }
  };

  if (!referral || referral.id === 'default') return null;

  const getIconForReferral = (iconType: string) => {
    const iconClass = "h-8 w-8";
    
    switch (iconType) {
      case "github":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case "reddit":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        );
      case "document":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case "email":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 rounded-2xl shadow-2xl border border-neutral-700/30 overflow-hidden"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ 
              scale: isClosing ? 0.9 : 1, 
              y: isClosing ? 20 : 0, 
              opacity: isClosing ? 0 : 1 
            }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              duration: 0.3
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div 
              className="relative px-8 py-6 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${referral.theme.primary}20 0%, ${referral.theme.secondary}10 100%)`
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-200 text-neutral-400 hover:text-white group"
                aria-label="Close"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon and title */}
              <div className="flex items-center gap-6 mb-4">
                <div 
                  className="flex-shrink-0 p-4 rounded-2xl shadow-lg"
                  style={{ 
                    backgroundColor: referral.theme.primary + '20',
                    color: referral.theme.primary
                  }}
                >
                  {getIconForReferral(referral.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome from {referral.name}!
                  </h2>
                  {referral.stats && (
                    <div className="flex gap-6 text-sm">
                      {referral.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-white font-semibold">{stat.value}</div>
                          <div className="text-neutral-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed">
                {referral.message}
              </p>
            </div>

            {/* Content Area */}
            <div className="px-8 py-6">
              {/* Quick Actions */}
              <div className="flex gap-3 mb-6">
                {referral.quickActions.map((action, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleQuickAction(action.url, action.label)}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95
                      ${action.type === 'primary' 
                        ? 'text-white shadow-lg hover:shadow-xl' 
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/50'
                      }
                    `}
                    style={{
                      backgroundColor: action.type === 'primary' ? referral.theme.primary : undefined,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.icon}
                    {action.label}
                  </motion.button>
                ))}
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">You might be interested in:</h3>
                <div className="grid gap-3">
                  {referral.recommendations.map((rec, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleQuickAction(rec.url, `recommendation-${rec.title}`)}
                      className="flex items-center gap-4 p-4 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-200 text-left group"
                      whileHover={{ x: 4 }}
                    >
                      <div 
                        className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-200"
                        style={{ 
                          backgroundColor: referral.theme.primary + '20',
                          color: referral.theme.primary 
                        }}
                      >
                        {rec.icon}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-neutral-100">{rec.title}</div>
                        <div className="text-sm text-neutral-400 group-hover:text-neutral-300">{rec.description}</div>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-neutral-800/30 border-t border-neutral-700/30">
              <p className="text-xs text-neutral-500 text-center">
                This personalized welcome will only show once per session
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
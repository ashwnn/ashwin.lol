"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
}

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch("/api/send-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        setIsSuccess(true);

        const utcTimestamp = new Date().toISOString();
        const umamiUrl = new URL('https://umm.ashwin.lol/api/collect');
        umamiUrl.searchParams.append('type', 'event');
        umamiUrl.searchParams.append('id', 'cdd6e3c0-1aa1-4a10-83b7-56157157bab8');
        umamiUrl.searchParams.append('event_type', 'resume_submission');
        umamiUrl.searchParams.append('email', data.email);
        umamiUrl.searchParams.append('timestamp', utcTimestamp);
        umamiUrl.searchParams.append('hostname', window.location.hostname);
        fetch(umamiUrl.toString(), { mode: 'no-cors' }).catch((err) => {
          console.error("Error sending event to Umami:", err);
        });

        reset();
      } else {
        setIsError(true);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-neutral-900 rounded-lg p-6 shadow-xl max-w-md w-full border border-neutral-700/30"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSuccess ? (
          <>
            <h2 className="text-xl font-semibold text-white mb-4">Request CV</h2>
            <p className="text-neutral-300 text-sm mb-6">
              Enter your email address below to receive a copy of my CV directly to your inbox.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 bg-neutral-800 border ${errors.email ? 'border-red-500' : 'border-neutral-600'
                    } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {isError && (
                <div className="text-red-500 text-sm">
                  Something went wrong. Please try again.
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-transparent border border-neutral-600 text-neutral-300 rounded-md hover:bg-neutral-800 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[80px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Send CV"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">CV Sent!</h2>
            <p className="text-neutral-300 text-sm mb-6">
              Check your inbox for my CV. Thank you for your interest!
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
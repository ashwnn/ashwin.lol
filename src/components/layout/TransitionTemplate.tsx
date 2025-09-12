"use client";

import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./Transition";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={`${Math.random()}`}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
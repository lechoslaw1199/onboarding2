'use client';

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundWrapper({ children }) {
  const pathname = usePathname();
  
  // Determine background color based on route
  const isDarkPage = pathname === "/reading-plan";
  const bgColor = isDarkPage ? "#241952" : "#ffffff";

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen w-full flex flex-col items-center overflow-x-hidden"
    >
      <AnimatePresence mode="wait">
        <div key={pathname} className="w-full flex-grow flex flex-col items-center">
          {children}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

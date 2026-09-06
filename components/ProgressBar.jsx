'use client';

import { motion } from "framer-motion";

export default function ProgressBar({ progress, customColor, customBg }) {
  return (
    <div 
      className="w-full h-[6px] relative mb-4 mt-4 overflow-hidden rounded-full transition-colors duration-300"
      style={{ backgroundColor: customBg || '#E1DCFE' }}
    >
      <motion.div 
        className="absolute left-0 top-0 h-full rounded-full transition-colors duration-300"
        style={{ backgroundColor: customColor || '#CF5DFE' }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

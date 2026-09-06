'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2 } from '@/context/Onboarding2Context';
import Onboarding2Header from '@/components/onboarding2/Onboarding2Header';

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

export default function FutureProgressPage() {
  const router = useRouter();
  const { direction, updateDirection, formattedChildName, currentTheme } = useOnboarding2();
  const [visibleCount, setVisibleCount] = useState(0);

  const lines = [
    `${formattedChildName} can write their name clearly.`,
    `${formattedChildName} can form letters the right way.`,
    `${formattedChildName} can write short sentences on their own.`,
    `${formattedChildName} can sound out words and spell simple ones.`,
    `${formattedChildName} can read and tell what a story is about.`,
    `🎉 And ${formattedChildName} is ready for GRADE 2!`,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < lines.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 550);

    return () => clearInterval(timer);
  }, [lines.length]);

  const isComplete = visibleCount >= lines.length;

  const handleContinue = () => {
    if (!isComplete) return;
    updateDirection(1);
    router.push('/onboarding2/free-info');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-28 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-8 px-4">
          After completing all LetterSchool lessons, you’ll hear teachers say:
        </h1>

        <div className="w-full max-w-[400px] flex flex-col gap-3.5 mb-8">
          {lines.map((line, idx) => {
            const isVisible = idx < visibleCount;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex w-full ${isEven ? 'justify-start' : 'justify-end'}`}
              >
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 250 }}
                    className={`max-w-[88%] px-5 py-3.5 rounded-3xl font-semibold text-[16px] shadow-sm leading-snug ${
                      idx === lines.length - 1
                        ? 'text-white font-bold rounded-br-none'
                        : isEven
                        ? 'bg-[#EBF7FF] text-[#0369A1] border border-[#BAE6FD] rounded-bl-none'
                        : 'bg-white text-[#221750] border border-slate-200 rounded-br-none'
                    }`}
                    style={
                      idx === lines.length - 1
                        ? { backgroundColor: currentTheme?.hex || '#F9C700' }
                        : undefined
                    }
                  >
                    {line}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed bottom-0 w-full max-w-[480px] px-8 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent z-20"
      >
        <motion.button
          whileTap={isComplete ? { scale: 0.98 } : {}}
          disabled={!isComplete}
          onClick={handleContinue}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className={`w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
            !isComplete ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-95'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

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

  const capName = formattedChildName || 'Your child';

  const lines = [
    { text: `${capName} can write their name clearly.`, align: 'left' },
    { text: `${capName} can form letters the right way.`, align: 'right' },
    { text: `${capName} can write short sentences on their own.`, align: 'left' },
    { text: `${capName} can sound out words and spell simple ones.`, align: 'right' },
    { text: `${capName} can read and tell what a story is about.`, align: 'left' },
    { text: `And ${capName} is ready for GRADE 2!`, align: 'right' },
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
    }, 450);

    return () => clearInterval(timer);
  }, [lines.length]);

  const isComplete = visibleCount >= lines.length;

  const handleContinue = () => {
    if (!isComplete) return;
    updateDirection(1);
    router.push('/onboarding2/free-info');
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: "url('/chalkboard.jpg')" }}
    >
      <Onboarding2Header isDark={true} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-36 flex flex-col items-center pt-3 text-center"
      >
        <h1 className="text-[20px] sm:text-[23px] font-bold text-white leading-snug mb-8 sm:mb-10 max-w-[360px]">
          After completing all LetterSchool lessons, you’ll hear teachers say:
        </h1>

        <div className="w-full flex flex-col gap-6 sm:gap-7">
          {lines.map((item, idx) => {
            const isVisible = idx < visibleCount;
            const isLeft = item.align === 'left';

            return (
              <div
                key={idx}
                className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 16, stiffness: 260 }}
                    className="relative max-w-[85%] sm:max-w-[80%]"
                  >
                    {/* Speech Bubble */}
                    <div className="bg-white rounded-[26px] px-6 py-3.5 shadow-lg relative z-10">
                      <p className="text-[14px] sm:text-[15px] font-bold text-[#221750] leading-snug text-left">
                        {item.text}
                      </p>
                    </div>

                    {/* Speech Bubble Pointer Tail (downward triangle) */}
                    {isLeft ? (
                      <svg
                        className="absolute left-7 w-6 h-4 text-white fill-current z-10"
                        style={{ top: 'calc(100% - 2px)' }}
                        viewBox="0 0 24 16"
                      >
                        <polygon points="0,0 24,0 6,15" />
                      </svg>
                    ) : (
                      <svg
                        className="absolute right-7 w-6 h-4 text-white fill-current z-10"
                        style={{ top: 'calc(100% - 2px)' }}
                        viewBox="0 0 24 16"
                      >
                        <polygon points="0,0 24,0 18,15" />
                      </svg>
                    )}
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
        className="fixed bottom-0 w-full max-w-[480px] px-8 pb-5 pt-3 z-20 pointer-events-none"
      >
        <motion.button
          whileTap={isComplete ? { scale: 0.98 } : {}}
          disabled={!isComplete}
          onClick={handleContinue}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className={`w-full h-14 rounded-full text-[18px] font-bold transition-all shadow-lg pointer-events-auto ${
            !isComplete
              ? 'opacity-50 cursor-not-allowed text-white'
              : currentTheme?.id === 'yellow'
              ? 'text-slate-900 hover:brightness-95'
              : 'text-white hover:brightness-95'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

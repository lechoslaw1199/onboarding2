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

const ROTATIONS = [-1, 1.2, -0.8, 1, -0.6];

export default function FutureProgressPage() {
  const router = useRouter();
  const { direction, updateDirection, formattedChildName, currentTheme } = useOnboarding2();
  const [visibleCount, setVisibleCount] = useState(0);

  const capName = formattedChildName || 'Your child';

  const teacherQuotes = [
    { icon: '✏️', text: `${capName} can write their name clearly.` },
    { icon: '✍️', text: `${capName} can form letters the right way.` },
    { icon: '📝', text: `${capName} can write short sentences on their own.` },
    { icon: '🔤', text: `${capName} can sound out words and spell simple ones.` },
    { icon: '📚', text: `${capName} can read and tell what a story is about.` },
    { isCelebration: true, icon: '🎉', text: `And ${capName} is ready for GRADE 2!` },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < teacherQuotes.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [teacherQuotes.length]);

  const isComplete = visibleCount >= teacherQuotes.length;

  const handleContinue = () => {
    if (!isComplete) return;
    updateDirection(1);
    router.push('/onboarding2/free-info');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden min-h-screen bg-white">
      <Onboarding2Header />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-32 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[22px] sm:text-[24px] font-bold text-[#221750] leading-tight mb-6 px-3">
          After completing all LetterSchool lessons, you’ll hear teachers say:
        </h1>

        {/* School Chalkboard Container */}
        <div className="w-full max-w-[410px] rounded-[24px] border-[7px] border-[#8D5B4C] bg-[#1a1a1a] shadow-2xl relative overflow-hidden mb-6">
          {/* Authentic Chalkboard Texture */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-85"
            style={{ backgroundImage: "url('/chalkboard.jpg')" }}
          />
          {/* Subtle Vignette for depth */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none shadow-[inset_0_2px_15px_rgba(0,0,0,0.7)]" />

          {/* Teacher sayings list */}
          <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-3 min-h-[380px]">
            {teacherQuotes.map((item, idx) => {
              const isVisible = idx < visibleCount;
              if (!isVisible) return null;

              if (item.isCelebration) {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 16, stiffness: 240 }}
                    style={{
                      backgroundColor: currentTheme?.hex || '#099FF9',
                    }}
                    className={`w-full rounded-2xl px-4 py-3.5 shadow-xl flex items-center justify-center gap-2.5 text-center border-2 border-white/40 mt-1 ${
                      currentTheme?.id === 'yellow' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    <span className="text-[22px]">🎉</span>
                    <span className="text-[15px] sm:text-[16px] font-extrabold tracking-wide">
                      {item.text}
                    </span>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 18, stiffness: 260 }}
                  style={{
                    transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]}deg)`,
                  }}
                  className="w-full bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md flex items-center gap-3 border border-white/80"
                >
                  <span className="text-[20px] sm:text-[22px] shrink-0">{item.icon}</span>
                  <p className="text-[14px] sm:text-[15px] font-bold text-[#221750] leading-snug text-left">
                    “{item.text}”
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Wooden Chalk Ledge with Chalk Sticks */}
          <div className="relative z-10 w-full h-3.5 bg-[#6D4233] border-t border-[#543226] flex items-center px-6 gap-2 shadow-inner">
            <div className="w-5 h-1.5 rounded-full bg-white/90 shadow-sm" />
            <div className="w-5 h-1.5 rounded-full bg-yellow-200/90 shadow-sm" />
            <div className="w-4 h-1.5 rounded-full bg-pink-200/90 shadow-sm" />
          </div>
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
          className={`w-full h-14 rounded-full text-[18px] font-bold transition-all shadow-md ${
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

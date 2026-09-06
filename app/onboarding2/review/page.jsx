'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2, getReviewForReason } from '@/context/Onboarding2Context';
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

export default function ReviewPage() {
  const router = useRouter();
  const { direction, updateDirection, readingReason, currentTheme } = useOnboarding2();

  const review = getReviewForReason(readingReason);

  const handleNext = () => {
    updateDirection(1);
    router.push('/onboarding2/research');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={30} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-28 flex flex-col items-center pt-4 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#1f2530] leading-tight mb-2 px-2">
          You’re in good hands!
        </h1>
        <p className="text-[16px] text-[#555555] mb-8 max-w-[380px] leading-relaxed">
          Thousands of parents have already prepared their children for school with LetterSchool!
        </p>

        <div className="relative w-full max-w-[420px] bg-[#fdeee0] rounded-[24px] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)] text-left my-2">
          <span
            aria-hidden="true"
            className="absolute -top-[28px] sm:-top-[34px] -left-[8px] sm:-left-[12px] font-serif text-[48px] sm:text-[64px] text-[#ffc289] leading-none select-none pointer-events-none"
          >
            “
          </span>

          <span
            aria-hidden="true"
            className="absolute -bottom-[28px] sm:-bottom-[34px] -right-[8px] sm:-right-[12px] font-serif text-[48px] sm:text-[64px] text-[#ffc289] leading-none select-none pointer-events-none"
          >
            ”
          </span>

          <p className="font-bold text-[16px] text-[#333333] mb-2 leading-snug">
            {review.highlight}
          </p>

          <p className="font-normal text-[16px] text-[#333333] leading-[1.6] m-0">
            {review.quote}
          </p>

          <p className="mt-4 italic text-[14px] text-[#555555]">
            {review.name}
          </p>
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
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className="w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md hover:brightness-95"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

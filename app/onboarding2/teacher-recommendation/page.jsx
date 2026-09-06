'use client';

import React from 'react';
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

export default function TeacherRecommendationPage() {
  const router = useRouter();
  const { direction, updateDirection, teacherRecommended, setTeacherRecommended, currentTheme } = useOnboarding2();

  const options = ["Yes", "No"];

  const handleSelect = (choice) => {
    setTeacherRecommended(choice);
    updateDirection(1);
    router.push('/onboarding2/reason');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={10} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-20 flex flex-col items-center pt-4"
      >
        <h1 className="text-[24px] font-bold mb-6 text-center text-black leading-tight px-4">
          Did a teacher{' '}
          <span style={{ color: currentTheme?.hex || '#F9C700' }}>
            recommend
          </span>{' '}
          LetterSchool to you?
        </h1>

        <div className="w-full flex flex-col gap-3 px-4 mb-10">
          {options.map((option) => (
            <motion.button
              key={option}
              whileTap={{ scale: 0.98 }}
              style={{ color: currentTheme?.hex || '#F9C700' }}
              className={`min-h-[70px] py-4 px-8 rounded-lg text-[16px] font-bold flex items-center justify-center transition-all duration-200 border border-solid leading-snug ${
                teacherRecommended === option
                  ? 'bg-white border-[#221750] border-1 shadow-sm'
                  : 'bg-white border-[#e2e8f0]'
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.main>
    </div>
  );
}

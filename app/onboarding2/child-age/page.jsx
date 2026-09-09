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

export default function ChildAgePage() {
  const router = useRouter();
  const { direction, updateDirection, childAge, setChildAge, formattedChildName, currentTheme } = useOnboarding2();

  const ages = ["1", "2", "3", "4", "5", "6", "7", "8+"];

  const handleSelect = (age) => {
    setChildAge(age);
  };

  const handleNext = () => {
    if (!childAge) return;
    updateDirection(1);
    router.push('/onboarding2/child-color');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={60} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-28 flex flex-col items-center pt-4 text-center"
      >
        <h1 className="text-[24px] font-bold mb-2 text-center text-black leading-tight px-4">
          How old is{' '}
          <span style={{ color: currentTheme?.hex || '#099FF9' }}>
            {formattedChildName}
          </span>
          ?
        </h1>
        <p className="text-[16px] text-slate-600 mb-8 max-w-[360px]">
          Help us personalize your child&apos;s learning journey!
        </p>

        <div className="grid grid-cols-4 gap-3.5 sm:gap-4 w-full max-w-[390px] sm:max-w-[410px] px-2 mb-8">
          {ages.map((age) => {
            const isSelected = childAge === age;
            const isAnySelected = Boolean(childAge);

            return (
              <motion.button
                key={age}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(age)}
                style={{
                  backgroundColor: currentTheme?.hex || '#099FF9',
                  opacity: isAnySelected && !isSelected ? 0.4 : 1,
                }}
                className="w-full aspect-square min-h-[72px] sm:min-h-[80px] rounded-[22px] sm:rounded-[24px] text-[24px] sm:text-[26px] font-extrabold text-white flex items-center justify-center transition-all duration-200 select-none shadow-sm hover:brightness-95"
              >
                {age}
              </motion.button>
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
          whileTap={childAge ? { scale: 0.98 } : {}}
          disabled={!childAge}
          onClick={handleNext}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className={`w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
            !childAge ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-95'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

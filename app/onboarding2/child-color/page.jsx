'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2, COLOR_OPTIONS } from '@/context/Onboarding2Context';
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

export default function ChildColorPage() {
  const router = useRouter();
  const { direction, updateDirection, themeColor, setThemeColor, currentTheme, formattedChildName } = useOnboarding2();

  const handleSelect = (colorId) => {
    setThemeColor(colorId);
    try {
      localStorage.setItem('themeColor', colorId);
    } catch (e) {}
  };

  const handleNext = () => {
    if (!themeColor) return;
    updateDirection(1);
    router.push('/onboarding2/handwriting');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={70} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-28 flex flex-col items-center pt-4 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2 px-2">
          Let&apos;s add {formattedChildName}&apos;s interests
        </h1>
        <p className="text-[16px] text-slate-600 mb-8 max-w-[360px]">
          Choose the color{' '}
          <span className="font-semibold" style={{ color: themeColor ? currentTheme?.hex : '#221750' }}>
            {formattedChildName}
          </span>{' '}
          loves to learn with
        </p>

        <div className="grid grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-[390px] sm:max-w-[410px] mb-8">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = themeColor === c.id;
            return (
              <motion.button
                key={c.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(c.id)}
                style={{
                  backgroundColor: isSelected ? c.hex : c.pastelBg,
                }}
                className={`w-full aspect-[1.12/1] min-h-[96px] sm:min-h-[105px] rounded-[26px] sm:rounded-[28px] font-bold text-[18px] sm:text-[19px] text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:brightness-95 select-none ${
                  isSelected ? 'shadow-md scale-[1.02]' : ''
                }`}
              >
                {c.label}
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
          whileTap={themeColor ? { scale: 0.98 } : {}}
          disabled={!themeColor}
          onClick={handleNext}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className={`w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
            !themeColor ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-95'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

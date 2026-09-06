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

export default function FreeInfoPage() {
  const router = useRouter();
  const { direction, updateDirection, currentTheme } = useOnboarding2();

  const handleNext = () => {
    updateDirection(1);
    router.push('/onboarding2/notif-info');
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
        className="w-full max-w-[480px] px-5 pb-32 flex flex-col items-center pt-8 text-center"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm"
          style={{
            color: currentTheme?.hex || '#F9C700',
            backgroundColor: currentTheme?.pastelBg || '#FEEBA3',
          }}
        >
          🎁
        </div>

        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-6 px-4">
          We offer{' '}
          <span
            className="px-2 py-0.5 rounded-lg"
            style={{
              color: currentTheme?.hex || '#F9C700',
              backgroundColor: currentTheme?.pastelBg || '#FEEBA3',
            }}
          >
            7 days free
          </span>{' '}
          so everyone can learn with LetterSchool.
        </h1>

        <p className="text-[16px] text-slate-600 leading-relaxed max-w-[360px] mb-8">
          Try every level, handwriting font, and phonics lesson with zero risk. You won&apos;t be billed during your trial period.
        </p>

        <div className="w-full max-w-[380px] bg-white border border-slate-200 rounded-xl p-4 text-left flex flex-col gap-2.5 shadow-sm">
          <div className="flex items-center gap-3 text-[16px] text-[#221750] font-semibold">
            <span className="font-bold" style={{ color: currentTheme?.hex || '#F9C700' }}>✓</span> Full access to all 3 handwriting fonts
          </div>
          <div className="flex items-center gap-3 text-[16px] text-[#221750] font-semibold">
            <span className="font-bold" style={{ color: currentTheme?.hex || '#F9C700' }}>✓</span> Phonics, spelling & story reading
          </div>
          <div className="flex items-center gap-3 text-[16px] text-[#221750] font-semibold">
            <span className="font-bold" style={{ color: currentTheme?.hex || '#F9C700' }}>✓</span> Cancel anytime easily in settings
          </div>
        </div>
      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed bottom-0 w-full max-w-[480px] px-8 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent z-20 flex flex-col items-center gap-2"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className="w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md hover:brightness-95"
        >
          Continue
        </motion.button>
        <button
          onClick={handleNext}
          className="text-[14px] text-slate-500 hover:text-slate-700 font-semibold py-1"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}

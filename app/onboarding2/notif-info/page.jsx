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

export default function NotifInfoPage() {
  const router = useRouter();
  const { direction, updateDirection, currentTheme } = useOnboarding2();

  const handleNext = () => {
    updateDirection(1);
    router.push('/onboarding2/email-reminder');
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
        className="w-full max-w-[480px] px-5 pb-32 flex flex-col items-center pt-4 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-6 px-4">
          You&apos;ll get a reminder{' '}
          <span
            className="px-2 py-0.5 rounded-lg"
            style={{
              color: currentTheme?.hex || '#F9C700',
              backgroundColor: currentTheme?.pastelBg || '#FEEBA3',
            }}
          >
            2 days
          </span>{' '}
          before your trial ends.
        </h1>

        <div className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-6">
          <img
            src="/onboarding2/reminder.gif"
            alt="Reminder notification animation"
            className="w-full h-auto object-cover"
          />
        </div>

        <p className="text-[16px] text-slate-600 max-w-[340px] leading-relaxed">
          No surprises, ever. We ensure you have complete control over your subscription at all times.
        </p>
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

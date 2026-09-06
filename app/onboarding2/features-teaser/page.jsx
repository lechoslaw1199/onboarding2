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

export default function FeaturesTeaserPage() {
  const router = useRouter();
  const { direction, updateDirection, formattedChildName, currentTheme } = useOnboarding2();

  const handleStartTrial = () => {
    updateDirection(1);
    router.push('/onboarding2/paywall');
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
        className="w-full max-w-[480px] px-5 pb-28 flex flex-col items-center pt-4 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-8 px-4">
          Ready to help <span style={{ color: currentTheme?.hex || '#F9C700' }}>{formattedChildName}</span> learn to read and write?
        </h1>

        {/* Social Proof Laurel Card */}
        <div className="w-full max-w-[400px] bg-gradient-to-b from-[#F7F5FF] to-white border border-[#E1DCFE] rounded-2xl p-6 shadow-sm flex flex-col items-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="/onboarding2/laurel-left.png"
              alt=""
              className="h-14 object-contain"
            />
            <div className="text-center">
              <p className="text-[20px] font-extrabold text-[#221750]">
                5+ million children
              </p>
              <p className="text-[16px] text-slate-600 font-medium leading-tight">
                have started learning and practicing with LetterSchool.
              </p>
            </div>
            <img
              src="/onboarding2/laurel-right.png"
              alt=""
              className="h-14 object-contain"
            />
          </div>

          <div className="mt-2">
            <img
              src="/onboarding2/apple-google.png"
              alt="App Store and Google Play Ratings"
              className="max-h-12 object-contain"
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="w-full max-w-[380px] flex flex-col gap-3 text-left mb-8">
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[20px]">🏆</span>
            <span className="text-[16px] font-semibold text-[#221750]">
              Award-winning early literacy app
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[20px]">🎮</span>
            <span className="text-[16px] font-semibold text-[#221750]">
              Fun reading games for early learners
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[20px]">❤️</span>
            <span className="text-[16px] font-semibold text-[#221750]">
              Trusted by teachers and loved by parents
            </span>
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
          whileTap={{ scale: 0.98 }}
          onClick={handleStartTrial}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className="w-full h-14 text-white rounded-full text-[18px] font-extrabold tracking-wide transition-all shadow-md hover:brightness-95"
        >
          START FREE TRIAL
        </motion.button>
      </motion.div>
    </div>
  );
}

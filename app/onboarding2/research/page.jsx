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

export default function ResearchPage() {
  const router = useRouter();
  const { direction, updateDirection, currentTheme } = useOnboarding2();

  const handleNext = () => {
    updateDirection(1);
    router.push('/onboarding2/child-name');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={40} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-28 flex flex-col items-center pt-2 text-center"
      >
        <div className="flex flex-col items-center mb-4">
          <img
            src="/onboarding2/award.png"
            alt="Research-backed"
            className="w-[140px] object-contain drop-shadow-sm mb-2"
          />
          <p className="text-[16px] font-semibold" style={{ color: currentTheme?.hex || '#F9C700' }}>
            Where parental praise meets academic proof
          </p>
        </div>

        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-3 px-4">
          Science + Fun ={' '}
          <span style={{ color: currentTheme?.hex || '#F9C700' }}>
            Kids Who Love to Learn!
          </span>
        </h1>

        <p className="text-[16px] text-slate-600 leading-relaxed mb-6 max-w-[380px] px-2">
          With every tap, trace, and sound, your child builds key skills in phonics, handwriting, spelling, and sight words — all leading to confident reading.
        </p>

        <div className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-3">
          <img
            src="/onboarding2/mom-daughter.jpg"
            alt="Mom and daughter learning"
            className="w-full h-auto object-cover"
          />
        </div>

        <p className="text-[16px] text-slate-700">
          Join <span className="font-bold text-[#221750]">more than 2 million parents</span> teaching their kids to read and write!
        </p>
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

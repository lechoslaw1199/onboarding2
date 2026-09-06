'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2 } from '@/context/Onboarding2Context';
import Onboarding2Header from '@/components/onboarding2/Onboarding2Header';
import VirtualKeyboard from '@/components/VirtualKeyboard';

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

export default function ChildNamePage() {
  const router = useRouter();
  const { direction, updateDirection, childName, setChildName, currentTheme } = useOnboarding2();
  const [name, setName] = useState(childName || '');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleNext = () => {
    if (!name.trim()) return;
    setChildName(name.trim());
    updateDirection(1);
    router.push('/onboarding2/child-age');
  };

  return (
    <div
      className={`w-full flex flex-col items-center overflow-x-hidden transition-all duration-300 ${
        showKeyboard ? 'pb-[340px]' : 'pb-12'
      }`}
    >
      <Onboarding2Header progress={50} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center pt-4 px-6 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2 px-4">
          Give your child the best learning journey!
        </h1>
        <p className="text-[16px] text-slate-500 mb-6 px-4">
          Providing this info helps us pick content that&apos;s just right
        </p>

        <div className="w-full px-4 mb-5 text-left">
          <label className="block text-[16px] font-semibold text-[#221750] mb-2">
            What&apos;s your child&apos;s first name?
          </label>
          <div
            onClick={() => setShowKeyboard(true)}
            className={`w-full h-14 px-5 rounded-2xl border-2 transition-all flex items-center shadow-sm cursor-pointer overflow-hidden ${
              showKeyboard
                ? 'border-[#099FF9] ring-2 ring-[#099FF9]/20 bg-white'
                : 'border-slate-300 bg-white hover:border-[#099FF9]/50'
            }`}
          >
            {!name ? (
              <div className="flex items-center w-full">
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse mr-0.5 inline-block shrink-0" />
                )}
                <span className="text-[17px] font-medium text-slate-400 select-none">
                  Add name
                </span>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <span className="text-[17px] font-medium text-[#221750] whitespace-pre select-none">
                  {name}
                </span>
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse ml-0.5 inline-block shrink-0" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-4 mb-6">
          <motion.button
            whileTap={name.trim() ? { scale: 0.98 } : {}}
            disabled={!name.trim()}
            onClick={handleNext}
            style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
            className={`w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
              !name.trim() ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-95'
            }`}
          >
            Continue
          </motion.button>
        </div>

        <div className="w-full px-4 mb-6">
          <div className="bg-[#EBF7FF] border border-[#BAE6FD] rounded-xl py-2.5 px-4 text-center">
            <p className="text-[13px] text-[#0369A1] font-medium">
              ✨ Tip: You can add more child profiles later (up to 3 children)
            </p>
          </div>
        </div>
      </motion.main>

      <VirtualKeyboard
        value={name}
        onChange={setName}
        onDone={() => {
          setShowKeyboard(false);
          if (name.trim()) handleNext();
        }}
        onCancel={() => setShowKeyboard(false)}
        showKeyboard={showKeyboard}
      />
    </div>
  );
}

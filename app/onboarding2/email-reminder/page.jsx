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

export default function EmailReminderPage() {
  const router = useRouter();
  const { direction, updateDirection, trialReminderEmail, setTrialReminderEmail, currentTheme } = useOnboarding2();
  const [email, setEmail] = useState(trialReminderEmail || '');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const trimmedEmail = email.trim();
  const isValidEmail = Boolean(trimmedEmail) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  const isInvalid = Boolean(trimmedEmail) && !isValidEmail;

  const handleContinue = () => {
    if (!isValidEmail) return;
    setTrialReminderEmail(trimmedEmail);
    updateDirection(1);
    router.push('/onboarding2/features-teaser');
  };

  const handleSkip = () => {
    setTrialReminderEmail('');
    updateDirection(1);
    router.push('/onboarding2/features-teaser');
  };

  return (
    <div
      className={`w-full flex flex-col items-center overflow-x-hidden min-h-screen bg-white transition-all duration-300 ${
        showKeyboard ? 'pb-[340px]' : 'pb-12'
      }`}
    >
      <Onboarding2Header />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center pt-4 px-6 text-center"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm"
          style={{
            color: currentTheme?.hex || '#F9C700',
            backgroundColor: currentTheme?.pastelBg || '#FEEBA3',
          }}
        >
          ✉️
        </div>

        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2 px-2">
          Leave your email and we’ll remind you before your trial ends
        </h1>
        <p className="text-[16px] text-slate-500 mb-8">
          This step is completely optional.
        </p>

        <div className="w-full max-w-[400px] flex flex-col text-left mb-6">
          <label className="block text-[16px] font-semibold text-[#221750] mb-2">
            Parent&apos;s email address
          </label>
          <div
            onClick={() => setShowKeyboard(true)}
            className={`w-full h-14 px-5 rounded-2xl border-2 transition-all flex items-center shadow-sm cursor-pointer overflow-hidden ${
              showKeyboard
                ? 'border-[#099FF9] ring-2 ring-[#099FF9]/20 bg-white'
                : isInvalid
                ? 'border-red-400 bg-white'
                : 'border-slate-300 bg-white hover:border-[#099FF9]/50'
            }`}
          >
            {!email ? (
              <div className="flex items-center w-full">
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse mr-0.5 inline-block shrink-0" />
                )}
                <span className="text-[16px] font-medium text-slate-400 select-none">
                  your@email.com
                </span>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <span className="text-[16px] font-semibold text-[#221750] whitespace-pre select-none truncate">
                  {email}
                </span>
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse ml-0.5 inline-block shrink-0" />
                )}
              </div>
            )}
          </div>
          {isInvalid && (
            <p className="text-[13px] text-red-500 font-semibold mt-2">
              Please enter a valid email address
            </p>
          )}
        </div>
      </motion.main>

      {!showKeyboard && (
        <motion.div
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-0 w-full max-w-[480px] px-8 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent z-20 flex flex-col items-center gap-2"
        >
          <motion.button
            whileTap={isValidEmail ? { scale: 0.98 } : {}}
            disabled={!isValidEmail}
            onClick={handleContinue}
            style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
            className={`w-full h-14 rounded-full text-[18px] font-bold transition-all shadow-md ${
              !isValidEmail
                ? 'opacity-50 cursor-not-allowed text-white'
                : currentTheme?.id === 'yellow'
                ? 'text-slate-900 hover:brightness-95 cursor-pointer'
                : 'text-white hover:brightness-95 cursor-pointer'
            }`}
          >
            Continue
          </motion.button>
          <button
            type="button"
            onClick={handleSkip}
            className="text-[14px] text-slate-500 hover:text-slate-700 font-semibold py-1 transition-colors cursor-pointer"
          >
            Skip for now
          </button>
        </motion.div>
      )}

      <VirtualKeyboard
        value={email}
        onChange={(v) => {
          setEmail(v);
        }}
        onDone={() => {
          setShowKeyboard(false);
        }}
        onCancel={() => setShowKeyboard(false)}
        showKeyboard={showKeyboard}
        type="email"
      />
    </div>
  );
}

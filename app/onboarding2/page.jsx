'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2 } from '@/context/Onboarding2Context';

export default function StartPage() {
  const router = useRouter();
  const { updateDirection, currentTheme } = useOnboarding2();

  const handleGetStarted = () => {
    updateDirection(1);
    router.push('/onboarding2/teacher-recommendation');
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F8FAFC]">
      <header className="w-full max-w-[450px] flex items-center justify-center pt-4 pb-2 px-5 shrink-0">
        <img
          src="/letterschool-logo-name.svg"
          alt="LetterSchool"
          className="h-6 object-contain"
        />
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[480px] px-6 flex flex-col items-center flex-grow pb-12 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mt-4 mb-6">
          Your child will love learning!
        </h1>

        <div className="w-full flex justify-center mb-6">
          <img
            src="/onboarding2/title_img.png"
            alt="LetterSchool characters"
            className="w-full max-w-[340px] max-h-[300px] object-contain drop-shadow-md"
          />
        </div>

        <p className="text-[16px] text-slate-600 leading-relaxed max-w-[380px] mb-8">
          From <span className="font-bold text-[#221750]">handwriting</span> to{' '}
          <span className="font-bold text-[#221750]">sight words</span>,{' '}
          <span className="italic">everything</span> they need to start reading, all in one app with{' '}
          <span className="font-bold" style={{ color: currentTheme?.hex || '#F9C700' }}>LetterSchool.</span>
        </p>

        <div className="w-full max-w-[400px] flex flex-col items-center gap-3.5 mt-auto">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGetStarted}
            style={{ backgroundColor: currentTheme?.hex || '#F9C700' }}
            className="w-full h-14 text-white rounded-full text-[18px] font-bold shadow-md transition-all hover:brightness-95"
          >
            Get Started
          </motion.button>

          <a
            href="https://account.letterschool.com/email-1.html"
            className="text-[14px] font-medium text-slate-500 hover:text-slate-800 transition-colors py-1"
          >
            I already have an account
          </a>
        </div>
      </motion.main>
    </div>
  );
}

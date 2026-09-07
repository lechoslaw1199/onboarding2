'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2, LEVEL_LABELS, LEARNING_OUTCOMES } from '@/context/Onboarding2Context';
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

const LEVEL_PROGRESS = [15, 33, 50, 72, 90];

export default function LearningLevelPage() {
  const router = useRouter();
  const {
    direction,
    updateDirection,
    childName,
    formattedChildName,
    calculatedLevel,
    childAge,
    handwritingAnswers,
    readingAnswers,
    readingReason,
    computeLearningLevel,
    currentTheme,
  } = useOnboarding2();

  const activeLevel = useMemo(() => {
    if (calculatedLevel && typeof calculatedLevel.levelIndex === 'number') {
      return calculatedLevel;
    }
    return computeLearningLevel(childAge, handwritingAnswers, readingAnswers, readingReason);
  }, [calculatedLevel, childAge, handwritingAnswers, readingAnswers, readingReason, computeLearningLevel]);

  const levelIndex = Math.max(0, Math.min(4, activeLevel?.levelIndex ?? 2));
  const currentLevelName = LEVEL_LABELS[levelIndex] || "Pre-K";
  const outcomes = LEARNING_OUTCOMES[levelIndex] || LEARNING_OUTCOMES[2];

  const handleContinue = () => {
    updateDirection(1);
    router.push('/onboarding2/future-progress');
  };

  const progressPct = LEVEL_PROGRESS[levelIndex] ?? 50;

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden min-h-screen bg-white">
      <Onboarding2Header />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-6 pb-36 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#221750] leading-tight mb-6">
          This is {childName || formattedChildName || 'your child'}&apos;s learning level
        </h1>

        <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center mb-8">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#221750] text-center mb-3">
            {currentLevelName}
          </h2>

          <div className="w-full h-2.5 bg-slate-200 rounded-full relative">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-sm"
              style={{
                backgroundColor: currentTheme?.hex || '#099FF9',
                marginLeft: '-10px',
              }}
              initial={{ left: 0 }}
              animate={{ left: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        <p className="text-[18px] sm:text-[20px] font-semibold text-[#221750] text-center max-w-[380px] sm:max-w-[400px] leading-snug mb-8">
          During this learning phase, LetterSchool helps {formattedChildName} build these skills.
        </p>

        <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col gap-6 text-left mb-8">
          {outcomes.map((item, idx) => {
            const dashIdx = item.indexOf(' – ');
            let title = item;
            let desc = '';
            if (dashIdx !== -1) {
              title = item.substring(0, dashIdx);
              desc = item.substring(dashIdx + 3);
            }

            return (
              <div key={idx} className="flex items-start text-left">
                <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#221750]">
                  <span className="font-bold text-[#221750]">{title} – </span>
                  <span className="font-medium text-[#221750]">{desc}</span>
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-[12px] text-slate-400 max-w-[360px] text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="https://www.letterschool.com/legal/terms-of-use" className="underline text-slate-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="https://www.letterschool.com/legal/privacy-policy" className="underline text-slate-600">
            Privacy Policy
          </a>.
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
          onClick={handleContinue}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className={`w-full h-14 rounded-full text-[18px] font-bold transition-all shadow-md hover:brightness-95 ${
            currentTheme?.id === 'yellow' ? 'text-slate-900' : 'text-white'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

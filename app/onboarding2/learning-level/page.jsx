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

export default function LearningLevelPage() {
  const router = useRouter();
  const {
    direction,
    updateDirection,
    formattedChildName,
    calculatedLevel,
    childAge,
    handwritingAnswers,
    readingAnswers,
    readingReason,
    computeLearningLevel,
    currentTheme,
  } = useOnboarding2();

  // Dynamically derive the active level from the user's answers across previous screens
  const activeLevel = useMemo(() => {
    if (calculatedLevel && typeof calculatedLevel.levelIndex === 'number') {
      return calculatedLevel;
    }
    return computeLearningLevel(childAge, handwritingAnswers, readingAnswers, readingReason);
  }, [calculatedLevel, childAge, handwritingAnswers, readingAnswers, readingReason, computeLearningLevel]);

  const levelIndex = Math.max(0, Math.min(4, activeLevel?.levelIndex ?? 3));
  const currentLevelName = LEVEL_LABELS[levelIndex] || "Early Learner";
  const outcomes = LEARNING_OUTCOMES[levelIndex] || LEARNING_OUTCOMES[3];

  const handleContinue = () => {
    updateDirection(1);
    router.push('/onboarding2/future-progress');
  };

  const progressPct = (levelIndex / (LEVEL_LABELS.length - 1)) * 100;

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-36 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-6 px-4">
          This is <span style={{ color: currentTheme?.hex || '#F9C700' }}>{formattedChildName}</span>&apos;s learning level
        </h1>

        {/* Level Indicator Card */}
        <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 px-1">
            {LEVEL_LABELS.map((lbl, idx) => (
              <span
                key={lbl}
                style={{
                  color: idx === levelIndex ? (currentTheme?.hex || '#F9C700') : undefined,
                }}
                className={`text-[11px] font-bold uppercase tracking-tight transition-colors ${
                  idx === levelIndex ? '' : 'text-slate-400'
                }`}
              >
                {lbl}
              </span>
            ))}
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full relative overflow-visible mb-2">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ backgroundColor: currentTheme?.hex || '#F9C700' }}
              initial={{ width: 0 }}
              animate={{ width: progressPct === 0 ? '12px' : `${progressPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-white rounded-full shadow-md"
              style={{ backgroundColor: currentTheme?.hex || '#F9C700' }}
              initial={{ left: 0 }}
              animate={{ left: `calc(${progressPct}% - ${(progressPct / 100) * 20}px)` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          <div className="mt-3 text-center">
            <span className="text-[13px] text-slate-500 font-semibold">Assigned Level: </span>
            <span
              className="text-[14px] font-bold px-3 py-1 rounded-full ml-1"
              style={{
                color: currentTheme?.hex || '#F9C700',
                backgroundColor: currentTheme?.pastelBg || '#FEEBA3',
              }}
            >
              {currentLevelName}
            </span>
          </div>
        </div>

        {/* Learning Outcomes for This Phase */}
        <div className="w-full max-w-[420px] text-left mb-6">
          <h2 className="text-[18px] font-bold text-[#221750] mb-3 px-1">
            During this learning phase, LetterSchool helps {formattedChildName} build these skills:
          </h2>
          <div
            className="border rounded-xl p-4 flex flex-col gap-2.5"
            style={{
              borderColor: `${currentTheme?.hex || '#F9C700'}30`,
              backgroundColor: currentTheme?.pastelBg ? `${currentTheme.pastelBg}40` : '#FAF8FF',
            }}
          >
            {outcomes.map((item, idx) => (
              <p
                key={idx}
                className="text-[16px] font-medium leading-snug"
                style={{ color: currentTheme?.hex || '#F9C700' }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <p className="text-[12px] text-slate-400 max-w-[360px] leading-relaxed">
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
          className="w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md hover:brightness-95"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

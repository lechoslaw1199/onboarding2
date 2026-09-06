'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

const READING_QUESTIONS = [
  {
    id: 0,
    text: "My child can recognize the letters in their name",
    img: "/onboarding2/img_1.png",
    options: ["Yes", "Maybe", "No"],
  },
  {
    id: 1,
    text: "My child recognizes uppercase letters",
    img: "/onboarding2/img_1.png",
    options: ["All", "Some", "None"],
  },
  {
    id: 2,
    text: "My child can match lowercase letters to uppercase letters",
    img: "/onboarding2/img_4.png",
    options: ["All", "Some", "None"],
  },
  {
    id: 3,
    text: "My child can identify the specific sound a letter makes",
    img: "/onboarding2/img_5.png",
    options: ["All", "Some", "None"],
  },
  {
    id: 4,
    text: "My child knows how to read Consonant - Vowel - Consonant words (e.g. “dog” or “cat”)",
    img: "/onboarding2/img_7.png",
    options: ["Yes", "Maybe", "No"],
  },
];

export default function LearningQuestionsPage() {
  const router = useRouter();
  const {
    direction,
    updateDirection,
    readingAnswers,
    setReadingAnswers,
    currentTheme,
  } = useOnboarding2();

  const [activeQIndex, setActiveQIndex] = useState(0);

  const handleSelectAnswer = (qIndex, ans) => {
    const updated = [...readingAnswers];
    updated[qIndex] = ans;
    setReadingAnswers(updated);

    if (qIndex < READING_QUESTIONS.length - 1) {
      setActiveQIndex(qIndex + 1);
    }
  };

  const isAllAnswered = readingAnswers.every((a) => a !== null);

  const handleNext = () => {
    if (!isAllAnswered) return;
    updateDirection(1);
    router.push('/onboarding2/calculating');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={90} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-32 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2 px-4">
          Personalize your child&apos;s <span style={{ color: currentTheme?.hex || '#F9C700' }}>learning journey</span>!
        </h1>
        <p className="text-[16px] text-slate-600 mb-6 max-w-[360px] px-2 leading-relaxed">
          Tell us where your child is right now in reading and phonics.
        </p>

        <div className="w-full max-w-[420px] flex flex-col gap-3">
          {READING_QUESTIONS.map((q, idx) => {
            const currentAnswer = readingAnswers[idx];
            const isOpen = activeQIndex === idx || currentAnswer !== null;

            return (
              <div
                key={q.id}
                className={`w-full rounded-lg border border-solid transition-all p-4 text-left ${
                  currentAnswer !== null
                    ? 'border-[#221750]/30 bg-white'
                    : activeQIndex === idx
                    ? 'border-[#221750] bg-white shadow-sm'
                    : 'border-[#e2e8f0] bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveQIndex(idx)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <p className="text-[16px] font-bold text-[#221750] pr-2 leading-snug">
                    {q.text}
                  </p>
                  {currentAnswer && (
                    <span
                      className="text-[13px] font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        color: currentTheme?.hex || '#F9C700',
                        backgroundColor: currentTheme?.pastelBg || '#FEEBA3',
                      }}
                    >
                      {currentAnswer}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pt-4 flex flex-col items-center"
                    >
                      {q.img && (
                        <div className="mb-4 flex justify-center">
                          <img
                            src={q.img}
                            alt=""
                            className="max-h-20 object-contain rounded-xl"
                          />
                        </div>
                      )}

                      <div className="w-full flex gap-2">
                        {q.options.map((opt) => {
                          const isOptSelected = currentAnswer === opt;
                          return (
                            <motion.button
                              key={opt}
                              whileTap={{ scale: 0.96 }}
                              type="button"
                              onClick={() => handleSelectAnswer(idx, opt)}
                              style={{
                                color: currentTheme?.hex || '#F9C700',
                              }}
                              className={`flex-1 h-12 rounded-lg font-bold text-[14px] border border-solid transition-all ${
                                isOptSelected
                                  ? 'bg-white border-[#221750] border-1 shadow-sm'
                                  : 'bg-white border-[#e2e8f0]'
                              }`}
                            >
                              {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
          whileTap={isAllAnswered ? { scale: 0.98 } : {}}
          disabled={!isAllAnswered}
          onClick={handleNext}
          style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
          className={`w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
            !isAllAnswered ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-95'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

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
      setTimeout(() => {
        const nextEl = document.getElementById(`rq-question-${qIndex + 1}`);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
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

        <div className="w-full max-w-[420px] flex flex-col gap-3.5">
          {READING_QUESTIONS.map((q, idx) => {
            const currentAnswer = readingAnswers[idx];
            const isAnswered = currentAnswer !== null;
            const isVisible = idx === 0 || readingAnswers[idx - 1] !== null;

            if (!isVisible) return null;

            return (
              <motion.div
                key={q.id}
                id={`rq-question-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`w-full rounded-2xl border-2 transition-all p-4 sm:p-5 text-left bg-white ${
                  isAnswered
                    ? 'border-slate-200/90 shadow-sm'
                    : 'border-slate-300 shadow-md'
                }`}
              >
                <div className="mb-2">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                    Question {idx + 1} of {READING_QUESTIONS.length}
                  </span>
                </div>

                <p className="text-[16px] font-bold text-[#221750] leading-snug mb-3">
                  {q.text}
                </p>

                {q.img && (
                  <div className="mb-3.5 flex justify-center bg-slate-50/80 py-2.5 rounded-xl border border-slate-100">
                    <img
                      src={q.img}
                      alt=""
                      className="max-h-20 object-contain rounded-lg"
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  {q.options.map((opt) => {
                    const isOptSelected = currentAnswer === opt;
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleSelectAnswer(idx, opt)}
                        style={{
                          backgroundColor: isOptSelected
                            ? (currentTheme?.hex || '#099FF9')
                            : '#F8FAFC',
                          borderColor: isOptSelected
                            ? (currentTheme?.hex || '#099FF9')
                            : '#E2E8F0',
                          color: isOptSelected ? '#ffffff' : '#1E293B',
                        }}
                        className={`min-h-[48px] px-1 py-1.5 rounded-xl font-bold text-[14px] sm:text-[15px] border-2 transition-all flex items-center justify-center text-center select-none ${
                          isOptSelected
                            ? 'shadow-md scale-[1.02]'
                            : 'hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
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

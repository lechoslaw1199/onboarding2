'use client';

import React, { useState, useRef } from 'react';
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

const STYLES = [
  { id: 'zaner', label: 'Zaner-Bloser style', img: '/onboarding2/zb-style.png' },
  { id: 'tears', label: 'Handwriting Without Tears style', img: '/onboarding2/hwt-style.png' },
  { id: 'dnealian', label: 'D’Nealian style', img: '/onboarding2/dn-style.png' },
  { id: 'unknown', label: 'You can switch fonts anytime.', img: '/onboarding2/i-dont-know.png' },
];

const QUESTIONS = [
  {
    id: 0,
    text: "My child can write the first letter of their name",
    options: ["Yes", "No", "I don't know"],
  },
  {
    id: 1,
    text: "My child can write their full first name",
    options: ["Yes", "Some", "No"],
  },
  {
    id: 2,
    text: "My child usually start letters from the top",
    options: ["Yes", "No", "I don't know"],
  },
  {
    id: 3,
    text: "My child can write all uppercase letters",
    options: ["Yes", "Some", "No"],
  },
  {
    id: 4,
    text: "My child can write all lowercase letters",
    options: ["Yes", "Some", "No"],
  },
];

export default function HandwritingPage() {
  const router = useRouter();
  const {
    direction,
    updateDirection,
    handwritingStyle,
    setHandwritingStyle,
    handwritingAnswers,
    setHandwritingAnswers,
    formattedChildName,
    currentTheme,
  } = useOnboarding2();

  const [activeQIndex, setActiveQIndex] = useState(0);
  const questionsRef = useRef(null);

  const handleSelectStyle = (styleId) => {
    setHandwritingStyle(styleId);
    setTimeout(() => {
      questionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSelectAnswer = (qIndex, ans) => {
    const updated = [...handwritingAnswers];
    updated[qIndex] = ans;
    setHandwritingAnswers(updated);

    if (qIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        const nextEl = document.getElementById(`hw-question-${qIndex + 1}`);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
    }
  };

  const isAllAnswered = handwritingStyle && handwritingAnswers.every((a) => a !== null);

  const handleNext = () => {
    if (!isAllAnswered) return;
    updateDirection(1);
    router.push('/onboarding2/learning-questions');
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header progress={80} />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-32 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2 px-4">
          Let’s personalize{' '}
          <span style={{ color: currentTheme?.hex || '#F9C700' }}>
            {formattedChildName}’s
          </span>{' '}
          handwriting journey
        </h1>
        <p className="text-[16px] text-slate-600 mb-6 max-w-[380px] px-2 leading-relaxed">
          <span className="font-bold">Choose your font:</span> LetterSchool aligns with the US school curriculum — here are the most commonly used fonts. Let’s match them to {formattedChildName}’s learning.
        </p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-[420px] mb-8">
          {STYLES.map((st) => {
            const isSelected = handwritingStyle === st.id;
            return (
              <motion.button
                key={st.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectStyle(st.id)}
                style={{
                  borderColor: isSelected ? (currentTheme?.hex || '#099FF9') : '#e2e8f0',
                  backgroundColor: isSelected ? (currentTheme?.pastelBg || '#D2EEFD') : '#ffffff',
                }}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all min-h-[140px] relative select-none shadow-sm ${
                  isSelected
                    ? 'shadow-md scale-[1.02]'
                    : 'hover:border-slate-300'
                }`}
              >
                {isSelected && (
                  <span
                    style={{ backgroundColor: currentTheme?.hex || '#099FF9' }}
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-black"
                  >
                    ✓
                  </span>
                )}
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src={st.img} alt={st.label} className="max-h-14 object-contain" />
                </div>
                <p
                  style={{ color: isSelected ? (currentTheme?.hex || '#099FF9') : '#221750' }}
                  className="text-[14px] font-bold leading-tight"
                >
                  {st.label}
                </p>
              </motion.button>
            );
          })}
        </div>

        {handwritingStyle && (
          <div ref={questionsRef} className="w-full max-w-[420px] flex flex-col items-center pt-2">
            <h2 className="text-[24px] font-bold text-[#221750] text-center mb-6">
              Let’s see where {formattedChildName} is now!
            </h2>

            <div className="w-full flex flex-col gap-3.5">
              {QUESTIONS.map((q, idx) => {
                const currentAnswer = handwritingAnswers[idx];
                const isAnswered = currentAnswer !== null;
                const isVisible = idx === 0 || handwritingAnswers[idx - 1] !== null;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={q.id}
                    id={`hw-question-${idx}`}
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
                        Question {idx + 1} of {QUESTIONS.length}
                      </span>
                    </div>

                    <p className="text-[16px] font-bold text-[#221750] leading-snug mb-3.5">
                      {q.text}
                    </p>

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
                            className={`min-h-[48px] px-1 py-1.5 rounded-xl font-bold text-[13.5px] sm:text-[14px] border-2 transition-all flex items-center justify-center text-center select-none ${
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
          </div>
        )}
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

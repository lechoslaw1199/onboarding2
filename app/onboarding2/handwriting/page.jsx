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
      setActiveQIndex(qIndex + 1);
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
                className={`p-3.5 rounded-lg border border-solid flex flex-col items-center justify-between text-center transition-all min-h-[140px] shadow-sm ${
                  isSelected
                    ? 'bg-white border-[#221750] border-1 shadow-md'
                    : 'bg-white border-[#e2e8f0] text-[#182238] hover:border-slate-300'
                }`}
              >
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src={st.img} alt={st.label} className="max-h-14 object-contain" />
                </div>
                <p
                  style={{ color: isSelected ? (currentTheme?.hex || '#F9C700') : '#221750' }}
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

            <div className="w-full flex flex-col gap-3">
              {QUESTIONS.map((q, idx) => {
                const currentAnswer = handwritingAnswers[idx];
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
                          className="pt-4 flex flex-wrap gap-2"
                        >
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
                                className={`flex-1 min-w-[80px] h-12 rounded-lg font-bold text-[14px] border border-solid transition-all ${
                                  isOptSelected
                                    ? 'bg-white border-[#221750] border-1 shadow-sm'
                                    : 'bg-white border-[#e2e8f0]'
                                }`}
                              >
                                {opt}
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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

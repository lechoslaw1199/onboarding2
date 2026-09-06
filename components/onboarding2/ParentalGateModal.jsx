'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParentalGateModal({ isOpen, onClose, onSuccess, currentTheme }) {
  const [numA, setNumA] = useState(11);
  const [numB, setNumB] = useState(19);
  const [answer, setAnswer] = useState('');
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 20) + 10;
    const b = Math.floor(Math.random() * 20) + 10;
    setNumA(a);
    setNumB(b);
    setAnswer('');
    setHasError(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateProblem();
      setAttempts(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleKeyPress = (digit) => {
    if (answer.length >= 4) return;
    setAnswer((prev) => prev + digit);
    if (hasError) setHasError(false);
  };

  const handleClear = () => {
    setAnswer('');
    if (hasError) setHasError(false);
  };

  const handleBackspace = () => {
    setAnswer((prev) => prev.slice(0, -1));
    if (hasError) setHasError(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!answer.trim()) return;

    const parsed = parseInt(answer.trim(), 10);
    if (parsed === numA + numB) {
      onSuccess();
    } else {
      setHasError(true);
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 2) {
        generateProblem();
      }
    }
  };

  const themeHex = currentTheme?.hex || '#d946ef';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-14 sm:pt-20 px-4 bg-black/50 backdrop-blur-sm overflow-hidden select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-[360px] bg-white rounded-[24px] p-6 shadow-2xl flex flex-col items-center text-center relative z-10"
        >
          <h3 className="text-[20px] font-bold text-[#221750] mb-1.5">
            Parents only
          </h3>
          <p className="text-[14px] text-slate-600 mb-5">
            To continue, please answer: {numA} + {numB} = ?
          </p>

          <div
            tabIndex={-1}
            role="textbox"
            aria-readonly="true"
            className="w-full max-w-[240px] h-14 rounded-2xl border-2 border-slate-200 bg-white flex items-center justify-center cursor-default shadow-inner transition-colors mb-1.5 focus:outline-none"
          >
            {answer ? (
              <span
                className="text-[24px] font-extrabold tracking-wider"
                style={{ color: themeHex }}
              >
                {answer}
              </span>
            ) : (
              <span className="text-[18px] font-semibold text-slate-300 select-none">
                Answer
              </span>
            )}
          </div>

          {hasError && (
            <p className="text-[12px] font-semibold text-red-500 mb-2 animate-bounce">
              Incorrect, try again.
            </p>
          )}

          <div className="w-full max-w-[240px] flex flex-col gap-2.5 mt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleSubmit}
              style={{ backgroundColor: themeHex }}
              className="w-full h-12 text-white rounded-xl text-[16px] font-bold transition-all shadow-md hover:brightness-95"
            >
              Continue
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-1 text-[14px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-[#f2f4f8] border-t border-slate-200 shadow-2xl flex flex-col items-center"
        >
          <div className="w-full max-w-[520px] flex flex-col">
            <div className="w-full h-11 px-4 flex items-center justify-between border-b border-slate-200/80 bg-[#f8fafc]">
              <button
                type="button"
                onClick={onClose}
                className="text-[16px] font-semibold text-[#099FF9] hover:brightness-90 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-[16px] font-bold text-[#099FF9] hover:brightness-90 transition-colors"
              >
                Done
              </button>
            </div>

            <div className="w-full grid grid-cols-3 gap-1.5 p-2 pb-5 sm:pb-6">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <motion.button
                  key={digit}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => handleKeyPress(digit)}
                  className="h-12 sm:h-14 bg-white rounded-lg shadow-sm border border-slate-200/80 text-[#1e293b] font-bold text-[22px] flex items-center justify-center active:bg-slate-100 transition-colors select-none"
                >
                  {digit}
                </motion.button>
              ))}

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleClear}
                className="h-12 sm:h-14 bg-[#d8dce2] hover:bg-[#cbd2dc] rounded-lg shadow-sm border border-slate-300/60 text-[#1e293b] font-bold text-[15px] flex items-center justify-center active:bg-[#cbd2dc] transition-colors select-none"
              >
                Clear
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => handleKeyPress('0')}
                className="h-12 sm:h-14 bg-white rounded-lg shadow-sm border border-slate-200/80 text-[#1e293b] font-bold text-[22px] flex items-center justify-center active:bg-slate-100 transition-colors select-none"
              >
                0
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleBackspace}
                aria-label="Backspace"
                className="h-12 sm:h-14 bg-[#d8dce2] hover:bg-[#cbd2dc] rounded-lg shadow-sm border border-slate-300/60 text-[#1e293b] flex items-center justify-center active:bg-[#cbd2dc] transition-colors select-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-slate-800"
                >
                  <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                  <line x1="13" y1="10" x2="17" y2="14" />
                  <line x1="17" y1="10" x2="13" y2="14" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

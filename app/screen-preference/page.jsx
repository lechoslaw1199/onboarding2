'use client';

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";
import { useImagePreload } from "@/hooks/useImagePreload";

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

export default function ScreenPreference() {
  const router = useRouter();
  const { direction, updateDirection, screenPreference, setScreenPreference } = useOnboarding();
  const isReady = useImagePreload("/letterschool-logo-name.svg");
  const [showCondition, setShowCondition] = useState(!!screenPreference);

  const options = [
    "Alone",
    "With a parent or a family member",
    "It depends"
  ];

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleOptionSelect = (option) => {
    setScreenPreference(option);
    setShowCondition(true);
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/support-history");
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen relative overflow-x-hidden bg-white">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative shrink-0">
        <div className="w-full relative flex items-center justify-center mb-3">
          <button 
            className="absolute left-0 text-slate-700 flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors" 
            onClick={handleBack}
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <g>
                <path d="M6.99219 12.3594C6.99219 12.625 7.09375 12.8516 7.30469 13.0547L13.3984 19.0156C13.5625 19.1875 13.7812 19.2734 14.0312 19.2734C14.5391 19.2734 14.9375 18.8828 14.9375 18.3672C14.9375 18.1172 14.8359 17.8906 14.6641 17.7188L9.17188 12.3594L14.6641 7C14.8359 6.82031 14.9375 6.59375 14.9375 6.34375C14.9375 5.83594 14.5391 5.44531 14.0312 5.44531C13.7812 5.44531 13.5625 5.53125 13.3984 5.70312L7.30469 11.6641C7.09375 11.8672 7 12.0938 6.99219 12.3594Z" fill="currentColor"></path>
              </g>
            </svg>
          </button>
          <img src="/letterschool-logo-name.svg" alt="LetterSchool" className="h-6 object-contain" />
        </div>
        <ProgressBar progress={45} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] px-8 flex flex-col items-center pt-2 pb-10"
      >
        <div className="w-full pt-4 pb-4">
          <h1 className="text-[24px] font-bold text-[#221750] leading-tight text-center">
            How does your child prefer to use a screen?
          </h1>
        </div>

        <div className="w-full flex flex-col gap-3 mb-4">
          {options.map((option) => (
            <motion.button
              key={option}
              whileTap={{ scale: 0.98 }}
              className={`min-h-[70px] py-4 px-8 rounded-lg text-[16px] font-bold flex items-center justify-center transition-all duration-200 border border-solid leading-snug ${
                screenPreference === option 
                  ? 'bg-white text-[#5032F5] border-[#221750] border-1 shadow-sm' 
                  : 'bg-white text-[#5032F5] border-[#e2e8f0]'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>

        
      </motion.main>
 
      {showCondition && (
        <motion.div
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate={isReady ? "animate" : "initial"}
          exit="exit"
          className="fixed bottom-0 w-full max-w-[480px] px-8 z-50 pb-3 pt-2"
        >
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 bg-[#099FF9] hover:bg-[#0088EE] text-white rounded-full text-[18px] font-bold transition-all shadow-md"
            onClick={handleContinue}
          >
            Continue
          </motion.button>
        </motion.div>
      )}

    </div>
  );
}

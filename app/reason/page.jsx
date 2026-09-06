'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useState } from "react";

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

export default function TeachingReason() {
  const router = useRouter();
  const { childGender, direction, updateDirection, selectedReason, setSelectedReason } = useOnboarding();
  const isReady = useImagePreload("/letterschool-logo-name.svg");

  const getSubj = () => childGender === "Boy" ? "he" : childGender === "Girl" ? "she" : "they";
  const getObj = () => childGender === "Boy" ? "him" : childGender === "Girl" ? "her" : "them";
  const getSubjCap = () => childGender === "Boy" ? "He" : childGender === "Girl" ? "She" : "They";

  const reasons = [
    `I want to give ${getObj()} a confident head start before school`,
    `${getSubjCap()} is struggling, and I want to help ${getObj()} catch up`,
    "I'm homeschooling and need a strong writing & spelling curriculum",
    `I want to stay involved and support what ${getSubj()} is learning at school`,
    "Something else"
  ];

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    updateDirection(1);
    
    if (reason) {
      router.push("/learning-differences");
    } else {
      // Future navigation could go here
      alert(`Reason selected: ${reason}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
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
        <ProgressBar progress={20} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-20 flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold mb-4 text-center text-[#221750] leading-tight px-4  mt-4">
          What's the main reason you want to teach your child to write?
        </h1>

        <div className="flex flex-col gap-3 w-full">
          {reasons.map((reason) => (
            <motion.button
              key={reason}
              whileTap={{ scale: 0.98 }}
              className={`min-h-[70px] py-4 px-8 rounded-lg text-[16px] font-bold flex items-center justify-center text-center transition-all duration-200 border border-solid leading-tight ${
                selectedReason === reason 
                  ? 'bg-white text-[#5032F5] border-[#221750] border-1 shadow-sm' 
                  : 'bg-white text-[#5032F5] border-[#e2e8f0]'
              }`}
              onClick={() => handleReasonSelect(reason)}
            >
              {reason}
            </motion.button>
          ))}
        </div>
      </motion.main>
    </div>
  );
}

'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
import { useImagePreload } from "@/hooks/useImagePreload";
import VirtualKeyboard from "@/components/VirtualKeyboard";

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

export default function ChildNamePage() {
  const router = useRouter();
  const { childName, setChildName, direction, updateDirection } = useOnboarding();
  const [name, setName] = useState(childName || "");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isReady = useImagePreload(["/letterschool-logo-name.svg", "/kidSafe.webp"]);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    if (name.trim()) {
      setChildName(name.trim());
      updateDirection(1);
      router.push("/reading-level");
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col items-center bg-white px-6 font-quicksand overflow-x-hidden transition-all duration-300 ${showKeyboard ? 'pb-[340px]' : 'pb-12'}`}>
      {/* Header */}
      <header className="w-full max-w-[450px] flex items-center justify-center py-6 relative">
        <button 
          className="absolute left-0 text-slate-700 flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors" 
          onClick={handleBack}
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path d="M6.99219 12.3594C6.99219 12.625 7.09375 12.8516 7.30469 13.0547L13.3984 19.0156C13.5625 19.1875 13.7812 19.2734 14.0312 19.2734C14.5391 19.2734 14.9375 18.8828 14.9375 18.3672C14.9375 18.1172 14.8359 17.8906 14.6641 17.7188L9.17188 12.3594L14.6641 7C14.8359 6.82031 14.9375 6.59375 14.9375 6.34375C14.9375 5.83594 14.5391 5.44531 14.0312 5.44531C13.7812 5.44531 13.5625 5.53125 13.3984 5.70312L7.30469 11.6641C7.09375 11.8672 7 12.0938 6.99219 12.3594Z" fill="currentColor"></path>
          </svg>
        </button>
        <img src="/letterschool-logo-name.svg" alt="LetterSchool" className="h-6 object-contain" />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-2 leading-tight px-4">
          Give your child the best learning journey!
        </h1>
        <p className="text-[14px] text-slate-500 text-center mb-6 px-4">
          Providing this info helps us pick content that&apos;s just right
        </p>

        {/* Name Input */}
        <div className="w-full px-4 mb-5">
          <label className="block text-[15px] font-semibold text-[#221750] mb-2">
            What&apos;s your child&apos;s first name?
          </label>
          <div
            onClick={() => setShowKeyboard(true)}
            className={`w-full h-14 px-5 rounded-2xl border-2 transition-all flex items-center shadow-sm cursor-pointer overflow-hidden ${
              showKeyboard ? 'border-[#099FF9] ring-2 ring-[#099FF9]/20 bg-white' : 'border-slate-300 bg-white'
            }`}
          >
            {!name ? (
              <div className="flex items-center w-full">
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse mr-0.5 inline-block shrink-0" />
                )}
                <span className="text-[17px] font-medium text-slate-400 select-none">
                  Add name
                </span>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <span className="text-[17px] font-medium text-[#221750] whitespace-pre select-none">
                  {name}
                </span>
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse ml-0.5 inline-block shrink-0" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="w-full px-4 mb-6">
          <motion.button
            whileTap={name.trim() ? { scale: 0.98 } : {}}
            disabled={!name.trim()}
            className={`w-full h-14 bg-[#099FF9] hover:bg-[#0088EE] text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
              !name.trim() ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-105 shadow-purple-500/10'
            }`}
            onClick={handleContinue}
          >
            Continue
          </motion.button>
        </div>

        {/* Tip Box */}
        <div className="w-full px-4 mb-6">
          <div className="bg-[#FFECFF] border border-[#FBA0FF] rounded-xl py-2.5 px-4 text-center">
            <p className="text-[13px] text-[#221750] font-medium">
              Tip: You can add more profiles later (up to 3 children)
            </p>
          </div>
        </div>

      </motion.main>

      {/* On-Screen Virtual Keyboard */}
      <VirtualKeyboard
        value={name}
        onChange={setName}
        onDone={handleContinue}
        onCancel={() => setShowKeyboard(false)}
        showKeyboard={showKeyboard}
      />
    </div>
  );
}

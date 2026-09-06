'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
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

export default function ReadingLevelPage() {
  const router = useRouter();
  const { childName, childGender, direction, updateDirection } = useOnboarding();
  const isReady = useImagePreload("/reading-level.jpeg");

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    // Route to the next page in the sequence
    router.push("/reading-plan"); 
  };

  // Helper for dynamic pronouns
  const getPronoun = () => {
    if (childGender === "Boy") return "He";
    return "She"; // Default to She as per screenshot
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white px-6 font-quicksand overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-[450px] flex items-center justify-center py-6 relative shrink-0">
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
        className="w-full max-w-[430px] flex flex-col items-center pt-2 pb-32"
      >
        {/* Certificate Image */}
        <div className="w-full flex justify-center mb-0">
          <img 
            src="/reading-level.jpeg" 
            alt="LetterSchool Achievement Certificate" 
            className="w-full object-contain rounded-2xl"
          />
        </div>

        {/* Dynamic Text */}
        <div className="text-start w-full px-2 mt-4">
          <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-4">
            By the end of the program, {childName || 'your child'} will be confidently writing letters and spelling words independently!
          </h1>
        
        </div>
      </motion.main>

      {/* Standardized Fixed Bottom Button */}
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
    </div>
  );
}

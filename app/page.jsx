'use client';

import React, { Suspense, useEffect } from 'react';
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useImagePreload } from "@/hooks/useImagePreload";

// Force dynamic rendering to prevent static export bailouts with useSearchParams
export const dynamic = 'force-dynamic';

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

function AgeSelectionContent() {
  const { selectedAge, setSelectedAge, direction, updateDirection } = useOnboarding();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReady = useImagePreload(["/letterschool-logo-name.svg", "/awards.png"]);

  // Capture and store idfv & letterschool_id on mount
  useEffect(() => {
    const idfv = searchParams.get('idfv');
    const letterschoolId = searchParams.get('letterschool_id');

    if (idfv) {
      localStorage.setItem('idfv', idfv);
    }
    if (letterschoolId) {
      localStorage.setItem('letterschool_id', letterschoolId);
    }
  }, [searchParams]);

  const ages = [
    "Under 3", "3", "3 ½",
    "4", "4 ½", "5",
    "6", "7", "8+"
  ];

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    updateDirection(1); // Moving forward
    router.push("/research");
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <header className="w-full max-w-[480px] flex flex-col items-center pt-8 pb-0 px-5 relative shrink-0">
        <div className="w-full relative flex items-center justify-center mb-4">
          <img src="/letterschool-logo-name.svg" alt="LetterSchool" className="h-7 object-contain" />
        </div>
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-16 flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold mb-4 text-center text-black">
          <span className="text-[#099FF9]">How old</span> is your child?
        </h1>

        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {ages.map((age) => (
            <motion.button
              key={age}
              whileTap={{ scale: 0.98 }}
              className={`h-[70px] rounded-xl text-[16px] font-bold flex items-center justify-center transition-all duration-200 border-2 ${
                selectedAge === age 
                  ? 'bg-[#E0F2FE] text-[#099FF9] border-[#099FF9] shadow-sm' 
                  : 'bg-white text-[#182238] border-[#e2e8f0] hover:border-[#099FF9]/40'
              }`}
              onClick={() => handleAgeSelect(age)}
            >
              {age}
            </motion.button>
          ))}
        </div>

        <div className="bg-[#EBF7FF] border border-[#BAE6FD] rounded-[20px] py-2.5 px-4 mb-4 text-center w-full">
          <p className="text-[#0369A1] text-[13px] font-semibold">
            ✨ Tip: You can add more child profiles later (up to 3 children)
          </p>
        </div>

        <div className="w-full flex justify-center mb-4">
          <img src="/awards.png" className="w-full max-w-[380px] object-contain" alt="Awards and Certifications" />
        </div>

        <div className="flex flex-col items-center text-center w-full">
          <div className="text-[#F59E0B] text-[18px] mb-1 tracking-[2px]">★★★★★</div>
          <p className="text-[13px] font-bold text-[#182238] tracking-[0.5px] uppercase">4.5 / 5 STARS RATED</p>
          <p className="text-[13px] font-semibold text-[#64748B] tracking-[0.5px] uppercase">FROM 20,000+ PARENTS, TEACHERS & OTs</p>
        </div>
      </motion.main>
    </div>
  );
}

export default function AgeSelection() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-white" />}>
      <AgeSelectionContent />
    </Suspense>
  );
}

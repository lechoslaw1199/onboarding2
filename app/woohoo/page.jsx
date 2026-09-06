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

export default function EmailEntry() {
  const router = useRouter();
  const { parentEmail, setParentEmail, direction, updateDirection } = useOnboarding();
  const [email, setEmail] = useState(parentEmail || "");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isReady = useImagePreload(["/letterschool-logo-name.svg", "/faces-7mio.jpeg"]);

  const handleContinue = () => {
    if (email.includes('@')) {
      setParentEmail(email);
      updateDirection(1);
      router.push("/child-name"); 
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col items-center bg-white md:px-6 font-quicksand overflow-x-hidden transition-all duration-300 ${showKeyboard ? 'pb-[340px]' : 'pb-12'}`}>
      <header className="w-full max-w-[450px] flex justify-center py-6">
        <img src="/letterschool-logo-name.svg" alt="LetterSchool" className="h-6 object-contain" />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center pt-4"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-6 leading-tight px-4">
          Enter your email to get started with a personalized writing plan
        </h1>

        <div className="w-full px-4 mb-6">
          <div
            onClick={() => setShowKeyboard(true)}
            className={`w-full h-14 px-5 rounded-2xl border-2 transition-all flex items-center shadow-sm cursor-pointer overflow-hidden ${
              showKeyboard ? 'border-[#099FF9] ring-2 ring-[#099FF9]/20 bg-white' : 'border-slate-300 bg-white'
            }`}
          >
            {!email ? (
              <div className="flex items-center w-full">
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse mr-0.5 inline-block shrink-0" />
                )}
                <span className="text-[17px] font-medium text-slate-400 select-none">
                  Enter your email
                </span>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <span className="text-[17px] font-medium text-[#221750] whitespace-pre select-none">
                  {email}
                </span>
                {showKeyboard && (
                  <span className="w-[2px] h-6 bg-[#099FF9] animate-pulse ml-0.5 inline-block shrink-0" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-4 mb-6">
          <motion.button
            whileTap={email.includes('@') ? { scale: 0.98 } : {}}
            disabled={!email.includes('@')}
            className={`w-full h-14 bg-[#099FF9] hover:bg-[#0088EE] text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
              !email.includes('@') ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-105'
            }`}
            onClick={handleContinue}
          >
            Continue
          </motion.button>
        </div>

        <div className="w-full px-8 text-center mb-6">
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
            We respect your privacy and never spam. Please read our{" "} 
            <a href="https://www.letterschool.com/legal/privacy-policy" className="underline text-[#5032F5]">Privacy Policy</a>{" "}
            to understand how we use your data.
          </p>
        </div>

        <div className="w-full flex flex-col items-center mt-auto pb-4">
          <img 
            src="/faces-7mio.jpeg" 
            alt="Parents joining" 
            className="h-10 object-contain mb-2"
          />
          <p className="text-[13px] text-center text-[#221750] font-medium leading-tight px-12 italic opacity-80">
            Join <span className="font-bold">more than 7 million kids</span> who&apos;ve learned to write and spell with LetterSchool!
          </p>
        </div>
      </motion.main>

      <VirtualKeyboard
        value={email}
        onChange={setEmail}
        onDone={handleContinue}
        onCancel={() => setShowKeyboard(false)}
        showKeyboard={showKeyboard}
        type="email"
      />
    </div>
  );
}

'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

export default function WhyItWorks() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();
  const isReady = useImagePreload(["/letterschool-logo-name.svg", "/ugc-homeschool-2.webp"]);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/lessons");
  };

  const handleSkip = () => {
    updateDirection(1);
    router.push("/lessons");
  };

  const steps = [
    {
      num: "1",
      badge: "DISCOVER",
      title: "See & Listen",
      desc: "Interactive animations show proper starting points and directionality while reinforcing the letter phonics sound.",
      color: "#099FF9",
      bg: "#E0F2FE"
    },
    {
      num: "2",
      badge: "TRACE",
      title: "Guided Multi-Sensory Tracing",
      desc: "Kids trace characters using fun themes (train tracks, fireworks, laser lines) with real-time auditory error correction.",
      color: "#09BD00",
      bg: "#DCFCE7"
    },
    {
      num: "3",
      badge: "WRITE",
      title: "Free-Form Memory Test",
      desc: "Children write letters independently from memory, unlocking Golden Levels and celebratory certificates!",
      color: "#F59E0B",
      bg: "#FEF3C7"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen relative overflow-x-clip font-quicksand">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative shrink-0">
        <button 
          className="absolute left-2 top-4 text-slate-700 flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors" 
          onClick={handleBack}
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <g>
              <path d="M6.99219 12.3594C6.99219 12.625 7.09375 12.8516 7.30469 13.0547L13.3984 19.0156C13.5625 19.1875 13.7812 19.2734 14.0312 19.2734C14.5391 19.2734 14.9375 18.8828 14.9375 18.3672C14.9375 18.1172 14.8359 17.8906 14.6641 17.7188L9.17188 12.3594L14.6641 7C14.8359 6.82031 14.9375 6.59375 14.9375 6.34375C14.9375 5.83594 14.5391 5.44531 14.0312 5.44531C13.7812 5.44531 13.5625 5.53125 13.3984 5.70312L7.30469 11.6641C7.09375 11.8672 7 12.0938 6.99219 12.3594Z" fill="currentColor"></path>
            </g>
          </svg>
        </button>
        <img src="/letterschool-logo-name.svg" alt="LetterSchool" className="h-7 mb-3 object-contain" />
        <ProgressBar progress={63} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] px-6 flex flex-col items-center pt-5 pb-28 flex-grow"
      >
        <h1 className="text-[23px] font-bold text-[#182238] text-center mb-2 leading-tight">
          Why <span className="text-[#099FF9]">LetterSchool</span> actually works
        </h1>
        <p className="text-[14px] text-[#64748B] text-center mb-6 font-medium">
          Our proven 3-step method builds long-term muscle memory and early literacy confidence.
        </p>

        <div className="w-full flex flex-col gap-3.5 mb-6">
          {steps.map((step, idx) => (
            <div key={idx} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex gap-3.5 items-start shadow-sm">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
                style={{ backgroundColor: step.bg, color: step.color }}
              >
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                    style={{ backgroundColor: step.bg, color: step.color }}
                  >
                    {step.badge}
                  </span>
                  <h3 className="text-[15px] font-bold text-[#182238]">{step.title}</h3>
                </div>
                <p className="text-[13px] text-[#475569] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full bg-[#EBF7FF] border border-[#BAE6FD] rounded-2xl p-4 text-center">
          <p className="text-[13px] text-[#0369A1] font-semibold">
            🧠 Recommended by Occupational Therapists &amp; used in 5,000+ schools worldwide
          </p>
        </div>
      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] px-8 fixed bottom-0 z-50 pb-4 pt-2 bg-gradient-to-t from-white via-white to-white/0 flex flex-col items-center"
      >
        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-[#099FF9] hover:bg-[#0088EE] text-white rounded-full text-lg font-bold transition-all shadow-lg shadow-blue-500/25"
          onClick={handleContinue}
        >
          Continue
        </motion.button>
        
        <button 
          className="w-full py-1.5 text-[13px] text-slate-500 font-bold hover:text-slate-700 transition-colors mt-1"
          onClick={handleSkip}
        >
          Skip &quot;Why it works&quot;
        </button>
      </motion.div>
    </div>
  );
}

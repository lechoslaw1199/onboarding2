'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useState, useRef } from "react";

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

export default function FluencyVideo() {
  const router = useRouter();
  const { direction, updateDirection, focusDuration } = useOnboarding();
  const isReady = useImagePreload(["/letterschool-logo-name.svg", "/fluency-thumbnail.jpeg"]);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/parent-feelings"); // Towards parent feelings
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Dynamic title based on focus duration
  let title = "Even just 5-10 minutes at a time can make a difference";
  if (focusDuration && focusDuration !== "It depends on the day") {
    const duration = focusDuration.toLowerCase();
    title = `Even just ${duration} at a time can make a difference`;
  } else if (focusDuration === "It depends on the day") {
    title = "Even just a few minutes at a time can make a difference";
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen relative overflow-x-hidden bg-white font-quicksand">
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
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[480px] px-6 flex flex-col items-center pt-2 pb-32"
      >
        <div className="w-full px-2 mb-6">
          <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2">
            {title}
          </h1>
          <p className="text-[16px] text-[#221750] font-medium leading-relaxed opacity-90">
            Our lessons are designed to fit short attention spans, so your child can learn in small, happy moments — and still make steady progress
          </p>
        </div>

        <div className="w-full flex justify-center mb-6 relative px-4">
          <div 
            className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-black/5 w-full aspect-[4/5] relative cursor-pointer group"
            onClick={togglePlay}
          >
            <video 
              ref={videoRef}
              src="/tas-tv13-focus.mp4" 
              poster="/fluency-thumbnail.jpeg"
              className="w-full h-full object-cover" 
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-colors group-hover:bg-black/10">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5V19L19 12L8 5Z" />
                </svg>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="black">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </div>
            )}
          </div>
        </div>

      </motion.main>
 
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

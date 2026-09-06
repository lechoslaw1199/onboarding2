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

const dyslexiaReviews = [
  {
    author: "Rachel B.",
    role: "Mom of 6-year-old with Dyslexia",
    text: "My son constantly confused and reversed 'b', 'd', 'p', and 'q'. He felt so defeated and behind his peers. LetterSchool's directional arrows and guided start-points taught his brain the unique stroke flow of each letter. His reversals have dropped significantly and his confidence is back!"
  },
  {
    author: "Michael S.",
    role: "Parent of 7-year-old",
    text: "Multi-sensory learning is crucial for dyslexic minds. Hearing the letter sound while tracing the exact shape on screen formed neural pathways that paper flashcards never could. His reading and spelling readiness skyrocketed in less than a month."
  },
  {
    author: "Claire W., M.Ed.",
    role: "Reading Specialist & Dyslexia Tutor",
    text: "LetterSchool is an invaluable tool in my intervention toolkit. The structured sequential method follows Orton-Gillingham phonics principles, making letter-sound associations intuitive and stress-free for struggling readers."
  },
  {
    author: "Thomas H.",
    role: "Father of 5-year-old",
    text: "My daughter was showing early signs of letter-recognition difficulty. The step-by-step guidance gives her all the scaffolding she needs to succeed without feeling overwhelmed. She is so proud of herself now!"
  }
];

export default function SocialProofDyslexia() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();

  const isReady = useImagePreload([
    "/letterschool-logo-name.svg"
  ]);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/school-method");
  };

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen relative overflow-x-clip font-quicksand">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative shrink-0">
        <div className="w-full relative flex items-center justify-center mb-0">
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
        className="w-full max-w-[480px] flex flex-col items-center flex-grow px-6 pb-32"
      >
        <div className="w-full pt-6 pb-4">
          <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-2 text-start">
            You&apos;re in good hands!
          </h1>
          <p className="text-[15px] text-[#221750]/80 font-medium text-start leading-relaxed opacity-90">
            See how LetterSchool helps children with dyslexia master letter formation and spelling through structured, multi-sensory practice.
          </p>
        </div>

        {/* Review Cards */}
        <div className="w-full flex flex-col gap-4 mb-2">
          {dyslexiaReviews.map((review, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 text-start transition-all"
            >
              <div className="flex text-[#F59E0B] text-[18px] mb-3 tracking-widest">
                ★★★★★
              </div>
              <p className="text-slate-600 text-[15px] leading-[1.6] font-normal mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <h3 className="text-[#221750] font-bold text-[16px]">
                {review.author}
              </h3>
              <p className="text-slate-400 text-[13px] font-medium mt-0.5">
                {review.role}
              </p>
            </div>
          ))}
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

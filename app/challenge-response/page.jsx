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
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

const challengeContent = {
  "Lack of time": {
    title: "We get it: life gets busy!",
    content: "We know you're busy, so we designed short, 15-minute lessons you can easily weave into your weekly schedule. \nThere's no need to rush or take on too much at once. True progress comes from steady, everyday habits.",
    image: "/program.jpg"
  },
  "Too expensive": {
    title: "Less expensive than a tutor!",
    content: "While the LetterSchool program requires a paid subscription, we do our best to keep it affordable.",
    highlight: "It's a fraction of the cost of a private tutor!",
    image: "/program.jpg"
  },
  "Ineffective program(s)": {
    title: "LetterSchool is research-backed and proven to work!",
    content: "Not to throw shade on other \"educational\" apps, but a lot of them provide entertainment without real learning.\n\nOur guided letter-tracing method is based on proven handwriting pedagogy and proven to work!",
    image: "/program.jpg"
  },
  "Lack of motivation from them": {
    title: "Quick progress + fun = motivation",
    content: "Our lessons are fun and built so that your child progresses quickly, feels accomplished, and comes back for more!",
    image: "/program.jpg"
  },
  "Something else": {
    title: "LetterSchool is research-backed and proven to work!",
    content: "Most apps for teaching letter writing can be boring or ineffective.\n\nWe're confident we've built the most engaging letter-writing and spelling program on earth, so you never have to look anywhere else!",
    image: "/program.jpg"
  }
};

export default function ChallengeResponse() {
  const router = useRouter();
  const { direction, updateDirection, homeChallenge } = useOnboarding();
  const currentContent = challengeContent[homeChallenge] || challengeContent["Something else"];
  const isReady = useImagePreload(currentContent.image);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/screen-preference");
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen relative overflow-x-clip">
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
        className="w-full max-w-[450px] px-6 flex flex-col items-center pt-8 pb-32"
      >
        <div className="w-full flex justify-center mb-4 relative">
          <img 
            src={currentContent.image} 
            alt="Teaching challenge" 
            className="w-full max-w-[380px] object-contain rounded-2xl shadow-sm"
          />
        </div>

        <div className="w-full flex flex-col items-start px-2">
          <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-4">
            {currentContent.title}
          </h1>

          <div className="text-[16px] text-[#221750] font-medium leading-relaxed whitespace-pre-line opacity-90">
            {currentContent.content}
            {currentContent.highlight && (
              <div className="mt-6 font-bold">
                {currentContent.highlight}
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

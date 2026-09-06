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

export default function ReviewsPage() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();
  
  const reviews = [
    {
      source: "AppySmarts.com",
      text: "What we liked: The concept. Fun visuals. Ease of use. Extensive set of 3 letter words. 3 difficulty levels. Great for early learning practice (phonics, word and syllable formation and spelling)."
    },
    {
      source: "Best Apps for Kids",
      text: "What a Fantastic Job these Developers Did! A handwriting lesson the fun way! Extremely enticing for kids and filled with colors, stars and praise. Certainly this is an app that should be in all preschool and kindergarten classes! This app is a great addition to your kid’s toolbox for life!"
    },
    {
      source: "Your Therapy Source",
      text: "Pretty impressed... I have tested out a few letter tracing apps and I give this one the award for the best so far."
    },
    {
      source: "The iPhone App Review",
      text: "Truly impressive! The app sets a definitive bar for teaching young children to write letters and numbers, and with a wealth of incredibly detailed and gorgeous animations, it will even entertain the tikes, too. It’s a truly impressive effort, and as this level of high-quality animation persists throughout the entire app, we can’t possibly recommend the graphics enough. Simply put, they’re divine."
    },
    {
      source: "MakeUseOf.com",
      text: "One of “4 Wonderful Educational iPad Apps For Kids” LetterSchool is the kind of app I wish I had around when I was younger. In three easy steps, it teaches kids how to write letters and numbers, using just the right gradient to make it super easy to learn. The process includes different amusing effects for each letter, which makes the whole process fun and interesting."
    },
    {
      source: "BestKidsApps.com",
      text: "This is educational technology as it should be! LetterSchool is a “best of the bunch” letter learning and handwriting app that will keep kids coming back for more. Subtle audio clues help kids learn the correct way to form letters. Simple animations boost the replay value. Teachers and occupational therapists will love the fact that they can designate lower or upper case letters (or numbers) as well as choose from three handwriting learning programs."
    }
  ];

  const isReady = useImagePreload(["/letterschool-logo-name.svg"]);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/how-did-you-hear");
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen relative overflow-x-hidden bg-white font-quicksand">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative shrink-0">
        <div className="w-full relative flex items-center justify-center mb-3">
          <button 
            className="absolute left-0 text-purple-dark flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors" 
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
        className="w-full max-w-[480px] px-6 flex flex-col items-center pt-4 pb-32"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight text-center mb-6 px-4">
          Join millions of parents who gave their children the gift of confident letter writing and spelling
        </h1>

        <div className="w-full flex flex-col gap-4 mb-6">
          {reviews.map((review, index) => (
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
                {review.source}
              </h3>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center text-center px-4 mb-4">
          <p className="text-[14px] font-medium text-[#000000] leading-tight mb-4 uppercase tracking-wide">
            THERE ARE THOUSANDS OF OTHER COMMENTS LIKE THIS ON SOCIAL MEDIA!
          </p>
          <p className="text-[#000000] font-bold mb-4">&</p>
          <div className="flex flex-col items-center">
            <div className="text-[#F59E0B] text-[18px] mb-1 tracking-[2px]">★★★★★</div>
            <p className="text-[13px] font-bold text-[#182238] tracking-[0.5px] mb-1 uppercase">4.5 / 5 STARS RATED</p>
            <p className="text-[13px] font-semibold text-[#64748B] tracking-[0.5px] uppercase">FROM 20,000+ PARENTS, TEACHERS & OTS</p>
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

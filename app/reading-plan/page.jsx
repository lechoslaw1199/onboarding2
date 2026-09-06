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

export default function ReadingPlanPage() {
  const router = useRouter();
  const { childName, direction, updateDirection } = useOnboarding();
  const isReady = useImagePreload("/letterschool-logo-name.svg");

  const handleContinue = () => {
    updateDirection(1);

    const idfv = typeof window !== 'undefined' ? localStorage.getItem('idfv') : null;
    const letterschoolId = typeof window !== 'undefined' ? localStorage.getItem('letterschool_id') : null;

    const baseUrl = 'https://lttrschl.com/onboardingX/en-us-102/index-keyboard-paywall.html?page=paywall';
    const params = new URLSearchParams();

    if (idfv) params.append('idfv', idfv);
    if (letterschoolId) params.append('letterschool_id', letterschoolId);

    const finalUrl = params.toString() ? `${baseUrl}&${params.toString()}` : baseUrl;

    window.location.href = finalUrl;
  };

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 font-quicksand bg-[#0F172A]">
      <header className="w-full max-w-[450px] flex items-center justify-center py-6 relative shrink-0">
        <button 
          className="absolute left-0 text-white flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors" 
          onClick={handleBack}
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
          <img src="/letterschool-logo-name.svg" alt="LetterSchool" className="h-6 object-contain" />
        </div>
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center pt-2"
      >
        <h1 className="text-[24px] font-bold text-white text-center mb-6 leading-tight px-4">
          {childName ? `${childName}'s` : "Your Child's"} Learning Plan
        </h1>

        <div className="w-full bg-[#1E293B] border border-slate-700/60 rounded-3xl p-6 shadow-2xl mb-4 relative overflow-hidden">
          <div className="text-center mb-4">
            <h2 className="text-[17px] font-bold text-white mb-1">Based on 3-4 Sessions per week</h2>
            <p className="text-[15px] text-slate-300 leading-relaxed px-2">
              You can expect {childName || 'your child'} to reach <span className="text-[#38BDF8] font-bold">confident handwriting &amp; spelling mastery</span> within 3-6 months
            </p>
          </div>

          <div className="w-full aspect-[4/3] relative">
            <svg viewBox="0 0 340 240" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="lsCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#FACC15" />
                </linearGradient>
              </defs>

              {[50, 90, 130, 170, 210].map((y, i) => (
                <motion.line
                  key={y}
                  x1="0" y1={y} x2="340" y2={y}
                  stroke="white" strokeWidth="1.5" strokeOpacity="0.15"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                />
              ))}

              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <line x1="40" y1="170" x2="40" y2="210" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" />
                <circle cx="40" cy="170" r="7" fill="#38BDF8" />
                <rect x="10" y="125" width="85" height="30" rx="10" fill="#0284C7" />
                <text x="52.5" y="145" textAnchor="middle" fill="white" className="text-[12px] font-bold">Current level</text>
                <text x="40" y="235" textAnchor="middle" fill="#38BDF8" className="text-[13px] font-bold opacity-90">Today</text>
              </motion.g>

              <motion.path
                d="M 40 170 C 130 170, 240 140, 295 50"
                fill="transparent"
                stroke="url(#lsCurveGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
              />

              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                <line x1="295" y1="50" x2="295" y2="210" stroke="#FACC15" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" />
                <circle cx="295" cy="50" r="7" fill="#FACC15" />
                <rect x="205" y="-10" width="130" height="46" rx="12" fill="#CA8A04" />
                <text x="270" y="8" textAnchor="middle" fill="white" className="text-[12px] font-bold">Writes first sentence </text>
                <text x="270" y="24" textAnchor="middle" fill="white" className="text-[12px] font-bold">independently</text>
                <text x="295" y="235" textAnchor="middle" fill="#FACC15" className="text-[13px] font-bold">3 - 6 months</text>
              </motion.g>
            </svg>
          </div>
        </div>

        <p className="text-[14px] text-slate-300 text-center leading-relaxed px-4 mb-24 font-medium">
          LetterSchool includes <span className="font-bold text-[#38BDF8]">comprehensive handwriting &amp; phonics curriculum</span> — with uppercase, lowercase, numbers, and spelling modules.
        </p>

      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="fixed bottom-0 w-full max-w-[480px] px-8 z-50 pb-4 pt-2 bg-gradient-to-t from-[#0F172A] via-[#0F172A] to-[#0F172A]/0"
      >
        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-[#099FF9] hover:bg-[#0088EE] text-white rounded-full text-[18px] font-bold transition-all shadow-xl shadow-blue-500/25"
          onClick={handleContinue}
        >
          Start 7 day FREE Trial
        </motion.button>
      </motion.div>
    </div>
  );
}

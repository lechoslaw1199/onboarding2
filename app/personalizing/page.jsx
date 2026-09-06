'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { useImagePreload } from "@/hooks/useImagePreload";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0 }
};

export default function Personalizing() {
  const router = useRouter();
  const { childName, selectedReason, homeChallenge, selectedStatus, setTeacherRecommended } = useOnboarding();
  const isReady = useImagePreload("/kindergarten.webp");
  const [percentages, setPercentages] = useState([0, 0, 0, 0]);
  const [complete, setComplete] = useState(false);
  const [currentStepInfo, setCurrentStepInfo] = useState({ step: 0, startPercent: 0 });

  const durations = [3000, 2000, 4000, 2500]; // ms
  const goalText = homeChallenge || selectedReason || selectedStatus?.replace("Yes, ", "") || "your goal";

  const progressSteps = [
    { label: `Analyzing your goal`, id: 0 },
    { label: `Analyzing experience`, id: 1 },
    { label: "Analyzing other answers", id: 2 },
    { label: `Personalizing your child's profile`, id: 3 },
  ];

  const startStep = (s, startP = 0) => {
    const duration = durations[s];
    const startTime = Date.now() - (duration * (startP / 100));
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      const jitter = Math.random() * 5 - 2.5; 
      const displayProgress = Math.min(Math.max(rawProgress + (rawProgress < 100 ? jitter : 0), 0), 100);


      setPercentages(prev => {
        const next = [...prev];
        next[s] = Math.floor(displayProgress);
        return next;
      });

      if (elapsed >= duration) {
        clearInterval(interval);
        setPercentages(prev => {
          const next = [...prev];
          next[s] = 100;
          return next;
        });
        
        if (s < 3) {
          setTimeout(() => startStep(s + 1), 200);
        } else {
          setComplete(true);
        }
      }
    }, 50);

    return interval;
  };

  useEffect(() => {
    const interval = startStep(0);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (complete) {
      setTimeout(() => {
        router.push("/child-name");
      }, 800);
    }
  }, [complete, router]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white overflow-x-hidden pt-12 px-6 relative">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        className={`w-full max-w-[450px] flex flex-col items-center transition-all duration-300`}
      >
        <h1 className="text-[24px] font-bold text-[#221750] mb-4 font-quicksand text-center">
          Personalizing your plan....
        </h1>

        <div className="w-full flex flex-col gap-2 mb-6">
          {progressSteps.map((step, index) => {
            const isActive = percentages[index] > 0 && percentages[index] < 100;
            return (
              <div key={step.id} className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center w-full px-1">
                  <span className="text-[14px] font-bold text-black font-quicksand leading-tight max-w-[85%]">
                    {step.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-black font-quicksand">
                      {percentages[index]}%
                    </span>
                    {isActive && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full"
                      />
                    )}
                  </div>
                </div>
                <div className="w-full h-[10px] bg-[#EEEEEE] rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentages[index]}%` }}
                    transition={{ duration: 0.1 }}
                    className="h-full bg-gradient-to-r from-[#82E9FF] via-[#A594F9] to-[#D55CFF]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center mt-6">
          <img 
            src="/kindergarten.webp" 
            alt="Kindergarten preparation" 
            className="w-full max-w-[450px] object-contain rounded-2xl shadow-sm"
          />
        </div>
      </motion.div>

    </div>
  );
}

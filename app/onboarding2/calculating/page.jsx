'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2 } from '@/context/Onboarding2Context';
import Onboarding2Header from '@/components/onboarding2/Onboarding2Header';

export default function CalculatingPage() {
  const router = useRouter();
  const {
    formattedChildName,
    childAge,
    handwritingAnswers,
    readingAnswers,
    readingReason,
    setCalculatedLevel,
    computeLearningLevel,
    updateDirection,
    currentTheme,
  } = useOnboarding2();

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Run level calculation
    const levelResult = computeLearningLevel(childAge, handwritingAnswers, readingAnswers, readingReason);
    setCalculatedLevel(levelResult);

    try {
      localStorage.setItem('calculatedLevel', JSON.stringify(levelResult));
    } catch (_) {}

    // Animate percentage from 0 to 100
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            updateDirection(1);
            router.push('/onboarding2/learning-level');
          }, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [childAge, handwritingAnswers, readingAnswers, readingReason]);

  const getStatusText = (p) => {
    if (p < 33) return "Grabbing interests...";
    if (p < 66) return "Combining learning stage...";
    return "Working our magic...";
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Onboarding2Header showBack={false} />

      <main className="w-full max-w-[480px] px-6 flex flex-col items-center flex-grow pt-10 pb-16 text-center justify-center">
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-12 max-w-[360px]">
          {formattedChildName}&apos;s learning level is being calculated
        </h1>

        {/* Circular Progress Bar */}
        <div className="relative w-[220px] h-[220px] flex items-center justify-center mb-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#F1F5F9"
              strokeWidth="16"
              fill="transparent"
            />
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke={currentTheme?.hex || '#F9C700'}
              strokeWidth="16"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75 ease-linear"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              style={{ color: currentTheme?.hex || '#F9C700' }}
              className="text-[38px] font-extrabold"
            >
              {percent}%
            </span>
          </div>
        </div>

        <motion.p
          key={getStatusText(percent)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[16px] font-semibold text-slate-700 h-8"
        >
          {getStatusText(percent)}
        </motion.p>
      </main>
    </div>
  );
}

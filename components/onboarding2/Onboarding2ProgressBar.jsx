'use client';

import React from 'react';
import ProgressBar from '@/components/ProgressBar';
import { useOnboarding2 } from '@/context/Onboarding2Context';

export default function Onboarding2ProgressBar({ currentStep, totalSteps = 10, progress }) {
  const { currentTheme } = useOnboarding2();
  const pct = progress !== undefined ? progress : Math.min(100, Math.max(5, (currentStep / totalSteps) * 100));

  return (
    <div className="w-full max-w-[450px] px-5 mb-0">
      <ProgressBar
        progress={pct}
        customColor={currentTheme?.hex || '#F9C700'}
        customBg="#E5E7EB"
      />
    </div>
  );
}

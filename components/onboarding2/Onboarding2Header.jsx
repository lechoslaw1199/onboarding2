'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding2 } from '@/context/Onboarding2Context';
import ProgressBar from '@/components/ProgressBar';

export default function Onboarding2Header({ showBack = true, onClose = null, progress, progressOnly = false }) {
  const router = useRouter();
  const { updateDirection, currentTheme } = useOnboarding2();

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const themeHex = currentTheme?.hex || '#F9C700';

  if (progressOnly) {
    return (
      <header className="w-full max-w-[480px] flex flex-col items-center pt-6 pb-2 px-6 shrink-0">
        {progress !== undefined && (
          <ProgressBar
            progress={progress}
            customColor={themeHex}
            customBg="#E5E7EB"
          />
        )}
      </header>
    );
  }

  return (
    <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative shrink-0">
      <div className="w-full relative flex items-center justify-center mb-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="absolute left-0 text-slate-700 flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <g>
                <path
                  d="M6.99219 12.3594C6.99219 12.625 7.09375 12.8516 7.30469 13.0547L13.3984 19.0156C13.5625 19.1875 13.7812 19.2734 14.0312 19.2734C14.5391 19.2734 14.9375 18.8828 14.9375 18.3672C14.9375 18.1172 14.8359 17.8906 14.6641 17.7188L9.17188 12.3594L14.6641 7C14.8359 6.82031 14.9375 6.59375 14.9375 6.34375C14.9375 5.83594 14.5391 5.44531 14.0312 5.44531C13.7812 5.44531 13.5625 5.53125 13.3984 5.70312L7.30469 11.6641C7.09375 11.8672 7 12.0938 6.99219 12.3594Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        )}

        <img
          src="/letterschool-logo-name.svg"
          alt="LetterSchool"
          className="h-6 object-contain"
        />

        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-0 text-slate-500 hover:text-slate-700 flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {progress !== undefined && (
        <ProgressBar
          progress={progress}
          customColor={themeHex}
          customBg="#E5E7EB"
        />
      )}
    </header>
  );
}

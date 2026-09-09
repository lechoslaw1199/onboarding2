'use client';

import React from 'react';
import { Onboarding2Provider } from '@/context/Onboarding2Context';
import ImagePreloader from '@/components/onboarding2/ImagePreloader';

export default function Onboarding2Layout({ children }) {
  return (
    <Onboarding2Provider>
      <ImagePreloader />
      <div className="w-full min-h-screen flex flex-col items-center bg-white font-gotham text-black antialiased overflow-x-hidden">
        {children}
      </div>
    </Onboarding2Provider>
  );
}

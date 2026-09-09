'use client';

import { useEffect } from 'react';

// All images used across onboarding2 pages
const PRELOAD_IMAGES = [
  '/letterschool-logo-name.svg',
  '/onboarding2/title_img.png',
  '/onboarding2/award.png',
  '/onboarding2/mom-daughter.jpg',
  '/onboarding2/zb-style.png',
  '/onboarding2/hwt-style.png',
  '/onboarding2/dn-style.png',
  '/onboarding2/i-dont-know.png',
  '/onboarding2/img_1.png',
  '/onboarding2/img_4.png',
  '/onboarding2/img_5.png',
  '/onboarding2/img_7.png',
  '/onboarding2/laurel-left.png',
  '/onboarding2/laurel-right.png',
  '/onboarding2/apple-google.png',
  '/onboarding2/reminder.gif',
  '/chalkboard.jpg',
];

export default function ImagePreloader() {
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Render nothing — purely a side-effect component
  return null;
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOnboarding2 } from '@/context/Onboarding2Context';
import Onboarding2Header from '@/components/onboarding2/Onboarding2Header';
import ParentalGateModal from '@/components/onboarding2/ParentalGateModal';

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

export default function PaywallPage() {
  const router = useRouter();
  const { direction, updateDirection, selectedPlan, setSelectedPlan, currentTheme } = useOnboarding2();
  const [showParentalGate, setShowParentalGate] = useState(false);

  const handleSubscribeClick = () => {
    setShowParentalGate(true);
  };

  const handleGateSuccess = () => {
    setShowParentalGate(false);
    const productId =
      selectedPlan === 'monthly'
        ? 'com.nonconsumable.monthly2.us'
        : 'com.nonconsumable.yearly2.us';

    alert(`Purchase:${productId}`);

    try {
      if (
        typeof window !== 'undefined' &&
        window.webkit?.messageHandlers?.callback?.postMessage
      ) {
        window.webkit.messageHandlers.callback.postMessage({
          reopen: productId,
          purchasePlan: selectedPlan,
        });
      }
    } catch (_) {}
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <Onboarding2Header />

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-16 flex flex-col items-center pt-2 text-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] leading-tight mb-6 max-w-[420px] px-4">
          {selectedPlan === 'monthly'
            ? 'Get started with a 7 day free trial on a monthly plan.'
            : 'Save up to 50% with the Annual Plan after your 7 day free trial'}
        </h1>

        {/* Review Quote Box matching reference screenshot */}
        <div className="relative w-full max-w-[420px] bg-[#fdeee0] rounded-[24px] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)] text-left mb-6">
          {/* Top-left quote mark */}
          <span
            aria-hidden="true"
            className="absolute -top-[28px] sm:-top-[34px] -left-[8px] sm:-left-[12px] font-serif text-[48px] sm:text-[64px] text-[#ffc289] leading-none select-none pointer-events-none"
          >
            “
          </span>

          {/* Bottom-right quote mark */}
          <span
            aria-hidden="true"
            className="absolute -bottom-[28px] sm:-bottom-[34px] -right-[8px] sm:-right-[12px] font-serif text-[48px] sm:text-[64px] text-[#ffc289] leading-none select-none pointer-events-none"
          >
            ”
          </span>

          {/* Highlight with 4 Stars & Title */}
          <div className="font-bold text-[16px] text-[#221750] mb-2 leading-snug flex items-center">
            <span className="inline-flex items-center gap-1 mr-2 align-middle">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 26 30"
                  className="w-4 h-4 text-[#ffc259] fill-current inline-block"
                >
                  <path d="M12.535 22.745l-5.383 2.83a1 1 0 01-1.45-1.055l1.027-5.993a1 1 0 00-.287-.885l-4.355-4.245a1 1 0 01.554-1.706l6.018-.874a1 1 0 00.753-.547l2.691-5.453a1 1 0 011.794 0l2.69 5.453a1 1 0 00.754.547l6.018.874a1 1 0 01.554 1.706l-4.355 4.245a1 1 0 00-.287.885l1.028 5.993a1 1 0 01-1.451 1.054l-5.383-2.83a1 1 0 00-.93 0z" />
                </svg>
              ))}
            </span>
            <span>Great learning support at home</span>
          </div>

          {/* Quote Body */}
          <p className="font-normal text-[15px] sm:text-[16px] text-[#333333] leading-[1.6] m-0">
            LetterSchool is fun, easy to use, and really helps my child with handwriting and reading. Whether you&apos;re homeschooling or not, it’s a great way to boost learning at home.
          </p>

          {/* Author */}
          <p className="mt-4 italic text-[14px] text-[#555555]">
            Susan H. (mom of 4yo &amp; 6yo)
          </p>
        </div>

        {/* Plans */}
        <div className="w-full max-w-[420px] flex flex-col gap-4 mb-6">
          {/* Annual Plan Card */}
          <div
            onClick={() => setSelectedPlan('annual')}
            className={`relative w-full rounded-[20px] pt-7 pb-4 px-4 text-left border-2 cursor-pointer transition-all ${
              selectedPlan === 'annual'
                ? 'border-[#221B4B] bg-white shadow-[0_8px_20px_rgba(34,27,75,0.08)]'
                : 'border-[#E6E6F0] bg-[#F9F9FF] hover:border-slate-300'
            }`}
          >
            {/* 50% Off Ribbon */}
            <div className="absolute -top-[2px] -left-[2px] -right-[2px] bg-[#221B4B] text-white text-[12px] font-extrabold py-1.5 rounded-t-[18px] text-center tracking-wider uppercase">
              50% OFF
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedPlan === 'annual'
                      ? 'border-[#221B4B] bg-[#221B4B]'
                      : 'border-[#ccc] bg-transparent'
                  }`}
                >
                  {selectedPlan === 'annual' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#221B4B]">
                    1-Year Plan
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[14px] text-slate-400 line-through">
                      $119.88
                    </span>
                    <span className="text-[15px] font-bold text-[#221B4B]">
                      $59.99
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start text-[#221B4B]">
                <span className="text-[14px] font-extrabold mt-1">$</span>
                <span className="text-[38px] font-black leading-none">4</span>
                <div className="flex flex-col ml-0.5 mt-0.5">
                  <span className="text-[14px] font-black leading-none">99</span>
                  <span className="text-[9px] text-slate-400 font-semibold leading-tight mt-0.5">
                    per month
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Plan Card */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`relative w-full rounded-[20px] p-4 text-left border-2 cursor-pointer transition-all ${
              selectedPlan === 'monthly'
                ? 'border-[#221B4B] bg-white shadow-[0_8px_20px_rgba(34,27,75,0.08)]'
                : 'border-[#E6E6F0] bg-[#F9F9FF] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedPlan === 'monthly'
                      ? 'border-[#221B4B] bg-[#221B4B]'
                      : 'border-[#ccc] bg-transparent'
                  }`}
                >
                  {selectedPlan === 'monthly' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#221B4B]">
                    1-Month Plan
                  </h3>
                  <span className="text-[15px] font-bold text-[#221B4B]">
                    $9.99
                  </span>
                </div>
              </div>

              <div className="flex items-start text-[#221B4B]">
                <span className="text-[14px] font-extrabold mt-1">$</span>
                <span className="text-[38px] font-black leading-none">9</span>
                <div className="flex flex-col ml-0.5 mt-0.5">
                  <span className="text-[14px] font-black leading-none">99</span>
                  <span className="text-[9px] text-slate-400 font-semibold leading-tight mt-0.5">
                    per month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Footer */}
        <div className="w-full max-w-[420px] flex flex-col items-center pt-2">
          <p className="text-[13px] text-slate-700 mb-3 text-center">
            Cancel anytime in the App Store
          </p>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribeClick}
            style={{ backgroundColor: currentTheme?.hex || '#F9C700' }}
            className="w-full h-14 text-white rounded-full text-[18px] font-bold transition-all shadow-md mb-3 hover:brightness-95"
          >
            Start Free Trial!
          </motion.button>

          <p className="text-[15px] font-semibold text-slate-600 mb-3 text-center">
            {selectedPlan === 'monthly'
              ? '7 days free, then $9.99 per month'
              : '7 days free, then $59.99 per year'}
          </p>

          <p className="text-[12px] text-zinc-800 leading-relaxed text-center max-w-[420px]">
            After your 7 day free trial, you will be charged according to the selected plan. Your monthly or annual subscription automatically renews for the same terms. Cancel at least 24 hours before your free trial ends to avoid being charged. By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </motion.main>

      <ParentalGateModal
        isOpen={showParentalGate}
        onClose={() => setShowParentalGate(false)}
        onSuccess={handleGateSuccess}
        currentTheme={currentTheme}
      />
    </div>
  );
}

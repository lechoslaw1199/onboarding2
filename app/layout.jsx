import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { OnboardingProvider } from "@/context/OnboardingContext";
import "./globals.css";

const gothamRounded = localFont({
  src: [
    {
      path: "./fonts/GothamRounded-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GothamRounded-Light.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GothamRounded-Light.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GothamRounded-Medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GothamRounded-Medium.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GothamRounded-Bold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/GothamRounded-Bold.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
  display: "swap",
});

export const metadata = {
  title: "LetterSchool | Teach Your Child To Write and Spell!",
  description: "LetterSchool is the #1 alphabet tracing and words spelling app for toddlers and pre-schoolers. Recommended by parents, teachers, and occupational therapists.",
  icons: {
    icon: "/letterschool-logo-only.svg",
  },
};

import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gothamRounded.variable} font-gotham antialiased overflow-x-hidden`}>
        <OnboardingProvider>
          <BackgroundWrapper>
            {children}
          </BackgroundWrapper>
        </OnboardingProvider>
        <Analytics />
      </body>
    </html>
  );
}

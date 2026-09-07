'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const Onboarding2Context = createContext();

const STORAGE_KEY = 'onboarding2_data';

export const LEVEL_LABELS = ["Toddler", "Preschool", "Pre-K", "Early Learner", "Growing Learner"];

export const LEARNING_OUTCOMES = [
  [
    "✍ Handwriting – Starts tracing lines, shapes, and simple letters.",
    "📚 Reading – Begins to recognize letters.",
    "🔊 Phonics – Listens to sounds and connects them to letters."
  ],
  [
    "✍ Handwriting – Traces and copies letters with growing control.",
    "📚 Reading – Starts recognizing their name and familiar words.",
    "🔊 Phonics – Matches letters to sounds and blends simple ones."
  ],
  [
    "✍ Handwriting – Writes letters with correct form and strokes.",
    "📚 Reading – Can read and spell simple words like “cat” and “dog.”",
    "🔊 Phonics – Uses sounds to figure out new words."
  ],
  [
    "✍ Handwriting – From block letters to beautiful cursive.",
    "📚 Reading – Reads short sentences and beginner books more independently.",
    "🔊 Phonics – Applies phonics rules to read new words."
  ],
  [
    "✍ Handwriting – From block letters to beautiful cursive.",
    "📚 Reading – Reads simple stories smoothly and with confidence.",
    "🔊 Phonics – Handles tricky sound patterns with ease."
  ],
];

export const REVIEWS = {
  "I’m homeschooling my child": {
    name: "Avery M.",
    highlight: "★★★★★ Perfect for homeschoolers",
    quote: "As a homeschooling parent, I’m always looking for tools that are both educational and engaging. LetterSchool has been a fantastic addition to our daily routine. It makes learning letters and phonics fun through games and animations. I love how the app breaks things down step by step, and my child actually looks forward to handwriting practice now!"
  },
  "I want to give my child a head start": {
    name: "Nina S.",
    highlight: "★★★★★ A great start",
    quote: "My son is starting school next year, and I wanted to make sure he was confident with letters and basic reading skills. LetterSchool has been a game-changer! Within a few weeks, he started recognizing letters and even writing them on his own. I feel much more confident sending him to school now."
  },
  "My child is a struggling reader": {
    name: "Simone R.",
    highlight: "★★★★★ Frustration into progress",
    quote: "My daughter has always had trouble with reading and letter recognition, and traditional methods weren’t working. A friend recommended LetterSchool, and I’m so glad we tried it. The visual and tactile approach really clicked with her. She’s finally gaining confidence and even reads simple words out loud."
  },
  "I’m worried my child won’t be taught adequately at school": {
    name: "Maria D.",
    highlight: "★★★★★ A safety net for learning gaps",
    quote: "With larger class sizes and limited attention in schools, I was worried my child wouldn’t get the support he needs. LetterSchool has been a reassuring supplement at home. It reinforces what he learns at school, and in some cases, even teaches it better. It’s a great way to stay involved without pressure."
  },
  "Something else": {
    name: "Susan H.",
    highlight: "★★★★★ Great learning support",
    quote: "LetterSchool is fun, easy to use, and really helps my child with handwriting and reading. Whether you're homeschooling or not, it’s a great way to boost learning at home."
  }
};

export function getReviewForReason(reason) {
  if (!reason) return REVIEWS["I’m homeschooling my child"];
  if (REVIEWS[reason]) return REVIEWS[reason];
  const clean = reason.replace(/['’]/g, '');
  for (const [key, val] of Object.entries(REVIEWS)) {
    if (key.replace(/['’]/g, '') === clean) return val;
  }
  return REVIEWS["Something else"] || REVIEWS["I’m homeschooling my child"];
}

export const THEME_CONFIG = {
  yellow: {
    id: 'yellow',
    label: 'Yellow',
    hex: '#F9C700',
    hoverHex: '#E5B700',
    pastelBg: '#FEEBA3',
    bgClass: 'bg-[#F9C700]',
    textClass: 'text-[#F9C700]',
    borderClass: 'border-[#F9C700]',
  },
  primary: {
    id: 'primary',
    label: 'Blue',
    hex: '#099FF9',
    hoverHex: '#0088EE',
    pastelBg: '#D2EEFD',
    bgClass: 'bg-[#099FF9]',
    textClass: 'text-[#099FF9]',
    borderClass: 'border-[#099FF9]',
  },
  green: {
    id: 'green',
    label: 'Green',
    hex: '#09BD00',
    hoverHex: '#079A00',
    pastelBg: '#D4F4D6',
    bgClass: 'bg-[#09BD00]',
    textClass: 'text-[#09BD00]',
    borderClass: 'border-[#09BD00]',
  },
  red: {
    id: 'red',
    label: 'Red',
    hex: '#FF1800',
    hoverHex: '#E01500',
    pastelBg: '#FED7D2',
    bgClass: 'bg-[#FF1800]',
    textClass: 'text-[#FF1800]',
    borderClass: 'border-[#FF1800]',
  },
  pink: {
    id: 'pink',
    label: 'Pink',
    hex: '#E965D3',
    hoverHex: '#D44FBE',
    pastelBg: '#F8D8F3',
    bgClass: 'bg-[#E965D3]',
    textClass: 'text-[#E965D3]',
    borderClass: 'border-[#E965D3]',
  },
  purple: {
    id: 'purple',
    label: 'Purple',
    hex: '#A65FEE',
    hoverHex: '#8F52CC',
    pastelBg: '#ECE2FE',
    bgClass: 'bg-[#A65FEE]',
    textClass: 'text-[#A65FEE]',
    borderClass: 'border-[#A65FEE]',
  },
};

export const COLOR_OPTIONS = Object.values(THEME_CONFIG);

function scoreFromAnswer(aRaw) {
  const a = String(aRaw || '').trim().toLowerCase();
  if (!a) return 0;
  if (["yes", "all"].includes(a)) return 2;
  if (["maybe", "some"].includes(a)) return 1;
  return 0;
}

function isDontKnow(aRaw) {
  const a = String(aRaw || '').trim().toLowerCase();
  return a === "i don't know" || a === "i dont know" || a === "idk";
}

function isMaybe(aRaw) {
  const a = String(aRaw || '').trim().toLowerCase();
  return a === "maybe" || a === "some";
}

function domainLevelFromScore(s) {
  if (s <= 2) return 0;
  if (s <= 4) return 1;
  if (s <= 6) return 2;
  if (s <= 8) return 3;
  return 4;
}

function priorFromAge(ageNum) {
  if (ageNum <= 2) return 0;
  if (ageNum === 3) return 1;
  if (ageNum === 4) return 2;
  if (ageNum <= 6) return 3;
  return 4;
}

export function computeLearningLevel(ageStr, hwAnswers = [], rpAnswers = [], readingReason = "") {
  const ageNum = parseInt(String(ageStr || '0').replace(/[^0-9]/g, ''), 10) || 0;

  const hwList = Array.isArray(hwAnswers) ? hwAnswers : [];
  const rpList = Array.isArray(rpAnswers) ? rpAnswers : [];

  const hwScores = hwList.map(scoreFromAnswer);
  const rpScores = rpList.map(scoreFromAnswer);

  const hwRaw = hwScores.reduce((s, v) => s + v, 0); // max 10
  const rpRaw = rpScores.reduce((s, v) => s + v, 0); // max 10

  const HW_level = domainLevelFromScore(hwRaw);
  const RP_level = domainLevelFromScore(rpRaw);

  const totalHwAnswered = hwList.filter(a => a !== null && a !== undefined && a !== '').length;
  const totalRpAnswered = rpList.filter(a => a !== null && a !== undefined && a !== '').length;
  const hasAssessmentData = totalHwAnswered > 0 || totalRpAnswered > 0;

  const rawAssessment = (0.6 * RP_level) + (0.4 * HW_level);

  const prior = priorFromAge(ageNum);

  let combined;
  if (!hasAssessmentData) {
    combined = ageNum > 0 ? prior : 3;
  } else if (ageNum > 0) {
    combined = (0.75 * rawAssessment) + (0.25 * prior);
  } else {
    combined = rawAssessment;
  }

  const cleanReason = String(readingReason || '').toLowerCase();
  if (cleanReason.includes('struggling')) {
    combined -= 0.3; // Give struggling children a gentler, confidence-building start
  } else if (cleanReason.includes('head start')) {
    combined += 0.15;
  }

  if (hwRaw >= 9 && rpRaw >= 9) {
    combined = Math.max(combined, 3.8); // Qualifies for Growing Learner
  } else if (hwRaw >= 7 && rpRaw >= 7 && ageNum >= 4) {
    combined = Math.max(combined, 2.7); // At least Early Learner
  }

  if (hwRaw <= 2 && rpRaw <= 2) {
    if (ageNum <= 3) {
      combined = Math.min(combined, 0.4); // Toddler
    } else {
      combined = Math.min(combined, 1.2); // Preschool
    }
  }

  const dontKnowCount = [...hwList, ...rpList].filter(isDontKnow).length;
  const maybeCount = [...hwList, ...rpList].filter(isMaybe).length;

  let confidence = 1.0 - dontKnowCount * 0.10 - maybeCount * 0.05;
  confidence = Math.max(0.5, Math.min(1.0, confidence));

  if (dontKnowCount >= 3) {
    combined = Math.max(0, combined - 0.5);
  }

  const levelIndex = Math.max(0, Math.min(4, Math.round(combined)));

  return {
    levelIndex,
    levelName: LEVEL_LABELS[levelIndex],
    HW_level,
    RP_level,
    hwRaw,
    rpRaw,
    prior,
    age: ageNum,
    confidence,
    combinedScore: combined,
  };
}

export function Onboarding2Provider({ children }) {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState(null);
  const [themeColor, setThemeColor] = useState(null);
  const [teacherRecommended, setTeacherRecommended] = useState(null);
  const [readingReason, setReadingReason] = useState(null);
  const [handwritingStyle, setHandwritingStyle] = useState(null);
  const [handwritingAnswers, setHandwritingAnswers] = useState(Array(5).fill(null));
  const [readingAnswers, setReadingAnswers] = useState(Array(5).fill(null));
  const [calculatedLevel, setCalculatedLevel] = useState(null);
  const [trialReminderEmail, setTrialReminderEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [direction, setDirection] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const activeCalculatedLevel = useMemo(() => {
    return computeLearningLevel(childAge, handwritingAnswers, readingAnswers, readingReason);
  }, [childAge, handwritingAnswers, readingAnswers, readingReason]);

  const effectiveCalculatedLevel = calculatedLevel || activeCalculatedLevel;

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.childName) setChildName(data.childName);
        if (data.childAge) setChildAge(data.childAge);
        if (data.themeColor) setThemeColor(data.themeColor);
        if (data.teacherRecommended) setTeacherRecommended(data.teacherRecommended);
        if (data.readingReason) setReadingReason(data.readingReason);
        if (data.handwritingStyle) setHandwritingStyle(data.handwritingStyle);
        if (data.handwritingAnswers) setHandwritingAnswers(data.handwritingAnswers);
        if (data.readingAnswers) setReadingAnswers(data.readingAnswers);
        if (data.calculatedLevel) setCalculatedLevel(data.calculatedLevel);
        if (data.trialReminderEmail) setTrialReminderEmail(data.trialReminderEmail);
        if (data.selectedPlan) setSelectedPlan(data.selectedPlan);
      }
      const directTheme = localStorage.getItem('themeColor');
      if (directTheme && THEME_CONFIG[directTheme]) {
        setThemeColor(directTheme);
      }
      const directAge = localStorage.getItem('childAge');
      if (directAge) setChildAge(directAge);
      const directLevel = localStorage.getItem('calculatedLevel');
      if (directLevel) {
        try {
          setCalculatedLevel(JSON.parse(directLevel));
        } catch (_) {}
      }
    } catch (e) {
      console.error("Failed to load onboarding2 data from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      const dataToSave = {
        childName,
        childAge,
        themeColor,
        teacherRecommended,
        readingReason,
        handwritingStyle,
        handwritingAnswers,
        readingAnswers,
        calculatedLevel: effectiveCalculatedLevel,
        trialReminderEmail,
        selectedPlan,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      if (childName) {
        localStorage.setItem('childName', childName);
      }
      if (childAge) {
        localStorage.setItem('childAge', childAge);
      }
      if (effectiveCalculatedLevel) {
        localStorage.setItem('calculatedLevel', JSON.stringify(effectiveCalculatedLevel));
      }
    } catch (e) {
      console.error("Failed to save onboarding2 data to localStorage", e);
    }
  }, [
    childName,
    childAge,
    themeColor,
    teacherRecommended,
    readingReason,
    handwritingStyle,
    handwritingAnswers,
    readingAnswers,
    effectiveCalculatedLevel,
    trialReminderEmail,
    selectedPlan,
    isInitialized,
  ]);

  const updateDirection = (newDir) => setDirection(newDir);

  const formattedChildName = childName
    ? childName.charAt(0).toUpperCase() + childName.slice(1)
    : "Your child";

  const firstLetter = childName
    ? childName.charAt(0).toUpperCase()
    : "A";

  const currentTheme = (themeColor && THEME_CONFIG[themeColor]) || THEME_CONFIG.primary;

  return (
    <Onboarding2Context.Provider
      value={{
        childName,
        setChildName,
        formattedChildName,
        firstLetter,
        childAge,
        setChildAge,
        themeColor,
        setThemeColor,
        currentTheme,
        THEME_CONFIG,
        teacherRecommended,
        setTeacherRecommended,
        readingReason,
        setReadingReason,
        handwritingStyle,
        setHandwritingStyle,
        handwritingAnswers,
        setHandwritingAnswers,
        readingAnswers,
        setReadingAnswers,
        calculatedLevel: effectiveCalculatedLevel,
        setCalculatedLevel,
        trialReminderEmail,
        setTrialReminderEmail,
        selectedPlan,
        setSelectedPlan,
        direction,
        updateDirection,
        computeLearningLevel,
      }}
    >
      {children}
    </Onboarding2Context.Provider>
  );
}

export const useOnboarding2 = () => useContext(Onboarding2Context);

'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext();

const STORAGE_KEY = 'reading_onboarding_data';

export function OnboardingProvider({ children }) {
  // Core states
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [schoolMethod, setSchoolMethod] = useState(null);
  const [learningDifference, setLearningDifference] = useState(null);
  const [homeChallenge, setHomeChallenge] = useState(null);
  const [childGender, setChildGender] = useState(null);
  const [childName, setChildName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [referralSource, setReferralSource] = useState(null);
  const [readingStage, setReadingStage] = useState(null);
  const [screenPreference, setScreenPreference] = useState(null);
  const [supportHistory, setSupportHistory] = useState([]);
  const [engagementFactors, setEngagementFactors] = useState([]);
  const [focusDuration, setFocusDuration] = useState(null);
  const [lessonsPerWeek, setLessonsPerWeek] = useState(null);
  const [parentFeelings, setParentFeelings] = useState([]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        
        // 10-minute TTL check (10 * 60 * 1000 ms)
        const tenMinutes = 10 * 60 * 1000;
        const now = Date.now();
        
        if (data.timestamp && (now - data.timestamp > tenMinutes)) {
          console.log("Onboarding data expired. Clearing storage.");
          localStorage.removeItem(STORAGE_KEY);
          // Also clear individual keys used by static pages if any
          localStorage.removeItem('onboarding_childName'); 
        } else {
          if (data.selectedAge) setSelectedAge(data.selectedAge);
          if (data.selectedReason) setSelectedReason(data.selectedReason);
          if (data.selectedStatus) setSelectedStatus(data.selectedStatus);
          if (data.schoolMethod) setSchoolMethod(data.schoolMethod);
          if (data.learningDifference) setLearningDifference(data.learningDifference);
          if (data.homeChallenge) setHomeChallenge(data.homeChallenge);
          if (data.childGender) setChildGender(data.childGender);
          if (data.childName) setChildName(data.childName);
          if (data.parentEmail) setParentEmail(data.parentEmail);
          if (data.referralSource) setReferralSource(data.referralSource);
          if (data.readingStage) setReadingStage(data.readingStage);
          if (data.screenPreference) setScreenPreference(data.screenPreference);
          if (data.supportHistory) setSupportHistory(data.supportHistory);
          if (data.engagementFactors) setEngagementFactors(data.engagementFactors);
          if (data.focusDuration) setFocusDuration(data.focusDuration);
          if (data.lessonsPerWeek) setLessonsPerWeek(data.lessonsPerWeek);
          if (data.parentFeelings) setParentFeelings(data.parentFeelings);
        }
      } catch (e) {
        console.error("Failed to parse onboarding data from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;

    const dataToSave = {
      timestamp: Date.now(), // Add TTL timestamp
      selectedAge,
      selectedReason,
      selectedStatus,
      schoolMethod,
      learningDifference,
      homeChallenge,
      childGender,
      childName,
      parentEmail,
      referralSource,
      readingStage,
      screenPreference,
      supportHistory,
      engagementFactors,
      focusDuration,
      lessonsPerWeek,
      parentFeelings
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    
    // Also sync the separate key used by static checkout.html
    if (childName) {
      localStorage.setItem('onboarding_childName', childName);
    }
  }, [
    selectedAge, selectedReason, selectedStatus, schoolMethod, 
    learningDifference, homeChallenge, childGender, 
    childName, parentEmail, referralSource,
    readingStage, isInitialized, screenPreference, supportHistory, engagementFactors, focusDuration, lessonsPerWeek, parentFeelings
  ]);

  const updateDirection = (newDirection) => setDirection(newDirection);

  return (
    <OnboardingContext.Provider value={{ 
      selectedAge, 
      setSelectedAge,
      selectedReason,
      setSelectedReason,
      selectedStatus,
      setSelectedStatus,
      schoolMethod,
      setSchoolMethod,
      learningDifference,
      setLearningDifference,
      homeChallenge,
      setHomeChallenge,
      childGender,
      setChildGender,
      childName,
      setChildName,
      parentEmail,
      setParentEmail,
      referralSource,
      setReferralSource,
      readingStage,
      setReadingStage,
      screenPreference,
      setScreenPreference,
      supportHistory,
      setSupportHistory,
      engagementFactors,
      setEngagementFactors,
      focusDuration,
      setFocusDuration,
      lessonsPerWeek,
      setLessonsPerWeek,
      parentFeelings,
      setParentFeelings,
      direction, 
      updateDirection 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);

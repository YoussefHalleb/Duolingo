// context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // initialize from localStorage (or default to 'english')
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return typeof window !== 'undefined'
      ? localStorage.getItem('selectedLanguage') || 'english'
      : 'english';
  });

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem('selectedLanguage', selectedLanguage);
    } catch (err) {
      console.warn('Could not persist language:', err);
    }
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}

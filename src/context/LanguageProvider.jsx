// src/context/LanguageProvider.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('french');

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

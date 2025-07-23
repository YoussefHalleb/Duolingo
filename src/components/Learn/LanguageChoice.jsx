import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../shared/layout';
import './Learn.css';

const LanguageChoice = () => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const navigate = useNavigate();

  const languages = {
    english: { nativeName: 'English', name: 'English', flagIcon: '/flags/royaume-uni.png' },
    french: { nativeName: 'Français', name: 'French', flagIcon: '/flags/la-france.png' },
    spanish: { nativeName: 'Español', name: 'Spanish', flagIcon: '/flags/monde.png' },
    german: { nativeName: 'Deutsch', name: 'German', flagIcon: '/flags/allemagne.png' },
    italian: { nativeName: 'Italiano', name: 'Italian', flagIcon: '/flags/italie.png' },
    portuguese: { nativeName: 'Português', name: 'Portuguese', flagIcon: '/flags/le-portugal.png' },
    dutch: { nativeName: 'Nederlands', name: 'Dutch', flagIcon: '/flags/pays-bas.png' },
    russian: { nativeName: 'Русский', name: 'Russian', flagIcon: '/flags/rusia.png' },
    japanese: { nativeName: '日本語', name: 'Japanese', flagIcon: '/flags/japon.png' },
    chinese: { nativeName: '中文', name: 'Chinese', flagIcon: '/flags/chine.png' },
    korean: { nativeName: '한국어', name: 'Korean', flagIcon: '/flags/coree-du-sud.png' },
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(languages[lang].name);
    navigate('/learn/categories');
  };

  return (
    <Layout>
      <div className="learn-container">
        <div className="learn-header">
          <h1 className="learn-title">Choose Your Language</h1>
          <p className="learn-subtitle">Select the language you want to learn and start your journey!</p>
        </div>
        <div className="lesson-list">
          {Object.entries(languages).map(([lang, langInfo]) => (
            <div
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`
                lesson-card cursor-pointer
                ${selectedLanguage === langInfo.name ? 'border-2 border-cyan-600' : 'border border-gray-300'}
              `}
            >
              <div className="lesson-card-image">
                <img
                  src={langInfo.flagIcon}
                  alt={`${langInfo.name} flag`}
                  className="lesson-card-image img"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="lesson-card-title">{langInfo.nativeName}</h3>
                <p className="lesson-card-summary">{langInfo.name}</p>
              </div>
              {selectedLanguage === langInfo.name && (
                <div className="text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LanguageChoice;
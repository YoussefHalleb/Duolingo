import { useState, useRef, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { languageData } from '../../data/languageData';
import { useLanguage } from '../../context/LanguageContext';

const PronunciationHome = () => {
  const { selectedLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('greetings');
  const [speed, setSpeed] = useState(1);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const loadVoices = () => {
      const voices = synthRef.current.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const categories = {
    greetings: "Greetings",
    introductions: "Introductions",
    common: "Common Phrases",
    directions: "Directions",
    food: "Food & Dining"
  };

  const currentPhrases = languageData[selectedLanguage]?.categories[selectedCategory] || [];

  const getLangCode = (language) => {
    const langCodes = {
      french: 'fr-FR',
      english: 'en-US',
      spanish: 'es-ES',
      german: 'de-DE',
      italian: 'it-IT',
      portuguese: 'pt-PT',
      dutch: 'nl-NL',
      russian: 'ru-RU',
      japanese: 'ja-JP',
      chinese: 'zh-CN',
      korean: 'ko-KR'
    };
    return langCodes[language] || 'en-US';
  };

  const getRomanized = (translation) => {
    const match = translation.match(/\((.*?)\)/);
    return match ? match[1] : null;
  };

  const handleSpeak = async (text, translation, index) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setPlayingIndex(null);
      return;
    }

    setPlayingIndex(index);
    const langCode = getLangCode(selectedLanguage);
    const romanized = getRomanized(translation);

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = speed;

      // Find appropriate voice
      const voice = availableVoices.find(v => 
        v.lang.startsWith(langCode.split('-')[0]) && !v.name.includes('Google')
      ) || availableVoices.find(v => 
        v.lang.startsWith(langCode.split('-')[0])
      );

      if (voice) {
        utterance.voice = voice;
        utterance.onend = () => setPlayingIndex(null);
        utterance.onerror = () => {
          setPlayingIndex(null);
          // Fallback to romanized version for specific languages
          if (['russian', 'japanese', 'chinese', 'korean'].includes(selectedLanguage) && romanized) {
            const fallbackUtterance = new SpeechSynthesisUtterance(romanized);
            fallbackUtterance.lang = 'en-US';
            fallbackUtterance.rate = speed;
            fallbackUtterance.onend = () => setPlayingIndex(null);
            synthRef.current.speak(fallbackUtterance);
          }
        };
        synthRef.current.speak(utterance);
      } else if (['russian', 'japanese', 'chinese', 'korean'].includes(selectedLanguage) && romanized) {
        // No appropriate voice found, try romanized version
        const fallbackUtterance = new SpeechSynthesisUtterance(romanized);
        fallbackUtterance.lang = 'en-US';
        fallbackUtterance.rate = speed;
        fallbackUtterance.onend = () => setPlayingIndex(null);
        synthRef.current.speak(fallbackUtterance);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setPlayingIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Pronunciation Practice</h1>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="form-select rounded border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 
                  ${selectedCategory === key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Phrases</h2>
          {currentPhrases.map((phrase, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <p className="text-lg font-medium">{phrase.text}</p>
                  <p className="text-gray-600">{phrase.translation}</p>
                </div>
                <button
                  onClick={() => handleSpeak(phrase.text, phrase.translation, index)}
                  className={`ml-4 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${playingIndex === index
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {playingIndex === index ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15 10l-6 4 6 4V10z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PronunciationHome;

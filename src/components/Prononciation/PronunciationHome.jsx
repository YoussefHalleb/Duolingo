import { useState, useRef, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { languageData } from '../../data/languageData';
import { useLanguage } from '../../context/LanguageContext';
import './PronunciationHome.css';

const PronunciationHome = () => {
  const { selectedLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('text-to-speech');
  const [selectedCategory, setSelectedCategory] = useState('greetings');
  const [customText, setCustomText] = useState('');
  const [speed, setSpeed] = useState(1);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [testMode, setTestMode] = useState(false);
  const [testType, setTestType] = useState(null);
  const [currentTest, setCurrentTest] = useState(null);
  const [testScore, setTestScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [testFeedback, setTestFeedback] = useState(null);
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

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = getLangCode(selectedLanguage);

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
      if (recognition) {
        recognition.stop();
      }
    };
  }, [selectedLanguage, recognition]);

  const categories = {
    custom: "Custom Text",
    greetings: "Greetings",
    introductions: "Introductions",
    common: "Common Phrases",
    directions: "Directions",
    food: "Food & Dining"
  };

  const currentPhrases = selectedCategory === 'custom' ? [] : (languageData[selectedLanguage]?.categories[selectedCategory] || []);

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

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  const getMixedQuestions = () => {
    // Get phrases from all categories except custom
    const allPhrases = Object.entries(categories)
      .filter(([key]) => key !== 'custom')
      .reduce((acc, [category]) => {
        const categoryPhrases = languageData[selectedLanguage]?.categories[category] || [];
        return [...acc, ...categoryPhrases.map(phrase => ({
          ...phrase,
          category
        }))];
      }, []);

    // Shuffle and select 10 phrases or all if less than 10
    const shuffled = [...allPhrases].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  };

  const [testStats, setTestStats] = useState({
    correctAnswers: 0,
    totalTime: 0,
    categoryScores: {},
    mistakes: []
  });

  const startTest = (type) => {
    setTestMode(true);
    setTestType(type);
    setTestScore(0);
    setCurrentQuestion(0);
    setUserInput('');
    setTestFeedback(null);
    setTestStats({
      correctAnswers: 0,
      totalTime: 0,
      categoryScores: {},
      mistakes: [],
      startTime: Date.now()
    });

    const testQuestions = selectedCategory === 'custom'
      ? [{ text: customText, translation: '', category: 'custom' }]
      : getMixedQuestions();

    setTotalQuestions(testQuestions.length);
    setCurrentTest(testQuestions);

    if (type === 'text-to-speech') {
      // System speaks, user types
      handleSpeak(testQuestions[0].text, testQuestions[0].translation, 0);
    }
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[.,!?;:'"]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim(); // Remove leading/trailing spaces
  };

  const calculateSimilarity = (str1, str2) => {
    const words1 = normalizeText(str1).split(' ');
    const words2 = normalizeText(str2).split(' ');
    let matchedWords = 0;

    words1.forEach(word => {
      if (words2.includes(word)) {
        matchedWords++;
      }
    });

    return matchedWords / Math.max(words1.length, words2.length);
  };

  const checkAnswer = () => {
    if (!currentTest || currentQuestion >= currentTest.length) return;

    const currentPhrase = currentTest[currentQuestion];
    const userAnswer = testType === 'text-to-speech' ? userInput : transcript;
    
    // Normalize both strings
    const normalizedCorrect = normalizeText(currentPhrase.text);
    const normalizedUser = normalizeText(userAnswer);
    
    // Calculate similarity score (0 to 1)
    const similarity = calculateSimilarity(normalizedCorrect, normalizedUser);
    
    // Define scoring thresholds
    const perfectMatch = similarity === 1;
    const closeMatch = similarity >= 0.8;
    const partialMatch = similarity >= 0.6;
    
    let points = 0;
    let feedback = '';

    if (perfectMatch) {
      points = 1;
      feedback = 'Perfect! Well done! 🌟';
    } else if (closeMatch) {
      points = 0.8;
      feedback = 'Very close! Almost perfect! ⭐';
    } else if (partialMatch) {
      points = 0.5;
      feedback = 'Good try! Keep practicing! 👍';
    } else {
      points = 0;
      feedback = `Not quite. The correct answer was: ${currentPhrase.text}`;
    }

    // Update the isCorrect status for statistics
    const isCorrect = points > 0;

    // Update scores and statistics
    setTestScore(prev => prev + points);

    setTestStats(prev => {
      const categoryScores = { ...prev.categoryScores };
      if (!categoryScores[currentPhrase.category]) {
        categoryScores[currentPhrase.category] = { points: 0, total: 0, attempts: 0 };
      }
      categoryScores[currentPhrase.category].total++;
      categoryScores[currentPhrase.category].points += points;
      categoryScores[currentPhrase.category].attempts++;

      return {
        ...prev,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        categoryScores,
        mistakes: isCorrect ? prev.mistakes : [
          ...prev.mistakes,
          {
            phrase: currentPhrase.text,
            userAnswer,
            category: currentPhrase.category
          }
        ]
      };
    });

    setTestFeedback(feedback);

    // Move to next question or end test
    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setUserInput('');
        setTranscript('');
        setTestFeedback(null);
        
        if (testType === 'text-to-speech') {
          handleSpeak(currentTest[currentQuestion + 1].text, currentTest[currentQuestion + 1].translation, currentQuestion + 1);
        }
      }, 2000);
    } else {
      // Test completed
      const endTime = Date.now();
      setTestStats(prev => ({
        ...prev,
        totalTime: Math.round((endTime - prev.startTime) / 1000) // Convert to seconds
      }));
      
      // Don't immediately close the test, show results instead
      setTimeout(() => {
        setTestFeedback('test-complete');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12 slide-down">
          <div className="relative inline-block">
            <h1 className="text-4xl font-bold mb-3 text-emerald-800 animate-fade-in relative z-10">
              Pronunciation Practice
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-emerald-200 transform -skew-x-12"></div>
            </h1>
          </div>
          <p className="text-emerald-600 text-lg max-w-2xl mx-auto mt-6 fade-in-up">
            Master the pronunciation of {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} phrases
          </p>
          <img 
            src="/pics/microphone.png" 
            alt="Pronunciation Practice"
            className="w-24 h-24 mx-auto mt-6 bounce-subtle"
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 slide-up">
          <div className="flex justify-center mb-8 gap-4">
            <button
              onClick={() => {
                setActiveTab('text-to-speech');
                setTestMode(false);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                ${activeTab === 'text-to-speech' && !testMode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200'
                }`}
            >
              Text to Speech
            </button>
            <button
              onClick={() => {
                setActiveTab('speech-to-text');
                setTestMode(false);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                ${activeTab === 'speech-to-text' && !testMode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200'
                }`}
            >
              Speech to Text
            </button>
            <button
              onClick={() => {
                setTestMode(true);
                setActiveTab('test');
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                ${testMode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200'
                }`}
            >
              Practice Test
            </button>
          </div>

          {activeTab === 'text-to-speech' ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold text-emerald-800">Categories</h2>
                  <div className="w-8 h-8 animate-spin-slow">
                    <img src="/pics/quiz.png" alt="Categories" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-lg shadow-inner">
                  <span className="text-emerald-700 font-medium">Playback Speed:</span>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="form-select rounded-lg border-2 border-emerald-200 text-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white py-2 px-3 transition-all duration-200"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {Object.entries(categories).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 category-button
                      ${selectedCategory === key
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:from-emerald-600 hover:to-teal-600'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200'
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="space-y-6 fade-in">
                {selectedCategory === 'custom' ? (
                  <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-sm border border-emerald-100 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-2xl font-semibold text-emerald-800">Enter Custom Text</h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent"></div>
                    </div>
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full h-32 p-4 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-200 resize-none"
                      placeholder="Type any text you want to practice..."
                    />
                    <button
                      onClick={() => handleSpeak(customText, '', -1)}
                      disabled={!customText.trim()}
                      className="mt-4 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:from-emerald-600 hover:to-teal-600"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        Speak Text
                      </div>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-2xl font-semibold text-emerald-800">Practice Phrases</h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent"></div>
                    </div>
                    <div className="grid gap-6">
                      {currentPhrases.map((phrase, index) => (
                        <div
                          key={index}
                          className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100 transform hover:-translate-y-1 phrase-card"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-3 flex-grow">
                              <p className="text-xl font-medium text-emerald-800">{phrase.text}</p>
                              <p className="text-emerald-600 text-lg">{phrase.translation}</p>
                            </div>
                            <button
                              onClick={() => handleSpeak(phrase.text, phrase.translation, index)}
                              className={`ml-4 p-4 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:rotate-12
                                ${playingIndex === index
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:ring-green-500'
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:ring-emerald-500'
                                }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 text-white transition-transform duration-300
                                  ${playingIndex === index ? 'animate-wave' : 'transform hover:scale-110'}`}
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
                                    className="animate-wave"
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
                  </>
                )}
              </div>
            </>
          ) : activeTab === 'test' ? (
            <div className="space-y-8 fade-in">
              {!testType ? (
                <div className="text-center space-y-8">
                  <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Practice Test</h2>
                  <p className="text-emerald-600 mb-8">
                    Choose a test type to practice your {selectedLanguage} skills
                  </p>
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => startTest('text-to-speech')}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-lg font-semibold mb-2">Listening Test</div>
                      <div className="text-sm opacity-90">Listen and type what you hear</div>
                    </button>
                    <button
                      onClick={() => startTest('speech-to-text')}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-lg font-semibold mb-2">Speaking Test</div>
                      <div className="text-sm opacity-90">Read and speak the text</div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-emerald-800">
                      {testType === 'text-to-speech' ? 'Listening Test' : 'Speaking Test'}
                    </h2>
                    <div className="text-emerald-600">
                      Question {currentQuestion + 1} of {totalQuestions}
                    </div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg border-2 border-emerald-100">
                    {testType === 'text-to-speech' ? (
                      <>
                        <p className="text-emerald-600 mb-4">Listen to the phrase and type what you hear:</p>
                        <div className="flex justify-center mb-6">
                          <button
                            onClick={() => currentTest && handleSpeak(currentTest[currentQuestion].text, currentTest[currentQuestion].translation, currentQuestion)}
                            className="p-6 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </button>
                        </div>
                        <textarea
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          className="w-full h-32 p-4 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-200 resize-none"
                          placeholder="Type what you hear..."
                        />
                      </>
                    ) : (
                      <>
                        <p className="text-emerald-600 mb-4">Read the following phrase:</p>
                        <div className="text-xl font-medium text-emerald-800 mb-4">
                          {currentTest?.[currentQuestion]?.text}
                        </div>
                        <div className="flex justify-center mb-6">
                          <button
                            onClick={toggleListening}
                            className={`p-6 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                              ${isListening
                                ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 animate-pulse'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                              }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-emerald-600 mb-4">
                          Your speech: {transcript}
                        </div>
                      </>
                    )}
                    
                    {testFeedback === 'test-complete' ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-emerald-800 mb-2">Test Complete!</h3>
                          <div className="text-4xl font-bold text-emerald-600">
                            Final Score: {testScore}/{totalQuestions}
                          </div>
                          <div className="text-emerald-600 mt-2">
                            Time taken: {testStats.totalTime} seconds
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-emerald-800 mb-2">Category Performance:</h4>
                            <div className="space-y-2">
                              {Object.entries(testStats.categoryScores).map(([category, scores]) => (
                                <div key={category} className="flex justify-between items-center">
                                  <span className="text-emerald-700 capitalize">{category}:</span>
                                  <span className="text-emerald-600">
                                    {scores.points.toFixed(1)}/{scores.attempts} ({Math.round((scores.points/scores.total) * 100)}%)
                                  </span>
                                  <div className="text-sm text-emerald-500">
                                    Accuracy: {Math.round((scores.points/scores.attempts) * 100)}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {testStats.mistakes.length > 0 && (
                            <div className="bg-red-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-red-800 mb-2">Areas for Improvement:</h4>
                              <div className="space-y-3">
                                {testStats.mistakes.map((mistake, index) => (
                                  <div key={index} className="text-red-700">
                                    <div className="font-medium">Expected: {mistake.phrase}</div>
                                    <div className="text-sm text-red-600">Your answer: {mistake.userAnswer}</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                      Tip: Pay attention to pronunciation and word order
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center gap-4 mt-6">
                          <button
                            onClick={() => {
                              setTestMode(false);
                              setTestType(null);
                              setCurrentTest(null);
                            }}
                            className="px-6 py-3 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all duration-300"
                          >
                            Exit Test
                          </button>
                          <button
                            onClick={() => startTest(testType)}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    ) : testFeedback ? (
                      <div className={`mt-4 p-4 rounded-lg ${
                        testFeedback.startsWith('Correct') 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {testFeedback}
                      </div>
                    ) : null}
                  </div>

                  {testFeedback !== 'test-complete' && (
                    <div className="flex justify-between items-center">
                      <div className="text-emerald-600">
                        Score: {testScore}/{totalQuestions}
                      </div>
                      <button
                        onClick={checkAnswer}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Check Answer
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Speech Recognition</h2>
                <p className="text-emerald-600 mb-8">
                  Click the microphone and speak in {selectedLanguage}. Your speech will be converted to text.
                </p>
              </div>
              
              <div className="flex justify-center mb-8">
                <button
                  onClick={toggleListening}
                  className={`p-6 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${isListening
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 animate-pulse'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg border-2 border-emerald-100 min-h-[200px]">
                <p className="text-lg text-emerald-800 whitespace-pre-wrap">
                  {transcript || 'Your speech will appear here...'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PronunciationHome;

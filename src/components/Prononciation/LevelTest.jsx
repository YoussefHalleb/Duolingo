import { useState, useEffect, useRef } from 'react';
import { usePronunciationData } from './usePronunciationData';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { ref, set, get, child } from 'firebase/database';
import { rtdb } from '../../config/firebase';

const LevelTest = () => {
  const { selectedLanguage } = useLanguage();
  const { user } = useAuth();
  const { categories, loading, error, getCurrentPhrases } = usePronunciationData(selectedLanguage);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const synthRef = useRef(window.speechSynthesis);
  const [playing, setPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: type, 2: pronounce
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Setup speech recognition for pronunciation
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const rec = new window.webkitSpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = selectedLanguage === 'french' ? 'fr-FR' : 'en-US';
      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setSpeechTranscript(transcript);
        setIsListening(false);
      };
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    }
  }, [selectedLanguage]);

  // Fetch phrases and sort by difficulty
  useEffect(() => {
    if (!categories) return;
    let allPhrases = [];
    Object.keys(categories).forEach(cat => {
      allPhrases = allPhrases.concat(getCurrentPhrases(cat).map(p => ({ ...p, category: cat })));
    });
    allPhrases = allPhrases.filter(p => p.text && p.difficulty !== undefined);
    allPhrases.sort((a, b) => a.difficulty - b.difficulty);
    setLevels(allPhrases.slice(0, 10)); // 10 levels max
  }, [categories, getCurrentPhrases]);

  // Load progress from Firebase or localStorage
  useEffect(() => {
    if (user?.uid) {
      const progressRef = ref(rtdb, `users/${user.uid}/levelTestProgress/${selectedLanguage}`);
      get(progressRef).then(snap => {
        if (snap.exists()) setUnlockedLevels(snap.val() || 1);
      });
    } else {
      const local = localStorage.getItem(`levelTestProgress_${selectedLanguage}`);
      setUnlockedLevels(local ? parseInt(local) : 1);
    }
  }, [user, selectedLanguage]);

  // Save progress
  const saveProgress = (level) => {
    if (user?.uid) {
      const progressRef = ref(rtdb, `users/${user.uid}/levelTestProgress/${selectedLanguage}`);
      set(progressRef, level);
    } else {
      localStorage.setItem(`levelTestProgress_${selectedLanguage}`, level);
    }
  };

  const handleSpeak = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = selectedLanguage === 'french' ? 'fr-FR' : 'en-US';
    utter.onend = () => setPlaying(false);
    synthRef.current.speak(utter);
  };

  const normalize = (t) => t.toLowerCase().replace(/[.,!?;:'"]/g, '').replace(/\s+/g, ' ').trim();

  const checkAnswer = () => {
    const correct = normalize(levels[currentLevel].text);
    const userAns = normalize(userInput);
    if (userAns === correct) {
      setFeedback('Correct! 🌟');
      if (currentLevel + 1 >= unlockedLevels) {
        setUnlockedLevels(currentLevel + 2);
        saveProgress(currentLevel + 2);
      }
    } else {
      setFeedback('Try again!');
    }
    setTimeout(() => setFeedback(null), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-emerald-800 mb-4">Level Test</h2>
      <div className="flex flex-col gap-6 w-full max-w-xl">
        {levels.map((level, idx) => (
          <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl shadow-md border-2 transition-all duration-300 mb-2
            ${idx < unlockedLevels ? 'bg-white/90 border-emerald-200' : 'bg-gray-100 border-gray-200 opacity-60'}
            ${currentLevel === idx ? 'ring-2 ring-emerald-400 scale-105' : ''}
          `}>
            <button
              disabled={idx > unlockedLevels - 1}
              onClick={() => {
                if (idx <= unlockedLevels - 1) {
                  setCurrentLevel(idx);
                  setUserInput('');
                  setFeedback(null);
                  setShowModal(true);
                }
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200
                ${idx === currentLevel && idx <= unlockedLevels - 1 ? 'ring-4 ring-yellow-400 scale-110' : ''}
                ${idx <= unlockedLevels - 1 ? 'cursor-pointer bg-gradient-to-br from-emerald-400 to-teal-400 text-white hover:scale-110' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}
              `}
              style={{ outline: 'none', border: 'none' }}
            >
              {idx < unlockedLevels - 1 ? '✔️' : idx === unlockedLevels - 1 ? '⭐' : '🔒'}
            </button>
            <div className="flex-1">
              <div className="text-lg font-semibold text-emerald-800">Level {idx + 1}</div>
              <div className="text-emerald-600">{level.category}</div>
            </div>
            <div className="text-sm text-emerald-500">Difficulty: {level.difficulty}</div>
          </div>
        ))}
      </div>
      {/* Professional Modal for level test */}
      {showModal && levels[currentLevel] && currentLevel < unlockedLevels && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[6px] transition-opacity duration-300"></div>
          {/* Modal */}
          <div className="relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl border-emerald-200 border-2"
            style={{
              background: 'rgba(255,255,255,0.85)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.18)',
              overflow: 'hidden',
              animation: 'fadeInUp 0.5s cubic-bezier(.39,.575,.565,1)'
            }}>
            <button
              className="absolute top-4 right-4 text-3xl text-emerald-400 hover:text-emerald-700 font-bold focus:outline-none z-10 transition-transform duration-200 hover:scale-125"
              style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
              onClick={() => { setShowModal(false); setModalStep(1); setUserInput(''); setFeedback(null); setSpeechTranscript(''); setIsListening(false); }}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-6 px-8 py-10">
              {/* Step Indicator */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${modalStep === 1 ? 'bg-emerald-500' : 'bg-gray-300'} border-2 border-emerald-300 transition-all`}></div>
                <div className={`w-4 h-4 rounded-full ${modalStep === 2 ? 'bg-emerald-500' : 'bg-gray-300'} border-2 border-emerald-300 transition-all`}></div>
              </div>
              <div className="text-2xl font-bold text-emerald-800 mb-2 drop-shadow-sm">Level {currentLevel + 1}</div>
              <div className="text-emerald-600 mb-2 text-lg font-medium">{levels[currentLevel].category} &middot; Difficulty: {levels[currentLevel].difficulty}</div>
              {modalStep === 1 && (
                <>
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 mb-2">
                      <button
                        onClick={() => handleSpeak(levels[currentLevel].text)}
                        className={`p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl hover:scale-110 transition-all duration-300 border-2 border-emerald-200 ${playing ? 'animate-pulse' : ''}`}
                        style={{ boxShadow: '0 4px 16px 0 rgba(16,185,129,0.12)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </button>
                      <span className="text-emerald-700 text-lg font-semibold drop-shadow-sm">Listen and type what you hear</span>
                    </div>
                    <input
                      type="text"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      className="w-full p-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 text-lg bg-white/80 shadow-inner focus:bg-white transition-all"
                      placeholder="Type what you hear..."
                      style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                    />
                    <button
                      onClick={() => {
                        const correct = normalize(levels[currentLevel].text);
                        const userAns = normalize(userInput);
                        if (userAns === correct) {
                          setFeedback('Correct! 🌟 Now pronounce it aloud.');
                          setTimeout(() => {
                            setModalStep(2);
                            setFeedback(null);
                          }, 1200);
                        } else {
                          setFeedback('Try again!');
                          setTimeout(() => setFeedback(null), 1200);
                        }
                      }}
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all duration-300 mt-2 font-semibold text-lg border-2 border-emerald-200"
                      style={{ boxShadow: '0 2px 8px 0 rgba(16,185,129,0.10)' }}
                    >
                      Check Answer
                    </button>
                    {feedback && (
                      <div className={`mt-2 text-lg font-semibold ${feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'} drop-shadow`}>{feedback}</div>
                    )}
                  </div>
                </>
              )}
              {modalStep === 2 && (
                <>
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="text-lg text-emerald-800 font-semibold mb-2 drop-shadow-sm">Now pronounce:</div>
                    <div className="text-2xl font-bold text-emerald-700 mb-2 drop-shadow-sm">{levels[currentLevel].text}</div>
                    <button
                      onClick={() => {
                        setSpeechTranscript('');
                        setIsListening(true);
                        if (recognition) recognition.start();
                      }}
                      disabled={isListening}
                      className={`px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transition-all duration-300 font-semibold text-lg border-2 border-emerald-200 ${isListening ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
                      style={{ boxShadow: '0 2px 8px 0 rgba(16,185,129,0.10)' }}
                    >
                      {isListening ? 'Listening...' : 'Start Recording'}
                    </button>
                    <div className="w-full min-h-[40px] text-center text-emerald-600 mt-2">
                      {speechTranscript && (
                        <span>Your speech: <span className="font-semibold text-emerald-800">{speechTranscript}</span></span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        const correct = normalize(levels[currentLevel].text);
                        const spoken = normalize(speechTranscript);
                        if (!speechTranscript) {
                          setFeedback('Please pronounce the phrase.');
                          setTimeout(() => setFeedback(null), 1200);
                          return;
                        }
                        if (spoken === correct) {
                          setFeedback('Great pronunciation! Level complete.');
                          if (currentLevel + 1 >= unlockedLevels) {
                            setUnlockedLevels(currentLevel + 2);
                            saveProgress(currentLevel + 2);
                          }
                          setTimeout(() => {
                            setShowModal(false);
                            setModalStep(1);
                            setUserInput('');
                            setFeedback(null);
                            setSpeechTranscript('');
                          }, 1500);
                        } else {
                          setFeedback('Not quite, try again!');
                          setTimeout(() => setFeedback(null), 1200);
                        }
                      }}
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg hover:scale-105 transition-all duration-300 mt-2 font-semibold text-lg border-2 border-yellow-200"
                      style={{ boxShadow: '0 2px 8px 0 rgba(251,191,36,0.10)' }}
                    >
                      Check Pronunciation
                    </button>
                    {feedback && (
                      <div className={`mt-2 text-lg font-semibold ${feedback.startsWith('Great') ? 'text-green-600' : 'text-red-600'} drop-shadow`}>{feedback}</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelTest;

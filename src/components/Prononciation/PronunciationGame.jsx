import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../auth/AuthContext';
import { ref, set, get } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import { usePronunciationData } from './usePronunciationData';

/*
  Redesigned PronunciationGame + LevelTest
  - Uses Tailwind-heavy UI (glass, gradients, cards)
  - Single-file drop-in: exports default PronunciationGame and named LevelTest
  - Includes graceful fallbacks for speechSynthesis and recognition
  - Keeps original progress saving (Firebase / localStorage)
*/

const normalize = (t = '') =>
  t
    .toString()
    .toLowerCase()
    .replace(/[.,!?;:'"()\[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const LevelTest = ({ compact = false }) => {
  const { selectedLanguage } = useLanguage();
  const { user } = useAuth();
  const { categories, getCurrentPhrases } = usePronunciationData(selectedLanguage);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const [playing, setPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const recognitionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // build levels from categories
  useEffect(() => {
    if (!categories) return;
    let all = [];
    Object.keys(categories).forEach((cat) => {
      all = all.concat(
        (getCurrentPhrases(cat) || []).map((p) => ({ ...p, category: cat }))
      );
    });
    all = all.filter((p) => p && p.text && p.difficulty !== undefined);
    all.sort((a, b) => a.difficulty - b.difficulty);
    setLevels(all.slice(0, 12));
  }, [categories, getCurrentPhrases]);

  // recognition setup
  useEffect(() => {
    const Win = typeof window !== 'undefined' ? window : null;
    const SR = Win && (Win.SpeechRecognition || Win.webkitSpeechRecognition);
    if (SR) {
      const r = new SR();
      r.continuous = false;
      r.interimResults = false;
      r.lang = selectedLanguage === 'french' ? 'fr-FR' : 'en-US';
      r.onresult = (ev) => {
        const transcript = Array.from(ev.results)
          .map((res) => res[0].transcript)
          .join('');
        setSpeechTranscript(transcript);
        setIsListening(false);
      };
      r.onend = () => setIsListening(false);
      recognitionRef.current = r;
    }
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.onresult = null; recognitionRef.current.onend = null; } catch (e) {}
      }
    };
  }, [selectedLanguage]);

  // load progress
  useEffect(() => {
    if (user?.uid) {
      const progressRef = ref(rtdb, `users/${user.uid}/levelTestProgress/${selectedLanguage}`);
      get(progressRef).then((snap) => {
        if (snap.exists()) setUnlockedLevels(snap.val() || 1);
      }).catch(() => {});
    } else {
      const local = localStorage.getItem(`levelTestProgress_${selectedLanguage}`);
      setUnlockedLevels(local ? parseInt(local, 10) : 1);
    }
  }, [user, selectedLanguage]);

  const saveProgress = (level) => {
    if (user?.uid) {
      const progressRef = ref(rtdb, `users/${user.uid}/levelTestProgress/${selectedLanguage}`);
      set(progressRef, level).catch(() => {});
    } else {
      localStorage.setItem(`levelTestProgress_${selectedLanguage}`, level);
    }
  };

  const handleSpeak = (text) => {
    const synth = synthRef.current;
    if (!synth) return;
    if (synth.speaking) {
      synth.cancel();
      setPlaying(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = selectedLanguage === 'french' ? 'fr-FR' : 'en-US';
    utter.onend = () => setPlaying(false);
    setPlaying(true);
    try { synth.speak(utter); } catch (e) { setPlaying(false); }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      setFeedback('Speech recognition is not available in this browser.');
      setTimeout(() => setFeedback(null), 1600);
      return;
    }
    setSpeechTranscript('');
    setIsListening(true);
    try { recognitionRef.current.start(); } catch (e) { setIsListening(false); }
  };

  const checkTyped = () => {
    if (!levels[currentLevel]) return;
    const correct = normalize(levels[currentLevel].text);
    const userAns = normalize(userInput);
    if (userAns === correct) {
      setFeedback('Correct! 🌟 Now pronounce it aloud.');
      setTimeout(() => { setModalStep(2); setFeedback(null); }, 900);
    } else {
      setFeedback('Try again — listen closely.');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const checkPronunciation = () => {
    if (!levels[currentLevel]) return;
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
        const next = currentLevel + 2;
        setUnlockedLevels(next);
        saveProgress(next);
      }
      setTimeout(() => {
        setShowModal(false);
        setModalStep(1);
        setUserInput('');
        setFeedback(null);
        setSpeechTranscript('');
      }, 900);
    } else {
      setFeedback('Not quite — try again with clearer pronunciation.');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left: Levels list */}
        <div className="glass-effect p-6 rounded-2xl shadow-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-extrabold text-emerald-800">Level Progress</h3>
            <div className="text-sm text-emerald-600">Unlocked: {unlockedLevels}</div>
          </div>

          <div className="space-y-3 max-h-[56vh] overflow-auto pr-2">
            {levels.map((lv, idx) => (
              <button
                key={idx}
                disabled={idx > unlockedLevels - 1}
                onClick={() => { if (idx <= unlockedLevels -1) { setCurrentLevel(idx); setUserInput(''); setFeedback(null); setShowModal(true); setRevealed(false); } }}
                className={`group w-full flex items-center gap-4 p-3 rounded-xl transition-shadow duration-200 border-2 ${idx <= unlockedLevels -1 ? 'bg-white/90 border-emerald-100 hover:scale-[1.01] shadow-sm' : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${idx < unlockedLevels -1 ? 'bg-emerald-50 text-emerald-600' : idx === unlockedLevels -1 ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow' : 'bg-gray-200 text-gray-400'}`}>
                  {idx < unlockedLevels -1 ? '✓' : idx === unlockedLevels -1 ? '★' : '🔒'}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-emerald-800">Level {idx + 1}</div>
                  <div className="text-sm text-emerald-600">{lv?.category || '—'}</div>
                </div>
                <div className="text-xs text-emerald-500">Difficulty: {lv?.difficulty ?? '-'}</div>
              </button>
            ))}
            {levels.length === 0 && (
              <div className="text-center text-sm text-emerald-500 py-8">No levels yet — add phrases in the content panel.</div>
            )}
          </div>
        </div>

        {/* Right: Current level preview */}
        <div className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white/60 to-white/40 border border-white/10 glass-effect">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-emerald-500">Current</div>
              <h2 className="text-2xl font-extrabold text-emerald-800">{levels[currentLevel]?.category ?? 'Pick a level'}</h2>
              <div className="text-sm text-emerald-600 mt-1">Level {currentLevel + 1} • Difficulty {levels[currentLevel]?.difficulty ?? '-'}</div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleSpeak(levels[currentLevel]?.text || '')} className="btn-voice shadow hover:scale-105" aria-label="Play example">
                ▶
              </button>
              <button onClick={() => { setShowModal(true); setRevealed(false); setModalStep(1); }} className="btn-primary text-sm">Start</button>
            </div>
          </div>

          <div className="mt-6">
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1">
                <div className="text-xs text-emerald-500">Your progress</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                  <div className="h-3 rounded-full bg-emerald-400 transition-all" style={{ width: `${Math.min(100, (unlockedLevels / Math.max(1, levels.length)) * 100)}%` }} />
                </div>
              </div>
              <div className="text-sm text-emerald-600 font-medium">{Math.min(100, Math.round((unlockedLevels / Math.max(1, levels.length)) * 100))}%</div>
            </div>

            <div className="mt-6 text-sm text-emerald-600">Tips:</div>
            <ul className="list-disc list-inside text-emerald-500 mt-2 text-sm space-y-1">
              <li>Click the play button to hear the phrase.</li>
              <li>Type what you hear, then pronounce aloud to complete the level.</li>
              <li>If recognition isn't available, try a Chrome-based browser.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && levels[currentLevel] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowModal(false); setModalStep(1); setUserInput(''); setFeedback(null); setSpeechTranscript(''); setIsListening(false); setRevealed(false); }} />
          <div className="relative max-w-2xl w-full mx-auto bg-white/90 rounded-3xl p-6 shadow-2xl border border-white/20">
            <button className="absolute right-4 top-4 text-2xl text-emerald-500 hover:text-emerald-700" onClick={() => { setShowModal(false); setModalStep(1); setUserInput(''); setFeedback(null); setSpeechTranscript(''); setIsListening(false); setRevealed(false); }}>×</button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="text-sm text-emerald-600">Level {currentLevel + 1} • {levels[currentLevel].category}</div>
                <h3 className="text-2xl font-bold text-emerald-800 mt-1">{levels[currentLevel] ? (revealed ? levels[currentLevel].text : '') : ''}</h3>

                {modalStep === 1 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleSpeak(levels[currentLevel].text)} className="btn-voice">🔊</button>
                      <div className="text-sm text-emerald-600">Listen carefully and type what you hear</div>
                    </div>
                    <input value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type what you hear..." className="w-full p-3 rounded-lg border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                    <div className="flex items-center gap-3">
                      <button onClick={checkTyped} className="btn-primary">Check Answer</button>
                      <button onClick={() => { setRevealed(true); setFeedback('Phrase revealed'); setTimeout(() => setFeedback(null), 900); }}  className="text-sm text-emerald-500 underline">Reveal</button>
                    </div>
                    {feedback && (<div className={`text-sm font-semibold ${feedback.startsWith('Correct') || feedback.startsWith('Filled') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</div>)}
                  </div>
                )}

                {modalStep === 2 && (
                  <div className="mt-6 space-y-4">
                    <div className="text-sm text-emerald-600">Now pronounce the phrase — allow microphone access</div>
                    <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold">{levels[currentLevel] ? (revealed ? levels[currentLevel].text : '') : ''}</div>
                    <div className="flex items-center gap-3">
                      <button onClick={startListening} disabled={isListening} className={`px-4 py-2 rounded-full ${isListening ? 'opacity-60 cursor-not-allowed' : 'btn-primary'}`}>{isListening ? 'Listening...' : 'Start Recording'}</button>
                      <button onClick={checkPronunciation} className="px-4 py-2 rounded-full btn-cta">Check Pronunciation</button>
                    </div>
                    <div className="text-sm text-emerald-600">{speechTranscript ? (<span>Your speech: <strong className="text-emerald-800">{speechTranscript}</strong></span>) : <span className="text-emerald-400">No transcript yet</span>}</div>
                    {feedback && (<div className={`text-sm font-semibold ${feedback.startsWith('Great') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</div>)}
                  </div>
                )}
              </div>

              <aside className="w-full md:w-64 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                <div className="text-sm text-emerald-600">Quick tips</div>
                <ul className="list-inside list-disc mt-2 text-sm text-emerald-500 space-y-1">
                  <li>Speak clearly and at a steady pace.</li>
                  <li>Use headphones to focus on pronunciation detail.</li>
                  <li>Repeat phrase several times if needed.</li>
                </ul>

                <div className="mt-4 text-sm text-emerald-600">Recognition</div>
                <div className="mt-2 text-xs text-emerald-500">{recognitionRef.current ? 'Available' : 'Not available in this browser'}</div>

                <div className="mt-4">
                  <div className="text-xs text-emerald-500">Difficulty</div>
                  <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="h-2 bg-emerald-400" style={{ width: `${Math.min(100, ((levels[currentLevel]?.difficulty ?? 1) / 5) * 100)}%` }} />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button onClick={() => { setModalStep((s) => (s === 1 ? 2 : 1)); }} className="text-sm underline text-emerald-600">Switch to {modalStep === 1 ? 'Pronunciation' : 'Typing'}</button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PronunciationGame = () => {
  const { selectedLanguage } = useLanguage();
  const { user } = useAuth();

  // The main page layout — hero + LevelTest embedded
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8">
      <Navbar />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <header className="rounded-3xl p-8 bg-white/80 border border-white/20 shadow-lg glass-effect mb-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-800">Pronunciation Game</h1>
                <p className="text-emerald-600 mt-1">Practice speaking & listening — language: <strong className="text-emerald-700">{selectedLanguage}</strong></p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/prononciation" className="px-4 py-2 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50">Back</Link>
                <div className="text-sm text-emerald-500">Tip: Use Chrome for best speech recognition</div>
              </div>
            </div>
          </header>

          <main className="p-4 bg-transparent">
            <LevelTest />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PronunciationGame;

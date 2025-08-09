import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import LevelTest from '../components/Prononciation/LevelTest.jsx';
import { useLanguage } from '../context/LanguageContext';

const PronunciationGame = () => {
  const { selectedLanguage } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-6">
          <Link
            to="/prononciation"
            className="absolute top-4 left-4 p-3 rounded-full transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:from-emerald-600 hover:to-teal-600 hover:-translate-x-1"
            title="Return to Pronunciation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
            Pronunciation Game - {selectedLanguage}
          </h1>
          <LevelTest />
        </div>
      </div>
    </div>
  );
};

export default PronunciationGame;

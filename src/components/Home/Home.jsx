import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <header className="main-header">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/pics/hi.png" alt="Language Explorer Logo" className="w-20" />
          <h1 className="welcome-title">Language Explorer</h1>
        </div>
        <p className="welcome-subtitle">
          Your gateway to mastering new languages. Dive into our interactive modules and start your journey today!
        </p>
      </header>
      <div className="flex-1 flex flex-wrap gap-8 justify-center items-start mb-10">
        <div className="bg-white rounded-2xl shadow-md p-7 w-80 flex flex-col items-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-amber-100 shadow-sm overflow-hidden">
            <img src="/pics/vocabulaire.png" alt="Vocabulary Icon" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2.5">Vocabulary & Lessons</h2>
          <p className="text-base text-gray-600 mb-4 text-center">Expand your lexicon with engaging, interactive lessons, covering a wide range of topics.</p>
          <Link to="/learn/categories" className="bg-cyan-600 text-white rounded-lg px-7 py-2.5 text-base font-medium hover:bg-cyan-700 transition-colors">Explore</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-7 w-80 flex flex-col items-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-teal-100 shadow-sm overflow-hidden">
            <img src="/pics/quiz.png" alt="Quiz Icon" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2.5">Interactive Quiz</h2>
          <p className="text-base text-gray-600 mb-4 text-center">Test your knowledge and reinforce learning with fun, adaptive quizzes designed to challenge you and improve retention.</p>
          <Link to="/quizzes" className="bg-cyan-600 text-white rounded-lg px-7 py-2.5 text-base font-medium hover:bg-cyan-700 transition-colors">Explore</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-7 w-80 flex flex-col items-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100 shadow-sm overflow-hidden">
            <img src="/pics/microphone.png" alt="Microphone Icon" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2.5">Pronunciation Practice</h2>
          <p className="text-base text-gray-600 mb-4 text-center">Refine your speaking skills with real-time feedback and clear audio examples, mastering authentic sounds.</p>
          <Link to="/prononciation" className="bg-cyan-600 text-white rounded-lg px-7 py-2.5 text-base font-medium hover:bg-cyan-700 transition-colors">Explore</Link>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-md mx-auto max-w-xl p-9 text-center border-2 border-gray-200 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-2.5">Your Language Learning Journey</h2>
        <p className="text-base text-gray-600 mb-4">Track your progress, unlock new achievements, and discover personalized recommendations.</p>
        <button className="bg-cyan-600 text-white rounded-lg px-7 py-2.5 text-base font-medium hover:bg-cyan-700 transition-colors">View Dashboard</button>
      </div>
      <footer className="bg-white rounded-t-2xl shadow-md mx-auto max-w-xl p-8 text-center mt-auto">
        <div className="text-lg font-bold text-gray-800 mb-2.5">Language Explorer</div>
        <div className="text-base text-gray-600 mb-3">Stay updated with our language tips!</div>
        <div className="flex justify-center items-center gap-2 mb-4">
          <input type="email" className="p-2 rounded-md border border-gray-300 text-base w-56" placeholder="Enter your email address" />
          <button className="bg-cyan-600 text-white rounded-md px-4 py-2 text-base font-medium hover:bg-cyan-700 transition-colors">Subscribe</button>
        </div>
        <div className="text-sm text-gray-400">© 2025 Language Explorer.</div>
      </footer>
    </div>
  );
};

export default Home;
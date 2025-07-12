import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/SignIn');
    } catch (error) {
      alert('Error signing out.');
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-gray-100 flex flex-col">
      <nav className="flex items-center justify-between bg-white shadow-sm px-8 h-16 rounded-b-2xl mb-8">
        <div className="flex items-center">
          <img src="/logo192.png" alt="Language Explorer Logo" className="w-9 h-9 mr-3" />
          <span className="text-lg font-bold text-gray-800">Language Explorer</span>
        </div>
        <div className="flex gap-7">
          <Link to="/" className="text-gray-600 text-base font-medium border-b-2 border-transparent hover:text-cyan-600 hover:border-cyan-600 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-600 text-base font-medium border-b-2 border-transparent hover:text-cyan-600 hover:border-cyan-600 transition-colors">About</Link>
          <Link to="/language-selector" className="text-gray-600 text-base font-medium border-b-2 border-transparent hover:text-cyan-600 hover:border-cyan-600 transition-colors">Language Selector</Link>
        </div>
        <div className="relative group">
          <span className="text-gray-800 font-medium bg-gray-200 rounded-2xl px-4 py-1.5 flex items-center gap-1.5 cursor-pointer">
            👤 Rahim ▾
          </span>
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl hidden group-hover:flex flex-col z-10">
            <Link to="/settings" className="px-5 py-3 text-gray-600 hover:bg-gray-100 hover:text-cyan-600 transition-colors">Settings</Link>
            <button onClick={handleLogout} className="px-5 py-3 text-gray-600 hover:bg-gray-100 hover:text-cyan-600 transition-colors text-left">Sign out</button>
          </div>
        </div>
      </nav>
      <header className="text-center mb-10 flex-shrink-0">
        <h1 className="text-5xl font-bold text-gray-800 mb-2.5">Welcome to Language Explorer!</h1>
        <p className="text-lg text-gray-600">Your gateway to mastering new languages. Dive into our interactive modules and start your journey today!</p>
      </header>
      <div className="flex-1 flex flex-wrap gap-8 justify-center items-start mb-10">
        <div className="bg-white rounded-2xl shadow-md p-7 w-80 flex flex-col items-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-amber-100 shadow-sm overflow-hidden">
            <img src="/pics/vocabulaire.png" alt="Vocabulary Icon" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2.5">Vocabulary & Lessons</h2>
          <p className="text-base text-gray-600 mb-4 text-center">Expand your lexicon with engaging, interactive lessons, covering a wide range of topics.</p>
          <Link to="/vocabulaire" className="bg-cyan-600 text-white rounded-lg px-7 py-2.5 text-base font-medium hover:bg-cyan-700 transition-colors">Explore</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-7 w-80 flex flex-col items-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-teal-100 shadow-sm overflow-hidden">
            <img src="/pics/quiz.png" alt="Quiz Icon" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2.5">Interactive Quiz</h2>
          <p className="text-base text-gray-600 mb-4 text-center">Test your knowledge and reinforce learning with fun, adaptive quizzes designed to challenge you and improve retention.</p>
          <Link to="/quiz" className="bg-cyan-600 text-white rounded-lg px-7 py-2.5 text-base font-medium hover:bg-cyan-700 transition-colors">Explore</Link>
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
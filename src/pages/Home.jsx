import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './Home.css';

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
    <div className="home-page">
      <nav className="main-navbar">
        <div className="navbar-left">
          <img src="/logo192.png" alt="Language Explorer Logo" className="navbar-logo" />
          <span className="navbar-title">Language Explorer</span>
        </div>
        <div className="navbar-center">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/language-selector" className="navbar-link">Language Selector</Link>
        </div>
        <div className="navbar-right">
          <div className="navbar-user-dropdown">
            <span className="navbar-user">👤 Rahim ▾</span>
            <div className="navbar-dropdown-content">
              <Link to="/settings" className="navbar-dropdown-link">Settings</Link>
              <button className="navbar-dropdown-link" onClick={handleLogout}>Sign out</button>
            </div>
          </div>
        </div>
      </nav>
      <header className="main-header">
        <h1 className="welcome-title">Welcome to Language Explorer!</h1>
        <p className="welcome-subtitle">
          Your gateway to mastering new languages. Dive into our interactive modules and start your journey today!
        </p>
      </header>
      <div className="modules-cards">
        <div className="module-card">
          <div className="module-icon vocab-icon" aria-label="Vocabulary & Lessons">
            <img src="/pics/vocabulaire.png" alt="Vocabulary Icon" className="module-img" />
          </div>
          <h2>Vocabulary & Lessons</h2>
          <p>Expand your lexicon with engaging, interactive lessons, covering a wide range of topics.</p>
          <Link to="/vocabulaire" className="btn btn-primary">Explore</Link>
        </div>
        <div className="module-card">
          <div className="module-icon quiz-icon" aria-label="Interactive Quiz">
            <img src="/pics/quiz.png" alt="Quiz Icon" className="module-img" />
          </div>
          <h2>Interactive Quiz</h2>
          <p>Test your knowledge and reinforce learning with fun, adaptive quizzes designed to challenge you and improve retention.</p>
          <Link to="/quizzes" className="btn btn-primary">Explore</Link>
        </div>
        <div className="module-card">
          <div className="module-icon prononciation-icon" aria-label="Pronunciation Practice">
            <img src="/pics/microphone.png" alt="Microphone Icon" className="module-img" />
          </div>
          <h2>Pronunciation Practice</h2>
          <p>Refine your speaking skills with real-time feedback and clear audio examples, mastering authentic sounds.</p>
          <Link to="/prononciation" className="btn btn-primary">Explore</Link>
        </div>
      </div>
      <div className="learning-journey-section">
        <h2 className="journey-title">Your Language Learning Journey</h2>
        <p className="journey-desc">Track your progress, unlock new achievements, and discover personalized recommendations.</p>
        <button className="btn btn-dashboard">View Dashboard</button>
      </div>
      <footer className="main-footer">
        <div className="footer-title">Language Explorer</div>
        <div className="footer-tips">Stay updated with our language tips!</div>
        <form className="footer-subscribe">
          <input type="email" className="footer-input" placeholder="Enter your email address" />
          <button type="submit" className="btn btn-footer-subscribe">Subscribe</button>
        </form>
        <div className="footer-bottom">
          <span className="footer-copyright">© 2025 Language Explorer.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
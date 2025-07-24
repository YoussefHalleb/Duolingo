import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import './Navbar.css';
import { useAuth } from '../auth/AuthContext';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { isLoggedIn, user, loading } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.navbar-user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/SignIn');
    } catch (error) {
      alert('Error signing out.');
    }
  };

  if (loading) return null; // ou spinner si tu veux

  return (
    <nav className="main-navbar">
      <div className="navbar-left">
        <img src="/logo192.png" alt="Language Explorer Logo" className="navbar-logo" />
        <span className="navbar-title">Language Explorer</span>
      </div>
      <div className="navbar-center">
        <Link 
          to="/home" 
          className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
        >
          <i className="fas fa-home"></i> Home
        </Link>
        <Link 
          to="/about" 
          className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
        >
          <i className="fas fa-info-circle"></i> About
        </Link>
        <Link 
          to="/language-selector" 
          className={`navbar-link ${location.pathname === '/language-selector' ? 'active' : ''}`}
        >
          <i className="fas fa-language"></i> Learn
        </Link>
        
        <Link 
          to="/quizzes" 
          className={`navbar-link ${location.pathname === '/quizzes' ? 'active' : ''}`}
        >
          <i className="fas fa-question-circle"></i> Quiz
        </Link>
        <Link 
          to="/prononciation" 
          className={`navbar-link ${location.pathname === '/pronunciation' ? 'active' : ''}`}
        >
          <i className="fas fa-microphone"></i> Pronunciation
        </Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-actions">
        {isLoggedIn && (
            <div className="navbar-user-dropdown">
              <button className="navbar-user" onClick={toggleDropdown}>
                <img src="/pics/utilisateur.png" alt="User" className="navbar-icon" />
                <span className="user-name">{user?.displayName || "Utilisateur"}</span>
                <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
              </button>
              <div className={`navbar-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/profile" className="navbar-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                <img src="/pics/utilisateur.png" alt="Profile" className="dropdown-icon" />
                <span>
                  <span className="dropdown-label">Profile</span>
                  <span className="dropdown-sublabel">View your progress</span>
                </span>
              </Link>
              <Link to="/settings" className="navbar-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                <img src="/pics/reglage.png" alt="Settings" className="dropdown-icon" />
                <span>
                  <span className="dropdown-label">Settings</span>
                  <span className="dropdown-sublabel">Customize your experience</span>
                </span>
              </Link>
              <div className="dropdown-divider"></div>
              <button className="navbar-dropdown-link" onClick={() => { handleLogout(); setIsDropdownOpen(false); }}>
                <img src="/pics/sortie.png" alt="Sign out" className="dropdown-icon" />
                <span>
                  <span className="dropdown-label">Sign out</span>
                  <span className="dropdown-sublabel">See you soon!</span>
                </span>
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
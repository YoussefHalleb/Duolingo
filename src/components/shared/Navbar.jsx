import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useUser } from '../../context/UserContext';
import { ref, onValue } from 'firebase/database'; // Importation correcte
import { rtdb } from '../../config/firebase'; // Importation de rtdb
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [username, setUsername] = React.useState('Guest');

  React.useEffect(() => {
    if (user) {
      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.username) {
          setUsername(data.username);
        }
      });
    }
  }, [user]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
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
          <i className="fas fa-language"></i> Language Selector
        </Link>
        <Link 
          to="/language-choice" 
          className={`navbar-link ${location.pathname === '/learn' ? 'active' : ''}`}
        >
          <i className="fas fa-book"></i> Learn
        </Link>
        <Link 
          to="/quiz" 
          className={`navbar-link ${location.pathname === '/quiz' ? 'active' : ''}`}
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
          <div className="navbar-user-dropdown">
            <button className="navbar-user" onClick={toggleDropdown}>
              <img src="/pics/utilisateur.png" alt="User" className="navbar-icon" />
              <span className="user-name">{username}</span>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
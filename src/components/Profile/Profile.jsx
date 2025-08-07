import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import Layout from '../shared/layout';
import './Profile.css';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [userLessons, setUserLessons] = useState([]);
  const [terminatedLessons, setTerminatedLessons] = useState({});
  const [username, setUsername] = useState('Guest');
  const [loading, setLoading] = useState(true);
  const [pronunciationTests, setPronunciationTests] = useState([]);
  const [pronunciationTestsByLanguage, setPronunciationTestsByLanguage] = useState({});
  const [levelProgress, setLevelProgress] = useState({});
  const navigate = useNavigate();
  // Fetch level progress for each language
  useEffect(() => {
    if (user) {
      const levelRef = ref(rtdb, `users/${user.uid}/levelTestProgress`);
      const unsubscribeLevel = onValue(levelRef, (snapshot) => {
        const data = snapshot.val() || {};
        setLevelProgress(data);
      }, (error) => {
        console.error('Error fetching level progress:', error.message);
      });
      return () => unsubscribeLevel();
    }
  }, [user]);

  const languageInfo = {
    english: {
      nativeName: 'English',
      name: 'English',
      flagIcon: '/flags/royaume-uni.png'
    },
    french: {
      nativeName: 'Français',
      name: 'French',
      flagIcon: '/flags/la-france.png'
    },
    spanish: {
      nativeName: 'Español',
      name: 'Spanish',
      flagIcon: '/flags/monde.png'
    },
    german: {
      nativeName: 'Deutsch',
      name: 'German',
      flagIcon: '/flags/allemagne.png'
    },
    italian: {
      nativeName: 'Italiano',
      name: 'Italian',
      flagIcon: '/flags/italie.png'
    },
    portuguese: {
      nativeName: 'Português',
      name: 'Portuguese',
      flagIcon: '/flags/le-portugal.png'
    },
    dutch: {
      nativeName: 'Nederlands',
      name: 'Dutch',
      flagIcon: '/flags/pays-bas.png'
    },
    russian: {
      nativeName: 'Русский',
      name: 'Russian',
      flagIcon: '/flags/rusia.png'
    },
    japanese: {
      nativeName: '日本語',
      name: 'Japanese',
      flagIcon: '/flags/japon.png'
    },
    chinese: {
      nativeName: '中文',
      name: 'Chinese',
      flagIcon: '/flags/chine.png'
    },
    korean: {
      nativeName: '한국어',
      name: 'Korean',
      flagIcon: '/flags/coree-du-sud.png'
    }
  };

  const calculateAverageScore = (tests) => {
    if (!tests.length) return 0;
    const totalPercentage = tests.reduce((acc, test) => 
      acc + (test.correctAnswers / test.totalQuestions) * 100, 0);
    return Math.round(totalPercentage / tests.length);
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  useEffect(() => {
    if (user) {
      // Set username from Firebase Auth
      setUsername(user.displayName || user.email.split('@')[0] || 'Guest');

      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      const unsubscribeLessons = onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const lessonsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setUserLessons(lessonsArray);
        } else {
          setUserLessons([]);
        }
      }, (error) => {
        console.error('Error fetching lessons:', error.message);
      });

      const userTerminatedRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
      const unsubscribeTerminated = onValue(userTerminatedRef, (snapshot) => {
        const data = snapshot.val() || {};
        setTerminatedLessons(data);
      }, (error) => {
        console.error('Error fetching terminated lessons:', error.message);
      });

      // Fetch pronunciation tests
      const pronunciationTestsRef = ref(rtdb, `users/${user.uid}/pronunciationTests`);
      const unsubscribePronunciation = onValue(pronunciationTestsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const testsArray = Object.entries(data).map(([id, test]) => ({
          id,
          ...test
        }));
        setPronunciationTests(testsArray);

        // Group tests by language
        const testsByLanguage = testsArray.reduce((acc, test) => {
          if (!acc[test.language]) {
            acc[test.language] = [];
          }
          acc[test.language].push(test);
          return acc;
        }, {});
        setPronunciationTestsByLanguage(testsByLanguage);
      }, (error) => {
        console.error('Error fetching pronunciation tests:', error.message);
      });

      setLoading(false);

      return () => {
        unsubscribeLessons();
        unsubscribeTerminated();
        unsubscribePronunciation();
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="learn-container">
          <p className="learn-subtitle text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="learn-container">
          <p className="learn-subtitle text-center">Please sign in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  const completedLessons = userLessons.filter(lesson => terminatedLessons[lesson.id]?.progress === 100);

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header" style={{ color: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h1 className="learn-title" style={{ color: '#0A8A88FF' }}>Your Profile</h1>
          <p className="learn-subtitle">Welcome, {username}! Track your progress</p>
        </header>
        <div className="profile-grid">
          <div className="profile-top-section" style={{ marginBottom: '20px' }}>
            <div className="profile-card info-card" style={{ backgroundColor: '#f9fafb' }}>
              <h2 className="profile-section-title" style={{ color: '#0A8A88FF' }}>Profile Information</h2>
              <div className="profile-details">
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Total Lessons:</strong> {userLessons.length}</p>
                <p><strong>Completed Lessons:</strong> {completedLessons.length}</p>
              </div>
            </div>
          </div>
          {/* Completed Lessons Section */}
          {completedLessons.length > 0 ? (
            <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
              <h2 className="profile-section-title" style={{ color: '#0A8A88FF', textAlign: 'center' }}>Your Completed Lessons</h2>
              <div className="lesson-list-horizontal">
                {completedLessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-card-image">
                      <img
                        src={lesson.image || '/pics/vocabulaire.png'}
                        alt={`${lesson.title} icon`}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }}
                      />
                    </div>
                    <div className="lesson-card-content">
                      <h2 className="lesson-card-title">{lesson.title}</h2>
                      <p className="text-sm text-gray-600">Category: {lesson.category}</p>
                      <p className="lesson-status">
                        Status: <span className="status-completed">Completed</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
              <h2 className="profile-section-title" style={{ color: '#40CB8CFF', textAlign: 'center' }}>Your Completed Lessons</h2>
              <p className="text-center lesson-details-not-found">No completed lessons yet. Start learning to see your progress!</p>
            </div>
          )}

          {/* Level Progress Section (clickable) */}
          <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="profile-section-title" style={{ color: '#0A8A88FF', textAlign: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <i className="fas fa-star" style={{ color: '#F59E42' }}></i>
                Prononciation Progress
              </span>
            </h2>
            {Object.keys(levelProgress).length > 0 ? (
              <div className="pronunciation-stats" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {Object.entries(levelProgress).map(([lang, level]) => (
                  <div key={lang} className="language-stats" style={{ cursor: 'pointer', border: '2px solid #F59E42', marginBottom: '10px' }}
                    onClick={() => navigate(`/level-test?lang=${lang}`)}
                    title={`Continue Level Test for ${languageInfo[lang]?.name || lang}`}
                  >
                    <div className="language-header">
                      <div className="language-info">
                        <div className="flag-container">
                          <img src={languageInfo[lang]?.flagIcon || '/flags/default-flag.png'} alt={lang} />
                        </div>
                        <div className="language-text">
                          <h3>{languageInfo[lang]?.name || lang}</h3>
                          <div className="language-name">{languageInfo[lang]?.nativeName || lang}</div>
                        </div>
                      </div>
                      <div className="proficiency-indicator">
                        <div className="proficiency-bar" style={{ '--progress': `${Math.min(level - 1, 10) * 10}%`, '--color': '#F59E42' }}></div>
                        <div className="proficiency-label">Level {level > 1 ? level - 1 : 0} / 10</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#4a5568' }}>
                <i className="fas fa-star" style={{ fontSize: '32px', color: '#F59E42', marginBottom: '10px' }}></i>
                <div>No level progress yet. Try the Level Test to unlock levels!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
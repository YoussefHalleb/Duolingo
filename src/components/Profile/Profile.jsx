import { useState, useEffect } from 'react';
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
          <div className="profile-card info-card" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="profile-section-title" style={{ color: '#0A8A88FF' }}>Profile Information</h2>
            <div className="profile-details">
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Total Lessons:</strong> {userLessons.length}</p>
              <p><strong>Completed Lessons:</strong> {completedLessons.length}</p>
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

          {/* Pronunciation Tests Section */}
          <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="profile-section-title" style={{ color: '#0A8A88FF', textAlign: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <i className="fas fa-microphone" style={{ color: '#0A8A88FF' }}></i>
                Your Pronunciation Journey
              </span>
            </h2>
            {pronunciationTests.length > 0 ? (
              <div className="pronunciation-stats">
                {Object.entries(pronunciationTestsByLanguage).map(([language, tests]) => {
                  const averageScore = calculateAverageScore(tests);
                  const bestScore = Math.max(...tests.map(t => (t.correctAnswers / t.totalQuestions) * 100));
                  const totalTime = tests.reduce((acc, t) => acc + t.totalTime, 0);
                  const recentTests = [...tests]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 3);

                  return (
                    <div key={language} className="language-stats">
                      <div className="language-header">
                        <div className="language-info">
                          <div className="flag-container">
                            <img 
                              src={languageInfo[language.toLowerCase()]?.flagIcon || '/flags/default-flag.png'}
                              alt={languageInfo[language.toLowerCase()]?.name || language}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/flags/default-flag.png';
                              }}
                            />
                          </div>
                          <div className="language-text">
                            <h3>{languageInfo[language.toLowerCase()]?.nativeName || language}</h3>
                            <span className="language-name">{languageInfo[language.toLowerCase()]?.name}</span>
                          </div>
                        </div>
                        <div className="proficiency-indicator">
                          <div className="proficiency-bar" style={{
                            '--progress': `${averageScore}%`,
                            '--color': averageScore >= 80 ? '#10B981' : averageScore >= 60 ? '#0A8A88' : '#6366F1'
                          }}></div>
                          <span className="proficiency-label">
                            {averageScore >= 80 ? 'Advanced' : averageScore >= 60 ? 'Intermediate' : 'Beginner'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="stats-grid">
                        <div className="stat-item achievements">
                          <div className="achievement-header">
                            <i className="fas fa-trophy"></i>
                            <h4>Achievements</h4>
                          </div>
                          <div className="achievement-stats">
                            <div className="achievement-row">
                              <span className="stat-label">Practice Sessions</span>
                              <span className="stat-value">{tests.length}</span>
                            </div>
                            <div className="achievement-row">
                              <span className="stat-label">Total Practice Time</span>
                              <span className="stat-value">{formatTime(totalTime)}</span>
                            </div>
                            <div className="achievement-row">
                              <span className="stat-label">Highest Performance</span>
                              <span className="stat-value level-indicator">
                                {bestScore >= 90 ? 'Expert' : bestScore >= 75 ? 'Advanced' : bestScore >= 60 ? 'Intermediate' : 'Beginner'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="stat-item recent-activity">
                          <div className="activity-header">
                            <i className="fas fa-history"></i>
                            <h4>Recent Progress</h4>
                          </div>
                          <div className="activity-timeline">
                            {recentTests.map((test, idx) => (
                              <div key={idx} className="timeline-item">
                                <div className="timeline-date">
                                  {new Date(test.date).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </div>
                                <div className="timeline-content">
                                  <div className="timeline-indicator" style={{
                                    '--score': `${Math.round((test.correctAnswers / test.totalQuestions) * 100)}%`
                                  }}></div>
                                  <span className="timeline-result">
                                    {Math.round((test.correctAnswers / test.totalQuestions) * 100) >= 80 ? 'Excellent' : 
                                     Math.round((test.correctAnswers / test.totalQuestions) * 100) >= 60 ? 'Good Progress' : 'Keep Practicing'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                background: 'linear-gradient(145deg, #ffffff, #f5f7fa)',
                borderRadius: '10px',
                marginTop: '20px'
              }}>
                <i className="fas fa-microphone" style={{ 
                  fontSize: '48px', 
                  color: '#0A8A88FF',
                  marginBottom: '16px',
                  opacity: '0.5'
                }}></i>
                <p className="text-center lesson-details-not-found" style={{ 
                  fontSize: '1.1rem',
                  color: '#4a5568',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}>
                  Start your pronunciation journey! Practice exercises to track your progress and improve your speaking skills.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
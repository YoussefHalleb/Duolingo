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

          {/* Pronunciation Tests Section */}
          <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="profile-section-title" style={{ color: '#0A8A88FF', textAlign: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <i className="fas fa-microphone" style={{ color: '#0A8A88FF' }}></i>
                Pronunciation Progress
              </span>
            </h2>
            {pronunciationTests.length > 0 ? (
              <div className="pronunciation-stats" style={{ 
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ flex: '1', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-trophy" style={{ color: '#0A8A88FF' }}></i>
                      <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>Overall Progress</span>
                    </div>
                    <div style={{ fontSize: '0.95rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Total Sessions:</span>
                        <span>{pronunciationTests.length}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Languages:</span>
                        <span>{Object.keys(pronunciationTestsByLanguage).length}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Total Practice Time:</span>
                        <span>{formatTime(pronunciationTests.reduce((acc, test) => acc + (test.totalTime || 0), 0))}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ flex: '1', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-chart-line" style={{ color: '#0A8A88FF' }}></i>
                      <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>Best Performances</span>
                    </div>
                    <div style={{ fontSize: '0.95rem' }}>
                      {Object.entries(pronunciationTestsByLanguage)
                        .sort(([, testsA], [, testsB]) => {
                          const bestScoreA = Math.max(...testsA.map(t => (t.correctAnswers / t.totalQuestions) * 100));
                          const bestScoreB = Math.max(...testsB.map(t => (t.correctAnswers / t.totalQuestions) * 100));
                          return bestScoreB - bestScoreA;
                        })
                        .slice(0, 3)
                        .map(([language, tests]) => {
                          const bestScore = Math.max(...tests.map(t => (t.correctAnswers / t.totalQuestions) * 100));
                          return (
                            <div key={language} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              marginBottom: '8px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img 
                                  src={languageInfo[language.toLowerCase()]?.flagIcon || '/flags/default-flag.png'}
                                  alt={language}
                                  style={{ width: '20px', height: '20px' }}
                                />
                                <span>{languageInfo[language.toLowerCase()]?.name || language}</span>
                              </div>
                              <span style={{ 
                                color: bestScore >= 90 ? '#10B981' : bestScore >= 75 ? '#0A8A88' : '#6366F1',
                                fontWeight: '500'
                              }}>
                                {Math.round(bestScore)}%
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-history" style={{ color: '#0A8A88FF' }}></i>
                    <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>Recent Activity</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                    {[...pronunciationTests]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 4)
                      .map((test, idx) => (
                        <div key={idx} style={{ 
                          backgroundColor: '#fff',
                          padding: '12px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img 
                              src={languageInfo[test.language.toLowerCase()]?.flagIcon || '/flags/default-flag.png'}
                              alt={test.language}
                              style={{ width: '20px', height: '20px' }}
                            />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{languageInfo[test.language.toLowerCase()]?.name || test.language}</div>
                              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                {new Date(test.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                          <span style={{
                            color: (test.correctAnswers / test.totalQuestions) * 100 >= 80 ? '#10B981' : 
                                  (test.correctAnswers / test.totalQuestions) * 100 >= 60 ? '#0A8A88' : '#6366F1',
                            fontWeight: '500'
                          }}>
                            {Math.round((test.correctAnswers / test.totalQuestions) * 100)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
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
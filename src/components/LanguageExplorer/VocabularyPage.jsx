import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, onValue, set } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import { useAuth } from '../auth/AuthContext'; // Updated import
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Learn.css';

const VocabularyPage = () => {
  const { user, loading: authLoading } = useAuth(); // Updated to useAuth
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const lastLessonId = state?.lessonId;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lastLessonId || !user) {
      setError('No lesson or user data available.');
      setLoading(false);
      return;
    }
    const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons/${lastLessonId}`);
    const unsubscribe = onValue(userLessonsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLesson(data);
      } else {
        setError('Lesson not found.');
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading lesson:', error);
      setError('Failed to load lesson.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [lastLessonId, user?.uid]);

  const getNextLessonId = () => {
    if (!user) return null;
    let nextLessonId = null;
    const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
    onValue(userLessonsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lessonArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        const currentIndex = lessonArray.findIndex(l => l.id === lastLessonId);
        if (currentIndex >= 0 && currentIndex < lessonArray.length - 1) {
          nextLessonId = lessonArray[currentIndex + 1].id;
        }
      }
    }, { onlyOnce: true });
    return nextLessonId;
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="vocabulary-container">
          <p className="lesson-details-not-found">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="vocabulary-container">
          <p className="lesson-details-not-found">Please sign in.</p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="vocabulary-container">
          <p className="lesson-details-not-found">Loading vocabulary...</p>
        </div>
      </Layout>
    );
  }

  if (error || !lesson) {
    return (
      <Layout>
        <div className="vocabulary-container">
          <p className="lesson-details-not-found">{error || 'No vocabulary available.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="vocabulary-container">
        <div className="lesson-details-content">
          <header className="lesson-details-header">
            <div className="lesson-card-image">
              <img
                src={lesson.image || '/pics/vocabulaire.png'}
                alt={`${lesson.title} icon`}
                className="lesson-card-image img"
                onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }}
              />
            </div>
            <h1 className="vocabulary-title">Vocabulary Recap</h1>
            <p className="vocabulary-subtitle">Review what you learned in {lesson.title}.</p>
          </header>
          <p className="lesson-details-summary">Language: {lesson.language.toUpperCase()}</p>
          <ul className="lesson-details-phrases">
            {lesson.phrases.map((phrase, index) => (
              <li key={index} className="lesson-details-phrase">
                <span className="lesson-details-phrase-text">{phrase.phrase}</span>
                <span className="lesson-details-phrase-translation">{phrase.translation}</span>
              </li>
            ))}
          </ul>
          <p className="lesson-status">
            Status: <span className={`status-completed`}>Completed</span>
          </p>
          <Button
            type="navigate"
            label="Completed"
            onClick={() => {
              const userLessonRef = ref(rtdb, `users/${user.uid}/terminatedLessons/${lastLessonId}`);
              set(userLessonRef, {
                startedAt: new Date().toISOString(),
                progress: 100,
                lastUpdated: new Date().toISOString()
              }).then(() => {
                const nextLessonId = getNextLessonId();
                if (nextLessonId) {
                  navigate(`/learn/${lesson.language}/${nextLessonId}`, { state: { user } });
                } else {
                  navigate('/learn/categories');
                }
              });
            }}
            className="w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default VocabularyPage;
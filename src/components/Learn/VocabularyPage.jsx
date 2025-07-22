import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Learn.css';

const VocabularyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastLessonId = location.state?.lessonId;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lastLessonId) {
        setError('No lesson selected.');
        setLoading(false);
        return;
      }
      try {
        const lessonDoc = doc(db, 'lessons', lastLessonId);
        const lessonSnapshot = await getDoc(lessonDoc);
        if (lessonSnapshot.exists()) {
          setLesson({ id: lessonSnapshot.id, ...lessonSnapshot.data() });
        } else {
          setError('Lesson not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Failed to load lesson. Please try again.');
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lastLessonId]);

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
                src={lesson.image}
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
          <Button
            type="navigate"
            label="Back to Lessons"
            onClick={() => navigate('/learn/categories')}
            className="w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default VocabularyPage;
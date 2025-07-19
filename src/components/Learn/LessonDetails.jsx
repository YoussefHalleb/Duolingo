import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Learn.css';

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = doc(db, 'lessons', id);
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
  }, [id]);

  const handleLessonComplete = () => {
    navigate('/vocabulary', { state: { lessonId: id } });
  };

  if (loading) {
    return (
      <Layout>
        <div className="lesson-details-container">
          <p className="lesson-details-not-found">Loading lesson...</p>
        </div>
      </Layout>
    );
  }

  if (error || !lesson) {
    return (
      <Layout>
        <div className="lesson-details-container">
          <p className="lesson-details-not-found">{error || 'Lesson not found.'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="lesson-details-container">
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
            <h1 className="lesson-details-title">{lesson.title}</h1>
            <p className="lesson-details-summary">{lesson.summary}</p>
          </header>
          <h2 className="lesson-details-section-title">Phrases</h2>
          <ul className="lesson-details-phrases">
            {lesson.phrases.map((phrase, index) => (
              <li key={index} className="lesson-details-phrase">
                <span className="lesson-details-phrase-text">{phrase.phrase}</span>
                <span className="lesson-details-phrase-translation">{phrase.translation}</span>
              </li>
            ))}
          </ul>
          <Button
            type="complete"
            label="Complete Lesson"
            onClick={handleLessonComplete}
            className="w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default LessonDetails;
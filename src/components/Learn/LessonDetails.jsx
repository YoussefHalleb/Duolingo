import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from '../../data/lessonData';
import Layout from '../shared/layout';
import './Learn.css';

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundLesson = lessons.find((l) => l.id === id);
    if (foundLesson) {
      setLesson(foundLesson);
    }
  }, [id]);

  if (!lesson) {
    return (
      <Layout>
        <div className="lesson-details-container">
          <div className="lesson-details-not-found">Chargement...</div>
        </div>
      </Layout>
    );
  }

  const handleLessonComplete = () => {
    navigate('/vocabulary');
  };

  return (
    <Layout>
      <div className="lesson-details-container">
        <header className="lesson-details-header">
          <h1 className="lesson-details-title">{lesson.title}</h1>
          <p className="lesson-details-summary">{lesson.summary}</p>
        </header>
        <div className="lesson-details-content">
          <h2 className="lesson-details-section-title">Phrases</h2>
          <ul className="lesson-details-phrases">
            {lesson.phrases.map((phrase, index) => (
              <li key={index} className="lesson-details-phrase">
                <span className="lesson-details-phrase-text">{phrase.phrase}</span>
                <span className="lesson-details-phrase-translation">{phrase.translation}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLessonComplete}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Complete Lesson
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LessonDetails;
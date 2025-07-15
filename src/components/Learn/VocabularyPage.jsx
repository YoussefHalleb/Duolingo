import React from 'react';
import { useLocation } from 'react-router-dom';
import { lessons } from '../../data/lessonData';
import Layout from '../shared/layout';
import Button from '../shared/Button'; // Import du bouton partagé

const VocabularyPage = () => {
  const location = useLocation();
  const lastLessonId = location.state?.lessonId || lessons[0].id;
  const lesson = lessons.find((l) => l.id === lastLessonId);

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header">
          <h1 className="learn-title">Vocabulary Recap</h1>
          <p className="learn-subtitle">Review what you learned in {lesson?.title || 'your last lesson'}.</p>
        </header>
        <div className="lesson-list">
          {lesson ? (
            <div className="lesson-card">
              <div className="lesson-card-image">
                <img src={lesson.image} alt={`${lesson.title} icon`} />
              </div>
              <h2 className="lesson-card-title">{lesson.title}</h2>
              <p className="text-sm text-gray-600">Language: {lesson.language.toUpperCase()}</p>
              <ul className="mt-4 space-y-2">
                {lesson.phrases.map((phrase, index) => (
                  <li key={index} className="text-sm text-gray-600 flex justify-between">
                    <span className="font-semibold">{phrase.phrase}</span>
                    <span className="text-gray-500">{phrase.translation}</span>
                  </li>
                ))}
              </ul>
              <Button
                type="navigate"
                label="Back to Lessons"
                onClick={() => window.history.back()}
              />
            </div>
          ) : (
            <p className="text-center">No vocabulary available. Complete a lesson to see it here.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VocabularyPage;
import React from 'react';
import { lessons } from '../../data/lessonData';

const VocabularyPage = () => {
  return (
    <div className="learn-container">
      <header className="learn-header">
        <h1 className="learn-title">Vocabulary Explorer</h1>
        <p className="learn-subtitle">Discover vocabulary from all lessons.</p>
      </header>
      <div className="lesson-list">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-card-image">
              <img src={lesson.image} alt={`${lesson.title} icon`} />
            </div>
            <h2 className="lesson-card-title">{lesson.title}</h2>
            <p className="text-sm text-gray-600">Language: {lesson.language.toUpperCase()}</p>
            <ul className="mt-2">
              {lesson.phrases.map((phrase, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <span className="font-semibold">{phrase.phrase}</span> - <span className="text-gray-500">{phrase.translation}</span>
                </li>
              ))}
            </ul>
            <a href={`/learn/${lesson.id}`} className="lesson-card-link">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import { lessons } from '../../data/lessonData';

const LessonDetails = () => {
  const { id } = useParams();
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) return <div className="lesson-details-not-found">Lesson not found</div>;

  return (
    <div className="learn-container">
      <header className="lesson-details-header">
        <h1 className="lesson-details-title">{lesson.title}</h1>
        <p className="lesson-details-summary">{lesson.summary}</p>
        <p className="text-sm text-gray-600">Language: {lesson.language.toUpperCase()} | Category: {lesson.category}</p>
      </header>
      <div className="lesson-details-content">
        <h2 className="lesson-details-section-title">Vocabulary Learned</h2>
        <ul className="lesson-details-phrases">
          {lesson.phrases.map((phrase, index) => (
            <li key={index} className="lesson-details-phrase">
              <span className="lesson-details-phrase-text font-semibold">{phrase.phrase}</span>
              <span className="lesson-details-phrase-translation ml-2">({phrase.translation})</span>
              {phrase.audio && <audio controls src={phrase.audio} className="ml-2"></audio>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonDetails;
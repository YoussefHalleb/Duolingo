import React from 'react';
import { Link } from 'react-router-dom';

const LessonCard = ({ lesson }) => {
  return (
    <div className="lesson-card">
      <div className="lesson-card-image">
        <img src={lesson.image || '/pics/vocabulaire.png'} alt={`${lesson.title} icon`} onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }} />
      </div>
      <h2 className="lesson-card-title">{lesson.title}</h2>
      <p className="lesson-card-summary">{lesson.summary}</p>
      <p className="text-sm text-gray-600">Status: {lesson.status || 'Not Started'}</p>
      <Link to={`/learn/${lesson.id}`} className="lesson-card-link" disabled={lesson.status === 'Completed'}>
        {lesson.status === 'Completed' ? 'Review Lesson' : 'Start Lesson'}
      </Link>
    </div>
  );
};

export default LessonCard;
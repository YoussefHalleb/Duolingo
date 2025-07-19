// src/components/Learn/LessonCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import './Learn.css';

const LessonCard = ({ lesson }) => {
  return (
    <div className="lesson-card">
      <div className="lesson-card-image">
        <img
          src={lesson.image || '/pics/vocabulaire.png'}
          alt={`${lesson.title} icon`}
          className="lesson-card-image img"
          onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }}
        />
      </div>
      <h2 className="lesson-card-title">{lesson.title}</h2>
      <p className="lesson-card-summary">{lesson.summary}</p>
      <p className="lesson-card-summary">Status: {lesson.status || 'Not Started'}</p>
      <Link to={`/learn/${lesson.id}`}>
        <Button
          type={lesson.status === 'Completed' ? 'complete' : 'navigate'}
          label={lesson.status === 'Completed' ? 'Review Lesson' : 'Start Lesson'}
          disabled={lesson.status === 'Completed'}
        />
      </Link>
    </div>
  );
};

export default LessonCard;
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import './Learn.css';

const LessonCard = ({ lesson, progress }) => {
  const getStatus = (progress) => {
    if (progress === 100) return 'Completed';
    if (progress > 0) return 'Progress';
    return 'Not Started';
  };

  const status = getStatus(progress || 0);

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
      <Link to={`/learn/${lesson.language}/${lesson.id}`}>
        <Button
          type={status === 'Completed' ? 'complete' : 'navigate'}
          label={status === 'Completed' ? 'Review Lesson' : 'Start Lesson'}
          disabled={status === 'Completed'}
        />
      </Link>
      <p className="lesson-status">
        Status: <span className={`status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
      </p>
    </div>
  );
};

export default LessonCard;
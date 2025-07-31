import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import './Learn.css';

const LessonCard = ({ lesson, progress }) => {
  const navigate = useNavigate();

  const getStatus = (progressValue) => {
    if (progressValue >= 100) return 'Completed';
    if (progressValue >= 66) return 'Progress';
    if (progressValue >= 33) return 'Progress';
    return 'Not Started';
  };

  if (!lesson || !lesson.language || !lesson.id) {
    return <div className="lesson-card">Invalid lesson data</div>;
  }

  const status = getStatus(progress || 0);
  const buttonType = status === 'Completed' ? 'complete' : 'navigate';
  const buttonLabel = status === 'Completed' ? 'Review Lesson' : 'Start Lesson';

  return (
    <div className="lesson-card">
      <div className="lesson-card-image">
        <img
          src={lesson.image || '/pics/vocabulaire.png'}
          alt={`${lesson.title} lesson icon`}
          className="lesson-card-image img"
          onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }}
        />
      </div>
      <h2 className="lesson-card-title">{lesson.title}</h2>
      <p className="lesson-card-summary">{lesson.summary}</p>
      <Button
        type={buttonType}
        label={buttonLabel}
        onClick={() => navigate(`/learn/${lesson.language}/${lesson.id}`)}
        disabled={!lesson || !lesson.id}
      />
      <p className="lesson-status">
        Status: <span className={`status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
      </p>
    </div>
  );
};

export default LessonCard;
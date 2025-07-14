import React from 'react';
import { Link } from 'react-router-dom';

const LessonCard = ({ lesson }) => {
  return (
    <div className="lesson-card">
      <div className="lesson-card-image">
        <img src={lesson.image || '/pics/vocabulaire.png'} alt={`${lesson.title} icon`} />
      </div>
      <h2 className="lesson-card-title">{lesson.title}</h2>
      <p className="lesson-card-summary">{lesson.summary}</p>
      <Link to={`/learn/${lesson.id}`} className="lesson-card-link">Start Lesson</Link>
    </div>
  );
};

export default LessonCard;
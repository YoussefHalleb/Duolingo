import React from 'react';
import LessonCard from './LessonCard';
import { lessons } from '../../data/lessonData';

const LessonList = () => {
  return (
    <div className="lesson-list">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
};

export default LessonList;
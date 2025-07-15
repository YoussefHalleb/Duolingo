import React from 'react';
import LessonCard from './LessonCard';
import { lessons } from '../../data/lessonData';

const LessonList = ({ filterLanguage }) => {
  console.log('Filter Language:', filterLanguage); // Débogage
  const filteredLessons = lessons.filter((lesson) => 
    !filterLanguage || lesson.language === filterLanguage
  );
  console.log('Filtered Lessons:', filteredLessons); // Débogage

  return (
    <div className="lesson-list">
      {filteredLessons.length > 0 ? (
        filteredLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))
      ) : (
        <p className="text-center">No lessons available for this language.</p>
      )}
    </div>
  );
};

export default LessonList;
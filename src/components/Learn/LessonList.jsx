import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import LessonCard from './LessonCard';
import './Learn.css';

const LessonList = ({ filterLanguage }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsCollection = collection(db, 'lessons');
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsData = lessonsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All Lessons:", lessonsData); // Débogage
        const filteredLessons = lessonsData.filter(lesson => 
          lesson.language.toLowerCase() === filterLanguage.toLowerCase()
        );
        console.log("Filtered Lessons:", filteredLessons); // Débogage
        setLessons(filteredLessons);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError('Failed to load lessons. Please try again.');
        setLoading(false);
      }
    };

    if (filterLanguage) {
      fetchLessons();
    }
  }, [filterLanguage]);

  if (loading) {
    return (
      <div className="learn-container">
        <p className="learn-subtitle text-center">Loading lessons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learn-container">
        <p className="learn-subtitle text-center" style={{ color: '#dc2626' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="lesson-list">
      {lessons.length > 0 ? (
        lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))
      ) : (
        <p className="learn-subtitle text-center">No lessons available for this language.</p>
      )}
    </div>
  );
};

export default LessonList;
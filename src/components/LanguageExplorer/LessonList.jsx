import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import { useAuth } from '../auth/AuthContext'; // Updated import
import LessonCard from './LessonCard';
import './Learn.css';

const LessonList = ({ filterLanguage }) => {
  const { user, loading: authLoading } = useAuth(); // Updated to useAuth
  const [lessons, setLessons] = useState([]);
  const [terminatedLessons, setTerminatedLessons] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && filterLanguage) {
      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      const userTerminatedLessonsRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
      console.log(`Fetching lessons for user ${user.uid} and language ${filterLanguage}`);

      const unsubscribeLessons = onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Raw data from userLessonsRef:', data);
        if (data) {
          const lessonArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            status: data[key].status || 'Not Started'
          }));
          const filteredLessons = lessonArray.filter(lesson =>
            lesson.language && lesson.language.toLowerCase() === filterLanguage.toLowerCase()
          );
          console.log('Filtered lessons:', filteredLessons);
          setLessons(filteredLessons);
        } else {
          setLessons([]);
          setError('No lessons available for this user.');
          console.log('No data found in userLessonsRef');
        }
      }, (error) => {
        console.error('Error loading lessons:', error);
        setError('Failed to load lessons. Please try again.');
      });

      const unsubscribeTerminated = onValue(userTerminatedLessonsRef, (snapshot) => {
        const data = snapshot.val() || {};
        console.log('Terminated lessons data:', data);
        setTerminatedLessons(data);
      }, (error) => {
        console.error('Error loading terminated lessons:', error);
      });

      setLoading(false);

      return () => {
        unsubscribeLessons();
        unsubscribeTerminated();
      };
    } else {
      setLessons([]);
      setLoading(false);
      console.log('User or filterLanguage is undefined');
    }
  }, [user, filterLanguage]);

  if (authLoading) {
    return (
      <div className="learn-container">
        <p className="learn-subtitle text-center">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="learn-container">
        <p className="learn-subtitle text-center">Please sign in to view lessons.</p>
      </div>
    );
  }

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
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            progress={terminatedLessons[lesson.id]?.progress || 0}
          />
        ))
      ) : (
        <p className="learn-subtitle text-center">No lessons available for this language.</p>
      )}
    </div>
  );
};

export default LessonList;
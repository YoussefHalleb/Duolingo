import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { ref, onValue } from 'firebase/database';
import { onSnapshot, doc } from 'firebase/firestore';
import { rtdb, db } from '../../config/firebase';
import Layout from '../shared/layout';
import './Profile.css';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [userLessons, setUserLessons] = useState([]);
  const [terminatedLessons, setTerminatedLessons] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [username, setUsername] = useState('Guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Set username from Firebase Auth
      setUsername(user.displayName || user.email.split('@')[0] || 'Guest');

      // Récupérer les leçons depuis RTDB
      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      const unsubscribeLessons = onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const lessonsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setUserLessons(lessonsArray);
        } else {
          setUserLessons([]);
        }
      }, (error) => {
        console.error('Error fetching lessons:', error.message);
      });

      // Récupérer les leçons terminées depuis RTDB
      const userTerminatedRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
      const unsubscribeTerminated = onValue(userTerminatedRef, (snapshot) => {
        const data = snapshot.val() || {};
        setTerminatedLessons(data);
      }, (error) => {
        console.error('Error fetching terminated lessons:', error.message);
      });

      // Récupérer les résultats des quiz depuis Firestore
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribeQuizResults = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setQuizResults(userData.quizResults || {});
        } else {
          setQuizResults({});
        }
      }, (error) => {
        console.error('Error fetching quiz results:', error.message);
      });

      setLoading(false);

      return () => {
        unsubscribeLessons();
        unsubscribeTerminated();
        unsubscribeQuizResults();
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="learn-container">
          <p className="learn-subtitle text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="learn-container">
          <p className="learn-subtitle text-center">Please sign in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  const completedLessons = userLessons.filter(lesson => terminatedLessons[lesson.id]?.progress === 100);
  const totalScore = Object.values(quizResults).reduce((sum, result) => sum + (result.score || 0), 0);
  const totalAttempts = Object.keys(quizResults).length;

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header" style={{ color: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h1 className="learn-title" style={{ color: '#0A8A88FF' }}>Your Profile</h1>
          <p className="learn-subtitle">Welcome, {username}! Track your progress</p>
        </header>
        <div className="profile-grid">
          <div className="profile-card info-card" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="profile-section-title" style={{ color: '#0A8A88FF' }}>Profile Information</h2>
            <div className="profile-details">
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Total Lessons:</strong> {userLessons.length}</p>
              <p><strong>Completed Lessons:</strong> {completedLessons.length}</p>
              <p><strong>Total Quiz Score:</strong> {totalScore}</p>
              <p><strong>Total Quiz Attempts:</strong> {totalAttempts}</p>
            </div>
          </div>
          {completedLessons.length > 0 ? (
            <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
              <h2 className="profile-section-title" style={{ color: '#0A8A88FF', textAlign: 'center' }}>Your Completed Lessons</h2>
              <div className="lesson-list-horizontal">
                {completedLessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-card-image">
                      <img
                        src={lesson.image || '/pics/vocabulaire.png'}
                        alt={`${lesson.title} icon`}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/default-flag.png'; }}
                      />
                    </div>
                    <div className="lesson-card-content">
                      <h2 className="lesson-card-title">{lesson.title}</h2>
                      <p className="text-sm text-gray-600">Category: {lesson.category}</p>
                      <p className="lesson-status">
                        Status: <span className="status-completed">Completed</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
              <h2 className="profile-section-title" style={{ color: '#40CB8CFF', textAlign: 'center' }}>Your Completed Lessons</h2>
              <p className="text-center lesson-details-not-found">No completed lessons yet. Start learning to see your progress!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import Layout from '../shared/layout';
import './Profile.css';
const Profile = () => {
  const { user } = useUser();
  const [userLessons, setUserLessons] = useState([]);
  const [terminatedLessons, setTerminatedLessons] = useState({});
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    if (user) {
      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const lessonsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setUserLessons(lessonsArray);
        }
      });

      const userTerminatedRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
      onValue(userTerminatedRef, (snapshot) => {
        const data = snapshot.val() || {};
        setTerminatedLessons(data);
      });

      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.username) {
          setUsername(data.username);
        }
      });
    }
  }, [user]);

  const completedLessons = userLessons.filter(lesson => terminatedLessons[lesson.id]?.progress === 100);

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header" style={{  color: '#fff', padding: '20px', borderRadius: '8px' }}>
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
            </div>
          </div>
          {completedLessons.length > 0 ? (
            <div className="profile-card lessons-card" style={{ backgroundColor: '#f9fafb' }}>
              <h2 className="profile-section-title" style={{ color: '#0A8A88FF', textAlign: 'center' }}>Your Completed Lessons</h2>
              <div className="lesson-list-horizontal">
                {completedLessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-card-image">
                      <img src={lesson.image || '/pics/vocabulaire.png'} alt={`${lesson.title} icon`} />
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
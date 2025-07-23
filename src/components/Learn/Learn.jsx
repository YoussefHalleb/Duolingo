import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import LessonList from './LessonList';
import Layout from '../shared/layout';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import './Learn.css';

const Learn = () => {
  const { selectedLanguage } = useLanguage();
  const { user } = useUser();
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    if (user) {
      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.username) {
          setUsername(data.username);
        }
      });
    }
  }, [user]);

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header">
          <div className="learn-title-row">
            <h1 className="learn-title">
              Learn {selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1) : 'Lessons'}
            </h1>
            <img
              src="/pics/avatar-horse.png"
              alt="Avatar Horse"
              className="learn-avatar"
            />
          </div>
          <p className="learn-subtitle">
            Explore interactive lessons to master your selected language
          </p>
        </header>

        {selectedLanguage && user ? (
          <LessonList filterLanguage={selectedLanguage} user={user} />
        ) : (
          <p className="learn-subtitle text-center">
            Please select a language and sign in to view lessons.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Learn;

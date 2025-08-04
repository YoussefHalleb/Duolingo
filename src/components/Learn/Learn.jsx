import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { ref, onValue, set } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import LessonList from './LessonList';
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Learn.css';

const Learn = () => {
  const { selectedLanguage } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('Guest');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedLanguage, setCompletedLanguage] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered, selectedLanguage:', selectedLanguage);
    if (user && selectedLanguage) {
      setUsername(user.displayName || user.email.split('@')[0] || 'Guest');

      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      const completedLanguageRef = ref(rtdb, `users/${user.uid}/completedLanguages/${selectedLanguage}`);
      const unsubscribeLessons = onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Lessons data:', data);
        if (data) {
          const lessonsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          const languageLessons = lessonsArray.filter(l => l.language === selectedLanguage);
          console.log('Language lessons:', languageLessons);
          if (languageLessons.length > 0) {
            const terminatedLessonsRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
            const unsubscribeTerminated = onValue(terminatedLessonsRef, (snap) => {
              const terminatedData = snap.val() || {};
              console.log('Terminated lessons data:', terminatedData);
              const completedLessons = languageLessons.filter(l => terminatedData[l.id]?.progress === 100);
              console.log('Completed lessons:', completedLessons);
              if (completedLessons.length === languageLessons.length) {
                onValue(completedLanguageRef, (completionSnap) => {
                  const completionData = completionSnap.val() || {};
                  console.log('Completed language data:', completionData);
                  const isAlreadyCompleted = completionData.completed;
                  if (!isAlreadyCompleted) {
                    console.log('Triggering modal for:', selectedLanguage);
                    setShowCompletionModal(true);
                    setCompletedLanguage(selectedLanguage);
                    // Ajuster l'heure pour la Tunisie (GMT+1)
                    const tunisiaTime = new Date(Date.now() + 3600000); // Ajouter 1 heure (3600000 ms)
                    set(completedLanguageRef, {
                      completed: true,
                      completedAt: tunisiaTime.toISOString()
                    }).then(() => console.log('Language marked as completed with Tunisia time:', selectedLanguage));
                  } else {
                    console.log('Language already marked as completed, skipping modal:', selectedLanguage);
                  }
                }, { onlyOnce: true });
              } else {
                console.log('Not all lessons completed for:', selectedLanguage);
              }
            });
            return () => unsubscribeTerminated();
          } else {
            console.log('No lessons found for language:', selectedLanguage);
          }
        } else {
          console.log('No lessons data available');
        }
      });
      return () => unsubscribeLessons();
    }
  }, [user, selectedLanguage]);

  const closeCompletionModal = (action) => {
    setShowCompletionModal(false);
    setCompletedLanguage(null);
    if (action === 'next') {
      navigate('/language-selector');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="learn-container">
          <p className="learn-subtitle text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header">
          <div className="learn-title-row">
            <img
              src="/pics/avatar-horse.png"
              alt="Avatar Horse"
              className="learn-avatar"
            />
            <h1 className="learn-title">
              Learn {selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1) : 'Lessons'}
            </h1>
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

      {showCompletionModal && completedLanguage && (
        <div className="completion-modal language-completion-modal">
          <div className="modal-content">
            <h2>Congratulations! 🎉</h2>
            <p>You have completed all lessons in {completedLanguage.charAt(0).toUpperCase() + completedLanguage.slice(1)}!</p>
            <p>Let's learn another new language!</p>
            <div className="lesson-navigation">
              <Button
                label="Close"
                onClick={() => closeCompletionModal('close')}
                type="navigate"
                className="language-completion-button navigate"
              />
              <Button
                label="Learn another language!"
                onClick={() => closeCompletionModal('next')}
                type="complete"
                className="language-completion-button complete"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Learn;
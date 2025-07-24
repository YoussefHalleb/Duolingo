import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Updated import
import { ref, onValue, set } from 'firebase/database';
import { doc, setDoc } from 'firebase/firestore';
import { rtdb, db } from '../../config/firebase';
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Learn.css';

const LessonDetails = () => {
  const { user, loading: authLoading } = useAuth(); // Updated to useAuth
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [currentView, setCurrentView] = useState('learn'); // 'learn', 'complete', 'recap'
  const [progress, setProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [correctPhrase, setCorrectPhrase] = useState('');

  useEffect(() => {
    if (user) {
      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      console.log(`Fetching lessons for user ${user.uid}, language ${language}, lessonId ${lessonId}`);
      const unsubscribe = onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Raw data from userLessonsRef:', data);
        if (data) {
          const lessonsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            status: data[key].status || 'Not Started'
          }));
          setAllLessons(lessonsArray);
          const currentLesson = lessonsArray.find(l => l.id === lessonId && l.language === language);
          console.log('Current lesson found:', currentLesson);
          if (currentLesson && currentLesson.phrases && currentLesson.phrases.length > 0) {
            setLesson(currentLesson);
            setCurrentView('learn');
            setProgress(0);
            setUserInput('');
          } else {
            setError('Lesson not found or has no valid phrases for this language.');
          }
        } else {
          setError('No lessons available.');
          console.log('No data found in userLessonsRef');
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching lessons:', error);
        setError('Failed to load lessons.');
        setLoading(false);
      });

      const userLessonRef = ref(rtdb, `users/${user.uid}/terminatedLessons/${lessonId}`);
      const unsubscribeProgress = onValue(userLessonRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Progress data from terminatedLessons:', data);
        if (data) setProgress(data.progress || 0);
      }, (error) => {
        console.error('Error fetching progress:', error);
      });

      return () => {
        unsubscribe();
        unsubscribeProgress();
      };
    }
  }, [user, language, lessonId]);

  const saveProgress = (newProgress) => {
    if (user) {
      const userLessonRef = ref(rtdb, `users/${user.uid}/terminatedLessons/${lessonId}`);
      set(userLessonRef, {
        startedAt: new Date().toISOString(),
        progress: newProgress,
        lastUpdated: new Date().toISOString()
      })
        .then(() => {
          if (newProgress === 100) {
            const userDocRef = doc(db, 'users', user.uid);
            setDoc(userDocRef, {
              lessons: { [lessonId]: { completed: true, progress: newProgress, completedAt: new Date().toISOString() } }
            }, { merge: true });
          }
        })
        .catch((error) => console.error('Error saving progress:', error));
    }
  };

  const getNextLessonId = () => {
    const languageLessons = allLessons.filter(l => l.language === language);
    const currentIndex = languageLessons.findIndex(l => l.id === lessonId);
    return currentIndex < languageLessons.length - 1 ? languageLessons[currentIndex + 1]?.id : null;
  };

  const getPrevLessonId = () => {
    const languageLessons = allLessons.filter(l => l.language === language);
    const currentIndex = languageLessons.findIndex(l => l.id === lessonId);
    return currentIndex > 0 ? languageLessons[currentIndex - 1]?.id : null;
  };

  const playAudio = (phraseIndex) => {
    const audioUrl = `/audio/${lessonId}-${phraseIndex}.mp3`;
    const audio = new Audio(audioUrl);
    audio.play().catch(error => console.error('Audio play failed:', error));
  };

  const handleComplete = () => {
    if (!lesson.phrases || lesson.phrases.length === 0) {
      setProgress(66);
      saveProgress(66);
      setCurrentView('recap');
      return;
    }
    const correctPhrase = lesson.phrases[0].phrase;
    if (userInput.toLowerCase() === correctPhrase.toLowerCase()) {
      setProgress(66);
      saveProgress(66);
      setCurrentView('recap');
    } else {
      setCorrectPhrase(correctPhrase);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 7000);
    }
  };

  const handleLessonComplete = () => {
    saveProgress(100);
    const nextLessonId = getNextLessonId();
    if (!nextLessonId) {
      const languageLessons = allLessons.filter(l => l.language === language);
      const terminatedLessonsRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
      onValue(terminatedLessonsRef, (snapshot) => {
        const terminatedData = snapshot.val() || {};
        const completedLessons = languageLessons.filter(l => terminatedData[l.id]?.progress === 100);
        if (completedLessons.length === languageLessons.length) {
          setShowCompletionModal(true);
        } else {
          navigate('/learn/categories');
        }
      }, { onlyOnce: true });
    } else {
      navigate(`/learn/${language}/${nextLessonId}`);
    }
  };

  const closeModal = () => {
    setShowCompletionModal(false);
    navigate('/learn/categories');
  };

  if (authLoading) return (
    <Layout><div><p>Loading...</p></div></Layout>
  );
  if (!user) return (
    <Layout><div><p>Please sign in.</p></div></Layout>
  );
  if (loading) return (
    <Layout><div><p>Loading...</p></div></Layout>
  );
  if (error || !lesson) return (
    <Layout><div><p>{error}</p></div></Layout>
  );

  return (
    <Layout>
      <div className="lesson-details-container">
        <div className="lesson-details-header">
          <h1 className="lesson-details-title">{lesson.title}</h1>
          <p className="lesson-details-summary">{lesson.summary}</p>
        </div>
        <div className="lesson-details-content">
          {currentView === 'learn' && (
            <div className="lesson-details-section">
              <h2 className="lesson-details-section-title">Learn</h2>
              {lesson.phrases && lesson.phrases.length > 0 ? (
                <div className="lesson-phrases-grid">
                  {lesson.phrases.map((phrase, index) => (
                    <div key={index} className="lesson-phrase-item">
                      <div className="lesson-phrase-text">Phrase: {phrase.phrase}</div>
                      <div className="lesson-phrase-translation">Translation: {phrase.translation}</div>
                      <button
                        className="play-button"
                        onClick={() => playAudio(index)}
                      >
                        ▶ Play
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="lesson-details-not-found">No phrases available to learn.</p>
              )}
              <div className="lesson-navigation">
                <Button
                  label="Previous"
                  onClick={() => navigate(`/learn/${language}/${getPrevLessonId()}`)}
                  disabled={!getPrevLessonId()}
                  type="navigate"
                />
                <Button
                  label="Next"
                  onClick={() => { setProgress(33); saveProgress(33); setCurrentView('complete'); }}
                  type="navigate"
                />
              </div>
            </div>
          )}
          {currentView === 'complete' && (
            <div className="lesson-details-section">
              <h2 className="lesson-details-section-title">Complete the Phrase</h2>
              {lesson.phrases && lesson.phrases.length > 0 ? (
                <div className="lesson-complete-content">
                  <div className="lesson-phrase-text">Phrase: ___</div>
                  <div className="lesson-phrase-translation">Translation: {lesson.phrases[0].translation}</div>
                  <input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter the phrase"
                    className="input-field"
                  />
                  <div className="lesson-navigation">
                    <Button label="Back" onClick={() => setCurrentView('learn')} type="navigate" />
                    <Button label="Submit" onClick={handleComplete} type="complete" />
                  </div>
                  {showErrorMessage && (
                    <div
                      className="error-message"
                      onCopy={(e) => e.preventDefault()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      Try again! The correct phrase is: {correctPhrase}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="lesson-details-not-found">No phrases available to complete. Moving to Recap...</p>
                  <div className="lesson-navigation">
                    <Button label="Back" onClick={() => setCurrentView('learn')} type="navigate" />
                    <Button
                      label="Next"
                      onClick={() => { setProgress(66); saveProgress(66); setCurrentView('recap'); }}
                      type="navigate"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {currentView === 'recap' && (
            <div className="lesson-details-section">
              <h2 className="lesson-details-section-title">Vocabulary Recap</h2>
              {lesson.phrases && lesson.phrases.length > 0 ? (
                <table className="vocabulary-table">
                  <thead>
                    <tr>
                      <th>Phrase</th>
                      <th>Translation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.phrases.map((phrase, index) => (
                      <tr key={index}>
                        <td>{phrase.phrase}</td>
                        <td>{phrase.translation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="lesson-details-not-found">No phrases available for recap.</p>
              )}
              <div className="lesson-navigation">
                <Button
                  label="Previous"
                  onClick={() => navigate(`/learn/${language}/${getPrevLessonId()}`)}
                  disabled={!getPrevLessonId()}
                  type="navigate"
                />
                <Button label="Completed" onClick={handleLessonComplete} type="complete" />
              </div>
            </div>
          )}
        </div>
      </div>
      {showCompletionModal && (
        <div className="completion-modal">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You have completed all lessons in {language.charAt(0).toUpperCase() + language.slice(1)}!</p>
            <p>Let's learn another new language!</p>
            <Button label="Close" onClick={closeModal} type="complete" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LessonDetails;
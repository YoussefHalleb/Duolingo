import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ref, onValue, set } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Learn.css';

const LessonDetails = () => {
  const { user, loading: authLoading } = useAuth();
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [currentView, setCurrentView] = useState('learn');
  const [progress, setProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [correctPhrase, setCorrectPhrase] = useState('');
  const [unlockedCard, setUnlockedCard] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (user) {
      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      const unsubscribe = onValue(userLessonsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const lessonsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            status: data[key].status || 'Not Started'
          }));
          setAllLessons(lessonsArray);
          const currentLesson = lessonsArray.find(l => l.id === lessonId && l.language === language);
          if (currentLesson && currentLesson.phrases && currentLesson.phrases.length > 0) {
            setLesson(currentLesson);
            const userLessonRef = ref(rtdb, `users/${user.uid}/terminatedLessons/${lessonId}`);
            onValue(userLessonRef, (snap) => {
              const progressData = snap.val();
              const isCompleted = progressData?.progress === 100 || currentLesson.status === 'Completed';
              setCurrentView(isCompleted ? 'review' : 'learn');
              setProgress(progressData?.progress || 0);
            }, { onlyOnce: true });
            setUserInput('');
          } else {
            setError('Lesson not found or has no valid phrases for this language.');
          }
        } else {
          setError('No lessons available.');
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching lessons:', error);
        setError('Failed to load lessons.');
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, language, lessonId]);

  const saveProgress = (newProgress) => {
    if (user && lesson && newProgress > 0) {
      const userLessonRef = ref(rtdb, `users/${user.uid}/terminatedLessons/${lessonId}`);
      const now = new Date();
      const tunisianTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
      const isoString = tunisianTime.toISOString().slice(0, -1);
      set(userLessonRef, {
        language: lesson.language,
        progress: newProgress,
        date: isoString,
        updatedAt: isoString
      }).then(() => {
        setProgress(newProgress);
        if (newProgress === 100) {
          const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons/${lessonId}`);
          set(userLessonsRef, { ...lesson, status: 'Completed' }, { merge: true }).then(() => {
            console.log("Lesson status updated to Completed for:", lessonId);
            setCurrentView('review');
          });
        }
      }).catch((error) => console.error('Error saving progress:', error.message));
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
    if (lesson && lesson.phrases && lesson.phrases[phraseIndex]?.audio) {
      const audioUrl = lesson.phrases[phraseIndex].audio;
      const audio = new Audio(audioUrl);
      audio.play().catch(error => console.error('Audio play failed:', error));
    }
  };

  const handleComplete = () => {
    if (!lesson.phrases || lesson.phrases.length === 0) {
      saveProgress(33);
      setCurrentView('recap');
      return;
    }
    const correctPhrase = lesson.phrases[0].phrase;
    if (userInput.toLowerCase() === correctPhrase.toLowerCase()) {
      saveProgress(66);
      setCurrentView('recap');
    } else {
      setCorrectPhrase(correctPhrase);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 7000);
    }
  };

  const handleLessonComplete = async () => {
    saveProgress(100);
    try {
      console.log('Fetching card for lessonId:', lessonId);
      const response = await fetch(`http://localhost:3001/cultural-cards/by-lesson/${lessonId}`);
      console.log('Response status:', response.status);
      if (response.ok) {
        const [relatedCard] = await response.json();
        console.log('Fetched card:', relatedCard);
        if (relatedCard) {
          setUnlockedCard(relatedCard);
          setShowCompletionModal(true);
          setApiError(null);
        } else {
          setApiError('No cultural card found for this lesson.');
          navigate('/learn/categories');
        }
      } else {
        setApiError(`Failed to fetch cultural card: ${response.statusText}`);
        navigate('/learn/categories');
      }
    } catch (error) {
      console.error('Error fetching cultural card:', error);
      setApiError('Failed to load cultural card. Please try again.');
      navigate('/learn/categories');
    }
  };

  const closeModal = (action) => {
    setShowCompletionModal(false);
    setUnlockedCard(null);
    setApiError(null);
    if (action === 'next' && getNextLessonId()) {
      navigate(`/learn/${language}/${getNextLessonId()}`);
    } else {
      navigate('/learn/categories');
    }
  };

  if (authLoading || loading) return <Layout><div><p>Loading...</p></div></Layout>;
  if (!user) return <Layout><div><p>Please sign in.</p></div></Layout>;
  if (error || !lesson) return <Layout><div><p>{error}</p></div></Layout>;

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
                      <button className="play-button" onClick={() => playAudio(index)}>▶ Play</button>
                    </div>
                  ))}
                </div>
              ) : <p className="lesson-details-not-found">No phrases available to learn.</p>}
              <div className="lesson-navigation">
                <Button label="Previous" onClick={() => navigate(`/learn/${language}/${getPrevLessonId()}`)} disabled={!getPrevLessonId()} type="navigate" />
                <Button label="Next" onClick={() => { saveProgress(33); setCurrentView('complete'); }} type="navigate" />
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
                  <input value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Enter the phrase" className="input-field" />
                  <div className="lesson-navigation">
                    <Button label="Back" onClick={() => setCurrentView('learn')} type="navigate" />
                    <Button label="Submit" onClick={handleComplete} type="complete" />
                  </div>
                  {showErrorMessage && (
                    <div className="error-message">Try again! The correct phrase is: {correctPhrase}</div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="lesson-details-not-found">No phrases available to complete. Moving to Recap...</p>
                  <div className="lesson-navigation">
                    <Button label="Back" onClick={() => setCurrentView('learn')} type="navigate" />
                    <Button label="Next" onClick={() => { saveProgress(66); setCurrentView('recap'); }} type="navigate" />
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
                  <thead><tr><th>Phrase</th><th>Translation</th></tr></thead>
                  <tbody>{lesson.phrases.map((phrase, index) => (
                    <tr key={index}><td>{phrase.phrase}</td><td>{phrase.translation}</td></tr>
                  ))}</tbody>
                </table>
              ) : <p className="lesson-details-not-found">No phrases available for recap.</p>}
              <div className="lesson-navigation">
                <Button label="Previous" onClick={() => navigate(`/learn/${language}/${getPrevLessonId()}`)} disabled={!getPrevLessonId()} type="navigate" />
                <Button label="Completed" onClick={handleLessonComplete} type="complete" />
              </div>
            </div>
          )}
          {currentView === 'review' && (
            <div className="lesson-details-section">
              <h2 className="lesson-details-section-title">Review Lesson</h2>
              {lesson.phrases && lesson.phrases.length > 0 ? (
                <div className="lesson-phrases-grid">
                  {lesson.phrases.map((phrase, index) => (
                    <div key={index} className="lesson-phrase-item">
                      <div className="lesson-phrase-text">Phrase: {phrase.phrase}</div>
                      <div className="lesson-phrase-translation">Translation: {phrase.translation}</div>
                      <button className="play-button" onClick={() => playAudio(index)}>▶ Play</button>
                    </div>
                  ))}
                </div>
              ) : <p className="lesson-details-not-found">No phrases available to review.</p>}
              <div className="lesson-navigation">
                <Button label="Previous" onClick={() => navigate(`/learn/${language}/${getPrevLessonId()}`)} disabled={!getPrevLessonId()} type="navigate" />
                <Button label="Back to List" onClick={() => navigate('/learn/categories')} type="navigate" />
              </div>
            </div>
          )}
        </div>
      </div>

      {showCompletionModal && unlockedCard && (
        <div className="completion-modal cultural-unlock-modal">
          <div className="modal-content">
            <h2>Congratulations! 🎉</h2>
            <p>You’ve unlocked a new cultural treasure!</p>
            <div className="unlocked-card-preview">
              <img src={unlockedCard.image_url} alt={unlockedCard.title} className="unlocked-card-image" />
              <h3 className="unlocked-card-title">{unlockedCard.title}</h3>
              <p className="unlocked-card-text">{unlockedCard.text.substring(0, 50)}...</p>
              <button
                className="view-details-button"
                onClick={() => window.open(unlockedCard.external_link, '_blank')}
              >
                Explore Now! 🌍
              </button>
            </div>
            <p>Keep learning to unlock more adventures!</p>
            {apiError && <p className="error-message">{apiError}</p>}
            <div className="lesson-navigation">
              <Button
                label="Continue to Next Lesson"
                onClick={() => closeModal('next')}
                type="complete"
                disabled={!getNextLessonId()}
              />
              <Button
                label="Back to List"
                onClick={() => closeModal('back')}
                type="navigate"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LessonDetails;
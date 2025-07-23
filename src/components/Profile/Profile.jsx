import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { lessons } from '../../data/lessonData';
import Layout from '../shared/layout';

const Profile = () => {
  const { selectedLanguage } = useLanguage();
  const userLessons = selectedLanguage ? lessons.filter((lesson) => lesson.language === selectedLanguage) : [];

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header">
          <h1 className="learn-title">Your Profile</h1>
          <p className="learn-subtitle">Track your progress in {selectedLanguage || 'your selected language'}</p>
        </header>
        {selectedLanguage && userLessons.length > 0 ? (
          <div className="lesson-list">
            {userLessons.map((lesson) => (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-card-image">
                  <img src={lesson.image} alt={`${lesson.title} icon`} />
                </div>
                <h2 className="lesson-card-title">{lesson.title}</h2>
                <p className="text-sm text-gray-600">Category: {lesson.category}</p>
                <p className="text-sm text-gray-600">Status: Not Started</p> {/* Placeholder, à remplacer par une logique future */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Please select a language to see your progress.</p>
        )}
      </div>
    </Layout>
  );
};

export default Profile;